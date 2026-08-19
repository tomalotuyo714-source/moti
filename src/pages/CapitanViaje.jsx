import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { fecha, pesos, ESTADOS_ENVIO } from '../lib/carga.js'

/**
 * Manifiesto digital del capitan (regla 4.13).
 * El capitan marca la llegada a cada muelle; eso dispara el aviso
 * a los clientes de esa parada y a los de la siguiente.
 * La entrega solo se cierra con el token del destinatario (regla 4.18).
 */
export default function CapitanViaje() {
  const { id } = useParams()
  const [viaje, setViaje] = useState(null)
  const [paradas, setParadas] = useState([])
  const [envios, setEnvios] = useState([])
  const [mensaje, setMensaje] = useState(null)

  async function cargar() {
    const { data: v } = await supabase
      .from('viajes')
      .select('*, embarcaciones(nombre, capacidad_kg)')
      .eq('id', id)
      .maybeSingle()
    setViaje(v)

    const { data: p } = await supabase
      .from('paradas')
      .select('*')
      .eq('viaje_id', id)
      .order('orden')
    setParadas(p ?? [])

    // Se piden las columnas una por una a proposito: la columna
    // "token" esta revocada en la base de datos y un select * fallaria.
    // El capitan nunca recibe el token; lo valida el servidor.
    const { data: e } = await supabase
      .from('envios')
      .select(
        'id, viaje_id, parada_id, destinatario_nombre, kg_cobrables, fragil, pago, valor, estado, envio_items(id, tipo_caja, cantidad), paradas(muelle, orden)'
      )
      .eq('viaje_id', id)
    setEnvios(e ?? [])
  }

  useEffect(() => {
    cargar()
  }, [id])

  if (!viaje) return <div className="vacio">Cargando…</div>

  const cargados = envios
    .filter((e) => e.estado !== 'cancelado')
    .reduce((t, e) => t + Number(e.kg_cobrables), 0)
  const disponible = Number(viaje.aforo_kg) - cargados

  async function zarpar() {
    await supabase.from('viajes').update({ estado: 'en_navegacion' }).eq('id', id)
    await supabase
      .from('envios')
      .update({ estado: 'en_navegacion' })
      .eq('viaje_id', id)
      .neq('estado', 'cancelado')
    await supabase.from('eventos').insert(
      envios.map((e) => ({
        envio_id: e.id,
        viaje_id: id,
        tipo: 'zarpe',
        mensaje: `La embarcacion ${viaje.embarcaciones?.nombre} zarpo de ${viaje.origen}.`,
      }))
    )
    setMensaje('Viaje marcado como en navegacion. Los clientes ya lo ven.')
    cargar()
  }

  async function llegarA(parada) {
    await supabase
      .from('paradas')
      .update({ estado: 'descargando', hora_llegada: new Date().toISOString() })
      .eq('id', parada.id)

    // Aviso a los clientes de ESTE muelle.
    const deEste = envios.filter((e) => e.parada_id === parada.id && e.estado !== 'entregado')
    if (deEste.length) {
      await supabase.from('envios').update({ estado: 'en_muelle' }).in('id', deEste.map((e) => e.id))
      await supabase.from('eventos').insert(
        deEste.map((e) => ({
          envio_id: e.id,
          viaje_id: id,
          tipo: 'llegada',
          mensaje: `El barco esta descargando en ${parada.muelle} en este momento. Acerquese con su codigo de retiro.`,
        }))
      )
    }

    // Aviso de proximidad a los del muelle siguiente.
    const siguiente = paradas.find((p) => p.orden === parada.orden + 1)
    if (siguiente) {
      const deSiguiente = envios.filter((e) => e.parada_id === siguiente.id)
      if (deSiguiente.length) {
        await supabase.from('eventos').insert(
          deSiguiente.map((e) => ({
            envio_id: e.id,
            viaje_id: id,
            tipo: 'proximidad',
            mensaje: `El barco llego a ${parada.muelle}. Su muelle (${siguiente.muelle}) es el siguiente de la ruta.`,
          }))
        )
      }
    }

    setMensaje(`Llegada a ${parada.muelle} registrada. Se avisó a los clientes.`)
    cargar()
  }

  async function completarParada(parada) {
    await supabase
      .from('paradas')
      .update({ estado: 'completada', hora_salida: new Date().toISOString() })
      .eq('id', parada.id)
    cargar()
  }

  return (
    <>
      <div className="tarjeta">
        <h2>{viaje.embarcaciones?.nombre}</h2>
        <p className="sub">
          Sale {fecha(viaje.fecha_salida)} · {viaje.estado.replace('_', ' ')}
        </p>
        <div className="desglose">
          <div>
            <span>Carga reservada</span>
            <strong>{cargados} kg</strong>
          </div>
          <div>
            <span>Cupo disponible</span>
            <strong style={{ color: disponible <= 0 ? 'var(--alerta)' : 'inherit' }}>
              {disponible} kg
            </strong>
          </div>
        </div>
        {viaje.estado === 'programado' && (
          <>
            <div style={{ height: 12 }} />
            <button onClick={zarpar}>Marcar como zarpado</button>
          </>
        )}
        {mensaje && <div className="aviso">{mensaje}</div>}
      </div>

      <div className="tarjeta">
        <h3>Ruta</h3>
        {paradas.map((p) => {
          const cuantos = envios.filter((e) => e.parada_id === p.id).length
          return (
            <div key={p.id} className="pieza">
              <div className="info">
                <div className="nombre">
                  {p.orden}. {p.muelle}
                </div>
                <div className="ej">
                  {cuantos} envio(s) · {p.estado}
                </div>
              </div>
              {viaje.estado === 'en_navegacion' && p.estado === 'pendiente' && (
                <button className="chico ambar" style={{ flex: '0 0 auto' }} onClick={() => llegarA(p)}>
                  Llegue
                </button>
              )}
              {p.estado === 'descargando' && (
                <button
                  className="chico secundario"
                  style={{ flex: '0 0 auto' }}
                  onClick={() => completarParada(p)}
                >
                  Zarpar
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="tarjeta">
        <h3>Manifiesto ({envios.length})</h3>
        <p className="sub">Ordenado por muelle de la ruta.</p>
        {!envios.length && <div className="vacio">Sin carga reservada todavia.</div>}
        {envios
          .slice()
          .sort((a, b) => (a.paradas?.orden ?? 0) - (b.paradas?.orden ?? 0))
          .map((e) => (
            <FilaEnvio key={e.id} envio={e} onCambio={cargar} />
          ))}
      </div>
    </>
  )
}

function FilaEnvio({ envio, onCambio }) {
  const [abierto, setAbierto] = useState(false)
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState(null)
  const [verificando, setVerificando] = useState(false)

  // La comparacion del codigo NO se hace aqui. Se manda al servidor,
  // que es el unico que conoce el token y el unico autorizado a
  // marcar el envio como entregado.
  async function entregar() {
    setVerificando(true)
    setError(null)

    const { data, error: err } = await supabase.rpc('entregar_envio', {
      p_envio_id: envio.id,
      p_token: codigo.trim(),
    })

    setVerificando(false)

    if (err) return setError(err.message)
    if (!data?.ok) return setError(data?.motivo ?? 'No se pudo cerrar la entrega.')

    setCodigo('')
    setAbierto(false)
    onCambio()
  }

  const est = ESTADOS_ENVIO[envio.estado] ?? { texto: envio.estado, color: 'gris' }

  return (
    <div className="tarjeta" style={{ marginBottom: 10 }}>
      <div className="entre">
        <strong>{envio.destinatario_nombre}</strong>
        <span className={'etiqueta ' + est.color}>{est.texto}</span>
      </div>
      <div className="sub" style={{ margin: '4px 0' }}>
        {envio.paradas?.muelle} · {envio.kg_cobrables} kg cobrables
        {envio.fragil && ' · FRAGIL'}
      </div>

      <div className="desglose">
        {envio.envio_items?.map((i) => (
          <div key={i.id}>
            <span>{i.tipo_caja}</span>
            <span>x {i.cantidad}</span>
          </div>
        ))}
      </div>

      {envio.fragil && <div className="aviso">Carga fragil: acomodar encima, nunca debajo.</div>}

      <div className="linea" />
      <div className="entre">
        <span>{pesos(envio.valor)}</span>
        {envio.pago === 'destino' ? (
          <span className="etiqueta roja">POR COBRAR EN DESTINO</span>
        ) : (
          <span className="etiqueta verde">PAGADO EN ORIGEN</span>
        )}
      </div>

      {envio.estado !== 'entregado' && envio.estado !== 'cancelado' && (
        <>
          <div style={{ height: 10 }} />
          {!abierto ? (
            <button className="secundario" onClick={() => setAbierto(true)}>
              Entregar mercancia
            </button>
          ) : (
            <>
              <label>Codigo de retiro que le dicta el destinatario</label>
              <input
                inputMode="numeric"
                maxLength={4}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="4 digitos"
              />
              {error && <div className="aviso critico">{error}</div>}
              <div style={{ height: 10 }} />
              <button onClick={entregar} disabled={verificando || codigo.trim().length !== 4}>
                {verificando ? 'Verificando…' : 'Confirmar entrega'}
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}
