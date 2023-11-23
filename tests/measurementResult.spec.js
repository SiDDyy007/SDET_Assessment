
// @ts-check
import { test, expect } from '@playwright/test';

test('Get_Measurement_Result', async ({ page }) => {
    await page.goto('http://sdetchallenge.fetch.com/');
    
    const measurementResult = await page.textContent('.result button'); 

    // Assertion for the measurement result
    await expect(measurementResult).toBe('?');
  
    // Output the result
    console.log('Measurement Result:', measurementResult);
  });