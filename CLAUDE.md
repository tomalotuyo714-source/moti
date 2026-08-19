# Moti — reglas del proyecto

Contexto para cualquier agente o persona que toque este repositorio.

## Que es Moti

Una **plataforma de intermediacion tecnologica** para el nodo fronterizo
Leticia (Colombia) – Tabatinga (Brasil) y la logistica fluvial del rio Amazonas
hacia Tarapaca, La Chorrera y Puerto Narino.

**Moti NO es una empresa de transporte.** Licencia un software que conecta
operadores independientes con usuarios. Esta distincion no es de mercadeo: es
la que sostiene toda la estructura legal del proyecto.

## Estado actual: version 0 — piloto de rastreo fluvial

Lo unico que se construye ahora:

- El capitan registra su embarcacion, programa un viaje con sus paradas y
  define su propio tarifario.
- El remitente registra la carga, elige barco y muelle, y reserva cupo.
- El destinatario, **sin cuenta y sin descargar nada**, entra con un codigo,
  ve el estado del envio y obtiene su codigo de retiro.
- El capitan marca la llegada a cada muelle y eso avisa a los clientes.
- La entrega se cierra con el codigo de retiro de 4 digitos.

**Fuera de la version 0:** pagos dentro de la app, GPS en vivo, motocargas,
cargadores del muelle, transporte de personas, facturacion, notificaciones
automaticas, apps nativas. Todo eso esta en `docs/ESPECIFICACION.md` para
despues. No lo construya todavia.

## Reglas que no se rompen

### Lenguaje
Nunca use en la interfaz: "taxi", "tarifa de transporte", "servicio de
transporte", "pasaje", "nuestros conductores", "nuestra flota".
Use: "aporte sugerido", "costo de intermediacion", "servicio de mensajeria",
"conductor colaborador", "operador independiente".

### Responsabilidad
Moti no custodia, no inspecciona, no asegura y no responde por la mercancia.
Ningun texto ni funcionalidad puede insinuar lo contrario. Nada de seguros,
garantias, coberturas ni indemnizaciones.

### Tiempos
Las fechas de llegada son **estimaciones referenciales**, nunca promesas.

### Datos
- La `service_role key` de Supabase jamas va en el frontend.
- Toda tabla nueva lleva politicas RLS en la misma migracion que la crea.
- El codigo de retiro solo lo ve el destinatario, previa verificacion de los
  ultimos 4 digitos de su celular.
- Moti no envia mensajes automaticos a numeros no verificados. El remitente
  comparte el enlace desde su propio celular.

## Como esta armado

```
src/lib/carga.js        Reglas de negocio del calculo de carga
src/lib/supabase.js     Cliente de Supabase
src/pages/              Una pantalla por archivo
src/styles.css          Estilos e identidad visual
supabase/migrations/    Esquema y politicas RLS
docs/ESPECIFICACION.md  El documento completo del producto
docs/FASE-0.md          Que hacer antes de programar mas
.claude/agents/         Agentes del proyecto
```

## Decisiones tecnicas

- **React + Vite**, PWA instalable. Sin tiendas de aplicaciones todavia.
- **Supabase** (capa gratis): PostgreSQL, autenticacion y API.
- **Entrada por enlace magico al correo.** Nada de SMS: cuesta plata.
- **Sin pasarelas de pago.** El pago es directo entre las partes.
- Nombres de tablas y columnas en espanol, sin tildes ni enes.

## Diseno

Verde `#0B6E5E` principal · Ambar `#F2A33C` secundario · Rojo `#FF0000`
**reservado exclusivamente para alertas criticas**, nunca decorativo.

Area tactil minima 48x48 px. Texto de formularios 16 px o mas. Siempre los
tres estados: cargando, vacio y error.

## Antes de dar algo por terminado

1. `npm run build` compila.
2. Los tres estados estan cubiertos.
3. Ninguna palabra prohibida quedo en la interfaz.
4. Las tablas nuevas tienen RLS.
