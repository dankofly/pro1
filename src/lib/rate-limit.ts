/**
 * Rate limiting utilities for API routes.
 *
 * Two strategies:
 * 1. `checkAiRateLimit` — Supabase-backed daily limit per user (for AI endpoints)
 * 2. `checkIpRateLimit` — Supabase-backed sliding window per IP (for checkout/portal/email)
 *
 * Both are safe for serverless (no in-memory state).
 * Race conditions mitigated via `.lt()` conditional updates.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin'

// ── AI Rate Limit (daily per user) ──────────────────────────

export async function checkAiRateLimit(
  userId: string,
  maxRequests: number
): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getSupabaseAdmin()
  const now = new Date()

  // Reset time: next midnight
  const resetAt = new Date(now)
  resetAt.setHours(24, 0, 0, 0)

  // Reset expired entries
  await supabase
    .from('ai_rate_limits')
    .update({ request_count: 0, reset_at: resetAt.toISOString() })
    .eq('user_id', userId)
    .lt('reset_at', now.toISOString())

  // Check current count
  const { data: existing } = await supabase
    .from('ai_rate_limits')
    .select('request_count')
    .eq('user_id', userId)
    .single()

  if (!existing) {
    // First request — create entry
    await supabase.from('ai_rate_limits').upsert({
      user_id: userId,
      request_count: 1,
      reset_at: resetAt.toISOString(),
    })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (existing.request_count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  // Conditional increment: only if still under limit
  // The `.lt()` guard prevents race conditions — concurrent requests
  // that both read the same count will only allow one to increment
  const { data: updated, error: updateError } = await supabase
    .from('ai_rate_limits')
    .update({ request_count: existing.request_count + 1 })
    .eq('user_id', userId)
    .lt('request_count', maxRequests)
    .select('request_count')

  if (updateError || !updated || updated.length === 0) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: maxRequests - updated[0].request_count }
}

// ── IP Rate Limit (Supabase-backed sliding window) ──────────

/**
 * Database-backed rate limiter for IP-based throttling.
 * Uses `ip_rate_limits` table. Safe for serverless.
 */
export async function checkIpRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getSupabaseAdmin()
  const now = new Date()
  const windowEnd = new Date(now.getTime() + windowSeconds * 1000)

  // Reset expired entries
  await supabase
    .from('ip_rate_limits')
    .update({ count: 0, reset_at: windowEnd.toISOString() })
    .eq('key', key)
    .lt('reset_at', now.toISOString())

  // Check current count
  const { data: existing } = await supabase
    .from('ip_rate_limits')
    .select('count')
    .eq('key', key)
    .single()

  if (!existing) {
    // First request — create entry
    await supabase.from('ip_rate_limits').upsert({
      key,
      count: 1,
      reset_at: windowEnd.toISOString(),
    })
    return { allowed: true, remaining: limit - 1 }
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  // Conditional increment with guard
  const { data: updated, error } = await supabase
    .from('ip_rate_limits')
    .update({ count: existing.count + 1 })
    .eq('key', key)
    .lt('count', limit)
    .select('count')

  if (error || !updated || updated.length === 0) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: limit - updated[0].count }
}

// ── Client IP extraction ────────────────────────────────────

/**
 * Extract client IP from request headers (works on Netlify, Vercel, Cloudflare).
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}
