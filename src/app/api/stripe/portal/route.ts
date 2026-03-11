import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getStripeServer } from '@/lib/stripe-server'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 portal requests per minute per IP
    const ip = getClientIp(request)
    const rl = rateLimit(`portal:${ip}`, { limit: 10, windowSeconds: 60 })
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warte kurz.' }, { status: 429 })
    }

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await getSupabaseAdmin().auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Ungültiges Token' }, { status: 401 })
    }

    const { data: sub } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (!sub?.stripe_customer_id) {
      return NextResponse.json({ error: 'Kein aktives Abo gefunden' }, { status: 404 })
    }

    if (sub.stripe_customer_id === 'promo') {
      return NextResponse.json(
        { error: 'Dein Pro-Zugang wurde per Promo-Code aktiviert. Ein Kundenportal ist nur für zahlende Abonnements verfügbar.' },
        { status: 400 }
      )
    }

    const portalSession = await getStripeServer().billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://steuerboard.pro'}/profil`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (err) {
    console.error('Portal session error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
