import { expect, test } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/index-v2.html');

  await expect(page).toHaveTitle(/Suchona \| Bengali Association/);
  await expect(page.locator('body')).toBeVisible();
});

test('shared footer mounts on every existing page', async ({ page }) => {
  const routes = [
    '/index-v2.html',
    '/events.html',
    '/durga-puja-2026.html',
    '/our-story.html',
    '/who-we-are.html',
    '/gallery.html',
    '/magazine.html',
    '/contact.html',
    '/donate.html',
  ];

  for (const route of routes) {
    await page.goto(route);
    const footer = page.locator('.footer-v2');
    await expect(footer).toBeVisible();
    await expect(footer.locator('.footer-v2-brand-name')).toHaveText('Suchona');
    await expect(footer.locator('.footer-v2-group a')).toHaveCount(9);
  }
});
