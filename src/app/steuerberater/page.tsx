'use client'

import { useState } from 'react'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { TaxChatbot } from '@/components/rechner/tax-chatbot'
import { UpgradeDialog } from '@/components/svs/upgrade-dialog'

function SteuerberaterContent() {
  const { subscription } = useAppShell()
  const isPro = subscription?.plan === 'pro'

  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState('')

  const handleUpgradeRequired = (feature: string) => {
    setUpgradeFeature(feature)
    setUpgradeOpen(true)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <MobileNav />

      <div className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">
        <div className="max-w-3xl mx-auto">
          <TaxChatbot
            isPro={isPro}
            onUpgradeRequired={handleUpgradeRequired}
          />
        </div>
      </div>

      <UpgradeDialog
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        feature={upgradeFeature}
        requiredPlan="pro"
      />
    </div>
  )
}

export default function SteuerberaterPage() {
  return (
    <AppShell>
      <SteuerberaterContent />
    </AppShell>
  )
}
