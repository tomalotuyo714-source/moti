// Salida y destino unidos por una linea: circulo arriba, cuadrado
// abajo. Es el mismo dibujo que la gente ya vio mil veces en el
// recibo de un viaje, asi que no hay que explicarlo.
//
// Va en rejilla, una fila por parada, para que cada marca quede
// pegada a la linea de texto que le corresponde. Con flex la marca
// de abajo se desalineaba cuando un nombre de muelle ocupaba dos
// renglones.

export default function Ruta({ paradas, compacta = false }) {
  const lista = (paradas ?? []).filter(Boolean)
  if (!lista.length) return null

  return (
    <div className={'ruta' + (compacta ? ' compacta' : '')}>
      {lista.map((p, i) => {
        const ultima = i === lista.length - 1
        const intermedia = i > 0 && !ultima
        return (
          <div key={i} className="tramo">
            <div className={'riel' + (ultima ? ' fin' : '')}>
              {ultima ? (
                <span className="cuadro" />
              ) : (
                <span className={'punto' + (intermedia ? ' chico' : '')} />
              )}
            </div>
            <div className="parada">
              <div className="hora">{p.hora}</div>
              <div className="lugar">{p.lugar}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
