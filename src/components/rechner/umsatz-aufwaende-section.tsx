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
import type { RechnerAction, AufwaendeBreakdown, ArbeitsplatzpauschaleType, VorauszahlungenInput, VorauszahlungenResult } from '@/lib/rechner-types'
import { ChevronDown, Receipt, TrendingUp, Wallet } from 'lucide-react'
import { FieldInfo } from '@/components/ui/field-info'
import { FIELD_DEFS } from '@/lib/field-definitions'

interface UmsatzAufwaendeSectionProps {
  jahresumsatz: number
  aufwaende: AufwaendeBreakdown
  aufwaendeGesamt: number
  aufwaendeDetailed: boolean
  gewinn: number
  vorauszahlungen: VorauszahlungenInput
  vorauszahlungenResult: VorauszahlungenResult
  dispatch: React.Dispatch<RechnerAction>
}

function EuroInput({
  id, value, onChange, max = 2000000, label, suffix, info,
}: {
  id: string; value: number; onChange: (v: number) => void
  max?: number; label: string; suffix?: string; info?: string
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, max))
  }
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium">{label}{info && <FieldInfo text={info} />}</Label>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
          <Input
            id={id}
            value={value > 0 ? value.toLocaleString('de-AT') : ''}
            onChange={handleInput}
            placeholder="0"
            className="pl-10 text-right font-mono text-base font-semibold h-11 rounded-lg bg-muted/30 border-transparent focus:bg-background focus:border-primary/20"
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
        <span>0</span>
        <span>{max >= 1000000 ? `${max / 2000000}M` : `${(max / 2000).toFixed(0)}k`}</span>
        <span>{max >= 1000000 ? `${max / 1000000}M` : `${(max / 1000).toFixed(0)}k`}</span>
      </div>
    </div>
  )
}

