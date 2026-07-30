import { Check, Calculator, FileText, AlertCircle, Info, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function BetriebsausgabenCheckliste() {
  return (
    <PublicShell>
    <div className="min-h-screen bg-sb-bg text-sb-mut">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-sb-mut">
            <li>
              <Button asChild>
                <Link href="/" className="hover:text-sb-mut">
                  Start
                </Link>
              </Button>
            </li>
            <li>/</li>
            <li>
              <Button asChild>
                <Link href="/steuerwissen" className="hover:text-sb-mut">
                  Steuerwissen
                </Link>
              </Button>
            </li>
            <li>/</li>
            <li className="text-sb-mut">Betriebsausgaben Checkliste</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-sb-text mb-4">
            Betriebsausgaben Checkliste 2026 — Was Selbständige absetzen können
          </h1>
          <p className="text-xl text-sb-mut leading-relaxed">
            Vollständige Übersicht aller absetzbaren Betriebsausgaben für EPU und Selbständige in Österreich.
            Mit Arbeitsplatzpauschale, GWG-Grenze und praktischen Berechnungsbeispielen.
          </p>
          <div className="flex items-center space-x-4 mt-6 text-sm text-sb-dim">
            <span>📅 19. März 2026</span>
            <span>📖 12 min Lesezeit</span>
            <span>🎯 Für Selbständige</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-slate max-w-none">
          {/* Kurzantwort */}
          <div className="bg-sb-accent-soft border border-sb-accent/30 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-sb-mut mb-3 flex items-center">
              <Info className="mr-2" size={20} />
              Kurzantwort
            </h2>
            <p className="text-sb-text mb-0">
              <strong>Selbständige können in Österreich 2026 alle betrieblich veranlassten Ausgaben absetzen:</strong>
              Arbeitsplatzpauschale (1.200 € oder 300 €), Büroausstattung, EDV-Kosten, Fahrzeugkosten (0,50 €/km),
              Versicherungen, Weiterbildung, Steuerberatung und Marketing. Wichtig: klare Abgrenzung zu Privatausgaben
              und ordnungsgemäße Belegführung. GWG bis 1.000 € sind sofort absetzbar.
            </p>
          </div>

          {/* Was sind Betriebsausgaben? */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-sb-text mb-6">Was sind Betriebsausgaben?</h2>

            <p>
              Betriebsausgaben sind laut <strong>§ 4 Abs 4 EStG</strong> alle Aufwendungen, die durch den Betrieb
              veranlasst sind. Sie mindern direkt Ihren steuerpflichtigen Gewinn und damit die zu zahlende Steuer.
            </p>

            <h3 className="text-xl font-semibold text-sb-text mt-8 mb-4">Grundprinzipien der Betriebsausgaben</h3>

            <div className="bg-sb-card rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-sb-text mb-3">1. Betriebliche Veranlassung</h4>
              <p className="mb-4">
                Die Ausgabe muss objektiv dem Betrieb dienen. Private Nutzung schließt Betriebsausgabenabzug nicht
                automatisch aus, aber der betriebliche Anteil muss klar abgrenzbar sein.
              </p>

              <h4 className="font-semibold text-sb-text mb-3">2. Tatsächliche Aufwendung</h4>
              <p className="mb-4">
                Die Ausgabe muss tatsächlich entstanden und bezahlt worden sein. Rückstellungen sind nur in
                bestimmten Fällen zulässig.
              </p>

              <h4 className="font-semibold text-sb-text mb-3">3. Abgrenzung zu Privatausgaben</h4>
              <p>
                Gemischte Aufwendungen (beruflich + privat) müssen aufgeteilt werden. Bei Handy/Internet
                ist der betriebliche Anteil im Einzelfall zu schätzen und zu dokumentieren (in der Praxis
                oft 40-60%, das ist eine Faustregel und keine amtliche Quote).
              </p>
            </div>
          </section>

          {/* Vollständige Checkliste */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-sb-text mb-6">Vollständige Betriebsausgaben Checkliste 2026</h2>

            {/* Arbeitsplatz & Büro */}
            <div className="bg-sb-card rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-sb-green mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Arbeitsplatz & Büro
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Arbeitsplatzpauschale 2026</strong>
                    <p className="text-sb-mut text-sm">
                      Großes Pauschale: 1.200 € (andere aktive Erwerbseinkünfte max. 13.539 €)<br />
                      Kleines Pauschale: 300 € (andere aktive Erwerbseinkünfte darüber), plus ergonomisches Mobiliar bis 300 €/Jahr<br />
                      Voraussetzung: kein anderer Raum steht für die Tätigkeit zur Verfügung
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Miete & Betriebskosten (anteilig)</strong>
                    <p className="text-sb-mut text-sm">Nur bei steuerlich anerkanntem Arbeitszimmer (ausschließlich betriebliche Nutzung, Mittelpunkt der Tätigkeit): Fläche im Verhältnis zur Gesamtwohnfläche. Nicht mit dem Arbeitsplatzpauschale kombinierbar.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Büromöbel & Einrichtung</strong>
                    <p className="text-sb-mut text-sm">Schreibtisch, Bürostuhl, Regale, Beleuchtung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Büromaterial</strong>
                    <p className="text-sb-mut text-sm">Papier, Stifte, Ordner, Druckerpatronen, Briefumschläge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* EDV & Kommunikation */}
            <div className="bg-sb-card rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-sb-accent mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                EDV & Kommunikation
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Computer, Laptop, Tablet</strong>
                    <p className="text-sb-mut text-sm">GWG bis 1.000 € sofort absetzbar, darüber AfA über Nutzungsdauer</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Software & Lizenzen</strong>
                    <p className="text-sb-mut text-sm">Microsoft Office, Adobe Creative Suite, Buchhaltungssoftware</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Cloud-Services</strong>
                    <p className="text-sb-mut text-sm">Dropbox, Google Workspace, AWS, Hosting-Kosten</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Telefon & Internet (anteilig)</strong>
                    <p className="text-sb-mut text-sm">Betrieblicher Anteil nach Nutzung schätzen und dokumentieren (Faustregel oft 40-60%)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Handy & Mobilvertrag</strong>
                    <p className="text-sb-mut text-sm">Betrieblicher Anteil klar dokumentieren</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fahrzeug & Reisen */}
            <div className="bg-sb-card rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-sb-accent mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Fahrzeug & Reisen
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Amtliches Kilometergeld: 0,50 €/km</strong>
                    <p className="text-sb-mut text-sm">Einfachste Variante für betriebliche Fahrten mit Privatfahrzeug</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>KFZ-Kosten bei Fahrtenbuch</strong>
                    <p className="text-sb-mut text-sm">Treibstoff, Reparaturen, Versicherung, AfA anteilig nach betrieblicher Nutzung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Öffentliche Verkehrsmittel</strong>
                    <p className="text-sb-mut text-sm">Bahntickets, Flugkosten, Öffi-Karten für Geschäftsreisen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Reisekosten & Diäten</strong>
                    <p className="text-sb-mut text-sm">
                      Inland: 30 €/Tag bzw. 2,50 € je angefangener Stunde (ab mehr als 3 Stunden, Werte seit 2025)<br />
                      Nächtigungskosten: tatsächliche Hotelkosten oder 17 € Pauschale pro Nacht
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Versicherungen & Vorsorge */}
            <div className="bg-sb-card rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-sb-accent mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Versicherungen & Vorsorge
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>SVS-Beiträge</strong>
                    <p className="text-sb-mut text-sm">Kranken- und Pensionsversicherung als Betriebsausgabe absetzbar!</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Betriebshaftpflichtversicherung</strong>
                    <p className="text-sb-mut text-sm">Schutz vor Schadenersatzansprüchen Dritter</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Rechtsschutzversicherung (betrieblich)</strong>
                    <p className="text-sb-mut text-sm">Nur der betriebliche Anteil absetzbar</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Cyber-Versicherung</strong>
                    <p className="text-sb-mut text-sm">Schutz vor Hackerangriffen und Datenverlust</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing & Werbung */}
            <div className="bg-sb-card rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-sb-accent mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Marketing & Werbung
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Website, Domain, Hosting</strong>
                    <p className="text-sb-mut text-sm">Webseitenerstellung, Domaingebühren, Server-Hosting</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Online-Werbung</strong>
                    <p className="text-sb-mut text-sm">Google Ads, Facebook Ads, LinkedIn Ads, Instagram-Werbung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Werbematerial</strong>
                    <p className="text-sb-mut text-sm">Visitenkarten, Flyer, Broschüren, Messestände</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Bewirtungskosten (50% bei Werbezweck)</strong>
                    <p className="text-sb-mut text-sm">Geschäftsessen nur zur Hälfte absetzbar, wenn sie nachweislich der Werbung dienen. Dokumentation erforderlich!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weiterbildung */}
            <div className="bg-sb-card rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Weiterbildung & Wissen
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Fortbildungen & Seminare</strong>
                    <p className="text-sb-mut text-sm">Kurse, Workshops, Online-Trainings, Zertifizierungen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Fachliteratur & Zeitschriften</strong>
                    <p className="text-sb-mut text-sm">Bücher, Magazine, digitale Publikationen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Konferenzen & Events</strong>
                    <p className="text-sb-mut text-sm">Teilnahmegebühren, Networking-Events, Branchentreffen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Beratung & Dienstleistungen */}
            <div className="bg-sb-card rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-sb-accent mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Beratung & Dienstleistungen
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Steuerberater</strong>
                    <p className="text-sb-mut text-sm">Beratung, Steuererklärung, laufende Buchführung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Rechtsanwalt</strong>
                    <p className="text-sb-mut text-sm">Vertragsberatung, Geschäftsstreitigkeiten, AGB-Erstellung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Buchführung & Lohnverrechnung</strong>
                    <p className="text-sb-mut text-sm">Externe Buchhaltung, Personalverrechnung</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Freelancer & Subunternehmer</strong>
                    <p className="text-sb-mut text-sm">Projektbasierte Zusammenarbeit, Auslagerung von Tätigkeiten</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sonstiges */}
            <div className="bg-sb-card rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-sb-accent mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Sonstige Betriebsausgaben
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Geringwertige Wirtschaftsgüter (GWG)</strong>
                    <p className="text-sb-mut text-sm">Bis 1.000 € netto sofort absetzbar</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Bankgebühren Geschäftskonto</strong>
                    <p className="text-sb-mut text-sm">Kontoführung, Überweisungen, Kreditkartengebühren</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Porto & Versandkosten</strong>
                    <p className="text-sb-mut text-sm">Briefporto, Paketversand, Expresslieferungen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Mitgliedschaften</strong>
                    <p className="text-sb-mut text-sm">WKO-Beitrag, Berufsverbände, Kammern</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nicht absetzbar */}
          <section className="mb-12">
            <div className="bg-sb-red/10 border border-sb-red/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-sb-mut mb-4 flex items-center">
                <AlertCircle className="mr-2" size={20} />
                Nicht als Betriebsausgabe absetzbar
              </h2>

              <div className="space-y-2 text-sb-text">
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
            <h2 className="text-2xl font-bold text-sb-text mb-6">Arbeitsplatzpauschale 2026 im Detail</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-sb-card rounded-lg overflow-hidden">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-sb-text">Typ</th>
                    <th className="px-6 py-4 text-left font-semibold text-sb-text">Betrag</th>
                    <th className="px-6 py-4 text-left font-semibold text-sb-text">Voraussetzungen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sb-line">
                  <tr>
                    <td className="px-6 py-4 font-medium text-sb-green">Großes Pauschale</td>
                    <td className="px-6 py-4 text-sb-mut">1.200 €</td>
                    <td className="px-6 py-4 text-sb-mut">
                      • Andere aktive Erwerbseinkünfte max. 13.539 € (2026)<br />
                      • Kein anderer Raum für die Tätigkeit verfügbar
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-sb-accent">Kleines Pauschale</td>
                    <td className="px-6 py-4 text-sb-mut">300 €</td>
                    <td className="px-6 py-4 text-sb-mut">
                      • Andere aktive Erwerbseinkünfte über 13.539 € (2026)<br />
                      • Kein anderer Raum für die Tätigkeit verfügbar<br />
                      • Zusätzlich absetzbar: ergonomisches Mobiliar bis 300 €/Jahr
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sb-accent-soft border border-sb-accent/30 rounded-lg p-4 mt-6">
              <p className="text-sb-text">
                <strong>Wichtig:</strong> Wer ein steuerliches Arbeitszimmer (§ 20 Abs 1 Z 2 lit d EStG)
                geltend macht, bekommt kein Arbeitsplatzpauschale. Es gilt: entweder Pauschale oder
                tatsächliche Arbeitszimmerkosten (nur bei ausschließlich betrieblicher Nutzung und
                Mittelpunkt der Tätigkeit).
              </p>
            </div>
          </section>

          {/* GWG-Grenze */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-sb-text mb-6">GWG-Grenze: 1.000 € optimal nutzen</h2>

            <p>
              <strong>Geringwertige Wirtschaftsgüter (GWG)</strong> bis 1.000 € können im Jahr der
              Anschaffung vollständig als Betriebsausgabe abgesetzt werden. Die Grenze gilt netto bei
              Vorsteuerabzug; für nicht regelbesteuerte Kleinunternehmer zählt der Bruttopreis.
            </p>

            <h3 className="text-xl font-semibold text-sb-text mt-8 mb-4">GWG vs. Abschreibung (AfA)</h3>

            <div className="overflow-x-auto">
              <table className="w-full bg-sb-card rounded-lg overflow-hidden">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-sb-text">Anschaffungskosten</th>
                    <th className="px-6 py-4 text-left font-semibold text-sb-text">Behandlung</th>
                    <th className="px-6 py-4 text-left font-semibold text-sb-text">Steuerlicher Vorteil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sb-line">
                  <tr>
                    <td className="px-6 py-4 text-sb-mut">Bis 1.000 € netto</td>
                    <td className="px-6 py-4 text-sb-green font-medium">Sofort absetzbar (GWG)</td>
                    <td className="px-6 py-4 text-sb-mut">Volle Betriebsausgabe im Jahr der Anschaffung</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sb-mut">Über 1.000 € netto</td>
                    <td className="px-6 py-4 text-sb-accent">Abschreibung (AfA)</td>
                    <td className="px-6 py-4 text-sb-mut">Aufteilung über Nutzungsdauer (z.B. 3 Jahre)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sb-green-soft border border-sb-green/30 rounded-lg p-6 mt-6">
              <h4 className="font-semibold text-sb-mut mb-3">Praxis-Tipp: GWG-Grenze optimal nutzen</h4>
              <p className="text-sb-text">
                Maßgeblich ist der Wert pro einzelnem, selbständig nutzbarem Wirtschaftsgut.
                Beispiel: Ein Laptop um 1.100 € liegt über der Grenze und muss abgeschrieben werden.
                Separat nutzbares Zubehör wie eine externe Maus um 50 € ist ein eigenes GWG und
                sofort absetzbar, auch wenn beides auf einer Rechnung steht.
              </p>
            </div>
          </section>

          {/* Bewirtungskosten */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-sb-text mb-6">Bewirtungskosten: 50%-Regel beachten</h2>

            <p>
              Bewirtung von Geschäftsfreunden ist als Repräsentationsaufwand <strong>grundsätzlich nicht
              absetzbar</strong>. Nur wenn die Bewirtung nachweislich der Werbung dient und die betriebliche
              Veranlassung weitaus überwiegt, sind <strong>50% als Betriebsausgabe</strong> absetzbar.
              Die Dokumentationspflichten sind streng.
            </p>

            <h3 className="text-xl font-semibold text-sb-text mt-8 mb-4">Voraussetzungen für Absetzbarkeit</h3>

            <div className="bg-sb-card rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Nachweisbarer Werbezweck</strong>
                    <p className="text-sb-mut text-sm">Die Bewirtung dient der Werbung (z.B. konkretes Geschäftsgespräch), die betriebliche Veranlassung überwiegt weitaus</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Angemessenheit</strong>
                    <p className="text-sb-mut text-sm">Kosten müssen in angemessenem Verhältnis zum Geschäftszweck stehen</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="text-sb-green mr-3 mt-1 flex-shrink-0" size={16} />
                  <div>
                    <strong>Vollständige Dokumentation erforderlich:</strong>
                    <p className="text-sb-mut text-sm">
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
            <h2 className="text-2xl font-bold text-sb-text mb-6">Berechnungsbeispiel: Steuerersparnis durch Betriebsausgaben</h2>

            <div className="bg-sb-card rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sb-accent mb-4">EPU Grafik-Designer, Umsatz: 50.000 €</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-sb-text mb-3">Typische Betriebsausgaben:</h4>
                  <div className="space-y-2 text-sb-mut">
                    <div className="flex justify-between">
                      <span>Arbeitsplatzpauschale (großes Pauschale):</span>
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
                      <span>Fahrzeugkosten (0,50€/km):</span>
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
                    <hr className="border-sb-line" />
                    <div className="flex justify-between font-bold text-sb-green">
                      <span>Gesamt Betriebsausgaben:</span>
                      <span>11.300 €</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sb-text mb-3">Steuerliche Auswirkung:</h4>
                  <div className="space-y-2 text-sb-mut">
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
                      <span>Einkommensteuer (Tarif 2026, vereinfacht):</span>
                      <span>ca. 6.900 €</span>
                    </div>
                    <div className="flex justify-between text-sb-green font-bold">
                      <span>Steuerersparnis durch BA (40% Grenzsteuersatz):</span>
                      <span>ca. 4.520 €</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-sb-green-soft border border-sb-green/30 rounded-lg p-4 mt-6">
                <p className="text-sb-text">
                  <strong>Wichtiger Hinweis:</strong> Durch ordnungsgemäße Dokumentation der Betriebsausgaben
                  spart dieser EPU rund 4.500 € Steuern pro Jahr (vereinfachte Rechnung ohne Gewinnfreibetrag
                  und Absetzbeträge).
                </p>
              </div>
            </div>
          </section>

          {/* Tipps */}
          <section className="mb-12">
            <div className="bg-sb-green-soft border border-sb-green/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-sb-mut mb-4 flex items-center">
                <Info className="mr-2" size={20} />
                Praktische Tipps für Selbständige
              </h2>

              <div className="space-y-4 text-sb-text">
                <div>
                  <strong>1. Digitale Belegverwaltung einrichten</strong>
                  <p className="text-sm text-sb-mut">
                    Apps wie "Steuer-Sparbuch" oder "<a href="https://www.lexware.de/" target="_blank" rel="noopener noreferrer" className="text-sb-accent hover:text-sb-accent-deep">Lexware</a>" für automatische Belegerfassung nutzen.
                    Fotos von Belegen sofort nach dem Kauf machen.
                  </p>
                </div>

                <div>
                  <strong>2. Separate Konten für Klarheit</strong>
                  <p className="text-sm text-sb-mut">
                    Geschäftskonto von Privatkonto trennen. Erleichtert die Buchführung und Belegzuordnung erheblich.
                  </p>
                </div>

                <div>
                  <strong>3. Fahrtenbuch vs. Kilometergeld</strong>
                  <p className="text-sm text-sb-mut">
                    Bei wenigen Fahrten: Kilometergeld (0,50 €/km). Bei viel Nutzung: Fahrtenbuch und
                    tatsächliche Kosten oft günstiger.
                  </p>
                </div>

                <div>
                  <strong>4. Deadlines beachten</strong>
                  <p className="text-sm text-sb-mut">
                    Einreichung bis 30. April des Folgejahres, via FinanzOnline bis 30. Juni
                    (mit Steuerberater über die Quotenregelung deutlich länger).
                    Belege 7 Jahre aufbewahren!
                  </p>
                </div>

                <div>
                  <strong>5. Zweifelsfälle dokumentieren</strong>
                  <p className="text-sm text-sb-mut">
                    Bei gemischten Aufwendungen (privat/betrieblich) die Aufteilung nachvollziehbar begründen
                    und dokumentieren.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-sb-text mb-6">Häufige Fragen zu Betriebsausgaben</h2>

            <div className="space-y-6">
              <div className="bg-sb-card rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
                  Was sind die wichtigsten Betriebsausgaben für Selbständige?
                </h3>
                <p>
                  Die wichtigsten Betriebsausgaben für Selbständige umfassen: Arbeitsplatzpauschale (1.200 € oder 300 €),
                  Büroausstattung, EDV-Kosten, Fahrzeugkosten (0,50 €/km), Versicherungen, Weiterbildung, Steuerberatung
                  und Marketing. Diese können direkt von der Steuer abgesetzt werden.
                </p>
              </div>

              <div className="bg-sb-card rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
                  Wie hoch ist die Arbeitsplatzpauschale 2026?
                </h3>
                <p>
                  Das Arbeitsplatzpauschale 2026 beträgt 1.200 €, wenn die anderen aktiven Erwerbseinkünfte
                  maximal 13.539 € betragen, sonst 300 € (zusätzlich ergonomisches Mobiliar bis 300 €/Jahr).
                  Voraussetzung: Es steht kein anderer Raum für die betriebliche Tätigkeit zur Verfügung.
                </p>
              </div>

              <div className="bg-sb-card rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
                  Was ist die GWG-Grenze für Selbständige?
                </h3>
                <p>
                  Die GWG-Grenze (Geringwertige Wirtschaftsgüter) beträgt 1.000 € (netto bei Vorsteuerabzug,
                  brutto für nicht regelbesteuerte Kleinunternehmer). Anschaffungen bis zu diesem Betrag können
                  im Jahr der Anschaffung vollständig als Betriebsausgabe abgesetzt werden, ohne Abschreibung
                  über mehrere Jahre.
                </p>
              </div>

              <div className="bg-sb-card rounded-lg p-6">
                <h3 className="text-lg font-semibold text-sb-accent mb-3">
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
            { name: "USP.gv.at - Arbeitsplatzpauschale", url: "https://www.usp.gv.at/themen/steuern-finanzen/steuerliche-gewinnermittlung/weitere-informationen-zur-steuerlichen-gewinnermittlung/betriebseinnahmen-und-ausgaben/Arbeitsplatzpauschale.html", description: "Amtliche Informationen zum Arbeitsplatzpauschale" },
            { name: "USP.gv.at - Geringwertige Wirtschaftsgüter", url: "https://www.usp.gv.at/themen/steuern-finanzen/steuerliche-gewinnermittlung/weitere-informationen-zur-steuerlichen-gewinnermittlung/betriebseinnahmen-und-ausgaben/geringwertige-wirtschaftsgueter.html", description: "Amtliche Informationen zur GWG-Grenze" },
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
    </PublicShell>
  )
}
