import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Preise – SVS Checker Plaene',
  description:
    'SVS Checker Preise: Kostenloser SVS-Beitragsrechner, Sicherheits-Plan ab 9,90 EUR/Monat, Pro ab 19,90 EUR/Monat. Monatlich kündbar.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'SVS Checker Preise – Starte kostenlos',
    description: 'Free, Sicherheits-Plan und Pro: Alle Features und Preise im Überblick.',
    url: '/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'SVS Checker',
        applicationCategory: 'FinanceApplication',
        offers: [
          {
            '@type': 'Offer',
            name: 'Free',
            price: '0',
            priceCurrency: 'EUR',
            description: 'SVS-Beitragsrechner und Wahrheits-Tabelle',
          },
          {
            '@type': 'Offer',
            name: 'Sicherheits-Plan',
            price: '9.90',
            priceCurrency: 'EUR',
            description: 'Einkommensteuer-Prognose, Berechnungen speichern, Dashboard',
          },
          {
            '@type': 'Offer',
            name: 'SVS Checker Pro',
            price: '19.90',
            priceCurrency: 'EUR',
            description: 'Misch-Einkommen, Familienbonus, Wasserfall-Analyse, PDF-Export',
          },
        ],
      }} />
      {children}
    </>
  )
}
