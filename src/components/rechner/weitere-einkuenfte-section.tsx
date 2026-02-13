'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import type { RechnerAction, WeitereEinkuenfteInput } from '@/lib/rechner-types'
import { ChevronDown, Briefcase } from 'lucide-react'
import { ProSectionWrapper } from './pro-section-wrapper'

interface WeitereEinkuenfteSectionProps {
  weitereEinkuenfte: WeitereEinkuenfteInput
  isPro: boolean
  dispatch: React.Dispatch<RechnerAction>
}

function WEInput({
  id, value, onChange, label, hint, suffix, max = 200000,
}: {
  id: string; value: number; onChange: (v: number) => void
  label: string; hint?: string; suffix?: string; max?: number
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, max))
  }
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
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
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function WeitereEinkuenfteSection({
  weitereEinkuenfte, isPro, dispatch,
}: WeitereEinkuenfteSectionProps) {
  const [open, setOpen] = useState(false)

  const setWE = (field: keyof WeitereEinkuenfteInput, value: number) =>
    dispatch({ type: 'SET_WEITERE_EINKUENFTE', field, value })

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="card-surface">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/60">
              <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold tracking-tight">Weitere Einkünfte</h2>
              <p className="text-xs text-muted-foreground truncate">
                Gehalt, Vermietung, etc.
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ProSectionWrapper isPro={isPro} featureName="Weitere Einkünfte">
            <div className="space-y-4 px-4 pb-4">
              <div className="divider" />

              <WEInput
                id="brutto-entgelt"
                value={weitereEinkuenfte.bruttoEntgeltMonatlich}
                onChange={(v) => setWE('bruttoEntgeltMonatlich', v)}
                label="Brutto-Entgelt monatlich (Anstellung)"
                suffix="/ Monat"
                hint="Erhöht die Einkommensteuer-Bemessungsgrundlage"
                max={20000}
              />

              <WEInput
                id="vermietung"
                value={weitereEinkuenfte.vermietungsEinkuenfte}
                onChange={(v) => setWE('vermietungsEinkuenfte', v)}
                label="Vermietungseinkünfte jährlich"
                suffix="/ Jahr"
                hint="Netto-Einkünfte aus Vermietung und Verpachtung"
                max={500000}
              />
            </div>
          </ProSectionWrapper>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
