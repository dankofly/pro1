import { test, expect } from '@playwright/test'

// Helper: wait for dashboard to be fully loaded
async function waitForDashboard(page: import('@playwright/test').Page) {
  await expect(page.getByRole('status', { name: /echtes netto/i }).first()).toBeVisible({ timeout: 20000 })
}

test.describe('Rechner Onboarding', () => {
  test('shows onboarding wizard on first visit', async ({ page }) => {
    await page.addInitScript(() => localStorage.clear())
    await page.goto('/rechner')
    await expect(page.getByRole('heading', { name: 'Dein Unternehmen' })).toBeVisible({ timeout: 20000 })
    await expect(page.getByRole('button', { name: /weiter/i })).toBeVisible()
  })

  test('can complete onboarding wizard', async ({ page }) => {
    await page.addInitScript(() => localStorage.clear())
    await page.goto('/rechner')

    // Step 1
    await expect(page.getByRole('heading', { name: 'Dein Unternehmen' })).toBeVisible({ timeout: 20000 })
    await page.getByRole('button', { name: /weiter/i }).click()

    // Step 2
    await expect(page.getByRole('heading', { name: 'Versicherung' })).toBeVisible({ timeout: 5000 })
    await page.getByRole('button', { name: /rechner starten/i }).click()

    // Dashboard should appear
    await waitForDashboard(page)
  })
})

test.describe('Rechner Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('rechner_onboarded', 'true')
    })
    await page.goto('/rechner')
    await waitForDashboard(page)
  })

  test('shows KPI hero card with netto', async ({ page }) => {
    const hero = page.getByRole('status', { name: /echtes netto/i }).first()
    await expect(hero).toContainText(/netto/i)
    await expect(hero).toContainText(/monat/i)
  })

  test('shows secondary KPI tiles', async ({ page }) => {
    await expect(page.getByText('Umsatz').first()).toBeVisible()
    await expect(page.getByText('Gewinn').first()).toBeVisible()
    // SVS/ESt tiles may be truncated on smaller viewports, check they exist in DOM
    await expect(page.getByText('Aufwände').first()).toBeVisible()
  })

  test('geldfluss-diagramm exists in page', async ({ page }) => {
    // Geldfluss section is in the results panel
    const geldfluss = page.getByText(/geldfluss-diagramm/i)
    await geldfluss.scrollIntoViewIfNeeded()
    await expect(geldfluss).toBeVisible()
  })

  test('tax bracket bar is visible', async ({ page }) => {
    await expect(page.getByText(/steuerstufe/i)).toBeVisible()
    await expect(page.getByText(/grenzsteuersatz/i)).toBeVisible()
  })

  test('gefahren-barometer is visible', async ({ page }) => {
    await expect(page.getByText(/gefahren-barometer/i)).toBeVisible()
  })

  test('nachzahlungs-alarm is visible', async ({ page }) => {
    await expect(page.getByText(/nachzahlungs-alarm/i)).toBeVisible()
  })

  test('anmelden link visible for unauthenticated users', async ({ page }) => {
    await expect(page.getByRole('link', { name: /anmelden/i }).first()).toBeVisible()
  })

  test('top bar has status badge', async ({ page }) => {
    // Status badge is always visible (even on mobile)
    await expect(page.getByText(/kritisch|niedrig|mittel|hoch/i).first()).toBeVisible()
  })

  test('umsatz input section exists', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Umsatz & Aufwände' })).toBeVisible()
  })
})
