-- =============================================================
-- MOTI - Correcciones de seguridad sobre el esquema inicial
--
-- Origen: auditoria del agente guardian-reglas.
-- Pegue este archivo completo en Supabase -> SQL Editor -> Run,
-- DESPUES de haber corrido 0001_init.sql.
--
-- Problemas que corrige:
--   1. La entrega se validaba solo en JavaScript. Un capitan podia
--      marcar "entregado" llamando la API directo, sin el token.
--   2. El token viajaba al navegador del remitente al crear el envio.
--   3. La tabla eventos la podia leer y escribir cualquier usuario.
--   4. Se podian probar los 10.000 codigos de 4 digitos sin limite.
--   5. embarcaciones era legible sin haber iniciado sesion.
-- =============================================================

-- -------------------------------------------------------------
-- 1. EL TOKEN Y EL CODIGO LOS GENERA EL SERVIDOR
--    Antes los generaba el celular del remitente y volvian en la
--    respuesta. Ahora el remitente nunca los ve pasar.
-- -------------------------------------------------------------
create or replace function generar_codigo_publico()
returns text
language plpgsql
as $$
declare
  alfabeto text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  intento  text;
  i        int;
begin
  loop
    intento := 'MT';
    for i in 1..6 loop
      intento := intento || substr(alfabeto, 1 + floor(random() * length(alfabeto))::int, 1);
    end loop;
    exit when not exists (select 1 from envios where codigo_publico = intento);
  end loop;
  return intento;
end;
$$;

create or replace function envios_asignar_secretos()
returns trigger
language plpgsql
as $$
begin
  -- Se ignora lo que mande el cliente. Siempre manda el servidor.
  new.token          := lpad((floor(random() * 9000) + 1000)::int::text, 4, '0');
  new.codigo_publico := generar_codigo_publico();
  new.estado         := 'registrado';
  return new;
end;
$$;

drop trigger if exists trg_envios_secretos on envios;
create trigger trg_envios_secretos
  before insert on envios
  for each row execute function envios_asignar_secretos();

-- Nadie que use la anon key puede leer la columna del token,
-- ni el remitente ni el capitan. Solo lo devuelve rastrear_envio,
-- que es SECURITY DEFINER y verifica el telefono del destinatario.
revoke select (token) on envios from authenticated, anon;

-- Control de intentos para que no se pueda adivinar el token
-- probando los 10.000 numeros posibles.
alter table envios add column if not exists intentos_token int not null default 0;

-- -------------------------------------------------------------
-- 2. LA ENTREGA SE VALIDA EN EL SERVIDOR
--    Un trigger impide pasar a 'entregado' por cualquier via que
--    no sea la funcion entregar_envio, que exige el token.
-- -------------------------------------------------------------
create or replace function envios_proteger_entrega()
returns trigger
language plpgsql
as $$
begin
  if new.estado = 'entregado' and old.estado is distinct from 'entregado' then
    if coalesce(current_setting('moti.entrega_autorizada', true), '0') <> '1' then
      raise exception
        'La entrega solo se puede cerrar con el codigo de retiro del destinatario.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_envios_proteger_entrega on envios;
create trigger trg_envios_proteger_entrega
  before update on envios
  for each row execute function envios_proteger_entrega();

