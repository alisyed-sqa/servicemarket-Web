/**
 * Global Teardown Script
 *
 * This file runs ONCE after ALL tests have finished.
 * Purpose: Perform any cleanup tasks and log that the test suite is done.
 * Currently it only prints a summary message, but you can add cleanup logic
 * here (e.g., deleting temp files, clearing test data from the database).
 */
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('\n========================================');
  console.log('🔚 GLOBAL TEARDOWN');
  console.log('========================================');
  console.log('✓ All tests completed!');
  console.log('✓ Browser will close now.\n');
}

export default globalTeardown;
