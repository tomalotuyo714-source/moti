-- =============================================================
-- MOTI - Cierre de hueco encontrado en el pentest
--
-- Hallazgo: el `revoke select (token)` de la migracion 0002 NO
-- funcionaba. En PostgreSQL, si un rol tiene SELECT a nivel de
-- TABLA, ese permiso anula cualquier revoke a nivel de columna.
-- Supabase concede SELECT de tabla a anon y authenticated por
-- defecto, asi que un capitan autenticado podia leer el token de
-- retiro y el telefono del destinatario directo desde la API, y
-- con eso marcar una entrega sin que el destinatario estuviera.
--
-- Arreglo: quitar el SELECT de tabla y concederlo columna por
-- columna, EXCEPTO token y destinatario_telefono. Las funciones
-- rastrear_envio y entregar_envio son SECURITY DEFINER y siguen
-- accediendo a esas columnas por dentro, asi que el flujo legitimo
-- del destinatario no se afecta.
--
-- Verificado con pruebas de penetracion reales contra la instancia:
--   - capitan lee token  -> 403 permission denied
--   - capitan lee telefono -> 403 permission denied
--   - capitan lee resto  -> 200 OK
--   - destinatario con telefono correcto -> obtiene su token
--   - atacante con telefono incorrecto  -> no obtiene nada
-- =============================================================

revoke select on envios from anon, authenticated;

grant select (
  id, viaje_id, parada_id, remitente_id,
  destinatario_nombre,
  peso_declarado_kg, volumen_equivalente_kg, kg_cobrables,
  fragil, pago, valor, estado,
  codigo_publico, creado_en, intentos_token
) on envios to anon, authenticated;

-- NOTA: la migracion 0002 hacia "revoke select (token)"; se deja de
-- depender de eso. Cualquier columna nueva que se agregue a envios en
-- el futuro NO sera legible por la API hasta que se agregue aqui a la
-- lista del grant. Eso es a proposito: las columnas sensibles quedan
-- ocultas por defecto.
