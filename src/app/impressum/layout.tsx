import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von SVS Checker (HYPEAKZ.IO). Angaben gemaess ECG und MedienG.',
  alternates: { canonical: '/impressum' },
}

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
