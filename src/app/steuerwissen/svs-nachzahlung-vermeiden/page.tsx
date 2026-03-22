import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function SvsNachzahlungVermeidenPage() {
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
              <span className="text-slate-300">SVS-Nachzahlung vermeiden</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              SVS-Nachzahlung vermeiden — So schützt du dich vor der Nachzahlungsfalle
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Eine hohe SVS-Nachzahlung kann Selbstständige in Österreich finanziell schwer treffen.
              Oft kommen mehrere tausend Euro Nachzahlung völlig überraschend drei Jahre nach dem Beitragsjahr.
              Mit den richtigen Strategien lässt sich diese Nachzahlungsfalle jedoch vermeiden. Dieser
              umfassende Guide erklärt das System, zeigt konkrete Berechnungen und gibt dir 7 Strategien
              an die Hand.
            </p>

            {/* Kurzantwort für AI Overviews */}
            <div className="bg-blue-900/30 border border-blue-700/50 p-5 rounded-lg mb-10">
              <p className="text-blue-200 font-medium leading-relaxed">
                <strong className="text-white">Kurzantwort:</strong> Die SVS-Nachzahlung entsteht, weil
                vorläufige Beiträge auf Basis einer Schätzung gezahlt werden. Steigt dein Gewinn, folgt
                3 Jahre später eine Nachzahlung. Du vermeidest sie durch: (1) Antrag auf Erhöhung der
                vorläufigen Beitragsgrundlage bei der SVS, (2) monatliche Rücklagen von 15-20% des
                Mehrgewinns, (3) optimale Nutzung von Gewinnfreibetrag und Betriebsausgaben.
              </p>
            </div>

            {/* Was ist die SVS-Nachzahlung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Was ist die SVS-Nachzahlung?
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Die SVS-Nachzahlung entsteht durch das System der vorläufigen und endgültigen
                Sozialversicherungsbeiträge nach § 25a GSVG (Gewerbliches Sozialversicherungsgesetz).
                Zunächst zahlst du vorläufige Beiträge basierend auf einer geschätzten Beitragsgrundlage.
                Diese Schätzung basiert auf dem letzten verfügbaren Einkommensteuerbescheid — also
                oft auf einem Gewinn, der 2-3 Jahre zurückliegt.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-4">
                <h3 className="text-lg font-semibold text-white mb-3">SVS-Beitragssätze 2026:</h3>
                <ul className="text-slate-300 space-y-2">
                  <li className="flex justify-between">
                    <span>Pensionsversicherung (PV):</span>
                    <strong className="text-white">18,50%</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Krankenversicherung (KV):</span>
                    <strong className="text-white">6,80%</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Selbständigenvorsorge:</span>
                    <strong className="text-white">1,53%</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Unfallversicherung:</span>
                    <strong className="text-white">~11,35€/Monat (pauschal)</strong>
                  </li>
                  <li className="flex justify-between border-t border-slate-700 pt-2 mt-2">
                    <span className="font-medium">Gesamtbelastung (ohne UV):</span>
                    <strong className="text-white">26,83%</strong>
                  </li>
                </ul>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Die endgültige Abrechnung erfolgt erst, wenn dein Einkommensteuerbescheid vorliegt
                und die SVS die tatsächliche Beitragsgrundlage kennt. Die Differenz zwischen
                vorläufigen und endgültigen Beiträgen ergibt die Nachzahlung.
              </p>
            </section>

            {/* Warum entsteht die Nachzahlung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Warum entsteht die Nachzahlung? — Die 3-Jahres-Verzögerung
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Das Problem liegt in der zeitlichen Verzögerung des österreichischen Systems.
                Der Prozess erstreckt sich über bis zu 3 Jahre:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-slate-300">
                    <strong className="text-white">Jahr 1 (Beitragsjahr):</strong> Du zahlst vorläufige
                    SVS-Beiträge basierend auf einer Schätzung (oft der Gewinn von vor 2-3 Jahren).
                    Dein tatsächlicher Gewinn steigt, aber die SVS weiß das noch nicht.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-slate-300">
                    <strong className="text-white">Jahr 2 (Steuererklärung):</strong> Du gibst deine
                    Steuererklärung für Jahr 1 ab. Das Finanzamt erstellt den Einkommensteuerbescheid.
                    Der tatsächliche Gewinn wird bekannt.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="text-slate-300">
                    <strong className="text-white">Jahr 2-3 (Datenweitergabe):</strong> Das Finanzamt
                    übermittelt den Bescheid an die SVS. Die SVS berechnet die endgültigen Beiträge
                    und erstellt den Nachzahlungsbescheid.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-slate-300">
                    <strong className="text-white">Jahr 3 (Nachzahlung):</strong> Die SVS fordert die
                    Nachzahlung ein — oft als Einmalbetrag. Gleichzeitig steigen die vorläufigen
                    Beiträge für die Zukunft (basierend auf dem jetzt bekannten höheren Gewinn).
                  </p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg">
                <p className="text-yellow-200">
                  <strong>Doppeleffekt:</strong> In Jahr 3 musst du gleichzeitig die Nachzahlung
                  für Jahr 1 UND höhere laufende Beiträge für das aktuelle Jahr zahlen. Diese
                  doppelte Belastung treibt viele Selbstständige in Liquiditätsprobleme.
                </p>
              </div>
            </section>

            {/* Wie hoch kann die Nachzahlung sein? */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Wie hoch kann die SVS-Nachzahlung sein?
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Die Höhe der Nachzahlung hängt von der Differenz zwischen geschätzter und
                tatsächlicher Beitragsgrundlage ab. Hier konkrete Berechnungen für typische
                Gewinnsprünge:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-slate-300 border border-slate-700 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="text-left p-3 text-white">Geschätzt</th>
                      <th className="text-left p-3 text-white">Tatsächlich</th>
                      <th className="text-left p-3 text-white">Differenz</th>
                      <th className="text-left p-3 text-white">Nachzahlung*</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="bg-slate-900">
                      <td className="p-3">20.000€</td>
                      <td className="p-3">40.000€</td>
                      <td className="p-3">20.000€</td>
                      <td className="p-3 font-semibold text-red-400">~5.366€</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3">30.000€</td>
                      <td className="p-3">60.000€</td>
                      <td className="p-3">30.000€</td>
                      <td className="p-3 font-semibold text-red-400">~8.049€</td>
                    </tr>
                    <tr className="bg-slate-900">
                      <td className="p-3">40.000€</td>
                      <td className="p-3">80.000€</td>
                      <td className="p-3">40.000€</td>
                      <td className="p-3 font-semibold text-red-400">~10.732€</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3">50.000€</td>
                      <td className="p-3">100.000€</td>
                      <td className="p-3">50.000€</td>
                      <td className="p-3 font-semibold text-red-400">~13.415€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-slate-400 text-sm">
                *Berechnung: Differenz × 26,83% (PV 18,50% + KV 6,80% + SV 1,53%). Ohne Unfallversicherung (pauschal).
                Tatsächliche Nachzahlung kann durch Höchstbeitragsgrundlage niedriger ausfallen.
              </p>
            </section>

            {/* SVS als Betriebsausgabe */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                SVS-Nachzahlung als Betriebsausgabe
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Die gute Nachricht: SVS-Beiträge (auch Nachzahlungen) sind vollständig als
                Betriebsausgaben absetzbar. Sie reduzieren deinen steuerlichen Gewinn und damit
                deine Einkommensteuer. Bei der Einnahmen-Ausgaben-Rechnung gilt das
                Zufluss-Abfluss-Prinzip — die Nachzahlung wirkt im Jahr der Zahlung.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-4">
                <h3 className="text-lg font-semibold text-white mb-3">Steuerersparnis durch SVS-Abzug:</h3>
                <div className="text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Nachzahlung 5.000€ bei Grenzsteuersatz 30%:</span>
                    <strong className="text-green-400">1.500€ ESt-Ersparnis</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Nachzahlung 8.000€ bei Grenzsteuersatz 42%:</span>
                    <strong className="text-green-400">3.360€ ESt-Ersparnis</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Nachzahlung 10.000€ bei Grenzsteuersatz 48%:</span>
                    <strong className="text-green-400">4.800€ ESt-Ersparnis</strong>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
                <p className="text-blue-200">
                  <strong>Tipp:</strong> Bei der E/A-Rechnung kannst du durch die Zahlung einer
                  hohen SVS-Nachzahlung im Dezember deinen Gewinn des laufenden Jahres deutlich senken.
                  Das kann strategisch sinnvoll sein, wenn du ein besonders gutes Jahr hattest.
                </p>
              </div>
            </section>

            {/* 7 Strategien */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                7 Strategien um die SVS-Nachzahlung zu vermeiden oder zu reduzieren
              </h2>

              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    1. Antrag auf Erhöhung der vorläufigen Beitragsgrundlage
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Nach § 25a Abs 3 GSVG kannst du bei der SVS eine Erhöhung der vorläufigen
                    Beitragsgrundlage beantragen. So zahlst du laufend höhere Beiträge und
                    vermeidest die große Nachzahlung.
                  </p>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">So geht&apos;s:</h4>
                    <ol className="text-slate-300 space-y-1 list-decimal list-inside">
                      <li>Formular „Antrag auf Änderung der vorläufigen Beitragsgrundlage" von svs.at herunterladen</li>
                      <li>Geschätzten Jahresgewinn eintragen (realistisch schätzen!)</li>
                      <li>Per Post, Fax oder über das SVS-Onlineportal einreichen</li>
                      <li>SVS passt die Beitragsgrundlage an (ab dem Folgemonat)</li>
                    </ol>
                    <p className="text-slate-400 text-sm mt-2">
                      Der Antrag kann jederzeit gestellt werden. Empfohlen: sobald absehbar ist,
                      dass dein Gewinn deutlich über der Schätzung liegt.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    2. Monatliche Rücklagen bilden
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Lege monatlich 15-20% deines Mehrgewinns (Differenz zum geschätzten Gewinn)
                    auf ein separates Konto. So bist du vorbereitet, wenn die Nachzahlung kommt.
                  </p>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Rechenbeispiel:</h4>
                    <p className="text-slate-300">
                      Geschätzter Gewinn: 40.000€, tatsächlicher Gewinn: 70.000€.<br />
                      Mehrgewinn: 30.000€ → monatliche Rücklage: 30.000€ × 26,83% ÷ 12 = <strong className="text-white">~671€/Monat</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    3. Gewinnfreibetrag optimal nutzen (§ 10 EStG)
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Der Gewinnfreibetrag reduziert deinen steuerpflichtigen Gewinn und damit auch
                    die SVS-Beitragsgrundlage. Der Grundfreibetrag von 15% (max. 4.950€) wird
                    automatisch berücksichtigt.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Bei 50.000€ Gewinn: GFB = 4.950€ → SVS-Ersparnis: 4.950€ × 26,83% = <strong>~1.328€ weniger SVS</strong>
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    4. Betriebsausgaben strategisch planen
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Plane größere Investitionen und Betriebsausgaben in Jahre mit hohen Gewinnen.
                    Jeder Euro Betriebsausgabe senkt den Gewinn und damit die SVS-Beitragsgrundlage
                    um 26,83 Cent.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    5. Investitionsfreibetrag nutzen (§ 11 EStG)
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Bei Anschaffung von Wirtschaftsgütern kannst du zusätzlich zur normalen AfA
                    einen Investitionsfreibetrag von 15% (ökologisch: 20%) geltend machen.
                    Dieser senkt den Gewinn und damit die SVS-Grundlage.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    6. Ratenzahlung bei der SVS beantragen
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Wenn die Nachzahlung bereits feststeht, kannst du bei der SVS eine Ratenzahlung
                    beantragen. Die SVS ist hier oft kulanter als das Finanzamt.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Kontakt: SVS-Landesstelle oder telefonisch unter 050 808 808.
                    Ratenzahlungen über 12-24 Monate sind üblich.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    7. Steuerberater frühzeitig einschalten
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Ein Steuerberater kann die SVS-Nachzahlung bereits während des laufenden
                    Geschäftsjahres kalkulieren und rechtzeitig den Antrag auf Anpassung der
                    Beitragsgrundlage stellen. Die Kosten für den Steuerberater sind selbst
                    als Betriebsausgabe absetzbar.
                  </p>
                </div>
              </div>
            </section>

            {/* Schritt-für-Schritt bei erhaltener Nachzahlung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                SVS-Nachzahlung erhalten? Schritt-für-Schritt
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">1. Bescheid genau prüfen</h3>
                  <p className="text-slate-300">
                    Prüfe den Nachzahlungsbescheid auf korrekte Beitragsgrundlage.
                    Stimmt der zugrunde gelegte Gewinn? Wurde der Gewinnfreibetrag berücksichtigt?
                    Fehler kommen vor und du hast 3 Monate Zeit für einen Einspruch.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">2. Zahlungsfrist beachten</h3>
                  <p className="text-slate-300">
                    Die Nachzahlung ist in der Regel innerhalb von 2 Wochen nach Zustellung fällig.
                    Kannst du nicht zahlen, sofort Kontakt mit der SVS aufnehmen.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">3. Ratenzahlung oder Stundung beantragen</h3>
                  <p className="text-slate-300">
                    Die SVS bietet Ratenzahlungsvereinbarungen an. Alternativ kannst du eine
                    Stundung (Zahlungsaufschub) beantragen, wenn du vorübergehend zahlungsunfähig bist.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">4. Härtefallantrag prüfen</h3>
                  <p className="text-slate-300">
                    In besonderen Härtefällen kann die SVS Beiträge nachsehen oder reduzieren.
                    Das gilt vor allem bei drohender Insolvenz oder schwerer Krankheit.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">5. Zukunftsvorsorge treffen</h3>
                  <p className="text-slate-300">
                    Nutze die Nachzahlung als Anlass, deine vorläufige Beitragsgrundlage für
                    die Zukunft anzupassen und ein Rücklagensystem einzurichten.
                  </p>
                </div>
              </div>
            </section>

            {/* Monatliche Checkliste */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Monatliche SVS-Checkliste für Selbstständige
              </h2>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <ul className="text-slate-300 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">&#9744;</span>
                    <span>Monatlichen Umsatz und Gewinn tracken (Soll vs. Ist)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">&#9744;</span>
                    <span>SVS-Rücklage auf separates Konto überweisen (26,83% vom Mehrgewinn)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">&#9744;</span>
                    <span>Bei Gewinnsprung: Antrag auf Erhöhung der Beitragsgrundlage prüfen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">&#9744;</span>
                    <span>Quartalsweise: Gewinnfreibetrag-Nutzung prüfen (investitionsbedingter GFB)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">&#9744;</span>
                    <span>Jährlich im November: Betriebsausgaben und Investitionen vor Jahresende planen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">&#9744;</span>
                    <span>SVS-Bescheide zeitnah prüfen und bei Fehlern innerhalb der Frist einsprachen</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Häufig gestellte Fragen zur SVS-Nachzahlung
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Kann ich die SVS-Nachzahlung in Raten zahlen?</h3>
                  <p className="text-slate-300">
                    Ja, die SVS bietet Ratenzahlungen an. Kontaktiere deine SVS-Landesstelle
                    telefonisch (050 808 808) oder über das Onlineportal. Ratenzahlungen über
                    12-24 Monate sind üblich.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Fallen Verzugszinsen auf die Nachzahlung an?</h3>
                  <p className="text-slate-300">
                    Ja, bei verspäteter Zahlung fallen Verzugszinsen an. Der aktuelle Zinssatz
                    richtet sich nach dem Basiszinssatz der EZB plus Aufschlag. Deshalb ist es
                    wichtig, rechtzeitig eine Ratenzahlung zu vereinbaren.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Kann ich gegen den Nachzahlungsbescheid Einspruch erheben?</h3>
                  <p className="text-slate-300">
                    Ja, du hast 3 Monate ab Zustellung Zeit für einen Einspruch (Beschwerde).
                    Prüfe insbesondere, ob die Beitragsgrundlage korrekt berechnet wurde und
                    ob der Gewinnfreibetrag berücksichtigt wurde.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Gibt es eine Höchstgrenze für SVS-Beiträge?</h3>
                  <p className="text-slate-300">
                    Ja, die Höchstbeitragsgrundlage liegt 2026 bei ca. 7.070€/Monat (84.840€/Jahr).
                    Ab diesem Gewinn steigen die SVS-Beiträge nicht mehr weiter. Die maximale
                    jährliche SVS-Belastung beträgt damit ca. 22.760€.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Was passiert wenn ich die Nachzahlung nicht zahlen kann?</h3>
                  <p className="text-slate-300">
                    Ignoriere die Nachzahlung keinesfalls! Es folgen Mahnungen, Säumniszuschläge
                    und im schlimmsten Fall Zwangsvollstreckung. Kontaktiere stattdessen die SVS
                    für eine Ratenzahlung oder Stundung.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Bekomme ich eine Gutschrift wenn mein Gewinn sinkt?</h3>
                  <p className="text-slate-300">
                    Ja! Wenn dein tatsächlicher Gewinn niedriger ist als die vorläufige
                    Beitragsgrundlage, erhältst du eine Gutschrift. Du hast zu viel gezahlt
                    und bekommst die Differenz zurück.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-12 mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Berechne deine SVS-Nachzahlung jetzt kostenlos
                </h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Erfahre sofort, mit welcher Nachzahlung du rechnen musst und plane deine
                  Liquidität entsprechend.
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  <Link href="/rechner">
                    Kostenlos berechnen
                  </Link>
                </Button>
              </div>
            </section>

            <ArticleFooter
              breadcrumbs={[
                { name: 'Home', href: '/' },
                { name: 'Steuerwissen', href: '/steuerwissen' },
                { name: 'SVS-Nachzahlung vermeiden', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
              ]}
              sources={[
                { name: 'SVS — Sozialversicherung der Selbständigen', url: 'https://www.svs.at/cdscontent/?contentid=10007.816984', description: 'Offizielle SVS-Seite zu Beitragsgrundlagen und Nachzahlungen' },
                { name: 'GSVG § 25a — Vorläufige Beitragsgrundlage', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10008442', description: 'Rechtsinformationssystem des Bundes (RIS)' },
                { name: 'WKO — SVS-Beiträge für Gewerbetreibende', url: 'https://www.wko.at/sozialversicherung/svs-beitraege', description: 'Wirtschaftskammer Österreich — Aktuelle SVS-Beitragssätze' },
                { name: 'BMF — Einkommensteuergesetz', url: 'https://www.bmf.gv.at/themen/steuern/selbststaendige-unternehmer.html', description: 'Bundesministerium für Finanzen — Informationen für Selbständige' },
              ]}
              relatedArticles={[
                { title: 'SVS-Beiträge senken — 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
                { title: 'Steueroptimierung für Selbständige — Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
                { title: 'Gewinnfreibetrag 2026 — Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
                { title: 'Pauschalierung in Österreich — Alle Arten im Vergleich', href: '/steuerwissen/pauschalierung-oesterreich' },
              ]}
            />
          </article>
        </div>
      </div>
      <SiteFooter />
    </AppShell>
  )
}
