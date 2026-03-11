/**
 * Simple in-memory rate limiter for API routes.
 * Uses a sliding window per key (IP or user ID).
 *
 * Note: On serverless (Netlify Functions), this provides per-instance protection.
 * For distributed rate limiting, use Supabase-based checks (as in promo/AI endpoints).
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Cleanup stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}

interface RateLimitOptions {
  /** Max requests per window */
  limit: number
  /** Window size in seconds */
  windowSeconds: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  cleanup()

  const now = Date.now()
  const windowMs = opts.windowSeconds * 1000
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: opts.limit - 1, resetAt: now + windowMs }
  }

  entry.count++
  const allowed = entry.count <= opts.limit
  return {
    allowed,
    remaining: Math.max(0, opts.limit - entry.count),
    resetAt: entry.resetAt,
  }
}

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
