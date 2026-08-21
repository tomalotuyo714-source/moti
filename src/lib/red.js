// -------------------------------------------------------------
// Manejo de red para conexiones malas.
//
// En el rio y en la frontera la senal no se cae del todo: se pone
// lenta. Una peticion que nunca responde deja la app congelada en
// "Cargando..." para siempre. Por eso toda llamada lleva un limite
// de tiempo y todo fallo se le muestra al usuario con un boton para
// reintentar, nunca como una pantalla vacia.
// -------------------------------------------------------------

export const LIMITE_MS = 12000

/** Corta una promesa que se demore mas de la cuenta. */
export function conLimite(promesa, ms = LIMITE_MS) {
  let reloj
  const limite = new Promise((_, rechazar) => {
    reloj = setTimeout(
      () => rechazar(new Error('La red no respondio. Revise su senal e intente de nuevo.')),
      ms
    )
  })
  return Promise.race([promesa, limite]).finally(() => clearTimeout(reloj))
}

/** Traduce cualquier fallo a algo que el usuario pueda entender. */
export function mensajeError(e) {
  if (!e) return 'Ocurrio un error inesperado.'
  const texto = typeof e === 'string' ? e : e.message || ''
  if (/failed to fetch|networkerror|load failed/i.test(texto)) {
    return 'No hay conexion en este momento. Revise su senal e intente de nuevo.'
  }
  if (/no respondio/i.test(texto)) return texto
  if (/duplicate key/i.test(texto)) return 'Ese registro ya existe.'
  if (/jwt|token is expired/i.test(texto)) {
    return 'Su sesion vencio. Vuelva a entrar.'
  }
  return texto || 'Ocurrio un error inesperado.'
}

/**
 * Envuelve una consulta de Supabase: aplica el limite de tiempo y
 * devuelve siempre { data, error } con el error ya traducido.
 */
export async function consultar(consulta, ms = LIMITE_MS) {
  try {
    const { data, error } = await conLimite(consulta, ms)
    if (error) return { data: null, error: mensajeError(error) }
    return { data, error: null }
  } catch (e) {
    return { data: null, error: mensajeError(e) }
  }
}