create or replace function entregar_envio(p_envio_id uuid, p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_envio   envios%rowtype;
  v_capitan uuid;
begin
  select e.* into v_envio from envios e where e.id = p_envio_id;
  if not found then
    return jsonb_build_object('ok', false, 'motivo', 'Envio no encontrado.');
  end if;

  -- Solo el capitan del viaje puede cerrar la entrega.
  select v.capitan_id into v_capitan from viajes v where v.id = v_envio.viaje_id;
  if v_capitan is distinct from auth.uid() then
    return jsonb_build_object('ok', false, 'motivo', 'No autorizado.');
  end if;

  if v_envio.estado = 'entregado' then
    return jsonb_build_object('ok', false, 'motivo', 'Este envio ya fue entregado.');
  end if;

  if v_envio.intentos_token >= 10 then
    return jsonb_build_object('ok', false, 'motivo',
      'Demasiados intentos fallidos. Comuniquese con el remitente.');
  end if;

  if v_envio.token is distinct from trim(p_token) then
    update envios set intentos_token = intentos_token + 1 where id = p_envio_id;
    return jsonb_build_object('ok', false, 'motivo',
      'El codigo no coincide. No entregue la mercancia.');
  end if;

  perform set_config('moti.entrega_autorizada', '1', true);
  update envios set estado = 'entregado' where id = p_envio_id;
  perform set_config('moti.entrega_autorizada', '0', true);

  insert into eventos (envio_id, viaje_id, tipo, mensaje)
  values (p_envio_id, v_envio.viaje_id, 'entrega',
          'Mercancia entregada al destinatario con codigo verificado.');

  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function entregar_envio(uuid, text) to authenticated;

-- -------------------------------------------------------------
-- 3. RASTREO PUBLICO CON LIMITE DE INTENTOS
--    Se reemplaza la funcion de 0001 para contar los fallos.
-- -------------------------------------------------------------
create or replace function rastrear_envio(p_codigo text, p_ultimos4 text default null)
returns table (
  codigo_publico        text,
  estado                text,
  destinatario_nombre   text,
  muelle_destino        text,
  embarcacion           text,
  fecha_salida          timestamptz,
  estado_viaje          text,
  kg_cobrables          numeric,
  fragil                boolean,
  pago                  text,
  valor                 numeric,
  token                 text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_envio    envios%rowtype;
  v_coincide boolean := false;
begin
  select e.* into v_envio from envios e where e.codigo_publico = upper(trim(p_codigo));
  if not found then
    return;
  end if;

  if p_ultimos4 is not null then
    if v_envio.intentos_token >= 10 then
      v_coincide := false;
    elsif right(regexp_replace(v_envio.destinatario_telefono, '\D', '', 'g'), 4)
          = trim(p_ultimos4) then
      v_coincide := true;
    else
      update envios set intentos_token = intentos_token + 1 where id = v_envio.id;
    end if;
  end if;

  return query
  select
    v_envio.codigo_publico,
    v_envio.estado,
    v_envio.destinatario_nombre,
    p.muelle,
    b.nombre,
    v.fecha_salida,
    v.estado,
    v_envio.kg_cobrables,
    v_envio.fragil,
    v_envio.pago,
    v_envio.valor,
    case when v_coincide then v_envio.token else null end
  from viajes v
  join paradas p       on p.id = v_envio.parada_id
  join embarcaciones b on b.id = v.embarcacion_id
  where v.id = v_envio.viaje_id;
end;
$$;

grant execute on function rastrear_envio(text, text) to anon, authenticated;

-- -------------------------------------------------------------
-- 4. EVENTOS: SOLO LAS PARTES DEL ENVIO
--    Antes cualquier cuenta leia toda la bitacora de la
--    plataforma y podia insertar eventos falsos en envios ajenos.
-- -------------------------------------------------------------
drop policy if exists "eventos lectura" on eventos;
drop policy if exists "eventos insert"  on eventos;

create policy "eventos lectura de las partes" on eventos
  for select using (
    exists (
      select 1 from envios e
      where e.id = eventos.envio_id
        and (
          e.remitente_id = auth.uid()
          or exists (select 1 from viajes v
                     where v.id = e.viaje_id and v.capitan_id = auth.uid())
        )
    )
  );

create policy "eventos escribe la parte" on eventos
  for insert with check (
    exists (
      select 1 from envios e
      where e.id = eventos.envio_id
        and (
          e.remitente_id = auth.uid()
          or exists (select 1 from viajes v
                     where v.id = e.viaje_id and v.capitan_id = auth.uid())
        )
    )
  );

-- -------------------------------------------------------------
-- 5. EMBARCACIONES: SOLO USUARIOS AUTENTICADOS
--    Estaba con using(true), legible con la sola anon key.
-- -------------------------------------------------------------
drop policy if exists "embarcaciones lectura publica" on embarcaciones;

create policy "embarcaciones lectura autenticada" on embarcaciones
  for select using (auth.role() = 'authenticated');
