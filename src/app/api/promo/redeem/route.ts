import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

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
    const code = ((body.code as string) || '').trim().toUpperCase()

    if (!code) {
      return NextResponse.json({ error: 'Kein Code angegeben' }, { status: 400 })
    }

    const admin = getSupabaseAdmin()

    // Promo-Code suchen
    const { data: promo, error: findError } = await admin
      .from('promo_codes')
      .select('*')
      .eq('code', code)
      .single()

    if (findError || !promo) {
      return NextResponse.json({ error: 'Ungültiger Code' }, { status: 404 })
    }

    if (promo.redeemed_by) {
      return NextResponse.json({ error: 'Dieser Code wurde bereits eingelöst' }, { status: 409 })
    }

    // Code einlösen (markieren)
    const { error: redeemError } = await admin
      .from('promo_codes')
      .update({
        redeemed_by: user.id,
        redeemed_at: new Date().toISOString(),
      })
      .eq('id', promo.id)
      .is('redeemed_by', null) // Double-check: nur wenn noch nicht eingelöst

    if (redeemError) {
      console.error('Promo redeem error:', redeemError)
      return NextResponse.json({ error: 'Fehler beim Einlösen' }, { status: 500 })
    }

    // Subscription auf Pro setzen (gleicher Upsert wie beim Webhook)
    const { error: subError } = await admin.from('subscriptions').upsert({
      user_id: user.id,
      lemonsqueezy_subscription_id: `promo_${promo.id}`,
      lemonsqueezy_customer_id: 'promo',
      lemonsqueezy_order_id: null,
      variant_id: 'promo',
      plan: 'pro',
      status: 'active',
      billing_interval: 'year',
      current_period_end: null,
      renews_at: null,
      ends_at: null,
      update_payment_method_url: null,
      customer_portal_url: null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    if (subError) {
      console.error('Subscription upsert error:', subError)
      return NextResponse.json({ error: 'Fehler beim Aktivieren' }, { status: 500 })
    }

    return NextResponse.json({ success: true, plan: 'pro' })
  } catch (err) {
    console.error('Promo redeem error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
