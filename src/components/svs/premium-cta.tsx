'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Bell, Building2, FileDown, BellRing } from 'lucide-react'

const features = [
  { icon: Building2, title: 'Bank-Anbindung', desc: 'Automatische Gewinn-Erkennung' },
  { icon: FileDown, title: 'PDF-Export', desc: 'Berichte für deinen Steuerberater' },
  { icon: BellRing, title: 'Smart Alerts', desc: 'Echtzeit-Nachzahlungs-Warnungen' },
]

export function PremiumCTA() {
  return (
    <Card className="bg-gradient-to-br from-slate-800 via-slate-700 to-blue-800 border-0 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <CardContent className="relative p-6 sm:p-8">
        <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5 animate-pulse" />
          Coming Soon
        </Badge>

        <h3 className="text-xl sm:text-2xl font-bold mb-2">SVS-Butler Pro</h3>
        <p className="text-blue-100/80 text-sm mb-6 max-w-md">
          Automatisiere deine SVS-Planung komplett – mit Bank-Anbindung und intelligenter Steueroptimierung.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {features.map((item) => (
            <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <item.icon className="h-5 w-5 mb-1.5 text-blue-200" />
              <div className="font-semibold text-sm">{item.title}</div>
              <div className="text-blue-200/70 text-xs">{item.desc}</div>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="bg-white text-slate-800 hover:bg-blue-50 shadow-lg">
          <Bell className="h-4 w-4 mr-2" />
          Auf Warteliste eintragen
        </Button>
      </CardContent>
    </Card>
  )
}
