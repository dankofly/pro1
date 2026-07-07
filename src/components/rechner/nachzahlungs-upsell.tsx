'use client'

// Ergebnis-Upsell am Nachzahlungs-Moment.
// Funnel-Logik (Tripwire-first): Free-Nutzer sehen zuerst das 49-€-Sofortprodukt
// (PDF-Rücklagenplan), das ihr akutes Problem abschließt; das Abo ist Sekundär-CTA.
// Basic-Nutzer bekommen weiter den Pro-Upgrade-Pitch.
// Neuro-Logik bleibt: Balance-Motiv (Sicherheit, Kontrolle), die eigene Zahl des
// Nutzers als Pattern-Interrupt, Preis gegen die Nachzahlung geankert.
// Dismiss wird 7 Tage respektiert (localStorage).

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatEuro, formatEuroShort } from '@/lib/format'
import { ShieldCheck, ArrowRight, X, FileDown, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { SvsResult } from '@/lib/svs-calculator'
import type { RuecklagenResult } from '@/lib/rechner-types'
import type { SubscriptionInfo } from '@/hooks/use-subscription'
import type { RuecklagenplanPayload } from '@/lib/ruecklagenplan'

const DISMISS_KEY = 'nachzahlungs_upsell_dismissed_at'
const DISMISS_DAYS = 7

function isDismissed(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    if (!raw) return false
    const ts = parseInt(raw, 10)
    return Number.isFinite(ts) && Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

interface NachzahlungsUpsellProps {
  svs: SvsResult
  gewinn: number
  /** Monatliche vorläufige SVS-Vorschreibung */
  vorschreibung: number
  ruecklagen: RuecklagenResult
  year: number
  subscription: SubscriptionInfo
}

export function NachzahlungsUpsell({ svs, gewinn, vorschreibung, ruecklagen, year, subscription }: NachzahlungsUpsellProps) {
  const [visible, setVisible] = useState(false)
  const [buying, setBuying] = useState(false)

  useEffect(() => {
    setVisible(!isDismissed())
  }, [])

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      // localStorage nicht verfügbar: nur für diese Session ausblenden
    }
    setVisible(false)
  }, [])

  const handleBuyPdf = useCallback(async () => {
    setBuying(true)
    try {
      const payload: RuecklagenplanPayload = {
        g: gewinn,
        vs: vorschreibung * 12,
        se: svs.endgueltigeSVS,
        sv: svs.vorlaeufigeSVS,
        nz: svs.nachzahlung,
        est: svs.einkommensteuer,
        net: svs.echtesNetto,
        rs: ruecklagen.svsMonatlich,
        re: ruecklagen.estMonatlich,
        rg: ruecklagen.gesamtMonatlich,
        y: year,
      }
      const res = await fetch('/api/stripe/checkout-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.url) {
        toast.error(data.error ?? 'Checkout konnte nicht gestartet werden. Bitte versuche es erneut.')
        return
      }
      window.location.href = data.url
    } catch {
      toast.error('Checkout konnte nicht gestartet werden. Bitte versuche es erneut.')
    } finally {
      setBuying(false)
    }
  }, [gewinn, vorschreibung, svs, ruecklagen, year])

  // Pro-Nutzer haben alles
  if (subscription.isPro || !visible) return null

  const monatlicheRuecklage = ruecklagen.gesamtMonatlich
  const hatNachzahlung = vorschreibung > 0 && svs.nachzahlung > 500
  const hatRuecklagenBedarf = vorschreibung <= 0 && monatlicheRuecklage > 150

  if (!hatNachzahlung && !hatRuecklagenBedarf) return null

  const istBasic = subscription.isBasic

  // ── Basic-Nutzer: bestehender Pro-Upgrade-Pitch ──
  if (istBasic) {
    const jahresPreis = 239
    const bezugswert = hatNachzahlung ? svs.nachzahlung : monatlicheRuecklage * 12
    const anteilProzent = bezugswert > 0 ? (jahresPreis / bezugswert) * 100 : 100
    const zeigeAnteil = anteilProzent < 10

    return (
      <section
        aria-label="Absicherung für deine Steuerplanung"
        className="relative rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 bg-emerald-50/60 dark:bg-emerald-950/20 p-5 sm:p-6"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Hinweis für 7 Tage ausblenden"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 mt-0.5">
            <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          </div>

          <div className="min-w-0 pr-8">
            {hatNachzahlung ? (
              <>
                <h3 className="text-base font-semibold text-foreground">
                  {formatEuroShort(Math.round(svs.nachzahlung))} voraussichtliche Nachzahlung.
                  Genau hier machen die meisten weiter wie bisher.
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Du kennst deine Zahl jetzt. SteuerBoard Pro hält sie im Blick:
                  Berechnung speichern, Rücklage {formatEuro(svs.sparEmpfehlung)}/Monat
                  mitverfolgen und rechtzeitig wissen, wenn sich deine Werte ändern.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold text-foreground">
                  {formatEuro(monatlicheRuecklage)}/Monat solltest du für SVS und Steuer zurücklegen.
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Wer diese Zahl Monat für Monat im Blick behält, wird vom Bescheid
                  nicht überrascht. SteuerBoard Pro speichert deine Berechnung,
                  zeigt deinen Verlauf und rechnet mit, sobald sich deine Werte ändern.
                </p>
              </>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
              <Button asChild className="gap-1.5">
                <Link href="/pricing">
                  Jetzt absichern
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <div className="text-xs text-muted-foreground leading-snug">
                <span className="font-semibold text-foreground">{jahresPreis} € im Jahr</span>
                {' '}(entspricht 19,92 €/Monat, inkl. USt)
                {zeigeAnteil && (
                  <> · weniger als {Math.max(1, Math.ceil(anteilProzent))} % {hatNachzahlung ? 'deiner erwarteten Nachzahlung' : 'deiner Jahres-Rücklage'}</>
                )}
                <br />
                Als Betriebsausgabe in der Regel steuerlich absetzbar. Auch monatlich buchbar.
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Free-Nutzer: Tripwire-first (49 € PDF-Rücklagenplan) ──
  return (
    <section
      aria-label="Dein persönlicher Rücklagenplan"
      className="relative rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 bg-emerald-50/60 dark:bg-emerald-950/20 p-5 sm:p-6"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Hinweis für 7 Tage ausblenden"
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 mt-0.5">
          <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        </div>

        <div className="min-w-0 pr-8">
          {hatNachzahlung ? (
            <h3 className="text-base font-semibold text-foreground">
              {formatEuroShort(Math.round(svs.nachzahlung))} voraussichtliche Nachzahlung.
              Die Frage ist nicht ob, sondern ob du vorbereitet bist.
            </h3>
          ) : (
            <h3 className="text-base font-semibold text-foreground">
              {formatEuro(monatlicheRuecklage)}/Monat solltest du für SVS und Steuer zurücklegen.
            </h3>
          )}
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Hol dir deine Zahlen als konkreten 12-Monats-Plan: monatliche Rücklage
            ({formatEuro(monatlicheRuecklage)}, aufgeteilt nach SVS und Einkommensteuer),
            alle SVS-Quartalstermine und die Schritt-für-Schritt-Umsetzung.
            Sofort als PDF, ohne Registrierung.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
            <Button onClick={handleBuyPdf} disabled={buying} className="gap-1.5">
              {buying ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <FileDown className="h-4 w-4" aria-hidden="true" />}
              {buying ? 'Starte Checkout ...' : 'PDF-Rücklagenplan für 49 € erstellen'}
            </Button>
            <div className="text-xs text-muted-foreground leading-snug">
              <span className="font-semibold text-foreground">49 € einmalig</span> (inkl. USt)
              {hatNachzahlung && svs.nachzahlung > 1000 && (
                <> · weniger als {Math.max(1, Math.ceil((49 / svs.nachzahlung) * 100))} % deiner erwarteten Nachzahlung</>
              )}
              <br />
              Lieber gleich alles? <Link href="/pricing" className="underline underline-offset-2 hover:text-foreground">SteuerBoard Pro ab 239 €/Jahr</Link>.
              Kein Ersatz für Steuerberatung.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
