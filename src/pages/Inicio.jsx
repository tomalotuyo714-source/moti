import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { consultar } from '../lib/red.js'
import { Cargando, ErrorRed } from '../components/Estado.jsx'
import { Lupa, Reloj, FlechaDerecha, Barco } from '../components/Iconos.jsx'
import { fecha, ESTADOS_ENVIO } from '../lib/carga.js'

export default function Inicio({ perfil, onPerfil, sesion, error, cargando, onReintentar }) {
  // Un fallo de red no puede disfrazarse de "usuario nuevo": si se
  // mostrara el formulario de perfil, el usuario lo llenaria otra vez
  // y el insert fallaria por clave duplicada.
  if (error) return <ErrorRed mensaje={error} onReintentar={onReintentar} />
  if (cargando) return <Cargando />
  if (!perfil) return <CrearPerfil sesion={sesion} onPerfil={onPerfil} />

  return perfil.rol === 'capitan' ? <InicioCapitan perfil={perfil} /> : <InicioRemitente perfil={perfil} />
}

/* ------------------------------------------------------------------
   INICIO DEL COMERCIANTE
   Una sola pregunta arriba, atajos abajo y el historial reciente.
   ------------------------------------------------------------------ */
function InicioRemitente({ perfil }) {
  const navegar = useNavigate()
  const [recientes, setRecientes] = useState(null)

  const cargar = useCallback(async () => {
    const { data, error } = await consultar(
      supabase
        .from('envios')
        .select('id, codigo_publico, estado, creado_en, paradas(muelle)')
        .eq('remitente_id', perfil.id)
        .order('creado_en', { ascending: false })
        .limit(3)
    )
    // Si falla, se deja en lista vacia y ya: es un atajo de cortesia,
    // no un dato del que dependa una decision. El error de verdad se
    // muestra en la pantalla de Actividad.
    if (error) return setRecientes([])
    setRecientes(data ?? [])
  }, [perfil.id])

  useEffect(() => {
    cargar()
  }, [cargar])

  return (
    <>
      <div className="cabecera" style={{ justifyContent: 'space-between' }}>
        <h1 className="titulo" style={{ fontSize: 22, fontWeight: 700 }}>
          Moti
        </h1>
        <span className="mini">{perfil.nombre}</span>
      </div>

      <main>
        <button className="buscador" onClick={() => navegar('/enviar')}>
          <Lupa />
          <span>¿A dónde va su carga?</span>
        </button>

        <div style={{ height: 22 }} />
        <h3>Para usted</h3>
        <div className="atajos">
          <button className="atajo" onClick={() => navegar('/enviar')}>
            <span className="circulo">📦</span>
            <span className="nombre">Enviar carga</span>
          </button>
          <button className="atajo" onClick={() => navegar('/rastreo')}>
            <span className="circulo">🔎</span>
            <span className="nombre">Rastrear</span>
          </button>
          <button className="atajo" onClick={() => navegar('/mis-envios')}>
            <span className="circulo">🧾</span>
            <span className="nombre">Mis envíos</span>
          </button>
        </div>

        {recientes === null && <Cargando texto="Buscando sus envíos…" />}

        {recientes !== null && recientes.length > 0 && (
          <>
            <div style={{ height: 22 }} />
            <h3>Recientes</h3>
            {recientes.map((e) => {
              const est = ESTADOS_ENVIO[e.estado] ?? { texto: e.estado }
              return (
                <button
                  key={e.id}
                  className="sugerencia"
                  onClick={() => navegar('/rastreo/' + e.codigo_publico)}
                >
                  <span className="icono-redondo">
                    <Reloj />
                  </span>
                  <span className="cuerpo">
                    <span className="titulo">{e.paradas?.muelle ?? 'Envío'}</span>
                    <span className="pie">
                      {est.texto} · {fecha(e.creado_en)}
                    </span>
                  </span>
                  <span className="flecha">
                    <FlechaDerecha />
                  </span>
                </button>
              )
            })}
          </>
        )}

        {recientes !== null && recientes.length === 0 && (
          <div className="aviso" style={{ marginTop: 22 }}>
            Todavía no ha registrado ningún envío. Toque{' '}
            <strong>¿A dónde va su carga?</strong> y busque el barco que sale para su
            destino.
          </div>
        )}
      </main>
    </>
  )
}

/* ------------------------------------------------------------------
   INICIO DEL CAPITAN
   ------------------------------------------------------------------ */
