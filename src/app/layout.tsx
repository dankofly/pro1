import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'SVS Checker – Dein SVS-Beitragsrechner',
  description: 'SVS-Beitragsrechner für Selbständige in Österreich. Berechne deine SVS-Nachzahlung und spare voraus.',
  keywords: ['SVS', 'Sozialversicherung', 'Selbständige', 'Österreich', 'Beitragsrechner', 'Nachzahlung'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-gray-50 min-h-screen">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
