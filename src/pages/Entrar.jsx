import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { FlechaDerecha } from '../components/Iconos.jsx'

/**
 * Entrada por enlace magico al correo.
 * En el piloto no usamos SMS: cuesta plata y Supabase lo cobra aparte.
 * El correo es gratis y sirve igual para capitanes y remitentes.
 */
export default function Entrar() {
  const navegar = useNavigate()
  const [correo, setCorreo] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email: correo.trim(),
      options: { emailRedirectTo: window.location.origin },
    })
    setCargando(false)
    if (error) setError(error.message)
    else setEnviado(true)
  }

  if (enviado)
    return (
      <main style={{ paddingTop: 'calc(env(safe-area-inset-top) + 40px)' }}>
        <h2 className="titulo-grande">Revise su correo</h2>
        <p className="sub">
          Le enviamos un enlace a <strong>{correo}</strong>. Ábralo desde este mismo celular
          para entrar.
        </p>
        <button className="secundario" onClick={() => setEnviado(false)}>
          Usar otro correo
        </button>
      </main>
    )

  return (
    <main style={{ paddingTop: 'calc(env(safe-area-inset-top) + 40px)' }}>
      <div style={{ fontSize: 46, lineHeight: 1, marginBottom: 18 }}>🚢</div>
      <h2 className="titulo-grande">Moti</h2>
      <p className="sub">Envíos y rastreo por el río Amazonas.</p>

      <form onSubmit={enviar}>
        <label>Correo electrónico</label>
        <input
          type="email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="usted@correo.com"
          autoComplete="email"
        />
        <div className="mini" style={{ marginTop: 8 }}>
          Le mandamos un enlace para entrar. Sin contraseña.
        </div>

        {error && <div className="aviso critico">{error}</div>}

        <div style={{ height: 20 }} />
        <button className="cta" disabled={cargando}>
          {cargando ? 'Enviando…' : 'Continuar'}
        </button>
      </form>

      <hr className="separador" style={{ margin: '28px 0 8px' }} />

      <button className="sugerencia" onClick={() => navegar('/rastreo')}>
        <span className="icono-redondo">📦</span>
        <span className="cuerpo">
          <span className="titulo">¿Le mandaron una mercancía?</span>
          <span className="pie">Entre con el código. No necesita cuenta.</span>
        </span>
        <span className="flecha">
          <FlechaDerecha />
        </span>
      </button>
    </main>
  )
}
