import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { consultar } from '../lib/red.js'
import { fecha, pesos } from '../lib/carga.js'
import { Cargando, ErrorRed, Vacio } from '../components/Estado.jsx'
import { Barco, FlechaDerecha } from '../components/Iconos.jsx'

export default function CapitanViajes({ perfil }) {
  const navegar = useNavigate()
  const [barcos, setBarcos] = useState(null) // null = todavia no se sabe
  const [viajes, setViajes] = useState([])
  const [error, setError] = useState(null)
  const [creando, setCreando] = useState(false)

  const cargar = useCallback(async () => {
    if (!perfil) return
    setError(null)

    const r1 = await consultar(
      supabase.from('embarcaciones').select('*').eq('capitan_id', perfil.id)
    )
    // Si esto falla y dejaramos barcos en [], le mostrariamos el
    // formulario de registrar embarcacion a un capitan que ya la tiene.
    if (r1.error) return setError(r1.error)
    setBarcos(r1.data ?? [])

    const r2 = await consultar(
      supabase
        .from('viajes')
        .select('*, embarcaciones(nombre)')
        .eq('capitan_id', perfil.id)
        .order('fecha_salida', { ascending: false })
    )
    if (r2.error) return setError(r2.error)
    setViajes(r2.data ?? [])
  }, [perfil])

  useEffect(() => {
    cargar()
  }, [cargar])

  const cabecera = (
    <div className="cabecera">
      <h1 className="titulo" style={{ fontSize: 22, fontWeight: 700, marginLeft: 4 }}>
        Mis viajes
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

  if (barcos === null)
    return (
      <>
        {cabecera}
        <Cargando />
      </>
    )

  if (!barcos.length) return <NuevaEmbarcacion perfil={perfil} onListo={cargar} />

  return (
    <>
      {cabecera}
      <main>
        <div className="entre" style={{ marginBottom: 16 }}>
          <span className="apagado">
            {viajes.length} viaje{viajes.length === 1 ? '' : 's'}
          </span>
          <button
            className={'chico' + (creando ? '' : ' claro')}
            onClick={() => setCreando(!creando)}
          >
            {creando ? 'Cerrar' : '+ Nuevo viaje'}
          </button>
        </div>

        {creando && (
          <NuevoViaje
            perfil={perfil}
            barcos={barcos}
            onListo={() => {
              setCreando(false)
              cargar()
            }}
          />
        )}

        {!viajes.length && !creando && <Vacio>Aún no ha programado ningún viaje.</Vacio>}

        {viajes.map((v) => (
          <button key={v.id} className="sugerencia" onClick={() => navegar('/viajes/' + v.id)}>
            <span className="icono-redondo">
              <Barco size={20} />
            </span>
            <span className="cuerpo">
              <span className="titulo">{v.embarcaciones?.nombre}</span>
              <span className="pie">
                {fecha(v.fecha_salida)} · {pesos(v.precio_por_kg)}/kg · aforo {v.aforo_kg} kg
              </span>
            </span>
            <span
              className={
                'etiqueta ' + (v.estado === 'en_navegacion' ? 'verde' : 'gris')
              }
              style={{ marginRight: 6 }}
            >
              {v.estado.replace('_', ' ')}
            </span>
            <span className="flecha">
              <FlechaDerecha />
            </span>
          </button>
        ))}
      </main>
    </>
  )
}

/* ------------------------------------------------------------------
   REGISTRO DE LA EMBARCACION
   ------------------------------------------------------------------ */
function NuevaEmbarcacion({ perfil, onListo }) {
  const [nombre, setNombre] = useState('')
  const [matricula, setMatricula] = useState('')
  const [capacidad, setCapacidad] = useState(5000)
  const [error, setError] = useState(null)
  const [guardando, setGuardando] = useState(false)

  async function guardar(e) {
    e.preventDefault()
    setGuardando(true)
    setError(null)
    const { error } = await consultar(
      supabase.from('embarcaciones').insert({
        capitan_id: perfil.id,
        nombre: nombre.trim(),
        matricula: matricula.trim() || null,
        capacidad_kg: Number(capacidad),
      })
    )
    setGuardando(false)
    if (error) setError(error)
    else onListo()
  }

  return (
    <main style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}>
      <h2 className="titulo-grande">Registre su embarcación</h2>
      <p className="sub">Use el nombre con el que la conocen en el río.</p>

      <form onSubmit={guardar}>
        <label>Nombre de la embarcación</label>
        <input
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="El Gran Delfín"
        />

        <label>Matrícula (opcional)</label>
        <input value={matricula} onChange={(e) => setMatricula(e.target.value)} />

        <label>Capacidad máxima de carga (kg)</label>
        <input
          type="number"
          min="1"
          required
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
        />

        {error && <div className="aviso critico">{error}</div>}

        <div className="pie-accion">
          <button className="cta" disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar embarcación'}
          </button>
        </div>
      </form>
    </main>
  )
}

