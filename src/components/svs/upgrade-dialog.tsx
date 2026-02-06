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
  const planLabel = requiredPlan === 'pro' ? 'Butler-Vollversion' : 'Sicherheits-Plan'
  const planPrice = requiredPlan === 'pro' ? '19,90' : '9,90'

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
          <p className="text-2xl font-bold">
            {planPrice} EUR
            <span className="text-sm font-normal text-muted-foreground">/Monat</span>
          </p>
          <ul className="space-y-1.5 text-sm">
            {requiredPlan === 'basic' ? (
              <>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Berechnungen speichern</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Dashboard mit Verlauf</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Einfacher Export</li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Alles aus dem Sicherheits-Plan</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Bank-Anbindung (CSV)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> PDF-Export fuer Steuerberater</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Smart Alerts</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Steuer-Optimierung Tipps</li>
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
            Vielleicht spaeter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
