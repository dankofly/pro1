'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from '@/components/ui/collapsible'
import { formatEuro } from '@/lib/format'
import type { RechnerAction, AufwaendeBreakdown, ArbeitsplatzpauschaleType } from '@/lib/rechner-types'
import { ChevronDown, Receipt, TrendingUp } from 'lucide-react'

interface UmsatzAufwaendeSectionProps {
  jahresumsatz: number
  aufwaende: AufwaendeBreakdown
  aufwaendeGesamt: number
  aufwaendeDetailed: boolean
  gewinn: number
  dispatch: React.Dispatch<RechnerAction>
}

function EuroInput({
  id, value, onChange, max = 2000000, label, suffix,
}: {
  id: string; value: number; onChange: (v: number) => void
  max?: number; label: string; suffix?: string
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, max))
  }
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">EUR</span>
          <Input
            id={id}
            value={value > 0 ? value.toLocaleString('de-AT') : ''}
            onChange={handleInput}
            placeholder="0"
            className="pl-12 text-right font-mono text-lg font-semibold h-12 rounded-xl"
          />
        </div>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        max={max}
        step={500}
        className="py-1"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>EUR 0</span>
        <span>EUR {(max / 2).toLocaleString('de-AT')}</span>
        <span>EUR {max.toLocaleString('de-AT')}</span>
      </div>
    </div>
  )
}

function SmallEuroInput({
  id, value, onChange, label, max = 500000,
}: {
  id: string; value: number; onChange: (v: number) => void; label: string; max?: number
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, max))
  }
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id} className="text-sm text-muted-foreground min-w-0">{label}</Label>
      <div className="relative w-36 shrink-0">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
        <Input
          id={id}
          value={value > 0 ? value.toLocaleString('de-AT') : ''}
          onChange={handleInput}
          placeholder="0"
          className="pl-10 text-right font-mono text-sm h-9 rounded-lg"
        />
      </div>
    </div>
  )
}

export function UmsatzAufwaendeSection({
  jahresumsatz, aufwaende, aufwaendeGesamt, aufwaendeDetailed, gewinn, dispatch,
}: UmsatzAufwaendeSectionProps) {
  const [detailOpen, setDetailOpen] = useState(aufwaendeDetailed)

  const setUmsatz = (v: number) => dispatch({ type: 'SET_FIELD', field: 'jahresumsatz', value: v })
  const setAufwaendeGesamt = (v: number) => dispatch({ type: 'SET_FIELD', field: 'aufwaendeGesamt', value: v })

  const setAufwand = (field: keyof AufwaendeBreakdown, value: unknown) =>
    dispatch({ type: 'SET_AUFWAND', field, value })

  const toggleDetailed = (open: boolean) => {
    setDetailOpen(open)
    dispatch({ type: 'SET_FIELD', field: 'aufwaendeDetailed', value: open })
  }

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900">
          <Receipt className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight font-heading">
          Umsatz & Aufwände
        </h2>
      </div>

      <div className="space-y-6">
        {/* Jahresumsatz */}
        <EuroInput
          id="umsatz"
          value={jahresumsatz}
          onChange={setUmsatz}
          max={2000000}
          label="Jahresumsatz (netto, ohne USt)"
          suffix="/ Jahr"
        />

        <div className="border-t border-slate-200/60" />

        {/* Aufwände Gesamt */}
        {!detailOpen && (
          <EuroInput
            id="aufwaende-gesamt"
            value={aufwaendeGesamt}
            onChange={setAufwaendeGesamt}
            max={1000000}
            label="Betriebsausgaben gesamt"
            suffix="/ Jahr"
          />
        )}

        {/* Detail-Aufschlüsselung */}
        <Collapsible open={detailOpen} onOpenChange={toggleDetailed}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              <span>{detailOpen ? 'Aufwände im Detail' : 'Aufwände aufschlüsseln'}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${detailOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3 pt-3">
              <SmallEuroInput
                id="personalkosten"
                value={aufwaende.personalkosten}
                onChange={(v) => setAufwand('personalkosten', v)}
                label="Personal- / Fremdkosten"
              />
              <SmallEuroInput
                id="wareneinkauf"
                value={aufwaende.wareneinkauf}
                onChange={(v) => setAufwand('wareneinkauf', v)}
                label="Wareneinkauf / Material"
              />
              <SmallEuroInput
                id="reisekosten"
                value={aufwaende.reisekosten}
                onChange={(v) => setAufwand('reisekosten', v)}
                label="Reise- / Fahrtkosten"
              />

              {/* Arbeitsplatzpauschale */}
              <div className="flex items-center justify-between gap-3">
                <Label className="text-sm text-muted-foreground">Arbeitsplatzpauschale</Label>
                <Select
                  value={aufwaende.arbeitsplatzpauschale}
                  onValueChange={(v) => setAufwand('arbeitsplatzpauschale', v as ArbeitsplatzpauschaleType)}
                >
                  <SelectTrigger className="w-36 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="keine">Keine</SelectItem>
                    <SelectItem value="klein">Klein (300 EUR)</SelectItem>
                    <SelectItem value="gross">Groß (1.200 EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <SmallEuroInput
                id="oepnv"
                value={aufwaende.oepnvPauschale}
                onChange={(v) => setAufwand('oepnvPauschale', v)}
                label="ÖPNV-Kosten (50% absetzbar)"
                max={10000}
              />
              <SmallEuroInput
                id="sonstige"
                value={aufwaende.sonstigeAufwaende}
                onChange={(v) => setAufwand('sonstigeAufwaende', v)}
                label="Sonstige Aufwände"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Computed Gewinn */}
        <div className="border-t border-slate-200/60 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-foreground">Gewinn</span>
            </div>
            <span className="text-lg font-bold font-mono text-emerald-600 tabular-nums">
              {formatEuro(gewinn)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Umsatz minus Betriebsausgaben
          </p>
        </div>
      </div>
    </div>
  )
}
