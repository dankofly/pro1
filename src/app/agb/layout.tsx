import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGB – Allgemeine Geschäftsbedingungen',
  description: 'Allgemeine Geschäftsbedingungen von SteuerBoard.pro (HYPEAKZ.IO). Haftungsausschluss für Rechner, KI-Inhalte und Daten.',
  alternates: { canonical: '/agb' },
}

export default function AGBLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
