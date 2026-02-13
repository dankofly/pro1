import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von SteuerBoard.pro (HYPEAKZ.IO). Angaben gemäß ECG und MedienG.',
  alternates: { canonical: '/impressum' },
}

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
