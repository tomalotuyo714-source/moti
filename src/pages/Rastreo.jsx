import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { pesos, fecha, ESTADOS_ENVIO } from '../lib/carga.js'

/**
 * Pantalla del DESTINATARIO. No necesita cuenta ni descargar nada.
 * Entra con el codigo que le compartio el remitente.
 *
 * El token de retiro NO se muestra con solo tener el link: hay que
 * confirmar los ultimos 4 digitos del celular del destinatario.
 * Asi el codigo no queda expuesto si el enlace se reenvia.
 */
export default function Rastreo() {
  const { codigo: codigoUrl } = useParams()
  const [codigo, setCodigo] = useState(codigoUrl ?? '')
  const [ultimos4, setUltimos4] = useState('')
  const [envio, setEnvio] = useState(null)
  const [eventos, setEventos] = useState([])
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  async function buscar(e, conTelefono = false) {
    e?.preventDefault()
    setCargando(true)
    setError(null)

    const { data, error: err } = await supabase.rpc('rastrear_envio', {
      p_codigo: codigo.trim().toUpperCase(),
      p_ultimos4: conTelefono ? ultimos4.trim() : null,
    })

    setCargando(false)

    if (err) return setError(err.message)
    if (!data || !data.length) return setError('No encontramos ningun envio con ese codigo.')

    setEnvio(data[0])

    const { data: ev } = await supabase.rpc('eventos_publicos', {
      p_codigo: codigo.trim().toUpperCase(),
    })
    setEventos(ev ?? [])
  }

  useEffect(() => {
    if (codigoUrl) buscar(null, false)
  }, [codigoUrl])

  if (!envio)
    return (
      <div className="tarjeta">
        <h2>Rastrear un envio</h2>
        <p className="sub">Escriba el codigo que le compartieron. No necesita cuenta.</p>
        <form onSubmit={buscar}>
          <label>Codigo del envio</label>
          <input
            required
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            placeholder="MTXXXXXX"
            style={{ textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}
          />
          {error && <div className="aviso critico">{error}</div>}
          <div style={{ height: 14 }} />
          <button disabled={cargando}>{cargando ? 'Buscando…' : 'Buscar'}</button>
        </form>
      </div>
    )

  const est = ESTADOS_ENVIO[envio.estado] ?? { texto: envio.estado, color: 'gris' }

  return (
    <>
      <div className="tarjeta">
        <div className="entre">
          <h2>{envio.muelle_destino}</h2>
          <span className={'etiqueta ' + est.color}>{est.texto}</span>
        </div>
        <p className="sub" style={{ margin: '2px 0 12px' }}>
          🚢 {envio.embarcacion} · salida {fecha(envio.fecha_salida)}
        </p>

        <div className="desglose">
          <div>
            <span>Para</span>
            <strong>{envio.destinatario_nombre}</strong>
          </div>
          <div>
            <span>Carga</span>
            <span>
              {envio.kg_cobrables} kg{envio.fragil ? ' · FRAGIL' : ''}
            </span>
          </div>
          <div>
            <span>Flete</span>
            <strong>{pesos(envio.valor)}</strong>
          </div>
        </div>

        {envio.pago === 'destino' && (
          <div className="aviso critico">
            POR COBRAR: tenga listos {pesos(envio.valor)} para recibir la mercancia.
          </div>
        )}
      </div>

      <div className="tarjeta">
        <h3>Codigo de retiro</h3>
        {envio.token ? (
          <>
            <div className="token">{envio.token}</div>
            <p className="sub" style={{ textAlign: 'center' }}>
              Dicteselo al capitan en el muelle. Sin este codigo no le pueden entregar la
              mercancia a nadie mas.
            </p>
          </>
        ) : (
          <>
            <p className="sub">
              Para ver su codigo, confirme los ultimos 4 digitos del celular al que fue
              registrado este envio.
            </p>
            <input
              inputMode="numeric"
              maxLength={4}
              value={ultimos4}
              onChange={(e) => setUltimos4(e.target.value)}
              placeholder="4 digitos"
            />
            <div style={{ height: 10 }} />
            <button onClick={(e) => buscar(e, true)} disabled={ultimos4.length !== 4}>
              Ver mi codigo
            </button>
          </>
        )}
      </div>

      <div className="tarjeta">
        <h3>Recorrido</h3>
        {!eventos.length && <div className="vacio">Sin novedades todavia.</div>}
        {eventos.map((ev, i) => (
          <div key={i} className="evento">
            <div>{ev.mensaje}</div>
            <div className="cuando">{fecha(ev.creado_en)}</div>
          </div>
        ))}
      </div>

      <button
        className="secundario"
        onClick={() => {
          setEnvio(null)
          setEventos([])
          setUltimos4('')
        }}
      >
        Buscar otro envio
      </button>
    </>
  )
}
