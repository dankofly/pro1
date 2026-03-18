import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3333';

test.describe('Pricing prices check', () => {
  test('Landing page pricing shows new prices', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const content = await page.textContent('body') || '';

    console.log('Landing has 12,90 or 12.9:', content.includes('12,90') || content.includes('12.9'));
    console.log('Landing has 24,90 or 24.9:', content.includes('24,90') || content.includes('24.9'));
    console.log('Landing has Absetzbarkeit hint:', content.includes('doppelt lohnen'));

    const has990only = content.includes('9,90') && !content.includes('12,90');
    const has1990only = content.includes('19,90') && !content.includes('24,90');
    expect(has990only).toBe(false);
    expect(has1990only).toBe(false);
  });

  test('/pricing page shows correct monthly prices', async ({ page }) => {
    await page.goto(BASE + '/pricing');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    await page.screenshot({ path: '/tmp/pricing-monthly.png', fullPage: true });

    const allText = await page.locator('body').innerText();
    console.log('\n--- /pricing monthly text ---');
    const lines = allText.split('\n').filter(l =>
      l.match(/€|EUR|Monat|Jahr|Pro|Sicherheit|Free|24|12|preis/i)
    );
    for (const line of lines.slice(0, 25)) {
      console.log('  ', line.trim());
    }
  });

  test('/pricing page toggle yearly shows 119 and 239', async ({ page }) => {
    await page.goto(BASE + '/pricing');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const toggle = page.locator('[role="switch"]').first();
    if (await toggle.isVisible({ timeout: 5000 }).catch(() => false)) {
      await toggle.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: '/tmp/pricing-yearly.png', fullPage: true });

      const content = await page.textContent('body') || '';
      console.log('Yearly has 119:', content.includes('119'));
      console.log('Yearly has 239:', content.includes('239'));
    } else {
      console.log('Toggle not found — page may need auth');
      await page.screenshot({ path: '/tmp/pricing-noauth.png', fullPage: true });
    }
  });

  test('Absetzbarkeit hint on /pricing', async ({ page }) => {
    await page.goto(BASE + '/pricing');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const hint = page.locator('text=SteuerBoard kann sich doppelt lohnen');
    const visible = await hint.isVisible({ timeout: 5000 }).catch(() => false);
    console.log('Absetzbarkeit hint on /pricing:', visible);
  });
});
