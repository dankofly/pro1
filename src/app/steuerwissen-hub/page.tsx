import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiteFooter } from '@/components/site-footer'
import {
  ArrowRight,
  Shield,
  TrendingDown,
  Calculator,
  Building2,
  PiggyBank,
  AlertTriangle,
  ChevronDown,
  Briefcase,
  Layers,
  Clock,
  ClipboardList,
  CalendarDays,
} from 'lucide-react'

const ARTICLES = [
  {
    href: '/steuerwissen/svs-beitraege-senken',
    icon: TrendingDown,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    title: 'SVS-Beiträge senken',
    subtitle: '7 legale Strategien für Selbständige',
    description: 'Erfahre wie du deine SVS-Beiträge durch Gewinnfreibetrag, Betriebsausgabenoptimierung und strategische Planung legal reduzierst.',
    tags: ['SVS', 'Sozialversicherung', 'Beiträge senken'],
  },
  {
    href: '/steuerwissen/svs-nachzahlung-vermeiden',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    title: 'SVS-Nachzahlung vermeiden',
    subtitle: 'So schützt du dich vor der Nachzahlungsfalle',
    description: 'Verstehe warum SVS-Nachzahlungen entstehen und wie du mit vorausschauender Planung böse Überraschungen vermeidest.',
    tags: ['SVS', 'Nachzahlung', 'Vorsorge'],
  },
  {
    href: '/steuerwissen/gewinnfreibetrag-nutzen',
    icon: PiggyBank,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    title: 'Gewinnfreibetrag 2026',
    subtitle: 'So sparst du bis zu 4.950 € Steuern',
    description: 'Alles zum Grundfreibetrag nach § 10 EStG: Berechnung, Voraussetzungen und wie du den investitionsbedingten Freibetrag zusätzlich nutzt.',
    tags: ['Gewinnfreibetrag', '§ 10 EStG', 'Steuerersparnis'],
  },
  {
    href: '/steuerwissen/gmbh-vs-einzelunternehmen',
    icon: Building2,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    title: 'GmbH oder Einzelunternehmen?',
    subtitle: 'Der Steuer-Vergleich für Österreich',
    description: 'Break-Even-Analyse, Steuervergleich und Entscheidungshilfe: Ab welchem Gewinn lohnt sich die GmbH-Gründung wirklich?',
    tags: ['GmbH', 'Einzelunternehmen', 'Rechtsform'],
  },
  {
    href: '/steuerwissen/steueroptimierung-selbststaendige',
    icon: Calculator,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    title: 'Steueroptimierung für Selbständige',
    subtitle: 'Die komplette Anleitung 2026',
    description: 'Alle legalen Steuerspartipps für EPU & Einzelunternehmer: Absetzbeträge, Betriebsausgaben, Investitionssteuerung und mehr.',
    tags: ['Steueroptimierung', 'EPU', 'Betriebsausgaben'],
  },
  {
    href: '/steuerwissen/nebenberuflich-selbstaendig',
    icon: Briefcase,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    title: 'Nebenberuflich selbständig',
    subtitle: 'Steuern, SVS & Tipps 2026',
    description: 'SVS-Pflicht, Steuerberechnung bei Mischeinkommen, Meldepflichten und typische Fehler bei nebenberuflicher Selbständigkeit.',
    tags: ['Nebenberuflich', 'Mischeinkommen', 'SVS-Pflicht'],
  },
  {
    href: '/steuerwissen/flexkapg-vs-gmbh',
    icon: Layers,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    title: 'FlexKapG vs. GmbH',
    subtitle: 'Die neue Rechtsform im Vergleich',
    description: 'Stammkapital, Gründungskosten, Mitarbeiterbeteiligung — alles zur FlexKapG seit 2024 und wann sie besser ist als die GmbH.',
    tags: ['FlexKapG', 'FlexCo', 'Rechtsformvergleich'],
  },
  {
    href: '/steuerwissen/svs-nachzahlung-4-jahr',
    icon: Clock,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    title: 'Steuerschock im 4. Jahr',
    subtitle: 'Was Neugründer wissen müssen',
    description: 'Warum die SVS-Nachzahlung im 3./4. Jahr kommt, wie hoch sie ausfällt und mit welchen Strategien du dich schützen kannst.',
    tags: ['SVS-Nachzahlung', 'Neugründer', 'Rücklage'],
  },
  {
    href: '/steuerwissen/betriebsausgaben-checkliste',
    icon: ClipboardList,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
    title: 'Betriebsausgaben Checkliste',
    subtitle: 'Was Selbständige absetzen können',
    description: 'Vollständige Liste aller absetzbaren Betriebsausgaben: Arbeitsplatzpauschale, GWG, Bewirtung, KFZ und mehr.',
    tags: ['Betriebsausgaben', 'Absetzen', 'Checkliste'],
  },
  {
    href: '/steuerwissen/steuer-jahresplanung',
    icon: CalendarDays,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    title: 'Steuer-Jahresplanung',
    subtitle: 'Fristen, UVA & Vorsorge 2026',
    description: 'Quartalweise Übersicht aller Steuerfristen, UVA-Termine, EST-Vorauszahlungen und Jahresend-Maßnahmen für Selbständige.',
    tags: ['Jahresplanung', 'Fristen', 'UVA'],
  },
]

