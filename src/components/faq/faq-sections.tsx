'use client'

import { useState } from 'react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

export interface FaqSection {
  title: string
  icon: React.ReactNode
  items: FaqItem[]
}

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-expanded={isOpen}
        >
          <span className="text-sm font-medium">{item.q}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 pt-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.a}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function FaqSectionsClient({ sections }: { sections: FaqSection[] }) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <div key={section.title} className="card-surface p-5 sm:p-6">
          {/* Section header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-muted-foreground">{section.icon}</span>
            <h2 className="text-[11px] font-semibold uppercase text-muted-foreground tracking-[0.08em]">
              {section.title}
            </h2>
          </div>

          {/* FAQ items */}
          <div className="divide-y divide-border/50">
            {section.items.map((item, itemIndex) => {
              const key = `${sectionIndex}-${itemIndex}`
              return (
                <FaqAccordionItem
                  key={key}
                  item={item}
                  isOpen={openItems.has(key)}
                  onToggle={() => toggleItem(key)}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
