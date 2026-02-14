'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'
import { ShieldCheck, CheckCircle, AlertTriangle, Info } from 'lucide-react'

interface SteuerreserveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  result: SvsResult
  vorschreibung: number
}

export function SteuerreserveDialog({ open, onOpenChange, result, vorschreibung }: SteuerreserveDialogProps) {
  const svsMonatlich = result.endgueltigeMonatlich
  const svsDifferenz = Math.max(svsMonatlich - vorschreibung, 0)
  const estMonatlich = result.einkommensteuer / 12
  const gesamtRuecklage = svsDifferenz + estMonatlich
  const sparEmpfehlung = result.sparEmpfehlung

  const isGutAufgestellt = result.nachzahlung <= 0
  const statusColor = isGutAufgestellt ? 'text-emerald-600' : 'text-red-600'
  const statusBg = isGutAufgestellt ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
  const statusLabel = isGutAufgestellt ? 'Auf Kurs' : 'Rücklage empfohlen'

  // 12-Monats-Timeline
  const months = Array.from({ length: 12 }, (_, i) => ({
    label: `M${i + 1}`,
    kumuliert: gesamtRuecklage * (i + 1),
  }))
  const maxKumuliert = months[11].kumuliert

  // Aufschlüsselung
  const svsAnteil = gesamtRuecklage > 0 ? (svsDifferenz / gesamtRuecklage) * 100 : 0
  const estAnteil = gesamtRuecklage > 0 ? (estMonatlich / gesamtRuecklage) * 100 : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            Steuerreserve-Status
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Status-Badge */}
          <div className={`rounded-xl p-4 text-center border ${statusBg}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {isGutAufgestellt ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <span className={`text-sm font-semibold ${statusColor}`}>{statusLabel}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Empfohlene monatliche Rücklage</p>
            <p className={`text-3xl font-bold font-mono ${gesamtRuecklage > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
              {formatEuro(sparEmpfehlung > 0 ? sparEmpfehlung : gesamtRuecklage)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">pro Monat auf ein separates Konto</p>
          </div>

          {/* Aufschlüsselung */}
          {gesamtRuecklage > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Aufschlüsselung</h4>

              {/* Stacked bar */}
              <div className="h-4 rounded-full overflow-hidden flex">
                {svsDifferenz > 0 && (
                  <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${svsAnteil}%` }} />
                )}
                {estMonatlich > 0 && (
                  <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${estAnteil}%` }} />
                )}
              </div>

              <div className="flex gap-4 mt-2">
                {svsDifferenz > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                    <span className="text-xs text-muted-foreground">SVS-Differenz: <span className="font-mono font-medium text-foreground">{formatEuro(svsDifferenz)}</span></span>
                  </div>
                )}
                {estMonatlich > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-xs text-muted-foreground">ESt-Anteil: <span className="font-mono font-medium text-foreground">{formatEuro(estMonatlich)}</span></span>
                  </div>
                )}
              </div>

              {/* Detail-Tabelle */}
              <div className="rounded-lg border overflow-hidden mt-3">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2 text-muted-foreground">SVS endgültig (monatl.)</td>
                      <td className="text-right px-3 py-2 font-mono">{formatEuro(svsMonatlich)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-3 py-2 text-muted-foreground">Aktuelle Vorschreibung</td>
                      <td className="text-right px-3 py-2 font-mono">− {formatEuro(vorschreibung)}</td>
                    </tr>
                    <tr className="border-b bg-muted/20">
                      <td className="px-3 py-2 font-medium">SVS-Differenz</td>
                      <td className="text-right px-3 py-2 font-mono font-medium text-orange-600">{formatEuro(svsDifferenz)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-3 py-2 text-muted-foreground">ESt (monatl. Äquivalent)</td>
                      <td className="text-right px-3 py-2 font-mono">{formatEuro(estMonatlich)}</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="px-3 py-2 font-semibold">Gesamt pro Monat</td>
                      <td className="text-right px-3 py-2 font-mono font-bold text-primary">{formatEuro(gesamtRuecklage)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 12-Monats-Timeline */}
          {gesamtRuecklage > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">12-Monats-Rücklagen-Aufbau</h4>
              <div className="flex items-end gap-1 h-24">
                {months.map(m => {
                  const heightPct = maxKumuliert > 0 ? (m.kumuliert / maxKumuliert) * 100 : 0
                  return (
                    <div key={m.label} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full relative" style={{ height: '80px' }}>
                        <div
                          className="absolute bottom-0 w-full bg-primary/20 rounded-t-sm transition-all duration-300"
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-muted-foreground">{m.label}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-muted-foreground font-mono">{formatEuro(gesamtRuecklage)}</span>
                <span className="text-[10px] text-primary font-mono font-semibold">{formatEuro(maxKumuliert)}</span>
              </div>
            </div>
          )}

          {/* Formel-Erklärung */}
          <div className="rounded-lg bg-muted/30 border border-border/50 p-3">
            <div className="flex items-start gap-2">
              <Info className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground mb-1">So berechnen wir die Empfehlung:</p>
                <p>
                  Die monatliche Rücklage setzt sich zusammen aus der Differenz zwischen deiner aktuellen SVS-Vorschreibung und der berechneten endgültigen Belastung, plus einem Zwölftel der geschätzten Einkommensteuer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
