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
    
    // Mät startup time
    const startTime = Date.now();
    
    // Vänta tills video spelar
    await page.waitForFunction(() => {
      const v = document.querySelector('video');
      return v && !v.paused && v.currentTime > 0;
    }, { timeout: 10000 });
    
    const startupTime = Date.now() - startTime;
    
    console.log(`Startup time: ${startupTime}ms`);
    expect(startupTime).toBeLessThan(3000);
  });

  test('video plays without buffering for 10 seconds', async ({ page }) => {
    await page.goto('/');
    
    const video = page.locator('video');
    await expect(video).toBeVisible();
    
    // Räkna buffering events
    await page.evaluate(() => {
      (window as any).bufferCount = 0;
      const v = document.querySelector('video');
      v?.addEventListener('waiting', () => {
        (window as any).bufferCount++;
      });
    });
    
    // Vänta 10 sekunder
    await page.waitForTimeout(10000);
    
    const bufferCount = await page.evaluate(() => (window as any).bufferCount || 0);
    
    console.log(`Buffer events: ${bufferCount}`);
    expect(bufferCount).toBeLessThanOrEqual(1);
  });

});