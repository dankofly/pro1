import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'
import { SiteFooter } from '@/components/site-footer'

export default function FlexKapGvsGmbHPage() {
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
            <li className="text-sb-text">FlexKapG vs. GmbH</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-sb-text mb-6 leading-tight">
              FlexKapG vs. GmbH — Die neue Rechtsform im Vergleich 2026
            </h1>
            <p className="text-xl text-sb-mut leading-relaxed">
              Seit 2024 gibt es mit der Flexiblen Kapitalgesellschaft (FlexKapG) eine neue Alternative zur klassischen GmbH.
              Das Mindeststammkapital ist mit 10.000 € bei beiden gleich; die FlexKapG punktet mit flexibler
              Mitarbeiterbeteiligung und vereinfachter Anteilsübertragung. Hier der komplette Vergleich mit Kosten,
              Vorteilen und konkreten Gründungsschritten.
            </p>
          </header>

          {/* AI Overview Box */}
          <div className="bg-sb-accent-soft border border-sb-accent/30 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-sb-accent mb-3">Kurzantwort</h2>
            <p className="text-sb-mut mb-0">
              <strong className="text-sb-text">GmbH und FlexKapG benötigen seit 2024 dasselbe Mindeststammkapital von 10.000 €</strong>.
              <strong className="text-sb-text">Steuerlich sind beide identisch</strong> (23% KöSt, 27,5% KESt).
              Die FlexKapG bietet mehr Flexibilität bei Mitarbeiterbeteiligung durch <strong className="text-sb-text">Unternehmenswert-Anteile</strong>
              (unter 25% des Stammkapitals, ohne Stimmrecht) und Anteilsübertragung per notarieller oder anwaltlicher
              Privaturkunde statt Notariatsakt. Ideal für Startups, Tech-Unternehmen und Beteiligungsprogramme.
            </p>
          </div>

          {/* Was ist die FlexKapG */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Was ist die FlexKapG?</h2>

            <p className="mb-6">
              Die <strong className="text-sb-text">Flexible Kapitalgesellschaft (FlexKapG)</strong> ist seit 1. Jänner 2024 in Österreich verfügbar
              und wurde durch das <strong className="text-sb-text">FlexKapG-Gesetz (FlexKapGG)</strong> eingeführt. Sie stellt einen
              modernen Hybrid zwischen GmbH und Aktiengesellschaft dar und wurde speziell für die Bedürfnisse
              wachstumsstarker Unternehmen entwickelt.
            </p>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <h3 className="text-xl font-semibold text-sb-text mb-4">Kernmerkmale der FlexKapG</h3>
              <ul className="space-y-3">
                <li><strong className="text-sb-text">Mindestkapital:</strong> 10.000 € (wie bei der GmbH, davon 5.000 € bar)</li>
                <li><strong className="text-sb-text">Zwei Anteilstypen:</strong> Geschäftsanteile + Unternehmenswert-Anteile</li>
                <li><strong className="text-sb-text">Flexible Satzung:</strong> Mehr Gestaltungsspielraum als bei der GmbH</li>
                <li><strong className="text-sb-text">Mitarbeiterbeteiligung:</strong> Einfach über Unternehmenswert-Anteile möglich</li>
                <li><strong className="text-sb-text">Anteilsübertragung:</strong> Notarielle oder anwaltliche Privaturkunde statt Notariatsakt</li>
                <li><strong className="text-sb-text">Firmierung:</strong> Mit "FlexKapG", "FlexCo" oder ausgeschrieben</li>
              </ul>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Zielgruppe der FlexKapG:</strong> Die neue Rechtsform wurde speziell für innovative Unternehmen,
                Startups und Betriebe mit Mitarbeiterbeteiligung entwickelt. Sie kombiniert die Vorteile einer Kapitalgesellschaft
                mit der Flexibilität moderner Unternehmensformen.
              </p>
            </div>
          </section>

          {/* Vergleichstabelle */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Detaillierter Vergleich: GmbH vs. FlexKapG</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sb-line rounded-lg">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Merkmal</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">GmbH</th>
                    <th className="p-4 text-left text-sb-text">FlexKapG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Stammkapital</td>
                    <td className="p-4 border-r border-sb-line">10.000 € (seit 2024)</td>
                    <td className="p-4 text-sb-green">10.000 € (identisch)</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Gründungskosten</td>
                    <td className="p-4 border-r border-sb-line">ca. 2.000-3.000 € (Notar + Gebühren)</td>
                    <td className="p-4 text-sb-green">ca. 2.000-3.000 € (vergleichbar)</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Mindest-KöSt</td>
                    <td className="p-4 border-r border-sb-line">500 €/Jahr (seit 2024)</td>
                    <td className="p-4 text-sb-accent">500 €/Jahr (identisch)</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Gesellschafteranteile</td>
                    <td className="p-4 border-r border-sb-line">Nur Geschäftsanteile</td>
                    <td className="p-4 text-sb-green">Geschäfts- + Unternehmenswert-Anteile</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Mitarbeiterbeteiligung</td>
                    <td className="p-4 border-r border-sb-line text-sb-red">Schwierig, aufwendig</td>
                    <td className="p-4 text-sb-green">Einfach über Unternehmenswert-Anteile</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Anteilsübertragung</td>
                    <td className="p-4 border-r border-sb-line">Notariatsakt erforderlich</td>
                    <td className="p-4 text-sb-green">Notarielle oder anwaltliche Privaturkunde</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Firma</td>
                    <td className="p-4 border-r border-sb-line">"GmbH" oder "Gesellschaft m.b.H."</td>
                    <td className="p-4 border-r border-sb-line">"FlexKapG" oder "FlexCo"</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Körperschaftsteuer</td>
                    <td className="p-4 border-r border-sb-line">23%</td>
                    <td className="p-4 text-sb-accent">23% (identisch)</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">KESt Ausschüttungen</td>
                    <td className="p-4 border-r border-sb-line">27,5%</td>
                    <td className="p-4 text-sb-accent">27,5% (identisch)</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Rechtssicherheit</td>
                    <td className="p-4 border-r border-sb-line text-sb-green">Hohe Rechtssicherheit, etabliert</td>
                    <td className="p-4 border-r border-sb-line text-sb-red">Neue Rechtsform, wenig Rechtsprechung</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-accent/40">
              <p className="mb-0">
                <strong className="text-sb-text">Steuerlich identisch:</strong> Beide Rechtsformen unterliegen denselben steuerlichen Bestimmungen,
                inklusive Mindeststammkapital (10.000 €) und Mindest-KöSt (500 €/Jahr). Der entscheidende Unterschied liegt in der
                Flexibilität der Gesellschafterstruktur, nicht in Kapital oder Steuern.
              </p>
            </div>
          </section>

          {/* Steuerliche Unterschiede */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Steuerliche Behandlung — Wo liegen die Unterschiede?</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-semibold text-sb-text mb-4">GmbH & FlexKapG — Identisch</h3>
                <ul className="space-y-3">
                  <li><strong className="text-sb-text">Körperschaftsteuer:</strong> 23% auf Gewinn (§ 22 KStG)</li>
                  <li><strong className="text-sb-text">KESt auf Ausschüttungen:</strong> 27,5% auf Brutto-Dividende</li>
                  <li><strong className="text-sb-text">Doppelbesteuerungsabkommen:</strong> Gleiche Anwendung</li>
                  <li><strong className="text-sb-text">Verlustverrechnung:</strong> Identische Regeln</li>
                  <li><strong className="text-sb-text">Freibeträge:</strong> Gleiche Bestimmungen</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-xl font-semibold text-sb-text mb-4">Besonderheit: Unternehmenswert-Anteile</h3>
                <ul className="space-y-3">
                  <li><strong className="text-sb-text">Steuerliche Behandlung:</strong> Wie normale Geschäftsanteile</li>
                  <li><strong className="text-sb-text">Gewinnausschüttung:</strong> 27,5% KESt (identisch)</li>
                  <li><strong className="text-sb-text">Veräußerungsgewinn:</strong> 27,5% unabhängig von der Behaltedauer</li>
                  <li><strong className="text-sb-text">Mitarbeiterbeteiligung:</strong> Steueraufschub nach § 67a EStG möglich</li>
                  <li><strong className="text-sb-text">Bewertung:</strong> Nach Verkehrswert</li>
                </ul>
              </div>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30 mb-6">
              <h4 className="text-lg font-semibold text-sb-mut mb-2">Wichtig bei Mitarbeiterbeteiligung</h4>
              <p className="text-sb-mut mb-0">
                Für Unternehmenswert-Anteile an Mitarbeiter greift unter den Voraussetzungen der
                Start-Up-Mitarbeiterbeteiligung (§ 67a EStG, seit 2024) ein Steueraufschub: Besteuert wird erst
                bei Veräußerung der Anteile, mit begünstigter Pauschalregelung. Ohne diese Begünstigung ist die
                Zuteilung als geldwerter Vorteil lohnsteuerpflichtig. Veräußerungsgewinne aus Kapitalvermögen
                unterliegen generell 27,5%; eine einjährige Spekulationsfrist mit Steuerfreiheit gibt es nicht mehr.
              </p>
            </div>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
              <h4 className="text-lg font-semibold text-sb-text mb-3">Effektive Gesamtbelastung (identisch bei beiden Rechtsformen)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Unternehmensgewinn</span><span className="text-sb-text">100.000 €</span></div>
                <div className="flex justify-between"><span>– Körperschaftsteuer (23%)</span><span className="text-sb-red">−23.000 €</span></div>
                <div className="flex justify-between"><span>= Gewinn nach KöSt</span><span className="text-sb-text">77.000 €</span></div>
                <div className="flex justify-between"><span>Ausschüttung (100%)</span><span className="text-sb-text">77.000 €</span></div>
                <div className="flex justify-between"><span>– KESt (27,5%)</span><span className="text-sb-red">−21.175 €</span></div>
                <div className="flex justify-between border-t border-sb-line pt-2 font-semibold">
                  <span className="text-sb-text">Gesamtbelastung (KöSt + KESt)</span>
                  <span className="text-sb-red">44.175 € (44,2%)</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-sb-text">Netto beim Gesellschafter</span>
                  <span className="text-sb-green">55.825 €</span>
                </div>
              </div>
            </div>
          </section>

          {/* Für wen ist die FlexKapG sinnvoll */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Für wen ist die FlexKapG sinnvoll?</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-green/30">
                <h3 className="text-lg font-semibold text-sb-green mb-3">Startups & Tech-Unternehmen</h3>
                <ul className="space-y-2 text-sm">
                  <li>ESOP-fähige Anteilsklasse (UW-Anteile)</li>
                  <li>Einfache Investor-Beteiligung</li>
                  <li>Mitarbeiter-Equity vereinfacht</li>
                  <li>Flexible Satzungsgestaltung</li>
                  <li>Moderne Unternehmenskultur</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-accent/30">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">Ein-Personen-Unternehmen</h3>
                <ul className="space-y-2 text-sm">
                  <li>10.000 € Stammkapital (wie GmbH)</li>
                  <li>Haftungsbeschränkung</li>
                  <li>Steuervorteile wie GmbH</li>
                  <li>Anteile flexibel übertragbar</li>
                  <li>Satzung flexibel gestaltbar</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-accent/30">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">Wachstumsunternehmen</h3>
                <ul className="space-y-2 text-sm">
                  <li>Mitarbeiterbeteiligung fördern</li>
                  <li>Flexiblere Finanzierung</li>
                  <li>Anteilsübertragung vereinfacht</li>
                  <li>Exit-Optionen offen halten</li>
                  <li>Internationale Skalierung</li>
                </ul>
              </div>
            </div>

            <div className="bg-sb-red/10 p-6 rounded-lg border border-sb-red/30 mb-6">
              <h4 className="text-lg font-semibold text-sb-red mb-2">FlexKapG weniger geeignet für:</h4>
              <ul className="space-y-2 text-sb-mut">
                <li><strong className="text-sb-text">Traditionelle Betriebe</strong> — Oft ist die bewährte GmbH die bessere Wahl</li>
                <li><strong className="text-sb-text">Risikoscheue Unternehmer</strong> — Wenig Rechtsprechung bei Konflikten</li>
                <li><strong className="text-sb-text">Bankenabhängige Geschäfte</strong> — GmbH hat höhere Reputation bei Banken</li>
                <li><strong className="text-sb-text">Internationale Kooperationen</strong> — GmbH ist international bekannter</li>
              </ul>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <p className="text-sb-mut mb-0">
                <strong>Empfehlung:</strong> Die FlexKapG ist ideal, wenn du Innovation, Flexibilität und Mitarbeiterbeteiligung
                in den Mittelpunkt stellst. Für konservative Geschäftsmodelle oder wenn Rechtssicherheit oberste Priorität hat,
                bleibt die klassische GmbH oft die bessere Wahl.
              </p>
            </div>
          </section>

          {/* Gründungsprozess FlexKapG */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Gründungsprozess der FlexKapG — Schritt für Schritt</h2>

            <div className="bg-sb-card p-6 rounded-lg border border-sb-line mb-6">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <div>
                    <strong className="text-sb-text">Satzung erstellen</strong>
                    <p className="text-sm text-sb-mut mt-1">Gesellschaftsvertrag mit Rechtsanwalt oder Notar.
                    Hier wird definiert: Geschäftsanteile, Unternehmenswert-Anteile, Geschäftsführung, Mitarbeiterbeteiligung.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <div>
                    <strong className="text-sb-text">Stammkapital einzahlen</strong>
                    <p className="text-sm text-sb-mut mt-1">Mindestens 10.000 € auf ein Geschäftskonto einzahlen.
                    Der Nachweis (Bankbestätigung) wird für die Firmenbucheintragung benötigt.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div>
                    <strong className="text-sb-text">Notarielle Beurkundung</strong>
                    <p className="text-sm text-sb-mut mt-1">Gesellschaftsvertrag beim Notar beurkunden lassen.
                    Gesamtkosten für Rechtsanwalt und Notar laut WKO-Schätzung ca. 2.000-3.000 €, je nach Komplexität der Satzung.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <div>
                    <strong className="text-sb-text">Firmenbucheintragung</strong>
                    <p className="text-sm text-sb-mut mt-1">Antrag beim Handelsgericht. Gerichtsgebühren: Richtwert ca. 300-600 €.
                    Die FlexKapG entsteht erst mit der Eintragung ins Firmenbuch.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  <div>
                    <strong className="text-sb-text">Gewerbeanmeldung & Steuern</strong>
                    <p className="text-sm text-sb-mut mt-1">Gewerbeanmeldung bei der Bezirkshauptmannschaft.
                    Steuerliche Erfassung beim Finanzamt. UID-Nummer beantragen.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-sb-accent text-sb-accent-ink rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">6</span>
                  <div>
                    <strong className="text-sb-text">Sozialversicherung</strong>
                    <p className="text-sm text-sb-mut mt-1">Zuordnung wie bei der GmbH: bis 25% Beteiligung ASVG,
                    darüber in der Regel GSVG (SVS). Alleingesellschafter-Geschäftsführer bleiben SVS-versichert.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <h4 className="text-lg font-semibold text-sb-mut mb-2">Gründungsdauer & Kosten</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sb-mut mb-2"><strong>Zeitaufwand:</strong></p>
                  <ul className="text-sm space-y-1">
                    <li>Satzungserstellung: 1-2 Wochen</li>
                    <li>Notartermin: 1 Tag</li>
                    <li>Firmenbucheintragung: 1-3 Wochen</li>
                    <li><strong>Gesamt: ca. 4-6 Wochen</strong></li>
                  </ul>
                </div>
                <div>
                  <p className="text-sb-mut mb-2"><strong>Gesamtkosten:</strong></p>
                  <ul className="text-sm space-y-1">
                    <li>Stammkapital: 10.000 € (davon 5.000 € bar)</li>
                    <li>Notar + Anwalt: ca. 2.000-3.000 €</li>
                    <li>Gerichtsgebühren: ca. 300-600 €</li>
                    <li><strong>Gesamt: ca. 12.300-13.600 €</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Vorteile und Nachteile */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Vorteile und Nachteile im Überblick</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vorteile FlexKapG */}
              <div className="bg-sb-green-soft p-6 rounded-lg border border-sb-green/30">
                <h3 className="text-xl font-semibold text-sb-green mb-4">Vorteile der FlexKapG</h3>
                <ul className="space-y-3">
                  <li><strong className="text-sb-text">Start-Up-Mitarbeiterbeteiligung:</strong> Steueraufschub nach § 67a EStG nutzbar</li>
                  <li><strong className="text-sb-text">Mitarbeiterbeteiligung:</strong> Unternehmenswert-Anteile (unter 25% des Stammkapitals)</li>
                  <li><strong className="text-sb-text">Flexible Anteilsübertragung:</strong> Vereinfachte Prozesse</li>
                  <li><strong className="text-sb-text">Moderne Satzungsgestaltung:</strong> Mehr Freiheiten</li>
                  <li><strong className="text-sb-text">Anteilsübertragung:</strong> Notarielle oder anwaltliche Privaturkunde statt Notariatsakt</li>
                  <li><strong className="text-sb-text">Investor-freundlich:</strong> Einfachere Kapitalerhöhungen</li>
                  <li><strong className="text-sb-text">Steuerlich identisch:</strong> Alle GmbH-Vorteile</li>
                  <li><strong className="text-sb-text">Innovatives Image:</strong> Moderne Unternehmensform</li>
                </ul>
              </div>

              {/* Nachteile FlexKapG */}
              <div className="bg-sb-red/10 p-6 rounded-lg border border-sb-red/30">
                <h3 className="text-xl font-semibold text-sb-red mb-4">Nachteile der FlexKapG</h3>
                <ul className="space-y-3">
                  <li><strong className="text-sb-text">Neue Rechtsform:</strong> Wenig Rechtsprechung und Erfahrung</li>
                  <li><strong className="text-sb-text">Unbekannt bei Banken:</strong> Möglicherweise schwierigere Kreditvergabe</li>
                  <li><strong className="text-sb-text">Internationale Akzeptanz:</strong> GmbH ist bekannter</li>
                  <li><strong className="text-sb-text">Beratung teurer:</strong> Wenige spezialisierte Anwälte</li>
                  <li><strong className="text-sb-text">Komplexere Satzung:</strong> Mehr Gestaltungsoptionen = mehr Fehlerquellen</li>
                  <li><strong className="text-sb-text">Kein Kapitalvorteil:</strong> Mindeststammkapital wie bei der GmbH 10.000 €</li>
                  <li><strong className="text-sb-text">Noch keine Standards:</strong> Jede Satzung ist Einzelfall</li>
                  <li><strong className="text-sb-text">Risiko bei Gesetzesänderung:</strong> Neue Gesetze können sich ändern</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Berechnungsbeispiel */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Berechnungsbeispiel: 5-Jahres-Kostenvergleich</h2>

            <p className="mb-6">
              Hier ein konkretes Beispiel für ein Tech-Startup mit 100.000 € Jahresgewinn über 5 Jahre,
              inklusive aller Gründungs- und laufenden Kosten. Ergebnis: Seit der GmbH-Reform 2024 sind
              beide Rechtsformen bei Kapital und Kosten praktisch gleichauf.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-sb-line rounded-lg">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">Kostenposition</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">GmbH (5 Jahre)</th>
                    <th className="p-4 text-left text-sb-text border-r border-sb-line">FlexKapG (5 Jahre)</th>
                    <th className="p-4 text-left text-sb-text">Ersparnis FlexKapG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Stammkapital (gebunden, kein Aufwand)</td>
                    <td className="p-4 border-r border-sb-line">10.000 €</td>
                    <td className="p-4 border-r border-sb-line">10.000 €</td>
                    <td className="p-4 text-sb-accent">±0 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Gründungskosten</td>
                    <td className="p-4 border-r border-sb-line">2.500 €</td>
                    <td className="p-4 border-r border-sb-line">2.500 €</td>
                    <td className="p-4 text-sb-accent">±0 €</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Bilanzierung (5 Jahre)</td>
                    <td className="p-4 border-r border-sb-line">25.000 €</td>
                    <td className="p-4 border-r border-sb-line">25.000 €</td>
                    <td className="p-4 text-sb-accent">±0 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">KöSt (100k Gewinn, 5 Jahre)</td>
                    <td className="p-4 border-r border-sb-line">115.000 €</td>
                    <td className="p-4 border-r border-sb-line">115.000 €</td>
                    <td className="p-4 text-sb-accent">±0 €</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">KESt (Ausschüttungen, 5 Jahre)</td>
                    <td className="p-4 border-r border-sb-line">105.875 €</td>
                    <td className="p-4 border-r border-sb-line">105.875 €</td>
                    <td className="p-4 text-sb-accent">±0 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-sb-deep">
                    <td className="p-4 border-r border-sb-line font-medium text-sb-text">Laufende Kosten (5 Jahre)</td>
                    <td className="p-4 border-r border-sb-line">15.000 €</td>
                    <td className="p-4 border-r border-sb-line">15.000 €</td>
                    <td className="p-4 text-sb-accent">±0 €</td>
                  </tr>
                  <tr className="border-t border-sb-line bg-white/[0.05]">
                    <td className="p-4 border-r border-sb-line font-semibold text-sb-text">Kapitaleinsatz gesamt (5 Jahre)</td>
                    <td className="p-4 border-r border-sb-line font-semibold">273.375 €</td>
                    <td className="p-4 border-r border-sb-line font-semibold">273.375 €</td>
                    <td className="p-4 font-semibold text-sb-accent">±0 €</td>
                  </tr>
                  <tr className="border-t border-sb-line">
                    <td className="p-4 border-r border-sb-line font-semibold text-sb-text">Verfügbares Kapital</td>
                    <td className="p-4 border-r border-sb-line font-semibold">226.625 €</td>
                    <td className="p-4 border-r border-sb-line font-semibold">226.625 €</td>
                    <td className="p-4 font-semibold text-sb-accent">±0 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h4 className="text-lg font-semibold text-sb-text mb-3">Zusätzliche FlexKapG-Vorteile</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-sb-text">Mitarbeiterbindung:</strong> Equity-Programme ohne Notariatsakt-Aufwand</li>
                  <li><strong className="text-sb-text">Flexibilität:</strong> Mitarbeiterbeteiligung ohne Zusatzkosten</li>
                  <li><strong className="text-sb-text">Wachstum:</strong> Einfachere Kapitalerhöhungen</li>
                  <li><strong className="text-sb-text">Exit:</strong> Verkauf der Anteile vereinfacht</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h4 className="text-lg font-semibold text-sb-text mb-3">Kosten-Fazit</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Kapitalersparnis FlexKapG</span><span className="text-sb-green">0 € (identisches Mindestkapital)</span></div>
                  <div className="flex justify-between"><span>Laufender Kostenvorteil</span><span className="text-sb-green">±0 €</span></div>
                  <div className="flex justify-between border-t border-sb-line pt-2 font-semibold">
                    <span>Vorteil über 5 Jahre</span>
                    <span className="text-sb-green">Qualitativ: Beteiligung + Übertragbarkeit</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Häufige Fragen (FAQ)</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Was ist der Hauptunterschied zwischen FlexKapG und GmbH?</h3>
                <p className="mb-0">
                  GmbH und FlexKapG benötigen seit 2024 dasselbe Mindeststammkapital von 10.000 €.
                  Steuerlich sind beide identisch (23% KöSt, 27,5% KESt). Die FlexKapG bietet mehr Flexibilität
                  bei Mitarbeiterbeteiligung durch Unternehmenswert-Anteile und Anteilsübertragung per notarieller
                  oder anwaltlicher Privaturkunde statt Notariatsakt.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Sind FlexKapG-Gründungskosten niedriger als bei der GmbH?</h3>
                <p className="mb-0">
                  Kaum. Für beide gilt seit 2024 das Mindeststammkapital von 10.000 €; Beratungs- und Notarkosten
                  liegen laut WKO-Schätzung bei ca. 2.000-3.000 €. Wegen der flexibleren Satzungsgestaltung kann
                  die FlexKapG im Einzelfall sogar etwas teurer sein.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Ist die FlexKapG für Startups besser als die GmbH?</h3>
                <p className="mb-0">
                  Ja, besonders für Startups mit Mitarbeiterbeteiligung. Die FlexKapG ermöglicht Unternehmenswert-Anteile
                  und den Steueraufschub der Start-Up-Mitarbeiterbeteiligung (§ 67a EStG) bei identischen Steuervorteilen.
                  Ideal für Tech-Unternehmen und wachstumsorientierte Betriebe.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg border border-sb-line">
                <h3 className="text-lg font-semibold text-sb-text mb-2">Kann ich von einer GmbH zur FlexKapG wechseln?</h3>
                <p className="mb-0">
                  Ja. Das Gesetz sieht die Umwandlung einer GmbH in eine FlexKapG (und umgekehrt) ausdrücklich vor.
                  Erforderlich sind ein Generalversammlungsbeschluss und die Anpassung des Gesellschaftsvertrags;
                  eine Liquidation oder Verschmelzung ist nicht nötig. Lass die Umwandlung rechtlich begleiten.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12 text-center">
            <div className="bg-sb-accent-soft p-8 rounded-lg border border-sb-accent/30">
              <h3 className="text-2xl font-semibold text-sb-text mb-4">
                Berechne deine optimale Rechtsform
              </h3>
              <p className="text-sb-mut mb-6">
                Nutze unseren kostenlosen Rechner für eine individuelle Analyse deiner Steueroptimierung.
              </p>
              <Button asChild>
                <Link href="/rechner" className="bg-sb-accent hover:bg-sb-accent-deep text-sb-accent-ink px-8 py-3 rounded-lg font-semibold transition-colors">
                  Zum Steuer-Rechner
                </Link>
              </Button>
            </div>
          </section>

          {/* Fazit */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-sb-text mb-6">Fazit: FlexKapG oder GmbH?</h2>
            <div className="bg-white/[0.05] p-6 rounded-lg border-l-4 border-sb-green/40">
              <ul className="space-y-3">
                <li><strong className="text-sb-text">FlexKapG für Startups & Tech:</strong> Einfache Mitarbeiterbeteiligung über Unternehmenswert-Anteile, Stammkapital wie GmbH</li>
                <li><strong className="text-sb-text">Steuerlich identisch:</strong> 23% KöSt, 27,5% KESt — keine steuerlichen Nachteile</li>
                <li><strong className="text-sb-text">GmbH für Traditionsbetriebe:</strong> Bewährt, rechtssicher, international anerkannt</li>
                <li><strong className="text-sb-text">FlexKapG-Risiko:</strong> Neue Rechtsform mit wenig Rechtsprechung</li>
                <li><strong className="text-sb-text">Empfehlung:</strong> FlexKapG ideal für innovative, wachstumsstarke Unternehmen</li>
                <li><strong className="text-sb-text">Alternative:</strong> Bei Rechtssicherheit-Fokus bleibt GmbH die sichere Wahl</li>
              </ul>
              <p className="mt-4 text-sb-mut">
                Die FlexKapG ist eine echte Innovation im österreichischen Gesellschaftsrecht.
                Für die richtige Zielgruppe bietet sie mehr Flexibilität bei identischen Steuer- und Kapitalkonditionen.
                Lass dich von einem spezialisierten Anwalt beraten, bevor du dich entscheidest.
              </p>
            </div>
          </section>

          <ArticleFooter
            breadcrumbs={[
              { name: 'Home', href: '/' },
              { name: 'Steuerwissen', href: '/steuerwissen' },
              { name: 'FlexKapG vs. GmbH', href: '/steuerwissen/flexkapg-vs-gmbh' },
            ]}
            sources={[
              { name: 'FlexKapGG — Flexible Kapitalgesellschaftsgesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20012713', description: 'Rechtsinformationssystem des Bundes (RIS)' },
              { name: 'BMJ — Flexible Kapitalgesellschaft', url: 'https://www.bmj.gv.at/themen/gesellschaftsrecht/flexible-kapitalgesellschaft.html', description: 'Bundesministerium für Justiz — FlexKapG Informationen' },
              { name: 'WKO - FlexKapG FAQs', url: 'https://www.wko.at/startups/flexible-kapitalgesellschaft-flexkapg-faqs', description: 'Wirtschaftskammer Österreich - FlexKapG Fragen und Antworten' },
              { name: 'KStG § 22 — Körperschaftsteuersatz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004531', description: 'Rechtsinformationssystem des Bundes (RIS) — Körperschaftsteuergesetz' },
              { name: 'GmbHG — GmbH-Gesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001720', description: 'Rechtsinformationssystem des Bundes (RIS)' },
              { name: 'WKO - Einkommen-/Körperschaftsteuer 2026', url: 'https://www.wko.at/steuern/einkommen-koerperschaftsteuer-2026', description: 'Aktuelle Steuerwerte 2026 (KöSt, Mindest-KöSt, KESt, Tarif)' },
            ]}
            relatedArticles={[
              { title: 'GmbH vs. Einzelunternehmen: Der Steuer-Vergleich', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
              { title: 'Steueroptimierung für Selbständige: Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              { title: 'SVS-Nachzahlung vermeiden: 7 Profi-Strategien', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
            ]}
          />
        </article>
      </div>
    </div>
    </PublicShell>
  )
}
