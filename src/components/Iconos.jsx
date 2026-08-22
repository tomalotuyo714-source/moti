// Iconos de linea dibujados a mano en SVG.
//
// Nada de librerias de iconos: cada una pesa cientos de kilobytes y
// aqui la app se abre con la senal del muelle. Estos son ocho trazos
// que se heredan del color del texto.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 24, children, ...resto }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...resto}>
      {children}
    </svg>
  )
}

export function Flecha({ size }) {
  return (
    <Svg size={size}>
      <path {...base} d="M19 12H5M11 18l-6-6 6-6" />
    </Svg>
  )
}

export function FlechaDerecha({ size = 20 }) {
  return (
    <Svg size={size}>
      <path {...base} d="M9 18l6-6-6-6" />
    </Svg>
  )
}

export function Lupa({ size }) {
  return (
    <Svg size={size}>
      <circle {...base} cx="11" cy="11" r="7" />
      <path {...base} d="M20 20l-3.5-3.5" />
    </Svg>
  )
}

export function Reloj({ size = 20 }) {
  return (
    <Svg size={size}>
      <circle {...base} cx="12" cy="12" r="9" />
      <path {...base} d="M12 7v5l3.5 2" />
    </Svg>
  )
}

export function Casa({ size = 22 }) {
  return (
    <Svg size={size}>
      <path {...base} d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
    </Svg>
  )
}

export function Caja({ size = 22 }) {
  return (
    <Svg size={size}>
      <path {...base} d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path {...base} d="M3.5 7.5L12 12l8.5-4.5M12 12v9" />
    </Svg>
  )
}

export function Lista({ size = 22 }) {
  return (
    <Svg size={size}>
      <path {...base} d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
    </Svg>
  )
}

export function Persona({ size = 22 }) {
  return (
    <Svg size={size}>
      <circle {...base} cx="12" cy="8" r="3.6" />
      <path {...base} d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </Svg>
  )
}

export function Estrella({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.35 6.19 20.4l1.11-6.47L2.6 9.35l6.5-.95z"
      />
    </svg>
  )
}

export function Barco({ size = 22 }) {
  return (
    <Svg size={size}>
      <path {...base} d="M3 18.5c1.6 0 1.6 1.2 3.2 1.2s1.6-1.2 3.2-1.2 1.6 1.2 3.2 1.2 1.6-1.2 3.2-1.2 1.6 1.2 3.2 1.2" />
      <path {...base} d="M5 15l1.2-4.2A1.5 1.5 0 0 1 7.6 9.7h8.8a1.5 1.5 0 0 1 1.4 1.1L19 15" />
      <path {...base} d="M12 9.7V5m0 0H8.5M12 5h3.5" />
    </Svg>
  )
}
