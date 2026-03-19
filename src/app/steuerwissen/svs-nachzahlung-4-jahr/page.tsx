import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function SvsNachzahlung4JahrPage() {
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
              <span className="text-slate-300">SVS-Nachzahlung im 4. Jahr</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Steuerschock im 4. Jahr — Was Neugründer über die SVS-Nachzahlung wissen müssen
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Viele österreichische Neugründer erleben im 3. oder 4. Geschäftsjahr einen bösen Steuerschock:
              Plötzlich flattert eine SVS-Nachzahlung von mehreren tausend Euro ins Haus — zusätzlich zu drastisch
              erhöhten laufenden Beiträgen. Diese Doppelbelastung bringt erfolgreiche Jungunternehmer oft in
              Liquiditätsprobleme. Warum das so ist und wie du dich davor schützt, erfährst du in diesem
              umfassenden Guide.
            </p>

            {/* Kurzantwort für AI Overviews */}
            <div className="bg-blue-900/30 border border-blue-700/50 p-5 rounded-lg mb-10">
              <p className="text-blue-200 font-medium leading-relaxed">
                <strong className="text-white">Kurzantwort:</strong> Neugründer zahlen anfangs SVS-Mindestbeiträge
                (~150€/Monat), da ihre Gewinne noch unbekannt sind. Steigen die Gewinne in den ersten Jahren, folgt
                im 3.-4. Jahr eine hohe Nachzahlung plus erhöhte laufende Beiträge. Dieser Doppelschlag überrascht
                viele. Vermeiden kannst du ihn durch: (1) Frühzeitige Beantragung höherer SVS-Beitragsgrundlagen,
                (2) Monatliche Rücklagen von 25-30% des Gewinns, (3) Strategische Nutzung des Gewinnfreibetrags.
              </p>
            </div>

            {/* Warum kommt die Nachzahlung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Warum trifft die SVS-Nachzahlung Neugründer besonders hart?
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Das österreichische SVS-System ist für etablierte Unternehmen mit stabilen Gewinnen konzipiert.
                Neugründer fallen durch das Raster, weil ihre Gewinnentwicklung unvorhersehbar ist. Nach § 25a GSVG
                berechnet die SVS vorläufige Beiträge auf Basis der letzten verfügbaren Einkommensteuerdaten —
                bei Neugründern ist das oft null oder sehr wenig.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Das Neugründer-Dilemma:</h3>
                <ul className="text-slate-300 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">⚠️</span>
                    <div>
                      <strong className="text-white">Keine Gewinnhistorie:</strong> Die SVS hat keine Vergleichsdaten
                      und setzt die Mindestbeitragsgrundlage an (2026: ~1.970€/Monat = ~150€ SVS/Monat).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">📈</span>
                    <div>
                      <strong className="text-white">Schnelles Gewinnwachstum:</strong> Erfolgreiche Neugründer
                      steigern ihre Gewinne oft von 0€ auf 30.000-60.000€ binnen zwei Jahren.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">⏰</span>
                    <div>
                      <strong className="text-white">Lange Verzögerung:</strong> Die Nachbemessung erfolgt erst
                      3-4 Jahre später, wenn die Steuerbescheide vorliegen und verarbeitet sind.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">💥</span>
                    <div>
                      <strong className="text-white">Doppelbelastung:</strong> Nachzahlung für Vergangenheit +
                      erhöhte laufende Beiträge für Zukunft treffen gleichzeitig ein.
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Während etablierte Unternehmen mit stabilen Gewinnen die SVS-Beiträge gut kalkulieren können,
                werden Neugründer vom System regelrecht überrumpelt. Die zeitliche Verzögerung zwischen
                Gewinnerzielung und SVS-Nachzahlung schafft eine Liquiditätslücke, die viele nicht eingeplant haben.
              </p>
            </section>

            {/* Timeline der SVS-Vorschreibung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Timeline: So entwickelt sich der SVS-Steuerschock
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Die folgende Timeline zeigt, warum die SVS-Nachzahlung für Neugründer zum perfekten Sturm wird:
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-green-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">Jahr 1-2: Schonzeit</h3>
                    <span className="text-green-400 text-sm font-medium">~150€/Monat SVS</span>
                  </div>
                  <p className="text-slate-300 mb-2">
                    <strong>SVS-Beiträge:</strong> Mindestbeitragsgrundlage (~1.970€/Monat)<br/>
                    <strong>Tatsächliche SVS-Belastung:</strong> ~150€/Monat (PV + KV + SV + UV)<br/>
                    <strong>Dein Gewinn:</strong> Steigt von 0€ auf 30.000-45.000€
                  </p>
                  <p className="text-slate-400 text-sm">
                    Du denkst: "SVS ist günstig, nur 150€/Monat. Das ist machbar."
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">Jahr 3: Der Bescheid kommt</h3>
                    <span className="text-yellow-400 text-sm font-medium">Erste Nachbemessung</span>
                  </div>
                  <p className="text-slate-300 mb-2">
                    <strong>Steuerbescheid Jahr 1:</strong> Finanzamt bestätigt deinen Gewinn<br/>
                    <strong>SVS-Nachberechnung:</strong> Nachzahlung für Jahr 1 wird berechnet<br/>
                    <strong>Erste Nachzahlung:</strong> 2.000-5.000€ (je nach Gewinn)
                  </p>
                  <p className="text-slate-400 text-sm">
                    Du denkst: "Okay, das tut weh, aber ist machbar. Wird nicht schlimmer."
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-orange-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">Jahr 4: Der Steuerschock</h3>
                    <span className="text-red-400 text-sm font-medium">Bis zu 2.000€/Monat SVS</span>
                  </div>
                  <p className="text-slate-300 mb-2">
                    <strong>Dreifach-Belastung:</strong><br/>
                    ① Nachzahlung für Jahr 2: 5.000-10.000€<br/>
                    ② Erhöhte laufende Beiträge: 800-1.200€/Monat<br/>
                    ③ Normale Betriebsausgaben laufen weiter
                  </p>
                  <p className="text-slate-400 text-sm">
                    Du denkst: "Das kann nicht legal sein! Ich kann nicht gleichzeitig 10.000€ nachzahlen
                    und 1.000€/Monat mehr zahlen!"
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">Jahr 5+: Normalisierung oder Krise</h3>
                    <span className="text-slate-300 text-sm font-medium">Hohe laufende Beiträge</span>
                  </div>
                  <p className="text-slate-300 mb-2">
                    <strong>Wenn alles gut läuft:</strong> Du hast dich an die hohen Beiträge gewöhnt<br/>
                    <strong>Wenn nicht:</strong> Liquiditätsprobleme, Ratenzahlungen, Stundungsanträge
                  </p>
                  <p className="text-slate-400 text-sm">
                    Viele Neugründer unterschätzen die langfristige SVS-Belastung von 25-30% des Gewinns.
                  </p>
                </div>
              </div>

              <div className="bg-red-900/30 border border-red-700/50 p-5 rounded-lg">
                <h3 className="font-semibold text-white mb-2">⚠️ Kritischer Punkt: Die Nachzahlung ist sofort fällig!</h3>
                <p className="text-red-200">
                  Während sich laufende Beiträge über Monate verteilen, ist die Nachzahlung meist binnen
                  2 Wochen fällig. Bei einer 8.000€ Nachzahlung plus 1.000€ höheren monatlichen Beiträgen
                  brauchst du im ersten Monat 9.000€ zusätzliche Liquidität!
                </p>
              </div>
            </section>

            {/* Berechnungsbeispiel */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Berechnungsbeispiel: Neugründer mit typischer Gewinnentwicklung
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Schauen wir uns einen typischen Fall an: Mario gründet 2023 eine IT-Beratung. Seine
                Gewinnentwicklung ist klassisch für erfolgreiche Neugründer:
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Marios Gewinnentwicklung:</h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between">
                    <span>2023 (Gründungsjahr):</span>
                    <strong className="text-white">15.000€ Gewinn</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>2024 (Etablierung):</span>
                    <strong className="text-white">45.000€ Gewinn</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>2025 (Wachstum):</span>
                    <strong className="text-white">65.000€ Gewinn</strong>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-slate-300 border border-slate-700 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="text-left p-3 text-white">Jahr</th>
                      <th className="text-left p-3 text-white">Gewinn</th>
                      <th className="text-left p-3 text-white">Vorläufige SVS</th>
                      <th className="text-left p-3 text-white">Endgültige SVS</th>
                      <th className="text-left p-3 text-white">Nachzahlung</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="bg-slate-900">
                      <td className="p-3 font-medium">2023</td>
                      <td className="p-3">15.000€</td>
                      <td className="p-3">1.800€ (150€/Monat)</td>
                      <td className="p-3">4.024€ (26,83% von 15.000€)</td>
                      <td className="p-3 font-semibold text-red-400">2.224€</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3 font-medium">2024</td>
                      <td className="p-3">45.000€</td>
                      <td className="p-3">1.800€ (150€/Monat)</td>
                      <td className="p-3">12.073€ (26,83% von 45.000€)</td>
                      <td className="p-3 font-semibold text-red-400">10.273€</td>
                    </tr>
                    <tr className="bg-slate-900">
                      <td className="p-3 font-medium">2025</td>
                      <td className="p-3">65.000€</td>
                      <td className="p-3">12.073€ (1.006€/Monat)*</td>
                      <td className="p-3">17.440€ (26,83% von 65.000€)</td>
                      <td className="p-3 font-semibold text-red-400">5.367€</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-sm mb-6">
                *2025 werden die laufenden Beiträge bereits auf Basis des 2024er Gewinns (45.000€) berechnet.
              </p>

              <div className="bg-yellow-900/20 border border-yellow-700/50 p-5 rounded-lg mb-6">
                <h3 className="font-semibold text-white mb-3">Marios Steuerschock-Timeline:</h3>
                <div className="space-y-2 text-slate-300">
                  <p><strong className="text-white">2025 (Jahr 3):</strong> Nachzahlung 2.224€ für 2023</p>
                  <p><strong className="text-white">2026 (Jahr 4):</strong> Nachzahlung 10.273€ für 2024 + laufende Beiträge steigen auf 1.006€/Monat</p>
                  <p><strong className="text-white">2027 (Jahr 5):</strong> Nachzahlung 5.367€ für 2025 + laufende Beiträge steigen auf 1.453€/Monat</p>
                </div>
              </div>

              <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg">
                <p className="text-red-200">
                  <strong>Marios größter Fehler:</strong> Er bildete keine Rücklagen. Im Jahr 2026 muss er
                  10.273€ nachzahlen und gleichzeitig seine monatlichen SVS-Beiträge von 150€ auf 1.006€ erhöhen.
                  Das sind 10.273€ + (1.006€ - 150€) × 12 = zusätzlich 20.545€ SVS-Belastung im Jahr 2026!
                </p>
              </div>
            </section>

            {/* Rücklagen-Strategie */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Die 30%-Rücklagen-Strategie für Neugründer
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Als Neugründer solltest du vom ersten Euro Gewinn an 30% für Steuern und SVS zurücklegen.
                Diese Faustregel berücksichtigt Einkommensteuer (~20-25%) plus SVS (~26,83%) minus
                Wechselwirkungen durch Betriebsausgabenabzug der SVS-Beiträge.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Empfohlene monatliche Rücklagen:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-2 text-white">Monatlicher Gewinn</th>
                        <th className="text-left py-2 text-white">SVS-Rücklage (26,83%)</th>
                        <th className="text-left py-2 text-white">Steuer-Rücklage (20%)</th>
                        <th className="text-left py-2 text-white">Gesamt-Rücklage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      <tr>
                        <td className="py-2">2.000€</td>
                        <td className="py-2">537€</td>
                        <td className="py-2">400€</td>
                        <td className="py-2 font-semibold text-green-400">937€</td>
                      </tr>
                      <tr>
                        <td className="py-2">3.000€</td>
                        <td className="py-2">805€</td>
                        <td className="py-2">600€</td>
                        <td className="py-2 font-semibold text-green-400">1.405€</td>
                      </tr>
                      <tr>
                        <td className="py-2">4.000€</td>
                        <td className="py-2">1.073€</td>
                        <td className="py-2">800€</td>
                        <td className="py-2 font-semibold text-green-400">1.873€</td>
                      </tr>
                      <tr>
                        <td className="py-2">5.000€</td>
                        <td className="py-2">1.342€</td>
                        <td className="py-2">1.000€</td>
                        <td className="py-2 font-semibold text-green-400">2.342€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
                <p className="text-blue-200">
                  <strong>Tipp:</strong> Richte einen automatischen Dauerauftrag ein, der 30% deines
                  durchschnittlichen monatlichen Gewinns auf ein separates Steuerkonto überweist. So
                  gerätst du nicht in Versuchung, das Geld anderweitig auszugeben.
                </p>
              </div>
            </section>

            {/* 5 Strategien zur Vermeidung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                5 Strategien um den Steuerschock zu vermeiden
              </h2>

              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    1. Sofortige Beantragung höherer SVS-Beitragsgrundlagen
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Sobald absehbar ist, dass dein Jahresgewinn über 20.000€ liegt, stelle einen Antrag
                    auf Erhöhung der vorläufigen Beitragsgrundlage nach § 25a Abs 3 GSVG. Lieber zu viel
                    zahlen und später eine Gutschrift bekommen, als die große Nachzahlung.
                  </p>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Praktisches Vorgehen:</h4>
                    <ul className="text-slate-300 space-y-1 text-sm">
                      <li>• <strong>Ab Monat 6:</strong> Gewinn hochrechnen (Halbjahresgewinn × 2)</li>
                      <li>• <strong>Bei über 20.000 € prognostiziert:</strong> SVS-Antrag stellen</li>
                      <li>• <strong>Konservativ schätzen:</strong> Lieber 10-20% unter der Prognose bleiben</li>
                      <li>• <strong>Jährlich anpassen:</strong> Bei weiterer Gewinnsteigerung nachkorrigieren</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    2. Aggressiver Gewinnfreibetrag-Einsatz
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Nutze den Grundfreibetrag von 15% (max. 4.950€) und vor allem den investitionsbedingten
                    Gewinnfreibetrag. Jeder Euro Gewinnfreibetrag spart dir 26,83 Cent SVS plus
                    Einkommensteuer.
                  </p>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Gewinnfreibetrag 2026:</h4>
                    <div className="text-slate-300 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Grundfreibetrag (15%):</span>
                        <strong>Max. 4.950€</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Investitionsbedingter GFB:</span>
                        <strong>Bis zu 45.350€</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Gesamt maximal:</span>
                        <strong>50.300€</strong>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">
                      Bei 50.000€ Gewinn und 20.000€ Gewinnfreibetrag: SVS-Ersparnis von 5.366€!
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    3. Strategische Investitionen in Jahr 2
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Plane größere Betriebsausgaben und Investitionen für das zweite Geschäftsjahr, wenn
                    die Gewinne stark steigen. Jeder Euro Betriebsausgabe senkt SVS und Einkommensteuer.
                  </p>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Sinnvolle Investitionen:</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• IT-Ausstattung (Computer, Software, Server)</li>
                      <li>• Büroausstattung und -möbel</li>
                      <li>• Fahrzeug für den Betrieb</li>
                      <li>• Marketing und Webauftritt</li>
                      <li>• Fortbildungen und Zertifizierungen</li>
                      <li>• Beratungskosten (Steuerberater, Anwalt)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    4. Monatliches Liquiditäts-Controlling
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Führe eine monatliche Liquiditätsplanung durch. Kalkuliere SVS-Rücklagen basierend
                    auf dem laufenden Jahresgewinn, nicht auf vergangenen Zahlen.
                  </p>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Monatliche Checkliste:</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Gewinn-Hochrechnung auf Jahresbasis</li>
                      <li>• SVS-Rücklage anpassen (26,83% der Gewinnsteigerung)</li>
                      <li>• Steuer-Rücklage anpassen (20-25% der Gewinnsteigerung)</li>
                      <li>• Bei über 20% Gewinnsprung: SVS-Anpassung prüfen</li>
                      <li>• Investitionsmöglichkeiten evaluieren</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    5. Professionelle Beratung ab 30.000€ Gewinn
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Ab 30.000€ Jahresgewinn zahlt sich ein Steuerberater aus. Die Kosten (2.000-4.000€/Jahr)
                    sind als Betriebsausgabe absetzbar und sparen oft ein Vielfaches an SVS und Steuern.
                    Ein guter Steuerberater erkennt das SVS-Problem frühzeitig und stellt rechtzeitig die
                    entsprechenden Anträge.
                  </p>
                </div>
              </div>
            </section>

            {/* Ratenzahlung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Wenn der Steuerschock bereits da ist: Ratenzahlung bei der SVS
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Falls dich die SVS-Nachzahlung bereits erreicht hat und du die Summe nicht auf einmal
                stemmen kannst, ist nicht alles verloren. Die SVS bietet Ratenzahlungsvereinbarungen an —
                und ist dabei oft kulanter als das Finanzamt.
              </p>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">SVS-Ratenzahlung beantragen:</h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">1.</span>
                    <div>
                      <strong className="text-white">Sofort reagieren:</strong> Warte nicht bis zur
                      Mahnung. Kontaktiere die SVS binnen einer Woche nach Erhalt des Nachzahlungsbescheids.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">2.</span>
                    <div>
                      <strong className="text-white">Telefonisch anfragen:</strong> 050 808 808 —
                      oft geht es telefonisch schneller als schriftlich.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">3.</span>
                    <div>
                      <strong className="text-white">Realistische Raten vorschlagen:</strong>
                      Rechne vor, was du monatlich zahlen kannst (inkl. der erhöhten laufenden Beiträge).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">4.</span>
                    <div>
                      <strong className="text-white">Anzahlung leisten:</strong> Zahle wenn möglich
                      10-20% der Nachzahlung sofort an. Das zeigt guten Willen.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                <p className="text-green-200">
                  <strong>Positiv:</strong> Die SVS gewährt meist Ratenzahlungen über 12-24 Monate ohne
                  große Bürokratie. Anders als bei anderen Behörden musst du nicht nachweisen, dass du
                  zahlungsunfähig bist — ein begründeter Antrag reicht oft.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Häufig gestellte Fragen zum Neugründer-Steuerschock
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">
                    Kann ich als Neugründer von Anfang an höhere SVS-Beiträge zahlen?
                  </h3>
                  <p className="text-slate-300">
                    Ja! Du kannst jederzeit einen Antrag auf Erhöhung der vorläufigen Beitragsgrundlage
                    stellen. Das ist sogar empfehlenswert, sobald dein Jahresgewinn über 20.000€ steigt.
                    Lieber monatlich mehr zahlen, als später eine große Nachzahlung zu stemmen.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">
                    Warum warnt mich niemand vor der SVS-Nachzahlung?
                  </h3>
                  <p className="text-slate-300">
                    Das österreichische System ist für etablierte Unternehmen mit stabilen Gewinnen
                    ausgelegt. Neugründer mit schnellem Gewinnwachstum sind ein Randfall, den viele
                    Berater nicht auf dem Radar haben. Deshalb ist Eigeninitiative so wichtig.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">
                    Wie viel sollte ich als Neugründer für SVS zurücklegen?
                  </h3>
                  <p className="text-slate-300">
                    Als Faustregel: 30% deines Gewinns für Steuern und SVS zusammen. Das sind etwa
                    26,83% für SVS plus 20-25% Einkommensteuer, minus Wechselwirkungen durch den
                    Betriebsausgabenabzug der SVS-Beiträge.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">
                    Kann die SVS-Nachzahlung mein Unternehmen in die Insolvenz treiben?
                  </h3>
                  <p className="text-slate-300">
                    Das ist möglich, wenn du völlig unvorbereitet bist. Eine 10.000€ Nachzahlung plus
                    1.000€ höhere monatliche Beiträge können bei knapper Liquidität kritisch werden.
                    Deshalb sind Rücklagen und frühzeitige Planung so wichtig.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-12 mb-8">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Berechne deine SVS-Belastung als Neugründer
                </h2>
                <p className="text-emerald-100 mb-6 leading-relaxed">
                  Nutze unseren kostenlosen SVS-Rechner und finde heraus, mit welcher Nachzahlung
                  du bei deinem Gewinnwachstum rechnen musst. Inkl. Tipps zur optimalen Rücklagenbildung.
                </p>
                <Button asChild className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  <Link href="/rechner">
                    Jetzt SVS berechnen
                  </Link>
                </Button>
              </div>
            </section>

            <ArticleFooter
              breadcrumbs={[
                { name: 'Home', href: '/' },
                { name: 'Steuerwissen', href: '/steuerwissen' },
                { name: 'SVS-Nachzahlung im 4. Jahr', href: '/steuerwissen/svs-nachzahlung-4-jahr' },
              ]}
              sources={[
                {
                  name: 'SVS — Sozialversicherung der Selbständigen',
                  url: 'https://www.svs.at/cdscontent/?contentid=10007.816984',
                  description: 'Offizielle SVS-Informationen zu Beitragsgrundlagen und Mindestbeiträgen für Neugründer'
                },
                {
                  name: 'GSVG § 25a — Vorläufige Beitragsgrundlage',
                  url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10008442',
                  description: 'Rechtsinformationssystem des Bundes — Gesetzliche Grundlagen der SVS-Beitragsberechnung'
                },
                {
                  name: 'WKO — Neugründer-Service',
                  url: 'https://www.wko.at/service/gruendung/sozialversicherung-selbststaendige.html',
                  description: 'Wirtschaftskammer Österreich — SVS-Informationen für Neugründer'
                },
                {
                  name: 'BMF — Gewinnfreibetrag',
                  url: 'https://www.bmf.gv.at/themen/steuern/selbststaendige-unternehmer/gewinnfreibetrag.html',
                  description: 'Bundesministerium für Finanzen — Gewinnfreibetrag als Steueroptimierung'
                },
              ]}
              relatedArticles={[
                { title: 'SVS-Nachzahlung vermeiden — 7 Strategien', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
                { title: 'SVS-Beiträge senken — Legale Methoden', href: '/steuerwissen/svs-beitraege-senken' },
                { title: 'Gewinnfreibetrag optimal nutzen — Bis zu 4.950€ sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
                { title: 'Steueroptimierung für Selbständige — Kompletter Guide', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              ]}
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}