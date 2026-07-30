import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Nebenberuflich selbständig in Österreich 2026: Steuern, SVS & Tipps',
  description: 'Nebenberuflich selbständig in Österreich: SVS-Pflicht, Steuerberechnung bei Mischeinkommen, Meldepflichten und typische Fehler. Alles was du 2026 wissen musst.',
  keywords: ['nebenberuflich selbständig Österreich', 'selbständig neben Anstellung Steuer', 'SVS nebenberuflich', 'Nebeneinkünfte Selbständige', 'Mischeinkommen Steuer'],
  alternates: { canonical: '/steuerwissen/nebenberuflich-selbstaendig' },
  openGraph: {
    title: 'Nebenberuflich selbständig in Österreich 2026: Steuern, SVS & Tipps',
    description: 'Nebenberuflich selbständig: SVS-Pflicht, Steuerberechnung, Meldepflichten und Fehler vermeiden.',
    type: 'article',
    url: '/steuerwissen/nebenberuflich-selbstaendig',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nebenberuflich selbständig in Österreich 2026: Steuern, SVS & Tipps',
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
  "dateModified": "2026-07-30",
  "inLanguage": "de-AT",
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
        "text": "Als Neuer Selbständiger bist du pflichtversichert, sobald deine Einkünfte aus selbständiger Tätigkeit 6.613,20 € pro Jahr (2026) überschreiten. Mit Gewerbeschein bist du ab der Gewerbeanmeldung pflichtversichert; eine Ausnahme gibt es nur auf Antrag. Bei niedrigeren Einkünften kannst du dich freiwillig versichern."
      }
    },
    {
      "@type": "Question",
      "name": "Ab welchem Nebeneinkommen muss ich eine Steuererklärung machen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als Arbeitnehmer musst du bei über 730 € jährlichen Einkünften aus selbständiger Tätigkeit eine Pflichtveranlagung (Steuererklärung) abgeben (Veranlagungsfreibetrag, Einschleifregelung bis 1.460 €). Darunter ist es freiwillig."
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
        "text": "Das kommt auf die Tätigkeit an. Nur echte freie Tätigkeiten (Vortragende, Autoren, Künstler, Wissenschaft) brauchen keinen Gewerbeschein. IT-Dienstleistung, Webdesign und Grafik sind freie Gewerbe mit Anmeldepflicht, Coaching ist reglementiert. Bei Unsicherheit bei der WKO nachfragen."
      }
    }
  ]
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://steuerboard.pro/' },
    { '@type': 'ListItem', position: 2, name: 'Steuerwissen', item: 'https://steuerboard.pro/steuerwissen' },
    { '@type': 'ListItem', position: 3, name: 'Nebenberuflich selbständig', item: 'https://steuerboard.pro/steuerwissen/nebenberuflich-selbstaendig' },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  )
}