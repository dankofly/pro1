'use client'

import { buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { Check, ChevronDown, Crown, Star, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import NumberFlow from '@number-flow/react'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  name: string
  price: number
  yearlyPrice: number
  yearlyTotal?: number
  period: string
  features: PricingFeature[]
  description: string
  buttonText: string
  href: string
  isPopular: boolean
  isFree?: boolean
}

interface PricingProps {
  plans: PricingPlan[]
  title?: string
  description?: string
  visibleCount?: number
}

function FeatureList({
  features,
  isPopular,
  visibleCount,
  isExpanded,
  onToggle,
}: {
  features: PricingFeature[]
  isPopular: boolean
  visibleCount: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const hasMore = features.length > visibleCount
  const visible = isExpanded ? features : features.slice(0, visibleCount)
  const hiddenCount = features.length - visibleCount

  return (
    <div className="space-y-3 mt-6 mb-8 flex-1">
      {visible.map((f, idx) => (
        <div key={idx} className="flex items-center gap-2.5 text-sm">
          {f.included ? (
            <Check className={cn('h-4 w-4 shrink-0', isPopular ? 'text-amber-400' : 'text-emerald-400')} />
          ) : (
            <X className="h-4 w-4 shrink-0 text-white/20" />
          )}
          <span className={cn('text-left', f.included ? 'text-blue-100' : 'text-white/30')}>
            {f.text}
          </span>
        </div>
      ))}
      {hasMore && (
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 text-xs font-medium text-blue-300/60 hover:text-blue-200 transition-colors pt-1 cursor-pointer"
        >
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', isExpanded && 'rotate-180')} />
          {isExpanded ? 'Weniger anzeigen' : `+${hiddenCount} weitere Features`}
        </button>
      )}
      <Link
        href="/features"
        className="block text-xs font-medium text-emerald-400/70 hover:text-emerald-400 transition-colors pt-1"
      >
        Alle Features im Detail →
      </Link>
    </div>
  )
}

export function Pricing({
  plans,
  title = 'Starte kostenlos, upgrade wenn du bereit bist',
  description = 'Keine versteckten Kosten. Monatlich kündbar.\nSichere Zahlung via Stripe.',
  visibleCount = 10,
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const switchRef = useRef<HTMLButtonElement>(null)

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked)
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ['#22c55e', '#10b981', '#f59e0b', '#3b82f6'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      })
    }
  }

  return (
    <section id="pricing" className="relative py-20 sm:py-28 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            {title}
          </h2>
          <p className="text-blue-200/60 text-lg whitespace-pre-line max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={cn('text-sm font-medium transition-colors', isMonthly ? 'text-white' : 'text-blue-200/40')}>
            Monatlich
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <Label>
              <Switch
                ref={switchRef as React.Ref<HTMLButtonElement>}
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/20 border-0"
              />
            </Label>
          </label>
          <span className={cn('text-sm font-medium transition-colors', !isMonthly ? 'text-white' : 'text-blue-200/40')}>
            Jährlich
          </span>
          {!isMonthly && (
            <span className="ml-1 text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-2.5 py-0.5">
              Spare 20%
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {plans.map((plan, index) => {
            const displayPrice = isMonthly ? plan.price : plan.yearlyPrice

            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={
                  isDesktop
                    ? {
                        y: plan.isPopular ? -20 : 0,
                        opacity: 1,
                        x: index === 2 ? -30 : index === 0 ? 30 : 0,
                        scale: index === 0 || index === 2 ? 0.94 : 1.0,
                      }
                    : { y: 0, opacity: 1 }
                }
                viewport={{ once: true }}
                transition={{
                  duration: 1.6,
                  type: 'spring',
                  stiffness: 100,
                  damping: 30,
                  delay: 0.4,
                  opacity: { duration: 0.5 },
                }}
                className={cn(
                  'rounded-2xl border p-6 sm:p-8 text-center lg:flex lg:flex-col lg:justify-center relative backdrop-blur-sm',
                  plan.isPopular
                    ? 'bg-white/10 border-amber-400/30 ring-2 ring-amber-400/20 z-10'
                    : 'bg-white/[0.03] border-white/10 z-0',
                  'flex flex-col',
                  !plan.isPopular && 'mt-5 md:mt-0',
                  index === 0 && 'origin-right',
                  index === 2 && 'origin-left',
                )}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      <Star className="h-3.5 w-3.5 fill-current mr-1" />
                      Beliebtester Plan
                    </span>
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <p className="text-blue-200/60 text-sm">{plan.description}</p>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center justify-center gap-2">
                    {plan.isPopular && <Crown className="h-5 w-5 text-amber-400" />}
                    {plan.name}
                  </h3>

                  <div className="mt-6 flex items-baseline justify-center gap-x-1">
                    <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                      <NumberFlow
                        value={displayPrice}
                        format={{
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: plan.isFree ? 0 : 2,
                          maximumFractionDigits: 2,
                        }}
                        transformTiming={{
                          duration: 500,
                          easing: 'ease-out',
                        }}
                        willChange
                        className="tabular-nums"
                      />
                    </span>
                  </div>

                  <p className="text-xs text-blue-200/40 mt-1">
                    {plan.isFree
                      ? 'für immer'
                      : isMonthly
                        ? 'pro Monat'
                        : `${plan.yearlyTotal} EUR/Jahr`}
                  </p>

                  <FeatureList
                    features={plan.features}
                    isPopular={plan.isPopular}
                    visibleCount={visibleCount}
                    isExpanded={!!expanded[index]}
                    onToggle={() => setExpanded((p) => ({ ...p, [index]: !p[index] }))}
                  />

                  <Link
                    href={plan.href}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'group relative w-full gap-2 overflow-hidden text-base font-semibold tracking-tight cursor-pointer',
                      'transform-gpu ring-offset-current transition-all duration-300 ease-out',
                      'hover:ring-2 hover:ring-offset-1',
                      plan.isPopular
                        ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600 hover:ring-amber-400 shadow-lg shadow-amber-500/25'
                        : 'bg-white/10 text-white border-white/10 hover:bg-white/20 hover:ring-white/30',
                    )}
                  >
                    {plan.isPopular && <Crown className="h-4 w-4 mr-1.5" />}
                    {plan.buttonText}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <p className="text-center text-blue-200/30 text-xs mt-8">
          Alle Preise inkl. USt. {isMonthly ? 'Monatlich kündbar.' : 'Jährlich im Voraus.'} Sichere Zahlung via Stripe.
        </p>
      </div>
    </section>
  )
}
