'use client'

import { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, FileSpreadsheet, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { formatEuro } from '@/lib/format'
import { parseCsvFile, detectIncomeColumns, sumColumn, type ParsedCsvResult, type DetectedColumn } from '@/lib/csv-parser'

interface BankImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (gewinn: number) => void
}

export function BankImportDialog({ open, onOpenChange, onImport }: BankImportDialogProps) {
  const [step, setStep] = useState<'upload' | 'select' | 'confirm'>('upload')
  const [parsed, setParsed] = useState<ParsedCsvResult | null>(null)
  const [columns, setColumns] = useState<DetectedColumn[]>([])
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null)
  const [computedSum, setComputedSum] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setStep('upload')
    setParsed(null)
    setColumns([])
    setSelectedColumn(null)
    setComputedSum(0)
    setError(null)
  }, [])

  const handleOpenChange = useCallback((value: boolean) => {
    if (!value) reset()
    onOpenChange(value)
  }, [onOpenChange, reset])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)

    try {
      const result = await parseCsvFile(file)
      setParsed(result)
      const detected = detectIncomeColumns(result)
      setColumns(detected)

      if (detected.length === 0) {
        setError('Keine Einnahmen-Spalten erkannt. Bitte pruefe das CSV-Format.')
        return
      }

      setStep('select')
    } catch {
      setError('Datei konnte nicht gelesen werden. Bitte stelle sicher, dass es eine gueltige CSV-Datei ist.')
    }
  }, [])

  const handleColumnSelect = useCallback((colIndex: number) => {
    if (!parsed) return
    setSelectedColumn(colIndex)
    const sum = sumColumn(parsed, colIndex, true)
    setComputedSum(sum)
    setStep('confirm')
  }, [parsed])

  const handleConfirm = useCallback(() => {
    onImport(Math.round(computedSum))
    handleOpenChange(false)
  }, [computedSum, onImport, handleOpenChange])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-blue-600" />
            Bank-Anbindung
          </DialogTitle>
          <DialogDescription>
            {step === 'upload' && 'Lade einen CSV-Kontoauszug hoch, um deinen Gewinn automatisch zu erkennen.'}
            {step === 'select' && 'Waehle die Spalte, die deine Einnahmen enthaelt.'}
            {step === 'confirm' && 'Pruefe den erkannten Gewinn und uebernimm ihn.'}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 'upload' && (
          <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 rounded-xl p-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
            <Upload className="h-10 w-10 text-slate-400" />
            <div className="text-center">
              <p className="font-medium text-sm">CSV-Datei auswaehlen</p>
              <p className="text-xs text-muted-foreground mt-1">Kontoauszug als .csv Datei</p>
            </div>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        )}

        {step === 'select' && columns.length > 0 && (
          <ScrollArea className="max-h-72">
            <div className="space-y-2">
              {columns.map((col) => (
                <button
                  key={col.index}
                  onClick={() => handleColumnSelect(col.index)}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{col.header}</span>
                    <Badge variant="outline" className="font-mono text-xs">
                      {formatEuro(col.summe)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {col.count} Eintraege · Beispiele: {col.sampleValues.join(', ')}
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}

        {step === 'confirm' && parsed && selectedColumn !== null && (
          <div className="space-y-4">
            <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-sm text-emerald-700 mb-1">Erkannter Jahresgewinn</p>
              <p className="text-3xl font-bold text-emerald-800 font-mono">{formatEuro(computedSum)}</p>
              <p className="text-xs text-emerald-600 mt-2">
                Aus Spalte &ldquo;{parsed.headers[selectedColumn]}&rdquo; · {parsed.rowCount} Zeilen
              </p>
            </div>

            <ScrollArea className="max-h-40">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    {parsed.headers.map((h, i) => (
                      <th key={i} className={`py-1.5 px-2 text-left ${i === selectedColumn ? 'bg-emerald-50 font-bold' : 'text-muted-foreground'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsed.rows.slice(0, 8).map((row, ri) => (
                    <tr key={ri} className="border-b border-slate-50">
                      {row.map((cell, ci) => (
                        <td key={ci} className={`py-1 px-2 ${ci === selectedColumn ? 'bg-emerald-50 font-medium' : ''}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          {step === 'select' && (
            <Button variant="ghost" size="sm" onClick={() => { setStep('upload'); setError(null) }}>
              Zurueck
            </Button>
          )}
          {step === 'confirm' && (
            <>
              <Button variant="ghost" size="sm" onClick={() => setStep('select')}>
                Zurueck
              </Button>
              <Button onClick={handleConfirm} className="gap-2">
                <Check className="h-4 w-4" />
                Gewinn uebernehmen
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
