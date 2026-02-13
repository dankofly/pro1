'use client'

import { Badge } from '@/components/ui/badge'
import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'
import type { TaxYear } from '@/lib/tax-constants'
import { Eye } from 'lucide-react'

interface WahrheitsTabelleProps {
  gewinn: number
  result: SvsResult
  year: TaxYear
}

export function WahrheitsTabelle({ gewinn, result, year }: WahrheitsTabelleProps) {
  const nettoPercent = gewinn > 0 ? (result.echtesNetto / gewinn) * 100 : 0

  return (
    <div className="card-surface-dark rounded-2xl p-5 sm:p-6 text-white blue-glow" aria-label="Finanz-Übersicht: Gewinn, Abzüge und Netto">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/80 uppercase tracking-wide">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
            <Eye className="h-4 w-4 text-white/90" />
          </div>
          Finanz-Übersicht
        </div>
        <Badge variant="outline" className="bg-white/10 text-white/90 border-white/20 font-mono text-xs">
          {nettoPercent.toFixed(1)}% Netto
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2.5 font-semibold text-white/60">Posten</th>
              <th className="text-right py-2.5 font-semibold text-white/60">Jährlich</th>
              <th className="text-right py-2.5 font-semibold text-white/60">Monatlich</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="py-3.5 font-medium text-white">Brutto-Gewinn</td>
              <td className="py-3.5 text-right font-mono font-medium text-white">{formatEuro(gewinn)}</td>
              <td className="py-3.5 text-right font-mono font-medium text-white">{formatEuro(gewinn / 12)}</td>
            </tr>
            <tr className="border-b border-white/10 text-red-300/80">
              <td className="py-3.5">- SVS Beiträge</td>
              <td className="py-3.5 text-right font-mono">{formatEuro(result.endgueltigeSVS)}</td>
              <td className="py-3.5 text-right font-mono">{formatEuro(result.endgueltigeSVS / 12)}</td>
            </tr>
            {result.hasProOptions && (result.steuerBrutto - result.einkommensteuer) > 0 ? (
              <>
                <tr className="border-b border-white/10 text-red-300/80">
                  <td className="py-3.5">- Einkommensteuer (Tarif)</td>
                  <td className="py-3.5 text-right font-mono">{formatEuro(result.steuerBrutto)}</td>
                  <td className="py-3.5 text-right font-mono">{formatEuro(result.steuerBrutto / 12)}</td>
                </tr>
                <tr className="border-b border-white/10 text-emerald-300">
                  <td className="py-3.5">+ Absetzbeträge</td>
                  <td className="py-3.5 text-right font-mono">{formatEuro(result.steuerBrutto - result.einkommensteuer)}</td>
                  <td className="py-3.5 text-right font-mono">{formatEuro((result.steuerBrutto - result.einkommensteuer) / 12)}</td>
                </tr>
              </>
            ) : (
              <tr className="border-b border-white/10 text-red-300/80">
                <td className="py-3.5">- Einkommensteuer</td>
                <td className="py-3.5 text-right font-mono">{formatEuro(result.einkommensteuer)}</td>
                <td className="py-3.5 text-right font-mono">{formatEuro(result.einkommensteuer / 12)}</td>
              </tr>
            )}
            <tr className="bg-emerald-500/90 text-white rounded-lg border border-emerald-400/20">
              <td className="py-3.5 pl-3 font-bold text-base rounded-l-lg">ECHTES NETTO</td>
              <td className="py-3.5 text-right font-mono font-bold text-base">{formatEuro(result.echtesNetto)}</td>
              <td className="py-3.5 pr-3 text-right font-mono font-bold text-base rounded-r-lg">{formatEuro(result.echtesNetto / 12)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-white/30 mt-3 text-center">
        Tarifstufen {year} – inkl. Grundfreibetrag (15%){!result.hasProOptions && ' – ohne Sonderfälle'}
      </p>
    </div>
  )
}
