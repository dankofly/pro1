'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calculator,
  Shield,
  ArrowRight,
  Heart,
  CalendarDays,
  Sparkles,
  Building2,
  BarChart3,
  Layers,
  MessageSquare,
  Receipt,
  PiggyBank,
  TrendingUp,
  Crown,
  Lock,
  Check,
  BarChart2,
  FileText,
  Coins,
  Gift,
  BookOpen,
  Zap,
} from 'lucide-react'

/* ─── Scroll-reveal ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Feature data ─── */

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  color: string
  bg: string
  href?: string
}

const FREE_FEATURES: Feature[] = [
  {
    icon: Calculator,
    title: 'SVS-Beitragsrechner',
    desc: 'Berechne deine endgültigen SVS-Beiträge: Pensionsversicherung, Krankenversicherung, Unfallversicherung und Selbständigenvorsorge — basierend auf deinem tatsächlichen Jahresgewinn.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    href: '/rechner',
  },
  {
    icon: Shield,
    title: 'Wahrheits-Tabelle',
    desc: 'Die Tabelle, die dein Steuerberater nicht hat: Alle SVS-Positionen im Detail aufgeschlüsselt — vorläufig vs. endgültig, Nachzahlung und Rückerstattung auf einen Blick.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    href: '/rechner',
  },
  {
    icon: BarChart2,
    title: 'Geldfluss-Diagramm',
    desc: 'Visualisiere den Weg deines Bruttoeinkommens: Was geht an die SVS, was ans Finanzamt und was bleibt als echtes Netto wirklich übrig.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    href: '/rechner',
  },
  {
    icon: CalendarDays,
    title: '2026 Ready',
    desc: 'Neue Familienbonus-Werte (2.100 EUR), angepasster AVAB (572 EUR), aktueller Verkehrsabsetzbetrag (481 EUR) und Kindermehrbetrag (727 EUR) — bereits eingebaut.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Gift,
    title: 'Sachbezug-Rechner',
    desc: 'PKW-Sachbezug berechnen nach aktuellen Richtwerten. Firmenwagen, E-Auto-Bonus und CO2-Grenzwerte für 2024–2026.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    href: '/sachbezug-rechner',
  },
  {
    icon: BookOpen,
    title: 'Steuer-Wissen Bot',
    desc: 'Kostenloser KI-Tutor für österreichisches Steuerrecht — basierend auf dem Lehrbuch "Steuerrecht". Erklärt ESt, KöSt, USt und Verfahrensrecht.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    href: '/steuerwissen',
  },
]

const BASIC_FEATURES: Feature[] = [
  {
    icon: Receipt,
    title: 'Einkommensteuer-Prognose',
    desc: 'Berechne deine voraussichtliche Einkommensteuer inkl. aller Tarifstufen, Absetzbeträge und Freibeträge. Mit Progressionsverlauf und Grenzsteuersatz-Anzeige.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    href: '/einkommensteuer',
  },
  {
    icon: Heart,
    title: 'Familienbonus & Absetzbeträge',
    desc: 'AVAB, Familienbonus Plus, Verkehrsabsetzbetrag, Kindermehrbetrag, Pensionistenabsetzbetrag — alles automatisch berechnet mit den korrekten Werten für 2024, 2025 und 2026.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    icon: Lock,
    title: 'Berechnungen speichern',
    desc: 'Speichere deine Szenarien und vergleiche verschiedene Gewinn-Varianten. Deine Daten bleiben DSGVO-konform in der EU.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BarChart3,
    title: 'Dashboard mit Verlauf',
    desc: 'Verfolge die Entwicklung deiner Steuerbelastung über die Zeit. Quartalsvergleiche und Jahresübersicht in einem Dashboard.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    href: '/dashboard',
  },
  {
    icon: FileText,
    title: 'Einfacher Export',
    desc: 'Exportiere deine Berechnungen als übersichtlichen Bericht. Ideal für die Ablage oder als Gesprächsgrundlage mit dem Steuerberater.',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
  },
]

