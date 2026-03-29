import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Calculator,
  Shield,
  TrendingUp,
  Users,
  ArrowRight,
  Check,
  ChevronDown,
  Lock,
  Heart,
  Star,
  CalendarDays,
  Sparkles,
  Building2,
  BarChart3,
  Layers,
  MessageSquare,
  Receipt,
  PiggyBank,
  Bot,
} from 'lucide-react'
import { Pricing } from '@/components/ui/pricing'
import { Testimonials } from '@/components/ui/testimonials'
import { SiteFooter } from '@/components/site-footer'
import { Reveal, AnimatedCounter } from '@/components/ui/reveal'
import { RecoveryRedirect, Navbar } from '@/components/landing/landing-client'

/* ─── Ticker items ─── */
const TICKER_ITEMS = [
  { icon: Bot, text: 'AI SteuerBoard', color: 'text-emerald-400' },
  { icon: Calculator, text: 'Einkommensteuer', color: 'text-blue-400' },
  { icon: Building2, text: 'Körperschaftsteuer', color: 'text-violet-400' },
  { icon: Receipt, text: 'Umsatzsteuer', color: 'text-cyan-400' },
  { icon: Sparkles, text: 'Krypto-Steuer', color: 'text-amber-400' },
  { icon: TrendingUp, text: 'Immobilienertragssteuer', color: 'text-rose-400' },
  { icon: Layers, text: 'Sachbezug-Rechner', color: 'text-orange-400' },
  { icon: BarChart3, text: 'Investitionsfreibetrag', color: 'text-teal-400' },
  { icon: MessageSquare, text: '24/7 Sofort-Antworten', color: 'text-emerald-300' },
]

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left – Copy */}
          <div className="text-center lg:text-left">
            <Reveal>
              <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-6 text-sm px-4 py-1.5">
                <Shield className="h-3.5 w-3.5 mr-1.5" />
                80 % zahlen mehr Steuern als nötig
              </Badge>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight font-heading">
                Die SVS schickt{' '}
                <span className="hidden sm:inline"><br /></span>
                keine Warnung.{' '}
                <span className="hidden sm:inline"><br /></span>
                <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                  Nur eine Nachzahlung.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 text-lg sm:text-xl text-blue-200/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Dein Umsatz ist nicht dein Gewinn. Dein Gewinn ist nicht dein Netto.
                SteuerBoard zeigt dir in{' '}
                <span className="text-white font-semibold">30&nbsp;Sekunden</span>, was wirklich bleibt.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-6 inline-flex items-center gap-3 bg-red-500/[0.08] border border-red-500/20 rounded-xl px-5 py-3">
                <span className="text-sm text-red-300/70">Ø SVS-Nachzahlung:</span>
                <span className="text-2xl font-bold text-red-400 tabular-nums font-mono">
                  &euro;&nbsp;<AnimatedCounter target={3200} />
                </span>
              </div>
            </Reveal>

            <Reveal delay={350}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-elevation-3 shadow-emerald-500/25 text-base px-8 h-12 w-full sm:w-auto">
                  <Link href="/rechner">
                    Jetzt gratis berechnen
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 text-base px-8 h-12 w-full sm:w-auto bg-transparent"
                >
                  <a href="#pricing">
                    Preise ansehen
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-blue-300/60">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Kostenlos starten
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" /> Steuerlich absetzbar
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" /> DSGVO-konform
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right – Dashboard Mockup */}
          <Reveal delay={200} className="hidden lg:block">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl" />

              {/* Mock Dashboard */}
              <div className="relative glass-dark rounded-2xl p-6 border border-white/[0.06] shadow-elevation-4">
                {/* Mock top bar */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                  <span className="ml-3 text-xs text-white/30 font-mono">steuerboard.pro</span>
                </div>

                {/* Mock Hero Number */}
                <div className="text-center mb-6">
                  <p className="text-xs text-emerald-400/70 uppercase tracking-widest mb-1">Echtes Netto</p>
                  <p className="text-5xl font-extrabold text-white tabular-nums">
                    <AnimatedCounter target={28742} /> <span className="text-2xl text-white/50">EUR</span>
                  </p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mt-2">
                    71,9 % Netto-Quote
                  </Badge>
                </div>

                {/* Mock Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'SVS Gesamt', value: '7.124 EUR', color: 'text-blue-300' },
                    { label: 'Nachzahlung', value: '1.724 EUR', color: 'text-amber-300' },
                    { label: 'Steuer', value: '4.134 EUR', color: 'text-red-300' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
                      <p className={`text-sm font-bold ${s.color} tabular-nums mt-0.5`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Mock Bar */}
                <div className="mt-5">
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Steuerstufe</p>
                  <div className="flex h-2 rounded-full overflow-hidden gap-px">
                    <div className="bg-emerald-400 w-[15%]" />
                    <div className="bg-emerald-500 w-[12%]" />
                    <div className="bg-amber-400 w-[20%]" />
                    <div className="bg-amber-500 opacity-30 w-[23%]" />
                    <div className="bg-orange-500 opacity-20 w-[15%]" />
                    <div className="bg-red-500 opacity-10 w-[15%]" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* AI SteuerBoard Ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/[0.04] bg-slate-950/60 backdrop-blur-sm">
        <div className="relative flex">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          <div className="flex animate-marquee whitespace-nowrap gap-8 sm:gap-12 py-4">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 text-base sm:text-lg font-semibold text-blue-100/70 tracking-wide">
                <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color} shrink-0`} />
                {item.text}
                <span className="text-white/10 ml-6 sm:ml-8">·</span>
              </span>
            ))}
          </div>
          <div className="flex animate-marquee2 whitespace-nowrap gap-8 sm:gap-12 py-4 absolute top-0" aria-hidden>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 text-base sm:text-lg font-semibold text-blue-100/70 tracking-wide">
                <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color} shrink-0`} />
                {item.text}
                <span className="text-white/10 ml-6 sm:ml-8">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Problem ─── */
