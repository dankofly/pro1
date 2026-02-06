'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { calculateSvs, calculateSteuerTipps } from '@/lib/svs-calculator'
import { SVS } from '@/lib/svs-constants'
import { formatEuro } from '@/lib/format'
import Link from 'next/link'
import { SvsHeader } from '@/components/svs/header'
import { InputSection } from '@/components/svs/input-section'
import { DashboardCards } from '@/components/svs/dashboard-cards'
import { BeitragsDetails } from '@/components/svs/beitrags-details'
import { MonthlyOverview } from '@/components/svs/monthly-overview'
import { WahrheitsTabelle } from '@/components/svs/wahrheits-tabelle'
import { SteuerTipps } from '@/components/svs/steuer-tipps'
import { PremiumCTA } from '@/components/svs/premium-cta'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { toast } from 'sonner'
import { useSmartAlerts } from '@/hooks/use-smart-alerts'
import { useSubscription } from '@/hooks/use-subscription'
import { UpgradeDialog } from '@/components/svs/upgrade-dialog'
import type { User } from '@supabase/supabase-js'

export default function Home() {
  const [gewinn, setGewinn] = useState(40000)
  const [vorschreibung, setVorschreibung] = useState(450)
  const [user, setUser] = useState<User | null>(null)
  const [saving, setSaving] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState('')
  const [upgradeRequiredPlan, setUpgradeRequiredPlan] = useState<'basic' | 'pro'>('basic')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const subscription = useSubscription(user)

  const result = useMemo(() => calculateSvs(gewinn, vorschreibung), [gewinn, vorschreibung])
  const steuerTipps = useMemo(() => calculateSteuerTipps(gewinn, result.endgueltigeSVS), [gewinn, result.endgueltigeSVS])
  const { prefs: alertPrefs, isExceeded: alertActive, updatePrefs: updateAlertPrefs, requestNotificationPermission } = useSmartAlerts(result.nachzahlung)

  const handleImportGewinn = useCallback((value: number) => {
    setGewinn(Math.round(value))
    toast.success(`Gewinn von ${formatEuro(value)} uebernommen.`)
  }, [])

  const handleUpgradeRequired = useCallback((feature: string, plan: 'basic' | 'pro') => {
    setUpgradeFeature(feature)
    setUpgradeRequiredPlan(plan)
    setUpgradeOpen(true)
  }, [])

  const handleSave = useCallback(async () => {
    if (!user) {
      toast.error('Bitte melde dich an, um Berechnungen zu speichern.')
      return
    }
    if (subscription.isFree) {
      handleUpgradeRequired('Berechnungen speichern', 'basic')
      return
    }
    setSaving(true)
    try {
      const { error } = await supabase.from('calculations').insert({
        user_id: user.id,
        label: `Berechnung ${new Date().toLocaleDateString('de-AT')}`,
        jahresgewinn: gewinn,
        monatliche_vorschreibung: vorschreibung,
        beitragsgrundlage: result.beitragsgrundlage,
        endgueltige_svs: result.endgueltigeSVS,
        vorlaeufige_svs: result.vorlaeufigeSVS,
        nachzahlung: result.nachzahlung,
        spar_empfehlung: result.sparEmpfehlung,
        steuer_ersparnis: result.steuerErsparnis,
      })
      if (error) throw error
      toast.success('Berechnung gespeichert!')
    } catch {
      toast.error('Fehler beim Speichern. Bitte versuche es erneut.')
    } finally {
      setSaving(false)
    }
  }, [user, subscription.isFree, handleUpgradeRequired, gewinn, vorschreibung, result])

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    toast.success('Erfolgreich abgemeldet.')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <SvsHeader
        user={user ? { email: user.email ?? '' } : null}
        onSave={handleSave}
        onLogout={handleLogout}
        saving={saving}
        alertActive={alertActive}
        plan={subscription.plan}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <InputSection
          gewinn={gewinn}
          setGewinn={setGewinn}
          vorschreibung={vorschreibung}
          setVorschreibung={setVorschreibung}
        />

        {result.belowMinimum && (
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-800">
              <span className="font-medium">Unter der Geringfügigkeitsgrenze:</span>{' '}
              Bei einem Jahresgewinn unter {formatEuro(SVS.GERINGFUEGIGKEIT)} besteht keine Pflichtversicherung bei der SVS.
            </AlertDescription>
          </Alert>
        )}

        {!result.belowMinimum && (
          <>
            <WahrheitsTabelle gewinn={gewinn} result={result} />
            <SteuerTipps tipps={steuerTipps} gewinn={gewinn} />
            <DashboardCards result={result} vorschreibung={vorschreibung} />
            <BeitragsDetails result={result} />
            <MonthlyOverview result={result} vorschreibung={vorschreibung} />
          </>
        )}

        <PremiumCTA
          gewinn={gewinn}
          vorschreibung={vorschreibung}
          result={result}
          steuerTipps={steuerTipps}
          onImportGewinn={handleImportGewinn}
          alertPrefs={alertPrefs}
          alertActive={alertActive}
          updateAlertPrefs={updateAlertPrefs}
          requestNotificationPermission={requestNotificationPermission}
          subscription={subscription}
          onUpgradeRequired={handleUpgradeRequired}
        />

        <UpgradeDialog
          open={upgradeOpen}
          onOpenChange={setUpgradeOpen}
          feature={upgradeFeature}
          requiredPlan={upgradeRequiredPlan}
        />

        <footer className="text-center py-8 text-xs text-muted-foreground space-y-2">
          <p className="font-medium text-foreground/70">SVS Checker – Beitragsrechner für Selbständige in Österreich</p>
          <p>Alle Angaben ohne Gewähr. Kein Ersatz für professionelle Steuerberatung. Werte 2024/25.</p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <Link href="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
            <span>·</span>
            <Link href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
