
// @ts-check
import { test, expect } from '@playwright/test';

test('gold bar clicking', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  // Button IDs
  const buttonIds = ['coin_0', 'coin_1', 'coin_2', 'coin_3', 'coin_4', 'coin_5', 'coin_6', 'coin_7', 'coin_8'];

  for (const id of buttonIds) {
    let alertOccurred = false; // Tracking if pop up has appeared

    page.once('dialog', async dialog => {
      console.log(`Alert message after clicking ${id}: ${dialog.message()}`);
      alertOccurred = true; // Alert has occurred hence value turned to true
      await dialog.dismiss();
    });

    console.log(`Clicking bar: ${id}`);
    await page.click(`#${id}`);

    // Asserting if dialog has appeared or not
    await expect(alertOccurred).toBeTruthy();

  }
});
