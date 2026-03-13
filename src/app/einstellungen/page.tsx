'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { SlidersHorizontal, Briefcase, LayoutDashboard, Shield, Building2, Sparkles, Check } from 'lucide-react'
import { BRANCHEN, type Branche } from '@/lib/user-preferences'
import { RECHNER_REGISTRY, getDefaultRechnerForBranche } from '@/lib/rechner-registry'
import type { Stammdaten, Versicherungsart } from '@/lib/rechner-types'
import { DEFAULT_STAMMDATEN } from '@/lib/rechner-types'
import { MONATE, VERSICHERUNGSARTEN } from '@/lib/rechner-constants'

function EinstellungenContent() {
  const { preferences, setPreferences } = useAppShell()
  const [stammdaten, setStammdaten] = useState<Stammdaten>(DEFAULT_STAMMDATEN)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => currentYear - i)

  // Load stammdaten from rechner localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('rechner_input')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.stammdaten) {
          setStammdaten({ ...DEFAULT_STAMMDATEN, ...parsed.stammdaten })
        }
      }
    } catch { /* ignore */ }
  }, [])

  // Auto-save stammdaten on changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const existing = localStorage.getItem('rechner_input')
        const input = existing ? JSON.parse(existing) : {}
        input.stammdaten = stammdaten
        localStorage.setItem('rechner_input', JSON.stringify(input))
        localStorage.setItem('rechner_onboarded', 'true')
      } catch { /* ignore */ }
      setPreferences({ onboardingCompleted: true })
    }, 500)
    return () => clearTimeout(timeout)
  }, [stammdaten, setPreferences])

  const currentBranche = preferences.branche
  const currentBrancheInfo = BRANCHEN.find((b) => b.value === currentBranche)
  const activeRechnerIds = preferences.visibleRechner.length > 0
    ? preferences.visibleRechner
    : getDefaultRechnerForBranche(currentBranche)

  const handleBrancheChange = (branche: Branche) => {
    setPreferences({
      branche,
      visibleRechner: getDefaultRechnerForBranche(branche),
    })
  }

  const handleRechnerToggle = (rechnerId: string, enabled: boolean) => {
    const current = [...activeRechnerIds]
    if (enabled) {
      if (!current.includes(rechnerId)) current.push(rechnerId)
    } else {
      const idx = current.indexOf(rechnerId)
      if (idx >= 0) current.splice(idx, 1)
    }
    setPreferences({ visibleRechner: current })
  }

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div className="flex items-center gap-2">
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
              <h1 className="text-sm font-semibold">Onboarding-Einstellungen</h1>
            </div>
          </div>
          {currentBrancheInfo && (
            <Badge variant="outline" className="text-xs border-primary/30 text-primary gap-1.5">
              <span>{currentBrancheInfo.icon}</span>
              {currentBrancheInfo.label}
            </Badge>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Wizard-Link */}
        <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Schritt-für-Schritt Einrichtung</p>
              <p className="text-xs text-muted-foreground">Starte den geführten Wizard statt alles manuell einzustellen.</p>
            </div>
          </div>
          <Button asChild size="sm" variant="outline" className="shrink-0">
            <Link href="/einstellungen/wizard">Wizard starten</Link>
          </Button>
        </div>

        {/* Gründungsdaten */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 aria-hidden="true" className="h-5 w-5 text-primary" />
              Gründungsdaten
            </CardTitle>
            <CardDescription>
              Wann hast du dein Unternehmen gegründet?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gründungsmonat</Label>
                <Select
                  value={String(stammdaten.gruendungsMonat)}
                  onValueChange={(v) => setStammdaten({ ...stammdaten, gruendungsMonat: Number(v) })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
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
                  value={String(stammdaten.gruendungsJahr)}
                  onValueChange={(v) => setStammdaten({ ...stammdaten, gruendungsJahr: Number(v) })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Branche */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase aria-hidden="true" className="h-5 w-5 text-primary" />
              Branche
            </CardTitle>
            <CardDescription>
              Wähle deine Branche, um passende Rechner angezeigt zu bekommen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BRANCHEN.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => handleBrancheChange(b.value)}
                  className={`flex items-start gap-2 rounded-xl border p-3 text-left cursor-pointer transition-all duration-200
                    ${currentBranche === b.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                      : 'border-border hover:bg-muted/50'
                    }`}
                >
                  <span className="text-base mt-0.5 shrink-0">{b.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium leading-tight">{b.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug hidden sm:block">{b.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Versicherung */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield aria-hidden="true" className="h-5 w-5 text-primary" />
              Versicherung
            </CardTitle>
            <CardDescription>
              Wie bist du sozialversichert?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label className="text-sm font-medium">Jungunternehmer</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Vergünstigte SV-Beiträge in den ersten 2 Kalenderjahren
                </p>
              </div>
              <Switch
                checked={stammdaten.jungunternehmer}
                onCheckedChange={(v) => setStammdaten({ ...stammdaten, jungunternehmer: v })}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Versicherungsart</Label>
              <RadioGroup
                value={stammdaten.versicherungsart}
                onValueChange={(v) => setStammdaten({ ...stammdaten, versicherungsart: v as Versicherungsart })}
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
          </CardContent>
        </Card>

        {/* Rechner-Sichtbarkeit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <LayoutDashboard aria-hidden="true" className="h-5 w-5 text-primary" />
              Dashboard-Rechner
            </CardTitle>
            <CardDescription>
              Wähle, welche Rechner in der Seitenleiste angezeigt werden sollen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {RECHNER_REGISTRY.map((r) => {
              const isActive = activeRechnerIds.includes(r.id)
              const isDefault = getDefaultRechnerForBranche(currentBranche).includes(r.id)

              return (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 py-2.5 px-1 border-b border-border/50 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <r.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-medium">{r.label}</Label>
                        {r.requiresPro && (
                          <Badge className="bg-amber-500/20 text-amber-600 border-amber-400/30 text-[10px] px-1.5 py-0">
                            Pro
                          </Badge>
                        )}
                      </div>
                      {isDefault && !isActive && (
                        <p className="text-xs text-muted-foreground">Empfohlen für deine Branche</p>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={isActive}
                    onCheckedChange={(checked) => handleRechnerToggle(r.id, checked)}
                  />
                </div>
              )
            })}

            <div className="pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreferences({ visibleRechner: getDefaultRechnerForBranche(currentBranche) })}
                className="text-xs min-h-[44px]"
              >
                Auf Branchenstandard zurücksetzen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save & back */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <Check className="h-4 w-4" />
            <span>Änderungen automatisch gespeichert</span>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link href="/rechner">Speichern und zurück zum Steuerrechner</Link>
          </Button>
        </div>

        <footer className="text-center py-8 text-xs text-muted-foreground">
          <p>SteuerBoard.pro – Alle Angaben ohne Gewähr.</p>
        </footer>
      </div>
    </>
  )
}

export default function EinstellungenPage() {
  return (
    <AppShell>
      <EinstellungenContent />
    </AppShell>
  )
}
