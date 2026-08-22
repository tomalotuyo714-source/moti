import { NavLink } from 'react-router-dom'
import { Casa, Caja, Lista, Persona, Barco } from './Iconos.jsx'

// Barra inferior fija. Cuatro destinos y nada mas: si hay que
// pensar cual tocar, ya son demasiados.
//
// El capitan y el remitente ven barras distintas porque hacen
// cosas distintas. Un capitan no envia carga; un comerciante no
// programa viajes.

export default function NavInferior({ rol }) {
  const items =
    rol === 'capitan'
      ? [
          { a: '/', icono: <Casa />, nombre: 'Inicio', exacto: true },
          { a: '/viajes', icono: <Barco />, nombre: 'Mis viajes' },
          { a: '/rastreo', icono: <Lista />, nombre: 'Rastrear' },
          { a: '/cuenta', icono: <Persona />, nombre: 'Cuenta' },
        ]
      : [
          { a: '/', icono: <Casa />, nombre: 'Inicio', exacto: true },
          { a: '/enviar', icono: <Caja />, nombre: 'Enviar' },
          { a: '/mis-envios', icono: <Lista />, nombre: 'Actividad' },
          { a: '/cuenta', icono: <Persona />, nombre: 'Cuenta' },
        ]

  return (
    <nav className="nav">
      <div className="interior">
        {items.map((i) => (
          <NavLink
            key={i.a}
            to={i.a}
            end={i.exacto}
            className={({ isActive }) => (isActive ? 'activo' : undefined)}
          >
            {i.icono}
            <span>{i.nombre}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
