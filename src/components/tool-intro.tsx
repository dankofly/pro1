import type { ReactNode } from 'react'

interface ToolIntroProps {
  h1: string
  children: ReactNode
}

/**
 * Server-gerenderter SEO-Header für die Rechner-Seiten.
 * Liefert einen sichtbaren H1 plus Intro-Absatz bereits im statischen HTML,
 * damit Suchmaschinen und AI-Crawler den Seitenkontext ohne JS erfassen.
 *
 * Design: Teil des dunklen App-Rahmens. Gleiche Fläche wie die Sidebar,
 * dadurch bilden Header + Sidebar ein durchgehendes L-förmiges Chrome
 * statt eines weißen Fremdkörpers über der App.
 */
export function ToolIntro({ h1, children }: ToolIntroProps) {
  return (
    <section className="bg-sidebar border-b border-sidebar-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white [text-wrap:balance]">
          {h1}
        </h1>
        <p className="mt-1.5 text-[13px] sm:text-sm text-slate-400 leading-relaxed max-w-3xl [text-wrap:pretty]">
          {children}
        </p>
      </div>
    </section>
  )
}
