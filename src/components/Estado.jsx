// Estados compartidos de pantalla: cargando, error y vacio.
// Regla del proyecto: un fallo de red NUNCA se muestra como
// "no tiene nada". Si el usuario ve "no tiene envios" cuando en
// realidad se cayo la senal, va a registrar el envio dos veces.

export function Cargando({ texto = 'Cargando…' }) {
  return <div className="vacio">{texto}</div>
}

export function Vacio({ children }) {
  return <div className="vacio">{children}</div>
}

export function ErrorRed({ mensaje, onReintentar }) {
  return (
    <div className="tarjeta">
      <h3>No se pudo cargar</h3>
      <div className="aviso critico">{mensaje}</div>
      {onReintentar && (
        <>
          <div style={{ height: 8 }} />
          <button onClick={onReintentar}>Reintentar</button>
        </>
      )}
    </div>
  )
}
