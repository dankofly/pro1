import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'
import { SiteFooter } from '@/components/site-footer'

export default function SteueroptimierungSelbststaendigePage() {
  return (
    <PublicShell>
    <div className="min-h-screen bg-sb-bg text-sb-text">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <nav className="text-sm mb-6 text-sb-mut">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/steuerwissen" className="hover:text-sb-accent-deep transition-colors">
                Steuerwissen
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">›</span>
              <span className="text-sb-mut">Steueroptimierung</span>
            </li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-sb-text leading-tight">
              Steueroptimierung für Selbständige — Die komplette Anleitung 2026
            </h1>
            <p className="text-xl text-sb-mut leading-relaxed">
              Als Selbständiger in Österreich stehen Ihnen zahlreiche legale Möglichkeiten zur Steueroptimierung zur Verfügung.
              Diese Anleitung zeigt alle wichtigen Hebel: von Absetzbeträgen über Betriebsausgaben bis zur optimalen Rechtsform.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">Einkommensteuer-Tarif verstehen</h2>

            <p className="mb-6">
              Der österreichische Einkommensteuertarif ist progressiv gestaltet. Je höher Ihr zu versteuerndes Einkommen,
              desto höher der Grenzsteuersatz auf den letzten Euro.
            </p>

            <div className="bg-sb-card p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4 text-sb-text">Die 7 Tarifstufen nach § 33 EStG (2026):</h3>
              <ul className="space-y-2 text-sb-mut">
                <li>• Bis 13.539€: <span className="text-sb-green font-medium">0%</span></li>
                <li>• 13.540€ bis 21.992€: <span className="text-sb-accent font-medium">20%</span></li>
                <li>• 21.993€ bis 36.458€: <span className="text-sb-accent font-medium">30%</span></li>
                <li>• 36.459€ bis 70.365€: <span className="text-sb-red font-medium">40%</span></li>
                <li>• 70.366€ bis 104.859€: <span className="text-sb-red font-medium">48%</span></li>
                <li>• 104.860€ bis 1.000.000€: <span className="text-sb-red font-medium">50%</span></li>
                <li>• Über 1.000.000€: <span className="text-sb-red font-medium">55%</span></li>
              </ul>
            </div>

            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <h4 className="font-medium mb-3 text-sb-accent">Wichtiger Unterschied:</h4>
              <p className="text-sb-mut">
                <strong>Grenzsteuersatz</strong>: Der Steuersatz auf den letzten verdienten Euro.<br/>
                <strong>Durchschnittssteuersatz</strong>: Gesamtsteuer geteilt durch Gesamteinkommen.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">Absetzbeträge ausschöpfen</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-green">Gewinnfreibetrag (§ 10 EStG)</h3>
                <p className="text-sb-mut mb-3">
                  Der wichtigste Absetzbetrag für Selbständige: <strong>15% des Gewinns</strong> bis maximal 33.000€
                  (entspricht maximal 4.950€ Freibetrag).
                </p>
                <p className="text-sm text-sb-mut">
                  Beispiel: Bei 30.000€ Gewinn sparen Sie 4.500€ × Ihr Grenzsteuersatz an Steuern.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-green">Familienbonus Plus</h3>
                <p className="text-sb-mut">
                  <strong>2.000€ pro Kind unter 18 Jahren</strong> (700€ pro Jahr ab 18). Direkte Steuerreduktion,
                  nicht nur Abzug von der Bemessungsgrundlage.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-sb-card p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-sb-text">AVAB</h4>
                  <p className="text-sb-mut text-sm">612€ Alleinverdienerabsetzbetrag bei einem Kind (2026)</p>
                </div>
                <div className="bg-sb-card p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-sb-text">Verkehrsabsetzbetrag</h4>
                  <p className="text-sb-mut text-sm">496€ (2026), steht nur Arbeitnehmern zu</p>
                </div>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-green">Pendlerpauschale (nur Arbeitnehmer)</h3>
                <p className="text-sb-mut">
                  Das Pendlerpauschale (372€ bis 3.672€ jährlich je nach Entfernung und Öffi-Erreichbarkeit)
                  ist ein Werbungskosten-Instrument für Arbeitnehmer. Als Selbständiger setzen Sie stattdessen
                  die tatsächlichen Fahrtkosten bzw. das Kilometergeld als Betriebsausgabe ab.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">Betriebsausgaben optimieren</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-sb-text">Arbeitszimmer</h3>
                <p className="text-sb-mut mb-3">
                  Wenn Ihr Arbeitszimmer im Wohnungsverband den <strong>Mittelpunkt Ihrer gesamten betrieblichen
                  Tätigkeit</strong> bildet und (nahezu) ausschließlich betrieblich genutzt wird,
                  können Sie die Kosten absetzen: Miete, Betriebskosten, Einrichtung, Renovierung.
                </p>
                <p className="text-sm text-sb-mut">
                  Bei gemischter Nutzung nur der betriebliche Anteil (z.B. 20m² von 100m² = 20%).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-sb-card p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-sb-text">Fortbildung & Fachliteratur</h4>
                  <p className="text-sb-mut text-sm">
                    Seminare, Kurse, Bücher, Zeitschriften – alles was der beruflichen Weiterbildung dient.
                  </p>
                </div>
                <div className="bg-sb-card p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-sb-text">Telefon & Internet</h4>
                  <p className="text-sb-mut text-sm">
                    Bei gemischter Nutzung ist der betriebliche Anteil absetzbar, geschätzt nach tatsächlicher Nutzung.
                  </p>
                </div>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-sb-text">Geringwertige Wirtschaftsgüter (GWG)</h3>
                <p className="text-sb-mut mb-3">
                  Wirtschaftsgüter bis <strong>1.000€ netto</strong> können im Jahr der Anschaffung
                  vollständig abgeschrieben werden.
                </p>
                <p className="text-sm text-sb-mut">
                  Beispiele: Laptop, Smartphone, Drucker, Büromöbel, Software-Lizenzen.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-sb-text">Bewirtungskosten</h3>
                <p className="text-sb-mut mb-3">
                  <strong>50% der Bewirtungskosten</strong> sind bei betrieblicher Veranlassung absetzbar.
                  Wichtig: Dokumentation mit Namen der bewirteten Personen und Anlass.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">Investitionssteuerung</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-sb-green">Investitionsfreibetrag (§ 11 EStG)</h3>
                <p className="text-sb-mut mb-4">
                  Bei Investitionen in abnutzbare Anlagegüter können Sie zusätzlich zur normalen
                  Abschreibung einen Freibetrag geltend machen:
                </p>
                <ul className="space-y-2 text-sb-mut">
                  <li>• <strong>10%</strong> der Anschaffungskosten (allgemein), befristet <strong>20%</strong> für Anschaffungen von 1.11.2025 bis 31.12.2026</li>
                  <li>• <strong>15%</strong> bei ökologischen Investitionen, befristet <strong>22%</strong> (gleicher Zeitraum)</li>
                  <li>• Bemessungsgrundlage maximal 1 Mio.€ pro Wirtschaftsjahr (bei 20% also bis zu 200.000€ IFB)</li>
                  <li>• Nicht für Wirtschaftsgüter, die den investitionsbedingten Gewinnfreibetrag decken</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-sb-text">Degressive Abschreibung</h3>
                <p className="text-sb-mut mb-3">
                  Bei beweglichen Anlagegütern können Sie zwischen linearer und degressiver
                  Abschreibung wählen. Die degressive AfA ist oft vorteilhafter.
                </p>
              </div>

              <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
                <h4 className="font-medium mb-3 text-sb-accent">Timing-Strategie:</h4>
                <p className="text-sb-mut">
                  Planen Sie größere Investitionen in Jahren mit hohem Gewinn, um von den
                  höheren Grenzsteuersätzen maximal zu profitieren.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">Rechtsform-Optimierung</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-sb-text">Einzelunternehmen vs. GmbH</h3>
                <p className="text-sb-mut mb-4">
                  Der Break-Even liegt als Faustregel meist zwischen <strong>60.000-80.000€ Jahresgewinn</strong>
                  (abhängig von Ausschüttungsverhalten und Geschäftsführergehalt). Ab diesem Punkt wird die GmbH steuerlich interessant:
                </p>
                <ul className="space-y-2 text-sb-mut">
                  <li>• GmbH: 23% Körperschaftsteuer + 27,5% KESt auf Ausschüttungen</li>
                  <li>• EU: Einkommensteuertarif (bis 55%)</li>
                  <li>• Zusätzliche GmbH-Kosten: ~2.000-4.000€/Jahr</li>
                </ul>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-sb-text">Pauschalierung prüfen</h3>
                <p className="text-sb-mut mb-4">Je nach Branche können verschiedene Pauschalierungen vorteilhaft sein:</p>
                <ul className="space-y-2 text-sb-mut">
                  <li>• Basispauschalierung: 15% des Umsatzes (2026, bis 420.000€ Umsatz; 6% für bestimmte Tätigkeiten wie Beratung)</li>
                  <li>• Kleinunternehmerpauschalierung: 45% Ausgabenpauschale, 20% bei Dienstleistungsbetrieben</li>
                  <li>• Branchenpauschalierungen: z.B. Gastgewerbe, Lebensmittelhandel, Handelsvertreter</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-sb-accent-soft p-8 rounded-lg border border-sb-accent/30">
            <h2 className="text-2xl font-semibold mb-4 text-sb-text">Berechnen Sie Ihre Steuerersparnis</h2>
            <p className="text-sb-mut mb-6">
              Nutzen Sie unsere kostenlosen Rechner, um Ihr Optimierungspotenzial zu ermitteln
              und die beste Strategie für Ihre Situation zu finden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-sb-accent hover:bg-sb-accent-deep">
                <Link href="/rechner">Alle Rechner</Link>
              </Button>
              <Button asChild variant="outline" className="border-sb-line-strong text-sb-mut hover:bg-sb-card">
                <Link href="/einkommensteuer">Einkommensteuerrechner</Link>
              </Button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">Häufige Fragen</h2>

            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-text">
                  Wie viel Steuern kann ich als Selbständiger in Österreich sparen?
                </h3>
                <p className="text-sb-mut">
                  Durch optimale Nutzung von Gewinnfreibetrag (15% auf erste 33.000€),
                  Investitionsfreibetrag (20-22%) und vollständige Geltendmachung von
                  Betriebsausgaben können Selbständige oft 3.000-10.000€ jährlich sparen.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-text">
                  Was ist der Gewinnfreibetrag nach § 10 EStG?
                </h3>
                <p className="text-sb-mut">
                  Der Gewinnfreibetrag beträgt 15% des Gewinns bis maximal 33.000€
                  (= max. 4.950€ Freibetrag). Er reduziert direkt die Steuerbemessungsgrundlage
                  für Selbständige und EPU.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-text">
                  Welche Betriebsausgaben kann ich als Selbständiger absetzen?
                </h3>
                <p className="text-sb-mut">
                  Alle betrieblich veranlassten Ausgaben: Arbeitszimmer, Fortbildung, Fachliteratur,
                  Telefon/Internet (anteilig), Reisekosten, GWG bis 1.000€, Bewirtung (50%),
                  Versicherungen und Beratungskosten.
                </p>
              </div>

              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-text">
                  Ab welchem Gewinn lohnt sich eine GmbH?
                </h3>
                <p className="text-sb-mut">
                  Der Break-Even liegt als Faustregel meist zwischen 60.000-80.000€ Jahresgewinn.
                  Ab diesem Punkt wird die GmbH-Besteuerung (23% KöSt + 27,5% KESt auf Ausschüttungen)
                  günstiger als der progressive Einkommensteuertarif.
                </p>
              </div>
            </div>
          </section>

          {/* Tier-basierte Empfehlungen */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">Strategien nach Einkommensstufe</h2>
            <div className="space-y-4">
              <div className="bg-sb-card p-6 rounded-lg border-l-4 border-sb-green/40">
                <h3 className="text-lg font-medium text-sb-text mb-2">Unter 30.000€ Gewinn</h3>
                <p className="text-sb-mut">
                  Nutzen Sie den Grundfreibetrag (bis 4.950€) voll aus. Prüfen Sie die Kleinunternehmerpauschalierung
                  (45% bzw. 20%). SVS-Ausnahme möglich bei Einkünften unter der Versicherungsgrenze
                  (6.613,20€, 2026) und Umsatz bis 55.000€. Fokus auf vollständige Erfassung aller Betriebsausgaben.
                </p>
              </div>
              <div className="bg-sb-card p-6 rounded-lg border-l-4 border-sb-accent/40">
                <h3 className="text-lg font-medium text-sb-text mb-2">30.000€ – 60.000€ Gewinn</h3>
                <p className="text-sb-mut">
                  Grundfreibetrag ist ausgeschöpft. Investitionsbedingter GFB über Wertpapierkauf nutzen.
                  IFB (15%/20%) bei geplanten Investitionen einsetzen. Strategische Jahresend-Planung:
                  Ausgaben vorziehen, Einnahmen verschieben. ESt-Vorauszahlungen prüfen und ggf. anpassen.
                </p>
              </div>
              <div className="bg-sb-card p-6 rounded-lg border-l-4 border-sb-accent">
                <h3 className="text-lg font-medium text-sb-text mb-2">60.000€ – 100.000€ Gewinn</h3>
                <p className="text-sb-mut">
                  GmbH-Gründung prüfen (Break-Even als Faustregel bei ~60-80k). Gewinnthesaurierung in der GmbH spart
                  erheblich. SVS-Höchstbeitragsgrundlage beachten (97.020€/Jahr, 2026). Kombinierte Nutzung
                  von GFB + IFB (für verschiedene Wirtschaftsgüter) maximiert die Steuerersparnis.
                </p>
              </div>
              <div className="bg-sb-card p-6 rounded-lg border-l-4 border-sb-red/40">
                <h3 className="text-lg font-medium text-sb-text mb-2">Über 100.000€ Gewinn</h3>
                <p className="text-sb-mut">
                  GmbH ist fast immer vorteilhaft. Grenzsteuersatz 48-50% vs. 23% KöSt.
                  Geschäftsführergehalt optimal festlegen (ASVG-Beiträge beachten). Pensionsvorsorge
                  über die GmbH. Holdingstruktur für langfristige Vermögensplanung prüfen.
                </p>
              </div>
            </div>
          </section>

          {/* E/A vs Bilanz */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">E/A-Rechnung vs. Bilanzierung</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium text-sb-text mb-3">Einnahmen-Ausgaben-Rechnung</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>• Zufluss-Abfluss-Prinzip</li>
                  <li>• Einfacher und günstiger</li>
                  <li>• Gewinnsteuerung durch Timing möglich</li>
                  <li>• Bis 700.000€ Umsatz möglich</li>
                  <li>• GFB Grundfreibetrag verfügbar</li>
                </ul>
              </div>
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium text-sb-text mb-3">Bilanzierung (doppelte Buchführung)</h3>
                <ul className="text-sb-mut space-y-2">
                  <li>• Periodengerechte Zuordnung</li>
                  <li>• Pflicht ab 700.000€ Umsatz (2 Jahre)</li>
                  <li>• Besserer Unternehmensüberblick</li>
                  <li>• Rückstellungen möglich</li>
                  <li>• GmbH: immer bilanzierungspflichtig</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Vorauszahlungen */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">ESt-Vorauszahlungen optimieren</h2>
            <p className="text-sb-mut mb-4">
              Die Einkommensteuer-Vorauszahlungen werden vierteljährlich fällig (15.2., 15.5., 15.8., 15.11.)
              und basieren auf dem letzten Steuerbescheid. Bei sinkendem Gewinn können Sie eine Herabsetzung
              beantragen.
            </p>
            <div className="bg-sb-accent-soft p-6 rounded-lg border border-sb-accent/30">
              <h4 className="font-medium mb-3 text-sb-accent">Antrag auf Herabsetzung:</h4>
              <p className="text-sb-mut">
                Bei einem erwarteten Gewinnrückgang können Sie beim Finanzamt einen Antrag auf Herabsetzung
                der Vorauszahlungen stellen. Der Antrag ist bis 30. September des laufenden Jahres möglich.
                Vorsicht: Ergibt der Bescheid später eine Nachzahlung, fallen ab 1. Oktober des Folgejahres
                Anspruchszinsen an (aktuell 3,53%).
              </p>
            </div>
          </section>

          {/* Erweiterte FAQ */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-sb-accent">Weitere häufige Fragen</h2>
            <div className="space-y-6">
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-text">
                  Kann ich Steuerberatungskosten absetzen?
                </h3>
                <p className="text-sb-mut">
                  Ja, Steuerberatungskosten sind vollständig als Betriebsausgabe absetzbar. Bei einem
                  Grenzsteuersatz von 40% spart Ihnen jeder Euro Steuerberatung effektiv 40 Cent Steuern.
                  Auch SteuerBoard.pro-Abos sind als Betriebsausgabe absetzbar.
                </p>
              </div>
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-text">
                  Was ist der Unterschied zwischen Freibetrag und Absetzbetrag?
                </h3>
                <p className="text-sb-mut">
                  Ein Freibetrag (z.B. GFB) reduziert das zu versteuernde Einkommen — die Ersparnis
                  hängt vom persönlichen Steuersatz ab. Ein Absetzbetrag (z.B. Familienbonus) wird
                  direkt von der Steuer abgezogen — 1€ Absetzbetrag = 1€ weniger Steuer.
                </p>
              </div>
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-text">
                  Lohnt sich die Pauschalierung für mich?
                </h3>
                <p className="text-sb-mut">
                  Die Pauschalierung lohnt sich, wenn Ihre tatsächlichen Betriebsausgaben unter dem
                  Pauschalsatz liegen (15% bei Basispauschalierung ab 2026, 45% bzw. 20% bei Kleinunternehmerpauschalierung).
                  Berechnen Sie beide Varianten und wählen Sie die günstigere.
                </p>
              </div>
              <div className="bg-sb-card p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-sb-text">
                  Bis wann muss ich die Steuererklärung abgeben?
                </h3>
                <p className="text-sb-mut">
                  Ohne Steuerberater: bis 30. April (Papier) bzw. 30. Juni (FinanzOnline) des Folgejahres.
                  Mit Steuerberater: verlängerte Frist im Rahmen der Quotenregelung, längstens bis
                  31. März des zweitfolgenden Jahres (§ 134a BAO).
                </p>
              </div>
            </div>
          </section>

          <ArticleFooter
            breadcrumbs={[
              { name: 'Home', href: '/' },
              { name: 'Steuerwissen', href: '/steuerwissen' },
              { name: 'Steueroptimierung Selbständige', href: '/steuerwissen/steueroptimierung-selbststaendige' },
            ]}
            sources={[
              { name: 'EStG § 33 — Einkommensteuertarif', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS) — Einkommensteuergesetz' },
              { name: 'EStG § 10 — Gewinnfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Gewinnfreibetrag nach § 10 EStG' },
              { name: 'EStG § 11 — Investitionsfreibetrag', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Investitionsfreibetrag nach § 11 EStG' },
              { name: 'BMF — Steuern für Selbständige', url: 'https://www.bmf.gv.at/themen/steuern/selbststaendige-unternehmer.html', description: 'Bundesministerium für Finanzen — Informationsportal' },
              { name: 'WKO — Steueroptimierung für EPU', url: 'https://www.wko.at/steuern/steueroptimierung', description: 'Wirtschaftskammer Österreich — Steuertipps' },
            ]}
            relatedArticles={[
              { title: 'Gewinnfreibetrag 2026: Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              { title: 'SVS-Beiträge senken: 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
              { title: 'GmbH vs. Einzelunternehmen: Der Steuer-Vergleich', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
              { title: 'SVS-Nachzahlung vermeiden', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
            ]}
          />
        </article>
      </div>

      <SiteFooter />
    </div>
    </PublicShell>
  )
}
