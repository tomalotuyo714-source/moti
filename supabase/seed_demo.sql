-- =============================================================
-- MOTI - Datos de demostracion
--
-- Sirven para mostrarle la app a un capitan o a un comerciante sin
-- que vea pantallas vacias. NO son datos reales: los nombres, los
-- telefonos y los correos son inventados y el dominio .test no
-- existe ni puede existir (RFC 2606).
--
-- Es idempotente: se puede correr las veces que sea. Borra lo suyo
-- y lo vuelve a crear. No toca ningun dato de usuarios reales.
--
-- Para borrarlo todo cuando arranque el piloto de verdad:
--   delete from auth.users where email like '%@moti.test';
-- (el on delete cascade se lleva perfiles, viajes y envios)
-- =============================================================

-- -------------------------------------------------------------
-- 0. Limpieza de una corrida anterior
-- -------------------------------------------------------------
delete from auth.users where email like '%@moti.test';

-- -------------------------------------------------------------
-- 1. Dos cuentas de mentira
--    perfiles.id apunta a auth.users, asi que los datos de
--    demostracion necesitan usuarios. Sin contrasena utilizable:
--    nadie puede entrar con ellas.
-- -------------------------------------------------------------
insert into auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
) values
  ('11111111-1111-4111-8111-111111111111',
   '00000000-0000-0000-0000-000000000000',
   'authenticated', 'authenticated', 'capitan.demo@moti.test',
   null, now(),
   '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
   now() - interval '40 days', now()),
  ('22222222-2222-4222-8222-222222222222',
   '00000000-0000-0000-0000-000000000000',
   'authenticated', 'authenticated', 'remitente.demo@moti.test',
   null, now(),
   '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
   now() - interval '30 days', now());

-- -------------------------------------------------------------
-- 2. Perfiles
-- -------------------------------------------------------------
insert into perfiles (id, nombre, telefono, rol, creado_en) values
  ('11111111-1111-4111-8111-111111111111',
   'Capitán de muestra', '+57 300 000 0001', 'capitan', now() - interval '40 days'),
  ('22222222-2222-4222-8222-222222222222',
   'Comerciante de muestra', '+57 300 000 0002', 'remitente', now() - interval '30 days');

-- -------------------------------------------------------------
-- 3. Embarcaciones
-- -------------------------------------------------------------
insert into embarcaciones (id, capitan_id, nombre, matricula, capacidad_kg, creado_en) values
  ('aaaaaaaa-0000-4000-8000-000000000001',
   '11111111-1111-4111-8111-111111111111',
   'Nuevo Amanecer', 'DEMO-001', 8000, now() - interval '40 days'),
  ('aaaaaaaa-0000-4000-8000-000000000002',
   '11111111-1111-4111-8111-111111111111',
   'Estrella del Río', 'DEMO-002', 12000, now() - interval '20 days');

-- -------------------------------------------------------------
-- 4. Viajes
--    Uno que todavia no zarpa (para reservar cupo) y otro ya
--    navegando (para ver el rastreo en movimiento).
-- -------------------------------------------------------------
insert into viajes (
  id, embarcacion_id, capitan_id, origen, fecha_salida, estado,
  aforo_kg, precio_por_kg, precio_por_tonelada, notas, creado_en
) values
  ('bbbbbbbb-0000-4000-8000-000000000001',
   'aaaaaaaa-0000-4000-8000-000000000001',
   '11111111-1111-4111-8111-111111111111',
   'Leticia', now() + interval '3 days', 'programado',
   8000, 2500, 1800000,
   'Recibo carga hasta el día anterior a mediodía. No llevo combustible ni animales vivos.',
   now() - interval '6 days'),
  ('bbbbbbbb-0000-4000-8000-000000000002',
   'aaaaaaaa-0000-4000-8000-000000000002',
   '11111111-1111-4111-8111-111111111111',
   'Leticia', now() - interval '2 days', 'en_navegacion',
   12000, 2800, 2100000,
   'Viaje largo. La llegada depende del nivel del río.',
   now() - interval '12 days');

-- -------------------------------------------------------------
-- 5. Paradas
-- -------------------------------------------------------------
insert into paradas (id, viaje_id, orden, muelle, estado, hora_llegada, hora_salida) values
  ('cccccccc-0000-4000-8000-000000000001',
   'bbbbbbbb-0000-4000-8000-000000000001', 1, 'Puerto Nariño',   'pendiente', null, null),
  ('cccccccc-0000-4000-8000-000000000002',
   'bbbbbbbb-0000-4000-8000-000000000001', 2, 'Santa Sofía',     'pendiente', null, null),
  ('cccccccc-0000-4000-8000-000000000003',
   'bbbbbbbb-0000-4000-8000-000000000002', 1, 'Puerto Nariño',   'completada',
   now() - interval '32 hours', now() - interval '30 hours'),
  ('cccccccc-0000-4000-8000-000000000004',
   'bbbbbbbb-0000-4000-8000-000000000002', 2, 'Tarapacá',        'proximo', null, null),
  ('cccccccc-0000-4000-8000-000000000005',
   'bbbbbbbb-0000-4000-8000-000000000002', 3, 'La Chorrera',     'pendiente', null, null);

