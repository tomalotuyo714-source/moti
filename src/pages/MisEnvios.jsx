import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { consultar } from '../lib/red.js'
import { Cargando, ErrorRed, Vacio } from '../components/Estado.jsx'
import Ruta from '../components/Ruta.jsx'
import { pesos, fecha, ESTADOS_ENVIO } from '../lib/carga.js'
import { compartir as compartirNativo, vibrar } from '../lib/nativo.js'

// Dominio publico del rastreo. Dentro de la app nativa,
// window.location.origin apunta a un esquema interno de Capacitor
// que no le sirve a nadie por fuera.
const SITIO = 'https://moti-zeta.vercel.app'

export default function MisEnvios({ perfil }) {
  const navegar = useNavigate()
  const [envios, setEnvios] = useState(null) // null = todavia no se sabe
  const [error, setError] = useState(null)
  const [copiado, setCopiado] = useState(null)

  const cargar = useCallback(async () => {
    if (!perfil) return
    setError(null)
    const { data, error } = await consultar(
      supabase
        .from('envios')
        // Columnas explicitas: la columna "token" esta revocada en la base
        // de datos y un select * fallaria. El remitente no ve el token.
        .select(
          'id, codigo_publico, estado, destinatario_nombre, kg_cobrables, valor, pago, fragil, creado_en, paradas(muelle), viajes(fecha_salida, estado, embarcaciones(nombre))'
        )
        .eq('remitente_id', perfil.id)
        .order('creado_en', { ascending: false })
    )
    // Un fallo de red no puede verse como "no tiene envios": el
    // remitente pensaria que no quedo nada y reservaria cupo dos veces.
    if (error) return setError(error)
    setEnvios(data ?? [])
  }, [perfil])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function compartir(envio) {
    // Dentro de la app el enlace tiene que apuntar al sitio publico,
    // no al esquema interno de Capacitor: quien recibe abre desde
    // WhatsApp, sin la app instalada.
    const enlace = `${SITIO}/rastreo/${envio.codigo_publico}`
    const texto =
      `Le envié una mercancía por Moti.\n\n` +
      `Barco: ${envio.viajes?.embarcaciones?.nombre}\n` +
      `Destino: ${envio.paradas?.muelle}\n` +
      `Código: ${envio.codigo_publico}\n\n` +
      `Siga el recorrido y vea su código de retiro aquí:\n${enlace}`

    // Se comparte desde el celular del remitente, no desde el servidor.
    // Asi no exponemos la plataforma a inyeccion de numeros (regla 4.35).
    const como = await compartirNativo({ titulo: 'Envío por Moti', texto })
    if (como === 'copiado') {
      setCopiado(envio.id)
      setTimeout(() => setCopiado(null), 2500)
    }
    if (como !== 'nada') vibrar('suave')
  }

  const cabecera = (
    <div className="cabecera">
      <h1 className="titulo" style={{ fontSize: 22, fontWeight: 700, marginLeft: 4 }}>
        Actividad
      </h1>
    </div>
  )

  if (error)
    return (
      <>
        {cabecera}
        <main>
          <ErrorRed mensaje={error} onReintentar={cargar} />
        </main>
      </>
    )

  if (envios === null)
    return (
      <>
        {cabecera}
        <Cargando />
      </>
    )

  if (!envios.length)
    return (
      <>
        {cabecera}
        <main>
          <Vacio>Aún no ha registrado envíos.</Vacio>
          <button className="cta" onClick={() => navegar('/enviar')}>
            Enviar carga
          </button>
        </main>
      </>
    )

  return (
    <>
      {cabecera}
      <main>
        {envios.map((e) => {
          const est = ESTADOS_ENVIO[e.estado] ?? { texto: e.estado, color: 'gris' }
          return (
            <div key={e.id} className="bloque">
              <div className="entre" style={{ marginBottom: 14 }}>
                <span className={'etiqueta ' + est.color}>{est.texto}</span>
                <strong style={{ fontSize: 18 }}>{pesos(e.valor)}</strong>
              </div>

              <Ruta
                compacta
                paradas={[
                  { hora: 'Leticia', lugar: fecha(e.viajes?.fecha_salida) },
                  { hora: e.paradas?.muelle, lugar: e.viajes?.embarcaciones?.nombre },
                ]}
              />

              <hr className="separador" />

              <div className="desglose">
                <div>
                  <span className="clave">Recibe</span>
                  <span className="valor">{e.destinatario_nombre}</span>
                </div>
                <div>
                  <span className="clave">Kilos cobrables</span>
                  <span className="valor">
                    {e.kg_cobrables} kg{e.fragil ? ' · frágil' : ''}
                  </span>
                </div>
                <div>
                  <span className="clave">Pago</span>
                  <span className="valor">
                    {e.pago === 'origen' ? 'Pagado en Leticia' : 'Contraentrega'}
                  </span>
                </div>
              </div>

              <div style={{ height: 14 }} />
              <div className="codigo">{e.codigo_publico}</div>
              <div className="mini" style={{ textAlign: 'center', marginTop: 8 }}>
                Comparta este código con quien recibe
              </div>

              <div style={{ height: 14 }} />
              <button className="cta" onClick={() => compartir(e)}>
                {copiado === e.id ? 'Copiado ✓' : 'Compartir enlace'}
              </button>
              <div style={{ height: 8 }} />
              <button
                className="secundario"
                onClick={() => navegar('/rastreo/' + e.codigo_publico)}
              >
                Ver recorrido
              </button>
            </div>
          )
        })}
      </main>
    </>
  )
}
