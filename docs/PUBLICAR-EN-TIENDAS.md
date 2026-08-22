# Publicar Moti en las tiendas

Esta guía cubre los pasos que **solo puede hacer Neo**. Todo lo demás
—el código nativo, la compilación, los iconos, los textos— ya está listo
en el repositorio.

Hay tres cosas que un agente no puede hacer por usted, y no es por
capricho técnico: crear cuentas, pagar, y aceptar contratos legales.
Firmar un acuerdo de distribución con Google en su nombre lo dejaría a
usted obligado por algo que usted no leyó.

---

## Lo que ya está hecho

| Pieza | Estado |
|---|---|
| Proyecto Android con Capacitor | ✅ `android/` |
| Notificaciones de llegada al muelle | ✅ Realtime + push |
| Foto de entrega con la cámara | ✅ opcional, sube a Supabase Storage |
| Ubicación del muelle al marcar llegada | ✅ una lectura, nunca en segundo plano |
| Compartir nativo | ✅ |
| Manifiesto sin señal | ✅ con la fecha de la copia siempre visible |
| Enlaces de rastreo que abren la app | ✅ falta publicar `assetlinks.json` |
| Iconos en todas las densidades | ✅ |
| Compilación automática | ✅ `.github/workflows/android.yml` |
| Política de privacidad | ✅ `/privacidad.html` — **faltan sus datos** |
| Textos de la ficha | ✅ `tienda/FICHA-PLAY.md` |
| Capturas y gráfico destacado | ✅ `tienda/play/` |
| Migración de base de datos | ⬜ falta correr `0004_funciones_nativas.sql` |

---

## Orden de los pasos

### 1. Correr la migración 0004

Supabase → SQL Editor → pegar `supabase/migrations/0004_funciones_nativas.sql`
→ Run.

Crea la tabla de dispositivos, las columnas de ubicación y foto, y el
espacio privado donde se guardan las fotos de entrega.

**Sin esto, la app nativa compila pero la foto y las notificaciones
fallan en silencio.**

---

### 2. Llenar la política de privacidad

Abra `public/privacidad.html` y reemplace:

- `[NOMBRE COMPLETO O RAZÓN SOCIAL]`
- `[CÉDULA O NIT]`
- `[DIRECCIÓN]`
- `[CORREO DE CONTACTO]` (aparece dos veces)

Mientras no exista la S.A.S., el responsable es usted como persona
natural. Eso es válido: la Ley 1581 no exige ser empresa.

🔴 **Google rechaza la app si la política no corresponde con lo que la
app hace.** La que le dejé escrita describe exactamente los datos que
Moti recolecta hoy, ni uno más. No la reemplace por la Sección 20 del
documento grande: esa describe la app completa —cédulas, antecedentes,
billetera, chat— y nada de eso existe todavía. Declarar datos que no
recolecta es tan problemático como ocultar los que sí.

---

### 3. Crear la llave de firma

Es el archivo que le demuestra a Google que las actualizaciones vienen
de usted. **Si lo pierde, no puede volver a actualizar la app nunca**
—toca publicarla de cero con otro nombre de paquete.

En el símbolo del sistema de Windows, dentro de la carpeta del proyecto:

```
keytool -genkeypair -v -keystore moti-subida.jks -keyalg RSA -keysize 2048 -validity 10000 -alias moti
```

Le va a pedir una contraseña y unos datos (nombre, ciudad, país: CO).
Ponga una contraseña que **no use en ningún otro lado** y guárdela en su
gestor de contraseñas.

Después:

- Guarde `moti-subida.jks` en dos sitios distintos que no sean el
  computador (una nube y una USB, por ejemplo).
- **No lo suba al repositorio.** Ya lo dejé bloqueado en `.gitignore`,
  pero verifíquelo.

Yo no genero esta llave por usted a propósito: implicaría que yo elija y
conozca su contraseña de firma.

---

### 4. Cargar los secretos en GitHub

GitHub → repositorio `moti` → Settings → Secrets and variables → Actions
→ New repository secret. Cree estos seis:

| Nombre | Valor |
|---|---|
| `VITE_SUPABASE_URL` | El de su `.env` |
| `VITE_SUPABASE_ANON_KEY` | El de su `.env` |
| `MOTI_KEYSTORE_BASE64` | El `.jks` convertido a base64 (abajo dice cómo) |
| `MOTI_KEYSTORE_PASSWORD` | La contraseña que puso |
| `MOTI_KEY_ALIAS` | `moti` |
| `MOTI_KEY_PASSWORD` | La misma contraseña, salvo que haya puesto otra |

Para convertir el llavero a base64, en PowerShell:

```
[Convert]::ToBase64String([IO.File]::ReadAllBytes("moti-subida.jks")) | Set-Clipboard
```

Queda en el portapapeles; péguelo en el secreto.

---

### 5. Compilar

GitHub → pestaña **Actions** → *Android* → **Run workflow**.

A los ~6 minutos, en esa misma corrida, aparecen dos descargas:

