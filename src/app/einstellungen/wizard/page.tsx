'use client'

import { useRouter } from 'next/navigation'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { PageFooter } from '@/components/svs/page-footer'
import { MobileNav } from '@/components/svs/mobile-nav'
import { OnboardingWizard } from '@/components/rechner/onboarding-wizard'
import { getDefaultRechnerForBranche } from '@/lib/rechner-registry'
import { Sparkles } from 'lucide-react'
import type { Stammdaten } from '@/lib/rechner-types'
import type { Branche } from '@/lib/user-preferences'

function WizardContent() {
  const router = useRouter()
  const { setPreferences } = useAppShell()

  const handleWizardComplete = (stammdaten: Stammdaten, branche: Branche) => {
    setPreferences({
      branche,
      visibleRechner: getDefaultRechnerForBranche(branche),
      onboardingCompleted: true,
    })

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
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <MobileNav />
          <div className="flex items-center gap-2">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-primary" />
            <h1 className="text-sm font-semibold">Einrichtungs-Wizard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <OnboardingWizard onComplete={handleWizardComplete} />
      </div>

      <PageFooter />
    </>
  )
}

export default function WizardPage() {
  return (
    <AppShell>
      <WizardContent />
    </AppShell>
  )
}
