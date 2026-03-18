import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function GewinnfreibetragPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/steuerwissen" className="hover:text-white transition-colors">
                Steuerwissen
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-300">Gewinnfreibetrag nutzen</span>
            </li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Gewinnfreibetrag 2026 — So sparst du bis zu 4.950 € Steuern
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Der Gewinnfreibetrag ist eines der mächtigsten Steuertools für österreichische Selbständige.
              Mit dem richtigen Wissen sparst du automatisch Tausende Euro — völlig legal und ohne zusätzlichen Aufwand.
            </p>
          </header>

          {/* Was ist der Gewinnfreibetrag */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Was ist der Gewinnfreibetrag? (§ 10 EStG)
            </h2>

            <p className="text-gray-300 mb-6">
              Der Gewinnfreibetrag nach § 10 EStG ist ein Steuerfreibetrag, der automatisch bei der Einkunftsart
              "Einkünfte aus selbständiger Arbeit" angewendet wird. Er reduziert deinen steuerpflichtigen Gewinn
              um einen bestimmten Prozentsatz.
            </p>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Grundfreibetrag (automatisch)</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>15% auf die ersten 33.000€ Gewinn</strong></li>
                <li>• <strong>Maximum: 4.950€ steuerfrei</strong></li>
                <li>• Keine Voraussetzungen oder Nachweise nötig</li>
                <li>• Gilt automatisch für alle Selbständigen mit E/A-Rechnung</li>
              </ul>
            </div>

            <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Investitionsbedingter Gewinnfreibetrag</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>13% auf Gewinne über 33.000€</strong></li>
                <li>• Erfordert begünstigte Investitionen (z.B. Wertpapiere nach § 14 EStG)</li>
                <li>• Zusätzlich zum Grundfreibetrag</li>
                <li>• Kann die Gesamtersparnis erheblich steigern</li>
              </ul>
            </div>
          </section>

          {/* Staffelung */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Staffelung des Gewinnfreibetrags
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-600">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-600 p-3 text-left text-white">Gewinn</th>
                    <th className="border border-gray-600 p-3 text-left text-white">GFB-Betrag</th>
                    <th className="border border-gray-600 p-3 text-left text-white">Steuerersparnis*</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr>
                    <td className="border border-gray-600 p-3">10.000€</td>
                    <td className="border border-gray-600 p-3">1.500€</td>
                    <td className="border border-gray-600 p-3">~300€</td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-600 p-3">20.000€</td>
                    <td className="border border-gray-600 p-3">3.000€</td>
                    <td className="border border-gray-600 p-3">~750€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-3">33.000€</td>
                    <td className="border border-gray-600 p-3">4.950€</td>
                    <td className="border border-gray-600 p-3">~1.980€</td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-600 p-3">50.000€</td>
                    <td className="border border-gray-600 p-3">4.950€ + invest. GFB</td>
                    <td className="border border-gray-600 p-3">~2.650€+</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-3">100.000€</td>
                    <td className="border border-gray-600 p-3">Max. mit Investition</td>
                    <td className="border border-gray-600 p-3">~6.000€+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-400">
              *Steuerersparnis bei durchschnittlichem Steuersatz von 25%.
              Tatsächliche Ersparnis hängt vom persönlichen Steuersatz ab.
            </p>
          </section>

          {/* Grundfreibetrag vs investitionsbedingter */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Grundfreibetrag vs investitionsbedingter Gewinnfreibetrag
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Grundfreibetrag</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Automatisch anwendbar</li>
                  <li>• Kein Nachweis nötig</li>
                  <li>• 15% bis 33.000€ Gewinn</li>
                  <li>• Maximum 4.950€</li>
                  <li>• Für alle Selbständigen</li>
                </ul>
              </div>

              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">Investitionsbedingter GFB</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Erfordert Investitionen</li>
                  <li>• Nachweis erforderlich</li>
                  <li>• 13% über 33.000€ Gewinn</li>
                  <li>• Zusätzlich zum Grundfreibetrag</li>
                  <li>• Höhere Gesamtersparnis</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Begünstigte Investitionen (§ 14 EStG)
              </h3>
              <ul className="grid md:grid-cols-2 gap-2 text-gray-300">
                <li>• Aktien und Beteiligungen</li>
                <li>• Anleihen und Schuldverschreibungen</li>
                <li>• Investmentfonds</li>
                <li>• ETFs und Index-Fonds</li>
                <li>• Betriebliche Sachanlagen</li>
                <li>• Software und Lizenzen</li>
                <li>• Maschinen und Ausrüstung</li>
                <li>• Digitale Wirtschaftsgüter</li>
              </ul>
            </div>
          </section>

          {/* Optimal nutzen */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Gewinnfreibetrag optimal nutzen — 3 Tipps
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  1. Gewinne über 33.000€? → Begünstigte Wertpapiere kaufen
                </h3>
                <p className="text-gray-300">
                  Ab einem Gewinn von 33.000€ ist der Grundfreibetrag ausgeschöpft.
                  Investiere noch vor Jahresende in begünstigte Wertpapiere, um den
                  investitionsbedingten Gewinnfreibetrag von 13% zu nutzen.
                </p>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  2. Timing: Gewinnplanung über Jahresende
                </h3>
                <p className="text-gray-300">
                  Plane deine Gewinne strategisch: Verschiebe Einnahmen oder ziehe Ausgaben vor,
                  um den Gewinnfreibetrag optimal zu nutzen. Besonders bei Gewinnen knapp über 33.000€
                  kann sich eine Verschiebung ins Folgejahr lohnen.
                </p>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  3. Kombination mit Investitionsfreibetrag (§ 11 EStG)
                </h3>
                <p className="text-gray-300">
                  Der Investitionsfreibetrag von 10% (max. 15.000€) kann zusätzlich zum
                  Gewinnfreibetrag genutzt werden. Bei größeren Investitionen entsteht so
                  eine doppelte Steuerersparnis.
                </p>
              </div>
            </div>
          </section>

          {/* Häufige Fehler */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Häufige Fehler beim Gewinnfreibetrag
            </h2>

            <div className="space-y-4">
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-3">
                  Gewinnfreibetrag vergessen
                </h3>
                <p className="text-gray-300">
                  Bei der E/A-Rechnung wird der Gewinnfreibetrag nicht automatisch berücksichtigt.
                  Du musst ihn aktiv in der Steuererklärung geltend machen oder von deinem Steuerberater
                  einrechnen lassen.
                </p>
              </div>

              <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-3">
                  Nicht-begünstigte Wertpapiere kaufen
                </h3>
                <p className="text-gray-300">
                  Nicht alle Investments sind für den investitionsbedingten Gewinnfreibetrag begünstigt.
                  Kryptowährungen, Gold oder Immobilien-direkt-Investments gelten nicht als begünstigte Investition.
                </p>
              </div>

              <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-3">
                  Gewinnfreibetrag mit Pauschalierung verwechseln
                </h3>
                <p className="text-gray-300">
                  Der Gewinnfreibetrag gilt nur bei der E/A-Rechnung. Bei Pauschalierung (§ 17 EStG)
                  ist bereits eine pauschale Gewinnermittlung inkludiert — der Gewinnfreibetrag entfällt dann.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 border border-blue-700 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Berechne deinen Gewinnfreibetrag
              </h2>
              <p className="text-gray-300 mb-6">
                Nutze unsere Tools, um deinen optimalen Gewinnfreibetrag zu berechnen
                und die beste Investitionsstrategie zu finden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/investitionsfreibetrag">
                    Investitionsfreibetrag Info
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Link href="/rechner">
                    Steuer-Rechner nutzen
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Fazit */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Fazit</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Der Gewinnfreibetrag ist ein mächtiges Instrument für österreichische Selbständige.
              Mit bis zu 4.950€ automatischem Grundfreibetrag und zusätzlichem investitionsbedingtem
              Freibetrag kannst du deine Steuerlast erheblich reduzieren. Wichtig ist die richtige
              Planung und das Verständnis der gesetzlichen Grundlagen nach § 10 EStG.
            </p>
          </section>

          <ArticleFooter
            breadcrumbs={[
              { name: 'Home', href: '/' },
              { name: 'Steuerwissen', href: '/steuerwissen' },
              { name: 'Gewinnfreibetrag nutzen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
            ]}
            sources={[
              { name: 'EStG § 10 — Gewinnfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS) — Einkommensteuergesetz' },
              { name: 'EStG § 14 — Begünstigte Wertpapiere', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Wertpapiere für den investitionsbedingten Gewinnfreibetrag' },
              { name: 'BMF — Gewinnfreibetrag Info', url: 'https://www.bmf.gv.at/themen/steuern/selbststaendige-unternehmer.html', description: 'Bundesministerium für Finanzen' },
              { name: 'WKO — Gewinnfreibetrag für Selbständige', url: 'https://www.wko.at/steuern/gewinnfreibetrag', description: 'Wirtschaftskammer Österreich — Detaillierte Erklärung' },
            ]}
            relatedArticles={[
              { title: 'Steueroptimierung für Selbständige — Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              { title: 'SVS-Beiträge senken — 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
              { title: 'GmbH vs. Einzelunternehmen — Der Steuer-Vergleich', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
            ]}
          />
        </article>
      </div>
    </div>
  )
}