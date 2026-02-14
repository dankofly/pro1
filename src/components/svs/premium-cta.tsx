'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { FileText, TrendingUp, BarChart3, Sparkles, Download, ShieldCheck, Lock } from 'lucide-react'
import { PdfExportButton } from './pdf-export-button'
import { NachzahlungsPrognoseDialog } from '@/components/rechner/nachzahlungs-prognose-dialog'
import { JahresvergleichDialog } from '@/components/rechner/jahresvergleich-dialog'
import { AiZusammenfassungDialog } from '@/components/rechner/ai-zusammenfassung-dialog'
import { SteuerreserveDialog } from '@/components/rechner/steuerreserve-dialog'
import { generateCsvExport } from '@/lib/csv-export'
import type { SvsResult, SteuerTipp } from '@/lib/svs-calculator'
import type { RechnerInput, RechnerResult } from '@/lib/rechner-types'
import type { SubscriptionInfo } from '@/hooks/use-subscription'
import { toast } from 'sonner'

interface PremiumCTAProps {
  gewinn: number
  umsatz: number
  aufwaende: number
  vorschreibung: number
  result: SvsResult
  steuerTipps: SteuerTipp
  input: RechnerInput
  rechnerResult: RechnerResult
  subscription: SubscriptionInfo
  onUpgradeRequired: (feature: string, plan: 'basic' | 'pro') => void
}

export function PremiumCTA({
  gewinn,
  umsatz,
  aufwaende,
  vorschreibung,
  result,
  steuerTipps,
  input,
  rechnerResult,
  subscription,
  onUpgradeRequired,
}: PremiumCTAProps) {
  const [prognoseOpen, setPrognoseOpen] = useState(false)
  const [vergleichOpen, setVergleichOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [reserveOpen, setReserveOpen] = useState(false)
  const locked = !subscription.isPro

  const handleCsvExport = () => {
    try {
      generateCsvExport({ gewinn, umsatz, aufwaende, vorschreibung, result })
      toast.success('CSV-Export erfolgreich heruntergeladen')
    } catch {
      toast.error('CSV-Export fehlgeschlagen')
    }
  }

  const tools = [
    {
      icon: <FileText className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Steuerberater-Report',
      desc: 'Kompakte Zusammenfassung deiner SVS-, Steuer- und Prognosedaten, vorbereitet für die Weitergabe an deinen Steuerberater.',
      button: 'PDF exportieren',
      isPdf: true,
    },
    {
      icon: <TrendingUp className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Nachzahlungs-Prognose',
      desc: 'Detaillierte Einschätzung möglicher SVS- und Steuer-Nachforderungen inklusive Risikobewertung.',
      button: 'Prognose anzeigen',
      action: () => setPrognoseOpen(true),
    },
    {
      icon: <BarChart3 className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Jahresvergleich',
      desc: 'Vergleiche Vorjahr, aktuelles Jahr und Prognose. Erkenne Trends in Steuerlast und Nettoentwicklung.',
      button: 'Vergleich anzeigen',
      action: () => setVergleichOpen(true),
    },
    {
      icon: <Sparkles className="h-4 w-4 mb-2 text-white/60" />,
      title: 'AI Zusammenfassung',
      desc: 'Automatische Analyse deiner Zahlen in Klartext, inklusive Hinweise zu Risiken und Steuerentwicklung.',
      button: 'Zusammenfassung generieren',
      action: () => setAiOpen(true),
    },
    {
      icon: <Download className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Datenexport',
      desc: 'Exportiere deine Berechnungen als CSV zur Weiterverarbeitung in Excel oder Controlling-Tools.',
      button: 'CSV exportieren',
      action: handleCsvExport,
    },
    {
      icon: <ShieldCheck className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Steuerreserve-Status',
      desc: 'Dokumentiere empfohlene und tatsächliche Rücklagen. Behalte deine Steuerliquidität im Blick.',
      button: 'Status anzeigen',
      action: () => setReserveOpen(true),
    },
  ]

  return (
    <>
      <div className="card-surface-dark rounded-xl overflow-hidden relative text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative p-6 sm:p-8">
          <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5" />
            SteuerBoard Pro
          </Badge>

          <h3 className="text-xl sm:text-2xl font-bold mb-2">Deine Pro-Werkzeuge</h3>
          <p className="text-white/60 text-sm mb-6 max-w-md">
            Strukturierte Reports, Prognosen und Datenexports, für volle Kontrolle über deine Steuerlage.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map((tool) => (
              <button
                key={tool.title}
                onClick={() => locked ? onUpgradeRequired(tool.title, 'pro') : tool.action?.()}
                className="rounded-lg p-4 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 text-left relative group"
              >
                {locked && (
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5 rounded-lg z-10 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-white/50" />
                  </div>
                )}
                {tool.icon}
                <div className="font-semibold text-sm">{tool.title}</div>
                <div className="text-white/50 text-xs mb-3">{tool.desc}</div>
                {tool.isPdf && !locked ? (
                  <PdfExportButton
                    gewinn={gewinn}
                    vorschreibung={vorschreibung}
                    result={result}
                    steuerTipps={steuerTipps}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/10 h-auto px-2 py-1 text-xs font-medium bg-white/10"
                  />
                ) : (
                  <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-md">
                    {locked ? 'Pro Feature' : tool.button}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <NachzahlungsPrognoseDialog
        open={prognoseOpen}
        onOpenChange={setPrognoseOpen}
        result={result}
        vorschreibung={vorschreibung}
      />

      <JahresvergleichDialog
        open={vergleichOpen}
        onOpenChange={setVergleichOpen}
        gewinn={gewinn}
        vorschreibung={vorschreibung}
        input={input}
      />

      <AiZusammenfassungDialog
        open={aiOpen}
        onOpenChange={setAiOpen}
        input={input}
        result={rechnerResult}
      />

      <SteuerreserveDialog
        open={reserveOpen}
        onOpenChange={setReserveOpen}
        result={result}
        vorschreibung={vorschreibung}
      />
    </>
  )
}