function ProblemSection() {
  const problems = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Kein Gesamtbild',
      desc: 'SVS-Beiträge, Einkommensteuer, Vorauszahlungen, Nachzahlungen – als Selbständiger in Österreich hast du es mit vier verschiedenen Abrechnungslogiken zu tun. Ohne zentrale Übersicht fehlt dir die wichtigste Zahl: was am Jahresende wirklich übrig bleibt.',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Nachzahlungen ohne Vorwarnung',
      desc: 'Die SVS rechnet mit deinem Gewinn von vor 3 Jahren. Steigt dein Einkommen, folgen Nachforderungen bei SVS und Finanzamt – oft im selben Quartal, ohne Vorankündigung.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Steuerlast ist nicht planbar',
      desc: 'Progression, Absetzbeträge, Gewinnfreibetrag, Pauschalierung – die Stellschrauben sind da, aber ohne Rechenmodell bleiben Optimierungen auf der Strecke.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
  ]

  return (
    <section id="problem" className="relative py-20 sm:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-4">
              Das Problem
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Nicht die Steuer ist das Problem –{' '}<br className="hidden sm:block" />der fehlende Überblick ist es
            </h2>
            <p className="mt-4 text-blue-200/60 max-w-2xl mx-auto text-lg">
              Selbständige in Österreich zahlen SVS, Einkommensteuer und Vorauszahlungen an unterschiedliche Stellen. Ohne zentrale Jahresprognose fehlt die Grundlage für jede finanzielle Entscheidung.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Lead problem – takes 3 cols */}
          <Reveal className="lg:col-span-3">
            <Card className={`bg-white/[0.03] ${problems[0].border} border h-full hover:bg-white/[0.06] transition-colors duration-300`}>
              <CardContent className="p-6 sm:p-10">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${problems[0].bg} ${problems[0].color} mb-6`}>
                  {problems[0].icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-heading">{problems[0].title}</h3>
                <p className="text-blue-200/60 leading-relaxed text-lg">{problems[0].desc}</p>
                <div className="mt-6 flex items-center gap-3 text-sm text-red-400/80">
                  <span className="flex h-2 w-2 rounded-full bg-red-400" />
                  Betrifft jeden Selbständigen in Österreich – vom EPU bis zur GmbH
                </div>
              </CardContent>
            </Card>
          </Reveal>
          {/* Supporting problems – stacked in 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {problems.slice(1).map((p, i) => (
              <Reveal key={p.title} delay={(i + 1) * 150} className="flex-1">
                <Card className={`bg-white/[0.03] ${p.border} border h-full hover:bg-white/[0.06] transition-colors duration-300`}>
                  <CardContent className="p-6">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.bg} ${p.color} mb-4`}>
                      {p.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-heading">{p.title}</h3>
                    <p className="text-blue-200/60 leading-relaxed text-sm">{p.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Before / After contrast */}
        <Reveal delay={300}>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-500/[0.06] border border-red-500/20 rounded-2xl p-6 text-center">
              <p className="text-xs font-medium text-red-400 uppercase tracking-wide mb-3">Ohne SteuerBoard</p>
              <p className="text-3xl sm:text-4xl font-bold text-red-400 tabular-nums">&euro;3.200+</p>
              <p className="text-sm text-blue-200/50 mt-2">unerwartete SVS-Nachzahlung</p>
            </div>
            <div className="bg-emerald-500/[0.06] border border-emerald-500/20 rounded-2xl p-6 text-center">
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wide mb-3">Mit SteuerBoard</p>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400 tabular-nums">&euro;0</p>
              <p className="text-sm text-blue-200/50 mt-2">&Uuml;berraschungen &ndash; du wei&szlig;t Bescheid</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Features ─── */
function FeaturesSection() {
  const features = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: 'Echtzeit-Prognose',
      desc: 'Zieh am Slider – und sieh sofort dein echtes Netto, die SVS-Nachzahlung und die Einkommensteuer. Kein Raten, kein Warten auf den Bescheid.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Familienbonus & Absetzbeträge',
      desc: 'AVAB, Familienbonus Plus, Verkehrsabsetzbetrag, Kindermehrbetrag – alles automatisch berechnet mit den korrekten Werten für jedes Jahr.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: <CalendarDays className="h-6 w-6" />,
      title: '2026 Ready',
      desc: 'Neue Familienbonus-Werte (2.100 EUR), angepasster AVAB, aktueller Verkehrsabsetzbetrag – bereits eingebaut, bevor dein Steuerberater davon weiss.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <section id="features" className="relative py-20 sm:py-28 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Alles, was du brauchst – in einer App
            </h2>
            <p className="mt-4 text-blue-200/60 max-w-2xl mx-auto text-lg">
              Gebaut von Selbständigen, für Selbständige. Mit der Präzision, die dein Steuerberater nicht hat.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Lead feature – 3 cols with larger visual */}
          <Reveal className="lg:col-span-3">
            <div className="group relative h-full">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Card className="relative bg-white/[0.03] border-white/[0.06] h-full">
                <CardContent className="p-6 sm:p-10">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${features[0].bg} ${features[0].color} mb-6`}>
                    {features[0].icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-heading">{features[0].title}</h3>
                  <p className="text-blue-200/60 leading-relaxed text-lg">{features[0].desc}</p>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[
                      { label: 'SVS Gesamt', value: '7.124 EUR', color: 'text-blue-300' },
                      { label: 'Nachzahlung', value: '1.724 EUR', color: 'text-amber-300' },
                      { label: 'Echtes Netto', value: '28.742 EUR', color: 'text-emerald-300' },
                    ].map((s) => (
                      <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
                        <p className={`text-sm font-bold ${s.color} font-mono mt-0.5`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Reveal>
          {/* Secondary features – stacked in 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {features.slice(1).map((f, i) => (
              <Reveal key={f.title} delay={(i + 1) * 150}>
                <Card className="bg-white/[0.03] border-white/[0.06] h-full">
                  <CardContent className="p-6">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.bg} ${f.color} mb-4`}>
                      {f.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-heading">{f.title}</h3>
                    <p className="text-blue-200/60 leading-relaxed text-sm">{f.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Additional features – 2-col row */}
        <Reveal delay={200}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 shrink-0">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white font-heading">Misch-Einkommen Rechner</h4>
                <p className="text-sm text-blue-200/50 mt-1">Angestellt + Gewerbe? Berechne die Differenz-Vorschreibung, doppelte SV und dein echtes kombiniertes Netto.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0">
                <Star className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white font-heading">Wasserfall-Analyse</h4>
                <p className="text-sm text-blue-200/50 mt-1">Sieh genau, wie sich dein Brutto zu Netto aufschlüsselt: SVS, Einkommensteuer und was wirklich bleibt.</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Steuer-Chatbot – Highlight Card */}
        <Reveal delay={250}>
          <div className="mt-8 relative group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-white/[0.05] border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 shrink-0">
                  <MessageSquare className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="text-xl font-bold text-white font-heading">Steuer-Chatbot</h4>
                    <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 text-xs">
                      Pro · Powered by Claude AI
                    </Badge>
                  </div>
                  <p className="text-blue-200/60 leading-relaxed">
                    Stelle Fragen zu ESt, KöSt, USt, Krypto, Immobilien, Sachbezug und Investitionsfreibetrag —
                    dein KI-Steuerexperte rechnet in Echtzeit mit 7 spezialisierten Rechnern und
                    gibt dir präzise Antworten basierend auf österreichischem Steuerrecht 2026.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['ESt', 'KöSt', 'USt', 'Krypto', 'ImmoESt', 'Sachbezug', 'IFB'].map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* AI SteuerBoard (Single-Question) */}
        <Reveal delay={280}>
          <div className="mt-4 relative group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-white/[0.03] border border-amber-500/20 rounded-2xl p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 shrink-0">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white font-heading">AI SteuerBoard</h4>
                    <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/25 text-[10px] px-1.5 py-0">
                      Pro
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-200/50">
                    Persönliche Steueranalyse deiner Rechner-Ergebnisse — Optimierungsstrategien mit konkreten Euro-Beträgen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Pro Rechner Features – 6-item Grid */}
        <Reveal delay={300}>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Receipt className="h-4 w-4 text-cyan-400" />, bg: 'bg-cyan-500/10', title: 'USt-Rechner', desc: 'Umsatzsteuer berechnen, Kleinunternehmer-Grenze prüfen und Vorsteuer verrechnen.' },
              { icon: <PiggyBank className="h-4 w-4 text-pink-400" />, bg: 'bg-pink-500/10', title: 'Rücklagen-Rechner', desc: 'Berechne, wie viel du monatlich für SVS, ESt und USt zurücklegen solltest.' },
              { icon: <Building2 className="h-4 w-4 text-blue-400" />, bg: 'bg-blue-500/10', title: 'GmbH-Vergleich', desc: 'Vergleiche die Steuerbelastung als EPU vs. GmbH — mit konkreten Netto-Zahlen.' },
              { icon: <Layers className="h-4 w-4 text-purple-400" />, bg: 'bg-purple-500/10', title: 'Pauschalierung', desc: 'Prüfe automatisch ob eine Pauschalierung für dich günstiger wäre.' },
              { icon: <BarChart3 className="h-4 w-4 text-emerald-400" />, bg: 'bg-emerald-500/10', title: 'Gewinnmaximierer', desc: 'Simuliere Zusatzumsätze und sieh die Auswirkung auf Steuern und Netto.' },
              { icon: <Calculator className="h-4 w-4 text-amber-400" />, bg: 'bg-amber-500/10', title: 'Investitionen & AfA', desc: 'Berechne Abschreibungen für Einrichtung, EDV und Maschinen.' },
            ].map((f) => (
              <div key={f.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${f.bg} mb-3`}>
                  {f.icon}
                </div>
                <h4 className="font-semibold text-white text-sm font-heading">{f.title}</h4>
                <p className="text-xs text-blue-200/50 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Pricing ─── */
const PRICING_PLANS = [
  {
    name: 'Free',
    price: 0,
    yearlyPrice: 0,
    period: 'für immer',
    description: 'Für den schnellen Check',
    isFree: true,
    features: [
      // Included – biggest first
      { text: 'SVS-Beitragsrechner', included: true },
      { text: 'Wahrheits-Tabelle', included: true },
      { text: 'Geldfluss-Diagramm', included: true },
      { text: 'Sachbezug-Rechner', included: true },
      { text: 'Steuer-Wissen Bot', included: true },
      { text: '2026 Ready', included: true },
      // Not included
      { text: 'Einkommensteuer-Prognose', included: false },
      { text: 'Steuer-Chatbot (7 Rechner)', included: false },
      { text: 'AI SteuerBoard', included: false },
      { text: 'Misch-Einkommen Rechner', included: false },
      // Expandable
      { text: 'GmbH-Vergleich', included: false },
      { text: 'Pauschalierung Vergleich', included: false },
      { text: 'USt-Rechner & Rücklagen', included: false },
      { text: 'Gewinnmaximierer', included: false },
      { text: 'Investitionen & AfA', included: false },
      { text: 'Krypto-Steuer', included: false },
      { text: 'Berechnungen speichern', included: false },
      { text: 'Dashboard mit Verlauf', included: false },
      { text: 'Familienbonus & Absetzbeträge', included: false },
      { text: 'PDF-Export', included: false },
    ],
    buttonText: 'Jetzt gratis starten',
    href: '/rechner',
    isPopular: false,
  },
  {
    name: 'SteuerBoard Pro',
    price: 24.9,
    yearlyPrice: 19.92,
    yearlyTotal: 239,
    period: 'pro Monat',
    description: 'Für Profis',
    features: [
      // Pro-exclusive – biggest first
      { text: 'Steuer-Chatbot (7 Rechner)', included: true },
      { text: 'AI SteuerBoard', included: true },
      { text: 'Misch-Einkommen Rechner', included: true },
      { text: 'GmbH-Vergleich', included: true },
      { text: 'Pauschalierung Vergleich', included: true },
      { text: 'USt-Rechner & Rücklagen', included: true },
      { text: 'Gewinnmaximierer', included: true },
      { text: 'Investitionen & AfA', included: true },
      { text: 'Krypto-Steuer', included: true },
      { text: 'PDF-Export für Steuerberater', included: true },
      // Expandable – inherited features
      { text: 'Einkommensteuer-Prognose', included: true },
      { text: 'Familienbonus & Absetzbeträge', included: true },
      { text: 'Berechnungen speichern', included: true },
      { text: 'Dashboard mit Verlauf', included: true },
      { text: 'SVS-Beitragsrechner', included: true },
      { text: 'Wahrheits-Tabelle', included: true },
      { text: 'Geldfluss-Diagramm', included: true },
      { text: 'Sachbezug-Rechner', included: true },
      { text: 'Steuer-Wissen Bot', included: true },
      { text: '2026 Ready', included: true },
    ],
    buttonText: 'Jetzt upgraden',
    href: '/pricing',
    isPopular: true,
  },
  {
    name: 'Sicherheits-Plan',
    price: 12.9,
    yearlyPrice: 9.92,
    yearlyTotal: 119,
    period: 'pro Monat',
    description: 'Für Einsteiger',
    features: [
      // Sicherheit-specific – biggest first
      { text: 'Einkommensteuer-Prognose', included: true },
      { text: 'Familienbonus & Absetzbeträge', included: true },
      { text: 'Berechnungen speichern', included: true },
      { text: 'Dashboard mit Verlauf', included: true },
      { text: 'Einfacher Export', included: true },
      { text: 'SVS-Beitragsrechner', included: true },
      { text: 'Wahrheits-Tabelle', included: true },
      { text: 'Geldfluss-Diagramm', included: true },
      { text: 'Sachbezug-Rechner', included: true },
      { text: 'Steuer-Wissen Bot', included: true },
      // Expandable – not included
      { text: 'Steuer-Chatbot (7 Rechner)', included: false },
      { text: 'AI SteuerBoard', included: false },
      { text: 'Misch-Einkommen Rechner', included: false },
      { text: 'GmbH-Vergleich', included: false },
      { text: 'Pauschalierung Vergleich', included: false },
      { text: 'USt-Rechner & Rücklagen', included: false },
      { text: 'Gewinnmaximierer', included: false },
      { text: 'Investitionen & AfA', included: false },
      { text: 'Krypto-Steuer', included: false },
      { text: 'PDF-Export für Steuerberater', included: false },
    ],
    buttonText: 'Jetzt starten',
    href: '/pricing',
    isPopular: false,
  },
]

function PricingSection() {
  return (
    <>
      <Pricing
        plans={PRICING_PLANS}
        title="SteuerBoard kostet dich nichts – es spart dir Geld"
        description={'Voll absetzbar als Betriebsausgabe. Senkt deine Steuerlast.\nUnterm Strich ist SteuerBoard immer ein Gewinn.'}
      />
      <div className="text-center max-w-2xl mx-auto mt-10 px-4 space-y-4">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 space-y-3">
          <p className="text-lg font-bold text-emerald-400">
            Die Rechnung ist einfach
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-400 font-mono">&euro;3.200</p>
              <p className="text-xs text-blue-200/50 mt-1">&Oslash; SVS-Nachzahlung<br />ohne Vorwarnung</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-300 font-mono">&euro;13,55</p>
              <p className="text-xs text-blue-200/50 mt-1">SteuerBoard Pro/Monat<br />nach Absetzung*</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400 font-mono">= Gewinn</p>
              <p className="text-xs text-blue-200/50 mt-1">Volle Kontrolle,<br />keine &Uuml;berraschungen</p>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-blue-200/25">
          * Effektivpreis bei 32&nbsp;% Grenzsteuersatz. Die Kosten f&uuml;r SteuerBoard sind als Betriebsausgabe absetzbar und senken deine Steuerlast.
        </p>
      </div>
    </>
  )
}

/* ─── Trust ─── */
function TrustSection() {
  const badges = [
    { icon: <Lock className="h-5 w-5" />, label: 'DSGVO-konform', desc: 'Deine Daten bleiben in der EU' },
    { icon: <Shield className="h-5 w-5" />, label: 'SSL-verschlüsselt', desc: 'Bankgrade Verschlüsselung' },
    { icon: <Heart className="h-5 w-5" />, label: 'Made in Austria', desc: 'Gebaut für österreichisches Steuerrecht' },
    { icon: <Calculator className="h-5 w-5" />, label: 'Aktuelle Werte', desc: '2024, 2025 & 2026 Steuerdaten' },
  ]

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Vertrauenswürdig & sicher
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((b, i) => (
            <Reveal key={b.label} delay={i * 100}>
              <div className="text-center p-4 sm:p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mx-auto mb-3">
                  {b.icon}
                </div>
                <p className="font-semibold text-white text-sm">{b.label}</p>
                <p className="text-xs text-blue-200/40 mt-1">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQSection() {
  const faqs = [
    {
      q: 'Was ist SteuerBoard.pro und für wen ist es gedacht?',
      a: 'SteuerBoard.pro ist ein interaktiver Steuer- und SVS-Rechner für österreichische Selbständige — Einzelunternehmer (EPU), Freiberufler und Gewerbetreibende, die bei der SVS (Sozialversicherung der Selbständigen) nach GSVG oder FSVG versichert sind. Du gibst Umsatz und Betriebsausgaben ein und erhältst sofort eine Berechnung deiner SVS-Beiträge (Pensionsversicherung, Krankenversicherung, Unfallversicherung, Selbständigenvorsorge), der Einkommensteuer nach dem progressiven Tarif (§ 33 EStG) und deines echten Nettos — also was wirklich auf deinem Konto bleibt.',
    },
    {
      q: 'Warum SteuerBoard.pro und nicht der WKO SVS-Rechner?',
      a: 'Der WKO SVS-Beitragsrechner berechnet nur die reinen SVS-Beiträge — ohne Einkommensteuer, ohne Nachzahlungsprognose und ohne echtes Netto. SteuerBoard.pro geht deutlich weiter: Du siehst die voraussichtliche SVS-Nachzahlung (die sogenannte „Nachzahlungsfalle"), die Einkommensteuer-Prognose nach Tarifstufen, das Geldfluss-Diagramm (was geht an SVS, Finanzamt und was bleibt netto), die Wahrheits-Tabelle mit vorläufigen vs. endgültigen Beiträgen, einen AI SteuerBoard, GmbH-Vergleich, Pauschalierungs-Check und 7 spezialisierte Steuerrechner. Der WKO-Rechner ist ein einfacher Beitragsrechner — SteuerBoard ist eine komplette Steuerplanungs-Plattform.',
    },
    {
      q: 'Welche Features bietet SteuerBoard.pro?',
      a: 'Free (kostenlos): SVS-Beitragsrechner, Wahrheits-Tabelle, Geldfluss-Diagramm, Sachbezug-Rechner, Steuer-Wissen Bot und aktuelle Werte für 2024–2026. Sicherheits-Plan (12,90 EUR/Monat): zusätzlich Einkommensteuer-Prognose, Familienbonus & Absetzbeträge, Berechnungen speichern, Dashboard mit Verlauf und Export. SteuerBoard Pro (24,90 EUR/Monat): alles plus Steuer-Chatbot mit 7 Rechnern (ESt, KöSt, USt, Krypto, ImmoESt, Sachbezug, IFB), AI SteuerBoard mit persönlicher Optimierung, Misch-Einkommen Rechner für Angestellte mit Nebeneinkünften, GmbH-Vergleich (EPU vs. GmbH mit Break-Even), Pauschalierungs-Vergleich, USt-Rechner & monatliche Rücklagen, Gewinnmaximierer, Investitionen & AfA und PDF-Export für den Steuerberater.',
    },
    {
      q: 'Was ist die SVS-Nachzahlungsfalle und wie schützt SteuerBoard davor?',
      a: 'Die SVS berechnet deine Beiträge zunächst vorläufig — auf Basis deines Gewinns von vor 3 Jahren (§ 25a GSVG). Steigt dein Einkommen, kommt es nach dem Steuerbescheid zu einer oft hohen Nachzahlung, die viele Selbständige unvorbereitet trifft. Bei einer Gewinnsteigerung von 30.000 auf 60.000 EUR kann die Nachzahlung über 5.000 EUR betragen. SteuerBoard.pro zeigt dir die exakte Differenz zwischen vorläufigen und endgültigen Beiträgen, berechnet monatliche Rücklagen und warnt dich rechtzeitig.',
    },
    {
      q: 'Wie wird die Einkommensteuer für Selbständige in Österreich berechnet?',
      a: 'Die Einkommensteuer wird auf dein steuerpflichtiges Einkommen nach dem progressiven Tarif gemäß § 33 EStG berechnet: 0 % bis 12.816 EUR, 20 % bis 20.818 EUR, 30 % bis 34.513 EUR, 40 % bis 66.612 EUR, 48 % bis 99.266 EUR, 50 % bis 1 Mio. EUR. SteuerBoard zieht automatisch SVS-Beiträge, den Gewinnfreibetrag (§ 10 EStG, bis zu 15 % vom Gewinn) und Absetzbeträge wie Familienbonus Plus (2.100 EUR/Kind), AVAB (572 EUR), Verkehrsabsetzbetrag (481 EUR) und Pendlerpauschale ab. Du siehst Grenzsteuersatz und Durchschnittssteuersatz auf einen Blick.',
    },
    {
      q: 'Was kann der KI-Steuer-Chatbot?',
      a: 'Der Steuer-Chatbot (Pro-Feature) ist ein KI-Assistent powered by Claude AI, der deine Steuerfragen in Echtzeit beantwortet und mit aktuellen österreichischen Werten für 2026 rechnet. Er hat Zugriff auf 7 spezialisierte Rechner: Einkommensteuer, Körperschaftsteuer (23 % KöSt), Umsatzsteuer (inkl. Kleinunternehmerregelung § 6 Abs. 1 Z 27 UStG), Krypto-Steuer (27,5 % KESt), Immobilienertragsteuer (30 % ImmoESt), Sachbezug und Investitionsfreibetrag (§ 11 EStG, 10–15 %). Stelle Fragen wie „Wie viel ESt zahle ich bei 80.000 EUR Gewinn?" oder „Lohnt sich eine GmbH ab welchem Gewinn?".',
    },
    {
      q: 'Funktioniert SteuerBoard auch bei Misch-Einkommen (angestellt und selbständig)?',
      a: 'Ja. Der Misch-Einkommen Rechner (Pro-Feature) ist speziell für Personen mit unselbständigen und selbständigen Einkünften gebaut. Er berechnet die Differenz-Vorschreibung der SVS, berücksichtigt die doppelte Sozialversicherung (ASVG + GSVG) und ermittelt das kombinierte echte Netto aus beiden Einkunftsarten. Das ist besonders relevant für Angestellte mit Nebeneinkünften über der Geringfügigkeitsgrenze.',
    },
    {
      q: 'Wann lohnt sich eine GmbH statt Einzelunternehmen?',
      a: 'Der GmbH-Vergleich (Pro-Feature) berechnet den Break-Even-Punkt zwischen EPU und GmbH. Bei einer GmbH fallen 23 % Körperschaftsteuer (KöSt) plus 27,5 % Kapitalertragsteuer (KESt) auf Ausschüttungen an, dafür entfällt die SVS des Geschäftsführers zugunsten von ASVG-Beiträgen. Typischerweise lohnt sich eine GmbH ab ca. 60.000–80.000 EUR Gewinn — SteuerBoard zeigt dir den exakten Punkt für deine Situation mit konkreten EUR-Beträgen.',
    },
    {
      q: 'Welche Steuerjahre unterstützt SteuerBoard?',
      a: 'SteuerBoard.pro enthält die aktuellen Werte für 2024, 2025 und 2026 — inklusive der neuen Werte ab 2026: Familienbonus Plus (2.100 EUR), angepasster AVAB (572 EUR), Verkehrsabsetzbetrag (481 EUR), Kindermehrbetrag (727 EUR), Kleinunternehmergrenze (55.000 EUR netto) und aktualisierte SVS-Mindest- und Höchstbeitragsgrundlagen.',
    },
    {
      q: 'Ersetzt SteuerBoard.pro einen Steuerberater?',
      a: 'Nein. SteuerBoard.pro ist ein Planungs- und Orientierungstool. Alle Berechnungen basieren auf den aktuellen gesetzlichen Grundlagen (EStG, GSVG, FSVG, UStG, KStG), sind aber Richtwerte ohne Gewähr. Die endgültigen Bescheide der SVS und des Finanzamts können abweichen. Für verbindliche Auskünfte, komplexe Gestaltungen oder individuelle Steueroptimierung empfehlen wir eine professionelle Steuerberatung. SteuerBoard hilft dir, vorbereitet ins Gespräch zu gehen — mit konkreten Zahlen und einem PDF-Export.',
    },
    {
      q: 'Wie kann ich mein Abo kündigen?',
      a: 'Jederzeit mit einem Klick unter Profil → Abo verwalten. Du wirst zum Stripe-Kundenportal weitergeleitet, wo du sofort kündigen kannst. Du behältst Zugriff auf Pro-Features bis zum Ende des bezahlten Zeitraums. Keine versteckten Fristen, keine Kündigungsgebühren, keine Tricks. Die Zahlung läuft sicher über Stripe — wir speichern keine Kreditkartendaten.',
    },
  ]

  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Häufig gestellte Fragen
            </h2>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 data-[state=open]:bg-white/[0.06] transition-colors duration-150"
              >
                <AccordionTrigger className="text-white text-left hover:no-underline text-sm sm:text-base py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-blue-200/60 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-blue-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div className="flex justify-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20">
              <Calculator className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            2026 l&auml;uft &ndash; wei&szlig;t du, was dir bleibt?
          </h2>
          <p className="text-blue-200/60 text-lg mb-8 max-w-md mx-auto">
            Je fr&uuml;her du planst, desto mehr sparst du. In 30 Sekunden wei&szlig;t du, was die SVS wirklich von dir will.
          </p>
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-elevation-3 shadow-emerald-500/25 text-base px-10 h-13">
            <Link href="/rechner">
              Jetzt gratis berechnen
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <p className="text-blue-200/30 text-sm mt-6">
            Kostenlos. Keine Kreditkarte. Keine Registrierung nötig.
          </p>
        </Reveal>
      </div>
    </section>
  )
}


/* ─── FAQ JSON-LD ─── */
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist SteuerBoard.pro und für wen ist es gedacht?',
      acceptedAnswer: { '@type': 'Answer', text: 'SteuerBoard.pro ist ein interaktiver Steuer- und SVS-Rechner für österreichische Selbständige — Einzelunternehmer (EPU), Freiberufler und Gewerbetreibende, die bei der SVS nach GSVG oder FSVG versichert sind. Du gibst Umsatz und Betriebsausgaben ein und erhältst sofort eine Berechnung deiner SVS-Beiträge, der Einkommensteuer nach dem progressiven Tarif (§ 33 EStG) und deines echten Nettos.' },
    },
    {
      '@type': 'Question',
      name: 'Warum SteuerBoard.pro und nicht der WKO SVS-Rechner?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der WKO SVS-Beitragsrechner berechnet nur die reinen SVS-Beiträge — ohne Einkommensteuer, ohne Nachzahlungsprognose und ohne echtes Netto. SteuerBoard.pro zeigt zusätzlich die voraussichtliche SVS-Nachzahlung, die Einkommensteuer-Prognose nach Tarifstufen, das Geldfluss-Diagramm, die Wahrheits-Tabelle mit vorläufigen vs. endgültigen Beiträgen, einen AI SteuerBoard, GmbH-Vergleich, Pauschalierungs-Check und 7 spezialisierte Steuerrechner.' },
    },
    {
      '@type': 'Question',
      name: 'Welche Features bietet SteuerBoard.pro?',
      acceptedAnswer: { '@type': 'Answer', text: 'Free (kostenlos): SVS-Beitragsrechner, Wahrheits-Tabelle, Geldfluss-Diagramm, Sachbezug-Rechner, Steuer-Wissen Bot und aktuelle Werte für 2024–2026. Sicherheits-Plan (12,90 EUR/Monat): zusätzlich Einkommensteuer-Prognose, Familienbonus & Absetzbeträge, Berechnungen speichern, Dashboard mit Verlauf und Export. SteuerBoard Pro (24,90 EUR/Monat): alles plus Steuer-Chatbot mit 7 Rechnern, AI SteuerBoard, Misch-Einkommen Rechner, GmbH-Vergleich, Pauschalierungs-Vergleich, USt-Rechner, Gewinnmaximierer, AfA-Rechner und PDF-Export.' },
    },
    {
      '@type': 'Question',
      name: 'Was ist die SVS-Nachzahlungsfalle und wie schützt SteuerBoard davor?',
      acceptedAnswer: { '@type': 'Answer', text: 'Die SVS berechnet Beiträge zunächst vorläufig auf Basis des Gewinns von vor 3 Jahren (§ 25a GSVG). Steigt das Einkommen, kommt es nach dem Steuerbescheid zu einer oft hohen Nachzahlung. Bei einer Gewinnsteigerung von 30.000 auf 60.000 EUR kann die Nachzahlung über 5.000 EUR betragen. SteuerBoard.pro zeigt die exakte Differenz und berechnet monatliche Rücklagen.' },
    },
    {
      '@type': 'Question',
      name: 'Wie wird die Einkommensteuer für Selbständige in Österreich berechnet?',
      acceptedAnswer: { '@type': 'Answer', text: 'Die Einkommensteuer wird nach dem progressiven Tarif gemäß § 33 EStG berechnet: 0 % bis 12.816 EUR, 20 % bis 20.818 EUR, 30 % bis 34.513 EUR, 40 % bis 66.612 EUR, 48 % bis 99.266 EUR, 50 % bis 1 Mio. EUR. SteuerBoard zieht automatisch SVS-Beiträge, den Gewinnfreibetrag (§ 10 EStG) und Absetzbeträge wie Familienbonus Plus (2.100 EUR/Kind), AVAB (572 EUR) und Verkehrsabsetzbetrag (481 EUR) ab.' },
    },
    {
      '@type': 'Question',
      name: 'Was kann der KI-Steuer-Chatbot?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der Steuer-Chatbot ist ein KI-Assistent powered by Claude AI mit Zugriff auf 7 spezialisierte Rechner: Einkommensteuer, Körperschaftsteuer (23 % KöSt), Umsatzsteuer (inkl. Kleinunternehmerregelung), Krypto-Steuer (27,5 % KESt), Immobilienertragsteuer (30 % ImmoESt), Sachbezug und Investitionsfreibetrag. Er rechnet mit aktuellen österreichischen Werten für 2026.' },
    },
    {
      '@type': 'Question',
      name: 'Funktioniert SteuerBoard auch bei Misch-Einkommen (angestellt und selbständig)?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja. Der Misch-Einkommen Rechner berechnet die Differenz-Vorschreibung der SVS, berücksichtigt die doppelte Sozialversicherung (ASVG + GSVG) und ermittelt das kombinierte echte Netto aus beiden Einkunftsarten.' },
    },
    {
      '@type': 'Question',
      name: 'Wann lohnt sich eine GmbH statt Einzelunternehmen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Bei einer GmbH fallen 23 % Körperschaftsteuer plus 27,5 % KESt auf Ausschüttungen an. Typischerweise lohnt sich eine GmbH ab ca. 60.000–80.000 EUR Gewinn. SteuerBoard berechnet den exakten Break-Even-Punkt für die individuelle Situation.' },
    },
    {
      '@type': 'Question',
      name: 'Welche Steuerjahre unterstützt SteuerBoard?',
      acceptedAnswer: { '@type': 'Answer', text: 'SteuerBoard.pro enthält aktuelle Werte für 2024, 2025 und 2026 — inklusive Familienbonus Plus (2.100 EUR), AVAB (572 EUR), Verkehrsabsetzbetrag (481 EUR), Kindermehrbetrag (727 EUR), Kleinunternehmergrenze (55.000 EUR) und aktualisierte SVS-Beitragsgrundlagen.' },
    },
    {
      '@type': 'Question',
      name: 'Ersetzt SteuerBoard.pro einen Steuerberater?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nein. SteuerBoard.pro ist ein Planungs- und Orientierungstool. Alle Berechnungen basieren auf den aktuellen gesetzlichen Grundlagen (EStG, GSVG, FSVG, UStG, KStG), sind aber Richtwerte ohne Gewähr. Für verbindliche Auskünfte empfehlen wir eine professionelle Steuerberatung.' },
    },
    {
      '@type': 'Question',
      name: 'Wie kann ich mein Abo kündigen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jederzeit mit einem Klick unter Profil → Abo verwalten. Du wirst zum Stripe-Kundenportal weitergeleitet und behältst Zugriff bis zum Ende des bezahlten Zeitraums. Keine versteckten Fristen, keine Kündigungsgebühren.' },
    },
  ],
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <main className="bg-slate-950">
      <RecoveryRedirect />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Navbar />
      <Hero />
      <ProblemSection />
      <Testimonials />
      <FeaturesSection />
      <PricingSection />
      <TrustSection />
      <FAQSection />
      <FinalCTA />
      <SiteFooter />
    </main>
  )
}
