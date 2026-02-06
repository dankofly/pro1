'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Building2, FileDown, BellRing } from 'lucide-react'
import { PdfExportButton } from './pdf-export-button'
import { BankImportDialog } from './bank-import-dialog'
import { AlertSettingsDialog } from './alert-settings-dialog'
import type { SvsResult, SteuerTipp } from '@/lib/svs-calculator'
import type { AlertPreferences } from '@/hooks/use-smart-alerts'
import type { SubscriptionInfo } from '@/hooks/use-subscription'
import { Lock } from 'lucide-react'

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

  return (
    <>
      <div className="gold-glow glass-dark rounded-2xl overflow-hidden relative text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative p-6 sm:p-8">
          <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5" />
            SVS Checker Pro
          </Badge>

          <h3 className="text-xl sm:text-2xl font-bold mb-2">Deine Pro-Werkzeuge</h3>
          <p className="text-white/60 text-sm mb-6 max-w-md">
            Bank-Anbindung, PDF-Berichte und Smart Alerts -- alles was du brauchst.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {/* Bank-Anbindung */}
            <button
              onClick={() => locked ? onUpgradeRequired('Bank-Anbindung', 'pro') : setBankOpen(true)}
              className="glass-dark rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all duration-300 text-left relative group"
            >
              {locked && (
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5 rounded-xl z-10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-white/50" />
                </div>
              )}
              <Building2 className="h-5 w-5 mb-2 text-blue-300" />
              <div className="font-semibold text-sm">Bank-Anbindung</div>
              <div className="text-white/50 text-xs mb-3">CSV-Import deiner Kontoauszuege</div>
              <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-md">
                {locked ? 'Pro Feature' : 'CSV importieren'}
              </span>
            </button>

            {/* PDF-Export */}
            <button
              onClick={() => locked ? onUpgradeRequired('PDF-Export', 'pro') : undefined}
              className="glass-dark rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all duration-300 text-left relative group"
            >
              {locked && (
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5 rounded-xl z-10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-white/50" />
                </div>
              )}
              <FileDown className="h-5 w-5 mb-2 text-blue-300" />
              <div className="font-semibold text-sm">PDF-Export</div>
              <div className="text-white/50 text-xs mb-3">Berichte fuer deinen Steuerberater</div>
              {locked ? (
                <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-md">Pro Feature</span>
              ) : (
                <PdfExportButton
                  gewinn={gewinn}
                  vorschreibung={vorschreibung}
                  result={result}
                  steuerTipps={steuerTipps}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white hover:bg-white/10 h-auto px-2 py-1 text-xs font-medium bg-white/10"
                />
              )}
            </button>

            {/* Smart Alerts */}
            <button
              onClick={() => locked ? onUpgradeRequired('Smart Alerts', 'pro') : setAlertOpen(true)}
              className="glass-dark rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all duration-300 text-left relative group"
            >
              {locked && (
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5 rounded-xl z-10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-white/50" />
                </div>
              )}
              {!locked && alertActive && (
                <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
              )}
              <BellRing className="h-5 w-5 mb-2 text-blue-300" />
              <div className="font-semibold text-sm">Smart Alerts</div>
              <div className="text-white/50 text-xs mb-3">Nachzahlungs-Warnungen</div>
              <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-md">
                {locked ? 'Pro Feature' : alertPrefs.enabled ? 'Einstellungen' : 'Aktivieren'}
              </span>
            </button>
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
