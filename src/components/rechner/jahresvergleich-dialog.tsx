'use client'

import { useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatEuro } from '@/lib/format'
import { calculateSvs } from '@/lib/svs-calculator'
import type { SvsResult, ProOptions, StammdatenContext } from '@/lib/svs-calculator'
import { getTotalInvestments } from '@/lib/afa-calculator'
import type { TaxYear } from '@/lib/tax-constants'
import type { RechnerInput } from '@/lib/rechner-types'
import { BarChart3, ArrowUp, ArrowDown, Minus } from 'lucide-react'

interface JahresvergleichDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  gewinn: number
  vorschreibung: number
  input: RechnerInput
}

const YEARS: TaxYear[] = ['2024', '2025', '2026']

export function JahresvergleichDialog({ open, onOpenChange, gewinn, vorschreibung, input }: JahresvergleichDialogProps) {
  const results = useMemo(() => {
    const totalInvest = getTotalInvestments(input.investitionen)
    const proOptions: ProOptions = {
      kinderUnter18: input.proOptions.kinderUnter18,
      kinderUeber18: input.proOptions.kinderUeber18,
      alleinverdiener: input.proOptions.alleinverdiener,
      pendlerKm: input.proOptions.pendlerKm,
      pendlerOeffentlich: input.proOptions.pendlerOeffentlich,
      investitionen: totalInvest,
    }

    const stammdaten: StammdatenContext = {
      versicherungsart: input.stammdaten.versicherungsart,
      jungunternehmer: input.stammdaten.jungunternehmer,
      gruendungsJahr: input.stammdaten.gruendungsJahr,
    }

    const weitereEinkuenfte = (input.weitereEinkuenfte.bruttoEntgeltMonatlich > 0 || input.weitereEinkuenfte.vermietungsEinkuenfte > 0)
      ? input.weitereEinkuenfte
      : undefined

    return YEARS.map(year => ({
      year,
      result: calculateSvs(
        gewinn,
        vorschreibung,
        year,
        proOptions,
        stammdaten,
        weitereEinkuenfte,
      ),
    }))
  }, [gewinn, vorschreibung, input])

  // Find best/worst netto
  const nettoValues = results.map(r => r.result.echtesNetto)
  const bestNetto = Math.max(...nettoValues)

  const rows: { label: string; key: keyof SvsResult | 'nettoQuote'; format: (r: SvsResult) => string; highlight?: 'lower-is-better' | 'higher-is-better' }[] = [
    { label: 'SVS Gesamt', key: 'endgueltigeSVS', format: r => formatEuro(r.endgueltigeSVS), highlight: 'lower-is-better' },
    { label: 'Einkommensteuer', key: 'einkommensteuer', format: r => formatEuro(r.einkommensteuer), highlight: 'lower-is-better' },
    { label: 'Grenzsteuersatz', key: 'grenzsteuersatz', format: r => `${(r.grenzsteuersatz * 100).toFixed(0)}%` },
    { label: 'Echtes Netto', key: 'echtesNetto', format: r => formatEuro(r.echtesNetto), highlight: 'higher-is-better' },
    { label: 'Netto-Quote', key: 'nettoQuote', format: r => gewinn > 0 ? `${(r.echtesNetto / gewinn * 100).toFixed(1)}%` : '–', highlight: 'higher-is-better' },
    { label: 'Nachzahlung', key: 'nachzahlung', format: r => formatEuro(r.nachzahlung) },
  ]

  function getDelta(current: number, prev: number): { icon: React.ReactNode; text: string; color: string } | null {
    const diff = current - prev
    if (Math.abs(diff) < 1) return null
    const isPositive = diff > 0
    return {
      icon: isPositive ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />,
      text: formatEuro(Math.abs(diff)),
      color: isPositive ? 'text-emerald-600' : 'text-red-600',
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            Jahresvergleich
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <p className="text-xs text-muted-foreground">
            Gleicher Gewinn ({formatEuro(gewinn)}), verschiedene Steuerjahre — so ändern sich deine Abgaben.
          </p>

          {/* Vergleichstabelle */}
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground"></th>
                  {results.map(r => (
                    <th key={r.year} className={`text-right px-3 py-2.5 font-semibold ${r.year === input.year ? 'text-primary' : 'text-foreground'}`}>
                      {r.year}
                      {r.year === input.year && (
                        <span className="ml-1 text-[9px] font-normal text-primary/60">aktuell</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const values = results.map(r => {
                    if (row.key === 'nettoQuote') return r.result.echtesNetto
                    return r.result[row.key] as number
                  })
                  const min = Math.min(...values)
                  const max = Math.max(...values)

                  return (
                    <tr key={row.label} className="border-t">
                      <td className="px-3 py-2.5 font-medium text-muted-foreground text-xs">{row.label}</td>
                      {results.map((r) => {
                        const val = row.key === 'nettoQuote' ? r.result.echtesNetto : r.result[row.key] as number
                        const isBest = row.highlight === 'higher-is-better' ? val === max : row.highlight === 'lower-is-better' ? val === min : false
                        const isWorst = row.highlight === 'higher-is-better' ? val === min : row.highlight === 'lower-is-better' ? val === max : false

                        return (
                          <td key={r.year} className={`text-right px-3 py-2.5 font-mono text-xs ${isBest && min !== max ? 'text-emerald-600 font-semibold' : isWorst && min !== max ? 'text-red-600' : ''}`}>
                            {row.format(r.result)}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Netto-Vergleich visuell */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Netto-Vergleich</h4>
            <div className="space-y-2">
              {results.map(r => {
                const pct = bestNetto > 0 ? (r.result.echtesNetto / bestNetto) * 100 : 0
                const isBest = r.result.echtesNetto === bestNetto
                const delta = getDelta(r.result.echtesNetto, results.find(x => x.year === input.year)?.result.echtesNetto ?? 0)

                return (
                  <div key={r.year} className="flex items-center gap-3">
                    <span className={`text-xs font-semibold w-10 ${r.year === input.year ? 'text-primary' : 'text-muted-foreground'}`}>{r.year}</span>
                    <div className="flex-1 h-6 bg-muted/40 rounded-md overflow-hidden relative">
                      <div
                        className={`h-full rounded-md transition-all duration-500 ${isBest ? 'bg-emerald-500' : 'bg-primary/60'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-medium w-20 text-right">{formatEuro(r.result.echtesNetto)}</span>
                    {delta && r.year !== input.year && (
                      <span className={`flex items-center gap-0.5 text-[10px] font-mono ${delta.color} w-16`}>
                        {delta.icon} {delta.text}
                      </span>
                    )}
                    {r.year === input.year && (
                      <span className="w-16 text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <Minus className="h-2.5 w-2.5" /> aktuell
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Hinweis */}
          <p className="text-[11px] text-muted-foreground/70">
            Vergleich basiert auf identischem Gewinn mit den jeweiligen Steuertarifen und SVS-Sätzen pro Jahr.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
