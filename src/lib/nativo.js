// -------------------------------------------------------------
// Capa nativa.
//
// La misma base de codigo corre en tres sitios: el navegador del
// celular, la app de Play y la app de App Store. Este archivo es
// el unico que sabe en cual esta, y siempre degrada: si el aparato
// no tiene la funcion, la app no se rompe, hace lo que pueda.
//
// Los plugins se cargan con import() dinamico a proposito. Asi el
// navegador de quien solo va a rastrear un envio no se descarga
// codigo de camara ni de notificaciones que nunca va a usar.
// -------------------------------------------------------------

import { Capacitor } from '@capacitor/core'

export const esNativo = Capacitor.isNativePlatform()
export const plataforma = Capacitor.getPlatform() // 'android' | 'ios' | 'web'

/** Envuelve una llamada nativa para que un fallo nunca tumbe la pantalla. */
async function intentar(fn, porDefecto = null) {
  try {
    return await fn()
  } catch (e) {
    console.warn('[nativo]', e?.message ?? e)
    return porDefecto
  }
}

// -------------------------------------------------------------
// ARRANQUE: barra de estado, splash y boton atras de Android
// -------------------------------------------------------------
export async function prepararApp(alSalir) {
  if (!esNativo) return

  await intentar(async () => {
    const { StatusBar, Style } = await import('@capacitor/status-bar')
    await StatusBar.setStyle({ style: Style.Dark }) // iconos claros sobre fondo negro
    if (plataforma === 'android') await StatusBar.setBackgroundColor({ color: '#000000' })
  })

  await intentar(async () => {
    const { SplashScreen } = await import('@capacitor/splash-screen')
    await SplashScreen.hide()
  })

  // En Android el boton fisico de atras debe navegar, no cerrar la app
  // de una. Si ya no hay a donde volver, ahi si se sale.
  await intentar(async () => {
    const { App } = await import('@capacitor/app')
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) window.history.back()
      else alSalir?.()
    })
  })
}

/** Golpecito al confirmar algo importante. Se siente con guantes puestos. */
export async function vibrar(fuerza = 'medio') {
  if (!esNativo) return
  await intentar(async () => {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics')
    const estilos = { suave: ImpactStyle.Light, medio: ImpactStyle.Medium, fuerte: ImpactStyle.Heavy }
    await Haptics.impact({ style: estilos[fuerza] ?? ImpactStyle.Medium })
  })
}

// -------------------------------------------------------------
// COMPARTIR
// En la app usa la hoja del sistema; en el navegador, Web Share;
// y si no hay ninguna, copia al portapapeles.
// Devuelve 'nativo' | 'web' | 'copiado' | 'nada'
// -------------------------------------------------------------
export async function compartir({ titulo, texto }) {
  if (esNativo) {
    const ok = await intentar(async () => {
      const { Share } = await import('@capacitor/share')
      await Share.share({ title: titulo, text: texto, dialogTitle: titulo })
      return true
    })
    if (ok) return 'nativo'
  }

  if (navigator.share) {
    try {
      await navigator.share({ text: texto })
      return 'web'
    } catch {
      // El usuario cancelo: no es un error que haya que mostrar.
      return 'nada'
    }
  }

  try {
    await navigator.clipboard.writeText(texto)
    return 'copiado'
  } catch {
    return 'nada'
  }
}

// -------------------------------------------------------------
// CAMARA: prueba de entrega
// Devuelve { base64, tipo } o null si el capitan cancelo.
// Se pide comprimida y no muy grande: en el muelle se sube por
// datos moviles y cada kilobyte cuesta.
// -------------------------------------------------------------
export async function fotoDeEntrega() {
  if (!esNativo) return null
  return await intentar(async () => {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera')
    const foto = await Camera.getPhoto({
      quality: 55,
      width: 1280,
      correctOrientation: true,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      promptLabelHeader: 'Foto de la entrega',
      promptLabelCancel: 'Cancelar',
    })
    return { base64: foto.base64String, tipo: 'image/jpeg' }
  })
}

// -------------------------------------------------------------
// UBICACION: donde queda el muelle
// Nunca bloquea: si el GPS no responde en 10 segundos, sigue sin el.
// -------------------------------------------------------------
export async function ubicacionActual() {
  const pedir = async () => {
    if (esNativo) {
      const { Geolocation } = await import('@capacitor/geolocation')
      const permiso = await Geolocation.checkPermissions()
      if (permiso.location !== 'granted') {
        const pedido = await Geolocation.requestPermissions()
        if (pedido.location !== 'granted') return null
      }
      const p = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 9000 })
      return { lat: p.coords.latitude, lng: p.coords.longitude, precision: p.coords.accuracy }
    }

    if (!navigator.geolocation) return null
    return await new Promise((resolver) => {
      navigator.geolocation.getCurrentPosition(
        (p) => resolver({ lat: p.coords.latitude, lng: p.coords.longitude, precision: p.coords.accuracy }),
        () => resolver(null),
        { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 }
      )
    })
  }

  return await intentar(
    () => Promise.race([pedir(), new Promise((r) => setTimeout(() => r(null), 10000))]),
    null
  )
}

