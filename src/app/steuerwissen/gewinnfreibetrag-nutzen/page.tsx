import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'
import { SiteFooter } from '@/components/site-footer'

export default function GewinnfreibetragPage() {
  return (
    <PublicShell>
    <div className="min-h-screen bg-sb-bg text-sb-mut">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/steuerwissen" className="text-sb-mut hover:text-sb-text transition-colors">
                Steuerwissen
              </Link>
            </li>
            <li className="text-sb-dim">/</li>
            <li className="text-sb-text">Gewinnfreibetrag nutzen</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-sb-text mb-6 leading-tight">
              Gewinnfreibetrag 2026 — So sparst du bis zu 4.950 € Steuern (§ 10 EStG)
            </h1>
            <p className="text-xl text-sb-mut leading-relaxed">
              Der Gewinnfreibetrag ist eines der mächtigsten Steuertools für österreichische Selbständige.
              Mit dem richtigen Wissen sparst du automatisch Tausende Euro — völlig legal und ohne zusätzlichen Aufwand.
              Hier erfährst du alles über Grundfreibetrag, investitionsbedingten GFB, Staffelung und die optimale Nutzung.
            </p>
          </header>

          {/* AI Overview Box */}
          <div className="bg-sb-accent-soft border border-sb-accent/30 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-sb-accent mb-3">Kurzantwort</h2>
            <p className="text-sb-mut mb-0">
              Der Gewinnfreibetrag (§ 10 EStG) gewährt <strong className="text-sb-text">15% Grundfreibetrag auf die ersten 33.000 € Gewinn</strong> (max. 4.950 €) —
              automatisch, ohne Nachweis. Für Gewinne darüber gibt es den <strong className="text-sb-text">investitionsbedingten GFB</strong> (13–4,5% gestaffelt),
              der begünstigte Investitionen erfordert. Der GFB senkt sowohl die <strong className="text-sb-text">Einkommensteuer als auch die SVS-Beiträge</strong>.
              Er gilt nur bei E/A-Rechnung — nicht bei Pauschalierung.
            </p>
          </div>

          {/* Was ist der Gewinnfreibetrag */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Was ist der Gewinnfreibetrag? (§ 10 EStG)
            </h2>

            <p className="mb-6">
              Der Gewinnfreibetrag nach § 10 EStG ist ein Steuerfreibetrag für natürliche Personen mit Einkünften
              aus Gewerbebetrieb oder selbständiger Arbeit. Er reduziert den steuerpflichtigen Gewinn um einen
              bestimmten Prozentsatz und wirkt sich doppelt positiv aus: weniger Einkommensteuer <strong className="text-sb-text">und</strong> weniger SVS-Beiträge.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-sb-green-soft border border-sb-green/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-green mb-4">Grundfreibetrag (automatisch)</h3>
                <ul className="space-y-2">
                  <li><strong className="text-sb-text">15% auf die ersten 33.000 € Gewinn</strong></li>
                  <li><strong className="text-sb-text">Maximum: 4.950 € steuerfrei</strong></li>
                  <li>Keine Voraussetzungen oder Nachweise nötig</li>
                  <li>Gilt automatisch für alle Selbständigen</li>
                  <li>Wird in der Steuererklärung geltend gemacht</li>
                </ul>
              </div>

              <div className="bg-sb-accent-soft border border-sb-accent/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-accent mb-4">Investitionsbedingter GFB</h3>
                <ul className="space-y-2">
                  <li><strong className="text-sb-text">Gestaffelt: 13% bis 4,5%</strong></li>
                  <li>Erfordert begünstigte Investitionen</li>
                  <li>Zusätzlich zum Grundfreibetrag</li>
                  <li>Für Gewinne über 33.000 €</li>
                  <li>Kann die Gesamtersparnis erheblich steigern</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-accent/40">
              <h4 className="text-lg font-semibold text-sb-text mb-2">Wer kann den GFB nutzen?</h4>
              <ul className="space-y-2">
                <li><strong className="text-sb-text">Selbständige</strong> mit Einkünften aus Gewerbebetrieb (§ 23 EStG)</li>
                <li><strong className="text-sb-text">Freiberufler</strong> mit Einkünften aus selbständiger Arbeit (§ 22 EStG)</li>
                <li><strong className="text-sb-text">Land- und Forstwirte</strong> mit Einkünften nach § 21 EStG</li>
                <li className="text-sb-red"><strong>Nicht:</strong> GmbH-Geschäftsführer, Angestellte, Vermieter</li>
                <li className="text-sb-red"><strong>Nicht:</strong> Bei Pauschalierung (§ 17 EStG) oder Kleinunternehmerpauschalierung</li>
              </ul>
            </div>
          </section>

          {/* Staffelung */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Staffelung des Gewinnfreibetrags (2026)
            </h2>

            <p className="mb-6">
              Der Gewinnfreibetrag ist gestaffelt — je höher der Gewinn, desto niedriger der Prozentsatz
              für den investitionsbedingten Teil. Der Grundfreibetrag (15% auf die ersten 33.000 €) bleibt immer gleich.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sb-line rounded-lg">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Gewinnstufe</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">GFB-Satz</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Art</th>
                    <th className="p-4 text-left text-sb-text">Max. GFB dieser Stufe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line">0 – 33.000 €</td>
                    <td className="p-4 border-r border-sb-line text-sb-text font-semibold">15%</td>
                    <td className="p-4 border-r border-sb-line text-sb-green">Grundfreibetrag (automatisch)</td>
                    <td className="p-4 text-sb-text font-semibold">4.950 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line">33.000 – 178.000 €</td>
                    <td className="p-4 border-r border-sb-line text-sb-text font-semibold">13%</td>
                    <td className="p-4 border-r border-sb-line text-sb-accent">Investitionsbedingt</td>
                    <td className="p-4 text-sb-text font-semibold">18.850 €</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line">178.000 – 353.000 €</td>
                    <td className="p-4 border-r border-sb-line text-sb-text font-semibold">7%</td>
                    <td className="p-4 border-r border-sb-line text-sb-accent">Investitionsbedingt</td>
                    <td className="p-4 text-sb-text font-semibold">12.250 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line">353.000 – 583.000 €</td>
                    <td className="p-4 border-r border-sb-line text-sb-text font-semibold">4,5%</td>
                    <td className="p-4 border-r border-sb-line text-sb-accent">Investitionsbedingt</td>
                    <td className="p-4 text-sb-text font-semibold">10.350 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-white/[0.05]">
                    <td className="p-4 border-r border-sb-line font-semibold text-sb-text">Über 583.000 €</td>
                    <td className="p-4 border-r border-sb-line text-sb-text font-semibold">0%</td>
                    <td className="p-4 border-r border-sb-line">—</td>
                    <td className="p-4 text-sb-mut">Kein weiterer GFB</td>
                  </tr>
                  <tr className="border-t-2 border-sb-accent/30 bg-sb-accent-soft">
                    <td className="p-4 border-r border-sb-line font-bold text-sb-text" colSpan={2}>Maximaler Gesamt-GFB</td>
                    <td className="p-4 border-r border-sb-line"></td>
                    <td className="p-4 text-sb-text font-bold">46.400 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Wichtig:</strong> Der investitionsbedingte GFB (ab 33.000 €) erfordert begünstigte Investitionen
                in mindestens derselben Höhe. Ohne Investitionen bekommst du nur den Grundfreibetrag von max. 4.950 €.
              </p>
            </div>
          </section>

          {/* Konkretes Rechenbeispiel */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Schritt-für-Schritt: GFB-Berechnung bei 60.000 € Gewinn
            </h2>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-sb-line">
                  <span>Jahresgewinn</span>
                  <span className="text-sb-text font-semibold">60.000 €</span>
                </div>
                <div className="text-sm text-sb-mut py-1">Schritt 1: Grundfreibetrag</div>
                <div className="flex justify-between py-2 border-b border-sb-line">
                  <span>15% auf erste 33.000 €</span>
                  <span className="text-sb-green font-semibold">−4.950 €</span>
                </div>
                <div className="text-sm text-sb-mut py-1">Schritt 2: Investitionsbedingter GFB (bei Investition)</div>
                <div className="flex justify-between py-2 border-b border-sb-line">
                  <span>13% auf 27.000 € (60.000 − 33.000)</span>
                  <span className="text-sb-green font-semibold">−3.510 €</span>
                </div>
                <div className="text-sm text-sb-mut py-1">Ergebnis</div>
                <div className="flex justify-between py-2 border-b border-sb-line font-semibold">
                  <span className="text-sb-text">Gesamt-GFB</span>
                  <span className="text-sb-green">8.460 €</span>
                </div>
                <div className="flex justify-between py-2 border-b border-sb-line">
                  <span>Zu versteuernder Gewinn (nach GFB)</span>
                  <span className="text-sb-text font-semibold">51.540 €</span>
                </div>
                <div className="flex justify-between py-2 border-b border-sb-line">
                  <span>ESt-Ersparnis (bei ~40% Grenzsteuersatz)</span>
                  <span className="text-sb-green font-semibold">~3.384 €</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span className="text-sb-text">SVS-Ersparnis (26,83% auf GFB)</span>
                  <span className="text-sb-green">~2.270 €</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-green/40">
              <p className="mb-0">
                <strong className="text-sb-text">Gesamtersparnis bei 60.000 € Gewinn:</strong> Ca. <strong className="text-sb-text">5.654 €</strong> (3.384 € ESt + 2.270 € SVS)
                — vorausgesetzt, du investierst mindestens 3.510 € in begünstigte Wirtschaftsgüter.
                Ohne Investition sparst du immer noch <strong className="text-sb-text">~3.279 €</strong> durch den Grundfreibetrag allein.
              </p>
            </div>
          </section>

          {/* Steuerersparnis-Tabelle */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              GFB-Ersparnis nach Gewinnhöhe
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sb-line rounded-lg">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Gewinn</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">GFB gesamt</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">ESt-Ersparnis*</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">SVS-Ersparnis</th>
                    <th className="p-4 text-left text-sb-text">Gesamt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line">15.000 €</td>
                    <td className="p-4 border-r border-sb-line">2.250 €</td>
                    <td className="p-4 border-r border-sb-line">~450 €</td>
                    <td className="p-4 border-r border-sb-line">~604 €</td>
                    <td className="p-4 text-sb-green font-semibold">~1.054 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line">25.000 €</td>
                    <td className="p-4 border-r border-sb-line">3.750 €</td>
                    <td className="p-4 border-r border-sb-line">~1.125 €</td>
                    <td className="p-4 border-r border-sb-line">~1.006 €</td>
                    <td className="p-4 text-sb-green font-semibold">~2.131 €</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line">33.000 €</td>
                    <td className="p-4 border-r border-sb-line">4.950 €</td>
                    <td className="p-4 border-r border-sb-line">~1.980 €</td>
                    <td className="p-4 border-r border-sb-line">~1.328 €</td>
                    <td className="p-4 text-sb-green font-semibold">~3.308 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line">50.000 €**</td>
                    <td className="p-4 border-r border-sb-line">7.160 €</td>
                    <td className="p-4 border-r border-sb-line">~2.864 €</td>
                    <td className="p-4 border-r border-sb-line">~1.921 €</td>
                    <td className="p-4 text-sb-green font-semibold">~4.785 €</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line">80.000 €**</td>
                    <td className="p-4 border-r border-sb-line">11.060 €</td>
                    <td className="p-4 border-r border-sb-line">~5.309 €</td>
                    <td className="p-4 border-r border-sb-line">~2.967 €</td>
                    <td className="p-4 text-sb-green font-semibold">~8.276 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line">100.000 €**</td>
                    <td className="p-4 border-r border-sb-line">13.660 €</td>
                    <td className="p-4 border-r border-sb-line">~6.557 €</td>
                    <td className="p-4 border-r border-sb-line">~3.665 €</td>
                    <td className="p-4 text-sb-green font-semibold">~10.222 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-sb-mut">
              *ESt-Ersparnis bei jeweiligem Grenzsteuersatz. **Investitionsbedingter GFB setzt begünstigte Investitionen voraus.
              SVS-Ersparnis = GFB × 26,83%.
            </p>
          </section>

          {/* Begünstigte Investitionen */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Begünstigte Investitionen für den investitionsbedingten GFB
            </h2>

            <p className="mb-6">
              Für den investitionsbedingten Gewinnfreibetrag (ab 33.000 € Gewinn) musst du in begünstigte
              Wirtschaftsgüter investieren. Es gibt zwei Kategorien:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-4">Wertpapiere (§ 14 Abs 7 Z 4 EStG)</h3>
                <ul className="space-y-2">
                  <li><strong className="text-sb-text">Anleihen</strong> mit Restlaufzeit &gt; 4 Jahre</li>
                  <li><strong className="text-sb-text">Investmentfonds</strong> mit &gt;50% Anleihen-Anteil</li>
                  <li><strong className="text-sb-text">Wohnbauanleihen</strong></li>
                  <li><strong className="text-sb-text">Bundesanleihen</strong></li>
                  <li className="text-sb-red">Nicht: Aktien, ETFs mit &gt;50% Aktien, Krypto</li>
                </ul>
                <div className="mt-4 bg-white/[0.05] p-3 rounded">
                  <p className="text-sm mb-0">
                    <strong className="text-sb-text">Haltefrist:</strong> Mindestens 4 Jahre. Früherer Verkauf
                    → GFB muss nachversteuert werden (Gewinnzuschlag).
                  </p>
                </div>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-4">Abnutzbare Wirtschaftsgüter</h3>
                <ul className="space-y-2">
                  <li><strong className="text-sb-text">IT-Hardware:</strong> Computer, Server, Laptops</li>
                  <li><strong className="text-sb-text">Maschinen:</strong> Produktionsmaschinen, Geräte</li>
                  <li><strong className="text-sb-text">Büroeinrichtung:</strong> Möbel, Ausstattung</li>
                  <li><strong className="text-sb-text">Software:</strong> Lizenzen, Entwicklungstools</li>
                  <li><strong className="text-sb-text">Fahrzeuge:</strong> Nutzfahrzeuge (keine PKW!)</li>
                </ul>
                <div className="mt-4 bg-white/[0.05] p-3 rounded">
                  <p className="text-sm mb-0">
                    <strong className="text-sb-text">Nutzungsdauer:</strong> Mind. 4 Jahre.
                    GWG (unter 1.000 €) sind <strong className="text-sb-text">nicht</strong> begünstigt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Praxis-Tipp:</strong> Die einfachste Variante für den investitionsbedingten GFB
                sind <strong>Wertpapiere</strong> (z.B. ein Anleihenfonds). Du kaufst vor Jahresende für den
                benötigten Betrag, hältst 4 Jahre, und sicherst dir den GFB. Die Rendite des Fonds kommt obendrauf.
              </p>
            </div>
          </section>

          {/* GFB vs IFB Vergleich */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Gewinnfreibetrag vs. Investitionsfreibetrag — Was ist der Unterschied?
            </h2>

            <p className="mb-6">
              Der <strong className="text-sb-text">Gewinnfreibetrag (§ 10 EStG)</strong> und der{' '}
              <strong className="text-sb-text">Investitionsfreibetrag (§ 11 EStG)</strong> sind zwei verschiedene Steuervorteile,
              die sich <strong className="text-sb-text">kombinieren</strong> lassen:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sb-line rounded-lg">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Kriterium</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Gewinnfreibetrag (§ 10)</th>
                    <th className="p-4 text-left text-sb-text">Investitionsfreibetrag (§ 11)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Bemessungsgrundlage</td>
                    <td className="p-4 border-r border-sb-line">Gewinn</td>
                    <td className="p-4">Anschaffungskosten der Investition</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Prozentsatz</td>
                    <td className="p-4 border-r border-sb-line">15% / 13% / 7% / 4,5% (gestaffelt)</td>
                    <td className="p-4">15% allgemein / 20% ökologisch</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Maximum</td>
                    <td className="p-4 border-r border-sb-line">46.400 €/Jahr</td>
                    <td className="p-4">150.000 €/Jahr (bei 1 Mio. Investition)</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Automatisch?</td>
                    <td className="p-4 border-r border-sb-line text-sb-green">Grundfreibetrag: Ja</td>
                    <td className="p-4 text-sb-red">Nein — nur bei Investition</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Haltefrist</td>
                    <td className="p-4 border-r border-sb-line">4 Jahre (bei Wertpapieren)</td>
                    <td className="p-4">4 Jahre Behaltefrist</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Kombinierbar?</td>
                    <td className="p-4 border-r border-sb-line text-sb-green" colSpan={2}>Ja — beide können gleichzeitig für dieselbe Investition genutzt werden!</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-green/40">
              <h4 className="text-lg font-semibold text-sb-text mb-2">Kombinationsbeispiel</h4>
              <p className="mb-0">
                Du kaufst einen Laptop für 2.000 €: <br/>
                <strong className="text-sb-text">IFB (§ 11):</strong> 15% × 2.000 € = 300 € zusätzlicher Abzug<br/>
                <strong className="text-sb-text">GFB (§ 10):</strong> Der Laptop zählt als begünstigte Investition für den investitionsbedingten GFB<br/>
                <strong className="text-sb-text">AfA:</strong> Normale Abschreibung über Nutzungsdauer (z.B. 3 Jahre)<br/>
                → Dreifache Steuerersparnis durch eine einzige Investition!
              </p>
            </div>
          </section>

          {/* SVS-Wirkung */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              GFB-Wirkung auf SVS-Beiträge
            </h2>

            <p className="mb-6">
              Der Gewinnfreibetrag senkt nicht nur die Einkommensteuer, sondern auch die <strong className="text-sb-text">SVS-Beitragsgrundlage</strong>.
              Die SVS berechnet deine Beiträge auf Basis des steuerlichen Gewinns — und der GFB reduziert diesen.
            </p>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <h3 className="text-lg font-semibold text-sb-text mb-4">SVS-Ersparnis durch Grundfreibetrag</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-sb-line rounded-lg text-sm">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="p-3 text-left text-sb-text border-r border-sb-line">Gewinn</th>
                      <th className="p-3 text-left text-sb-text border-r border-sb-line">Grundfreibetrag</th>
                      <th className="p-3 text-left text-sb-text border-r border-sb-line">SVS-Ersparnis (26,83%)</th>
                      <th className="p-3 text-left text-sb-text">SVS-Ersparnis/Monat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-sb-line">
                      <td className="p-3 border-r border-sb-line">15.000 €</td>
                      <td className="p-3 border-r border-sb-line">2.250 €</td>
                      <td className="p-3 border-r border-sb-line text-sb-green">604 €</td>
                      <td className="p-3 text-sb-green">~50 €</td>
                    </tr>
                    <tr className="border-t border-sb-line bg-sb-deep">
                      <td className="p-3 border-r border-sb-line">25.000 €</td>
                      <td className="p-3 border-r border-sb-line">3.750 €</td>
                      <td className="p-3 border-r border-sb-line text-sb-green">1.006 €</td>
                      <td className="p-3 text-sb-green">~84 €</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3 border-r border-sb-line">33.000 €+</td>
                      <td className="p-3 border-r border-sb-line">4.950 € (max.)</td>
                      <td className="p-3 border-r border-sb-line text-sb-green">1.328 €</td>
                      <td className="p-3 text-sb-green">~111 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Doppeleffekt:</strong> Der GFB senkt den Gewinn → weniger ESt <strong>und</strong> weniger SVS.
                Die SVS-Ersparnis wird oft übersehen, macht aber bei 33.000 €+ Gewinn immerhin <strong>1.328 €/Jahr</strong> aus —
                allein durch den automatischen Grundfreibetrag!
              </p>
            </div>
          </section>

          {/* Optimal nutzen */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Gewinnfreibetrag optimal nutzen — 5 Tipps
            </h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
                  1. Grundfreibetrag immer geltend machen
                </h3>
                <p>
                  Der Grundfreibetrag (15% auf die ersten 33.000 €) wird <strong className="text-sb-text">nicht automatisch</strong> in der
                  E/A-Rechnung berücksichtigt. Du musst ihn in der Steuererklärung (E1a) in Kennzahl 9229 eintragen
                  oder von deinem Steuerberater einrechnen lassen. Vergiss das nicht — es sind bis zu 4.950 € steuerfrei!
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
                  2. Gewinne über 33.000 €? → Vor Jahresende investieren
                </h3>
                <p>
                  Ab 33.000 € Gewinn ist der Grundfreibetrag ausgeschöpft. Investiere noch vor dem 31.12.
                  in begünstigte Wertpapiere (z.B. Anleihenfonds), um den investitionsbedingten GFB (13%) zu sichern.
                  Berechne den nötigen Investitionsbetrag: (Gewinn − 33.000) × 13%.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
                  3. Timing: Gewinnplanung über Jahresende
                </h3>
                <p>
                  Plane deine Gewinne strategisch: Verschiebe Einnahmen oder ziehe Ausgaben vor,
                  um den Gewinnfreibetrag optimal zu nutzen. Besonders bei Gewinnen knapp über 33.000 €
                  kann sich eine Verschiebung ins Folgejahr lohnen — dann nutzt du in beiden Jahren den vollen Grundfreibetrag.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
                  4. GFB + IFB kombinieren
                </h3>
                <p>
                  Der Investitionsfreibetrag (§ 11 EStG, 15%/20%) kann <strong className="text-sb-text">zusätzlich</strong> zum
                  Gewinnfreibetrag genutzt werden. Bei größeren Investitionen (z.B. E-Auto mit 20% öko-IFB)
                  entsteht eine doppelte Steuerersparnis. Beide Freibeträge können für dasselbe Wirtschaftsgut gelten.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
                  5. 4-Jahres-Haltefrist beachten
                </h3>
                <p className="mb-0">
                  Bei Wertpapieren gilt eine <strong className="text-sb-text">Haltefrist von 4 Jahren</strong>.
                  Verkaufst du früher, musst du den GFB nachversteuern (Gewinnzuschlag im Verkaufsjahr).
                  Plane die Haltefrist ein und verkaufe erst nach Ablauf.
                </p>
              </div>
            </div>
          </section>

          {/* Häufige Fehler */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Häufige Fehler beim Gewinnfreibetrag
            </h2>

            <div className="space-y-4">
              <div className="bg-sb-red/10 border border-sb-red/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-red mb-3">
                  Grundfreibetrag vergessen
                </h3>
                <p>
                  Der häufigste Fehler: Der GFB wird in der Steuererklärung nicht eingetragen.
                  Anders als der Arbeitnehmerabsetzbetrag muss der GFB <strong className="text-sb-text">aktiv geltend gemacht</strong> werden
                  (Kennzahl 9229 in der E1a). Prüfe deinen letzten Bescheid — wurde der GFB berücksichtigt?
                </p>
              </div>

              <div className="bg-sb-red/10 border border-sb-red/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-red mb-3">
                  Nicht-begünstigte Wertpapiere kaufen
                </h3>
                <p>
                  Nicht alle Investments sind begünstigt. <strong className="text-sb-text">Nicht begünstigt</strong> sind:
                  Aktien-ETFs mit &gt;50% Aktienanteil, Kryptowährungen, Gold, Immobilien-Investments,
                  Crowdinvesting. Nur Anleihen(-fonds) mit Restlaufzeit &gt;4 Jahre und Wohnbauanleihen gelten.
                </p>
              </div>

              <div className="bg-sb-red/10 border border-sb-red/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-red mb-3">
                  GFB bei Pauschalierung beanspruchen
                </h3>
                <p>
                  Der Gewinnfreibetrag gilt <strong className="text-sb-text">nicht</strong> bei Pauschalierung (§ 17 EStG)
                  oder Kleinunternehmerpauschalierung. Bei diesen Gewinnermittlungsarten ist eine pauschale
                  Gewinnermittlung bereits inkludiert. Wer pauschaliert, kann den GFB nicht zusätzlich nutzen.
                </p>
              </div>

              <div className="bg-sb-red/10 border border-sb-red/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-red mb-3">
                  Haltefrist vorzeitig brechen
                </h3>
                <p className="mb-0">
                  Wer begünstigte Wertpapiere vor Ablauf der 4-Jahres-Frist verkauft, muss den
                  investitionsbedingten GFB im Verkaufsjahr nachversteuern. Bei einem GFB von 5.000 €
                  und 48% Grenzsteuersatz sind das <strong className="text-sb-text">2.400 € Nachzahlung</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Steuererklärung */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              GFB in der Steuererklärung (E1a)
            </h2>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <h3 className="text-lg font-semibold text-sb-text mb-4">Wo eintragen?</h3>
              <ul className="space-y-3">
                <li>
                  <strong className="text-sb-text">Kennzahl 9229:</strong> Grundfreibetrag — hier trägst du den
                  Grundfreibetrag ein (15% deines Gewinns, max. 4.950 €)
                </li>
                <li>
                  <strong className="text-sb-text">Kennzahl 9227:</strong> Investitionsbedingter GFB — hier den
                  investitionsbedingten Teil eintragen (13%/7%/4,5% gestaffelt)
                </li>
                <li>
                  <strong className="text-sb-text">Beilage E1a-2:</strong> Detailangaben zu den begünstigten
                  Investitionen (Art, Anschaffungskosten, Datum)
                </li>
              </ul>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Tipp:</strong> Lass den GFB von deinem Steuerberater einrechnen. Die meisten
                Steuerprogramme (BMF FinanzOnline, etc.) berechnen den GFB nicht automatisch.
                Ohne aktive Eintragung geht der Freibetrag verloren.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <div className="bg-sb-accent-soft border border-sb-accent/30 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Berechne deinen Gewinnfreibetrag
              </h2>
              <p className="text-sb-mut mb-6">
                Nutze unsere Tools, um deinen optimalen Gewinnfreibetrag zu berechnen
                und die beste Investitionsstrategie zu finden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-sb-accent hover:bg-sb-accent-deep">
                  <Link href="/rechner">
                    Steuer-Rechner nutzen
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-sb-line-strong text-sb-mut hover:bg-white/[0.05]">
                  <Link href="/investitionsfreibetrag">
                    Investitionsfreibetrag-Rechner
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Häufige Fragen (FAQ)</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Bekomme ich den Gewinnfreibetrag automatisch?</h3>
                <p className="mb-0">
                  Der Grundfreibetrag (15%, max. 4.950 €) steht dir automatisch zu, muss aber in der
                  Steuererklärung <strong className="text-sb-text">aktiv eingetragen</strong> werden (Kennzahl 9229 in der E1a).
                  Ohne Eintragung geht der Freibetrag verloren. Der investitionsbedingte GFB erfordert
                  zusätzlich begünstigte Investitionen.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Kann ich GFB und IFB gleichzeitig nutzen?</h3>
                <p className="mb-0">
                  Ja! Der Gewinnfreibetrag (§ 10 EStG) und der Investitionsfreibetrag (§ 11 EStG, 15%/20%)
                  können <strong className="text-sb-text">gleichzeitig für dasselbe Wirtschaftsgut</strong> genutzt werden.
                  Beispiel: Ein E-Auto für 40.000 € → 20% IFB (8.000 €) + investitionsbedingter GFB + normale AfA.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Gilt der GFB auch bei Pauschalierung?</h3>
                <p className="mb-0">
                  Nein. Bei Basispauschalierung (§ 17 EStG) und Kleinunternehmerpauschalierung ist der
                  Gewinnfreibetrag <strong className="text-sb-text">nicht anwendbar</strong>. Nur bei tatsächlicher
                  Gewinnermittlung (Einnahmen-Ausgaben-Rechnung oder Bilanzierung) kannst du den GFB nutzen.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Was passiert, wenn ich Wertpapiere vor Ablauf der 4 Jahre verkaufe?</h3>
                <p className="mb-0">
                  Dann wird der investitionsbedingte GFB im Verkaufsjahr <strong className="text-sb-text">nachversteuert</strong>.
                  Der damals abgezogene Betrag wird deinem Gewinn wieder hinzugerechnet. Bei einem GFB von 5.000 €
                  und 42% Grenzsteuersatz zahlst du 2.100 € Einkommensteuer nach — plus SVS-Nachforderung.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Senkt der GFB auch meine SVS-Beiträge?</h3>
                <p className="mb-0">
                  Ja. Der Gewinnfreibetrag reduziert den steuerlichen Gewinn, der die Basis für die
                  SVS-Beitragsberechnung ist. Bei einem Grundfreibetrag von 4.950 € sparst du
                  ca. <strong className="text-sb-text">1.328 € SVS-Beiträge</strong> pro Jahr (4.950 × 26,83%).
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Wie hoch ist der maximale GFB?</h3>
                <p className="mb-0">
                  Der maximale Gewinnfreibetrag beträgt <strong className="text-sb-text">46.400 €/Jahr</strong>
                  (bei einem Gewinn von 583.000 € und vollen begünstigten Investitionen). Für die meisten
                  Selbständigen ist aber der Grundfreibetrag von 4.950 € der relevante Betrag.
                </p>
              </div>
            </div>
          </section>

          {/* Fazit */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Fazit</h2>
            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-green/40">
              <p className="text-lg leading-relaxed mb-0">
                Der Gewinnfreibetrag ist ein mächtiges Instrument für österreichische Selbständige.
                Mit bis zu <strong className="text-sb-text">4.950 € automatischem Grundfreibetrag</strong> und zusätzlichem investitionsbedingtem
                Freibetrag kannst du deine Steuerlast und SVS-Beiträge erheblich reduzieren.
                Kombiniert mit dem Investitionsfreibetrag (§ 11 EStG, 15%/20%) entstehen bei größeren
                Investitionen signifikante Ersparnisse. Wichtig: <strong className="text-sb-text">Aktiv in der Steuererklärung eintragen</strong> —
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
              { title: 'Steueroptimierung für Selbständige: Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              { title: 'SVS-Beiträge senken: 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
              { title: 'GmbH vs. Einzelunternehmen: Der Steuer-Vergleich', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
            ]}
          />
        </article>
      </div>

      <SiteFooter />
    </div>
    </PublicShell>
  )
}
