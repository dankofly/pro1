'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Info } from 'lucide-react'

interface FieldInfoProps {
  text: string
}

export function FieldInfo({ text }: FieldInfoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center ml-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          aria-label="Feld-Info"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="max-w-[280px] bg-slate-800 text-white border-slate-700 text-xs leading-relaxed px-3 py-2"
      >
        <p>{text}</p>
      </PopoverContent>
    </Popover>
  )
}
