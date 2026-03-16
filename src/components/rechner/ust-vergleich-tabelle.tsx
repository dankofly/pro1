'use client'

import { formatEuro } from '@/lib/format'
import type { UstResult } from '@/lib/rechner-types'
import { Badge } from '@/components/ui/badge'
import { Receipt, ThumbsUp, ThumbsDown, Lightbulb, AlertTriangle } from 'lucide-react'

interface UstVergleichTabelleProps {
  ustResult: UstResult
}

export function UstVergleichTabelle({ ustResult }: UstVergleichTabelleProps) {
  const effektivKur = ustResult.kurNetto - ustResult.kurVorsteuerVerlust

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-blue-600" />
          <h3 className="text-base font-semibold">KUR vs. Regelbesteuerung</h3>
        </div>
        <Badge
          variant="outline"
          className={ustResult.kurVorteilhaft
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-blue-50 text-blue-700 border-blue-200'
          }
        >
          {ustResult.kurVorteilhaft ? (
            <><ThumbsUp className="h-3 w-3 mr-1" /> KUR vorteilhaft</>
          ) : (
            <><ThumbsDown className="h-3 w-3 mr-1" /> Regel vorteilhaft</>
          )}
        </Badge>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full text-sm min-w-[380px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium text-muted-foreground">Posten</th>
              <th className="text-right py-2 font-medium text-muted-foreground">KUR</th>
              <th className="text-right py-2 font-medium text-muted-foreground">Regel</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-2.5">Umsatz netto</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(ustResult.kurNetto)}</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(ustResult.kurNetto)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-emerald-600">+ USt kassiert</td>
              <td className="py-2.5 text-right font-mono">–</td>
              <td className="py-2.5 text-right font-mono text-emerald-600">{formatEuro(ustResult.ustEinnahmen)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600">- Vorsteuer verloren</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(ustResult.kurVorsteuerVerlust)}</td>
              <td className="py-2.5 text-right font-mono">–</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600">- USt Zahllast</td>
              <td className="py-2.5 text-right font-mono">–</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(ustResult.ustZahllast)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-emerald-600">+ Vorsteuer zurück</td>
              <td className="py-2.5 text-right font-mono">–</td>
              <td className="py-2.5 text-right font-mono text-emerald-600">{formatEuro(ustResult.vorsteuerAbzug)}</td>
            </tr>
            <tr className="font-bold border-t-2 border-border">
              <td className="py-2.5">Effektiv netto</td>
              <td className="py-2.5 text-right font-mono text-emerald-600">{formatEuro(effektivKur)}</td>
              <td className="py-2.5 text-right font-mono text-emerald-600">{formatEuro(ustResult.regelNetto)}</td>
            </tr>
            <tr>
              <td className="py-2.5 font-medium">Differenz</td>
              <td className="py-2.5 text-right font-mono" colSpan={2}>
                <span className={ustResult.vorteilKur > 0 ? 'text-emerald-600' : 'text-red-600'}>
                  {ustResult.vorteilKur > 0 ? '+' : ''}{formatEuro(ustResult.vorteilKur)}
                </span>
                <span className="text-muted-foreground ml-1">
                  {ustResult.kurVorteilhaft ? 'für KUR' : 'für Regel'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Empfehlung Box */}
      <div className={`rounded-lg p-3 text-center ${
        ustResult.empfehlung === 'kur'
          ? 'bg-emerald-500/10'
          : 'bg-blue-500/10'
      }`}>
        <div className="flex items-center justify-center gap-1.5">
          <Lightbulb className={`h-4 w-4 ${
            ustResult.empfehlung === 'kur' ? 'text-emerald-600' : 'text-blue-600'
          }`} />
          <span className={`font-bold text-sm ${
            ustResult.empfehlung === 'kur' ? 'text-emerald-700' : 'text-blue-700'
          }`}>
            Empfehlung: {ustResult.empfehlung === 'kur' ? 'KUR' : 'Regelbesteuerung'}
          </span>
        </div>
        <p className={`text-xs mt-1 ${
          ustResult.empfehlung === 'kur' ? 'text-emerald-600' : 'text-blue-600'
        }`}>
          {ustResult.empfehlungGrund}
        </p>
      </div>

      {/* USt-Zahllast für Rücklagen */}
      {ustResult.ustZahllast > 0 && (
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-sm text-muted-foreground">
            USt-Zahllast: {formatEuro(ustResult.zahllastMonatlich)}/Monat bzw. {formatEuro(ustResult.zahllastQuartal)}/Quartal
          </p>
        </div>
      )}

      {/* Toleranz-Warnung */}
      {ustResult.kurToleranz && (
        <div className="rounded-lg bg-amber-500/10 border border-amber-200 p-3 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700">
            Dein Umsatz liegt in der Toleranzzone (€55.000–€60.500). KUR bleibt einmalig gültig.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground">
        Vereinfachte Berechnung. USt ist ein durchlaufender Posten und beeinflusst nicht direkt den Gewinn für SVS/ESt.
      </p>
    </div>
  )
}
