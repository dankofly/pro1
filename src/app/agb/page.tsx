'use client'

import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'

function AGBContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <div className="prose prose-slate max-w-none space-y-6">
        {/* 1. Geltungsbereich */}
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Website{' '}
            <strong>steuerboard.pro</strong> sowie aller darauf angebotenen Dienste, betrieben von:
          </p>
          <p>
            <strong>HYPEAKZ.IO</strong><br />
            Daniel Kofler<br />
            Thal-Aue 95, 9911 Assling<br />
            Österreich<br />
            E-Mail: <a href="mailto:mail@danielkofler.com" className="text-blue-600 hover:underline">mail@danielkofler.com</a>
          </p>
          <p>
            Mit der Nutzung von steuerboard.pro erklären Sie sich mit diesen AGB einverstanden.
            Abweichende Bedingungen des Nutzers werden nicht anerkannt, es sei denn, der Betreiber
            stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>
        </section>

        {/* 2. Leistungsbeschreibung */}
        <section>
          <h2 className="text-xl font-semibold mb-3">2. Leistungsbeschreibung</h2>
          <p>steuerboard.pro stellt folgende Dienste bereit:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>SVS-Rechner:</strong> Berechnung von Sozialversicherungsbeiträgen für Selbständige in Österreich (SVS-Beiträge, Einkommensteuer, Gesamtbelastung)</li>
            <li><strong>Steuerrechner:</strong> Schätzung von Einkommensteuer, Umsatzsteuer und weiteren steuerlichen Kennzahlen</li>
            <li><strong>KI-Steuerberater:</strong> KI-gestützter Assistent für allgemeine steuerliche Fragen</li>
            <li><strong>Steuer-Wissen Bot:</strong> KI-basierte Wissensdatenbank zu österreichischem Steuerrecht</li>
            <li><strong>GmbH-Vergleich:</strong> Gegenüberstellung der Steuerbelastung als Einzelunternehmer vs. GmbH</li>
          </ul>
          <p>
            Teile der Dienste stehen nur registrierten Nutzern mit einem kostenpflichtigen Abonnement
            (&quot;Pro&quot;-Plan) zur Verfügung.
          </p>
        </section>

        {/* 3. Haftungsausschluss Rechner */}
        <section>
          <h2 className="text-xl font-semibold mb-3">3. Haftungsausschluss &ndash; Rechner und Berechnungen</h2>
          <p>
            <strong>
              Sämtliche auf steuerboard.pro bereitgestellten Berechnungen &ndash; insbesondere SVS-Beiträge,
              Einkommensteuer, Umsatzsteuer, Gewinnfreibeträge und GmbH-Vergleiche &ndash; sind unverbindliche
              Richtwerte und stellen ausdrücklich keine Steuerberatung, Rechtsberatung oder sonstige
              professionelle Beratung dar.
            </strong>
          </p>
          <p>Die Berechnungen:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>basieren auf allgemein zugänglichen Gesetzesgrundlagen (EStG, GSVG, FSVG, UStG) und öffentlich verfügbaren Informationen</li>
            <li>berücksichtigen <strong>nicht</strong> alle individuellen Sachverhalte, Sonderfälle oder persönlichen steuerlichen Verhältnisse</li>
            <li>können von den tatsächlichen SVS-Bescheiden und Steuerbescheiden des Finanzamts abweichen</li>
            <li>werden auf Basis vereinfachter Modelle berechnet und erheben keinen Anspruch auf Vollständigkeit</li>
          </ul>
          <p>
            <strong>Für die Richtigkeit, Vollständigkeit und Aktualität der Berechnungsergebnisse wird
            keine Gewähr übernommen.</strong> Die Nutzung der Rechner erfolgt auf eigenes Risiko des Nutzers.
            Jegliche Haftung für Schäden, die direkt oder indirekt aus der Nutzung der Berechnungen
            entstehen, wird &ndash; soweit gesetzlich zulässig &ndash; ausgeschlossen.
          </p>
          <p>
            Wir empfehlen ausdrücklich, für verbindliche Auskünfte einen qualifizierten Steuerberater
            oder die Sozialversicherungsanstalt der Selbständigen (SVS) bzw. das zuständige Finanzamt
            direkt zu konsultieren.
          </p>
        </section>

        {/* 4. Haftungsausschluss KI-Inhalte */}
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Haftungsausschluss &ndash; KI-generierte Inhalte</h2>
          <p>
            Der KI-Steuerberater und der Steuer-Wissen Bot nutzen künstliche Intelligenz (Large Language
            Models), um Antworten auf steuerliche Fragen zu generieren.
          </p>
          <p><strong>Es wird ausdrücklich darauf hingewiesen:</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>KI-generierte Antworten können <strong>fehlerhaft, unvollständig oder veraltet</strong> sein</li>
            <li>Die KI kann Sachverhalte falsch interpretieren oder &quot;halluzinieren&quot; (plausibel klingende, aber inhaltlich falsche Aussagen treffen)</li>
            <li>KI-Inhalte ersetzen <strong>keine qualifizierte Steuerberatung</strong> durch einen befugten Steuerberater oder Wirtschaftsprüfer</li>
            <li>Für Entscheidungen auf Basis von KI-generierten Inhalten ist der Nutzer selbst verantwortlich</li>
          </ul>
          <p>
            Eine Haftung für Schäden, die aus der Verwendung von KI-generierten Inhalten entstehen,
            wird &ndash; soweit gesetzlich zulässig &ndash; ausgeschlossen.
          </p>
        </section>

        {/* 5. Haftungsausschluss Daten */}
        <section>
          <h2 className="text-xl font-semibold mb-3">5. Haftungsausschluss &ndash; Datengrundlagen</h2>
          <p>
            Die verwendeten Steuersätze, Freibeträge, Grenzen und Berechnungsparameter basieren auf
            den zum jeweiligen Zeitpunkt der Implementierung gültigen gesetzlichen Bestimmungen.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Steuersätze, SVS-Beitragsgrundlagen und Freibeträge können sich <strong>jährlich ändern</strong></li>
            <li>Es besteht keine Garantie, dass die hinterlegten Daten stets auf dem aktuellsten Stand sind</li>
            <li>Für Steuerjahre mit dem Hinweis &quot;Prognose&quot; handelt es sich um geschätzte Werte, die von den endgültigen gesetzlichen Regelungen abweichen können</li>
            <li>Der Nutzer ist selbst verantwortlich für die Überprüfung der Berechnungsergebnisse anhand aktueller Gesetzeslagen</li>
          </ul>
          <p>
            Eine Haftung für Schäden aufgrund veralteter, fehlerhafter oder unvollständiger
            Datengrundlagen wird &ndash; soweit gesetzlich zulässig &ndash; ausgeschlossen.
          </p>
        </section>

        {/* 6. Nutzung & Verfügbarkeit */}
        <section>
          <h2 className="text-xl font-semibold mb-3">6. Nutzung und Verfügbarkeit</h2>
          <p>
            Es besteht kein Anspruch auf ständige, ununterbrochene Verfügbarkeit der Website und
            ihrer Dienste. Der Betreiber behält sich das Recht vor, den Zugang zu Teilen der Website
            oder zur gesamten Website jederzeit und ohne Vorankündigung zu ändern, einzuschränken
            oder einzustellen.
          </p>
          <p>
            Der Betreiber haftet nicht für Ausfälle, technische Störungen oder Datenverluste, die
            durch höhere Gewalt, technische Probleme oder Wartungsarbeiten verursacht werden.
          </p>
        </section>

        {/* 7. Zahlungsbedingungen */}
        <section>
          <h2 className="text-xl font-semibold mb-3">7. Zahlungsbedingungen und Abonnement</h2>
          <p>
            Kostenpflichtige Dienste (&quot;Pro&quot;-Plan) werden als Abonnement über den
            Zahlungsdienstleister <strong>Stripe</strong> abgerechnet. Mit dem Abschluss eines
            Abonnements stimmen Sie auch den{' '}
            <a href="https://stripe.com/at/legal" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Nutzungsbedingungen von Stripe
            </a>{' '}
            zu.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Die Abrechnung erfolgt monatlich oder jährlich, je nach gewähltem Plan</li>
            <li>Das Abonnement verlängert sich automatisch, sofern es nicht vor Ablauf der jeweiligen Laufzeit gekündigt wird</li>
            <li>Die Kündigung ist jederzeit über das Kundenportal oder per E-Mail möglich</li>
          </ul>
          <p>
            <strong>Widerrufsrecht:</strong> Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe
            von Gründen den Vertrag zu widerrufen. Das Widerrufsrecht erlischt bei digitalen Inhalten,
            wenn der Verbraucher ausdrücklich zugestimmt hat, dass mit der Vertragserfüllung vor Ablauf
            der Widerrufsfrist begonnen wird, und seine Kenntnis davon bestätigt hat, dass er damit
            sein Widerrufsrecht verliert.
          </p>
        </section>

        {/* 8. Geistiges Eigentum */}
        <section>
          <h2 className="text-xl font-semibold mb-3">8. Geistiges Eigentum</h2>
          <p>
            Sämtliche Inhalte auf steuerboard.pro &ndash; einschließlich Texte, Grafiken, Logos, Icons,
            Software, Berechnungsmodelle und Design &ndash; sind urheberrechtlich geschützt und Eigentum
            des Betreibers oder der jeweiligen Rechteinhaber.
          </p>
          <p>
            Eine Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Verwertung außerhalb der
            Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung des Betreibers. Die Nutzung
            der Rechner-Ergebnisse für private Zwecke ist gestattet.
          </p>
        </section>

        {/* 9. Datenschutz */}
        <section>
          <h2 className="text-xl font-semibold mb-3">9. Datenschutz</h2>
          <p>
            Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{' '}
            <a href="/datenschutz" className="text-blue-600 hover:underline">
              Datenschutzerklärung
            </a>.
          </p>
        </section>

        {/* 10. Schlussbestimmungen */}
        <section>
          <h2 className="text-xl font-semibold mb-3">10. Schlussbestimmungen</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Es gilt ausschließlich <strong>österreichisches Recht</strong> unter Ausschluss des UN-Kaufrechts und der Verweisungsnormen des internationalen Privatrechts</li>
            <li>Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesen AGB ist &ndash; soweit gesetzlich zulässig &ndash; Innsbruck, Österreich</li>
            <li>Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt (salvatorische Klausel)</li>
            <li>Der Betreiber behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden auf der Website veröffentlicht und treten mit Veröffentlichung in Kraft</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t text-sm text-muted-foreground">
        <p>Stand: März 2026</p>
      </div>
    </div>
  )
}

export default function AGBPage() {
  return (
    <AppShell>
      <AGBContent />
      <SiteFooter />
    </AppShell>
  )
}
