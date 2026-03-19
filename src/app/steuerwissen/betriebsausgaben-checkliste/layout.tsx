import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Betriebsausgaben Checkliste 2026 — Was Selbständige absetzen können | SteuerBoard',
  description: 'Vollständige Checkliste aller absetzbaren Betriebsausgaben für Selbständige in Österreich 2026. Arbeitsplatzpauschale, GWG-Grenze, Beispielrechnungen.',
  keywords: 'Betriebsausgaben Selbständige Liste, Was kann ich absetzen Selbständige, Betriebsausgaben Österreich, absetzbare Kosten EPU, Arbeitsplatzpauschale 2026',
  alternates: {
    canonical: '/steuerwissen/betriebsausgaben-checkliste'
  },
  openGraph: {
    title: 'Betriebsausgaben Checkliste 2026 — Was Selbständige absetzen können',
    description: 'Vollständige Checkliste aller absetzbaren Betriebsausgaben für Selbständige in Österreich 2026. Arbeitsplatzpauschale, GWG-Grenze, Beispielrechnungen.',
    type: 'article',
    publishedTime: '2026-03-19',
    modifiedTime: '2026-03-19',
    authors: ['SteuerBoard'],
    url: '/steuerwissen/betriebsausgaben-checkliste'
  }
}

export default function BetriebsausgabenChecklisteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Betriebsausgaben Checkliste 2026 — Was Selbständige absetzen können",
    "description": "Vollständige Checkliste aller absetzbaren Betriebsausgaben für Selbständige in Österreich 2026. Arbeitsplatzpauschale, GWG-Grenze, Beispielrechnungen.",
    "author": {
      "@type": "Organization",
      "name": "SteuerBoard",
      "url": "https://steuerboard.pro"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SteuerBoard",
      "url": "https://steuerboard.pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://steuerboard.pro/logo.png"
      }
    },
    "datePublished": "2026-03-19",
    "dateModified": "2026-03-19",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://steuerboard.pro/steuerwissen/betriebsausgaben-checkliste"
    },
    "articleSection": "Steuerwissen",
    "inLanguage": "de-AT",
    "about": {
      "@type": "Thing",
      "name": "Betriebsausgaben für Selbständige"
    }
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was sind die wichtigsten Betriebsausgaben für Selbständige?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die wichtigsten Betriebsausgaben für Selbständige umfassen: Arbeitsplatzpauschale (1.200 € oder 300 €), Büroausstattung, EDV-Kosten, Fahrzeugkosten (0,42 €/km), Versicherungen, Weiterbildung, Steuerberatung und Marketing. Diese können direkt von der Steuer abgesetzt werden."
        }
      },
      {
        "@type": "Question",
        "name": "Wie hoch ist die Arbeitsplatzpauschale 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Arbeitsplatzpauschale 2026 beträgt für Typ 1 (hohe Anforderungen) 1.200 € und für Typ 2 (niedrige Anforderungen) 300 €. Typ 1 gilt bei überwiegender Bürotätigkeit mit Computer und hohen fachlichen Anforderungen."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist die GWG-Grenze für Selbständige?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die GWG-Grenze (Geringwertige Wirtschaftsgüter) beträgt 1.000 € netto. Anschaffungen bis zu diesem Betrag können im Jahr der Anschaffung vollständig als Betriebsausgabe abgesetzt werden, ohne Abschreibung über mehrere Jahre."
        }
      },
      {
        "@type": "Question",
        "name": "Sind SVS-Beiträge als Betriebsausgabe absetzbar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, SVS-Beiträge (Sozialversicherung der Selbständigen) können als Betriebsausgabe abgesetzt werden. Dies umfasst sowohl die Kranken- als auch die Pensionsversicherungsbeiträge für Selbständige."
        }
      }
    ]
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  )
}