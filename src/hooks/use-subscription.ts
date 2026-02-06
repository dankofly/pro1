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

export function useSubscription(user: User | null, authLoading: boolean = false): SubscriptionInfo {
  const [plan, setPlan] = useState<PlanTier>('free')
  const [status, setStatus] = useState<string | null>(null)
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null)
  const [customerPortalUrl, setCustomerPortalUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const CACHE_KEY = 'sub_cache'
  const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  const applyData = useCallback((data: { plan: string; status: string; current_period_end: string | null; customer_portal_url: string | null } | null) => {
    if (!data) {
      setPlan('free')
      setStatus(null)
      setCurrentPeriodEnd(null)
      setCustomerPortalUrl(null)
    } else {
      const activePlan = isActiveStatus(data.status) ? (data.plan as PlanTier) : 'free'
      setPlan(activePlan)
      setStatus(data.status)
      setCurrentPeriodEnd(data.current_period_end)
      setCustomerPortalUrl(data.customer_portal_url)
    }
  }, [])

  const fetchSubscription = useCallback(async () => {
    if (authLoading) return

    if (!user) {
      applyData(null)
      setLoading(false)
      return
    }

    // Check sessionStorage cache
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data: cachedData, ts, uid } = JSON.parse(cached)
        if (uid === user.id && Date.now() - ts < CACHE_TTL) {
          applyData(cachedData)
          setLoading(false)
          return
        }
      }
    } catch { /* ignore parse errors */ }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan, status, current_period_end, customer_portal_url')
        .eq('user_id', user.id)
        .single()

      if (error || !data) {
        applyData(null)
      } else {
        applyData(data)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now(), uid: user.id }))
        } catch { /* quota exceeded */ }
      }
    } catch {
      setPlan('free')
    } finally {
      setLoading(false)
    }
  }, [user, authLoading, applyData])

  useEffect(() => {
    fetchSubscription()
  }, [fetchSubscription])

  const refresh = useCallback(async () => {
    try { sessionStorage.removeItem(CACHE_KEY) } catch { /* ignore */ }
    await fetchSubscription()
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
    refresh,
  }
}
