# Moti

Plataforma de intermediacion tecnologica para el transporte fluvial y terrestre
en el nodo Leticia (Colombia) – Tabatinga (Brasil) y el rio Amazonas.

**Version 0 — piloto de rastreo fluvial.** Todo corre en capas gratuitas.
Costo de operacion: $0.

---

## Que hace hoy

| Quien | Que puede hacer |
|---|---|
| **Capitan** | Registrar su embarcacion, programar viajes con paradas y tarifario, ver el manifiesto, marcar llegada a cada muelle, entregar con codigo |
| **Remitente** | Registrar carga sin medir cajas, comparar barcos, reservar cupo, compartir el codigo de rastreo |
| **Destinatario** | Ver el estado del envio y obtener su codigo de retiro, **sin cuenta y sin instalar nada** |

---

## Como ponerlo a andar

### 1. Crear el proyecto en Supabase

1. Entre a [supabase.com](https://supabase.com) y cree una cuenta gratis.
2. Cree un proyecto nuevo. Elija la region mas cercana.
3. Vaya a **SQL Editor**, pegue todo el contenido de
   `supabase/migrations/0001_init.sql` y presione **Run**.
4. Vaya a **Project Settings → API** y copie:
   - **Project URL**
   - **anon public key**

> La `anon key` es publica por diseno y puede ir en el frontend.
> La `service_role key` **nunca** se usa aqui.

### 2. Configurar el proyecto

```bash
npm install
cp .env.example .env
```

Abra `.env` y ponga la URL y la anon key que copio.

### 3. Correr

```bash
npm run dev
```

Abra la direccion que aparece en la terminal. Para probar desde el celular en
la misma red WiFi, use la direccion que dice "Network".

### 4. Probar el flujo completo

1. Entre con un correo y cree un perfil de **capitan**.
2. Registre una embarcacion y programe un viaje con dos paradas.
3. Salga, entre con **otro correo** y cree un perfil de **remitente**.
4. Registre un envio y copie el codigo que aparece.
5. Abra `/rastreo` en otra ventana y pegue el codigo: esa es la vista del
   destinatario.
6. Vuelva a la cuenta del capitan, marque el zarpe y la llegada al muelle.
7. Recargue el rastreo: ya deben aparecer los avisos.

---

## Publicar gratis

```bash
npm run build
```

Suba el repositorio a GitHub y conectelo a [Vercel](https://vercel.com) o
[Netlify](https://netlify.com), ambos con capa gratis. Agregue las dos
variables de entorno en el panel del servicio. Queda en linea con HTTPS y se
puede instalar en el celular desde el navegador.

---

## Documentacion

| Archivo | Contenido |
|---|---|
| `CLAUDE.md` | Reglas del proyecto para agentes y programadores |
| `docs/ESPECIFICACION.md` | El producto completo: 43 funcionalidades, terminos legales, modelo de negocio |
| `docs/FASE-0.md` | Que validar en el muelle **antes** de seguir programando |
| `.claude/agents/` | Agentes especializados del proyecto |

---

## Advertencia legal

Los textos legales de `docs/ESPECIFICACION.md` son borradores de trabajo.
**No son asesoria juridica.** Antes de cobrar un solo peso deben ser revisados
por un abogado comercial colombiano.

Mientras el piloto sea gratuito y entre conocidos, no hay cobro ni
intermediacion de dinero.
