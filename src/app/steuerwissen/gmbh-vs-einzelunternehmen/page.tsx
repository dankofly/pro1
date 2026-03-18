import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function GmbHvsEinzelunternehmenPage() {
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
            <li className="text-white">GmbH vs. Einzelunternehmen</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              GmbH oder Einzelunternehmen? — Der komplette Steuer-Vergleich für Österreich 2026
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Die Entscheidung zwischen GmbH und Einzelunternehmen ist eine der wichtigsten unternehmerischen Weichenstellungen.
              Ab welchem Gewinn macht der Wechsel von der Einzelunternehmung zur GmbH steuerlich Sinn?
              Hier der komplette Vergleich — mit konkreten Berechnungen, FlexKap-Option und Sozialversicherungs-Analyse.
            </p>
          </header>

          {/* AI Overview Box */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-blue-300 mb-3">Kurzantwort</h2>
            <p className="text-slate-300 mb-0">
              Die GmbH wird ab ca. <strong className="text-white">60.000–80.000 € Jahresgewinn</strong> steuerlich interessant.
              Bei Vollausschüttung beträgt die GmbH-Gesamtbelastung ca. 44,2% (23% KöSt + 27,5% KESt auf den Rest),
              während das Einzelunternehmen ab 100.000 € Gewinn bereits über 48% ESt zahlt — plus ca. 27% SVS-Beiträge.
              Seit 2024 bietet die <strong className="text-white">FlexKap</strong> eine schlankere Alternative zur klassischen GmbH.
            </p>
          </div>

          {/* Steuerliche Unterschiede */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Steuerliche Unterschiede im Detail</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Einzelunternehmen (EPU)</h3>
                <ul className="space-y-3">
                  <li><strong className="text-white">Einkommensteuer (ESt):</strong> Progressiv 0% bis 55% (§ 33 EStG)</li>
                  <li><strong className="text-white">SVS-Beiträge:</strong> Ca. 26,83% auf Beitragsgrundlage (PV 18,50% + KV 6,80% + SV 1,53%)</li>
                  <li><strong className="text-white">Mindest-SVS:</strong> Ca. 1.951 €/Jahr (2026)</li>
                  <li><strong className="text-white">Höchst-SVS:</strong> Ca. 22.788 €/Jahr (2026)</li>
                  <li><strong className="text-white">Buchführung:</strong> E/A-Rechnung bis 700.000 € Umsatz</li>
                  <li><strong className="text-white">Gewinnentnahme:</strong> Jederzeit, steuerfrei</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">GmbH</h3>
                <ul className="space-y-3">
                  <li><strong className="text-white">Körperschaftsteuer (KöSt):</strong> 23% auf Gewinn (§ 22 KStG)</li>
                  <li><strong className="text-white">KESt auf Ausschüttungen:</strong> 27,5% auf Brutto-Dividende</li>
                  <li><strong className="text-white">ASVG-Beiträge (GF):</strong> Ca. 22,8% der Beitragsgrundlage (AG + AN)</li>
                  <li><strong className="text-white">Mindest-KöSt:</strong> 500 €/Quartal = 2.000 €/Jahr</li>
                  <li><strong className="text-white">Buchführung:</strong> Doppelte Buchführung verpflichtend</li>
                  <li><strong className="text-white">Gewinnentnahme:</strong> Nur als Gehalt oder Gewinnausschüttung</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Effektive Gesamtbelastung bei Vollausschüttung</h4>
              <p className="mb-4">
                <strong className="text-white">Einzelunternehmen:</strong> ESt (bis 55%) + SVS (~27%) = <span className="text-red-400 font-semibold">bis zu 75%+</span> bei hohen Gewinnen
              </p>
              <p className="mb-0">
                <strong className="text-white">GmbH:</strong> 23% KöSt + 27,5% KESt auf verbleibende 77% = <span className="text-green-400 font-semibold">ca. 44,2% Gesamtbelastung</span>
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">Einkommensteuer-Tarif 2026 (§ 33 EStG)</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-slate-700 rounded-lg text-sm">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 text-left text-white border-r border-slate-700">Einkommensstufe</th>
                      <th className="p-3 text-left text-white">Steuersatz</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700"><td className="p-3 border-r border-slate-700">0 – 12.816 €</td><td className="p-3">0%</td></tr>
                    <tr className="border-t border-slate-700 bg-slate-900/50"><td className="p-3 border-r border-slate-700">12.816 – 20.818 €</td><td className="p-3">20%</td></tr>
                    <tr className="border-t border-slate-700"><td className="p-3 border-r border-slate-700">20.818 – 34.513 €</td><td className="p-3">30%</td></tr>
                    <tr className="border-t border-slate-700 bg-slate-900/50"><td className="p-3 border-r border-slate-700">34.513 – 66.612 €</td><td className="p-3">40%</td></tr>
                    <tr className="border-t border-slate-700"><td className="p-3 border-r border-slate-700">66.612 – 99.266 €</td><td className="p-3">48%</td></tr>
                    <tr className="border-t border-slate-700 bg-slate-900/50"><td className="p-3 border-r border-slate-700">99.266 – 1.000.000 €</td><td className="p-3">50%</td></tr>
                    <tr className="border-t border-slate-700"><td className="p-3 border-r border-slate-700">Über 1.000.000 €</td><td className="p-3">55%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SVS vs ASVG */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Sozialversicherung: SVS vs. ASVG</h2>

            <p className="mb-6">
              Ein oft unterschätzter Faktor bei der Rechtsformwahl ist die <strong className="text-white">Sozialversicherung</strong>.
              Als Einzelunternehmer zahlst du SVS-Beiträge (GSVG), als GmbH-Geschäftsführer ASVG-Beiträge auf dein Gehalt.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-slate-700 rounded-lg">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4 text-left text-white border-r border-slate-700">Kriterium</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">SVS (Einzelunternehmen)</th>
                    <th className="p-4 text-left text-white">ASVG (GmbH-Geschäftsführer)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Beitragssatz gesamt</td>
                    <td className="p-4 border-r border-slate-700">~26,83% + UV pauschal</td>
                    <td className="p-4">~22,8% (AG + AN-Anteil auf Gehalt)</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Beitragsgrundlage</td>
                    <td className="p-4 border-r border-slate-700">Gewinn (rückwirkend, 3-Jahres-Verzögerung)</td>
                    <td className="p-4">Laufendes Bruttogehalt</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Nachzahlungsrisiko</td>
                    <td className="p-4 border-r border-slate-700 text-red-400">Hoch — vorläufig vs. endgültig</td>
                    <td className="p-4 text-green-400">Kein Nachzahlungsrisiko</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Höchstbeitragsgrundlage</td>
                    <td className="p-4 border-r border-slate-700">84.840 €/Jahr (2026)</td>
                    <td className="p-4">Laufend an Gehalt gekoppelt</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Arbeitslosenversicherung</td>
                    <td className="p-4 border-r border-slate-700 text-red-400">Nicht enthalten</td>
                    <td className="p-4 text-green-400">Enthalten (3% AN + 3% AG)</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Abfertigung</td>
                    <td className="p-4 border-r border-slate-700">Selbständigenvorsorge (1,53%)</td>
                    <td className="p-4">Betriebliche Mitarbeitervorsorge (1,53%)</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Krankengeld</td>
                    <td className="p-4 border-r border-slate-700 text-red-400">Ab dem 43. Tag</td>
                    <td className="p-4 text-green-400">Ab dem 4. Tag (Entgeltfortzahlung)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700">
              <p className="text-amber-200 mb-0">
                <strong>SVS-Vorteil der GmbH:</strong> Als GmbH-Geschäftsführer mit &gt;25% Beteiligung bist du ASVG-pflichtversichert.
                Du hast bessere Leistungen (Krankengeld, Arbeitslosenversicherung) und kein Nachzahlungsrisiko.
                Die Beiträge werden direkt vom laufenden Gehalt berechnet — keine bösen Überraschungen 3 Jahre später.
              </p>
            </div>
          </section>

          {/* Break-Even Analyse */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Break-Even-Analyse: Ab welchem Gewinn lohnt sich die GmbH?</h2>

            <p className="mb-6">
              Der Break-Even-Punkt liegt typischerweise zwischen <strong className="text-white">60.000 und 80.000 Euro Jahresgewinn</strong>,
              abhängig von der geplanten Ausschüttungspolitik und individuellen Faktoren.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-slate-700 rounded-lg">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4 text-left text-white border-r border-slate-700">Jahresgewinn</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">EPU (ESt + SVS)</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">GmbH (50% Ausschüttung)</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">GmbH (Thesaurierung)</th>
                    <th className="p-4 text-left text-white">Vorteil GmbH</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">30.000 €</td>
                    <td className="p-4 border-r border-slate-700">~12.100 €</td>
                    <td className="p-4 border-r border-slate-700">~13.500 €</td>
                    <td className="p-4 border-r border-slate-700">~8.900 €</td>
                    <td className="p-4 text-red-400">−1.400 € (50% Aussch.)</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">50.000 €</td>
                    <td className="p-4 border-r border-slate-700">~22.300 €</td>
                    <td className="p-4 border-r border-slate-700">~21.100 €</td>
                    <td className="p-4 border-r border-slate-700">~13.500 €</td>
                    <td className="p-4 text-green-400">+1.200 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">80.000 €</td>
                    <td className="p-4 border-r border-slate-700">~38.400 €</td>
                    <td className="p-4 border-r border-slate-700">~31.200 €</td>
                    <td className="p-4 border-r border-slate-700">~20.400 €</td>
                    <td className="p-4 text-green-400">+7.200 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">100.000 €</td>
                    <td className="p-4 border-r border-slate-700">~49.500 €</td>
                    <td className="p-4 border-r border-slate-700">~37.800 €</td>
                    <td className="p-4 border-r border-slate-700">~25.000 €</td>
                    <td className="p-4 text-green-400">+11.700 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">150.000 €</td>
                    <td className="p-4 border-r border-slate-700">~76.000 €</td>
                    <td className="p-4 border-r border-slate-700">~55.800 €</td>
                    <td className="p-4 border-r border-slate-700">~37.500 €</td>
                    <td className="p-4 text-green-400">+20.200 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">200.000 €</td>
                    <td className="p-4 border-r border-slate-700">~101.000 €</td>
                    <td className="p-4 border-r border-slate-700">~74.400 €</td>
                    <td className="p-4 border-r border-slate-700">~50.000 €</td>
                    <td className="p-4 text-green-400">+26.600 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-400 mb-6">
              Annahmen: EPU = E/A-Rechnung, ledig, keine Kinder, SVS-Beiträge als Betriebsausgabe.
              GmbH = GF-Gehalt 3.000 €/Monat brutto, Rest als Ausschüttung. Laufende Mehrkosten GmbH ca. 8.000 €/Jahr.
            </p>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700">
              <p className="text-amber-200 mb-0">
                <strong>Wichtig — Thesaurierung:</strong> Wenn du Gewinne in der GmbH belässt (thesaurierst),
                zahlst du nur 23% KöSt. Die KESt fällt erst bei Ausschüttung an. Bei Wachstumsunternehmen,
                die Gewinne reinvestieren, ist die GmbH daher schon ab ca. 40.000 € Gewinn interessant.
              </p>
            </div>
          </section>

          {/* Rechenbeispiel detailliert */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Konkretes Rechenbeispiel: 80.000 € Gewinn</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-red-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Einzelunternehmen</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Jahresgewinn</span><span className="text-white">80.000 €</span></div>
                  <div className="flex justify-between"><span>– SVS-Beiträge (~26,83%)</span><span className="text-red-400">−21.464 €</span></div>
                  <div className="flex justify-between"><span>= Steuerpflichtiger Gewinn</span><span className="text-white">58.536 €</span></div>
                  <div className="flex justify-between"><span>– Gewinnfreibetrag (§ 10)</span><span className="text-green-400">−4.950 €</span></div>
                  <div className="flex justify-between"><span>= Zu versteuerndes Einkommen</span><span className="text-white">53.586 €</span></div>
                  <div className="flex justify-between border-t border-slate-700 pt-2"><span>Einkommensteuer</span><span className="text-red-400">−13.448 €</span></div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 font-semibold">
                    <span className="text-white">Gesamtbelastung (ESt + SVS)</span>
                    <span className="text-red-400">34.912 €</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Netto</span>
                    <span className="text-green-400">45.088 €</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-green-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">GmbH (50% Ausschüttung)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Jahresgewinn</span><span className="text-white">80.000 €</span></div>
                  <div className="flex justify-between"><span>– GF-Gehalt (brutto, 14×)</span><span>−42.000 €</span></div>
                  <div className="flex justify-between"><span>– AG-SV-Beiträge (~21%)</span><span>−8.820 €</span></div>
                  <div className="flex justify-between"><span>– Laufende Mehrkosten</span><span>−8.000 €</span></div>
                  <div className="flex justify-between"><span>= GmbH-Gewinn vor KöSt</span><span className="text-white">21.180 €</span></div>
                  <div className="flex justify-between"><span>– KöSt (23%)</span><span className="text-red-400">−4.871 €</span></div>
                  <div className="flex justify-between"><span>= Gewinn nach KöSt</span><span className="text-white">16.309 €</span></div>
                  <div className="flex justify-between"><span>Ausschüttung (50%)</span><span className="text-white">8.155 €</span></div>
                  <div className="flex justify-between"><span>– KESt (27,5%)</span><span className="text-red-400">−2.243 €</span></div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 font-semibold">
                    <span className="text-white">GF-Gehalt netto (ca.)</span>
                    <span className="text-green-400">~28.800 €</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">+ Ausschüttung netto</span>
                    <span className="text-green-400">+5.912 €</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">= Gesamt netto</span>
                    <span className="text-green-400">~34.712 €</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="mb-0">
                <strong className="text-white">Fazit des Rechenbeispiels:</strong> Bei 80.000 € Gewinn und 50% Ausschüttung
                ist das EPU-Netto (~45.088 €) noch höher als das GmbH-Netto (~34.712 €) — aber: in der GmbH bleiben
                zusätzlich ~8.155 € thesauriert. Die GmbH lohnt sich hier vor allem, wenn du Gewinne reinvestierst
                und von der niedrigeren KöSt (23% statt bis zu 48% ESt) profitierst.
              </p>
            </div>
          </section>

          {/* FlexKap */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">FlexKap — Die neue Alternative seit 2024</h2>

            <p className="mb-6">
              Seit 1. Jänner 2024 gibt es die <strong className="text-white">Flexible Kapitalgesellschaft (FlexKap)</strong> —
              eine neue Rechtsform, die Vorteile der GmbH mit mehr Flexibilität verbindet.
            </p>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">FlexKap im Überblick</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-green-400 mb-3">Vorteile gegenüber GmbH</h4>
                  <ul className="space-y-2">
                    <li><strong className="text-white">Mindestkapital:</strong> 10.000 € (statt 35.000 €)</li>
                    <li><strong className="text-white">Unternehmenswert-Anteile:</strong> Mitarbeiterbeteiligung ohne Notar</li>
                    <li><strong className="text-white">Flexiblere Satzung:</strong> Mehr Gestaltungsspielraum</li>
                    <li><strong className="text-white">Einfachere Anteilsübertragung:</strong> Kein Notariatsakt nötig</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-slate-300 mb-3">Steuerlich identisch</h4>
                  <ul className="space-y-2">
                    <li><strong className="text-white">KöSt:</strong> 23% (wie GmbH)</li>
                    <li><strong className="text-white">KESt:</strong> 27,5% auf Ausschüttungen</li>
                    <li><strong className="text-white">ASVG:</strong> Gleiche SV-Pflicht für GF</li>
                    <li><strong className="text-white">Bilanzierung:</strong> Doppelte Buchführung</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700">
              <p className="text-blue-200 mb-0">
                <strong>Empfehlung:</strong> Für Neugründungen ist die FlexKap oft die bessere Wahl als die klassische GmbH.
                Geringeres Stammkapital (10.000 € statt 35.000 €), gleiche steuerliche Behandlung,
                und mehr Flexibilität bei der Gesellschafterstruktur. Besonders für Startups und
                Ein-Personen-Kapitalgesellschaften interessant.
              </p>
            </div>
          </section>

          {/* Vor- und Nachteile */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Vor- und Nachteile im Überblick</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* GmbH */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">GmbH / FlexKap</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-green-400 mb-3">Vorteile</h4>
                  <ul className="space-y-2">
                    <li>Haftungsbeschränkung auf Stammkapital</li>
                    <li>Steueroptimierung ab ca. 60.000 € Gewinn</li>
                    <li>Gewinnthesaurierung: nur 23% KöSt</li>
                    <li>ASVG: bessere SV-Leistungen, kein Nachzahlungsrisiko</li>
                    <li>Höhere Reputation bei Kunden und Banken</li>
                    <li>Pensionsvorsorge über die Gesellschaft</li>
                    <li>Mehrere Gesellschafter und Beteiligungsmodelle</li>
                    <li>Einfachere Unternehmensübergabe/-verkauf</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-red-400 mb-3">Nachteile</h4>
                  <ul className="space-y-2">
                    <li>Mindestkapital: 35.000 € (GmbH) / 10.000 € (FlexKap)</li>
                    <li>Gründungskosten: Notar, Firmenbuch (2.000–5.000 €)</li>
                    <li>Doppelte Buchführung verpflichtend</li>
                    <li>Bilanzierungs- und Publizitätspflicht</li>
                    <li>Laufende Mehrkosten: 6.000–16.000 €/Jahr</li>
                    <li>Mindest-KöSt: 2.000 €/Jahr (auch bei Verlust)</li>
                    <li>Geschäftsführerhaftung bei Pflichtverletzung</li>
                  </ul>
                </div>
              </div>

              {/* Einzelunternehmen */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Einzelunternehmen</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-green-400 mb-3">Vorteile</h4>
                  <ul className="space-y-2">
                    <li>Einfache und schnelle Gründung (ab 1 Tag)</li>
                    <li>Geringe Gründungskosten (Gewerbeanmeldung ~30 €)</li>
                    <li>Einnahmen-Ausgaben-Rechnung möglich</li>
                    <li>Weniger Formalitäten und Bürokratie</li>
                    <li>Vollständige Kontrolle und schnelle Entscheidungen</li>
                    <li>Einfache Gewinnentnahme (jederzeit, steuerfrei)</li>
                    <li>Gewinnfreibetrag (§ 10 EStG): bis 4.950 € steuerfrei</li>
                    <li>Betriebsausgabenpauschale möglich (§ 17 EStG)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-red-400 mb-3">Nachteile</h4>
                  <ul className="space-y-2">
                    <li>Unbeschränkte persönliche Haftung</li>
                    <li>Progressiver Steuersatz bis 55% ESt</li>
                    <li>SVS-Beiträge: ~27% auf Gewinn + Nachzahlungsrisiko</li>
                    <li>Weniger Gestaltungsmöglichkeiten</li>
                    <li>Kein Arbeitslosengeld bei Einstellung der Tätigkeit</li>
                    <li>Schwierigere Nachfolgeplanung</li>
                    <li>Geringere Außenwirkung und Reputation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Gründungskosten */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Gründungskosten und laufende Kosten</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Einzelunternehmen</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-white">Gewerbeanmeldung:</strong> ~30 €</li>
                  <li><strong className="text-white">WKO-Beitrag:</strong> ~100 €/Jahr</li>
                  <li><strong className="text-white">Steuerberatung (E/A):</strong> ~1.000–3.000 €/Jahr</li>
                  <li className="pt-2 border-t border-slate-700"><strong className="text-white">Gründung:</strong> ~30–100 €</li>
                  <li><strong className="text-white">Laufend:</strong> ~1.100–3.100 €/Jahr</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">GmbH (klassisch)</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-white">Stammkapital:</strong> 35.000 €</li>
                  <li><strong className="text-white">Notar + Firmenbuch:</strong> ~2.000–3.500 €</li>
                  <li><strong className="text-white">Bilanzierung:</strong> ~3.000–8.000 €/Jahr</li>
                  <li><strong className="text-white">Mindest-KöSt:</strong> 2.000 €/Jahr</li>
                  <li className="pt-2 border-t border-slate-700"><strong className="text-white">Gründung:</strong> ~37.000–40.000 €</li>
                  <li><strong className="text-white">Laufend:</strong> ~6.000–16.000 €/Jahr</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-blue-700/50">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">FlexKap (neu)</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-white">Stammkapital:</strong> 10.000 €</li>
                  <li><strong className="text-white">Notar + Firmenbuch:</strong> ~1.500–3.000 €</li>
                  <li><strong className="text-white">Bilanzierung:</strong> ~3.000–8.000 €/Jahr</li>
                  <li><strong className="text-white">Mindest-KöSt:</strong> 2.000 €/Jahr</li>
                  <li className="pt-2 border-t border-slate-700"><strong className="text-white">Gründung:</strong> ~12.000–14.000 €</li>
                  <li><strong className="text-white">Laufend:</strong> ~6.000–16.000 €/Jahr</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Wann wechseln */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Wann vom EPU zur GmbH/FlexKap wechseln?</h2>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-green-400 mb-3">GmbH lohnt sich, wenn:</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Dauerhaft über 60.000–80.000 € Gewinn</strong> — nicht nur einmalig</li>
                  <li><strong className="text-white">Haftungsrisiken bestehen</strong> — z.B. bei Beratung, IT-Projekten, Bau</li>
                  <li><strong className="text-white">Gewinne reinvestiert werden</strong> — Thesaurierung spart 23% statt bis zu 55%</li>
                  <li><strong className="text-white">Mitarbeiterbeteiligung geplant</strong> — FlexKap: Unternehmenswert-Anteile</li>
                  <li><strong className="text-white">Unternehmensverkauf angestrebt</strong> — GmbH-Anteile leichter verkaufbar</li>
                  <li><strong className="text-white">Bessere SV-Leistungen gewünscht</strong> — ASVG statt SVS</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-red-400 mb-3">EPU bleibt besser, wenn:</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Gewinn unter 50.000 €</strong> — GmbH-Kosten übersteigen den Steuervorteil</li>
                  <li><strong className="text-white">Schwankende Umsätze</strong> — Mindest-KöSt auch bei Verlust</li>
                  <li><strong className="text-white">Pauschalierung genutzt wird</strong> — oft effektiver als GmbH bei kleinen Gewinnen</li>
                  <li><strong className="text-white">Einfachheit wichtig ist</strong> — weniger Bürokratie, E/A-Rechnung</li>
                  <li><strong className="text-white">Gewinne vollständig entnommen werden</strong> — EPU-Entnahme steuerfrei</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Checkliste Umwandlung */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Checkliste: Umwandlung EPU → GmbH</h2>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <div><strong className="text-white">Steuerberater konsultieren</strong> — individuelle Berechnung mit konkreten Zahlen</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <div><strong className="text-white">Gesellschaftsvertrag erstellen</strong> — Notar oder Rechtsanwalt (bei FlexKap einfacher)</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div><strong className="text-white">Stammkapital einzahlen</strong> — 35.000 € (GmbH) oder 10.000 € (FlexKap) auf Geschäftskonto</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <div><strong className="text-white">Firmenbucheintragung</strong> — Antrag beim zuständigen Firmenbuchgericht</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  <div><strong className="text-white">Einbringung prüfen</strong> — Art. III UmgrStG: steuerneutrale Einbringung des EPU möglich</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">6</span>
                  <div><strong className="text-white">SVS → ASVG Wechsel</strong> — Abmeldung SVS, Anmeldung ASVG als GF mit &gt;25% Beteiligung</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">7</span>
                  <div><strong className="text-white">Verträge und Lizenzen</strong> — Verträge auf die neue Gesellschaft übertragen</div>
                </li>
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12 text-center">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-lg border border-blue-700">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Berechne deinen persönlichen Break-Even-Punkt
              </h3>
              <p className="text-slate-300 mb-6">
                Nutze unseren kostenlosen Rechner für eine individuelle Analyse deiner Situation.
              </p>
              <Button asChild>
                <Link href="/rechner" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Zum Steuer-Rechner
                </Link>
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Häufige Fragen (FAQ)</h2>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Kann ich mein EPU steuerfrei in eine GmbH einbringen?</h3>
                <p className="mb-0">
                  Ja, nach Art. III UmgrStG (Umgründungssteuergesetz) ist eine steuerneutrale Einbringung möglich.
                  Dabei werden alle Wirtschaftsgüter des EPU zu Buchwerten in die GmbH übertragen — ohne Aufdeckung stiller Reserven.
                  Voraussetzung: Es muss ein positiver Verkehrswert vorliegen und die Einbringung durch einen Steuerberater begleitet werden.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Was ist die Mindest-KöSt und muss ich sie auch bei Verlust zahlen?</h3>
                <p className="mb-0">
                  Ja, die Mindest-KöSt beträgt 500 €/Quartal (= 2.000 €/Jahr) und ist auch bei Verlust zu zahlen.
                  Sie wird aber auf die tatsächliche KöSt-Schuld der Folgejahre angerechnet. Bei der FlexKap gelten
                  die gleichen Regeln. In den ersten 5 Jahren nach Gründung gilt eine reduzierte Mindest-KöSt von 125 €/Quartal.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Was ist der Unterschied zwischen GmbH und FlexKap?</h3>
                <p className="mb-0">
                  Die FlexKap (seit 2024) ist steuerlich identisch zur GmbH (23% KöSt, 27,5% KESt).
                  Vorteile: Niedrigeres Mindestkapital (10.000 € statt 35.000 €), Unternehmenswert-Anteile
                  für Mitarbeiter ohne Notar, flexiblere Satzungsgestaltung und einfachere Anteilsübertragung.
                  Nachteile: Noch wenig Rechtsprechung und Praxis vorhanden.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Wie hoch ist der KöSt-Satz in Österreich 2026?</h3>
                <p className="mb-0">
                  Der Körperschaftsteuersatz beträgt seit 2024 <strong className="text-white">23%</strong> (§ 22 Abs. 1 KStG).
                  Er wurde schrittweise von 25% (bis 2022) über 24% (2023) auf 23% (ab 2024) gesenkt.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Kann ich als GmbH-Geschäftsführer den Gewinnfreibetrag nutzen?</h3>
                <p className="mb-0">
                  Nein. Der Gewinnfreibetrag (§ 10 EStG) gilt nur für natürliche Personen mit Einkünften
                  aus selbständiger Arbeit oder Gewerbebetrieb. Als GmbH-Geschäftsführer beziehst du ein Gehalt
                  (Einkünfte aus nichtselbständiger Arbeit). Der GFB fällt daher bei der GmbH-Variante weg — wird aber durch
                  die niedrigere KöSt (23%) kompensiert.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Gibt es eine Ein-Personen-GmbH?</h3>
                <p className="mb-0">
                  Ja, eine GmbH kann von einer einzelnen Person gegründet werden (Ein-Personen-GmbH).
                  Du bist dann gleichzeitig alleiniger Gesellschafter und Geschäftsführer. Das gleiche gilt
                  für die FlexKap. Steuerlich ändert sich nichts — du profitierst von denselben Vorteilen.
                </p>
              </div>
            </div>
          </section>

          {/* Fazit */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-6">Fazit: Wann lohnt sich die GmbH?</h2>
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
              <ul className="space-y-3">
                <li><strong className="text-white">Ab 60.000–80.000 € Jahresgewinn:</strong> GmbH wird steuerlich interessant (bei Vollausschüttung)</li>
                <li><strong className="text-white">Ab 40.000 € bei Thesaurierung:</strong> Nur 23% KöSt statt bis zu 48% ESt</li>
                <li><strong className="text-white">FlexKap als günstigere Alternative:</strong> Nur 10.000 € Stammkapital, gleiche Steuervorteile</li>
                <li><strong className="text-white">Bessere Sozialversicherung:</strong> ASVG statt SVS, kein Nachzahlungsrisiko</li>
                <li><strong className="text-white">Bei Haftungsrisiken:</strong> GmbH bietet wichtigen Schutz</li>
                <li><strong className="text-white">Bei niedrigeren Gewinnen:</strong> Einzelunternehmen oft günstiger und einfacher</li>
              </ul>
              <p className="mt-4 text-slate-300">
                Die Entscheidung sollte immer individuell und mit professioneller Beratung getroffen werden,
                da neben steuerlichen auch rechtliche, strategische und persönliche Faktoren eine Rolle spielen.
                Lass deinen Break-Even-Punkt konkret mit deinem Steuerberater berechnen.
              </p>
            </div>
          </section>

          <ArticleFooter
            breadcrumbs={[
              { name: 'Home', href: '/' },
              { name: 'Steuerwissen', href: '/steuerwissen' },
              { name: 'GmbH vs. Einzelunternehmen', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
            ]}
            sources={[
              { name: 'KStG § 22 — Körperschaftsteuersatz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004531', description: 'Rechtsinformationssystem des Bundes (RIS) — Körperschaftsteuergesetz' },
              { name: 'EStG § 33 — Einkommensteuertarif', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS) — Einkommensteuergesetz' },
              { name: 'FlexKapG — Flexible Kapitalgesellschaft', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20012713', description: 'Rechtsinformationssystem des Bundes (RIS)' },
              { name: 'GmbHG — GmbH-Gesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001720', description: 'Rechtsinformationssystem des Bundes (RIS)' },
              { name: 'WKO — GmbH gründen in Österreich', url: 'https://www.wko.at/gruendung/gmbh-gruenden', description: 'Wirtschaftskammer Österreich — Gründungsleitfaden' },
              { name: 'BMF — Körperschaftsteuer', url: 'https://www.bmf.gv.at/themen/steuern/koerperschaftsteuer.html', description: 'Bundesministerium für Finanzen' },
            ]}
            relatedArticles={[
              { title: 'Steueroptimierung für Selbständige — Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              { title: 'Gewinnfreibetrag 2026 — Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              { title: 'SVS-Beiträge senken — 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
            ]}
          />
        </article>
      </div>
    </div>
  )
}
