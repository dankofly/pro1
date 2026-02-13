'use client'

import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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

  return (
    <div className="relative min-h-[120px]">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md z-10 flex flex-col items-center justify-center gap-3 rounded-2xl">
        <Lock className="h-4 w-4 text-muted-foreground/60" />
        <p className="text-sm font-medium text-muted-foreground text-center px-4">
          {featureName} – Pro Feature
        </p>
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