function SmallEuroInput({
  id, value, onChange, label, max = 500000, info,
}: {
  id: string; value: number; onChange: (v: number) => void; label: string; max?: number; info?: string
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, max))
  }
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id} className="text-sm text-muted-foreground min-w-0">{label}{info && <FieldInfo text={info} />}</Label>
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
  jahresumsatz, aufwaende, aufwaendeGesamt, aufwaendeDetailed, gewinn,
  vorauszahlungen, vorauszahlungenResult, dispatch,
}: UmsatzAufwaendeSectionProps) {
  const [detailOpen, setDetailOpen] = useState(aufwaendeDetailed)
  const [vzOpen, setVzOpen] = useState(false)
  const [svMode, setSvMode] = useState<'monatlich' | 'jaehrlich'>('monatlich')

  const setUmsatz = (v: number) => dispatch({ type: 'SET_FIELD', field: 'jahresumsatz', value: v })
  const setAufwaendeGesamt = (v: number) => dispatch({ type: 'SET_FIELD', field: 'aufwaendeGesamt', value: v })

  const setAufwand = (field: keyof AufwaendeBreakdown, value: unknown) =>
    dispatch({ type: 'SET_AUFWAND', field, value })

  const setVz = (field: keyof VorauszahlungenInput, value: number) =>
    dispatch({ type: 'SET_VORAUSZAHLUNG', field, value })

  const toggleDetailed = (open: boolean) => {
    setDetailOpen(open)
    dispatch({ type: 'SET_FIELD', field: 'aufwaendeDetailed', value: open })
  }

  // SV monthly/yearly conversion
  const svDisplayValue = svMode === 'monatlich'
    ? Math.round(vorauszahlungen.svVorauszahlung / 12)
    : vorauszahlungen.svVorauszahlung
  const svMax = svMode === 'monatlich' ? 10000 : 120000
  const svStep = svMode === 'monatlich' ? 50 : 500
  const handleSvChange = (v: number) => {
    setVz('svVorauszahlung', svMode === 'monatlich' ? v * 12 : v)
  }

  return (
    <div className="card-surface p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/60">
          <Receipt className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <h2 className="text-sm font-semibold tracking-tight font-heading">
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
          info={FIELD_DEFS.jahresumsatz}
        />

        <div className="divider" />

        {/* Aufwände Gesamt */}
        {!detailOpen && (
          <EuroInput
            id="aufwaende-gesamt"
            value={aufwaendeGesamt}
            onChange={setAufwaendeGesamt}
            max={1000000}
            label="Betriebsausgaben gesamt"
            suffix="/ Jahr"
            info={FIELD_DEFS.aufwaendeGesamt}
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
                info={FIELD_DEFS.personalkosten}
              />
              <SmallEuroInput
                id="wareneinkauf"
                value={aufwaende.wareneinkauf}
                onChange={(v) => setAufwand('wareneinkauf', v)}
                label="Wareneinkauf / Material"
                info={FIELD_DEFS.wareneinkauf}
              />
              <SmallEuroInput
                id="reisekosten"
                value={aufwaende.reisekosten}
                onChange={(v) => setAufwand('reisekosten', v)}
                label="Reise- / Fahrtkosten"
                info={FIELD_DEFS.reisekosten}
              />

              {/* Arbeitsplatzpauschale */}
              <div className="flex items-center justify-between gap-3">
                <Label className="text-sm text-muted-foreground">Arbeitsplatzpauschale <FieldInfo text={FIELD_DEFS.arbeitsplatzpauschale} /></Label>
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
                info={FIELD_DEFS.oepnvPauschale}
              />
              <SmallEuroInput
                id="sonstige"
                value={aufwaende.sonstigeAufwaende}
                onChange={(v) => setAufwand('sonstigeAufwaende', v)}
                label="Sonstige Aufwände"
                info={FIELD_DEFS.sonstigeAufwaende}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Computed Gewinn */}
        <div className="divider pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Gewinn</span>
            </div>
            <span className="text-base font-bold font-mono text-foreground tabular-nums">
              {formatEuro(gewinn)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Umsatz minus Betriebsausgaben
          </p>
        </div>

        {/* Vorauszahlungen */}
        <Collapsible open={vzOpen} onOpenChange={setVzOpen}>
          <div className="divider" />
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-3 py-2 text-left"
            >
              <Wallet className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {vzOpen ? 'Vorauszahlungen' : 'Vorauszahlungen eintragen'}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${vzOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4 pt-3">
              {/* SV-Vorauszahlung with monthly/yearly toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-sm text-muted-foreground">
                    SV-Vorauszahlung <FieldInfo text={FIELD_DEFS.svVorauszahlung} />
                  </Label>
                  <div className="flex rounded-lg border border-border overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => setSvMode('monatlich')}
                      className={`px-2.5 py-1 transition-colors ${
                        svMode === 'monatlich'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      mtl.
                    </button>
                    <button
                      type="button"
                      onClick={() => setSvMode('jaehrlich')}
                      className={`px-2.5 py-1 transition-colors ${
                        svMode === 'jaehrlich'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      jährl.
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-full max-w-[200px]">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
                    <Input
                      id="sv-vz"
                      value={svDisplayValue > 0 ? svDisplayValue.toLocaleString('de-AT') : ''}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '')
                        handleSvChange(Math.min(Number(raw) || 0, svMax))
                      }}
                      placeholder="0"
                      className="pl-10 text-right font-mono text-sm h-9 rounded-lg"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    / {svMode === 'monatlich' ? 'Monat' : 'Jahr'}
                  </span>
                </div>
                <Slider
                  value={[svDisplayValue]}
                  onValueChange={([v]) => handleSvChange(v)}
                  max={svMax}
                  step={svStep}
                  className="py-1"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>0</span>
                  <span>{(svMax / 2).toLocaleString('de-AT')}</span>
                  <span>{svMax.toLocaleString('de-AT')}</span>
                </div>
              </div>

              {vorauszahlungenResult.svDifferenz !== 0 && vorauszahlungen.svVorauszahlung > 0 && (
                <div className={`rounded-lg p-2.5 text-xs ${
                  vorauszahlungenResult.svDifferenz > 0
                    ? 'bg-amber-50 text-amber-800'
                    : 'bg-emerald-50 text-emerald-800'
                }`}>
                  {vorauszahlungenResult.svDifferenz > 0
                    ? `Voraussichtliche Nachzahlung: ${formatEuro(vorauszahlungenResult.svDifferenz)}`
                    : `Voraussichtliche Gutschrift: ${formatEuro(Math.abs(vorauszahlungenResult.svDifferenz))}`
                  }
                </div>
              )}

              {/* SV-Nachzahlung Vorjahr */}
              <SmallEuroInput
                id="sv-nachzahlung"
                value={vorauszahlungen.svNachzahlungVorjahr}
                onChange={(v) => setVz('svNachzahlungVorjahr', v)}
                label="SV-Nachzahlung Vorjahr"
                max={100000}
                info={FIELD_DEFS.svNachzahlungVorjahr}
              />

              {/* ESt-Vorauszahlung with slider */}
              <div className="space-y-2">
                <Label htmlFor="est-vz" className="text-sm text-muted-foreground">
                  ESt-Vorauszahlung (jährlich) <FieldInfo text={FIELD_DEFS.estVorauszahlung} />
                </Label>
                <div className="flex items-center gap-2">
                  <div className="relative w-full max-w-[200px]">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
                    <Input
                      id="est-vz"
                      value={vorauszahlungen.estVorauszahlung > 0 ? vorauszahlungen.estVorauszahlung.toLocaleString('de-AT') : ''}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '')
                        setVz('estVorauszahlung', Math.min(Number(raw) || 0, 200000))
                      }}
                      placeholder="0"
                      className="pl-10 text-right font-mono text-sm h-9 rounded-lg"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">/ Jahr</span>
                </div>
                <Slider
                  value={[vorauszahlungen.estVorauszahlung]}
                  onValueChange={([v]) => setVz('estVorauszahlung', v)}
                  max={200000}
                  step={500}
                  className="py-1"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>0</span>
                  <span>100k</span>
                  <span>200k</span>
                </div>
              </div>

              {vorauszahlungenResult.estDifferenz !== 0 && vorauszahlungen.estVorauszahlung > 0 && (
                <div className={`rounded-lg p-2.5 text-xs ${
                  vorauszahlungenResult.estDifferenz > 0
                    ? 'bg-amber-50 text-amber-800'
                    : 'bg-emerald-50 text-emerald-800'
                }`}>
                  {vorauszahlungenResult.estDifferenz > 0
                    ? `Voraussichtliche ESt-Nachzahlung: ${formatEuro(vorauszahlungenResult.estDifferenz)}`
                    : `Voraussichtliche ESt-Gutschrift: ${formatEuro(Math.abs(vorauszahlungenResult.estDifferenz))}`
                  }
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
