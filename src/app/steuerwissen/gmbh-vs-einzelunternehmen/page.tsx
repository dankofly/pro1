import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'
import { SiteFooter } from '@/components/site-footer'

export default function GmbHvsEinzelunternehmenPage() {
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
            <li className="text-sb-text">GmbH vs. Einzelunternehmen</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-sb-text mb-6 leading-tight">
              GmbH oder Einzelunternehmen? — Der komplette Steuer-Vergleich für Österreich 2026
            </h1>
            <p className="text-xl text-sb-mut leading-relaxed">
              Die Entscheidung zwischen GmbH und Einzelunternehmen ist eine der wichtigsten unternehmerischen Weichenstellungen.
              Ab welchem Gewinn macht der Wechsel von der Einzelunternehmung zur GmbH steuerlich Sinn?
              Hier der komplette Vergleich — mit konkreten Berechnungen, FlexKap-Option und Sozialversicherungs-Analyse.
            </p>
          </header>

          {/* AI Overview Box */}
          <div className="bg-sb-accent-soft border border-sb-accent/30 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-sb-accent mb-3">Kurzantwort</h2>
            <p className="text-sb-mut mb-0">
              Die GmbH wird ab ca. <strong className="text-sb-text">60.000–80.000 € Jahresgewinn</strong> steuerlich interessant (Modellrechnung, individuell zu prüfen).
              Bei Vollausschüttung beträgt die GmbH-Gesamtbelastung ca. 44,2% (23% KöSt + 27,5% KESt auf den Rest),
              während beim Einzelunternehmen ab rund 70.400 € Einkommen bereits der Grenzsteuersatz von 48% greift, plus SVS-Beiträge von ca. 27% auf die Beitragsgrundlage.
              Seit 2024 bietet die <strong className="text-sb-text">FlexKap</strong> eine flexiblere Alternative zur klassischen GmbH bei identischem Mindestkapital.
            </p>
          </div>

          {/* Steuerliche Unterschiede */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Steuerliche Unterschiede im Detail</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-semibold text-sb-text mb-4">Einzelunternehmen (EPU)</h3>
                <ul className="space-y-3">
                  <li><strong className="text-sb-text">Einkommensteuer (ESt):</strong> Progressiv 0% bis 55% (§ 33 EStG)</li>
                  <li><strong className="text-sb-text">SVS-Beiträge:</strong> Ca. 26,83% auf Beitragsgrundlage (PV 18,50% + KV 6,80% + SV 1,53%)</li>
                  <li><strong className="text-sb-text">Mindest-SVS:</strong> Ca. 1.930 €/Jahr (2026)</li>
                  <li><strong className="text-sb-text">Höchst-SVS:</strong> Ca. 26.186 €/Jahr (2026)</li>
                  <li><strong className="text-sb-text">Buchführung:</strong> E/A-Rechnung bis 700.000 € Umsatz</li>
                  <li><strong className="text-sb-text">Gewinnentnahme:</strong> Jederzeit, steuerfrei</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-semibold text-sb-text mb-4">GmbH</h3>
                <ul className="space-y-3">
                  <li><strong className="text-sb-text">Körperschaftsteuer (KöSt):</strong> 23% auf Gewinn (§ 22 KStG)</li>
                  <li><strong className="text-sb-text">KESt auf Ausschüttungen:</strong> 27,5% auf Brutto-Dividende</li>
                  <li><strong className="text-sb-text">SV des Gesellschafter-GF:</strong> Bis 25% Beteiligung ASVG, darüber i.d.R. GSVG (SVS)</li>
                  <li><strong className="text-sb-text">Mindest-KöSt:</strong> 125 €/Quartal = 500 €/Jahr</li>
                  <li><strong className="text-sb-text">Buchführung:</strong> Doppelte Buchführung verpflichtend</li>
                  <li><strong className="text-sb-text">Gewinnentnahme:</strong> Nur als Gehalt oder Gewinnausschüttung</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-accent/40 mb-6">
              <h4 className="text-lg font-semibold text-sb-text mb-2">Effektive Gesamtbelastung bei Vollausschüttung</h4>
              <p className="mb-4">
                <strong className="text-sb-text">Einzelunternehmen:</strong> ESt-Grenzsteuersatz bis 55%, dazu SVS-Beiträge (2026 gedeckelt bei ca. 26.186 €/Jahr, als Betriebsausgabe abzugsfähig) = <span className="text-sb-red font-semibold">bei hohen Gewinnen deutlich höhere Belastung</span>
              </p>
              <p className="mb-0">
                <strong className="text-sb-text">GmbH:</strong> 23% KöSt + 27,5% KESt auf verbleibende 77% = <span className="text-sb-green font-semibold">ca. 44,2% Gesamtbelastung</span>
              </p>
            </div>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
              <h4 className="text-lg font-semibold text-sb-text mb-3">Einkommensteuer-Tarif 2026 (§ 33 EStG)</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-sb-line rounded-lg text-sm">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="p-3 text-left text-sb-text border-r border-sb-line">Einkommensstufe</th>
                      <th className="p-3 text-left text-sb-text">Steuersatz</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-sb-line"><td className="p-3 border-r border-sb-line">0 – 13.539 €</td><td className="p-3">0%</td></tr>
                    <tr className="border-t border-sb-line bg-sb-deep"><td className="p-3 border-r border-sb-line">13.539 – 21.992 €</td><td className="p-3">20%</td></tr>
                    <tr className="border-t border-sb-line"><td className="p-3 border-r border-sb-line">21.992 – 36.458 €</td><td className="p-3">30%</td></tr>
                    <tr className="border-t border-sb-line bg-sb-deep"><td className="p-3 border-r border-sb-line">36.458 – 70.365 €</td><td className="p-3">40%</td></tr>
                    <tr className="border-t border-sb-line"><td className="p-3 border-r border-sb-line">70.365 – 104.859 €</td><td className="p-3">48%</td></tr>
                    <tr className="border-t border-sb-line bg-sb-deep"><td className="p-3 border-r border-sb-line">104.859 – 1.000.000 €</td><td className="p-3">50%</td></tr>
                    <tr className="border-t border-sb-line"><td className="p-3 border-r border-sb-line">Über 1.000.000 €</td><td className="p-3">55%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SVS vs ASVG */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Sozialversicherung: SVS vs. ASVG</h2>

            <p className="mb-6">
              Ein oft unterschätzter Faktor bei der Rechtsformwahl ist die <strong className="text-sb-text">Sozialversicherung</strong>.
              Als Einzelunternehmer zahlst du SVS-Beiträge (GSVG). Als Gesellschafter-Geschäftsführer einer GmbH gilt:
              Nur bei einer Beteiligung bis 25% bist du ASVG-versichert (Beiträge auf dein Gehalt), darüber bleibst du in der Regel GSVG-pflichtig.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sb-line rounded-lg">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Kriterium</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">SVS (Einzelunternehmen)</th>
                    <th className="p-4 text-left text-sb-text">ASVG (GF bis 25% Beteiligung)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Beitragssatz gesamt</td>
                    <td className="p-4 border-r border-sb-line">~26,83% + UV pauschal</td>
                    <td className="p-4">~39% auf das Gehalt (AN 18,07% + AG 20,98%)</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Beitragsgrundlage</td>
                    <td className="p-4 border-r border-sb-line">Gewinn (rückwirkend, 3-Jahres-Verzögerung)</td>
                    <td className="p-4">Laufendes Bruttogehalt</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Nachzahlungsrisiko</td>
                    <td className="p-4 border-r border-sb-line text-sb-red">Hoch — vorläufig vs. endgültig</td>
                    <td className="p-4 text-sb-green">Kein Nachzahlungsrisiko</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Höchstbeitragsgrundlage</td>
                    <td className="p-4 border-r border-sb-line">97.020 €/Jahr (2026)</td>
                    <td className="p-4">6.930 €/Monat (2026)</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Arbeitslosenversicherung</td>
                    <td className="p-4 border-r border-sb-line text-sb-red">Nicht enthalten</td>
                    <td className="p-4 text-sb-green">Enthalten (je 2,95% AN und AG)</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Abfertigung</td>
                    <td className="p-4 border-r border-sb-line">Selbständigenvorsorge (1,53%)</td>
                    <td className="p-4">Betriebliche Mitarbeitervorsorge (1,53%)</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Krankengeld</td>
                    <td className="p-4 border-r border-sb-line text-sb-red">Ab dem 43. Tag</td>
                    <td className="p-4 text-sb-green">Ab dem 4. Tag (Entgeltfortzahlung)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Achtung, häufiger Irrtum:</strong> ASVG gilt nur für Gesellschafter-Geschäftsführer mit maximal 25% Beteiligung.
                Wer mehr hält, typischerweise der Alleingesellschafter-Geschäftsführer, bleibt GSVG-pflichtversichert (SVS),
                inklusive Nachbemessung. Der Wechsel in die GmbH ändert an deiner Sozialversicherung dann wenig.
              </p>
            </div>
          </section>

          {/* Break-Even Analyse */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Break-Even-Analyse: Ab welchem Gewinn lohnt sich die GmbH?</h2>

            <p className="mb-6">
              Der Break-Even-Punkt liegt in unserer Modellrechnung typischerweise zwischen <strong className="text-sb-text">60.000 und 80.000 Euro Jahresgewinn</strong>,
              abhängig von der geplanten Ausschüttungspolitik und individuellen Faktoren.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sb-line rounded-lg">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Jahresgewinn</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">EPU (ESt + SVS)</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">GmbH (50% Ausschüttung)</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">GmbH (Thesaurierung)</th>
                    <th className="p-4 text-left text-sb-text">Vorteil GmbH</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">30.000 €</td>
                    <td className="p-4 border-r border-sb-line">~9.200 €</td>
                    <td className="p-4 border-r border-sb-line">~13.500 €</td>
                    <td className="p-4 border-r border-sb-line">~8.900 €</td>
                    <td className="p-4 text-sb-red">−4.300 € (50% Aussch.)</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">50.000 €</td>
                    <td className="p-4 border-r border-sb-line">~18.100 €</td>
                    <td className="p-4 border-r border-sb-line">~21.100 €</td>
                    <td className="p-4 border-r border-sb-line">~13.500 €</td>
                    <td className="p-4 text-sb-red">−3.000 €</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">80.000 €</td>
                    <td className="p-4 border-r border-sb-line">~34.400 €</td>
                    <td className="p-4 border-r border-sb-line">~31.200 €</td>
                    <td className="p-4 border-r border-sb-line">~20.400 €</td>
                    <td className="p-4 text-sb-green">+3.200 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">100.000 €</td>
                    <td className="p-4 border-r border-sb-line">~45.200 €</td>
                    <td className="p-4 border-r border-sb-line">~37.800 €</td>
                    <td className="p-4 border-r border-sb-line">~25.000 €</td>
                    <td className="p-4 text-sb-green">+7.400 €</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">150.000 €</td>
                    <td className="p-4 border-r border-sb-line">~69.300 €</td>
                    <td className="p-4 border-r border-sb-line">~55.800 €</td>
                    <td className="p-4 border-r border-sb-line">~37.500 €</td>
                    <td className="p-4 text-sb-green">+13.500 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">200.000 €</td>
                    <td className="p-4 border-r border-sb-line">~94.300 €</td>
                    <td className="p-4 border-r border-sb-line">~74.400 €</td>
                    <td className="p-4 border-r border-sb-line">~50.000 €</td>
                    <td className="p-4 text-sb-green">+19.900 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-sb-mut mb-6">
              Annahmen (vereinfachte Modellrechnung, gerundet): EPU = E/A-Rechnung, ledig, Tarif 2026, Grundfreibetrag,
              SVS-Beiträge als Betriebsausgabe (2026 gedeckelt). GmbH = GF-Gehalt 3.000 €/Monat brutto (SV vereinfacht),
              Rest als Ausschüttung, laufende Mehrkosten ca. 8.000 €/Jahr. Individuelle Berechnung beim Steuerberater.
            </p>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Wichtig — Thesaurierung:</strong> Wenn du Gewinne in der GmbH belässt (thesaurierst),
                zahlst du nur 23% KöSt. Die KESt fällt erst bei Ausschüttung an. Bei Wachstumsunternehmen,
                die Gewinne reinvestieren, ist die GmbH in dieser Modellrechnung schon ab ca. 40.000 € Gewinn interessant.
              </p>
            </div>
          </section>

          {/* Rechenbeispiel detailliert */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Konkretes Rechenbeispiel: 80.000 € Gewinn</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-red/30">
                <h3 className="text-xl font-semibold text-sb-text mb-4">Einzelunternehmen</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Jahresgewinn</span><span className="text-sb-text">80.000 €</span></div>
                  <div className="flex justify-between"><span>– SVS-Beiträge (~26,83% + UV)</span><span className="text-sb-red">−21.619 €</span></div>
                  <div className="flex justify-between"><span>= Steuerpflichtiger Gewinn</span><span className="text-sb-text">58.381 €</span></div>
                  <div className="flex justify-between"><span>– Gewinnfreibetrag (§ 10)</span><span className="text-sb-green">−4.950 €</span></div>
                  <div className="flex justify-between"><span>= Zu versteuerndes Einkommen</span><span className="text-sb-text">53.431 €</span></div>
                  <div className="flex justify-between border-t border-sb-line pt-2"><span>Einkommensteuer (Tarif 2026)</span><span className="text-sb-red">−12.820 €</span></div>
                  <div className="flex justify-between border-t border-sb-line pt-2 font-semibold">
                    <span className="text-sb-text">Gesamtbelastung (ESt + SVS)</span>
                    <span className="text-sb-red">34.439 €</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-sb-text">Netto</span>
                    <span className="text-sb-green">45.561 €</span>
                  </div>
                </div>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-green/30">
                <h3 className="text-xl font-semibold text-sb-text mb-4">GmbH (50% Ausschüttung)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Jahresgewinn</span><span className="text-sb-text">80.000 €</span></div>
                  <div className="flex justify-between"><span>– GF-Gehalt (brutto, 14×)</span><span>−42.000 €</span></div>
                  <div className="flex justify-between"><span>– AG-SV-Beiträge (~21%)</span><span>−8.820 €</span></div>
                  <div className="flex justify-between"><span>– Laufende Mehrkosten</span><span>−8.000 €</span></div>
                  <div className="flex justify-between"><span>= GmbH-Gewinn vor KöSt</span><span className="text-sb-text">21.180 €</span></div>
                  <div className="flex justify-between"><span>– KöSt (23%)</span><span className="text-sb-red">−4.871 €</span></div>
                  <div className="flex justify-between"><span>= Gewinn nach KöSt</span><span className="text-sb-text">16.309 €</span></div>
                  <div className="flex justify-between"><span>Ausschüttung (50%)</span><span className="text-sb-text">8.155 €</span></div>
                  <div className="flex justify-between"><span>– KESt (27,5%)</span><span className="text-sb-red">−2.243 €</span></div>
                  <div className="flex justify-between border-t border-sb-line pt-2 font-semibold">
                    <span className="text-sb-text">GF-Gehalt netto (ca.)</span>
                    <span className="text-sb-green">~28.800 €</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-sb-text">+ Ausschüttung netto</span>
                    <span className="text-sb-green">+5.912 €</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-sb-text">= Gesamt netto</span>
                    <span className="text-sb-green">~34.712 €</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-accent/40">
              <p className="mb-0">
                <strong className="text-sb-text">Fazit des Rechenbeispiels:</strong> Bei 80.000 € Gewinn und 50% Ausschüttung
                ist das EPU-Netto (~45.561 €) noch höher als das GmbH-Netto (~34.712 €) — aber: in der GmbH bleiben
                zusätzlich ~8.155 € thesauriert. Die GmbH lohnt sich hier vor allem, wenn du Gewinne reinvestierst
                und von der niedrigeren KöSt (23% statt bis zu 48% ESt) profitierst.
              </p>
            </div>
          </section>

          {/* FlexKap */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">FlexKap — Die neue Alternative seit 2024</h2>

            <p className="mb-6">
              Seit 1. Jänner 2024 gibt es die <strong className="text-sb-text">Flexible Kapitalgesellschaft (FlexKap)</strong> —
              eine neue Rechtsform, die Vorteile der GmbH mit mehr Flexibilität verbindet.
            </p>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <h3 className="text-xl font-semibold text-sb-text mb-4">FlexKap im Überblick</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-sb-green mb-3">Vorteile gegenüber GmbH</h4>
                  <ul className="space-y-2">
                    <li><strong className="text-sb-text">Unternehmenswert-Anteile:</strong> Mitarbeiterbeteiligung, unter 25% des Stammkapitals, ohne Stimmrecht</li>
                    <li><strong className="text-sb-text">Start-Up-Mitarbeiterbeteiligung:</strong> Steueraufschub nach § 67a EStG nutzbar</li>
                    <li><strong className="text-sb-text">Flexiblere Satzung:</strong> Mehr Gestaltungsspielraum</li>
                    <li><strong className="text-sb-text">Einfachere Anteilsübertragung:</strong> Notarielle oder anwaltliche Privaturkunde statt Notariatsakt</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-sb-mut mb-3">Steuerlich identisch</h4>
                  <ul className="space-y-2">
                    <li><strong className="text-sb-text">KöSt:</strong> 23% (wie GmbH)</li>
                    <li><strong className="text-sb-text">KESt:</strong> 27,5% auf Ausschüttungen</li>
                    <li><strong className="text-sb-text">SV-Zuordnung:</strong> Wie GmbH (bis 25% ASVG, darüber GSVG)</li>
                    <li><strong className="text-sb-text">Bilanzierung:</strong> Doppelte Buchführung</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Empfehlung:</strong> Seit 2024 gilt für GmbH und FlexKap dasselbe Mindeststammkapital von 10.000 €.
                Der FlexKap-Vorteil liegt daher nicht beim Kapital, sondern bei Unternehmenswert-Anteilen für Mitarbeiter,
                der einfacheren Anteilsübertragung und der flexibleren Satzung. Besonders für Startups mit
                Beteiligungsprogrammen interessant.
              </p>
            </div>
          </section>

          {/* Vor- und Nachteile */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Vor- und Nachteile im Überblick</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* GmbH */}
              <div>
                <h3 className="text-xl font-semibold text-sb-text mb-4">GmbH / FlexKap</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-sb-green mb-3">Vorteile</h4>
                  <ul className="space-y-2">
                    <li>Haftungsbeschränkung auf Stammkapital</li>
                    <li>Steueroptimierung ab ca. 60.000 € Gewinn</li>
                    <li>Gewinnthesaurierung: nur 23% KöSt</li>
                    <li>GF-Gehalt als Betriebsausgabe der GmbH absetzbar</li>
                    <li>Höhere Reputation bei Kunden und Banken</li>
                    <li>Pensionsvorsorge über die Gesellschaft</li>
                    <li>Mehrere Gesellschafter und Beteiligungsmodelle</li>
                    <li>Einfachere Unternehmensübergabe/-verkauf</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-sb-red mb-3">Nachteile</h4>
                  <ul className="space-y-2">
                    <li>Mindestkapital: 10.000 € (GmbH und FlexKap, seit 2024)</li>
                    <li>Gründungskosten: Notar, Firmenbuch (ca. 2.000–5.000 €, Richtwert)</li>
                    <li>Doppelte Buchführung verpflichtend</li>
                    <li>Bilanzierungs- und Publizitätspflicht</li>
                    <li>Laufende Mehrkosten: 6.000–16.000 €/Jahr</li>
                    <li>Mindest-KöSt: 500 €/Jahr (auch bei Verlust)</li>
                    <li>Geschäftsführerhaftung bei Pflichtverletzung</li>
                  </ul>
                </div>
              </div>

              {/* Einzelunternehmen */}
              <div>
                <h3 className="text-xl font-semibold text-sb-text mb-4">Einzelunternehmen</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-sb-green mb-3">Vorteile</h4>
                  <ul className="space-y-2">
                    <li>Einfache und schnelle Gründung (ab 1 Tag)</li>
                    <li>Geringe Gründungskosten (Gewerbeanmeldung gebührenfrei)</li>
                    <li>Einnahmen-Ausgaben-Rechnung möglich</li>
                    <li>Weniger Formalitäten und Bürokratie</li>
                    <li>Vollständige Kontrolle und schnelle Entscheidungen</li>
                    <li>Einfache Gewinnentnahme (jederzeit, steuerfrei)</li>
                    <li>Gewinnfreibetrag (§ 10 EStG): Grundfreibetrag bis 4.950 €</li>
                    <li>Betriebsausgabenpauschale möglich (§ 17 EStG)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-sb-red mb-3">Nachteile</h4>
                  <ul className="space-y-2">
                    <li>Unbeschränkte persönliche Haftung</li>
                    <li>Progressiver Steuersatz bis 55% ESt</li>
                    <li>SVS-Beiträge: ~27% auf Gewinn + Nachzahlungsrisiko</li>
                    <li>Weniger Gestaltungsmöglichkeiten</li>
                    <li>Arbeitslosenversicherung nur über freiwilliges Opt-in</li>
                    <li>Schwierigere Nachfolgeplanung</li>
                    <li>Geringere Außenwirkung und Reputation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Gründungskosten */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Gründungskosten und laufende Kosten</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-4">Einzelunternehmen</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-sb-text">Gewerbeanmeldung:</strong> gebührenfrei</li>
                  <li><strong className="text-sb-text">WKO-Beitrag:</strong> Grundumlage, je nach Fachgruppe</li>
                  <li><strong className="text-sb-text">Steuerberatung (E/A):</strong> ~1.000–3.000 €/Jahr</li>
                  <li className="pt-2 border-t border-sb-line"><strong className="text-sb-text">Gründung:</strong> nahezu 0 €</li>
                  <li><strong className="text-sb-text">Laufend:</strong> ~1.000–3.000 €/Jahr</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-4">GmbH (klassisch)</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-sb-text">Stammkapital:</strong> 10.000 € (5.000 € bar)</li>
                  <li><strong className="text-sb-text">Notar + Firmenbuch:</strong> ca. 2.000–3.500 € (Richtwert)</li>
                  <li><strong className="text-sb-text">Bilanzierung:</strong> ~3.000–8.000 €/Jahr</li>
                  <li><strong className="text-sb-text">Mindest-KöSt:</strong> 500 €/Jahr</li>
                  <li className="pt-2 border-t border-sb-line"><strong className="text-sb-text">Gründung:</strong> ~12.000–14.000 € (inkl. Stammkapital)</li>
                  <li><strong className="text-sb-text">Laufend:</strong> ~6.000–16.000 €/Jahr</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-accent/30">
                <h3 className="text-lg font-semibold text-sb-accent mb-4">FlexKap (neu)</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-sb-text">Stammkapital:</strong> 10.000 € (5.000 € bar)</li>
                  <li><strong className="text-sb-text">Notar + Firmenbuch:</strong> ca. 2.000–3.000 € (WKO-Richtwert)</li>
                  <li><strong className="text-sb-text">Bilanzierung:</strong> ~3.000–8.000 €/Jahr</li>
                  <li><strong className="text-sb-text">Mindest-KöSt:</strong> 500 €/Jahr</li>
                  <li className="pt-2 border-t border-sb-line"><strong className="text-sb-text">Gründung:</strong> ~12.000–14.000 €</li>
                  <li><strong className="text-sb-text">Laufend:</strong> ~6.000–16.000 €/Jahr</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Wann wechseln */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Wann vom EPU zur GmbH/FlexKap wechseln?</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-green mb-3">GmbH lohnt sich, wenn:</h3>
                <ul className="space-y-2">
                  <li><strong className="text-sb-text">Dauerhaft über 60.000–80.000 € Gewinn</strong> — nicht nur einmalig</li>
                  <li><strong className="text-sb-text">Haftungsrisiken bestehen</strong> — z.B. bei Beratung, IT-Projekten, Bau</li>
                  <li><strong className="text-sb-text">Gewinne reinvestiert werden</strong> — Thesaurierung spart 23% statt bis zu 55%</li>
                  <li><strong className="text-sb-text">Mitarbeiterbeteiligung geplant</strong> — FlexKap: Unternehmenswert-Anteile</li>
                  <li><strong className="text-sb-text">Unternehmensverkauf angestrebt</strong> — GmbH-Anteile leichter verkaufbar</li>
                  <li><strong className="text-sb-text">Vergütung flexibel gestaltbar</strong> - Mix aus GF-Gehalt und Gewinnausschüttung</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-red mb-3">EPU bleibt besser, wenn:</h3>
                <ul className="space-y-2">
                  <li><strong className="text-sb-text">Gewinn unter 50.000 €</strong> — GmbH-Kosten übersteigen den Steuervorteil</li>
                  <li><strong className="text-sb-text">Schwankende Umsätze</strong> — Mindest-KöSt auch bei Verlust</li>
                  <li><strong className="text-sb-text">Pauschalierung genutzt wird</strong> — oft effektiver als GmbH bei kleinen Gewinnen</li>
                  <li><strong className="text-sb-text">Einfachheit wichtig ist</strong> — weniger Bürokratie, E/A-Rechnung</li>
                  <li><strong className="text-sb-text">Gewinne vollständig entnommen werden</strong> — EPU-Entnahme steuerfrei</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Checkliste Umwandlung */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Checkliste: Umwandlung EPU → GmbH</h2>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <div><strong className="text-sb-text">Steuerberater konsultieren</strong> — individuelle Berechnung mit konkreten Zahlen</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <div><strong className="text-sb-text">Gesellschaftsvertrag erstellen</strong> — Notar oder Rechtsanwalt (bei FlexKap einfacher)</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div><strong className="text-sb-text">Stammkapital einzahlen</strong> — 10.000 € (GmbH und FlexKap, davon mind. 5.000 € bar) auf Geschäftskonto</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <div><strong className="text-sb-text">Firmenbucheintragung</strong> — Antrag beim zuständigen Firmenbuchgericht</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  <div><strong className="text-sb-text">Einbringung prüfen</strong> — Art. III UmgrStG: steuerneutrale Einbringung des EPU möglich</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">6</span>
                  <div><strong className="text-sb-text">Sozialversicherung klären</strong> — bis 25% Beteiligung ASVG, darüber i.d.R. weiterhin GSVG (SVS)</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">7</span>
                  <div><strong className="text-sb-text">Verträge und Lizenzen</strong> — Verträge auf die neue Gesellschaft übertragen</div>
                </li>
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12 text-center">
            <div className="bg-sb-accent-soft p-8 rounded-lg border border-sb-accent/30">
              <h3 className="text-2xl font-semibold text-sb-text mb-4">
                Berechne deinen persönlichen Break-Even-Punkt
              </h3>
              <p className="text-sb-mut mb-6">
                Nutze unseren kostenlosen Rechner für eine individuelle Analyse deiner Situation.
              </p>
              <Button asChild>
                <Link href="/rechner" className="bg-sb-accent hover:bg-sb-accent-deep text-sb-accent-ink px-8 py-3 rounded-lg font-semibold transition-colors">
                  Zum Steuer-Rechner
                </Link>
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Häufige Fragen (FAQ)</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Kann ich mein EPU steuerfrei in eine GmbH einbringen?</h3>
                <p className="mb-0">
                  Ja, nach Art. III UmgrStG (Umgründungssteuergesetz) ist eine steuerneutrale Einbringung möglich.
                  Dabei werden alle Wirtschaftsgüter des EPU zu Buchwerten in die GmbH übertragen — ohne Aufdeckung stiller Reserven.
                  Voraussetzung ist ein positiver Verkehrswert; wegen strenger Form- und Fristerfordernisse sollte die Einbringung steuerlich begleitet werden.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Was ist die Mindest-KöSt und muss ich sie auch bei Verlust zahlen?</h3>
                <p className="mb-0">
                  Ja, die Mindest-KöSt beträgt 125 €/Quartal (= 500 €/Jahr) und ist auch bei Verlust zu zahlen.
                  Sie wird aber auf die tatsächliche KöSt-Schuld der Folgejahre angerechnet. Für GmbH und FlexKap gilt
                  seit 2024 einheitlich derselbe Betrag (5% des Mindeststammkapitals von 10.000 €); die frühere
                  Staffelung für Neugründungen ist entfallen.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Was ist der Unterschied zwischen GmbH und FlexKap?</h3>
                <p className="mb-0">
                  Die FlexKap (seit 2024) ist steuerlich identisch zur GmbH (23% KöSt, 27,5% KESt), auch das
                  Mindeststammkapital ist mit 10.000 € gleich. Vorteile: Unternehmenswert-Anteile für Mitarbeiter
                  (unter 25% des Stammkapitals, ohne Stimmrecht), Anteilsübertragung per notarieller oder anwaltlicher
                  Privaturkunde statt Notariatsakt und flexiblere Satzungsgestaltung.
                  Nachteile: Noch wenig Rechtsprechung und Praxis vorhanden.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Wie hoch ist der KöSt-Satz in Österreich 2026?</h3>
                <p className="mb-0">
                  Der Körperschaftsteuersatz beträgt seit 2024 <strong className="text-sb-text">23%</strong> (§ 22 Abs. 1 KStG).
                  Er wurde schrittweise von 25% (bis 2022) über 24% (2023) auf 23% (ab 2024) gesenkt.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Kann ich als GmbH-Geschäftsführer den Gewinnfreibetrag nutzen?</h3>
                <p className="mb-0">
                  Das hängt von deiner Beteiligung ab. Bis 25% Beteiligung beziehst du lohnsteuerpflichtige Einkünfte
                  aus nichtselbständiger Arbeit, dafür steht kein Gewinnfreibetrag zu. Bei mehr als 25% Beteiligung
                  gelten deine GF-Bezüge als Einkünfte aus selbständiger Arbeit (§ 22 Z 2 EStG), dann kannst du den
                  Grundfreibetrag (bis 4.950 €) nutzen. Auf den Gewinn der GmbH selbst gibt es keinen Gewinnfreibetrag,
                  dafür gilt die niedrigere KöSt (23%).
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Gibt es eine Ein-Personen-GmbH?</h3>
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
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Fazit: Wann lohnt sich die GmbH?</h2>
            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-green/40">
              <ul className="space-y-3">
                <li><strong className="text-sb-text">Ab 60.000–80.000 € Jahresgewinn:</strong> GmbH wird steuerlich interessant (Modellrechnung, bei Vollausschüttung)</li>
                <li><strong className="text-sb-text">Ab 40.000 € bei Thesaurierung:</strong> Nur 23% KöSt statt bis zu 48% ESt</li>
                <li><strong className="text-sb-text">FlexKap als flexible Alternative:</strong> Gleiches Stammkapital und gleiche Steuern wie die GmbH, plus Unternehmenswert-Anteile</li>
                <li><strong className="text-sb-text">Sozialversicherung:</strong> ASVG nur bei GF-Beteiligung bis 25%, Alleingesellschafter bleiben SVS-versichert</li>
                <li><strong className="text-sb-text">Bei Haftungsrisiken:</strong> GmbH bietet wichtigen Schutz</li>
                <li><strong className="text-sb-text">Bei niedrigeren Gewinnen:</strong> Einzelunternehmen oft günstiger und einfacher</li>
              </ul>
              <p className="mt-4 text-sb-mut">
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
              { title: 'Steueroptimierung für Selbständige: Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              { title: 'Gewinnfreibetrag 2026: Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              { title: 'SVS-Beiträge senken: 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
            ]}
          />
        </article>
      </div>

      <SiteFooter />
    </div>
    </PublicShell>
  )
}
