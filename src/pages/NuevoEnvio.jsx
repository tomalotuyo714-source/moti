import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { consultar, mensajeError } from '../lib/red.js'
import { Cargando, ErrorRed } from '../components/Estado.jsx'
import Cabecera from '../components/Cabecera.jsx'
import Ruta from '../components/Ruta.jsx'
import { FlechaDerecha } from '../components/Iconos.jsx'
import {
  TIPOS_CAJA,
  kilosCobrables,
  volumenEquivalente,
  calcularValor,
  pesos,
  fecha,
} from '../lib/carga.js'

export default function NuevoEnvio({ perfil }) {
  const navegar = useNavigate()
  const [paso, setPaso] = useState(1)
  const [viajes, setViajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(null)

  // Paso 1: inventario. Nunca se piden dimensiones (regla 4.11).
  const [cantidades, setCantidades] = useState({})
  const [peso, setPeso] = useState('')
  const [fragil, setFragil] = useState(false)

  // Paso 2: barco, muelle y quien paga
  const [viajeId, setViajeId] = useState(null)
  const [paradaId, setParadaId] = useState(null)
  const [pago, setPago] = useState('origen')
  const [abrirPago, setAbrirPago] = useState(false)

  // Paso 3: destinatario
  const [destNombre, setDestNombre] = useState('')
  const [destTel, setDestTel] = useState('')
  const [destTel2, setDestTel2] = useState('')

  const [error, setError] = useState(null)
  const [guardando, setGuardando] = useState(false)

  const cargarViajes = useCallback(async () => {
    setCargando(true)
    setErrorCarga(null)
    const { data, error } = await consultar(
      supabase
        .from('viajes')
        .select('*, embarcaciones(nombre), paradas(id, muelle, orden)')
        .eq('estado', 'programado')
        .gte('fecha_salida', new Date().toISOString())
        .order('fecha_salida')
    )
    setCargando(false)
    // Si falla, no se muestra "no hay barcos": eso haria creer que
    // nadie viaja esta semana cuando lo que fallo fue la senal.
    if (error) return setErrorCarga(error)
    setViajes(data ?? [])
  }, [])

  useEffect(() => {
    cargarViajes()
  }, [cargarViajes])

  const items = useMemo(
    () =>
      Object.entries(cantidades)
        .filter(([, c]) => c > 0)
        .map(([tipo_caja, cantidad]) => ({ tipo_caja, cantidad })),
    [cantidades]
  )

  const volumen = volumenEquivalente(items)
  const kgCobrables = kilosCobrables(peso, items)
  const viaje = viajes.find((v) => v.id === viajeId)
  const parada = viaje?.paradas?.find((p) => p.id === paradaId)
  const valor = viaje ? calcularValor(viaje, kgCobrables) : 0

  function sumar(id, delta) {
    setCantidades((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }))
  }

  async function guardar() {
    if (destTel.trim() !== destTel2.trim()) {
      return setError('Los dos números del destinatario no coinciden. Revise bien.')
    }
    setGuardando(true)
    setError(null)

    // El token de retiro y el codigo publico los pone el servidor.
    // Aqui no se mandan y no se piden de vuelta: el remitente no
    // debe ver nunca el token del destinatario.
    const { data: envio, error: e1 } = await supabase
      .from('envios')
      .insert({
        viaje_id: viajeId,
        parada_id: paradaId,
        remitente_id: perfil.id,
        destinatario_nombre: destNombre.trim(),
        destinatario_telefono: destTel.trim(),
        peso_declarado_kg: Number(peso),
        volumen_equivalente_kg: volumen,
        kg_cobrables: kgCobrables,
        fragil,
        pago,
        valor,
      })
      .select('id, codigo_publico')
      .single()

    if (e1) {
      setGuardando(false)
      return setError(mensajeError(e1))
    }

    // Un envio sin cajas no le sirve al capitan: veria un manifiesto
    // vacio en el muelle. Si esto falla, se deshace el envio completo
    // en vez de dejarlo a medias sin que el remitente se entere.
    const rItems = await consultar(
      supabase.from('envio_items').insert(items.map((i) => ({ ...i, envio_id: envio.id })))
    )
    if (rItems.error) {
      await consultar(supabase.from('envios').delete().eq('id', envio.id))
      setGuardando(false)
      return setError('No se pudo registrar la carga: ' + rItems.error + ' Intente de nuevo.')
    }

    // El evento inicial es solo bitacora: si falla, no se pierde nada
    // importante y no vale la pena deshacer un envio ya reservado.
    await consultar(
      supabase.from('eventos').insert({
        envio_id: envio.id,
        viaje_id: viajeId,
        tipo: 'registro',
        mensaje: 'Envío registrado y cupo reservado en la embarcación.',
      })
    )

    setGuardando(false)
    navegar('/mis-envios')
  }

  if (errorCarga)
    return (
      <>
        <Cabecera atras={() => navegar('/')} />
        <main>
          <ErrorRed mensaje={errorCarga} onReintentar={cargarViajes} />
        </main>
      </>
    )

  if (cargando)
    return (
      <>
        <Cabecera atras={() => navegar('/')} />
        <Cargando texto="Buscando barcos…" />
      </>
    )

  /* ---------------------------------------------------------------
     PASO 1 — QUE VA A ENVIAR
     Nunca se piden dimensiones: se eligen cajas con un dibujo.
     --------------------------------------------------------------- */
  if (paso === 1)
    return (
      <>
        <Cabecera atras={() => navegar('/')} />
        <main>
          <h2 className="titulo-grande">¿Qué va a enviar?</h2>
          <p className="sub">Elija el tipo de caja y la cantidad. No hay que medir nada.</p>

          {TIPOS_CAJA.map((t) => {
            const n = cantidades[t.id] ?? 0
            return (
              <div key={t.id} className="pieza">
                <div className="figura">{t.icono}</div>
                <div className="cuerpo">
                  <div className="nombre">{t.etiqueta}</div>
                  <div className="ej">{t.ejemplo}</div>
                </div>
                <div className="contador">
                  <button
                    aria-label={'Quitar una ' + t.etiqueta}
                    disabled={n === 0}
                    onClick={() => sumar(t.id, -1)}
                  >
                    −
                  </button>
                  <span className="valor">{n}</span>
                  <button aria-label={'Agregar una ' + t.etiqueta} onClick={() => sumar(t.id, 1)}>
                    +
                  </button>
                </div>
              </div>
            )
          })}

          <label>Peso bruto total de todo (kg)</label>
          <input
            type="number"
            min="1"
            inputMode="decimal"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="150"
          />

          <div style={{ height: 18 }} />
          <label className="casilla" style={{ margin: 0 }}>
            <input
              type="checkbox"
              checked={fragil}
              onChange={(e) => setFragil(e.target.checked)}
            />
            Mercancía frágil (vidrio, huevos, tecnología)
          </label>
          <div className="mini" style={{ marginLeft: 36 }}>
            Sin costo. Solo avisa al capitán para que la acomode encima.
          </div>

          {items.length > 0 && peso > 0 && (
            <div className="aviso">
              Su carga ocupa el espacio de <strong>{volumen} kg</strong>. Se cobra el mayor
              entre el peso y el volumen: <strong>{kgCobrables} kg</strong>.
            </div>
          )}

          {error && <div className="aviso critico">{error}</div>}

          <div className="pie-accion">
            <button className="cta" disabled={!items.length || !peso} onClick={() => setPaso(2)}>
              Buscar barcos
            </button>
          </div>
        </main>
      </>
    )

  /* ---------------------------------------------------------------
     PASO 2 — ELEGIR BARCO Y MUELLE
     Una fila por barco y muelle, con el precio a la derecha. La
     escogida se marca con borde, sin colores de relleno.
     --------------------------------------------------------------- */
  if (paso === 2) {
    const opciones = viajes.flatMap((v) =>
      (v.paradas ?? [])
        .slice()
        .sort((a, b) => a.orden - b.orden)
        .map((p) => ({ viaje: v, parada: p }))
    )

    return (
      <>
        <Cabecera atras={() => setPaso(1)} titulo={'Leticia  ›  ' + (parada?.muelle ?? 'elija el muelle')} />
        <main>
          <h2 className="titulo-grande">Elegir barco</h2>
          <p className="sub">
            Su carga: {kgCobrables} kg cobrables{fragil ? ' · frágil' : ''}. Cada capitán pone
            su propio precio.
          </p>

          {!opciones.length && (
            <div className="vacio">
              No hay viajes programados en este momento.
              <br />
              Vuelva más tarde o pregunte en el muelle.
            </div>
          )}

          {opciones.map(({ viaje: v, parada: p }) => {
            const activa = paradaId === p.id
            return (
              <button
                key={v.id + p.id}
                className={'opcion' + (activa ? ' activa' : '')}
                aria-pressed={activa}
                onClick={() => {
                  setViajeId(v.id)
                  setParadaId(p.id)
                }}
              >
                <span className="figura">🚢</span>
                <span className="cuerpo">
                  <span className="nombre">{v.embarcaciones?.nombre}</span>
                  <span className="detalle">Hasta {p.muelle}</span>
                  <span className="nota">Sale {fecha(v.fecha_salida)}</span>
                </span>
                <span className="precio">{pesos(calcularValor(v, kgCobrables))}</span>
              </button>
            )
          })}

          {opciones.length > 0 && (
            <>
              <button className="pago-fila" onClick={() => setAbrirPago(!abrirPago)}>
                <span className="billete">💵</span>
                <span className="etiqueta-pago">
                  {pago === 'origen' ? 'Pago yo, aquí en Leticia' : 'Paga quien recibe'}
                </span>
                <span className="flecha">
                  <FlechaDerecha />
                </span>
              </button>

              {abrirPago && (
                <div className="segmentos" style={{ marginTop: 4 }}>
                  <button
                    className={pago === 'origen' ? 'activo' : undefined}
                    onClick={() => {
                      setPago('origen')
                      setAbrirPago(false)
                    }}
                  >
                    Pago yo aquí
                  </button>
                  <button
                    className={pago === 'destino' ? 'activo' : undefined}
                    onClick={() => {
                      setPago('destino')
                      setAbrirPago(false)
                    }}
                  >
                    Contraentrega
                  </button>
                </div>
              )}

              <div className="mini" style={{ marginTop: 10 }}>
                El pago va directo al capitán, en efectivo o Nequi. Moti no recibe ese dinero
                ni lo retiene.
              </div>
            </>
          )}

          <div className="pie-accion">
            <button className="cta" disabled={!paradaId} onClick={() => setPaso(3)}>
              {viaje ? 'Elegir ' + viaje.embarcaciones?.nombre : 'Elegir barco'}
            </button>
          </div>
        </main>
      </>
    )
  }

  /* ---------------------------------------------------------------
     PASO 3 — QUIEN RECIBE Y CONFIRMACION
     --------------------------------------------------------------- */
  return (
    <>
      <Cabecera atras={() => setPaso(2)} titulo="Confirmar envío" />
      <main>
        <div className="bloque">
          <Ruta
            paradas={[
              { hora: 'Leticia', lugar: 'Sale ' + fecha(viaje?.fecha_salida) },
              { hora: parada?.muelle, lugar: viaje?.embarcaciones?.nombre },
            ]}
          />
        </div>

        <h2 className="titulo-grande" style={{ fontSize: 26 }}>
          ¿Quién recibe?
        </h2>
        <p className="sub">
          A esta persona le llega el código de retiro. Si el número queda mal, la mercancía
          se la entregan a otro.
        </p>

        <label>Nombre de quien recibe</label>
        <input required value={destNombre} onChange={(e) => setDestNombre(e.target.value)} />

        <label>Número de celular</label>
        <input
          required
          inputMode="tel"
          value={destTel}
          onChange={(e) => setDestTel(e.target.value)}
          placeholder="3XX XXX XXXX"
        />

        <label>Confirme el número</label>
        <input
          required
          inputMode="tel"
          value={destTel2}
          onChange={(e) => setDestTel2(e.target.value)}
          placeholder="Escríbalo otra vez"
        />

        <div style={{ height: 28 }} />

        <div className="total-grande">
          <span className="rotulo">Total</span>
          <span className="cifra">{pesos(valor)}</span>
        </div>

        <div className="desglose">
          {items.map((i) => (
            <div key={i.tipo_caja}>
              <span className="clave">{TIPOS_CAJA.find((t) => t.id === i.tipo_caja)?.etiqueta}</span>
              <span className="valor">× {i.cantidad}</span>
            </div>
          ))}
          <div>
            <span className="clave">Peso declarado</span>
            <span className="valor">{peso} kg</span>
          </div>
          <div>
            <span className="clave">Espacio que ocupa</span>
            <span className="valor">{volumen} kg</span>
          </div>
          <div>
            <span className="clave">Kilos cobrables</span>
            <span className="valor fuerte">{kgCobrables} kg</span>
          </div>
          <div>
            <span className="clave">Precio del capitán</span>
            <span className="valor">{pesos(viaje?.precio_por_kg)} por kilo</span>
          </div>
        </div>

        <button className="pago-fila" onClick={() => setPaso(2)}>
          <span className="billete">💵</span>
          <span className="etiqueta-pago">
            {pago === 'origen' ? 'Pago yo, aquí en Leticia' : 'Paga quien recibe'}
          </span>
          <span className="flecha">
            <FlechaDerecha />
          </span>
        </button>

        <div className="aviso">
          El pago se hace directo al capitán. Moti solo conecta las partes: no custodia, no
          inspecciona y no responde por la mercancía. La fecha de llegada es una estimación
          referencial y depende del nivel del río.
        </div>

        {error && <div className="aviso critico">{error}</div>}

        <div className="pie-accion">
          <button
            className="cta"
            disabled={guardando || !destNombre || !destTel || !destTel2}
            onClick={guardar}
          >
            {guardando ? 'Guardando…' : 'Reservar cupo'}
          </button>
        </div>
      </main>
    </>
  )
}
