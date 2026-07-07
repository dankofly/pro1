import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import { checkIpRateLimit, getClientIp } from '@/lib/rate-limit'
import { parseRuecklagenplanPayload } from '@/lib/ruecklagenplan'

// Verifiziert eine Tripwire-Checkout-Session und gibt den Berechnungs-Payload
// zurück, aus dem der Client das PDF erzeugt. Besitz der Session-ID = Zugriff
// (kein Account nötig); die ID ist nur über Stripes Redirect bekannt.

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rl = await checkIpRateLimit(`pdf-session:${ip}`, 20, 60)
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warte kurz.' }, { status: 429 })
    }

    const sessionId = request.nextUrl.searchParams.get('session_id')
    if (!sessionId || !sessionId.startsWith('cs_')) {
      return NextResponse.json({ error: 'Ungültige Session' }, { status: 400 })
    }

    const stripe = getStripeServer()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.metadata?.product !== 'ruecklagenplan_pdf') {
      return NextResponse.json({ error: 'Ungültige Session' }, { status: 400 })
    }
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ paid: false })
    }

    let parsed: unknown = null
    try {
      parsed = JSON.parse(session.metadata?.plan_payload ?? '')
    } catch {
      parsed = null
    }
    const payload = parseRuecklagenplanPayload(parsed)
    if (!payload) {
      console.error('pdf-session: bezahlter Kauf ohne gültigen Payload', sessionId)
      return NextResponse.json({ error: 'Berechnungsdaten fehlen. Bitte melde dich bei support@steuerboard.pro.' }, { status: 500 })
    }

    return NextResponse.json({
      paid: true,
      payload,
      email: session.customer_details?.email ?? null,
    })
  } catch (err: unknown) {
    console.error('pdf-session error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Session konnte nicht geprüft werden.' }, { status: 500 })
  }
}
