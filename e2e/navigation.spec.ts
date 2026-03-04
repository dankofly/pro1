import { test, expect } from '@playwright/test'

test.describe('Navigation & Static Pages', () => {
  test('impressum page loads', async ({ page }) => {
    await page.goto('/impressum')
    await expect(page.getByText(/impressum/i).first()).toBeVisible({ timeout: 10000 })
  })

  test('datenschutz page loads', async ({ page }) => {
    await page.goto('/datenschutz')
    await expect(page.getByText(/datenschutz/i).first()).toBeVisible({ timeout: 10000 })
  })

  test('faq page loads', async ({ page }) => {
    await page.goto('/faq')
    // Use heading or main content, not nav link (which may be truncated on mobile)
    await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 10000 })
  })

  test('404 handling for unknown routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('can navigate from landing to rechner', async ({ page }) => {
    await page.goto('/')
    // CTA says "Kostenlos starten"
    const link = page.getByRole('link', { name: /kostenlos starten|rechner|berechnen/i }).first()
    await link.click()
    await expect(page).toHaveURL(/rechner/)
  })
})
