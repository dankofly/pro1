import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { sendWelcomeEmail } from '@/lib/email'
import { checkIpRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 welcome emails per hour per IP (DB-backed)
    const ip = getClientIp(request)
    const rl = await checkIpRateLimit(`email:${ip}`, 3, 3600)
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warte.' }, { status: 429 })
    }

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await getSupabaseAdmin().auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Ungültiges Token' }, { status: 401 })
    }

    const name = user.user_metadata?.full_name
    const sent = await sendWelcomeEmail(user.email!, name)

    if (!sent) {
      return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden. RESEND_API_KEY prüfen.' }, { status: 502 })
    }

    return NextResponse.json({ sent: true })
  } catch (err) {
    console.error('Welcome email error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
