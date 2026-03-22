import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import { ArticleFooter } from '@/components/steuerwissen/article-footer'

export default function KryptoSteuerOesterreichPage() {
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
              <span className="text-slate-300">Krypto-Steuer</span>
            </div>
          </nav>

          <article>
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Krypto-Steuer Österreich 2026 — Bitcoin, Ethereum & Co. richtig versteuern
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Seit der ökosozialen Steuerreform 2022 gelten in Österreich klare Regeln für die Besteuerung
              von Kryptowährungen. Bitcoin, Ethereum und andere Krypto-Assets unterliegen der
              Kapitalertragsteuer (KESt) von 27,5%. Dieser Guide erklärt alles — von der Altbestand-Regelung
              über Staking und Mining bis zum korrekten Ausfüllen der Steuererklärung.
            </p>

            {/* Neue Rechtslage seit 2022 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Die neue Krypto-Besteuerung seit März 2022
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Mit dem ökosozialen Steuerreformgesetz 2022 (BGBl I 2021/198) wurden Kryptowährungen
                in das Regime der Kapitalertragsteuer einbezogen. Seit dem 1. März 2022 gilt:
              </p>
              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-4">
                <ul className="text-slate-300 space-y-2">
                  <li>• <strong className="text-white">Steuersatz:</strong> 27,5% KESt auf realisierte Gewinne</li>
                  <li>• <strong className="text-white">Steuersubjekt:</strong> Natürliche Personen mit Wohnsitz in Österreich</li>
                  <li>• <strong className="text-white">Steuerobjekt:</strong> Kryptowährungen im Sinne des § 27b Abs 4 EStG</li>
                  <li>• <strong className="text-white">Bemessungsgrundlage:</strong> Differenz zwischen Veräußerungserlös und Anschaffungskosten</li>
                  <li>• <strong className="text-white">Spekulationsfrist:</strong> Entfällt — Gewinne sind immer steuerpflichtig</li>
                </ul>
              </div>
              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
                <p className="text-blue-200">
                  <strong>Wichtig:</strong> Die alte Regelung mit 1 Jahr Spekulationsfrist gilt nur noch
                  für den sogenannten „Altbestand" — Krypto-Assets, die vor dem 1. März 2021 angeschafft wurden.
                </p>
              </div>
            </section>

            {/* Altbestand vs Neubestand */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Altbestand vs. Neubestand — Die Stichtagsregelung
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-white mb-2">Altbestand (vor 1. März 2021 angeschafft)</h3>
                  <p className="text-slate-300 mb-2">
                    Kryptowährungen, die vor dem 1. März 2021 angeschafft wurden, konnten nach
                    der alten Regelung steuerfrei verkauft werden, wenn die Spekulationsfrist
                    von 1 Jahr abgelaufen war.
                  </p>
                  <p className="text-slate-300">
                    Seit dem 1. März 2022 unterliegen auch Altbestands-Gewinne der KESt, sofern
                    sie nach diesem Datum realisiert werden. Allerdings: Altbestand, der vor dem
                    1. März 2022 nach Ablauf der Spekulationsfrist veräußert wurde, bleibt steuerfrei.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-white mb-2">Neubestand (ab 1. März 2021 angeschafft)</h3>
                  <p className="text-slate-300">
                    Alle Kryptowährungen, die ab dem 1. März 2021 angeschafft wurden, unterliegen
                    immer der 27,5% KESt — unabhängig von der Haltedauer. Es gibt keine Spekulationsfrist mehr.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm text-slate-300 border border-slate-700 rounded-lg overflow-hidden">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="text-left p-3 text-white">Anschaffung</th>
                      <th className="text-left p-3 text-white">Veräußerung</th>
                      <th className="text-left p-3 text-white">Besteuerung</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="bg-slate-900">
                      <td className="p-3">Vor 1.3.2021</td>
                      <td className="p-3">Vor 1.3.2022, nach 1 Jahr</td>
                      <td className="p-3 text-green-400">Steuerfrei</td>
                    </tr>
                    <tr className="bg-slate-900/50">
                      <td className="p-3">Vor 1.3.2021</td>
                      <td className="p-3">Ab 1.3.2022</td>
                      <td className="p-3 text-yellow-400">27,5% KESt</td>
                    </tr>
                    <tr className="bg-slate-900">
                      <td className="p-3">Ab 1.3.2021</td>
                      <td className="p-3">Jederzeit</td>
                      <td className="p-3 text-yellow-400">27,5% KESt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Was ist steuerpflichtig? */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Was ist steuerpflichtig?
              </h2>

              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-700/50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-3">Steuerpflichtige Vorgänge:</h3>
                  <ul className="text-slate-300 space-y-2">
                    <li>• <strong className="text-white">Verkauf gegen Euro/Fiat:</strong> Differenz zwischen Verkaufspreis und Anschaffungskosten</li>
                    <li>• <strong className="text-white">Tausch Krypto gegen Krypto:</strong> Gilt als Veräußerung und Neuanschaffung (Swap)</li>
                    <li>• <strong className="text-white">Bezahlung mit Krypto:</strong> Kauf von Waren/DL mit Krypto = Veräußerung</li>
                    <li>• <strong className="text-white">Staking-Rewards:</strong> Laufende Einkünfte, KESt bei Zufluss</li>
                    <li>• <strong className="text-white">Mining-Erträge:</strong> Je nach Art (privat vs gewerblich) unterschiedlich</li>
                    <li>• <strong className="text-white">Airdrops:</strong> Steuerpflichtig bei Zufluss (Anschaffungskosten = 0)</li>
                    <li>• <strong className="text-white">Lending-Zinsen:</strong> Laufende Einkünfte, 27,5% KESt</li>
                  </ul>
                </div>

                <div className="bg-green-900/20 border border-green-700/50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">NICHT steuerpflichtig:</h3>
                  <ul className="text-slate-300 space-y-2">
                    <li>• <strong className="text-white">Halten (HODL):</strong> Unrealisierte Gewinne sind nicht steuerpflichtig</li>
                    <li>• <strong className="text-white">Transfer zwischen eigenen Wallets:</strong> Kein Veräußerungsvorgang</li>
                    <li>• <strong className="text-white">Schenkung/Erbschaft:</strong> Keine Einkommensteuer (aber ev. Erbschaftssteuer-Äquivalent)</li>
                    <li>• <strong className="text-white">Kauf von Krypto:</strong> Die Anschaffung selbst ist nicht steuerpflichtig</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Staking, Mining, DeFi */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Staking, Mining, Airdrops & DeFi
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Staking</h3>
                  <p className="text-slate-300 mb-2">
                    Staking-Rewards gelten als laufende Einkünfte aus Kryptowährungen (§ 27b Abs 2 EStG)
                    und sind mit 27,5% KESt zu versteuern. Die Besteuerung erfolgt zum Zeitpunkt des
                    Zuflusses basierend auf dem aktuellen Marktwert.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Die Anschaffungskosten der erhaltenen Tokens entsprechen dem Marktwert bei Zufluss.
                    Bei späterer Veräußerung wird die Differenz zum neuen Verkaufspreis besteuert.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Mining</h3>
                  <p className="text-slate-300 mb-2">
                    Beim Mining muss unterschieden werden:
                  </p>
                  <ul className="text-slate-300 space-y-1 ml-4">
                    <li>• <strong className="text-white">Privates Mining:</strong> Einkünfte aus Kryptowährungen, 27,5% KESt</li>
                    <li>• <strong className="text-white">Gewerbliches Mining:</strong> Einkünfte aus Gewerbebetrieb, progressiver Einkommensteuertarif (bis 55%)</li>
                  </ul>
                  <p className="text-slate-400 text-sm mt-2">
                    Gewerbliches Mining liegt vor, wenn die Tätigkeit nachhaltig, mit Gewinnabsicht und
                    unter Teilnahme am wirtschaftlichen Verkehr ausgeübt wird (z.B. Mining-Farm).
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Airdrops</h3>
                  <p className="text-slate-300">
                    Airdrops sind steuerlich als Zufluss mit Anschaffungskosten von 0€ zu behandeln.
                    Die 27,5% KESt fällt beim späteren Verkauf auf den gesamten Veräußerungserlös an.
                    Zum Zeitpunkt des Airdrops selbst entsteht keine Steuerpflicht, es sei denn,
                    der Airdrop wird als Gegenleistung für eine erbrachte Leistung gewährt.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">DeFi (Decentralized Finance)</h3>
                  <p className="text-slate-300">
                    DeFi-Erträge wie Liquidity Mining, Yield Farming oder Lending-Zinsen sind
                    grundsätzlich als laufende Einkünfte mit 27,5% KESt steuerpflichtig.
                    Die genaue steuerliche Behandlung hängt vom konkreten Protokoll ab und
                    ist teilweise noch nicht abschließend geklärt.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">NFTs (Non-Fungible Tokens)</h3>
                  <p className="text-slate-300">
                    NFTs sind keine Kryptowährungen im Sinne des § 27b EStG. Sie fallen unter die
                    allgemeinen Spekulationseinkünfte (§ 31 EStG) mit einer Spekulationsfrist von
                    1 Jahr. Gewinne nach Ablauf der Frist sind steuerfrei. Der Steuersatz ist der
                    progressive Einkommensteuertarif (bis 55%), nicht die 27,5% KESt.
                  </p>
                </div>
              </div>
            </section>

            {/* Verlustausgleich */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Verlustausgleich bei Kryptowährungen
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Verluste aus Kryptowährungen können mit bestimmten anderen Kapitalerträgen verrechnet
                werden. Das österreichische Steuerrecht erlaubt einen Verlustausgleich innerhalb
                desselben Kalenderjahres.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Verrechenbar mit:</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Gewinne aus anderen Kryptowährungen</li>
                  <li>• Dividenden und Zinsen aus Aktien und Anleihen</li>
                  <li>• Gewinne aus der Veräußerung von Aktien und Fonds</li>
                  <li>• Einkünfte aus Derivaten (Optionen, Zertifikate)</li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-red-300 mb-2">NICHT verrechenbar mit:</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>• Einkünften aus unselbstständiger Arbeit (Gehalt)</li>
                  <li>• Einkünften aus selbstständiger Arbeit oder Gewerbe</li>
                  <li>• Einkünften aus Vermietung und Verpachtung</li>
                  <li>• Sparbuchzinsen (KESt-endbesteuert)</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">Rechenbeispiel Verlustausgleich:</h3>
                <div className="text-slate-300 space-y-1">
                  <p>Bitcoin-Gewinn: +5.000€</p>
                  <p>Ethereum-Verlust: -3.000€</p>
                  <p>Aktien-Dividenden: +2.000€</p>
                  <p className="border-t border-slate-700 pt-2 mt-2">
                    <strong className="text-white">Steuerpflichtiger Saldo:</strong> 5.000 - 3.000 + 2.000 = 4.000€
                  </p>
                  <p><strong className="text-white">KESt (27,5%):</strong> 1.100€</p>
                  <p className="text-slate-400 text-sm mt-2">
                    Ohne Verlustausgleich wäre die KESt: (5.000 + 2.000) × 27,5% = 1.925€.
                    Ersparnis durch Verlustausgleich: 825€.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg mt-4">
                <p className="text-yellow-200">
                  <strong>Achtung:</strong> Ein Verlustvortrag in Folgejahre ist bei Krypto-Verlusten
                  NICHT möglich. Verluste müssen im selben Kalenderjahr ausgeglichen werden.
                </p>
              </div>
            </section>

            {/* Steuererklärung */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Krypto in der Steuererklärung (E1kv)
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Krypto-Einkünfte werden im Formular E1kv (Beilage zur Einkommensteuererklärung
                für Kapitalvermögen) gemeldet. Dieses Formular ist verpflichtend, wenn kein
                automatischer KESt-Abzug durch einen österreichischen Broker erfolgt.
              </p>

              <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Schritt-für-Schritt:</h3>
                <ol className="text-slate-300 space-y-2 list-decimal list-inside">
                  <li>Alle Krypto-Transaktionen des Jahres zusammentragen</li>
                  <li>Anschaffungskosten pro Token ermitteln (FIFO oder Durchschnittsmethode)</li>
                  <li>Gewinne und Verluste pro Transaktion berechnen</li>
                  <li>Staking/Mining/Lending-Einkünfte separat erfassen</li>
                  <li>Verlustausgleich mit anderen Kapitalerträgen durchführen</li>
                  <li>Ergebnisse in E1kv eintragen</li>
                  <li>E1kv zusammen mit E1 beim Finanzamt einreichen</li>
                </ol>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
                <p className="text-blue-200">
                  <strong>Tipp:</strong> Nutzen Sie ein Krypto-Steuertool (z.B. Blockpit, CoinTracking, Accointing),
                  um Ihre Transaktionen automatisch zu erfassen und den Steuerreport für die E1kv zu generieren.
                  Bei vielen Transaktionen ist eine manuelle Berechnung kaum möglich.
                </p>
              </div>
            </section>

            {/* Bewertungsmethoden */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Bewertungsmethoden: FIFO vs. Durchschnitt
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Für die Ermittlung der Anschaffungskosten bei der Veräußerung stehen zwei Methoden
                zur Verfügung:
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Gleitender Durchschnitt</h3>
                  <p className="text-slate-300 mb-2">
                    Die Anschaffungskosten aller gehaltenen Einheiten werden bei jedem Zukauf
                    neu berechnet. Bei Verkauf wird der aktuelle Durchschnittspreis als
                    Anschaffungskosten herangezogen.
                  </p>
                  <p className="text-slate-400 text-sm">
                    → Empfohlen vom BMF und einfacher bei vielen Transaktionen.
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">FIFO (First In, First Out)</h3>
                  <p className="text-slate-300 mb-2">
                    Die zuerst angeschafften Einheiten werden als zuerst veräußert betrachtet.
                    Die Anschaffungskosten der ältesten Einheiten werden bei Verkauf herangezogen.
                  </p>
                  <p className="text-slate-400 text-sm">
                    → Kann bei steigenden Kursen vorteilhafter sein (höhere AK = niedrigerer Gewinn).
                  </p>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg mt-4">
                <p className="text-yellow-200">
                  <strong>Achtung:</strong> Die gewählte Methode muss konsistent für alle Einheiten
                  derselben Kryptowährung angewendet werden. Ein Wechsel ist nur zum Jahreswechsel möglich.
                </p>
              </div>
            </section>

            {/* Häufige Fehler */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Häufige Fehler und Strafen
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">1. Krypto-zu-Krypto-Tausch nicht gemeldet</h3>
                  <p className="text-slate-300">
                    Viele vergessen, dass der Tausch von Bitcoin in Ethereum ein steuerpflichtiger Vorgang ist.
                    Es handelt sich um eine Veräußerung von BTC und eine Neuanschaffung von ETH.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">2. DeFi-Erträge vergessen</h3>
                  <p className="text-slate-300">
                    Staking-Rewards, Liquidity-Pool-Erträge und Lending-Zinsen sind steuerpflichtig —
                    auch wenn sie nicht in Fiat ausgezahlt werden.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">3. Keine oder falsche Dokumentation</h3>
                  <p className="text-slate-300">
                    Das Finanzamt kann Transaktionsnachweise verlangen. Ohne saubere Aufzeichnungen
                    droht eine Schätzung durch das Finanzamt — meist zu Ihrem Nachteil.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-red-400 mb-2">4. Strafen bei Nichtmeldung</h3>
                  <p className="text-slate-300">
                    Wer Krypto-Einkünfte nicht deklariert, riskiert Finanzordnungswidrigkeiten (bis 25%
                    der verkürzten Steuer) oder bei Vorsatz Abgabenhinterziehung (bis 200% der
                    verkürzten Steuer + strafrechtliche Konsequenzen).
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Häufig gestellte Fragen
              </h2>
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Muss ich jeden einzelnen Trade melden?</h3>
                  <p className="text-slate-300">
                    Ja, grundsätzlich muss jeder steuerpflichtige Vorgang dokumentiert und in der
                    Steuererklärung berücksichtigt werden. In der E1kv können Sie aber den Gesamtsaldo melden.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Was ist mit Krypto auf ausländischen Börsen?</h3>
                  <p className="text-slate-300">
                    Auch Krypto-Gewinne auf ausländischen Börsen (Binance, Kraken, etc.) sind in Österreich
                    steuerpflichtig. Da kein automatischer KESt-Abzug erfolgt, müssen Sie diese selbst
                    über die E1kv melden.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Gibt es eine Freigrenze für Krypto-Gewinne?</h3>
                  <p className="text-slate-300">
                    Nein, es gibt keine Freigrenze. Jeder noch so kleine Gewinn aus Kryptowährungen
                    ist steuerpflichtig. Die allgemeine Veranlagungsgrenze von 730€ für sonstige
                    Einkünfte gilt NICHT für KESt-pflichtige Krypto-Einkünfte.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Kann ich Krypto an meine Kinder verschenken, um Steuern zu sparen?</h3>
                  <p className="text-slate-300">
                    Eine Schenkung ist kein steuerpflichtiger Vorgang. Allerdings übernimmt der
                    Beschenkte die Anschaffungskosten des Schenkers. Bei späterer Veräußerung
                    durch die Kinder fällt dann KESt an.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Wie behandle ich Hard Forks?</h3>
                  <p className="text-slate-300">
                    Bei einem Hard Fork (z.B. Bitcoin Cash aus Bitcoin) werden die neuen Token
                    mit Anschaffungskosten von 0€ eingebucht. Die Anschaffungskosten der
                    ursprünglichen Token bleiben unverändert.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white mb-2">Muss mein österreichischer Broker die KESt automatisch abführen?</h3>
                  <p className="text-slate-300">
                    Seit 2024 sind österreichische Krypto-Dienstleister verpflichtet, die KESt
                    automatisch einzubehalten und abzuführen (KESt-Abzug). Bei ausländischen
                    Plattformen müssen Sie die Steuer selbst über die E1kv deklarieren.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-12 mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Berechnen Sie Ihre Krypto-Steuer
                </h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Unser Krypto-Steuerrechner zeigt Ihnen sofort, wie viel KESt auf Ihre
                  Krypto-Gewinne anfällt.
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  <Link href="/krypto-steuer">
                    Jetzt Krypto-Steuer berechnen
                  </Link>
                </Button>
              </div>
            </section>

            <ArticleFooter
              breadcrumbs={[
                { name: 'Home', href: '/' },
                { name: 'Steuerwissen', href: '/steuerwissen' },
                { name: 'Krypto-Steuer', href: '/steuerwissen/krypto-steuer-oesterreich' },
              ]}
              sources={[
                { name: 'EStG § 27b — Einkünfte aus Kryptowährungen', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570', description: 'Rechtsinformationssystem des Bundes (RIS)' },
                { name: 'BMF — Kryptowährungen und Steuern', url: 'https://www.bmf.gv.at/themen/steuern/kryptowaehrungen.html', description: 'Bundesministerium für Finanzen — Infos zur Krypto-Besteuerung' },
                { name: 'BMF-Erlass zu Kryptowährungen (EStR 2000 Rz 6148ff)', url: 'https://findok.bmf.gv.at/findok/link?gz=%2215%202301%2F7-IV%2F7%2F2022%22&aession=1', description: 'Einkommensteuerrichtlinien — Krypto-Kapitel' },
                { name: 'WKO — Besteuerung von Kryptowährungen', url: 'https://www.wko.at/steuern/kryptowaehrungen-steuer', description: 'Wirtschaftskammer Österreich' },
              ]}
              relatedArticles={[
                { title: 'Steueroptimierung für Selbstständige', href: '/steuerwissen/steueroptimierung-selbststaendige' },
                { title: 'GmbH vs. Einzelunternehmen — Der Steuer-Vergleich', href: '/steuerwissen/gmbh-vs-einzelunternehmen' },
                { title: 'Gewinnfreibetrag 2026 — Bis zu 4.950€ sparen', href: '/steuerwissen/gewinnfreibetrag-nutzen' },
              ]}
            />
          </article>
        </div>
      </div>
    </AppShell>
  )
}
