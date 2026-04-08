/**
 * Playwright Configuration File
 *
 * This is the main config file for the Playwright test framework.
 * It defines how tests are run, which browser to use, and shared settings
 * like authentication state and credentials for all tests.
 */
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Maximum time (in ms) each test can run before timing out
  timeout: 10000,

  // Run this script once BEFORE all tests (handles login & saves auth state)
  globalSetup: './global-setup.ts',

  // Run this script once AFTER all tests (cleanup/logging)
  globalTeardown: './global-teardown.ts',

  // Tests run sequentially (not in parallel) to avoid conflicts
  fullyParallel: false,

  // Only 1 browser instance at a time
  workers: 1,

  use: {
    // Reuse the saved login session from global setup so tests don't need to login again
    storageState: 'auth-state.json',

    // Save trace logs only when a test fails (useful for debugging)
    trace: 'retain-on-failure',

    // Use full browser window size (no fixed viewport)
    viewport: null,

    // HTTP Basic Auth credentials required to access the UAT environment
    httpCredentials: {
      username: 'admin',
      password: 'SMAPR2020',
    },
  },

  // Define which browsers to test on
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',       // Use Chromium engine
        channel: 'chrome',             // Use installed Chrome browser
        headless: false,               // Show the browser window (not headless)
        viewport: null,                // Full window size
        launchOptions: {
          args: ['--start-maximized'], // Start browser maximized
        },
      },
    },
  ],
});
