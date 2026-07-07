import type { Metadata } from 'next'

// Kauf-Erfolgsseite (session-gebunden), keine SEO-Landingpage.
export const metadata: Metadata = {
  title: 'Dein SVS-Rücklagenplan',
  robots: { index: false, follow: false },
}

export default function RuecklagenplanLayout({ children }: { children: React.ReactNode }) {
  return children
}
