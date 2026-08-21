import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase, faltaConfiguracion } from './lib/supabase.js'
import { conLimite, mensajeError, consultar } from './lib/red.js'
import { Cargando, ErrorRed } from './components/Estado.jsx'
import SinConfigurar from './components/SinConfigurar.jsx'

import Entrar from './pages/Entrar.jsx'
import Inicio from './pages/Inicio.jsx'
import CapitanViajes from './pages/CapitanViajes.jsx'
import CapitanViaje from './pages/CapitanViaje.jsx'
import NuevoEnvio from './pages/NuevoEnvio.jsx'
import MisEnvios from './pages/MisEnvios.jsx'
import Rastreo from './pages/Rastreo.jsx'

export default function App() {
  const [sesion, setSesion] = useState(undefined) // undefined = todavia no se sabe
  const [errorSesion, setErrorSesion] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [errorPerfil, setErrorPerfil] = useState(null)
  const [cargandoPerfil, setCargandoPerfil] = useState(false)

  // getSession puede quedarse esperando para siempre si el token
  // vencio y la red esta lenta: la libreria no le pone limite. Sin
  // este corte, la app entera se congela en "Cargando...".
  const revisarSesion = useCallback(async () => {
    if (faltaConfiguracion) return
    setErrorSesion(null)
    try {
      const { data } = await conLimite(supabase.auth.getSession())
      setSesion(data.session ?? null)
    } catch (e) {
      setErrorSesion(mensajeError(e))
    }
  }, [])

  useEffect(() => {
    if (faltaConfiguracion) return
    revisarSesion()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSesion(s ?? null)
      setErrorSesion(null)
    })
    return () => sub.subscription.unsubscribe()
  }, [revisarSesion])

  const cargarPerfil = useCallback(async () => {
    if (faltaConfiguracion) return
    if (!sesion) {
      setPerfil(null)
      return
    }
    setCargandoPerfil(true)
    setErrorPerfil(null)
    const { data, error } = await consultar(
      supabase.from('perfiles').select('*').eq('id', sesion.user.id).maybeSingle()
    )
    setCargandoPerfil(false)
    // Si falla, NO se deja perfil en null: eso le mostraria el
    // formulario de "complete su perfil" a alguien que ya lo tiene.
    if (error) setErrorPerfil(error)
    else setPerfil(data)
  }, [sesion])

  useEffect(() => {
    cargarPerfil()
  }, [cargarPerfil])

  // Antes que nada: si no hay .env, se explica en vez de fallar en blanco.
  if (faltaConfiguracion)
    return (
      <div className="app">
        <header className="barra">
          <h1>Moti</h1>
        </header>
        <main>
          <SinConfigurar />
        </main>
      </div>
    )

  if (sesion === undefined && !errorSesion) return <Cargando />

  return (
    <div className="app">
      <Barra sesion={sesion} perfil={perfil} />
      <main>
        {errorSesion ? (
          <ErrorRed mensaje={errorSesion} onReintentar={revisarSesion} />
        ) : (
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
                <Route
                  path="/"
                  element={
                    <Inicio
                      perfil={perfil}
                      onPerfil={setPerfil}
                      sesion={sesion}
                      error={errorPerfil}
                      cargando={cargandoPerfil}
                      onReintentar={cargarPerfil}
                    />
                  }
                />
                <Route path="/viajes" element={<CapitanViajes perfil={perfil} />} />
                <Route path="/viajes/:id" element={<CapitanViaje perfil={perfil} />} />
                <Route path="/enviar" element={<NuevoEnvio perfil={perfil} />} />
                <Route path="/mis-envios" element={<MisEnvios perfil={perfil} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        )}
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
