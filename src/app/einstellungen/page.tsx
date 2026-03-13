'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SlidersHorizontal, Briefcase, LayoutDashboard, RotateCcw, Check } from 'lucide-react'
import { BRANCHEN, type Branche } from '@/lib/user-preferences'
import { RECHNER_REGISTRY, getDefaultRechnerForBranche } from '@/lib/rechner-registry'
import { toast } from 'sonner'

function EinstellungenContent() {
  const router = useRouter()
  const { preferences, setPreferences } = useAppShell()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [saved, setSaved] = useState(false)

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
    setSaved(false)
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
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    toast.success('Onboarding-Profil gespeichert!')
  }

  const handleReset = () => {
    try {
      localStorage.removeItem('rechner_onboarded')
      localStorage.removeItem('rechner_input')
    } catch { /* ignore */ }
    setPreferences({
      branche: 'sonstige',
      visibleRechner: [],
      onboardingCompleted: false,
    })
    router.push('/rechner')
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
              <h1 className="text-sm font-semibold">Onboarding</h1>
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
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug hidden sm:block">{b.desc}</p>
                  </div>
                </button>
              ))}
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
                        <p className="text-[10px] text-muted-foreground">Empfohlen für deine Branche</p>
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
                onClick={() => {
                  setPreferences({ visibleRechner: getDefaultRechnerForBranche(currentBranche) })
                  setSaved(false)
                }}
                className="text-xs"
              >
                Auf Branchenstandard zurücksetzen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save / Confirmation */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-muted/30 p-4">
          {saved ? (
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <Check className="h-4 w-4" />
              <span>Profil gespeichert</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Änderungen werden sofort in der Navigation übernommen.
            </p>
          )}
          <Button size="sm" onClick={handleSave} className="shrink-0">
            {saved ? 'Gespeichert' : 'Speichern'}
          </Button>
        </div>

        {/* Onboarding zurücksetzen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <RotateCcw aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
              Onboarding zurücksetzen
            </CardTitle>
            <CardDescription>
              Starte den Einrichtungsassistenten erneut und setze alle Einstellungen zurück.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showResetConfirm ? (
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">Bist du sicher?</p>
                <Button variant="destructive" size="sm" onClick={handleReset}>
                  Ja, zurücksetzen
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(false)}>
                  Abbrechen
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetConfirm(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                Onboarding zurücksetzen
              </Button>
            )}
          </CardContent>
        </Card>

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
