'use client'

import { Badge } from '@/components/ui/badge'
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react'

interface StatusBadgeProps {
  riskPercent: number
}

export function StatusBadge({ riskPercent }: StatusBadgeProps) {
  if (riskPercent <= 25) {
    return (
      <Badge role="status" className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1.5 py-1 px-3">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Sicher
      </Badge>
    )
  }

  if (riskPercent <= 60) {
    return (
      <Badge role="status" className="bg-amber-100 text-amber-700 border-amber-200 gap-1.5 py-1 px-3">
        <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
        Nachzahlung möglich
      </Badge>
    )
  }

  return (
    <Badge role="status" className="bg-red-100 text-red-700 border-red-200 gap-1.5 py-1 px-3 animate-pulse">
      <ShieldX className="h-3.5 w-3.5" aria-hidden="true" />
      Kritisch
    </Badge>
  )
}
