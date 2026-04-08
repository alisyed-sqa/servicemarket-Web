/**
 * WomenSalonPage - Page Object for Women's Salon Service Booking
 *
 * This page object automates the complete booking flow for a Women's Salon
 * (at-home salon) service on ServiceMarket. The booking steps are:
 *   1. Navigate to the Women Salon service page
 *   2. Click "Book Now"
 *   3. Select a service/SKU from the product list
 *   4. Select add-on services (optional extras)
 *   5. Select a saved address
 *   6. Pick a day and time slot
 *   7. Review and submit the booking
 *   8. Navigate back to the home screen
 *
 * Different from cleaning pages because it involves selecting
 * specific salon products/SKUs and optional add-on services.
 */
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class WomenSalonPage extends BasePage {
  // --- Element Selectors ---
  readonly salonCardSel = 'xpath=(//*[@href="/en/dubai/home-salon-services"])[2]';    // Women salon card on homepage
  readonly bookNowButtonSel = 'button, a, .btn';                                      // Generic "Book Now" button selector
  readonly bookNowText = /Book Now/i;                                                  // Text filter for Book Now
  readonly productCartSel = '.product-cart';                                           // Product/service card in salon catalog
  readonly addressInputSel = 'xpath=//input[@id="address-491983"]';                   // Saved address radio button
  readonly dayContainerSel = 'xpath=(//*[@class="days-container"]/div)[2]';           // 2nd available day
  readonly timeSlotSel = 'xpath=(//*[@class="booking-time-slot"])[1]';                // 1st available time slot
  readonly nextButtonSel = 'xpath=//*[text()="Next"]';                                // "Next" button
  readonly finalBookNowSel = 'xpath=//*[text()="Book Now"]';                          // Final "Book Now" button
  readonly homeScreenBtn = '.btn.btn-ghost';                                           // Home/logo button in navbar

  constructor(page: Page) {
    super(page);
  }

  /** Step 5: Click the Women Salon service card on the homepage */
  async navigateToWomenSalon() {
    console.log('Step 5: Navigating to Women Salon...');
    const salonCard = this.page.locator(this.salonCardSel);
    await salonCard.waitFor({ state: 'visible', timeout: 30000 });
    await salonCard.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await salonCard.click({ force: true });
  }

  /** Step 6: Click the "Book Now" button on the salon service page */
  async clickBookNow() {
    console.log('Step 6: Clicking Book Now...');
    const bookNowBtn = this.page
      .locator(this.bookNowButtonSel)
      .filter({ hasText: this.bookNowText })
      .filter({ visible: true })
      .first();

    await this.page.waitForTimeout(5000);
    await bookNowBtn.waitFor({ state: 'visible', timeout: 75000 });
    await bookNowBtn.scrollIntoViewIfNeeded();
    await bookNowBtn.click({ force: true });

    // Allow page to fully load after clicking Book Now
    await this.page.waitForTimeout(10000);
  }

  /**
   * Step 7: Select a salon service (SKU) and an add-on product.
   * - First: selects the 1st product from the main salon catalog
   * - Then: clicks Next to go to the add-on screen
   * - Then: selects the 41st add-on product from the add-on list
   * - Finally: clicks Next to go to the address screen
   */
  async selectBookingOptions() {
    console.log('Step 7: Selecting booking options...');

    // Wait for page to stabilize after load
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);

    // Select the 1st product/SKU from the main service catalog
    const firstSKU = this.page.locator(this.productCartSel).first();
    await firstSKU.waitFor({ state: 'visible', timeout: 75000 });
    await firstSKU.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(3000);
    await firstSKU.click({ force: true });
    console.log('✓ Selected 1st SKU');
    await this.page.waitForTimeout(3000);

    // Click Next to go to the add-on selection screen
    const nextButton = this.page.locator(this.nextButtonSel);
    await nextButton.click({ force: true });
    console.log('✓ Next button clicked - navigating to Addon screen');
    await this.page.waitForTimeout(3000);

    // Select the 41st add-on product from the add-on catalog
    const addonProduct = this.page.locator(this.productCartSel).nth(40);
    await addonProduct.waitFor({ state: 'visible', timeout: 75000 });
    await addonProduct.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await addonProduct.click({ force: true });
    console.log('✓ Selected 41st Addon');
    await this.page.waitForTimeout(2000);

    // Click Next to go to the address selection screen
    const nextButtonToAddress = this.page.locator(this.nextButtonSel);
    await nextButtonToAddress.click({ force: true });
    console.log('✓ Next button clicked - navigating to address screen');
    await this.page.waitForTimeout(6000);
  }

  /** Step 8: Select a saved address from the address list */
  async selectAddress() {
    console.log('Step 8: Selecting first address from list...');
    const firstAddress = this.page.locator(this.addressInputSel);
    await firstAddress.waitFor({ state: 'visible', timeout: 75000 });
    await firstAddress.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(3000);
    await firstAddress.click({ force: true });
    await this.page.waitForTimeout(6000);
  }

  /** Step 8.1: Click "Next" to proceed after address selection */
  async clickNextButton() {
    console.log('Step 8.1: Clicking Next button...');
    const nextButton = this.page.locator(this.nextButtonSel);
    await nextButton.click({ force: true });
    console.log('✓ Next button clicked');
    await this.page.waitForTimeout(3000);
  }

  /** Step 9: Select the 2nd available day and the 1st available time slot */
  async selectTimeSlot() {
    console.log('Step 9: Selecting day and booking time slot...');

    // Select the 2nd day from the calendar
    const dayContainer = this.page.locator(this.dayContainerSel);
    await dayContainer.waitFor({ state: 'visible', timeout: 75000 });
    await this.page.waitForTimeout(2000);
    await dayContainer.click({ force: true });
    console.log('✓ Selected 2nd day');
    await this.page.waitForTimeout(5000);

    // Select the 1st available time slot
    const timeSlot = this.page.locator(this.timeSlotSel);
    await timeSlot.waitFor({ state: 'visible', timeout: 75000 });
    await timeSlot.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await timeSlot.click({ force: true });
    console.log('✓ Selected 1st time slot');
    await this.page.waitForTimeout(3000);
  }

  /** Step 9.1: Click "Next" to proceed to the booking summary page */
  async clickNextButtonFinal() {
    console.log('Step 9.1: Clicking Next button...');
    const nextButton = this.page.locator(this.nextButtonSel);
    await nextButton.click({ force: true });
    console.log('✓ Next button clicked');
    await this.page.waitForTimeout(3000);
  }

  /** Take a screenshot of the booking summary for verification */
  async completeBooking() {
    console.log('Step 9: Success Check...');
    await this.page.waitForLoadState('load');
    await this.page.screenshot({ path: 'screenshots/booking-complete.png', fullPage: true });
  }

  /** Step 10: Scroll to bottom and click the final "Book Now" button to confirm */
  async submitFinalBooking() {
    console.log('Step 10: Clicking Book Now button...');

    // Scroll to the bottom of the page to reveal the Book Now button
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(2000);

    const bookNowFinalBtn = this.page.locator(this.finalBookNowSel);
    await bookNowFinalBtn.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await bookNowFinalBtn.click({ force: true });
    console.log('✓ Book Now button clicked');
    await this.page.waitForTimeout(10000);
  }

  /** Step 11: Navigate back to the home screen by clicking the logo/home button */
  async navigateToHomeScreen() {
    console.log('Step 11: Navigating to home screen...');

    // Scroll to the top to access the navbar
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForTimeout(2000);

    // Click the home/logo button (ghost-styled button in navbar)
    const homeScreenButton = this.page.locator(this.homeScreenBtn).filter({ visible: true }).first();
    await homeScreenButton.waitFor({ state: 'visible', timeout: 30000 });
    await homeScreenButton.click({ force: true });
    console.log('✓ Navigated to home screen');
    await this.page.waitForTimeout(10000);
  }
}
