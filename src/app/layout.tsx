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
    default: 'SVS Checker – SVS-Beitragsrechner fuer Selbstaendige in Oesterreich',
    template: '%s | SVS Checker',
  },
  description:
    'Berechne in Sekunden deine SVS-Beitraege, Nachzahlung und dein echtes Netto als Selbstaendiger in Oesterreich. Kostenlos, DSGVO-konform, mit Werten fuer 2024–2026.',
  keywords: [
    'SVS Rechner', 'SVS Beitragsrechner', 'Sozialversicherung Selbstaendige',
    'SVS Nachzahlung berechnen', 'SVS Oesterreich', 'Selbstaendige Oesterreich',
    'Einkommensteuer Selbstaendige', 'Misch-Einkommen Rechner', 'Netto Rechner Selbstaendige',
  ],
  authors: [{ name: 'HYPEAKZ.IO', url: 'https://hypeakz.io' }],
  creator: 'HYPEAKZ.IO',
  publisher: 'HYPEAKZ.IO',
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: SITE_URL,
    siteName: 'SVS Checker',
    title: 'SVS Checker – SVS-Beitragsrechner fuer Selbstaendige in Oesterreich',
    description:
      'Berechne in Sekunden deine SVS-Beitraege, Nachzahlung und dein echtes Netto. Kostenlos starten, keine Registrierung noetig.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVS Checker – SVS-Beitragsrechner fuer Selbstaendige',
    description:
      'SVS-Nachzahlung berechnen, Einkommensteuer-Prognose, echtes Netto. Fuer Selbstaendige in Oesterreich.',
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
          description: 'SVS-Beitragsrechner fuer Selbstaendige in Oesterreich',
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
