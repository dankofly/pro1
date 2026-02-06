import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Server-side only – uses service role key that bypasses RLS
// NEVER import this file in client components

let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
    }
    _supabaseAdmin = createClient(url, key)
  }
  return _supabaseAdmin
}
