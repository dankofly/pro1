import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function KleinunternehmerregelungPage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-sb-bg">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-sb-mut">
              <Link href="/" className="hover:text-sb-mut transition-colors">Home</Link>
              <span>›</span>
              <Link href="/steuerwissen" className="hover:text-sb-mut transition-colors">Steuerwissen</Link>
              <span>›</span>
              <span className="text-sb-mut">Kleinunternehmerregelung</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-sb-text mb-6 leading-tight">
              Kleinunternehmerregelung Österreich 2026 — Umsatzgrenze, Vorteile & Fallstricke
            </h1>

            <p className="text-lg text-sb-mut mb-8 leading-relaxed">
              Die Kleinunternehmerregelung befreit Selbstständige in Österreich von der Umsatzsteuer-Pflicht.
              Seit 2025 liegt die Umsatzgrenze bei 55.000€ brutto pro Jahr. Doch die Befreiung hat nicht
              nur Vorteile — der fehlende Vorsteuerabzug kann je nach Branche teuer werden. Dieser Guide
              erklärt alles, was Sie wissen müssen.
            </p>

            {/* Was ist die Kleinunternehmerregelung? */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Was ist die Kleinunternehmerregelung?
              </h2>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Die Kleinunternehmerregelung nach § 6 Abs 1 Z 27 UStG (Umsatzsteuergesetz) befreit
                Unternehmer mit geringen Umsätzen von der Umsatzsteuer. Das bedeutet: Sie stellen
                Rechnungen ohne Umsatzsteuer aus und müssen keine UVA (Umsatzsteuervoranmeldung)
                an das Finanzamt abgeben.
              </p>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Im Gegenzug können Sie keine Vorsteuer aus Ihren Einkäufen abziehen. Die auf
                Betriebsausgaben bezahlte Umsatzsteuer wird damit zum echten Kostenfaktor.
              </p>
              <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Kernfakten 2026:</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>• <strong className="text-sb-text">Umsatzgrenze:</strong> 55.000€ brutto pro Jahr (seit 2025, zuvor 35.000€ netto)</li>
                  <li>• <strong className="text-sb-text">Toleranzgrenze:</strong> Überschreitung um bis zu 10% (max. 60.500€) im selben Jahr unschädlich</li>
                  <li>• <strong className="text-sb-text">Rechnungshinweis:</strong> empfohlen (nicht verpflichtend), z.B. „Umsatzsteuerfrei gemäß § 6 Abs 1 Z 27 UStG"</li>
                  <li>• <strong className="text-sb-text">Gilt für:</strong> Gewerbetreibende, Freiberufler, Land- und Forstwirte</li>
                </ul>
              </div>
            </section>

            {/* Vor- und Nachteile */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Vor- und Nachteile der Kleinunternehmerregelung
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-sb-green-soft border border-sb-green/30 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-sb-green mb-3">Vorteile</h3>
                  <ul className="text-sb-mut space-y-2">
                    <li>• Keine USt auf Rechnungen → günstigere Preise für Privatkunden</li>
                    <li>• Keine UVA-Pflicht → weniger Verwaltung</li>
                    <li>• Keine USt-Jahreserklärung nötig</li>
                    <li>• Einfachere Buchhaltung</li>
                    <li>• Kombination mit Kleinunternehmerpauschalierung möglich</li>
                    <li>• Preisvorteil bei B2C-Geschäft</li>
                  </ul>
                </div>

                <div className="bg-sb-red/10 border border-sb-red/30 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-sb-red mb-3">Nachteile</h3>
                  <ul className="text-sb-mut space-y-2">
                    <li>• Kein Vorsteuerabzug → USt auf Einkäufe ist Kosten</li>
                    <li>• Bei B2B-Kunden kein Nachteil für diese (die ziehen ohnehin ab)</li>
                    <li>• Umsatzgrenze kann Wachstum bremsen</li>
                    <li>• Bei hohen Investitionen teuer (keine Vorsteuer)</li>
                    <li>• Überschreitung um mehr als 10% = USt-Pflicht ab dem übersteigenden Umsatz</li>
                    <li>• Wirkt weniger „professionell" bei manchen B2B-Kunden</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Umsatzgrenze im Detail */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Die Umsatzgrenze 55.000€ im Detail
              </h2>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Die Umsatzgrenze ist seit 2025 eine Bruttogrenze und bezieht sich auf den Umsatz innerhalb eines Kalenderjahres.
                Bestimmte Umsätze werden bei der Berechnung der Grenze nicht berücksichtigt:
              </p>
              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-4">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Was zählt NICHT zum Umsatz:</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>• Umsätze aus Hilfsgeschäften (z.B. Verkauf eines Betriebsmittels)</li>
                  <li>• Bestimmte steuerfreie Umsätze (z.B. ärztliche Heilbehandlungen, Anlagengold)</li>
                  <li>• Innergemeinschaftliche Erwerbe und Reverse-Charge-Umsätze als Leistungsempfänger</li>
                  <li>• Achtung: Umsätze aus Vermietung und Verpachtung zählen dagegen zur Grenze dazu, alle Tätigkeiten werden zusammengerechnet</li>
                </ul>
              </div>

              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <h3 className="font-semibold text-sb-mut mb-2">Toleranzregel:</h3>
                <p className="text-sb-mut">
                  Eine Überschreitung um bis zu 10% (= max. 60.500€) ist im selben Kalenderjahr
                  unschädlich: Die Befreiung bleibt bis zum Jahresende bestehen, ab dem Folgejahr
                  gilt sie nicht mehr. Bei Überschreitung um mehr als 10% werden der übersteigende
                  Umsatz und alle danach ausgeführten Umsätze steuerpflichtig. Einen rückwirkenden
                  Entfall der Befreiung für das ganze Jahr gibt es seit 2025 nicht mehr.
                </p>
              </div>
            </section>

            {/* Rechenbeispiele */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Rechenbeispiel: Kleinunternehmer vs. Regelbesteuerung
              </h2>

              <div className="space-y-6">
                <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                  <h3 className="text-lg font-semibold text-sb-text mb-3">
                    Grafikdesignerin, 38.000€ Umsatz, 5.000€ Betriebsausgaben
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sb-mut mb-4">
                    <div>
                      <p className="font-medium text-sb-text mb-2">Als Kleinunternehmerin:</p>
                      <p>Rechnungen: 38.000€ (netto = brutto)</p>
                      <p>Ausgaben: 5.000€ + 1.000€ USt</p>
                      <p>→ USt an FA: 0€</p>
                      <p>→ Vorsteuer: 0€ (verloren)</p>
                      <p className="font-semibold text-sb-text mt-2">Effektive Ausgaben: 6.000€</p>
                    </div>
                    <div>
                      <p className="font-medium text-sb-text mb-2">Mit Regelbesteuerung:</p>
                      <p>Rechnungen: 38.000€ + 7.600€ USt</p>
                      <p>Ausgaben: 5.000€ + 1.000€ USt</p>
                      <p>→ USt an FA: 7.600€ - 1.000€ = 6.600€</p>
                      <p>→ Vorsteuer: 1.000€ abgezogen</p>
                      <p className="font-semibold text-sb-text mt-2">Effektive Ausgaben: 5.000€</p>
                    </div>
                  </div>
                  <p className="text-sb-mut text-sm">
                    → Bei B2C-Kunden (Privatkunden): Kleinunternehmerregelung vorteilhaft, da
                    Kunden keine USt zahlen müssen und der Preis attraktiver ist.
                  </p>
                  <p className="text-sb-mut text-sm mt-1">
                    → Bei B2B-Kunden: Regelbesteuerung oft neutral, da Kunden die USt abziehen können.
                    Aber 1.000€ Vorsteuer-Ersparnis bei der Designerin.
                  </p>
                </div>

                <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                  <h3 className="text-lg font-semibold text-sb-text mb-3">
                    Fotograf, 30.000€ Umsatz, 15.000€ Equipment-Kauf
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sb-mut mb-4">
                    <div>
                      <p className="font-medium text-sb-text mb-2">Als Kleinunternehmer:</p>
                      <p>Einnahmen: 30.000€</p>
                      <p>Equipment: 15.000€ + 3.000€ USt</p>
                      <p>→ USt-Last: 0€</p>
                      <p className="font-semibold text-sb-red mt-2">3.000€ Vorsteuer verloren!</p>
                    </div>
                    <div>
                      <p className="font-medium text-sb-text mb-2">Mit Regelbesteuerung:</p>
                      <p>Einnahmen: 30.000€ + 6.000€ USt</p>
                      <p>Equipment: 15.000€ + 3.000€ USt</p>
                      <p>→ USt ans FA: 6.000€ - 3.000€ = 3.000€</p>
                      <p className="font-semibold text-sb-green mt-2">3.000€ Vorsteuer abgezogen!</p>
                    </div>
                  </div>
                  <p className="text-sb-mut text-sm">
                    → Bei hohen Investitionen lohnt sich die Regelbesteuerung deutlich.
                    Hier spart der Fotograf 3.000€ durch Vorsteuerabzug.
                  </p>
                </div>
              </div>
            </section>

            {/* EU-Kleinunternehmerregelung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                EU-Kleinunternehmerregelung (seit 2025)
              </h2>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Seit dem 1. Jänner 2025 gibt es eine EU-weite Kleinunternehmerregelung. Österreichische
                Kleinunternehmer können sich nun auch in anderen EU-Mitgliedstaaten von der USt befreien
                lassen, wenn sie dort Umsätze erzielen.
              </p>
              <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Voraussetzungen EU-KU:</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>• EU-weiter Gesamtumsatz: maximal 100.000€ pro Jahr</li>
                  <li>• Nationale Kleinunternehmergrenze des jeweiligen Landes einhalten</li>
                  <li>• Registrierung über FinanzOnline (Vorabmitteilung); Sie erhalten eine Kleinunternehmer-Identifikationsnummer mit dem Suffix EX</li>
                  <li>• Quartalsweise Umsatzmeldung an das Ansässigkeitsland</li>
                </ul>
              </div>
            </section>

            {/* Kleinunternehmerpauschalierung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Kombination mit Kleinunternehmerpauschalierung
              </h2>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Kleinunternehmer können die Kleinunternehmerpauschalierung nach § 17 Abs 3a EStG nutzen.
                Diese erlaubt pauschale Betriebsausgaben von 45% (Warenhandel/Produktion) bzw. 20%
                (Dienstleistungen) — zusätzlich zu SVS-Beiträgen und dem Grundfreibetrag.
              </p>
              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Tipp:</strong> Die Kombination aus Kleinunternehmerregelung + Kleinunternehmerpauschalierung
                  ist ideal für Dienstleister mit geringen tatsächlichen Ausgaben. Sie minimieren sowohl
                  den Verwaltungsaufwand als auch die Steuerbelastung.
                </p>
              </div>
            </section>

            {/* Verzicht/Option */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Verzicht auf die Kleinunternehmerregelung (Option zur Regelbesteuerung)
              </h2>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Wenn der Vorsteuerabzug für Sie wichtiger ist als die USt-Befreiung, können Sie
                auf die Kleinunternehmerregelung verzichten und freiwillig zur Regelbesteuerung
                optieren.
              </p>
              <div className="bg-sb-card p-5 rounded-lg border border-sb-line mb-4">
                <h3 className="text-lg font-semibold text-sb-text mb-2">So funktioniert der Verzicht:</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>1. Schriftliche Erklärung an das zuständige Finanzamt</li>
                  <li>2. Möglich bis zur Rechtskraft des USt-Bescheids, wirkt ab 1. Jänner des betreffenden Jahres (auch rückwirkend)</li>
                  <li>3. Bindet für mindestens 5 Kalenderjahre</li>
                  <li>4. Nach 5 Jahren: Widerruf durch schriftliche Erklärung möglich</li>
                  <li>5. Ab Widerruf: wieder Kleinunternehmer (wenn Umsatzgrenze passt)</li>
                </ul>
              </div>
              <div className="bg-sb-accent-soft border border-sb-accent/30 p-4 rounded-lg">
                <p className="text-sb-mut">
                  <strong>Achtung:</strong> Der Verzicht bindet 5 Jahre! Überlegen Sie gut, ob sich
                  die Regelbesteuerung langfristig lohnt. Bei wachsendem Umsatz kann es sinnvoll sein,
                  frühzeitig zu wechseln.
                </p>
              </div>
            </section>

            {/* SVS-Auswirkungen */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-4">
                Auswirkungen auf SVS-Beiträge
              </h2>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Die Kleinunternehmerregelung hat keine direkten Auswirkungen auf die SVS-Beiträge.
                Die SVS-Beitragsgrundlage wird aus dem einkommensteuerlichen Gewinn abgeleitet —
                unabhängig davon, ob Sie Kleinunternehmer sind oder nicht.
              </p>
              <p className="text-sb-mut mb-4 leading-relaxed">
                Allerdings gibt es indirekte Effekte: Da Kleinunternehmer keine Vorsteuer abziehen
                können, sind ihre effektiven Betriebsausgaben niedriger, was zu einem höheren Gewinn
                und damit höheren SVS-Beiträgen führen kann.
              </p>
              <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Opting-Out KV:</h3>
                <p className="text-sb-mut">
                  Kleinunternehmer mit Einkünften unter der Versicherungsgrenze (6.613,20€/Jahr, Stand 2026) und Umsätzen unter 55.000€
                  können sich von der Pflichtversicherung in der Kranken- und Pensionsversicherung
                  befreien lassen (Opting-Out). Es verbleibt nur die Unfallversicherung.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sb-text mb-6">
                Häufig gestellte Fragen
              </h2>
              <div className="space-y-4">
                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">Bin ich automatisch Kleinunternehmer?</h3>
                  <p className="text-sb-mut">
                    Ja, wenn Ihr Jahresumsatz unter 55.000€ brutto liegt, sind Sie automatisch Kleinunternehmer.
                    Sie müssen nichts beantragen. Die Befreiung gilt kraft Gesetz.
                  </p>
                </div>
                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">Muss ich auf meinen Rechnungen einen Hinweis anbringen?</h3>
                  <p className="text-sb-mut">
                    Verpflichtend ist der Hinweis nicht, aber empfohlen, z.B.
                    „Umsatzsteuerfrei aufgrund der Kleinunternehmerregelung (§ 6 Abs 1 Z 27 UStG)".
                    Umsatzsteuer dürfen Sie keinesfalls ausweisen.
                  </p>
                </div>
                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">Was passiert bei Überschreitung der Grenze?</h3>
                  <p className="text-sb-mut">
                    Bei Überschreitung um bis zu 10% bleibt die Befreiung bis zum Jahresende bestehen.
                    Wird die Grenze um mehr als 10% überschritten, sind der übersteigende Umsatz und
                    alle danach ausgeführten Umsätze steuerpflichtig. Die Umsätze davor bleiben befreit,
                    eine USt-Nachzahlung für das ganze Jahr gibt es seit 2025 nicht mehr.
                  </p>
                </div>
                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">Kann ich als Kleinunternehmer eine UID-Nummer haben?</h3>
                  <p className="text-sb-mut">
                    Kleinunternehmer erhalten keine UID-Nummer automatisch. Für innergemeinschaftliche
                    Erwerbe über 11.000€/Jahr oder die neue EU-Kleinunternehmerregelung können Sie aber
                    eine beantragen.
                  </p>
                </div>
                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">Gilt die Grenze pro Person oder pro Gewerbe?</h3>
                  <p className="text-sb-mut">
                    Die 55.000€-Grenze gilt für den gesamten Unternehmer — also für alle gewerblichen
                    und freiberuflichen Tätigkeiten zusammen. Mehrere Gewerbe werden addiert.
                  </p>
                </div>
                <div className="bg-sb-card p-5 rounded-lg border border-sb-line">
                  <h3 className="font-semibold text-sb-text mb-2">Wie wirkt sich die Kleinunternehmerregelung auf die Einkommensteuer aus?</h3>
                  <p className="text-sb-mut">
                    Die Kleinunternehmerregelung betrifft nur die Umsatzsteuer. Die Einkommensteuer wird
                    unabhängig davon auf den Gewinn berechnet. Allerdings ist bei Kleinunternehmern die
                    Kleinunternehmerpauschalierung (20%/45%) eine zusätzliche Option.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-12 mb-8">
              <div className="bg-sb-accent p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-sb-text mb-4">
                  Lohnt sich die Kleinunternehmerregelung für Sie?
                </h2>
                <p className="text-sb-text mb-6 leading-relaxed">
                  Berechnen Sie Ihre Steuerbelastung mit und ohne Kleinunternehmerregelung
                  und finden Sie die optimale Lösung.
                </p>
                <Button asChild className="bg-sb-accent text-sb-accent-ink hover:bg-sb-accent-deep font-semibold px-8 py-3">
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
                { name: 'Kleinunternehmerregelung', href: '/steuerwissen/kleinunternehmerregelung' },
              ]}
              sources={[
                { name: 'UStG § 6 Abs 1 Z 27 — Kleinunternehmerregelung', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873', description: 'Rechtsinformationssystem des Bundes (RIS) — Umsatzsteuergesetz' },
                { name: 'BMF — Umsatzsteuer für Kleinunternehmer', url: 'https://www.bmf.gv.at/themen/steuern/selbststaendige-unternehmer/umsatzsteuer/kleinunternehmerregelung.html', description: 'Bundesministerium für Finanzen' },
                { name: 'WKO — Kleinunternehmerregelung', url: 'https://www.wko.at/steuern/kleinunternehmerregelung-umsatzsteuer', description: 'Wirtschaftskammer Österreich' },
                { name: 'EU-Kleinunternehmerregelung ab 2025', url: 'https://www.bmf.gv.at/themen/steuern/selbststaendige-unternehmer/umsatzsteuer/eu-kleinunternehmerregelung.html', description: 'BMF — Grenzüberschreitende Kleinunternehmerregelung' },
              ]}
              relatedArticles={[
                { title: 'Pauschalierung in Österreich: Alle Arten im Vergleich', href: '/steuerwissen/pauschalierung-oesterreich' },
                { title: 'Umsatzsteuer für Selbstständige: USt-Guide 2026', href: '/steuerwissen/umsatzsteuer-selbstaendige' },
                { title: 'Steueroptimierung für Selbstständige', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              ]}
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}
