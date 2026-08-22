// -------------------------------------------------------------
// Avisos de llegada al muelle.
//
// El problema real: el comerciante no puede quedarse mirando el
// telefono ocho dias a ver si el barco llego. Tiene que sonarle.
//
// Dos caminos que se complementan:
//
//   1. Realtime. Con la app abierta o en segundo plano reciente,
//      Supabase avisa del evento nuevo por websocket y el celular
//      muestra una notificacion local. No pasa por Google ni por
//      Apple, no cuesta nada y funciona desde el primer dia.
//
//   2. Push. Con la app cerrada del todo hace falta que el aviso
//      lo empuje un servidor. Para eso se registra el token del
//      aparato aqui, y la funcion de servidor en
//      supabase/functions/avisar-evento lo usa.
//
// Realtime respeta las politicas RLS de `eventos`, asi que a cada
// quien solo le llegan los eventos de sus propios envios.
// -------------------------------------------------------------

import { supabase } from './supabase.js'
import { registrarNotificaciones, avisoLocal, esNativo } from './nativo.js'

const TITULOS = {
  zarpe: 'El barco zarpó',
  llegada: 'Su mercancía llegó al muelle',
  proximidad: 'Su muelle es el siguiente',
  entrega: 'Mercancía entregada',
  registro: 'Envío registrado',
}

/**
 * Guarda el token de este aparato para poder mandarle push.
 * Si el token ya estaba, solo se refresca la fecha: no se duplica.
 */
async function guardarToken(perfilId, token, plataforma) {
  if (!perfilId || !token) return
  try {
    await supabase
      .from('dispositivos')
      .upsert(
        { perfil_id: perfilId, token, plataforma, visto_en: new Date().toISOString() },
        { onConflict: 'token' }
      )
  } catch (e) {
    // Que falle el registro no puede impedirle usar la app. Pierde
    // los avisos con la app cerrada, nada mas.
    console.warn('[avisos] no se pudo guardar el token', e?.message ?? e)
  }
}

/**
 * Arranca los dos caminos. Devuelve una funcion para desmontar.
 * Se llama una sola vez, cuando ya se sabe quien es el usuario.
 */
export function iniciarAvisos(perfil) {
  if (!perfil?.id) return () => {}

  // --- 1. Push: pedir permiso y registrar el aparato ---
  if (esNativo) {
    registrarNotificaciones(
      (token, plataforma) => guardarToken(perfil.id, token, plataforma),
      // Con la app abierta el sistema no siempre dibuja el push;
      // se muestra a mano para que el capitan no se lo pierda.
      ({ titulo, cuerpo, datos }) =>
        avisoLocal({ titulo: titulo ?? 'Moti', cuerpo: cuerpo ?? '', codigo: datos?.codigo })
    )
  }

  // --- 2. Realtime: eventos nuevos de MIS envios ---
  const canal = supabase
    .channel('eventos-de-' + perfil.id)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'eventos' },
      async (carga) => {
        const ev = carga.new
        if (!ev) return

        // El evento no trae el codigo publico; se pide aparte para
        // poder abrir el rastreo al tocar la notificacion.
        let codigo = null
        try {
          const { data } = await supabase
            .from('envios')
            .select('codigo_publico')
            .eq('id', ev.envio_id)
            .maybeSingle()
          codigo = data?.codigo_publico ?? null
        } catch {
          /* sin codigo, la notificacion igual se muestra */
        }

        avisoLocal({
          titulo: TITULOS[ev.tipo] ?? 'Novedad de su envío',
          cuerpo: ev.mensaje,
          codigo,
        })
      }
    )
    .subscribe()

  return () => {
    try {
      supabase.removeChannel(canal)
    } catch {
      /* ya estaba cerrado */
    }
  }
}