-- -------------------------------------------------------------
-- 6. Envios
--    El token y el codigo publico los pone el trigger del servidor
--    (migracion 0002). Despues se les fija un codigo legible para
--    poder mostrar el rastreo en una demostracion.
-- -------------------------------------------------------------
insert into envios (
  id, viaje_id, parada_id, remitente_id,
  destinatario_nombre, destinatario_telefono,
  peso_declarado_kg, volumen_equivalente_kg, kg_cobrables,
  fragil, pago, valor, token, codigo_publico, creado_en
) values
  -- 3 cajas medianas = 54 kg de volumen contra 45 kg de bascula.
  -- Cobra 54 porque le quita mas espacio del que pesa.
  ('dddddddd-0000-4000-8000-000000000001',
   'bbbbbbbb-0000-4000-8000-000000000001',
   'cccccccc-0000-4000-8000-000000000001',
   '22222222-2222-4222-8222-222222222222',
   'Destinatario de muestra', '+57 310 000 0011',
   45, 54, 54, false, 'origen', 135000, 'x', 'x', now() - interval '2 days'),

  -- 1 bulto = 25 kg de volumen contra 80 kg de bascula: manda el peso.
  ('dddddddd-0000-4000-8000-000000000002',
   'bbbbbbbb-0000-4000-8000-000000000002',
   'cccccccc-0000-4000-8000-000000000004',
   '22222222-2222-4222-8222-222222222222',
   'Tienda de muestra', '+57 320 000 0022',
   80, 25, 80, false, 'destino', 224000, 'x', 'x', now() - interval '9 days'),

  -- Carga fragil y voluminosa: 2 cajas grandes = 70 kg de volumen.
  ('dddddddd-0000-4000-8000-000000000003',
   'bbbbbbbb-0000-4000-8000-000000000002',
   'cccccccc-0000-4000-8000-000000000005',
   '22222222-2222-4222-8222-222222222222',
   'Puesto de salud de muestra', '+57 315 000 0033',
   22, 70, 70, true, 'origen', 196000, 'x', 'x', now() - interval '10 days');

-- Codigos legibles y tokens fijos, solo para la demostracion.
update envios set codigo_publico = 'MTDEMO01', token = '4821'
  where id = 'dddddddd-0000-4000-8000-000000000001';
update envios set codigo_publico = 'MTDEMO02', token = '7390', estado = 'en_navegacion'
  where id = 'dddddddd-0000-4000-8000-000000000002';
update envios set codigo_publico = 'MTDEMO03', token = '1657', estado = 'en_muelle'
  where id = 'dddddddd-0000-4000-8000-000000000003';

-- -------------------------------------------------------------
-- 7. Piezas de cada envio
-- -------------------------------------------------------------
insert into envio_items (envio_id, tipo_caja, cantidad) values
  ('dddddddd-0000-4000-8000-000000000001', 'mediana', 3),
  ('dddddddd-0000-4000-8000-000000000002', 'bulto',   1),
  ('dddddddd-0000-4000-8000-000000000003', 'grande',  2);

-- -------------------------------------------------------------
-- 8. Bitacora
--    Es lo que ve el destinatario en la pantalla de rastreo.
-- -------------------------------------------------------------
insert into eventos (envio_id, viaje_id, tipo, mensaje, creado_en) values
  ('dddddddd-0000-4000-8000-000000000001', 'bbbbbbbb-0000-4000-8000-000000000001',
   'registro', 'Carga registrada y cupo reservado en el Nuevo Amanecer.',
   now() - interval '2 days'),

  ('dddddddd-0000-4000-8000-000000000002', 'bbbbbbbb-0000-4000-8000-000000000002',
   'registro', 'Carga registrada y cupo reservado en la Estrella del Río.',
   now() - interval '9 days'),
  ('dddddddd-0000-4000-8000-000000000002', 'bbbbbbbb-0000-4000-8000-000000000002',
   'zarpe',    'La embarcación zarpó de Leticia.',
   now() - interval '2 days'),
  ('dddddddd-0000-4000-8000-000000000002', 'bbbbbbbb-0000-4000-8000-000000000002',
   'parada',   'Pasó por Puerto Nariño. Siguiente muelle: Tarapacá.',
   now() - interval '30 hours'),

  ('dddddddd-0000-4000-8000-000000000003', 'bbbbbbbb-0000-4000-8000-000000000002',
   'registro', 'Carga registrada. Marcada como FRÁGIL.',
   now() - interval '10 days'),
  ('dddddddd-0000-4000-8000-000000000003', 'bbbbbbbb-0000-4000-8000-000000000002',
   'zarpe',    'La embarcación zarpó de Leticia.',
   now() - interval '2 days'),
  ('dddddddd-0000-4000-8000-000000000003', 'bbbbbbbb-0000-4000-8000-000000000002',
   'parada',   'Pasó por Puerto Nariño. Siguiente muelle: Tarapacá.',
   now() - interval '30 hours');

-- -------------------------------------------------------------
-- Comprobacion
-- -------------------------------------------------------------
select
  e.codigo_publico,
  e.estado,
  e.destinatario_nombre,
  p.muelle,
  b.nombre as embarcacion,
  e.kg_cobrables,
  e.valor,
  right(regexp_replace(e.destinatario_telefono, '\D', '', 'g'), 4) as ultimos4
from envios e
join viajes v        on v.id = e.viaje_id
join paradas p       on p.id = e.parada_id
join embarcaciones b on b.id = v.embarcacion_id
where e.codigo_publico like 'MTDEMO%'
order by e.codigo_publico;
