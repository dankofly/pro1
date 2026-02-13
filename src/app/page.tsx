'use client'

import { useEffect, useRef, useState } from 'react'
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
  X,
  ChevronDown,
  Zap,
  Crown,
  Lock,
  Heart,
  Star,
  CalendarDays,
  Sparkles,
  Building2,
  BarChart3,
  Layers,
} from 'lucide-react'

/* ─── Scroll-reveal hook ─── */
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
      { threshold: 0.15 }
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

/* ─── Counter animation ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, visible } = useReveal()

  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 1200
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, target])

  return (
    <span ref={ref} className="tabular-nums font-mono">
      {count.toLocaleString('de-AT')}{suffix}
    </span>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
              <Calculator className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="font-bold text-white text-lg font-heading">SVS Checker</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-blue-200">
            <a href="#problem" className="hover:text-white transition-colors">Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Preise</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-white/10">
            <Link href="/auth/login">Anmelden</Link>
          </Button>
          <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25">
            <Link href="/rechner">Jetzt berechnen</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

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
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-6 text-sm px-4 py-1.5">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Für Selbständige in Österreich
              </Badge>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight font-heading">
                SVS-Nachzahlung?<br />
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  Nie wieder überrascht.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 text-lg sm:text-xl text-blue-200/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Berechne in Sekunden, was die SVS wirklich von dir will – inklusive Einkommensteuer,
                Familienbonus und echtem Netto. Mit Werten für 2024, 2025 und 2026.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/25 text-base px-8 h-12 w-full sm:w-auto">
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
                  <a href="#features">
                    Mehr erfahren
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-blue-300/60">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> Kostenlos starten
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> Keine Kreditkarte
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> DSGVO-konform
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
              <div className="relative glass-dark rounded-2xl p-6 border border-white/10 shadow-2xl">
                {/* Mock top bar */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                  <span className="ml-3 text-xs text-white/30 font-mono">svs-checker.at</span>
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce motion-reduce:animate-none">
        <ChevronDown className="h-6 w-6 text-white/30" />
      </div>
    </section>
  )
}

/* ─── Social Proof ─── */
const REVIEWS = [
  { name: 'Sandra K.', role: 'Texterin', text: 'In 30 Sekunden mein echtes Netto berechnet. Mein Steuerberater war beeindruckt.' },
  { name: 'Thomas W.', role: 'IT-Freelancer', text: 'Der Misch-Einkommen Rechner hat mir 2 Stunden beim Steuerberater gespart. Absolut genial.' },
  { name: 'David P.', role: 'Berater', text: 'Die Nachzahlungs-Prognose war auf den Euro genau. Besser als jeder Excel-Rechner.' },
  { name: 'Julia H.', role: 'Online-Händlerin', text: 'Familienbonus, AVAB, alles automatisch dabei. Ich spar mir den Gang zum Steuerberater.' },
  { name: 'Stefan B.', role: 'Webentwickler', text: 'Nutze den Rechner jeden Monat. Die Wasserfall-Analyse zeigt mir genau wo mein Geld hingeht.' },
  { name: 'Anna G.', role: 'Coach', text: 'Endlich ein Tool das Selbständige in Österreich wirklich verstehen. Klare Empfehlung!' },
]

