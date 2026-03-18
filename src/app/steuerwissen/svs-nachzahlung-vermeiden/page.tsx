import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'

export default function SvsNachzahlungVermeidenPage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Link href="/steuerwissen" className="hover:text-slate-300 transition-colors">
                Steuerwissen
              </Link>
              <span>›</span>
              <span className="text-slate-300">SVS-Nachzahlung vermeiden</span>
            </div>
          </nav>

          <article>
            {/* Main heading */}
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              SVS-Nachzahlung vermeiden — So schützt du dich vor der Nachzahlungsfalle
            </h1>

            {/* Introduction */}
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Eine hohe SVS-Nachzahlung kann Selbstständige in Österreich finanziell schwer treffen.
              Oft kommen mehrere tausend Euro Nachzahlung völlig überraschend drei Jahre nach dem Beitragsjahr.
              Mit den richtigen Strategien lässt sich diese Nachzahlungsfalle jedoch vermeiden.
            </p>

            {/* Was ist die SVS-Nachzahlung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Was ist die SVS-Nachzahlung?
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Die SVS-Nachzahlung entsteht durch das System der vorläufigen und endgültigen Sozialversicherungsbeiträge
                nach § 25a GSVG (Gewerbliches Sozialversicherungsgesetz). Zunächst zahlst du vorläufige Beiträge basierend
                auf einer geschätzten Beitragsgrundlage.
              </p>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-4">
                <h3 className="text-lg font-semibold text-white mb-3">Konkretes Beispiel:</h3>
                <p className="text-slate-300 leading-relaxed">
                  Du startest mit einer geschätzten Beitragsgrundlage von 30.000€ (= 2.500€/Monat).
                  Dein tatsächlicher Gewinn steigt aber auf 60.000€. Die Nachzahlung für die Differenz
                  kann <strong className="text-white">über 5.000€</strong> betragen und wird drei Jahre später fällig.
                </p>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Diese endgültige Abrechnung erfolgt erst nach deiner Einkommensteuererklärung,
                wenn der tatsächliche Gewinn feststeht.
              </p>
            </section>

            {/* Warum entsteht die Nachzahlung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Warum entsteht die Nachzahlung?
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                Das Problem liegt in der zeitlichen Verzögerung des österreichischen Systems:
              </p>

              <div className="space-y-4">
                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-slate-300">
                    <strong className="text-white">Jahr 1:</strong> Du zahlst vorläufige SVS-Beiträge basierend auf einer Schätzung
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-slate-300">
                    <strong className="text-white">Jahr 2:</strong> Du gibst deine Steuererklärung ab, der tatsächliche Gewinn wird bekannt
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-slate-300">
                    <strong className="text-white">Jahr 3:</strong> Die SVS fordert die Nachzahlung ein (oft überraschend hoch)
                  </p>
                </div>
              </div>

              <p className="text-slate-300 mt-4 leading-relaxed">
                Diese 3-Jahres-Verzögerung führt dazu, dass viele Selbstständige die Nachzahlung nicht einkalkulieren
                und dann vor einem finanziellen Problem stehen.
              </p>
            </section>

            {/* 5 Strategien */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                5 Strategien um die SVS-Nachzahlung zu reduzieren
              </h2>

              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    1. Antrag auf Änderung der vorläufigen Beitragsgrundlage
                  </h3>
                  <p className="text-slate-300 mb-3 leading-relaxed">
                    Nach § 25a Abs 3 GSVG kannst du bei der SVS eine Erhöhung der vorläufigen Beitragsgrundlage beantragen,
                    wenn sich dein Gewinn erhöht hat.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Tipp: Stelle den Antrag sobald absehbar ist, dass dein Gewinn die ursprüngliche Schätzung übersteigt.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    2. Monatliche Rücklagen bilden
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Lege monatlich 15-20% deines Mehrgewinns für die spätere SVS-Nachzahlung zur Seite.
                    So kommst du nicht in Liquiditätsprobleme wenn die Nachzahlung fällig wird.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    3. Gewinnfreibetrag optimal nutzen
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Der Gewinnfreibetrag nach § 10 EStG reduziert deinen steuerpflichtigen Gewinn und damit auch
                    die SVS-Beitragsgrundlage. 2026 beträgt er bis zu 15.000€ bei Investitionen.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    4. Betriebsausgaben strategisch planen
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Plane größere Investitionen und Betriebsausgaben so, dass sie deinen Gewinn in Jahren mit
                    hohen vorläufigen Beiträgen reduzieren. Dies senkt die Nachzahlungsgrundlage.
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    5. Steuerberater frühzeitig einschalten
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Ein Steuerberater kann die SVS-Nachzahlung bereits während des laufenden Geschäftsjahres
                    kalkulieren und entsprechende Maßnahmen vorschlagen.
                  </p>
                </div>
              </div>
            </section>

            {/* SVS-Nachzahlung berechnen */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                SVS-Nachzahlung berechnen
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Um deine potenzielle SVS-Nachzahlung zu ermitteln, musst du die Differenz zwischen
                den vorläufigen und den endgültigen Beiträgen basierend auf deinem tatsächlichen Gewinn berechnen.
                Unser Rechner zeigt dir sofort das Ergebnis.
              </p>

              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/rechner">
                  Jetzt SVS-Nachzahlung berechnen
                </Link>
              </Button>
            </section>

            {/* CTA Section */}
            <section className="mt-12">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Berechne deine SVS-Nachzahlung jetzt kostenlos
                </h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Erfahre sofort, mit welcher Nachzahlung du rechnen musst und plane deine Liquidität entsprechend.
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  <Link href="/rechner">
                    Kostenlos berechnen
                  </Link>
                </Button>
              </div>
            </section>
          </article>
        </div>
      </div>
    </AppShell>
  )
}