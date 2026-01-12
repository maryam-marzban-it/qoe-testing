import { test, expect } from '@playwright/test';

test.describe('QoE Tests', () => {

  test('page loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Live Arena/);
  });

  test('video element exists', async ({ page }) => {
    await page.goto('/');
    const video = page.locator('video');
    await expect(video).toBeVisible({ timeout: 10000 });
  });

  test('QoE metrics panel exists', async ({ page }) => {
    await page.goto('/');
    const metrics = page.locator('#metrics');
    await expect(metrics).toBeVisible();
  });

  test('startup metric shows value', async ({ page }) => {
    await page.goto('/');
    const startup = page.locator('#startup');
    await expect(startup).toBeVisible();
  });

});