- **moti-aab** → el archivo que sube a Play.
- **moti-apk** → instálelo directo en su celular para probar antes de
  subir nada.

Si el resumen dice *«Firmado: NO»*, es que faltó algún secreto.

---

### 6. Cuenta de Google Play — 25 USD, una vez

<https://play.google.com/console/signup>

- Tipo de cuenta: **Personal**.
- Le van a pedir verificar identidad con un documento.
- Se paga una sola vez, para siempre.

⚠️ **El requisito que sorprende a todo el mundo:** las cuentas
personales creadas después del 13 de noviembre de 2023 tienen que hacer
una **prueba cerrada con 12 personas participando 14 días seguidos**
antes de poder publicar. No son 12 descargas: son 12 personas que
permanezcan inscritas los 14 días completos. Si alguien se sale a mitad,
no cuenta.

**Aproveche eso.** Esos 12 testers pueden ser los capitanes y los
comerciantes de Leticia. El trámite de Google le sirve de validación de
campo, que es justamente lo que le falta hacer. Los invita por correo
electrónico desde Play Console.

---

### 7. Crear la ficha

Play Console → Crear app → nombre `Moti`, español, gratuita.

Copie y pegue todo lo de `tienda/FICHA-PLAY.md`. Ahí están la
descripción corta, la larga, las respuestas del formulario de seguridad
de los datos, la justificación de cada permiso y el texto para los
testers.

Suba las imágenes de `tienda/play/`.

---

### 8. Publicar el `assetlinks.json`

Esto hace que el enlace de rastreo que se comparte por WhatsApp abra la
app en vez del navegador, cuando la persona la tenga instalada.

Después de subir el primer AAB, Play Console → Configuración → Integridad
de la app → copie la **huella SHA-256** del certificado de firma de apps.

Luego cree `public/.well-known/assetlinks.json`:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "co.moti.app",
    "sha256_cert_fingerprints": ["LA HUELLA QUE COPIÓ"]
  }
}]
```

Suba el cambio y Vercel lo publica. Sin esto la app funciona igual; solo
que los enlaces abren en el navegador.

---

### 9. Notificaciones con la app cerrada (opcional al principio)

Con lo que ya está, los avisos llegan cuando la app está abierta o
recién usada. Para que suenen con la app cerrada del todo hace falta
Firebase:

1. <https://console.firebase.google.com> → crear proyecto → agregar app
   Android con el paquete `co.moti.app`.
2. Descargar `google-services.json` y ponerlo en `android/app/`.
   *(Está en `.gitignore`: súbalo como secreto de GitHub o agréguelo a
   mano antes de compilar.)*
3. Firebase → Configuración → Cuentas de servicio → generar clave
   privada. Ese JSON va como secreto `FCM_SERVICE_ACCOUNT` en Supabase →
   Edge Functions → Secrets.
4. Desplegar la función: `npx supabase functions deploy avisar-evento`
5. Supabase → Database → Webhooks → nuevo webhook sobre `INSERT` en la
   tabla `eventos`, apuntando a esa función.

El código de la función ya está escrito en
`supabase/functions/avisar-evento/index.ts`.

Es gratis en el volumen del piloto.

---

## Después: App Store

Cuando decida pagar los 99 USD al año:

```
npm i @capacitor/ios && npx cap add ios
```

Y hay que agregar un workflow de macOS —GitHub lo da gratis porque el
repositorio es público, así que **no necesita comprar un Mac**.

Lo que sí necesita: cuenta de Apple Developer, certificados y perfiles
de aprovisionamiento. Todo eso pasa por credenciales suyas.

Sobre el rechazo por *guideline 4.2*: las cuatro funciones nativas que
ya quedaron —notificaciones, cámara, ubicación y trabajo sin señal— son
exactamente lo que Apple exige para no tratar la app como «un sitio web
reempaquetado». En la nota para el revisor explique que la app la usan
capitanes en el río Amazonas sin cobertura, y que por eso el manifiesto
funciona sin conexión.

---

## Cuánto cuesta, en total

| Concepto | Cuánto | Cada cuánto |
|---|---|---|
| Cuenta de Google Play | 25 USD (~100 mil pesos) | Una sola vez |
| Cuenta de Apple Developer | 99 USD (~400 mil pesos) | Cada año |
| Compilación en GitHub Actions | 0 | — |
| Supabase (capa gratis) | 0 | — |
| Vercel (capa gratis) | 0 | — |
| Firebase Cloud Messaging | 0 | — |

Para arrancar en Android son 25 USD y nada más.

---

## Lo que sigue pendiente del proyecto

- 🔴 Constitución de la S.A.S. y revisión del abogado sobre los términos
  y la política de datos.
- 🔴 La vulnerabilidad de `react-router` (severidad moderada). Hay que
  subir a la versión 7, que es un cambio mayor.
- 🟡 Validación de campo con capitanes y comerciantes reales
  (`docs/FASE-0.md`) — que ahora coincide con los 12 testers que Google
  exige de todas formas.
