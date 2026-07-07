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
 * Design: dockt als kompakte Kopfzeile an das App-Chrome an (gleiche Fläche,
 * Haarlinie unten). Der Rechner ist der Held der Seite, dieser Block ordnet
 * sich unter: Titel mit Gewicht statt Größe, Intro gedämpft und zweizeilig.
 */
export function ToolIntro({ h1, children }: ToolIntroProps) {
  return (
    <section className="bg-[hsl(var(--surface))] border-b border-border/40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
          {h1}
        </h1>
        <p className="mt-1 text-[13px] sm:text-sm text-muted-foreground leading-relaxed max-w-4xl [text-wrap:pretty]">
          {children}
        </p>
      </div>
    </section>
  )
}
