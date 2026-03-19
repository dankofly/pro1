import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Nebenberuflich selbständig in Österreich 2026 — Steuern, SVS & Tipps',
  description: 'Nebenberuflich selbständig in Österreich: SVS-Pflicht, Steuerberechnung bei Mischeinkommen, Meldepflichten und typische Fehler. Alles was du 2026 wissen musst.',
  keywords: ['nebenberuflich selbständig Österreich', 'selbständig neben Anstellung Steuer', 'SVS nebenberuflich', 'Nebeneinkünfte Selbständige', 'Mischeinkommen Steuer'],
  alternates: { canonical: '/steuerwissen/nebenberuflich-selbstaendig' },
  openGraph: {
    title: 'Nebenberuflich selbständig in Österreich 2026 — Steuern, SVS & Tipps',
    description: 'Nebenberuflich selbständig: SVS-Pflicht, Steuerberechnung, Meldepflichten und Fehler vermeiden.',
    type: 'article',
    url: '/steuerwissen/nebenberuflich-selbstaendig',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nebenberuflich selbständig in Österreich 2026 — Steuern, SVS & Tipps',
    description: 'SVS-Pflicht, Steuerberechnung, Meldepflichten bei nebenberuflicher Selbständigkeit.',
  },
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://steuerboard.pro/steuerwissen/nebenberuflich-selbstaendig#article",
  "headline": "Nebenberuflich selbständig in Österreich 2026 — Steuern, SVS & Tipps",
  "description": "Nebenberuflich selbständig in Österreich: SVS-Pflicht, Steuerberechnung bei Mischeinkommen, Meldepflichten und typische Fehler vermeiden.",
  "image": "https://steuerboard.pro/opengraph-image",
  "datePublished": "2026-03-19",
  "dateModified": "2026-03-19",
  "inLanguage": "de-AT",
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
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://steuerboard.pro/steuerwissen/nebenberuflich-selbstaendig"
  },
  "articleSection": "Steuerwissen",
  "keywords": "nebenberuflich selbständig Österreich, SVS nebenberuflich, Mischeinkommen",
  "isAccessibleForFree": true
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://steuerboard.pro/steuerwissen/nebenberuflich-selbstaendig#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Muss ich als nebenberuflich Selbständiger zur SVS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, sobald deine Einkünfte aus selbständiger Tätigkeit 6.221,28 € pro Jahr überschreiten, bist du pflichtversichert bei der SVS. Bei niedrigeren Einkünften kannst du dich freiwillig versichern."
      }
    },
    {
      "@type": "Question",
      "name": "Ab welchem Nebeneinkommen muss ich eine Steuererklärung machen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als Arbeitnehmer musst du ab 730 € jährlichen Einkünften aus selbständiger Tätigkeit eine Pflichtveranlagung (Steuererklärung) abgeben. Darunter ist es freiwillig."
      }
    },
    {
      "@type": "Question",
      "name": "Wie wird Mischeinkommen aus Anstellung und Selbständigkeit besteuert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle Einkünfte werden zusammengerechnet und mit dem progressiven Einkommensteuertarif besteuert. Dabei kann der Grenzsteuersatz auf die selbständigen Einkünfte höher sein als bei der Anstellung."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich nebenberuflich selbständig sein ohne Gewerbeschein?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das kommt auf die Tätigkeit an. Freiberufliche Tätigkeiten (Beratung, IT, Kunst) brauchen keinen Gewerbeschein. Gewerbliche Tätigkeiten schon. Bei Unsicherheit bei der WKO nachfragen."
      }
    }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  )
}