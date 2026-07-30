import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function SvsNachzahlung4JahrPage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-sb-bg">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-sb-mut">
              <Link href="/" className="hover:text-sb-mut transition-colors">Home</Link>
              <span>›</span>
              <Link href="/steuerwissen" className="hover:text-sb-mut transition-colors">Steuerwissen</Link>
              <span>›</span>
              <span className="text-sb-mut">SVS-Nachzahlung im 4. Jahr</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-sb-text mb-6 leading-tight">
              Steuerschock im 4. Jahr — Was Neugründer über die SVS-Nachzahlung wissen müssen
            </h1>

            <p className="text-lg text-sb-mut mb-8 leading-relaxed">
              Viele österreichische Neugründer erleben im 3. oder 4. Geschäftsjahr einen bösen Steuerschock:
              Plötzlich flattert eine SVS-Nachzahlung von mehreren tausend Euro ins Haus — zusätzlich zu drastisch
              erhöhten laufenden Beiträgen. Diese Doppelbelastung bringt erfolgreiche Jungunternehmer oft in
              Liquiditätsprobleme. Warum das so ist und wie du dich davor schützt, erfährst du in diesem
              umfassenden Guide.
            </p>

            {/* Kurzantwort für AI Overviews */}
            <div className="bg-sb-accent-soft border border-sb-accent/30 p-5 rounded-lg mb-10">
              <p className="text-sb-mut font-medium leading-relaxed">
                <strong className="text-sb-text">Kurzantwort:</strong> Neugründer zahlen anfangs SVS-Mindestbeiträge
                (2026: 160,81€/Monat), da ihre Gewinne noch unbekannt sind. Steigen die Gewinne in den ersten Jahren, folgt
                ab dem 3.-4. Jahr eine hohe Nachzahlung plus erhöhte laufende Beiträge. Dieser Doppelschlag überrascht
                viele. Vermeiden kannst du ihn durch: (1) Frühzeitige Beantragung höherer SVS-Beitragsgrundlagen,
                (2) Monatliche Rücklagen von 25-30% des Gewinns, (3) Strategische Nutzung des Gewinnfreibetrags.
              </p>
            </div>

            {/* Warum kommt die Nachzahlung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Warum trifft die SVS-Nachzahlung Neugründer besonders hart?
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Das österreichische SVS-System ist für etablierte Unternehmen mit stabilen Gewinnen konzipiert.
                Neugründer fallen durch das Raster, weil ihre Gewinnentwicklung unvorhersehbar ist. Nach § 25a GSVG
                berechnet die SVS vorläufige Beiträge auf Basis des drittvorangegangenen Kalenderjahres.
                Bei Neugründern gibt es dafür noch keinen Steuerbescheid, also gilt die Mindestbeitragsgrundlage.
              </p>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Das Neugründer-Dilemma:</h3>
                <ul className="text-sb-mut space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-sb-red mt-1">⚠️</span>
                    <div>
                      <strong className="text-sb-text">Keine Gewinnhistorie:</strong> Die SVS hat keine Vergleichsdaten
                      und setzt die Mindestbeitragsgrundlage an (2026: 551,10€/Monat = 160,81€ SVS/Monat).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sb-accent mt-1">📈</span>
                    <div>
                      <strong className="text-sb-text">Schnelles Gewinnwachstum:</strong> Erfolgreiche Neugründer
                      steigern ihre Gewinne oft von 0€ auf 30.000-60.000€ binnen zwei Jahren.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sb-accent mt-1">⏰</span>
                    <div>
                      <strong className="text-sb-text">Lange Verzögerung:</strong> Die Nachbemessung erfolgt erst
                      3-4 Jahre später, wenn die Steuerbescheide vorliegen und verarbeitet sind.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sb-red mt-1">💥</span>
                    <div>
                      <strong className="text-sb-text">Doppelbelastung:</strong> Nachzahlung für Vergangenheit +
                      erhöhte laufende Beiträge für Zukunft treffen gleichzeitig ein.
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-sb-mut leading-relaxed">
                Während etablierte Unternehmen mit stabilen Gewinnen die SVS-Beiträge gut kalkulieren können,
                werden Neugründer vom System regelrecht überrumpelt. Die zeitliche Verzögerung zwischen
                Gewinnerzielung und SVS-Nachzahlung schafft eine Liquiditätslücke, die viele nicht eingeplant haben.
              </p>
            </section>

            {/* Timeline der SVS-Vorschreibung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Timeline: So entwickelt sich der SVS-Steuerschock
              </h2>

              <p className="text-sb-mut mb-6 leading-relaxed">
                Die folgende Timeline zeigt, warum die SVS-Nachzahlung für Neugründer zum perfekten Sturm wird:
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-sb-card p-5 rounded-lg border-l-4 border-sb-green/40">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sb-text">Jahr 1-2: Schonzeit</h3>
                    <span className="text-sb-green text-sm font-medium">~160€/Monat SVS</span>
                  </div>
                  <p className="text-sb-mut mb-2">
                    <strong>SVS-Beiträge:</strong> Mindestbeitragsgrundlage (551,10€/Monat, Wert 2026)<br/>
                    <strong>Tatsächliche SVS-Belastung:</strong> ~160€/Monat (PV + KV + SV + UV)<br/>
                    <strong>Dein Gewinn:</strong> Steigt von 0€ auf 30.000-45.000€
                  </p>
                  <p className="text-sb-mut text-sm">
                    Du denkst: "SVS ist günstig, nur 160€/Monat. Das ist machbar."
                  </p>
                </div>

                <div className="bg-sb-card p-5 rounded-lg border-l-4 border-sb-accent/40">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sb-text">Jahr 3: Der Bescheid kommt</h3>
                    <span className="text-sb-accent text-sm font-medium">Erste Nachbemessung</span>
                  </div>
                  <p className="text-sb-mut mb-2">
                    <strong>Steuerbescheid Jahr 1:</strong> Finanzamt bestätigt deinen Gewinn<br/>
                    <strong>SVS-Nachberechnung:</strong> Nachbemessen wird nur die Pensionsversicherung, die KV der ersten beiden Kalenderjahre bleibt fix<br/>
                    <strong>Erste Nachzahlung:</strong> 2.000-5.000€ (je nach Gewinn), verteilt auf vier Quartalsraten
                  </p>
                  <p className="text-sb-mut text-sm">
                    Du denkst: "Okay, das tut weh, aber ist machbar. Wird nicht schlimmer."
                  </p>
                </div>

                <div className="bg-sb-card p-5 rounded-lg border-l-4 border-sb-accent">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sb-text">Jahr 4: Der Steuerschock</h3>
                    <span className="text-sb-red text-sm font-medium">Bis zu 2.000€/Monat SVS</span>
                  </div>
                  <p className="text-sb-mut mb-2">
                    <strong>Dreifach-Belastung:</strong><br/>
                    ① Nachzahlung für Jahr 2: 5.000-10.000€, in vier Quartalsraten<br/>
                    ② Laufende Beiträge steigen (vorläufige Grundlage ist jetzt der Gewinn von Jahr 1)<br/>
                    ③ Normale Betriebsausgaben laufen weiter
                  </p>
                  <p className="text-sb-mut text-sm">
                    Du denkst: "Das kann nicht legal sein! Ich kann nicht gleichzeitig 10.000€ nachzahlen
                    und 1.000€/Monat mehr zahlen!"
                  </p>
                </div>

                <div className="bg-sb-card p-5 rounded-lg border-l-4 border-sb-red/40">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sb-text">Jahr 5+: Normalisierung oder Krise</h3>
                    <span className="text-sb-mut text-sm font-medium">Hohe laufende Beiträge</span>
                  </div>
                  <p className="text-sb-mut mb-2">
                    <strong>Wenn alles gut läuft:</strong> Du hast dich an die hohen Beiträge gewöhnt<br/>
                    <strong>Wenn nicht:</strong> Liquiditätsprobleme, Ratenzahlungen, Stundungsanträge
                  </p>
                  <p className="text-sb-mut text-sm">
                    Viele Neugründer unterschätzen die langfristige SVS-Belastung von 25-30% des Gewinns.
                  </p>
                </div>
              </div>

              <div className="bg-sb-red/10 border border-sb-red/30 p-5 rounded-lg">
                <h3 className="font-semibold text-sb-text mb-2">⚠️ Kritischer Punkt: Nachzahlung und höhere laufende Beiträge treffen zusammen</h3>
                <p className="text-sb-mut">
                  Die SVS verteilt Nachbelastungen auf die vier Quartale des Folgejahres (aus den ersten drei
                  Jahren auf Antrag auf bis zu zwölf Quartale). Trotzdem laufen Nachzahlungsraten und erhöhte
                  laufende Beiträge parallel: Bei 8.000€ Nachzahlung plus 1.000€ höheren Monatsbeiträgen sind
                  das rund 20.000€ SVS-Belastung in einem Jahr.
                </p>
              </div>
            </section>

            {/* Berechnungsbeispiel */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Berechnungsbeispiel: Neugründer mit typischer Gewinnentwicklung
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Schauen wir uns einen typischen Fall an: Mario gründet 2023 eine IT-Beratung. Seine
                Gewinnentwicklung ist klassisch für erfolgreiche Neugründer:
              </p>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Marios Gewinnentwicklung:</h3>
                <div className="space-y-2 text-sb-mut">
                  <div className="flex justify-between">
                    <span>2023 (Gründungsjahr):</span>
                    <strong className="text-sb-text">15.000€ Gewinn</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>2024 (Etablierung):</span>
                    <strong className="text-sb-text">45.000€ Gewinn</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>2025 (Wachstum):</span>
                    <strong className="text-sb-text">65.000€ Gewinn</strong>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-sb-mut border border-sb-line rounded-lg overflow-hidden">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="text-left p-3 text-sb-text">Jahr</th>
                      <th className="text-left p-3 text-sb-text">Gewinn</th>
                      <th className="text-left p-3 text-sb-text">Vorläufige SVS</th>
                      <th className="text-left p-3 text-sb-text">Endgültige SVS</th>
                      <th className="text-left p-3 text-sb-text">Nachzahlung</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sb-line">
                    <tr className="bg-sb-card">
                      <td className="p-3 font-medium">2023</td>
                      <td className="p-3">15.000€</td>
                      <td className="p-3">~1.750€ (Mindestbeiträge)</td>
                      <td className="p-3">Nur PV nachbemessen: 18,5% von 15.000€ = 2.775€ (KV bleibt fix)</td>
                      <td className="p-3 font-semibold text-sb-red">~1.700€</td>
                    </tr>
                    <tr className="bg-sb-deep">
                      <td className="p-3 font-medium">2024</td>
                      <td className="p-3">45.000€</td>
                      <td className="p-3">~1.800€ (Mindestbeiträge)</td>
                      <td className="p-3">Nur PV nachbemessen: 18,5% von 45.000€ = 8.325€ (KV bleibt fix)</td>
                      <td className="p-3 font-semibold text-sb-red">~7.200€</td>
                    </tr>
                    <tr className="bg-sb-card">
                      <td className="p-3 font-medium">2025</td>
                      <td className="p-3">65.000€</td>
                      <td className="p-3">~1.920€ (weiter Mindestbeiträge)*</td>
                      <td className="p-3">Volle Nachbemessung: 26,83% von 65.000€ = 17.440€</td>
                      <td className="p-3 font-semibold text-sb-red">~15.500€</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sb-mut text-sm mb-6">
                *Auch 2025 gelten noch Mindestbeiträge: Die vorläufige Grundlage ist das drittvorangegangene Jahr (2022),
                dafür gibt es keinen Bescheid. Ab dem 3. Kalenderjahr wird auch die KV nachbemessen. Beträge vereinfacht
                gerundet, ohne Hinzurechnung der SV-Beiträge zur Beitragsgrundlage (§ 25 Abs 2 GSVG).
              </p>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-5 rounded-lg mb-6">
                <h3 className="font-semibold text-sb-text mb-3">Marios Steuerschock-Timeline:</h3>
                <div className="space-y-2 text-sb-mut">
                  <p><strong className="text-sb-text">2025 (Jahr 3):</strong> Nachzahlung ~1.700€ für 2023, in vier Quartalsraten</p>
                  <p><strong className="text-sb-text">2026 (Jahr 4):</strong> Nachzahlung ~7.200€ für 2024 + laufende Beiträge steigen erstmals (Basis Gewinn 2023: ~350€/Monat)</p>
                  <p><strong className="text-sb-text">2027 (Jahr 5):</strong> Nachzahlung ~15.500€ für 2025 + laufende Beiträge steigen auf ~1.020€/Monat (Basis Gewinn 2024)</p>
                </div>
              </div>

              <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Marios größter Fehler:</strong> Er bildete keine Rücklagen. Im Jahr 2027 treffen die
                  Nachzahlung für 2025 (~15.500€) und laufende Beiträge von ~1.020€/Monat zusammen:
                  rund 27.700€ SVS-Belastung in einem einzigen Jahr.
                </p>
              </div>
            </section>

            {/* Rücklagen-Strategie */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Die 30%-Rücklagen-Strategie für Neugründer
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Als Neugründer solltest du vom ersten Euro Gewinn an 30% für Steuern und SVS zurücklegen.
                Diese Faustregel berücksichtigt Einkommensteuer (~20-25%) plus SVS (~26,83%) minus
                Wechselwirkungen durch Betriebsausgabenabzug der SVS-Beiträge.
              </p>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Empfohlene monatliche Rücklagen:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-sb-mut">
                    <thead>
                      <tr className="border-b border-sb-line">
                        <th className="text-left py-2 text-sb-text">Monatlicher Gewinn</th>
                        <th className="text-left py-2 text-sb-text">SVS-Rücklage (26,83%)</th>
                        <th className="text-left py-2 text-sb-text">Steuer-Rücklage (20%)</th>
                        <th className="text-left py-2 text-sb-text">Gesamt-Rücklage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sb-line">
                      <tr>
                        <td className="py-2">2.000€</td>
                        <td className="py-2">537€</td>
                        <td className="py-2">400€</td>
                        <td className="py-2 font-semibold text-sb-green">937€</td>
                      </tr>
                      <tr>
                        <td className="py-2">3.000€</td>
                        <td className="py-2">805€</td>
                        <td className="py-2">600€</td>
                        <td className="py-2 font-semibold text-sb-green">1.405€</td>
                      </tr>
                      <tr>
                        <td className="py-2">4.000€</td>
                        <td className="py-2">1.073€</td>
                        <td className="py-2">800€</td>
                        <td className="py-2 font-semibold text-sb-green">1.873€</td>
                      </tr>
                      <tr>
                        <td className="py-2">5.000€</td>
                        <td className="py-2">1.342€</td>
                        <td className="py-2">1.000€</td>
                        <td className="py-2 font-semibold text-sb-green">2.342€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Tipp:</strong> Richte einen automatischen Dauerauftrag ein, der 30% deines
                  durchschnittlichen monatlichen Gewinns auf ein separates Steuerkonto überweist. So
                  gerätst du nicht in Versuchung, das Geld anderweitig auszugeben.
                </p>
              </div>
            </section>

            {/* 5 Strategien zur Vermeidung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-6">
                5 Strategien um den Steuerschock zu vermeiden
              </h2>

              <div className="space-y-6">
                <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                  <h3 className="text-xl font-semibold text-sb-text mb-3">
                    1. Sofortige Beantragung höherer SVS-Beitragsgrundlagen
                  </h3>
                  <p className="text-sb-mut mb-3 leading-relaxed">
                    Sobald absehbar ist, dass dein Jahresgewinn über 20.000€ liegt, stelle einen Antrag
                    auf Erhöhung der vorläufigen Beitragsgrundlage nach § 25a Abs 5 GSVG. Lieber zu viel
                    zahlen und später eine Gutschrift bekommen, als die große Nachzahlung.
                  </p>
                  <div className="bg-white/[0.05] p-4 rounded-lg">
                    <h4 className="font-semibold text-sb-text mb-2">Praktisches Vorgehen:</h4>
                    <ul className="text-sb-mut space-y-1 text-sm">
                      <li>• <strong>Ab Monat 6:</strong> Gewinn hochrechnen (Halbjahresgewinn × 2)</li>
                      <li>• <strong>Bei über 20.000 € prognostiziert:</strong> SVS-Antrag stellen</li>
                      <li>• <strong>Konservativ schätzen:</strong> Lieber 10-20% unter der Prognose bleiben</li>
                      <li>• <strong>Jährlich anpassen:</strong> Bei weiterer Gewinnsteigerung nachkorrigieren</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                  <h3 className="text-xl font-semibold text-sb-text mb-3">
                    2. Aggressiver Gewinnfreibetrag-Einsatz
                  </h3>
                  <p className="text-sb-mut mb-3 leading-relaxed">
                    Nutze den Grundfreibetrag von 15% (max. 4.950€) und vor allem den investitionsbedingten
                    Gewinnfreibetrag. Jeder Euro Gewinnfreibetrag spart dir 26,83 Cent SVS plus
                    Einkommensteuer.
                  </p>
                  <div className="bg-white/[0.05] p-4 rounded-lg">
                    <h4 className="font-semibold text-sb-text mb-2">Gewinnfreibetrag 2026:</h4>
                    <div className="text-sb-mut text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Grundfreibetrag (15%):</span>
                        <strong>Max. 4.950€</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Investitionsbedingter GFB:</span>
                        <strong>Bis zu 41.450€</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Gesamt maximal:</span>
                        <strong>46.400€</strong>
                      </div>
                    </div>
                    <p className="text-sb-mut text-sm mt-2">
                      Bei 50.000€ Gewinn sind bis zu 7.160€ Gewinnfreibetrag möglich (4.950€ Grundfreibetrag
                      + 13% der nächsten 17.000€): SVS-Ersparnis ~1.921€.
                    </p>
                  </div>
                </div>

                <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                  <h3 className="text-xl font-semibold text-sb-text mb-3">
                    3. Strategische Investitionen in Jahr 2
                  </h3>
                  <p className="text-sb-mut mb-3 leading-relaxed">
                    Plane größere Betriebsausgaben und Investitionen für das zweite Geschäftsjahr, wenn
                    die Gewinne stark steigen. Jeder Euro Betriebsausgabe senkt SVS und Einkommensteuer.
                  </p>
                  <div className="bg-white/[0.05] p-4 rounded-lg">
                    <h4 className="font-semibold text-sb-text mb-2">Sinnvolle Investitionen:</h4>
                    <ul className="text-sb-mut text-sm space-y-1">
                      <li>• IT-Ausstattung (Computer, Software, Server)</li>
                      <li>• Büroausstattung und -möbel</li>
                      <li>• Fahrzeug für den Betrieb</li>
                      <li>• Marketing und Webauftritt</li>
                      <li>• Fortbildungen und Zertifizierungen</li>
                      <li>• Beratungskosten (Steuerberater, Anwalt)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                  <h3 className="text-xl font-semibold text-sb-text mb-3">
                    4. Monatliches Liquiditäts-Controlling
                  </h3>
                  <p className="text-sb-mut mb-3 leading-relaxed">
                    Führe eine monatliche Liquiditätsplanung durch. Kalkuliere SVS-Rücklagen basierend
                    auf dem laufenden Jahresgewinn, nicht auf vergangenen Zahlen.
                  </p>
                  <div className="bg-white/[0.05] p-4 rounded-lg">
                    <h4 className="font-semibold text-sb-text mb-2">Monatliche Checkliste:</h4>
                    <ul className="text-sb-mut text-sm space-y-1">
                      <li>• Gewinn-Hochrechnung auf Jahresbasis</li>
                      <li>• SVS-Rücklage anpassen (26,83% der Gewinnsteigerung)</li>
                      <li>• Steuer-Rücklage anpassen (20-25% der Gewinnsteigerung)</li>
                      <li>• Bei über 20% Gewinnsprung: SVS-Anpassung prüfen</li>
                      <li>• Investitionsmöglichkeiten evaluieren</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                  <h3 className="text-xl font-semibold text-sb-text mb-3">
                    5. Professionelle Beratung ab 30.000€ Gewinn
                  </h3>
                  <p className="text-sb-mut leading-relaxed">
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
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Wenn der Steuerschock bereits da ist: Ratenzahlung bei der SVS
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Falls dich die SVS-Nachzahlung bereits erreicht hat und du die Summe nicht auf einmal
                stemmen kannst, ist nicht alles verloren. Die SVS bietet Ratenzahlungsvereinbarungen an —
                und ist dabei oft kulanter als das Finanzamt.
              </p>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">SVS-Ratenzahlung beantragen:</h3>
                <div className="space-y-3 text-sb-mut">
                  <div className="flex items-start gap-3">
                    <span className="text-sb-accent mt-1">1.</span>
                    <div>
                      <strong className="text-sb-text">Sofort reagieren:</strong> Warte nicht bis zur
                      Mahnung. Kontaktiere die SVS binnen einer Woche nach Erhalt des Nachzahlungsbescheids.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-sb-accent mt-1">2.</span>
                    <div>
                      <strong className="text-sb-text">Telefonisch anfragen:</strong> 050 808 808 —
                      oft geht es telefonisch schneller als schriftlich.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-sb-accent mt-1">3.</span>
                    <div>
                      <strong className="text-sb-text">Realistische Raten vorschlagen:</strong>
                      Rechne vor, was du monatlich zahlen kannst (inkl. der erhöhten laufenden Beiträge).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-sb-accent mt-1">4.</span>
                    <div>
                      <strong className="text-sb-text">Anzahlung leisten:</strong> Zahle wenn möglich
                      10-20% der Nachzahlung sofort an. Das zeigt guten Willen.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-sb-green-soft border border-sb-green/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Positiv:</strong> Nachbelastungen verteilt die SVS von sich aus auf die vier Quartale
                  des Folgejahres. Für Nachbelastungen aus den ersten drei Jahren der Selbständigkeit kannst du
                  per Antrag eine Aufteilung auf bis zu zwölf Quartale bekommen.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-6">
                Häufig gestellte Fragen zum Neugründer-Steuerschock
              </h2>
              <div className="space-y-4">
                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">
                    Kann ich als Neugründer von Anfang an höhere SVS-Beiträge zahlen?
                  </h3>
                  <p className="text-sb-mut">
                    Ja! Du kannst jederzeit einen Antrag auf Erhöhung der vorläufigen Beitragsgrundlage
                    stellen. Das ist sogar empfehlenswert, sobald dein Jahresgewinn über 20.000€ steigt.
                    Lieber monatlich mehr zahlen, als später eine große Nachzahlung zu stemmen.
                  </p>
                </div>

                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">
                    Warum warnt mich niemand vor der SVS-Nachzahlung?
                  </h3>
                  <p className="text-sb-mut">
                    Das österreichische System ist für etablierte Unternehmen mit stabilen Gewinnen
                    ausgelegt. Neugründer mit schnellem Gewinnwachstum sind ein Randfall, den viele
                    Berater nicht auf dem Radar haben. Deshalb ist Eigeninitiative so wichtig.
                  </p>
                </div>

                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">
                    Wie viel sollte ich als Neugründer für SVS zurücklegen?
                  </h3>
                  <p className="text-sb-mut">
                    Als Faustregel: 30% deines Gewinns für Steuern und SVS zusammen. Das sind etwa
                    26,83% für SVS plus 20-25% Einkommensteuer, minus Wechselwirkungen durch den
                    Betriebsausgabenabzug der SVS-Beiträge.
                  </p>
                </div>

                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">
                    Kann die SVS-Nachzahlung mein Unternehmen in die Insolvenz treiben?
                  </h3>
                  <p className="text-sb-mut">
                    Das ist möglich, wenn du völlig unvorbereitet bist. Eine 10.000€ Nachzahlung plus
                    1.000€ höhere monatliche Beiträge können bei knapper Liquidität kritisch werden.
                    Deshalb sind Rücklagen und frühzeitige Planung so wichtig.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-12 mb-8">
              <div className="bg-sb-green-soft border border-sb-green/30 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-sb-text mb-4">
                  Berechne deine SVS-Belastung als Neugründer
                </h2>
                <p className="text-sb-mut mb-6 leading-relaxed">
                  Nutze unseren kostenlosen SVS-Rechner und finde heraus, mit welcher Nachzahlung
                  du bei deinem Gewinnwachstum rechnen musst. Inkl. Tipps zur optimalen Rücklagenbildung.
                </p>
                <Button asChild className="bg-sb-accent text-sb-accent-ink hover:bg-sb-accent-deep font-semibold px-8 py-3">
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
                  name: 'SVS — Endgültige Berechnung in den ersten drei Jahren',
                  url: 'https://www.svs.at/cdscontent/?contentid=10007.816635&portal=svsportal',
                  description: 'Offizielle SVS-Informationen zu Nachbemessung und KV-Fixierung für Neugründer'
                },
                {
                  name: 'GSVG § 25a — Vorläufige Beitragsgrundlage',
                  url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10008442',
                  description: 'Rechtsinformationssystem des Bundes — Gesetzliche Grundlagen der SVS-Beitragsberechnung'
                },
                {
                  name: 'WKO — Gewerbliche Sozialversicherungsbeiträge (Werte 2026)',
                  url: 'https://www.wko.at/sozialversicherung/gewerbliche-sozialversicherungsbeitraege-ausmass',
                  description: 'Wirtschaftskammer Österreich — Beitragssätze und Beitragsgrundlagen'
                },
                {
                  name: 'WKO — Der Gewinnfreibetrag',
                  url: 'https://www.wko.at/steuern/der-gewinnfreibetrag',
                  description: 'Wirtschaftskammer Österreich — Gewinnfreibetrag als Steueroptimierung'
                },
              ]}
              relatedArticles={[
                { title: 'SVS-Nachzahlung vermeiden: 7 Strategien', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
                { title: 'SVS-Beiträge senken: Legale Methoden', href: '/steuerwissen/svs-beitraege-senken' },
                { title: 'Gewinnfreibetrag optimal nutzen: Bis zu 4.950€ sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
                { title: 'Steueroptimierung für Selbständige: Kompletter Guide', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              ]}
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}