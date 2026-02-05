'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SvsTooltip } from './svs-tooltip'
import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'
import { FileText } from 'lucide-react'

interface BeitragsDetailsProps {
  result: SvsResult
}

export function BeitragsDetails({ result }: BeitragsDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          Beitrags-Aufschlüsselung
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Beitragsart</TableHead>
              <TableHead className="text-right">Satz</TableHead>
              <TableHead className="text-right">Betrag / Jahr</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Pensionsversicherung (PV)</TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">18,50 %</TableCell>
              <TableCell className="text-right font-mono font-medium">{formatEuro(result.pvBeitrag)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Krankenversicherung (KV)</TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">6,80 %</TableCell>
              <TableCell className="text-right font-mono font-medium">{formatEuro(result.kvBeitrag)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <SvsTooltip term="Selbständigenvorsorge" /> (MV)
              </TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">1,53 %</TableCell>
              <TableCell className="text-right font-mono font-medium">{formatEuro(result.mvBeitrag)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Unfallversicherung (UV)</TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">fix</TableCell>
              <TableCell className="text-right font-mono font-medium">{formatEuro(result.uvBeitrag)}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow className="bg-blue-50/50">
              <TableCell className="font-semibold text-blue-800">Gesamt (endgültig)</TableCell>
              <TableCell className="text-right font-mono text-blue-600">26,83 % + UV</TableCell>
              <TableCell className="text-right font-mono font-bold text-blue-700 text-base">
                {formatEuro(result.endgueltigeSVS)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
          <SvsTooltip term="Endgültige Beitragsgrundlage" />:{' '}
          <span className="font-mono font-medium text-foreground">{formatEuro(result.beitragsgrundlage)}</span>
          {result.cappedAtMax && (
            <span className="ml-2 text-amber-600 font-medium">
              (gedeckelt bei <SvsTooltip term="Höchstbeitragsgrundlage" />)
            </span>
          )}
          {result.belowMinimum && (
            <span className="ml-2 text-muted-foreground font-medium">
              (unter <SvsTooltip term="Geringfügigkeitsgrenze" />)
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
