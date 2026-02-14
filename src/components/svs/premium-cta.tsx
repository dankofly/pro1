'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { FileText, TrendingUp, BarChart3, Sparkles, Download, ShieldCheck, Lock } from 'lucide-react'
import { PdfExportButton } from './pdf-export-button'
import { BankImportDialog } from './bank-import-dialog'
import { AlertSettingsDialog } from './alert-settings-dialog'
import type { SvsResult, SteuerTipp } from '@/lib/svs-calculator'
import type { AlertPreferences } from '@/hooks/use-smart-alerts'
import type { SubscriptionInfo } from '@/hooks/use-subscription'

interface PremiumCTAProps {
  gewinn: number
  vorschreibung: number
  result: SvsResult
  steuerTipps: SteuerTipp
  onImportGewinn: (gewinn: number) => void
  alertPrefs: AlertPreferences
  alertActive: boolean
  updateAlertPrefs: (updates: Partial<AlertPreferences>) => void
  requestNotificationPermission: () => Promise<boolean>
  subscription: SubscriptionInfo
  onUpgradeRequired: (feature: string, plan: 'basic' | 'pro') => void
}

export function PremiumCTA({
  gewinn,
  vorschreibung,
  result,
  steuerTipps,
  onImportGewinn,
  alertPrefs,
  alertActive,
  updateAlertPrefs,
  requestNotificationPermission,
  subscription,
  onUpgradeRequired,
}: PremiumCTAProps) {
  const [bankOpen, setBankOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const locked = !subscription.isPro

  const tools = [
    {
      icon: <FileText className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Steuerberater-Report',
      desc: 'Kompakte Zusammenfassung deiner SVS-, Steuer- und Prognosedaten, vorbereitet für die Weitergabe an deinen Steuerberater.',
      button: 'Report erstellen',
      isPdf: true,
    },
    {
      icon: <TrendingUp className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Nachzahlungs-Prognose',
      desc: 'Detaillierte Einschätzung möglicher SVS- und Steuer-Nachforderungen inklusive Risikobewertung.',
      button: 'Prognose exportieren',
    },
    {
      icon: <BarChart3 className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Jahresvergleich',
      desc: 'Vergleiche Vorjahr, aktuelles Jahr und Prognose. Erkenne Trends in Steuerlast und Nettoentwicklung.',
      button: 'Vergleich anzeigen',
    },
    {
      icon: <Sparkles className="h-4 w-4 mb-2 text-white/60" />,
      title: 'AI Zusammenfassung',
      desc: 'Automatische Analyse deiner Zahlen in Klartext, inklusive Hinweise zu Risiken und Steuerentwicklung.',
      button: 'Zusammenfassung generieren',
    },
    {
      icon: <Download className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Datenexport',
      desc: 'Exportiere deine Berechnungen als CSV zur Weiterverarbeitung in Excel oder Controlling-Tools.',
      button: 'CSV exportieren',
    },
    {
      icon: <ShieldCheck className="h-4 w-4 mb-2 text-white/60" />,
      title: 'Steuerreserve-Status',
      desc: 'Dokumentiere empfohlene und tatsächliche Rücklagen. Behalte deine Steuerliquidität im Blick.',
      button: 'Status anzeigen',
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
                onClick={() => locked ? onUpgradeRequired(tool.title, 'pro') : undefined}
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

      <BankImportDialog
        open={bankOpen}
        onOpenChange={setBankOpen}
        onImport={onImportGewinn}
      />

      <AlertSettingsDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        prefs={alertPrefs}
        updatePrefs={updateAlertPrefs}
        requestNotificationPermission={requestNotificationPermission}
        currentNachzahlung={result.nachzahlung}
      />
    </>
  )
}
