import { test, expect } from '@playwright/test'

test.describe('Rechner Dashboard Visual Check', () => {
  test.setTimeout(90000)

  test.beforeEach(async ({ page }) => {
    await page.goto('/rechner', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(2000)

    // Skip onboarding wizard — click "Direkt zum Rechner"
    const skipLink = page.getByText('Direkt zum Rechner')
    if (await skipLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await skipLink.click()
      await page.waitForTimeout(2000)
    }
  })

  test('dashboard with values — desktop + mobile, light + dark', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.waitForTimeout(1000)

    // Find number inputs and fill values
    const allInputs = page.locator('input')
    const count = await allInputs.count()
    console.log(`Total inputs found: ${count}`)

    // Log all input types for debugging
    for (let i = 0; i < Math.min(count, 10); i++) {
      const inp = allInputs.nth(i)
      const type = await inp.getAttribute('type')
      const name = await inp.getAttribute('name')
      const placeholder = await inp.getAttribute('placeholder')
      const ariaLabel = await inp.getAttribute('aria-label')
      console.log(`Input ${i}: type=${type}, name=${name}, placeholder=${placeholder}, aria-label=${ariaLabel}`)
    }

    // Try to fill the first visible number-like input
    for (let i = 0; i < count; i++) {
      const inp = allInputs.nth(i)
      const type = await inp.getAttribute('type')
      if (type === 'range' || type === 'number' || type === 'text') {
        const isVis = await inp.isVisible().catch(() => false)
        if (isVis) {
          try {
            await inp.fill('80000')
            await inp.press('Tab')
            console.log(`Filled input ${i} with 80000`)
            break
          } catch { /* skip */ }
        }
      }
    }

    await page.waitForTimeout(2500)

    // Screenshot current state
    await page.screenshot({ path: 'test-results/board-desktop-light.png', fullPage: true })

    await page.emulateMedia({ colorScheme: 'dark' })
    await page.waitForTimeout(500)
    await page.screenshot({ path: 'test-results/board-desktop-dark.png', fullPage: true })

    await page.emulateMedia({ colorScheme: 'light' })
    await page.setViewportSize({ width: 375, height: 812 })
    await page.waitForTimeout(500)
    await page.screenshot({ path: 'test-results/board-mobile-light.png', fullPage: true })

    await page.emulateMedia({ colorScheme: 'dark' })
    await page.waitForTimeout(500)
    await page.screenshot({ path: 'test-results/board-mobile-dark.png', fullPage: true })

    // Basic structural checks
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    console.log(`Mobile overflow check: scrollW=${scrollWidth}, clientW=${clientWidth}`)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5)
  })
})
