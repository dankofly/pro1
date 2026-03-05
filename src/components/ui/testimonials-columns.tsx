'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'motion/react'
import { Star } from 'lucide-react'

interface Testimonial {
  text: string
  name: string
  role: string
  avatar: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    text: 'In 30 Sekunden mein echtes Netto berechnet. Mein Steuerberater war beeindruckt, wie genau die Zahlen waren.',
    name: 'Sandra K.',
    role: 'Texterin & Bloggerin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    text: 'Der KI-Steuerberater hat mir in 5 Minuten erklärt, was mein Berater in einer Stunde nicht geschafft hat. Jeden Cent wert.',
    name: 'Thomas W.',
    role: 'IT-Freelancer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    text: 'SVS-Nachzahlung war auf den Euro genau vorhergesagt. Kein böses Erwachen mehr am Quartalsende.',
    name: 'David P.',
    role: 'Unternehmensberater',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
  {
    text: 'Familienbonus, AVAB, Verkehrsabsetzbetrag – alles automatisch dabei. Spart mir den jährlichen Gang zum Steuerberater.',
    name: 'Julia H.',
    role: 'Online-Händlerin',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  {
    text: 'Die Wasserfall-Analyse zeigt mir genau, wo mein Geld hingeht. Nutze den Rechner jeden Monat für meine Finanzplanung.',
    name: 'Stefan B.',
    role: 'Webentwickler',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
  {
    text: 'Endlich ein Tool, das Selbständige in Österreich wirklich versteht. Klare Empfehlung an jeden EPU-Gründer!',
    name: 'Anna G.',
    role: 'Business Coach',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  },
  {
    text: 'Die Einkommensteuer-Prognose hat mir geholfen, meine Vorauszahlungen richtig zu planen. Keine Überraschungen mehr.',
    name: 'Markus R.',
    role: 'Fotograf',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
  },
  {
    text: 'Das Krypto-Steuer-Tool ist Gold wert. Endlich weiß ich, was ich dem Finanzamt schulde – ohne Excel-Chaos.',
    name: 'Lisa M.',
    role: 'Krypto-Investorin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  },
  {
    text: 'Habe den Pro-Plan seit 3 Monaten – der Sachbezug-Rechner allein spart mir mehr als das Abo kostet.',
    name: 'Patrick N.',
    role: 'GmbH-Geschäftsführer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
  },
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-blue-100/80 mb-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-medium text-white">{testimonial.name}</p>
          <p className="text-xs text-blue-200/40">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

function TestimonialsColumn({
  testimonials,
  duration,
  direction = 'up',
}: {
  testimonials: Testimonial[]
  duration: number
  direction?: 'up' | 'down'
}) {
  const y = useMotionValue(0)

  return (
    <div className="relative overflow-hidden" style={{ height: 520 }}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10 bg-gradient-to-b from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-slate-950 to-transparent" />

      <motion.div
        className="flex flex-col gap-4"
        style={{ y }}
        animate={{
          y: direction === 'up'
            ? [0, -(testimonials.length / 2) * 200]
            : [-(testimonials.length / 2) * 200, 0],
        }}
        transition={{
          y: {
            duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          },
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...testimonials, ...testimonials].map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </motion.div>
    </div>
  )
}

export function Testimonials() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Split testimonials into 3 columns
  const col1 = TESTIMONIALS.slice(0, 3)
  const col2 = TESTIMONIALS.slice(3, 6)
  const col3 = TESTIMONIALS.slice(6, 9)

  return (
    <section className="relative py-16 sm:py-20 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-blue-200/60 text-sm">
              <span className="text-white font-semibold">4.9/5</span> von schon 100+ Selbständigen
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Das sagen unsere Nutzer
          </h2>
        </div>

        {mounted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TestimonialsColumn testimonials={col1} duration={25} direction="up" />
            <TestimonialsColumn testimonials={col2} duration={30} direction="down" />
            <div className="hidden lg:block">
              <TestimonialsColumn testimonials={col3} duration={22} direction="up" />
            </div>
          </div>
        ) : (
          /* SSR fallback: static grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.slice(0, 6).map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
