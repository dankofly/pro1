'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import type { RechnerAction, ProOptionsInput } from '@/lib/rechner-types'
import type { TaxYear } from '@/lib/tax-constants'
import { YEAR_CONFIGS } from '@/lib/tax-constants'
import { ChevronDown, Crown, Minus, Plus, Train } from 'lucide-react'
import { ProSectionWrapper } from './pro-section-wrapper'

interface ProOptionsSectionProps {
  proOptions: ProOptionsInput
  year: TaxYear
  isPro: boolean
  dispatch: React.Dispatch<RechnerAction>
}

export function ProOptionsSection({ proOptions, year, isPro, dispatch }: ProOptionsSectionProps) {
  const [open, setOpen] = useState(false)
  const cfg = YEAR_CONFIGS[year]

  const setOpt = (field: keyof ProOptionsInput, value: unknown) =>
    dispatch({ type: 'SET_PRO_OPTION', field, value })

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="glass rounded-2xl">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 p-5 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <Crown className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold tracking-tight">Steuer-Optimierung</h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Absetzbeträge, Pendler
              </p>
            </div>
            <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ProSectionWrapper isPro={isPro} featureName="Steuer-Optimierung">
            <div className="space-y-6 px-5 pb-5">
              <div className="border-t border-slate-200/60" />

              {/* Kinder */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Kinder</Label>

                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Kinder unter 18</p>
                    <p className="text-xs text-muted-foreground">
                      FBP {cfg.absetzbetraege.familienbonusUnder18.toLocaleString('de-AT')} EUR / Kind
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"
                      disabled={proOptions.kinderUnter18 <= 0}
                      onClick={() => setOpt('kinderUnter18', Math.max(0, proOptions.kinderUnter18 - 1))}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-8 text-center font-mono text-sm font-semibold tabular-nums">
                      {proOptions.kinderUnter18}
                    </span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"
                      onClick={() => setOpt('kinderUnter18', Math.min(10, proOptions.kinderUnter18 + 1))}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Kinder über 18</p>
                    <p className="text-xs text-muted-foreground">
                      FBP {cfg.absetzbetraege.familienbonusOver18.toLocaleString('de-AT')} EUR / Kind
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"
                      disabled={proOptions.kinderUeber18 <= 0}
                      onClick={() => setOpt('kinderUeber18', Math.max(0, proOptions.kinderUeber18 - 1))}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-8 text-center font-mono text-sm font-semibold tabular-nums">
                      {proOptions.kinderUeber18}
                    </span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"
                      onClick={() => setOpt('kinderUeber18', Math.min(10, proOptions.kinderUeber18 + 1))}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200/60" />

              {/* Alleinverdiener */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Label className="text-sm font-medium">Alleinverdiener / Alleinerzieher</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">AVAB/AEAB bei mind. 1 Kind</p>
                </div>
                <Switch
                  checked={proOptions.alleinverdiener}
                  onCheckedChange={(v) => setOpt('alleinverdiener', v)}
                />
              </div>

              <div className="border-t border-slate-200/60" />

              {/* Pendler */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-2">
                  <Label className="text-sm font-medium">Pendlerkilometer</Label>
                  <span className="text-sm font-mono font-semibold tabular-nums">{proOptions.pendlerKm} km</span>
                </div>
                <Slider
                  value={[proOptions.pendlerKm]}
                  onValueChange={([v]) => setOpt('pendlerKm', v)}
                  min={0} max={80} step={1}
                />
                <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                  <span>0 km</span><span>20 km</span><span>40 km</span><span>60 km</span><span>80 km</span>
                </div>
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <Train className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">Öffentliche zumutbar</span>
                  </div>
                  <Switch
                    checked={proOptions.pendlerOeffentlich}
                    onCheckedChange={(v) => setOpt('pendlerOeffentlich', v)}
                  />
                </div>
              </div>
            </div>
          </ProSectionWrapper>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
