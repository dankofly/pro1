'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface UpgradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature: string
  requiredPlan: 'basic' | 'pro'
}

export function UpgradeDialog({ open, onOpenChange, feature, requiredPlan }: UpgradeDialogProps) {
  const planLabel = requiredPlan === 'pro' ? 'SteuerBoard Pro' : 'Sicherheits-Plan'
  const monthlyPrice = requiredPlan === 'pro' ? '24,90' : '12,90'
  const yearlyPrice = requiredPlan === 'pro' ? '239' : '119'
  const yearlyPerMonth = requiredPlan === 'pro' ? '19,92' : '9,92'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" aria-hidden="true" />
            {feature} freischalten
          </DialogTitle>
          <DialogDescription>
            Mit dem <Badge variant="outline" className="font-semibold">{planLabel}</Badge>{' '}
            behältst du deine Steuerlage im Blick, Monat für Monat.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted/40 rounded-xl p-5 border border-border space-y-3">
          <p className="font-semibold text-lg">{planLabel}</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-2xl font-bold tabular-nums">
              {yearlyPrice} EUR
              <span className="text-sm font-normal text-muted-foreground">/Jahr</span>
            </p>
            <span className="text-sm text-muted-foreground">
              (entspricht {yearlyPerMonth} EUR/Monat) oder {monthlyPrice} EUR monatlich
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40">
              2 Monate geschenkt im Jahresabo
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              Als Betriebsausgabe absetzbar
            </Badge>
          </div>
          <ul className="space-y-1.5 text-sm">
            {requiredPlan === 'basic' ? (
              <>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Einkommensteuer-Prognose</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Berechnungen speichern</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Dashboard mit Verlauf</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Einfacher Export</li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Alles aus dem Sicherheits-Plan</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Misch-Einkommen Rechner</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Bank-Anbindung (CSV)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> PDF-Export für Steuerberater</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> Smart Alerts & Absetzbeträge</li>
              </>
            )}
          </ul>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button asChild className="w-full gap-2">
            <Link href="/pricing">
              Jetzt freischalten
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <p className="text-[11px] text-center text-muted-foreground">
            Alle Preise inkl. USt. Monatsabo jederzeit zum Monatsende kündbar,
            Jahresabo läuft bis zum Ende des Bezugsjahres. Deine Berechnungen bleiben erhalten.
          </p>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Vielleicht später
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
