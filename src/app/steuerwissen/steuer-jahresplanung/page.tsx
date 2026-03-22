import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'
import { SiteFooter } from '@/components/site-footer'
import { Calendar, Clock, TrendingUp, AlertTriangle, Calculator } from 'lucide-react'

export default function SteuerJahresplanungPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <nav className="text-sm mb-6 text-slate-400">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/steuerwissen" className="hover:text-blue-400 transition-colors">
                Steuerwissen
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">›</span>
              <span className="text-slate-300">Steuer-Jahresplanung</span>
            </li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white leading-tight">
              Steuer-Jahresplanung 2026 für Selbständige — Fristen, UVA & Vorsorge
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Eine systematische Jahresplanung hilft Selbständigen, alle Steuertermine einzuhalten,
              Liquiditätsengpässe zu vermeiden und durch geschickte Timing-Strategien Steuern zu optimieren.
              Diese Anleitung zeigt den kompletten Jahreskalender mit allen wichtigen Fristen und Maßnahmen.
            </p>
          </header>

          <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700 mb-12">
            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-blue-400 mt-1 shrink-0" />
              <div>
                <h2 className="text-lg font-medium mb-3 text-blue-300">Kurzantwort — Ihr Steuer-Jahr im Überblick</h2>
                <p className="text-slate-300">
                  <strong>Q1:</strong> Steuererklärung erstellen, UVA-Abgaben, EST-Vorauszahlung<br/>
                  <strong>Q2:</strong> Steuererklärungsfristen (April/Juni), SVS prüfen<br/>
                  <strong>Q3:</strong> Halbjahres-Review, Investitionsplanung<br/>
                  <strong>Q4:</strong> Jahresend-Optimierung, GFB ausschöpfen, Rücklage für SVS-Nachzahlung
                </p>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400 flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Warum Steuerplanung wichtig ist
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium text-white mb-3">Liquiditätsplanung</h3>
                <p className="text-slate-300">
                  Ohne systematische Rücklagenbildung können EST-Vorauszahlungen, UVA-Nachzahlungen
                  oder die SVS-Nachzahlung im Jänner zu existenzbedrohenden Liquiditätsproblemen führen.
                </p>
              </div>
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium text-white mb-3">Steueroptimierung</h3>
                <p className="text-slate-300">
                  Durch geschicktes Timing von Investitionen, Ausgaben und Einnahmen können Sie
                  Ihre Steuerlast legal minimieren und Freibeträge optimal ausnutzen.
                </p>
              </div>
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium text-white mb-3">Fristen einhalten</h3>
                <p className="text-slate-300">
                  Versäumte Fristen führen zu Säumniszuschlägen und Verwaltungsstrafen.
                  Eine systematische Planung verhindert teure Versäumnisse.
                </p>
              </div>
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium text-white mb-3">Geschäftsplanung</h3>
                <p className="text-slate-300">
                  Die steuerliche Jahresplanung gibt Ihnen einen klaren Überblick über
                  Ihre finanzielle Situation und unterstützt strategische Entscheidungen.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Quartalweise Übersicht — Ihr Steuerkalender 2026
            </h2>

            <div className="space-y-8">
              {/* Q1 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-green-700">
                <h3 className="text-xl font-semibold text-green-400 mb-4">Q1 — Jänner bis März</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">15. Jänner</h4>
                    <p className="text-slate-300">UVA für November (bei monatlicher Abgabe)</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">15. Februar</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• UVA für Dezember + Zusammenfassende Meldung Q4</li>
                      <li>• EST-Vorauszahlung Q1 (§ 45 EStG)</li>
                      <li>• UVA für Q4 (bei quartalsweiser Abgabe)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">15. März</h4>
                    <p className="text-slate-300">UVA für Jänner</p>
                  </div>
                  <div className="bg-blue-800/50 p-4 rounded-lg border border-blue-600">
                    <h4 className="font-medium text-blue-300 mb-2">Zusätzliche Q1-Aufgaben</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Jahresabschluss erstellen / EAR finalisieren</li>
                      <li>• Steuererklärung vorbereiten</li>
                      <li>• SVS-Nachzahlung für Vorjahr (meist im Jänner)</li>
                      <li>• Buchhaltung des Vorjahres abschließen</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Q2 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-yellow-700">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Q2 — April bis Juni</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">30. April</h4>
                    <p className="text-slate-300">Steuererklärung Papier-Frist (ohne Steuerberater)</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">15. Mai</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• EST-Vorauszahlung Q2</li>
                      <li>• UVA für Q1 (bei quartalsweiser Abgabe)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">30. Juni</h4>
                    <p className="text-slate-300">Steuererklärung FinanzOnline-Frist (ohne Steuerberater)</p>
                  </div>
                  <div className="bg-blue-800/50 p-4 rounded-lg border border-blue-600">
                    <h4 className="font-medium text-blue-300 mb-2">Zusätzliche Q2-Aufgaben</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• SVS-Vorschreibung prüfen</li>
                      <li>• Bei Bedarf SVS-Herabsetzung beantragen</li>
                      <li>• Erste Gewinnprognose für das laufende Jahr</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Q3 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-orange-700">
                <h3 className="text-xl font-semibold text-orange-400 mb-4">Q3 — Juli bis September</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">15. August</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• EST-Vorauszahlung Q3</li>
                      <li>• UVA für Q2 (bei quartalsweiser Abgabe)</li>
                    </ul>
                  </div>
                  <div className="bg-blue-800/50 p-4 rounded-lg border border-blue-600">
                    <h4 className="font-medium text-blue-300 mb-2">Zusätzliche Q3-Aufgaben</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Halbjahres-Review: Gewinnprognose aktualisieren</li>
                      <li>• Investitionen für Q4 planen (GWG, IFB, GFB)</li>
                      <li>• SVS-Beiträge des laufenden Jahres prüfen</li>
                      <li>• EST-Vorauszahlungen auf Angemessenheit prüfen</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Q4 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-red-700">
                <h3 className="text-xl font-semibold text-red-400 mb-4">Q4 — Oktober bis Dezember</h3>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">15. November</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• EST-Vorauszahlung Q4</li>
                      <li>• UVA für Q3 (bei quartalsweiser Abgabe)</li>
                    </ul>
                  </div>
                  <div className="bg-green-800/50 p-4 rounded-lg border border-green-600">
                    <h4 className="font-medium text-green-300 mb-2">Jahresend-Maßnahmen</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Investitionen vorziehen (GWG bis 1.000€)</li>
                      <li>• Gewinnfreibetrag durch Wertpapierkauf ausschöpfen</li>
                      <li>• IFB-Investitionen tätigen (15-20% Freibetrag)</li>
                      <li>• Rechnungen noch im alten Jahr stellen</li>
                      <li>• Betriebsausgaben vorziehen</li>
                      <li>• Rücklage für SVS-Nachzahlung bilden</li>
                      <li>• Steuerberatung für Folgejahr planen</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400 flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Monatliche Rücklage-Empfehlung
            </h2>

            <p className="text-slate-300 mb-6">
              Als Selbständiger sollten Sie jeden Monat einen festen Betrag für Steuern und Sozialversicherung
              zurücklegen. Diese Rücklagen decken EST, UVA und SVS-Beiträge ab.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-slate-900 border border-slate-700 rounded-lg">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 text-white font-medium">Jahresgewinn</th>
                    <th className="text-left p-4 text-white font-medium">Monatliche Rücklage</th>
                    <th className="text-left p-4 text-white font-medium">Jährliche Belastung</th>
                    <th className="text-left p-4 text-white font-medium">Effektiver Satz</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700">
                    <td className="p-4 text-slate-300">30.000€</td>
                    <td className="p-4 text-green-400 font-medium">650€</td>
                    <td className="p-4 text-slate-300">7.800€</td>
                    <td className="p-4 text-slate-300">26%</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="p-4 text-slate-300">50.000€</td>
                    <td className="p-4 text-green-400 font-medium">1.200€</td>
                    <td className="p-4 text-slate-300">14.400€</td>
                    <td className="p-4 text-slate-300">29%</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="p-4 text-slate-300">80.000€</td>
                    <td className="p-4 text-green-400 font-medium">2.100€</td>
                    <td className="p-4 text-slate-300">25.200€</td>
                    <td className="p-4 text-slate-300">32%</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-300">100.000€</td>
                    <td className="p-4 text-green-400 font-medium">2.800€</td>
                    <td className="p-4 text-slate-300">33.600€</td>
                    <td className="p-4 text-slate-300">34%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-900/30 p-6 rounded-lg border border-yellow-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium mb-3 text-yellow-300">Wichtiger Hinweis</h3>
                  <p className="text-slate-300">
                    Diese Werte sind Richtwerte und können je nach individueller Situation variieren.
                    Bei hohen Sozialversicherungsbeiträgen, Familienbonus oder anderen Absetzbeträgen
                    kann die tatsächliche Belastung abweichen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">EST-Vorauszahlungen verstehen</h2>

            <p className="text-slate-300 mb-6">
              Einkommensteuer-Vorauszahlungen nach § 45 EStG werden vierteljährlich eingehoben und
              basieren auf der Steuerberechnung des letzten Bescheides. Sie dienen der gleichmäßigen
              Verteilung der Steuerlast über das Jahr.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium text-white mb-4">Fälligkeitstermine 2026</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-400">Q1: 15. Februar</h4>
                    <p className="text-slate-300 text-sm">Vorauszahlung für Jänner-März</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-400">Q2: 15. Mai</h4>
                    <p className="text-slate-300 text-sm">Vorauszahlung für April-Juni</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-400">Q3: 15. August</h4>
                    <p className="text-slate-300 text-sm">Vorauszahlung für Juli-September</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-400">Q4: 15. November</h4>
                    <p className="text-slate-300 text-sm">Vorauszahlung für Oktober-Dezember</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium text-white mb-4">Herabsetzungsantrag</h3>
                <p className="text-slate-300 mb-4">
                  Wenn Sie mit einem niedrigeren Gewinn als im Vorjahr rechnen, können Sie einen
                  Antrag auf Herabsetzung der Vorauszahlungen stellen. Der Antrag muss vor dem
                  jeweiligen Fälligkeitstermin beim Finanzamt einlangen.
                </p>
                <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700">
                  <p className="text-yellow-200 text-sm">
                    <strong>Vorsicht:</strong> Zu niedrig angesetzte Vorauszahlungen führen zu
                    Anspruchszinsen von derzeit ~4,88% p.a. ab dem Fälligkeitstermin.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">UVA-Termine und Fristen</h2>

            <p className="text-slate-300 mb-6">
              Die Umsatzsteuer-Voranmeldung (UVA) ist je nach Vorjahresumsatz monatlich oder
              vierteljährlich abzugeben. Die richtige Frequenz zu wählen kann Liquiditätsvorteile bringen.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium text-white mb-4">Abgabefrequenz</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-green-400 mb-2">Monatlich</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Pflicht ab 100.000€ Vorjahresumsatz</li>
                      <li>• Frist: 15. des Folgemonats</li>
                      <li>• Schnellere USt-Erstattung</li>
                      <li>• Regelmäßiger Cashflow</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-400 mb-2">Vierteljährlich</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Unter 100.000€ Vorjahresumsatz</li>
                      <li>• Fristen: 15.2., 15.5., 15.8., 15.11.</li>
                      <li>• Weniger Aufwand</li>
                      <li>• Liquiditätsvorteil bei USt-Schuld</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium text-white mb-4">Zusammenfassende Meldung</h3>
                <p className="text-slate-300 mb-3">
                  Bei innergemeinschaftlichen Lieferungen (EU-Geschäfte) ist zusätzlich zur UVA eine
                  zusammenfassende Meldung abzugeben:
                </p>
                <ul className="text-slate-300 space-y-1">
                  <li>• Monatlich: bis 15. des Folgemonats</li>
                  <li>• Vierteljährlich: bis 15. des Folgemonats nach Quartalsende</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-green-900/30 p-6 rounded-lg border border-green-700 mb-12">
            <h3 className="text-lg font-medium text-green-300 mb-4">Jahresend-Optimierung — Die wichtigsten Maßnahmen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">Ausgaben vorziehen</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• GWG bis 1.000€ noch im Dezember kaufen</li>
                  <li>• Fortbildungen, Software-Lizenzen</li>
                  <li>• Büroausstattung, Fachliteratur</li>
                  <li>• Steuerberatungskosten</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Freibeträge ausschöpfen</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Gewinnfreibetrag über Wertpapierkauf</li>
                  <li>• IFB bei geplanten Investitionen</li>
                  <li>• Rechnungsstellung ins Folgejahr verschieben</li>
                  <li>• Anzahlungen vermeiden</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="mb-12 bg-gradient-to-r from-emerald-900/50 to-green-900/50 p-8 rounded-lg border border-emerald-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Optimieren Sie Ihre Steuerplanung</h2>
            <p className="text-slate-300 mb-6">
              Nutzen Sie unsere kostenlosen Rechner für eine präzise Jahresplanung und
              verwalten Sie alle Termine übersichtlich in Ihrem persönlichen Dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/rechner">Steuerrechner nutzen</Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Link href="/dashboard">Zum Dashboard</Link>
              </Button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Häufige Fragen zur Steuer-Jahresplanung</h2>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Wann sind die UVA-Termine 2026?
                </h3>
                <p className="text-slate-300">
                  UVA-Termine sind grundsätzlich am 15. des Folgemonats. Bei monatlicher Abgabe
                  (ab 100.000€ Vorjahresumsatz) jeden Monat, bei quartalsweiser Abgabe am
                  15. Februar, 15. Mai, 15. August und 15. November.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Wie hoch sollten meine monatlichen Steuerrücklagen sein?
                </h3>
                <p className="text-slate-300">
                  Faustregeln: Bei 30.000€ Gewinn → 650€/Monat, bei 50.000€ → 1.200€/Monat,
                  bei 80.000€ → 2.100€/Monat, bei 100.000€ → 2.800€/Monat.
                  Inkludiert EST, SVS und UVA.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Wann sind EST-Vorauszahlungen fällig?
                </h3>
                <p className="text-slate-300">
                  EST-Vorauszahlungen nach § 45 EStG sind vierteljährlich fällig: 15. Februar,
                  15. Mai, 15. August und 15. November. Die Höhe richtet sich nach dem letzten
                  Steuerbescheid und kann bei Gewinnrückgang herabgesetzt werden.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Welche Jahresend-Maßnahmen sparen Steuern?
                </h3>
                <p className="text-slate-300">
                  Investitionen vorziehen (GWG, IFB nutzen), Gewinnfreibetrag durch Wertpapierkauf
                  ausschöpfen, Betriebsausgaben ins laufende Jahr vorziehen, Rechnungen noch im
                  alten Jahr stellen oder Einnahmen ins Folgejahr verschieben.
                </p>
              </div>
            </div>
          </section>

          <ArticleFooter
            breadcrumbs={[
              { name: 'Home', href: '/' },
              { name: 'Steuerwissen', href: '/steuerwissen' },
              { name: 'Steuer-Jahresplanung', href: '/steuerwissen/steuer-jahresplanung' },
            ]}
            sources={[
              { name: 'EStG § 45 — EST-Vorauszahlungen', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem — Einkommensteuer-Vorauszahlungen' },
              { name: 'UStG — Umsatzsteuervoranmeldung', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873', description: 'Umsatzsteuergesetz — Voranmeldungsfristen' },
              { name: 'BMF — Steuertermine', url: 'https://www.bmf.gv.at/themen/steuern/steuertermine.html', description: 'Bundesministerium für Finanzen — Offizielle Fristen und Termine' },
              { name: 'FinanzOnline — Fristen', url: 'https://finanzonline.bmf.gv.at/', description: 'Elektronische Abgabe von Steuererklärungen und UVA' },
              { name: 'SVS — Beitragsvorschreibung', url: 'https://www.svs.at/cdscontent/?contentid=10007.707035', description: 'Sozialversicherung der Selbständigen — Termine und Fristen' },
            ]}
            relatedArticles={[
              { title: 'Steueroptimierung für Selbständige — Alle Strategien', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              { title: 'Betriebsausgaben-Checkliste — Nichts vergessen', href: '/steuerwissen/betriebsausgaben-checkliste' },
              { title: 'Gewinnfreibetrag 2026 — Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              { title: 'SVS-Nachzahlung vermeiden — 5 Strategien', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
            ]}
            lastUpdated="2026-03-19"
          />
        </article>
      </div>
    </div>
  )
}