/**
 * DashboardPage - Represents the User Dashboard
 *
 * This page object is used to interact with the dashboard after login.
 * Currently it only checks whether the user is logged in by looking
 * for profile/account menu elements (like Logout or Sign out buttons).
 */
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // Selector for the profile/account menu — looks for logout/sign out options to confirm login
  readonly profileMenu = 'button[aria-label*="account"], text=Logout, text=Sign out';

  constructor(page: Page) {
    super(page);
  }

  /** Check if the user is currently logged in by looking for the profile menu */
  async isLoggedIn() {
    return this.isVisible(this.profileMenu);
  }
}
