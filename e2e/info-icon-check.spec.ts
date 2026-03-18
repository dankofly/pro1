import { test } from '@playwright/test'

test('info icons inline — aufwaende detail expanded', async ({ page }) => {
  test.setTimeout(60000)
  await page.goto('/rechner', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2000)

  // Skip wizard
  const skipLink = page.getByText('Direkt zum Rechner')
  if (await skipLink.isVisible({ timeout: 3000 }).catch(() => false)) {
    await skipLink.click()
    await page.waitForTimeout(2000)
  }

  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 812 })
  await page.waitForTimeout(500)

  // Open "Aufwände aufschlüsseln"
  const aufwaendeBtn = page.getByText('Aufwände aufschlüsseln')
  if (await aufwaendeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await aufwaendeBtn.click()
    await page.waitForTimeout(1000)
    console.log('Clicked: Aufwände aufschlüsseln')
  }

  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-results/info-icons-detail-mobile.png', fullPage: true })

  // Desktop
  await page.setViewportSize({ width: 800, height: 900 })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-results/info-icons-detail-desktop.png', fullPage: true })
})
