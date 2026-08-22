import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { Persona, FlechaDerecha, Lista } from '../components/Iconos.jsx'

export default function Cuenta({ perfil, sesion }) {
  const navegar = useNavigate()

  async function salir() {
    await supabase.auth.signOut()
    navegar('/entrar')
  }

  return (
    <>
      <div className="cabecera">
        <h1 className="titulo" style={{ fontSize: 22, fontWeight: 700, marginLeft: 4 }}>
          Cuenta
        </h1>
      </div>

      <main>
        <div className="fila" style={{ alignItems: 'center', gap: 16, margin: '8px 0 24px' }}>
          <span
            className="icono-redondo"
            style={{ width: 64, height: 64, flex: '0 0 64px', background: 'var(--superficie-2)' }}
          >
            <Persona size={30} />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
              {perfil?.nombre}
            </div>
            <div className="mini">
              {perfil?.rol === 'capitan' ? 'Capitán de embarcación' : 'Envía mercancía'}
            </div>
          </span>
        </div>

        <div className="desglose">
          <div>
            <span className="clave">Celular</span>
            <span className="valor">{perfil?.telefono}</span>
          </div>
          <div>
            <span className="clave">Correo</span>
            <span className="valor" style={{ wordBreak: 'break-all' }}>
              {sesion?.user?.email}
            </span>
          </div>
        </div>

        <div style={{ height: 24 }} />

        <button className="sugerencia" onClick={() => navegar('/rastreo')}>
          <span className="icono-redondo">
            <Lista size={20} />
          </span>
          <span className="cuerpo">
            <span className="titulo">Rastrear con un código</span>
            <span className="pie">Para seguir un envío que le mandaron</span>
          </span>
          <span className="flecha">
            <FlechaDerecha />
          </span>
        </button>

        <div style={{ height: 24 }} />

        <button className="secundario" onClick={salir}>
          Cerrar sesión
        </button>

        <p className="mini" style={{ marginTop: 28, lineHeight: 1.6 }}>
          Moti es una plataforma de intermediación tecnológica. Conecta a operadores
          independientes con quienes necesitan mover mercancía. Moti no custodia, no
          inspecciona y no responde por la carga. Las fechas de llegada son estimaciones
          referenciales y dependen del nivel del río.
        </p>
      </main>
    </>
  )
}
