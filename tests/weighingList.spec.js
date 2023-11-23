
// @ts-check
import { test, expect } from '@playwright/test';

test('Get_Weighing_List', async ({ page }) => {
    await page.goto('http://sdetchallenge.fetch.com/');
  
    // Retrieve items
    const weighings = await page.$$eval('.game-info ol li', items => items.map(item => item.textContent));
  
    // Output
    console.log('Weighings List:', weighings);
  
  });