/**
 * AuthPage - Handles OTP-based Login Flow
 *
 * This page object automates the login process on ServiceMarket.
 * The login flow is:
 *   1. Open the homepage
 *   2. Click the "Login" button
 *   3. Enter the phone number and click "Next"
 *   4. Fill in the 4-digit OTP code (one digit per input field)
 *   5. Wait for the login modal to close
 *
 * Used by global-setup.ts to authenticate once before all tests.
 */
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
  // Selectors for elements on the login/auth screens
  readonly loginButtonSel = 'a, button';                                          // Generic selector, filtered by "Login" text
  readonly phoneNumberSel = '#phoneNumber';                                       // Phone number input field
  readonly nextButtonSel = 'button:has-text("Next"), .btn-secondary';             // "Next" button after phone entry
  readonly otpInputSel = 'input[maxlength="1"], .otp-input';                      // Individual OTP digit input fields
  readonly modalBackdropSel = '.modal-backdrop, .loading-overlay';                // Login modal overlay

  constructor(page: Page) {
    super(page);
  }

  /** Step 1: Navigate to the ServiceMarket homepage and wait for it to fully load */
  async navigateToHomepage(url: string) {
    console.log('Step 1: Opening homepage...');
    await this.page.goto(url, { waitUntil: 'networkidle' });
    await this.page.waitForTimeout(2000);
  }

  /** Step 2: Find and click the "Login" button on the homepage */
  async clickLoginButton() {
    console.log('Step 2: Clicking Login...');
    const loginButton = this.page.locator(this.loginButtonSel).filter({ hasText: /^Login$/i }).first();
    await loginButton.click();
    await this.page.waitForTimeout(2000);
  }

  /** Step 3: Type the phone number into the input and click "Next" to go to OTP screen */
  async enterPhoneNumber(phoneNumber: string) {
    console.log('Step 3: Entering phone number...');
    await this.page.locator(this.phoneNumberSel).fill(phoneNumber);
    await this.page.locator(this.nextButtonSel).filter({ visible: true }).click();
    await this.page.waitForTimeout(2000);
  }

  /** Step 4: Fill in the OTP code — each digit goes into a separate input field */
  async fillOTP(otpDigits: string) {
    console.log('Step 4: Filling OTP...');
    const otpFields = this.page.locator(this.otpInputSel).filter({ visible: true });
    await otpFields.first().waitFor({ state: 'visible', timeout: 10000 });

    // Type each digit into its corresponding input field
    const count = await otpFields.count();
    for (let i = 0; i < Math.min(count, otpDigits.length); i++) {
      await otpFields.nth(i).press(otpDigits[i]);
      await this.page.waitForTimeout(1000);
    }

    // Wait for OTP verification and login to complete
    await this.page.waitForTimeout(20000);
  }

  /** Step 4.1: Wait for the login modal/overlay to disappear after successful login */
  async waitForLoginModalToClose() {
    console.log('Step 4.1: Waiting for login modal to clear...');
    await this.page
      .waitForSelector(this.modalBackdropSel, { state: 'hidden', timeout: 5000 })
      .catch(() => null); // Ignore if modal is already gone
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  /** Complete login flow — runs all steps in order: navigate -> login -> phone -> OTP -> wait */
  async loginWithOTP(url: string, phoneNumber: string, otpDigits: string) {
    await this.navigateToHomepage(url);
    await this.clickLoginButton();
    await this.enterPhoneNumber(phoneNumber);
    await this.fillOTP(otpDigits);
    await this.waitForLoginModalToClose();
  }
}
