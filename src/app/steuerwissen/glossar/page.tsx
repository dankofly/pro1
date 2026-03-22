import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

const glossarTerms = [
  { letter: 'A', terms: [
    { term: 'Absetzbeträge', definition: 'Beträge, die direkt von der Einkommensteuer abgezogen werden (nicht vom Einkommen). Beispiele: Alleinverdienerabsetzbetrag, Verkehrsabsetzbetrag, Pensionistenabsetzbetrag. Absetzbeträge sind wertvoller als Freibeträge, da sie die Steuer 1:1 reduzieren.' },
    { term: 'AfA (Absetzung für Abnutzung)', definition: 'Die steuerliche Abschreibung von Anlagegütern über deren Nutzungsdauer. Ein Laptop mit 3 Jahren Nutzungsdauer wird jährlich zu einem Drittel abgeschrieben. Wirtschaftsgüter bis 1.000€ (GWG) können sofort abgeschrieben werden.' },
    { term: 'ASVG', definition: 'Allgemeines Sozialversicherungsgesetz — regelt die Sozialversicherung für unselbstständig Erwerbstätige (Angestellte, Arbeiter). Im Gegensatz zum GSVG für Selbstständige. ASVG-Beiträge werden vom Arbeitgeber und Arbeitnehmer geteilt.', link: '/steuerwissen/gmbh-vs-einzelunternehmen' },
    { term: 'Außergewöhnliche Belastungen', definition: 'Kosten, die zwangsläufig entstehen und die wirtschaftliche Leistungsfähigkeit wesentlich beeinträchtigen (z.B. Krankheitskosten, Behinderung, Katastrophenschäden). Sie mindern das steuerpflichtige Einkommen, es gilt ein Selbstbehalt.' },
  ]},
  { letter: 'B', terms: [
    { term: 'Betriebsausgaben', definition: 'Alle Aufwendungen, die durch den Betrieb veranlasst sind. Sie reduzieren den steuerlichen Gewinn und damit die Einkommensteuer und SVS-Beitragsgrundlage. Beispiele: Büromaterial, Miete, Telefon, Fortbildung, Fahrtkosten.', link: '/steuerwissen/steueroptimierung-selbststaendige' },
    { term: 'Bilanz', definition: 'Gegenüberstellung von Vermögen (Aktiva) und Kapital (Passiva) eines Unternehmens zu einem Stichtag. Bilanzierungspflicht besteht ab 700.000€ Umsatz (in 2 aufeinanderfolgenden Jahren) oder ab 1.000.000€ in einem Jahr.' },
    { term: 'BMF', definition: 'Bundesministerium für Finanzen — oberste Finanzbehörde Österreichs. Zuständig für Steuergesetze, Verordnungen und das Portal FinanzOnline.' },
    { term: 'Beitragsgrundlage (SVS)', definition: 'Der Betrag, auf dessen Basis die SVS-Beiträge berechnet werden. Grundlage ist der einkommensteuerliche Gewinn plus bestimmte Hinzurechnungen. Es gibt eine Mindest- und Höchstbeitragsgrundlage.', link: '/steuerwissen/svs-beitraege-senken' },
  ]},
  { letter: 'D', terms: [
    { term: 'DSGVO', definition: 'Datenschutz-Grundverordnung der EU. Relevant für Selbstständige, die personenbezogene Daten verarbeiten. Verstöße können zu hohen Strafen führen. Gilt seit Mai 2018.' },
  ]},
  { letter: 'E', terms: [
    { term: 'Einkommensteuer (ESt)', definition: 'Steuer auf das Einkommen natürlicher Personen. In Österreich progressiv: 0% bis 11.693€, dann stufenweise steigend bis 55% ab 1.000.000€. Selbstständige zahlen ESt auf ihren Gewinn.', link: '/steuerwissen/steueroptimierung-selbststaendige' },
    { term: 'Einnahmen-Ausgaben-Rechnung (E/A-R)', definition: 'Vereinfachte Gewinnermittlung für Unternehmer, die nicht zur Bilanzierung verpflichtet sind. Es zählt das Zufluss-Abfluss-Prinzip: Einnahmen und Ausgaben werden zum Zeitpunkt der Zahlung erfasst.' },
    { term: 'EStG', definition: 'Einkommensteuergesetz — das zentrale Gesetz für die Einkommensteuer in Österreich. Regelt u.a. Gewinnfreibetrag (§ 10), Investitionsfreibetrag (§ 11), Pauschalierung (§ 17) und Krypto-Besteuerung (§ 27b).' },
  ]},
  { letter: 'F', terms: [
    { term: 'FinanzOnline', definition: 'Das elektronische Portal des BMF für Steuererklärungen, UVA-Meldungen und Steuerkontoeinsicht. Pflicht für Unternehmer seit 2003. Zugang über Bürgerkarte, Handy-Signatur oder Zugangskennungen.' },
    { term: 'FlexKap', definition: 'Flexible Kapitalgesellschaft — neue österreichische Rechtsform seit 2024. Mindestkapital: 10.000€ (statt 35.000€ bei GmbH). Verbindet GmbH-Haftungsschutz mit flexiblerer Gestaltung.', link: '/steuerwissen/gmbh-vs-einzelunternehmen' },
    { term: 'Freibetrag', definition: 'Betrag, der vom Einkommen abgezogen wird, bevor die Steuer berechnet wird. Beispiele: Gewinnfreibetrag (§ 10 EStG), Veranlagungsfreibetrag (730€). Im Gegensatz zum Absetzbetrag mindert ein Freibetrag nur das zu versteuernde Einkommen.' },
  ]},
  { letter: 'G', terms: [
    { term: 'Gewinnfreibetrag (GFB)', definition: 'Steuerlicher Freibetrag für Selbstständige nach § 10 EStG. Grundfreibetrag: 15% des Gewinns bis 33.000€ (max. 4.950€). Darüber: investitionsbedingter GFB bei Anschaffung begünstigter Wirtschaftsgüter oder Wertpapiere.', link: '/steuerwissen/gewinnfreibetrag-nutzen' },
    { term: 'GmbH', definition: 'Gesellschaft mit beschränkter Haftung — juristische Person mit eigenem Vermögen. Mindestkapital: 35.000€ (gründungsprivilegiert: 10.000€). Gewinne unterliegen der KöSt (23%), Ausschüttungen der KESt (27,5%).', link: '/steuerwissen/gmbh-vs-einzelunternehmen' },
    { term: 'GSVG', definition: 'Gewerbliches Sozialversicherungsgesetz — regelt die Pflichtversicherung für Selbstständige bei der SVS. Beiträge: 18,50% PV + 6,80% KV + 1,53% Selbständigenvorsorge + Unfallversicherung (pauschal).', link: '/steuerwissen/svs-beitraege-senken' },
    { term: 'GWG (Geringwertiges Wirtschaftsgut)', definition: 'Wirtschaftsgüter bis 1.000€ Anschaffungskosten (netto), die sofort im Jahr der Anschaffung voll abgeschrieben werden können. Seit 2023 von 800€ auf 1.000€ angehoben.' },
  ]},
  { letter: 'I', terms: [
    { term: 'Investitionsfreibetrag (IFB)', definition: 'Zusätzlicher Freibetrag nach § 11 EStG bei Anschaffung bestimmter Wirtschaftsgüter. 15% der Anschaffungskosten (20% bei ökologischen Investitionen). Neben der regulären AfA absetzbar.', link: '/steuerwissen/gewinnfreibetrag-nutzen' },
  ]},
  { letter: 'K', terms: [
    { term: 'KESt (Kapitalertragsteuer)', definition: 'Steuer auf Kapitalerträge: 27,5% auf Dividenden, Zinsen, Kursgewinne und seit 2022 auch Krypto-Gewinne. Wird bei österreichischen Banken/Brokern automatisch einbehalten.', link: '/steuerwissen/krypto-steuer-oesterreich' },
    { term: 'Kleinunternehmerregelung', definition: 'USt-Befreiung für Unternehmer mit Jahresumsatz unter 42.000€ (seit 2025). Keine USt-Ausweisung, keine UVA-Pflicht, aber auch kein Vorsteuerabzug.', link: '/steuerwissen/kleinunternehmerregelung' },
    { term: 'Körperschaftsteuer (KöSt)', definition: 'Steuer auf Gewinne von juristischen Personen (GmbH, AG, FlexKap). Seit 2024 beträgt der KöSt-Satz 23% (zuvor 25%, davor 24%). Entspricht der Einkommensteuer für natürliche Personen.', link: '/steuerwissen/gmbh-vs-einzelunternehmen' },
  ]},
  { letter: 'L', terms: [
    { term: 'Lohnsteuer', definition: 'Die Einkommensteuer für unselbstständig Erwerbstätige, die direkt vom Arbeitgeber einbehalten und an das Finanzamt abgeführt wird. Berechnung nach dem progressiven Einkommensteuertarif.' },
  ]},
  { letter: 'N', terms: [
    { term: 'Nachzahlung (SVS)', definition: 'Differenz zwischen vorläufigen und endgültigen SVS-Beiträgen, die entsteht, wenn der tatsächliche Gewinn höher war als die geschätzte Beitragsgrundlage. Fällig ca. 3 Jahre nach dem Beitragsjahr.', link: '/steuerwissen/svs-nachzahlung-vermeiden' },
  ]},
  { letter: 'P', terms: [
    { term: 'Pauschalierung', definition: 'Vereinfachte Gewinnermittlung, bei der Betriebsausgaben als pauschaler Prozentsatz der Einnahmen angesetzt werden. Drei Arten: Basispauschalierung (12%/6%), Branchenpauschalierung, Kleinunternehmerpauschalierung (45%/20%).', link: '/steuerwissen/pauschalierung-oesterreich' },
    { term: 'Pflichtversicherung', definition: 'Selbstständige sind bei der SVS pflichtversichert in der Pensions-, Kranken- und Unfallversicherung. Opting-Out ist unter bestimmten Voraussetzungen möglich (Kleinunternehmer unter Geringfügigkeitsgrenze).' },
    { term: 'Progressiver Steuertarif', definition: 'Das österreichische Einkommensteuer-System: Je höher das Einkommen, desto höher der Steuersatz. Stufen 2026: 0% (bis 11.693€), 20%, 30%, 40%, 48%, 50%, 55% (ab 1 Mio.€).' },
  ]},
  { letter: 'R', terms: [
    { term: 'Reverse Charge', definition: 'Umkehr der Steuerschuld bei der Umsatzsteuer. Nicht der Leistungserbringer, sondern der Leistungsempfänger schuldet die USt. Gilt v.a. bei grenzüberschreitenden B2B-Leistungen in der EU.', link: '/steuerwissen/umsatzsteuer-selbstaendige' },
    { term: 'RIS', definition: 'Rechtsinformationssystem des Bundes (ris.bka.gv.at) — die offizielle Datenbank aller österreichischen Gesetze und Verordnungen. Kostenlos zugänglich.' },
  ]},
  { letter: 'S', terms: [
    { term: 'Sonderausgaben', definition: 'Bestimmte private Ausgaben, die steuerlich absetzbar sind: Kirchenbeitrag (bis 400€), Spenden (bis 10% des Einkommens), Steuerberatungskosten. Seit 2021 stark eingeschränkt (Topfsonderausgaben ausgelaufen).' },
    { term: 'SVS (Sozialversicherung der Selbständigen)', definition: 'Die Sozialversicherungsanstalt für Gewerbetreibende und Freiberufler. Beitragssätze 2026: PV 18,50%, KV 6,80%, SV 1,53%, UV pauschal ~11,35€/Monat.', link: '/steuerwissen/svs-beitraege-senken' },
  ]},
  { letter: 'U', terms: [
    { term: 'UID-Nummer', definition: 'Umsatzsteuer-Identifikationsnummer (ATU + 8 Ziffern). Pflicht für regelbesteuerte Unternehmer. Wird für innergemeinschaftliche Geschäfte und Rechnungen über 10.000€ benötigt.' },
    { term: 'Umsatzsteuer (USt)', definition: 'Indirekte Steuer auf den Umsatz von Waren und Dienstleistungen. Normalsteuersatz 20%, ermäßigt 13% und 10%. Der Endverbraucher trägt die Steuerlast, Unternehmer fungieren als Steuereintreiber.', link: '/steuerwissen/umsatzsteuer-selbstaendige' },
    { term: 'UVA (Umsatzsteuervoranmeldung)', definition: 'Regelmäßige Meldung der Umsatzsteuer an das Finanzamt. Monatlich (ab 100.000€ Umsatz), vierteljährlich (35.000€-100.000€) oder nur jährlich (unter 35.000€).', link: '/steuerwissen/umsatzsteuer-selbstaendige' },
  ]},
  { letter: 'V', terms: [
    { term: 'Vorsteuer', definition: 'Die Umsatzsteuer, die Ihnen andere Unternehmer in Rechnung stellen. Kann von Ihrer eigenen USt-Schuld abgezogen werden (Vorsteuerabzug). Nicht möglich bei Kleinunternehmerregelung.', link: '/steuerwissen/umsatzsteuer-selbstaendige' },
    { term: 'Vorauszahlungen (ESt)', definition: 'Vierteljährliche Einkommensteuer-Vorauszahlungen ans Finanzamt (15.2., 15.5., 15.8., 15.11.). Basieren auf dem letzten Steuerbescheid. Können durch Antrag angepasst werden.' },
  ]},
  { letter: 'W', terms: [
    { term: 'Werbungskosten', definition: 'Beruflich veranlasste Ausgaben bei unselbstständiger Erwerbstätigkeit (Gegenstück zu Betriebsausgaben bei Selbstständigen). Pauschale: 132€/Jahr. Darüber hinaus: Arbeitsmittel, Fortbildung, doppelte Haushaltsführung.' },
    { term: 'Wirtschaftsjahr', definition: 'Der Zeitraum, für den der Gewinn ermittelt wird. Bei Einnahmen-Ausgaben-Rechnern ist das Wirtschaftsjahr immer das Kalenderjahr (1.1.-31.12.). Bilanzierende Unternehmen können ein abweichendes Wirtschaftsjahr wählen.' },
  ]},
  { letter: 'Z', terms: [
    { term: 'Zusammenfassende Meldung (ZM)', definition: 'Meldung an das Finanzamt über innergemeinschaftliche Lieferungen und Leistungen an Unternehmer in anderen EU-Ländern. Monatlich oder vierteljährlich über FinanzOnline abzugeben.' },
    { term: 'Zufluss-Abfluss-Prinzip', definition: 'Bei der Einnahmen-Ausgaben-Rechnung werden Einnahmen und Ausgaben im Zeitpunkt der Zahlung erfasst (nicht bei Rechnungslegung). Vorauszahlungen im Dezember reduzieren den Gewinn des laufenden Jahres.' },
  ]},
]