const FAQ_ITEMS = [
  {
    question: 'Wie kann ich als Selbständiger in Österreich Steuern sparen?',
    answer: 'Durch optimale Nutzung von Gewinnfreibetrag (15% auf erste 33.000€), Investitionsfreibetrag (20%), vollständige Geltendmachung von Betriebsausgaben und strategische Gewinnsteuerung können Selbständige oft 3.000-10.000€ jährlich sparen.',
  },
  {
    question: 'Ab welchem Gewinn lohnt sich eine GmbH in Österreich?',
    answer: 'Der Break-Even liegt typischerweise zwischen 60.000-80.000€ Jahresgewinn. Ab diesem Punkt wird die GmbH-Besteuerung (23% KöSt + 27,5% KESt auf Ausschüttungen) günstiger als der progressive Einkommensteuertarif bis 55%.',
  },
  {
    question: 'Wie hoch sind die SVS-Beiträge für Selbständige?',
    answer: 'Die SVS-Beiträge betragen insgesamt ca. 26,83% des Gewinns: 18,50% Pensionsversicherung, 6,80% Krankenversicherung, 1,53% Selbständigenvorsorge plus ca. 11,35€/Monat Unfallversicherung.',
  },
  {
    question: 'Was ist der Gewinnfreibetrag und wie nutze ich ihn?',
    answer: 'Der Gewinnfreibetrag nach § 10 EStG beträgt 15% auf die ersten 33.000€ Gewinn (max. 4.950€ Freibetrag). Er wird automatisch angewendet und reduziert direkt die Steuerbemessungsgrundlage. Darüber hinaus gibt es den investitionsbedingten Gewinnfreibetrag bei Investitionen in begünstigte Wirtschaftsgüter.',
  },
  {
    question: 'Wie kann ich eine SVS-Nachzahlung vermeiden?',
    answer: 'Durch rechtzeitige Anpassung der vorläufigen Beitragsgrundlage (§ 25a Abs 3 GSVG), monatliche Rücklagenbildung von 25-30% des Gewinns und regelmäßige Gewinnprognosen lassen sich überraschende SVS-Nachzahlungen vermeiden.',
  },
  {
    question: 'Welche Betriebsausgaben kann ich als Selbständiger absetzen?',
    answer: 'Alle betrieblich veranlassten Ausgaben: Arbeitszimmer (anteilig), Fortbildung, Fachliteratur, Telefon/Internet (anteilig), Reisekosten, geringwertige Wirtschaftsgüter bis 1.000€, Bewirtungskosten (50%), Versicherungen und Beratungskosten.',
  },
]

export default function SteuerwissenHubPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 pt-24 pb-16 relative">
          <nav className="mb-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-300">Steuerwissen</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <Shield className="h-3.5 w-3.5" />
              Praxisnahe Steuer-Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Steuerwissen für Selbständige in Österreich
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
              Verständliche Guides zu SVS-Beiträgen, Steueroptimierung und Rechtsformwahl.
              Keine Theorie — konkrete Strategien mit Berechnungsbeispielen.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {ARTICLES.map((article) => {
            const Icon = article.icon
            return (
              <Link
                key={article.href}
                href={article.href}
                className={`group block rounded-xl border ${article.borderColor} bg-gray-800/50 p-6 hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5`}
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${article.bgColor} mb-4`}>
                  <Icon className={`h-5 w-5 ${article.color}`} />
                </div>
                <h2 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h2>
                <p className={`text-sm font-medium ${article.color} mb-3`}>
                  {article.subtitle}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {article.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] rounded-md bg-gray-700/50 text-gray-400 border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 group-hover:gap-2 transition-all">
                  Artikel lesen <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )
          })}

          {/* CTA Card */}
          <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 mb-4">
                <Calculator className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">
                Direkt berechnen
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Nutze unsere kostenlosen Rechner und berechne deine SVS-Beiträge, Einkommensteuer und dein echtes Netto in Sekunden.
              </p>
            </div>
            <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              <Link href="/rechner">
                Jetzt berechnen <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">
              Häufige Fragen
            </h2>
            <p className="text-gray-400 text-center mb-10">
              Die wichtigsten Fragen zur Steueroptimierung für Selbständige in Österreich
            </p>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-gray-700/50 bg-gray-800/30 overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-gray-800/50 transition-colors">
                    <h3 className="text-sm font-medium text-white pr-4">
                      {item.question}
                    </h3>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">
                Du willst deine persönliche Steuerersparnis berechnen?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Link href="/rechner">
                    <Calculator className="h-4 w-4 mr-2" />
                    SVS-Rechner starten
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800">
                  <Link href="/steuerberater">
                    AI SteuerBoard testen
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
