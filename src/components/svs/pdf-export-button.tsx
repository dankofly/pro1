'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileDown, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { SvsResult, SteuerTipp } from '@/lib/svs-calculator'

interface PdfExportButtonProps {
  gewinn: number
  vorschreibung: number
  result: SvsResult
  steuerTipps: SteuerTipp
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export function PdfExportButton({ gewinn, vorschreibung, result, steuerTipps, variant = 'outline', size = 'sm', className }: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const { generateSvsReport } = await import('@/lib/pdf-export')
      generateSvsReport({ gewinn, vorschreibung, result, steuerTipps })
      toast.success('PDF wurde erstellt und heruntergeladen.')
    } catch {
      toast.error('PDF konnte nicht erstellt werden.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleExport} disabled={loading} className={className}>
      {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileDown className="h-4 w-4 mr-2" />}
      {loading ? 'Erstelle PDF...' : 'PDF exportieren'}
    </Button>
  )
}
