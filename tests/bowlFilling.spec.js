
// @ts-check
import { test, expect } from '@playwright/test';

test('Filling_Bowl_Grids', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  // Filling left bowl 
  for (let i = 0; i <= 8; i++) {
    await page.fill(`#left_${i}`, i.toString());
  }

  // Filling right bowl
  for (let i = 0; i <= 8; i++) {
    await page.fill(`#right_${i}`, i.toString()); 
  }

  // Assertion checks for verifying values
  for (let i = 0; i <= 8; i++) {
    const leftValue = await page.inputValue(`#left_${i}`);
    await expect(leftValue).toBe(i.toString());

    const rightValue = await page.inputValue(`#right_${i}`);
    await expect(rightValue).toBe(i.toString());
  }
});
