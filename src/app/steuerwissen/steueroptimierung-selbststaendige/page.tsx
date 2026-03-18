import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function SteueroptimierungSelbststaendigePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <nav className="text-sm mb-6 text-gray-400">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/steuerwissen" className="hover:text-blue-400 transition-colors">
                Steuerwissen
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">›</span>
              <span className="text-gray-300">Steueroptimierung</span>
            </li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white leading-tight">
              Steueroptimierung für Selbständige — Die komplette Anleitung 2026
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Als Selbständiger in Österreich stehen Ihnen zahlreiche legale Möglichkeiten zur Steueroptimierung zur Verfügung.
              Diese Anleitung zeigt alle wichtigen Hebel: von Absetzbeträgen über Betriebsausgaben bis zur optimalen Rechtsform.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Einkommensteuer-Tarif verstehen</h2>

            <p className="mb-6">
              Der österreichische Einkommensteuertarif ist progressiv gestaltet. Je höher Ihr zu versteuerndes Einkommen,
              desto höher der Grenzsteuersatz auf den letzten Euro.
            </p>

            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">Die 7 Tarifstufen nach § 33 EStG (2026):</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Bis 12.816€: <span className="text-green-400 font-medium">0%</span></li>
                <li>• 12.817€ bis 20.818€: <span className="text-yellow-400 font-medium">20%</span></li>
                <li>• 20.819€ bis 34.513€: <span className="text-orange-400 font-medium">30%</span></li>
                <li>• 34.514€ bis 66.612€: <span className="text-red-400 font-medium">40%</span></li>
                <li>• 66.613€ bis 99.266€: <span className="text-red-500 font-medium">48%</span></li>
                <li>• 99.267€ bis 1.000.000€: <span className="text-red-600 font-medium">50%</span></li>
                <li>• Über 1.000.000€: <span className="text-red-700 font-medium">55%</span></li>
              </ul>
            </div>

            <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700">
              <h4 className="font-medium mb-3 text-blue-300">Wichtiger Unterschied:</h4>
              <p className="text-gray-300">
                <strong>Grenzsteuersatz</strong>: Der Steuersatz auf den letzten verdienten Euro.<br/>
                <strong>Durchschnittssteuersatz</strong>: Gesamtsteuer geteilt durch Gesamteinkommen.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Absetzbeträge ausschöpfen</h2>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-green-400">Gewinnfreibetrag (§ 10 EStG)</h3>
                <p className="text-gray-300 mb-3">
                  Der wichtigste Absetzbetrag für Selbständige: <strong>15% des Gewinns</strong> bis maximal 33.000€
                  (entspricht maximal 4.950€ Freibetrag).
                </p>
                <p className="text-sm text-gray-400">
                  Beispiel: Bei 30.000€ Gewinn sparen Sie 4.500€ × Ihr Grenzsteuersatz an Steuern.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-green-400">Familienbonus Plus</h3>
                <p className="text-gray-300">
                  <strong>2.100€ pro Kind unter 18 Jahren</strong> (ab 2026). Direkte Steuerreduktion,
                  nicht nur Abzug von der Bemessungsgrundlage.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">AVAB</h4>
                  <p className="text-gray-300 text-sm">572€ Arbeitnehmerveranlagung-Absetzbetrag</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Verkehrsabsetzbetrag</h4>
                  <p className="text-gray-300 text-sm">481€ bei entsprechender Nutzung</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-green-400">Pendlerpauschale</h3>
                <p className="text-gray-300">
                  Wenn Sie regelmäßig zwischen Wohnung und Betriebsstätte pendeln, können Sie je nach
                  Entfernung und öffentlicher Erreichbarkeit zwischen 372€ und 3.672€ jährlich absetzen.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Betriebsausgaben optimieren</h2>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-white">Arbeitszimmer</h3>
                <p className="text-gray-300 mb-3">
                  Wenn Sie ein Arbeitszimmer <strong>ausschließlich betrieblich</strong> nutzen,
                  können Sie alle Kosten absetzen: Miete, Betriebskosten, Einrichtung, Renovierung.
                </p>
                <p className="text-sm text-gray-400">
                  Bei gemischter Nutzung nur der betriebliche Anteil (z.B. 20m² von 100m² = 20%).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Fortbildung & Fachliteratur</h4>
                  <p className="text-gray-300 text-sm">
                    Seminare, Kurse, Bücher, Zeitschriften – alles was der beruflichen Weiterbildung dient.
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Telefon & Internet</h4>
                  <p className="text-gray-300 text-sm">
                    Bei gemischter Nutzung mindestens 20% betrieblich ansetzbar, oft mehr.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-white">Geringwertige Wirtschaftsgüter (GWG)</h3>
                <p className="text-gray-300 mb-3">
                  Wirtschaftsgüter bis <strong>1.000€ netto</strong> können im Jahr der Anschaffung
                  vollständig abgeschrieben werden.
                </p>
                <p className="text-sm text-gray-400">
                  Beispiele: Laptop, Smartphone, Drucker, Büromöbel, Software-Lizenzen.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-white">Bewirtungskosten</h3>
                <p className="text-gray-300 mb-3">
                  <strong>50% der Bewirtungskosten</strong> sind bei betrieblicher Veranlassung absetzbar.
                  Wichtig: Dokumentation mit Namen der bewirteten Personen und Anlass.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Investitionssteuerung</h2>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-green-400">Investitionsfreibetrag (§ 11 EStG)</h3>
                <p className="text-gray-300 mb-4">
                  Bei Investitionen in abnutzbare Anlagegüter können Sie zusätzlich zur normalen
                  Abschreibung einen Freibetrag geltend machen:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>20%</strong> bei Investitionen ab 10.000€</li>
                  <li>• <strong>22%</strong> bei ökologischen Investitionen</li>
                  <li>• Maximal 100.000€ Freibetrag pro Jahr</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-white">Degressive Abschreibung</h3>
                <p className="text-gray-300 mb-3">
                  Bei beweglichen Anlagegütern können Sie zwischen linearer und degressiver
                  Abschreibung wählen. Die degressive AfA ist oft vorteilhafter.
                </p>
              </div>

              <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700">
                <h4 className="font-medium mb-3 text-blue-300">Timing-Strategie:</h4>
                <p className="text-gray-300">
                  Planen Sie größere Investitionen in Jahren mit hohem Gewinn, um von den
                  höheren Grenzsteuersätzen maximal zu profitieren.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Rechtsform-Optimierung</h2>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-white">Einzelunternehmen vs. GmbH</h3>
                <p className="text-gray-300 mb-4">
                  Der Break-Even liegt meist zwischen <strong>60.000-80.000€ Jahresgewinn</strong>.
                  Ab diesem Punkt wird die GmbH steuerlich interessant:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• GmbH: 25% Körperschaftsteuer + 27,5% KESt auf Ausschüttungen</li>
                  <li>• EU: Einkommensteuertarif (bis 55%)</li>
                  <li>• Zusätzliche GmbH-Kosten: ~2.000-4.000€/Jahr</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-white">Pauschalierung prüfen</h3>
                <p className="text-gray-300 mb-4">Je nach Branche können verschiedene Pauschalierungen vorteilhaft sein:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Basispauschalierung: 12% des Umsatzes</li>
                  <li>• Kleinunternehmerregelung: 6% bei Dienstleistungen</li>
                  <li>• Branchenpauschalen: 45% bei Ärzten, 20% bei Anwälten</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-lg border border-blue-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Berechnen Sie Ihre Steuerersparnis</h2>
            <p className="text-gray-300 mb-6">
              Nutzen Sie unsere kostenlosen Rechner, um Ihr Optimierungspotenzial zu ermitteln
              und die beste Strategie für Ihre Situation zu finden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/rechner">Alle Rechner</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link href="/einkommensteuer">Einkommensteuerrechner</Link>
              </Button>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Häufige Fragen</h2>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Wie viel Steuern kann ich als Selbständiger in Österreich sparen?
                </h3>
                <p className="text-gray-300">
                  Durch optimale Nutzung von Gewinnfreibetrag (15% auf erste 33.000€),
                  Investitionsfreibetrag (20-22%) und vollständige Geltendmachung von
                  Betriebsausgaben können Selbständige oft 3.000-10.000€ jährlich sparen.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Was ist der Gewinnfreibetrag nach § 10 EStG?
                </h3>
                <p className="text-gray-300">
                  Der Gewinnfreibetrag beträgt 15% des Gewinns bis maximal 33.000€
                  (= max. 4.950€ Freibetrag). Er reduziert direkt die Steuerbemessungsgrundlage
                  für Selbständige und EPU.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Welche Betriebsausgaben kann ich als Selbständiger absetzen?
                </h3>
                <p className="text-gray-300">
                  Alle betrieblich veranlassten Ausgaben: Arbeitszimmer, Fortbildung, Fachliteratur,
                  Telefon/Internet (anteilig), Reisekosten, GWG bis 1.000€, Bewirtung (50%),
                  Versicherungen und Beratungskosten.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Ab welchem Gewinn lohnt sich eine GmbH?
                </h3>
                <p className="text-gray-300">
                  Der Break-Even liegt meist zwischen 60.000-80.000€ Jahresgewinn.
                  Ab diesem Punkt wird die GmbH-Besteuerung (25% KöSt + 27,5% KESt auf Ausschüttungen)
                  günstiger als der Einkommensteuertarif.
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
              { title: 'Gewinnfreibetrag 2026 — Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              { title: 'SVS-Beiträge senken — 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
              { title: 'GmbH vs. Einzelunternehmen — Der Steuer-Vergleich', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
              { title: 'SVS-Nachzahlung vermeiden', href: '/steuerwissen/svs-nachzahlung-vermeiden' },
            ]}
          />
        </article>
      </div>
    </div>
  )
}