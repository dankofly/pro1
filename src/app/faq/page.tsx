'use client'

import { useState } from 'react'
import { AppShell } from '@/components/svs/app-shell'
import { SiteFooter } from '@/components/site-footer'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import {
  HelpCircle,
  ChevronDown,
  Info,
  Calculator,
  Crown,
  Wrench,
  CreditCard,
} from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

interface FaqSection {
  title: string
  icon: React.ReactNode
  items: FaqItem[]
}

const faqSections: FaqSection[] = [
  {
    title: 'Allgemein',
    icon: <Info className="h-4 w-4" />,
    items: [
      {
        q: 'Was ist SteuerBoard.pro?',
        a: 'SteuerBoard.pro ist ein interaktiver Steuer- und SVS-Rechner für österreichische Selbständige — Einzelunternehmer (EPU), Freiberufler und Gewerbetreibende, die bei der SVS (Sozialversicherung der Selbständigen) nach GSVG oder FSVG versichert sind. Du gibst Umsatz und Betriebsausgaben ein und erhältst sofort eine Berechnung deiner SVS-Beiträge (Pensionsversicherung, Krankenversicherung, Unfallversicherung, Selbständigenvorsorge), der Einkommensteuer nach dem progressiven Tarif (§ 33 EStG) und deines echten Nettos.',
      },
      {
        q: 'Für wen ist SteuerBoard gedacht?',
        a: 'Für alle Selbständigen in Österreich, die bei der SVS versichert sind: Gewerbetreibende (GSVG), Neue Selbständige (GSVG), Ärzte (FSVG) und Apotheker/Patentanwälte/Ziviltechniker (FSVG). Ob Jungunternehmer, nebenberuflich Selbständiger oder langjähriger EPU — SteuerBoard berechnet deine SVS-Beiträge, Einkommensteuer und echtes Netto.',
      },
      {
        q: 'Warum SteuerBoard.pro und nicht der WKO SVS-Rechner?',
        a: 'Der WKO SVS-Beitragsrechner berechnet nur die reinen SVS-Beiträge auf Basis einer Beitragsgrundlage — ohne Einkommensteuer, ohne Nachzahlungsprognose und ohne echtes Netto. SteuerBoard.pro berechnet alles in einem Schritt: SVS-Beiträge, Einkommensteuer-Prognose nach Tarifstufen, die voraussichtliche Nachzahlung (Differenz vorläufige vs. endgültige Beiträge), das Geldfluss-Diagramm, die Wahrheits-Tabelle, monatliche Rücklagen-Empfehlungen, einen KI-Steuerberater, GmbH-Vergleich, Pauschalierungs-Check und 7 spezialisierte Steuerrechner.',
      },
      {
        q: 'Welche Steuerjahre werden unterstützt?',
        a: 'SteuerBoard.pro enthält die aktuellen Werte für 2024, 2025 und 2026 — inklusive der neuen Werte ab 2026: Familienbonus Plus (2.100 EUR/Kind), angepasster AVAB (572 EUR), Verkehrsabsetzbetrag (481 EUR), Kindermehrbetrag (727 EUR), Kleinunternehmergrenze (55.000 EUR netto) und aktualisierte SVS-Mindest- und Höchstbeitragsgrundlagen.',
      },
      {
        q: 'Ersetzt SteuerBoard eine Steuerberatung?',
        a: 'Nein. SteuerBoard.pro ist ein Planungs- und Orientierungstool. Alle Berechnungen basieren auf den aktuellen gesetzlichen Grundlagen (EStG, GSVG, FSVG, UStG, KStG), sind aber Richtwerte ohne Gewähr. Die endgültigen Bescheide der SVS und des Finanzamts können abweichen. Für verbindliche Auskünfte empfehlen wir eine professionelle Steuerberatung. SteuerBoard hilft dir, vorbereitet ins Gespräch zu gehen — mit konkreten Zahlen und einem PDF-Export.',
      },
    ],
  },
  {
    title: 'Rechner',
    icon: <Calculator className="h-4 w-4" />,
    items: [
      {
        q: 'Was berechnet der SVS-Beitragsrechner?',
        a: 'Der Rechner ermittelt auf Basis deines Jahresgewinns (Umsatz minus Betriebsausgaben): deine SVS-Beiträge aufgeschlüsselt nach Pensionsversicherung (18,50 %), Krankenversicherung (6,80 %), Selbständigenvorsorge (1,53 %) und Unfallversicherung (pauschal 11,35 EUR/Monat), deine Einkommensteuer nach dem progressiven Steuertarif (§ 33 EStG), dein echtes Netto nach Abzug aller Abgaben, sowie die voraussichtliche SVS-Nachzahlung.',
      },
      {
        q: 'Was bedeutet „Gewinn" im Rechner?',
        a: 'Dein Gewinn ist die Differenz zwischen Jahresumsatz (netto, ohne USt) und deinen Betriebsausgaben. Dieser Betrag bildet die Grundlage für die Berechnung deiner SVS-Beiträge (Beitragsgrundlage) und deiner Einkommensteuer.',
      },
      {
        q: 'Was ist die Beitragsgrundlage?',
        a: 'Die Beitragsgrundlage ist der Betrag, auf den deine SVS-Beiträge berechnet werden (§ 25 GSVG). Sie ergibt sich aus deinem Gewinn laut Einkommensteuerbescheid. Es gibt eine Mindestbeitragsgrundlage (ca. 500 EUR/Monat) und eine Höchstbeitragsgrundlage (ca. 7.070 EUR/Monat in 2025), zwischen denen sich deine Beiträge bewegen.',
      },
      {
        q: 'Was ist die SVS-Nachzahlungsfalle?',
        a: 'Die SVS berechnet deine Beiträge zunächst vorläufig auf Basis deines Gewinns vor 3 Jahren (§ 25a GSVG). Wenn dein aktueller Gewinn höher ist, entsteht nach dem Steuerbescheid eine Nachzahlung. Bei einer Gewinnsteigerung von 30.000 auf 60.000 EUR kann diese über 5.000 EUR betragen. Die Wahrheits-Tabelle in SteuerBoard zeigt dir Quartal für Quartal die Differenz zwischen vorläufig und endgültig.',
      },
      {
        q: 'Wie wird die Einkommensteuer berechnet?',
        a: 'Die Einkommensteuer wird auf dein steuerpflichtiges Einkommen (Gewinn minus SVS-Beiträge minus Gewinnfreibetrag minus Absetzbeträge) nach dem progressiven Tarif gemäß § 33 EStG berechnet: 0 % bis 12.816 EUR, 20 % bis 20.818 EUR, 30 % bis 34.513 EUR, 40 % bis 66.612 EUR, 48 % bis 99.266 EUR, 50 % bis 1 Mio. EUR, 55 % darüber. SteuerBoard zieht automatisch den Gewinnfreibetrag (§ 10 EStG, bis 15 %) und Absetzbeträge ab.',
      },
      {
        q: 'Was zeigt die Wahrheits-Tabelle?',
        a: 'Die Wahrheits-Tabelle schlüsselt alle SVS-Positionen im Detail auf: vorläufige Beiträge (basierend auf dem Gewinn vor 3 Jahren), endgültige Beiträge (basierend auf dem aktuellen Gewinn), die Differenz pro Quartal und die Gesamtnachzahlung bzw. Rückerstattung. So siehst du auf einen Blick, warum dein SVS-Bescheid höher oder niedriger ausfällt als erwartet.',
      },
      {
        q: 'Was zeigt das Geldfluss-Diagramm?',
        a: 'Das Geldfluss-Diagramm visualisiert, wie sich dein Jahresgewinn aufteilt: Was geht an die SVS (Sozialversicherung), was geht ans Finanzamt (Einkommensteuer) und was bleibt als echtes Netto bei dir. So siehst du die tatsächliche Abgabenbelastung in Prozent deines Gewinns.',
      },
      {
        q: 'Was ist der Grenzsteuersatz vs. Durchschnittssteuersatz?',
        a: 'Der Grenzsteuersatz ist der Steuersatz, mit dem dein nächster verdienter Euro besteuert wird. Der Durchschnittssteuersatz ist der tatsächliche Anteil deines Einkommens, der als Steuern abgeführt wird. Beispiel: Bei 40.000 EUR Gewinn liegt der Grenzsteuersatz bei 40 %, der Durchschnittssteuersatz aber nur bei ca. 15 %.',
      },
    ],
  },
  {
    title: 'Pro-Features',
    icon: <Crown className="h-4 w-4" />,
    items: [
      {
        q: 'Was sind die drei Preispläne?',
        a: 'Free (kostenlos): SVS-Beitragsrechner, Wahrheits-Tabelle, Geldfluss-Diagramm, Sachbezug-Rechner, Steuer-Wissen Bot. Sicherheits-Plan (12,90 EUR/Monat oder 119 EUR/Jahr): zusätzlich Einkommensteuer-Prognose, Familienbonus & Absetzbeträge, Berechnungen speichern, Dashboard mit Verlauf und Export. SteuerBoard Pro (24,90 EUR/Monat oder 239 EUR/Jahr): alles plus Steuer-Chatbot mit 7 Rechnern, KI-Steuerberater, Misch-Einkommen Rechner, GmbH-Vergleich, Pauschalierungs-Vergleich, USt-Rechner & Rücklagen, Gewinnmaximierer, Investitionen & AfA, Krypto-Steuer und PDF-Export.',
      },
      {
        q: 'Was kann der KI-Steuer-Chatbot?',
        a: 'Der Steuer-Chatbot (Pro-Feature) ist ein KI-Assistent powered by Claude AI mit Zugriff auf 7 spezialisierte Rechner: Einkommensteuer, Körperschaftsteuer (23 % KöSt), Umsatzsteuer (inkl. Kleinunternehmerregelung § 6 Abs. 1 Z 27 UStG), Krypto-Steuer (27,5 % KESt), Immobilienertragsteuer (30 % ImmoESt), Sachbezug und Investitionsfreibetrag (§ 11 EStG). Er rechnet mit aktuellen österreichischen Werten für 2026.',
      },
      {
        q: 'Pauschalierung — Was ist das und wann lohnt sie sich?',
        a: 'Bei der Pauschalierung werden Betriebsausgaben nicht einzeln nachgewiesen, sondern pauschal als Prozentsatz des Umsatzes angesetzt. Verfügbare Arten: Basispauschalierung 12 % (bis 220.000 EUR Umsatz, ab 2025), Basispauschalierung 6 % (für bestimmte Berufe), Kleinunternehmer-Pauschalierung 45 % (produzierend, bis 35.000 EUR) oder 20 % (Dienstleistung). SteuerBoard vergleicht automatisch alle Pauschalierungsarten mit deiner tatsächlichen Versteuerung und zeigt dir die günstigste Variante.',
      },
      {
        q: 'Investitionen & AfA — Wie funktioniert die Abschreibung?',
        a: 'Betriebliche Anschaffungen über 1.000 EUR werden über die Nutzungsdauer abgeschrieben (AfA): Einrichtung 8 Jahre, EDV 4 Jahre, Maschinen 8 Jahre. Du kannst zwischen linearer und degressiver Abschreibung wählen. Geringwertige Wirtschaftsgüter (GWG) unter 1.000 EUR sind sofort voll absetzbar. Zusätzlich gibt es den investitionsbedingten Gewinnfreibetrag (IFB) von 10–15 % gemäß § 11 EStG.',
      },
      {
        q: 'Wann lohnt sich eine GmbH statt Einzelunternehmen?',
        a: 'Bei einer GmbH fallen 23 % Körperschaftsteuer (KöSt) plus 27,5 % KESt auf Ausschüttungen an. Dafür entfällt die SVS des Geschäftsführers zugunsten von ASVG-Beiträgen. Typischerweise lohnt sich eine GmbH ab ca. 60.000–80.000 EUR Gewinn — SteuerBoard berechnet den exakten Break-Even-Punkt mit konkreten EUR-Beträgen für deine Situation.',
      },
      {
        q: 'Gewinnmaximierer — Was zeigt er?',
        a: 'Der Gewinnmaximierer simuliert einen Zusatzauftrag: Du gibst zusätzliche Einnahmen und die dazugehörigen Kosten ein und siehst sofort den effektiven Steuersatz auf den Zusatzverdienst — also wie viel von jedem zusätzlichen Euro netto bei dir ankommt. So findest du den Sweet Spot, ab dem sich Mehrarbeit steuerlich kaum noch lohnt.',
      },
      {
        q: 'Funktioniert SteuerBoard bei Misch-Einkommen?',
        a: 'Ja. Der Misch-Einkommen Rechner (Pro-Feature) ist speziell für Personen mit unselbständigen und selbständigen Einkünften gebaut. Er berechnet die Differenz-Vorschreibung der SVS, berücksichtigt die doppelte Sozialversicherung (ASVG + GSVG) und ermittelt das kombinierte echte Netto. Besonders relevant für Angestellte mit Nebeneinkünften über der Geringfügigkeitsgrenze.',
      },
      {
        q: 'Steuer-Optimierung — Welche Absetzbeträge gibt es?',
        a: 'Familienbonus Plus (2.100 EUR/Kind unter 18, 700 EUR/Kind über 18 ab 2026), Alleinverdiener-/Alleinerzieherabsetzbetrag (AVAB/AEAB, 572 EUR), Verkehrsabsetzbetrag (481 EUR), Kindermehrbetrag (727 EUR) und Pendlerpauschale (abhängig von Entfernung und Öffi-Zumutbarkeit). SteuerBoard berechnet alle automatisch und zieht sie direkt von deiner Steuerschuld ab.',
      },
    ],
  },
  {
    title: 'Pro-Werkzeuge',
    icon: <Wrench className="h-4 w-4" />,
    items: [
      {
        q: 'Steuerberater-Report (PDF)',
        a: 'Exportiert eine kompakte Zusammenfassung deiner SVS-, Steuer- und Prognosedaten als professionellen PDF-Report. Ideal zur Vorbereitung auf das Gespräch mit deinem Steuerberater — mit Diagrammen, Berechnungen und Optimierungsvorschlägen.',
      },
      {
        q: 'Nachzahlungs-Prognose',
        a: 'Zeigt eine detaillierte Aufschlüsselung deiner voraussichtlichen SVS-Nachzahlung: quartalsweise Akkumulation, Risikobarometer und konkrete Handlungsempfehlungen zur rechtzeitigen Rücklagenbildung.',
      },
      {
        q: 'Jahresvergleich',
        a: 'Vergleicht deine Abgaben über 3 Steuerjahre (2024/2025/2026). So siehst du, wie sich gesetzliche Tarifänderungen auf deine SVS-Beiträge und Einkommensteuer auswirken — bei gleichem Gewinn.',
      },
      {
        q: 'KI-Steuerberater (AI Zusammenfassung)',
        a: 'Generiert eine KI-gestützte Analyse deiner Steuersituation mit konkreten Optimierungsvorschlägen in EUR-Beträgen. Basiert auf deinen aktuellen Eingaben und nutzt aktuelle österreichische Steuergesetze als Grundlage.',
      },
      {
        q: 'Datenexport (CSV)',
        a: 'Exportiert alle Berechnungsergebnisse als CSV-Datei (Semikolon-getrennt, Excel-kompatibel). Enthält Umsatz, Aufwände, SVS-Aufschlüsselung, Steuer, Nachzahlung und Steuer-Tipps.',
      },
      {
        q: 'Steuerreserve-Status & monatliche Rücklagen',
        a: 'Berechnet deine empfohlene monatliche Rücklage für SVS-Nachzahlungen, Einkommensteuer und Umsatzsteuer. Zeigt getrennte Aufschlüsselung (SVS, ESt, USt), 12-Monats-Aufbau-Timeline und Status (auf Kurs vs. Rücklage empfohlen). So vermeidest du die Nachzahlungsfalle.',
      },
    ],
  },
  {
    title: 'Konto & Abo',
    icon: <CreditCard className="h-4 w-4" />,
    items: [
      {
        q: 'Wie kann ich SteuerBoard Pro abonnieren?',
        a: 'Klicke auf „Upgraden" in der Seitenleiste oder auf einen „Jetzt freischalten"-Button. Du wirst zu Stripe weitergeleitet, wo du sicher per Kreditkarte oder SEPA-Lastschrift bezahlen kannst. Das Abo ist monatlich oder jährlich (20 % Rabatt) buchbar und jederzeit kündbar.',
      },
      {
        q: 'Kann ich mein Abo kündigen?',
        a: 'Ja, jederzeit mit einem Klick unter Profil → Abo verwalten. Du wirst zum Stripe-Kundenportal weitergeleitet. Nach Kündigung hast du noch bis zum Ende des bezahlten Zeitraums Zugriff auf Pro-Features. Keine versteckten Fristen, keine Kündigungsgebühren.',
      },
      {
        q: 'Sind meine Daten sicher?',
        a: 'Ja. Alle Daten werden verschlüsselt übertragen (HTTPS) und bei Supabase in der EU gespeichert (DSGVO-konform). Wir speichern keine Zahlungsdaten — die Zahlungsabwicklung läuft komplett über Stripe. Berechnungsdaten bleiben in deinem Browser und werden nur bei explizitem Speichern in der Datenbank abgelegt.',
      },
      {
        q: 'Gibt es einen Promo-Code für SteuerBoard Pro?',
        a: 'Ja. Promo-Codes für SteuerBoard Pro Vollzugang können im Profil unter „Code einlösen" eingegeben werden. Nach Einlösung wird der Pro-Plan sofort aktiviert. Promo-Codes sind einmalig und nicht übertragbar.',
      },
    ],
  },
]

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-expanded={isOpen}
        >
          <span className="text-sm font-medium">{item.q}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 pt-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.a}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function FaqContent() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Häufig gestellte Fragen
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Alles rund um SteuerBoard.pro, den SVS-Rechner, Pro-Features und dein
          Konto. Finde hier Antworten auf die wichtigsten Fragen.
        </p>
      </div>

      {/* FAQ sections */}
      <div className="space-y-6">
        {faqSections.map((section, sectionIndex) => (
          <div key={section.title} className="card-surface p-5 sm:p-6">
            {/* Section header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-muted-foreground">{section.icon}</span>
              <h2 className="text-[11px] font-semibold uppercase text-muted-foreground tracking-[0.08em]">
                {section.title}
              </h2>
            </div>

            {/* FAQ items */}
            <div className="divide-y divide-border/50">
              {section.items.map((item, itemIndex) => {
                const key = `${sectionIndex}-${itemIndex}`
                return (
                  <FaqAccordionItem
                    key={key}
                    item={item}
                    isOpen={openItems.has(key)}
                    onToggle={() => toggleItem(key)}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 pt-6 border-t text-sm text-muted-foreground">
        <p>
          Noch Fragen? Schreib uns an{' '}
          <a
            href="mailto:info@hypeakz.io"
            className="text-primary hover:underline"
          >
            info@hypeakz.io
          </a>
        </p>
      </div>
    </div>
  )
}

export default function FaqPage() {
  return (
    <AppShell>
      <FaqContent />
      <SiteFooter />
    </AppShell>
  )
}
