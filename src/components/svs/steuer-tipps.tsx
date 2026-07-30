'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { formatEuro } from '@/lib/format'
import type { SteuerTipp } from '@/lib/svs-calculator'
import type { TaxYear } from '@/lib/tax-constants'
import { Lightbulb, ChevronDown, Monitor, CreditCard, TrendingDown } from 'lucide-react'

interface SteuerTippsProps {
  tipps: SteuerTipp
  gewinn: number
  year: TaxYear
}

export function SteuerTipps({ tipps, gewinn, year }: SteuerTippsProps) {
  const [open, setOpen] = useState(false)

  const hasIfb = tipps.ifbInvestition > 0
  const hasSvsExtra = tipps.svsVorauszahlung > 0
  const totalErsparnis = tipps.ifbErsparnis + tipps.svsVorauszahlungErsparnis

  if (tipps.grenzsteuersatz === 0) return null

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="border-2 border-sb-green/30 bg-sb-green-soft/30">
        <CollapsibleTrigger asChild>
          <button type="button" className="w-full text-left">
            <CardContent className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-sb-green-soft/60 transition-colors rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sb-accent shadow-sm">
                  <Lightbulb className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-sb-green">Wie kann ich meine Steuer senken?</p>
                  <p className="text-sm text-sb-green/70">
                    Bis zu <span className="font-bold">{formatEuro(totalErsparnis)}</span> Ersparnis möglich
                  </p>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 text-sb-green transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </CardContent>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 sm:px-6 pb-5 space-y-4">
            <div className="flex items-center gap-2 text-xs text-sb-green">
              <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
              Dein Grenzsteuersatz: <Badge variant="outline" className="bg-sb-card font-mono">{(tipps.grenzsteuersatz * 100).toFixed(0)}%</Badge>
            </div>

            {hasIfb && (
              <Card className="bg-sb-card border-sb-green/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sb-accent-soft">
                      <Monitor className="h-5 w-5 text-sb-accent" aria-hidden="true" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-semibold text-sm">Investitionsbedingter Gewinnfreibetrag</p>
                      <p className="text-sm text-muted-foreground">
                        Kaufe noch heuer Hardware, Software oder Büroausstattung für{' '}
                        <span className="font-bold text-sb-accent">{formatEuro(tipps.ifbInvestition)}</span>,
                        um <span className="font-bold text-sb-green">{formatEuro(tipps.ifbErsparnis)}</span> Steuern zu sparen.
                      </p>
                      <div className="bg-sb-accent-soft rounded-md p-2.5 text-xs text-sb-accent">
                        Der IFB gilt für Gewinne über € 33.000 (13% bis € 175.000). Du musst tatsächlich investieren –
                        Laptop, Monitor, Drucker, Büromöbel oder bestimmte Wertpapiere zählen.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasSvsExtra && (
              <Card className="bg-sb-card border-sb-green/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sb-accent-soft">
                      <CreditCard className="h-5 w-5 text-sb-accent" aria-hidden="true" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-semibold text-sm">SVS-Vorauszahlung erhöhen</p>
                      <p className="text-sm text-muted-foreground">
                        Zahle dieses Jahr noch{' '}
                        <span className="font-bold text-sb-accent">{formatEuro(tipps.svsVorauszahlung)}</span> mehr
                        an die SVS, um <span className="font-bold text-sb-green">{formatEuro(tipps.svsVorauszahlungErsparnis)}</span> Einkommensteuer zu sparen.
                      </p>
                      <div className="bg-sb-accent-soft rounded-md p-2.5 text-xs text-sb-accent">
                        Höhere SVS-Beiträge = niedrigeres zu versteuerndes Einkommen.
                        Du kannst bei der SVS freiwillig eine höhere Vorauszahlung beantragen.
                        Das Geld ist nicht verloren – es fließt in deine Pension und Krankenversicherung.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <p className="text-xs text-muted-foreground text-center pt-1">
              Werte {year}. Keine Steuerberatung. Besprich konkrete Maßnahmen mit deinem Steuerberater.
            </p>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
