'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import type { Stammdaten, Versicherungsart } from '@/lib/rechner-types'
import { DEFAULT_STAMMDATEN } from '@/lib/rechner-types'
import { ArrowRight, ArrowLeft, Sparkles, Building2, Shield } from 'lucide-react'

interface OnboardingWizardProps {
  onComplete: (stammdaten: Stammdaten) => void
}

const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

const VERSICHERUNGSARTEN: { value: Versicherungsart; label: string; desc: string }[] = [
  { value: 'gsvg_gewerbe', label: 'Gewerbetreibender (GSVG)', desc: 'Gewerbe, Handel, Handwerk' },
  { value: 'gsvg_neu', label: 'Neuer Selbständiger (GSVG)', desc: 'Freiberufler, Werkvertrag, IT' },
  { value: 'fsvg_arzt', label: 'Arzt (FSVG)', desc: 'Ärztekammer-Mitglied' },
  { value: 'fsvg_patent', label: 'Apotheker / Patentanwalt / ZT (FSVG)', desc: 'Freier Beruf mit Kammermitgliedschaft' },
]

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Stammdaten>(DEFAULT_STAMMDATEN)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => currentYear - i)

  const handleComplete = () => {
    onComplete(data)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-slate-200'}`} />
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`} />
        </div>

        {step === 1 && (
          <div className="glass rounded-2xl p-6 sm:p-8 space-y-6 animate-fade-up">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Dein Unternehmen</h2>
              <p className="text-sm text-muted-foreground">
                Wann hast du dein Unternehmen gegründet?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gründungsmonat</Label>
                <Select
                  value={String(data.gruendungsMonat)}
                  onValueChange={(v) => setData({ ...data, gruendungsMonat: Number(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONATE.map((m, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Gründungsjahr</Label>
                <Select
                  value={String(data.gruendungsJahr)}
                  onValueChange={(v) => setData({ ...data, gruendungsJahr: Number(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} className="gap-2">
                Weiter <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="glass rounded-2xl p-6 sm:p-8 space-y-6 animate-fade-up">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Versicherung</h2>
              <p className="text-sm text-muted-foreground">
                Wie bist du sozialversichert?
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <Label className="text-sm font-medium">Jungunternehmer</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Vergünstigte SV-Beiträge in den ersten 2 Kalenderjahren
                </p>
              </div>
              <Switch
                checked={data.jungunternehmer}
                onCheckedChange={(v) => setData({ ...data, jungunternehmer: v })}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Versicherungsart</Label>
              <RadioGroup
                value={data.versicherungsart}
                onValueChange={(v) => setData({ ...data, versicherungsart: v as Versicherungsart })}
                className="space-y-2"
              >
                {VERSICHERUNGSARTEN.map((va) => (
                  <label
                    key={va.value}
                    className="flex items-start gap-3 rounded-xl border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem value={va.value} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{va.label}</p>
                      <p className="text-xs text-muted-foreground">{va.desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Zurück
              </Button>
              <Button onClick={handleComplete} className="gap-2">
                <Sparkles className="h-4 w-4" /> Rechner starten
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
