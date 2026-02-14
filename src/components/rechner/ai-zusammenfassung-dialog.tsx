'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { RechnerInput, RechnerResult } from '@/lib/rechner-types'

interface AiZusammenfassungDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  input: RechnerInput
  result: RechnerResult
}

type AiState = 'idle' | 'loading' | 'done' | 'error'

export function AiZusammenfassungDialog({ open, onOpenChange, input, result }: AiZusammenfassungDialogProps) {
  const [state, setState] = useState<AiState>('idle')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [remaining, setRemaining] = useState<number | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  // Auto-scroll while streaming
  useEffect(() => {
    if (state === 'loading' && textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight
    }
  }, [text, state])

  // Auto-start when dialog opens
  useEffect(() => {
    if (open && state === 'idle' && !hasStarted.current) {
      hasStarted.current = true
      startAnalysis()
    }
    if (!open) {
      hasStarted.current = false
      if (abortRef.current) {
        abortRef.current.abort()
        abortRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const startAnalysis = useCallback(async () => {
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
      mode: 'zusammenfassung',
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

      const remainingHeader = res.headers.get('X-RateLimit-Remaining')
      if (remainingHeader !== null) {
        setRemaining(parseInt(remainingHeader, 10))
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }))
        throw new Error(errorData.error || `HTTP ${res.status}`)
      }

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
        throw new Error('Leere Antwort vom KI-Modell erhalten.')
      }

      setState('done')
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
      setError(message)
      setState('error')
    }
  }, [input, result])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              AI Zusammenfassung
            </DialogTitle>
            {remaining !== null && state !== 'idle' && (
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {remaining} / 10 heute
              </span>
            )}
          </div>
        </DialogHeader>

        <div className="pt-2">
          {state === 'loading' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                Erstelle Zusammenfassung...
              </div>
              {text && (
                <div ref={textRef} className="max-h-[500px] overflow-y-auto scrollbar-thin">
                  <AiMarkdown text={text} />
                </div>
              )}
            </div>
          )}

          {state === 'done' && (
            <div className="space-y-4">
              <div ref={textRef} className="max-h-[600px] overflow-y-auto scrollbar-thin">
                <AiMarkdown text={text} />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <span className="text-[11px] text-muted-foreground">
                  Basierend auf deinen aktuellen Eingaben
                </span>
                <Button
                  onClick={() => { setState('idle'); setText(''); hasStarted.current = false; startAnalysis(); }}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 h-7 text-xs"
                >
                  <RefreshCw className="h-3 w-3" />
                  Neu generieren
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
                onClick={() => { setState('idle'); hasStarted.current = false; startAnalysis(); }}
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
      </DialogContent>
    </Dialog>
  )
}

function AiMarkdown({ text }: { text: string }) {
  const html = text
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-foreground mt-4 mb-1.5">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-foreground mt-4 mb-1.5">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 pl-1 list-disc text-foreground/80">$1</li>')
    .replace(/^(⚠️.+)$/gm, '<p class="text-xs text-muted-foreground mt-4 pt-3 border-t border-border/40 italic">$1</p>')
    .replace(/€\s?([\d.,]+)/g, '<span class="font-mono font-medium text-foreground">€ $1</span>')
    .replace(/\n\n/g, '</p><p class="text-foreground/80">')
    .replace(/\n/g, '<br/>')

  return (
    <div
      className="text-sm text-foreground/90 leading-relaxed space-y-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
