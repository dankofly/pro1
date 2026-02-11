'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import type { RechnerAction, GewinnmaximiererInput } from '@/lib/rechner-types'
import { ChevronDown, Zap } from 'lucide-react'
import { ProSectionWrapper } from './pro-section-wrapper'

interface GewinnmaximiererSectionProps {
  gewinnmaximierer: GewinnmaximiererInput
  isPro: boolean
  dispatch: React.Dispatch<RechnerAction>
}

function GMInput({
  id, value, onChange, label, hint,
}: {
  id: string; value: number; onChange: (v: number) => void
  label: string; hint?: string
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, 1000000))
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

export function GewinnmaximiererSection({
  gewinnmaximierer, isPro, dispatch,
}: GewinnmaximiererSectionProps) {
  const [open, setOpen] = useState(false)

  const setGM = (field: keyof GewinnmaximiererInput, value: number) =>
    dispatch({ type: 'SET_GEWINNMAXIMIERER', field, value })

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="glass rounded-2xl">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 p-5 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <Zap className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold tracking-tight">Gewinnmaximierer</h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Was bringt ein Zusatzauftrag?
              </p>
            </div>
            <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ProSectionWrapper isPro={isPro} featureName="Gewinnmaximierer">
            <div className="space-y-4 px-5 pb-5">
              <div className="border-t border-slate-200/60" />

              <GMInput
                id="zusatz-einnahmen"
                value={gewinnmaximierer.zusatzEinnahmen}
                onChange={(v) => setGM('zusatzEinnahmen', v)}
                label="Zusätzliche Einnahmen"
                hint="Z.B. ein neuer Auftrag oder Projekt"
              />

              <GMInput
                id="zusatz-aufwaende"
                value={gewinnmaximierer.zusatzAufwaende}
                onChange={(v) => setGM('zusatzAufwaende', v)}
                label="Zusätzliche Aufwände"
                hint="Kosten die durch den Zusatzauftrag entstehen"
              />
            </div>
          </ProSectionWrapper>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
