import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'FlexKapG vs. GmbH Österreich 2026 — Vergleich, Kosten & Vorteile',
  description: 'FlexKapG vs. GmbH in Österreich: Die neue Rechtsform im Detail verglichen. Kosten, Vorteile, Gründung und steuerliche Behandlung — alles was du wissen musst.',
  keywords: ['FlexKapG Gründung', 'FlexCo vs GmbH', 'FlexKapG Kosten', 'FlexKapG Vorteile', 'neue Rechtsform Österreich', 'FlexKapG Stammkapital', 'Flexible Kapitalgesellschaft'],
  alternates: {
    canonical: '/steuerwissen/flexkapg-vs-gmbh'
  },
  openGraph: {
    title: 'FlexKapG vs. GmbH Österreich 2026 — Vergleich, Kosten & Vorteile',
    description: 'FlexKapG vs. GmbH in Österreich: Die neue Rechtsform im Detail verglichen. Kosten, Vorteile, Gründung und steuerliche Behandlung — alles was du wissen musst.',
    type: 'article',
    url: '/steuerwissen/flexkapg-vs-gmbh'
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
    "headline": "FlexKapG vs. GmbH Österreich 2026 — Vergleich, Kosten & Vorteile",
    "description": "FlexKapG vs. GmbH in Österreich: Die neue Rechtsform im Detail verglichen. Kosten, Vorteile, Gründung und steuerliche Behandlung — alles was du wissen musst.",
    "image": "https://steuerboard.pro/opengraph-image",
    "author": {
      "@type": "Organization",
      "name": "SteuerBoard.pro",
      "url": "https://steuerboard.pro"
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
    "dateModified": "2026-03-19",
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
          "text": "Die FlexKapG benötigt nur 10.000 € Stammkapital statt 35.000 € bei der GmbH. Steuerlich sind beide identisch (23% KöSt, 27,5% KESt). Die FlexKapG bietet mehr Flexibilität bei Mitarbeiterbeteiligung und Anteilsübertragung."
        }
      },
      {
        "@type": "Question",
        "name": "Sind FlexKapG-Gründungskosten niedriger als bei der GmbH?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, FlexKapG-Gründungskosten betragen ca. 1.500-2.500 € plus 10.000 € Stammkapital. GmbH kostet ca. 2.000-3.000 € plus 35.000 € Stammkapital — insgesamt also 25.000 € weniger Startkapital."
        }
      },
      {
        "@type": "Question",
        "name": "Ist die FlexKapG für Startups besser als die GmbH?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, besonders für Startups mit Mitarbeiterbeteiligung. Die FlexKapG ermöglicht Unternehmenswert-Anteile ohne Notariatsakt und hat niedrigere Gründungskosten bei identischen Steuervorteilen."
        }
      },
      {
        "@type": "Question",
        "name": "Kann ich von einer GmbH zur FlexKapG wechseln?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine direkte Umwandlung ist nicht möglich. Du musst eine neue FlexKapG gründen und deine GmbH liquidieren oder eine Verschmelzung durchführen — das ist aufwendig und meist nicht sinnvoll."
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