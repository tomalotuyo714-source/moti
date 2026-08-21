import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { consultar } from '../lib/red.js'
import { Cargando, ErrorRed } from '../components/Estado.jsx'

export default function Inicio({ perfil, onPerfil, sesion, error, cargando, onReintentar }) {
  // Un fallo de red no puede disfrazarse de "usuario nuevo": si se
  // mostrara el formulario de perfil, el usuario lo llenaria otra vez
  // y el insert fallaria por clave duplicada.
  if (error) return <ErrorRed mensaje={error} onReintentar={onReintentar} />
  if (cargando) return <Cargando />
  if (!perfil) return <CrearPerfil sesion={sesion} onPerfil={onPerfil} />

  return (
    <>
      <div className="tarjeta">
        <h2>Hola, {perfil.nombre}</h2>
        <p className="sub">
          {perfil.rol === 'capitan'
            ? 'Programe sus viajes y lleve el manifiesto de su embarcacion.'
            : 'Envie mercancia por el rio y siga su recorrido.'}
        </p>
      </div>

      {perfil.rol === 'capitan' ? (
        <div className="tarjeta">
          <h3>Mis viajes</h3>
          <p className="sub">Cree la ruta, las paradas y su tarifario.</p>
          <Link to="/viajes">
            <button>Ver mis viajes</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="tarjeta">
            <h3>Enviar mercancia</h3>
            <p className="sub">Busque el barco que va para su destino y reserve el cupo.</p>
            <Link to="/enviar">
              <button>Enviar un pedido</button>
            </Link>
          </div>
          <div className="tarjeta">
            <h3>Mis envios</h3>
            <Link to="/mis-envios">
              <button className="secundario">Ver mis envios</button>
            </Link>
          </div>
        </>
      )}

      <div className="tarjeta">
        <h3>Rastrear con codigo</h3>
        <Link to="/rastreo">
          <button className="secundario">Abrir rastreo</button>
        </Link>
      </div>
    </>
  )
}

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
    <div className="tarjeta">
      <h2>Complete su perfil</h2>
      <p className="sub">Es la primera vez que entra. Solo necesitamos esto.</p>
      <form onSubmit={guardar}>
        <label>Nombre completo</label>
        <input required value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Numero de celular</label>
        <input
          required
          inputMode="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="3XX XXX XXXX"
        />

        <label>Como va a usar Moti?</label>
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="remitente">Envio mercancia</option>
          <option value="capitan">Soy capitan de embarcacion</option>
        </select>

        {error && <div className="aviso critico">{error}</div>}
        <div style={{ height: 16 }} />
        <button disabled={cargando}>{cargando ? 'Guardando…' : 'Guardar'}</button>
      </form>
    </div>
  )
}
