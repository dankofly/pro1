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
import { calcMaxIFB, type TaxYear } from '@/lib/tax-constants'
import type { RechnerAction, InvestitionenInput, AfaMethode, AfaResult } from '@/lib/rechner-types'
import { ChevronDown, Crown, Landmark, Banknote, Info } from 'lucide-react'
import { FieldInfo } from '@/components/ui/field-info'
import { FIELD_DEFS } from '@/lib/field-definitions'
import { ProSectionWrapper } from './pro-section-wrapper'

interface InvestitionenSectionProps {
  investitionen: InvestitionenInput
  afa: AfaResult
  gewinn: number
  year: string
  isPro: boolean
  dispatch: React.Dispatch<RechnerAction>
}

function InvestRow({
  id, label, value, methode, afaJahr, onValueChange, onMethodeChange, info,
}: {
  id: string; label: string; value: number; methode: AfaMethode
  afaJahr: number; onValueChange: (v: number) => void; onMethodeChange: (m: AfaMethode) => void; info?: string
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onValueChange(Math.min(Number(raw) || 0, 5000000))
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm text-muted-foreground">{label}{info && <FieldInfo text={info} />}</Label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
          <Input
            id={id}
            inputMode="numeric"
            value={value > 0 ? value.toLocaleString('de-AT') : ''}
            onChange={handleInput}
            placeholder="0"
            className="pl-10 text-right font-mono text-base sm:text-sm h-12 sm:h-9 rounded-lg"
          />
        </div>
        <Select value={methode} onValueChange={(v) => onMethodeChange(v as AfaMethode)}>
          <SelectTrigger className="w-28 h-12 sm:h-9 text-sm sm:text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="degressiv">Degressiv</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {value > 0 && (
        <p className="text-sm text-muted-foreground">
          AfA: {formatEuro(afaJahr)} / Jahr
        </p>
      )}
    </div>
  )
}

export function InvestitionenSection({ investitionen, afa, gewinn, year, isPro, dispatch }: InvestitionenSectionProps) {
  const [open, setOpen] = useState(false)

  const setInvest = (field: keyof InvestitionenInput, value: unknown) =>
    dispatch({ type: 'SET_INVESTITION', field, value })

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="card-surface">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
              <Landmark className="h-3.5 w-3.5 text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold tracking-tight flex items-center gap-1.5">Investitionen & AfA <Crown className="h-3 w-3 text-amber-400" /></h2>
              <p className="text-xs text-muted-foreground truncate">
                {afa.gesamt > 0 ? `AfA: ${formatEuro(afa.gesamt)}/Jahr` : 'Abschreibungen für Anlagegüter'}
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ProSectionWrapper isPro={isPro} featureName="Investitionen & AfA">
            <div className="space-y-4 px-5 pb-5">
              <div className="divider" />
              <InvestRow
                id="invest-einrichtung"
                label="Einrichtung & Büroausstattung (8 Jahre)"
                value={investitionen.einrichtung}
                methode={investitionen.einrichtungMethode}
                afaJahr={afa.einrichtungJahr}
                onValueChange={(v) => setInvest('einrichtung', v)}
                onMethodeChange={(m) => setInvest('einrichtungMethode', m)}
                info={FIELD_DEFS.einrichtung}
              />
              <InvestRow
                id="invest-edv"
                label="EDV / Computer / Software (4 Jahre)"
                value={investitionen.edv}
                methode={investitionen.edvMethode}
                afaJahr={afa.edvJahr}
                onValueChange={(v) => setInvest('edv', v)}
                onMethodeChange={(m) => setInvest('edvMethode', m)}
                info={FIELD_DEFS.edv}
              />
              <InvestRow
                id="invest-maschinen"
                label="Maschinen / Fahrzeuge (8 Jahre)"
                value={investitionen.maschinen}
                methode={investitionen.maschinenMethode}
                afaJahr={afa.maschinenJahr}
                onValueChange={(v) => setInvest('maschinen', v)}
                onMethodeChange={(m) => setInvest('maschinenMethode', m)}
                info={FIELD_DEFS.maschinen}
              />
              {/* Bundesschatz / Wertpapiere für investitionsbedingten GFB */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 pt-2">
                  <Banknote className="h-4 w-4 text-emerald-600" />
                  <Label htmlFor="invest-bundesschatz" className="text-sm font-medium">
                    Bundesschatz / Wertpapiere für iGFB
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Investitionsbedingter Gewinnfreibetrag: Kapital 4 Jahre in Bundesschatz oder begünstigte Wertpapiere anlegen — reduziert dein steuerpflichtiges Einkommen. Keine AfA, kein Wertverlust.
                </p>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
                  <Input
                    id="invest-bundesschatz"
                    inputMode="numeric"
                    value={investitionen.bundesschatz > 0 ? investitionen.bundesschatz.toLocaleString('de-AT') : ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '')
                      setInvest('bundesschatz', Math.min(Number(raw) || 0, 1000000))
                    }}
                    placeholder="0"
                    className="pl-10 text-right font-mono text-base sm:text-sm h-12 sm:h-9 rounded-lg"
                  />
                </div>
                {(() => {
                  const maxIgfb = calcMaxIFB(gewinn, year as TaxYear)
                  if (maxIgfb > 0) {
                    return (
                      <div className="flex items-start gap-2 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg p-2.5 border border-emerald-200/30 dark:border-emerald-800/30">
                        <Info className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                          Bei deinem Gewinn von {formatEuro(gewinn)} kannst du max. <span className="font-medium text-emerald-700 dark:text-emerald-400">{formatEuro(maxIgfb)}</span> als invest. GFB geltend machen. Optimal: diesen Betrag in Bundesschatz anlegen.
                        </p>
                      </div>
                    )
                  }
                  return null
                })()}
              </div>

              {afa.gesamt > 0 && (
                <div className="bg-muted/40 rounded-lg p-3 border border-border/40 text-sm">
                  <div className="flex justify-between font-medium">
                    <span>Gesamt-AfA / Jahr</span>
                    <span className="font-mono text-foreground">{formatEuro(afa.gesamt)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Wird als Betriebsausgabe abgezogen (ohne Bundesschatz — dieser hat keine AfA)
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
