import { Navbar } from '@/components/landing/landing-client'

/**
 * Rahmen für alle öffentlichen Unterseiten: Charcoal-Hintergrund (sb-Palette),
 * schwebende Pill-Navbar der Landingpage und der sb-scope, der die
 * shadcn-Variablen auf das Charcoal-Design mappt (siehe globals.css).
 * pt gleicht die fixe Navbar aus. Footer rendern die Seiten selbst.
 */
export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="sb-scope min-h-screen bg-sb-bg pt-24 text-sb-text">
      <Navbar />
      {children}
    </div>
  )
}
