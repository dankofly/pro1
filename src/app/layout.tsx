import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { JsonLd } from '@/components/json-ld'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  display: 'swap',
})

const SITE_URL = 'https://steuerboard.pro'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SteuerBoard.pro – Dein Steuer-Dashboard für Österreich',
    template: '%s | SteuerBoard.pro',
  },
  description:
    'Berechne in Sekunden deine SVS-Beiträge, Nachzahlung und dein echtes Netto als Selbständiger in Österreich. Kostenlos, DSGVO-konform, mit Werten für 2024–2026.',
  keywords: [
    'SVS Rechner', 'SVS Beitragsrechner', 'Sozialversicherung Selbständige',
    'SVS Nachzahlung berechnen', 'SVS Österreich', 'Selbständige Österreich',
    'Einkommensteuer Selbständige', 'Einkommensteuer Rechner Österreich',
    'Steuer Dashboard Selbständige', 'Netto Rechner Selbständige',
    'Gewinnfreibetrag Rechner', 'Steueroptimierung Selbständige Österreich',
    'Steuerrechner Österreich', 'Steuern sparen Selbständige',
    'Misch-Einkommen Rechner', 'Betriebsausgaben Selbständige',
    'FlexKapG vs GmbH', 'nebenberuflich selbständig Österreich',
  ],
  authors: [{ name: 'HYPEAKZ.IO', url: 'https://hypeakz.io' }],
  creator: 'HYPEAKZ.IO',
  publisher: 'HYPEAKZ.IO',
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: SITE_URL,
    siteName: 'SteuerBoard.pro',
    title: 'SteuerBoard.pro – Dein Steuer-Dashboard für Österreich',
    description:
      'Berechne in Sekunden deine SVS-Beiträge, Nachzahlung und dein echtes Netto. Kostenlos starten, keine Registrierung nötig.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SteuerBoard.pro – Dein Steuer-Dashboard für Selbständige',
    description:
      'SVS-Nachzahlung berechnen, Einkommensteuer-Prognose, echtes Netto. Für Selbständige in Österreich.',
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  verification: {
    google: 'eavZwmyiOqyF82f-KcVIpWQ0OH0b8-1UPYet0ulBTFY',
  },
  other: {
    'theme-color': '#0f172a',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de-AT" style={{ colorScheme: 'dark' }}>
      <body className={`${dmSans.variable} ${dmMono.variable} antialiased min-h-screen`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium">
          Zum Hauptinhalt springen
        </a>
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SteuerBoard.pro',
          url: SITE_URL,
          logo: `${SITE_URL}/icon`,
          description: 'AI-gestützte Steuerplattform für Selbständige in Österreich. SVS-Beitragsrechner, Einkommensteuer-Prognose, AI SteuerBoard und spezialisierte Steuerrechner.',
          foundingDate: '2024',
          founder: {
            '@type': 'Person',
            name: 'HYPEAKZ e.U.',
            jobTitle: 'Gründer',
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Thal-Aue 95',
            addressLocality: 'Assling',
            postalCode: '9911',
            addressRegion: 'Tirol',
            addressCountry: 'AT',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'info@hypeakz.io',
            telephone: '+43-676-7293888',
            contactType: 'customer service',
            availableLanguage: 'German',
          },
          areaServed: {
            '@type': 'Country',
            name: 'Austria',
          },
          knowsAbout: [
            'SVS-Beiträge',
            'Einkommensteuer Österreich',
            'Sozialversicherung Selbständige',
            'Steueroptimierung',
            'Gewinnfreibetrag',
            'Krypto-Steuer Österreich',
          ],
        }} />
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'SteuerBoard.pro',
          url: SITE_URL,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web',
          inLanguage: 'de-AT',
          description: 'AI-gestützte Steuerplattform für österreichische Selbständige. SVS-Beitragsrechner, Einkommensteuer-Prognose, AI SteuerBoard und 7 spezialisierte Steuerrechner.',
          featureList: [
            'SVS-Beitragsrechner',
            'SVS-Nachzahlungs-Prognose',
            'Einkommensteuer-Rechner',
            'AI SteuerBoard',
            'GmbH-Vergleich',
            'Krypto-Steuerrechner',
            'Misch-Einkommen-Rechner',
            'Investitionsfreibetrag-Rechner',
            'Sachbezug-Rechner',
            'PDF-Export',
          ],
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
              price: '12.90',
              priceCurrency: 'EUR',
              description: 'Einkommensteuer-Prognose, Berechnungen speichern, Dashboard',
              priceValidUntil: '2026-12-31',
            },
            {
              '@type': 'Offer',
              name: 'SteuerBoard Pro',
              price: '24.90',
              priceCurrency: 'EUR',
              description: 'Alle Rechner, AI SteuerBoard, PDF-Export, Misch-Einkommen',
              priceValidUntil: '2026-12-31',
            },
          ],
        }} />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
