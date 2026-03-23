'use client'

import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const FEATURE_DESCRIPTIONS: Record<string, string> = {
  'AI SteuerBoard': 'Persönliche Steueranalyse deiner Zahlen durch KI — Optimierungspotenzial erkennen.',
  'Steuer-Chatbot': 'Fragen zu ESt, KöSt, USt, Krypto und mehr — der Chatbot rechnet mit 2026-Werten.',
  'Investitionen & AfA': 'Berechne Abschreibungen und Investitionsfreibetrag für deine Anschaffungen.',
  'Pauschalierung': 'Vergleiche Pauschalierung mit Einnahmen-Ausgaben-Rechnung.',
  'Weitere Einkünfte': 'Misch-Einkommen aus Dienstverhältnis und Selbstständigkeit berechnen.',
  'GmbH-Vergleich': 'Lohnt sich eine GmbH? Vergleiche Steuerbelastung direkt.',
  'Gewinnmaximierer': 'Finde den optimalen Gewinn für minimale Steuerlast.',
}

interface ProSectionWrapperProps {
  isPro: boolean
  featureName: string
  children: React.ReactNode
  onUpgradeRequired?: (feature: string, plan: 'basic' | 'pro') => void
  requiredPlan?: 'basic' | 'pro'
}

export function ProSectionWrapper({
  isPro, featureName, children, onUpgradeRequired, requiredPlan = 'pro',
}: ProSectionWrapperProps) {
  if (isPro) return <>{children}</>

  const description = FEATURE_DESCRIPTIONS[featureName]

  return (
    <div className="relative min-h-[120px]">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md z-10 flex flex-col items-center justify-center gap-2.5 rounded-2xl px-6">
        <Lock className="h-4 w-4 text-muted-foreground/60" />
        <p className="text-sm font-medium text-muted-foreground text-center">
          {featureName} – Pro Feature
        </p>
        {description && (
          <p className="text-xs text-muted-foreground/70 text-center max-w-xs">
            {description}
          </p>
        )}
        {onUpgradeRequired ? (
          <Button size="sm" onClick={() => onUpgradeRequired(featureName, requiredPlan)}>
            Jetzt freischalten
          </Button>
        ) : (
          <Button size="sm" asChild>
            <Link href="/pricing">Jetzt freischalten</Link>
          </Button>
        )}
      </div>
      <div className="opacity-20 pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
