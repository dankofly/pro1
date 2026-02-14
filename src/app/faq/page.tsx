'use client'

import { useState } from 'react'
import { AppShell } from '@/components/svs/app-shell'
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
        a: 'SteuerBoard.pro ist ein interaktiver Steuer- und SVS-Rechner speziell für österreichische Selbständige (Einzelunternehmer, Freiberufler, Gewerbetreibende). Du gibst deinen Umsatz und deine Aufwände ein und erhältst sofort eine detaillierte Berechnung deiner SVS-Beiträge, Einkommensteuer und deines echten Nettos.',
      },
      {
        q: 'Für wen ist SteuerBoard gedacht?',
        a: 'Für alle Selbständigen in Österreich, die bei der SVS (Sozialversicherung der Selbständigen) versichert sind: Gewerbetreibende (GSVG), Neue Selbständige (GSVG), Ärzte (FSVG) und Apotheker/Patentanwälte/Ziviltechniker (FSVG). Egal ob Jungunternehmer oder langjährig selbständig.',
      },
      {
        q: 'Wie aktuell sind die Berechnungen?',
        a: 'Die Steuertarife, SVS-Beitragssätze, Höchst- und Mindestbeitragsgrundlagen sowie Absetzbeträge werden jährlich aktualisiert. Derzeit sind die Daten für 2024, 2025 und 2026 hinterlegt. Alle Berechnungen basieren auf den aktuellen gesetzlichen Grundlagen (EStG, GSVG, FSVG).',
      },
      {
        q: 'Ersetzt SteuerBoard eine Steuerberatung?',
        a: 'Nein. SteuerBoard ist ein Planungs- und Orientierungstool. Es ersetzt keine professionelle Steuerberatung. Alle Berechnungen sind Richtwerte und erfolgen ohne Gewähr. Für verbindliche Auskünfte wende dich an einen Steuerberater.',
      },
    ],
  },
  {
    title: 'Rechner',
    icon: <Calculator className="h-4 w-4" />,
    items: [
      {
        q: 'Was berechnet der SVS-Rechner?',
        a: 'Der Rechner ermittelt auf Basis deines Gewinns (Umsatz minus Betriebsausgaben): deine SVS-Beiträge aufgeschlüsselt nach Pensionsversicherung, Krankenversicherung, Selbständigenvorsorge und Unfallversicherung, deine Einkommensteuer nach dem progressiven Steuertarif, dein echtes Netto nach Abzug aller Abgaben, sowie die voraussichtliche SVS-Nachzahlung.',
      },
      {
        q: 'Was bedeutet „Gewinn" im Rechner?',
        a: 'Dein Gewinn ist die Differenz zwischen Jahresumsatz (netto, ohne USt) und deinen Betriebsausgaben. Dieser Betrag bildet die Grundlage für die Berechnung deiner SVS-Beiträge (Beitragsgrundlage) und deiner Einkommensteuer.',
      },
      {
        q: 'Was ist die Beitragsgrundlage?',
        a: 'Die Beitragsgrundlage ist der Betrag, auf den deine SVS-Beiträge berechnet werden. Sie ergibt sich aus deinem Gewinn laut Einkommensteuerbescheid. Es gibt eine Mindestbeitragsgrundlage (ca. 500 EUR/Monat) und eine Höchstbeitragsgrundlage (ca. 7.070 EUR/Monat), zwischen denen sich deine Beiträge bewegen.',
      },
      {
        q: 'Was bedeutet „Nachzahlung"?',
        a: 'Die SVS berechnet deine Beiträge zunächst vorläufig \u2014 auf Basis deines Gewinns vor 3 Jahren. Wenn dein aktueller Gewinn höher ist, entsteht nach dem Steuerbescheid eine Nachzahlung. Diese kann bei stark steigendem Gewinn erheblich sein (die „Nachzahlungsfalle").',
      },
      {
        q: 'Wie wird die Einkommensteuer berechnet?',
        a: 'Die Einkommensteuer wird auf dein steuerpflichtiges Einkommen (Gewinn minus SVS-Beiträge minus Gewinnfreibetrag minus Absetzbeträge) nach dem progressiven Tarif berechnet: 0% bis 12.816 EUR, 20% bis 20.818 EUR, 30% bis 34.513 EUR, 40% bis 66.612 EUR, 48% bis 99.266 EUR, 50% bis 1 Mio. EUR, 55% darüber.',
      },
      {
        q: 'Was ist der Grenzsteuersatz vs. Durchschnittssteuersatz?',
        a: 'Der Grenzsteuersatz ist der Steuersatz, mit dem dein nächster verdienter Euro besteuert wird. Der Durchschnittssteuersatz ist der tatsächliche Anteil deines Einkommens, der an Steuern abgeht. Beispiel: Bei 40.000 EUR Gewinn liegt der Grenzsteuersatz bei 40%, der Durchschnittssteuersatz aber nur bei ca. 15%.',
      },
    ],
  },
  {
    title: 'Pro-Features',
    icon: <Crown className="h-4 w-4" />,
    items: [
      {
        q: 'Was bringt SteuerBoard Pro?',
        a: 'Pro schaltet erweiterte Eingabemöglichkeiten und Analysewerkzeuge frei: Pauschalierung (5 Arten), Investitionen & AfA, GmbH-Vergleich, Gewinnmaximierer, weitere Einkünfte (Misch-Einkommen), Steuer-Optimierung (Familienbonus, Pendlerpauschale, AVAB), sowie 6 Pro-Werkzeuge (PDF-Report, Nachzahlungs-Prognose, Jahresvergleich, AI-Zusammenfassung, CSV-Export, Steuerreserve-Status).',
      },
      {
        q: 'Pauschalierung \u2014 Was ist das?',
        a: 'Bei der Pauschalierung werden deine Betriebsausgaben nicht einzeln nachgewiesen, sondern pauschal als Prozentsatz des Umsatzes angesetzt. Verfügbare Arten: Basispauschalierung 12% (bis 220.000 EUR Umsatz), Basispauschalierung 6% (für bestimmte Berufe), Kleinunternehmer-Pauschalierung 45% (produzierend, bis 35.000 EUR) oder 20% (Dienstleistung, bis 35.000 EUR).',
      },
      {
        q: 'Investitionen & AfA \u2014 Wie funktioniert die Abschreibung?',
        a: 'Betriebliche Anschaffungen über 1.000 EUR werden über die Nutzungsdauer abgeschrieben (AfA): Einrichtung 8 Jahre, EDV 4 Jahre, Maschinen 8 Jahre. Du kannst zwischen linearer und degressiver Abschreibung wählen. Geringwertige Wirtschaftsgüter (GWG) unter 1.000 EUR sind sofort voll absetzbar. Zusätzlich gibt es den investitionsbedingten Gewinnfreibetrag (IFB).',
      },
      {
        q: 'GmbH-Vergleich \u2014 Wann lohnt sich eine GmbH?',
        a: 'Der GmbH-Vergleich zeigt dir ab welchem Gewinn eine GmbH-Struktur steuerlich vorteilhafter sein könnte. Bei einer GmbH fällt 23% Körperschaftsteuer an, plus 27,5% KESt auf Ausschüttungen. Für den Geschäftsführer gelten ASVG-Beiträge statt SVS. Typischerweise lohnt sich eine GmbH ab ca. 60.000-80.000 EUR Gewinn \u2014 der genaue Break-Even hängt von deiner individuellen Situation ab.',
      },
      {
        q: 'Gewinnmaximierer \u2014 Was zeigt er?',
        a: 'Der Gewinnmaximierer simuliert einen Zusatzauftrag. Du gibst zusätzliche Einnahmen und die dazugehörigen Kosten ein und siehst sofort, wie viel davon netto bei dir ankommt. So erkennst du deinen effektiven Steuersatz auf den Zusatzverdienst.',
      },
      {
        q: 'Steuer-Optimierung \u2014 Welche Absetzbeträge gibt es?',
        a: 'Familienbonus Plus (für Kinder unter und über 18), Alleinverdiener-/Alleinerzieherabsetzbetrag (AVAB/AEAB), und Pendlerpauschale (abhängig von Entfernung und Öffi-Zumutbarkeit). Diese werden direkt von deiner Steuerschuld abgezogen und können deine Einkommensteuer deutlich reduzieren.',
      },
    ],
  },
  {
    title: 'Pro-Werkzeuge',
    icon: <Wrench className="h-4 w-4" />,
    items: [
      {
        q: 'Steuerberater-Report (PDF)',
        a: 'Exportiert eine kompakte Zusammenfassung deiner SVS-, Steuer- und Prognosedaten als PDF. Ideal zur Vorbereitung auf das Gespräch mit deinem Steuerberater oder für deine Unterlagen.',
      },
      {
        q: 'Nachzahlungs-Prognose',
        a: 'Zeigt dir eine detaillierte Aufschlüsselung deiner voraussichtlichen SVS-Nachzahlung: Quartalsweise Akkumulation, Risikobarometer und konkrete Handlungsempfehlungen.',
      },
      {
        q: 'Jahresvergleich',
        a: 'Vergleicht deinen Gewinn über 3 Steuerjahre (2024/2025/2026). So siehst du, wie sich Tarifänderungen auf deine Abgaben auswirken \u2014 bei gleichem Gewinn.',
      },
      {
        q: 'AI Zusammenfassung',
        a: 'Generiert eine KI-gestützte Analyse deiner Steuersituation mit konkreten Optimierungsvorschlägen. Basiert auf deinen aktuellen Eingaben und nutzt aktuelle österreichische Steuergesetze als Grundlage. Limit: 10 Analysen pro Tag.',
      },
      {
        q: 'Datenexport (CSV)',
        a: 'Exportiert alle Berechnungsergebnisse als CSV-Datei (Semikolon-getrennt, Excel-kompatibel). Enthält Umsatz, Aufwände, SVS-Aufschlüsselung, Steuer, Nachzahlung und Steuer-Tipps.',
      },
      {
        q: 'Steuerreserve-Status',
        a: 'Berechnet deine empfohlene monatliche Rücklage für SVS-Nachzahlungen und Einkommensteuer. Zeigt Aufschlüsselung (SVS vs. ESt), 12-Monats-Aufbau-Timeline und Status (auf Kurs vs. Rücklage empfohlen).',
      },
    ],
  },
  {
    title: 'Konto & Abo',
    icon: <CreditCard className="h-4 w-4" />,
    items: [
      {
        q: 'Wie kann ich SteuerBoard Pro abonnieren?',
        a: 'Klicke auf „Pro-Vorteile" in der Seitenleiste oder auf einen beliebigen „Jetzt freischalten"-Button. Du wirst zu Stripe weitergeleitet, wo du sicher per Kreditkarte oder SEPA-Lastschrift bezahlen kannst. Das Abo verlängert sich monatlich und ist jederzeit kündbar.',
      },
      {
        q: 'Kann ich mein Abo kündigen?',
        a: 'Ja, jederzeit. Gehe in dein Profil und klicke auf „Abo verwalten". Du wirst zum Stripe-Kundenportal weitergeleitet, wo du dein Abo kündigen oder deine Zahlungsmethode ändern kannst. Nach Kündigung hast du noch bis zum Ende der bezahlten Periode Zugriff auf Pro-Features.',
      },
      {
        q: 'Sind meine Daten sicher?',
        a: 'Ja. Deine Daten werden verschlüsselt übertragen (HTTPS) und bei Supabase in der EU gespeichert. Wir speichern keine Zahlungsdaten \u2014 die Zahlungsabwicklung läuft komplett über Stripe. Deine Berechnungsdaten bleiben in deinem Browser und werden nur bei explizitem Speichern in der Datenbank abgelegt.',
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
            href="mailto:mail@danielkofler.com"
            className="text-primary hover:underline"
          >
            mail@danielkofler.com
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
    </AppShell>
  )
}
