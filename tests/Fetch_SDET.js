
// @ts-check
import { test, expect } from '@playwright/test';

test('website loaded check', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');
  await expect(page).toHaveTitle(/React App/);
});

test('clicking buttons', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  await page.getByRole('button', { name: 'weigh' }).click();

  await page.getByRole('button', { name: 'reset' }).click();
});

test('getting measurement results', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  const measurementResults = await page.innerText('#reset');

  // Output the button's text content
  console.log('Button text:', measurementResults);
});

test('filling bowl grids', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  await page.fill('#left_0', '1');
  await page.fill('#left_1', '2');
  await page.fill('#left_2', '3');
  await page.fill('#left_3', '4');
  await page.fill('#left_4', '5');
  await page.fill('#left_5', '6');
  await page.fill('#left_6', '7');
  await page.fill('#left_7', '8');
  await page.fill('#left_8', '0');

  await page.fill('#right_0', '0');
  await page.fill('#right_1', '1');
  await page.fill('#right_2', '2');
  await page.fill('#right_3', '3');
  await page.fill('#right_4', '4');
  await page.fill('#right_5', '5');
  await page.fill('#right_6', '6');
  await page.fill('#right_7', '7');
  await page.fill('#right_8', '8');

});

test('get weighting list', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  // Retrieve the list items
  const weighings = await page.$$eval('.game-info ol li', items => items.map(item => item.textContent));

  // Output the list items
  console.log('Weighings List:', weighings);

 
});

test('gold bar clicking', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  // Function to handle alert dialogs and log their message
  page.on('dialog', async dialog => {
    console.log(`Alert message: ${dialog.message()}`);
    await dialog.dismiss();
  });

  // IDs of the buttons to click
  const buttonIds = ['coin_0', 'coin_1', 'coin_2', 'coin_3', 'coin_4', 'coin_5', 'coin_6', 'coin_7', 'coin_8'];

  for (const id of buttonIds) {
    // Click each button
    console.log(`Clicking button: ${id}`);
    await page.click(`#${id}`);
    // Add a pause if necessary to wait for the alert to appear
    // await page.waitForTimeout(1000); // wait for 1 second, adjust as needed
  }

 
});

test('find fake gold bar', async ({ page }) => {
  await page.goto('http://sdetchallenge.fetch.com/');

  let bars = [0, 1, 2, 3, 4, 5, 6, 7];
  const lastBar = 8;
  let numberOfWeighings = 0;

  // Handle alert dialogs and log their message
  let alertMessage = '';
  page.on('dialog', async dialog => {
    alertMessage = dialog.message();
    await dialog.dismiss();
  });

  // Function to weigh a group of bars
  async function weighBars(leftBars, rightBars) {
    for (const bar of leftBars) {
      await page.fill(`#left_${bar}`, bar.toString());
    }
    for (const bar of rightBars) {
      await page.fill(`#right_${bar}`, bar.toString());
    }

    await page.getByRole('button', { name: 'weigh' }).click();
    numberOfWeighings++;

  // Wait for the result text to change from '?'
  await page.waitForFunction(
    selector => {
      const element = document.querySelector(selector);
      return element !== null && element.textContent !== null && element.textContent.trim() !== '?';
    },
    '#reset', // Replace with the correct selector for the result element
    { timeout: 5000 } // Timeout in milliseconds, adjust as necessary
  );


    // Wait for one second
  // await page.waitForTimeout(3000);

    const result = await page.innerText('#reset'); 
    // console.log(result)
    await page.getByRole('button', { name: 'reset' }).click();
    
    return result;
  }

  let result = await weighBars(bars.slice(0, 4), bars.slice(4));

  if (result == '=') {
    await page.click(`#coin_${lastBar}`);
    console.log(`The fake gold bar is: ${lastBar}`);
    return;
  } else {


  let remainingBars = result === '<' ? bars.slice(0, 4) : bars.slice(4);
  

  while (remainingBars.length > 1) {
    let mid = Math.floor(remainingBars.length / 2);
    let leftGroup = remainingBars.slice(0, mid);
    let rightGroup = remainingBars.slice(mid);

    result = await weighBars(leftGroup, rightGroup);

    remainingBars = result == '<' ? leftGroup : rightGroup;
  }

  // The remaining bar is the fake one
  await page.click(`#coin_${remainingBars[0]}`);
  console.log(`The fake gold bar is: ${remainingBars[0]}`);
  }


  const weighingsList = await page.$$eval('.game-info ol li', items => items.map(item => item.textContent));

  console.log(`Alert message: ${alertMessage}`);
  console.log(`Number of weighings: ${numberOfWeighings}`);
  console.log(`List of weighings made: ${weighingsList.join(', ')}`);
});



