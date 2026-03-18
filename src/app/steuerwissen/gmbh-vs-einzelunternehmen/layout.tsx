import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'GmbH oder Einzelunternehmen? — Der Steuer-Vergleich für Österreich',
  description: 'GmbH vs Einzelunternehmen in Österreich: Steuervergleich, Break-Even-Analyse und Entscheidungshilfe. Wann lohnt sich die GmbH-Gründung steuerlich?',
  keywords: ['GmbH vs Einzelunternehmen Österreich', 'GmbH gründen Österreich', 'Einzelunternehmen oder GmbH', 'KöSt vs ESt', 'Steueroptimierung Österreich'],
  alternates: {
    canonical: '/steuerwissen/gmbh-vs-einzelunternehmen'
  },
  openGraph: {
    title: 'GmbH oder Einzelunternehmen? — Der Steuer-Vergleich für Österreich',
    description: 'GmbH vs Einzelunternehmen in Österreich: Steuervergleich, Break-Even-Analyse und Entscheidungshilfe. Wann lohnt sich die GmbH-Gründung steuerlich?',
    type: 'article',
    url: '/steuerwissen/gmbh-vs-einzelunternehmen'
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "GmbH oder Einzelunternehmen? — Der Steuer-Vergleich für Österreich",
    "description": "GmbH vs Einzelunternehmen in Österreich: Steuervergleich, Break-Even-Analyse und Entscheidungshilfe. Wann lohnt sich die GmbH-Gründung steuerlich?",
    "author": {
      "@type": "Organization",
      "name": "Pro1 Steuerberatung"
    },
    "datePublished": "2024-03-18",
    "dateModified": "2024-03-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://pro1.at/steuerwissen/gmbh-vs-einzelunternehmen"
    }
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ab welchem Gewinn lohnt sich eine GmbH in Österreich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine GmbH lohnt sich steuerlich meist ab einem Jahresgewinn von 60.000-80.000 Euro, abhängig von der geplanten Ausschüttungspolitik und den SVS-Beiträgen des Einzelunternehmens."
        }
      },
      {
        "@type": "Question",
        "name": "Was sind die Hauptunterschiede zwischen GmbH und Einzelunternehmen bei der Besteuerung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Einzelunternehmen zahlen Einkommensteuer (progressiv 0-55%) plus SVS-Beiträge. GmbHs zahlen 23% Körperschaftsteuer plus 27,5% KESt auf Ausschüttungen, dafür ASVG-Beiträge für Geschäftsführer."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Kosten entstehen bei der GmbH-Gründung in Österreich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mindestkapital 35.000 Euro, Notariatskosten ca. 1.000-2.000 Euro, Firmenbucheintragung, plus laufende Kosten für Bilanzierung und Jahresabschluss."
        }
      }
    ]
  }

  return (
    <>
      <JsonLd data={articleData} />
      <JsonLd data={faqData} />
      {children}
    </>
  )
}