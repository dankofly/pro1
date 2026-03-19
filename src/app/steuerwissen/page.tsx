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
  RefreshCw,
  AlertCircle,
  Bot,
  User,
  Sparkles,
  Crown,
  LogIn,
  ArrowUp,
} from 'lucide-react'
import { toast } from 'sonner'
import { escapeHtml } from '@/lib/sanitize-html'

// ── Types ────────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  chapters?: string[]
}

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

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = inputRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    const maxHeight = 120
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
  }, [])

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputText, adjustTextareaHeight])

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
  const hasMessages = messages.length > 0 || isLoading

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Mobile header */}
      <div className="sticky top-0 z-30 bg-[hsl(var(--surface))]/80 backdrop-blur-lg border-b border-border/40 md:hidden">
        <div className="px-4 h-14 flex items-center">
          <MobileNav />
          <span className="ml-2 text-sm font-semibold text-foreground">Steuer-Wissen</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 sm:p-6 pb-20 md:pb-6">
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
          <div className="card-surface rounded-2xl overflow-hidden flex-1 flex flex-col border border-border/30">
            <div className="flex flex-col h-[calc(100dvh-8rem)] sm:h-[calc(100dvh-6rem)] max-h-[800px]">

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/30 bg-[hsl(var(--surface))]/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                    <BookOpen className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-foreground">Steuer-Wissen</h2>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 h-4 font-medium bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                      >
                        Kostenlos
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Basierend auf Lehrbuch Steuerrecht, 19. Auflage
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {remaining !== null && limit !== null && (
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted/30 overflow-hidden">
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
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {remaining}/{limit}
                      </span>
                    </div>
                  )}
                  {isAnonymous && remaining === null && (
                    <span className="hidden sm:inline text-[10px] text-muted-foreground">
                      5 Fragen/Tag ohne Anmeldung
                    </span>
                  )}
                  {messages.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetChat}
                      className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span className="hidden sm:inline">Neuer Chat</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* ── Message area ── */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-thin">
                {!hasMessages ? (
                  /* Welcome screen */
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 ring-1 ring-emerald-500/20">
                      <Sparkles className="h-7 w-7 text-emerald-400" />
                    </div>
                    <div className="text-center space-y-2 max-w-sm">
                      <h3 className="text-xl font-semibold text-foreground tracking-tight">
                        Frag zum Steuerrecht
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Stelle deine Frage zum österreichischen Steuerrecht.
                        Antworten basieren auf dem aktuellen Lehrbuch Steuerrecht.
                      </p>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60 mt-2">
                      Keine Rechtsberatung -- nur zur Information
                    </p>
                  </div>
                ) : (
                  /* Message list */
                  <>
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                            <Bot className="h-3.5 w-3.5 text-emerald-500" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] ${
                            msg.role === 'user'
                              ? 'bg-emerald-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5'
                              : 'text-foreground py-1'
                          }`}
                        >
                          {msg.role === 'assistant' ? (
                            <div className="space-y-2">
                              <MarkdownContent text={msg.content} />
                              {msg.chapters && msg.chapters.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-2 mt-2 border-t border-border/20">
                                  <BookOpen className="h-3 w-3 text-muted-foreground mt-0.5 mr-0.5" />
                                  {msg.chapters.map((chapter) => (
                                    <Badge
                                      key={chapter}
                                      variant="secondary"
                                      className="text-[10px] px-1.5 py-0 h-4 font-normal bg-muted/40"
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
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/8 mt-0.5">
                            <User className="h-3.5 w-3.5 text-foreground/50" />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                          <Bot className="h-3.5 w-3.5 text-emerald-500" />
                        </div>
                        <div className="py-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs">Suche im Lehrbuch...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Error display */}
                    {error && !isLoading && (
                      <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-destructive/5 border border-destructive/10 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <p>{error}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* ── CTA Banner (only after 3+ assistant messages) ── */}
              {messages.filter(m => m.role === 'assistant').length >= 3 && (
                <div className="px-5 py-2">
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500/5 to-emerald-500/5 border border-border/30">
                    <Crown className="h-4 w-4 text-amber-400 shrink-0" />
                    <p className="text-xs text-muted-foreground flex-1">
                      Konkrete Steuerersparnis berechnen?
                    </p>
                    <Button asChild size="sm" variant="ghost" className="h-7 text-xs gap-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 shrink-0">
                      <Link href="/steuerberater">
                        KI-Steuerberater
                        <ArrowUp className="h-3 w-3 rotate-45" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Rate limit reached message ── */}
              {limitReached && (
                <div className="px-5 py-2">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/8 border border-amber-500/15 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                    {isAnonymous ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-amber-200">Tageslimit erreicht.</span>
                        <Button asChild size="sm" variant="ghost" className="h-6 text-xs gap-1 text-amber-300 hover:text-amber-200 hover:bg-amber-500/10">
                          <Link href="/login">
                            <LogIn className="h-3 w-3" />
                            Anmelden
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-amber-200">Tageslimit erreicht. Versuche es morgen wieder.</span>
                    )}
                  </div>
                </div>
              )}

              {/* ── Input area ── */}
              <div className="px-5 pb-4 pt-3 border-t border-border/20">
                {hasMessages && (
                  <p className="text-[10px] text-muted-foreground/50 text-center mb-2">
                    KI-Tutor -- keine Rechtsberatung
                  </p>
                )}
                <div className="relative flex items-end gap-2 rounded-xl border border-border/40 bg-background/50 focus-within:border-emerald-500/40 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Frag etwas zum Steuerrecht..."
                    rows={1}
                    disabled={isLoading || limitReached}
                    className="flex-1 min-h-[44px] max-h-[120px] resize-none bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none disabled:opacity-50"
                  />
                  <Button
                    size="icon"
                    onClick={() => sendMessage(inputText)}
                    disabled={!inputText.trim() || isLoading || limitReached}
                    className="h-8 w-8 rounded-lg shrink-0 mr-1.5 mb-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-500 disabled:bg-muted disabled:opacity-40 transition-colors"
                  >
                    <ArrowUp className="h-4 w-4" />
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
