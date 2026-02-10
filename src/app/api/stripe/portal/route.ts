import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getStripeServer } from '@/lib/stripe-server'

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

    const { data: sub } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (!sub?.stripe_customer_id || sub.stripe_customer_id === 'promo') {
      return NextResponse.json({ error: 'Kein aktives Abo gefunden' }, { status: 404 })
    }

    const portalSession = await getStripeServer().billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://svs-checker.app'}/profil`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (err) {
    console.error('Portal session error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
