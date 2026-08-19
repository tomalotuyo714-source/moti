import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { pesos, fecha, ESTADOS_ENVIO } from '../lib/carga.js'

export default function MisEnvios({ perfil }) {
  const [envios, setEnvios] = useState([])
  const [copiado, setCopiado] = useState(null)

  useEffect(() => {
    if (!perfil) return
    supabase
      .from('envios')
      .select('*, paradas(muelle), viajes(fecha_salida, estado, embarcaciones(nombre))')
      .eq('remitente_id', perfil.id)
      .order('creado_en', { ascending: false })
      .then(({ data }) => setEnvios(data ?? []))
  }, [perfil])

  function compartir(envio) {
    const enlace = `${window.location.origin}/rastreo/${envio.codigo_publico}`
    const texto =
      `Le envie una mercancia por Moti.\n\n` +
      `Barco: ${envio.viajes?.embarcaciones?.nombre}\n` +
      `Destino: ${envio.paradas?.muelle}\n` +
      `Codigo: ${envio.codigo_publico}\n\n` +
      `Siga el recorrido y vea su codigo de retiro aqui:\n${enlace}`

    // Se comparte desde el celular del remitente, no desde el servidor.
    // Asi no exponemos la plataforma a inyeccion de numeros (regla 4.35).
    if (navigator.share) {
      navigator.share({ text: texto }).catch(() => {})
    } else {
      navigator.clipboard.writeText(texto)
      setCopiado(envio.id)
      setTimeout(() => setCopiado(null), 2500)
    }
  }

  if (!envios.length) return <div className="vacio">Aun no ha registrado envios.</div>

  return (
    <>
      {envios.map((e) => {
        const est = ESTADOS_ENVIO[e.estado] ?? { texto: e.estado, color: 'gris' }
        return (
          <div key={e.id} className="tarjeta">
            <div className="entre">
              <h3>{e.paradas?.muelle}</h3>
              <span className={'etiqueta ' + est.color}>{est.texto}</span>
            </div>
            <div className="sub" style={{ margin: '2px 0 10px' }}>
              🚢 {e.viajes?.embarcaciones?.nombre} · sale {fecha(e.viajes?.fecha_salida)}
            </div>

            <div className="desglose">
              <div>
                <span>Para</span>
                <strong>{e.destinatario_nombre}</strong>
              </div>
              <div>
                <span>Kilos cobrables</span>
                <span>{e.kg_cobrables} kg</span>
              </div>
              <div>
                <span>Flete</span>
                <strong>{pesos(e.valor)}</strong>
              </div>
              <div>
                <span>Pago</span>
                <span>{e.pago === 'origen' ? 'En origen' : 'Contraentrega'}</span>
              </div>
            </div>

            <div className="linea" />
            <div className="codigo">{e.codigo_publico}</div>
            <div className="sub" style={{ textAlign: 'center', marginTop: 6 }}>
              Comparta este codigo con quien recibe
            </div>
            <div style={{ height: 10 }} />
            <button className="secundario" onClick={() => compartir(e)}>
              {copiado === e.id ? 'Copiado ✓' : 'Compartir por WhatsApp'}
            </button>
          </div>
        )
      })}
    </>
  )
}
