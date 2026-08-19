-- =============================================================
-- MOTI v0 - Esquema inicial (rastreo fluvial)
-- Pegue este archivo completo en Supabase -> SQL Editor -> Run
-- =============================================================

-- -------------------------------------------------------------
-- PERFILES
-- Extiende auth.users con el nombre, telefono y rol operativo.
-- -------------------------------------------------------------
create table if not exists perfiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nombre      text not null,
  telefono    text not null,
  rol         text not null default 'remitente'
              check (rol in ('remitente','capitan')),
  creado_en   timestamptz not null default now()
);

-- -------------------------------------------------------------
-- EMBARCACIONES
-- El capitan registra su barco con el nombre tradicional del rio.
-- -------------------------------------------------------------
create table if not exists embarcaciones (
  id           uuid primary key default gen_random_uuid(),
  capitan_id   uuid not null references perfiles(id) on delete cascade,
  nombre       text not null,
  matricula    text,
  capacidad_kg numeric not null default 5000 check (capacidad_kg > 0),
  creado_en    timestamptz not null default now()
);

-- -------------------------------------------------------------
-- VIAJES
-- Un viaje = una salida programada del muelle, con su tarifario.
-- El capitan define libremente sus precios (regla de negocio 4.9).
-- -------------------------------------------------------------
create table if not exists viajes (
  id                uuid primary key default gen_random_uuid(),
  embarcacion_id    uuid not null references embarcaciones(id) on delete cascade,
  capitan_id        uuid not null references perfiles(id) on delete cascade,
  origen            text not null default 'Leticia',
  fecha_salida      timestamptz not null,
  estado            text not null default 'programado'
                    check (estado in ('programado','en_navegacion','finalizado','cancelado')),
  aforo_kg          numeric not null default 5000 check (aforo_kg > 0),
  precio_por_kg     numeric not null default 0 check (precio_por_kg >= 0),
  precio_por_tonelada numeric check (precio_por_tonelada >= 0),
  notas             text,
  creado_en         timestamptz not null default now()
);

-- -------------------------------------------------------------
-- PARADAS
-- Muelles de la ruta, en orden geografico. El capitan las marca.
-- -------------------------------------------------------------
create table if not exists paradas (
  id             uuid primary key default gen_random_uuid(),
  viaje_id       uuid not null references viajes(id) on delete cascade,
  orden          int  not null,
  muelle         text not null,
  estado         text not null default 'pendiente'
                 check (estado in ('pendiente','proximo','descargando','completada')),
  hora_llegada   timestamptz,
  hora_salida    timestamptz,
  unique (viaje_id, orden)
);

-- -------------------------------------------------------------
-- ENVIOS
-- Modelo triangular: remitente (registrado) + destinatario (por
-- telefono, sin cuenta) + capitan del viaje. Regla 4.17.
-- -------------------------------------------------------------
create table if not exists envios (
  id                     uuid primary key default gen_random_uuid(),
  viaje_id               uuid not null references viajes(id) on delete cascade,
  parada_id              uuid not null references paradas(id) on delete cascade,
  remitente_id           uuid not null references perfiles(id) on delete cascade,
  destinatario_nombre    text not null,
  destinatario_telefono  text not null,

  peso_declarado_kg      numeric not null check (peso_declarado_kg > 0),
  volumen_equivalente_kg numeric not null default 0,
  kg_cobrables           numeric not null default 0,

  fragil                 boolean not null default false,
  pago                   text not null default 'origen' check (pago in ('origen','destino')),
  valor                  numeric not null default 0 check (valor >= 0),

  estado                 text not null default 'registrado'
                         check (estado in ('registrado','a_bordo','en_navegacion','en_muelle','entregado','cancelado')),

  -- Token OTP de retiro seguro (regla 4.18). Lo custodia el destinatario.
  token                  text not null,
  -- Codigo publico para el link de rastreo que comparte el remitente.
  codigo_publico         text not null unique,

  creado_en              timestamptz not null default now()
);

-- -------------------------------------------------------------
-- ITEMS DEL ENVIO
-- Multiplicador de piezas estandar (regla 4.11): el cliente elige
-- el tipo de caja y la cantidad. NUNCA se le piden dimensiones.
-- -------------------------------------------------------------
create table if not exists envio_items (
  id         uuid primary key default gen_random_uuid(),
  envio_id   uuid not null references envios(id) on delete cascade,
  tipo_caja  text not null check (tipo_caja in ('pequena','mediana','grande','bulto')),
  cantidad   int  not null check (cantidad > 0)
);

-- -------------------------------------------------------------
-- EVENTOS
-- Bitacora de trazabilidad. Es la prueba documental del servicio.
-- -------------------------------------------------------------
create table if not exists eventos (
  id         uuid primary key default gen_random_uuid(),
  envio_id   uuid references envios(id) on delete cascade,
  viaje_id   uuid references viajes(id) on delete cascade,
  tipo       text not null,
  mensaje    text not null,
  creado_en  timestamptz not null default now()
);

