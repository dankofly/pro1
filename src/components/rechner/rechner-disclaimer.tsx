import { Info } from 'lucide-react'

interface RechnerDisclaimerProps {
  vereinfachungen?: string[]
}

const DEFAULT_VEREINFACHUNGEN = [
  'Keine Sonderausgaben (Kirchenbeitrag, Spenden, bestimmte Versicherungen)',
  'Kein Verlustausgleich oder Verlustvortrag aus Vorjahren',
  'Keine Vorauszahlungs-Anpassung im Folgejahr',
  'Keine außergewöhnlichen Belastungen',
]

export function RechnerDisclaimer({ vereinfachungen }: RechnerDisclaimerProps) {
  const items = vereinfachungen ?? DEFAULT_VEREINFACHUNGEN

  return (
    <div className="flex gap-3 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/30 border-l-[3px] border-l-blue-500 rounded-lg p-4 shadow-sm">
      <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
      <div className="text-sm text-foreground space-y-1">
        <p className="font-medium">Vereinfachungen in dieser Berechnung</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground pt-1">
          Abweichungen von ±5–10% zum tatsächlichen Steuerbescheid sind möglich.
        </p>
      </div>
    </div>
  )
}
