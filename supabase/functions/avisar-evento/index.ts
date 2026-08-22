// =============================================================
// MOTI - Aviso push cuando pasa algo con un envio
//
// Por que existe: el comerciante no puede quedarse mirando el
// telefono ocho dias a ver si el barco llego. Con la app abierta
// el aviso lo da Realtime, pero con la app cerrada del todo hace
// falta que alguien lo empuje. Ese alguien es esta funcion.
//
// Como se dispara: un Database Webhook de Supabase sobre
// INSERT en la tabla `eventos`. Se configura en
// Database -> Webhooks, apuntando a esta funcion.
//
// Secretos que necesita (Edge Functions -> Secrets):
//   FCM_SERVICE_ACCOUNT   el JSON de la cuenta de servicio de
//                         Firebase, en una sola linea
//   SUPABASE_URL          lo pone Supabase solo
//   SUPABASE_SERVICE_ROLE_KEY  lo pone Supabase solo
//
// La service_role key vive AQUI, en el servidor, y nunca en la app.
// =============================================================

import { createClient } from 'jsr:@supabase/supabase-js@2'

const TITULOS: Record<string, string> = {
  zarpe: 'El barco zarpó',
  llegada: 'Su mercancía llegó al muelle',
  proximidad: 'Su muelle es el siguiente',
  entrega: 'Mercancía entregada',
  registro: 'Envío registrado',
}

// -------------------------------------------------------------
// Token de acceso para FCM.
//
// La API vieja de clave de servidor ya no existe: hay que firmar
// un JWT con la cuenta de servicio y cambiarlo por un token. El
// token dura una hora, asi que se guarda mientras siga sirviendo.
// -------------------------------------------------------------
let cacheToken: { valor: string; vence: number } | null = null

function base64url(datos: ArrayBuffer | string): string {
  const bytes = typeof datos === 'string' ? new TextEncoder().encode(datos) : new Uint8Array(datos)
  let s = ''
  for (const b of bytes) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function pemADer(pem: string): ArrayBuffer {
  const cuerpo = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '')
  const crudo = atob(cuerpo)
  const buf = new Uint8Array(crudo.length)
  for (let i = 0; i < crudo.length; i++) buf[i] = crudo.charCodeAt(i)
  return buf.buffer
}

async function tokenFCM(cuenta: { client_email: string; private_key: string }): Promise<string> {
  const ahora = Math.floor(Date.now() / 1000)
  if (cacheToken && cacheToken.vence > ahora + 60) return cacheToken.valor

  const encabezado = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const cuerpo = base64url(
    JSON.stringify({
      iss: cuenta.client_email,
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: 'https://oauth2.googleapis.com/token',
      iat: ahora,
      exp: ahora + 3600,
    })
  )

  const llave = await crypto.subtle.importKey(
    'pkcs8',
    pemADer(cuenta.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const firma = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    llave,
    new TextEncoder().encode(`${encabezado}.${cuerpo}`)
  )
  const jwt = `${encabezado}.${cuerpo}.${base64url(firma)}`

  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  if (!r.ok) throw new Error('No se pudo obtener el token de FCM: ' + (await r.text()))

  const j = await r.json()
  cacheToken = { valor: j.access_token, vence: ahora + (j.expires_in ?? 3600) }
  return cacheToken.valor
}

// -------------------------------------------------------------
Deno.serve(async (peticion) => {
  if (peticion.method !== 'POST') {
    return new Response('Solo POST', { status: 405 })
  }

  try {
    const cuerpo = await peticion.json()
    const evento = cuerpo?.record
    if (!evento?.envio_id) {
      return Response.json({ ok: true, nota: 'Evento sin envio, no hay a quien avisarle.' })
    }

    const supa = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Solo los tokens de las partes de ESTE envio. La funcion de la
    // base de datos se encarga; aqui nunca se lee la tabla completa.
    const { data: aparatos, error } = await supa.rpc('tokens_del_envio', {
      p_envio_id: evento.envio_id,
    })
    if (error) throw error
    if (!aparatos?.length) return Response.json({ ok: true, enviados: 0 })

    const { data: envio } = await supa
      .from('envios')
      .select('codigo_publico')
      .eq('id', evento.envio_id)
      .maybeSingle()

    const cuenta = JSON.parse(Deno.env.get('FCM_SERVICE_ACCOUNT') ?? '{}')
    if (!cuenta.client_email) {
      return Response.json(
        { ok: false, motivo: 'Falta el secreto FCM_SERVICE_ACCOUNT.' },
        { status: 500 }
      )
    }

    const acceso = await tokenFCM(cuenta)
    const url = `https://fcm.googleapis.com/v1/projects/${cuenta.project_id}/messages:send`
    const titulo = TITULOS[evento.tipo] ?? 'Novedad de su envío'

    let enviados = 0
    const muertos: string[] = []

    for (const a of aparatos) {
      const r = await fetch(url, {
        method: 'POST',
        headers: { authorization: 'Bearer ' + acceso, 'content-type': 'application/json' },
        body: JSON.stringify({
          message: {
            token: a.token,
            notification: { title: titulo, body: evento.mensaje },
            data: { codigo: envio?.codigo_publico ?? '', tipo: evento.tipo ?? '' },
            android: { priority: 'HIGH', notification: { channel_id: 'moti_envios' } },
            apns: { payload: { aps: { sound: 'default' } } },
          },
        }),
      })

      if (r.ok) enviados++
      // 404 y 400 con UNREGISTERED = el aparato desinstalo la app.
      else if (r.status === 404 || r.status === 400) muertos.push(a.token)
    }

    // Los tokens muertos se borran: si no, la tabla crece para
    // siempre y cada aviso se demora mas en salir.
    if (muertos.length) {
      await supa.from('dispositivos').delete().in('token', muertos)
    }

    return Response.json({ ok: true, enviados, limpiados: muertos.length })
  } catch (e) {
    console.error('[avisar-evento]', e)
    return Response.json({ ok: false, motivo: String(e) }, { status: 500 })
  }
})
