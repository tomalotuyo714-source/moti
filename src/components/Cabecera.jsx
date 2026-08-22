import { useNavigate } from 'react-router-dom'
import { Flecha } from './Iconos.jsx'

// Cabecera con flecha de volver. El titulo va pequeno al lado de la
// flecha; el titulo grande de la pantalla va aparte, en el cuerpo,
// para que respire.

export default function Cabecera({ titulo, atras }) {
  const navegar = useNavigate()
  return (
    <div className="cabecera">
      <button
        className="volver"
        aria-label="Volver"
        onClick={() => (atras ? atras() : navegar(-1))}
      >
        <Flecha />
      </button>
      {titulo && <h1 className="titulo">{titulo}</h1>}
    </div>
  )
}
