import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getStripeServer } from '@/lib/stripe-server'
import { getPlanByPriceId } from '@/lib/stripe'

// In newer Stripe SDK, current_period_end is on SubscriptionItem, not Subscription
function getItemPeriodEnd(subscription: Stripe.Subscription): string | null {
  const item = subscription.items.data[0]
  if (!item) return null
  return new Date(item.current_period_end * 1000).toISOString()
}

function extractSubscriptionData(subscription: Stripe.Subscription) {
  const item = subscription.items.data[0]
  const priceId = item?.price?.id
  const planInfo = priceId ? getPlanByPriceId(priceId) : null
  const interval = item?.price?.recurring?.interval
  const periodEnd = getItemPeriodEnd(subscription)

  return {
    priceId: priceId ?? '',
    plan: planInfo?.plan ?? 'pro' as const,
    interval: interval === 'year' ? 'year' as const : 'month' as const,
    periodEnd,
    customerId: typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer.id,
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }

    let event: Stripe.Event
    try {
      event = getStripeServer().webhooks.constructEvent(rawBody, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const admin = getSupabaseAdmin()

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription' || !session.subscription) break

        const subscriptionId = typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription.id

        const subscription = await getStripeServer().subscriptions.retrieve(subscriptionId)
        const userId = subscription.metadata.user_id

        if (!userId) {
          console.error('No user_id in subscription metadata')
          break
        }

        const data = extractSubscriptionData(subscription)

        const { error } = await admin.from('subscriptions').upsert({
          user_id: userId,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: data.customerId,
          stripe_order_id: null,
          variant_id: data.priceId,
          plan: data.plan,
          status: subscription.status,
          billing_interval: data.interval,
          current_period_end: data.periodEnd,
          renews_at: subscription.cancel_at_period_end ? null : data.periodEnd,
          ends_at: subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000).toISOString()
            : null,
          update_payment_method_url: null,
          customer_portal_url: null,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' })

        if (error) console.error('Webhook upsert error:', error)
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const data = extractSubscriptionData(subscription)

        const status = event.type === 'customer.subscription.deleted'
          ? 'cancelled'
          : subscription.status

        const { error } = await admin.from('subscriptions')
          .update({
            status,
            variant_id: data.priceId,
            plan: data.plan,
            billing_interval: data.interval,
            current_period_end: data.periodEnd,
            renews_at: subscription.cancel_at_period_end ? null : data.periodEnd,
            ends_at: subscription.cancel_at
              ? new Date(subscription.cancel_at * 1000).toISOString()
              : null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) console.error('Webhook update error:', error)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        // In newer Stripe SDK, subscription is under parent.subscription_details
        const subDetails = invoice.parent?.subscription_details
        const subscriptionId = subDetails
          ? (typeof subDetails.subscription === 'string'
              ? subDetails.subscription
              : subDetails.subscription?.id)
          : null

        if (subscriptionId) {
          const { error } = await admin.from('subscriptions')
            .update({
              status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId)

          if (error) console.error('Webhook payment_failed update error:', error)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
