import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function NebenberuflichSelbstaendigPage() {
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
              <span className="text-sb-mut">Nebenberuflich selbständig</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-sb-text mb-6 leading-tight">
              Nebenberuflich selbständig in Österreich — Steuern, SVS & Tipps
            </h1>

            <p className="text-lg text-sb-mut mb-8 leading-relaxed">
              Du möchtest neben deinem Hauptjob selbständig tätig werden? In Österreich ist das problemlos möglich,
              aber es gibt wichtige steuerliche und sozialversicherungsrechtliche Regeln zu beachten. Dieser
              umfassende Guide erklärt dir alles: von der SVS-Pflicht über die Steuerberechnung bis zu typischen
              Fallen. Mit konkreten Berechnungsbeispielen und praktischen Tipps.
            </p>

            {/* Kurzantwort für AI Overviews */}
            <div className="bg-sb-accent-soft border border-sb-accent/30 p-5 rounded-lg mb-10">
              <p className="text-sb-mut font-medium leading-relaxed">
                <strong className="text-sb-text">Kurzantwort:</strong> Nebenberuflich selbständig bedeutet:
                (1) SVS-Pflicht für Neue Selbständige bei Einkünften über 6.613,20 € (2026), mit Gewerbeschein
                ab der Anmeldung, (2) Pflichtveranlagung bei über 730 € Nebeneinkünften,
                (3) Progressive Besteuerung aller Einkünfte zusammen, (4) Meldung bei Finanzamt, SVS und ggf.
                Gewerbebehörde, (5) Kleinunternehmerregelung bis 55.000 € Umsatz (brutto) möglich. Bei
                Mischeinkommen steigt oft der Grenzsteuersatz erheblich.
              </p>
            </div>

            {/* Wer gilt als nebenberuflich selbständig */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Wer gilt als nebenberuflich selbständig?
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Nebenberuflich selbständig bist du, wenn du zusätzlich zu einem Haupterwerb (Anstellung,
                Pension, Karenz) eine selbständige Tätigkeit ausübst. Dabei ist es rechtlich egal, ob du
                mehr Zeit mit der Anstellung oder der Selbständigkeit verbringst — entscheidend ist nur,
                dass beide Tätigkeiten parallel laufen.
              </p>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Definition nach österreichischem Recht:</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>• <strong className="text-sb-text">Haupterwerb:</strong> Anstellung, Beamtenverhältnis, Pension oder Familienbeihilfe</li>
                  <li>• <strong className="text-sb-text">Nebenerwerb:</strong> Selbständige Tätigkeit (gewerblich oder freiberuflich)</li>
                  <li>• <strong className="text-sb-text">Zeitlicher Umfang:</strong> Irrelevant für die rechtliche Einordnung</li>
                  <li>• <strong className="text-sb-text">Einkommensverhältnis:</strong> Ebenfalls irrelevant</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-sb-text mb-3">Gewerbeschein ja oder nein?</h3>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Ob du einen Gewerbeschein brauchst, hängt von deiner Tätigkeit ab:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-sb-green-soft border border-sb-green/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-green mb-2">Kein Gewerbeschein (Neue Selbständige & freie Berufe):</h4>
                  <ul className="text-sb-mut text-sm space-y-1">
                    <li>• Vortragende & Lehrende</li>
                    <li>• Autoren & Journalisten</li>
                    <li>• Künstlerische Tätigkeiten</li>
                    <li>• Wissenschaftliche Beratung & Gutachten</li>
                    <li>• Psychotherapeuten & andere Berufe mit eigenem Berufsrecht</li>
                  </ul>
                </div>
                <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-red mb-2">Gewerbeanmeldung erforderlich:</h4>
                  <ul className="text-sb-mut text-sm space-y-1">
                    <li>• IT-Dienstleistung & Programmierung (freies Gewerbe)</li>
                    <li>• Grafik, Webdesign & Werbetexten (freies Gewerbe)</li>
                    <li>• Coaching & Lebensberatung (reglementiert: Lebens- und Sozialberatung bzw. Unternehmensberatung)</li>
                    <li>• Online-Handel (E-Commerce)</li>
                    <li>• Handwerksleistungen (oft reglementiert)</li>
                    <li>• Gastronomie, Transport & Logistik</li>
                  </ul>
                </div>
              </div>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Tipp:</strong> Bei Unsicherheit unbedingt bei der WKO nachfragen! Eine falsche
                  Einschätzung kann teure Nachzahlungen und Strafen zur Folge haben. Der Service ist kostenlos.
                </p>
              </div>
            </section>

            {/* SVS-Pflicht bei Nebeneinkünften */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                SVS-Pflicht bei Nebeneinkünften: Die 6.613,20 € Grenze
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Die wichtigste Schwelle für nebenberuflich Selbständige ohne Gewerbeschein (Neue Selbständige)
                ist die SVS-Versicherungsgrenze von <strong className="text-sb-text">6.613,20 € jährlich</strong> (2026).
                Diese Grenze bezieht sich auf deine Einkünfte aus selbständiger Tätigkeit, nicht auf den Umsatz.
                Achtung: Mit Gewerbeschein bist du ab der Gewerbeanmeldung pflichtversichert, unabhängig vom
                Einkommen. Die Kleinstunternehmer-Ausnahme gibt es nur auf Antrag (Einkünfte max. 6.613,20 €
                UND Umsatz max. 55.000 €, plus weitere Voraussetzungen).
              </p>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Was passiert unter 6.613,20 €?</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>• <strong className="text-sb-text">Keine SVS-Pflicht:</strong> Du bleibst nur bei deiner Anstellungs-Krankenversicherung</li>
                  <li>• <strong className="text-sb-text">Freiwillige Versicherung:</strong> Du kannst dich trotzdem bei der SVS versichern</li>
                  <li>• <strong className="text-sb-text">Pensionszeiten:</strong> Nur über freiwillige Versicherung erwerbbar</li>
                  <li>• <strong className="text-sb-text">Unfallversicherung:</strong> Nur bei freiwilliger SVS-Versicherung</li>
                </ul>
              </div>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Was passiert über 6.613,20 €?</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>• <strong className="text-sb-text">SVS-Pflichtversicherung:</strong> Automatische Anmeldung bei der SVS</li>
                  <li>• <strong className="text-sb-text">Doppelversicherung:</strong> ASVG (Anstellung) + GSVG (SVS) parallel</li>
                  <li>• <strong className="text-sb-text">Mindestbeitrag 2026:</strong> Ca. 160,81 €/Monat (rund 1.930 €/Jahr)</li>
                  <li>• <strong className="text-sb-text">Unfallversicherung:</strong> Automatisch inkludiert (155,40 €/Jahr = 12,95 €/Monat)</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-sb-text mb-3">SVS-Beitragssätze 2026 im Detail:</h3>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-sb-card rounded-lg overflow-hidden">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="p-3 text-left text-sb-text">Versicherung</th>
                      <th className="p-3 text-right text-sb-text">Beitragssatz</th>
                      <th className="p-3 text-right text-sb-text">Minimum/Monat</th>
                    </tr>
                  </thead>
                  <tbody className="text-sb-mut">
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Pensionsversicherung</td>
                      <td className="p-3 text-right">18,50%</td>
                      <td className="p-3 text-right">€ 101,95</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Krankenversicherung</td>
                      <td className="p-3 text-right">6,80%</td>
                      <td className="p-3 text-right">€ 37,47</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Selbständigenvorsorge</td>
                      <td className="p-3 text-right">1,53%</td>
                      <td className="p-3 text-right">€ 8,43</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Unfallversicherung</td>
                      <td className="p-3 text-right">Pauschal</td>
                      <td className="p-3 text-right">€ 12,95</td>
                    </tr>
                    <tr className="border-t border-sb-line bg-white/[0.05]">
                      <td className="p-3 font-semibold text-sb-text">Gesamt</td>
                      <td className="p-3 text-right font-semibold text-sb-text">26,83%*</td>
                      <td className="p-3 text-right font-semibold text-sb-text">€ 160,81</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sb-mut text-sm mb-6">
                * Summe der Beitragssätze PV + KV + Selbständigenvorsorge. Mindestbeiträge auf Basis der
                Mindestbeitragsgrundlage von 551,10 €/Monat (2026), Unfallversicherung als Fixbetrag.
              </p>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Achtung:</strong> Die Doppelversicherung bedeutet höhere Gesamtkosten, aber auch
                  bessere Absicherung, etwa zusätzliche Pensionszeiten. Kalkuliere die SVS-Beiträge auf
                  deine selbständigen Einkünfte als volle Mehrkosten ein.
                </p>
              </div>
            </section>

            {/* Steuerberechnung bei Mischeinkommen */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Steuerberechnung bei Mischeinkommen — So funktioniert's
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Bei Mischeinkommen aus Anstellung und Selbständigkeit werden alle Einkünfte zusammengerechnet
                und mit dem progressiven Einkommensteuertarif besteuert. Das kann dazu führen, dass deine
                selbständigen Einkünfte mit einem höheren Grenzsteuersatz belastet werden als bei der Anstellung.
              </p>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-sb-accent mb-2">Wichtige Regel:</h4>
                <p className="text-sb-mut">
                  Als Arbeitnehmer mit Nebeneinkünften über 730 € musst du eine Pflichtveranlagung
                  (Steuererklärung) abgeben. Darunter ist es freiwillig, aber oft vorteilhaft. Der
                  Veranlagungsfreibetrag von 730 € schleift sich zwischen 730 € und 1.460 € ein.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-sb-text mb-3">Österreichischer Einkommensteuertarif 2026:</h3>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-sb-card rounded-lg overflow-hidden">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="p-3 text-left text-sb-text">Einkommen (€)</th>
                      <th className="p-3 text-center text-sb-text">Grenzsteuersatz</th>
                      <th className="p-3 text-right text-sb-text">Beispiel Durchschnitt</th>
                    </tr>
                  </thead>
                  <tbody className="text-sb-mut">
                    <tr className="border-t border-sb-line">
                      <td className="p-3">0 - 13.539</td>
                      <td className="p-3 text-center text-sb-green font-medium">0%</td>
                      <td className="p-3 text-right">0%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">13.540 - 21.992</td>
                      <td className="p-3 text-center text-sb-accent font-medium">20%</td>
                      <td className="p-3 text-right">7,7%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">21.993 - 36.458</td>
                      <td className="p-3 text-center text-sb-accent font-medium">30%</td>
                      <td className="p-3 text-right">16,5%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">36.459 - 70.365</td>
                      <td className="p-3 text-center text-sb-red font-medium">40%</td>
                      <td className="p-3 text-right">27,8%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">70.366 - 104.859</td>
                      <td className="p-3 text-center text-sb-red font-medium">48%</td>
                      <td className="p-3 text-right">34,5%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">104.860 - 1.000.000</td>
                      <td className="p-3 text-center text-sb-red font-medium">50%</td>
                      <td className="p-3 text-right">48,4%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">über 1.000.000</td>
                      <td className="p-3 text-center text-sb-red font-medium">55%</td>
                      <td className="p-3 text-right">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-sb-text mb-4">Berechnungsbeispiel: Angestellter + Nebeneinkommen</h3>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h4 className="font-semibold text-sb-text mb-3">Ausgangssituation:</h4>
                <ul className="text-sb-mut space-y-1">
                  <li>• Bruttogehalt: 40.000 € (entspricht ca. 28.500 € netto)</li>
                  <li>• Gewinn aus selbständiger Tätigkeit: 15.000 €</li>
                  <li>• Gesamteinkommen: 55.000 €</li>
                  <li>• Vereinfachte Rechnung: direkt auf das Bruttoeinkommen, ohne SV-Abzug, Werbungskosten und Absetzbeträge</li>
                </ul>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-sb-card rounded-lg overflow-hidden">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="p-3 text-left text-sb-text">Bereich</th>
                      <th className="p-3 text-right text-sb-text">Betrag (€)</th>
                      <th className="p-3 text-center text-sb-text">Steuersatz</th>
                      <th className="p-3 text-right text-sb-text">Steuer (€)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sb-mut">
                    <tr className="border-t border-sb-line">
                      <td className="p-3">0 - 13.539</td>
                      <td className="p-3 text-right">13.539</td>
                      <td className="p-3 text-center">0%</td>
                      <td className="p-3 text-right">0</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">13.540 - 21.992</td>
                      <td className="p-3 text-right">8.453</td>
                      <td className="p-3 text-center">20%</td>
                      <td className="p-3 text-right">1.691</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">21.993 - 36.458</td>
                      <td className="p-3 text-right">14.466</td>
                      <td className="p-3 text-center">30%</td>
                      <td className="p-3 text-right">4.340</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">36.459 - 55.000</td>
                      <td className="p-3 text-right">18.542</td>
                      <td className="p-3 text-center">40%</td>
                      <td className="p-3 text-right">7.417</td>
                    </tr>
                    <tr className="border-t border-sb-line bg-white/[0.05]">
                      <td className="p-3 font-semibold text-sb-text">Gesamt</td>
                      <td className="p-3 text-right font-semibold text-sb-text">55.000</td>
                      <td className="p-3 text-center font-semibold text-sb-text">24,5%</td>
                      <td className="p-3 text-right font-semibold text-sb-text">13.447</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Wichtig:</strong> Die 15.000 € aus selbständiger Tätigkeit werden größtenteils mit
                  40% besteuert! Ohne das Nebeneinkommen läge der Durchschnittssteuersatz bei rund 18,6%.
                  Plane daher rund 40-50% der Nebeneinkünfte für Steuern und SVS-Beiträge ein.
                </p>
              </div>
            </section>

            {/* Meldepflichten */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Meldepflichten — Diese Behördengänge stehen an
              </h2>

              <p className="text-sb-mut mb-6 leading-relaxed">
                Als nebenberuflich Selbständiger musst du dich bei mehreren Stellen anmelden. Die Reihenfolge
                und die Fristen sind wichtig, um Strafen zu vermeiden.
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-sb-card p-4 rounded-lg border-l-4 border-sb-accent/40">
                  <h4 className="font-semibold text-sb-text mb-2">1. Gewerbebehörde (falls nötig)</h4>
                  <p className="text-sb-mut text-sm mb-2">
                    <strong>Wann:</strong> Vor Aufnahme der gewerblichen Tätigkeit
                  </p>
                  <p className="text-sb-mut text-sm">
                    <strong>Was:</strong> Gewerbeschein beantragen, WKO-Mitgliedschaft wird automatisch begründet
                  </p>
                </div>

                <div className="bg-sb-card p-4 rounded-lg border-l-4 border-sb-green/40">
                  <h4 className="font-semibold text-sb-text mb-2">2. Finanzamt</h4>
                  <p className="text-sb-mut text-sm mb-2">
                    <strong>Wann:</strong> Innerhalb eines Monats nach Tätigkeitsaufnahme
                  </p>
                  <p className="text-sb-mut text-sm">
                    <strong>Was:</strong> Fragebogen zur steuerlichen Erfassung (Verf 24), ev. USt-Nummer
                  </p>
                </div>

                <div className="bg-sb-card p-4 rounded-lg border-l-4 border-sb-accent">
                  <h4 className="font-semibold text-sb-text mb-2">3. SVS</h4>
                  <p className="text-sb-mut text-sm mb-2">
                    <strong>Wann:</strong> Binnen eines Monats selbst melden. Gewerbetreibende werden über die
                    Gewerbeanmeldung erfasst; Neue Selbständige melden die Überschreitung der Versicherungsgrenze
                    (6.613,20 €, 2026) per Versicherungserklärung
                  </p>
                  <p className="text-sb-mut text-sm">
                    <strong>Was:</strong> Schickt Beitragsvorschreibung. Wird die Überschreitung erst über den
                    Steuerbescheid bekannt, kommen die Beiträge rückwirkend
                  </p>
                </div>

                <div className="bg-sb-card p-4 rounded-lg border-l-4 border-sb-accent">
                  <h4 className="font-semibold text-sb-text mb-2">4. Arbeitgeber informieren?</h4>
                  <p className="text-sb-mut text-sm mb-2">
                    <strong>Rechtlich:</strong> Keine generelle Meldepflicht
                  </p>
                  <p className="text-sb-mut text-sm">
                    <strong>Arbeitsvertrag prüfen:</strong> Oft Nebentätigkeits-Klauseln oder Genehmigungspflicht
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-sb-text mb-3">Finanzamt-Fragebogen Verf 24</h3>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Das wichtigste Dokument ist der Fragebogen zur steuerlichen Erfassung. Hier musst du deine
                Tätigkeit genau beschreiben und wichtige Entscheidungen treffen:
              </p>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h4 className="text-sb-text font-semibold mb-3">Wichtige Punkte im Verf 24:</h4>
                <ul className="text-sb-mut space-y-2">
                  <li>• <strong className="text-sb-text">Tätigkeitsbeschreibung:</strong> Sei präzise, das bestimmt die steuerliche Behandlung</li>
                  <li>• <strong className="text-sb-text">Geschäftsadresse:</strong> Arbeitszimmer zu Hause ist möglich</li>
                  <li>• <strong className="text-sb-text">Kleinunternehmerregelung:</strong> Entscheidung über USt-Pflicht</li>
                  <li>• <strong className="text-sb-text">Gewinnermittlungsart:</strong> E/A-Rechnung vs. doppelte Buchführung</li>
                  <li>• <strong className="text-sb-text">Vorauszahlungen:</strong> Wie viel Einkommensteuer wird vierteljährlich vorgeschrieben</li>
                </ul>
              </div>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Tipp:</strong> Den Verf 24 gibt's online über FinanzOnline. Du kannst ihn vorab
                  herunterladen und in Ruhe ausfüllen. Bei Unsicherheiten lieber einen Steuerberater
                  konsultieren — falsche Angaben sind später schwer zu korrigieren.
                </p>
              </div>
            </section>

            {/* Umsatzsteuer */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Umsatzsteuer — Kleinunternehmerregelung vs. Vollversicherung
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Ein wichtiger Entscheidungspunkt für Nebenberufler ist die Umsatzsteuer. Die
                Kleinunternehmerregelung nach § 6 Abs. 1 Z 27 UStG befreit dich seit 2025 bis zu einem
                Jahresumsatz von 55.000 € (brutto) von der Umsatzsteuerpflicht. Eine einmalige
                Überschreitung um bis zu 10% ist toleriert.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-sb-green-soft border border-sb-green/30 p-5 rounded-lg">
                  <h3 className="font-semibold text-sb-green mb-3">Kleinunternehmerregelung</h3>
                  <h4 className="text-sb-text font-medium mb-2">Vorteile:</h4>
                  <ul className="text-sb-mut text-sm space-y-1 mb-3">
                    <li>• Keine USt-Voranmeldung nötig</li>
                    <li>• Keine 20% USt auf Rechnungen</li>
                    <li>• Einfachere Buchführung</li>
                    <li>• Weniger Bürokratie</li>
                  </ul>
                  <h4 className="text-sb-text font-medium mb-2">Nachteile:</h4>
                  <ul className="text-sb-mut text-sm space-y-1">
                    <li>• Kein Vorsteuerabzug</li>
                    <li>• Weniger professionell</li>
                    <li>• B2B-Kunden bevorzugen USt-pflichtige Lieferanten</li>
                  </ul>
                </div>

                <div className="bg-sb-accent-soft border border-sb-accent/30 p-5 rounded-lg">
                  <h3 className="font-semibold text-sb-accent mb-3">USt-Vollversicherung</h3>
                  <h4 className="text-sb-text font-medium mb-2">Vorteile:</h4>
                  <ul className="text-sb-mut text-sm space-y-1 mb-3">
                    <li>• Vorsteuerabzug bei Betriebsausgaben</li>
                    <li>• Professionellerer Eindruck</li>
                    <li>• B2B-Kunden neutral bezüglich USt</li>
                    <li>• Einfacher bei EU-Geschäften</li>
                  </ul>
                  <h4 className="text-sb-text font-medium mb-2">Nachteile:</h4>
                  <ul className="text-sb-mut text-sm space-y-1">
                    <li>• USt-Voranmeldung (quartalsweise bis 100.000 € Vorjahresumsatz, darüber monatlich)</li>
                    <li>• 20% USt auf alle Rechnungen</li>
                    <li>• Mehr Bürokratie</li>
                    <li>• Jahreserklärung komplexer</li>
                  </ul>
                </div>
              </div>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Entscheidungshilfe:</h3>
                <p className="text-sb-mut mb-3">
                  Wähle die Kleinunternehmerregelung, wenn:
                </p>
                <ul className="text-sb-mut space-y-1 mb-4">
                  <li>• Du hauptsächlich an Endkunden verkaufst (B2C)</li>
                  <li>• Deine Betriebsausgaben niedrig sind (wenig Vorsteuer)</li>
                  <li>• Du unter 55.000 € Jahresumsatz (brutto) bleibst</li>
                  <li>• Du den administrativen Aufwand minimal halten willst</li>
                </ul>

                <p className="text-sb-mut mb-3">
                  Wähle die USt-Vollversicherung, wenn:
                </p>
                <ul className="text-sb-mut space-y-1">
                  <li>• Du hauptsächlich an Unternehmen verkaufst (B2B)</li>
                  <li>• Du hohe Betriebsausgaben hast (viel Vorsteuer)</li>
                  <li>• Du über 55.000 € Jahresumsatz planst</li>
                  <li>• Du professionell auftreten willst</li>
                </ul>
              </div>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Wichtig:</strong> Die Kleinunternehmerregelung selbst bindet dich nicht. Nur der
                  Verzicht auf die Befreiung (Option zur Regelbesteuerung) bindet für mindestens 5 Jahre.
                  Wechsle daher nur mit guter Begründung, etwa bei dauerhaft hoher Vorsteuer oder
                  Überschreitung der 55.000 € Grenze.
                </p>
              </div>
            </section>

            {/* Typische Fehler */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Typische Fehler vermeiden — Die 7 häufigsten Fallen
              </h2>

              <div className="space-y-4 mb-6">
                <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-red mb-2">1. Zu niedrige Steuerrücklagen</h4>
                  <p className="text-sb-mut text-sm">
                    Viele nebenberuflich Selbständige vergessen, dass ihre Einkünfte oft mit bis zu 40%
                    Grenzsteuersatz besteuert werden und SVS-Beiträge dazukommen. Lege rund 50% deiner
                    Gewinne für Steuern und SVS zurück.
                  </p>
                </div>

                <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-red mb-2">2. SVS-Grenze übersehen</h4>
                  <p className="text-sb-mut text-sm">
                    Bei Überschreitung der 6.613,20 € Grenze wirst du rückwirkend SVS-pflichtig.
                    Das bedeutet auch rückwirkende Beitragszahlung! Überwache deine Einkünfte laufend.
                  </p>
                </div>

                <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-red mb-2">3. Gewerbeschein vergessen</h4>
                  <p className="text-sb-mut text-sm">
                    Gewerbliche Tätigkeit ohne Gewerbeschein kann teure Strafen kosten. Bei Unsicherheit
                    immer vorher bei der WKO nachfragen — auch per Telefon möglich.
                  </p>
                </div>

                <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-red mb-2">4. Arbeitsvertrag ignorieren</h4>
                  <p className="text-sb-mut text-sm">
                    Viele Arbeitsverträge enthalten Nebentätigkeits-Klauseln oder sogar Verbote.
                    Prüfe deinen Vertrag und hole dir ggf. die Genehmigung des Arbeitgebers.
                  </p>
                </div>

                <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-red mb-2">5. Betriebsausgaben nicht nutzen</h4>
                  <p className="text-sb-mut text-sm">
                    Arbeitsplatzpauschale, Telefon, Internet, Fachliteratur: nutze alle möglichen Absetzungen.
                    Mit Gehalt über 13.539 € (2026) stehen dir 300 € Arbeitsplatzpauschale ohne Nachweis zu,
                    die 1.200 € gibt es nur ohne bzw. mit geringen anderen aktiven Erwerbseinkünften.
                  </p>
                </div>

                <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-red mb-2">6. Umsatz vs. Einkünfte verwechseln</h4>
                  <p className="text-sb-mut text-sm">
                    Die SVS-Versicherungsgrenze von 6.613,20 € bezieht sich auf Einkünfte (Gewinn), nicht auf
                    Umsatz! Die USt-Grenze von 55.000 € hingegen auf den Brutto-Umsatz. Nicht verwechseln.
                  </p>
                </div>

                <div className="bg-sb-red/10 border border-sb-red/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-sb-red mb-2">7. Keine Belege sammeln</h4>
                  <p className="text-sb-mut text-sm">
                    Sammle alle Belege systematisch. Die 7-Jahres-Aufbewahrungspflicht gilt auch für
                    Nebenberufler. Nutze digitale Tools wie Cloud-Scanner oder Buchhaltungssoftware.
                  </p>
                </div>
              </div>
            </section>

            {/* Berechnungsbeispiel mit Tabelle */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Komplettes Berechnungsbeispiel — So wird's real berechnet
              </h2>

              <p className="text-sb-mut mb-4 leading-relaxed">
                Schauen wir uns ein realistisches Beispiel an: Maria arbeitet als Angestellte in einem
                IT-Unternehmen und betreibt nebenberuflich Webdesign.
              </p>

              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-6">
                <h3 className="text-lg font-semibold text-sb-text mb-3">Marias Situation 2026:</h3>
                <ul className="text-sb-mut space-y-1">
                  <li>• <strong className="text-sb-text">Anstellung:</strong> 42.000 € brutto/Jahr</li>
                  <li>• <strong className="text-sb-text">Webdesign-Umsatz:</strong> 25.000 €</li>
                  <li>• <strong className="text-sb-text">Betriebsausgaben:</strong> 7.000 € (Software, Hardware, Fortbildung)</li>
                  <li>• <strong className="text-sb-text">Gewinn aus Selbständigkeit:</strong> 18.000 €</li>
                  <li>• <strong className="text-sb-text">Gesamteinkommen:</strong> 60.000 €</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-sb-text mb-3">1. SVS-Beiträge berechnen:</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-sb-card rounded-lg overflow-hidden">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="p-3 text-left text-sb-text">Position</th>
                      <th className="p-3 text-right text-sb-text">Berechnung</th>
                      <th className="p-3 text-right text-sb-text">Betrag/Monat</th>
                      <th className="p-3 text-right text-sb-text">Betrag/Jahr</th>
                    </tr>
                  </thead>
                  <tbody className="text-sb-mut">
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Beitragsgrundlage</td>
                      <td className="p-3 text-right">18.000 € (Gewinn)</td>
                      <td className="p-3 text-right">1.500 €</td>
                      <td className="p-3 text-right">18.000 €</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Pensionsversicherung (18,50%)</td>
                      <td className="p-3 text-right">18.000 × 18,50%</td>
                      <td className="p-3 text-right">277,50 €</td>
                      <td className="p-3 text-right">3.330 €</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Krankenversicherung (6,80%)</td>
                      <td className="p-3 text-right">18.000 × 6,80%</td>
                      <td className="p-3 text-right">102 €</td>
                      <td className="p-3 text-right">1.224 €</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Selbständigenvorsorge (1,53%)</td>
                      <td className="p-3 text-right">18.000 × 1,53%</td>
                      <td className="p-3 text-right">22,95 €</td>
                      <td className="p-3 text-right">275,40 €</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Unfallversicherung (pauschal)</td>
                      <td className="p-3 text-right">Fixbetrag</td>
                      <td className="p-3 text-right">12,95 €</td>
                      <td className="p-3 text-right">155,40 €</td>
                    </tr>
                    <tr className="border-t border-sb-line bg-white/[0.05]">
                      <td className="p-3 font-semibold text-sb-text">SVS-Beiträge gesamt</td>
                      <td className="p-3 text-right font-semibold text-sb-text"></td>
                      <td className="p-3 text-right font-semibold text-sb-text">415,40 €</td>
                      <td className="p-3 text-right font-semibold text-sb-text">4.984,80 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sb-mut text-sm mb-6">
                Vereinfacht: Die endgültige SVS-Beitragsgrundlage ist der Gewinn laut Steuerbescheid plus
                die im Jahr vorgeschriebenen PV- und KV-Beiträge (Hinzurechnung). Die endgültigen Beiträge
                liegen daher etwas höher.
              </p>

              <h3 className="text-lg font-semibold text-sb-text mb-3">2. Einkommensteuer berechnen:</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-sb-card rounded-lg overflow-hidden">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="p-3 text-left text-sb-text">Einkommen-Bereich</th>
                      <th className="p-3 text-right text-sb-text">Betrag</th>
                      <th className="p-3 text-center text-sb-text">Steuersatz</th>
                      <th className="p-3 text-right text-sb-text">Steuer</th>
                    </tr>
                  </thead>
                  <tbody className="text-sb-mut">
                    <tr className="border-t border-sb-line">
                      <td className="p-3">0 - 13.539 €</td>
                      <td className="p-3 text-right">13.539 €</td>
                      <td className="p-3 text-center">0%</td>
                      <td className="p-3 text-right">0 €</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">13.540 - 21.992 €</td>
                      <td className="p-3 text-right">8.453 €</td>
                      <td className="p-3 text-center">20%</td>
                      <td className="p-3 text-right">1.690,60 €</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">21.993 - 36.458 €</td>
                      <td className="p-3 text-right">14.466 €</td>
                      <td className="p-3 text-center">30%</td>
                      <td className="p-3 text-right">4.339,80 €</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">36.459 - 60.000 €</td>
                      <td className="p-3 text-right">23.542 €</td>
                      <td className="p-3 text-center">40%</td>
                      <td className="p-3 text-right">9.416,80 €</td>
                    </tr>
                    <tr className="border-t border-sb-line bg-white/[0.05]">
                      <td className="p-3 font-semibold text-sb-text">Einkommensteuer gesamt (vereinfacht)</td>
                      <td className="p-3 text-right font-semibold text-sb-text">60.000 €</td>
                      <td className="p-3 text-center font-semibold text-sb-text">25,7%</td>
                      <td className="p-3 text-right font-semibold text-sb-text">15.447,20 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-sb-text mb-3">3. Gesamtbelastung Übersicht:</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-sb-card rounded-lg overflow-hidden">
                  <thead className="bg-white/[0.05]">
                    <tr>
                      <th className="p-3 text-left text-sb-text">Position</th>
                      <th className="p-3 text-right text-sb-text">Betrag</th>
                      <th className="p-3 text-right text-sb-text">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sb-mut">
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Bruttogehalt + Gewinn</td>
                      <td className="p-3 text-right text-sb-text">60.000 €</td>
                      <td className="p-3 text-right">100%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Einkommensteuer</td>
                      <td className="p-3 text-right">15.447 €</td>
                      <td className="p-3 text-right">25,7%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">SVS-Beiträge (Nebentätigkeit)</td>
                      <td className="p-3 text-right">4.985 €</td>
                      <td className="p-3 text-right">8,3%</td>
                    </tr>
                    <tr className="border-t border-sb-line">
                      <td className="p-3">Angestellten-SV (geschätzt)</td>
                      <td className="p-3 text-right">7.560 €</td>
                      <td className="p-3 text-right">18,0%*</td>
                    </tr>
                    <tr className="border-t border-sb-line bg-white/[0.05]">
                      <td className="p-3 font-semibold text-sb-text">Netto verfügbar</td>
                      <td className="p-3 text-right font-semibold text-sb-text">32.008 €</td>
                      <td className="p-3 text-right font-semibold text-sb-text">53,3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Fazit:</strong> Rechnet man die SVS-Beiträge als Betriebsausgabe gegen und
                  berücksichtigt den Grenzsteuersatz von 40%, bleiben Maria von den 18.000 € Gewinn
                  aus der Nebentätigkeit etwa 8.000 bis 8.600 € netto (mit Gewinnfreibetrag am oberen
                  Rand). Das entspricht einer Belastung von rund 50-55% auf die Nebeneinkünfte.
                </p>
              </div>
            </section>

            {/* CTA zum Misch-Einkommen Rechner */}
            <section className="mb-10">
              <div className="bg-sb-accent-soft border border-sb-accent/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-sb-text mb-3">
                  Berechne deine Steuerbelastung bei Mischeinkommen
                </h3>
                <p className="text-sb-mut mb-4 leading-relaxed">
                  Unser Misch-Einkommen-Rechner zeigt dir genau, wie sich deine Steuerbelastung bei
                  Einkommen aus Anstellung und Selbständigkeit entwickelt. Mit detaillierter Aufschlüsselung
                  von Einkommensteuer und SVS-Beiträgen.
                </p>
                <Button asChild>
                  <Link href="/misch-einkommen" className="inline-flex items-center">
                    Zum Misch-Einkommen-Rechner
                    <span className="ml-2">→</span>
                  </Link>
                </Button>
              </div>
            </section>

            {/* FAQ Sektion */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-6">
                Häufige Fragen zur nebenberuflichen Selbständigkeit
              </h2>

              <div className="space-y-4">
                <details className="bg-sb-card border border-sb-line rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-white/[0.05] transition-colors">
                    <span className="font-medium text-sb-text">Muss ich als nebenberuflich Selbständiger zur SVS?</span>
                  </summary>
                  <div className="p-4 pt-0 text-sb-mut">
                    <p className="leading-relaxed">
                      Als Neuer Selbständiger bist du pflichtversichert, sobald deine Einkünfte aus selbständiger
                      Tätigkeit 6.613,20 € pro Jahr (2026) überschreiten. Mit Gewerbeschein bist du ab der
                      Gewerbeanmeldung pflichtversichert; eine Ausnahme gibt es nur auf Antrag. Bei niedrigeren
                      Einkünften kannst du dich freiwillig versichern, um Pensionszeiten zu sammeln. Melde die
                      Überschreitung selbst, sonst kommen die Beiträge rückwirkend.
                    </p>
                  </div>
                </details>

                <details className="bg-sb-card border border-sb-line rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-white/[0.05] transition-colors">
                    <span className="font-medium text-sb-text">Ab welchem Nebeneinkommen muss ich eine Steuererklärung machen?</span>
                  </summary>
                  <div className="p-4 pt-0 text-sb-mut">
                    <p className="leading-relaxed">
                      Als Arbeitnehmer musst du bei über 730 € jährlichen Einkünften aus selbständiger Tätigkeit
                      eine Pflichtveranlagung (Steuererklärung) abgeben (Veranlagungsfreibetrag, schleift sich
                      bis 1.460 € ein). Diese Grenze gilt für die Einkünfte (Gewinn), nicht für den Umsatz.
                      Darunter ist die Veranlagung freiwillig, aber oft vorteilhaft wegen Betriebsausgabenabzug.
                    </p>
                  </div>
                </details>

                <details className="bg-sb-card border border-sb-line rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-white/[0.05] transition-colors">
                    <span className="font-medium text-sb-text">Wie wird Mischeinkommen aus Anstellung und Selbständigkeit besteuert?</span>
                  </summary>
                  <div className="p-4 pt-0 text-sb-mut">
                    <p className="leading-relaxed">
                      Alle Einkünfte werden zusammengerechnet und mit dem progressiven Einkommensteuertarif
                      besteuert. Dabei kann der Grenzsteuersatz auf die selbständigen Einkünfte höher sein
                      als bei der Anstellung. Bei einem Gesamteinkommen von 60.000 € werden die letzten
                      Euros bereits mit 40% besteuert. Daher solltest du rund 40-50% der Nebeneinkünfte
                      für Steuern und SVS zurücklegen.
                    </p>
                  </div>
                </details>

                <details className="bg-sb-card border border-sb-line rounded-lg">
                  <summary className="p-4 cursor-pointer hover:bg-white/[0.05] transition-colors">
                    <span className="font-medium text-sb-text">Kann ich nebenberuflich selbständig sein ohne Gewerbeschein?</span>
                  </summary>
                  <div className="p-4 pt-0 text-sb-mut">
                    <p className="leading-relaxed">
                      Das kommt auf die Tätigkeit an. Nur echte freie Tätigkeiten (Vortragende, Autoren, Künstler,
                      Wissenschaft) brauchen keinen Gewerbeschein. IT-Dienstleistung, Webdesign, Grafik und
                      Werbetexten sind freie Gewerbe: keine Befähigungsprüfung, aber Gewerbeanmeldung nötig.
                      Coaching ist reglementiert (Lebens- und Sozialberatung bzw. Unternehmensberatung).
                      Bei Unsicherheit unbedingt bei der WKO nachfragen, auch telefonisch möglich und kostenlos.
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
                  name: "Sozialversicherung der Selbständigen (SVS): Aktuelle Werte",
                  url: "https://www.svs.at/cdscontent/?contentid=10007.816718&portal=svsportal",
                  description: "Versicherungsgrenze und aktuelle Beitragswerte der SVS"
                },
                {
                  name: "Wirtschaftskammer Österreich: Sozialversicherung für Gründer",
                  url: "https://www.wko.at/gruendung/sozialversicherung",
                  description: "GSVG-Pflichtversicherung, Mindestbeiträge und Kleinstunternehmer-Ausnahme"
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
                  title: "SVS-Beiträge senken: 7 legale Strategien für Selbständige",
                  href: "/steuerwissen/svs-beitraege-senken"
                },
                {
                  title: "Kleinunternehmerregelung in Österreich: Vor- und Nachteile",
                  href: "/steuerwissen/kleinunternehmerregelung"
                },
                {
                  title: "Steueroptimierung für Selbständige: Die komplette Anleitung",
                  href: "/steuerwissen/steueroptimierung-selbststaendige"
                }
              ]}
              breadcrumbs={[
                { name: "SteuerBoard.pro", href: "/" },
                { name: "Steuerwissen", href: "/steuerwissen" },
                { name: "Nebenberuflich selbständig", href: "/steuerwissen/nebenberuflich-selbstaendig" }
              ]}
              lastUpdated="2026-07-30"
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}