/* ------------------------------------------------------------------
   NUEVO VIAJE
   El capitan define libremente su tarifario (regla 4.9).
   ------------------------------------------------------------------ */
function NuevoViaje({ perfil, barcos, onListo }) {
  const [barco, setBarco] = useState(barcos[0]?.id ?? '')
  const [salida, setSalida] = useState('')
  const [precioKg, setPrecioKg] = useState('')
  const [precioTon, setPrecioTon] = useState('')
  const [aforo, setAforo] = useState(barcos[0]?.capacidad_kg ?? 5000)
  const [muelles, setMuelles] = useState(['Puerto Nariño', 'Tarapacá'])
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  function cambiarMuelle(i, valor) {
    const copia = [...muelles]
    copia[i] = valor
    setMuelles(copia)
  }

  async function guardar(e) {
    e.preventDefault()
    const limpios = muelles.map((m) => m.trim()).filter(Boolean)
    if (!limpios.length) return setError('Agregue al menos un muelle de destino.')

    setCargando(true)
    setError(null)

    const r1 = await consultar(
      supabase
        .from('viajes')
        .insert({
          embarcacion_id: barco,
          capitan_id: perfil.id,
          fecha_salida: new Date(salida).toISOString(),
          aforo_kg: Number(aforo),
          precio_por_kg: Number(precioKg || 0),
          precio_por_tonelada: precioTon ? Number(precioTon) : null,
        })
        .select()
        .single()
    )

    if (r1.error) {
      setCargando(false)
      return setError(r1.error)
    }

    // Las paradas se guardan en el orden geografico de la ruta.
    const r2 = await consultar(
      supabase
        .from('paradas')
        .insert(limpios.map((muelle, i) => ({ viaje_id: r1.data.id, orden: i + 1, muelle })))
    )

    setCargando(false)

    // Un viaje sin paradas no le sirve a nadie: si esto falla, se
    // borra el viaje para no dejar basura a medias en la cartelera.
    if (r2.error) {
      await consultar(supabase.from('viajes').delete().eq('id', r1.data.id))
      return setError('No se pudieron guardar las paradas: ' + r2.error)
    }

    onListo()
  }

  return (
    <div className="bloque">
      <h3>Nuevo viaje</h3>
      <form onSubmit={guardar}>
        <label>Embarcación</label>
        <select value={barco} onChange={(e) => setBarco(e.target.value)}>
          {barcos.map((b) => (
            <option key={b.id} value={b.id}>
              {b.nombre}
            </option>
          ))}
        </select>

        <label>Día y hora de salida</label>
        <input
          type="datetime-local"
          required
          value={salida}
          onChange={(e) => setSalida(e.target.value)}
        />

        <label>Paradas de la ruta (en orden, la más cercana primero)</label>
        {muelles.map((m, i) => (
          <div key={i} className="fila" style={{ marginBottom: 8 }}>
            <input
              value={m}
              onChange={(e) => cambiarMuelle(i, e.target.value)}
              placeholder={'Muelle ' + (i + 1)}
            />
            <button
              type="button"
              className="chico"
              style={{ flex: '0 0 auto' }}
              onClick={() => setMuelles(muelles.filter((_, j) => j !== i))}
            >
              Quitar
            </button>
          </div>
        ))}
        <div style={{ height: 4 }} />
        <button type="button" className="chico" onClick={() => setMuelles([...muelles, ''])}>
          + Agregar parada
        </button>

        <label>Precio por kilo (COP)</label>
        <input
          type="number"
          min="0"
          required
          value={precioKg}
          onChange={(e) => setPrecioKg(e.target.value)}
          placeholder="2000"
        />

        <label>Precio por tonelada (COP, opcional)</label>
        <input
          type="number"
          min="0"
          value={precioTon}
          onChange={(e) => setPrecioTon(e.target.value)}
          placeholder="1500000"
        />
        <div className="mini" style={{ marginTop: 6 }}>
          Si lo llena, se aplica automáticamente cuando la carga pase de 1.000 kg.
        </div>

        <label>Aforo máximo del viaje (kg)</label>
        <input
          type="number"
          min="1"
          required
          value={aforo}
          onChange={(e) => setAforo(e.target.value)}
        />

        {error && <div className="aviso critico">{error}</div>}

        <div style={{ height: 20 }} />
        <button className="cta" disabled={cargando}>
          {cargando ? 'Guardando…' : 'Crear viaje'}
        </button>
      </form>
    </div>
  )
}
