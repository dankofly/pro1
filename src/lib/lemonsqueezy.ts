// Lemon Squeezy Plan-Konfiguration
// Variant-IDs muessen nach Produkterstellung im LS-Dashboard eingetragen werden

export const LS_PLANS = {
  basic_monthly: {
    variantId: 'REPLACE_WITH_VARIANT_ID',
    plan: 'basic' as const,
    interval: 'month' as const,
    price: 990,
    label: 'Sicherheits-Plan',
    priceDisplay: '9,90',
  },
  basic_yearly: {
    variantId: 'REPLACE_WITH_VARIANT_ID',
    plan: 'basic' as const,
    interval: 'year' as const,
    price: 9900,
    label: 'Sicherheits-Plan',
    priceDisplay: '99',
  },
  pro_monthly: {
    variantId: 'REPLACE_WITH_VARIANT_ID',
    plan: 'pro' as const,
    interval: 'month' as const,
    price: 1990,
    label: 'Butler-Vollversion',
    priceDisplay: '19,90',
  },
  pro_yearly: {
    variantId: 'REPLACE_WITH_VARIANT_ID',
    plan: 'pro' as const,
    interval: 'year' as const,
    price: 19900,
    label: 'Butler-Vollversion',
    priceDisplay: '199',
  },
} as const

export type PlanKey = keyof typeof LS_PLANS
export type PlanTier = 'free' | 'basic' | 'pro'

export function getPlanByVariantId(variantId: string) {
  return Object.values(LS_PLANS).find(p => p.variantId === variantId) ?? null
}

export function buildCheckoutUrl(variantId: string, userId: string, userEmail: string): string {
  const storeId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID
  return `https://svschecker.lemonsqueezy.com/checkout/buy/${variantId}?checkout[custom][user_id]=${userId}&checkout[email]=${encodeURIComponent(userEmail)}`
}

export function isActiveStatus(status: string): boolean {
  return ['active', 'on_trial', 'paused'].includes(status)
}
