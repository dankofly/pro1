import { NextRequest } from 'next/server'
import { generateText, jsonSchema } from 'ai'
import { google } from '@ai-sdk/google'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { isAdmin } from '@/lib/admin'
import { SYSTEM_PROMPT } from '@/lib/tax-calculators/knowledge'
import { executeTool, TOOL_DEFINITIONS } from '@/lib/tax-calculators'

export const maxDuration = 60

const LIMITS = { pro: 20, basic: 10 } as const
const MAX_MESSAGES = 20
const MAX_TOOL_ITERATIONS = 5

// ── Rate Limiting ─────────────────────────────────────────

async function checkRateLimit(userId: string, maxRequests: number): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getSupabaseAdmin()
  const now = new Date()

  const resetAt = new Date(now)
  resetAt.setHours(24, 0, 0, 0)

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

// ── Build tools for Vercel AI SDK ──────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildTools(): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {}

  for (const def of TOOL_DEFINITIONS) {
    result[def.name] = {
      description: def.description,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputSchema: jsonSchema(def.input_schema as any),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      execute: async (input: any) => {
        return executeTool(def.name, input as Record<string, unknown>)
      },
    }
  }

  return result
}

// ── Route Handler ──────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // 1. Auth
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return Response.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await getSupabaseAdmin().auth.getUser(token)
    if (authError || !user) {
      return Response.json({ error: 'Ungültiges Token' }, { status: 401 })
    }

    // 2. Subscription check
    const { data: sub } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single()

    if (!sub || sub.plan !== 'pro' || !['active', 'trialing'].includes(sub.status)) {
      return Response.json({ error: 'Pro-Abo erforderlich' }, { status: 403 })
    }

    // 3. Rate limit (admin = unlimited)
    const userIsAdmin = isAdmin(user.email)
    const dailyLimit = sub.plan === 'pro' ? LIMITS.pro : LIMITS.basic
    let remaining: number
    let limit: number

    if (userIsAdmin) {
      remaining = -1
      limit = -1
    } else {
      const rateCheck = await checkRateLimit(user.id, dailyLimit)
      if (!rateCheck.allowed) {
        return Response.json(
          { error: 'Tageslimit erreicht. Du kannst morgen wieder eine Frage stellen.' },
          { status: 429 }
        )
      }
      remaining = rateCheck.remaining
      limit = dailyLimit
    }

    // 4. Parse request
    const body = await request.json().catch(() => ({}))
    const incomingMessages: Array<{ role: string; content: string }> = body.messages ?? []

    if (incomingMessages.length === 0) {
      return Response.json({ error: 'Keine Nachrichten gesendet' }, { status: 400 })
    }

    const truncatedMessages = incomingMessages.slice(-MAX_MESSAGES)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentMessages: any[] = truncatedMessages.map((m) => ({
      role: m.role === 'user' ? 'user' as const : 'assistant' as const,
      content: m.content,
    }))

    // 5. Call Gemini with manual tool loop
    const tools = buildTools()
    const toolsUsed: string[] = []
    let finalText = ''

    for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
      const result = await generateText({
        model: google('gemini-2.0-flash'),
        system: SYSTEM_PROMPT,
        messages: currentMessages,
        tools,
        maxOutputTokens: 2048,
        temperature: 0.7,
      })

      // If no tool calls, we're done
      if (!result.toolCalls || result.toolCalls.length === 0) {
        finalText = result.text
        break
      }

      // Execute tool calls
      const toolResults = result.toolCalls.map((tc) => {
        toolsUsed.push(tc.toolName)
        const output = executeTool(tc.toolName, tc.input as Record<string, unknown>)
        return { toolCallId: tc.toolCallId, toolName: tc.toolName, result: output }
      })

      // Append assistant message (with tool calls) and tool results to conversation
      currentMessages.push({
        role: 'assistant' as const,
        content: result.toolCalls.map((tc) => ({
          type: 'tool-call' as const,
          toolCallId: tc.toolCallId,
          toolName: tc.toolName,
          args: tc.input,
        })),
      })

      currentMessages.push({
        role: 'tool' as const,
        content: toolResults.map((tr) => ({
          type: 'tool-result' as const,
          toolCallId: tr.toolCallId,
          toolName: tr.toolName,
          result: tr.result,
        })),
      })

      // If there was also text in the response, capture it
      if (result.text) {
        finalText = result.text
      }
    }

    // Deduplicate tools used
    const uniqueTools = [...new Set(toolsUsed)]

    return Response.json({
      text: finalText,
      tools_used: uniqueTools,
      remaining,
      limit,
    }, {
      headers: {
        'X-RateLimit-Remaining': String(remaining),
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Tax Chatbot error:', message, err)

    return Response.json(
      { error: `Chatbot-Fehler: ${message}` },
      { status: 500 }
    )
  }
}
