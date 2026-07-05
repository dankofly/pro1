import type { ReactNode } from 'react'

interface ToolIntroProps {
  h1: string
  children: ReactNode
}

/**
 * Server-gerenderter SEO-Header für die Rechner-Seiten.
 * Liefert einen sichtbaren H1 plus Intro-Absatz bereits im statischen HTML,
 * damit Suchmaschinen und AI-Crawler den Seitenkontext ohne JS erfassen.
 */
export function ToolIntro({ h1, children }: ToolIntroProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {h1}
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mt-2 leading-relaxed">
        {children}
      </p>
    </section>
  )
}
