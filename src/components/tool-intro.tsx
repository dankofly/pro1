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
 * Wird über die intro-Prop der AppShell in der Hauptspalte gerendert
 * (unbedingt, vor dem Auth-Gate, sonst fehlt der H1 im statischen HTML).
 * Design: Seitentitel direkt auf dem Canvas, wie in modernen Dashboards.
 * Kein eigener Kasten, keine Fläche: Typografie ordnet den Block der App
 * unter, der Rechner bleibt der Held der Seite.
 */
export function ToolIntro({ h1, children }: ToolIntroProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-5 sm:pt-6">
      <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
        {h1}
      </h1>
      <p className="mt-1 text-[13px] sm:text-sm text-muted-foreground leading-relaxed max-w-3xl [text-wrap:pretty]">
        {children}
      </p>
    </section>
  )
}
