import { NextRequest } from 'next/server'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { createHash } from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isAdmin } from '@/lib/admin'
import { routeToChapters } from '@/lib/tax-knowledge/router'
import { loadChapter, CHAPTERS } from '@/lib/tax-knowledge/index'

export const maxDuration = 60

// ── Rate Limits by Plan ─────────────────────────────────────
const LIMITS: Record<string, number> = {
  anonymous: 5,
  free: 20,
  basic: 30,
  pro: 50,
} as const

const MAX_MESSAGES = 20

const SYSTEM_PROMPT = `Du bist ein österreichischer Steuerrecht-Tutor, der komplexe steuerrechtliche Themen verständlich erklärt.

DEINE AUFGABE:
- Erkläre Steuerrecht-Konzepte basierend auf dem Lehrbuch-Wissen
- Nenne immer die relevanten §§ und Gesetze (EStG, KStG, UStG, BAO, etc.)
- Gib Beispiele wo möglich
- Strukturiere: Grundregel → Ausnahmen → Praxis-Relevanz

STIL:
- Lehrend und verständlich, nicht beratend
- Du-Form, wie ein hilfreicher Uni-Tutor
- Nutze Aufzählungen und Überschriften für Klarheit
- Max 600-800 Wörter pro Antwort

ABGRENZUNG:
- Du gibst KEINE individuelle Steuerberatung
- Du erklärst das RECHT, nicht die optimale STRATEGIE
- Bei Optimierungsfragen: "Für eine persönliche Steueroptimierung mit konkreten EUR-Beträgen empfehle ich dir den KI-Steuerberater auf steuerboard.pro/steuerberater (Pro-Feature)."

DISCLAIMER: Füge am Ende jeder Antwort hinzu:
"📖 Quelle: Lehrbuch Steuerrecht, 19. Auflage. Keine Rechtsberatung."`

// ── Helpers ─────────────────────────────────────────────────

/**
 * Hash an IP address into a deterministic UUID-v4-shaped string
 * so it can be stored in the ai_rate_limits table (user_id column).
 */
function ipToUuid(ip: string): string {
  const hash = createHash('sha256').update(`anon_${ip}`).digest('hex')
  // Format as UUID: 8-4-4-4-12
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    // Set version nibble to 4
    '4' + hash.slice(13, 16),
    // Set variant bits
    ((parseInt(hash[16], 16) & 0x3) | 0x8).toString(16) + hash.slice(17, 20),
    hash.slice(20, 32),
  ].join('-')
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for can be comma-separated; take the first (original client)
    return forwarded.split(',')[0].trim()
  }
  return '127.0.0.1'
}

// ── Rate Limiting ───────────────────────────────────────────

async function checkRateLimit(
  userId: string,
  maxRequests: number
): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getSupabaseAdmin()
  const now = new Date()

  const resetAt = new Date(now)
  resetAt.setHours(24, 0, 0, 0)

  // Reset expired counters
  await supabase
    .from('ai_rate_limits')
    .update({ request_count: 0, reset_at: resetAt.toISOString() })
    .eq('user_id', userId)
    .lt('reset_at', now.toISOString())

  const { data: existing } = await supabase
    .from('ai_rate_limits')
    .select('request_count')
    .eq('user_id', userId)
    .single()

  if (!existing) {
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

// ── Route Handler ───────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // 1. Auth — OPTIONAL (works without login too)
    const authHeader = request.headers.get('authorization')
    let user: { id: string; email?: string } | null = null
    let userPlan = 'anonymous'

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      try {
        const { data, error } = await getSupabaseAdmin().auth.getUser(token)
        if (!error && data.user) {
          user = data.user

          // Check subscription plan
          const { data: sub } = await getSupabaseAdmin()
            .from('subscriptions')
            .select('plan, status')
            .eq('user_id', data.user.id)
            .single()

          if (sub && ['active', 'trialing'].includes(sub.status)) {
            userPlan = sub.plan // 'basic' | 'pro'
          } else {
            userPlan = 'free'
          }
        }
      } catch {
        // Auth failed — continue as anonymous
      }
    }

    // 2. Rate limit
    const userIsAdmin = user ? isAdmin(user.email) : false
    const dailyLimit = LIMITS[userPlan] ?? LIMITS.anonymous
    let remaining: number
    let limit: number

    if (userIsAdmin) {
      remaining = -1
      limit = -1
    } else {
      // For anonymous users, use hashed IP as the rate-limit key
      const rateLimitKey = user
        ? user.id
        : ipToUuid(getClientIp(request))

      const rateCheck = await checkRateLimit(rateLimitKey, dailyLimit)
      if (!rateCheck.allowed) {
        return Response.json(
          {
            error: user
              ? 'Tageslimit erreicht. Du kannst morgen wieder eine Frage stellen.'
              : 'Tageslimit erreicht. Melde dich an, um mehr Fragen pro Tag stellen zu können.',
          },
          { status: 429 }
        )
      }
      remaining = rateCheck.remaining
      limit = dailyLimit
    }

    // 3. Parse request
    const body = await request.json().catch(() => ({}))
    const incomingMessages: Array<{ role: string; content: string }> =
      body.messages ?? []

    if (incomingMessages.length === 0) {
      return Response.json(
        { error: 'Keine Nachrichten gesendet' },
        { status: 400 }
      )
    }

    const truncatedMessages = incomingMessages.slice(-MAX_MESSAGES)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: any[] = truncatedMessages.map((m) => ({
      role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.content,
    }))

    // 4. Route to relevant chapters
    const lastUserMessage =
      [...truncatedMessages].reverse().find((m) => m.role === 'user')?.content ?? ''
    const chapterIds = routeToChapters(lastUserMessage)
    const chapterContent = chapterIds
      .map((id) => {
        const meta = CHAPTERS.find((c) => c.id === id)
        return `\n\n--- KAPITEL: ${meta?.title} ---\n\n${loadChapter(id)}`
      })
      .join('')

    const systemWithContext = `${SYSTEM_PROMPT}\n\n--- LEHRBUCH-KONTEXT ---\n${chapterContent}`

    // 5. Call Gemini (no tools, no streaming)
    const result = await generateText({
      model: google('gemini-2.0-flash'),
      system: systemWithContext,
      messages,
      maxOutputTokens: 2048,
      temperature: 0.5,
    })

    let finalText = result.text

    // 6. CTA injection every 3rd user message
    const userMessageCount = truncatedMessages.filter(
      (m) => m.role === 'user'
    ).length
    if (userMessageCount > 0 && userMessageCount % 3 === 0) {
      finalText +=
        '\n\n---\n\n' +
        '**Tipp:** Für eine persönliche Steueroptimierung mit konkreten EUR-Beträgen nutze den [KI-Steuerberater](/steuerberater) (Pro-Feature).'
    }

    return Response.json(
      {
        text: finalText,
        remaining,
        limit,
        chapters: chapterIds,
      },
      {
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Tax Knowledge error:', message, err)

    return Response.json(
      { error: `Steuer-Wissen Fehler: ${message}` },
      { status: 500 }
    )
  }
}
