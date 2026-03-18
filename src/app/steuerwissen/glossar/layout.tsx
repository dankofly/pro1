import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Steuer-Glossar Österreich — Alle Steuerbegriffe einfach erklärt',
  description: 'Österreichisches Steuer-Glossar: Über 40 Steuerbegriffe von A bis Z einfach erklärt. Von Absetzbeträge bis Werbungskosten.',
  openGraph: {
    title: 'Steuer-Glossar Österreich — Steuerbegriffe A-Z',
    description: 'Über 40 österreichische Steuerbegriffe einfach und verständlich erklärt.',
    url: '/steuerwissen/glossar'
  },
  alternates: {
    canonical: '/steuerwissen/glossar'
  }
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuer-Glossar Österreich — Alle Steuerbegriffe einfach erklärt',
  image: 'https://steuerboard.pro/opengraph-image',
  author: {
    '@type': 'Organization',
    name: 'SteuerBoard.pro',
    url: 'https://steuerboard.pro',
  },
  datePublished: '2026-03-18',
  dateModified: '2026-03-19',
  inLanguage: 'de-AT',
  publisher: {
    '@type': 'Organization',
    name: 'SteuerBoard.pro',
    url: 'https://steuerboard.pro',
    logo: {
      '@type': 'ImageObject',
      url: 'https://steuerboard.pro/icon',
    },
  },
  description: 'Über 40 österreichische Steuerbegriffe von A bis Z einfach erklärt.',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://steuerboard.pro/steuerwissen/glossar'
  },
  isAccessibleForFree: true,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      {children}
    </>
  )
}
