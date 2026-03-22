import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function NebenberuflichSelbstaendigPage() {
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
              <span className="text-slate-300">Nebenberuflich selbständig</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Nebenberuflich selbständig in Österreich — Steuern, SVS & Tipps
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Du möchtest neben deinem Hauptjob selbständig tätig werden? In Österreich ist das problemlos möglich,
              aber es gibt wichtige steuerliche und sozialversicherungsrechtliche Regeln zu beachten. Dieser
              umfassende Guide erklärt dir alles: von der SVS-Pflicht über die Steuerberechnung bis zu typischen
              Fallen. Mit konkreten Berechnungsbeispielen und praktischen Tipps.
            </p>

            {/* Kurzantwort für AI Overviews */}
            <div className="bg-blue-900/30 border border-blue-700/50 p-5 rounded-lg mb-10">
              <p className="text-blue-200 font-medium leading-relaxed">
                <strong className="text-white">Kurzantwort:</strong> Nebenberuflich selbständig bedeutet:
                (1) SVS-Pflicht ab 6.221,28 € Jahreseinkommen, (2) Pflichtveranlagung ab 730 € Nebeneinkünften,
                (3) Progressive Besteuerung aller Einkünfte zusammen, (4) Meldung bei Finanzamt, SVS und ggf.
                Gewerbebehörde, (5) Kleinunternehmerregelung bis 42.000 € möglich. Bei Mischeinkommen steigt oft
                der Grenzsteuersatz erheblich.
              </p>
            </div>

            {/* Wer gilt als nebenberuflich selbständig */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Wer gilt als nebenberuflich selbständig?
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Nebenberuflich selbständig bist du, wenn du zusätzlich zu einem Haupterwerb (Anstellung,
                Pension, Karenz) eine selbständige Tätigkeit ausübst. Dabei ist es rechtlich egal, ob du
                mehr Zeit mit der Anstellung oder der Selbständigkeit verbringst — entscheidend ist nur,
                dass beide Tätigkeiten parallel laufen.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Definition nach österreichischem Recht:</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• <strong className="text-white">Haupterwerb:</strong> Anstellung, Beamtenverhältnis, Pension oder Familienbeihilfe</li>
                  <li>• <strong className="text-white">Nebenerwerb:</strong> Selbständige Tätigkeit (gewerblich oder freiberuflich)</li>
                  <li>• <strong className="text-white">Zeitlicher Umfang:</strong> Irrelevant für die rechtliche Einordnung</li>
                  <li>• <strong className="text-white">Einkommensverhältnis:</strong> Ebenfalls irrelevant</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Gewerbeschein ja oder nein?</h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Ob du einen Gewerbeschein brauchst, hängt von deiner Tätigkeit ab:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">Kein Gewerbeschein nötig:</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• IT-Beratung & Programmierung</li>
                    <li>• Grafik & Design</li>
                    <li>• Texten & Übersetzen</li>
                    <li>• Coaching & Training</li>
                    <li>• Künstlerische Tätigkeiten</li>
                    <li>• Wissenschaftliche Beratung</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">Gewerbeschein erforderlich:</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Online-Handel (E-Commerce)</li>
                    <li>• Handwerksleistungen</li>
                    <li>• Produktverkauf</li>
                    <li>• Dienstleistungen vor Ort</li>
                    <li>• Gastronomie & Events</li>
                    <li>• Transport & Logistik</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 p-4 rounded-lg">
                <p className="text-amber-200">
                  <strong>Tipp:</strong> Bei Unsicherheit unbedingt bei der WKO nachfragen! Eine falsche
                  Einschätzung kann teure Nachzahlungen und Strafen zur Folge haben. Der Service ist kostenlos.
                </p>
              </div>
            </section>

            {/* SVS-Pflicht bei Nebeneinkünften */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                SVS-Pflicht bei Nebeneinkünften — Die 6.221,28 € Grenze
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Die wichtigste Schwelle für nebenberuflich Selbständige ist die SVS-Versicherungsgrenze
                von <strong className="text-white">6.221,28 € jährlich</strong> (2026). Diese Grenze
                bezieht sich auf deine Einkünfte aus selbständiger Tätigkeit, nicht auf den Umsatz.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Was passiert unter 6.221,28 €?</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• <strong className="text-white">Keine SVS-Pflicht:</strong> Du bleibst nur bei deiner Anstellungs-Krankenversicherung</li>
                  <li>• <strong className="text-white">Freiwillige Versicherung:</strong> Du kannst dich trotzdem bei der SVS versichern</li>
                  <li>• <strong className="text-white">Pensionszeiten:</strong> Nur über freiwillige Versicherung erwerbbar</li>
                  <li>• <strong className="text-white">Unfallversicherung:</strong> Nur bei freiwilliger SVS-Versicherung</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Was passiert über 6.221,28 €?</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• <strong className="text-white">SVS-Pflichtversicherung:</strong> Automatische Anmeldung bei der SVS</li>
                  <li>• <strong className="text-white">Doppelversicherung:</strong> ASVG (Anstellung) + GSVG (SVS) parallel</li>
                  <li>• <strong className="text-white">Mindestbeitrag 2026:</strong> Ca. 186 €/Monat (2.232 €/Jahr)</li>
                  <li>• <strong className="text-white">Unfallversicherung:</strong> Automatisch inkludiert (ca. 11,35 €/Monat)</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">SVS-Beitragssätze 2026 im Detail:</h3>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-slate-900 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 text-left text-white">Versicherung</th>
                      <th className="p-3 text-right text-white">Beitragssatz</th>
                      <th className="p-3 text-right text-white">Minimum/Monat</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Pensionsversicherung</td>
                      <td className="p-3 text-right">18,50%</td>
                      <td className="p-3 text-right">€ 120,46</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Krankenversicherung</td>
                      <td className="p-3 text-right">6,80%</td>
                      <td className="p-3 text-right">€ 44,27</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Selbständigenvorsorge</td>
                      <td className="p-3 text-right">1,53%</td>
                      <td className="p-3 text-right">€ 9,96</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Unfallversicherung</td>
                      <td className="p-3 text-right">Pauschal</td>
                      <td className="p-3 text-right">€ 11,35</td>
                    </tr>
                    <tr className="border-t border-slate-700 bg-slate-800">
                      <td className="p-3 font-semibold text-white">Gesamt</td>
                      <td className="p-3 text-right font-semibold text-white">26,83%*</td>
                      <td className="p-3 text-right font-semibold text-white">€ 186,04</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 p-4 rounded-lg">
                <p className="text-amber-200">
                  <strong>Achtung:</strong> Die Doppelversicherung bedeutet höhere Gesamtkosten, aber auch
                  bessere Absicherung. Bei der Krankenversicherung gibt es teilweise Erstattungen zwischen
                  ASVG und GSVG, aber nie 100%. Kalkuliere mindestens 80% der SVS-Beiträge als Mehrkosten ein.
                </p>
              </div>
            </section>

            {/* Steuerberechnung bei Mischeinkommen */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Steuerberechnung bei Mischeinkommen — So funktioniert's
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Bei Mischeinkommen aus Anstellung und Selbständigkeit werden alle Einkünfte zusammengerechnet
                und mit dem progressiven Einkommensteuertarif besteuert. Das kann dazu führen, dass deine
                selbständigen Einkünfte mit einem höheren Grenzsteuersatz belastet werden als bei der Anstellung.
              </p>

              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-blue-300 mb-2">Wichtige Regel:</h4>
                <p className="text-slate-300">
                  Als Arbeitnehmer mit Nebeneinkünften über 730 € musst du eine Pflichtveranlagung
                  (Steuererklärung) abgeben. Darunter ist es freiwillig, aber oft vorteilhaft.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Österreichischer Einkommensteuertarif 2026:</h3>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-slate-900 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 text-left text-white">Einkommen (€)</th>
                      <th className="p-3 text-center text-white">Grenzsteuersatz</th>
                      <th className="p-3 text-right text-white">Beispiel Durchschnitt</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-t border-slate-700">
                      <td className="p-3">0 - 12.816</td>
                      <td className="p-3 text-center text-green-400 font-medium">0%</td>
                      <td className="p-3 text-right">0%</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">12.817 - 20.818</td>
                      <td className="p-3 text-center text-yellow-400 font-medium">20%</td>
                      <td className="p-3 text-right">7,7%</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">20.819 - 34.513</td>
                      <td className="p-3 text-center text-orange-400 font-medium">30%</td>
                      <td className="p-3 text-right">16,2%</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">34.514 - 66.612</td>
                      <td className="p-3 text-center text-red-400 font-medium">40%</td>
                      <td className="p-3 text-right">27,8%</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">66.613 - 99.266</td>
                      <td className="p-3 text-center text-red-500 font-medium">48%</td>
                      <td className="p-3 text-right">35,2%</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">99.267 - 1.000.000</td>
                      <td className="p-3 text-center text-red-600 font-medium">50%</td>
                      <td className="p-3 text-right">42,1%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">Berechnungsbeispiel: Angestellter + Nebeneinkommen</h3>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h4 className="font-semibold text-white mb-3">Ausgangssituation:</h4>
                <ul className="text-slate-300 space-y-1">
                  <li>• Bruttogehalt: 40.000 € (entspricht ca. 28.500 € netto)</li>
                  <li>• Gewinn aus selbständiger Tätigkeit: 15.000 €</li>
                  <li>• Gesamteinkommen: 55.000 €</li>
                </ul>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-slate-900 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 text-left text-white">Bereich</th>
                      <th className="p-3 text-right text-white">Betrag (€)</th>
                      <th className="p-3 text-center text-white">Steuersatz</th>
                      <th className="p-3 text-right text-white">Steuer (€)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-t border-slate-700">
                      <td className="p-3">0 - 12.816</td>
                      <td className="p-3 text-right">12.816</td>
                      <td className="p-3 text-center">0%</td>
                      <td className="p-3 text-right">0</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">12.817 - 20.818</td>
                      <td className="p-3 text-right">8.002</td>
                      <td className="p-3 text-center">20%</td>
                      <td className="p-3 text-right">1.600</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">20.819 - 34.513</td>
                      <td className="p-3 text-right">13.695</td>
                      <td className="p-3 text-center">30%</td>
                      <td className="p-3 text-right">4.109</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">34.514 - 55.000</td>
                      <td className="p-3 text-right">20.487</td>
                      <td className="p-3 text-center">40%</td>
                      <td className="p-3 text-right">8.195</td>
                    </tr>
                    <tr className="border-t border-slate-700 bg-slate-800">
                      <td className="p-3 font-semibold text-white">Gesamt</td>
                      <td className="p-3 text-right font-semibold text-white">55.000</td>
                      <td className="p-3 text-center font-semibold text-white">25,1%</td>
                      <td className="p-3 text-right font-semibold text-white">13.904</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                <p className="text-red-200">
                  <strong>Wichtig:</strong> Die 15.000 € aus selbständiger Tätigkeit werden größtenteils mit
                  40% besteuert! Ohne das Nebeneinkommen läge der Durchschnittssteuersatz bei nur 16,2%.
                  Plane daher mindestens 35-40% der Nebeneinkünfte für Steuern und SVS-Beiträge ein.
                </p>
              </div>
            </section>

            {/* Meldepflichten */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Meldepflichten — Diese Behördengänge stehen an
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Als nebenberuflich Selbständiger musst du dich bei mehreren Stellen anmelden. Die Reihenfolge
                und die Fristen sind wichtig, um Strafen zu vermeiden.
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-white mb-2">1. Gewerbebehörde (falls nötig)</h4>
                  <p className="text-slate-300 text-sm mb-2">
                    <strong>Wann:</strong> Vor Aufnahme der gewerblichen Tätigkeit
                  </p>
                  <p className="text-slate-300 text-sm">
                    <strong>Was:</strong> Gewerbeschein beantragen, WKO-Mitgliedschaft wird automatisch begründet
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-white mb-2">2. Finanzamt</h4>
                  <p className="text-slate-300 text-sm mb-2">
                    <strong>Wann:</strong> Innerhalb eines Monats nach Tätigkeitsaufnahme
                  </p>
                  <p className="text-slate-300 text-sm">
                    <strong>Was:</strong> Fragebogen zur steuerlichen Erfassung (Verf 24), ev. USt-Nummer
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-white mb-2">3. SVS (ab 6.221,28 €)</h4>
                  <p className="text-slate-300 text-sm mb-2">
                    <strong>Wann:</strong> Automatisch durch Finanzamts-Meldung, bei Überschreitung der Grenze
                  </p>
                  <p className="text-slate-300 text-sm">
                    <strong>Was:</strong> Bekommt Daten vom Finanzamt, schickt Beitragsbescheid
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-white mb-2">4. Arbeitgeber informieren?</h4>
                  <p className="text-slate-300 text-sm mb-2">
                    <strong>Rechtlich:</strong> Keine generelle Meldepflicht
                  </p>
                  <p className="text-slate-300 text-sm">
                    <strong>Arbeitsvertrag prüfen:</strong> Oft Nebentätigkeits-Klauseln oder Genehmigungspflicht
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">Finanzamt-Fragebogen Verf 24</h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Das wichtigste Dokument ist der Fragebogen zur steuerlichen Erfassung. Hier musst du deine
                Tätigkeit genau beschreiben und wichtige Entscheidungen treffen:
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h4 className="text-white font-semibold mb-3">Wichtige Punkte im Verf 24:</h4>
                <ul className="text-slate-300 space-y-2">
                  <li>• <strong className="text-white">Tätigkeitsbeschreibung:</strong> Sei präzise, das bestimmt die steuerliche Behandlung</li>
                  <li>• <strong className="text-white">Geschäftsadresse:</strong> Arbeitszimmer zu Hause ist möglich</li>
                  <li>• <strong className="text-white">Kleinunternehmerregelung:</strong> Entscheidung über USt-Pflicht</li>
                  <li>• <strong className="text-white">Gewinnermittlungsart:</strong> E/A-Rechnung vs. doppelte Buchführung</li>
                  <li>• <strong className="text-white">Vorauszahlungen:</strong> Wie viel Einkommensteuer wird vierteljährlich vorgeschrieben</li>
                </ul>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 p-4 rounded-lg">
                <p className="text-amber-200">
                  <strong>Tipp:</strong> Den Verf 24 gibt's online über FinanzOnline. Du kannst ihn vorab
                  herunterladen und in Ruhe ausfüllen. Bei Unsicherheiten lieber einen Steuerberater
                  konsultieren — falsche Angaben sind später schwer zu korrigieren.
                </p>
              </div>
            </section>

            {/* Umsatzsteuer */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Umsatzsteuer — Kleinunternehmerregelung vs. Vollversicherung
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Ein wichtiger Entscheidungspunkt für Nebenberufler ist die Umsatzsteuer. Die
                Kleinunternehmerregelung nach § 6 Abs. 1 Z 27 UStG befreit dich bis zu einem
                Jahresumsatz von 42.000 € von der Umsatzsteuerpflicht.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-900/20 border border-green-700/50 p-5 rounded-lg">
                  <h3 className="font-semibold text-green-300 mb-3">Kleinunternehmerregelung</h3>
                  <h4 className="text-white font-medium mb-2">Vorteile:</h4>
                  <ul className="text-slate-300 text-sm space-y-1 mb-3">
                    <li>• Keine USt-Voranmeldung nötig</li>
                    <li>• Keine 20% USt auf Rechnungen</li>
                    <li>• Einfachere Buchführung</li>
                    <li>• Weniger Bürokratie</li>
                  </ul>
                  <h4 className="text-white font-medium mb-2">Nachteile:</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Kein Vorsteuerabzug</li>
                    <li>• Weniger professionell</li>
                    <li>• B2B-Kunden bevorzugen USt-pflichtige Lieferanten</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/50 p-5 rounded-lg">
                  <h3 className="font-semibold text-blue-300 mb-3">USt-Vollversicherung</h3>
                  <h4 className="text-white font-medium mb-2">Vorteile:</h4>
                  <ul className="text-slate-300 text-sm space-y-1 mb-3">
                    <li>• Vorsteuerabzug bei Betriebsausgaben</li>
                    <li>• Professionellerer Eindruck</li>
                    <li>• B2B-Kunden neutral bezüglich USt</li>
                    <li>• Einfacher bei EU-Geschäften</li>
                  </ul>
                  <h4 className="text-white font-medium mb-2">Nachteile:</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Monatliche USt-Voranmeldung</li>
                    <li>• 20% USt auf alle Rechnungen</li>
                    <li>• Mehr Bürokratie</li>
                    <li>• Jahreserklärung komplexer</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Entscheidungshilfe:</h3>
                <p className="text-slate-300 mb-3">
                  Wähle die Kleinunternehmerregelung, wenn:
                </p>
                <ul className="text-slate-300 space-y-1 mb-4">
                  <li>• Du hauptsächlich an Endkunden verkaufst (B2C)</li>
                  <li>• Deine Betriebsausgaben niedrig sind (wenig Vorsteuer)</li>
                  <li>• Du unter 42.000 € Jahresumsatz bleibst</li>
                  <li>• Du den administrativen Aufwand minimal halten willst</li>
                </ul>

                <p className="text-slate-300 mb-3">
                  Wähle die USt-Vollversicherung, wenn:
                </p>
                <ul className="text-slate-300 space-y-1">
                  <li>• Du hauptsächlich an Unternehmen verkaufst (B2B)</li>
                  <li>• Du hohe Betriebsausgaben hast (viel Vorsteuer)</li>
                  <li>• Du über 42.000 € Jahresumsatz planst</li>
                  <li>• Du professionell auftreten willst</li>
                </ul>
              </div>

              <div className="bg-blue-900/30 border border-blue-700/50 p-4 rounded-lg">
                <p className="text-blue-200">
                  <strong>Wichtig:</strong> Du kannst zwischen beiden Optionen wählen, musst dich aber
                  für mindestens 5 Jahre festlegen. Ändere nur mit guter Begründung — etwa bei dauerhafter
                  Überschreitung der 42.000 € Grenze.
                </p>
              </div>
            </section>

            {/* Typische Fehler */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Typische Fehler vermeiden — Die 7 häufigsten Fallen
              </h2>

              <div className="space-y-4 mb-6">
                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">1. Zu niedrige Steuerrücklagen</h4>
                  <p className="text-slate-300 text-sm">
                    Viele nebenberuflich Selbständige vergessen, dass ihre Einkünfte oft mit 35-40%
                    besteuert werden. Lege mindestens 40% deiner Gewinne für Steuern und SVS zurück.
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">2. SVS-Grenze übersehen</h4>
                  <p className="text-slate-300 text-sm">
                    Bei Überschreitung der 6.221,28 € Grenze wirst du rückwirkend SVS-pflichtig.
                    Das bedeutet auch rückwirkende Beitragszahlung! Überwache deine Einkünfte laufend.
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">3. Gewerbeschein vergessen</h4>
                  <p className="text-slate-300 text-sm">
                    Gewerbliche Tätigkeit ohne Gewerbeschein kann teure Strafen kosten. Bei Unsicherheit
                    immer vorher bei der WKO nachfragen — auch per Telefon möglich.
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">4. Arbeitsvertrag ignorieren</h4>
                  <p className="text-slate-300 text-sm">
                    Viele Arbeitsverträge enthalten Nebentätigkeits-Klauseln oder sogar Verbote.
                    Prüfe deinen Vertrag und hole dir ggf. die Genehmigung des Arbeitgebers.
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">5. Betriebsausgaben nicht nutzen</h4>
                  <p className="text-slate-300 text-sm">
                    Arbeitszimmer, Telefon, Internet, Fachliteratur — nutze alle möglichen Absetzungen.
                    Bei häuslichem Arbeitszimmer sind bis zu 1.200 € ohne Nachweis absetzbar.
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">6. Umsatz vs. Einkünfte verwechseln</h4>
                  <p className="text-slate-300 text-sm">
                    Die SVS-Grenze von 6.221,28 € bezieht sich auf Einkünfte (Gewinn), nicht auf Umsatz!
                    Die USt-Grenze von 42.000 € hingegen auf den Umsatz. Nicht verwechseln.
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">7. Keine Belege sammeln</h4>
                  <p className="text-slate-300 text-sm">
                    Sammle alle Belege systematisch. Die 7-Jahres-Aufbewahrungspflicht gilt auch für
                    Nebenberufler. Nutze digitale Tools wie Cloud-Scanner oder Buchhaltungssoftware.
                  </p>
                </div>
              </div>
            </section>

            {/* Berechnungsbeispiel mit Tabelle */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Komplettes Berechnungsbeispiel — So wird's real berechnet
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Schauen wir uns ein realistisches Beispiel an: Maria arbeitet als Angestellte in einem
                IT-Unternehmen und betreibt nebenberuflich Webdesign.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Marias Situation 2026:</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• <strong className="text-white">Anstellung:</strong> 42.000 € brutto/Jahr</li>
                  <li>• <strong className="text-white">Webdesign-Umsatz:</strong> 25.000 €</li>
                  <li>• <strong className="text-white">Betriebsausgaben:</strong> 7.000 € (Software, Hardware, Fortbildung)</li>
                  <li>• <strong className="text-white">Gewinn aus Selbständigkeit:</strong> 18.000 €</li>
                  <li>• <strong className="text-white">Gesamteinkommen:</strong> 60.000 €</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">1. SVS-Beiträge berechnen:</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-slate-900 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 text-left text-white">Position</th>
                      <th className="p-3 text-right text-white">Berechnung</th>
                      <th className="p-3 text-right text-white">Betrag/Monat</th>
                      <th className="p-3 text-right text-white">Betrag/Jahr</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Beitragsgrundlage</td>
                      <td className="p-3 text-right">18.000 € (Gewinn)</td>
                      <td className="p-3 text-right">1.500 €</td>
                      <td className="p-3 text-right">18.000 €</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Pensionsversicherung (18,50%)</td>
                      <td className="p-3 text-right">18.000 × 18,50%</td>
                      <td className="p-3 text-right">277,50 €</td>
                      <td className="p-3 text-right">3.330 €</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Krankenversicherung (6,80%)</td>
                      <td className="p-3 text-right">18.000 × 6,80%</td>
                      <td className="p-3 text-right">102 €</td>
                      <td className="p-3 text-right">1.224 €</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Selbständigenvorsorge (1,53%)</td>
                      <td className="p-3 text-right">18.000 × 1,53%</td>
                      <td className="p-3 text-right">22,95 €</td>
                      <td className="p-3 text-right">275,40 €</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Unfallversicherung (pauschal)</td>
                      <td className="p-3 text-right">Fixbetrag</td>
                      <td className="p-3 text-right">11,35 €</td>
                      <td className="p-3 text-right">136,20 €</td>
                    </tr>
                    <tr className="border-t border-slate-700 bg-slate-800">
                      <td className="p-3 font-semibold text-white">SVS-Beiträge gesamt</td>
                      <td className="p-3 text-right font-semibold text-white"></td>
                      <td className="p-3 text-right font-semibold text-white">413,80 €</td>
                      <td className="p-3 text-right font-semibold text-white">4.965,60 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">2. Einkommensteuer berechnen:</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-slate-900 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 text-left text-white">Einkommen-Bereich</th>
                      <th className="p-3 text-right text-white">Betrag</th>
                      <th className="p-3 text-center text-white">Steuersatz</th>
                      <th className="p-3 text-right text-white">Steuer</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-t border-slate-700">
                      <td className="p-3">0 - 12.816 €</td>
                      <td className="p-3 text-right">12.816 €</td>
                      <td className="p-3 text-center">0%</td>
                      <td className="p-3 text-right">0 €</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">12.817 - 20.818 €</td>
                      <td className="p-3 text-right">8.002 €</td>
                      <td className="p-3 text-center">20%</td>
                      <td className="p-3 text-right">1.600,40 €</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">20.819 - 34.513 €</td>
                      <td className="p-3 text-right">13.695 €</td>
                      <td className="p-3 text-center">30%</td>
                      <td className="p-3 text-right">4.108,50 €</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">34.514 - 60.000 €</td>
                      <td className="p-3 text-right">25.487 €</td>
                      <td className="p-3 text-center">40%</td>
                      <td className="p-3 text-right">10.194,80 €</td>
                    </tr>
                    <tr className="border-t border-slate-700 bg-slate-800">
                      <td className="p-3 font-semibold text-white">Einkommensteuer gesamt</td>
                      <td className="p-3 text-right font-semibold text-white">60.000 €</td>
                      <td className="p-3 text-center font-semibold text-white">26,3%</td>
                      <td className="p-3 text-right font-semibold text-white">15.903,70 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">3. Gesamtbelastung Übersicht:</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-slate-900 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 text-left text-white">Position</th>
                      <th className="p-3 text-right text-white">Betrag</th>
                      <th className="p-3 text-right text-white">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Bruttogehalt + Gewinn</td>
                      <td className="p-3 text-right text-white">60.000 €</td>
                      <td className="p-3 text-right">100%</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Einkommensteuer</td>
                      <td className="p-3 text-right">15.904 €</td>
                      <td className="p-3 text-right">26,5%</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">SVS-Beiträge (Nebentätigkeit)</td>
                      <td className="p-3 text-right">4.966 €</td>
                      <td className="p-3 text-right">8,3%</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Angestellten-SV (geschätzt)</td>
                      <td className="p-3 text-right">7.560 €</td>
                      <td className="p-3 text-right">18,0%*</td>
                    </tr>
                    <tr className="border-t border-slate-700 bg-slate-800">
                      <td className="p-3 font-semibold text-white">Netto verfügbar</td>
                      <td className="p-3 text-right font-semibold text-white">31.570 €</td>
                      <td className="p-3 text-right font-semibold text-white">52,6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-900/30 border border-blue-700/50 p-4 rounded-lg">
                <p className="text-blue-200">
                  <strong>Fazit:</strong> Von den 18.000 € Gewinn aus der Nebentätigkeit bleiben Maria
                  nach Abzug der zusätzlichen Steuern und SVS-Beiträge etwa 11.000 € netto übrig.
                  Das entspricht einer Belastung von ca. 39% auf die Nebeneinkünfte.
                </p>
              </div>
            </section>

            {/* CTA zum Misch-Einkommen Rechner */}
            <section className="mb-10">
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Berechne deine Steuerbelastung bei Mischeinkommen
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Unser Misch-Einkommen-Rechner zeigt dir genau, wie sich deine Steuerbelastung bei
                  Einkommen aus Anstellung und Selbständigkeit entwickelt. Mit detaillierter Aufschlüsselung
                  von Einkommensteuer und SVS-Beiträgen.
                </p>
                <Button asChild>
                  <Link href="/rechner/misch-einkommen" className="inline-flex items-center">
                    Zum Misch-Einkommen-Rechner
                    <span className="ml-2">→</span>
                  </Link>
                </Button>
              </div>
            </section>

            {/* FAQ Sektion */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Häufige Fragen zur nebenberuflichen Selbständigkeit
              </h2>

              <div className="space-y-4">
                <details className="bg-slate-900 border border-slate-700 rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                    <span className="font-medium text-white">Muss ich als nebenberuflich Selbständiger zur SVS?</span>
                  </summary>
                  <div className="p-4 pt-0 text-slate-300">
                    <p className="leading-relaxed">
                      Ja, sobald deine Einkünfte aus selbständiger Tätigkeit 6.221,28 € pro Jahr überschreiten,
                      bist du pflichtversichert bei der SVS. Bei niedrigeren Einkünften kannst du dich freiwillig
                      versichern, um Pensionszeiten zu sammeln. Die SVS-Pflicht greift automatisch, wenn das
                      Finanzamt deine Daten weitergibt.
                    </p>
                  </div>
                </details>

                <details className="bg-slate-900 border border-slate-700 rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                    <span className="font-medium text-white">Ab welchem Nebeneinkommen muss ich eine Steuererklärung machen?</span>
                  </summary>
                  <div className="p-4 pt-0 text-slate-300">
                    <p className="leading-relaxed">
                      Als Arbeitnehmer musst du ab 730 € jährlichen Einkünften aus selbständiger Tätigkeit
                      eine Pflichtveranlagung (Steuererklärung) abgeben. Diese Grenze gilt für die Einkünfte
                      (Gewinn), nicht für den Umsatz. Darunter ist die Veranlagung freiwillig, aber oft
                      vorteilhaft wegen Betriebsausgabenabzug.
                    </p>
                  </div>
                </details>

                <details className="bg-slate-900 border border-slate-700 rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                    <span className="font-medium text-white">Wie wird Mischeinkommen aus Anstellung und Selbständigkeit besteuert?</span>
                  </summary>
                  <div className="p-4 pt-0 text-slate-300">
                    <p className="leading-relaxed">
                      Alle Einkünfte werden zusammengerechnet und mit dem progressiven Einkommensteuertarif
                      besteuert. Dabei kann der Grenzsteuersatz auf die selbständigen Einkünfte höher sein
                      als bei der Anstellung. Bei einem Gesamteinkommen von 60.000 € werden die letzten
                      Euros bereits mit 40% besteuert. Daher solltest du mindestens 35-40% der Nebeneinkünfte
                      für Steuern zurücklegen.
                    </p>
                  </div>
                </details>

                <details className="bg-slate-900 border border-slate-700 rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                    <span className="font-medium text-white">Kann ich nebenberuflich selbständig sein ohne Gewerbeschein?</span>
                  </summary>
                  <div className="p-4 pt-0 text-slate-300">
                    <p className="leading-relaxed">
                      Das kommt auf die Tätigkeit an. Freiberufliche Tätigkeiten (IT-Beratung, Grafik, Texten,
                      Coaching, wissenschaftliche Beratung) brauchen keinen Gewerbeschein. Gewerbliche Tätigkeiten
                      (Handel, Handwerk, Dienstleistungen vor Ort) schon. Bei Unsicherheit unbedingt bei der
                      WKO nachfragen — auch telefonisch möglich und kostenlos.
                    </p>
                  </div>
                </details>
              </div>
            </section>

            <ArticleFooter
              sources={[
                {
                  name: "Bundesministerium für Finanzen — Einkommensteuergesetz",
                  url: "https://www.bmf.gv.at/themen/steuern/arbeitnehmer-pensionisten/einkommensteuer.html",
                  description: "Offizielle Informationen zur Einkommensteuer in Österreich"
                },
                {
                  name: "Sozialversicherung der Selbständigen (SVS)",
                  url: "https://www.svs.at/cdscontent/?contentid=10008.884908",
                  description: "Versicherungspflicht und Beiträge für Selbständige"
                },
                {
                  name: "Wirtschaftskammer Österreich — Nebengewerbe",
                  url: "https://www.wko.at/service/wirtschaftsrecht-gewerberecht/nebengewerbe.html",
                  description: "Gewerberechtliche Bestimmungen für nebenberufliche Selbständigkeit"
                },
                {
                  name: "Rechtsinformationssystem (RIS) — GSVG",
                  url: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10008254",
                  description: "Gewerbliches Sozialversicherungsgesetz"
                },
                {
                  name: "FinanzOnline — Fragebogen Verf 24",
                  url: "https://finanzonline.bmf.gv.at/",
                  description: "Steuerliche Erfassung für neue Selbständige"
                }
              ]}
              relatedArticles={[
                {
                  title: "SVS-Beiträge senken — 7 legale Strategien für Selbständige",
                  href: "/steuerwissen/svs-beitraege-senken"
                },
                {
                  title: "Kleinunternehmerregelung in Österreich — Vor- und Nachteile",
                  href: "/steuerwissen/kleinunternehmerregelung"
                },
                {
                  title: "Steueroptimierung für Selbständige — Die komplette Anleitung",
                  href: "/steuerwissen/steueroptimierung-selbststaendige"
                }
              ]}
              breadcrumbs={[
                { name: "SteuerBoard.pro", href: "/" },
                { name: "Steuerwissen", href: "/steuerwissen" },
                { name: "Nebenberuflich selbständig", href: "/steuerwissen/nebenberuflich-selbstaendig" }
              ]}
              lastUpdated="2026-03-19"
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}