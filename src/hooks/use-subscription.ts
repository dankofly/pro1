'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { isActiveStatus, type PlanTier } from '@/lib/lemonsqueezy'
import type { User } from '@supabase/supabase-js'

export interface SubscriptionInfo {
  plan: PlanTier
  status: string | null
  isFree: boolean
  isBasic: boolean
  isPro: boolean
  isActive: boolean
  currentPeriodEnd: string | null
  customerPortalUrl: string | null
  loading: boolean
  refresh: () => Promise<void>
}

export function useSubscription(user: User | null): SubscriptionInfo {
  const [plan, setPlan] = useState<PlanTier>('free')
  const [status, setStatus] = useState<string | null>(null)
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null)
  const [customerPortalUrl, setCustomerPortalUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setPlan('free')
      setStatus(null)
      setCurrentPeriodEnd(null)
      setCustomerPortalUrl(null)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan, status, current_period_end, customer_portal_url')
        .eq('user_id', user.id)
        .single()

      if (error || !data) {
        setPlan('free')
        setStatus(null)
      } else {
        const activePlan = isActiveStatus(data.status) ? (data.plan as PlanTier) : 'free'
        setPlan(activePlan)
        setStatus(data.status)
        setCurrentPeriodEnd(data.current_period_end)
        setCustomerPortalUrl(data.customer_portal_url)
      }
    } catch {
      setPlan('free')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchSubscription()
  }, [fetchSubscription])

  const isActive = plan !== 'free' && status !== null && isActiveStatus(status)

  return {
    plan,
    status,
    isFree: plan === 'free',
    isBasic: plan === 'basic' || plan === 'pro',
    isPro: plan === 'pro',
    isActive,
    currentPeriodEnd,
    customerPortalUrl,
    loading,
    refresh: fetchSubscription,
  }
}
