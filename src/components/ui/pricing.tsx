'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { Check, ChevronDown, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
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
  visibleCount,
  isExpanded,
  onToggle,
}: {
  features: PricingFeature[]
  visibleCount: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const hasMore = features.length > visibleCount
  const visible = isExpanded ? features : features.slice(0, visibleCount)
  const hiddenCount = features.length - visibleCount

  return (
    <div className="mb-8 mt-6 flex-1 space-y-3">
      {visible.map((f, idx) => (
        <div key={idx} className="flex items-center gap-2.5 text-sm">
          {f.included ? (
            <Check className="h-4 w-4 shrink-0 text-sb-accent" />
          ) : (
            <X className="h-4 w-4 shrink-0 text-white/20" />
          )}
          <span className={cn('text-left', f.included ? 'text-sb-text' : 'text-white/30')}>
            {f.text}
          </span>
        </div>
      ))}
      {hasMore && (
        <button
          onClick={onToggle}
          className="flex cursor-pointer items-center gap-1.5 pt-1 text-xs font-medium text-sb-dim transition-colors hover:text-sb-mut"
        >
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', isExpanded && 'rotate-180')} />
          {isExpanded ? 'Weniger anzeigen' : `+${hiddenCount} weitere Features`}
        </button>
      )}
      <Link
        href="/features"
        className="block pt-1 text-xs font-medium text-sb-dim transition-colors hover:text-sb-mut"
      >
        Alle Features im Detail →
      </Link>
    </div>
  )
}

export function Pricing({
  plans,
  title = 'Preise',
  description = '',
  visibleCount = 10,
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(false)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked)
  }

  return (
    <section id="pricing" className="relative pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-sb-dim">Preise</p>
        <h2 className="mt-4 max-w-[26ch] font-heading text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.022em] text-sb-text">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-[58ch] whitespace-pre-line text-sb-mut">{description}</p>
        )}

        <div className="mt-10 mb-10 flex items-center gap-3">
          <span className={cn('text-sm font-medium transition-colors', isMonthly ? 'text-sb-text' : 'text-sb-dim')}>
            Monatlich
          </span>
          <label className="relative inline-flex cursor-pointer items-center">
            <Label>
              <Switch
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="border-0 data-[state=checked]:bg-sb-accent data-[state=unchecked]:bg-white/20"
              />
            </Label>
          </label>
          <span className={cn('text-sm font-medium transition-colors', !isMonthly ? 'text-sb-text' : 'text-sb-dim')}>
            Jährlich
          </span>
          {!isMonthly && (
            <span className="ml-1 font-mono text-xs text-sb-mut">20 % günstiger</span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan, index) => {
            const displayPrice = isMonthly ? plan.price : plan.yearlyPrice

            return (
              <motion.div
                key={index}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-6 sm:p-7',
                  plan.isPopular
                    ? 'border-sb-accent-deep bg-sb-raise'
                    : 'border-sb-line bg-sb-raise'
                )}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-6 rounded-[7px] bg-sb-accent px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-sb-accent-ink">
                    Voller Funktionsumfang
                  </span>
                )}
                <div className="flex flex-1 flex-col">
                  <h3 className="font-heading text-lg font-bold text-sb-text">{plan.name}</h3>
                  <p className="mt-0.5 text-[13px] text-sb-dim">{plan.description}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="whitespace-nowrap font-mono text-[42px] font-semibold tracking-[-0.02em] text-sb-text">
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
                    <span className="text-[13px] text-sb-dim">
                      {plan.isFree ? 'für immer' : isMonthly ? '/ Monat' : '/ Monat, jährlich verrechnet'}
                    </span>
                  </div>

                  {!plan.isFree && (
                    <p className="mt-2 text-[13px] text-sb-mut">
                      {isMonthly ? (
                        <>Monatlich kündbar. Absetzbar als Betriebsausgabe.</>
                      ) : (
                        <>
                          {plan.yearlyTotal} € im Jahr, absetzbar. Effektiv{' '}
                          <b className="font-semibold text-sb-text">{(displayPrice * 0.68).toFixed(2).replace('.', ',')} €/Monat</b>
                          {' '}bei 32 % Grenzsteuersatz.
                        </>
                      )}
                    </p>
                  )}

                  <FeatureList
                    features={plan.features}
                    visibleCount={visibleCount}
                    isExpanded={!!expanded[index]}
                    onToggle={() => setExpanded((p) => ({ ...p, [index]: !p[index] }))}
                  />

                  <Link
                    href={plan.href}
                    className={cn(
                      'inline-flex h-11 w-full items-center justify-center rounded-[10px] font-heading text-[15px] font-semibold transition-colors duration-150',
                      plan.isPopular
                        ? 'bg-sb-accent text-sb-accent-ink hover:bg-sb-accent-deep'
                        : 'border border-sb-line-strong text-sb-text hover:border-white/30'
                    )}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-6 text-xs text-sb-dim">
          Alle Preise inkl. USt. {isMonthly ? 'Monatlich kündbar.' : 'Jahresbetrag im Voraus.'} Zahlung über Stripe.
          Kündigung jederzeit im Stripe-Kundenportal.
        </p>
      </div>
    </section>
  )
}
