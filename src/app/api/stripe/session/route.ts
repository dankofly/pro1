import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest) {
  try {
    // Auth: require valid user token
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await getSupabaseAdmin().auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Ungültiges Token' }, { status: 401 })
    }

    const sessionId = request.nextUrl.searchParams.get('session_id')
    if (!sessionId) {
      return NextResponse.json({ error: 'session_id fehlt' }, { status: 400 })
    }

    const session = await getStripeServer().checkout.sessions.retrieve(sessionId)

    // Verify the session belongs to this user (via metadata or customer email)
    const sessionEmail = session.customer_details?.email
    if (sessionEmail && sessionEmail !== user.email) {
      return NextResponse.json({ error: 'Kein Zugriff' }, { status: 403 })
    }

    return NextResponse.json({
      status: session.status,
      customer_email: sessionEmail ?? null,
    })
  } catch (err) {
    console.error('Session retrieve error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
