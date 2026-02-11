'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import type { RechnerAction, GmbhInput } from '@/lib/rechner-types'
import { ChevronDown, Building } from 'lucide-react'
import { ProSectionWrapper } from './pro-section-wrapper'

interface GmbhVergleichSectionProps {
  gmbh: GmbhInput
  isPro: boolean
  dispatch: React.Dispatch<RechnerAction>
}

export function GmbhVergleichSection({ gmbh, isPro, dispatch }: GmbhVergleichSectionProps) {
  const [open, setOpen] = useState(false)

  const setGmbh = (field: keyof GmbhInput, value: unknown) =>
    dispatch({ type: 'SET_GMBH', field, value })

  const handleGehalt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setGmbh('gfGehaltMonatlich', Math.min(Number(raw) || 0, 30000))
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="glass rounded-2xl">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 p-5 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100">
              <Building className="h-4 w-4 text-rose-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold tracking-tight">GmbH-Vergleich</h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {gmbh.aktiv ? 'Aktiv' : 'EPU vs. GmbH Vergleich'}
              </p>
            </div>
            <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ProSectionWrapper isPro={isPro} featureName="GmbH-Vergleich">
            <div className="space-y-4 px-5 pb-5">
              <div className="border-t border-border/60" />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label className="text-sm font-medium">GmbH-Vergleich aktivieren</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Berechnet die Gesamtbelastung bei GmbH-Struktur
                  </p>
                </div>
                <Switch
                  checked={gmbh.aktiv}
                  onCheckedChange={(v) => setGmbh('aktiv', v)}
                />
              </div>

              {gmbh.aktiv && (
                <div className="space-y-2">
                  <Label htmlFor="gf-gehalt" className="text-sm text-muted-foreground">
                    Geschäftsführer-Gehalt (brutto/Monat)
                  </Label>
                  <div className="relative w-full max-w-[200px]">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
                    <Input
                      id="gf-gehalt"
                      value={gmbh.gfGehaltMonatlich > 0 ? gmbh.gfGehaltMonatlich.toLocaleString('de-AT') : ''}
                      onChange={handleGehalt}
                      placeholder="3.000"
                      className="pl-10 text-right font-mono text-sm h-9 rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    14× jährlich (inkl. Urlaubs- und Weihnachtsgeld)
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
