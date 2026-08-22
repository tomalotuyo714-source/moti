import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { consultar } from '../lib/red.js'
import { fecha, pesos, ESTADOS_ENVIO, TIPOS_CAJA } from '../lib/carga.js'
import { Cargando, ErrorRed, Vacio } from '../components/Estado.jsx'
import Cabecera from '../components/Cabecera.jsx'
import {
  fotoDeEntrega,
  ubicacionActual,
  vibrar,
  esNativo,
  guardarCopia,
  leerCopia,
} from '../lib/nativo.js'

const COLUMNAS_ENVIO =
  'id, viaje_id, parada_id, destinatario_nombre, kg_cobrables, fragil, pago, valor, estado, ' +
  'envio_items(id, tipo_caja, cantidad), paradas(muelle, orden)'

/**
 * Manifiesto digital del capitan (regla 4.13).
 *
 * Las acciones de zarpe y de llegada hacen VARIAS escrituras seguidas.
 * Con senal mala, una puede fallar despues de que otra tuvo exito. Si
 * eso pasa en silencio, el barco figura navegando pero a los clientes
 * nunca les llego el aviso. Por eso cada paso se verifica y, si falla,
 * la operacion se puede retomar exactamente desde donde se rompio.
 */
export default function CapitanViaje() {
  const { id } = useParams()
  const navegar = useNavigate()
  const [viaje, setViaje] = useState(null)
  const [paradas, setParadas] = useState([])
  const [envios, setEnvios] = useState([])
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)

  const [mensaje, setMensaje] = useState(null)
  const [fallo, setFallo] = useState(null) // { texto, reintentar }
  const [ocupado, setOcupado] = useState(false)
  const [copiaDe, setCopiaDe] = useState(null) // fecha de la copia sin senal

  // Sin senal se muestra la ultima copia, SIEMPRE marcada con su
  // fecha. Un manifiesto viejo presentado como si fuera de ahorita
  // es peor que no mostrar nada: el capitan zarpa creyendo que la
  // carga que ve es toda la que le reservaron.
  const usarCopia = useCallback(
    async (errorDeRed) => {
      const copia = await leerCopia('viaje:' + id)
      if (!copia?.datos?.viaje) return setError(errorDeRed)
      setViaje(copia.datos.viaje)
      setParadas(copia.datos.paradas ?? [])
      setEnvios(copia.datos.envios ?? [])
      setCopiaDe(copia.cuando)
      setError(null)
    },
    [id]
  )

  const cargar = useCallback(async () => {
    setCargando(true)
    setError(null)

    const r1 = await consultar(
      supabase
        .from('viajes')
        .select('*, embarcaciones(nombre, capacidad_kg)')
        .eq('id', id)
        .maybeSingle()
    )
    if (r1.error) {
      setCargando(false)
      return usarCopia(r1.error)
    }
    setViaje(r1.data)

    const r2 = await consultar(
      supabase.from('paradas').select('*').eq('viaje_id', id).order('orden')
    )
    if (r2.error) {
      setCargando(false)
      return usarCopia(r2.error)
    }
    setParadas(r2.data ?? [])

    const r3 = await consultar(supabase.from('envios').select(COLUMNAS_ENVIO).eq('viaje_id', id))
    if (r3.error) {
      setCargando(false)
      return usarCopia(r3.error)
    }
    setEnvios(r3.data ?? [])
    setCargando(false)
    setCopiaDe(null)

    // El manifiesto tiene que poder abrirse en mitad del rio, sin
    // senal. Se guarda la ultima copia buena para eso.
    guardarCopia('viaje:' + id, { viaje: r1.data, paradas: r2.data ?? [], envios: r3.data ?? [] })
  }, [id, usarCopia])

  useEffect(() => {
    cargar()
  }, [cargar])

  // ---------------------------------------------------------------
  // ZARPE
  // Orden a proposito: primero los avisos a los clientes, y de ultimo
  // el estado del viaje. Asi, si algo falla, el boton "Marcar como
  // zarpado" sigue visible y se puede reintentar.
  // ---------------------------------------------------------------
  async function zarpar(desde = 1) {
    setOcupado(true)
    setFallo(null)
    setMensaje(null)

    const vivos = envios.filter((e) => e.estado !== 'cancelado')

    if (desde <= 1 && vivos.length) {
      const r = await consultar(
        supabase
          .from('envios')
          .update({ estado: 'en_navegacion' })
          .eq('viaje_id', id)
          .neq('estado', 'cancelado')
      )
      if (r.error) {
        setOcupado(false)
        return setFallo({
          texto: 'No se pudo actualizar la carga: ' + r.error,
          reintentar: () => zarpar(1),
        })
      }
    }

    if (desde <= 2 && vivos.length) {
      const r = await consultar(
        supabase.from('eventos').insert(
          vivos.map((e) => ({
            envio_id: e.id,
            viaje_id: id,
            tipo: 'zarpe',
            mensaje: `La embarcación ${viaje.embarcaciones?.nombre} zarpó de ${viaje.origen}.`,
          }))
        )
      )
      if (r.error) {
        setOcupado(false)
        return setFallo({
          texto: 'La carga quedo actualizada, pero no se pudo avisar a los clientes: ' + r.error,
          reintentar: () => zarpar(2),
        })
      }
    }

    const r3 = await consultar(
      supabase.from('viajes').update({ estado: 'en_navegacion' }).eq('id', id)
    )
    setOcupado(false)
    if (r3.error) {
      return setFallo({
        texto: 'Los clientes ya fueron avisados, pero falta marcar el viaje: ' + r3.error,
        reintentar: () => zarpar(3),
      })
    }

    setMensaje('Viaje marcado como en navegación. Los clientes ya lo ven.')
    cargar()
  }

  // ---------------------------------------------------------------
  // LLEGADA A UN MUELLE
  // Primero los avisos, de ultimo el estado de la parada, por la
  // misma razon: que el boton "Llegue" no desaparezca si algo falla.
  // ---------------------------------------------------------------
  async function llegarA(parada, desde = 1) {
    setOcupado(true)
    setFallo(null)
    setMensaje(null)

    const deEste = envios.filter((e) => e.parada_id === parada.id && e.estado !== 'entregado')
    const siguiente = paradas.find((p) => p.orden === parada.orden + 1)
    const deSiguiente = siguiente ? envios.filter((e) => e.parada_id === siguiente.id) : []

    if (desde <= 1 && deEste.length) {
      const r = await consultar(
        supabase
          .from('envios')
          .update({ estado: 'en_muelle' })
          .in(
            'id',
            deEste.map((e) => e.id)
          )
      )
      if (r.error) {
        setOcupado(false)
        return setFallo({
          texto: 'No se pudo actualizar la carga de este muelle: ' + r.error,
          reintentar: () => llegarA(parada, 1),
        })
      }
    }

    if (desde <= 2 && deEste.length) {
      const r = await consultar(
        supabase.from('eventos').insert(
          deEste.map((e) => ({
            envio_id: e.id,
            viaje_id: id,
            tipo: 'llegada',
            mensaje: `El barco está descargando en ${parada.muelle} en este momento. Acérquese con su código de retiro.`,
          }))
        )
      )
      if (r.error) {
        setOcupado(false)
        return setFallo({
          texto: 'No se pudo avisar a los clientes de este muelle: ' + r.error,
          reintentar: () => llegarA(parada, 2),
        })
      }
    }

    if (desde <= 3 && deSiguiente.length) {
      const r = await consultar(
        supabase.from('eventos').insert(
          deSiguiente.map((e) => ({
            envio_id: e.id,
            viaje_id: id,
            tipo: 'proximidad',
            mensaje: `El barco llegó a ${parada.muelle}. Su muelle (${siguiente.muelle}) es el siguiente de la ruta.`,
          }))
        )
      )
      if (r.error) {
        setOcupado(false)
        return setFallo({
          texto: 'No se pudo avisar al muelle siguiente: ' + r.error,
          reintentar: () => llegarA(parada, 3),
        })
      }
    }

    // El capitan marca la llegada parado en el muelle, asi que el
    // celular sabe donde queda. Se guarda la primera vez nada mas y
    // nunca bloquea: si el GPS no responde, la llegada se marca igual.
    const lugar = await ubicacionActual()

    const r4 = await consultar(
      supabase
        .from('paradas')
        .update({
          estado: 'descargando',
          hora_llegada: new Date().toISOString(),
          ...(lugar && !parada.lat
            ? { lat: lugar.lat, lng: lugar.lng, precision_m: lugar.precision }
            : {}),
        })
        .eq('id', parada.id)
    )
    setOcupado(false)
    if (r4.error) {
      return setFallo({
        texto: 'Los avisos salieron, pero falta marcar la parada: ' + r4.error,
        reintentar: () => llegarA(parada, 4),
      })
    }

    vibrar('fuerte')
    setMensaje(`Llegada a ${parada.muelle} registrada. Se avisó a los clientes.`)
    cargar()
  }

  async function completarParada(parada) {
    setOcupado(true)
    setFallo(null)
    const r = await consultar(
      supabase
        .from('paradas')
        .update({ estado: 'completada', hora_salida: new Date().toISOString() })
        .eq('id', parada.id)
    )
    setOcupado(false)
    if (r.error) {
      return setFallo({
        texto: 'No se pudo cerrar la parada: ' + r.error,
        reintentar: () => completarParada(parada),
      })
    }
    cargar()
  }

  if (error)
    return (
      <>
        <Cabecera atras={() => navegar('/viajes')} />
        <main>
          <ErrorRed mensaje={error} onReintentar={cargar} />
        </main>
      </>
    )

  if (cargando && !viaje)
    return (
      <>
        <Cabecera atras={() => navegar('/viajes')} />
        <Cargando />
      </>
    )

  if (!viaje)
    return (
      <>
        <Cabecera atras={() => navegar('/viajes')} />
        <main>
          <Vacio>No se encontró este viaje.</Vacio>
        </main>
      </>
    )

  const cargados = envios
    .filter((e) => e.estado !== 'cancelado')
    .reduce((t, e) => t + Number(e.kg_cobrables), 0)
  const disponible = Number(viaje.aforo_kg) - cargados

  return (
    <>
      <Cabecera atras={() => navegar('/viajes')} titulo="Manifiesto" />
      <main>
        <div className="entre" style={{ marginTop: 6 }}>
          <span className="mini">Sale {fecha(viaje.fecha_salida)}</span>
          <span className={'etiqueta ' + (viaje.estado === 'en_navegacion' ? 'verde' : 'gris')}>
            {viaje.estado.replace('_', ' ')}
          </span>
        </div>

        <h2 className="titulo-grande">{viaje.embarcaciones?.nombre}</h2>

        {copiaDe && (
          <div className="copia-vieja">
            Sin señal. Esto es la copia guardada del <strong>{fecha(copiaDe)}</strong>. Puede
            haber carga nueva que todavía no ha bajado.
          </div>
        )}

        <div className="desglose">
          <div>
            <span className="clave">Carga reservada</span>
            <span className="valor">{cargados} kg</span>
          </div>
          <div>
            <span className="clave">Cupo disponible</span>
            <span
              className="valor fuerte"
              style={{ color: disponible <= 0 ? 'var(--alerta-texto)' : 'inherit' }}
            >
              {disponible} kg
            </span>
          </div>
        </div>

        {viaje.estado === 'programado' && (
          <>
            <div style={{ height: 18 }} />
            <button className="cta" onClick={() => zarpar()} disabled={ocupado}>
              {ocupado ? 'Enviando…' : 'Marcar como zarpado'}
            </button>
          </>
        )}

        {mensaje && <div className="aviso">{mensaje}</div>}
        {fallo && (
          <div className="aviso critico">
            {fallo.texto}
            <div style={{ height: 10 }} />
            <button className="chico" onClick={fallo.reintentar} disabled={ocupado}>
              Reintentar
            </button>
          </div>
        )}

        <div style={{ height: 28 }} />
        <h3>Ruta</h3>
        {paradas.map((p) => {
          const cuantos = envios.filter((e) => e.parada_id === p.id).length
          return (
            <div key={p.id} className="pieza">
              <div className="cuerpo">
                <div className="nombre">
                  {p.orden}. {p.muelle}
                </div>
                <div className="ej">
                  {cuantos} envío{cuantos === 1 ? '' : 's'} · {p.estado}
                </div>
              </div>
              {viaje.estado === 'en_navegacion' && p.estado === 'pendiente' && (
                <button
                  className="chico ambar"
                  style={{ flex: '0 0 auto' }}
                  disabled={ocupado}
                  onClick={() => llegarA(p)}
                >
                  Llegué
                </button>
              )}
              {p.estado === 'descargando' && (
                <button
                  className="chico"
                  style={{ flex: '0 0 auto' }}
                  disabled={ocupado}
                  onClick={() => completarParada(p)}
                >
                  Zarpar
                </button>
              )}
            </div>
          )
        })}

        <div style={{ height: 28 }} />
        <h3>Carga a bordo ({envios.length})</h3>
        <p className="mini" style={{ marginBottom: 14 }}>
          Ordenada por muelle de la ruta.
        </p>

        {!envios.length && <Vacio>Sin carga reservada todavía.</Vacio>}

        {envios
          .slice()
          .sort((a, b) => (a.paradas?.orden ?? 0) - (b.paradas?.orden ?? 0))
          .map((e) => (
            <FilaEnvio key={e.id} envio={e} onCambio={cargar} />
          ))}
      </main>
    </>
  )
}