function InicioCapitan({ perfil }) {
  const navegar = useNavigate()
  const [viajes, setViajes] = useState(null)

  const cargar = useCallback(async () => {
    const { data, error } = await consultar(
      supabase
        .from('viajes')
        .select('id, fecha_salida, estado, embarcaciones(nombre)')
        .eq('capitan_id', perfil.id)
        .in('estado', ['programado', 'en_navegacion'])
        .order('fecha_salida')
        .limit(3)
    )
    if (error) return setViajes([])
    setViajes(data ?? [])
  }, [perfil.id])

  useEffect(() => {
    cargar()
  }, [cargar])

  return (
    <>
      <div className="cabecera" style={{ justifyContent: 'space-between' }}>
        <h1 className="titulo" style={{ fontSize: 22, fontWeight: 700 }}>
          Moti
        </h1>
        <span className="mini">{perfil.nombre}</span>
      </div>

      <main>
        <button className="buscador" onClick={() => navegar('/viajes')}>
          <Barco />
          <span>Programar un viaje</span>
        </button>

        <div style={{ height: 22 }} />
        <h3>Para usted</h3>
        <div className="atajos">
          <button className="atajo" onClick={() => navegar('/viajes')}>
            <span className="circulo">🚢</span>
            <span className="nombre">Mis viajes</span>
          </button>
          <button className="atajo" onClick={() => navegar('/rastreo')}>
            <span className="circulo">🔎</span>
            <span className="nombre">Rastrear</span>
          </button>
          <button className="atajo" onClick={() => navegar('/cuenta')}>
            <span className="circulo">👤</span>
            <span className="nombre">Cuenta</span>
          </button>
        </div>

        {viajes === null && <Cargando texto="Buscando sus viajes…" />}

        {viajes !== null && viajes.length > 0 && (
          <>
            <div style={{ height: 22 }} />
            <h3>En curso</h3>
            {viajes.map((v) => (
              <button
                key={v.id}
                className="sugerencia"
                onClick={() => navegar('/viajes/' + v.id)}
              >
                <span className="icono-redondo">
                  <Barco size={20} />
                </span>
                <span className="cuerpo">
                  <span className="titulo">{v.embarcaciones?.nombre}</span>
                  <span className="pie">
                    {v.estado === 'en_navegacion' ? 'Navegando' : 'Sale'} ·{' '}
                    {fecha(v.fecha_salida)}
                  </span>
                </span>
                <span className="flecha">
                  <FlechaDerecha />
                </span>
              </button>
            ))}
          </>
        )}

        {viajes !== null && viajes.length === 0 && (
          <div className="aviso" style={{ marginTop: 22 }}>
            No tiene viajes programados. Registre su embarcación y publique la fecha de
            salida para que los comerciantes puedan reservar cupo.
          </div>
        )}
      </main>
    </>
  )
}

/* ------------------------------------------------------------------
   PRIMER INGRESO
   ------------------------------------------------------------------ */
function CrearPerfil({ sesion, onPerfil }) {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [rol, setRol] = useState('remitente')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  async function guardar(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)
    const { data, error } = await consultar(
      supabase
        .from('perfiles')
        .insert({ id: sesion.user.id, nombre: nombre.trim(), telefono: telefono.trim(), rol })
        .select()
        .single()
    )
    setCargando(false)
    if (error) setError(error)
    else onPerfil(data)
  }

  return (
    <main style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}>
      <h2 className="titulo-grande">Bienvenido a Moti</h2>
      <p className="sub">Es la primera vez que entra. Solo necesitamos esto.</p>

      <form onSubmit={guardar}>
        <label>¿Cómo va a usar Moti?</label>
        <div className="segmentos">
          <button
            type="button"
            className={rol === 'remitente' ? 'activo' : undefined}
            onClick={() => setRol('remitente')}
          >
            Envío carga
          </button>
          <button
            type="button"
            className={rol === 'capitan' ? 'activo' : undefined}
            onClick={() => setRol('capitan')}
          >
            Soy capitán
          </button>
        </div>

        <label>Nombre completo</label>
        <input required value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Número de celular</label>
        <input
          required
          inputMode="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="3XX XXX XXXX"
        />

        {error && <div className="aviso critico">{error}</div>}

        <div className="pie-accion">
          <button className="cta" disabled={cargando}>
            {cargando ? 'Guardando…' : 'Continuar'}
          </button>
        </div>
      </form>
    </main>
  )
}
