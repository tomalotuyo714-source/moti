-- =============================================================
-- MOTI - Soporte para las funciones nativas de la app de tienda
--
-- Apple rechaza por la guideline 4.2 cualquier app que sea "un
-- sitio web reempaquetado". Estas cuatro cosas son las que la
-- convierten en una app de verdad, y ademas son las que el
-- documento ya pedia: aviso de llegada al muelle, prueba de
-- entrega, ubicacion del muelle y trabajo sin senal.
--
-- Correr DESPUES de 0003_ocultar_columnas_sensibles.sql
-- =============================================================

-- -------------------------------------------------------------
-- 1. DISPOSITIVOS
--    Guarda el token de notificaciones de cada celular. Un mismo
--    usuario puede tener varios (el del muelle y el de la casa).
-- -------------------------------------------------------------
create table if not exists dispositivos (
  id          uuid primary key default gen_random_uuid(),
  perfil_id   uuid not null references perfiles(id) on delete cascade,
  token       text not null,
  plataforma  text not null check (plataforma in ('android','ios','web')),
  creado_en   timestamptz not null default now(),
  visto_en    timestamptz not null default now(),
  unique (token)
);

create index if not exists idx_dispositivos_perfil on dispositivos(perfil_id);

alter table dispositivos enable row level security;

-- Cada quien ve y administra unicamente los suyos. El token de
-- notificaciones ajeno permitiria mandarle mensajes a otro.
create policy "dispositivos propios lectura" on dispositivos
  for select using (auth.uid() = perfil_id);
create policy "dispositivos propios insert" on dispositivos
  for insert with check (auth.uid() = perfil_id);
create policy "dispositivos propios update" on dispositivos
  for update using (auth.uid() = perfil_id);
create policy "dispositivos propios delete" on dispositivos
  for delete using (auth.uid() = perfil_id);

-- -------------------------------------------------------------
-- 2. COORDENADAS DE LOS MUELLES
--    El capitan marca la llegada parado en el muelle: el celular
--    guarda donde fue. Sirve de prueba y, mas adelante, para
--    avisar solo cuando el barco de verdad esta cerca.
-- -------------------------------------------------------------
alter table paradas add column if not exists lat numeric;
alter table paradas add column if not exists lng numeric;
alter table paradas add column if not exists precision_m numeric;

-- -------------------------------------------------------------
-- 3. FOTO DE ENTREGA
--    Se guarda la ruta dentro del bucket, no la imagen.
-- -------------------------------------------------------------
alter table envios add column if not exists foto_entrega text;

-- La migracion 0003 revoco el SELECT de tabla y dejo una lista
-- explicita de columnas. Una columna nueva NO queda incluida sola:
-- hay que concederla o la app recibe 401 al pedirla.
grant select (foto_entrega) on envios to anon, authenticated;

-- -------------------------------------------------------------
-- 4. BUCKET DE FOTOS DE ENTREGA
--    Privado. Solo el capitan del viaje sube; solo las partes ven.
-- -------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('entregas', 'entregas', false, 3145728, array['image/jpeg','image/webp'])
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- La ruta del archivo es  <envio_id>/<lo que sea>.jpg
-- Asi se puede amarrar el permiso al envio con solo mirar el nombre.
drop policy if exists "entregas sube el capitan" on storage.objects;
create policy "entregas sube el capitan" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'entregas'
    and exists (
      select 1
      from envios e
      join viajes v on v.id = e.viaje_id
      where e.id::text = split_part(name, '/', 1)
        and v.capitan_id = auth.uid()
    )
  );

drop policy if exists "entregas lectura de las partes" on storage.objects;
create policy "entregas lectura de las partes" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'entregas'
    and exists (
      select 1
      from envios e
      where e.id::text = split_part(name, '/', 1)
        and (
          e.remitente_id = auth.uid()
          or exists (select 1 from viajes v
                     where v.id = e.viaje_id and v.capitan_id = auth.uid())
        )
    )
  );

-- -------------------------------------------------------------
-- 5. ENTREGA CON PRUEBA
--    Se agrega una version de entregar_envio que ademas guarda la
--    foto y las coordenadas. La de dos parametros se conserva para
--    no romper las versiones de la app que ya esten instaladas.
-- -------------------------------------------------------------
create or replace function entregar_envio(
  p_envio_id uuid,
  p_token    text,
  p_foto     text default null,
  p_lat      numeric default null,
  p_lng      numeric default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_envio   envios%rowtype;
  v_capitan uuid;
  v_lugar   text := '';
begin
  select e.* into v_envio from envios e where e.id = p_envio_id;
  if not found then
    return jsonb_build_object('ok', false, 'motivo', 'Envio no encontrado.');
  end if;

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
  update envios
     set estado = 'entregado',
         foto_entrega = coalesce(p_foto, foto_entrega)
   where id = p_envio_id;
  perform set_config('moti.entrega_autorizada', '0', true);

  -- Las coordenadas quedan en la parada: es el muelle, no el envio.
  if p_lat is not null and p_lng is not null then
    update paradas
       set lat = coalesce(lat, p_lat),
           lng = coalesce(lng, p_lng)
     where id = v_envio.parada_id;
    v_lugar := ' Ubicacion del muelle registrada.';
  end if;

  insert into eventos (envio_id, viaje_id, tipo, mensaje)
  values (p_envio_id, v_envio.viaje_id, 'entrega',
          'Mercancia entregada al destinatario con codigo verificado.'
          || case when p_foto is not null then ' Se tomo foto de la entrega.' else '' end
          || v_lugar);

  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function entregar_envio(uuid, text, text, numeric, numeric) to authenticated;

-- -------------------------------------------------------------
-- 6. A QUIEN HAY QUE AVISARLE
--    La usa la funcion del servidor que manda las notificaciones.
--    Devuelve los tokens de las partes de un envio y nada mas: el
--    servidor nunca tiene que leer la tabla de dispositivos entera.
-- -------------------------------------------------------------
create or replace function tokens_del_envio(p_envio_id uuid)
returns table (token text, plataforma text)
language sql
security definer
set search_path = public
as $$
  select d.token, d.plataforma
  from dispositivos d
  where d.perfil_id in (
    select e.remitente_id from envios e where e.id = p_envio_id
    union
    select v.capitan_id from envios e join viajes v on v.id = e.viaje_id
     where e.id = p_envio_id
  );
$$;

-- Solo el rol de servicio, que vive en el servidor. Nunca el navegador.
revoke execute on function tokens_del_envio(uuid) from anon, authenticated;
grant execute on function tokens_del_envio(uuid) to service_role;
