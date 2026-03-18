import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function SvsBeitraegeSenkenPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/steuerwissen" className="text-slate-400 hover:text-white transition-colors">
                Steuerwissen
              </Link>
            </li>
            <li className="text-slate-500">/</li>
            <li className="text-white">SVS-Beiträge senken</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              SVS-Beiträge senken — 7 legale Strategien für Selbständige in Österreich
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              SVS-Beiträge sind für viele Selbständige der größte laufende Kostenblock — bis zu 22.788 €/Jahr bei hohen Gewinnen.
              Mit den richtigen Strategien lassen sich mehrere Tausend Euro jährlich einsparen. Hier sind 7 legale Wege,
              um deine SVS-Beiträge in Österreich zu reduzieren.
            </p>
          </header>

          {/* AI Overview Box */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-blue-300 mb-3">Kurzantwort</h2>
            <p className="text-slate-300 mb-0">
              SVS-Beiträge für Selbständige betragen ca. <strong className="text-white">26,83% des Gewinns</strong> (PV 18,50% + KV 6,80% + SV 1,53% + UV pauschal).
              Die wichtigsten Strategien zur Senkung: <strong className="text-white">Gewinnfreibetrag</strong> (bis 4.950 € weniger Beitragsgrundlage),
              <strong className="text-white">optimierte Betriebsausgaben</strong>, <strong className="text-white">Investitionsfreibetrag</strong> (15%/20% nach § 11 EStG),
              und bei hohen Gewinnen der <strong className="text-white">Wechsel zur GmbH</strong> (ASVG statt SVS).
            </p>
          </div>

          {/* Zusammensetzung SVS-Beiträge */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Wie setzen sich SVS-Beiträge zusammen?
            </h2>

            <p className="mb-6">
              Die SVS (Sozialversicherung der Selbständigen) berechnet deine Beiträge auf Basis deines Gewinns
              aus dem Einkommensteuerbescheid. In den ersten Jahren werden vorläufige Beiträge auf Basis älterer
              Bescheide vorgeschrieben — die endgültige Abrechnung erfolgt mit bis zu 3 Jahren Verzögerung.
            </p>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Beitragssätze 2026</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-700">
                  <span>Pensionsversicherung (PV)</span>
                  <strong className="text-white">18,50%</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700">
                  <span>Krankenversicherung (KV)</span>
                  <strong className="text-white">6,80%</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700">
                  <span>Selbständigenvorsorge (SV)</span>
                  <strong className="text-white">1,53%</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700">
                  <span>Unfallversicherung (UV)</span>
                  <strong className="text-white">~11,35 €/Monat (pauschal)</strong>
                </div>
                <div className="flex justify-between items-center py-2 font-semibold">
                  <span className="text-white">Gesamt (ohne UV)</span>
                  <strong className="text-white">26,83%</strong>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">Beitragsgrenzen 2026</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Mindestbeitragsgrundlage:</strong> 537,78 €/Monat</li>
                  <li><strong className="text-white">Höchstbeitragsgrundlage:</strong> 7.070 €/Monat</li>
                  <li><strong className="text-white">Mindest-SVS/Jahr:</strong> ~1.951 € (PV+KV+UV)</li>
                  <li><strong className="text-white">Höchst-SVS/Jahr:</strong> ~22.788 € (PV+KV+UV+SV)</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">Sonderfälle</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Jungunternehmer:</strong> Niedrigere Mindestbeiträge in den ersten 2 Kalenderjahren</li>
                  <li><strong className="text-white">Nebenberuflich:</strong> Differenzvorschreibung wenn auch ASVG-versichert</li>
                  <li><strong className="text-white">Opting-Out KV:</strong> Möglich bei geringem Einkommen</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-white mb-2">Rechenbeispiel: SVS-Beiträge bei 60.000 € Gewinn</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Jahresgewinn</span><span className="text-white">60.000 €</span></div>
                <div className="flex justify-between"><span>PV (18,50%)</span><span className="text-red-400">−11.100 €</span></div>
                <div className="flex justify-between"><span>KV (6,80%)</span><span className="text-red-400">−4.080 €</span></div>
                <div className="flex justify-between"><span>SV (1,53%)</span><span className="text-red-400">−918 €</span></div>
                <div className="flex justify-between"><span>UV (pauschal)</span><span className="text-red-400">−136 €</span></div>
                <div className="flex justify-between border-t border-slate-700 pt-2 font-semibold">
                  <span className="text-white">SVS-Beiträge gesamt</span>
                  <span className="text-red-400">16.234 €/Jahr</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Pro Monat</span>
                  <span className="text-red-400">~1.353 €</span>
                </div>
              </div>
            </div>
          </section>

          {/* 7 Strategien */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-8">
              7 legale Strategien, um SVS-Beiträge zu senken
            </h2>

            <div className="space-y-8">
              {/* Strategie 1 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  1. Gewinnfreibetrag nutzen (§ 10 EStG)
                </h3>
                <p className="mb-4">
                  Der Gewinnfreibetrag reduziert deinen steuerlichen Gewinn und damit auch die SVS-Beitragsgrundlage.
                  Der Grundfreibetrag (15% auf die ersten 33.000 € Gewinn, max. 4.950 €) wird automatisch gewährt.
                </p>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-white mb-2">Konkrete Ersparnis</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong className="text-white">Bei 40.000 € Gewinn:</strong> GFB = 4.950 € → SVS-Ersparnis = ~1.328 €/Jahr</li>
                    <li><strong className="text-white">Bei 60.000 € Gewinn:</strong> GFB = 4.950 € + invest. GFB → SVS-Ersparnis = ~1.328 € + ESt-Ersparnis</li>
                    <li><strong className="text-white">Bei 100.000 € Gewinn:</strong> Zusätzlich investitionsbedingter GFB (13%) → deutlich höhere Gesamtersparnis</li>
                  </ul>
                </div>
              </div>

              {/* Strategie 2 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  2. Betriebsausgaben systematisch optimieren
                </h3>
                <p className="mb-4">
                  Jede steuerlich absetzbare Betriebsausgabe reduziert deinen Gewinn und damit die SVS-Beitragsgrundlage.
                  Viele Selbständige verschenken hier Geld, weil sie absetzbare Kosten übersehen.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Häufig übersehene Ausgaben</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Arbeitszimmer (anteilig Miete, Strom, Heizung)</li>
                      <li>• Fortbildungskosten und Fachliteratur</li>
                      <li>• Geschäftsessen (50% absetzbar)</li>
                      <li>• Internet + Telefon (anteilig, z.B. 50%)</li>
                      <li>• Reisekosten (Kilometergeld 0,42 €/km)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Größere Posten</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Büroausstattung und Möbel</li>
                      <li>• Software-Abos und Cloud-Dienste</li>
                      <li>• KFZ-Kosten (Fahrtenbuch oder Pauschale)</li>
                      <li>• Versicherungen (Berufshaftpflicht etc.)</li>
                      <li>• SVS-Beiträge selbst (als Betriebsausgabe!)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-slate-800 p-4 rounded-lg">
                  <p className="text-sm mb-0">
                    <strong className="text-white">Beispiel:</strong> 5.000 € zusätzliche Betriebsausgaben senken die SVS-Beiträge
                    um ca. <strong className="text-white">1.342 €/Jahr</strong> (5.000 × 26,83%).
                  </p>
                </div>
              </div>

              {/* Strategie 3 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  3. Investitionsfreibetrag anwenden (§ 11 EStG)
                </h3>
                <p className="mb-4">
                  Bei Anschaffung oder Herstellung von abnutzbaren Wirtschaftsgütern des Anlagevermögens
                  kannst du zusätzlich zur normalen Abschreibung (AfA) einen Investitionsfreibetrag geltend machen:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-white mb-2">Allgemeiner IFB</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong className="text-white">15% der Anschaffungskosten</strong></li>
                      <li>• Max. Bemessungsgrundlage: 1.000.000 €/Jahr</li>
                      <li>• Max. IFB: 150.000 €/Jahr</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-green-300 mb-2">Ökologischer IFB</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong className="text-white">20% der Anschaffungskosten</strong></li>
                      <li>• Für klimafreundliche Investitionen</li>
                      <li>• Z.B. E-Auto, Photovoltaik, Wärmepumpe</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-sm mb-0">
                    <strong className="text-white">Beispiel:</strong> Kauf eines Laptops für 2.000 € → IFB 15% = 300 € zusätzlicher Abzug.
                    Das senkt die SVS-Beiträge um ~80 €. Bei einer E-Auto-Anschaffung (40.000 €) → IFB 20% = 8.000 € → SVS-Ersparnis ~2.146 €.
                  </p>
                </div>
              </div>

              {/* Strategie 4 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  4. Vorläufige Beitragsgrundlage herabsetzen (§ 25a Abs 3 GSVG)
                </h3>
                <p className="mb-4">
                  Wenn du erwartest, dass dein Gewinn dieses Jahr deutlich unter dem Vorjahr liegt, kannst du
                  bei der SVS einen <strong className="text-white">Antrag auf Herabsetzung der vorläufigen Beitragsgrundlage</strong> stellen.
                </p>
                <div className="bg-slate-800 p-4 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">So gehst du vor</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Antrag an die SVS stellen (formlos oder über SVS-Portal)</li>
                    <li>Glaubhaftmachung des niedrigeren Gewinns (z.B. Zwischenbilanz, Auftragslage)</li>
                    <li>SVS setzt vorläufige Beiträge auf Basis des beantragten Gewinns fest</li>
                    <li>Endabrechnung erfolgt nach Einkommensteuerbescheid</li>
                  </ol>
                </div>
                <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-700">
                  <p className="text-amber-200 text-sm mb-0">
                    <strong>Achtung:</strong> Setzt du die Beiträge zu niedrig an, folgt eine Nachzahlung mit Verzugszinsen.
                    Lieber konservativ schätzen — eine Rückzahlung bei zu hohen Beiträgen gibt es ebenfalls.
                  </p>
                </div>
              </div>

              {/* Strategie 5 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  5. Kleinunternehmerregelung prüfen (§ 6 Abs 1 Z 27 UStG)
                </h3>
                <p className="mb-4">
                  Wenn dein Jahresumsatz unter <strong className="text-white">42.000 €</strong> (netto) liegt, kannst du die
                  Kleinunternehmerregelung nutzen. Das spart zwar nicht direkt SVS, hat aber indirekte Vorteile:
                </p>
                <ul className="space-y-2 mb-4">
                  <li><strong className="text-white">Weniger Verwaltungsaufwand:</strong> Keine UVA-Meldungen, vereinfachte Buchhaltung</li>
                  <li><strong className="text-white">Effekt auf Pricing:</strong> Da du keine USt ausweist, kannst du bei B2C-Kunden
                    günstiger kalkulieren und gleichzeitig die gleiche Marge halten</li>
                  <li><strong className="text-white">SVS-Opting-Out:</strong> Bei geringem Gewinn (unter ~6.221 €/Jahr) und
                    unter 42.000 € Umsatz kannst du dich von der SVS-Pflichtversicherung befreien lassen</li>
                </ul>
                <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-700">
                  <p className="text-amber-200 text-sm mb-0">
                    <strong>Achtung:</strong> Ohne Vorsteuerabzug! Rechne durch, ob die Regelung bei dir mehr spart als sie kostet.
                    Bei hohen Investitionen (mit viel Vorsteuer) lohnt sich die Regelung meist nicht.
                  </p>
                </div>
              </div>

              {/* Strategie 6 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  6. Pauschalierung nutzen (§ 17 EStG)
                </h3>
                <p className="mb-4">
                  Bei bestimmten Tätigkeiten kannst du deine Betriebsausgaben pauschal ansetzen, statt
                  jeden Beleg einzeln zu erfassen. Das kann zu einem niedrigeren steuerlichen Gewinn führen.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border border-slate-700 rounded-lg text-sm">
                    <thead className="bg-slate-800">
                      <tr>
                        <th className="p-3 text-left text-white border-r border-slate-700">Pauschalierung</th>
                        <th className="p-3 text-left text-white border-r border-slate-700">Pauschalsatz</th>
                        <th className="p-3 text-left text-white">Voraussetzung</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-700">
                        <td className="p-3 border-r border-slate-700">Basispauschalierung (Dienstleistung)</td>
                        <td className="p-3 border-r border-slate-700 text-white font-semibold">6% der Einnahmen</td>
                        <td className="p-3">Keine Buchführungspflicht, max. 220.000 € Umsatz</td>
                      </tr>
                      <tr className="border-t border-slate-700 bg-slate-900/50">
                        <td className="p-3 border-r border-slate-700">Basispauschalierung (Handel/Produktion)</td>
                        <td className="p-3 border-r border-slate-700 text-white font-semibold">12% der Einnahmen</td>
                        <td className="p-3">Keine Buchführungspflicht, max. 220.000 € Umsatz</td>
                      </tr>
                      <tr className="border-t border-slate-700">
                        <td className="p-3 border-r border-slate-700">Kleinunternehmerpauschalierung</td>
                        <td className="p-3 border-r border-slate-700 text-white font-semibold">45% (Dienstl.) / 20% (Handel)</td>
                        <td className="p-3">Umsatz unter 42.000 €, KU-Regelung genutzt</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-sm mb-0">
                    <strong className="text-white">SVS-Effekt:</strong> Bei der Kleinunternehmerpauschalierung (45% Dienstleistung)
                    sinkt der Gewinn bei 35.000 € Umsatz von 35.000 € auf 19.250 € — SVS-Ersparnis: ~4.225 €/Jahr.
                  </p>
                </div>
              </div>

              {/* Strategie 7 */}
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  7. GmbH-Gründung erwägen (ab höherem Gewinn)
                </h3>
                <p className="mb-4">
                  Ab einem Gewinn von ca. <strong className="text-white">60.000–80.000 €</strong> kann eine GmbH (oder FlexKap seit 2024)
                  steuerlich und sozialversicherungsrechtlich vorteilhaft sein.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-white mb-2">SV-Vorteile der GmbH</h4>
                    <ul className="text-sm space-y-1">
                      <li>• ASVG statt SVS (~22,8% statt ~27%)</li>
                      <li>• Kein Nachzahlungsrisiko</li>
                      <li>• Arbeitslosenversicherung inklusive</li>
                      <li>• Besseres Krankengeld (ab Tag 4)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-white mb-2">Steuervorteile</h4>
                    <ul className="text-sm space-y-1">
                      <li>• KöSt nur 23% (statt bis 55% ESt)</li>
                      <li>• Thesaurierung: nur 23% auf Gewinn</li>
                      <li>• FlexKap: nur 10.000 € Stammkapital</li>
                      <li>• Haftungsbeschränkung</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-700">
                  <p className="text-amber-200 text-sm mb-0">
                    <strong>Beachte:</strong> Die GmbH verursacht laufende Mehrkosten von 6.000–16.000 €/Jahr
                    (Bilanzierung, Steuerberatung, Mindest-KöSt). Diese müssen durch die Steuer- und SV-Ersparnis überkompensiert werden.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Opting-Out SVS */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Sonderfall: Opting-Out aus der SVS-Pflichtversicherung
            </h2>

            <p className="mb-6">
              Unter bestimmten Voraussetzungen kannst du dich von der SVS-Pflichtversicherung befreien lassen
              (sog. <strong className="text-white">Opting-Out</strong> nach § 4 Abs 1 Z 7 GSVG):
            </p>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Voraussetzungen für Opting-Out</h3>
              <ul className="space-y-3">
                <li><strong className="text-white">Umsatz unter 42.000 €/Jahr</strong> (Kleinunternehmergrenze)</li>
                <li><strong className="text-white">Einkünfte unter 6.221,28 €/Jahr</strong> (Versicherungsgrenze 2026)</li>
                <li><strong className="text-white">Keine andere Pflichtversicherung</strong> fehlt (z.B. ASVG durch Anstellung)</li>
                <li>Antrag innerhalb der Frist bei der SVS</li>
              </ul>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700">
              <p className="text-amber-200 mb-0">
                <strong>Wichtig:</strong> Opting-Out bedeutet keinen Krankenversicherungsschutz über die SVS!
                Du brauchst dann eine andere Absicherung (z.B. Mitversicherung beim Partner, private KV).
                Die Pensionsversicherung entfällt ebenfalls — das hat langfristige Auswirkungen auf deine Pension.
              </p>
            </div>
          </section>

          {/* Nebenberuflich selbständig */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Nebenberuflich selbständig: Differenzvorschreibung
            </h2>

            <p className="mb-6">
              Wenn du hauptberuflich angestellt bist und nebenberuflich selbständig, zahlst du
              <strong className="text-white"> sowohl ASVG- als auch SVS-Beiträge</strong>. Die SVS berücksichtigt
              dabei deine ASVG-Beitragsgrundlage — es gibt eine sogenannte Differenzvorschreibung.
            </p>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">So funktioniert die Differenzvorschreibung</h3>
              <ul className="space-y-3">
                <li>
                  <strong className="text-white">Pensionsversicherung:</strong> Die SVS berechnet die PV-Beiträge
                  nur auf den Gewinn, der die Differenz zwischen deiner ASVG-Beitragsgrundlage und der
                  Höchstbeitragsgrundlage ausmacht. Übersteigt dein ASVG-Gehalt bereits die Höchstgrundlage,
                  zahlst du keine PV an die SVS.
                </li>
                <li>
                  <strong className="text-white">Krankenversicherung:</strong> Volle KV-Beiträge (6,80%) auf den Gewinn,
                  da KV separat gerechnet wird.
                </li>
                <li>
                  <strong className="text-white">Rückerstattung möglich:</strong> Wenn die Summe aus ASVG- und GSVG-Beiträgen
                  die Höchstbeitragsgrundlage überschreitet, gibt es eine Rückerstattung nach Bescheid.
                </li>
              </ul>
            </div>

            <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700">
              <p className="text-blue-200 mb-0">
                <strong>Tipp:</strong> Nutze unseren <Link href="/misch-einkommen" className="text-blue-400 hover:text-blue-300 underline">Misch-Einkommen Rechner</Link>,
                um deine kombinierte SV-Belastung aus Anstellung und Selbständigkeit exakt zu berechnen.
              </p>
            </div>
          </section>

          {/* Was NICHT tun */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Was du NICHT tun solltest
            </h2>

            <div className="bg-red-900/20 border border-red-700 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-red-300 mb-2">
                    Einkommen künstlich drücken
                  </h3>
                  <p>
                    Scheinselbständigkeit, überhöhte Betriebsausgaben oder fiktive Rechnungen
                    sind Steuerbetrug und führen zu Nachzahlungen plus Strafen. Finanzamt und SVS
                    tauschen Daten aus — Ungereimtheiten fallen auf.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-red-300 mb-2">
                    SVS-Beiträge nicht zahlen
                  </h3>
                  <p>
                    Säumniszuschläge (2% pro Monat), Verzugszinsen und Zwangsvollstreckung machen
                    das Problem nur größer. Bei Zahlungsschwierigkeiten: sofort Ratenzahlung bei der SVS beantragen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-red-300 mb-2">
                    Opting-Out ohne Alternative
                  </h3>
                  <p className="mb-0">
                    Wer sich von der SVS befreit und keine andere Absicherung hat, riskiert im Krankheitsfall
                    hohe Kosten und verliert Pensionsansprüche. Immer erst eine Alternative sicherstellen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-lg text-center border border-blue-700">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Berechne deine optimalen SVS-Beiträge
              </h2>
              <p className="text-slate-300 mb-6">
                Nutze unseren kostenlosen Rechner, um herauszufinden,
                wie viel du bei deinen SVS-Beiträgen sparen kannst.
              </p>
              <Button asChild>
                <Link
                  href="/rechner"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Jetzt SVS-Beiträge berechnen
                </Link>
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Häufige Fragen (FAQ)</h2>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Sind SVS-Beiträge steuerlich absetzbar?</h3>
                <p className="mb-0">
                  Ja! SVS-Beiträge sind als <strong className="text-white">Betriebsausgabe</strong> voll absetzbar
                  und senken dadurch deinen zu versteuernden Gewinn. Bei einem Grenzsteuersatz von 42% sparst du
                  also 42 Cent Einkommensteuer pro Euro SVS-Beitrag. Beispiel: 15.000 € SVS → 6.300 € ESt-Ersparnis.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Wann bekomme ich eine SVS-Nachzahlung?</h3>
                <p className="mb-0">
                  Wenn dein tatsächlicher Gewinn höher ist als die Basis, auf der die SVS vorläufige Beiträge berechnet hat.
                  Die SVS nutzt den Gewinn von vor 3 Jahren als vorläufige Grundlage. Steigt dein Einkommen, folgt
                  eine Nachzahlung — teilweise mehrere Tausend Euro. Mehr dazu in unserem Artikel{' '}
                  <Link href="/steuerwissen/svs-nachzahlung-vermeiden" className="text-blue-400 hover:text-blue-300 underline">
                    SVS-Nachzahlung vermeiden
                  </Link>.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Kann ich meine SVS-Beiträge in Raten zahlen?</h3>
                <p className="mb-0">
                  Ja. Bei Zahlungsschwierigkeiten kannst du bei der SVS eine <strong className="text-white">Ratenzahlung</strong> beantragen.
                  In der Regel wird eine Laufzeit von bis zu 12 Monaten gewährt. Wichtig: Stelle den Antrag
                  rechtzeitig, bevor Säumniszuschläge anfallen.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Was ist der Unterschied zwischen SVS und ASVG?</h3>
                <p className="mb-0">
                  Die SVS versichert Selbständige (GSVG), das ASVG versichert Angestellte. Hauptunterschiede:
                  SVS-Beiträge werden auf den Gewinn berechnet (mit Verzögerung), ASVG auf das laufende Gehalt.
                  ASVG bietet Arbeitslosenversicherung und besseres Krankengeld. Wer eine GmbH gründet und sich als
                  GF anstellt, wechselt von SVS zu ASVG.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Gibt es eine Höchstgrenze für SVS-Beiträge?</h3>
                <p className="mb-0">
                  Ja. Die Höchstbeitragsgrundlage liegt 2026 bei <strong className="text-white">84.840 €/Jahr</strong> (7.070 €/Monat).
                  Auch wenn dein Gewinn höher ist, zahlst du maximal ca. 22.788 €/Jahr an SVS (PV + KV + SV + UV).
                  Gewinne über der Höchstbeitragsgrundlage sind SVS-frei.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Wie kann ich als Jungunternehmer SVS sparen?</h3>
                <p className="mb-0">
                  In den ersten 2 Kalenderjahren der Selbständigkeit gelten <strong className="text-white">reduzierte Mindestbeiträge</strong>.
                  Die SVS nimmt eine niedrigere vorläufige Beitragsgrundlage an. Achtung: Wenn dein tatsächlicher
                  Gewinn höher ist, kommt die Nachzahlung trotzdem — nur eben erst nach dem Steuerbescheid.
                </p>
              </div>
            </div>
          </section>

          {/* Zusammenfassung */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-6">Zusammenfassung</h2>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
              <p className="mb-4">
                SVS-Beiträge lassen sich durch legale Strategien deutlich reduzieren. Die wichtigsten Hebel:
              </p>
              <ul className="space-y-2 mb-4">
                <li><strong className="text-white">Gewinnfreibetrag:</strong> Bis 4.950 € weniger Beitragsgrundlage (automatisch)</li>
                <li><strong className="text-white">Betriebsausgaben:</strong> Jeder Euro senkt die SVS um ~27 Cent</li>
                <li><strong className="text-white">Investitionsfreibetrag:</strong> 15%/20% zusätzlicher Abzug bei Investitionen</li>
                <li><strong className="text-white">Pauschalierung:</strong> Bis zu 45% pauschale Betriebsausgaben</li>
                <li><strong className="text-white">GmbH/FlexKap:</strong> Ab 60.000–80.000 € Gewinn steuerlich und SV-seitig vorteilhaft</li>
              </ul>
              <p className="mb-0">
                Entscheidend ist, dass du alle Möglichkeiten ausschöpfst, die das österreichische Steuerrecht bietet —
                ohne dabei Risiken einzugehen. Lass dich individuell beraten, welche Kombination für deine Situation optimal ist.
              </p>
            </div>
          </section>

          <ArticleFooter
            breadcrumbs={[
              { name: 'Home', href: '/' },
              { name: 'Steuerwissen', href: '/steuerwissen' },
              { name: 'SVS-Beiträge senken', href: '/steuerwissen/svs-beitraege-senken' },
            ]}
            sources={[
              { name: 'SVS — Beitragssätze für Selbständige', url: 'https://www.svs.at/cdscontent/?contentid=10007.816984', description: 'Offizielle SVS-Seite — Aktuelle Beitragssätze und Beitragsgrundlagen' },
              { name: 'GSVG — Gewerbliches Sozialversicherungsgesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10008442', description: 'Rechtsinformationssystem des Bundes (RIS)' },
              { name: 'EStG § 10 — Gewinnfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS) — Einkommensteuergesetz' },
              { name: 'EStG § 11 — Investitionsfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'RIS — Investitionsfreibetrag' },
              { name: 'WKO — Sozialversicherung für Selbständige', url: 'https://www.wko.at/sozialversicherung', description: 'Wirtschaftskammer Österreich — SVS-Übersicht' },
            ]}
            relatedArticles={[
              { title: 'SVS-Nachzahlung vermeiden — Strategien gegen die Nachzahlungsfalle', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
              { title: 'Gewinnfreibetrag 2026 — Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              { title: 'GmbH vs. Einzelunternehmen — Der Steuer-Vergleich', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
            ]}
          />
        </article>
      </div>
    </div>
  )
}
