import { loadStripe, type Stripe as StripeClient } from '@stripe/stripe-js'

// Stripe Plan-Konfiguration

export const STRIPE_PLANS = {
  basic_monthly: {
    priceId: 'price_1SzNcl058l4G2yAGac6wVS5U',
    plan: 'basic' as const,
    interval: 'month' as const,
    price: 990,
    label: 'Sicherheits-Plan',
    priceDisplay: '9,90',
  },
  basic_yearly: {
    priceId: 'price_1SzNcl058l4G2yAGHBnR6EFc',
    plan: 'basic' as const,
    interval: 'year' as const,
    price: 9900,
    label: 'Sicherheits-Plan',
    priceDisplay: '99',
  },
  pro_monthly: {
    priceId: 'price_1SzNcl058l4G2yAGIojL3EuJ',
    plan: 'pro' as const,
    interval: 'month' as const,
    price: 1990,
    label: 'SteuerBoard Pro',
    priceDisplay: '19,90',
  },
  pro_yearly: {
    priceId: 'price_1SzNcl058l4G2yAGwN9wLihg',
    plan: 'pro' as const,
    interval: 'year' as const,
    price: 19900,
    label: 'SteuerBoard Pro',
    priceDisplay: '199',
  },
} as const

export type PlanKey = keyof typeof STRIPE_PLANS
export type PlanTier = 'free' | 'basic' | 'pro'

export function getPlanByPriceId(priceId: string) {
  return Object.values(STRIPE_PLANS).find(p => p.priceId === priceId) ?? null
}

export function isActiveStatus(status: string): boolean {
  return ['active', 'trialing', 'past_due'].includes(status)
}

// Client-side Stripe instance (singleton)
let stripePromise: Promise<StripeClient | null> | null = null

export function getStripePromise() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}
