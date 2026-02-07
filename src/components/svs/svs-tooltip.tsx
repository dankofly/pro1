'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Info } from 'lucide-react'

const definitions: Record<string, string> = {
  Beitragsgrundlage:
    'Die Beitragsgrundlage ist der Betrag, auf den Ihre SVS-Beiträge berechnet werden. Sie basiert auf Ihrem Gewinn laut Einkommensteuerbescheid.',
  Nachzahlungsfalle:
    'Die SVS berechnet Ihre Beiträge zunächst auf Basis alter Einkünfte (vorläufig). Steigt Ihr Gewinn, kommt es nach dem Steuerbescheid zu einer oft hohen Nachzahlung.',
  'Höchstbeitragsgrundlage':
    'Der maximale Betrag (EUR 84.840/Jahr), auf den SVS-Beiträge berechnet werden. Einkommen darüber ist beitragsfrei.',
  'Geringfügigkeitsgrenze':
    'Unter EUR 6.221,28 Jahresgewinn sind Sie von der Pflichtversicherung bei der SVS ausgenommen.',
  'Vorläufige Beitragsgrundlage':
    'Die SVS schreibt Ihnen zunächst Beiträge auf Basis Ihres Gewinns vor 3 Jahren vor. Diese werden nach dem Steuerbescheid nachträglich korrigiert.',
  'Endgültige Beitragsgrundlage':
    'Die tatsächliche Berechnungsbasis nach Vorliegen des Einkommensteuerbescheids. Die Differenz zur vorläufigen führt zu Nach- oder Rückzahlungen.',
  'Selbständigenvorsorge':
    'Die Mitarbeitervorsorge für Selbständige (1,53%) – ein Pendant zur Abfertigung Neu. Das Geld fließt in eine Vorsorgekasse.',
}

interface SvsTooltipProps {
  term: string
  children?: React.ReactNode
}

export function SvsTooltip({ term, children }: SvsTooltipProps) {
  const content = children || definitions[term] || term

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 border-b border-dashed border-blue-400 text-blue-600 font-medium cursor-pointer hover:text-blue-700 active:text-blue-800 transition-colors"
        >
          {term}
          <Info className="h-3.5 w-3.5 text-blue-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="max-w-[280px] bg-slate-800 text-white border-slate-700 text-xs leading-relaxed px-3 py-2"
      >
        <p>{content}</p>
      </PopoverContent>
    </Popover>
  )
}
