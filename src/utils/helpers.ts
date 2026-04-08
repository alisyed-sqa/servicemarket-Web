/**
 * Helper Functions
 *
 * Reusable utility functions used across test files.
 * Currently provides a shorthand for logging in with username/password
 * using the LoginPage page object.
 */
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Quick login helper — creates a LoginPage instance and performs login.
 * Use this in tests to log in with a single function call instead of
 * manually creating a LoginPage and calling login().
 *
 * @param page     - The Playwright page (browser tab)
 * @param username - The username/email to log in with
 * @param password - The password to log in with
 */
export async function loginAs(page: Page, username: string, password: string) {
  const login = new LoginPage(page);
  await login.login(username, password);
}
