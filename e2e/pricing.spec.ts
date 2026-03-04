import { test, expect } from '@playwright/test'

test.describe('Pricing Page', () => {
  test('loads and shows plans', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText('Free').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/steuerboard pro/i).first()).toBeVisible()
  })

  test('shows pricing amounts in EUR', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText('EUR').first()).toBeVisible({ timeout: 10000 })
  })

  test('shows monthly/yearly toggle', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText(/monatlich/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/jährlich/i).first()).toBeVisible()
  })
})
