import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Pricing } from '@/components/ui/pricing'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/ui/reveal'
import { RecoveryRedirect, Navbar } from '@/components/landing/landing-client'

/* ─── Shared button styles (landing-only) ─── */
const btnAccent =
  'inline-flex items-center justify-center rounded-[10px] bg-sb-accent text-sb-accent-ink font-heading font-semibold hover:bg-sb-accent-deep transition-colors duration-150'
const btnGhost =
  'inline-flex items-center justify-center rounded-[10px] border border-sb-line-strong text-sb-text font-heading font-semibold hover:border-white/30 transition-colors duration-150'

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      {/* Accent halo + dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 900px 480px at 50% -80px, oklch(0.72 0.165 55 / 0.07), transparent 65%), radial-gradient(circle 1px at 24px 24px, oklch(0.95 0.005 75 / 0.05) 1px, transparent 1px)',
          backgroundSize: 'auto, 48px 48px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-sb-dim">
          SVS- und Einkommensteuer-Prognose für Selbständige in Österreich
        </p>
        <h1 className="mx-auto mt-5 max-w-[30ch] font-heading text-[clamp(2.5rem,5.6vw,4rem)] font-bold leading-[1.06] tracking-[-0.022em] text-sb-text">
          Dein echtes Netto,
          <br />
          <span className="text-sb-mut">nach SVS und Einkommensteuer.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-sb-mut">
          SteuerBoard berechnet die vorläufigen SVS-Beiträge, die Einkommensteuer und die zu
          erwartende Nachbelastung aus der Nachbemessung. Für das laufende Jahr, mit den
          Steuerwerten 2024 bis 2026.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link href="/rechner" className={`${btnAccent} h-12 px-7 text-[15.5px]`}>
            Netto berechnen
          </Link>
          <a href="#pricing" className={`${btnGhost} h-12 px-7 text-[15.5px]`}>
            Preise ansehen
          </a>
        </div>
        <p className="mt-4 font-mono text-[13px] text-sb-dim">Kostenlos, ohne Registrierung.</p>

        {/* Dashboard mockup */}
        <div className="mx-auto mt-16 max-w-[960px] overflow-hidden rounded-2xl border border-sb-line-strong bg-sb-deep text-left shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-3.5 border-b border-sb-line px-4 py-3 sm:px-5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-sb-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </span>
            <span className="text-[13px] font-medium text-sb-mut">
              SteuerBoard · Jahresprognose 2026
            </span>
            <span className="ml-auto rounded-[7px] border border-sb-line px-2.5 py-1 font-mono text-[11px] text-sb-mut">
              JAN – DEZ 2026
            </span>
          </div>
          <div className="grid sm:grid-cols-[168px_1fr]">
            <div className="hidden border-r border-sb-line p-3 sm:block">
              {['Übersicht', 'SVS-Beiträge', 'Einkommensteuer', 'Misch-Einkommen', 'Rücklagenplan', 'AI SteuerBoard'].map(
                (item, i) => (
                  <div
                    key={item}
                    className={`mb-0.5 rounded-lg px-3 py-2 text-[12.5px] ${
                      i === 0 ? 'bg-white/[0.06] text-sb-text' : 'text-sb-mut'
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
            <div className="p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-[1.25fr_1fr_1fr]">
                {[
                  { label: 'Echtes Netto', value: '28.742', tag: '71,9 % vom Gewinn', tagClass: 'bg-sb-green-soft text-sb-green' },
                  { label: 'SVS gesamt', value: '7.124', tag: '4 Quartale', tagClass: 'bg-white/5 text-sb-mut' },
                  { label: 'Nachbelastung', value: '1.724', tag: 'Rücklage: 144 €/Monat', tagClass: 'bg-sb-accent-soft text-sb-accent' },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-xl border border-sb-line bg-sb-card px-4 py-3.5">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-sb-mut">{kpi.label}</p>
                    <p className="mt-2 font-mono text-2xl font-semibold text-sb-text">
                      {kpi.value} <span className="text-[13px] font-normal text-sb-mut">EUR</span>
                    </p>
                    <span className={`mt-2 inline-block rounded-md px-2 py-0.5 text-[11px] ${kpi.tagClass}`}>
                      {kpi.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-sb-line bg-sb-card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-medium text-sb-mut">Cashflow nach Steuern</span>
                  <span className="flex gap-3.5 font-mono text-[10.5px] text-sb-mut">
                    <span className="flex items-center gap-1.5">
                      <i className="inline-block h-0.5 w-2 bg-sb-green" /> Netto
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="inline-block h-0.5 w-2 bg-sb-red" /> Abgaben
                    </span>
                  </span>
                </div>
                <svg viewBox="0 0 720 150" className="mt-1 h-[150px] w-full" role="img" aria-label="Cashflow-Verlauf: Netto steigt über das Jahr, Abgaben bleiben stabil">
                  <defs>
                    <linearGradient id="sb-gfill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="oklch(0.76 0.13 160 / 0.18)" />
                      <stop offset="1" stopColor="oklch(0.76 0.13 160 / 0)" />
                    </linearGradient>
                  </defs>
                  <g stroke="oklch(0.95 0.005 75 / 0.06)" strokeWidth="1">
                    <line x1="0" y1="30" x2="720" y2="30" />
                    <line x1="0" y1="70" x2="720" y2="70" />
                    <line x1="0" y1="110" x2="720" y2="110" />
                  </g>
                  <path
                    d="M0,108 C40,102 70,96 110,98 C150,100 180,84 220,80 C260,76 290,88 330,82 C370,76 400,60 440,58 C480,56 510,66 550,60 C590,54 620,40 660,38 C690,36 705,34 720,32 L720,150 L0,150 Z"
                    fill="url(#sb-gfill)"
                  />
                  <path
                    d="M0,108 C40,102 70,96 110,98 C150,100 180,84 220,80 C260,76 290,88 330,82 C370,76 400,60 440,58 C480,56 510,66 550,60 C590,54 620,40 660,38 C690,36 705,34 720,32"
                    fill="none"
                    stroke="oklch(0.76 0.13 160)"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,124 C60,122 100,126 160,124 C220,122 260,118 320,120 C380,122 420,116 480,118 C540,120 600,114 660,116 C690,117 705,116 720,115"
                    fill="none"
                    stroke="oklch(0.68 0.14 25 / 0.6)"
                    strokeWidth="1.5"
                  />
                  <circle cx="440" cy="58" r="3.5" fill="oklch(0.76 0.13 160)" />
                </svg>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase text-sb-mut">Prognose auf Basis deiner Eingaben</span>
                  <Link href="/rechner" className={`${btnAccent} h-8 rounded-lg px-3.5 text-[12.5px]`}>
                    Rücklage planen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust facts */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-11 gap-y-3 border-y border-sb-line py-5 font-mono text-xs uppercase tracking-[0.07em] text-sb-dim">
          <span>7 Rechner</span>
          <span>Steuerwerte 2024–2026</span>
          <span>Made in Austria</span>
          <span>DSGVO-konform</span>
          <span>Zahlung via Stripe</span>
        </div>
      </div>
    </section>
  )
}

/* ─── Problem ─── */
function ProblemSection() {
  const problems = [
    {
      n: '01',
      title: 'Vier Abrechnungslogiken, kein Gesamtbild',
      desc: 'SVS-Beiträge, Einkommensteuer, Vorauszahlungen und Nachbelastungen laufen an unterschiedliche Stellen mit unterschiedlichen Fristen. Die eine Zahl, die zählt, steht nirgends: was am Jahresende übrig bleibt.',
    },
    {
      n: '02',
      title: 'Die vorläufige Beitragsgrundlage täuscht',
      desc: 'Die SVS schreibt Beiträge auf Basis des drittvorangegangenen Jahres vor. Steigt dein Gewinn, wird nach dem Einkommensteuerbescheid nachbemessen. Die Nachbelastung kommt dann zusätzlich zu den laufenden Quartalen.',
    },
    {
      n: '03',
      title: 'Stellschrauben bleiben ungenutzt',
      desc: 'Gewinnfreibetrag, Pauschalierung, Absetzbeträge, Investitionsfreibetrag: die Instrumente stehen im Gesetz. Ohne Rechenmodell bleibt offen, welche sich in deiner Situation rechnen.',
    },
  ]

  return (
    <section id="problem" className="relative pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-sb-dim">Das Problem</p>
          <h2 className="mt-4 max-w-[22ch] font-heading text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.022em] text-sb-text">
            Drei Stellen rechnen mit deinem Geld. Du bist keine davon.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-sb-line bg-sb-line md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.n} delay={i * 120}>
              <div className="h-full bg-sb-raise p-7">
                <p className="font-mono text-sm text-sb-accent">{p.n}</p>
                <h3 className="mt-4 font-heading text-lg font-semibold text-sb-text">{p.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-sb-mut">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Features (Bento) ─── */
function FeaturesSection() {
  return (
    <section id="features" className="relative pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-sb-dim">Nachbemessung</p>
          <h2 className="mt-4 max-w-[24ch] font-heading text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.022em] text-sb-text">
            Die Nachbelastung berechnen, bevor die SVS sie vorschreibt.
          </h2>
          <p className="mt-4 max-w-[58ch] text-sb-mut">
            Die SVS schreibt Beiträge zunächst auf Basis der vorläufigen Beitragsgrundlage vor.
            Liegt der Einkommensteuerbescheid vor, wird nachbemessen. SteuerBoard berechnet die
            Differenz vorab, samt monatlicher Rücklage.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {/* Card 1: Vorschreibungs-Liste */}
          <Reveal>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-sb-line bg-sb-raise p-4.5 sm:p-5">
              <div className="flex min-h-[190px] flex-col justify-center gap-2.5 rounded-xl border border-sb-line bg-sb-deep p-4">
                {[
                  { who: 'SVS-Vorschreibung Q3/2026', amt: '1.780 €', chip: 'gedeckt', chipClass: 'bg-sb-green-soft text-sb-green' },
                  { who: 'Nachbelastung aus Nachbemessung 2026', amt: '1.724 €', chip: 'Rücklage: 144 €/M', chipClass: 'bg-sb-accent-soft text-sb-accent' },
                  { who: 'ESt-Vorauszahlung, fällig 15.11.2026', amt: '4.134 €', chip: 'Prognose', chipClass: 'bg-white/5 text-sb-mut' },
                ].map((r) => (
                  <div key={r.who} className="flex items-center justify-between gap-2.5 rounded-[9px] border border-sb-line bg-sb-card px-3.5 py-2.5">
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-sb-mut">{r.who}</span>
                    <span className="font-mono text-[13.5px] font-semibold text-sb-text">{r.amt}</span>
                    <span className={`whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10.5px] ${r.chipClass}`}>{r.chip}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-heading text-[19px] font-semibold text-sb-text">
                  Jede Vorschreibung mit Fälligkeit und Betrag
                </h3>
                <p className="mt-1.5 text-[14.5px] text-sb-mut">
                  SVS-Quartale, Nachbelastung, Einkommensteuer-Vorauszahlung: alle Termine und Beträge in einer Liste.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Slider → Netto */}
          <Reveal delay={100}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-sb-line bg-sb-raise p-4.5 sm:p-5">
              <div className="flex min-h-[190px] flex-col items-center justify-center gap-3 rounded-xl border border-sb-line bg-sb-deep p-4 text-center">
                <div className="w-[82%] rounded-xl border border-sb-line bg-sb-card px-4 py-3.5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-sb-mut">Dein Umsatz</p>
                  <p className="mt-2 font-mono text-2xl font-semibold text-sb-text">
                    60.000 <span className="text-[13px] font-normal text-sb-mut">EUR</span>
                  </p>
                  <div className="relative mt-3 h-1.5 rounded-full bg-white/[0.08]">
                    <div className="absolute inset-y-0 left-0 w-[72%] rounded-full bg-sb-accent" />
                    <div className="absolute -top-[5px] left-[72%] h-4 w-4 -translate-x-2 rounded-full bg-sb-text shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
                  </div>
                </div>
                <p className="font-mono text-xl font-semibold text-sb-text">
                  → 28.742 € <span className="font-sans text-sm font-normal text-sb-dim">bleiben dir</span>
                </p>
              </div>
              <div>
                <h3 className="font-heading text-[19px] font-semibold text-sb-text">Umsatz einstellen, Netto ablesen</h3>
                <p className="mt-1.5 text-[14.5px] text-sb-mut">
                  SVS-Beiträge, Einkommensteuer und Absetzbeträge werden mitgerechnet. Familienbonus Plus, AVAB und
                  Gewinnfreibetrag sind mit den Werten des jeweiligen Jahres hinterlegt.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Misch-Einkommen */}
          <Reveal delay={150}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-sb-line bg-sb-raise p-4.5 sm:p-5">
              <div className="flex min-h-[190px] flex-col justify-center gap-2.5 rounded-xl border border-sb-line bg-sb-deep p-4">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-[9px] border border-sb-line bg-sb-card px-3.5 py-3">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-sb-mut">Anstellung (ASVG)</p>
                    <p className="mt-1.5 font-mono text-lg font-semibold text-sb-text">32.000 €</p>
                  </div>
                  <div className="rounded-[9px] border border-sb-line bg-sb-card px-3.5 py-3">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-sb-mut">Gewerbe (GSVG)</p>
                    <p className="mt-1.5 font-mono text-lg font-semibold text-sb-text">24.000 €</p>
                  </div>
                </div>
                <div className="rounded-[9px] border border-sb-line bg-sb-card px-3.5 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-sb-mut">Kombiniertes Netto</p>
                    <span className="rounded-md bg-sb-green-soft px-2 py-0.5 font-mono text-[10.5px] text-sb-green">Differenzvorschreibung berücksichtigt</span>
                  </div>
                  <p className="mt-1.5 font-mono text-lg font-semibold text-sb-text">41.380 €</p>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-[19px] font-semibold text-sb-text">Misch-Einkommen ohne Doppelrechnung</h3>
                <p className="mt-1.5 text-[14.5px] text-sb-mut">
                  Angestellt und selbständig zugleich: ASVG- und GSVG-Beiträge, Differenzvorschreibung und das kombinierte
                  Netto in einer Berechnung.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Steuer-Chatbot */}
          <Reveal delay={200}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-sb-line bg-sb-raise p-4.5 sm:p-5">
              <div className="flex min-h-[190px] flex-col justify-center gap-2.5 rounded-xl border border-sb-line bg-sb-deep p-4">
                <div className="max-w-[85%] self-end rounded-xl rounded-br-sm bg-sb-accent-soft px-3.5 py-2.5 text-left text-[13px] text-sb-text">
                  Wie viel Einkommensteuer zahle ich bei 80.000 € Gewinn?
                </div>
                <div className="max-w-[85%] self-start rounded-xl rounded-bl-sm border border-sb-line bg-sb-card px-3.5 py-2.5 text-left text-[13px] text-sb-mut">
                  Bei 80.000 € Gewinn: <span className="font-mono text-sb-text">21.913 €</span> Einkommensteuer nach § 33 EStG,
                  Grenzsteuersatz <span className="font-mono text-sb-text">48 %</span>. Mit Gewinnfreibetrag reduzierbar.
                </div>
                <p className="mt-1 text-center font-mono text-[10.5px] uppercase tracking-[0.1em] text-sb-mut">
                  ESt · KöSt · USt · Krypto · ImmoESt · Sachbezug · IFB
                </p>
              </div>
              <div>
                <h3 className="font-heading text-[19px] font-semibold text-sb-text">Steuerfragen mit Rechenweg</h3>
                <p className="mt-1.5 text-[14.5px] text-sb-mut">
                  Der Steuer-Chatbot (Pro) rechnet mit 7 spezialisierten Rechnern auf Basis des österreichischen
                  Steuerrechts 2026. Antworten kommen mit konkreten Beträgen, nicht mit Paragrafen-Prosa.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Weitere Rechner: nüchterne Liste */}
        <Reveal delay={150}>
          <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-sb-line bg-sb-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'USt-Rechner', desc: 'Umsatzsteuer, Kleinunternehmergrenze (55.000 € brutto), Vorsteuer.' },
              { title: 'Rücklagen-Rechner', desc: 'Monatliche Rücklage für SVS, Einkommensteuer und USt.' },
              { title: 'GmbH-Vergleich', desc: 'EPU vs. GmbH mit Break-Even: 23 % KöSt plus 27,5 % KESt gegen ESt-Tarif.' },
              { title: 'Pauschalierung', desc: 'Basispauschalierung gegen Einnahmen-Ausgaben-Rechnung, direkt verglichen.' },
              { title: 'Gewinnmaximierer', desc: 'Zusatzumsatz simulieren, Wirkung auf Steuer und Netto ablesen.' },
              { title: 'Investitionen & AfA', desc: 'Abschreibung und Investitionsfreibetrag (§ 11 EStG) für geplante Anschaffungen.' },
            ].map((f) => (
              <div key={f.title} className="bg-sb-raise p-5">
                <h4 className="font-heading text-sm font-semibold text-sb-text">{f.title}</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-sb-mut">{f.desc}</p>
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
      { text: 'SVS-Beitragsrechner', included: true },
      { text: 'Wahrheits-Tabelle', included: true },
      { text: 'Geldfluss-Diagramm', included: true },
      { text: 'Sachbezug-Rechner', included: true },
      { text: 'Steuer-Wissen Bot', included: true },
      { text: 'Steuerwerte 2024–2026', included: true },
      { text: 'Einkommensteuer-Prognose', included: false },
      { text: 'Steuer-Chatbot (7 Rechner)', included: false },
      { text: 'AI SteuerBoard', included: false },
      { text: 'Misch-Einkommen Rechner', included: false },
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
    buttonText: 'Gratis starten',
    href: '/rechner',
    isPopular: false,
  },
  {
    name: 'SteuerBoard Pro',
    price: 24.9,
    yearlyPrice: 19.92,
    yearlyTotal: 239,
    period: 'pro Monat',
    description: 'Voller Funktionsumfang',
    features: [
      { text: 'Steuer-Chatbot (7 Rechner)', included: true },
      { text: 'AI SteuerBoard', included: true },
      { text: 'Misch-Einkommen Rechner', included: true },
      { text: 'GmbH-Vergleich', included: true },
      { text: 'Pauschalierung Vergleich', included: true },
      { text: 'USt-Rechner & Rücklagen', included: true },
      { text: 'Gewinnmaximierer', included: true },
      { text: 'Investitionen & AfA', included: true },
      { text: 'Krypto-Steuer', included: true },
      { text: 'PDF-Export für die Steuerberatung', included: true },
      { text: 'Einkommensteuer-Prognose', included: true },
      { text: 'Familienbonus & Absetzbeträge', included: true },
      { text: 'Berechnungen speichern', included: true },
      { text: 'Dashboard mit Verlauf', included: true },
      { text: 'SVS-Beitragsrechner', included: true },
      { text: 'Wahrheits-Tabelle', included: true },
      { text: 'Geldfluss-Diagramm', included: true },
      { text: 'Sachbezug-Rechner', included: true },
      { text: 'Steuer-Wissen Bot', included: true },
      { text: 'Steuerwerte 2024–2026', included: true },
    ],
    buttonText: 'Upgrade auf Pro',
    href: '/pricing',
    isPopular: true,
  },
  {
    name: 'Sicherheits-Plan',
    price: 12.9,
    yearlyPrice: 9.92,
    yearlyTotal: 119,
    period: 'pro Monat',
    description: 'Für den Einstieg',
    features: [
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
      { text: 'Steuer-Chatbot (7 Rechner)', included: false },
      { text: 'AI SteuerBoard', included: false },
      { text: 'Misch-Einkommen Rechner', included: false },
      { text: 'GmbH-Vergleich', included: false },
      { text: 'Pauschalierung Vergleich', included: false },
      { text: 'USt-Rechner & Rücklagen', included: false },
      { text: 'Gewinnmaximierer', included: false },
      { text: 'Investitionen & AfA', included: false },
      { text: 'Krypto-Steuer', included: false },
      { text: 'PDF-Export für die Steuerberatung', included: false },
    ],
    buttonText: 'Plan wählen',
    href: '/pricing',
    isPopular: false,
  },
]

function PricingSection() {
  return (
    <Pricing
      plans={PRICING_PLANS}
      title="239 Euro im Jahr. Als Betriebsausgabe absetzbar."
      description={
        'SteuerBoard Pro kostet 239 € im Jahr, voll absetzbar als Betriebsausgabe. Bei 32 % Grenzsteuersatz reduziert sich der effektive Aufwand auf 13,55 € im Monat.'
      }
    />
  )
}

/* ─── FAQ ─── */
function FAQSection() {
  const faqs = [
    {
      q: 'Was ist SteuerBoard.pro und für wen ist es gedacht?',
      a: 'SteuerBoard.pro ist ein interaktiver Steuer- und SVS-Rechner für österreichische Selbständige: Einzelunternehmer (EPU), Freiberufler und Gewerbetreibende, die bei der SVS (Sozialversicherung der Selbständigen) nach GSVG oder FSVG versichert sind. Du gibst Umsatz und Betriebsausgaben ein und erhältst sofort eine Berechnung deiner SVS-Beiträge (Pensionsversicherung, Krankenversicherung, Unfallversicherung, Selbständigenvorsorge), der Einkommensteuer nach dem progressiven Tarif (§ 33 EStG) und deines echten Nettos, also was auf deinem Konto bleibt.',
    },
    {
      q: 'Warum SteuerBoard.pro und nicht der WKO SVS-Rechner?',
      a: 'Der WKO SVS-Beitragsrechner berechnet nur die reinen SVS-Beiträge, ohne Einkommensteuer, ohne Nachzahlungsprognose und ohne echtes Netto. SteuerBoard.pro geht deutlich weiter: Du siehst die voraussichtliche SVS-Nachzahlung (die sogenannte „Nachzahlungsfalle"), die Einkommensteuer-Prognose nach Tarifstufen, das Geldfluss-Diagramm (was geht an SVS, Finanzamt und was bleibt netto), die Wahrheits-Tabelle mit vorläufigen vs. endgültigen Beiträgen, einen AI SteuerBoard, GmbH-Vergleich, Pauschalierungs-Check und 7 spezialisierte Steuerrechner. Der WKO-Rechner ist ein einfacher Beitragsrechner. SteuerBoard ist eine komplette Steuerplanungs-Plattform.',
    },
    {
      q: 'Welche Features bietet SteuerBoard.pro?',
      a: 'Free (kostenlos): SVS-Beitragsrechner, Wahrheits-Tabelle, Geldfluss-Diagramm, Sachbezug-Rechner, Steuer-Wissen Bot und aktuelle Werte für 2024-2026. Sicherheits-Plan (12,90 EUR/Monat): zusätzlich Einkommensteuer-Prognose, Familienbonus & Absetzbeträge, Berechnungen speichern, Dashboard mit Verlauf und Export. SteuerBoard Pro (24,90 EUR/Monat): alles plus Steuer-Chatbot mit 7 Rechnern (ESt, KöSt, USt, Krypto, ImmoESt, Sachbezug, IFB), AI SteuerBoard mit persönlicher Optimierung, Misch-Einkommen Rechner für Angestellte mit Nebeneinkünften, GmbH-Vergleich (EPU vs. GmbH mit Break-Even), Pauschalierungs-Vergleich, USt-Rechner & monatliche Rücklagen, Gewinnmaximierer, Investitionen & AfA und PDF-Export für den Steuerberater.',
    },
    {
      q: 'Was ist die SVS-Nachzahlungsfalle und wie schützt SteuerBoard davor?',
      a: 'Die SVS berechnet deine Beiträge zunächst vorläufig, auf Basis deines Gewinns von vor 3 Jahren (§ 25a GSVG). Steigt dein Einkommen, kommt es nach dem Steuerbescheid zu einer oft hohen Nachzahlung, die viele Selbständige unvorbereitet trifft. Bei einer Gewinnsteigerung von 30.000 auf 60.000 EUR kann die Nachzahlung über 5.000 EUR betragen. SteuerBoard.pro zeigt dir die voraussichtliche Differenz zwischen vorläufigen und endgültigen Beiträgen, berechnet monatliche Rücklagen und warnt dich rechtzeitig.',
    },
    {
      q: 'Wie wird die Einkommensteuer für Selbständige in Österreich berechnet?',
      a: 'Die Einkommensteuer wird auf dein steuerpflichtiges Einkommen nach dem progressiven Tarif gemäß § 33 EStG berechnet: 0 % bis 13.539 EUR, 20 % bis 21.992 EUR, 30 % bis 36.458 EUR, 40 % bis 70.365 EUR, 48 % bis 104.859 EUR, 50 % bis 1 Mio. EUR. SteuerBoard zieht automatisch SVS-Beiträge, den Gewinnfreibetrag (§ 10 EStG, bis zu 15 % vom Gewinn) und Absetzbeträge wie Familienbonus Plus (2.000 EUR pro Kind unter 18), AVAB (612 EUR), Verkehrsabsetzbetrag (496 EUR) und Pendlerpauschale ab. Du siehst Grenzsteuersatz und Durchschnittssteuersatz auf einen Blick.',
    },
    {
      q: 'Was kann der KI-Steuer-Chatbot?',
      a: 'Der Steuer-Chatbot (Pro-Feature) ist ein KI-Assistent powered by Google Gemini, der deine Steuerfragen in Echtzeit beantwortet und mit aktuellen österreichischen Werten für 2026 rechnet. Er hat Zugriff auf 7 spezialisierte Rechner: Einkommensteuer, Körperschaftsteuer (23 % KöSt), Umsatzsteuer (inkl. Kleinunternehmerregelung § 6 Abs. 1 Z 27 UStG), Krypto-Steuer (27,5 % KESt), Immobilienertragsteuer (30 % ImmoESt), Sachbezug und Investitionsfreibetrag (§ 11 EStG, 20/22 %). Stelle Fragen wie „Wie viel ESt zahle ich bei 80.000 EUR Gewinn?" oder „Lohnt sich eine GmbH ab welchem Gewinn?".',
    },
    {
      q: 'Funktioniert SteuerBoard auch bei Misch-Einkommen (angestellt und selbständig)?',
      a: 'Ja. Der Misch-Einkommen Rechner (Pro-Feature) ist speziell für Personen mit unselbständigen und selbständigen Einkünften gebaut. Er berechnet die Differenz-Vorschreibung der SVS, berücksichtigt die doppelte Sozialversicherung (ASVG + GSVG) und ermittelt das kombinierte echte Netto aus beiden Einkunftsarten. Das ist besonders relevant für Angestellte mit Nebeneinkünften über der Geringfügigkeitsgrenze.',
    },
    {
      q: 'Wann lohnt sich eine GmbH statt Einzelunternehmen?',
      a: 'Der GmbH-Vergleich (Pro-Feature) berechnet den Break-Even-Punkt zwischen EPU und GmbH. Bei einer GmbH fallen 23 % Körperschaftsteuer (KöSt) plus 27,5 % Kapitalertragsteuer (KESt) auf Ausschüttungen an, dafür entfällt die SVS des Geschäftsführers zugunsten von ASVG-Beiträgen. Typischerweise lohnt sich eine GmbH ab ca. 60.000-80.000 EUR Gewinn. SteuerBoard zeigt dir den exakten Punkt für deine Situation mit konkreten EUR-Beträgen.',
    },
    {
      q: 'Welche Steuerjahre unterstützt SteuerBoard?',
      a: 'SteuerBoard.pro enthält die aktuellen Werte für 2024, 2025 und 2026, inklusive der neuen Werte ab 2026: Familienbonus Plus (2.000 EUR pro Kind unter 18), AVAB (612 EUR), Verkehrsabsetzbetrag (496 EUR), Kindermehrbetrag (700 EUR), Kleinunternehmergrenze (55.000 EUR brutto) und aktualisierte SVS-Mindest- und Höchstbeitragsgrundlagen.',
    },
    {
      q: 'Ersetzt SteuerBoard.pro einen Steuerberater?',
      a: 'Nein. SteuerBoard.pro ist ein Planungs- und Orientierungstool. Alle Berechnungen basieren auf den aktuellen gesetzlichen Grundlagen (EStG, GSVG, FSVG, UStG, KStG), sind aber Richtwerte ohne Gewähr. Die endgültigen Bescheide der SVS und des Finanzamts können abweichen. Für verbindliche Auskünfte, komplexe Gestaltungen oder individuelle Steueroptimierung empfehlen wir eine professionelle Steuerberatung. SteuerBoard hilft dir, vorbereitet ins Gespräch zu gehen, mit konkreten Zahlen und einem PDF-Export.',
    },
    {
      q: 'Wie kann ich mein Abo kündigen?',
      a: 'Jederzeit mit einem Klick unter Profil → Abo verwalten. Du wirst zum Stripe-Kundenportal weitergeleitet, wo du sofort kündigen kannst. Du behältst Zugriff auf Pro-Features bis zum Ende des bezahlten Zeitraums. Keine versteckten Fristen, keine Kündigungsgebühren, keine Tricks. Die Zahlung läuft sicher über Stripe. Wir speichern keine Kreditkartendaten.',
    },
  ]

  return (
    <section id="faq" className="relative pt-24 sm:pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-sb-dim">FAQ</p>
          <h2 className="mt-4 font-heading text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.022em] text-sb-text">
            Häufig gestellte Fragen
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="mt-10 space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-sb-line bg-sb-raise px-5 transition-colors duration-150 data-[state=open]:bg-sb-card"
              >
                <AccordionTrigger className="py-4 text-left text-sm text-sb-text hover:no-underline sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-sb-mut">
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
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-heading text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.022em] text-sb-text">
            Rechne dein Jahr durch, bevor es die SVS tut.
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-sb-mut">
            Umsatz und Betriebsausgaben eingeben, Netto, SVS-Beiträge und Nachbelastung ablesen.
          </p>
          <div className="mt-8">
            <Link href="/rechner" className={`${btnAccent} h-12 px-8 text-[15.5px]`}>
              Netto berechnen
            </Link>
          </div>
          <p className="mt-4 font-mono text-[13px] text-sb-dim">Kostenlos, ohne Registrierung.</p>
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
      acceptedAnswer: { '@type': 'Answer', text: 'SteuerBoard.pro ist ein interaktiver Steuer- und SVS-Rechner für österreichische Selbständige: Einzelunternehmer (EPU), Freiberufler und Gewerbetreibende, die bei der SVS nach GSVG oder FSVG versichert sind. Du gibst Umsatz und Betriebsausgaben ein und erhältst sofort eine Berechnung deiner SVS-Beiträge, der Einkommensteuer nach dem progressiven Tarif (§ 33 EStG) und deines echten Nettos.' },
    },
    {
      '@type': 'Question',
      name: 'Warum SteuerBoard.pro und nicht der WKO SVS-Rechner?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der WKO SVS-Beitragsrechner berechnet nur die reinen SVS-Beiträge, ohne Einkommensteuer, ohne Nachzahlungsprognose und ohne echtes Netto. SteuerBoard.pro zeigt zusätzlich die voraussichtliche SVS-Nachzahlung, die Einkommensteuer-Prognose nach Tarifstufen, das Geldfluss-Diagramm, die Wahrheits-Tabelle mit vorläufigen vs. endgültigen Beiträgen, einen AI SteuerBoard, GmbH-Vergleich, Pauschalierungs-Check und 7 spezialisierte Steuerrechner.' },
    },
    {
      '@type': 'Question',
      name: 'Welche Features bietet SteuerBoard.pro?',
      acceptedAnswer: { '@type': 'Answer', text: 'Free (kostenlos): SVS-Beitragsrechner, Wahrheits-Tabelle, Geldfluss-Diagramm, Sachbezug-Rechner, Steuer-Wissen Bot und aktuelle Werte für 2024-2026. Sicherheits-Plan (12,90 EUR/Monat): zusätzlich Einkommensteuer-Prognose, Familienbonus & Absetzbeträge, Berechnungen speichern, Dashboard mit Verlauf und Export. SteuerBoard Pro (24,90 EUR/Monat): alles plus Steuer-Chatbot mit 7 Rechnern, AI SteuerBoard, Misch-Einkommen Rechner, GmbH-Vergleich, Pauschalierungs-Vergleich, USt-Rechner, Gewinnmaximierer, AfA-Rechner und PDF-Export.' },
    },
    {
      '@type': 'Question',
      name: 'Was ist die SVS-Nachzahlungsfalle und wie schützt SteuerBoard davor?',
      acceptedAnswer: { '@type': 'Answer', text: 'Die SVS berechnet Beiträge zunächst vorläufig auf Basis des Gewinns von vor 3 Jahren (§ 25a GSVG). Steigt das Einkommen, kommt es nach dem Steuerbescheid zu einer oft hohen Nachzahlung. Bei einer Gewinnsteigerung von 30.000 auf 60.000 EUR kann die Nachzahlung über 5.000 EUR betragen. SteuerBoard.pro zeigt die voraussichtliche Differenz und berechnet monatliche Rücklagen.' },
    },
    {
      '@type': 'Question',
      name: 'Wie wird die Einkommensteuer für Selbständige in Österreich berechnet?',
      acceptedAnswer: { '@type': 'Answer', text: 'Die Einkommensteuer wird nach dem progressiven Tarif gemäß § 33 EStG berechnet: 0 % bis 13.539 EUR, 20 % bis 21.992 EUR, 30 % bis 36.458 EUR, 40 % bis 70.365 EUR, 48 % bis 104.859 EUR, 50 % bis 1 Mio. EUR. SteuerBoard zieht automatisch SVS-Beiträge, den Gewinnfreibetrag (§ 10 EStG) und Absetzbeträge wie Familienbonus Plus (2.000 EUR pro Kind unter 18), AVAB (612 EUR) und Verkehrsabsetzbetrag (496 EUR) ab.' },
    },
    {
      '@type': 'Question',
      name: 'Was kann der KI-Steuer-Chatbot?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der Steuer-Chatbot ist ein KI-Assistent powered by Google Gemini mit Zugriff auf 7 spezialisierte Rechner: Einkommensteuer, Körperschaftsteuer (23 % KöSt), Umsatzsteuer (inkl. Kleinunternehmerregelung), Krypto-Steuer (27,5 % KESt), Immobilienertragsteuer (30 % ImmoESt), Sachbezug und Investitionsfreibetrag. Er rechnet mit aktuellen österreichischen Werten für 2026.' },
    },
    {
      '@type': 'Question',
      name: 'Funktioniert SteuerBoard auch bei Misch-Einkommen (angestellt und selbständig)?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja. Der Misch-Einkommen Rechner berechnet die Differenz-Vorschreibung der SVS, berücksichtigt die doppelte Sozialversicherung (ASVG + GSVG) und ermittelt das kombinierte echte Netto aus beiden Einkunftsarten.' },
    },
    {
      '@type': 'Question',
      name: 'Wann lohnt sich eine GmbH statt Einzelunternehmen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Bei einer GmbH fallen 23 % Körperschaftsteuer plus 27,5 % KESt auf Ausschüttungen an. Typischerweise lohnt sich eine GmbH ab ca. 60.000-80.000 EUR Gewinn. SteuerBoard berechnet den exakten Break-Even-Punkt für die individuelle Situation.' },
    },
    {
      '@type': 'Question',
      name: 'Welche Steuerjahre unterstützt SteuerBoard?',
      acceptedAnswer: { '@type': 'Answer', text: 'SteuerBoard.pro enthält aktuelle Werte für 2024, 2025 und 2026, inklusive Familienbonus Plus (2.000 EUR pro Kind unter 18), AVAB (612 EUR), Verkehrsabsetzbetrag (496 EUR), Kindermehrbetrag (700 EUR), Kleinunternehmergrenze (55.000 EUR brutto) und aktualisierte SVS-Beitragsgrundlagen.' },
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
    <main id="main-content" className="bg-sb-bg pb-0 text-sb-text">
      <RecoveryRedirect />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <SiteFooter />
    </main>
  )
}
