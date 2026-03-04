'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProSectionWrapper } from './pro-section-wrapper'
import { supabase } from '@/lib/supabase'
import {
  MessageSquare,
  Send,
  RefreshCw,
  AlertCircle,
  Calculator,
  Bot,
  User,
  Sparkles,
} from 'lucide-react'
import { toast } from 'sonner'

interface TaxChatbotProps {
  isPro: boolean
  onUpgradeRequired: (feature: string, plan: 'basic' | 'pro') => void
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  toolsUsed?: string[]
}

const QUICKSTART_QUESTIONS = [
  'Wie viel Einkommensteuer zahle ich bei 60.000 € Gewinn?',
  'GmbH oder Einzelunternehmen — was ist besser bei 100.000 €?',
  'Bin ich Kleinunternehmer bei 50.000 € Umsatz?',
  'Wie wird mein Bitcoin-Verkauf besteuert?',
]

const TOOL_LABELS: Record<string, string> = {
  einkommensteuer_berechnen: 'Einkommensteuer',
  koerperschaftsteuer_berechnen: 'Körperschaftsteuer',
  umsatzsteuer_berechnen: 'Umsatzsteuer',
  sachbezug_berechnen: 'Sachbezug',
  investitionsfreibetrag_berechnen: 'Investitionsfreibetrag',
  immobilienertragssteuer_berechnen: 'Immobilienertragsteuer',
  krypto_steuer_berechnen: 'Krypto-Steuer',
}

export function TaxChatbot({ isPro, onUpgradeRequired }: TaxChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [limit, setLimit] = useState<number | null>(null)
  const [error, setError] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])


  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    // Auth
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) {
      toast.error('Bitte melde dich an, um den Chatbot zu nutzen.')
      return
    }

    const userMessage: ChatMessage = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputText('')
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/ai/tax-chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      const remainingHeader = res.headers.get('X-RateLimit-Remaining')
      if (remainingHeader !== null) {
        setRemaining(parseInt(remainingHeader, 10))
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }))
        throw new Error(errorData.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.text,
        toolsUsed: data.tools_used?.length > 0 ? data.tools_used : undefined,
      }

      if (data.remaining !== undefined) {
        setRemaining(data.remaining)
      }
      if (data.limit !== undefined) {
        setLimit(data.limit)
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputText)
    }
  }, [inputText, sendMessage])

  const resetChat = useCallback(() => {
    setMessages([])
    setError('')
    setInputText('')
  }, [])

  const content = (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)] max-h-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
            <MessageSquare className="h-4.5 w-4.5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-foreground">Steuer-Chatbot</h2>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-medium">
                Pro
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              KI-Assistent für österreichisches Steuerrecht 2026
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {remaining !== null && limit !== null && (
            remaining === -1 ? (
              <span className="text-[11px] text-muted-foreground">∞ Unbegrenzt</span>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 rounded-full bg-muted/30 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      remaining / limit > 0.5
                        ? 'bg-emerald-500'
                        : remaining / limit > 0.25
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${(remaining / limit) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {remaining}/{limit}
                </span>
              </div>
            )
          )}
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetChat}
              className="h-7 text-xs gap-1 text-muted-foreground"
            >
              <RefreshCw className="h-3 w-3" />
              Neuer Chat
            </Button>
          )}
        </div>
      </div>

      {/* Message area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
        {messages.length === 0 && !isLoading ? (
          /* Welcome screen */
          <div className="flex flex-col items-center justify-center h-full gap-6 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Sparkles className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-center space-y-1.5 max-w-md">
              <h3 className="text-lg font-semibold text-foreground">Steuer-Chatbot</h3>
              <p className="text-sm text-muted-foreground">
                Stelle Fragen zu ESt, KöSt, USt, Immobilien, Krypto und mehr.
                Der Chatbot rechnet mit aktuellen Werten für 2026.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              {QUICKSTART_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left px-4 py-2.5 rounded-xl border border-border/60 text-sm text-foreground/80 hover:bg-accent hover:border-border transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Message list */
          <>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-md'
                      : 'bg-muted/50 text-foreground rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="space-y-2">
                      <MarkdownContent text={msg.content} />
                      {msg.toolsUsed && msg.toolsUsed.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-border/30">
                          <Calculator className="h-3 w-3 text-muted-foreground mt-0.5" />
                          {msg.toolsUsed.map((tool) => (
                            <Badge
                              key={tool}
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4 font-normal"
                            >
                              {TOOL_LABELS[tool] || tool}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/10 mt-0.5">
                    <User className="h-3.5 w-3.5 text-foreground/60" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Berechne und analysiere...
                  </div>
                </div>
              </div>
            )}

            {/* Error display */}
            {error && !isLoading && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-destructive/5 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-1.5 text-center">
        <p className="text-[10px] text-muted-foreground">
          KI-Assistent — keine Steuerberatung. Alle Angaben ohne Gewähr.
        </p>
      </div>

      {/* Input area */}
      <div className="px-4 pb-4 pt-2 border-t border-border/40">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Stelle eine Steuerfrage..."
            rows={3}
            disabled={isLoading}
            className="flex-1 min-h-[80px] resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          />
          <Button
            size="icon"
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="h-10 w-10 rounded-xl shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <ProSectionWrapper
      isPro={isPro}
      featureName="Steuer-Chatbot"
      onUpgradeRequired={onUpgradeRequired}
    >
      <div className="card-surface rounded-xl overflow-hidden">
        {content}
      </div>
    </ProSectionWrapper>
  )
}

// ── Markdown renderer (reused from ai-tax-advisor) ──────────

function MarkdownContent({ text }: { text: string }) {
  const html = renderMarkdown(text)
  return (
    <div
      className="ai-markdown text-sm text-foreground/90 leading-relaxed space-y-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-foreground mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-foreground mt-3 mb-1">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 pl-1 list-disc text-foreground/80">$1</li>')
    .replace(/€\s?([\d.,]+)/g, '<span class="font-mono font-medium text-foreground">€ $1</span>')
    .replace(/\n\n/g, '</p><p class="text-foreground/80">')
    .replace(/\n/g, '<br/>')
}
