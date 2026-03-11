'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import {
  BookOpen,
  Send,
  RefreshCw,
  AlertCircle,
  Bot,
  User,
  Lightbulb,
  Crown,
  LogIn,
} from 'lucide-react'
import { toast } from 'sonner'
import { escapeHtml } from '@/lib/sanitize-html'

// ── Types ────────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  chapters?: string[]
}

// ── Constants ────────────────────────────────────────────────

const QUICKSTART_QUESTIONS = [
  'Was ist der Unterschied zwischen ESt und KöSt?',
  'Wann gilt die Kleinunternehmerregelung?',
  'Was passiert bei einer Betriebsprüfung?',
  'Wie funktioniert die Grunderwerbsteuer?',
]

// ── Main page ────────────────────────────────────────────────

export default function SteuerwissenPage() {
  return (
    <AppShell>
      <SteuerwissenContent />
    </AppShell>
  )
}

// ── Content ──────────────────────────────────────────────────

function SteuerwissenContent() {
  const { user } = useAppShell()

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

    // Try to get token, but works without it too
    const session = await supabase.auth.getSession()
    const token = session?.data?.session?.access_token

    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const userMessage: ChatMessage = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputText('')
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/ai/tax-knowledge', {
        method: 'POST',
        headers,
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
        chapters: data.chapters?.length > 0 ? data.chapters : undefined,
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

  const isAnonymous = !user
  const limitReached = remaining !== null && remaining <= 0

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Mobile header */}
      <div className="sticky top-0 z-30 bg-[hsl(var(--surface))]/80 backdrop-blur-lg border-b border-border/40 md:hidden">
        <div className="px-4 h-14 flex items-center">
          <MobileNav />
          <span className="ml-2 text-sm font-semibold text-foreground">Steuer-Wissen</span>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="card-surface rounded-xl overflow-hidden">
            <div className="flex flex-col h-[calc(100dvh-8rem)] sm:h-[calc(100dvh-6rem)] max-h-[800px]">

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                    <BookOpen className="h-4.5 w-4.5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-foreground">Steuer-Wissen</h2>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-4 font-medium bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      >
                        Kostenlos
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Frag alles zum österreichischen Steuerrecht
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Rate limit display */}
                  {remaining !== null && limit !== null && (
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
                  )}
                  {isAnonymous && remaining === null && (
                    <span className="text-[10px] text-muted-foreground">
                      5 Fragen/Tag ohne Anmeldung
                    </span>
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

              {/* ── Message area ── */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                {messages.length === 0 && !isLoading ? (
                  /* Welcome screen */
                  <div className="flex flex-col items-center justify-center h-full gap-6 py-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                      <BookOpen className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div className="text-center space-y-1.5 max-w-md">
                      <h3 className="text-lg font-semibold text-foreground">Steuer-Wissen</h3>
                      <p className="text-sm text-muted-foreground">
                        Frag alles zum österreichischen Steuerrecht.
                        Basierend auf dem Lehrbuch Steuerrecht, 19. Auflage.
                      </p>
                    </div>
                    <div className="w-full max-w-md space-y-2">
                      {QUICKSTART_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="w-full text-left px-4 py-2.5 rounded-xl border border-border/60 text-sm text-foreground/80 hover:bg-accent hover:border-border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                              {msg.chapters && msg.chapters.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1.5 border-t border-border/30">
                                  <BookOpen className="h-3 w-3 text-muted-foreground mt-0.5" />
                                  {msg.chapters.map((chapter) => (
                                    <Badge
                                      key={chapter}
                                      variant="secondary"
                                      className="text-[10px] px-1.5 py-0 h-4 font-normal"
                                    >
                                      {chapter}
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
                            Suche im Lehrbuch...
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

              {/* ── CTA Banner (only on welcome + after 3+ messages) ── */}
              {(messages.length === 0 || messages.filter(m => m.role === 'assistant').length >= 3) && (
              <div className="px-4 py-2">
                <div className="bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/20 rounded-xl p-4 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Du willst nicht nur verstehen, sondern optimieren?
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Der KI-Steuerberater berechnet deine persönliche Steuerersparnis mit konkreten EUR-Beträgen.
                      </p>
                      <Button asChild size="sm" className="mt-2 bg-amber-500 hover:bg-amber-600 text-white">
                        <Link href="/steuerberater">
                          <Crown className="h-3.5 w-3.5 mr-1.5" />
                          KI-Steuerberater testen
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* ── Rate limit reached message ── */}
              {limitReached && (
                <div className="px-4 py-2">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                    {isAnonymous ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-amber-200">Tageslimit erreicht.</span>
                        <Button asChild size="sm" variant="outline" className="h-6 text-xs gap-1 border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                          <Link href="/login">
                            <LogIn className="h-3 w-3" />
                            Melde dich an für mehr Fragen
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <span className="text-amber-200">Tageslimit erreicht. Versuche es morgen wieder.</span>
                    )}
                  </div>
                </div>
              )}

              {/* ── Disclaimer ── */}
              <div className="px-4 py-1.5 text-center">
                <p className="text-xs text-muted-foreground">
                  KI-Tutor basierend auf Lehrbuch Steuerrecht, 19. Auflage. Keine Rechtsberatung.
                </p>
              </div>

              {/* ── Input area ── */}
              <div className="px-4 pb-4 pt-2 border-t border-border/40">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Stelle eine Frage zum Steuerrecht..."
                    rows={3}
                    disabled={isLoading || limitReached}
                    className="flex-1 min-h-[80px] resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  />
                  <Button
                    size="icon"
                    onClick={() => sendMessage(inputText)}
                    disabled={!inputText.trim() || isLoading || limitReached}
                    className="h-10 w-10 rounded-xl shrink-0 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Markdown renderer ────────────────────────────────────────

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
  return escapeHtml(md)
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-foreground mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-foreground mt-3 mb-1">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 pl-1 list-disc text-foreground/80">$1</li>')
    .replace(/€\s?([\d.,]+)/g, '<span class="font-mono font-medium text-foreground">€ $1</span>')
    .replace(/\n\n/g, '</p><p class="text-foreground/80">')
    .replace(/\n/g, '<br/>')
}
