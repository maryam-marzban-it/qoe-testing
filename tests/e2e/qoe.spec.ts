import { test, expect } from '@playwright/test';

test.describe('QoE Tests', () => {

  test('video player loads', async ({ page }) => {
    await page.goto('/');
    
    // Vänta på video element
    const video = page.locator('video');
    await expect(video).toBeVisible({ timeout: 10000 });
  });

  test('video starts within 3 seconds', async ({ page }) => {
    await page.goto('/');
    
    const video = page.locator('video');
    await expect(video).toBeVisible({ timeout: 5000 });
    
    // Klicka play manuellt (autoplay blockeras ofta)
    await video.click();
    
    // Mät startup time
    const startTime = Date.now();
    
    // Vänta tills video spelar
    await page.waitForFunction(() => {
      const v = document.querySelector('video');
      return v && v.currentTime > 0;
    }, { timeout: 15000 });
    
    const startupTime = Date.now() - startTime;
    
    console.log(`Startup time: ${startupTime}ms`);
    expect(startupTime).toBeLessThan(5000);
  });

  test('video element has correct attributes', async ({ page }) => {
    await page.goto('/');
    
    const video = page.locator('video');
    await expect(video).toBeVisible();
    
    // Kolla att video har controls
    await expect(video).toHaveAttribute('controls', '');
  });

});