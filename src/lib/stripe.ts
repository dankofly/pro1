import { loadStripe, type Stripe as StripeClient } from '@stripe/stripe-js'

// Stripe Plan-Konfiguration

export const STRIPE_PLANS = {
  basic_monthly: {
    priceId: 'price_1T92la058l4G2yAGDn1eZkrV',
    plan: 'basic' as const,
    interval: 'month' as const,
    price: 1290,
    label: 'Sicherheits-Plan',
    priceDisplay: '12,90',
  },
  basic_yearly: {
    priceId: 'price_1T92ld058l4G2yAG1xQbwqbO',
    plan: 'basic' as const,
    interval: 'year' as const,
    price: 11900,
    label: 'Sicherheits-Plan',
    priceDisplay: '119',
  },
  pro_monthly: {
    priceId: 'price_1T92le058l4G2yAGXYMfQRq6',
    plan: 'pro' as const,
    interval: 'month' as const,
    price: 2490,
    label: 'SteuerBoard Pro',
    priceDisplay: '24,90',
  },
  pro_yearly: {
    priceId: 'price_1T92lg058l4G2yAGKwNvUhLP',
    plan: 'pro' as const,
    interval: 'year' as const,
    price: 23900,
    label: 'SteuerBoard Pro',
    priceDisplay: '239',
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
