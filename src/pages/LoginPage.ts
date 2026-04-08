/**
 * LoginPage - Handles Username/Password Login
 *
 * This page object automates a traditional username/password login flow.
 * It tries to find the login form on the page, and if not visible,
 * it looks for common "Login" / "Sign in" links/buttons to navigate to it.
 *
 * Note: This is different from AuthPage which handles OTP-based login.
 * This page is for standard credential-based authentication.
 */
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Selectors for username, password, and submit button (supports multiple formats)
  readonly usernameSel = 'input[name="username"], input[id*="user"], input[type="email"]';
  readonly passwordSel = 'input[name="password"], input[type="password"]';
  readonly submitSel = 'button[type="submit"], button:has-text("Sign in"), button:has-text("Login")';

  constructor(page: Page) {
    super(page);
  }

  /** Navigate to the homepage (root URL) */
  async open() {
    await this.goto('/');
  }

  /**
   * Perform a full login with username and password.
   * If the login form isn't immediately visible, it tries clicking
   * common login entry points (Login, Sign in links/buttons).
   */
  async login(username: string, password: string) {
    await this.open();

    // Check if the username field is already visible on the page
    const usernameVisible = await this.page.locator(this.usernameSel).first().isVisible().catch(() => false);
    if (!usernameVisible) {
      // Try clicking common login links/buttons to reveal the login form
      const entrySelectors = ['a:has-text("Login")', 'a:has-text("Log in")', 'text=Sign in', 'text=Sign In', 'button:has-text("Login")'];
      for (const sel of entrySelectors) {
        const loc = this.page.locator(sel).first();
        if (await loc.count() && await loc.isVisible().catch(() => false)) {
          await loc.click();
          break;
        }
      }
    }

    // Fill in the credentials and submit the form
    await this.fill(this.usernameSel, username);
    await this.fill(this.passwordSel, password);
    await this.click(this.submitSel);
    // Wait for the page to finish loading after login
    await this.page.waitForLoadState('networkidle');
  }
}
