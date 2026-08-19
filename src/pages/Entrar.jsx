import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

/**
 * Entrada por enlace magico al correo.
 * En el piloto no usamos SMS: cuesta plata y Supabase lo cobra aparte.
 * El correo es gratis y sirve igual para capitanes y remitentes.
 */
export default function Entrar() {
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

  if (enviado) {
    return (
      <div className="tarjeta">
        <h2>Revise su correo</h2>
        <p className="sub">
          Le enviamos un enlace a <strong>{correo}</strong>. Abralo desde este mismo
          celular para entrar.
        </p>
        <button className="secundario" onClick={() => setEnviado(false)}>
          Usar otro correo
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="tarjeta">
        <h2>Entrar a Moti</h2>
        <p className="sub">Escriba su correo y le mandamos un enlace para entrar. Sin contrasena.</p>
        <form onSubmit={enviar}>
          <label>Correo electronico</label>
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="usted@correo.com"
            autoComplete="email"
          />
          {error && <div className="aviso critico">{error}</div>}
          <div style={{ height: 14 }} />
          <button disabled={cargando}>{cargando ? 'Enviando…' : 'Enviar enlace'}</button>
        </form>
      </div>

      <div className="tarjeta">
        <h3>Le mandaron una mercancia?</h3>
        <p className="sub">
          No necesita cuenta. Entre con el codigo que le compartieron.
        </p>
        <Link to="/rastreo">
          <button className="secundario">Rastrear un envio</button>
        </Link>
      </div>
    </>
  )
}
