'use client'

import { Badge } from '@/components/ui/badge'
import { ShieldCheck, ShieldAlert, ShieldX, ShieldQuestion } from 'lucide-react'

interface StatusBadgeProps {
  riskPercent: number
  /** Ohne hinterlegte Vorschreibung ist das Risiko nicht bewertbar: neutraler Zustand statt Alarm */
  hatVorschreibung?: boolean
}

export function StatusBadge({ riskPercent, hatVorschreibung = true }: StatusBadgeProps) {
  if (!hatVorschreibung) {
    return (
      <Badge role="status" variant="outline" className="text-muted-foreground gap-1.5 py-1 px-3">
        <ShieldQuestion className="h-3.5 w-3.5" aria-hidden="true" />
        Vorschreibung fehlt
      </Badge>
    )
  }

  if (riskPercent <= 25) {
    return (
      <Badge role="status" className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40 gap-1.5 py-1 px-3">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Sicher
      </Badge>
    )
  }

  if (riskPercent <= 60) {
    return (
      <Badge role="status" className="bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40 gap-1.5 py-1 px-3">
        <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
        Nachzahlung möglich
      </Badge>
    )
  }

  return (
    <Badge role="status" className="bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/40 gap-1.5 py-1 px-3 animate-pulse">
      <ShieldX className="h-3.5 w-3.5" aria-hidden="true" />
      Kritisch
    </Badge>
  )
}
