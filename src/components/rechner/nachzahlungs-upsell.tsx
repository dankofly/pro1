'use client'

// Ergebnis-Upsell am Nachzahlungs-Moment.
// Neuro-Logik: Balance-Motiv (Sicherheit, Kontrolle). Die eigene Zahl des
// Nutzers ist der Pattern-Interrupt, der Zielzustand wird positiv formuliert,
// der Preis gegen die Nachzahlung geankert. Keine künstliche Verknappung:
// bei einem Steuerprodukt verkauft Ruhe, nicht Druck.
// Dismiss wird 7 Tage respektiert (localStorage).

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatEuro, formatEuroShort } from '@/lib/format'
import { ShieldCheck, ArrowRight, X } from 'lucide-react'
import type { SvsResult } from '@/lib/svs-calculator'
import type { SubscriptionInfo } from '@/hooks/use-subscription'

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
  vorschreibung: number
  monatlicheRuecklage: number
  subscription: SubscriptionInfo
}

export function NachzahlungsUpsell({ svs, vorschreibung, monatlicheRuecklage, subscription }: NachzahlungsUpsellProps) {
  const [visible, setVisible] = useState(false)

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

  // Pro-Nutzer haben alles, Basic-Nutzer bekommen die Pro-Variante unten
  if (subscription.isPro || !visible) return null

  const hatNachzahlung = vorschreibung > 0 && svs.nachzahlung > 500
  const hatRuecklagenBedarf = vorschreibung <= 0 && monatlicheRuecklage > 150

  if (!hatNachzahlung && !hatRuecklagenBedarf) return null

  // Preis-Anker: Jahres-Abo im Verhältnis zur eigenen Zahl des Nutzers
  const istBasic = subscription.isBasic
  const planName = istBasic ? 'SteuerBoard Pro' : 'Sicherheits-Plan'
  const jahresPreis = istBasic ? 239 : 119
  const proMonat = istBasic ? '19,92' : '9,92'

  // Verhältnis nur zeigen, wenn es wirklich klein wirkt (unter 10 %)
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
                Du kennst deine Zahl jetzt. Der {planName} hält sie im Blick:
                Berechnung speichern, Rücklage {formatEuro(svs.sparEmpfehlung)}/Monat
                mitverfolgen und rechtzeitig wissen, wenn sich deine Werte ändern.
                So kommt der Bescheid, und du bist vorbereitet.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-base font-semibold text-foreground">
                {formatEuro(monatlicheRuecklage)}/Monat solltest du für SVS und Steuer zurücklegen.
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Wer diese Zahl Monat für Monat im Blick behält, wird vom Bescheid
                nicht überrascht. Der {planName} speichert deine Berechnung,
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
              {' '}(entspricht {proMonat} €/Monat, inkl. USt)
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
