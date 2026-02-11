'use client'

import { CalendarDays } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type TaxYear, TAX_YEARS } from '@/lib/tax-constants'

interface YearSelectorProps {
  year: TaxYear
  onYearChange: (year: TaxYear) => void
}

export function YearSelector({ year, onYearChange }: YearSelectorProps) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Steuerjahr</Label>
        </div>

        <Select value={year} onValueChange={(v) => onYearChange(v as TaxYear)}>
          <SelectTrigger className="w-[140px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TAX_YEARS.map((y) => (
              <SelectItem key={y.value} value={y.value}>
                {y.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {year === '2026' && (
          <Badge
            variant="outline"
            className="text-amber-600 border-amber-300 bg-amber-50 text-xs"
          >
            Prognose
          </Badge>
        )}
      </div>
    </div>
  )
}