const PRO_FEATURES: Feature[] = [
  {
    icon: MessageSquare,
    title: 'Steuer-Chatbot (7 Rechner)',
    desc: 'KI-Steuerexperte powered by Claude AI mit Zugriff auf 7 spezialisierte Rechner: Einkommensteuer, Körperschaftsteuer, Umsatzsteuer, Krypto-Steuer, Immobilienertragsteuer, Sachbezug und Investitionsfreibetrag.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    href: '/steuerberater',
  },
  {
    icon: Sparkles,
    title: 'KI-Steuerberater',
    desc: 'Persönliche Steueranalyse deiner Rechner-Ergebnisse. Optimierungsstrategien mit konkreten Euro-Beträgen — zum Beispiel: "Du sparst 1.240 EUR wenn du den IFB nutzt."',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    href: '/steuerberater',
  },
  {
    icon: TrendingUp,
    title: 'Misch-Einkommen Rechner',
    desc: 'Angestellt + selbständig? Berechne die Differenz-Vorschreibung, doppelte Sozialversicherung und das kombinierte echte Netto aus beiden Einkunftsarten.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    href: '/misch-einkommen',
  },
  {
    icon: PiggyBank,
    title: 'USt-Rechner & Rücklagen',
    desc: 'Umsatzsteuer berechnen, Kleinunternehmer-Grenze prüfen, Vorsteuer verrechnen. Plus: Wie viel du monatlich für SVS, ESt und USt zurücklegen solltest.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  {
    icon: Building2,
    title: 'GmbH-Vergleich',
    desc: 'EPU vs. GmbH: Vergleiche KöSt + KESt + Mindest-KöSt gegen ESt + SVS. Mit konkreten Netto-Zahlen und Break-Even-Punkt.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Layers,
    title: 'Pauschalierung Vergleich',
    desc: 'Automatische Prüfung ob die Kleinunternehmer- oder Branchenpauschalierung für dich günstiger wäre. Vergleich mit tatsächlicher Versteuerung.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: Zap,
    title: 'Gewinnmaximierer',
    desc: 'Simuliere Zusatzumsätze und sieh die marginale Auswirkung auf Steuern und Netto. Finde den Sweet Spot, ab dem sich Mehrarbeit nicht mehr lohnt.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Calculator,
    title: 'Investitionen & AfA',
    desc: 'Investitionsfreibetrag (IFB) berechnen, Abschreibungen für Einrichtung, EDV und Maschinen planen. GWG-Grenzen und degressive AfA.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    href: '/investitionsfreibetrag',
  },
  {
    icon: Coins,
    title: 'Krypto-Steuer',
    desc: 'Bitcoin, Ethereum & Co: Berechne die 27,5% KESt auf realisierte Krypto-Gewinne. Mit Freigrenze und Verlustverrechnung.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    href: '/krypto-steuer',
  },
  {
    icon: FileText,
    title: 'PDF-Export für Steuerberater',
    desc: 'Professioneller PDF-Report mit allen Berechnungen, Diagrammen und Optimierungsvorschlägen. Direkt an den Steuerberater weitergeben.',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
  },
]

