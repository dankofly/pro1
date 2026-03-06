import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

const MAX_ATTEMPTS_PER_HOUR = 5

async function checkPromoRateLimit(userId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin()
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { count } = await supabase
    .from('promo_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('attempted_at', oneHourAgo)

  return (count ?? 0) < MAX_ATTEMPTS_PER_HOUR
}

async function logPromoAttempt(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  await supabase.from('promo_attempts').insert({
    user_id: userId,
    attempted_at: new Date().toISOString(),
  })
}

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

    // Rate limit: max 5 attempts per hour
    const allowed = await checkPromoRateLimit(user.id)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Zu viele Versuche. Bitte versuche es in einer Stunde erneut.' },
        { status: 429 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const code = ((body.code as string) || '').trim().toUpperCase()

    if (!code || code.length > 30) {
      return NextResponse.json({ error: 'Ungültiger Code' }, { status: 400 })
    }

    const admin = getSupabaseAdmin()

    // Step 1: Check if the code exists at all
    const { data: existing, error: lookupError } = await admin
      .from('promo_codes')
      .select('id, code, redeemed_by')
      .eq('code', code)
      .maybeSingle()

    if (lookupError) {
      console.error('Promo lookup error:', lookupError)
      return NextResponse.json({ error: 'Fehler beim Einlösen' }, { status: 500 })
    }

    if (!existing) {
      console.log(`Promo: Code "${code}" (${code.length} chars) not found in DB`)
      await logPromoAttempt(user.id)
      return NextResponse.json({ error: 'Code ungültig' }, { status: 404 })
    }

    if (existing.redeemed_by) {
      console.log(`Promo: Code "${code}" already redeemed by ${existing.redeemed_by}`)
      await logPromoAttempt(user.id)
      return NextResponse.json({ error: 'Code wurde bereits eingelöst' }, { status: 409 })
    }

    // Step 2: Atomic redeem — update only if still unredeemed (race condition safe)
    const { data: redeemed, error: redeemError } = await admin
      .from('promo_codes')
      .update({
        redeemed_by: user.id,
        redeemed_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .is('redeemed_by', null)
      .select('id')

    if (redeemError) {
      console.error('Promo redeem error:', redeemError)
      return NextResponse.json({ error: 'Fehler beim Einlösen' }, { status: 500 })
    }

    if (!redeemed || redeemed.length === 0) {
      // Race condition: someone else redeemed it between our check and update
      await logPromoAttempt(user.id)
      return NextResponse.json({ error: 'Code wurde gerade eben eingelöst' }, { status: 409 })
    }

    const promoId = redeemed[0].id

    // Step 3: Subscription auf Pro setzen (1 Jahr gültig)
    const promoExpiry = new Date()
    promoExpiry.setFullYear(promoExpiry.getFullYear() + 1)

    const { error: subError } = await admin.from('subscriptions').upsert({
      user_id: user.id,
      stripe_subscription_id: `promo_${promoId}`,
      stripe_customer_id: 'promo',
      stripe_order_id: null,
      variant_id: 'promo',
      plan: 'pro',
      status: 'active',
      billing_interval: 'year',
      current_period_end: promoExpiry.toISOString(),
      renews_at: null,
      ends_at: promoExpiry.toISOString(),
      update_payment_method_url: null,
      customer_portal_url: null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    if (subError) {
      console.error('Subscription upsert error:', subError)
      return NextResponse.json({ error: 'Fehler beim Aktivieren' }, { status: 500 })
    }

    console.log(`Promo: Code "${code}" redeemed by ${user.id} (${user.email})`)
    return NextResponse.json({ success: true, plan: 'pro' })
  } catch (err) {
    console.error('Promo redeem error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
