import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import {
  TIPOS_CAJA,
  kilosCobrables,
  volumenEquivalente,
  calcularValor,
  generarToken,
  generarCodigoPublico,
  pesos,
  fecha,
} from '../lib/carga.js'

export default function NuevoEnvio({ perfil }) {
  const navegar = useNavigate()
  const [paso, setPaso] = useState(1)
  const [viajes, setViajes] = useState([])
  const [cargando, setCargando] = useState(true)

  // Paso 1: inventario. Nunca se piden dimensiones (regla 4.11).
  const [cantidades, setCantidades] = useState({})
  const [peso, setPeso] = useState('')
  const [fragil, setFragil] = useState(false)

  // Paso 2: barco y muelle
  const [viajeId, setViajeId] = useState(null)
  const [paradaId, setParadaId] = useState(null)

  // Paso 3: destinatario y pago
  const [destNombre, setDestNombre] = useState('')
  const [destTel, setDestTel] = useState('')
  const [destTel2, setDestTel2] = useState('')
  const [pago, setPago] = useState('origen')

  const [error, setError] = useState(null)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    supabase
      .from('viajes')
      .select('*, embarcaciones(nombre), paradas(id, muelle, orden)')
      .eq('estado', 'programado')
      .gte('fecha_salida', new Date().toISOString())
      .order('fecha_salida')
      .then(({ data }) => {
        setViajes(data ?? [])
        setCargando(false)
      })
  }, [])

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
  const valor = viaje ? calcularValor(viaje, kgCobrables) : 0

  function sumar(id, delta) {
    setCantidades((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }))
  }

  async function guardar() {
    if (destTel.trim() !== destTel2.trim()) {
      return setError('Los dos numeros del destinatario no coinciden. Revise bien.')
    }
    setGuardando(true)
    setError(null)

    const token = generarToken()
    const codigo = generarCodigoPublico()

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
        token,
        codigo_publico: codigo,
      })
      .select()
      .single()

    if (e1) {
      setGuardando(false)
      return setError(e1.message)
    }

    await supabase
      .from('envio_items')
      .insert(items.map((i) => ({ ...i, envio_id: envio.id })))

    await supabase.from('eventos').insert({
      envio_id: envio.id,
      viaje_id: viajeId,
      tipo: 'registro',
      mensaje: 'Envio registrado y cupo reservado en la embarcacion.',
    })

    setGuardando(false)
    navegar('/mis-envios')
  }

  if (cargando) return <div className="vacio">Buscando barcos…</div>

  // ---------- PASO 1 ----------
  if (paso === 1)
    return (
      <div className="tarjeta">
        <h2>Que va a enviar?</h2>
        <p className="sub">Elija el tipo de caja y la cantidad. No hay que medir nada.</p>

        {TIPOS_CAJA.map((t) => (
          <div key={t.id} className="pieza">
            <div style={{ fontSize: 26 }}>{t.icono}</div>
            <div className="info">
              <div className="nombre">{t.etiqueta}</div>
              <div className="ej">{t.ejemplo}</div>
            </div>
            <div className="contador">
              <button className="secundario" onClick={() => sumar(t.id, -1)}>
                −
              </button>
              <span>{cantidades[t.id] ?? 0}</span>
              <button className="secundario" onClick={() => sumar(t.id, 1)}>
                +
              </button>
            </div>
          </div>
        ))}

        <label>Peso bruto total de todo (kg)</label>
        <input
          type="number"
          min="1"
          inputMode="decimal"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="150"
        />

        <label style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 18 }}>
          <input
            type="checkbox"
            style={{ width: 22, height: 22 }}
            checked={fragil}
            onChange={(e) => setFragil(e.target.checked)}
          />
          Mercancia fragil (vidrio, huevos, tecnologia)
        </label>
        <div className="sub" style={{ marginTop: 4 }}>
          Sin costo. Solo avisa al capitan para que la acomode encima.
        </div>

        {items.length > 0 && peso > 0 && (
          <div className="aviso">
            Volumen que ocupa: <strong>{volumen} kg equivalentes</strong>. Se cobra el mayor entre
            el peso y el volumen: <strong>{kgCobrables} kg</strong>.
          </div>
        )}

        {error && <div className="aviso critico">{error}</div>}
        <div style={{ height: 14 }} />
        <button disabled={!items.length || !peso} onClick={() => setPaso(2)}>
          Buscar barcos
        </button>
      </div>
    )

  // ---------- PASO 2 ----------
  if (paso === 2)
    return (
      <>
        <div className="tarjeta">
          <h2>Barcos disponibles</h2>
          <p className="sub">Su carga: {kgCobrables} kg cobrables.</p>
        </div>

        {!viajes.length && (
          <div className="vacio">No hay viajes programados. Vuelva mas tarde.</div>
        )}

        {viajes.map((v) =>
          v.paradas
            .slice()
            .sort((a, b) => a.orden - b.orden)
            .map((p) => (
              <div
                key={v.id + p.id}
                className="tarjeta"
                style={{
                  borderColor: paradaId === p.id ? 'var(--verde)' : 'var(--borde)',
                  borderWidth: paradaId === p.id ? 2 : 1,
                }}
                onClick={() => {
                  setViajeId(v.id)
                  setParadaId(p.id)
                }}
              >
                <div className="entre">
                  <h3>🚢 {v.embarcaciones?.nombre}</h3>
                  <strong>{pesos(calcularValor(v, kgCobrables))}</strong>
                </div>
                <div className="sub" style={{ margin: 0 }}>
                  Hasta <strong>{p.muelle}</strong> · sale {fecha(v.fecha_salida)}
                </div>
              </div>
            ))
        )}

        <div className="fila">
          <button className="secundario" onClick={() => setPaso(1)}>
            Atras
          </button>
          <button disabled={!paradaId} onClick={() => setPaso(3)}>
            Continuar
          </button>
        </div>
      </>
    )

  // ---------- PASO 3 ----------
  return (
    <>
      <div className="tarjeta">
        <h2>Quien recibe?</h2>
        <p className="sub">
          A este numero le llega el codigo de retiro. Si se equivoca, la mercancia se la
          entregan a otra persona.
        </p>

        <label>Nombre de quien recibe</label>
        <input required value={destNombre} onChange={(e) => setDestNombre(e.target.value)} />

        <label>Numero de celular</label>
        <input
          required
          inputMode="tel"
          value={destTel}
          onChange={(e) => setDestTel(e.target.value)}
          placeholder="3XX XXX XXXX"
        />

        <label>Confirme el numero</label>
        <input
          required
          inputMode="tel"
          value={destTel2}
          onChange={(e) => setDestTel2(e.target.value)}
          placeholder="Escribalo otra vez"
        />

        <label>Quien paga el flete?</label>
        <select value={pago} onChange={(e) => setPago(e.target.value)}>
          <option value="origen">Pago en origen (pago yo aqui en Leticia)</option>
          <option value="destino">Pago en destino (contraentrega)</option>
        </select>
      </div>

      <div className="tarjeta">
        <h3>Resumen</h3>
        <div className="desglose">
          {items.map((i) => (
            <div key={i.tipo_caja}>
              <span>{i.tipo_caja}</span>
              <span>x {i.cantidad}</span>
            </div>
          ))}
          <div>
            <span>Peso declarado</span>
            <span>{peso} kg</span>
          </div>
          <div>
            <span>Volumen equivalente</span>
            <span>{volumen} kg</span>
          </div>
          <div>
            <span>Kilos cobrables</span>
            <strong>{kgCobrables} kg</strong>
          </div>
        </div>
        <div className="linea" />
        <div className="entre">
          <span>Flete fluvial</span>
          <span className="total">{pesos(valor)}</span>
        </div>
        <div className="aviso">
          El pago se hace directo al capitan (efectivo o Nequi). Moti solo conecta las partes y
          no responde por la mercancia.
        </div>

        {error && <div className="aviso critico">{error}</div>}
        <div className="fila">
          <button className="secundario" onClick={() => setPaso(2)}>
            Atras
          </button>
          <button disabled={guardando || !destNombre || !destTel} onClick={guardar}>
            {guardando ? 'Guardando…' : 'Reservar cupo'}
          </button>
        </div>
      </div>
    </>
  )
}