function SocialProof() {
  return (
    <section className="relative py-16 sm:py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center mb-12">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-blue-200/60 text-sm">
              <span className="text-white font-semibold">4.9/5</span> von über 500+ Selbständigen
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5 h-full">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-blue-100/80 text-sm leading-relaxed mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-heading">
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{r.name}</p>
                    <p className="text-blue-200/40 text-xs">{r.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
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
      title: 'Die Falle',
      desc: 'Die SVS rechnet mit deinem Gewinn von vor 3 Jahren. Steigt dein Einkommen, kommt eine saftige Nachzahlung – oft tausende Euro, völlig unerwartet.',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Die Ungewissheit',
      desc: 'Vorläufige Beiträge, endgültige Bescheide, Geringfügigkeitsgrenze, Höchstbeitragsgrundlage – wer blickt da noch durch? Du weißt nie, was am Ende wirklich übrig bleibt.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Der Misch-Masch',
      desc: 'Angestellt und gleichzeitig selbständig? Dann wird es richtig kompliziert: Differenz-Vorschreibung, doppelte SV, Absetzbeträge – eine Formel, die kein normaler Mensch im Kopf hat.',
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
              Warum Selbständige jedes Jahr böse überrascht werden
            </h2>
            <p className="mt-4 text-blue-200/60 max-w-2xl mx-auto text-lg">
              Die SVS-Abrechnung ist bewusst kompliziert. Ohne die richtigen Zahlen tappst du im Dunkeln.
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
                  Betrifft 80% aller Selbständigen in Österreich
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
              <Card className="relative bg-white/[0.03] border-white/10 h-full">
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
                <Card className="bg-white/[0.03] border-white/10 h-full">
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
            <div className="flex items-start gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 shrink-0">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white font-heading">Misch-Einkommen Rechner</h4>
                <p className="text-sm text-blue-200/50 mt-1">Angestellt + Gewerbe? Berechne die Differenz-Vorschreibung, doppelte SV und dein echtes kombiniertes Netto.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-5">
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

        {/* KI-Steuerberater – Highlight Card */}
        <Reveal delay={250}>
          <div className="mt-8 relative group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-white/[0.05] border border-amber-500/20 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 shrink-0">
                  <Sparkles className="h-6 w-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xl font-bold text-white font-heading">KI-Steuerberater</h4>
                    <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/25 text-xs">
                      Pro · Powered by AI
                    </Badge>
                  </div>
                  <p className="text-blue-200/60 leading-relaxed">
                    Dein persönlicher KI-Steuerexperte analysiert deine Zahlen und gibt dir konkrete
                    Optimierungsstrategien mit Euro-Beträgen — direkt, praxisorientiert und auf
                    deine Situation zugeschnitten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Pro Rechner Features – 4-col Grid */}
        <Reveal delay={300}>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Building2 className="h-4 w-4 text-blue-400" />, bg: 'bg-blue-500/10', title: 'GmbH-Vergleich', desc: 'Vergleiche die Steuerbelastung als EPU vs. GmbH — mit konkreten Netto-Zahlen.' },
              { icon: <Layers className="h-4 w-4 text-purple-400" />, bg: 'bg-purple-500/10', title: 'Pauschalierung', desc: 'Prüfe automatisch ob eine Pauschalierung für dich günstiger wäre.' },
              { icon: <BarChart3 className="h-4 w-4 text-emerald-400" />, bg: 'bg-emerald-500/10', title: 'Gewinnmaximierer', desc: 'Simuliere Zusatzumsätze und sieh die Auswirkung auf Steuern und Netto.' },
              { icon: <Calculator className="h-4 w-4 text-amber-400" />, bg: 'bg-amber-500/10', title: 'Investitionen & AfA', desc: 'Berechne Abschreibungen für Einrichtung, EDV und Maschinen.' },
            ].map((f) => (
              <div key={f.title} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
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
function PricingSection() {
  const [yearly, setYearly] = useState(false)

  const tiers = [
    {
      name: 'Free',
      monthlyPrice: '0',
      yearlyPrice: '0',
      unit: yearly ? 'für immer' : 'für immer',
      desc: 'Für den schnellen Check',
      isFree: true,
      features: [
        { text: 'SVS-Beitragsrechner', included: true },
        { text: 'Wahrheits-Tabelle', included: true },
        { text: 'Geldfluss-Diagramm', included: true },
        { text: 'Einkommensteuer-Prognose', included: false },
        { text: 'KI-Steuerberater', included: false },
        { text: 'GmbH-Vergleich', included: false },
        { text: 'PDF-Export', included: false },
      ],
      cta: 'Jetzt gratis starten',
      href: '/rechner',
      highlight: false,
    },
    {
      name: 'Sicherheits-Plan',
      monthlyPrice: '9,90',
      yearlyPrice: '8,25',
      yearlyTotal: '99',
      unit: yearly ? 'pro Monat' : 'pro Monat',
      desc: 'Für Einsteiger',
      isFree: false,
      features: [
        { text: 'Alles aus Free', included: true },
        { text: 'Einkommensteuer-Prognose', included: true },
        { text: 'Berechnungen speichern', included: true },
        { text: 'Dashboard mit Verlauf', included: true },
        { text: 'Einfacher Export', included: true },
        { text: 'Misch-Einkommen Rechner', included: false },
        { text: 'Familienbonus & Absetzbeträge', included: false },
      ],
      cta: 'Jetzt starten',
      href: '/pricing',
      highlight: false,
    },
    {
      name: 'SVS Checker Pro',
      monthlyPrice: '19,90',
      yearlyPrice: '16,58',
      yearlyTotal: '199',
      unit: yearly ? 'pro Monat' : 'pro Monat',
      desc: 'Für Profis',
      isFree: false,
      features: [
        { text: 'Alles aus Sicherheits-Plan', included: true },
        { text: 'KI-Steuerberater', included: true },
        { text: 'Misch-Einkommen Rechner', included: true },
        { text: 'GmbH-Vergleich', included: true },
        { text: 'Pauschalierung Vergleich', included: true },
        { text: 'Gewinnmaximierer', included: true },
        { text: 'Investitionen & AfA', included: true },
        { text: 'Familienbonus & Absetzbeträge', included: true },
        { text: 'PDF-Export für Steuerberater', included: true },
        { text: 'Smart Alerts & Push', included: true },
      ],
      cta: 'Jetzt upgraden',
      href: '/pricing',
      highlight: true,
    },
  ]

  return (
    <section id="pricing" className="relative py-20 sm:py-28 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-10">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
              Preise
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Starte kostenlos, upgrade wenn du bereit bist
            </h2>
            <p className="mt-4 text-blue-200/60 max-w-2xl mx-auto text-lg">
              Keine versteckten Kosten. Monatlich kündbar. Sichere Zahlung via Stripe.
            </p>
          </div>
        </Reveal>

        {/* Billing Toggle */}
        <Reveal delay={100}>
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium transition-colors ${!yearly ? 'text-white' : 'text-blue-200/40'}`}>
              Monatlich
            </span>
            <button
              role="switch"
              aria-checked={yearly}
              aria-label="Jährliche Abrechnung"
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                yearly ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  yearly ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${yearly ? 'text-white' : 'text-blue-200/40'}`}>
              Jährlich
            </span>
            {yearly && (
              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 text-xs">
                Spare 20%
              </Badge>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => {
            const price = yearly ? tier.yearlyPrice : tier.monthlyPrice
            return (
              <Reveal key={tier.name} delay={i * 150}>
                <Card
                  className={`relative h-full ${
                    tier.highlight
                      ? 'bg-white/10 border-amber-400/30 ring-2 ring-amber-400/20'
                      : 'bg-white/[0.03] border-white/10'
                  } backdrop-blur-sm`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-amber-500 text-white border-0 shadow-lg">
                        <Zap className="h-3 w-3 mr-1" />
                        Beliebtester Plan
                      </Badge>
                    </div>
                  )}
                  <CardContent className={`p-6 sm:p-8 ${tier.highlight ? 'pt-10' : ''}`}>
                    <p className="text-blue-200/60 text-sm">{tier.desc}</p>
                    <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                      {tier.highlight && <Crown className="h-5 w-5 text-amber-400" />}
                      {tier.name}
                    </h3>
                    <div className="mt-4 mb-1">
                      <span className="text-4xl font-extrabold text-white font-mono">{price} EUR</span>
                      <span className="text-blue-200/50 text-sm ml-2">/ {tier.unit}</span>
                    </div>
                    <div className="mb-6 h-5">
                      {yearly && !tier.isFree && (
                        <div className="flex items-center gap-2">
                          <span className="text-blue-200/30 text-xs line-through">{tier.monthlyPrice} EUR/Monat</span>
                          <span className="text-emerald-400 text-xs font-medium">{tier.yearlyTotal} EUR/Jahr</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-8">
                      {tier.features.map((f) => (
                        <div key={f.text} className="flex items-center gap-2.5 text-sm">
                          {f.included ? (
                            <Check className={`h-4 w-4 shrink-0 ${tier.highlight ? 'text-amber-400' : 'text-emerald-400'}`} />
                          ) : (
                            <X className="h-4 w-4 shrink-0 text-white/20" />
                          )}
                          <span className={f.included ? 'text-blue-100' : 'text-white/30'}>
                            {f.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      className={`w-full ${
                        tier.highlight
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                    >
                      <Link href={tier.href}>
                        {tier.highlight && <Crown className="h-4 w-4 mr-1.5" />}
                        {tier.cta}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={300}>
          <p className="text-center text-blue-200/30 text-xs mt-8">
            Alle Preise inkl. USt. {yearly ? 'Jährlich im Voraus. ' : 'Monatlich kündbar. '}Sichere Zahlung via Stripe.
          </p>
        </Reveal>
      </div>
    </section>
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
              <div className="text-center p-4 sm:p-6 bg-white/[0.03] border border-white/10 rounded-xl">
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
      q: 'Was genau berechnet der SVS Checker?',
      a: 'Der SVS Checker berechnet deine endgültigen SVS-Beiträge (PV, KV, UV, Selbständigenvorsorge), die voraussichtliche Nachzahlung, die Einkommensteuer-Prognose und dein echtes Netto – basierend auf deinem tatsächlichen Jahresgewinn.',
    },
    {
      q: 'Sind die Berechnungen rechtlich verbindlich?',
      a: 'Nein. Der SVS Checker ist ein Prognose-Tool und ersetzt keine Steuerberatung. Alle Berechnungen basieren auf den aktuellen gesetzlichen Grundlagen, aber die endgültigen Bescheide der SVS und des Finanzamts können abweichen.',
    },
    {
      q: 'Was ist der Unterschied zwischen Free und Pro?',
      a: 'Die Free-Version bietet den SVS-Beitragsrechner, die Wahrheits-Tabelle und das Geldfluss-Diagramm. Der Sicherheits-Plan (9,90 EUR/Monat) fügt die Einkommensteuer-Prognose, Speichern und Export hinzu. SVS Checker Pro (19,90 EUR/Monat) bietet alles plus KI-Steuerberater, GmbH-Vergleich, Pauschalierung, Gewinnmaximierer, Investitionen & AfA, Misch-Einkommen Rechner, Familienbonus-Berechnung und PDF-Export.',
    },
    {
      q: 'Was ist die Nachzahlungsfalle?',
      a: 'Die SVS berechnet deine Beiträge zunächst auf Basis deines Gewinns von vor 3 Jahren (vorläufige Beitragsgrundlage). Steigt dein Einkommen, kommt es nach dem Steuerbescheid zu einer oft hohen Nachzahlung. Der SVS Checker zeigt dir genau, wie hoch diese ausfallen wird.',
    },
    {
      q: 'Kann ich den Rechner auch nutzen, wenn ich angestellt UND selbständig bin?',
      a: 'Ja! Der Misch-Einkommen Rechner (Pro-Feature) ist genau dafür gebaut. Er berechnet die Differenz-Vorschreibung, berücksichtigt die doppelte Sozialversicherung und zeigt dir das kombinierte Netto aus beiden Einkunftsarten.',
    },
    {
      q: 'Sind die Werte für 2026 schon verfügbar?',
      a: 'Ja! Wir haben bereits die neuen Werte für 2026 eingebaut: Familienbonus Plus (2.100 EUR), angepasster AVAB, aktualisierter Verkehrsabsetzbetrag (481 EUR) und Kindermehrbetrag (727 EUR).',
    },
    {
      q: 'Wie kann ich mein Abo kündigen?',
      a: 'Jederzeit mit einem Klick im Dashboard unter Einstellungen. Die Kündigung wird sofort wirksam am Ende des aktuellen Abrechnungszeitraums. Keine versteckten Fristen, keine Tricks.',
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
                className="bg-white/[0.03] border border-white/10 rounded-xl px-5 data-[state=open]:bg-white/[0.06] transition-colors"
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
            Bereit, dein echtes Netto zu kennen?
          </h2>
          <p className="text-blue-200/60 text-lg mb-8 max-w-md mx-auto">
            Starte jetzt kostenlos und berechne in 30 Sekunden, was die SVS wirklich von dir will.
          </p>
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/25 text-base px-10 h-13">
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

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/20">
              <Calculator className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <span className="font-semibold text-white text-sm">SVS Checker</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-blue-200/40">
            <Link href="/impressum" className="hover:text-blue-200 transition-colors">Impressum</Link>
            <span>·</span>
            <Link href="/datenschutz" className="hover:text-blue-200 transition-colors">Datenschutz</Link>
            <span>·</span>
            <Link href="/pricing" className="hover:text-blue-200 transition-colors">Preise</Link>
          </div>
          <p className="text-xs text-blue-200/30" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} SVS Checker. Alle Rechte vorbehalten.
            <span className="mx-1">·</span>
            <a href="https://hypeakz.io" target="_blank" rel="noopener noreferrer" className="text-blue-200/40 hover:text-blue-200 transition-colors">App by Hypeakz.io</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─── FAQ JSON-LD ─── */
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was genau berechnet der SVS Checker?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der SVS Checker berechnet deine endgültigen SVS-Beiträge (PV, KV, UV, Selbständigenvorsorge), die voraussichtliche Nachzahlung, die Einkommensteuer-Prognose und dein echtes Netto – basierend auf deinem tatsächlichen Jahresgewinn.' },
    },
    {
      '@type': 'Question',
      name: 'Sind die Berechnungen rechtlich verbindlich?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nein. Der SVS Checker ist ein Prognose-Tool und ersetzt keine Steuerberatung. Alle Berechnungen basieren auf den aktuellen gesetzlichen Grundlagen, aber die endgültigen Bescheide der SVS und des Finanzamts können abweichen.' },
    },
    {
      '@type': 'Question',
      name: 'Was ist der Unterschied zwischen Free und Pro?',
      acceptedAnswer: { '@type': 'Answer', text: 'Die Free-Version bietet den SVS-Beitragsrechner, die Wahrheits-Tabelle und das Geldfluss-Diagramm. Der Sicherheits-Plan (9,90 EUR/Monat) fügt die Einkommensteuer-Prognose, Speichern und Export hinzu. SVS Checker Pro (19,90 EUR/Monat) bietet alles plus KI-Steuerberater, GmbH-Vergleich, Pauschalierung, Gewinnmaximierer, Investitionen & AfA, Misch-Einkommen Rechner, Familienbonus-Berechnung und PDF-Export.' },
    },
    {
      '@type': 'Question',
      name: 'Was ist die SVS-Nachzahlungsfalle?',
      acceptedAnswer: { '@type': 'Answer', text: 'Die SVS berechnet deine Beiträge zunächst auf Basis deines Gewinns von vor 3 Jahren (vorläufige Beitragsgrundlage). Steigt dein Einkommen, kommt es nach dem Steuerbescheid zu einer oft hohen Nachzahlung. Der SVS Checker zeigt dir genau, wie hoch diese ausfallen wird.' },
    },
    {
      '@type': 'Question',
      name: 'Kann ich den Rechner auch nutzen, wenn ich angestellt UND selbständig bin?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja! Der Misch-Einkommen Rechner (Pro-Feature) ist genau dafür gebaut. Er berechnet die Differenz-Vorschreibung, berücksichtigt die doppelte Sozialversicherung und zeigt dir das kombinierte Netto aus beiden Einkunftsarten.' },
    },
    {
      '@type': 'Question',
      name: 'Sind die Werte für 2026 schon verfügbar?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja! Wir haben bereits die neuen Werte für 2026 eingebaut: Familienbonus Plus (2.100 EUR), angepasster AVAB, aktualisierter Verkehrsabsetzbetrag (481 EUR) und Kindermehrbetrag (727 EUR).' },
    },
    {
      '@type': 'Question',
      name: 'Wie kann ich mein Abo kündigen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jederzeit mit einem Klick im Dashboard unter Einstellungen. Die Kündigung wird sofort wirksam am Ende des aktuellen Abrechnungszeitraums. Keine versteckten Fristen, keine Tricks.' },
    },
  ],
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <main className="bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSection />
      <FeaturesSection />
      <PricingSection />
      <TrustSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
