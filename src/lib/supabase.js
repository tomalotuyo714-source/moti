import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Sin configuracion, createClient revienta y la app queda en pantalla
// blanca, sin decir que paso. Se detecta antes y App.jsx muestra una
// pantalla que explica que falta.
export const faltaConfiguracion =
  !url || !key || url.includes('SU_PROYECTO') || key.includes('SU_ANON_KEY')

export const supabase = faltaConfiguracion
  ? null
  : createClient(url, key)
