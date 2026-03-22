import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function PauschalierungOesterreichPage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
              <span>›</span>
              <Link href="/steuerwissen" className="hover:text-slate-300 transition-colors">Steuerwissen</Link>
              <span>›</span>
              <span className="text-slate-300">Pauschalierung</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Pauschalierung in Österreich 2026 — Basispauschalierung, Branchenpauschalierung & Kleinunternehmerpauschalierung
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Die Pauschalierung ist eine der effektivsten Möglichkeiten, den steuerlichen Verwaltungsaufwand
              als Selbstständiger in Österreich drastisch zu reduzieren. Statt jeden Beleg einzeln zu erfassen,
              setzen Sie einen pauschalen Prozentsatz Ihrer Einnahmen als Betriebsausgaben an. Dieser Guide
              erklärt alle drei Pauschalierungsarten, die Voraussetzungen und hilft Ihnen bei der Entscheidung,
              welche Variante sich für Sie lohnt.
            </p>

            {/* Was ist Pauschalierung? */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Was ist die Pauschalierung?
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Bei der Pauschalierung werden Betriebsausgaben nicht einzeln erfasst, sondern pauschal als
                Prozentsatz der Betriebseinnahmen angesetzt. Das österreichische Einkommensteuergesetz (EStG)
                bietet drei verschiedene Pauschalierungsmodelle an, die sich in Voraussetzungen, Pauschalsätzen
                und Anwendungsbereich unterscheiden.
              </p>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Der große Vorteil: Sie müssen keine detaillierte Einnahmen-Ausgaben-Rechnung führen und sparen
                sich erheblichen Buchhaltungsaufwand. Gleichzeitig kann die Pauschalierung aber auch zu einer
                höheren Steuerbelastung führen, wenn Ihre tatsächlichen Ausgaben über dem Pauschalsatz liegen.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-slate-300">
                  <strong className="text-white">Wichtig:</strong> Die Pauschalierung betrifft nur die
                  Einkommensteuer. SVS-Beiträge, Umsatzsteuer und andere Abgaben werden unabhängig davon berechnet.
                </p>
              </div>
            </section>

            {/* Die drei Arten */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Die drei Pauschalierungsarten im Überblick
              </h2>

              {/* Basispauschalierung */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  1. Basispauschalierung (§ 17 Abs 1 EStG)
                </h3>
                <p className="text-slate-300 mb-3 leading-relaxed">
                  Die Basispauschalierung ist die häufigste Form und steht grundsätzlich allen Selbstständigen
                  mit Einkünften aus Gewerbebetrieb oder selbstständiger Arbeit offen.
                </p>
                <div className="space-y-2 text-slate-300 mb-4">
                  <p><strong className="text-white">Pauschalsatz:</strong> 12% der Betriebseinnahmen (inkl. USt)</p>
                  <p><strong className="text-white">Für bestimmte Tätigkeiten:</strong> 6% (z.B. kaufmännische Beratung, Schriftsteller, Vortragende, Wissenschaftler)</p>
                  <p><strong className="text-white">Umsatzgrenze:</strong> 220.000€ Jahresumsatz</p>
                  <p><strong className="text-white">Maximaler Pauschalbetrag:</strong> 26.400€ (bei 12%) bzw. 13.200€ (bei 6%)</p>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Zusätzlich zum Pauschalbetrag können Sozialversicherungsbeiträge (SVS), der Grundfreibetrag
                  des Gewinnfreibetrags und Reise- sowie Fahrtkosten gesondert abgesetzt werden.
                </p>
              </div>

              {/* Branchenpauschalierung */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  2. Branchenpauschalierung (Verordnungen des BMF)
                </h3>
                <p className="text-slate-300 mb-3 leading-relaxed">
                  Für bestimmte Branchen gibt es eigene Pauschalierungsverordnungen des Bundesministeriums
                  für Finanzen mit branchenspezifischen Pauschalsätzen, die oft deutlich höher als 12% sind.
                </p>
                <div className="space-y-2 text-slate-300 mb-4">
                  <p><strong className="text-white">Gastronomie:</strong> Eigene Verordnung mit gestaffelten Sätzen (Wareneinsatz + Personalkosten)</p>
                  <p><strong className="text-white">Lebensmittelhandel:</strong> Branchenspezifischer Wareneinsatz</p>
                  <p><strong className="text-white">Drogisten:</strong> Eigene Pauschalierung</p>
                  <p><strong className="text-white">Sportler, Künstler:</strong> Spezielle Regelungen</p>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Die Branchenpauschalierung ist besonders für Betriebe mit hohem Wareneinsatz attraktiv,
                  da die Pauschalsätze den branchentypischen Kostenstrukturen angepasst sind.
                </p>
              </div>

              {/* Kleinunternehmerpauschalierung */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  3. Kleinunternehmerpauschalierung (§ 17 Abs 3a EStG)
                </h3>
                <p className="text-slate-300 mb-3 leading-relaxed">
                  Die Kleinunternehmerpauschalierung wurde 2020 eingeführt und richtet sich speziell an
                  umsatzsteuerbefreite Kleinunternehmer.
                </p>
                <div className="space-y-2 text-slate-300 mb-4">
                  <p><strong className="text-white">Pauschalsatz Dienstleistungen:</strong> 20% der Betriebseinnahmen</p>
                  <p><strong className="text-white">Pauschalsatz Warenhandel/Produktion:</strong> 45% der Betriebseinnahmen</p>
                  <p><strong className="text-white">Umsatzgrenze:</strong> 42.000€ (= Kleinunternehmergrenze)</p>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Zusätzlich absetzbar: SVS-Beiträge, Reisekosten und der Grundfreibetrag. Die
                  Kleinunternehmerpauschalierung bietet den höchsten Pauschalsatz für Dienstleister,
                  die unter der Kleinunternehmergrenze bleiben.
                </p>
              </div>
            </section>

            {/* Vergleichstabelle */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Vergleichstabelle: Alle Pauschalierungen auf einen Blick
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-300 border border-slate-700 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="text-left p-3 text-white">Kriterium</th>
                      <th className="text-left p-3 text-white">Basis (12%/6%)</th>
                      <th className="text-left p-3 text-white">Branche</th>
                      <th className="text-left p-3 text-white">Kleinunternehmer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="bg-slate-900">
                      <td className="p-3 font-medium">Umsatzgrenze</td>
                      <td className="p-3">220.000€</td>
                      <td className="p-3">Branchenabhängig</td>
                      <td className="p-3">42.000€</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3 font-medium">Pauschalsatz</td>
                      <td className="p-3">12% / 6%</td>
                      <td className="p-3">Branchenspezifisch</td>
                      <td className="p-3">45% / 20%</td>
                    </tr>
                    <tr className="bg-slate-900">
                      <td className="p-3 font-medium">Max. Pauschale</td>
                      <td className="p-3">26.400€</td>
                      <td className="p-3">Variabel</td>
                      <td className="p-3">18.900€</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3 font-medium">SVS zusätzlich</td>
                      <td className="p-3">Ja</td>
                      <td className="p-3">Teilweise</td>
                      <td className="p-3">Ja</td>
                    </tr>
                    <tr className="bg-slate-900">
                      <td className="p-3 font-medium">Vorsteuerabzug</td>
                      <td className="p-3">Möglich</td>
                      <td className="p-3">Möglich</td>
                      <td className="p-3">Nein (KU)</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3 font-medium">GFB möglich</td>
                      <td className="p-3">Grundfreibetrag</td>
                      <td className="p-3">Ja</td>
                      <td className="p-3">Grundfreibetrag</td>
                    </tr>
                    <tr className="bg-slate-900">
                      <td className="p-3 font-medium">Buchführung</td>
                      <td className="p-3">Vereinfacht</td>
                      <td className="p-3">Vereinfacht</td>
                      <td className="p-3">Minimal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Voraussetzungen */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Voraussetzungen für die Pauschalierung
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Basispauschalierung</h3>
                  <ul className="text-slate-300 space-y-2">
                    <li>• Einkünfte aus Gewerbebetrieb oder selbstständiger Arbeit</li>
                    <li>• Jahresumsatz nicht über 220.000€</li>
                    <li>• Keine Buchführungspflicht (oder freiwilliger Verzicht darauf)</li>
                    <li>• Keine Gesellschafter einer OG oder KG mit Buchführungspflicht</li>
                  </ul>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Branchenpauschalierung</h3>
                  <ul className="text-slate-300 space-y-2">
                    <li>• Tätigkeit muss unter eine BMF-Pauschalierungsverordnung fallen</li>
                    <li>• Branchenspezifische Umsatzgrenzen beachten</li>
                    <li>• Teilweise: Gewerbeschein für die betreffende Branche erforderlich</li>
                  </ul>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Kleinunternehmerpauschalierung</h3>
                  <ul className="text-slate-300 space-y-2">
                    <li>• USt-Befreiung als Kleinunternehmer muss gelten</li>
                    <li>• Jahresumsatz maximal 42.000€ (seit 2025)</li>
                    <li>• Keine Buchführungspflicht</li>
                    <li>• Kein Verzicht auf die Kleinunternehmerregelung (Option zur Regelbesteuerung)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Rechenbeispiele */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Rechenbeispiele: Pauschalierung vs. tatsächliche Ausgaben
              </h2>

              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Beispiel 1: IT-Berater mit 80.000€ Umsatz
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-slate-300 mb-4">
                    <div>
                      <p className="font-medium text-white mb-2">Mit Basispauschalierung (6%):</p>
                      <p>Einnahmen: 80.000€</p>
                      <p>Pauschale (6%): -4.800€</p>
                      <p>SVS-Beiträge: -20.200€</p>
                      <p>GFB Grundfreibetrag: -4.950€</p>
                      <p className="font-semibold text-white mt-2">Gewinn: 50.050€</p>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Mit tatsächlichen Ausgaben:</p>
                      <p>Einnahmen: 80.000€</p>
                      <p>Tatsächl. Ausgaben: -12.000€</p>
                      <p>SVS-Beiträge: -18.200€</p>
                      <p>GFB: -4.950€</p>
                      <p className="font-semibold text-white mt-2">Gewinn: 44.850€</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">
                    → In diesem Fall sind die tatsächlichen Ausgaben höher als die Pauschale.
                    Die E/A-Rechnung spart ca. 1.500€ Einkommensteuer.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Beispiel 2: Texterin mit 35.000€ Umsatz (Kleinunternehmerin)
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-slate-300 mb-4">
                    <div>
                      <p className="font-medium text-white mb-2">Kleinunternehmer-Pauschale (20%):</p>
                      <p>Einnahmen: 35.000€</p>
                      <p>Pauschale (20%): -7.000€</p>
                      <p>SVS-Beiträge: -7.500€</p>
                      <p>GFB Grundfreibetrag: -3.075€</p>
                      <p className="font-semibold text-white mt-2">Gewinn: 17.425€</p>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Tatsächliche Ausgaben:</p>
                      <p>Einnahmen: 35.000€</p>
                      <p>Tatsächl. Ausgaben: -3.500€</p>
                      <p>SVS-Beiträge: -8.450€</p>
                      <p>GFB: -3.075€</p>
                      <p className="font-semibold text-white mt-2">Gewinn: 19.975€</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">
                    → Die Kleinunternehmerpauschalierung ist hier klar vorteilhaft und spart ca. 760€ Steuer.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Beispiel 3: Handwerker mit 150.000€ Umsatz
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-slate-300 mb-4">
                    <div>
                      <p className="font-medium text-white mb-2">Basispauschalierung (12%):</p>
                      <p>Einnahmen: 150.000€</p>
                      <p>Pauschale (12%): -18.000€</p>
                      <p>SVS-Beiträge: -22.600€</p>
                      <p>GFB: -4.950€</p>
                      <p className="font-semibold text-white mt-2">Gewinn: 104.450€</p>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Tatsächliche Ausgaben:</p>
                      <p>Einnahmen: 150.000€</p>
                      <p>Tatsächl. Ausgaben: -65.000€</p>
                      <p>SVS-Beiträge: -16.800€</p>
                      <p>GFB: -4.950€</p>
                      <p className="font-semibold text-white mt-2">Gewinn: 63.250€</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">
                    → Bei hohem Wareneinsatz ist die Basispauschalierung nachteilig.
                    Prüfen Sie, ob eine Branchenpauschalierung in Frage kommt.
                  </p>
                </div>
              </div>
            </section>

            {/* Wann lohnt sich Pauschalierung? */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Wann lohnt sich die Pauschalierung?
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-green-900/20 border border-green-700/50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Pauschalierung lohnt sich bei:</h3>
                  <ul className="text-slate-300 space-y-2">
                    <li>• Dienstleistungen ohne Wareneinsatz</li>
                    <li>• Geringen tatsächlichen Betriebsausgaben</li>
                    <li>• Wenig Zeit für Buchhaltung</li>
                    <li>• Stabilen, vorhersehbaren Einnahmen</li>
                    <li>• Freiberuflicher Tätigkeit (Beratung, IT, Text)</li>
                    <li>• Nebentätigkeit mit geringem Aufwand</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-700/50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-3">E/A-Rechnung ist besser bei:</h3>
                  <ul className="text-slate-300 space-y-2">
                    <li>• Hohem Wareneinsatz oder Materialkauf</li>
                    <li>• Vielen absetzbaren Investitionen</li>
                    <li>• Arbeitszimmer, Fahrzeug, etc.</li>
                    <li>• Hohen Reisekosten und Fortbildungen</li>
                    <li>• Wenn tatsächliche Ausgaben über 12% liegen</li>
                    <li>• Bei geplanten größeren Investitionen</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SVS-Auswirkungen */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Auswirkungen auf SVS-Beiträge
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Die Pauschalierung hat direkte Auswirkungen auf Ihre SVS-Beiträge, da diese
                auf Basis des steuerlichen Gewinns berechnet werden. Bei der Pauschalierung kann
                der Gewinn höher oder niedriger ausfallen als bei tatsächlichen Ausgaben — und
                damit ändern sich auch die SVS-Beiträge.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Rechenbeispiel: SVS-Auswirkung</h3>
                <div className="text-slate-300 space-y-1">
                  <p>Umsatz: 50.000€, tatsächliche Ausgaben: 8.000€</p>
                  <p className="mt-2"><strong className="text-white">Mit Pauschalierung (12%):</strong></p>
                  <p>Gewinn = 50.000 - 6.000 = 44.000€ → SVS ca. 11.792€</p>
                  <p className="mt-2"><strong className="text-white">Mit tatsächlichen Ausgaben:</strong></p>
                  <p>Gewinn = 50.000 - 8.000 = 42.000€ → SVS ca. 11.256€</p>
                  <p className="mt-2 text-slate-400">Differenz: ca. 536€ mehr SVS bei Pauschalierung</p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
                <p className="text-blue-200">
                  <strong>Tipp:</strong> Beachten Sie, dass SVS-Beiträge bei der Pauschalierung
                  zusätzlich zum Pauschalbetrag abgezogen werden können. Das mildert den Effekt ab.
                </p>
              </div>
            </section>

            {/* Häufige Fehler */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Häufige Fehler bei der Pauschalierung
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">1. Falscher Pauschalsatz gewählt</h3>
                  <p className="text-slate-300">
                    Viele Selbstständige setzen automatisch 12% an, obwohl für ihre Tätigkeit nur 6% gelten.
                    Prüfen Sie genau, ob Ihre Tätigkeit unter die 6%-Regelung fällt (z.B. Beratung, Vorträge, wissenschaftliche Tätigkeit).
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">2. Umsatzgrenze übersehen</h3>
                  <p className="text-slate-300">
                    Bei Überschreitung der 220.000€-Grenze verlieren Sie rückwirkend das Recht auf
                    Basispauschalierung. Behalten Sie Ihre Umsatzentwicklung im Blick.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">3. Zusätzlich absetzbare Posten vergessen</h3>
                  <p className="text-slate-300">
                    SVS-Beiträge, Reisekosten und der Grundfreibetrag sind neben der Pauschale absetzbar.
                    Viele vergessen diese zusätzlichen Abzüge und zahlen zu viel Steuer.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">4. Keine jährliche Vergleichsrechnung</h3>
                  <p className="text-slate-300">
                    Prüfen Sie jedes Jahr, ob die Pauschalierung noch vorteilhaft ist. Ihre Kostenstruktur
                    kann sich ändern und plötzlich sind tatsächliche Ausgaben günstiger.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Häufig gestellte Fragen zur Pauschalierung
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Kann ich zwischen Pauschalierung und E/A-Rechnung wechseln?</h3>
                  <p className="text-slate-300">
                    Ja, ein Wechsel ist jährlich möglich. Sie entscheiden mit der Steuererklärung, ob Sie
                    für das betreffende Jahr die Pauschalierung oder tatsächliche Ausgaben ansetzen.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Brauche ich bei der Pauschalierung trotzdem Belege?</h3>
                  <p className="text-slate-300">
                    Bei der Basispauschalierung müssen Sie keine Ausgabenbelege aufbewahren (außer für SVS und Reisekosten).
                    Einnahmenbelege müssen aber 7 Jahre aufbewahrt werden.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Kann ich als Neuer Selbstständiger sofort pauschalieren?</h3>
                  <p className="text-slate-300">
                    Ja, die Pauschalierung kann ab dem ersten Jahr der Selbstständigkeit angewendet werden,
                    sofern die Voraussetzungen erfüllt sind.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Ist die Pauschalierung auch für Freiberufler möglich?</h3>
                  <p className="text-slate-300">
                    Ja, sowohl Gewerbetreibende als auch Freiberufler (z.B. Ärzte, Rechtsanwälte, IT-Berater)
                    können die Basispauschalierung nutzen. Freiberufler fallen allerdings oft unter den 6%-Satz.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Was passiert, wenn ich die Umsatzgrenze im Laufe des Jahres überschreite?</h3>
                  <p className="text-slate-300">
                    Bei Überschreitung der 220.000€-Grenze verlieren Sie das Recht auf Basispauschalierung
                    für das betreffende Jahr. Sie müssen dann rückwirkend auf tatsächliche Ausgaben umstellen.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Kann ich Basis- und Kleinunternehmerpauschalierung kombinieren?</h3>
                  <p className="text-slate-300">
                    Nein, Sie müssen sich für eine Pauschalierungsart entscheiden. Als Kleinunternehmer
                    können Sie aber wählen, ob die Kleinunternehmerpauschalierung oder die Basispauschalierung
                    günstiger ist.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-12 mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Berechnen Sie Ihre optimale Steuerbelastung
                </h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Unser kostenloser Steuerrechner zeigt Ihnen, ob sich die Pauschalierung für Sie lohnt
                  und wie viel Sie sparen können.
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  <Link href="/rechner">
                    Jetzt kostenlos berechnen
                  </Link>
                </Button>
              </div>
            </section>

            <ArticleFooter
              breadcrumbs={[
                { name: 'Home', href: '/' },
                { name: 'Steuerwissen', href: '/steuerwissen' },
                { name: 'Pauschalierung', href: '/steuerwissen/pauschalierung-oesterreich' },
              ]}
              sources={[
                { name: 'EStG § 17 — Pauschalierung', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS) — Einkommensteuergesetz' },
                { name: 'BMF — Pauschalierungsverordnungen', url: 'https://www.bmf.gv.at/themen/steuern/selbststaendige-unternehmer.html', description: 'Bundesministerium für Finanzen — Übersicht Pauschalierungen' },
                { name: 'WKO — Pauschalierung für Selbstständige', url: 'https://www.wko.at/steuern/pauschalierung', description: 'Wirtschaftskammer Österreich — Pauschalierungsarten' },
              ]}
              relatedArticles={[
                { title: 'Steueroptimierung für Selbstständige — Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
                { title: 'Kleinunternehmerregelung 2026 — Umsatzgrenze & Vorteile', href: '/steuerwissen/kleinunternehmerregelung' },
                { title: 'SVS-Beiträge senken — 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
              ]}
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}
