import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function FlexKapGvsGmbHPage() {
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
            <li className="text-white">FlexKapG vs. GmbH</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              FlexKapG vs. GmbH — Die neue Rechtsform im Vergleich 2026
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Seit 2024 gibt es mit der Flexiblen Kapitalgesellschaft (FlexKapG) eine neue Alternative zur klassischen GmbH.
              Mit nur 10.000 € Stammkapital, flexibler Mitarbeiterbeteiligung und vereinfachter Gründung stellt sie eine
              interessante Option dar. Hier der komplette Vergleich — mit Kosten, Vorteilen und konkreten Gründungsschritten.
            </p>
          </header>

          {/* AI Overview Box */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-blue-300 mb-3">Kurzantwort</h2>
            <p className="text-slate-300 mb-0">
              Die <strong className="text-white">FlexKapG benötigt nur 10.000 € Stammkapital</strong> statt 35.000 € bei der GmbH.
              <strong className="text-white">Steuerlich sind beide identisch</strong> (23% KöSt, 27,5% KESt).
              Die FlexKapG bietet jedoch mehr Flexibilität bei Mitarbeiterbeteiligung durch <strong className="text-white">Unternehmenswert-Anteile</strong>
              und einfachere Anteilsübertragung ohne Notariatsakt. Ideal für Startups, Tech-Unternehmen und Ein-Personen-Kapitalgesellschaften.
            </p>
          </div>

          {/* Was ist die FlexKapG */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Was ist die FlexKapG?</h2>

            <p className="mb-6">
              Die <strong className="text-white">Flexible Kapitalgesellschaft (FlexKapG)</strong> ist seit 1. Jänner 2024 in Österreich verfügbar
              und wurde durch das <strong className="text-white">FlexKapG-Gesetz (FlexKapGG)</strong> eingeführt. Sie stellt einen
              modernen Hybrid zwischen GmbH und Aktiengesellschaft dar und wurde speziell für die Bedürfnisse
              wachstumsstarker Unternehmen entwickelt.
            </p>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Kernmerkmale der FlexKapG</h3>
              <ul className="space-y-3">
                <li><strong className="text-white">Mindestkapital:</strong> 10.000 € (statt 35.000 € bei GmbH)</li>
                <li><strong className="text-white">Zwei Anteilstypen:</strong> Geschäftsanteile + Unternehmenswert-Anteile</li>
                <li><strong className="text-white">Flexible Satzung:</strong> Mehr Gestaltungsspielraum als bei der GmbH</li>
                <li><strong className="text-white">Mitarbeiterbeteiligung:</strong> Einfach über Unternehmenswert-Anteile möglich</li>
                <li><strong className="text-white">Anteilsübertragung:</strong> Ohne Notariatsakt möglich (bei entsprechender Satzungsgestaltung)</li>
                <li><strong className="text-white">Firmierung:</strong> Mit "FlexKapG", "FlexCo" oder ausgeschrieben</li>
              </ul>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700">
              <p className="text-amber-200 mb-0">
                <strong>Zielgruppe der FlexKapG:</strong> Die neue Rechtsform wurde speziell für innovative Unternehmen,
                Startups und Betriebe mit Mitarbeiterbeteiligung entwickelt. Sie kombiniert die Vorteile einer Kapitalgesellschaft
                mit der Flexibilität moderner Unternehmensformen.
              </p>
            </div>
          </section>

          {/* Vergleichstabelle */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Detaillierter Vergleich: GmbH vs. FlexKapG</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-slate-700 rounded-lg">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4 text-left text-white border-r border-slate-700">Merkmal</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">GmbH</th>
                    <th className="p-4 text-left text-white">FlexKapG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Stammkapital</td>
                    <td className="p-4 border-r border-slate-700">35.000 € (10.000 € privilegiert)</td>
                    <td className="p-4 text-green-400">10.000 € (mindestens)</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Gründungskosten</td>
                    <td className="p-4 border-r border-slate-700">~2.000-3.000 € (Notar + Gebühren)</td>
                    <td className="p-4 text-green-400">~1.500-2.500 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Mindest-KöSt</td>
                    <td className="p-4 border-r border-slate-700">1.750 €/Jahr (500 € erste 5 Jahre)</td>
                    <td className="p-4 text-yellow-400">500 €/Jahr</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Gesellschafteranteile</td>
                    <td className="p-4 border-r border-slate-700">Nur Geschäftsanteile</td>
                    <td className="p-4 text-green-400">Geschäfts- + Unternehmenswert-Anteile</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Mitarbeiterbeteiligung</td>
                    <td className="p-4 border-r border-slate-700 text-red-400">Schwierig, aufwendig</td>
                    <td className="p-4 text-green-400">Einfach über Unternehmenswert-Anteile</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Anteilsübertragung</td>
                    <td className="p-4 border-r border-slate-700">Notariatsakt erforderlich</td>
                    <td className="p-4 text-green-400">Ohne Notar möglich</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Firma</td>
                    <td className="p-4 border-r border-slate-700">"GmbH" oder "Gesellschaft m.b.H."</td>
                    <td className="p-4 border-r border-slate-700">"FlexKapG" oder "FlexCo"</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Körperschaftsteuer</td>
                    <td className="p-4 border-r border-slate-700">23%</td>
                    <td className="p-4 text-yellow-400">23% (identisch)</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">KESt Ausschüttungen</td>
                    <td className="p-4 border-r border-slate-700">27,5%</td>
                    <td className="p-4 text-yellow-400">27,5% (identisch)</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Rechtssicherheit</td>
                    <td className="p-4 border-r border-slate-700 text-green-400">Hohe Rechtssicherheit, etabliert</td>
                    <td className="p-4 border-r border-slate-700 text-red-400">Neue Rechtsform, wenig Rechtsprechung</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="mb-0">
                <strong className="text-white">Steuerlich identisch:</strong> Beide Rechtsformen unterliegen denselben steuerlichen Bestimmungen.
                Der entscheidende Unterschied liegt in der Flexibilität der Gesellschafterstruktur und den deutlich niedrigeren Gründungskosten
                der FlexKapG.
              </p>
            </div>
          </section>

          {/* Steuerliche Unterschiede */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Steuerliche Behandlung — Wo liegen die Unterschiede?</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">GmbH & FlexKapG — Identisch</h3>
                <ul className="space-y-3">
                  <li><strong className="text-white">Körperschaftsteuer:</strong> 23% auf Gewinn (§ 22 KStG)</li>
                  <li><strong className="text-white">KESt auf Ausschüttungen:</strong> 27,5% auf Brutto-Dividende</li>
                  <li><strong className="text-white">Doppelbesteuerungsabkommen:</strong> Gleiche Anwendung</li>
                  <li><strong className="text-white">Verlustverrechnung:</strong> Identische Regeln</li>
                  <li><strong className="text-white">Freibeträge:</strong> Gleiche Bestimmungen</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Besonderheit: Unternehmenswert-Anteile</h3>
                <ul className="space-y-3">
                  <li><strong className="text-white">Steuerliche Behandlung:</strong> Wie normale Geschäftsanteile</li>
                  <li><strong className="text-white">Gewinnausschüttung:</strong> 27,5% KESt (identisch)</li>
                  <li><strong className="text-white">Veräußerungsgewinn:</strong> Spekulationsfrist beachten</li>
                  <li><strong className="text-white">Mitarbeiterbeteiligung:</strong> Lohnversteuerung bei Zuteilung</li>
                  <li><strong className="text-white">Bewertung:</strong> Nach Verkehrswert</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700 mb-6">
              <h4 className="text-lg font-semibold text-amber-200 mb-2">Wichtig bei Mitarbeiterbeteiligung</h4>
              <p className="text-amber-200 mb-0">
                Erhalten Mitarbeiter Unternehmenswert-Anteile, gilt dies als geldwerter Vorteil und ist
                lohnsteuerpflichtig. Der Wert wird zum Zeitpunkt der Zuteilung bewertet. Spätere Wertsteigerungen
                sind bei Veräußerung nach der einjährigen Spekulationsfrist steuerfrei.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-3">Effektive Gesamtbelastung (identisch bei beiden Rechtsformen)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Unternehmensgewinn</span><span className="text-white">100.000 €</span></div>
                <div className="flex justify-between"><span>– Körperschaftsteuer (23%)</span><span className="text-red-400">−23.000 €</span></div>
                <div className="flex justify-between"><span>= Gewinn nach KöSt</span><span className="text-white">77.000 €</span></div>
                <div className="flex justify-between"><span>Ausschüttung (100%)</span><span className="text-white">77.000 €</span></div>
                <div className="flex justify-between"><span>– KESt (27,5%)</span><span className="text-red-400">−21.175 €</span></div>
                <div className="flex justify-between border-t border-slate-700 pt-2 font-semibold">
                  <span className="text-white">Gesamtbelastung (KöSt + KESt)</span>
                  <span className="text-red-400">44.175 € (44,2%)</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Netto beim Gesellschafter</span>
                  <span className="text-green-400">55.825 €</span>
                </div>
              </div>
            </div>
          </section>

          {/* Für wen ist die FlexKapG sinnvoll */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Für wen ist die FlexKapG sinnvoll?</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900 p-6 rounded-lg border border-green-700/50">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Startups & Tech-Unternehmen</h3>
                <ul className="space-y-2 text-sm">
                  <li>Niedrigere Gründungskosten</li>
                  <li>Einfache Investor-Beteiligung</li>
                  <li>Mitarbeiter-Equity ohne Notar</li>
                  <li>Flexible Satzungsgestaltung</li>
                  <li>Moderne Unternehmenskultur</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-blue-700/50">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Ein-Personen-Unternehmen</h3>
                <ul className="space-y-2 text-sm">
                  <li>Nur 10.000 € Stammkapital</li>
                  <li>Haftungsbeschränkung</li>
                  <li>Steuervorteile wie GmbH</li>
                  <li>Weniger Kapital gebunden</li>
                  <li>Einfachere Gründung</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-purple-700/50">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Wachstumsunternehmen</h3>
                <ul className="space-y-2 text-sm">
                  <li>Mitarbeiterbeteiligung fördern</li>
                  <li>Flexiblere Finanzierung</li>
                  <li>Anteilsübertragung vereinfacht</li>
                  <li>Exit-Optionen offen halten</li>
                  <li>Internationale Skalierung</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-700 mb-6">
              <h4 className="text-lg font-semibold text-red-300 mb-2">FlexKapG weniger geeignet für:</h4>
              <ul className="space-y-2 text-red-200">
                <li><strong className="text-white">Traditionelle Betriebe</strong> — Oft ist die bewährte GmbH die bessere Wahl</li>
                <li><strong className="text-white">Risikoscheue Unternehmer</strong> — Wenig Rechtsprechung bei Konflikten</li>
                <li><strong className="text-white">Bankenabhängige Geschäfte</strong> — GmbH hat höhere Reputation bei Banken</li>
                <li><strong className="text-white">Internationale Kooperationen</strong> — GmbH ist international bekannter</li>
              </ul>
            </div>

            <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700">
              <p className="text-blue-200 mb-0">
                <strong>Empfehlung:</strong> Die FlexKapG ist ideal, wenn du Innovation, Flexibilität und Mitarbeiterbeteiligung
                in den Mittelpunkt stellst. Für konservative Geschäftsmodelle oder wenn Rechtssicherheit oberste Priorität hat,
                bleibt die klassische GmbH oft die bessere Wahl.
              </p>
            </div>
          </section>

          {/* Gründungsprozess FlexKapG */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Gründungsprozess der FlexKapG — Schritt für Schritt</h2>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-6">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <div>
                    <strong className="text-white">Satzung erstellen</strong>
                    <p className="text-sm text-slate-300 mt-1">Gesellschaftsvertrag mit Rechtsanwalt oder Notar.
                    Hier wird definiert: Geschäftsanteile, Unternehmenswert-Anteile, Geschäftsführung, Mitarbeiterbeteiligung.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <div>
                    <strong className="text-white">Stammkapital einzahlen</strong>
                    <p className="text-sm text-slate-300 mt-1">Mindestens 10.000 € auf ein Geschäftskonto einzahlen.
                    Der Nachweis (Bankbestätigung) wird für die Firmenbucheintragung benötigt.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div>
                    <strong className="text-white">Notarielle Beurkundung</strong>
                    <p className="text-sm text-slate-300 mt-1">Gesellschaftsvertrag beim Notar beurkunden lassen.
                    Kosten: ca. 800-1.500 € je nach Komplexität der Satzung.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <div>
                    <strong className="text-white">Firmenbucheintragung</strong>
                    <p className="text-sm text-slate-300 mt-1">Antrag beim Handelsgericht. Gebühren: ca. 300-600 €.
                    Die FlexKapG entsteht erst mit der Eintragung ins Firmenbuch.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  <div>
                    <strong className="text-white">Gewerbeanmeldung & Steuern</strong>
                    <p className="text-sm text-slate-300 mt-1">Gewerbeanmeldung bei der Bezirkshauptmannschaft.
                    Steuerliche Erfassung beim Finanzamt. UID-Nummer beantragen.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">6</span>
                  <div>
                    <strong className="text-white">Sozialversicherung</strong>
                    <p className="text-sm text-slate-300 mt-1">ASVG-Anmeldung für Geschäftsführer mit mehr als 25% Beteiligung.
                    Wie bei der GmbH: bessere Leistungen als SVS.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700">
              <h4 className="text-lg font-semibold text-amber-200 mb-2">Gründungsdauer & Kosten</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-amber-200 mb-2"><strong>Zeitaufwand:</strong></p>
                  <ul className="text-sm space-y-1">
                    <li>Satzungserstellung: 1-2 Wochen</li>
                    <li>Notartermin: 1 Tag</li>
                    <li>Firmenbucheintragung: 1-3 Wochen</li>
                    <li><strong>Gesamt: ca. 4-6 Wochen</strong></li>
                  </ul>
                </div>
                <div>
                  <p className="text-amber-200 mb-2"><strong>Gesamtkosten:</strong></p>
                  <ul className="text-sm space-y-1">
                    <li>Stammkapital: 10.000 €</li>
                    <li>Notar + Anwalt: 1.000-2.000 €</li>
                    <li>Gerichtsgebühren: 300-600 €</li>
                    <li><strong>Gesamt: ca. 11.500-13.000 €</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Vorteile und Nachteile */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Vorteile und Nachteile im Überblick</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vorteile FlexKapG */}
              <div className="bg-green-900/20 p-6 rounded-lg border border-green-700">
                <h3 className="text-xl font-semibold text-green-400 mb-4">Vorteile der FlexKapG</h3>
                <ul className="space-y-3">
                  <li><strong className="text-white">Niedrigeres Stammkapital:</strong> Nur 10.000 € statt 35.000 €</li>
                  <li><strong className="text-white">Mitarbeiterbeteiligung:</strong> Unternehmenswert-Anteile ohne Notar</li>
                  <li><strong className="text-white">Flexible Anteilsübertragung:</strong> Vereinfachte Prozesse</li>
                  <li><strong className="text-white">Moderne Satzungsgestaltung:</strong> Mehr Freiheiten</li>
                  <li><strong className="text-white">Geringere Gründungskosten:</strong> 25.000 € weniger Startkapital</li>
                  <li><strong className="text-white">Investor-freundlich:</strong> Einfachere Kapitalerhöhungen</li>
                  <li><strong className="text-white">Steuerlich identisch:</strong> Alle GmbH-Vorteile</li>
                  <li><strong className="text-white">Innovatives Image:</strong> Moderne Unternehmensform</li>
                </ul>
              </div>

              {/* Nachteile FlexKapG */}
              <div className="bg-red-900/20 p-6 rounded-lg border border-red-700">
                <h3 className="text-xl font-semibold text-red-400 mb-4">Nachteile der FlexKapG</h3>
                <ul className="space-y-3">
                  <li><strong className="text-white">Neue Rechtsform:</strong> Wenig Rechtsprechung und Erfahrung</li>
                  <li><strong className="text-white">Unbekannt bei Banken:</strong> Möglicherweise schwierigere Kreditvergabe</li>
                  <li><strong className="text-white">Internationale Akzeptanz:</strong> GmbH ist bekannter</li>
                  <li><strong className="text-white">Beratung teurer:</strong> Wenige spezialisierte Anwälte</li>
                  <li><strong className="text-white">Komplexere Satzung:</strong> Mehr Gestaltungsoptionen = mehr Fehlerquellen</li>
                  <li><strong className="text-white">Umwandlung aufwendig:</strong> Von/zu anderen Rechtsformen schwierig</li>
                  <li><strong className="text-white">Noch keine Standards:</strong> Jede Satzung ist Einzelfall</li>
                  <li><strong className="text-white">Risiko bei Gesetzesänderung:</strong> Neue Gesetze können sich ändern</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Berechnungsbeispiel */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Berechnungsbeispiel: 5-Jahres-Kostenvergleich</h2>

            <p className="mb-6">
              Hier ein konkretes Beispiel für ein Tech-Startup mit 100.000 € Jahresgewinn über 5 Jahre —
              inklusive aller Gründungs- und laufenden Kosten:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-slate-700 rounded-lg">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4 text-left text-white border-r border-slate-700">Kostenposition</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">GmbH (5 Jahre)</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">FlexKapG (5 Jahre)</th>
                    <th className="p-4 text-left text-white">Ersparnis FlexKapG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Stammkapital</td>
                    <td className="p-4 border-r border-slate-700">35.000 €</td>
                    <td className="p-4 border-r border-slate-700">10.000 €</td>
                    <td className="p-4 text-green-400">+25.000 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Gründungskosten</td>
                    <td className="p-4 border-r border-slate-700">2.500 €</td>
                    <td className="p-4 border-r border-slate-700">2.000 €</td>
                    <td className="p-4 text-green-400">+500 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Bilanzierung (5 Jahre)</td>
                    <td className="p-4 border-r border-slate-700">25.000 €</td>
                    <td className="p-4 border-r border-slate-700">25.000 €</td>
                    <td className="p-4 text-yellow-400">±0 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">KöSt (100k Gewinn, 5 Jahre)</td>
                    <td className="p-4 border-r border-slate-700">115.000 €</td>
                    <td className="p-4 border-r border-slate-700">115.000 €</td>
                    <td className="p-4 text-yellow-400">±0 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">KESt (Ausschüttungen, 5 Jahre)</td>
                    <td className="p-4 border-r border-slate-700">81.675 €</td>
                    <td className="p-4 border-r border-slate-700">81.675 €</td>
                    <td className="p-4 text-yellow-400">±0 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700 font-medium text-white">Laufende Kosten (5 Jahre)</td>
                    <td className="p-4 border-r border-slate-700">15.000 €</td>
                    <td className="p-4 border-r border-slate-700">15.000 €</td>
                    <td className="p-4 text-yellow-400">±0 €</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-800">
                    <td className="p-4 border-r border-slate-700 font-semibold text-white">Gesamtkosten (5 Jahre)</td>
                    <td className="p-4 border-r border-slate-700 font-semibold">274.175 €</td>
                    <td className="p-4 border-r border-slate-700 font-semibold">248.675 €</td>
                    <td className="p-4 font-semibold text-green-400">+25.500 €</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700 font-semibold text-white">Verfügbares Kapital</td>
                    <td className="p-4 border-r border-slate-700 font-semibold">225.825 €</td>
                    <td className="p-4 border-r border-slate-700 font-semibold">251.325 €</td>
                    <td className="p-4 font-semibold text-green-400">+25.500 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-3">Zusätzliche FlexKapG-Vorteile</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-white">Liquidität:</strong> 25.000 € weniger Kapital gebunden</li>
                  <li><strong className="text-white">Flexibilität:</strong> Mitarbeiterbeteiligung ohne Zusatzkosten</li>
                  <li><strong className="text-white">Wachstum:</strong> Einfachere Kapitalerhöhungen</li>
                  <li><strong className="text-white">Exit:</strong> Verkauf der Anteile vereinfacht</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-3">ROI-Betrachtung</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Kapitalersparnis</span><span className="text-green-400">25.500 €</span></div>
                  <div className="flex justify-between"><span>Zinsvorteil (5% p.a.)</span><span className="text-green-400">~6.500 €</span></div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 font-semibold">
                    <span>Gesamtvorteil über 5 Jahre</span>
                    <span className="text-green-400">~32.000 €</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Häufige Fragen (FAQ)</h2>

            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Was ist der Hauptunterschied zwischen FlexKapG und GmbH?</h3>
                <p className="mb-0">
                  Die FlexKapG benötigt nur 10.000 € Stammkapital statt 35.000 € bei der GmbH.
                  Steuerlich sind beide identisch (23% KöSt, 27,5% KESt). Die FlexKapG bietet mehr Flexibilität
                  bei Mitarbeiterbeteiligung durch Unternehmenswert-Anteile und einfachere Anteilsübertragung ohne Notariatsakt.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Sind FlexKapG-Gründungskosten niedriger als bei der GmbH?</h3>
                <p className="mb-0">
                  Ja, FlexKapG-Gründungskosten betragen ca. 1.500-2.500 € plus 10.000 € Stammkapital.
                  GmbH kostet ca. 2.000-3.000 € plus 35.000 € Stammkapital — insgesamt also 25.000 € weniger Startkapital bei der FlexKapG.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Ist die FlexKapG für Startups besser als die GmbH?</h3>
                <p className="mb-0">
                  Ja, besonders für Startups mit Mitarbeiterbeteiligung. Die FlexKapG ermöglicht Unternehmenswert-Anteile ohne
                  Notariatsakt und hat niedrigere Gründungskosten bei identischen Steuervorteilen. Ideal für Tech-Unternehmen
                  und wachstumsorientierte Betriebe.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Kann ich von einer GmbH zur FlexKapG wechseln?</h3>
                <p className="mb-0">
                  Eine direkte Umwandlung ist nicht möglich. Du musst eine neue FlexKapG gründen und deine GmbH liquidieren
                  oder eine Verschmelzung durchführen — das ist aufwendig und meist nicht sinnvoll. Die FlexKapG ist primär
                  für Neugründungen interessant.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12 text-center">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-lg border border-blue-700">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Berechne deine optimale Rechtsform
              </h3>
              <p className="text-slate-300 mb-6">
                Nutze unseren kostenlosen Rechner für eine individuelle Analyse deiner Steueroptimierung.
              </p>
              <Button asChild>
                <Link href="/rechner" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Zum Steuer-Rechner
                </Link>
              </Button>
            </div>
          </section>

          {/* Fazit */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-6">Fazit: FlexKapG oder GmbH?</h2>
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
              <ul className="space-y-3">
                <li><strong className="text-white">FlexKapG für Startups & Tech:</strong> 25.000 € weniger Stammkapital, einfache Mitarbeiterbeteiligung</li>
                <li><strong className="text-white">Steuerlich identisch:</strong> 23% KöSt, 27,5% KESt — keine steuerlichen Nachteile</li>
                <li><strong className="text-white">GmbH für Traditionsbetriebe:</strong> Bewährt, rechtssicher, international anerkannt</li>
                <li><strong className="text-white">FlexKapG-Risiko:</strong> Neue Rechtsform mit wenig Rechtsprechung</li>
                <li><strong className="text-white">Empfehlung:</strong> FlexKapG ideal für innovative, wachstumsstarke Unternehmen</li>
                <li><strong className="text-white">Alternative:</strong> Bei Rechtssicherheit-Fokus bleibt GmbH die sichere Wahl</li>
              </ul>
              <p className="mt-4 text-slate-300">
                Die FlexKapG ist eine echte Innovation im österreichischen Gesellschaftsrecht.
                Für die richtige Zielgruppe bietet sie erhebliche Vorteile bei identischen Steuerkonditionen.
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
              { name: 'WKO — FlexKapG gründen', url: 'https://www.wko.at/gruendung/flexkapg-gruenden', description: 'Wirtschaftskammer Österreich — FlexKapG Gründungsratgeber' },
              { name: 'KStG § 22 — Körperschaftsteuersatz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004531', description: 'Rechtsinformationssystem des Bundes (RIS) — Körperschaftsteuergesetz' },
              { name: 'GmbHG — GmbH-Gesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001720', description: 'Rechtsinformationssystem des Bundes (RIS)' },
              { name: 'BMF — Gesellschaftsteuer', url: 'https://www.bmf.gv.at/themen/steuern/gesellschaftsteuer.html', description: 'Bundesministerium für Finanzen' },
            ]}
            relatedArticles={[
              { title: 'GmbH vs. Einzelunternehmen — Der Steuer-Vergleich', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
              { title: 'Steueroptimierung für Selbständige — Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              { title: 'SVS-Nachzahlung vermeiden — 7 Profi-Strategien', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
            ]}
          />
        </article>
      </div>
    </div>
  )
}