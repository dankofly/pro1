import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isAdmin } from '@/lib/admin'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await getSupabaseAdmin().auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Ungültiges Token' }, { status: 401 })
    }

    if (!isAdmin(user.email)) {
      return NextResponse.json({ error: 'Kein Admin-Zugriff' }, { status: 403 })
    }

    const { data, error } = await getSupabaseAdmin()
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Promo list error:', error)
      return NextResponse.json({ error: 'Fehler beim Laden' }, { status: 500 })
    }

    return NextResponse.json({ codes: data || [] })
  } catch (err) {
    console.error('Promo list error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
