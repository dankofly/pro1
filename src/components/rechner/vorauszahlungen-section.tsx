'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import { formatEuro } from '@/lib/format'
import type { RechnerAction, VorauszahlungenInput, VorauszahlungenResult } from '@/lib/rechner-types'
import { ChevronDown, Wallet } from 'lucide-react'

interface VorauszahlungenSectionProps {
  vorauszahlungen: VorauszahlungenInput
  result: VorauszahlungenResult
  dispatch: React.Dispatch<RechnerAction>
}

function VzInput({
  id, value, onChange, label, hint, max = 200000,
}: {
  id: string; value: number; onChange: (v: number) => void
  label: string; hint?: string; max?: number
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, max))
  }
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm text-muted-foreground">{label}</Label>
      <div className="relative w-full max-w-[200px]">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
        <Input
          id={id}
          value={value > 0 ? value.toLocaleString('de-AT') : ''}
          onChange={handleInput}
          placeholder="0"
          className="pl-10 text-right font-mono text-sm h-9 rounded-lg"
        />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function VorauszahlungenSection({
  vorauszahlungen, result, dispatch,
}: VorauszahlungenSectionProps) {
  const [open, setOpen] = useState(false)

  const setVz = (field: keyof VorauszahlungenInput, value: number) =>
    dispatch({ type: 'SET_VORAUSZAHLUNG', field, value })

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="glass rounded-2xl">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 p-5 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-100">
              <Wallet className="h-4 w-4 text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold tracking-tight">Vorauszahlungen</h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                SV- und ESt-Vorschreibungen
              </p>
            </div>
            <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 px-5 pb-5">
            <div className="border-t border-slate-200/60" />

            <VzInput
              id="sv-vz"
              value={vorauszahlungen.svVorauszahlung}
              onChange={(v) => setVz('svVorauszahlung', v)}
              label="SV-Vorauszahlungen (jährlich)"
              hint="Aus deiner SVS-Vorschreibung"
            />

            {result.svDifferenz !== 0 && vorauszahlungen.svVorauszahlung > 0 && (
              <div className={`rounded-lg p-2.5 text-xs ${
                result.svDifferenz > 0
                  ? 'bg-amber-50 text-amber-800'
                  : 'bg-emerald-50 text-emerald-800'
              }`}>
                {result.svDifferenz > 0
                  ? `Voraussichtliche Nachzahlung: ${formatEuro(result.svDifferenz)}`
                  : `Voraussichtliche Gutschrift: ${formatEuro(Math.abs(result.svDifferenz))}`
                }
              </div>
            )}

            <VzInput
              id="sv-nachzahlung"
              value={vorauszahlungen.svNachzahlungVorjahr}
              onChange={(v) => setVz('svNachzahlungVorjahr', v)}
              label="SV-Nachzahlung Vorjahr"
              hint="Falls bekannt"
            />

            <VzInput
              id="est-vz"
              value={vorauszahlungen.estVorauszahlung}
              onChange={(v) => setVz('estVorauszahlung', v)}
              label="ESt-Vorauszahlungen (jährlich)"
              hint="Aus deinem Einkommensteuerbescheid"
            />

            {result.estDifferenz !== 0 && vorauszahlungen.estVorauszahlung > 0 && (
              <div className={`rounded-lg p-2.5 text-xs ${
                result.estDifferenz > 0
                  ? 'bg-amber-50 text-amber-800'
                  : 'bg-emerald-50 text-emerald-800'
              }`}>
                {result.estDifferenz > 0
                  ? `Voraussichtliche ESt-Nachzahlung: ${formatEuro(result.estDifferenz)}`
                  : `Voraussichtliche ESt-Gutschrift: ${formatEuro(Math.abs(result.estDifferenz))}`
                }
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
