import { test, expect } from '@playwright/test'

test.describe('Steuerwissen Page', () => {
  test('page loads with H1 and quickstart questions', async ({ page }) => {
    await page.goto('/steuerwissen')
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/steuer/i).first()).toBeVisible()
    // Quickstart questions should be visible
    await expect(page.getByText(/einkommensteuer/i).first()).toBeVisible()
  })

  test('has correct SEO title', async ({ page }) => {
    await page.goto('/steuerwissen')
    await expect(page).toHaveTitle(/steuer-wissen/i)
  })

  test('has JSON-LD structured data', async ({ page }) => {
    await page.goto('/steuerwissen')
    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd.first()).toBeAttached({ timeout: 15000 })
  })

  test('shows CTA banner linking to Pro features', async ({ page }) => {
    await page.goto('/steuerwissen')
    // CTA should link to /steuerberater or /pricing
    const ctaLink = page.getByRole('link', { name: /steuerberater|pro/i }).first()
    await expect(ctaLink).toBeVisible({ timeout: 15000 })
  })

  test('chat input is visible', async ({ page }) => {
    await page.goto('/steuerwissen')
    const input = page.getByPlaceholder(/frag|steuerrecht/i).first()
    await expect(input).toBeVisible({ timeout: 15000 })
  })
})

test.describe('Steuerwissen Navigation', () => {
  test('sidebar shows Steuer-Wissen link on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/steuerwissen')
    await expect(page.getByRole('link', { name: /steuer-wissen/i }).first()).toBeVisible({ timeout: 15000 })
  })
})
