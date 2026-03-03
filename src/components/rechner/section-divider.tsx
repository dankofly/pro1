interface SectionDividerProps {
  title: string
}

export function SectionDivider({ title }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-3 pt-6 pb-2">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
    </div>
  )
}
