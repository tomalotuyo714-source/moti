// -------------------------------------------------------------
// Service worker de Moti.
//
// Escrito a mano a proposito: no agrega ninguna dependencia nueva
// al proyecto. Hace dos cosas y nada mas.
//
//   1. Guarda el "esqueleto" de la app (HTML, JS, CSS, iconos) para
//      que abra aunque no haya senal. Sin esto, el capitan que cruza
//      a Tabatinga y pierde la senal no ve ni la pantalla de entrada.
//   2. Deja pasar de largo todo lo que va a Supabase. Los datos del
//      viaje NUNCA se sirven de cache: mostrarle al capitan un
//      manifiesto viejo seria peor que no mostrarle nada.
// -------------------------------------------------------------

const CACHE = 'moti-v2'
const ESQUELETO = ['/', '/index.html', '/manifest.webmanifest', '/icono-192.png', '/icono-512.png']

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ESQUELETO)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (evento) => {
  const peticion = evento.request
  if (peticion.method !== 'GET') return

  const url = new URL(peticion.url)

  // Todo lo que no sea de este sitio (Supabase, por ejemplo) va
  // directo a la red. Los datos siempre frescos o nada.
  if (url.origin !== self.location.origin) return

  // Navegacion: se intenta la red y, si no hay, se abre lo guardado.
  if (peticion.mode === 'navigate') {
    evento.respondWith(
      fetch(peticion)
        .then((r) => {
          const copia = r.clone()
          caches.open(CACHE).then((c) => c.put('/index.html', copia))
          return r
        })
        .catch(() => caches.match('/index.html').then((r) => r || caches.match('/')))
    )
    return
  }

  // Archivos estaticos: primero cache (arranque instantaneo), y se
  // actualiza por detras para la proxima vez.
  evento.respondWith(
    caches.match(peticion).then((guardado) => {
      const red = fetch(peticion)
        .then((r) => {
          if (r && r.status === 200 && r.type === 'basic') {
            const copia = r.clone()
            caches.open(CACHE).then((c) => c.put(peticion, copia))
          }
          return r
        })
        .catch(() => guardado)
      return guardado || red
    })
  )
})