create index if not exists idx_envios_viaje    on envios(viaje_id);
create index if not exists idx_envios_codigo   on envios(codigo_publico);
create index if not exists idx_paradas_viaje   on paradas(viaje_id, orden);
create index if not exists idx_eventos_envio   on eventos(envio_id, creado_en desc);
create index if not exists idx_viajes_fecha    on viajes(fecha_salida);

-- =============================================================
-- SEGURIDAD A NIVEL DE FILA (RLS)
-- Sin esto, cualquiera con la anon key lee toda la base.
-- =============================================================
alter table perfiles      enable row level security;
alter table embarcaciones enable row level security;
alter table viajes        enable row level security;
alter table paradas       enable row level security;
alter table envios        enable row level security;
alter table envio_items   enable row level security;
alter table eventos       enable row level security;

-- PERFILES: cada quien ve y edita el suyo.
create policy "perfil propio lectura" on perfiles
  for select using (auth.uid() = id);
create policy "perfil propio insert" on perfiles
  for insert with check (auth.uid() = id);
create policy "perfil propio update" on perfiles
  for update using (auth.uid() = id);

-- EMBARCACIONES: el capitan manda sobre las suyas; todos las leen
-- (el remitente necesita ver el nombre del barco al cotizar).
create policy "embarcaciones lectura publica" on embarcaciones
  for select using (true);
create policy "embarcaciones del capitan" on embarcaciones
  for all using (auth.uid() = capitan_id) with check (auth.uid() = capitan_id);

-- VIAJES: lectura abierta a usuarios autenticados (cartelera de barcos).
create policy "viajes lectura" on viajes
  for select using (auth.role() = 'authenticated');
create policy "viajes del capitan" on viajes
  for all using (auth.uid() = capitan_id) with check (auth.uid() = capitan_id);

-- PARADAS: se leen con el viaje; solo el capitan del viaje las cambia.
create policy "paradas lectura" on paradas
  for select using (auth.role() = 'authenticated');
create policy "paradas del capitan" on paradas
  for all
  using (exists (select 1 from viajes v where v.id = paradas.viaje_id and v.capitan_id = auth.uid()))
  with check (exists (select 1 from viajes v where v.id = paradas.viaje_id and v.capitan_id = auth.uid()));

-- ENVIOS: los ve su remitente y el capitan del viaje. Nadie mas.
create policy "envios del remitente" on envios
  for select using (auth.uid() = remitente_id);
create policy "envios del capitan" on envios
  for select
  using (exists (select 1 from viajes v where v.id = envios.viaje_id and v.capitan_id = auth.uid()));
create policy "envios crea el remitente" on envios
  for insert with check (auth.uid() = remitente_id);
create policy "envios actualiza el capitan" on envios
  for update
  using (exists (select 1 from viajes v where v.id = envios.viaje_id and v.capitan_id = auth.uid()));

-- ITEMS: siguen la suerte de su envio.
create policy "items lectura" on envio_items
  for select using (exists (
    select 1 from envios e where e.id = envio_items.envio_id
    and (e.remitente_id = auth.uid()
         or exists (select 1 from viajes v where v.id = e.viaje_id and v.capitan_id = auth.uid()))));
create policy "items crea el remitente" on envio_items
  for insert with check (exists (
    select 1 from envios e where e.id = envio_items.envio_id and e.remitente_id = auth.uid()));

-- EVENTOS: lectura para las partes; escritura para usuarios autenticados.
create policy "eventos lectura" on eventos
  for select using (auth.role() = 'authenticated');
create policy "eventos insert" on eventos
  for insert with check (auth.role() = 'authenticated');

-- =============================================================
-- RASTREO PUBLICO SIN CUENTA
-- El destinatario no tiene app. Entra por link con el codigo
-- publico y confirma los ultimos 4 digitos de su telefono.
-- Solo entonces la funcion devuelve el token de retiro.
-- Se usa SECURITY DEFINER para saltar RLS de forma controlada.
-- =============================================================
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
language sql
security definer
set search_path = public
as $$
  select
    e.codigo_publico,
    e.estado,
    e.destinatario_nombre,
    p.muelle,
    b.nombre,
    v.fecha_salida,
    v.estado,
    e.kg_cobrables,
    e.fragil,
    e.pago,
    e.valor,
    case
      when p_ultimos4 is not null
       and right(regexp_replace(e.destinatario_telefono, '\D', '', 'g'), 4) = p_ultimos4
      then e.token
      else null
    end
  from envios e
  join viajes v        on v.id = e.viaje_id
  join paradas p       on p.id = e.parada_id
  join embarcaciones b on b.id = v.embarcacion_id
  where e.codigo_publico = upper(p_codigo);
$$;

grant execute on function rastrear_envio(text, text) to anon, authenticated;

-- Historial publico del envio (sin datos sensibles).
create or replace function eventos_publicos(p_codigo text)
returns table (tipo text, mensaje text, creado_en timestamptz)
language sql
security definer
set search_path = public
as $$
  select ev.tipo, ev.mensaje, ev.creado_en
  from eventos ev
  join envios e on e.id = ev.envio_id
  where e.codigo_publico = upper(p_codigo)
  order by ev.creado_en desc;
$$;

grant execute on function eventos_publicos(text) to anon, authenticated;
