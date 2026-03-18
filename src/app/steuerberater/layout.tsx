import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'KI-Steuerberater — Steuerberatung per KI für Selbständige',
  description:
    'Frag den KI-Steuerberater von SteuerBoard.pro: SVS-Beiträge, Einkommensteuer, GmbH-Vergleich, Absetzbeträge und Steueroptimierung für österreichische Selbständige. Powered by Claude AI.',
  alternates: { canonical: '/steuerberater' },
  openGraph: {
    title: 'KI-Steuerberater — Steuerberatung per KI',
    description:
      'Sofortige Antworten auf Steuerfragen für Selbständige in Österreich. Mit 7 spezialisierten Rechnern.',
    url: '/steuerberater',
  },
}

export default function SteuerberaterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'KI-Steuerberater — SteuerBoard.pro',
        url: 'https://steuerboard.pro/steuerberater',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'KI-gestützter Steuerberater für österreichische Selbständige. Beantwortet Fragen zu SVS, Einkommensteuer, GmbH und Absetzbeträgen.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
