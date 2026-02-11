'use client'

import { useState } from 'react'
import {
  Crown,
  ChevronDown,
  Minus,
  Plus,
  Lock,
  Train,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { type ProOptions } from '@/lib/svs-calculator'
import { type TaxYear, YEAR_CONFIGS } from '@/lib/tax-constants'

interface ProOptionsAccordionProps {
  proOptions: ProOptions
  onProOptionsChange: (opts: ProOptions) => void
  year: TaxYear
  isPro: boolean
  onUpgradeRequired: (feature: string, plan: 'basic' | 'pro') => void
}

export function ProOptionsAccordion({
  proOptions,
  onProOptionsChange,
  year,
  isPro,
  onUpgradeRequired,
}: ProOptionsAccordionProps) {
  const [open, setOpen] = useState(false)
  const cfg = YEAR_CONFIGS[year]

  const update = (partial: Partial<ProOptions>) =>
    onProOptionsChange({ ...proOptions, ...partial })

  const fbpUnder18 = cfg.absetzbetraege.familienbonusUnder18
  const fbpOver18 = cfg.absetzbetraege.familienbonusOver18

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="glass rounded-2xl">
        {/* Trigger */}
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center gap-3 p-5 sm:p-6 text-left"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <Crown className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 font-heading">
                Steuer-Optimierung
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 truncate">
                Absetzbeträge, Pendler, Investitionen
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>
        </CollapsibleTrigger>

        {/* Content */}
        <CollapsibleContent>
          <div className="relative">
            {/* Lock overlay for non-Pro users */}
            {!isPro && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 rounded-b-2xl">
                <Lock className="h-6 w-6 text-slate-400" />
                <p className="text-sm font-medium text-slate-600">
                  Pro Feature
                </p>
                <Button
                  size="sm"
                  onClick={() => onUpgradeRequired('Steuer-Optimierung', 'pro')}
                >
                  Jetzt freischalten
                </Button>
              </div>
            )}

            <div className="space-y-6 px-5 pb-6 sm:px-6 sm:pb-8">
              {/* Divider from trigger */}
              <div className="border-t border-slate-200/60" />

              {/* ── Kinder ──────────────────────────── */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-slate-700">
                  Kinder
                </Label>

                {/* Kinder unter 18 */}
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-600">Kinder unter 18</p>
                    <p className="text-xs text-slate-400">
                      FBP {fbpUnder18.toLocaleString('de-AT')} EUR / Kind
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      disabled={proOptions.kinderUnter18 <= 0}
                      onClick={() =>
                        update({
                          kinderUnter18: Math.max(0, proOptions.kinderUnter18 - 1),
                        })
                      }
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-8 text-center font-mono text-sm font-semibold tabular-nums">
                      {proOptions.kinderUnter18}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      onClick={() =>
                        update({
                          kinderUnter18: Math.min(10, proOptions.kinderUnter18 + 1),
                        })
                      }
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Kinder ueber 18 */}
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-600">Kinder über 18</p>
                    <p className="text-xs text-slate-400">
                      FBP {fbpOver18.toLocaleString('de-AT')} EUR / Kind
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      disabled={proOptions.kinderUeber18 <= 0}
                      onClick={() =>
                        update({
                          kinderUeber18: Math.max(0, proOptions.kinderUeber18 - 1),
                        })
                      }
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-8 text-center font-mono text-sm font-semibold tabular-nums">
                      {proOptions.kinderUeber18}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      onClick={() =>
                        update({
                          kinderUeber18: Math.min(10, proOptions.kinderUeber18 + 1),
                        })
                      }
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200/60" />

              {/* ── Alleinverdiener / Alleinerzieher ─ */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Label className="text-sm font-medium text-slate-700">
                    Alleinverdiener / Alleinerzieher
                  </Label>
                  <p className="text-xs text-slate-400 mt-0.5">
                    AVAB/AEAB bei mind. 1 Kind
                  </p>
                </div>
                <Switch
                  checked={proOptions.alleinverdiener}
                  onCheckedChange={(checked) =>
                    update({ alleinverdiener: checked })
                  }
                />
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200/60" />

              {/* ── Pendlerkilometer ─────────────────── */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Pendlerkilometer
                  </Label>
                  <span className="text-sm font-mono font-semibold text-slate-900 tabular-nums">
                    {proOptions.pendlerKm} km
                  </span>
                </div>

                <Slider
                  value={[proOptions.pendlerKm]}
                  onValueChange={([v]) => update({ pendlerKm: v })}
                  min={0}
                  max={80}
                  step={1}
                />

                <div className="flex justify-between text-[11px] font-medium text-slate-400">
                  <span>0 km</span>
                  <span>20 km</span>
                  <span>40 km</span>
                  <span>60 km</span>
                  <span>80 km</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <Train className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-sm text-slate-600">
                      Öffentliche Verkehrsmittel zumutbar
                    </span>
                  </div>
                  <Switch
                    checked={proOptions.pendlerOeffentlich}
                    onCheckedChange={(checked) =>
                      update({ pendlerOeffentlich: checked })
                    }
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200/60" />

              {/* ── Investitionen (IFB) ──────────────── */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700">
                  Investitionen (IFB)
                </Label>

                <div className="relative max-w-[220px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                    EUR
                  </span>
                  <Input
                    value={
                      proOptions.investitionen > 0
                        ? proOptions.investitionen.toLocaleString('de-AT')
                        : ''
                    }
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '')
                      update({
                        investitionen: Math.min(Number(val) || 0, 1000000),
                      })
                    }}
                    placeholder="0"
                    className="pl-14 text-right font-mono text-base font-semibold tracking-tight h-10 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Tatsächliche Investitionen für den investitionsbedingten
                  Gewinnfreibetrag
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
