// Pantalla que reemplaza al error en blanco cuando falta el .env.
export default function SinConfigurar() {
  return (
    <div className="tarjeta">
      <h2>Falta conectar la base de datos</h2>
      <p className="sub">
        La aplicacion esta bien instalada, pero todavia no sabe a que servidor
        conectarse.
      </p>

      <div className="aviso">
        Cree el archivo <strong>.env</strong> en la carpeta del proyecto con
        estas dos lineas, usando los datos de su proyecto en Supabase:
      </div>

      <div className="codigo" style={{ textAlign: 'left', fontSize: 13, lineHeight: 1.8 }}>
        VITE_SUPABASE_URL=https://xxxxx.supabase.co
        <br />
        VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
      </div>

      <p className="sub" style={{ marginTop: 16 }}>
        Los saca de: supabase.com &rarr; su proyecto &rarr; Project Settings &rarr; API.
        Despues de guardar el archivo, apague y vuelva a encender el servidor.
      </p>
    </div>
  )
}
