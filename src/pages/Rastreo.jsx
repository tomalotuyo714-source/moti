import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { consultar } from '../lib/red.js'
import Ruta from '../components/Ruta.jsx'
import { Barco } from '../components/Iconos.jsx'
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
  const navegar = useNavigate()
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

    const { data, error: err } = await consultar(
      supabase.rpc('rastrear_envio', {
        p_codigo: codigo.trim().toUpperCase(),
        p_ultimos4: conTelefono ? ultimos4.trim() : null,
      })
    )

    setCargando(false)

    if (err) return setError(err)
    if (!data || !data.length) return setError('No encontramos ningún envío con ese código.')

    setEnvio(data[0])

    const { data: ev } = await consultar(
      supabase.rpc('eventos_publicos', { p_codigo: codigo.trim().toUpperCase() })
    )
    setEventos(ev ?? [])
  }

  useEffect(() => {
    if (codigoUrl) buscar(null, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigoUrl])

  /* ---------------- BUSCADOR ---------------- */
  if (!envio)
    return (
      <>
        <div className="cabecera">
          <h1 className="titulo" style={{ fontSize: 22, fontWeight: 700, marginLeft: 4 }}>
            Moti
          </h1>
        </div>
        <main>
          <h2 className="titulo-grande">Rastrear un envío</h2>
          <p className="sub">Escriba el código que le compartieron. No necesita cuenta.</p>

          <form onSubmit={buscar}>
            <label>Código del envío</label>
            <input
              required
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="MTXXXXXX"
              style={{ textTransform: 'uppercase', letterSpacing: 3, fontWeight: 700, fontSize: 20 }}
            />
            {error && <div className="aviso critico">{error}</div>}

            <div className="pie-accion">
              <button className="cta" disabled={cargando}>
                {cargando ? 'Buscando…' : 'Buscar'}
              </button>
            </div>
          </form>
        </main>
      </>
    )

  /* ---------------- RECIBO DEL ENVIO ---------------- */
  const est = ESTADOS_ENVIO[envio.estado] ?? { texto: envio.estado, color: 'gris' }

  return (
    <>
      <div className="cabecera">
        <button
          className="volver"
          aria-label="Buscar otro envío"
          onClick={() => {
            setEnvio(null)
            setEventos([])
            setUltimos4('')
            setError(null)
            if (codigoUrl) navegar('/rastreo')
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5M11 18l-6-6 6-6"
            />
          </svg>
        </button>
        <h1 className="titulo">Su envío</h1>
      </div>

      <main>
        <div className="entre" style={{ marginTop: 6 }}>
          <span className="mini">Código {envio.codigo_publico}</span>
          <span className={'etiqueta ' + est.color}>{est.texto}</span>
        </div>

        <h2 className="titulo-grande">{envio.muelle_destino}</h2>

        {/* El aviso de por cobrar va antes que nada: es la unica
            informacion que le cuesta plata al destinatario ignorar. */}
        {envio.pago === 'destino' && (
          <div className="aviso critico">
            <strong>POR COBRAR:</strong> tenga listos {pesos(envio.valor)} para recibir la
            mercancía.
          </div>
        )}

        <div className="total-grande">
          <span className="rotulo">Total</span>
          <span className="cifra">{pesos(envio.valor)}</span>
        </div>

        <div className="desglose">
          <div>
            <span className="clave">Kilos cobrables</span>
            <span className="valor">{envio.kg_cobrables} kg</span>
          </div>
          {envio.fragil && (
            <div>
              <span className="clave">Manejo</span>
              <span className="valor">Frágil</span>
            </div>
          )}
          <div>
            <span className="clave">Para</span>
            <span className="valor">{envio.destinatario_nombre}</span>
          </div>
        </div>

        <button className="pago-fila" style={{ cursor: 'default' }} disabled>
          <span className="billete">💵</span>
          <span className="etiqueta-pago">
            {envio.pago === 'destino'
              ? 'Efectivo, al recibir la mercancía'
              : 'Ya fue pagado en Leticia'}
          </span>
        </button>

        <div style={{ height: 26 }} />
        <h3>Detalles del envío</h3>

        <div className="operador">
          <span className="icono">
            <Barco size={28} />
          </span>
          <span className="cuerpo">
            <span className="nombre">{envio.embarcacion}</span>
            <div className="papel">Operador independiente</div>
          </span>
        </div>

        <div className="bloque">
          <Ruta
            paradas={[
              { hora: 'Leticia', lugar: 'Salió ' + fecha(envio.fecha_salida) },
              { hora: envio.muelle_destino, lugar: 'Muelle de entrega' },
            ]}
          />
        </div>

        <div style={{ height: 12 }} />
        <h3>Código de retiro</h3>

        {envio.token ? (
          <div className="bloque">
            <div className="token">{envio.token}</div>
            <p className="mini" style={{ textAlign: 'center' }}>
              Díctelo al capitán en el muelle. Sin este código no le pueden entregar la
              mercancía a nadie más.
            </p>
          </div>
        ) : (
          <div className="bloque">
            <p className="sub" style={{ marginBottom: 12 }}>
              Para ver su código, confirme los últimos 4 dígitos del celular al que fue
              registrado este envío.
            </p>
            <input
              inputMode="numeric"
              maxLength={4}
              value={ultimos4}
              onChange={(e) => setUltimos4(e.target.value.replace(/\D/g, ''))}
              placeholder="0000"
              style={{ letterSpacing: 8, fontWeight: 700, fontSize: 20, textAlign: 'center' }}
            />
            {error && <div className="aviso critico">{error}</div>}
            <div style={{ height: 12 }} />
            <button
              className="cta"
              onClick={(e) => buscar(e, true)}
              disabled={ultimos4.length !== 4 || cargando}
            >
              {cargando ? 'Verificando…' : 'Ver mi código'}
            </button>
          </div>
        )}

        <div style={{ height: 14 }} />
        <h3>Recorrido</h3>
        {!eventos.length && <div className="vacio">Sin novedades todavía.</div>}
        {eventos.map((ev, i) => (
          <div key={i} className={'evento' + (i === 0 ? ' ultimo' : '')}>
            <div className="rieles">
              <div className="marca" />
              <div className="cuerda" />
            </div>
            <div className="cuerpo">
              <div>{ev.mensaje}</div>
              <div className="cuando">{fecha(ev.creado_en)}</div>
            </div>
          </div>
        ))}

        <p className="mini" style={{ marginTop: 28, lineHeight: 1.6 }}>
          Moti es una plataforma de intermediación tecnológica: conecta a operadores
          independientes con quienes mueven mercancía. No custodia, no inspecciona y no
          responde por la carga. Las fechas son estimaciones referenciales.
        </p>
      </main>
    </>
  )
}
