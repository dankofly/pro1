import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono, IBM_Plex_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { JsonLd } from '@/components/json-ld'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const ibmPlex = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = 'https://svs-checker.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SVS Checker – SVS-Beitragsrechner für Selbständige in Österreich',
    template: '%s | SVS Checker',
  },
  description:
    'Berechne in Sekunden deine SVS-Beiträge, Nachzahlung und dein echtes Netto als Selbständiger in Österreich. Kostenlos, DSGVO-konform, mit Werten für 2024–2026.',
  keywords: [
    'SVS Rechner', 'SVS Beitragsrechner', 'Sozialversicherung Selbständige',
    'SVS Nachzahlung berechnen', 'SVS Österreich', 'Selbständige Österreich',
    'Einkommensteuer Selbständige', 'Misch-Einkommen Rechner', 'Netto Rechner Selbständige',
  ],
  authors: [{ name: 'HYPEAKZ.IO', url: 'https://hypeakz.io' }],
  creator: 'HYPEAKZ.IO',
  publisher: 'HYPEAKZ.IO',
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: SITE_URL,
    siteName: 'SVS Checker',
    title: 'SVS Checker – SVS-Beitragsrechner für Selbständige in Österreich',
    description:
      'Berechne in Sekunden deine SVS-Beiträge, Nachzahlung und dein echtes Netto. Kostenlos starten, keine Registrierung nötig.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVS Checker – SVS-Beitragsrechner für Selbständige',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de-AT">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${ibmPlex.variable} antialiased min-h-screen`}>
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SVS Checker',
          url: SITE_URL,
          description: 'SVS-Beitragsrechner für Selbständige in Österreich',
          founder: {
            '@type': 'Person',
            name: 'Daniel Kofler',
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Thal-Aue 95',
            addressLocality: 'Assling',
            postalCode: '9911',
            addressCountry: 'AT',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'mail@danielkofler.com',
            telephone: '+43-676-7293888',
            contactType: 'customer service',
            availableLanguage: 'German',
          },
        }} />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
