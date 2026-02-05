'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'
import { Eye } from 'lucide-react'

interface WahrheitsTabelleProps {
  gewinn: number
  result: SvsResult
}

export function WahrheitsTabelle({ gewinn, result }: WahrheitsTabelleProps) {
  const nettoPercent = gewinn > 0 ? (result.echtesNetto / gewinn) * 100 : 0

  return (
    <Card className="border-2 border-slate-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
              <Eye className="h-4 w-4 text-white" />
            </div>
            Die Wahrheits-Tabelle
          </div>
          <Badge variant="outline" className="bg-slate-100 text-slate-700 font-mono text-xs">
            {nettoPercent.toFixed(1)}% Netto
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-2.5 font-semibold text-muted-foreground">Posten</th>
                <th className="text-right py-2.5 font-semibold text-muted-foreground">Jährlich</th>
                <th className="text-right py-2.5 font-semibold text-muted-foreground">Monatlich</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 font-medium">Brutto-Gewinn</td>
                <td className="py-3 text-right font-mono font-medium">{formatEuro(gewinn)}</td>
                <td className="py-3 text-right font-mono font-medium">{formatEuro(gewinn / 12)}</td>
              </tr>
              <tr className="border-b border-slate-100 text-red-600">
                <td className="py-3">− SVS Beiträge</td>
                <td className="py-3 text-right font-mono">{formatEuro(result.endgueltigeSVS)}</td>
                <td className="py-3 text-right font-mono">{formatEuro(result.endgueltigeSVS / 12)}</td>
              </tr>
              <tr className="border-b border-slate-100 text-red-600">
                <td className="py-3">− Einkommensteuer</td>
                <td className="py-3 text-right font-mono">{formatEuro(result.einkommensteuer)}</td>
                <td className="py-3 text-right font-mono">{formatEuro(result.einkommensteuer / 12)}</td>
              </tr>
              <tr className="bg-slate-900 text-white rounded-lg">
                <td className="py-3.5 pl-3 font-bold text-base rounded-l-lg">ECHTES NETTO</td>
                <td className="py-3.5 text-right font-mono font-bold text-base">{formatEuro(result.echtesNetto)}</td>
                <td className="py-3.5 pr-3 text-right font-mono font-bold text-base rounded-r-lg">{formatEuro(result.echtesNetto / 12)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Tarifstufen 2024/25 · inkl. Grundfreibetrag (15%) · ohne Sonderfälle
        </p>
      </CardContent>
    </Card>
  )
}
