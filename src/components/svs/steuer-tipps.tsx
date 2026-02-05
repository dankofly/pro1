'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { formatEuro } from '@/lib/format'
import type { SteuerTipp } from '@/lib/svs-calculator'
import { Lightbulb, ChevronDown, Monitor, CreditCard, TrendingDown } from 'lucide-react'

interface SteuerTippsProps {
  tipps: SteuerTipp
  gewinn: number
}

export function SteuerTipps({ tipps, gewinn }: SteuerTippsProps) {
  const [open, setOpen] = useState(false)

  const hasIfb = tipps.ifbInvestition > 0
  const hasSvsExtra = tipps.svsVorauszahlung > 0
  const totalErsparnis = tipps.ifbErsparnis + tipps.svsVorauszahlungErsparnis

  if (tipps.grenzsteuersatz === 0) return null

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="border-2 border-emerald-200 bg-emerald-50/30">
        <CollapsibleTrigger asChild>
          <button className="w-full text-left">
            <CardContent className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-emerald-50/60 transition-colors rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-sm">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900">Wie kann ich meine Steuer senken?</p>
                  <p className="text-sm text-emerald-700/70">
                    Bis zu <span className="font-bold">{formatEuro(totalErsparnis)}</span> Ersparnis möglich
                  </p>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 text-emerald-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </CardContent>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 sm:px-6 pb-5 space-y-4">
            <div className="flex items-center gap-2 text-xs text-emerald-700">
              <TrendingDown className="h-3.5 w-3.5" />
              Dein Grenzsteuersatz: <Badge variant="outline" className="bg-white font-mono">{(tipps.grenzsteuersatz * 100).toFixed(0)}%</Badge>
            </div>

            {hasIfb && (
              <Card className="bg-white border-emerald-100">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <Monitor className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-semibold text-sm">Investitionsbedingter Gewinnfreibetrag</p>
                      <p className="text-sm text-muted-foreground">
                        Kaufe noch heuer Hardware, Software oder Büroausstattung für{' '}
                        <span className="font-bold text-blue-700">{formatEuro(tipps.ifbInvestition)}</span>,
                        um <span className="font-bold text-emerald-700">{formatEuro(tipps.ifbErsparnis)}</span> Steuern zu sparen.
                      </p>
                      <div className="bg-blue-50 rounded-md p-2.5 text-xs text-blue-800">
                        Der IFB gilt für Gewinne über € 33.000 (13% bis € 175.000). Du musst tatsächlich investieren –
                        Laptop, Monitor, Drucker, Büromöbel oder bestimmte Wertpapiere zählen.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasSvsExtra && (
              <Card className="bg-white border-emerald-100">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                      <CreditCard className="h-5 w-5 text-violet-600" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-semibold text-sm">SVS-Vorauszahlung erhöhen</p>
                      <p className="text-sm text-muted-foreground">
                        Zahle dieses Jahr noch{' '}
                        <span className="font-bold text-violet-700">{formatEuro(tipps.svsVorauszahlung)}</span> mehr
                        an die SVS, um <span className="font-bold text-emerald-700">{formatEuro(tipps.svsVorauszahlungErsparnis)}</span> Einkommensteuer zu sparen.
                      </p>
                      <div className="bg-violet-50 rounded-md p-2.5 text-xs text-violet-800">
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
              Keine Steuerberatung. Besprich konkrete Maßnahmen mit deinem Steuerberater.
            </p>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
