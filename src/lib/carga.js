// -------------------------------------------------------------
// Reglas de negocio del calculo de carga.
//
// Regla 4.11 del documento: al cliente NUNCA se le piden las
// dimensiones de las cajas. Elige un tipo de caja con un dibujo,
// usa el multiplicador (+/-) y escribe el peso bruto total.
// El sistema cobra el mayor entre el peso real y el volumen.
// -------------------------------------------------------------

// Cada tipo de caja tiene un volumen equivalente en kilos,
// precalculado e invisible para el usuario.
export const TIPOS_CAJA = [
  {
    id: 'pequena',
    etiqueta: 'Caja pequena',
    ejemplo: 'Caja de cerveza, abarrotes',
    icono: '📦',
    volumenEquivalenteKg: 8,
  },
  {
    id: 'mediana',
    etiqueta: 'Caja mediana',
    ejemplo: 'Caja de carton estandar',
    icono: '📦',
    volumenEquivalenteKg: 18,
  },
  {
    id: 'grande',
    etiqueta: 'Caja grande / liviana',
    ejemplo: 'Pacas de papel higienico, icopor',
    icono: '🧻',
    volumenEquivalenteKg: 35,
  },
  {
    id: 'bulto',
    etiqueta: 'Bulto de lona',
    ejemplo: 'Viveres, cemento, granos',
    icono: '🧳',
    volumenEquivalenteKg: 25,
  },
]

export function tipoCaja(id) {
  return TIPOS_CAJA.find((t) => t.id === id)
}

/** Suma el volumen equivalente de todas las piezas seleccionadas. */
export function volumenEquivalente(items) {
  return items.reduce((total, item) => {
    const tipo = tipoCaja(item.tipo_caja)
    return total + (tipo ? tipo.volumenEquivalenteKg * item.cantidad : 0)
  }, 0)
}

/**
 * Kilos cobrables = el mayor entre el peso real de la bascula y el
 * volumen que la carga le quita al barco.
 * Asi el capitan no pierde plata llevando cosas livianas y gigantes.
 */
export function kilosCobrables(pesoDeclaradoKg, items) {
  return Math.max(Number(pesoDeclaradoKg) || 0, volumenEquivalente(items))
}

/** Tarifa del viaje segun el tarifario que el capitan definio. */
export function calcularValor(viaje, kgCobrables) {
  if (viaje.precio_por_tonelada && kgCobrables >= 1000) {
    return Math.round((kgCobrables / 1000) * Number(viaje.precio_por_tonelada))
  }
  return Math.round(kgCobrables * Number(viaje.precio_por_kg || 0))
}

/** Token OTP de 4 digitos para el retiro seguro en el muelle. */
export function generarToken() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

/** Codigo publico corto para el link de rastreo. Sin letras ambiguas. */
export function generarCodigoPublico() {
  const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let codigo = 'MT'
  for (let i = 0; i < 6; i++) {
    codigo += alfabeto[Math.floor(Math.random() * alfabeto.length)]
  }
  return codigo
}

export function pesos(valor) {
  return '$' + new Intl.NumberFormat('es-CO').format(Math.round(Number(valor) || 0))
}

export function fecha(iso) {
  if (!iso) return '-'
  return new Date(iso).toLocaleString('es-CO', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const ESTADOS_ENVIO = {
  registrado: { texto: 'Registrado', color: 'gris' },
  a_bordo: { texto: 'A bordo', color: 'ambar' },
  en_navegacion: { texto: 'En navegacion', color: 'verde' },
  en_muelle: { texto: 'Llegando al muelle', color: 'ambar' },
  entregado: { texto: 'Entregado', color: 'verde' },
  cancelado: { texto: 'Cancelado', color: 'gris' },
}
