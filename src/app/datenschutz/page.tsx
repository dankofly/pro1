'use client'

import { AppShell } from '@/components/svs/app-shell'

function DatenschutzContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-slate max-w-none space-y-6">

          {/* 1. Verantwortlicher */}
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p>
              <strong>HYPEAKZ.IO</strong><br />
              Daniel Kofler<br />
              Thal-Aue 95<br />
              9911 Assling<br />
              Österreich<br />
              E-Mail: <a href="mailto:mail@danielkofler.com" className="text-blue-600 hover:underline">mail@danielkofler.com</a><br />
              Telefon: +43 676 7293888
            </p>
          </section>

          {/* 2. Überblick */}
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Überblick der Verarbeitungen</h2>
            <p>
              Die folgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer
              Verarbeitung zusammen und verweist auf die betroffenen Personen.
            </p>
            <p><strong>Arten der verarbeiteten Daten:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Bestandsdaten (z.B. Name, E-Mail-Adresse)</li>
              <li>Nutzungsdaten (z.B. besuchte Seiten, Zugriffszeit)</li>
              <li>Meta-/Kommunikationsdaten (z.B. IP-Adresse, Geraeteinformationen)</li>
              <li>Zahlungsdaten (verarbeitet durch Lemon Squeezy als Zahlungsdienstleister)</li>
              <li>Berechnungsdaten (z.B. Gewinn, SVS-Vorschreibung – nur bei registrierten Nutzern)</li>
            </ul>
            <p><strong>Betroffene Personen:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Besucher und Nutzer der Website</li>
              <li>Registrierte Benutzer</li>
              <li>Zahlende Abonnenten</li>
            </ul>
          </section>

          {/* 3. Rechtsgrundlagen */}
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Rechtsgrundlagen</h2>
            <p>
              Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren
              Basis wir personenbezogene Daten verarbeiten:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</strong> – Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen oder mehrere bestimmte Zwecke gegeben.</li>
              <li><strong>Vertragserfullung (Art. 6 Abs. 1 lit. b DSGVO)</strong> – Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchfuhrung vorvertraglicher Massnahmen erforderlich.</li>
              <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)</strong> – Die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten erforderlich.</li>
            </ul>
          </section>

          {/* 4. Hosting */}
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Hosting und Content Delivery</h2>
            <p>
              Unsere Website wird bei <strong>Netlify, Inc.</strong> (44 Montgomery Street, Suite 300,
              San Francisco, CA 94104, USA) gehostet. Beim Besuch unserer Website erfasst Netlify
              automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch
              übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP-Adresse des anfragenden Rechners</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>Verwendeter Browser und ggf. Betriebssystem</li>
              <li>Referrer URL (zuvor besuchte Seite)</li>
            </ul>
            <p>
              Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer
              sicheren und effizienten Bereitstellung unserer Website (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p>
              Netlify verfuegt über EU-Standardvertragsklauseln als Garantie für die Datenübermittlung
              in die USA. Weitere Informationen:{' '}
              <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://www.netlify.com/privacy/
              </a>
            </p>
          </section>

          {/* 5. Registrierung / Auth */}
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Registrierung und Benutzerkonto</h2>
            <p>
              Nutzer können auf unserer Website ein Benutzerkonto anlegen. Im Rahmen der Registrierung
              werden folgende Daten erhoben:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>E-Mail-Adresse</li>
              <li>Passwort (verschlüsselt gespeichert)</li>
            </ul>
            <p>
              Die Registrierung ist erforderlich, um erweiterte Funktionen nutzen zu können (z.B.
              Speichern von Berechnungen, Dashboard). Die Verarbeitung erfolgt zur Vertragserfullung
              (Art. 6 Abs. 1 lit. b DSGVO).
            </p>
            <p>
              Die Benutzerdaten werden bei <strong>Supabase, Inc.</strong> (970 Toa Payoh North #07-04,
              Singapore 318992) gespeichert. Supabase setzt Hosting-Infrastruktur in der EU (AWS
              eu-central-1, Frankfurt) ein. Weitere Informationen:{' '}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://supabase.com/privacy
              </a>
            </p>
          </section>

          {/* 6. Berechnungsdaten */}
          <section>
            <h2 className="text-xl font-semibold mb-3">6. Berechnungsdaten</h2>
            <p>
              Wenn Sie als registrierter Nutzer Berechnungen speichern, werden folgende Daten in Ihrer
              Datenbank gespeichert:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Jahresgewinn (eingegebener Wert)</li>
              <li>Monatliche SVS-Vorschreibung</li>
              <li>Berechnungsergebnisse (Beitragsgrundlage, endgültige SVS, Nachzahlung, Steuerersparnis)</li>
              <li>Zeitpunkt der Berechnung</li>
            </ul>
            <p>
              <strong>Ohne Registrierung</strong> werden keinerlei Berechnungsdaten gespeichert oder an
              Server übermittelt. Die Berechnungen erfolgen ausschliesslich lokal in Ihrem Browser.
            </p>
            <p>
              Die Verarbeitung gespeicherter Berechnungen erfolgt zur Vertragserfullung
              (Art. 6 Abs. 1 lit. b DSGVO).
            </p>
          </section>

          {/* 7. Zahlungsabwicklung */}
          <section>
            <h2 className="text-xl font-semibold mb-3">7. Zahlungsabwicklung</h2>
            <p>
              Für kostenpflichtige Abonnements nutzen wir <strong>Lemon Squeezy</strong> (Lemon Squeezy, LLC,
              16192 Coastal Highway, Lewes, Delaware 19958, USA) als Merchant of Record. Lemon Squeezy
              verarbeitet als eigenstaendiger Verantwortlicher:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Zahlungsinformationen (Kreditkarte, PayPal etc.)</li>
              <li>Rechnungsadresse</li>
              <li>E-Mail-Adresse</li>
              <li>Abonnement-Status und -Verlauf</li>
            </ul>
            <p>
              Wir selbst speichern <strong>keine</strong> Zahlungsinformationen (Kreditkartennummern etc.).
              Wir erhalten von Lemon Squeezy lediglich den Abonnement-Status, die Kundennummer und
              Verwaltungs-URLs über einen verschlüsselten Webhook.
            </p>
            <p>
              Die Verarbeitung erfolgt zur Vertragserfullung (Art. 6 Abs. 1 lit. b DSGVO). Weitere
              Informationen:{' '}
              <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://www.lemonsqueezy.com/privacy
              </a>
            </p>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-xl font-semibold mb-3">8. Cookies und lokale Speicherung</h2>
            <p>
              Unsere Website verwendet <strong>keine</strong> Tracking-Cookies und <strong>keine</strong>{' '}
              Analyse-Tools (kein Google Analytics, kein Facebook Pixel etc.).
            </p>
            <p>
              Wir verwenden ausschliesslich technisch notwendige Speicherung im Browser (Local Storage)
              für:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Authentifizierungs-Token (nach dem Login)</li>
              <li>Benutzereinstellungen (z.B. Alert-Praeferenzen)</li>
            </ul>
            <p>
              Diese Speicherung ist für den Betrieb der Website technisch erforderlich und erfolgt
              auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) bzw.
              &sect; 165 Abs. 3 TKG 2021 (technisch notwendige Speicherung).
            </p>
          </section>

          {/* 9. Datenweitergabe */}
          <section>
            <h2 className="text-xl font-semibold mb-3">9. Weitergabe von Daten an Dritte</h2>
            <p>
              Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, wenn:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
              <li>die Weitergabe zur Vertragserfullung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li>eine gesetzliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
            </ul>
            <p>
              Wir setzen folgende Auftragsverarbeiter ein:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Supabase</strong> – Datenbank und Authentifizierung (EU-Region)</li>
              <li><strong>Netlify</strong> – Website-Hosting und Content Delivery</li>
              <li><strong>Lemon Squeezy</strong> – Zahlungsabwicklung (als eigenstaendiger Verantwortlicher)</li>
            </ul>
          </section>

          {/* 10. Datensicherheit */}
          <section>
            <h2 className="text-xl font-semibold mb-3">10. Datensicherheit</h2>
            <p>
              Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure
              Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von
              Ihrem Browser unterstuetzt wird. Ob eine einzelne Seite unseres Internetauftrittes
              verschlüsselt übertragen wird, erkennen Sie an der geschlossenen Darstellung des
              Schluessel- beziehungsweise Schloss-Symbols in der Adressleiste Ihres Browsers.
            </p>
            <p>
              Passwoerter werden mittels branchenüblicher Hashing-Verfahren (bcrypt) gespeichert und
              sind für uns nicht einsehbar. Datenbankzugriffe sind durch Row Level Security (RLS)
              abgesichert, sodass jeder Nutzer ausschliesslich auf seine eigenen Daten zugreifen kann.
            </p>
          </section>

          {/* 11. Speicherdauer */}
          <section>
            <h2 className="text-xl font-semibold mb-3">11. Speicherdauer</h2>
            <p>
              Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfaellt:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Kontodaten</strong> – bis zur Löschung des Benutzerkontos durch den Nutzer</li>
              <li><strong>Berechnungsdaten</strong> – bis zur Löschung durch den Nutzer oder Löschung des Kontos</li>
              <li><strong>Abonnement-Daten</strong> – bis zur Beendigung des Abonnements plus gesetzliche Aufbewahrungsfristen (7 Jahre gemäß &sect; 132 BAO)</li>
              <li><strong>Server-Logs</strong> – maximal 30 Tage (durch Netlify)</li>
            </ul>
          </section>

          {/* 12. Betroffenenrechte */}
          <section>
            <h2 className="text-xl font-semibold mb-3">12. Ihre Rechte als betroffene Person</h2>
            <p>
              Ihnen stehen gemäß DSGVO und österreichischem Datenschutzgesetz (DSG) folgende Rechte zu:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Auskunftsrecht (Art. 15 DSGVO)</strong> – Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob personenbezogene Daten verarbeitet werden und Auskunft über diese Daten zu erhalten.</li>
              <li><strong>Recht auf Berichtigung (Art. 16 DSGVO)</strong> – Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollstaendigung unvollstaendiger personenbezogener Daten zu verlangen.</li>
              <li><strong>Recht auf Löschung (Art. 17 DSGVO)</strong> – Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li><strong>Recht auf Einschraenkung (Art. 18 DSGVO)</strong> – Sie haben das Recht, die Einschraenkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</strong> – Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
              <li><strong>Widerspruchsrecht (Art. 21 DSGVO)</strong> – Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.</li>
              <li><strong>Recht auf Widerruf (Art. 7 Abs. 3 DSGVO)</strong> – Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an:{' '}
              <a href="mailto:mail@danielkofler.com" className="text-blue-600 hover:underline">mail@danielkofler.com</a>
            </p>
          </section>

          {/* 13. Beschwerderecht */}
          <section>
            <h2 className="text-xl font-semibold mb-3">13. Beschwerderecht bei einer Aufsichtsbehörde</h2>
            <p>
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die
              DSGVO verstößt, haben Sie das Recht, Beschwerde bei der zuständigen Aufsichtsbehörde
              einzulegen:
            </p>
            <p>
              <strong>Österreichische Datenschutzbehörde</strong><br />
              Barichgasse 40-42<br />
              1030 Wien<br />
              Telefon: +43 1 52 152-0<br />
              E-Mail: <a href="mailto:dsb@dsb.gv.at" className="text-blue-600 hover:underline">dsb@dsb.gv.at</a><br />
              Website:{' '}
              <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://www.dsb.gv.at
              </a>
            </p>
          </section>

          {/* 14. Drittlandtransfer */}
          <section>
            <h2 className="text-xl font-semibold mb-3">14. Datenübermittlung in Drittlaender</h2>
            <p>
              Soweit wir Daten in einem Drittland (d.h. ausserhalb der EU/des EWR) verarbeiten oder dies
              im Rahmen der Inanspruchnahme von Diensten Dritter geschieht, erfolgt dies nur, wenn es
              zur Erfüllung unserer (vor)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung,
              aufgrund einer rechtlichen Verpflichtung oder auf Grundlage unserer berechtigten Interessen geschieht.
            </p>
            <p>
              Die Datenübermittlung in die USA (Netlify, Lemon Squeezy) erfolgt auf Grundlage von
              EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) und ggf. dem EU-U.S. Data
              Privacy Framework.
            </p>
          </section>

          {/* 15. Änderungen */}
          <section>
            <h2 className="text-xl font-semibold mb-3">15. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
              aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen
              in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die
              neue Datenschutzerklärung.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground">
          <p>Stand: Februar 2026</p>
        </div>
      </div>
  )
}

export default function DatenschutzPage() {
  return (
    <AppShell>
      <DatenschutzContent />
    </AppShell>
  )
}
