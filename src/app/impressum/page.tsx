import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum – SVS Checker',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurueck zum Rechner
        </Link>

        <h1 className="text-3xl font-bold mb-8">Impressum</h1>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Angaben gemaess &sect; 5 ECG und &sect; 25 MedienG</h2>
            <p>
              <strong>HYPEAKZ.IO</strong><br />
              Daniel Kofler<br />
              Thal-Aue 95<br />
              9911 Assling<br />
              Oesterreich
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
            <p>
              Telefon: +43 676 7293888<br />
              E-Mail: <a href="mailto:mail@danielkofler.com" className="text-blue-600 hover:underline">mail@danielkofler.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Unternehmensangaben</h2>
            <p>
              Unternehmensgegenstand: AI Automation und Marketingdienstleistungen<br />
              Umsatzsteuer-Identifikationsnummer: ATU77537202<br />
              Mitgliedschaft: Wirtschaftskammer Oesterreich (WKO)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Aufsichtsbehoerde</h2>
            <p>Bezirkshauptmannschaft: Lienz</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Anwendbare Rechtsvorschriften</h2>
            <p>
              Gewerbeordnung (GewO), E-Commerce-Gesetz (ECG), Mediengesetz (MedienG),
              Bundesgesetz gegen den unlauteren Wettbewerb (UWG).<br />
              Abrufbar unter:{' '}
              <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                www.ris.bka.gv.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Online-Streitbeilegung</h2>
            <p>
              Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Streitbeilegung</h2>
            <p>
              Wir sind grundsaetzlich nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Haftungsausschluss (Disclaimer)</h2>

            <h3 className="text-lg font-medium mt-4 mb-2">Haftung fuer Inhalte</h3>
            <p>
              Die Inhalte dieser Website wurden mit groesster Sorgfalt erstellt. Fuer die Richtigkeit,
              Vollstaendigkeit und Aktualitaet der Inhalte koennen wir jedoch keine Gewaehr uebernehmen.
              Als Diensteanbieter sind wir gemaess &sect; 7 Abs. 1 ECG fuer eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 ECG sind wir
              als Diensteanbieter jedoch nicht verpflichtet, uebermittelte oder gespeicherte fremde
              Informationen zu ueberwachen oder nach Umstaenden zu forschen, die auf eine rechtswidrige
              Taetigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberuehrt. Eine diesbezuegliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung moeglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Haftung fuer Links</h3>
            <p>
              Unser Angebot enthaelt Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb koennen wir fuer diese fremden Inhalte auch keine Gewaehr uebernehmen.
              Fuer die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf moegliche
              Rechtsverstoesse ueberprueft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
              erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Links umgehend entfernen.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              oesterreichischen Urheberrecht. Die Vervielfaeltigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung ausserhalb der Grenzen des Urheberrechtes beduerfen der schriftlichen Zustimmung
              des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur fuer den
              privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
              Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
              umgehend entfernen.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Haftungsausschluss fuer Berechnungen</h3>
            <p>
              Die auf dieser Website bereitgestellten SVS-Berechnungen, Steuerprognosen und sonstigen
              finanziellen Informationen dienen ausschliesslich zu Informationszwecken und stellen keine
              Steuerberatung, Rechtsberatung oder sonstige professionelle Beratung dar. Trotz sorgfaeltiger
              Pruefung uebernehmen wir keine Gewaehr fuer die Richtigkeit, Vollstaendigkeit oder Aktualitaet
              der bereitgestellten Berechnungen und Informationen.
            </p>
            <p>
              Die tatsaechlichen SVS-Beitraege und Steuerpflichten koennen von den hier berechneten Werten
              abweichen. Wir empfehlen, fuer verbindliche Auskuenfte einen Steuerberater oder die
              Sozialversicherungsanstalt der Selbstaendigen (SVS) direkt zu konsultieren.
            </p>
            <p>
              Die Nutzung der auf dieser Website bereitgestellten Berechnungen und Informationen erfolgt
              auf eigenes Risiko. Jegliche Haftung fuer Schaeden, die direkt oder indirekt aus der Nutzung
              dieser Website und ihrer Berechnungen entstehen, wird – soweit gesetzlich zulaessig –
              ausgeschlossen.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground">
          <p>Stand: Februar 2026</p>
        </div>
      </div>
    </div>
  )
}
