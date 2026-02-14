'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'
import { TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface NachzahlungsPrognoseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  result: SvsResult
  vorschreibung: number
}

export function NachzahlungsPrognoseDialog({ open, onOpenChange, result, vorschreibung }: NachzahlungsPrognoseDialogProps) {
  const nachzahlung = result.nachzahlung
  const isNachzahlung = nachzahlung > 0
  const isGutschrift = nachzahlung < 0
  const monatlicheDifferenz = result.endgueltigeMonatlich - vorschreibung

  // Quartals-Akkumulation
  const quartale = [1, 2, 3, 4].map(q => ({
    label: `Q${q}`,
    monate: `${(q - 1) * 3 + 1}–${q * 3}`,
    kumuliert: monatlicheDifferenz * q * 3,
  }))

  // Risiko-Level
  const riskLevel = result.riskPercent >= 70
    ? { label: 'Hohes Risiko', color: 'text-red-600', bg: 'bg-red-500', barColor: 'bg-red-500' }
    : result.riskPercent >= 40
      ? { label: 'Mittleres Risiko', color: 'text-amber-600', bg: 'bg-amber-500', barColor: 'bg-amber-500' }
      : { label: 'Niedriges Risiko', color: 'text-emerald-600', bg: 'bg-emerald-500', barColor: 'bg-emerald-500' }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            Nachzahlungs-Prognose
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Hero: Nachzahlung/Gutschrift */}
          <div className={`rounded-xl p-4 text-center ${isNachzahlung ? 'bg-red-50 border border-red-200' : isGutschrift ? 'bg-emerald-50 border border-emerald-200' : 'bg-muted/30 border border-border'}`}>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {isNachzahlung ? 'Geschätzte Nachzahlung' : isGutschrift ? 'Voraussichtliche Gutschrift' : 'Keine Nachzahlung'}
            </p>
            <p className={`text-3xl font-bold font-mono ${isNachzahlung ? 'text-red-600' : isGutschrift ? 'text-emerald-600' : 'text-muted-foreground'}`}>
              {formatEuro(Math.abs(nachzahlung))}
            </p>
          </div>

          {/* Vergleichstabelle */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Vorschreibung vs. Endgültig</h4>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground"></th>
                    <th className="text-right px-3 py-2 font-medium text-muted-foreground">Monatlich</th>
                    <th className="text-right px-3 py-2 font-medium text-muted-foreground">Jährlich</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-3 py-2 font-medium">Vorläufig (aktuell)</td>
                    <td className="text-right px-3 py-2 font-mono">{formatEuro(vorschreibung)}</td>
                    <td className="text-right px-3 py-2 font-mono">{formatEuro(vorschreibung * 12)}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-3 py-2 font-medium">Endgültig (berechnet)</td>
                    <td className="text-right px-3 py-2 font-mono">{formatEuro(result.endgueltigeMonatlich)}</td>
                    <td className="text-right px-3 py-2 font-mono">{formatEuro(result.endgueltigeSVS)}</td>
                  </tr>
                  <tr className={`border-t font-bold ${isNachzahlung ? 'bg-red-50' : isGutschrift ? 'bg-emerald-50' : ''}`}>
                    <td className="px-3 py-2">Differenz</td>
                    <td className={`text-right px-3 py-2 font-mono ${isNachzahlung ? 'text-red-600' : isGutschrift ? 'text-emerald-600' : ''}`}>
                      {monatlicheDifferenz > 0 ? '+' : ''}{formatEuro(monatlicheDifferenz)}
                    </td>
                    <td className={`text-right px-3 py-2 font-mono ${isNachzahlung ? 'text-red-600' : isGutschrift ? 'text-emerald-600' : ''}`}>
                      {nachzahlung > 0 ? '+' : ''}{formatEuro(nachzahlung)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quartals-Akkumulation */}
          {isNachzahlung && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quartalsweise Akkumulation</h4>
              <div className="grid grid-cols-4 gap-2">
                {quartale.map(q => (
                  <div key={q.label} className="rounded-lg border p-2 text-center">
                    <p className="text-xs font-semibold text-muted-foreground">{q.label}</p>
                    <p className="text-[10px] text-muted-foreground/60">Mo. {q.monate}</p>
                    <p className={`text-sm font-bold font-mono mt-1 ${q.kumuliert > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {q.kumuliert > 0 ? '+' : ''}{formatEuro(q.kumuliert)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risikobarometer */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Risikobewertung</h4>
              <span className={`text-xs font-semibold ${riskLevel.color}`}>{riskLevel.label}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${riskLevel.barColor} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(result.riskPercent, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">0%</span>
              <span className="text-[10px] text-muted-foreground">100%</span>
            </div>
          </div>

          {/* Handlungsempfehlung */}
          <div className={`rounded-lg p-3 flex gap-2.5 ${isNachzahlung ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'}`}>
            {isNachzahlung ? (
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs leading-relaxed">
              {isNachzahlung ? (
                <>
                  <p className="font-semibold text-amber-800 mb-1">Handlungsempfehlung</p>
                  <p className="text-amber-700">
                    Lege monatlich <span className="font-bold font-mono">{formatEuro(result.sparEmpfehlung)}</span> auf ein separates Konto, um die erwartete Nachzahlung von {formatEuro(nachzahlung)} stressfrei zu decken.
                  </p>
                </>
              ) : isGutschrift ? (
                <>
                  <p className="font-semibold text-emerald-800 mb-1">Alles im grünen Bereich</p>
                  <p className="text-emerald-700">
                    Du zahlst aktuell mehr als nötig. Die SVS wird dir voraussichtlich {formatEuro(Math.abs(nachzahlung))} gutschreiben.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-emerald-800 mb-1">Perfekt aufgestellt</p>
                  <p className="text-emerald-700">
                    Deine aktuelle Vorschreibung entspricht der berechneten endgültigen Belastung. Keine Nachzahlung erwartet.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 text-[11px] text-muted-foreground/70">
            <Info className="h-3 w-3 shrink-0 mt-0.5" />
            <p>Prognose basiert auf den eingegebenen Werten. Die tatsächliche Nachzahlung kann abweichen.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
