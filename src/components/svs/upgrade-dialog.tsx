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
  const planLabel = requiredPlan === 'pro' ? 'SVS Checker Pro' : 'Sicherheits-Plan'
  const monthlyPrice = requiredPlan === 'pro' ? '19,90' : '9,90'
  const yearlyPrice = requiredPlan === 'pro' ? '199' : '99'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            Upgrade erforderlich
          </DialogTitle>
          <DialogDescription>
            <span className="font-semibold">{feature}</span> ist Teil des{' '}
            <Badge variant="outline" className="font-semibold">{planLabel}</Badge>.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-5 border space-y-3">
          <p className="font-semibold text-lg">{planLabel}</p>
          <div className="flex items-baseline gap-3">
            <p className="text-2xl font-bold">
              {monthlyPrice} EUR
              <span className="text-sm font-normal text-muted-foreground">/Monat</span>
            </p>
            <span className="text-muted-foreground text-sm">oder</span>
            <p className="text-2xl font-bold">
              {yearlyPrice} EUR
              <span className="text-sm font-normal text-muted-foreground">/Jahr</span>
            </p>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Spare 2 Monate beim Jahresabo!
          </Badge>
          <ul className="space-y-1.5 text-sm">
            {requiredPlan === 'basic' ? (
              <>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Einkommensteuer-Prognose</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Berechnungen speichern</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Dashboard mit Verlauf</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Einfacher Export</li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Alles aus dem Sicherheits-Plan</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Misch-Einkommen Rechner</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Bank-Anbindung (CSV)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> PDF-Export für Steuerberater</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Smart Alerts & Absetzbeträge</li>
              </>
            )}
          </ul>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Link href="/pricing" className="w-full">
            <Button className="w-full gap-2">
              <ArrowRight className="h-4 w-4" />
              Jetzt upgraden
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Vielleicht später
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
