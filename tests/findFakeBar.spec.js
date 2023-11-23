import { test, expect } from '@playwright/test';

test('find fake gold bar', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  // Taking 8 bars and leaving one out
  let bars = [0, 1, 2, 3, 4, 5, 6, 7];
  const lastBar = 8;
  let numberOfWeighings = 0;
  let alertMessage = '';

  async function weighBars(leftBars, rightBars) {
    for (const bar of leftBars) {
      await page.fill(`#left_${bar}`, bar.toString());
    }
    for (const bar of rightBars) {
      await page.fill(`#right_${bar}`, bar.toString());
    }

    await page.getByRole('button', { name: 'weigh' }).click();
    numberOfWeighings++;

    await page.waitForFunction(
      selector => {
        const element = document.querySelector(selector);
        return element !== null && element.textContent !== null && element.textContent.trim() !== '?';
      },
      '#reset',
      { timeout: 5000 } 
    );

    const result = await page.innerText('#reset'); 
    await page.getByRole('button', { name: 'reset' }).click();
    
    return result;
  }

  let result = await weighBars(bars.slice(0, 4), bars.slice(4));
  let remainingBars = result === '<' ? bars.slice(0, 4) : bars.slice(4);

  // If both sides are equal, then the one bar left out is the fake one else perform Binary search on the remaining bars.
  if (result === '=') {
    remainingBars = [lastBar];
  } else {
    while (remainingBars.length > 1) {
      let mid = Math.floor(remainingBars.length / 2);
      let leftGroup = remainingBars.slice(0, mid);
      let rightGroup = remainingBars.slice(mid);

      result = await weighBars(leftGroup, rightGroup);
      remainingBars = result === '<' ? leftGroup : rightGroup;
    }
  }

  const fakeGoldBar = remainingBars[0];
  page.once('dialog', async dialog => {
    alertMessage = dialog.message();
    await dialog.dismiss();
  });

  await page.click(`#coin_${fakeGoldBar}`);

  // Assert the alert message to check if we found it
  await expect(alertMessage).toBe('Yay! You find it!');

  console.log(`The fake gold bar is: ${fakeGoldBar}`);

  const weighingsList = await page.$$eval('.game-info ol li', items => items.map(item => item.textContent));
  console.log(`Alert message: ${alertMessage}`);
  console.log(`Number of weighings: ${numberOfWeighings}`);
  console.log(`List of weighings made: ${weighingsList.join(', ')}`);
});
