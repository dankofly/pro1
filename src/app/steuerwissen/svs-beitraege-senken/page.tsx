import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SvsBeitraegeSenkenPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/steuerwissen" className="hover:text-white transition-colors">
            Steuerwissen
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-300">SVS-Beiträge senken</span>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              SVS-Beiträge senken — 7 legale Strategien für Selbständige in Österreich
            </h1>

            <div className="text-lg text-gray-300 leading-relaxed">
              <p>
                SVS-Beiträge sind für viele Selbständige in Österreich der größte laufende Kostenblock.
                Monatlich können diese Beiträge schnell mehrere hundert Euro betragen — Geld, das direkt
                von Ihrem Gewinn abgeht. Die gute Nachricht: Es gibt legale Strategien, um Ihre
                SVS-Beiträge zu senken.
              </p>
            </div>
          </header>

          {/* Zusammensetzung SVS-Beiträge */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Wie setzen sich SVS-Beiträge zusammen?
            </h2>

            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <p className="text-gray-300 mb-4">
                Die SVS-Beiträge für Selbständige bestehen aus mehreren Komponenten:
              </p>

              <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between">
                  <span>Pensionsversicherung (PV):</span>
                  <strong className="text-white">18,50%</strong>
                </li>
                <li className="flex justify-between">
                  <span>Krankenversicherung (KV):</span>
                  <strong className="text-white">6,80%</strong>
                </li>
                <li className="flex justify-between">
                  <span>Selbständigenvorsorge (SV):</span>
                  <strong className="text-white">1,53%</strong>
                </li>
                <li className="flex justify-between">
                  <span>Unfallversicherung (UV):</span>
                  <strong className="text-white">~11,35€/Monat (pauschal)</strong>
                </li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-300 mb-2">Wichtige Grenzen (2024):</h3>
              <ul className="text-gray-300 space-y-1">
                <li><strong>Mindestbeitragsgrundlage:</strong> ~500€/Monat</li>
                <li><strong>Höchstbeitragsgrundlage:</strong> ~7.070€/Monat</li>
                <li><strong>Jungunternehmer-Reduktion:</strong> Niedrigere Mindestbeiträge in den ersten 2 Jahren</li>
              </ul>
            </div>
          </section>

          {/* 7 Strategien */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-white">
              7 legale Strategien, um SVS-Beiträge zu senken
            </h2>

            <div className="space-y-8">
              {/* Strategie 1 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  1. Gewinnfreibetrag nutzen (§ 10 EStG)
                </h3>
                <p className="text-gray-300 mb-3">
                  Der Gewinnfreibetrag reduziert Ihr zu versteuerndes Einkommen und damit auch die
                  SVS-Beitragsgrundlage. Je nach Investitionen können Sie bis zu 15% Ihres Gewinns
                  (max. 15.000€) absetzen.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Beispiel:</strong> Bei 50.000€ Gewinn und maximaler Nutzung sparen Sie ca. 2.250€
                  bei Steuern und ca. 540€ bei SVS-Beiträgen jährlich.
                </div>
              </div>

              {/* Strategie 2 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  2. Betriebsausgaben optimieren
                </h3>
                <p className="text-gray-300 mb-3">
                  Jede steuerlich absetzbare Betriebsausgabe reduziert Ihren Gewinn und damit die
                  SVS-Beitragsgrundlage. Häufig übersehene Ausgaben:
                </p>
                <ul className="text-gray-300 space-y-1">
                  <li>• Arbeitszimmer (bei Selbständigen oft absetzbar)</li>
                  <li>• Fortbildungskosten und Fachliteratur</li>
                  <li>• Geschäftsessen (bis zu 50% absetzbar)</li>
                  <li>• Büroausstattung und Software</li>
                  <li>• Internetkosten und Mobiltelefon (anteilig)</li>
                </ul>
              </div>

              {/* Strategie 3 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  3. Investitionsfreibetrag anwenden (§ 11 EStG)
                </h3>
                <p className="text-gray-300 mb-3">
                  Bei bestimmten Investitionen können Sie zusätzlich zum normalen Abschreibungsbetragt
                  einen Investitionsfreibetrag von bis zu 10% geltend machen.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Tipp:</strong> Besonders effektiv bei IT-Hardware, Maschinen oder Fahrzeugen
                  ab 400€ Anschaffungskosten.
                </div>
              </div>

              {/* Strategie 4 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  4. Antrag auf niedrigere vorläufige Beitragsgrundlage (§ 25a Abs 3 GSVG)
                </h3>
                <p className="text-gray-300 mb-3">
                  Wenn Sie erwarten, dass Ihr Gewinn deutlich unter dem Vorjahr liegt, können Sie
                  einen Antrag auf Herabsetzung der vorläufigen Beitragsgrundlage stellen.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Wichtig:</strong> Sie müssen glaubhaft machen können, dass der niedrigere
                  Gewinn zu erwarten ist. Bei zu niedrig angesetzten Beiträgen fallen Nachzahlungen an.
                </div>
              </div>

              {/* Strategie 5 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  5. Kleinunternehmerregelung prüfen
                </h3>
                <p className="text-gray-300 mb-3">
                  Wenn Sie unter der Umsatzsteuer-Grenze von 35.000€ bleiben, sparen Sie sich die
                  Umsatzsteuer-Voranmeldungen und können indirekt auch bei den SVS-Beiträgen sparen.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Achtung:</strong> Sie können dann keine Vorsteuer abziehen. Rechnen Sie durch,
                  was für Sie günstiger ist.
                </div>
              </div>

              {/* Strategie 6 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  6. Pauschalierung nutzen
                </h3>
                <p className="text-gray-300 mb-3">
                  Bei bestimmten Tätigkeiten können Sie Ihre Betriebsausgaben pauschal ansetzen.
                  Dies kann zu niedrigeren Gewinnen und damit niedrigeren SVS-Beiträgen führen.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Beispiel:</strong> Freie Dienstnehmer können oft 12% oder 6% ihrer Einnahmen
                  als Pauschale ansetzen.
                </div>
              </div>

              {/* Strategie 7 */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-green-400">
                  7. GmbH-Gründung erwägen (ab höherem Gewinn)
                </h3>
                <p className="text-gray-300 mb-3">
                  Ab einem Gewinn von ca. 60.000-80.000€ kann eine GmbH-Gründung steuerlich und
                  sozialversicherungsrechtlich vorteilhaft sein. Als GmbH-Geschäftsführer zahlen
                  Sie Angestellten-Beiträge statt Selbständigen-Beiträge.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Achtung:</strong> Die GmbH-Gründung bringt auch zusätzliche Pflichten mit sich.
                  Lassen Sie sich beraten!
                </div>
              </div>
            </div>
          </section>

          {/* Was NICHT tun */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Was Sie NICHT tun sollten
            </h2>

            <div className="bg-red-900/20 border border-red-700/50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-red-300 mb-2">
                    ❌ Einkommen künstlich drücken
                  </h3>
                  <p className="text-gray-300">
                    Scheinselbständigkeit, überhöhte Betriebsausgaben oder fiktive Rechnungen
                    sind illegal und führen zu hohen Strafen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-red-300 mb-2">
                    ❌ SVS-Beiträge nicht zahlen
                  </h3>
                  <p className="text-gray-300">
                    Säumniszuschläge, Verzugszinsen und Zwangsvollstreckung machen das Problem
                    nur größer. Stellen Sie lieber einen Antrag auf Ratenzahlung.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Berechnen Sie Ihre optimalen SVS-Beiträge
              </h2>
              <p className="text-gray-300 mb-6">
                Nutzen Sie unseren kostenlosen Rechner, um herauszufinden,
                wie viel Sie bei Ihren SVS-Beiträgen sparen können.
              </p>
              <Button asChild>
                <Link
                  href="/rechner"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Jetzt SVS-Beiträge berechnen →
                </Link>
              </Button>
            </div>
          </section>

          {/* Zusammenfassung */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Zusammenfassung
            </h2>

            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-300 leading-relaxed">
                SVS-Beiträge lassen sich durch legale Strategien deutlich reduzieren. Die wichtigsten
                Hebel sind der Gewinnfreibetrag, optimierte Betriebsausgaben und bei höheren Gewinnen
                eine mögliche GmbH-Gründung. Entscheidend ist, dass Sie alle Möglichkeiten ausschöpfen,
                die das österreichische Steuerrecht bietet — ohne dabei Risiken einzugehen.
              </p>

              <div className="mt-6 p-4 bg-blue-900/30 rounded border-l-4 border-blue-500">
                <p className="text-blue-200 font-medium">
                  💡 <strong>Unser Tipp:</strong> Lassen Sie sich von einem Steuerberater beraten,
                  welche Strategien in Ihrer individuellen Situation am besten funktionieren.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  )
}