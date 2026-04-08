/**
 * Global Setup Script
 *
 * This file runs ONCE before all tests begin.
 * Purpose: Log in to the ServiceMarket UAT site using OTP authentication,
 * then save the authenticated session (cookies/localStorage) to 'auth-state.json'.
 * All subsequent tests reuse this saved session so they don't need to log in again.
 Add new comment*/

import { chromium, FullConfig } from '@playwright/test';
import { AuthPage } from './src/pages/AuthPage';

async function globalSetup(config: FullConfig) {
  console.log('\n========================================');
  console.log('🔐 GLOBAL SETUP - Single Authentication');
  console.log('========================================');

  // Launch a visible Chrome browser for the login process
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'],
    channel: 'chrome',
  });

  // Create a browser context with HTTP Basic Auth (required for UAT environment)
  const context = await browser.newContext({
    viewport: null,
    httpCredentials: {
      username: 'admin',
      password: 'SMAPR2020',
    },
  });

  // Open a new page and use the AuthPage helper to perform OTP login
  const page = await context.newPage();
  const authPage = new AuthPage(page);

  // Perform login: navigate to site, enter phone number, fill OTP code
  await authPage.loginWithOTP(
    'https://uat2.servicemarket.com/en/dubai?r=hixq967',  // UAT homepage URL
    '551111110',                                            // Test phone number
    '0000'                                                  // Test OTP code
  );

  console.log('✓ Authentication completed successfully!');
  console.log('✓ Saving authentication state...');

  // Save all cookies and localStorage to a JSON file for reuse in tests
  await context.storageState({ path: 'auth-state.json' });

  // Close the browser since setup is done
  await browser.close();

  console.log('✓ Global setup completed!\n');
}

export default globalSetup;
