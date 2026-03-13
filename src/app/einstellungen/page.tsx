'use client'

import { useRouter } from 'next/navigation'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { OnboardingWizard } from '@/components/rechner/onboarding-wizard'
import { getDefaultRechnerForBranche } from '@/lib/rechner-registry'
import { SlidersHorizontal } from 'lucide-react'
import type { Stammdaten } from '@/lib/rechner-types'
import type { Branche } from '@/lib/user-preferences'

function EinstellungenContent() {
  const router = useRouter()
  const { setPreferences } = useAppShell()

  const handleWizardComplete = (stammdaten: Stammdaten, branche: Branche) => {
    // Save branche + matching rechner to preferences
    setPreferences({
      branche,
      visibleRechner: getDefaultRechnerForBranche(branche),
      onboardingCompleted: true,
    })

    // Save stammdaten to rechner localStorage
    try {
      const existing = localStorage.getItem('rechner_input')
      const input = existing ? JSON.parse(existing) : {}
      input.stammdaten = stammdaten
      localStorage.setItem('rechner_input', JSON.stringify(input))
      localStorage.setItem('rechner_onboarded', 'true')
    } catch { /* ignore */ }

    router.push('/rechner')
  }

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <MobileNav />
          <div className="flex items-center gap-2">
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            <h1 className="text-sm font-semibold">Onboarding</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <OnboardingWizard onComplete={handleWizardComplete} />
      </div>

      <footer className="text-center py-8 text-xs text-muted-foreground">
        <p>SteuerBoard.pro – Alle Angaben ohne Gewähr.</p>
      </footer>
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
