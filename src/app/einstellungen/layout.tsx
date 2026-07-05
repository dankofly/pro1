import type { Metadata } from 'next'

// App-/Account-Flow, keine SEO-Landingpage: aus dem Index halten.
// Gilt auch für die Unterroute /einstellungen/wizard.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function EinstellungenLayout({ children }: { children: React.ReactNode }) {
  return children
}
