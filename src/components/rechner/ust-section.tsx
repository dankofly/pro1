'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import type { RechnerAction, UstInput } from '@/lib/rechner-types'
import { KUR_CONFIG } from '@/lib/tax-constants'
import { ChevronDown, Receipt, AlertTriangle } from 'lucide-react'

interface UstSectionProps {
  ust: UstInput
  jahresumsatz: number
  dispatch: React.Dispatch<RechnerAction>
}

export function UstSection({ ust, jahresumsatz, dispatch }: UstSectionProps) {
  const [open, setOpen] = useState(false)

  const setUst = (field: keyof UstInput, value: unknown) =>
    dispatch({ type: 'SET_UST', field, value })

  const handleVorsteuer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setUst('vorsteuerJaehrlich', Math.min(Number(raw) || 0, 999999))
  }

  // KUR eligibility
  const kurBerechtigt = jahresumsatz <= KUR_CONFIG.grenze
  const kurToleranz = jahresumsatz > KUR_CONFIG.grenze && jahresumsatz <= KUR_CONFIG.toleranz
  const kurNichtMoeglich = jahresumsatz > KUR_CONFIG.toleranz

  // Dynamic subtitle
  const subtitle = ust.ustPflichtig
    ? `Regelbesteuerung (${Math.round(ust.ustSatz * 100)}%)`
    : 'Kleinunternehmerregelung'

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="card-surface">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
              <Receipt className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold tracking-tight">Umsatzsteuer &amp; KUR</h2>
              <p className="text-xs text-muted-foreground truncate">
                {subtitle}
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 px-4 pb-4">
            <div className="divider" />

            {/* KUR Status Badge */}
            <div>
              {kurBerechtigt && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  KUR berechtigt
                </span>
              )}
              {kurToleranz && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Toleranzzone (einmalig)
                </span>
              )}
              {kurNichtMoeglich && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-700 dark:text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  KUR nicht möglich
                </span>
              )}
            </div>

            {/* Radio-like toggle: KUR vs Regelbesteuerung */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Besteuerungsart</Label>
              <div className="grid grid-cols-1 gap-1.5">
                <button
                  type="button"
                  disabled={kurNichtMoeglich}
                  onClick={() => setUst('ustPflichtig', false)}
                  className={`flex items-center gap-2.5 rounded-lg border px-3 py-3 sm:py-2 text-left text-sm transition-colors ${
                    !ust.ustPflichtig
                      ? 'border-blue-500/40 bg-blue-500/5 text-foreground dark:border-blue-400/30 dark:bg-blue-500/10'
                      : 'border-border/50 text-muted-foreground hover:bg-muted/40'
                  } ${kurNichtMoeglich ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    !ust.ustPflichtig ? 'border-blue-500 dark:border-blue-400' : 'border-muted-foreground/30'
                  }`}>
                    {!ust.ustPflichtig && <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />}
                  </span>
                  Kleinunternehmerregelung (KUR)
                </button>
                <button
                  type="button"
                  onClick={() => setUst('ustPflichtig', true)}
                  className={`flex items-center gap-2.5 rounded-lg border px-3 py-3 sm:py-2 text-left text-sm transition-colors cursor-pointer ${
                    ust.ustPflichtig
                      ? 'border-blue-500/40 bg-blue-500/5 text-foreground dark:border-blue-400/30 dark:bg-blue-500/10'
                      : 'border-border/50 text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    ust.ustPflichtig ? 'border-blue-500 dark:border-blue-400' : 'border-muted-foreground/30'
                  }`}>
                    {ust.ustPflichtig && <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />}
                  </span>
                  Regelbesteuerung (USt-pflichtig)
                </button>
              </div>
            </div>

            {/* USt-Satz select (only if ustPflichtig) */}
            {ust.ustPflichtig && (
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">USt-Satz</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  {([
                    { rate: 0.20, label: '20%' },
                    { rate: 0.10, label: '10%' },
                    { rate: 0.13, label: '13%' },
                  ] as const).map(({ rate, label }) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setUst('ustSatz', rate)}
                      className={`rounded-lg border px-3 py-2.5 sm:py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                        ust.ustSatz === rate
                          ? 'border-blue-500/40 bg-blue-500/5 text-blue-700 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-400'
                          : 'border-border/50 text-muted-foreground hover:bg-muted/40'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Normalsteuersatz 20%, ermäßigt 10%/13%
                </p>
              </div>
            )}

            {/* Vorsteuer Input (always shown) */}
            <div className="space-y-2">
              <Label htmlFor="vorsteuer" className="text-sm text-muted-foreground">
                Vorsteuer auf Einkäufe (jährlich)
              </Label>
              <div className="relative w-full sm:max-w-[200px]">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
                <Input
                  id="vorsteuer"
                  inputMode="numeric"
                  value={ust.vorsteuerJaehrlich > 0 ? ust.vorsteuerJaehrlich.toLocaleString('de-AT') : ''}
                  onChange={handleVorsteuer}
                  placeholder="0"
                  className="pl-10 text-right font-mono text-base sm:text-sm h-12 sm:h-9 rounded-lg"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Geschätzte USt auf deine Betriebsausgaben
              </p>
            </div>

            {/* B2B-Anteil Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">B2B-Anteil deiner Kunden</Label>
                <span className="text-xs font-medium text-foreground">{ust.b2bAnteil}% B2B</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={ust.b2bAnteil}
                onChange={(e) => setUst('b2bAnteil', Number(e.target.value))}
                className="w-full accent-blue-500 h-2 cursor-pointer touch-action-manipulation"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Nur B2C</span>
                <span>Nur B2B</span>
              </div>
            </div>

            {/* 5-Jahres-Bindungs-Warnung (only if ustPflichtig) */}
            {ust.ustPflichtig && (
              <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-800/20 rounded-lg p-2.5">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    Achtung: Wechsel zur Regelbesteuerung bindet dich für 5 Jahre.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
