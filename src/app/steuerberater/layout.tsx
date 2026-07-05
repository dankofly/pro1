import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'AI SteuerBoard — KI-gestützter Steuer-Assistent für Selbständige',
  description:
    'Frag den AI SteuerBoard von SteuerBoard.pro: SVS-Beiträge, Einkommensteuer, GmbH-Vergleich, Absetzbeträge und Steueroptimierung für österreichische Selbständige. Orientierung auf Basis deiner Eingaben, keine Steuerberatung. Powered by Google Gemini.',
  alternates: { canonical: '/steuerberater' },
  openGraph: {
    title: 'AI SteuerBoard — KI-gestützter Steuer-Assistent',
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
        name: 'AI SteuerBoard — SteuerBoard.pro',
        url: 'https://steuerboard.pro/steuerberater',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'KI-gestützter Steuer-Assistent für österreichische Selbständige. Beantwortet Fragen zu SVS, Einkommensteuer, GmbH und Absetzbeträgen. Keine Steuerberatung im Sinne des WTBG.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
