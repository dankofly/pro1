import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'
import { SiteFooter } from '@/components/site-footer'

export default function SvsBeitraegeSenkenPage() {
  return (
    <PublicShell>
    <div className="min-h-screen bg-sb-bg text-sb-mut">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/steuerwissen" className="text-sb-mut hover:text-sb-text transition-colors">
                Steuerwissen
              </Link>
            </li>
            <li className="text-sb-dim">/</li>
            <li className="text-sb-text">SVS-Beiträge senken</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-sb-text mb-6 leading-tight">
              SVS-Beiträge senken — 7 legale Strategien für Selbständige in Österreich
            </h1>
            <p className="text-xl text-sb-mut leading-relaxed">
              SVS-Beiträge sind für viele Selbständige der größte laufende Kostenblock — bis zu rund 26.200 €/Jahr (2026) bei hohen Gewinnen.
              Mit den richtigen Strategien lassen sich mehrere Tausend Euro jährlich einsparen. Hier sind 7 legale Wege,
              um deine SVS-Beiträge in Österreich zu reduzieren.
            </p>
          </header>

          {/* AI Overview Box */}
          <div className="bg-sb-accent-soft border border-sb-accent/30 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-sb-accent mb-3">Kurzantwort</h2>
            <p className="text-sb-mut mb-0">
              SVS-Beiträge für Selbständige betragen ca. <strong className="text-sb-text">26,83% des Gewinns</strong> (PV 18,50% + KV 6,80% + SV 1,53% + UV pauschal).
              Die wichtigsten Strategien zur Senkung: <strong className="text-sb-text">Gewinnfreibetrag</strong> (bis 4.950 € weniger Beitragsgrundlage),
              <strong className="text-sb-text">optimierte Betriebsausgaben</strong>, <strong className="text-sb-text">Investitionsfreibetrag</strong> (regulär 10%/15%, befristet bis Ende 2026: 20%/22% nach § 11 EStG),
              und bei hohen Gewinnen der <strong className="text-sb-text">Wechsel zur GmbH</strong> (23% KöSt statt bis zu 55% ESt).
            </p>
          </div>

          {/* Zusammensetzung SVS-Beiträge */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Wie setzen sich SVS-Beiträge zusammen?
            </h2>

            <p className="mb-6">
              Die SVS (Sozialversicherung der Selbständigen) berechnet deine Beiträge auf Basis deines Gewinns
              aus dem Einkommensteuerbescheid. In den ersten Jahren werden vorläufige Beiträge auf Basis älterer
              Bescheide vorgeschrieben — die endgültige Abrechnung erfolgt mit bis zu 3 Jahren Verzögerung.
            </p>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <h3 className="text-xl font-semibold text-sb-text mb-4">Beitragssätze 2026</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-sb-line">
                  <span>Pensionsversicherung (PV)</span>
                  <strong className="text-sb-text">18,50%</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-sb-line">
                  <span>Krankenversicherung (KV)</span>
                  <strong className="text-sb-text">6,80%</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-sb-line">
                  <span>Selbständigenvorsorge (SV)</span>
                  <strong className="text-sb-text">1,53%</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-sb-line">
                  <span>Unfallversicherung (UV)</span>
                  <strong className="text-sb-text">12,95 €/Monat (pauschal, 2026)</strong>
                </div>
                <div className="flex justify-between items-center py-2 font-semibold">
                  <span className="text-sb-text">Gesamt (ohne UV)</span>
                  <strong className="text-sb-text">26,83%</strong>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Beitragsgrenzen 2026</h3>
                <ul className="space-y-2">
                  <li><strong className="text-sb-text">Mindestbeitragsgrundlage:</strong> 551,10 €/Monat</li>
                  <li><strong className="text-sb-text">Höchstbeitragsgrundlage:</strong> 8.085 €/Monat</li>
                  <li><strong className="text-sb-text">Mindest-SVS/Jahr:</strong> ~1.930 € (PV+KV+SV+UV)</li>
                  <li><strong className="text-sb-text">Höchst-SVS/Jahr:</strong> ~26.186 € (PV+KV+SV+UV)</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Sonderfälle</h3>
                <ul className="space-y-2">
                  <li><strong className="text-sb-text">Jungunternehmer:</strong> KV in den ersten 2 Kalenderjahren auf der Mindestgrundlage fixiert, keine KV-Nachbemessung</li>
                  <li><strong className="text-sb-text">Nebenberuflich:</strong> Differenzvorschreibung wenn auch ASVG-versichert</li>
                  <li><strong className="text-sb-text">Opting-Out KV:</strong> Möglich bei geringem Einkommen</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-accent/40">
              <h4 className="text-lg font-semibold text-sb-text mb-2">Rechenbeispiel: SVS-Beiträge bei 60.000 € Gewinn</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Jahresgewinn</span><span className="text-sb-text">60.000 €</span></div>
                <div className="flex justify-between"><span>PV (18,50%)</span><span className="text-sb-red">−11.100 €</span></div>
                <div className="flex justify-between"><span>KV (6,80%)</span><span className="text-sb-red">−4.080 €</span></div>
                <div className="flex justify-between"><span>SV (1,53%)</span><span className="text-sb-red">−918 €</span></div>
                <div className="flex justify-between"><span>UV (pauschal)</span><span className="text-sb-red">−155 €</span></div>
                <div className="flex justify-between border-t border-sb-line pt-2 font-semibold">
                  <span className="text-sb-text">SVS-Beiträge gesamt</span>
                  <span className="text-sb-red">16.253 €/Jahr</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-sb-text">Pro Monat</span>
                  <span className="text-sb-red">~1.354 €</span>
                </div>
                <p className="text-xs text-sb-dim pt-2 mb-0">
                  Vereinfachte Rechnung: Die endgültige Beitragsgrundlage ist der Gewinn laut Steuerbescheid plus die
                  vorgeschriebenen SV-Beiträge (§ 25 Abs 2 GSVG). Die tatsächlichen Beiträge liegen daher etwas höher.
                </p>
              </div>
            </div>
          </section>

          {/* 7 Strategien */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-8">
              7 legale Strategien, um SVS-Beiträge zu senken
            </h2>

            <div className="space-y-8">
              {/* Strategie 1 */}
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-bold mb-3 text-sb-green">
                  1. Gewinnfreibetrag nutzen (§ 10 EStG)
                </h3>
                <p className="mb-4">
                  Der Gewinnfreibetrag reduziert deinen steuerlichen Gewinn und damit auch die SVS-Beitragsgrundlage.
                  Der Grundfreibetrag (15% auf die ersten 33.000 € Gewinn, max. 4.950 €) wird automatisch gewährt.
                </p>
                <div className="bg-white/[0.05] p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-sb-text mb-2">Konkrete Ersparnis</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong className="text-sb-text">Bei 40.000 € Gewinn:</strong> GFB = 4.950 € → SVS-Ersparnis = ~1.328 €/Jahr</li>
                    <li><strong className="text-sb-text">Bei 60.000 € Gewinn:</strong> GFB = 4.950 € + invest. GFB → SVS-Ersparnis = ~1.328 € + ESt-Ersparnis</li>
                    <li><strong className="text-sb-text">Bei 100.000 € Gewinn:</strong> Zusätzlich investitionsbedingter GFB (13%) → deutlich höhere Gesamtersparnis</li>
                  </ul>
                </div>
              </div>

              {/* Strategie 2 */}
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-bold mb-3 text-sb-green">
                  2. Betriebsausgaben systematisch optimieren
                </h3>
                <p className="mb-4">
                  Jede steuerlich absetzbare Betriebsausgabe reduziert deinen Gewinn und damit die SVS-Beitragsgrundlage.
                  Viele Selbständige verschenken hier Geld, weil sie absetzbare Kosten übersehen.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-sb-text mb-2">Häufig übersehene Ausgaben</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Arbeitszimmer (anteilig Miete, Strom, Heizung)</li>
                      <li>• Fortbildungskosten und Fachliteratur</li>
                      <li>• Geschäftsessen (50% absetzbar)</li>
                      <li>• Internet + Telefon (anteilig, z.B. 50%)</li>
                      <li>• Reisekosten (Kilometergeld 0,50 €/km)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-sb-text mb-2">Größere Posten</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Büroausstattung und Möbel</li>
                      <li>• Software-Abos und Cloud-Dienste</li>
                      <li>• KFZ-Kosten (Fahrtenbuch oder Pauschale)</li>
                      <li>• Versicherungen (Berufshaftpflicht etc.)</li>
                      <li>• SVS-Beiträge selbst (als Betriebsausgabe!)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-white/[0.05] p-4 rounded-lg">
                  <p className="text-sm mb-0">
                    <strong className="text-sb-text">Beispiel:</strong> 5.000 € zusätzliche Betriebsausgaben senken die SVS-Beiträge
                    um ca. <strong className="text-sb-text">1.342 €/Jahr</strong> (5.000 × 26,83%).
                  </p>
                </div>
              </div>

              {/* Strategie 3 */}
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-bold mb-3 text-sb-green">
                  3. Investitionsfreibetrag anwenden (§ 11 EStG)
                </h3>
                <p className="mb-4">
                  Bei Anschaffung oder Herstellung von abnutzbaren Wirtschaftsgütern des Anlagevermögens
                  kannst du zusätzlich zur normalen Abschreibung (AfA) einen Investitionsfreibetrag geltend machen:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/[0.05] p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-sb-text mb-2">Allgemeiner IFB</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong className="text-sb-text">10% der Anschaffungskosten</strong> (befristet 1.11.2025 bis 31.12.2026: 20%)</li>
                      <li>• Max. Bemessungsgrundlage: 1.000.000 €/Jahr</li>
                      <li>• Max. IFB: 100.000 €/Jahr (befristet: 200.000 €)</li>
                    </ul>
                  </div>
                  <div className="bg-white/[0.05] p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-sb-green mb-2">Ökologischer IFB</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong className="text-sb-text">15% der Anschaffungskosten</strong> (befristet bis 31.12.2026: 22%)</li>
                      <li>• Für klimafreundliche Investitionen</li>
                      <li>• Z.B. E-Auto, Photovoltaik, Wärmepumpe</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white/[0.05] p-4 rounded-lg">
                  <p className="text-sm mb-0">
                    <strong className="text-sb-text">Beispiel:</strong> Kauf eines Laptops für 2.000 € → IFB 20% (befristeter Satz bis Ende 2026) = 400 € zusätzlicher Abzug.
                    Das senkt die SVS-Beiträge um ~107 €. Bei einer E-Auto-Anschaffung (40.000 €) → Öko-IFB 22% = 8.800 € → SVS-Ersparnis ~2.361 €.
                  </p>
                </div>
              </div>

              {/* Strategie 4 */}
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-bold mb-3 text-sb-green">
                  4. Vorläufige Beitragsgrundlage herabsetzen (§ 25a Abs 5 GSVG)
                </h3>
                <p className="mb-4">
                  Wenn du erwartest, dass dein Gewinn dieses Jahr deutlich unter dem Vorjahr liegt, kannst du
                  bei der SVS einen <strong className="text-sb-text">Antrag auf Herabsetzung der vorläufigen Beitragsgrundlage</strong> stellen.
                </p>
                <div className="bg-white/[0.05] p-4 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold text-sb-text mb-2">So gehst du vor</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Antrag an die SVS stellen (formlos oder über SVS-Portal)</li>
                    <li>Glaubhaftmachung des niedrigeren Gewinns (z.B. Zwischenbilanz, Auftragslage)</li>
                    <li>SVS setzt vorläufige Beiträge auf Basis des beantragten Gewinns fest</li>
                    <li>Endabrechnung erfolgt nach Einkommensteuerbescheid</li>
                  </ol>
                </div>
                <div className="bg-sb-accent-soft p-4 rounded-lg border border-sb-accent/30">
                  <p className="text-sb-mut text-sm mb-0">
                    <strong>Achtung:</strong> Setzt du die Beiträge zu niedrig an, folgt bei der Nachbemessung eine entsprechend höhere Nachzahlung.
                    Lieber konservativ schätzen — eine Rückzahlung bei zu hohen Beiträgen gibt es ebenfalls.
                  </p>
                </div>
              </div>

              {/* Strategie 5 */}
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-bold mb-3 text-sb-green">
                  5. Kleinunternehmerregelung prüfen (§ 6 Abs 1 Z 27 UStG)
                </h3>
                <p className="mb-4">
                  Wenn dein Jahresumsatz unter <strong className="text-sb-text">55.000 €</strong> (brutto, Grenze seit 2025) liegt, kannst du die
                  Kleinunternehmerregelung nutzen. Das spart zwar nicht direkt SVS, hat aber indirekte Vorteile:
                </p>
                <ul className="space-y-2 mb-4">
                  <li><strong className="text-sb-text">Weniger Verwaltungsaufwand:</strong> Keine UVA-Meldungen, vereinfachte Buchhaltung</li>
                  <li><strong className="text-sb-text">Effekt auf Pricing:</strong> Da du keine USt ausweist, kannst du bei B2C-Kunden
                    günstiger kalkulieren und gleichzeitig die gleiche Marge halten</li>
                  <li><strong className="text-sb-text">SVS-Opting-Out:</strong> Bei geringen Einkünften (unter 6.613,20 €/Jahr, Wert 2026) und
                    unter 55.000 € Umsatz kannst du dich von der SVS-Pflichtversicherung befreien lassen</li>
                </ul>
                <div className="bg-sb-accent-soft p-4 rounded-lg border border-sb-accent/30">
                  <p className="text-sb-mut text-sm mb-0">
                    <strong>Achtung:</strong> Ohne Vorsteuerabzug! Rechne durch, ob die Regelung bei dir mehr spart als sie kostet.
                    Bei hohen Investitionen (mit viel Vorsteuer) lohnt sich die Regelung meist nicht.
                  </p>
                </div>
              </div>

              {/* Strategie 6 */}
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-bold mb-3 text-sb-green">
                  6. Pauschalierung nutzen (§ 17 EStG)
                </h3>
                <p className="mb-4">
                  Bei bestimmten Tätigkeiten kannst du deine Betriebsausgaben pauschal ansetzen, statt
                  jeden Beleg einzeln zu erfassen. Das kann zu einem niedrigeren steuerlichen Gewinn führen.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border border-sb-line rounded-lg text-sm">
                    <thead className="bg-white/[0.05]">
                      <tr>
                        <th className="p-3 text-left text-sb-text border-r border-sb-line">Pauschalierung</th>
                        <th className="p-3 text-left text-sb-text border-r border-sb-line">Pauschalsatz</th>
                        <th className="p-3 text-left text-sb-text">Voraussetzung</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-sb-line">
                        <td className="p-3 border-r border-sb-line">Basispauschalierung (allgemein)</td>
                        <td className="p-3 border-r border-sb-line text-sb-text font-semibold">15% der Einnahmen (2026)</td>
                        <td className="p-3">Keine Buchführungspflicht, max. 420.000 € Umsatz</td>
                      </tr>
                      <tr className="border-t border-sb-line bg-sb-deep">
                        <td className="p-3 border-r border-sb-line">Basispauschalierung (Beratung, Aufsichtsrat, schriftstellerische/unterrichtende Tätigkeit)</td>
                        <td className="p-3 border-r border-sb-line text-sb-text font-semibold">6% der Einnahmen</td>
                        <td className="p-3">Keine Buchführungspflicht, max. 420.000 € Umsatz</td>
                      </tr>
                      <tr className="border-t border-sb-line">
                        <td className="p-3 border-r border-sb-line">Kleinunternehmerpauschalierung</td>
                        <td className="p-3 border-r border-sb-line text-sb-text font-semibold">45% (Dienstleistungsbetriebe: 20%)</td>
                        <td className="p-3">Umsatz bis 55.000 €, KU-Regelung genutzt</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-white/[0.05] p-4 rounded-lg">
                  <p className="text-sm mb-0">
                    <strong className="text-sb-text">SVS-Effekt:</strong> Bei der Kleinunternehmerpauschalierung (45%, z.B. Handel)
                    sinkt der Gewinn bei 35.000 € Umsatz von 35.000 € auf 19.250 €: SVS-Ersparnis ~4.225 €/Jahr.
                    Dienstleistungsbetriebe erhalten 20% Pauschale (Gewinn 28.000 €, Ersparnis ~1.878 €/Jahr).
                  </p>
                </div>
              </div>

              {/* Strategie 7 */}
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-bold mb-3 text-sb-green">
                  7. GmbH-Gründung erwägen (ab höherem Gewinn)
                </h3>
                <p className="mb-4">
                  Ab einem Gewinn von ca. <strong className="text-sb-text">60.000–80.000 €</strong> kann eine GmbH (oder FlexKap seit 2024)
                  steuerlich und sozialversicherungsrechtlich vorteilhaft sein.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/[0.05] p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-sb-text mb-2">SV-Vorteile der GmbH</h4>
                    <ul className="text-sm space-y-1">
                      <li>• ASVG statt SVS: nur bei GF-Beteiligung bis 25% (ab 50% bleibt GSVG)</li>
                      <li>• Kein Nachzahlungsrisiko</li>
                      <li>• Arbeitslosenversicherung inklusive</li>
                      <li>• Besseres Krankengeld (ab Tag 4)</li>
                    </ul>
                  </div>
                  <div className="bg-white/[0.05] p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-sb-text mb-2">Steuervorteile</h4>
                    <ul className="text-sm space-y-1">
                      <li>• KöSt nur 23% (statt bis 55% ESt)</li>
                      <li>• Thesaurierung: nur 23% auf Gewinn</li>
                      <li>• FlexKap: nur 10.000 € Stammkapital</li>
                      <li>• Haftungsbeschränkung</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-sb-accent-soft p-4 rounded-lg border border-sb-accent/30">
                  <p className="text-sb-mut text-sm mb-0">
                    <strong>Beachte:</strong> Die GmbH verursacht laufende Mehrkosten von 6.000–16.000 €/Jahr
                    (Bilanzierung, Steuerberatung, Mindest-KöSt). Diese müssen durch die Steuer- und SV-Ersparnis überkompensiert werden.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Opting-Out SVS */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Sonderfall: Opting-Out aus der SVS-Pflichtversicherung
            </h2>

            <p className="mb-6">
              Unter bestimmten Voraussetzungen kannst du dich von der SVS-Pflichtversicherung befreien lassen
              (sog. <strong className="text-sb-text">Opting-Out</strong> nach § 4 Abs 1 Z 7 GSVG):
            </p>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <h3 className="text-lg font-semibold text-sb-text mb-4">Voraussetzungen für Opting-Out</h3>
              <ul className="space-y-3">
                <li><strong className="text-sb-text">Umsatz unter 55.000 €/Jahr</strong> (Kleinunternehmergrenze, brutto)</li>
                <li><strong className="text-sb-text">Einkünfte unter 6.613,20 €/Jahr</strong> (Versicherungsgrenze 2026)</li>
                <li><strong className="text-sb-text">Max. 12 Monate GSVG-Pflichtversicherung in den letzten 60 Kalendermonaten</strong> (alternativ: Regelpensionsalter erreicht oder Alter 57+ mit erfüllten Voraussetzungen in den letzten 5 Jahren)</li>
                <li>Antrag innerhalb der Frist bei der SVS</li>
              </ul>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Wichtig:</strong> Opting-Out bedeutet keinen Krankenversicherungsschutz über die SVS!
                Du brauchst dann eine andere Absicherung (z.B. Mitversicherung beim Partner, private KV).
                Die Pensionsversicherung entfällt ebenfalls — das hat langfristige Auswirkungen auf deine Pension.
              </p>
            </div>
          </section>

          {/* Nebenberuflich selbständig */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Nebenberuflich selbständig: Differenzvorschreibung
            </h2>

            <p className="mb-6">
              Wenn du hauptberuflich angestellt bist und nebenberuflich selbständig, zahlst du
              <strong className="text-sb-text"> sowohl ASVG- als auch SVS-Beiträge</strong>. Die SVS berücksichtigt
              dabei deine ASVG-Beitragsgrundlage — es gibt eine sogenannte Differenzvorschreibung.
            </p>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <h3 className="text-lg font-semibold text-sb-text mb-4">So funktioniert die Differenzvorschreibung</h3>
              <ul className="space-y-3">
                <li>
                  <strong className="text-sb-text">Unter der Höchstbeitragsgrundlage:</strong> Du zahlst volle SVS-Beiträge
                  (PV und KV) auf den Gewinn, zusätzlich zu den ASVG-Beiträgen aus dem Gehalt.
                </li>
                <li>
                  <strong className="text-sb-text">Über der Höchstbeitragsgrundlage:</strong> Übersteigt die Summe aus
                  ASVG-Beitragsgrundlage und Gewinn die Höchstbeitragsgrundlage (2026: 97.020 €/Jahr), schreibt die SVS
                  seit 2020 automatisch nur die Differenz vor (Differenzvorschreibung, ohne Antrag).
                </li>
                <li>
                  <strong className="text-sb-text">Rückerstattung automatisch:</strong> Trotzdem zu viel gezahlte
                  PV-Beiträge erstattet die SVS automatisch bis 30.6. des Folgejahres (GSVG-Beiträge zur Gänze,
                  ASVG-Anteil mit ca. 45% des Überschreitungsbetrags).
                </li>
              </ul>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Tipp:</strong> Nutze unseren <Link href="/misch-einkommen" className="text-sb-accent hover:text-sb-accent-deep underline">Misch-Einkommen Rechner</Link>,
                um deine kombinierte SV-Belastung aus Anstellung und Selbständigkeit exakt zu berechnen.
              </p>
            </div>
          </section>

          {/* Was NICHT tun */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">
              Was du NICHT tun solltest
            </h2>

            <div className="bg-sb-red/10 border border-sb-red/30 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sb-red mb-2">
                    Einkommen künstlich drücken
                  </h3>
                  <p>
                    Scheinselbständigkeit, überhöhte Betriebsausgaben oder fiktive Rechnungen
                    sind Steuerbetrug und führen zu Nachzahlungen plus Strafen. Finanzamt und SVS
                    tauschen Daten aus — Ungereimtheiten fallen auf.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sb-red mb-2">
                    SVS-Beiträge nicht zahlen
                  </h3>
                  <p>
                    Verzugszinsen (2026: 5,53% pro Jahr) und Zwangsvollstreckung machen
                    das Problem nur größer. Bei Zahlungsschwierigkeiten: sofort Ratenzahlung bei der SVS beantragen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sb-red mb-2">
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
            <div className="bg-sb-accent-soft p-8 rounded-lg text-center border border-sb-accent/30">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Berechne deine optimalen SVS-Beiträge
              </h2>
              <p className="text-sb-mut mb-6">
                Nutze unseren kostenlosen Rechner, um herauszufinden,
                wie viel du bei deinen SVS-Beiträgen sparen kannst.
              </p>
              <Button asChild>
                <Link
                  href="/rechner"
                  className="inline-flex items-center px-6 py-3 bg-sb-accent hover:bg-sb-accent-deep text-sb-accent-ink font-semibold rounded-lg transition-colors"
                >
                  Jetzt SVS-Beiträge berechnen
                </Link>
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Häufige Fragen (FAQ)</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Sind SVS-Beiträge steuerlich absetzbar?</h3>
                <p className="mb-0">
                  Ja! SVS-Beiträge sind als <strong className="text-sb-text">Betriebsausgabe</strong> voll absetzbar
                  und senken dadurch deinen zu versteuernden Gewinn. Bei einem Grenzsteuersatz von 40% sparst du
                  also 40 Cent Einkommensteuer pro Euro SVS-Beitrag. Beispiel: 15.000 € SVS → 6.000 € ESt-Ersparnis.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Wann bekomme ich eine SVS-Nachzahlung?</h3>
                <p className="mb-0">
                  Wenn dein tatsächlicher Gewinn höher ist als die Basis, auf der die SVS vorläufige Beiträge berechnet hat.
                  Die SVS nutzt den Gewinn von vor 3 Jahren als vorläufige Grundlage. Steigt dein Einkommen, folgt
                  eine Nachzahlung — teilweise mehrere Tausend Euro. Mehr dazu in unserem Artikel{' '}
                  <Link href="/steuerwissen/svs-nachzahlung-vermeiden" className="text-sb-accent hover:text-sb-accent-deep underline">
                    SVS-Nachzahlung vermeiden
                  </Link>.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Kann ich meine SVS-Beiträge in Raten zahlen?</h3>
                <p className="mb-0">
                  Ja. Bei Zahlungsschwierigkeiten kannst du bei der SVS eine <strong className="text-sb-text">Ratenzahlung</strong> beantragen.
                  Nachbelastungen aus der Nachbemessung teilt die SVS ohnehin auf die vier Quartale des Folgejahres auf,
                  aus den ersten drei Jahren der Selbständigkeit auf Antrag auf bis zu zwölf Quartale. Wichtig: Stelle den Antrag
                  rechtzeitig, bevor Verzugszinsen anfallen.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Was ist der Unterschied zwischen SVS und ASVG?</h3>
                <p className="mb-0">
                  Die SVS versichert Selbständige (GSVG), das ASVG versichert Angestellte. Hauptunterschiede:
                  SVS-Beiträge werden auf den Gewinn berechnet (mit Verzögerung), ASVG auf das laufende Gehalt.
                  ASVG bietet Arbeitslosenversicherung und besseres Krankengeld. Gesellschafter-Geschäftsführer einer
                  GmbH sind nur bei einer Beteiligung bis 25% ASVG-versichert; ab 50% bleibt es bei GSVG/SVS,
                  dazwischen entscheidet unter anderem die Sperrminorität.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Gibt es eine Höchstgrenze für SVS-Beiträge?</h3>
                <p className="mb-0">
                  Ja. Die Höchstbeitragsgrundlage liegt 2026 bei <strong className="text-sb-text">97.020 €/Jahr</strong> (8.085 €/Monat).
                  Auch wenn dein Gewinn höher ist, zahlst du maximal ca. 26.186 €/Jahr an SVS (PV + KV + SV + UV).
                  Gewinne über der Höchstbeitragsgrundlage sind SVS-frei.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Wie kann ich als Jungunternehmer SVS sparen?</h3>
                <p className="mb-0">
                  In den ersten 2 Kalenderjahren wird die <strong className="text-sb-text">Krankenversicherung auf Basis der
                  Mindestbeitragsgrundlage berechnet und nicht nachbemessen</strong>. Achtung: Für die Pensionsversicherung
                  kommt die Nachzahlung trotzdem, sobald der Steuerbescheid vorliegt.
                </p>
              </div>
            </div>
          </section>

          {/* Zusammenfassung */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Zusammenfassung</h2>

            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-green/40">
              <p className="mb-4">
                SVS-Beiträge lassen sich durch legale Strategien deutlich reduzieren. Die wichtigsten Hebel:
              </p>
              <ul className="space-y-2 mb-4">
                <li><strong className="text-sb-text">Gewinnfreibetrag:</strong> Bis 4.950 € weniger Beitragsgrundlage (automatisch)</li>
                <li><strong className="text-sb-text">Betriebsausgaben:</strong> Jeder Euro senkt die SVS um ~27 Cent</li>
                <li><strong className="text-sb-text">Investitionsfreibetrag:</strong> 10%/15%, befristet bis Ende 2026 sogar 20%/22% zusätzlicher Abzug bei Investitionen</li>
                <li><strong className="text-sb-text">Pauschalierung:</strong> Bis zu 45% pauschale Betriebsausgaben</li>
                <li><strong className="text-sb-text">GmbH/FlexKap:</strong> Ab 60.000–80.000 € Gewinn steuerlich und SV-seitig vorteilhaft</li>
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
              { name: 'SVS — Endgültige Beitragsberechnung', url: 'https://www.svs.at/cdscontent/?contentid=10007.816610&portal=svsportal', description: 'Offizielle SVS-Seite zur Beitragsberechnung und Nachbemessung' },
              { name: 'GSVG — Gewerbliches Sozialversicherungsgesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10008442', description: 'Rechtsinformationssystem des Bundes (RIS)' },
              { name: 'EStG § 10 — Gewinnfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS) — Einkommensteuergesetz' },
              { name: 'EStG § 11 — Investitionsfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'RIS — Investitionsfreibetrag' },
              { name: 'WKO — Gewerbliche Sozialversicherungsbeiträge (Werte 2026)', url: 'https://www.wko.at/sozialversicherung/gewerbliche-sozialversicherungsbeitraege-ausmass', description: 'Wirtschaftskammer Österreich — Beitragssätze und Beitragsgrundlagen' },
            ]}
            relatedArticles={[
              { title: 'SVS-Nachzahlung vermeiden: Strategien gegen die Nachzahlungsfalle', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
              { title: 'Gewinnfreibetrag 2026: Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
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
