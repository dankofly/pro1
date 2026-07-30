import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'FlexKapG vs. GmbH Österreich 2026: Vergleich, Kosten & Vorteile',
  description: 'FlexKapG vs. GmbH in Österreich: Die neue Rechtsform im Detail verglichen. Kosten, Vorteile, Gründung und steuerliche Behandlung — alles was du wissen musst.',
  keywords: ['FlexKapG Gründung', 'FlexCo vs GmbH', 'FlexKapG Kosten', 'FlexKapG Vorteile', 'neue Rechtsform Österreich', 'FlexKapG Stammkapital', 'Flexible Kapitalgesellschaft'],
  alternates: {
    canonical: '/steuerwissen/flexkapg-vs-gmbh'
  },
  openGraph: {
    title: 'FlexKapG vs. GmbH Österreich 2026: Vergleich, Kosten & Vorteile',
    description: 'FlexKapG vs. GmbH in Österreich: Die neue Rechtsform im Detail verglichen. Kosten, Vorteile, Gründung und steuerliche Behandlung — alles was du wissen musst.',
    type: 'article',
    url: '/steuerwissen/flexkapg-vs-gmbh'
  }
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://steuerboard.pro/' },
    { '@type': 'ListItem', position: 2, name: 'Steuerwissen', item: 'https://steuerboard.pro/steuerwissen' },
    { '@type': 'ListItem', position: 3, name: 'FlexKapG vs. GmbH', item: 'https://steuerboard.pro/steuerwissen/flexkapg-vs-gmbh' },
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
    "headline": "FlexKapG vs. GmbH Österreich 2026 — Vergleich, Kosten & Vorteile",
    "description": "FlexKapG vs. GmbH in Österreich: Die neue Rechtsform im Detail verglichen. Kosten, Vorteile, Gründung und steuerliche Behandlung — alles was du wissen musst.",
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
    "datePublished": "2026-03-19",
    "dateModified": "2026-07-30",
    "inLanguage": "de-AT",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://steuerboard.pro/steuerwissen/flexkapg-vs-gmbh"
    }
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist der Hauptunterschied zwischen FlexKapG und GmbH?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GmbH und FlexKapG benötigen seit 2024 dasselbe Mindeststammkapital von 10.000 €. Steuerlich sind beide identisch (23% KöSt, 27,5% KESt). Die FlexKapG bietet mehr Flexibilität bei Mitarbeiterbeteiligung durch Unternehmenswert-Anteile und Anteilsübertragung per notarieller oder anwaltlicher Privaturkunde statt Notariatsakt."
        }
      },
      {
        "@type": "Question",
        "name": "Sind FlexKapG-Gründungskosten niedriger als bei der GmbH?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kaum. Für beide gilt seit 2024 das Mindeststammkapital von 10.000 €; Beratungs- und Notarkosten liegen laut WKO-Schätzung bei ca. 2.000-3.000 €. Die FlexKapG kann wegen der flexibleren Satzungsgestaltung im Einzelfall sogar etwas teurer sein."
        }
      },
      {
        "@type": "Question",
        "name": "Ist die FlexKapG für Startups besser als die GmbH?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, besonders für Startups mit Mitarbeiterbeteiligung. Die FlexKapG ermöglicht Unternehmenswert-Anteile und den Steueraufschub der Start-Up-Mitarbeiterbeteiligung (§ 67a EStG) bei identischen Steuervorteilen."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich von einer GmbH zur FlexKapG wechseln?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, die Umwandlung einer GmbH in eine FlexKapG (und umgekehrt) ist gesetzlich ausdrücklich vorgesehen. Erforderlich sind ein Generalversammlungsbeschluss und die Anpassung des Gesellschaftsvertrags; eine Liquidation oder Verschmelzung ist nicht nötig."
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