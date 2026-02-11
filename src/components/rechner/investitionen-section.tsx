'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import { useState } from 'react'
import { formatEuro } from '@/lib/format'
import type { RechnerAction, InvestitionenInput, AfaMethode, AfaResult } from '@/lib/rechner-types'
import { ChevronDown, Landmark } from 'lucide-react'
import { ProSectionWrapper } from './pro-section-wrapper'

interface InvestitionenSectionProps {
  investitionen: InvestitionenInput
  afa: AfaResult
  isPro: boolean
  dispatch: React.Dispatch<RechnerAction>
}

function InvestRow({
  id, label, value, methode, afaJahr, onValueChange, onMethodeChange,
}: {
  id: string; label: string; value: number; methode: AfaMethode
  afaJahr: number; onValueChange: (v: number) => void; onMethodeChange: (m: AfaMethode) => void
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onValueChange(Math.min(Number(raw) || 0, 5000000))
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
          <Input
            id={id}
            value={value > 0 ? value.toLocaleString('de-AT') : ''}
            onChange={handleInput}
            placeholder="0"
            className="pl-10 text-right font-mono text-sm h-9 rounded-lg"
          />
        </div>
        <Select value={methode} onValueChange={(v) => onMethodeChange(v as AfaMethode)}>
          <SelectTrigger className="w-28 h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="degressiv">Degressiv</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {value > 0 && (
        <p className="text-xs text-muted-foreground">
          AfA: {formatEuro(afaJahr)} / Jahr
        </p>
      )}
    </div>
  )
}

export function InvestitionenSection({ investitionen, afa, isPro, dispatch }: InvestitionenSectionProps) {
  const [open, setOpen] = useState(false)

  const setInvest = (field: keyof InvestitionenInput, value: unknown) =>
    dispatch({ type: 'SET_INVESTITION', field, value })

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="glass rounded-2xl">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 p-5 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100">
              <Landmark className="h-4 w-4 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold tracking-tight">Investitionen & AfA</h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {afa.gesamt > 0 ? `AfA: ${formatEuro(afa.gesamt)}/Jahr` : 'Abschreibungen für Anlagegüter'}
              </p>
            </div>
            <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ProSectionWrapper isPro={isPro} featureName="Investitionen & AfA">
            <div className="space-y-4 px-5 pb-5">
              <div className="border-t border-slate-200/60" />
              <InvestRow
                id="invest-einrichtung"
                label="Einrichtung & Büroausstattung (8 Jahre)"
                value={investitionen.einrichtung}
                methode={investitionen.einrichtungMethode}
                afaJahr={afa.einrichtungJahr}
                onValueChange={(v) => setInvest('einrichtung', v)}
                onMethodeChange={(m) => setInvest('einrichtungMethode', m)}
              />
              <InvestRow
                id="invest-edv"
                label="EDV / Computer / Software (4 Jahre)"
                value={investitionen.edv}
                methode={investitionen.edvMethode}
                afaJahr={afa.edvJahr}
                onValueChange={(v) => setInvest('edv', v)}
                onMethodeChange={(m) => setInvest('edvMethode', m)}
              />
              <InvestRow
                id="invest-maschinen"
                label="Maschinen / Fahrzeuge (8 Jahre)"
                value={investitionen.maschinen}
                methode={investitionen.maschinenMethode}
                afaJahr={afa.maschinenJahr}
                onValueChange={(v) => setInvest('maschinen', v)}
                onMethodeChange={(m) => setInvest('maschinenMethode', m)}
              />
              {afa.gesamt > 0 && (
                <div className="bg-violet-50 rounded-lg p-3 text-sm">
                  <div className="flex justify-between font-medium">
                    <span>Gesamt-AfA / Jahr</span>
                    <span className="font-mono text-violet-700">{formatEuro(afa.gesamt)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Wird als Betriebsausgabe abgezogen
                  </p>
                </div>
              )}
            </div>
          </ProSectionWrapper>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