/* ─── Tier section component ─── */
function TierSection({
  title,
  subtitle,
  badge,
  badgeColor,
  features,
  accentColor,
  delay = 0,
}: {
  title: string
  subtitle: string
  badge: string
  badgeColor: string
  features: Feature[]
  accentColor: string
  delay?: number
}) {
  return (
    <section className="relative">
      <Reveal delay={delay}>
        <div className="flex items-center gap-3 mb-8">
          <Badge className={badgeColor}>{badge}</Badge>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">{title}</h2>
            <p className="text-blue-200/50 text-sm mt-0.5">{subtitle}</p>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={delay + (i + 1) * 80}>
            <div className="group relative h-full">
              <div
                className={`absolute -inset-px rounded-2xl bg-gradient-to-b ${accentColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative h-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.bg} ${f.color} shrink-0`}
                  >
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white font-heading mt-1.5">
                    {f.title}
                  </h3>
                </div>
                <p className="text-sm text-blue-200/50 leading-relaxed flex-1">{f.desc}</p>
                {f.href && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <Link
                      href={f.href}
                      className="inline-flex items-center text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      Ausprobieren
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── Comparison table ─── */
function ComparisonTable() {
  const rows = [
    { feature: 'SVS-Beitragsrechner', free: true, basic: true, pro: true },
    { feature: 'Wahrheits-Tabelle', free: true, basic: true, pro: true },
    { feature: 'Geldfluss-Diagramm', free: true, basic: true, pro: true },
    { feature: 'Sachbezug-Rechner', free: true, basic: true, pro: true },
    { feature: 'Steuer-Wissen Bot', free: true, basic: true, pro: true },
    { feature: 'Einkommensteuer-Prognose', free: false, basic: true, pro: true },
    { feature: 'Familienbonus & Absetzbeträge', free: false, basic: true, pro: true },
    { feature: 'Berechnungen speichern', free: false, basic: true, pro: true },
    { feature: 'Dashboard & Verlauf', free: false, basic: true, pro: true },
    { feature: 'Einfacher Export', free: false, basic: true, pro: true },
    { feature: 'Steuer-Chatbot (7 Rechner)', free: false, basic: false, pro: true },
    { feature: 'KI-Steuerberater', free: false, basic: false, pro: true },
    { feature: 'Misch-Einkommen Rechner', free: false, basic: false, pro: true },
    { feature: 'USt-Rechner & Rücklagen', free: false, basic: false, pro: true },
    { feature: 'GmbH-Vergleich', free: false, basic: false, pro: true },
    { feature: 'Pauschalierung Vergleich', free: false, basic: false, pro: true },
    { feature: 'Gewinnmaximierer', free: false, basic: false, pro: true },
    { feature: 'Investitionen & AfA', free: false, basic: false, pro: true },
    { feature: 'Krypto-Steuer', free: false, basic: false, pro: true },
    { feature: 'PDF-Export für Steuerberater', free: false, basic: false, pro: true },
  ]

  return (
    <Reveal delay={100}>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-blue-200/40 font-medium">Feature</th>
              <th className="text-center py-4 px-4 text-white font-semibold w-28">Free</th>
              <th className="text-center py-4 px-4 text-white font-semibold w-28">
                Sicherheit
              </th>
              <th className="text-center py-4 px-4 w-28">
                <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                  <Crown className="h-3.5 w-3.5" />
                  Pro
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
              >
                <td className="py-3 px-4 text-blue-100">{row.feature}</td>
                <td className="py-3 px-4 text-center">
                  {row.free ? (
                    <Check className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <span className="text-white/15">—</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {row.basic ? (
                    <Check className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <span className="text-white/15">—</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {row.pro ? (
                    <Check className="h-4 w-4 text-amber-400 mx-auto" />
                  ) : (
                    <span className="text-white/15">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}

/* ─── Page ─── */
export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
              <Calculator className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="font-bold text-white text-lg font-heading">SteuerBoard.pro</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-blue-200 hover:text-white hover:bg-white/10"
            >
              <Link href="/pricing">Preise</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
            >
              <Link href="/rechner">Jetzt starten</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-6">
              Alle Features
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight font-heading">
              Jede Funktion,{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                die du brauchst
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-blue-200/60 max-w-2xl mx-auto leading-relaxed">
              Von der kostenlosen SVS-Berechnung bis zum KI-Steuerberater mit 7 Rechnern.
              Gebaut von Selbständigen, für Selbständige in Österreich.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/25 text-base px-8 h-12"
              >
                <Link href="/rechner">
                  Kostenlos starten
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 text-base px-8 h-12 bg-transparent"
              >
                <Link href="/pricing">Preise vergleichen</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature Tiers */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20 pb-20">
        {/* Free */}
        <TierSection
          title="Free"
          subtitle="Kostenlos, für immer. Keine Kreditkarte nötig."
          badge="Free"
          badgeColor="bg-white/10 text-white border-white/20"
          features={FREE_FEATURES}
          accentColor="from-emerald-500/20"
          delay={0}
        />

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-xs text-blue-200/30 uppercase tracking-widest">Upgrade</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Sicherheits-Plan */}
        <TierSection
          title="Sicherheits-Plan"
          subtitle="9,90 EUR/Monat · Einkommensteuer-Prognose & Speichern"
          badge="Basic"
          badgeColor="bg-blue-500/10 text-blue-400 border-blue-500/20"
          features={BASIC_FEATURES}
          accentColor="from-blue-500/20"
          delay={0}
        />

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          <Crown className="h-4 w-4 text-amber-400" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        </div>

        {/* Pro */}
        <TierSection
          title="SteuerBoard Pro"
          subtitle="19,90 EUR/Monat · Alles, plus KI-Power und 7 Rechner"
          badge="Pro"
          badgeColor="bg-amber-500/10 text-amber-400 border-amber-500/20"
          features={PRO_FEATURES}
          accentColor="from-amber-500/20"
          delay={0}
        />

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-xs text-blue-200/30 uppercase tracking-widest">Vergleich</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Comparison Table */}
        <section>
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                Alle Features im Vergleich
              </h2>
              <p className="mt-3 text-blue-200/50 max-w-lg mx-auto">
                Finde den Plan, der zu dir passt. Jederzeit upgraden oder kündigen.
              </p>
            </div>
          </Reveal>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
            <ComparisonTable />
          </div>
        </section>

        {/* Bottom CTA */}
        <Reveal>
          <section className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-amber-500/10" />
            <div className="relative text-center py-16 px-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-4">
                Bereit, dein echtes Netto zu kennen?
              </h2>
              <p className="text-blue-200/50 mb-8 max-w-md mx-auto">
                Starte kostenlos und berechne in 30 Sekunden, was die SVS wirklich von dir will.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/25 text-base px-8 h-12"
                >
                  <Link href="/rechner">
                    Jetzt gratis berechnen
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 text-base px-8 h-12"
                >
                  <Link href="/pricing">
                    <Crown className="h-4 w-4 mr-2" />
                    Pro-Vorteile sehen
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/20">
              <Calculator className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <span className="font-semibold text-white text-sm">SteuerBoard.pro</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-blue-200/40">
            <Link href="/impressum" className="hover:text-blue-200 transition-colors">
              Impressum
            </Link>
            <span>·</span>
            <Link href="/datenschutz" className="hover:text-blue-200 transition-colors">
              Datenschutz
            </Link>
            <span>·</span>
            <Link href="/pricing" className="hover:text-blue-200 transition-colors">
              Preise
            </Link>
          </div>
          <p className="text-xs text-blue-200/30" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} SteuerBoard.pro
          </p>
        </div>
      </footer>
    </main>
  )
}