function FilaEnvio({ envio, onCambio }) {
  const [abierto, setAbierto] = useState(false)
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState(null)
  const [verificando, setVerificando] = useState(false)
  const [foto, setFoto] = useState(null)
  const [paso, setPaso] = useState(null)

  // La comparacion del codigo NO se hace aqui. Se manda al servidor,
  // que es el unico que conoce el token y el unico autorizado a
  // marcar el envio como entregado.
  // Foto de la entrega. Es opcional a proposito: si el celular no
  // tiene camara, si el capitan la cancela o si esta lloviendo, la
  // entrega se cierra igual. Lo que manda es el codigo de retiro.
  async function tomarFoto() {
    setError(null)
    const f = await fotoDeEntrega()
    if (!f) return
    setFoto(f)
    vibrar('suave')
  }

  async function entregar() {
    setVerificando(true)
    setError(null)

    // La ubicacion se pide antes de cerrar la entrega, pero nunca
    // la bloquea: si el GPS no responde, se entrega sin ella.
    setPaso('Ubicando el muelle…')
    const lugar = await ubicacionActual()

    // La foto se sube antes de marcar entregado. Si la subida falla,
    // se cierra la entrega igual: no se le puede negar la mercancia
    // a alguien que ya dicto su codigo porque no hubo senal.
    let rutaFoto = null
    if (foto) {
      setPaso('Subiendo la foto…')
      try {
        const bytes = Uint8Array.from(atob(foto.base64), (c) => c.charCodeAt(0))
        const ruta = `${envio.id}/${Date.now()}.jpg`
        const { error: eSubida } = await supabase.storage
          .from('entregas')
          .upload(ruta, bytes, { contentType: 'image/jpeg', upsert: false })
        if (!eSubida) rutaFoto = ruta
      } catch {
        /* se sigue sin foto */
      }
    }

    setPaso('Verificando el código…')
    const { data, error: err } = await consultar(
      supabase.rpc('entregar_envio', {
        p_envio_id: envio.id,
        p_token: codigo.trim(),
        p_foto: rutaFoto,
        p_lat: lugar?.lat ?? null,
        p_lng: lugar?.lng ?? null,
      })
    )

    setVerificando(false)
    setPaso(null)

    if (err) return setError(err)
    if (!data?.ok) return setError(data?.motivo ?? 'No se pudo cerrar la entrega.')

    vibrar('fuerte')
    setCodigo('')
    setFoto(null)
    setAbierto(false)
    onCambio()
  }

  const est = ESTADOS_ENVIO[envio.estado] ?? { texto: envio.estado, color: 'gris' }

  return (
    <div className="bloque">
      <div className="entre">
        <strong style={{ fontSize: 17 }}>{envio.destinatario_nombre}</strong>
        <span className={'etiqueta ' + est.color}>{est.texto}</span>
      </div>
      <div className="mini" style={{ marginTop: 4 }}>
        {envio.paradas?.muelle} · {envio.kg_cobrables} kg cobrables
      </div>

      <div style={{ height: 12 }} />
      <div className="desglose">
        {envio.envio_items?.map((i) => (
          <div key={i.id}>
            <span className="clave">
              {TIPOS_CAJA.find((t) => t.id === i.tipo_caja)?.etiqueta ?? i.tipo_caja}
            </span>
            <span className="valor">× {i.cantidad}</span>
          </div>
        ))}
      </div>

      {envio.fragil && (
        <div className="aviso">
          <strong>Carga frágil:</strong> acomodar encima, nunca debajo.
        </div>
      )}

      <hr className="separador" />
      <div className="entre">
        <span style={{ fontSize: 18, fontWeight: 700 }}>{pesos(envio.valor)}</span>
        {envio.pago === 'destino' ? (
          <span className="etiqueta roja">POR COBRAR</span>
        ) : (
          <span className="etiqueta verde">YA PAGADO</span>
        )}
      </div>

      {envio.estado !== 'entregado' && envio.estado !== 'cancelado' && (
        <>
          <div style={{ height: 14 }} />
          {!abierto ? (
            <button className="secundario" onClick={() => setAbierto(true)}>
              Entregar mercancía
            </button>
          ) : (
            <>
              <label>Código de retiro que le dicta quien recibe</label>
              <input
                inputMode="numeric"
                maxLength={4}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                placeholder="0000"
                style={{ letterSpacing: 8, fontWeight: 700, fontSize: 20, textAlign: 'center' }}
              />

              {/* La foto es opcional. Sirve de respaldo del capitan si
                  despues alguien reclama que nunca le entregaron. */}
              {esNativo && (
                <>
                  {foto ? (
                    <>
                      <img
                        className="foto-entrega"
                        alt="Foto de la entrega"
                        src={'data:image/jpeg;base64,' + foto.base64}
                      />
                      <button className="secundario" onClick={() => setFoto(null)}>
                        Quitar la foto
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ height: 14 }} />
                      <button className="secundario" onClick={tomarFoto}>
                        📷 Tomar foto de la entrega
                      </button>
                      <div className="mini" style={{ marginTop: 6 }}>
                        Opcional. Le queda como respaldo si después alguien reclama.
                      </div>
                    </>
                  )}
                </>
              )}

              {error && <div className="aviso critico">{error}</div>}
              <div style={{ height: 12 }} />
              <button
                className="cta"
                onClick={entregar}
                disabled={verificando || codigo.trim().length !== 4}
              >
                {verificando ? (paso ?? 'Verificando…') : 'Confirmar entrega'}
              </button>
              <div style={{ height: 8 }} />
              <button
                className="secundario"
                onClick={() => setAbierto(false)}
                disabled={verificando}
              >
                Cancelar
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}
