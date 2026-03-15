'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  name: string
  role: string
  location: string
  quote: string
  rating: number
  image?: string
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
    image: '/images/testimonials/markus.webp',
    initials: 'MW',
  },
  {
    name: 'Lisa K.',
    role: 'Grafikdesignerin',
    location: 'Graz',
    quote:
      'Endlich ein Tool, das Steuer nicht kompliziert macht. Ich geb meinen Umsatz ein und seh sofort, was mir netto bleibt. Besser als jeder Excel-Pfusch.',
    rating: 5,
    image: '/images/testimonials/lisa.webp',
    initials: 'LK',
  },
  {
    name: 'Thomas R.',
    role: 'Unternehmensberater',
    location: 'Linz',
    quote:
      'Als Berater mit Misch-Einkommen war die Steuerplanung immer ein Albtraum. SteuerBoard zeigt mir SVS, EST und Nachzahlung auf einen Blick. Spart mir den Steuerberater-Termin zwischendurch.',
    rating: 4,
    image: '/images/testimonials/thomas.webp',
    initials: 'TR',
  },
]

function AvatarFallback({ initials }: { initials: string }) {
  return (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
      {initials}
    </div>
  )
}

function TestimonialAvatar({ t }: { t: Testimonial }) {
  if (!t.image) return <AvatarFallback initials={t.initials} />

  return (
    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-slate-800">
      <Image
        src={t.image}
        alt={`${t.name}, ${t.role} aus ${t.location}`}
        width={56}
        height={56}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Hide broken image, show fallback
          const target = e.currentTarget
          target.style.display = 'none'
          const fallback = target.parentElement?.querySelector('[data-fallback]')
          if (fallback) (fallback as HTMLElement).style.display = 'flex'
        }}
      />
      <div data-fallback className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 items-center justify-center text-white font-bold text-lg hidden">
        {t.initials}
      </div>
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
            Was Selbst\u00E4ndige sagen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-colors"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 mb-6 text-blue-200/70 text-[15px] leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <TestimonialAvatar t={t} />
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
          {[
            { value: '500+', label: 'Berechnungen' },
            { value: '98%', label: 'Genauigkeit' },
            { value: '\uD83C\uDDE6\uD83C\uDDF9', label: 'Made in Austria' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-blue-200/50 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
