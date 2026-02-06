import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isAdmin } from '@/lib/admin'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    let admin
    try {
      admin = getSupabaseAdmin()
    } catch (e) {
      console.error('Admin client error:', e)
      return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await admin.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    if (!isAdmin(user.email)) {
      return NextResponse.json({ error: 'Kein Zugriff' }, { status: 403 })
    }

    const body = await request.json().catch(() => ({}))
    const count = Math.min(Math.max(Number(body.count) || 1, 1), 50)
    const note = typeof body.note === 'string' ? body.note.slice(0, 500).trim() || null : null

    const codes: string[] = []
    for (let i = 0; i < count; i++) {
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

    const { error: insertError } = await admin
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