export default function GlossarPage() {
  const allLetters = glossarTerms.map(g => g.letter)

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
              <span className="text-slate-300">Glossar</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Steuer-Glossar Österreich — Alle Steuerbegriffe einfach erklärt
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Steuerbegriffe können verwirrend sein. Dieses Glossar erklärt über 40 wichtige
              österreichische Steuerbegriffe in einfacher Sprache — von Absetzbeträge bis
              Zufluss-Abfluss-Prinzip. Ideal als Nachschlagewerk für Selbstständige,
              Gründer und alle, die ihre Steuern besser verstehen wollen.
            </p>

            {/* Alphabet Navigation */}
            <div className="flex flex-wrap gap-2 mb-10 bg-slate-900 p-4 rounded-lg border border-slate-700">
              {allLetters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-9 h-9 flex items-center justify-center bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded transition-colors font-semibold text-sm"
                >
                  {letter}
                </a>
              ))}
            </div>

            {/* Terms by Letter */}
            <div className="space-y-10">
              {glossarTerms.map((group) => (
                <section key={group.letter} id={`letter-${group.letter}`}>
                  <h2 className="text-3xl font-bold text-blue-400 mb-4 border-b border-slate-700 pb-2">
                    {group.letter}
                  </h2>
                  <div className="space-y-4">
                    {group.terms.map((item) => (
                      <div key={item.term} className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-2">{item.term}</h3>
                        <p className="text-slate-300 leading-relaxed">{item.definition}</p>
                        {item.link && (
                          <Link
                            href={item.link}
                            className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block transition-colors"
                          >
                            → Mehr erfahren
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* CTA */}
            <section className="mt-12 mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Steuern berechnen statt nur lesen
                </h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Nutzen Sie unseren kostenlosen Steuerrechner und sehen Sie sofort,
                  wie sich diese Begriffe auf Ihre Steuerlast auswirken.
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
                { name: 'Glossar', href: '/steuerwissen/glossar' },
              ]}
              sources={[
                { name: 'EStG — Einkommensteuergesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS)' },
                { name: 'UStG — Umsatzsteuergesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873', description: 'Rechtsinformationssystem des Bundes (RIS)' },
                { name: 'BMF — Steuern von A bis Z', url: 'https://www.bmf.gv.at/themen/steuern.html', description: 'Bundesministerium für Finanzen' },
                { name: 'WKO — Steuern und Abgaben', url: 'https://www.wko.at/steuern', description: 'Wirtschaftskammer Österreich' },
              ]}
              relatedArticles={[
                { title: 'Steueroptimierung für Selbstständige', href: '/steuerwissen/steueroptimierung-selbststaendige' },
                { title: 'SVS-Beiträge senken — 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
                { title: 'Gewinnfreibetrag 2026 — Bis zu 4.950€ sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              ]}
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}
