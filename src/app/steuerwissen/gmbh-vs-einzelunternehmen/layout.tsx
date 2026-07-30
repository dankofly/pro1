import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'GmbH oder Einzelunternehmen?: Der Steuer-Vergleich für Österreich',
  description: 'GmbH vs Einzelunternehmen in Österreich: Steuervergleich, Break-Even-Analyse und Entscheidungshilfe. Wann lohnt sich die GmbH-Gründung steuerlich?',
  keywords: ['GmbH vs Einzelunternehmen Österreich', 'GmbH gründen Österreich', 'Einzelunternehmen oder GmbH', 'KöSt vs ESt', 'Steueroptimierung Österreich'],
  alternates: {
    canonical: '/steuerwissen/gmbh-vs-einzelunternehmen'
  },
  openGraph: {
    title: 'GmbH oder Einzelunternehmen?: Der Steuer-Vergleich für Österreich',
    description: 'GmbH vs Einzelunternehmen in Österreich: Steuervergleich, Break-Even-Analyse und Entscheidungshilfe. Wann lohnt sich die GmbH-Gründung steuerlich?',
    type: 'article',
    url: '/steuerwissen/gmbh-vs-einzelunternehmen'
  }
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://steuerboard.pro/' },
    { '@type': 'ListItem', position: 2, name: 'Steuerwissen', item: 'https://steuerboard.pro/steuerwissen' },
    { '@type': 'ListItem', position: 3, name: 'GmbH vs. Einzelunternehmen', item: 'https://steuerboard.pro/steuerwissen/gmbh-vs-einzelunternehmen' },
  ],
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
    "image": "https://steuerboard.pro/opengraph-image",
    "author": {
      "@type": "Person",
      "name": "Daniel Kofler",
      "jobTitle": "Gründer SteuerBoard.pro",
      "url": "https://steuerboard.pro/impressum"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SteuerBoard.pro",
      "url": "https://steuerboard.pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://steuerboard.pro/icon"
      }
    },
    "datePublished": "2026-03-18",
    "dateModified": "2026-07-30",
    "inLanguage": "de-AT",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://steuerboard.pro/steuerwissen/gmbh-vs-einzelunternehmen"
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
          "text": "Eine GmbH lohnt sich steuerlich in Modellrechnungen meist ab einem Jahresgewinn von 60.000-80.000 Euro, abhängig von der geplanten Ausschüttungspolitik und den SVS-Beiträgen des Einzelunternehmens."
        }
      },
      {
        "@type": "Question",
        "name": "Was sind die Hauptunterschiede zwischen GmbH und Einzelunternehmen bei der Besteuerung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Einzelunternehmen zahlen Einkommensteuer (progressiv 0-55%) plus SVS-Beiträge. GmbHs zahlen 23% Körperschaftsteuer plus 27,5% KESt auf Ausschüttungen. Gesellschafter-Geschäftsführer sind bis 25% Beteiligung ASVG-versichert, darüber in der Regel GSVG-pflichtig."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Kosten entstehen bei der GmbH-Gründung in Österreich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mindeststammkapital 10.000 Euro (davon 5.000 Euro bar einzuzahlen), Notar- und Firmenbuchkosten ca. 2.000-3.500 Euro, plus laufende Kosten für Bilanzierung, Jahresabschluss und Mindest-KöSt von 500 Euro pro Jahr."
        }
      }
    ]
  }

  return (
    <>
      <JsonLd data={articleData} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqData} />
      {children}
    </>
  )
}