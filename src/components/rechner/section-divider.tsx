interface SectionDividerProps {
  title: string
}

export function SectionDivider({ title }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-3 my-8 py-4">
      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em] whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-border/40 to-transparent" />
    </div>
  )
}