// -------------------------------------------------------------
// ALMACENAMIENTO SIN SENAL
// El manifiesto del capitan tiene que poder abrirse en mitad del
// rio. Se guarda la ultima copia buena y se muestra marcada como
// vieja, con la fecha, para que nadie confunda cache con realidad.
// -------------------------------------------------------------
async function almacen() {
  if (esNativo) {
    const { Preferences } = await import('@capacitor/preferences')
    return {
      get: async (k) => (await Preferences.get({ key: k })).value,
      set: (k, v) => Preferences.set({ key: k, value: v }),
      remove: (k) => Preferences.remove({ key: k }),
    }
  }
  return {
    get: async (k) => window.localStorage.getItem(k),
    set: async (k, v) => window.localStorage.setItem(k, v),
    remove: async (k) => window.localStorage.removeItem(k),
  }
}

export async function guardarCopia(clave, datos) {
  await intentar(async () => {
    const a = await almacen()
    await a.set('moti:' + clave, JSON.stringify({ cuando: Date.now(), datos }))
  })
}

/** Devuelve { datos, cuando } o null. `cuando` es milisegundos epoch. */
export async function leerCopia(clave) {
  return await intentar(async () => {
    const a = await almacen()
    const crudo = await a.get('moti:' + clave)
    if (!crudo) return null
    const v = JSON.parse(crudo)
    return { datos: v.datos, cuando: v.cuando }
  })
}

// -------------------------------------------------------------
// ESTADO DE LA RED
// -------------------------------------------------------------
export async function hayRed() {
  if (!esNativo) return navigator.onLine !== false
  const estado = await intentar(async () => {
    const { Network } = await import('@capacitor/network')
    return (await Network.getStatus()).connected
  })
  return estado ?? true
}

export async function alCambiarRed(callback) {
  if (!esNativo) {
    const alConectar = () => callback(true)
    const alCaerse = () => callback(false)
    window.addEventListener('online', alConectar)
    window.addEventListener('offline', alCaerse)
    return () => {
      window.removeEventListener('online', alConectar)
      window.removeEventListener('offline', alCaerse)
    }
  }
  const quitar = await intentar(async () => {
    const { Network } = await import('@capacitor/network')
    const l = await Network.addListener('networkStatusChange', (s) => callback(s.connected))
    return () => l.remove()
  })
  return quitar ?? (() => {})
}

// -------------------------------------------------------------
// NOTIFICACIONES
//
// Dos caminos, a proposito:
//
//   - Push (el celular apagado, la app cerrada): necesita el token
//     del aparato guardado en el servidor. Eso es lo que registra
//     `registrarNotificaciones`.
//   - Aviso inmediato con la app abierta: Supabase Realtime avisa
//     del evento nuevo y se muestra una notificacion local. No
//     depende de Google ni de Apple y funciona desde el primer dia.
// -------------------------------------------------------------

/**
 * Pide permiso, registra el aparato y entrega el token.
 * `alRegistrar(token, plataforma)` se llama cuando el sistema lo suelta.
 * Devuelve 'concedido' | 'negado' | 'no-aplica'.
 */
export async function registrarNotificaciones(alRegistrar, alRecibir) {
  if (!esNativo) return 'no-aplica'

  return (
    (await intentar(async () => {
      const { PushNotifications } = await import('@capacitor/push-notifications')

      let permiso = await PushNotifications.checkPermissions()
      if (permiso.receive === 'prompt' || permiso.receive === 'prompt-with-rationale') {
        permiso = await PushNotifications.requestPermissions()
      }
      if (permiso.receive !== 'granted') return 'negado'

      await PushNotifications.addListener('registration', (t) => {
        alRegistrar?.(t.value, plataforma)
      })
      await PushNotifications.addListener('registrationError', (e) => {
        console.warn('[push] no se pudo registrar', e)
      })
      await PushNotifications.addListener('pushNotificationReceived', (n) => {
        alRecibir?.({ titulo: n.title, cuerpo: n.body, datos: n.data })
      })
      await PushNotifications.addListener('pushNotificationActionPerformed', (a) => {
        const codigo = a.notification?.data?.codigo
        if (codigo) window.location.assign('/rastreo/' + codigo)
      })

      await PushNotifications.register()
      return 'concedido'
    })) ?? 'negado'
  )
}

/**
 * Notificacion local: la dispara el propio celular. Se usa cuando
 * llega un evento por Realtime con la app abierta o en segundo plano.
 */
export async function avisoLocal({ titulo, cuerpo, codigo }) {
  if (!esNativo) {
    // En el navegador solo si el usuario ya dio permiso. Nunca se
    // le pide de la nada: eso lo unico que logra es que lo nieguen.
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(titulo, { body: cuerpo, icon: '/icono-192.png' })
      } catch {
        /* algunos navegadores solo dejan hacerlo desde el service worker */
      }
    }
    return
  }

  await intentar(async () => {
    const { LocalNotifications } = await import('@capacitor/local-notifications')
    const permiso = await LocalNotifications.checkPermissions()
    if (permiso.display !== 'granted') {
      const pedido = await LocalNotifications.requestPermissions()
      if (pedido.display !== 'granted') return
    }
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 100000),
          title: titulo,
          body: cuerpo,
          extra: { codigo },
          smallIcon: 'ic_stat_moti',
        },
      ],
    })
  })
}
