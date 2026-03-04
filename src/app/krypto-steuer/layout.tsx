import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Krypto-Steuer-Rechner Österreich 2026 — KESt berechnen',
  description:
    'Berechne deine Krypto-Steuern in Österreich: KESt 27,5% auf Neuvermögen, Altvermögen-Regeln, Staking & Mining. Mit Transaktions-Tabelle und FIFO-Methode.',
  alternates: { canonical: '/krypto-steuer' },
  openGraph: {
    title: 'Krypto-Steuer-Rechner Österreich 2026',
    description:
      'Kryptowährungen-Besteuerung in Österreich: Altvermögen vs. Neuvermögen, KESt 27,5%, Staking-Erträge. Kostenlos berechnen.',
    url: '/krypto-steuer',
  },
}

export default function KryptoSteuerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Krypto-Steuer-Rechner Österreich 2026',
        url: 'https://steuerboard.pro/krypto-steuer',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne deine Krypto-Steuern in Österreich: KESt 27,5% auf realisierte Gewinne, Altvermögen-Regeln und Staking.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
