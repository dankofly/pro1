import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isAdmin } from '@/lib/admin'

export async function POST(request: NextRequest) {
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

    const body = await request.json().catch(() => ({}))
    const count = Math.min(Math.max(Number(body.count) || 1, 1), 50)
    const note = (body.note as string) || null

    const codes: string[] = []
    for (let i = 0; i < count; i++) {
      // Format: SVS-XXXX-XXXX (leicht lesbar)
      const bytes = new Uint8Array(4)
      globalThis.crypto.getRandomValues(bytes)
      const raw = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase()
      codes.push(`SVS-${raw.slice(0, 4)}-${raw.slice(4, 8)}`)
    }

    const rows = codes.map((code) => ({
      code,
      created_by: user.id,
      note,
    }))

    const { error: insertError } = await getSupabaseAdmin()
      .from('promo_codes')
      .insert(rows)

    if (insertError) {
      console.error('Promo insert error:', insertError)
      return NextResponse.json({ error: 'Fehler beim Erstellen' }, { status: 500 })
    }

    return NextResponse.json({ codes })
  } catch (err) {
    console.error('Promo generate error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
