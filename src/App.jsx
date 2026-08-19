import { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase.js'

import Entrar from './pages/Entrar.jsx'
import Inicio from './pages/Inicio.jsx'
import CapitanViajes from './pages/CapitanViajes.jsx'
import CapitanViaje from './pages/CapitanViaje.jsx'
import NuevoEnvio from './pages/NuevoEnvio.jsx'
import MisEnvios from './pages/MisEnvios.jsx'
import Rastreo from './pages/Rastreo.jsx'

export default function App() {
  const [sesion, setSesion] = useState(undefined) // undefined = cargando
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSesion(data.session ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSesion(s ?? null))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!sesion) return setPerfil(null)
    supabase
      .from('perfiles')
      .select('*')
      .eq('id', sesion.user.id)
      .maybeSingle()
      .then(({ data }) => setPerfil(data))
  }, [sesion])

  if (sesion === undefined) return <div className="vacio">Cargando…</div>

  return (
    <div className="app">
      <Barra sesion={sesion} perfil={perfil} />
      <main>
        <Routes>
          {/* El destinatario entra por aqui sin cuenta. */}
          <Route path="/rastreo" element={<Rastreo />} />
          <Route path="/rastreo/:codigo" element={<Rastreo />} />

          {!sesion ? (
            <>
              <Route path="/entrar" element={<Entrar />} />
              <Route path="*" element={<Navigate to="/entrar" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Inicio perfil={perfil} onPerfil={setPerfil} sesion={sesion} />} />
              <Route path="/viajes" element={<CapitanViajes perfil={perfil} />} />
              <Route path="/viajes/:id" element={<CapitanViaje perfil={perfil} />} />
              <Route path="/enviar" element={<NuevoEnvio perfil={perfil} />} />
              <Route path="/mis-envios" element={<MisEnvios perfil={perfil} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  )
}

function Barra({ sesion, perfil }) {
  const navegar = useNavigate()
  async function salir() {
    await supabase.auth.signOut()
    navegar('/entrar')
  }
  return (
    <header className="barra">
      <Link to={sesion ? '/' : '/rastreo'} style={{ flex: 1 }}>
        <h1>Moti</h1>
      </Link>
      {!sesion && <Link to="/rastreo">Rastrear</Link>}
      {sesion && (
        <>
          <span style={{ fontSize: 13, opacity: 0.85 }}>{perfil?.nombre}</span>
          <button className="chico secundario" onClick={salir}>
            Salir
          </button>
        </>
      )}
    </header>
  )
}
