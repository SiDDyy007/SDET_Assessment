
// @ts-check
import { test, expect } from '@playwright/test';

test('Clicking_Buttons', async ({ page }) => {
    await page.goto('http://sdetchallenge.fetch.com/');

    //Clicking the reset button
    await page.getByRole('button', { name: 'reset' }).click();

    // Checking that each input field is empty
    for (let i = 0; i <= 8; i++) {
      const inputSelector = `#left_${i}`;
      const inputValue = await page.inputValue(inputSelector);
      await expect(inputValue).toBe(''); 
    }

    //Reset button works fine!

    //Clicking the Weigh button
    await page.getByRole('button', { name: 'weigh' }).click();

    // Assertion for the measurement result
    const measurementResult = await page.textContent('.result button'); 
    await expect(measurementResult).toBe('?');
    
    // Waiting for the weighing list to update
    await page.waitForTimeout(2000); // 2 second gap

    // Assertion for the last element in the weighing list
    const weighings = await page.$$eval('.game-info ol li', items => items.map(item => item.textContent));
    await expect(weighings[weighings.length - 1]).toBe('[] = []');
    

    
  });