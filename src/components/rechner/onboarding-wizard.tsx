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
import { ArrowRight, ArrowLeft, Sparkles, Building2, Shield, Briefcase } from 'lucide-react'
import { FieldInfo } from '@/components/ui/field-info'
import { FIELD_DEFS } from '@/lib/field-definitions'
import { BRANCHEN, type Branche } from '@/lib/user-preferences'
import confetti from 'canvas-confetti'

interface OnboardingWizardProps {
  onComplete: (stammdaten: Stammdaten, branche: Branche) => void
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
  { value: 'bsvg', label: 'Land- & Forstwirt (BSVG)', desc: 'Bauern-Sozialversicherung' },
]

/** Suggest a default Versicherungsart based on selected Branche */
function suggestVersicherungsart(branche: Branche): Versicherungsart {
  switch (branche) {
    case 'gesundheit': return 'fsvg_arzt'
    case 'it_freelancer':
    case 'kreativ': return 'gsvg_neu'
    case 'handwerk':
    case 'handel':
    case 'gastro':
    case 'landwirtschaft': return 'bsvg'
    default: return 'gsvg_gewerbe'
  }
}

const TOTAL_STEPS = 3

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Stammdaten>(DEFAULT_STAMMDATEN)
  const [branche, setBranche] = useState<Branche>('sonstige')

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => currentYear - i)

  const handleBrancheSelect = (b: Branche) => {
    setBranche(b)
    // Auto-suggest matching Versicherungsart
    setData((prev) => ({ ...prev, versicherungsart: suggestVersicherungsart(b) }))
  }

  const handleComplete = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#10b981', '#3b82f6', '#f59e0b'],
      ticks: 150,
      gravity: 1.2,
      decay: 0.94,
    })
    onComplete(data, branche)
  }

  const handleSkip = () => {
    onComplete(DEFAULT_STAMMDATEN, 'sonstige')
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className={`h-2 w-12 rounded-full transition-colors ${step >= i + 1 ? 'bg-primary' : 'bg-slate-200'}`}
            />
          ))}
        </div>

        {/* Step 1: Gründungsdatum */}
        {step === 1 && (
          <div className="glass rounded-2xl p-5 sm:p-8 space-y-6 animate-fade-up">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold tracking-tight font-heading">Dein Unternehmen</h2>
              <p className="text-sm text-muted-foreground">
                Wann hast du dein Unternehmen gegründet?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gründungsmonat <FieldInfo text={FIELD_DEFS.gruendungsMonat} /></Label>
                <Select
                  value={String(data.gruendungsMonat)}
                  onValueChange={(v) => setData({ ...data, gruendungsMonat: Number(v) })}
                >
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm">
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
                <Label className="text-sm font-medium">Gründungsjahr <FieldInfo text={FIELD_DEFS.gruendungsJahr} /></Label>
                <Select
                  value={String(data.gruendungsJahr)}
                  onValueChange={(v) => setData({ ...data, gruendungsJahr: Number(v) })}
                >
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm">
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

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Überspringen
              </button>
              <Button onClick={() => setStep(2)} className="gap-2 h-12 sm:h-10 px-6 text-base sm:text-sm">
                Weiter <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Branche */}
        {step === 2 && (
          <div className="glass rounded-2xl p-5 sm:p-8 space-y-6 animate-fade-up">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold tracking-tight font-heading">Deine Branche</h2>
              <p className="text-sm text-muted-foreground">
                In welchem Bereich bist du tätig? Wir zeigen dir passende Rechner.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {BRANCHEN.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => handleBrancheSelect(b.value)}
                  className={`flex items-start gap-2.5 rounded-xl border p-3 text-left cursor-pointer transition-all duration-200
                    ${branche === b.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                      : 'border-border hover:bg-muted/50 hover:border-border/80'
                    }`}
                >
                  <span className="text-lg mt-0.5 shrink-0">{b.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{b.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{b.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2 h-12 sm:h-10 text-base sm:text-sm">
                <ArrowLeft className="h-4 w-4" /> Zurück
              </Button>
              <Button onClick={() => setStep(3)} className="gap-2 h-12 sm:h-10 px-6 text-base sm:text-sm">
                Weiter <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Versicherung */}
        {step === 3 && (
          <div className="glass rounded-2xl p-5 sm:p-8 space-y-6 animate-fade-up">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold tracking-tight font-heading">Versicherung</h2>
              <p className="text-sm text-muted-foreground">
                Wie bist du sozialversichert?
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 min-h-[44px]">
              <div>
                <Label className="text-sm font-medium">Jungunternehmer <FieldInfo text={FIELD_DEFS.jungunternehmer} /></Label>
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
              <Label className="text-sm font-medium">Versicherungsart <FieldInfo text={FIELD_DEFS.versicherungsart} /></Label>
              <RadioGroup
                value={data.versicherungsart}
                onValueChange={(v) => setData({ ...data, versicherungsart: v as Versicherungsart })}
                className="space-y-2"
              >
                {VERSICHERUNGSARTEN.map((va) => (
                  <label
                    key={va.value}
                    className="flex items-start gap-3 rounded-xl border border-border p-3.5 sm:p-3 cursor-pointer hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
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

            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2 h-12 sm:h-10 text-base sm:text-sm">
                <ArrowLeft className="h-4 w-4" /> Zurück
              </Button>
              <Button onClick={handleComplete} className="gap-2 h-12 sm:h-10 text-base sm:text-sm">
                <Sparkles className="h-4 w-4" /> Rechner starten
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
