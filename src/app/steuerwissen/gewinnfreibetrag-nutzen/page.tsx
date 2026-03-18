import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function GewinnfreibetragPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/steuerwissen" className="text-slate-400 hover:text-white transition-colors">
                Steuerwissen
              </Link>
            </li>
            <li className="text-slate-500">/</li>
            <li className="text-white">Gewinnfreibetrag nutzen</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Gewinnfreibetrag 2026 — So sparst du bis zu 4.950 € Steuern (§ 10 EStG)
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Der Gewinnfreibetrag ist eines der mächtigsten Steuertools für österreichische Selbständige.
              Mit dem richtigen Wissen sparst du automatisch Tausende Euro — völlig legal und ohne zusätzlichen Aufwand.
              Hier erfährst du alles über Grundfreibetrag, investitionsbedingten GFB, Staffelung und die optimale Nutzung.
            </p>
          </header>

          {/* AI Overview Box */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-blue-300 mb-3">Kurzantwort</h2>
            <p className="text-slate-300 mb-0">
              Der Gewinnfreibetrag (§ 10 EStG) gewährt <strong className="text-white">15% Grundfreibetrag auf die ersten 33.000 € Gewinn</strong> (max. 4.950 €) —
              automatisch, ohne Nachweis. Für Gewinne darüber gibt es den <strong className="text-white">investitionsbedingten GFB</strong> (13–4,5% gestaffelt),
              der begünstigte Investitionen erfordert. Der GFB senkt sowohl die <strong className="text-white">Einkommensteuer als auch die SVS-Beiträge</strong>.
              Er gilt nur bei E/A-Rechnung — nicht bei Pauschalierung.
            </p>
          </div>

          {/* Was ist der Gewinnfreibetrag */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Was ist der Gewinnfreibetrag? (§ 10 EStG)
            </h2>

            <p className="mb-6">
              Der Gewinnfreibetrag nach § 10 EStG ist ein Steuerfreibetrag für natürliche Personen mit Einkünften
              aus Gewerbebetrieb oder selbständiger Arbeit. Er reduziert den steuerpflichtigen Gewinn um einen
              bestimmten Prozentsatz und wirkt sich doppelt positiv aus: weniger Einkommensteuer <strong className="text-white">und</strong> weniger SVS-Beiträge.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Grundfreibetrag (automatisch)</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">15% auf die ersten 33.000 € Gewinn</strong></li>
                  <li><strong className="text-white">Maximum: 4.950 € steuerfrei</strong></li>
                  <li>Keine Voraussetzungen oder Nachweise nötig</li>
                  <li>Gilt automatisch für alle Selbständigen</li>
                  <li>Wird in der Steuererklärung geltend gemacht</li>
                </ul>
              </div>

              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">Investitionsbedingter GFB</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Gestaffelt: 13% bis 4,5%</strong></li>
                  <li>Erfordert begünstigte Investitionen</li>
                  <li>Zusätzlich zum Grundfreibetrag</li>
                  <li>Für Gewinne über 33.000 €</li>
                  <li>Kann die Gesamtersparnis erheblich steigern</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-white mb-2">Wer kann den GFB nutzen?</h4>
              <ul className="space-y-2">
                <li><strong className="text-white">Selbständige</strong> mit Einkünften aus Gewerbebetrieb (§ 23 EStG)</li>
                <li><strong className="text-white">Freiberufler</strong> mit Einkünften aus selbständiger Arbeit (§ 22 EStG)</li>
                <li><strong className="text-white">Land- und Forstwirte</strong> mit Einkünften nach § 21 EStG</li>
                <li className="text-red-400"><strong>Nicht:</strong> GmbH-Geschäftsführer, Angestellte, Vermieter</li>
                <li className="text-red-400"><strong>Nicht:</strong> Bei Pauschalierung (§ 17 EStG) oder Kleinunternehmerpauschalierung</li>
              </ul>
            </div>
          </section>

          {/* Staffelung */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Staffelung des Gewinnfreibetrags (2026)
            </h2>

            <p className="mb-6">
              Der Gewinnfreibetrag ist gestaffelt — je höher der Gewinn, desto niedriger der Prozentsatz
              für den investitionsbedingten Teil. Der Grundfreibetrag (15% auf die ersten 33.000 €) bleibt immer gleich.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-slate-700 rounded-lg">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4 text-left text-white border-r border-slate-700">Gewinnstufe</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">GFB-Satz</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">Art</th>
                    <th className="p-4 text-left text-white">Max. GFB dieser Stufe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700">0 – 33.000 €</td>
                    <td className="p-4 border-r border-slate-700 text-white font-semibold">15%</td>
                    <td className="p-4 border-r border-slate-700 text-green-400">Grundfreibetrag (automatisch)</td>
                    <td className="p-4 text-white font-semibold">4.950 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700">33.000 – 175.000 €</td>
                    <td className="p-4 border-r border-slate-700 text-white font-semibold">13%</td>
                    <td className="p-4 border-r border-slate-700 text-blue-400">Investitionsbedingt</td>
                    <td className="p-4 text-white font-semibold">18.460 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700">175.000 – 350.000 €</td>
                    <td className="p-4 border-r border-slate-700 text-white font-semibold">7%</td>
                    <td className="p-4 border-r border-slate-700 text-blue-400">Investitionsbedingt</td>
                    <td className="p-4 text-white font-semibold">12.250 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700">350.000 – 580.000 €</td>
                    <td className="p-4 border-r border-slate-700 text-white font-semibold">4,5%</td>
                    <td className="p-4 border-r border-slate-700 text-blue-400">Investitionsbedingt</td>
                    <td className="p-4 text-white font-semibold">10.350 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-800">
                    <td className="p-4 border-r border-slate-700 font-semibold text-white">Über 580.000 €</td>
                    <td className="p-4 border-r border-slate-700 text-white font-semibold">0%</td>
                    <td className="p-4 border-r border-slate-700">—</td>
                    <td className="p-4 text-slate-400">Kein weiterer GFB</td>
                  </tr>
                  <tr className="border-t-2 border-blue-600 bg-blue-900/20">
                    <td className="p-4 border-r border-slate-700 font-bold text-white" colSpan={2}>Maximaler Gesamt-GFB</td>
                    <td className="p-4 border-r border-slate-700"></td>
                    <td className="p-4 text-white font-bold">46.010 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700">
              <p className="text-amber-200 mb-0">
                <strong>Wichtig:</strong> Der investitionsbedingte GFB (ab 33.000 €) erfordert begünstigte Investitionen
                in mindestens derselben Höhe. Ohne Investitionen bekommst du nur den Grundfreibetrag von max. 4.950 €.
              </p>
            </div>
          </section>

          {/* Konkretes Rechenbeispiel */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Schritt-für-Schritt: GFB-Berechnung bei 60.000 € Gewinn
            </h2>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span>Jahresgewinn</span>
                  <span className="text-white font-semibold">60.000 €</span>
                </div>
                <div className="text-sm text-slate-400 py-1">Schritt 1: Grundfreibetrag</div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span>15% auf erste 33.000 €</span>
                  <span className="text-green-400 font-semibold">−4.950 €</span>
                </div>
                <div className="text-sm text-slate-400 py-1">Schritt 2: Investitionsbedingter GFB (bei Investition)</div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span>13% auf 27.000 € (60.000 − 33.000)</span>
                  <span className="text-green-400 font-semibold">−3.510 €</span>
                </div>
                <div className="text-sm text-slate-400 py-1">Ergebnis</div>
                <div className="flex justify-between py-2 border-b border-slate-700 font-semibold">
                  <span className="text-white">Gesamt-GFB</span>
                  <span className="text-green-400">8.460 €</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span>Zu versteuernder Gewinn (nach GFB)</span>
                  <span className="text-white font-semibold">51.540 €</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span>ESt-Ersparnis (bei ~40% Grenzsteuersatz)</span>
                  <span className="text-green-400 font-semibold">~3.384 €</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span className="text-white">SVS-Ersparnis (26,83% auf GFB)</span>
                  <span className="text-green-400">~2.270 €</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
              <p className="mb-0">
                <strong className="text-white">Gesamtersparnis bei 60.000 € Gewinn:</strong> Ca. <strong className="text-white">5.654 €</strong> (3.384 € ESt + 2.270 € SVS)
                — vorausgesetzt, du investierst mindestens 3.510 € in begünstigte Wirtschaftsgüter.
                Ohne Investition sparst du immer noch <strong className="text-white">~3.279 €</strong> durch den Grundfreibetrag allein.
              </p>
            </div>
          </section>

          {/* Steuerersparnis-Tabelle */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              GFB-Ersparnis nach Gewinnhöhe
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-slate-700 rounded-lg">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4 text-left text-white border-r border-slate-700">Gewinn</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">GFB gesamt</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">ESt-Ersparnis*</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">SVS-Ersparnis</th>
                    <th className="p-4 text-left text-white">Gesamt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700">15.000 €</td>
                    <td className="p-4 border-r border-slate-700">2.250 €</td>
                    <td className="p-4 border-r border-slate-700">~450 €</td>
                    <td className="p-4 border-r border-slate-700">~604 €</td>
                    <td className="p-4 text-green-400 font-semibold">~1.054 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700">25.000 €</td>
                    <td className="p-4 border-r border-slate-700">3.750 €</td>
                    <td className="p-4 border-r border-slate-700">~1.125 €</td>
                    <td className="p-4 border-r border-slate-700">~1.006 €</td>
                    <td className="p-4 text-green-400 font-semibold">~2.131 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700">33.000 €</td>
                    <td className="p-4 border-r border-slate-700">4.950 €</td>
                    <td className="p-4 border-r border-slate-700">~1.980 €</td>
                    <td className="p-4 border-r border-slate-700">~1.328 €</td>
                    <td className="p-4 text-green-400 font-semibold">~3.308 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700">50.000 €**</td>
                    <td className="p-4 border-r border-slate-700">7.160 €</td>
                    <td className="p-4 border-r border-slate-700">~2.864 €</td>
                    <td className="p-4 border-r border-slate-700">~1.921 €</td>
                    <td className="p-4 text-green-400 font-semibold">~4.785 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700">80.000 €**</td>
                    <td className="p-4 border-r border-slate-700">11.060 €</td>
                    <td className="p-4 border-r border-slate-700">~5.309 €</td>
                    <td className="p-4 border-r border-slate-700">~2.967 €</td>
                    <td className="p-4 text-green-400 font-semibold">~8.276 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700">100.000 €**</td>
                    <td className="p-4 border-r border-slate-700">13.660 €</td>
                    <td className="p-4 border-r border-slate-700">~6.557 €</td>
                    <td className="p-4 border-r border-slate-700">~3.665 €</td>
                    <td className="p-4 text-green-400 font-semibold">~10.222 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-400">
              *ESt-Ersparnis bei jeweiligem Grenzsteuersatz. **Investitionsbedingter GFB setzt begünstigte Investitionen voraus.
              SVS-Ersparnis = GFB × 26,83%.
            </p>
          </section>

          {/* Begünstigte Investitionen */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Begünstigte Investitionen für den investitionsbedingten GFB
            </h2>

            <p className="mb-6">
              Für den investitionsbedingten Gewinnfreibetrag (ab 33.000 € Gewinn) musst du in begünstigte
              Wirtschaftsgüter investieren. Es gibt zwei Kategorien:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Wertpapiere (§ 14 Abs 7 Z 4 EStG)</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Anleihen</strong> mit Restlaufzeit &gt; 4 Jahre</li>
                  <li><strong className="text-white">Investmentfonds</strong> mit &gt;50% Anleihen-Anteil</li>
                  <li><strong className="text-white">Wohnbauanleihen</strong></li>
                  <li><strong className="text-white">Bundesanleihen</strong></li>
                  <li className="text-red-400">Nicht: Aktien, ETFs mit &gt;50% Aktien, Krypto</li>
                </ul>
                <div className="mt-4 bg-slate-800 p-3 rounded">
                  <p className="text-sm mb-0">
                    <strong className="text-white">Haltefrist:</strong> Mindestens 4 Jahre. Früherer Verkauf
                    → GFB muss nachversteuert werden (Gewinnzuschlag).
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Abnutzbare Wirtschaftsgüter</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">IT-Hardware:</strong> Computer, Server, Laptops</li>
                  <li><strong className="text-white">Maschinen:</strong> Produktionsmaschinen, Geräte</li>
                  <li><strong className="text-white">Büroeinrichtung:</strong> Möbel, Ausstattung</li>
                  <li><strong className="text-white">Software:</strong> Lizenzen, Entwicklungstools</li>
                  <li><strong className="text-white">Fahrzeuge:</strong> Nutzfahrzeuge (keine PKW!)</li>
                </ul>
                <div className="mt-4 bg-slate-800 p-3 rounded">
                  <p className="text-sm mb-0">
                    <strong className="text-white">Nutzungsdauer:</strong> Mind. 4 Jahre.
                    GWG (unter 1.000 €) sind <strong className="text-white">nicht</strong> begünstigt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700">
              <p className="text-amber-200 mb-0">
                <strong>Praxis-Tipp:</strong> Die einfachste Variante für den investitionsbedingten GFB
                sind <strong>Wertpapiere</strong> (z.B. ein Anleihenfonds). Du kaufst vor Jahresende für den
                benötigten Betrag, hältst 4 Jahre, und sicherst dir den GFB. Die Rendite des Fonds kommt obendrauf.
              </p>
            </div>
          </section>

          {/* GFB vs IFB Vergleich */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Gewinnfreibetrag vs. Investitionsfreibetrag — Was ist der Unterschied?
            </h2>

            <p className="mb-6">
              Der <strong className="text-white">Gewinnfreibetrag (§ 10 EStG)</strong> und der{' '}
              <strong className="text-white">Investitionsfreibetrag (§ 11 EStG)</strong> sind zwei verschiedene Steuervorteile,
              die sich <strong className="text-white">kombinieren</strong> lassen:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-slate-700 rounded-lg">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4 text-left text-white border-r border-slate-700">Kriterium</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">Gewinnfreibetrag (§ 10)</th>
                    <th className="p-4 text-left text-white">Investitionsfreibetrag (§ 11)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Bemessungsgrundlage</td>
                    <td className="p-4 border-r border-slate-700">Gewinn</td>
                    <td className="p-4">Anschaffungskosten der Investition</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Prozentsatz</td>
                    <td className="p-4 border-r border-slate-700">15% / 13% / 7% / 4,5% (gestaffelt)</td>
                    <td className="p-4">15% allgemein / 20% ökologisch</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Maximum</td>
                    <td className="p-4 border-r border-slate-700">46.010 €/Jahr</td>
                    <td className="p-4">150.000 €/Jahr (bei 1 Mio. Investition)</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Automatisch?</td>
                    <td className="p-4 border-r border-slate-700 text-green-400">Grundfreibetrag: Ja</td>
                    <td className="p-4 text-red-400">Nein — nur bei Investition</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Haltefrist</td>
                    <td className="p-4 border-r border-slate-700">4 Jahre (bei Wertpapieren)</td>
                    <td className="p-4">4 Jahre Behaltefrist</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Kombinierbar?</td>
                    <td className="p-4 border-r border-slate-700 text-green-400" colSpan={2}>Ja — beide können gleichzeitig für dieselbe Investition genutzt werden!</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
              <h4 className="text-lg font-semibold text-white mb-2">Kombinationsbeispiel</h4>
              <p className="mb-0">
                Du kaufst einen Laptop für 2.000 €: <br/>
                <strong className="text-white">IFB (§ 11):</strong> 15% × 2.000 € = 300 € zusätzlicher Abzug<br/>
                <strong className="text-white">GFB (§ 10):</strong> Der Laptop zählt als begünstigte Investition für den investitionsbedingten GFB<br/>
                <strong className="text-white">AfA:</strong> Normale Abschreibung über Nutzungsdauer (z.B. 3 Jahre)<br/>
                → Dreifache Steuerersparnis durch eine einzige Investition!
              </p>
            </div>
          </section>

          {/* SVS-Wirkung */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              GFB-Wirkung auf SVS-Beiträge
            </h2>

            <p className="mb-6">
              Der Gewinnfreibetrag senkt nicht nur die Einkommensteuer, sondern auch die <strong className="text-white">SVS-Beitragsgrundlage</strong>.
              Die SVS berechnet deine Beiträge auf Basis des steuerlichen Gewinns — und der GFB reduziert diesen.
            </p>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">SVS-Ersparnis durch Grundfreibetrag</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-slate-700 rounded-lg text-sm">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 text-left text-white border-r border-slate-700">Gewinn</th>
                      <th className="p-3 text-left text-white border-r border-slate-700">Grundfreibetrag</th>
                      <th className="p-3 text-left text-white border-r border-slate-700">SVS-Ersparnis (26,83%)</th>
                      <th className="p-3 text-left text-white">SVS-Ersparnis/Monat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700">
                      <td className="p-3 border-r border-slate-700">15.000 €</td>
                      <td className="p-3 border-r border-slate-700">2.250 €</td>
                      <td className="p-3 border-r border-slate-700 text-green-400">604 €</td>
                      <td className="p-3 text-green-400">~50 €</td>
                    </tr>
                    <tr className="border-t border-slate-700 bg-slate-900/50">
                      <td className="p-3 border-r border-slate-700">25.000 €</td>
                      <td className="p-3 border-r border-slate-700">3.750 €</td>
                      <td className="p-3 border-r border-slate-700 text-green-400">1.006 €</td>
                      <td className="p-3 text-green-400">~84 €</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3 border-r border-slate-700">33.000 €+</td>
                      <td className="p-3 border-r border-slate-700">4.950 € (max.)</td>
                      <td className="p-3 border-r border-slate-700 text-green-400">1.328 €</td>
                      <td className="p-3 text-green-400">~111 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700">
              <p className="text-blue-200 mb-0">
                <strong>Doppeleffekt:</strong> Der GFB senkt den Gewinn → weniger ESt <strong>und</strong> weniger SVS.
                Die SVS-Ersparnis wird oft übersehen, macht aber bei 33.000 €+ Gewinn immerhin <strong>1.328 €/Jahr</strong> aus —
                allein durch den automatischen Grundfreibetrag!
              </p>
            </div>
          </section>

          {/* Optimal nutzen */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Gewinnfreibetrag optimal nutzen — 5 Tipps
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  1. Grundfreibetrag immer geltend machen
                </h3>
                <p>
                  Der Grundfreibetrag (15% auf die ersten 33.000 €) wird <strong className="text-white">nicht automatisch</strong> in der
                  E/A-Rechnung berücksichtigt. Du musst ihn in der Steuererklärung (E1a) in Kennzahl 9229 eintragen
                  oder von deinem Steuerberater einrechnen lassen. Vergiss das nicht — es sind bis zu 4.950 € steuerfrei!
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  2. Gewinne über 33.000 €? → Vor Jahresende investieren
                </h3>
                <p>
                  Ab 33.000 € Gewinn ist der Grundfreibetrag ausgeschöpft. Investiere noch vor dem 31.12.
                  in begünstigte Wertpapiere (z.B. Anleihenfonds), um den investitionsbedingten GFB (13%) zu sichern.
                  Berechne den nötigen Investitionsbetrag: (Gewinn − 33.000) × 13%.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  3. Timing: Gewinnplanung über Jahresende
                </h3>
                <p>
                  Plane deine Gewinne strategisch: Verschiebe Einnahmen oder ziehe Ausgaben vor,
                  um den Gewinnfreibetrag optimal zu nutzen. Besonders bei Gewinnen knapp über 33.000 €
                  kann sich eine Verschiebung ins Folgejahr lohnen — dann nutzt du in beiden Jahren den vollen Grundfreibetrag.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  4. GFB + IFB kombinieren
                </h3>
                <p>
                  Der Investitionsfreibetrag (§ 11 EStG, 15%/20%) kann <strong className="text-white">zusätzlich</strong> zum
                  Gewinnfreibetrag genutzt werden. Bei größeren Investitionen (z.B. E-Auto mit 20% öko-IFB)
                  entsteht eine doppelte Steuerersparnis. Beide Freibeträge können für dasselbe Wirtschaftsgut gelten.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  5. 4-Jahres-Haltefrist beachten
                </h3>
                <p className="mb-0">
                  Bei Wertpapieren gilt eine <strong className="text-white">Haltefrist von 4 Jahren</strong>.
                  Verkaufst du früher, musst du den GFB nachversteuern (Gewinnzuschlag im Verkaufsjahr).
                  Plane die Haltefrist ein und verkaufe erst nach Ablauf.
                </p>
              </div>
            </div>
          </section>

          {/* Häufige Fehler */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Häufige Fehler beim Gewinnfreibetrag
            </h2>

            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-3">
                  Grundfreibetrag vergessen
                </h3>
                <p>
                  Der häufigste Fehler: Der GFB wird in der Steuererklärung nicht eingetragen.
                  Anders als der Arbeitnehmerabsetzbetrag muss der GFB <strong className="text-white">aktiv geltend gemacht</strong> werden
                  (Kennzahl 9229 in der E1a). Prüfe deinen letzten Bescheid — wurde der GFB berücksichtigt?
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-3">
                  Nicht-begünstigte Wertpapiere kaufen
                </h3>
                <p>
                  Nicht alle Investments sind begünstigt. <strong className="text-white">Nicht begünstigt</strong> sind:
                  Aktien-ETFs mit &gt;50% Aktienanteil, Kryptowährungen, Gold, Immobilien-Investments,
                  Crowdinvesting. Nur Anleihen(-fonds) mit Restlaufzeit &gt;4 Jahre und Wohnbauanleihen gelten.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-3">
                  GFB bei Pauschalierung beanspruchen
                </h3>
                <p>
                  Der Gewinnfreibetrag gilt <strong className="text-white">nicht</strong> bei Pauschalierung (§ 17 EStG)
                  oder Kleinunternehmerpauschalierung. Bei diesen Gewinnermittlungsarten ist eine pauschale
                  Gewinnermittlung bereits inkludiert. Wer pauschaliert, kann den GFB nicht zusätzlich nutzen.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-3">
                  Haltefrist vorzeitig brechen
                </h3>
                <p className="mb-0">
                  Wer begünstigte Wertpapiere vor Ablauf der 4-Jahres-Frist verkauft, muss den
                  investitionsbedingten GFB im Verkaufsjahr nachversteuern. Bei einem GFB von 5.000 €
                  und 48% Grenzsteuersatz sind das <strong className="text-white">2.400 € Nachzahlung</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Steuererklärung */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              GFB in der Steuererklärung (E1a)
            </h2>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Wo eintragen?</h3>
              <ul className="space-y-3">
                <li>
                  <strong className="text-white">Kennzahl 9229:</strong> Grundfreibetrag — hier trägst du den
                  Grundfreibetrag ein (15% deines Gewinns, max. 4.950 €)
                </li>
                <li>
                  <strong className="text-white">Kennzahl 9227:</strong> Investitionsbedingter GFB — hier den
                  investitionsbedingten Teil eintragen (13%/7%/4,5% gestaffelt)
                </li>
                <li>
                  <strong className="text-white">Beilage E1a-2:</strong> Detailangaben zu den begünstigten
                  Investitionen (Art, Anschaffungskosten, Datum)
                </li>
              </ul>
            </div>

            <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700">
              <p className="text-blue-200 mb-0">
                <strong>Tipp:</strong> Lass den GFB von deinem Steuerberater einrechnen. Die meisten
                Steuerprogramme (BMF FinanzOnline, etc.) berechnen den GFB nicht automatisch.
                Ohne aktive Eintragung geht der Freibetrag verloren.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Berechne deinen Gewinnfreibetrag
              </h2>
              <p className="text-slate-300 mb-6">
                Nutze unsere Tools, um deinen optimalen Gewinnfreibetrag zu berechnen
                und die beste Investitionsstrategie zu finden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/rechner">
                    Steuer-Rechner nutzen
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  <Link href="/investitionsfreibetrag">
                    Investitionsfreibetrag-Rechner
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Häufige Fragen (FAQ)</h2>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Bekomme ich den Gewinnfreibetrag automatisch?</h3>
                <p className="mb-0">
                  Der Grundfreibetrag (15%, max. 4.950 €) steht dir automatisch zu, muss aber in der
                  Steuererklärung <strong className="text-white">aktiv eingetragen</strong> werden (Kennzahl 9229 in der E1a).
                  Ohne Eintragung geht der Freibetrag verloren. Der investitionsbedingte GFB erfordert
                  zusätzlich begünstigte Investitionen.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Kann ich GFB und IFB gleichzeitig nutzen?</h3>
                <p className="mb-0">
                  Ja! Der Gewinnfreibetrag (§ 10 EStG) und der Investitionsfreibetrag (§ 11 EStG, 15%/20%)
                  können <strong className="text-white">gleichzeitig für dasselbe Wirtschaftsgut</strong> genutzt werden.
                  Beispiel: Ein E-Auto für 40.000 € → 20% IFB (8.000 €) + investitionsbedingter GFB + normale AfA.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Gilt der GFB auch bei Pauschalierung?</h3>
                <p className="mb-0">
                  Nein. Bei Basispauschalierung (§ 17 EStG) und Kleinunternehmerpauschalierung ist der
                  Gewinnfreibetrag <strong className="text-white">nicht anwendbar</strong>. Nur bei tatsächlicher
                  Gewinnermittlung (Einnahmen-Ausgaben-Rechnung oder Bilanzierung) kannst du den GFB nutzen.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Was passiert, wenn ich Wertpapiere vor Ablauf der 4 Jahre verkaufe?</h3>
                <p className="mb-0">
                  Dann wird der investitionsbedingte GFB im Verkaufsjahr <strong className="text-white">nachversteuert</strong>.
                  Der damals abgezogene Betrag wird deinem Gewinn wieder hinzugerechnet. Bei einem GFB von 5.000 €
                  und 42% Grenzsteuersatz zahlst du 2.100 € Einkommensteuer nach — plus SVS-Nachforderung.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Senkt der GFB auch meine SVS-Beiträge?</h3>
                <p className="mb-0">
                  Ja. Der Gewinnfreibetrag reduziert den steuerlichen Gewinn, der die Basis für die
                  SVS-Beitragsberechnung ist. Bei einem Grundfreibetrag von 4.950 € sparst du
                  ca. <strong className="text-white">1.328 € SVS-Beiträge</strong> pro Jahr (4.950 × 26,83%).
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Wie hoch ist der maximale GFB?</h3>
                <p className="mb-0">
                  Der maximale Gewinnfreibetrag beträgt <strong className="text-white">46.010 €/Jahr</strong>
                  (bei einem Gewinn von 580.000 € und vollen begünstigten Investitionen). Für die meisten
                  Selbständigen ist aber der Grundfreibetrag von 4.950 € der relevante Betrag.
                </p>
              </div>
            </div>
          </section>

          {/* Fazit */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-6">Fazit</h2>
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
              <p className="text-lg leading-relaxed mb-0">
                Der Gewinnfreibetrag ist ein mächtiges Instrument für österreichische Selbständige.
                Mit bis zu <strong className="text-white">4.950 € automatischem Grundfreibetrag</strong> und zusätzlichem investitionsbedingtem
                Freibetrag kannst du deine Steuerlast und SVS-Beiträge erheblich reduzieren.
                Kombiniert mit dem Investitionsfreibetrag (§ 11 EStG, 15%/20%) entstehen bei größeren
                Investitionen signifikante Ersparnisse. Wichtig: <strong className="text-white">Aktiv in der Steuererklärung eintragen</strong> —
                der GFB wird nicht automatisch berücksichtigt.
              </p>
            </div>
          </section>

          <ArticleFooter
            breadcrumbs={[
              { name: 'Home', href: '/' },
              { name: 'Steuerwissen', href: '/steuerwissen' },
              { name: 'Gewinnfreibetrag nutzen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
            ]}
            sources={[
              { name: 'EStG § 10 — Gewinnfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS) — Einkommensteuergesetz' },
              { name: 'EStG § 11 — Investitionsfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'RIS — Investitionsfreibetrag' },
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
