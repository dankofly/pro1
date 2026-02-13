'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProSectionWrapper } from './pro-section-wrapper'
import { supabase } from '@/lib/supabase'
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { RechnerInput, RechnerResult } from '@/lib/rechner-types'

interface AiTaxAdvisorProps {
  input: RechnerInput
  result: RechnerResult
  isPro: boolean
  onUpgradeRequired: (feature: string, plan: 'basic' | 'pro') => void
}

type AdvisorState = 'idle' | 'loading' | 'done' | 'error'

export function AiTaxAdvisor({ input, result, isPro, onUpgradeRequired }: AiTaxAdvisorProps) {
  const [state, setState] = useState<AdvisorState>('idle')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [remaining, setRemaining] = useState<number | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // Auto-scroll while streaming
  useEffect(() => {
    if (state === 'loading' && textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight
    }
  }, [text, state])

  const startAnalysis = useCallback(async () => {
    // Get auth token
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) {
      toast.error('Bitte melde dich an, um die KI-Analyse zu nutzen.')
      return
    }

    setState('loading')
    setText('')
    setError('')

    const svs = result.svs

    const body = {
      year: input.year,
      jahresumsatz: input.jahresumsatz,
      aufwaendeEffektiv: result.aufwaendeEffektiv,
      gewinn: result.gewinn,
      pauschalierungArt: input.pauschalierungArt,

      endgueltigeSVS: svs.endgueltigeSVS,
      pvBeitrag: svs.pvBeitrag,
      kvBeitrag: svs.kvBeitrag,
      beitragsgrundlage: svs.beitragsgrundlage,
      belowMinimum: svs.belowMinimum,
      cappedAtMax: svs.cappedAtMax,
      isJungunternehmer: svs.isJungunternehmer,

      steuerpflichtig: svs.steuerpflichtig,
      einkommensteuer: svs.einkommensteuer,
      grenzsteuersatz: svs.grenzsteuersatz,
      durchschnittssteuersatz: svs.durchschnittssteuersatz,
      echtesNetto: svs.echtesNetto,

      grundfreibetrag: svs.grundfreibetrag,
      gewinnfreibetragInvestition: svs.gewinnfreibetragInvestition,

      gruendungsJahr: input.stammdaten.gruendungsJahr,
      versicherungsart: input.stammdaten.versicherungsart,

      svVorauszahlung: input.vorauszahlungen.svVorauszahlung,
      estVorauszahlung: input.vorauszahlungen.estVorauszahlung,
      investitionenGesamt: result.afa.gesamt,

      ifbInvestition: result.steuerTipps.ifbInvestition,
      ifbErsparnis: result.steuerTipps.ifbErsparnis,
      svsVorauszahlung: result.steuerTipps.svsVorauszahlung,
      svsVorauszahlungErsparnis: result.steuerTipps.svsVorauszahlungErsparnis,
    }

    try {
      abortRef.current = new AbortController()

      const res = await fetch('/api/ai/tax-advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(body),
        signal: abortRef.current.signal,
      })

      // Read rate limit header
      const remainingHeader = res.headers.get('X-RateLimit-Remaining')
      if (remainingHeader !== null) {
        setRemaining(parseInt(remainingHeader, 10))
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }))
        throw new Error(errorData.error || `HTTP ${res.status}`)
      }

      // Stream the response
      const reader = res.body?.getReader()
      if (!reader) throw new Error('Keine Stream-Antwort erhalten')

      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setText(accumulated)
      }

      if (!accumulated.trim()) {
        throw new Error('Leere Antwort vom KI-Modell erhalten. Bitte versuche es erneut.')
      }

      setState('done')
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
      setError(message)
      setState('error')
    }
  }, [input, result])

  const content = (
    <div className="card-surface rounded-xl overflow-hidden">
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10">
            <Sparkles className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">KI-Steuerberater</h3>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-medium">
                Pro
              </Badge>
            </div>
          </div>
          {remaining !== null && state !== 'idle' && (
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {remaining} / 10 heute
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-4 ml-11">
          Persönliche Steueranalyse deiner Zahlen durch KI
        </p>

        {/* States */}
        {state === 'idle' && (
          <Button onClick={startAnalysis} className="w-full gap-2" size="sm">
            <Sparkles className="h-3.5 w-3.5" />
            Analyse starten
          </Button>
        )}

        {state === 'loading' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Analysiere deine Steuerdaten...
            </div>
            {text && (
              <div
                ref={textRef}
                className="prose-sm max-h-[500px] overflow-y-auto scrollbar-thin"
              >
                <MarkdownContent text={text} />
              </div>
            )}
          </div>
        )}

        {state === 'done' && (
          <div className="space-y-4">
            <div
              ref={textRef}
              className="prose-sm max-h-[600px] overflow-y-auto scrollbar-thin"
            >
              <MarkdownContent text={text} />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <span className="text-[11px] text-muted-foreground">
                Basierend auf deinen aktuellen Eingaben
              </span>
              <Button
                onClick={() => { setState('idle'); setText(''); }}
                variant="outline"
                size="sm"
                className="gap-1.5 h-7 text-xs"
              >
                <RefreshCw className="h-3 w-3" />
                Neue Analyse
              </Button>
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
            <Button
              onClick={() => { setState('idle'); startAnalysis(); }}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Erneut versuchen
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <ProSectionWrapper
      isPro={isPro}
      featureName="KI-Steuerberater"
      onUpgradeRequired={onUpgradeRequired}
    >
      {content}
    </ProSectionWrapper>
  )
}

// ── Lightweight Markdown Renderer ──────────────────────────

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
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-foreground mt-4 mb-1.5">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-foreground mt-4 mb-1.5">$2</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li class="ml-4 pl-1 list-disc text-foreground/80">$1</li>')
    // Warning/Disclaimer line
    .replace(/^(⚠️.+)$/gm, '<p class="text-xs text-muted-foreground mt-4 pt-3 border-t border-border/40 italic">$1</p>')
    // Euro amounts highlighting
    .replace(/€\s?([\d.,]+)/g, '<span class="font-mono font-medium text-foreground">€ $1</span>')
    // Paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p class="text-foreground/80">')
    // Single newlines (within paragraphs)
    .replace(/\n/g, '<br/>')
}
