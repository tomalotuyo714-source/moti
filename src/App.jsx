import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { supabase, faltaConfiguracion } from './lib/supabase.js'
import { conLimite, mensajeError, consultar } from './lib/red.js'
import { prepararApp, alCambiarRed, hayRed } from './lib/nativo.js'
import { iniciarAvisos } from './lib/avisos.js'
import { Cargando, ErrorRed } from './components/Estado.jsx'
import SinConfigurar from './components/SinConfigurar.jsx'
import NavInferior from './components/NavInferior.jsx'

import Entrar from './pages/Entrar.jsx'
import Inicio from './pages/Inicio.jsx'
import Cuenta from './pages/Cuenta.jsx'
import CapitanViajes from './pages/CapitanViajes.jsx'
import CapitanViaje from './pages/CapitanViaje.jsx'
import NuevoEnvio from './pages/NuevoEnvio.jsx'
import MisEnvios from './pages/MisEnvios.jsx'
import Rastreo from './pages/Rastreo.jsx'

// Pantallas de flujo: llevan su propia cabecera y su propio boton al
// pie, asi que la barra inferior estorbaria mas de lo que ayuda.
const SIN_NAV = ['/enviar']

export default function App() {
  const [sesion, setSesion] = useState(undefined) // undefined = todavia no se sabe
  const [errorSesion, setErrorSesion] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [errorPerfil, setErrorPerfil] = useState(null)
  const [cargandoPerfil, setCargandoPerfil] = useState(false)
  const [conectado, setConectado] = useState(true)
  const ubicacion = useLocation()

  // Barra de estado, splash y boton atras de Android. Solo hace
  // algo dentro de la app; en el navegador no estorba.
  useEffect(() => {
    prepararApp(() => {
      // Sin historial que recorrer, el boton atras cierra la app.
      import('@capacitor/app').then(({ App }) => App.exitApp()).catch(() => {})
    })
  }, [])

  // Aviso de "sin senal". En el Amazonas esto no es un caso raro:
  // es el estado normal media hora al dia.
  useEffect(() => {
    let vivo = true
    hayRed().then((r) => vivo && setConectado(r))
    let quitar = () => {}
    alCambiarRed((r) => vivo && setConectado(r)).then((q) => (quitar = q))
    return () => {
      vivo = false
      quitar()
    }
  }, [])

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

  // Notificaciones: se arrancan cuando ya se sabe quien es. Antes
  // no tiene sentido pedirle permiso a un desconocido.
  useEffect(() => {
    if (!perfil?.id) return
    return iniciarAvisos(perfil)
  }, [perfil?.id])

  // Antes que nada: si no hay .env, se explica en vez de fallar en blanco.
  if (faltaConfiguracion)
    return (
      <div className="app">
        <main style={{ paddingTop: 24 }}>
          <SinConfigurar />
        </main>
      </div>
    )

  if (sesion === undefined && !errorSesion) return <Cargando />

  const conNav = !!sesion && !!perfil && !SIN_NAV.includes(ubicacion.pathname)

  return (
    <div className={'app' + (conNav ? ' con-nav' : '')}>
      {!conectado && (
        <div className="sin-senal">
          Sin señal. Puede ver lo último que se descargó, pero no se guardan cambios.
        </div>
      )}
      {errorSesion ? (
        <main style={{ paddingTop: 24 }}>
          <ErrorRed mensaje={errorSesion} onReintentar={revisarSesion} />
        </main>
      ) : (
        <Routes>
          {/* El destinatario entra por aqui sin cuenta y sin instalar nada. */}
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
              <Route path="/cuenta" element={<Cuenta perfil={perfil} sesion={sesion} />} />
              <Route path="/viajes" element={<CapitanViajes perfil={perfil} />} />
              <Route path="/viajes/:id" element={<CapitanViaje perfil={perfil} />} />
              <Route path="/enviar" element={<NuevoEnvio perfil={perfil} />} />
              <Route path="/mis-envios" element={<MisEnvios perfil={perfil} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      )}

      {conNav && <NavInferior rol={perfil?.rol} />}
    </div>
  )
}
