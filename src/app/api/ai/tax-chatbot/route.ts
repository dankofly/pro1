import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { SYSTEM_PROMPT } from '@/lib/tax-calculators/knowledge'
import { TOOL_DEFINITIONS, executeTool } from '@/lib/tax-calculators'

const MAX_REQUESTS_PER_DAY = 10
const MAX_TOOL_ITERATIONS = 5
const MAX_MESSAGES = 20

// ── Rate Limiting (reused from tax-advisor) ────────────────

async function checkRateLimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
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
    return { allowed: true, remaining: MAX_REQUESTS_PER_DAY - 1 }
  }

  if (existing.request_count >= MAX_REQUESTS_PER_DAY) {
    return { allowed: false, remaining: 0 }
  }

  const { data: updated, error: updateError } = await supabase
    .from('ai_rate_limits')
    .update({ request_count: existing.request_count + 1 })
    .eq('user_id', userId)
    .lt('request_count', MAX_REQUESTS_PER_DAY)
    .select('request_count')

  if (updateError || !updated || updated.length === 0) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: MAX_REQUESTS_PER_DAY - updated[0].request_count }
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
      return Response.json({ error: 'Ungueltiges Token' }, { status: 401 })
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

    // 3. Rate limit
    const { allowed, remaining } = await checkRateLimit(user.id)
    if (!allowed) {
      return Response.json(
        { error: 'Tageslimit erreicht. Du kannst morgen wieder eine Frage stellen.' },
        { status: 429 }
      )
    }

    // 4. Parse request
    const body = await request.json().catch(() => ({}))
    const incomingMessages: Array<{ role: string; content: string }> = body.messages ?? []

    if (incomingMessages.length === 0) {
      return Response.json({ error: 'Keine Nachrichten gesendet' }, { status: 400 })
    }

    // Limit conversation length
    const truncatedMessages = incomingMessages.slice(-MAX_MESSAGES)

    // 5. Build Claude messages
    const claudeMessages: Anthropic.MessageParam[] = truncatedMessages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }))

    // 6. Call Claude with Tool Use loop
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'API-Konfigurationsfehler' }, { status: 500 })
    }

    const client = new Anthropic({ apiKey })

    const tools: Anthropic.Tool[] = TOOL_DEFINITIONS.map((t) => ({
      name: t.name,
      description: t.description,
      input_schema: t.input_schema as Anthropic.Tool.InputSchema,
    }))

    let toolsUsed: string[] = []
    let finalText = ''
    let iterations = 0

    // Tool Use loop: Claude may call tools, we execute them and continue
    let currentMessages = [...claudeMessages]

    while (iterations < MAX_TOOL_ITERATIONS) {
      iterations++

      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        tools,
        messages: currentMessages,
      })

      // Check if Claude wants to use tools
      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ContentBlock & { type: 'tool_use' } => block.type === 'tool_use'
      )

      const textBlocks = response.content.filter(
        (block): block is Anthropic.TextBlock => block.type === 'text'
      )

      if (toolUseBlocks.length === 0) {
        // No more tool calls — collect final text
        finalText = textBlocks.map((b) => b.text).join('\n')
        break
      }

      // Execute tool calls
      const toolResults: Anthropic.ToolResultBlockParam[] = []
      for (const toolUse of toolUseBlocks) {
        const result = executeTool(toolUse.name, toolUse.input as Record<string, unknown>)
        toolsUsed.push(toolUse.name)
        toolResults.push({
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: result,
        })
      }

      // Add assistant response + tool results to conversation
      currentMessages = [
        ...currentMessages,
        { role: 'assistant' as const, content: response.content },
        { role: 'user' as const, content: toolResults },
      ]

      // If stop_reason is end_turn with text, we're done
      if (response.stop_reason === 'end_turn' && textBlocks.length > 0) {
        finalText = textBlocks.map((b) => b.text).join('\n')
        break
      }
    }

    // Deduplicate tools used
    toolsUsed = [...new Set(toolsUsed)]

    return Response.json({
      text: finalText,
      tools_used: toolsUsed,
      remaining,
    }, {
      headers: {
        'X-RateLimit-Remaining': String(remaining),
      },
    })
  } catch (err: unknown) {
    console.error('Tax Chatbot error:', err)
    return Response.json(
      { error: 'Chatbot-Fehler. Bitte versuche es erneut.' },
      { status: 500 }
    )
  }
}
