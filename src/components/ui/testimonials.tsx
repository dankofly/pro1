'use client'

// Ehrliche Trust-Sektion statt erfundener Kundenstimmen.
// Fingierte Verbraucherbewertungen sind nach Anhang UWG (Novelle 2022)
// unzulaessig. Sobald echte, dokumentierte Beta-Tester-Zitate vorliegen,
// koennen sie hier als attribuierte Testimonials wieder eingesetzt werden.

import { ShieldCheck, Receipt, Layers } from 'lucide-react'

interface ValueCard {
  icon: typeof ShieldCheck
  titel: string
  text: string
}

const valueCards: ValueCard[] = [
  {
    icon: ShieldCheck,
    titel: 'Nachzahlung vorher sehen',
    text:
      'Die SVS rechnet vorlaeufig auf Basis des Gewinns von vor drei Jahren. Steigt dein Einkommen, kommt die Nachzahlung mit dem Bescheid. SteuerBoard zeigt sie dir vorher und rechnet die monatliche Ruecklage aus.',
  },
  {
    icon: Receipt,
    titel: 'Echtes Netto statt Umsatz',
    text:
      'Dein Umsatz ist nicht dein Gewinn, dein Gewinn ist nicht dein Netto. Der Rechner zieht SVS, Einkommensteuer und Abgaben ab und zeigt, was am Ende wirklich auf deinem Konto bleibt.',
  },
  {
    icon: Layers,
    titel: 'Auch bei Misch-Einkommen',
    text:
      'Anstellung plus Selbstaendigkeit macht die Planung kompliziert: ASVG, GSVG, Differenzvorschreibung. SteuerBoard kombiniert beides und zeigt SVS, Steuer und Nachzahlung auf einen Blick.',
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-emerald-400 mb-2 tracking-wide uppercase">
            Wof&uuml;r SteuerBoard gebaut ist
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Die drei Fragen, die Selbst&auml;ndige wach halten
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueCards.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.titel}
                className="flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 mb-4">
                  <Icon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{c.titel}</h3>
                <p className="text-blue-200/70 text-[15px] leading-relaxed">{c.text}</p>
              </div>
            )
          })}
        </div>

        {/* Faktische Trust-Signale (keine unbelegbaren Claims) */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-white">2024&ndash;2026</p>
            <p className="text-blue-200/50 text-sm mt-1">Aktuelle Steuerwerte</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-white">7 Rechner</p>
            <p className="text-blue-200/50 text-sm mt-1">SVS, ESt, GmbH, Krypto und mehr</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">Made in Austria</p>
            <p className="text-blue-200/50 text-sm mt-1">F&uuml;r &ouml;sterreichisches Steuerrecht</p>
          </div>
        </div>
      </div>
    </section>
  )
}
