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
            <strong>HYPEAKZ e.U.</strong><br />
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

        {/* 7f. Widerrufsbelehrung nach FAGG */}
        <section>
          <h2 className="text-xl font-semibold mb-3">7f. Widerrufsbelehrung</h2>
          <p><strong>Widerrufsrecht</strong></p>
          <p>
            Sie haben das Recht, binnen <strong>14 Tagen</strong> ohne Angabe von Gründen diesen
            Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsabschlusses.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung
            (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen
            Vertrag zu widerrufen, informieren. Sie können dafür das unten stehende
            Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
          </p>
          <p>
            <strong>An:</strong><br />
            HYPEAKZ e.U., Daniel Kofler, Thal-Aue 95, 9911 Assling, Österreich<br />
            E-Mail: <a href="mailto:mail@danielkofler.com" className="text-blue-600 hover:underline">mail@danielkofler.com</a>
          </p>
          <p>
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die
            Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
          <p><strong>Folgen des Widerrufs</strong></p>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
            erhalten haben, unverzüglich und spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen,
            an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
            Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
            ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich
            etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte
            berechnet.
          </p>
          <p><strong>Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten</strong></p>
          <p>
            Das Widerrufsrecht erlischt bei einem Vertrag über die Bereitstellung von nicht auf
            einem körperlichen Datenträger befindlichen digitalen Inhalten, wenn der Unternehmer
            mit der Ausführung des Vertrags begonnen hat, nachdem der Verbraucher
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>ausdrücklich zugestimmt hat, dass der Unternehmer mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnt, und</li>
            <li>seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung mit Beginn der Ausführung des Vertrags sein Widerrufsrecht verliert.</li>
          </ul>

          <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p><strong>Muster-Widerrufsformular</strong></p>
            <p className="text-sm mt-2">(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
            <ul className="list-none pl-0 space-y-2 text-sm mt-3">
              <li>An: HYPEAKZ e.U., Daniel Kofler, Thal-Aue 95, 9911 Assling, Österreich, E-Mail: mail@danielkofler.com</li>
              <li>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*) / den Kauf der folgenden Waren (*)</li>
              <li>Bestellt am (*) / erhalten am (*)</li>
              <li>Name des/der Verbraucher(s)</li>
              <li>Anschrift des/der Verbraucher(s)</li>
              <li>Datum</li>
            </ul>
            <p className="text-xs mt-3 text-muted-foreground">(*) Unzutreffendes streichen.</p>
          </div>
        </section>

        {/* 7a. Keine Steuerberatung */}
        <section>
          <h2 className="text-xl font-semibold mb-3">7a. Abgrenzung zur Steuerberatung</h2>
          <p>
            Der Betreiber ist <strong>nicht befugt</strong>, Steuerberatung im Sinne des
            Wirtschaftstreuhandberufsgesetzes 2017 (WTBG 2017) oder der Gewerbeordnung
            für Steuerberater (GOStB) zu erbringen. steuerboard.pro ist ein
            Informations- und Berechnungstool, kein Steuerberatungsunternehmen.
          </p>
          <p>
            Sämtliche Berechnungen, KI-generierten Inhalte und Informationen auf steuerboard.pro
            dienen ausschließlich der unverbindlichen Erstinformation. Sie ersetzen in keinem Fall
            die individuelle Beratung durch einen befugten Steuerberater, Wirtschaftsprüfer oder
            Bilanzbuchhalter. KI-generierte Aussagen können bei Finanzamtsprüfungen nicht als
            Nachweis oder Rechtsgrundlage herangezogen werden.
          </p>
          <p>
            Nutzer erkennen an, dass sie die Inhalte nur für Informationszwecke verwenden und
            für rechtlich oder steuerlich relevante Entscheidungen einen qualifizierten Steuerberater
            konsultieren.
          </p>
        </section>

        {/* 7b. Gewährleistung */}
        <section>
          <h2 className="text-xl font-semibold mb-3">7b. Gewährleistung</h2>
          <p>
            Der Betreiber gewährleistet die grundsätzliche Funktionsfähigkeit der angebotenen Dienste
            gemäß der Leistungsbeschreibung in Abschnitt 2. Ein Anspruch auf ununterbrochene
            Verfügbarkeit besteht nicht.
          </p>
          <p>
            Abweichungen zwischen den Berechnungsergebnissen und tatsächlichen Steuerbescheiden
            stellen keinen Mangel dar, da die Berechnungen ausdrücklich als unverbindliche Richtwerte
            gekennzeichnet sind.
          </p>
        </section>

        {/* 7c. Haftungsbegrenzung */}
        <section>
          <h2 className="text-xl font-semibold mb-3">7c. Haftungsbegrenzung</h2>
          <p>
            Die Haftung des Betreibers ist &ndash; soweit gesetzlich zulässig &ndash; wie folgt begrenzt:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Die Gesamthaftung des Betreibers ist auf die Höhe der vom Nutzer in den letzten <strong>12 Monaten</strong> tatsächlich gezahlten Gebühren begrenzt</li>
            <li>Für kostenlose Nutzung ist die Haftung auf <strong>vorsätzliches und grob fahrlässiges</strong> Verhalten beschränkt</li>
            <li>Der Betreiber haftet nicht für indirekte Schäden, entgangenen Gewinn, Folgeschäden oder Schäden aus entgangener Nutzung</li>
            <li>Bei grober Fahrlässigkeit oder Vorsatz bleibt die Haftung nach den allgemeinen gesetzlichen Bestimmungen (ABGB) unberührt</li>
          </ul>
        </section>

        {/* 7d. Kündigung */}
        <section>
          <h2 className="text-xl font-semibold mb-3">7d. Kündigung und Vertragsende</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Das Abonnement kann jederzeit zum <strong>Ende der laufenden Abrechnungsperiode</strong> gekündigt werden</li>
            <li>Die Kündigung ist über das Kundenportal (Stripe-Kundenbereich) oder per E-Mail an mail@danielkofler.com möglich</li>
            <li>Nach Kündigung bleiben die Dienste bis zum Ende der bezahlten Laufzeit aktiv</li>
            <li>Nach Vertragsende werden gespeicherte Berechnungsdaten innerhalb von <strong>30 Tagen</strong> gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen</li>
            <li>Abonnement-Daten werden gemäß &sect; 132 BAO für die gesetzliche Aufbewahrungsfrist von 7 Jahren aufbewahrt</li>
          </ul>
        </section>

        {/* 7e. AGB-Änderungen */}
        <section>
          <h2 className="text-xl font-semibold mb-3">7e. Änderungen der AGB</h2>
          <p>
            Änderungen dieser AGB werden registrierten Nutzern mindestens <strong>30 Tage</strong> vor
            Inkrafttreten per E-Mail mitgeteilt. Widerspricht der Nutzer den geänderten AGB innerhalb
            dieser Frist, ist er berechtigt, das Abonnement zum Änderungszeitpunkt zu kündigen.
            Die weitere Nutzung nach Inkrafttreten gilt als Zustimmung zu den geänderten AGB.
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
            <li>Änderungen der AGB werden gemäß Abschnitt 7e mindestens 30 Tage vor Inkrafttreten per E-Mail mitgeteilt</li>
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
