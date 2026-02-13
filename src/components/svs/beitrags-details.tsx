'use client'

import { SvsTooltip } from './svs-tooltip'
import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'
import { FileText } from 'lucide-react'

interface BeitragsDetailsProps {
  result: SvsResult
}

function MiniProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-1">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export function BeitragsDetails({ result }: BeitragsDetailsProps) {
  const maxBeitrag = Math.max(result.pvBeitrag, result.kvBeitrag, result.mvBeitrag, result.uvBeitrag, 1)

  const kvSatz = result.isJungunternehmer ? '3,84 %' : '6,80 %'
  const gesamtPct = result.isJungunternehmer ? '23,87 %' : '26,83 %'

  const beitraege = [
    { label: 'Pensionsversicherung (PV)', satz: '18,50 %', betrag: result.pvBeitrag, color: 'bg-blue-500' },
    { label: result.isJungunternehmer ? 'Krankenversicherung (KV) *' : 'Krankenversicherung (KV)', satz: kvSatz, betrag: result.kvBeitrag, color: 'bg-emerald-500' },
    { label: null, tooltip: 'Selbständigenvorsorge', suffix: ' (MV)', satz: '1,53 %', betrag: result.mvBeitrag, color: 'bg-amber-500' },
    { label: 'Unfallversicherung (UV)', satz: 'fix', betrag: result.uvBeitrag, color: 'bg-purple-500' },
  ]

  return (
    <div className="card-surface p-5 sm:p-6">
      <div className="flex items-center gap-2 text-base font-semibold mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/60">
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        Beitrags-Aufschlüsselung
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60">
              <th className="text-left py-2.5 font-semibold text-muted-foreground">Beitragsart</th>
              <th className="text-right py-2.5 font-semibold text-muted-foreground">Satz</th>
              <th className="text-right py-2.5 font-semibold text-muted-foreground">Betrag / Jahr</th>
            </tr>
          </thead>
          <tbody>
            {beitraege.map((b, i) => (
              <tr key={i} className="border-b border-slate-100/60">
                <td className="py-3">
                  <div>
                    {b.tooltip ? (
                      <span><SvsTooltip term={b.tooltip} />{b.suffix}</span>
                    ) : (
                      b.label
                    )}
                  </div>
                  <MiniProgressBar value={b.betrag} max={maxBeitrag} color={b.color} />
                </td>
                <td className="text-right font-mono text-muted-foreground align-top py-3">{b.satz}</td>
                <td className="text-right font-mono font-medium align-top py-3">{formatEuro(b.betrag)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-primary/[0.04] rounded-lg">
              <td className="py-3 pl-2 font-semibold text-foreground rounded-l-lg">Gesamt (endgültig)</td>
              <td className="py-3 text-right font-mono text-muted-foreground">{gesamtPct} + UV</td>
              <td className="py-3 pr-2 text-right font-mono font-bold text-foreground text-base rounded-r-lg">
                {formatEuro(result.endgueltigeSVS)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 p-3 bg-slate-100/50 backdrop-blur-sm rounded-lg text-xs text-muted-foreground">
        <SvsTooltip term="Endgültige Beitragsgrundlage" />:{' '}
        <span className="font-mono font-medium text-foreground">{formatEuro(result.beitragsgrundlage)}</span>
        {result.cappedAtMax && (
          <span className="ml-2 text-amber-600 font-medium">
            (gedeckelt bei <SvsTooltip term="Höchstbeitragsgrundlage" />)
          </span>
        )}
        {result.belowMinimum && (
          <span className="ml-2 text-muted-foreground font-medium">
            (unter Versicherungsgrenze)
          </span>
        )}
        {result.usesMinBeitragsgrundlage && (
          <span className="ml-2 text-amber-600 font-medium">
            (Mindestbeitragsgrundlage)
          </span>
        )}
      </div>
      {result.isJungunternehmer && (
        <p className="mt-2 text-xs text-green-700">
          * Reduzierter KV-Satz (3,84%) durch Jungunternehmer-Regelung (NeuFöG)
        </p>
      )}
    </div>
  )
}
