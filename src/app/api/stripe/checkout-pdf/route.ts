import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'
import { checkIpRateLimit, getClientIp } from '@/lib/rate-limit'
import {
  parseRuecklagenplanPayload,
  serializeRuecklagenplanPayload,
  RUECKLAGENPLAN_PRICE_CENTS,
  RUECKLAGENPLAN_PRODUCT_NAME,
} from '@/lib/ruecklagenplan'

// Tripwire-Checkout: 49 € einmalig, ohne Account (Gast-Checkout).
// Die Berechnungsdaten reisen als Session-Metadata; das PDF wird nach
// bezahlter Session auf /rechner/ruecklagenplan clientseitig erzeugt.
// Bewusst keine DB-Abhängigkeit: Besitz der Session-ID = Zugriff.

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rl = await checkIpRateLimit(`checkout-pdf:${ip}`, 10, 60)
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warte kurz.' }, { status: 429 })
    }

    const body = await request.json().catch(() => ({}))
    const payload = parseRuecklagenplanPayload(body.payload)
    if (!payload) {
      return NextResponse.json({ error: 'Ungültige Berechnungsdaten' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steuerboard.pro'
    const stripe = getStripeServer()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: RUECKLAGENPLAN_PRICE_CENTS,
            product_data: {
              name: RUECKLAGENPLAN_PRODUCT_NAME,
              description:
                'Persönlicher 12-Monats-Rücklagenplan für SVS und Einkommensteuer auf Basis deiner Berechnung. Sofort als PDF.',
            },
          },
        },
      ],
      metadata: {
        product: 'ruecklagenplan_pdf',
        plan_payload: serializeRuecklagenplanPayload(payload),
      },
      // FAGG: digitaler Inhalt, sofortige Bereitstellung, Widerruf erlischt.
      custom_text: {
        submit: {
          message:
            'Mit dem Kauf stimmst du der sofortigen Bereitstellung des PDF zu und nimmst zur Kenntnis, ' +
            'dass dein Widerrufsrecht damit erlischt (FAGG). Es gelten AGB und Datenschutzerklärung ' +
            'auf steuerboard.pro. Kein Ersatz für Steuerberatung.',
        },
      },
      success_url: `${siteUrl}/rechner/ruecklagenplan?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/rechner`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Checkout-Fehler. Bitte versuche es erneut.' }, { status: 500 })
    }
    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Checkout-PDF session error:', err instanceof Error ? err.message : err)
    // TEMP DEBUG: Fehlerdetail in Response, wird nach Diagnose entfernt
    const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    return NextResponse.json({ error: 'Checkout-Fehler. Bitte versuche es erneut.', detail }, { status: 500 })
  }
}
