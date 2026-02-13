import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getStripeServer } from '@/lib/stripe-server'
import { STRIPE_PLANS } from '@/lib/stripe'

const VALID_PRICE_IDS = new Set<string>(Object.values(STRIPE_PLANS).map(p => p.priceId))

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

    const body = await request.json().catch(() => ({}))
    const priceId = body.priceId as string

    if (!priceId || !VALID_PRICE_IDS.has(priceId)) {
      return NextResponse.json({ error: 'Ungültige Price-ID' }, { status: 400 })
    }

    // Check if user already has a Stripe customer ID
    const { data: existingSub } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    const stripe = getStripeServer()
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      ui_mode: 'embedded',
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: { user_id: user.id },
      },
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://steuerboard.pro'}/pricing?session_id={CHECKOUT_SESSION_ID}`,
    }

    // Reuse existing Stripe customer if available
    if (existingSub?.stripe_customer_id && existingSub.stripe_customer_id !== 'promo') {
      params.customer = existingSub.stripe_customer_id
    } else {
      params.customer_email = user.email
    }

    const session = await stripe.checkout.sessions.create(params)

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (err: unknown) {
    console.error('Checkout session error:', err)
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
    return NextResponse.json({ error: `Checkout-Fehler: ${message}` }, { status: 500 })
  }
}
