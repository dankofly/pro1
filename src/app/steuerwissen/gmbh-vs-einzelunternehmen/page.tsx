import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function GmbHvsEinzelunternehmenPage() {
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
            <li className="text-white">GmbH vs. Einzelunternehmen</li>
          </ol>
        </nav>

        <article className="prose prose-invert prose-slate max-w-none">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              GmbH oder Einzelunternehmen? — Der Steuer-Vergleich für Österreich
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Die Entscheidung zwischen GmbH und Einzelunternehmen ist eine der wichtigsten unternehmerischen Weichenstellungen.
              Ab welchem Gewinn macht der Wechsel von der Einzelunternehmung zur GmbH steuerlich Sinn?
              Hier der komplette Vergleich für österreichische Unternehmer.
            </p>
          </header>

          {/* Steuerliche Unterschiede */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Steuerliche Unterschiede im Detail</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Einzelunternehmen</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Einkommensteuer (ESt):</strong> Progressiv 0% bis 55% (§ 33 EStG)</li>
                  <li><strong className="text-white">SVS-Beiträge:</strong> Ca. 27,7% auf Beitragsgrundlage</li>
                  <li><strong className="text-white">Mindestbeitrag:</strong> Ca. 6.000€/Jahr (2024)</li>
                  <li><strong className="text-white">Buchführung:</strong> Einnahmen-Ausgaben-Rechnung möglich</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">GmbH</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Körperschaftsteuer (KöSt):</strong> 23% auf Gewinn (§ 22 KStG)</li>
                  <li><strong className="text-white">KESt auf Ausschüttungen:</strong> 27,5%</li>
                  <li><strong className="text-white">ASVG-Beiträge GF:</strong> Ca. 22,8% der Beitragsgrundlage</li>
                  <li><strong className="text-white">Buchführung:</strong> Doppelte Buchführung verpflichtend</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-white mb-2">Effektive Gesamtbelastung</h4>
              <p>
                <strong className="text-white">Einzelunternehmen:</strong> ESt + SVS-Beiträge = bis zu 75%+ bei hohen Gewinnen<br/>
                <strong className="text-white">GmbH:</strong> 23% + 27,5% (bei Vollausschüttung) = ca. 44% Gesamtbelastung
              </p>
            </div>
          </section>

          {/* Break-Even Analyse */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Ab welchem Gewinn lohnt sich die GmbH?</h2>

            <p className="mb-6">
              Der Break-Even-Punkt liegt typischerweise zwischen <strong className="text-white">60.000 und 80.000 Euro Jahresgewinn</strong>,
              abhängig von der geplanten Ausschüttungspolitik und individuellen Faktoren.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-slate-700 rounded-lg">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4 text-left text-white border-r border-slate-700">Jahresgewinn</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">Einzelunternehmen (ESt + SVS)</th>
                    <th className="p-4 text-left text-white border-r border-slate-700">GmbH (50% Ausschüttung)</th>
                    <th className="p-4 text-left text-white">GmbH-Vorteil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700">30.000€</td>
                    <td className="p-4 border-r border-slate-700">~12.000€</td>
                    <td className="p-4 border-r border-slate-700">~13.500€</td>
                    <td className="p-4 text-red-400">-1.500€</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700">50.000€</td>
                    <td className="p-4 border-r border-slate-700">~22.000€</td>
                    <td className="p-4 border-r border-slate-700">~21.000€</td>
                    <td className="p-4 text-green-400">+1.000€</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 border-r border-slate-700">80.000€</td>
                    <td className="p-4 border-r border-slate-700">~38.000€</td>
                    <td className="p-4 border-r border-slate-700">~31.000€</td>
                    <td className="p-4 text-green-400">+7.000€</td>
                  </tr>
                  <tr className="border-t border-slate-700 bg-slate-900/50">
                    <td className="p-4 border-r border-slate-700">100.000€</td>
                    <td className="p-4 border-r border-slate-700">~49.000€</td>
                    <td className="p-4 border-r border-slate-700">~37.000€</td>
                    <td className="p-4 text-green-400">+12.000€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-700">
              <p className="text-amber-200">
                <strong>Wichtiger Hinweis:</strong> Die Berechnung hängt stark vom Ausschüttungsverhalten ab.
                Bei geringen Ausschüttungen (Thesaurierung) sind die GmbH-Vorteile noch größer.
              </p>
            </div>
          </section>

          {/* Vor- und Nachteile */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Vor- und Nachteile im Überblick</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* GmbH */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">GmbH</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-green-400 mb-3">✓ Vorteile</h4>
                  <ul className="space-y-2">
                    <li>Haftungsbeschränkung auf Stammkapital</li>
                    <li>Steueroptimierung ab ca. 60.000€ Gewinn</li>
                    <li>Höhere Reputation bei Kunden und Lieferanten</li>
                    <li>Flexible Gewinnthesaurierung möglich</li>
                    <li>Pensionsvorsorge über die Gesellschaft</li>
                    <li>Mehrere Gesellschafter möglich</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-red-400 mb-3">✗ Nachteile</h4>
                  <ul className="space-y-2">
                    <li>Mindestkapital: 35.000€ (GmbHG)</li>
                    <li>Höhere Gründungskosten (Notar, Firmenbuch)</li>
                    <li>Doppelte Buchführung verpflichtend</li>
                    <li>Bilanzierungs- und Publizitätspflicht</li>
                    <li>Aufwändigere Verwaltung</li>
                    <li>Geschäftsführerhaftung möglich</li>
                  </ul>
                </div>
              </div>

              {/* Einzelunternehmen */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Einzelunternehmen</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-green-400 mb-3">✓ Vorteile</h4>
                  <ul className="space-y-2">
                    <li>Einfache und schnelle Gründung</li>
                    <li>Geringe Gründungskosten</li>
                    <li>Einnahmen-Ausgaben-Rechnung möglich</li>
                    <li>Weniger Formalitäten</li>
                    <li>Vollständige Kontrolle</li>
                    <li>Einfache Gewinnentnahme</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-red-400 mb-3">✗ Nachteile</h4>
                  <ul className="space-y-2">
                    <li>Unbeschränkte persönliche Haftung</li>
                    <li>Progressiver Steuersatz bis 55%</li>
                    <li>Hohe SVS-Beiträge</li>
                    <li>Weniger Gestaltungsmöglichkeiten</li>
                    <li>Schwierigere Nachfolgeplanung</li>
                    <li>Geringere Außenwirkung</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Gründungskosten */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">Gründungskosten und laufende Kosten der GmbH</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Einmalige Gründungskosten</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Stammkapital:</strong> 35.000€ (muss eingezahlt werden)</li>
                  <li><strong className="text-white">Notariatskosten:</strong> ca. 1.000-2.000€</li>
                  <li><strong className="text-white">Firmenbucheintragung:</strong> ca. 300€</li>
                  <li><strong className="text-white">Beratung/Vorbereitung:</strong> ca. 500-1.500€</li>
                  <li className="pt-2 border-t border-slate-700"><strong className="text-white">Gesamt:</strong> ca. 37.000-40.000€</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Laufende Mehrkosten</h3>
                <ul className="space-y-2">
                  <li><strong className="text-white">Bilanzierung:</strong> ca. 2.000-5.000€/Jahr</li>
                  <li><strong className="text-white">Jahresabschluss:</strong> ca. 1.500-3.000€/Jahr</li>
                  <li><strong className="text-white">Steuerberatung:</strong> ca. 3.000-8.000€/Jahr</li>
                  <li><strong className="text-white">Firmenbuchgebühren:</strong> ca. 100€/Jahr</li>
                  <li className="pt-2 border-t border-slate-700"><strong className="text-white">Gesamt:</strong> ca. 6.000-16.000€/Jahr</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12 text-center">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-lg border border-blue-700">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Berechne deinen persönlichen Break-Even-Punkt
              </h3>
              <p className="text-slate-300 mb-6">
                Nutze unseren kostenlosen Rechner für eine individuelle Analyse deiner Situation.
              </p>
              <Button asChild>
                <Link href="/rechner" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Zum GmbH-Rechner
                </Link>
              </Button>
            </div>
          </section>

          {/* Fazit */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-6">Fazit: Wann lohnt sich die GmbH?</h2>
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
              <ul className="space-y-3">
                <li><strong className="text-white">Ab 60.000-80.000€ Jahresgewinn:</strong> GmbH wird steuerlich interessant</li>
                <li><strong className="text-white">Bei Haftungsrisiken:</strong> GmbH bietet wichtigen Schutz</li>
                <li><strong className="text-white">Bei Wachstumsplänen:</strong> GmbH ermöglicht bessere Skalierung</li>
                <li><strong className="text-white">Bei niedrigeren Gewinnen:</strong> Einzelunternehmen oft günstiger</li>
              </ul>
              <p className="mt-4 text-slate-300">
                Die Entscheidung sollte immer individuell und mit professioneller Beratung getroffen werden,
                da neben steuerlichen auch rechtliche, strategische und persönliche Faktoren eine Rolle spielen.
              </p>
            </div>
          </section>

          <ArticleFooter
            breadcrumbs={[
              { name: 'Home', href: '/' },
              { name: 'Steuerwissen', href: '/steuerwissen' },
              { name: 'GmbH vs. Einzelunternehmen', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
            ]}
            sources={[
              { name: 'KStG § 22 — Körperschaftsteuersatz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004531', description: 'Rechtsinformationssystem des Bundes (RIS) — Körperschaftsteuergesetz' },
              { name: 'EStG § 33 — Einkommensteuertarif', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS) — Einkommensteuergesetz' },
              { name: 'GmbHG — GmbH-Gesetz', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001720', description: 'Rechtsinformationssystem des Bundes (RIS)' },
              { name: 'WKO — GmbH gründen in Österreich', url: 'https://www.wko.at/gruendung/gmbh-gruenden', description: 'Wirtschaftskammer Österreich — Gründungsleitfaden' },
              { name: 'BMF — Körperschaftsteuer', url: 'https://www.bmf.gv.at/themen/steuern/koerperschaftsteuer.html', description: 'Bundesministerium für Finanzen' },
            ]}
            relatedArticles={[
              { title: 'Steueroptimierung für Selbständige — Komplette Anleitung', href: '/steuerwissen/steueroptimierung-selbststaendige' },
              { title: 'Gewinnfreibetrag 2026 — Bis zu 4.950 € sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              { title: 'SVS-Beiträge senken — 7 legale Strategien', href: '/steuerwissen/svs-beitraege-senken' },
            ]}
          />
        </article>
      </div>
    </div>
  )
}