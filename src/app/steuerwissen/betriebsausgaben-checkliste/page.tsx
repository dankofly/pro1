import { Check, Calculator, FileText, AlertCircle, Info, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function BetriebsausgabenCheckliste() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-slate-400">
            <li>
              <Button asChild>
                <Link href="/" className="hover:text-slate-300">
                  Start
                </Link>
              </Button>
            </li>
            <li>/</li>
            <li>
              <Button asChild>
                <Link href="/steuerwissen" className="hover:text-slate-300">
                  Steuerwissen
                </Link>
              </Button>
            </li>
            <li>/</li>
            <li className="text-slate-300">Betriebsausgaben Checkliste</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Betriebsausgaben Checkliste 2026 — Was Selbständige absetzen können
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Vollständige Übersicht aller absetzbaren Betriebsausgaben für EPU und Selbständige in Österreich.
            Mit Arbeitsplatzpauschale, GWG-Grenze und praktischen Berechnungsbeispielen.
          </p>
          <div className="flex items-center space-x-4 mt-6 text-sm text-slate-500">
            <span>📅 19. März 2026</span>
            <span>📖 12 min Lesezeit</span>
            <span>🎯 Für Selbständige</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-slate max-w-none">
          {/* Kurzantwort */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-200 mb-3 flex items-center">
              <Info className="mr-2" size={20} />
              Kurzantwort
            </h2>
            <p className="text-blue-100 mb-0">
              <strong>Selbständige können in Österreich 2026 alle betrieblich veranlassten Ausgaben absetzen:</strong>
              Arbeitsplatzpauschale (1.200 € oder 300 €), Büroausstattung, EDV-Kosten, Fahrzeugkosten (0,42 €/km),
              Versicherungen, Weiterbildung, Steuerberatung und Marketing. Wichtig: klare Abgrenzung zu Privatausgaben
              und ordnungsgemäße Belegführung. GWG bis 1.000 € sind sofort absetzbar.
            </p>
          </div>

          {/* Was sind Betriebsausgaben? */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Was sind Betriebsausgaben?</h2>

            <p>
              Betriebsausgaben sind laut <strong>§ 4 Abs 4 EStG</strong> alle Aufwendungen, die durch den Betrieb
              veranlasst sind. Sie mindern direkt Ihren steuerpflichtigen Gewinn und damit die zu zahlende Steuer.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Grundprinzipien der Betriebsausgaben</h3>

            <div className="bg-slate-900 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-slate-200 mb-3">1. Betriebliche Veranlassung</h4>
              <p className="mb-4">
                Die Ausgabe muss objektiv dem Betrieb dienen. Private Nutzung schließt Betriebsausgabenabzug nicht
                automatisch aus, aber der betriebliche Anteil muss klar abgrenzbar sein.
              </p>

              <h4 className="font-semibold text-slate-200 mb-3">2. Tatsächliche Aufwendung</h4>
              <p className="mb-4">
                Die Ausgabe muss tatsächlich entstanden und bezahlt worden sein. Rückstellungen sind nur in
                bestimmten Fällen zulässig.
              </p>

              <h4 className="font-semibold text-slate-200 mb-3">3. Abgrenzung zu Privatausgaben</h4>
              <p>
                Gemischte Aufwendungen (beruflich + privat) müssen aufgeteilt werden. Typische Aufteilung
                bei Handy/Internet: 40-60% betrieblich, je nach Nutzungsintensität.
              </p>
            </div>
          </section>

          {/* Vollständige Checkliste */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Vollständige Betriebsausgaben Checkliste 2026</h2>

            {/* Arbeitsplatz & Büro */}
            <div className="bg-slate-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Arbeitsplatz & Büro
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Arbeitsplatzpauschale 2026</strong>
                    <p className="text-slate-400 text-sm">
                      Typ 1: 1.200 € (hohe fachliche Anforderungen, überwiegend PC-Arbeit)<br />
                      Typ 2: 300 € (niedrige Anforderungen, einfache Bürotätigkeit)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Miete & Betriebskosten (anteilig)</strong>
                    <p className="text-slate-400 text-sm">Bei Homeoffice: Fläche des Arbeitszimmers im Verhältnis zur Gesamtwohnfläche</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Büromöbel & Einrichtung</strong>
                    <p className="text-slate-400 text-sm">Schreibtisch, Bürostuhl, Regale, Beleuchtung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Büromaterial</strong>
                    <p className="text-slate-400 text-sm">Papier, Stifte, Ordner, Druckerpatronen, Briefumschläge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* EDV & Kommunikation */}
            <div className="bg-slate-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                EDV & Kommunikation
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Computer, Laptop, Tablet</strong>
                    <p className="text-slate-400 text-sm">GWG bis 1.000 € sofort absetzbar, darüber AfA über Nutzungsdauer</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Software & Lizenzen</strong>
                    <p className="text-slate-400 text-sm">Microsoft Office, Adobe Creative Suite, Buchhaltungssoftware</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Cloud-Services</strong>
                    <p className="text-slate-400 text-sm">Dropbox, Google Workspace, AWS, Hosting-Kosten</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Telefon & Internet (anteilig)</strong>
                    <p className="text-slate-400 text-sm">Typisch 40-60% betrieblich, je nach Nutzung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Handy & Mobilvertrag</strong>
                    <p className="text-slate-400 text-sm">Betrieblicher Anteil klar dokumentieren</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fahrzeug & Reisen */}
            <div className="bg-slate-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Fahrzeug & Reisen
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Amtliches Kilometergeld: 0,42 €/km</strong>
                    <p className="text-slate-400 text-sm">Einfachste Variante für betriebliche Fahrten mit Privatfahrzeug</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>KFZ-Kosten bei Fahrtenbuch</strong>
                    <p className="text-slate-400 text-sm">Treibstoff, Reparaturen, Versicherung, AfA anteilig nach betrieblicher Nutzung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Öffentliche Verkehrsmittel</strong>
                    <p className="text-slate-400 text-sm">Bahntickets, Flugkosten, Öffi-Karten für Geschäftsreisen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Reisekosten & Diäten</strong>
                    <p className="text-slate-400 text-sm">
                      Inland: 26,40 €/Tag (über 3h Abwesenheit)<br />
                      Nächtigungskosten: angemessene Hotelkosten
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Versicherungen & Vorsorge */}
            <div className="bg-slate-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Versicherungen & Vorsorge
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>SVS-Beiträge</strong>
                    <p className="text-slate-400 text-sm">Kranken- und Pensionsversicherung als Betriebsausgabe absetzbar!</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Betriebshaftpflichtversicherung</strong>
                    <p className="text-slate-400 text-sm">Schutz vor Schadenersatzansprüchen Dritter</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Rechtsschutzversicherung (betrieblich)</strong>
                    <p className="text-slate-400 text-sm">Nur der betriebliche Anteil absetzbar</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Cyber-Versicherung</strong>
                    <p className="text-slate-400 text-sm">Schutz vor Hackerangriffen und Datenverlust</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing & Werbung */}
            <div className="bg-slate-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-pink-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Marketing & Werbung
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Website, Domain, Hosting</strong>
                    <p className="text-slate-400 text-sm">Webseitenerstellung, Domaingebühren, Server-Hosting</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Online-Werbung</strong>
                    <p className="text-slate-400 text-sm">Google Ads, Facebook Ads, LinkedIn Ads, Instagram-Werbung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Werbematerial</strong>
                    <p className="text-slate-400 text-sm">Visitenkarten, Flyer, Broschüren, Messestände</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Bewirtungskosten (50% absetzbar)</strong>
                    <p className="text-slate-400 text-sm">Geschäftsessen mit Kunden, Geschäftspartner. Dokumentation erforderlich!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weiterbildung */}
            <div className="bg-slate-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Weiterbildung & Wissen
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Fortbildungen & Seminare</strong>
                    <p className="text-slate-400 text-sm">Kurse, Workshops, Online-Trainings, Zertifizierungen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Fachliteratur & Zeitschriften</strong>
                    <p className="text-slate-400 text-sm">Bücher, Magazine, digitale Publikationen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Konferenzen & Events</strong>
                    <p className="text-slate-400 text-sm">Teilnahmegebühren, Networking-Events, Branchentreffen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Beratung & Dienstleistungen */}
            <div className="bg-slate-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Beratung & Dienstleistungen
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Steuerberater</strong>
                    <p className="text-slate-400 text-sm">Beratung, Steuererklärung, laufende Buchführung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Rechtsanwalt</strong>
                    <p className="text-slate-400 text-sm">Vertragsberatung, Geschäftsstreitigkeiten, AGB-Erstellung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Buchführung & Lohnverrechnung</strong>
                    <p className="text-slate-400 text-sm">Externe Buchhaltung, Personalverrechnung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Freelancer & Subunternehmer</strong>
                    <p className="text-slate-400 text-sm">Projektbasierte Zusammenarbeit, Auslagerung von Tätigkeiten</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sonstiges */}
            <div className="bg-slate-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Sonstige Betriebsausgaben
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Geringwertige Wirtschaftsgüter (GWG)</strong>
                    <p className="text-slate-400 text-sm">Bis 1.000 € netto sofort absetzbar</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Bankgebühren Geschäftskonto</strong>
                    <p className="text-slate-400 text-sm">Kontoführung, Überweisungen, Kreditkartengebühren</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Porto & Versandkosten</strong>
                    <p className="text-slate-400 text-sm">Briefporto, Paketversand, Expresslieferungen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Mitgliedschaften</strong>
                    <p className="text-slate-400 text-sm">WKO-Beitrag, Berufsverbände, Kammern</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nicht absetzbar */}
          <section className="mb-12">
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-red-200 mb-4 flex items-center">
                <AlertCircle className="mr-2" size={20} />
                Nicht als Betriebsausgabe absetzbar
              </h2>

              <div className="space-y-2 text-red-100">
                <p>• <strong>Reine Privatausgaben</strong> (Lebensmittel, private Kleidung, Freizeitaktivitäten)</p>
                <p>• <strong>Strafen und Bußgelder</strong> (Verkehrsstrafen, behördliche Strafen)</p>
                <p>• <strong>Repräsentationskleidung</strong> (normale Anzüge, Kostüme - außer Berufskleidung)</p>
                <p>• <strong>Privatanteil gemischter Aufwendungen</strong> ohne ordnungsgemäße Aufteilung</p>
                <p>• <strong>Aufwendungen für private Lebensführung</strong> (Miete Privatwohnung ohne Arbeitszimmer)</p>
              </div>
            </div>
          </section>

          {/* Arbeitsplatzpauschale Detail */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Arbeitsplatzpauschale 2026 im Detail</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-slate-900 rounded-lg overflow-hidden">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Typ</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Betrag</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Voraussetzungen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="px-6 py-4 font-medium text-green-400">Typ 1</td>
                    <td className="px-6 py-4 text-slate-300">1.200 €</td>
                    <td className="px-6 py-4 text-slate-300">
                      • Überwiegend Computer-/Büroarbeit<br />
                      • Hohe fachliche Anforderungen<br />
                      • Qualifizierte Tätigkeit
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-blue-400">Typ 2</td>
                    <td className="px-6 py-4 text-slate-300">300 €</td>
                    <td className="px-6 py-4 text-slate-300">
                      • Einfache Bürotätigkeit<br />
                      • Niedrige fachliche Anforderungen<br />
                      • Routine-Tätigkeiten
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 mt-6">
              <p className="text-amber-100">
                <strong>Wichtig:</strong> Die Arbeitsplatzpauschale kann alternativ zu tatsächlichen Kosten
                gewählt werden. Bei höheren tatsächlichen Kosten lohnt sich die Einzelaufstellung.
              </p>
            </div>
          </section>

          {/* GWG-Grenze */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">GWG-Grenze: 1.000 € optimal nutzen</h2>

            <p>
              <strong>Geringwertige Wirtschaftsgüter (GWG)</strong> bis 1.000 € netto können im Jahr der
              Anschaffung vollständig als Betriebsausgabe abgesetzt werden.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">GWG vs. Abschreibung (AfA)</h3>

            <div className="overflow-x-auto">
              <table className="w-full bg-slate-900 rounded-lg overflow-hidden">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Anschaffungskosten</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Behandlung</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Steuerlicher Vorteil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="px-6 py-4 text-slate-300">Bis 1.000 € netto</td>
                    <td className="px-6 py-4 text-green-400 font-medium">Sofort absetzbar (GWG)</td>
                    <td className="px-6 py-4 text-slate-300">Volle Betriebsausgabe im Jahr der Anschaffung</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-slate-300">Über 1.000 € netto</td>
                    <td className="px-6 py-4 text-blue-400">Abschreibung (AfA)</td>
                    <td className="px-6 py-4 text-slate-300">Aufteilung über Nutzungsdauer (z.B. 3 Jahre)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-6 mt-6">
              <h4 className="font-semibold text-green-200 mb-3">Praxis-Tipp: GWG-Grenze optimal nutzen</h4>
              <p className="text-green-100">
                Bei Anschaffungen knapp über 1.000 € prüfen, ob eine Aufteilung sinnvoll ist.
                Beispiel: Laptop um 1.100 € + externe Maus um 50 € separat kaufen →
                beide unter GWG-Grenze → sofort absetzbar.
              </p>
            </div>
          </section>

          {/* Bewirtungskosten */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Bewirtungskosten: 50%-Regel beachten</h2>

            <p>
              Bewirtungsaufwendungen für Geschäftspartner sind nur zu <strong>50% als Betriebsausgabe</strong>
              absetzbar. Die Dokumentationspflichten sind streng.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Voraussetzungen für Absetzbarkeit</h3>

            <div className="bg-slate-900 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Geschäftlicher Anlass</strong>
                    <p className="text-slate-400 text-sm">Kunden-/Geschäftspartner-Bewirtung mit nachweisbarem betrieblichem Bezug</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Angemessenheit</strong>
                    <p className="text-slate-400 text-sm">Kosten müssen in angemessenem Verhältnis zum Geschäftszweck stehen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Vollständige Dokumentation erforderlich:</strong>
                    <p className="text-slate-400 text-sm">
                      • Datum, Ort, Teilnehmer<br />
                      • Geschäftlicher Anlass<br />
                      • Originalrechnung<br />
                      • Bei Bargeschäften: Eigenbeleg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Berechnungsbeispiel */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Berechnungsbeispiel: Steuerersparnis durch Betriebsausgaben</h2>

            <div className="bg-slate-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">EPU Grafik-Designer, Umsatz: 50.000 €</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-200 mb-3">Typische Betriebsausgaben:</h4>
                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span>Arbeitsplatzpauschale Typ 1:</span>
                      <span>1.200 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adobe Creative Suite:</span>
                      <span>720 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Computer Equipment (GWG):</span>
                      <span>900 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Internet/Telefon (60%):</span>
                      <span>480 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fahrzeugkosten (0,42€/km):</span>
                      <span>1.800 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fortbildung & Fachliteratur:</span>
                      <span>600 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Steuerberater:</span>
                      <span>1.200 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing & Website:</span>
                      <span>800 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SVS-Beiträge:</span>
                      <span>3.600 €</span>
                    </div>
                    <hr className="border-slate-700" />
                    <div className="flex justify-between font-bold text-green-400">
                      <span>Gesamt Betriebsausgaben:</span>
                      <span>11.300 €</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-3">Steuerliche Auswirkung:</h4>
                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span>Umsatz:</span>
                      <span>50.000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- Betriebsausgaben:</span>
                      <span>-11.300 €</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>= Gewinn (steuerpflichtig):</span>
                      <span>38.700 €</span>
                    </div>
                    <div className="flex justify-between mt-4">
                      <span>Einkommensteuer (ca. 25%):</span>
                      <span>9.675 €</span>
                    </div>
                    <div className="flex justify-between text-green-400 font-bold">
                      <span>Steuerersparnis durch BA:</span>
                      <span>2.825 €</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-6">
                <p className="text-green-100">
                  <strong>Wichtiger Hinweis:</strong> Durch ordnungsgemäße Dokumentation der Betriebsausgaben
                  spart dieser EPU rund 2.825 € Steuern pro Jahr!
                </p>
              </div>
            </div>
          </section>

          {/* Tipps */}
          <section className="mb-12">
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-green-200 mb-4 flex items-center">
                <Info className="mr-2" size={20} />
                Praktische Tipps für Selbständige
              </h2>

              <div className="space-y-4 text-green-100">
                <div>
                  <strong>1. Digitale Belegverwaltung einrichten</strong>
                  <p className="text-sm text-green-200">
                    Apps wie "Steuer-Sparbuch" oder "Lexware" für automatische Belegerfassung nutzen.
                    Fotos von Belegen sofort nach dem Kauf machen.
                  </p>
                </div>

                <div>
                  <strong>2. Separate Konten für Klarheit</strong>
                  <p className="text-sm text-green-200">
                    Geschäftskonto von Privatkonto trennen. Erleichtert die Buchführung und Belegzuordnung erheblich.
                  </p>
                </div>

                <div>
                  <strong>3. Fahrtenbuch vs. Kilometergeld</strong>
                  <p className="text-sm text-green-200">
                    Bei wenigen Fahrten: Kilometergeld (0,42 €/km). Bei viel Nutzung: Fahrtenbuch und
                    tatsächliche Kosten oft günstiger.
                  </p>
                </div>

                <div>
                  <strong>4. Deadlines beachten</strong>
                  <p className="text-sm text-green-200">
                    Einreichung bis 30. April des Folgejahres (bei Steuerberater bis 31. Juli).
                    Belege 7 Jahre aufbewahren!
                  </p>
                </div>

                <div>
                  <strong>5. Zweifelsfälle dokumentieren</strong>
                  <p className="text-sm text-green-200">
                    Bei gemischten Aufwendungen (privat/betrieblich) die Aufteilung nachvollziehbar begründen
                    und dokumentieren.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Häufige Fragen zu Betriebsausgaben</h2>

            <div className="space-y-6">
              <div className="bg-slate-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Was sind die wichtigsten Betriebsausgaben für Selbständige?
                </h3>
                <p>
                  Die wichtigsten Betriebsausgaben für Selbständige umfassen: Arbeitsplatzpauschale (1.200 € oder 300 €),
                  Büroausstattung, EDV-Kosten, Fahrzeugkosten (0,42 €/km), Versicherungen, Weiterbildung, Steuerberatung
                  und Marketing. Diese können direkt von der Steuer abgesetzt werden.
                </p>
              </div>

              <div className="bg-slate-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Wie hoch ist die Arbeitsplatzpauschale 2026?
                </h3>
                <p>
                  Die Arbeitsplatzpauschale 2026 beträgt für Typ 1 (hohe Anforderungen) 1.200 € und für Typ 2
                  (niedrige Anforderungen) 300 €. Typ 1 gilt bei überwiegender Bürotätigkeit mit Computer und hohen
                  fachlichen Anforderungen.
                </p>
              </div>

              <div className="bg-slate-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Was ist die GWG-Grenze für Selbständige?
                </h3>
                <p>
                  Die GWG-Grenze (Geringwertige Wirtschaftsgüter) beträgt 1.000 € netto. Anschaffungen bis zu diesem
                  Betrag können im Jahr der Anschaffung vollständig als Betriebsausgabe abgesetzt werden, ohne
                  Abschreibung über mehrere Jahre.
                </p>
              </div>

              <div className="bg-slate-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Sind SVS-Beiträge als Betriebsausgabe absetzbar?
                </h3>
                <p>
                  Ja, SVS-Beiträge (Sozialversicherung der Selbständigen) können als Betriebsausgabe abgesetzt werden.
                  Dies umfasst sowohl die Kranken- als auch die Pensionsversicherungsbeiträge für Selbständige.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Article Footer */}
        <ArticleFooter
          sources={[
            { name: "BMF.gv.at — Betriebsausgaben", url: "https://www.bmf.gv.at/themen/steuern/arbeitnehmer-pensionisten/pendlerpauschale/betriebsausgaben.html", description: "Offizielle BMF-Informationen zu Betriebsausgaben" },
            { name: "WKO.at — Steuerinfo für Selbständige", url: "https://www.wko.at/service/steuern/Steuerinfos_fuer_Selbststaendige.html", description: "WKO-Leitfaden für steuerliche Pflichten Selbständiger" },
            { name: "RIS — Einkommensteuergesetz (EStG)", url: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570", description: "Aktuelle Fassung des EStG im Rechtsinformationssystem" }
          ]}
          relatedArticles={[
            { title: "Steueroptimierung für Selbständige", href: "/steuerwissen/steueroptimierung-selbststaendige" },
            { title: "Gewinnfreibetrag richtig nutzen", href: "/steuerwissen/gewinnfreibetrag-nutzen" },
            { title: "Pauschalierung in Österreich", href: "/steuerwissen/pauschalierung-oesterreich" }
          ]}
          breadcrumbs={[
            { name: "Start", href: "/" },
            { name: "Steuerwissen", href: "/steuerwissen" },
            { name: "Betriebsausgaben Checkliste", href: "/steuerwissen/betriebsausgaben-checkliste" }
          ]}
        />
      </div>

      <SiteFooter />
    </div>
  )
}