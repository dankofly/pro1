import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Sachbezug Rechner 2026 — PKW Sachbezug & CO2-Grenzwert berechnen',
  description:
    'Sachbezug Rechner 2026: PKW-Sachbezug nach CO2-Grenzwert berechnen. 1,5% oder 2% vom Listenpreis, Deckelung und E-Auto-Vorteil.',
  alternates: { canonical: '/sachbezug-rechner' },
  openGraph: {
    title: 'Sachbezug Rechner 2026 — PKW Sachbezug & CO2-Grenzwert berechnen',
    description:
      'Sachbezug Rechner 2026: PKW-Sachbezug nach CO2-Grenzwert berechnen. 1,5% oder 2% vom Listenpreis, Deckelung und E-Auto-Vorteil.',
    url: '/sachbezug-rechner',
  },
}

export default function SachbezugLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Sachbezug-Rechner Österreich 2026',
        url: 'https://steuerboard.pro/sachbezug-rechner',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne Sachbezugswerte für Firmenwagen, Essensgutscheine und steuerfreie Mitarbeiter-Benefits in Österreich.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
