/**
 * BasePage - Parent class for all Page Objects
 *
 * This is the foundation class that all other page classes extend.
 * It provides common/reusable actions like clicking, filling inputs,
 * reading text, and checking visibility. These methods include built-in
 * waits so elements are visible before interacting with them.
 *
 * Using a BasePage avoids duplicating common logic in every page class.
 */
import { Page } from '@playwright/test';

export class BasePage {
  // The Playwright Page object — represents the browser tab
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to a given URL path (defaults to homepage '/') */
  async goto(path = '/') {
    await this.page.goto(path);
  }

  /** Wait for an element to be visible, then click it (15s timeout) */
  async click(selector: string) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.click();
  }

  /** Wait for an input field to be visible, then type a value into it */
  async fill(selector: string, value: string) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.fill(value);
  }

  /** Get the text content of an element */
  async text(selector: string) {
    return this.page.textContent(selector);
  }

  /** Check if an element is currently visible on the page */
  async isVisible(selector: string) {
    return this.page.isVisible(selector);
  }
}
