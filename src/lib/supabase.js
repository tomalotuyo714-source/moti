import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error(
    'Faltan las variables de entorno. Copie .env.example como .env y ponga sus valores de Supabase.'
  )
}

export const supabase = createClient(url ?? '', key ?? '')
