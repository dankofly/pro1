'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import type { RechnerAction, PauschalierungArt } from '@/lib/rechner-types'
import { isPauschalierungVerfuegbar } from '@/lib/rechner-engine'
import { ChevronDown, Calculator } from 'lucide-react'
import { ProSectionWrapper } from './pro-section-wrapper'

interface PauschalierungSectionProps {
  pauschalierungArt: PauschalierungArt
  jahresumsatz: number
  isPro: boolean
  dispatch: React.Dispatch<RechnerAction>
}

const OPTIONEN: { value: PauschalierungArt; label: string; desc: string }[] = [
  { value: 'keine', label: 'Keine Pauschalierung', desc: 'Tatsächliche Aufwände verwenden' },
  { value: 'basis_12', label: 'Basispauschalierung 12%', desc: 'Betriebsausgaben = 12% des Umsatzes (max. 220k)' },
  { value: 'basis_6', label: 'Basispauschalierung 6%', desc: 'Für bestimmte Berufe (Berater, IT, etc.)' },
  { value: 'ku_produzent', label: 'KU-Pauschalierung 45%', desc: 'Kleinunternehmer, produzierend (max. 35k)' },
  { value: 'ku_dienstleister', label: 'KU-Pauschalierung 20%', desc: 'Kleinunternehmer, Dienstleistung (max. 35k)' },
]

export function PauschalierungSection({
  pauschalierungArt, jahresumsatz, isPro, dispatch,
}: PauschalierungSectionProps) {
  const [open, setOpen] = useState(false)

  const setArt = (v: PauschalierungArt) =>
    dispatch({ type: 'SET_FIELD', field: 'pauschalierungArt', value: v })

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="glass rounded-2xl">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 p-5 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100">
              <Calculator className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold tracking-tight">Pauschalierung</h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {pauschalierungArt === 'keine' ? 'Nicht aktiv' : OPTIONEN.find(o => o.value === pauschalierungArt)?.label}
              </p>
            </div>
            <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ProSectionWrapper isPro={isPro} featureName="Pauschalierung">
            <div className="space-y-4 px-5 pb-5">
              <div className="border-t border-slate-200/60" />
              <RadioGroup
                value={pauschalierungArt}
                onValueChange={(v) => setArt(v as PauschalierungArt)}
                className="space-y-2"
              >
                {OPTIONEN.map((opt) => {
                  const verfuegbar = isPauschalierungVerfuegbar(opt.value, jahresumsatz)
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors
                        ${!verfuegbar ? 'opacity-40 pointer-events-none' : 'hover:bg-muted/50'}
                        ${pauschalierungArt === opt.value ? 'border-blue-500 bg-blue-50/50' : 'border-border'}
                      `}
                    >
                      <RadioGroupItem value={opt.value} disabled={!verfuegbar} className="mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {verfuegbar ? opt.desc : `Nicht verfügbar (Umsatz über Grenze)`}
                        </p>
                      </div>
                    </label>
                  )
                })}
              </RadioGroup>
            </div>
          </ProSectionWrapper>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
