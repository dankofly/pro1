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
      <Badge role="status" className="bg-sb-green-soft text-sb-green border-sb-green/30 gap-1.5 py-1 px-3">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Sicher
      </Badge>
    )
  }

  if (riskPercent <= 60) {
    return (
      <Badge role="status" className="bg-sb-accent-soft text-sb-accent border-sb-accent/30 gap-1.5 py-1 px-3">
        <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
        Nachzahlung möglich
      </Badge>
    )
  }

  return (
    <Badge role="status" className="bg-sb-red/10 text-sb-red border-sb-red/30 gap-1.5 py-1 px-3 animate-pulse">
      <ShieldX className="h-3.5 w-3.5" aria-hidden="true" />
      Kritisch
    </Badge>
  )
}
