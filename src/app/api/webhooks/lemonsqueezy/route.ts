import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getPlanByVariantId } from '@/lib/lemonsqueezy'

function verifySignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(body).digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
  } catch {
    return false
  }
}

const VALID_EVENTS = [
  'subscription_created',
  'subscription_updated',
  'subscription_cancelled',
  'subscription_expired',
  'subscription_resumed',
  'subscription_payment_success',
  'subscription_payment_failed',
]

const VALID_STATUSES = ['active', 'on_trial', 'paused', 'cancelled', 'expired', 'past_due', 'unpaid']
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-signature') ?? ''
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

    if (!secret) {
      console.error('LEMONSQUEEZY_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }

    if (!signature || !verifySignature(rawBody, signature, secret)) {
      console.error('Webhook signature verification failed')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = JSON.parse(rawBody)
    const eventName: string = payload.meta?.event_name
    const data = payload.data
    const attrs = data?.attributes

    if (!eventName || !data || !attrs) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    if (!VALID_EVENTS.includes(eventName)) {
      // Unknown event - acknowledge to prevent retries
      return NextResponse.json({ received: true })
    }

    const customData = payload.meta.custom_data ?? {}
    const userId = customData.user_id as string | undefined

    const subscriptionId = String(data.id)
    const variantId = String(attrs.variant_id)
    const planInfo = getPlanByVariantId(variantId)
    const status: string = VALID_STATUSES.includes(attrs.status) ? attrs.status : 'active'
    const customerId = String(attrs.customer_id)
    const orderId = attrs.order_id ? String(attrs.order_id) : null

    if (eventName === 'subscription_created') {
      if (!userId || !UUID_REGEX.test(userId)) {
        console.error('Invalid or missing user_id in custom_data', { userId })
        return NextResponse.json({ error: 'Invalid user_id' }, { status: 400 })
      }

      const { error } = await getSupabaseAdmin().from('subscriptions').upsert({
        user_id: userId,
        lemonsqueezy_subscription_id: subscriptionId,
        lemonsqueezy_customer_id: customerId,
        lemonsqueezy_order_id: orderId,
        variant_id: variantId,
        plan: planInfo?.plan ?? 'pro',
        status,
        billing_interval: planInfo?.interval ?? 'month',
        current_period_end: attrs.current_period_end ?? null,
        renews_at: attrs.renews_at ?? null,
        ends_at: attrs.ends_at ?? null,
        update_payment_method_url: attrs.urls?.update_payment_method ?? null,
        customer_portal_url: attrs.urls?.customer_portal ?? null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })

      if (error) {
        console.error('Webhook upsert error:', error)
        return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
      }
    }

    if ([
      'subscription_updated',
      'subscription_cancelled',
      'subscription_expired',
      'subscription_resumed',
      'subscription_payment_success',
      'subscription_payment_failed',
    ].includes(eventName)) {
      const { error } = await getSupabaseAdmin().from('subscriptions')
        .update({
          status,
          variant_id: variantId,
          plan: planInfo?.plan ?? 'pro',
          current_period_end: attrs.current_period_end ?? null,
          renews_at: attrs.renews_at ?? null,
          ends_at: attrs.ends_at ?? null,
          update_payment_method_url: attrs.urls?.update_payment_method ?? null,
          customer_portal_url: attrs.urls?.customer_portal ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq('lemonsqueezy_subscription_id', subscriptionId)

      if (error) {
        console.error('Webhook update error:', error)
        return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
