'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import type { RechnerAction, GmbhInput } from '@/lib/rechner-types'
import { ChevronDown, Building, Crown } from 'lucide-react'
import { FieldInfo } from '@/components/ui/field-info'
import { FIELD_DEFS } from '@/lib/field-definitions'
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
      <div className="card-surface">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/60">
              <Building className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold tracking-tight flex items-center gap-1.5">GmbH-Vergleich <Crown className="h-3 w-3 text-amber-400" /></h2>
              <p className="text-xs text-muted-foreground truncate">
                {gmbh.aktiv ? 'Aktiv' : 'EPU vs. GmbH Vergleich'}
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ProSectionWrapper isPro={isPro} featureName="GmbH-Vergleich">
            <div className="space-y-4 px-4 pb-4">
              <div className="divider" />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label className="text-sm font-medium">GmbH-Vergleich aktivieren <FieldInfo text={FIELD_DEFS.gmbhAktiv} /></Label>
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
                    Geschäftsführer-Gehalt (brutto/Monat) <FieldInfo text={FIELD_DEFS.gfGehaltMonatlich} />
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
