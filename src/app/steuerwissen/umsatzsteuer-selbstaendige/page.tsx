import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function UmsatzsteuerSelbstaendigePage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
              <span>›</span>
              <Link href="/steuerwissen" className="hover:text-slate-300 transition-colors">Steuerwissen</Link>
              <span>›</span>
              <span className="text-slate-300">Umsatzsteuer</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Umsatzsteuer für Selbstständige in Österreich — USt-Guide 2026
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Die Umsatzsteuer (USt) ist für Selbstständige in Österreich eine der wichtigsten Steuerarten.
              Sie betrifft nahezu jeden Geschäftsvorfall — von der Rechnungsstellung über den Vorsteuerabzug
              bis zur regelmäßigen UVA-Meldung. Dieser Guide erklärt alle relevanten Aspekte der Umsatzsteuer
              für Selbstständige und Unternehmer.
            </p>

            {/* Grundlagen */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                USt-Grundlagen: Wie funktioniert die Umsatzsteuer?
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Die Umsatzsteuer ist eine indirekte Steuer, die auf den Endverbraucher überwälzt wird.
                Als Unternehmer sind Sie Steuerschuldner — Sie kassieren die USt von Ihren Kunden ein
                und führen sie an das Finanzamt ab. Gleichzeitig können Sie die USt, die Sie selbst
                bei Einkäufen bezahlt haben (Vorsteuer), gegenrechnen.
              </p>
              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Das Prinzip in einem Satz:</h3>
                <p className="text-slate-300 text-lg">
                  <strong className="text-white">Zahllast = Umsatzsteuer (Ausgangsrechnungen) − Vorsteuer (Eingangsrechnungen)</strong>
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Ist die Vorsteuer höher als die USt, erhalten Sie eine Gutschrift vom Finanzamt.
                </p>
              </div>
            </section>

            {/* USt-Sätze */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Die drei USt-Sätze in Österreich
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-300 border border-slate-700 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="text-left p-3 text-white">Steuersatz</th>
                      <th className="text-left p-3 text-white">Höhe</th>
                      <th className="text-left p-3 text-white">Anwendung</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="bg-slate-900">
                      <td className="p-3 font-medium text-white">Normalsteuersatz</td>
                      <td className="p-3 text-lg font-bold">20%</td>
                      <td className="p-3">Die meisten Waren und Dienstleistungen, IT-Services, Beratung, Handwerk</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3 font-medium text-white">Ermäßigter Satz</td>
                      <td className="p-3 text-lg font-bold">13%</td>
                      <td className="p-3">Blumen, Kunstgegenstände, Tierfutter, Filmvorführungen, lebende Tiere</td>
                    </tr>
                    <tr className="bg-slate-900">
                      <td className="p-3 font-medium text-white">Besonders ermäßigter Satz</td>
                      <td className="p-3 text-lg font-bold">10%</td>
                      <td className="p-3">Lebensmittel, Bücher, Zeitungen, Miete, Personenbeförderung, Medikamente</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg mt-4">
                <p className="text-blue-200">
                  <strong>Tipp:</strong> Prüfen Sie bei jeder Rechnung den korrekten Steuersatz.
                  Ein falscher Steuersatz kann bei einer Betriebsprüfung zu Nachforderungen führen.
                </p>
              </div>
            </section>

            {/* Vorsteuerabzug */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Vorsteuerabzug — So funktioniert er
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Der Vorsteuerabzug ist das Kernprinzip des Umsatzsteuersystems. Sie können die USt,
                die Ihnen andere Unternehmer in Rechnung stellen, von Ihrer eigenen USt-Schuld abziehen.
              </p>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-4">
                <h3 className="text-lg font-semibold text-white mb-3">Voraussetzungen für den Vorsteuerabzug:</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Ordnungsgemäße Rechnung mit allen Pflichtangaben (§ 11 UStG)</li>
                  <li>• Leistung wurde für Ihr Unternehmen erbracht</li>
                  <li>• Sie sind selbst zum Vorsteuerabzug berechtigt (nicht als Kleinunternehmer)</li>
                  <li>• Die Leistung wird nicht für USt-freie Umsätze verwendet</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">Rechenbeispiel:</h3>
                <div className="text-slate-300 space-y-1">
                  <p>Sie stellen Rechnungen über: 10.000€ netto + 2.000€ USt (20%)</p>
                  <p>Sie kaufen Büromaterial: 500€ netto + 100€ USt</p>
                  <p>Sie kaufen einen Laptop: 1.200€ netto + 240€ USt</p>
                  <p className="border-t border-slate-700 pt-2 mt-2">
                    <strong className="text-white">USt-Zahllast:</strong> 2.000€ − 100€ − 240€ = 1.660€ ans Finanzamt
                  </p>
                </div>
              </div>
            </section>

            {/* UVA */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                UVA — Umsatzsteuervoranmeldung
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Die UVA ist die regelmäßige Meldung Ihrer Umsatzsteuer an das Finanzamt.
                Die Häufigkeit hängt von Ihrem Vorjahresumsatz ab:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-300 border border-slate-700 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="text-left p-3 text-white">Vorjahresumsatz</th>
                      <th className="text-left p-3 text-white">UVA-Frequenz</th>
                      <th className="text-left p-3 text-white">Frist</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="bg-slate-900">
                      <td className="p-3">Über 100.000€</td>
                      <td className="p-3 font-medium text-white">Monatlich</td>
                      <td className="p-3">15. des übernächsten Monats</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3">35.000€ bis 100.000€</td>
                      <td className="p-3 font-medium text-white">Vierteljährlich</td>
                      <td className="p-3">15. des übernächsten Monats</td>
                    </tr>
                    <tr className="bg-slate-900">
                      <td className="p-3">Unter 35.000€</td>
                      <td className="p-3 font-medium text-white">Keine UVA-Pflicht</td>
                      <td className="p-3">Nur USt-Jahreserklärung</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg mt-4">
                <p className="text-yellow-200">
                  <strong>Achtung:</strong> Verspätete UVA-Abgabe führt zu Verspätungszuschlägen (bis 2% der Zahllast).
                  Nutzen Sie FinanzOnline für die elektronische Abgabe.
                </p>
              </div>
            </section>

            {/* Reverse Charge */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Reverse Charge — Umkehr der Steuerschuld
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Beim Reverse-Charge-Verfahren schuldet nicht der leistende Unternehmer die USt,
                sondern der Leistungsempfänger. Dies gilt insbesondere bei:
              </p>
              <div className="space-y-3">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-300">
                    <strong className="text-white">B2B-Dienstleistungen innerhalb der EU:</strong> Wenn Sie
                    als österreichischer Unternehmer eine Dienstleistung von einem deutschen Unternehmen
                    beziehen, schulden SIE die österreichische USt (nicht der deutsche Dienstleister).
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-300">
                    <strong className="text-white">Innergemeinschaftlicher Erwerb:</strong> Beim Kauf von Waren
                    aus anderen EU-Ländern (B2B) ist die USt im Bestimmungsland (Österreich) zu entrichten.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-300">
                    <strong className="text-white">Bauleistungen (§ 19 Abs 1a UStG):</strong> Bei Bauleistungen
                    zwischen Unternehmern geht die Steuerschuld auf den Auftraggeber über.
                  </p>
                </div>
              </div>
              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg mt-4">
                <p className="text-blue-200">
                  <strong>Vorteil:</strong> Bei Reverse Charge können Sie die geschuldete USt sofort als
                  Vorsteuer wieder abziehen — der Effekt ist in der Regel steuerneutral.
                </p>
              </div>
            </section>

            {/* Ist- vs Soll-Besteuerung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Ist-Besteuerung vs. Soll-Besteuerung
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Soll-Besteuerung (Standard)</h3>
                  <p className="text-slate-300 mb-2">
                    USt-Schuld entsteht mit Rechnungslegung, unabhängig davon, wann der Kunde zahlt.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Nachteil: Sie müssen USt abführen, bevor Sie das Geld erhalten haben.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Ist-Besteuerung</h3>
                  <p className="text-slate-300 mb-2">
                    USt-Schuld entsteht erst bei Zahlungseingang. Verfügbar für Unternehmer mit
                    Umsätzen unter 2 Mio. € oder Freiberufler.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Vorteil: Bessere Liquidität, da USt erst fällig wird, wenn der Kunde bezahlt hat.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg mt-4">
                <p className="text-blue-200">
                  <strong>Empfehlung:</strong> Für die meisten Selbstständigen ist die Ist-Besteuerung
                  vorteilhafter, da sie Liquiditätsengpässe bei spätzahlenden Kunden vermeidet.
                </p>
              </div>
            </section>

            {/* Innergemeinschaftlich */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                EU-Geschäfte und OSS
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Wenn Sie Waren oder Dienstleistungen an Kunden in anderen EU-Ländern verkaufen,
                gelten besondere Regeln:
              </p>

              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">B2B innerhalb der EU</h3>
                  <p className="text-slate-300">
                    Lieferungen und Dienstleistungen an Unternehmer in anderen EU-Ländern sind in
                    Österreich steuerfrei (innergemeinschaftliche Lieferung/Reverse Charge).
                    Voraussetzung: UID-Nummer des Kunden prüfen und Zusammenfassende Meldung abgeben.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">B2C innerhalb der EU (OSS)</h3>
                  <p className="text-slate-300">
                    Seit Juli 2021 gilt das One-Stop-Shop-Verfahren (OSS). Bei Verkäufen an
                    Privatkunden in der EU über 10.000€/Jahr müssen Sie die USt des Bestimmungslandes
                    in Rechnung stellen. Über das OSS-Portal können Sie alle EU-USt zentral in
                    Österreich melden und abführen.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Digitale Dienstleistungen</h3>
                  <p className="text-slate-300">
                    Software, E-Books, Online-Kurse und andere digitale Leistungen an EU-Privatkunden
                    unterliegen immer dem USt-Satz des Kundenlandes. Das OSS vereinfacht die Abwicklung.
                  </p>
                </div>
              </div>
            </section>

            {/* Rechnungspflichtangaben */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Pflichtangaben auf Rechnungen
              </h2>
              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                <p className="text-slate-300 mb-3">Jede Rechnung über 400€ brutto muss enthalten:</p>
                <ul className="text-slate-300 space-y-2">
                  <li>• Name und Anschrift des leistenden Unternehmers</li>
                  <li>• Name und Anschrift des Leistungsempfängers</li>
                  <li>• Menge und Bezeichnung der Lieferung/Leistung</li>
                  <li>• Tag der Lieferung/Leistung oder Leistungszeitraum</li>
                  <li>• Nettobetrag, USt-Satz, USt-Betrag, Bruttobetrag</li>
                  <li>• Rechnungsdatum und fortlaufende Rechnungsnummer</li>
                  <li>• UID-Nummer des Rechnungsausstellers</li>
                  <li>• Bei Rechnungen über 10.000€ brutto: UID-Nummer des Empfängers</li>
                </ul>
              </div>
              <p className="text-slate-400 text-sm mt-3">
                Kleinbetragsrechnungen (bis 400€ brutto) benötigen weniger Pflichtangaben —
                Name/Adresse des Empfängers und UID können entfallen.
              </p>
            </section>

            {/* Häufige Fehler */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Häufige Fehler bei der Umsatzsteuer
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">1. Falscher Steuersatz</h3>
                  <p className="text-slate-300">
                    Besonders bei gemischten Leistungen (z.B. Restaurant mit Take-away) wird oft der
                    falsche Steuersatz angewendet. Prüfen Sie bei jeder Leistungsart den korrekten Satz.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">2. Vorsteuer aus Bewirtungsbelegen</h3>
                  <p className="text-slate-300">
                    Geschäftsessen sind nur zu 50% als Betriebsausgabe absetzbar, aber die Vorsteuer
                    kann zu 100% abgezogen werden (wenn betrieblich veranlasst und dokumentiert).
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">3. UVA-Fristen versäumt</h3>
                  <p className="text-slate-300">
                    Die UVA muss bis zum 15. des übernächsten Monats abgegeben werden (z.B. Jänner-UVA
                    bis 15. März). Verspätungszuschläge von bis zu 2% drohen.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">4. Vorsteuer bei gemischter Nutzung</h3>
                  <p className="text-slate-300">
                    Bei Gegenständen, die sowohl privat als auch beruflich genutzt werden (z.B. Auto,
                    Handy), darf nur der betriebliche Anteil als Vorsteuer abgezogen werden.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Häufig gestellte Fragen
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Wann muss ich mich zur USt registrieren?</h3>
                  <p className="text-slate-300">
                    Grundsätzlich mit Aufnahme der unternehmerischen Tätigkeit. Als Kleinunternehmer
                    (unter 42.000€ Umsatz) sind Sie zwar USt-befreit, müssen sich aber trotzdem
                    beim Finanzamt als Unternehmer registrieren.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Wie bekomme ich eine UID-Nummer?</h3>
                  <p className="text-slate-300">
                    Die UID-Nummer wird bei der Registrierung beim Finanzamt oder über FinanzOnline
                    beantragt. Kleinunternehmer erhalten standardmäßig keine UID, können aber eine beantragen.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Kann ich die USt auch monatlich freiwillig melden?</h3>
                  <p className="text-slate-300">
                    Ja, auch bei Umsätzen unter 100.000€ können Sie freiwillig monatlich eine UVA
                    abgeben. Das kann bei Vorsteuerüberhängen vorteilhaft sein, da Sie schneller
                    eine Gutschrift erhalten.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Was ist die Zusammenfassende Meldung (ZM)?</h3>
                  <p className="text-slate-300">
                    Die ZM ist eine Meldung an das Finanzamt über innergemeinschaftliche Lieferungen
                    und Dienstleistungen an Unternehmer in anderen EU-Ländern. Sie ist monatlich oder
                    vierteljährlich abzugeben.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Wie funktioniert die USt bei Drittlandgeschäften?</h3>
                  <p className="text-slate-300">
                    Exporte in Drittländer (nicht-EU) sind grundsätzlich von der USt befreit (echte
                    Steuerbefreiung). Sie können trotzdem Vorsteuer abziehen. Importe unterliegen
                    der Einfuhrumsatzsteuer (EUSt).
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Muss ich als Vermieter USt berechnen?</h3>
                  <p className="text-slate-300">
                    Wohnraumvermietung ist grundsätzlich mit 10% USt steuerpflichtig, aber eine
                    Steuerbefreiung ist möglich (dann kein Vorsteuerabzug). Gewerbliche Vermietung
                    unterliegt dem Normalsteuersatz von 20%.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-12 mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Berechnen Sie Ihre Steuerbelastung
                </h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Nutzen Sie unseren kostenlosen Steuerrechner, um Ihre USt-Zahllast und
                  Einkommensteuer zu berechnen.
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
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
                { name: 'Umsatzsteuer', href: '/steuerwissen/umsatzsteuer-selbstaendige' },
              ]}
              sources={[
                { name: 'UStG — Umsatzsteuergesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873', description: 'Rechtsinformationssystem des Bundes (RIS)' },
                { name: 'BMF — Umsatzsteuer', url: 'https://www.bmf.gv.at/themen/steuern/selbststaendige-unternehmer/umsatzsteuer.html', description: 'Bundesministerium für Finanzen' },
                { name: 'WKO — Umsatzsteuer für Unternehmer', url: 'https://www.wko.at/steuern/umsatzsteuer', description: 'Wirtschaftskammer Österreich' },
                { name: 'FinanzOnline', url: 'https://finanzonline.bmf.gv.at/', description: 'Elektronische Steuererklärung und UVA-Abgabe' },
              ]}
              relatedArticles={[
                { title: 'Kleinunternehmerregelung 2026 — Umsatzgrenze & Vorteile', href: '/steuerwissen/kleinunternehmerregelung' },
                { title: 'Pauschalierung in Österreich — Alle Arten im Vergleich', href: '/steuerwissen/pauschalierung-oesterreich' },
                { title: 'Steueroptimierung für Selbstständige', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              ]}
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}
