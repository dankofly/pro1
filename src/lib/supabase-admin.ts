import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Server-side only – uses service role key that bypasses RLS
// NEVER import this file in client components

let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url) {
      console.error('NEXT_PUBLIC_SUPABASE_URL fehlt. Verfügbare SUPA* keys:', Object.keys(process.env).filter(k => k.includes('SUPA')).join(', ') || 'keine')
      throw new Error('Supabase-Konfiguration fehlt')
    }
    if (!key) {
      console.error('SUPABASE_SERVICE_ROLE_KEY fehlt. Verfügbare SUPA* keys:', Object.keys(process.env).filter(k => k.includes('SUPA')).join(', ') || 'keine')
      throw new Error('Supabase-Konfiguration fehlt')
    }
    _supabaseAdmin = createClient(url, key)
  }
  return _supabaseAdmin
}
