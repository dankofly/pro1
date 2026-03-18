import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Krypto-Steuer Österreich 2026 — Bitcoin, Ethereum & Co. richtig versteuern',
  description: 'Kryptowährungen in Österreich versteuern: KESt 27,5%, Altbestand vs Neubestand, Staking, Mining, NFTs, Verlustausgleich und E1kv-Formular erklärt.',
  openGraph: {
    title: 'Krypto-Steuer Österreich 2026 — Bitcoin & Co. versteuern',
    description: 'KESt 27,5% auf Krypto-Gewinne, Altbestand-Regelung, Staking, Mining und Verlustausgleich.',
    url: '/steuerwissen/krypto-steuer-oesterreich'
  },
  alternates: {
    canonical: '/steuerwissen/krypto-steuer-oesterreich'
  }
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Krypto-Steuer Österreich 2026 — Bitcoin, Ethereum & Co. richtig versteuern',
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
  description: 'Kompletter Guide zur Besteuerung von Kryptowährungen in Österreich seit der ökosozialen Steuerreform.',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://steuerboard.pro/steuerwissen/krypto-steuer-oesterreich'
  },
  isAccessibleForFree: true,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wie werden Kryptowährungen in Österreich besteuert?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Seit März 2022 unterliegen Krypto-Gewinne der KESt von 27,5%. Das gilt für realisierte Kursgewinne, Tausch von Krypto in Fiat oder andere Krypto, und laufende Einkünfte wie Staking oder Mining.'
      }
    },
    {
      '@type': 'Question',
      name: 'Was ist der Unterschied zwischen Altbestand und Neubestand bei Krypto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Altbestand sind Kryptowährungen, die vor dem 1. März 2021 angeschafft wurden. Diese konnten bis Februar 2022 nach alter Regelung (Spekulationsfrist 1 Jahr) steuerfrei verkauft werden. Neubestand unterliegt immer der 27,5% KESt.'
      }
    },
    {
      '@type': 'Question',
      name: 'Ist Krypto-Staking in Österreich steuerpflichtig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Staking-Rewards sind als laufende Einkünfte mit 27,5% KESt steuerpflichtig. Die Besteuerung erfolgt zum Zeitpunkt des Zuflusses basierend auf dem aktuellen Marktwert.'
      }
    },
    {
      '@type': 'Question',
      name: 'Kann ich Krypto-Verluste steuerlich geltend machen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Verluste aus Kryptowährungen können mit Gewinnen aus anderen Kryptowährungen und bestimmten Kapitalerträgen (z.B. Aktien, Anleihen) im selben Jahr gegengerechnet werden.'
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
