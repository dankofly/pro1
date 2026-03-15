'use client'

import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  location: string
  quote: string
  rating: number
  initials: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Markus W.',
    role: 'IT-Freelancer',
    location: 'Wien',
    quote:
      'Ich hab letztes Jahr \u20AC2.800 SVS nachzahlen m\u00FCssen, weil ich falsch kalkuliert hab. Mit SteuerBoard seh ich jetzt jeden Monat, was auf mich zukommt. Keine b\u00F6sen \u00DCberraschungen mehr.',
    rating: 5,
    initials: 'MW',
  },
  {
    name: 'Lisa K.',
    role: 'Grafikdesignerin',
    location: 'Graz',
    quote:
      'Endlich ein Tool, das Steuer nicht kompliziert macht. Ich geb meinen Umsatz ein und seh sofort, was mir netto bleibt. Besser als jeder Excel-Pfusch.',
    rating: 5,
    initials: 'LK',
  },
  {
    name: 'Thomas R.',
    role: 'Unternehmensberater',
    location: 'Linz',
    quote:
      'Als Berater mit Misch-Einkommen war die Steuerplanung immer ein Albtraum. SteuerBoard zeigt mir SVS, EST und Nachzahlung auf einen Blick. Spart mir den Steuerberater-Termin zwischendurch.',
    rating: 4,
    initials: 'TR',
  },
]

function AvatarFallback({ initials }: { initials: string }) {
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
      {initials}
    </div>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'fill-slate-700 text-slate-700'}`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-emerald-400 mb-2 tracking-wide uppercase">
            Beta-Tester Feedback
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Was Selbst&auml;ndige sagen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-colors"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 mb-6 flex-1 text-blue-200/70 text-[15px] leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <AvatarFallback initials={t.initials} />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-blue-200/50 text-xs">
                    {t.role} aus {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
            <p className="text-blue-200/50 text-sm mt-1">Berechnungen</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-white">98%</p>
            <p className="text-blue-200/50 text-sm mt-1">Genauigkeit</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">Made in Austria</p>
            <p className="text-blue-200/50 text-sm mt-1">F&uuml;r &ouml;sterreichisches Steuerrecht</p>
          </div>
        </div>
      </div>
    </section>
  )
}
