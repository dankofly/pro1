'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, BarChart3, Clock, Crown } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', label: 'Rechner', icon: Calculator },
  { href: '/misch-einkommen', label: 'Optimierung', icon: BarChart3 },
  { href: '/dashboard', label: 'Verlauf', icon: Clock },
  { href: '/pricing', label: 'Pro', icon: Crown },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div className="flex flex-col items-center gap-0.5 py-1">
                <item.icon
                  className={`h-5 w-5 transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-400'}`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
