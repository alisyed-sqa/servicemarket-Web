/**
 * Playwright Global Browser Manager (Singleton Pattern)
 *
 * This file provides a shared/global browser instance that can be reused
 * across multiple tests. It uses a singleton pattern — the browser, context,
 * and page are created only once and reused on subsequent calls.
 *
 * This avoids the overhead of launching a new browser for every test.
 * The saved auth state (auth-state.json) is loaded into the browser context
 * so all tests are already logged in.
 */
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

// Singleton variables — hold the single browser/context/page instances
let globalBrowser: Browser | null = null;
let globalContext: BrowserContext | null = null;
let globalPage: Page | null = null;

/**
 * Returns the shared browser instance. Launches Chrome if not already running.
 */
export async function getGlobalBrowser(): Promise<Browser> {
  if (!globalBrowser) {
    globalBrowser = await chromium.launch({
      headless: false,              // Show the browser window
      args: ['--start-maximized'],  // Start maximized
      channel: 'chrome',            // Use installed Chrome
    });
  }
  return globalBrowser;
}

/**
 * Returns the shared browser context. Creates one if it doesn't exist yet.
 * The context includes HTTP Basic Auth and the saved login session.
 */
export async function getGlobalContext(): Promise<BrowserContext> {
  if (!globalContext) {
    const browser = await getGlobalBrowser();
    globalContext = await browser.newContext({
      viewport: null,
      httpCredentials: {
        username: 'admin',
        password: 'SMAPR2020',
      },
      storageState: 'auth-state.json', // Reuse the saved login session
    });
  }
  return globalContext;
}

/**
 * Returns the shared page (tab). Creates one inside the global context if needed.
 */
export async function getGlobalPage(): Promise<Page> {
  if (!globalPage) {
    const context = await getGlobalContext();
    globalPage = await context.newPage();
  }
  return globalPage;
}

/**
 * Closes everything — page, context, and browser — and resets all to null.
 * Call this when all tests are done to clean up resources.
 */
export async function closeGlobalBrowser() {
  if (globalPage) {
    await globalPage.close();
    globalPage = null;
  }
  if (globalContext) {
    await globalContext.close();
    globalContext = null;
  }
  if (globalBrowser) {
    await globalBrowser.close();
    globalBrowser = null;
  }
}
