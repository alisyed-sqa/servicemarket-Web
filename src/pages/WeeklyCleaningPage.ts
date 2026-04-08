/**
 * WeeklyCleaningPage - Page Object for Weekly Home Cleaning Booking
 *
 * This page object automates the complete booking flow for a WEEKLY (recurring)
 * home cleaning service on ServiceMarket. The booking steps are:
 *   1. Navigate to the Home Cleaning service page
 *   2. Click "Book Now"
 *   3. Select options: 2 hours duration, EVERY_WEEK frequency
 *   4. Select a saved address
 *   5. Pick a day and time slot
 *   6. Review and submit the booking
 *   7. Navigate back to the home screen
 *
 * Similar to HomeCleaningPage but uses EVERY_WEEK frequency instead of ONCE.
 */
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomeCleaningPageWeekly extends BasePage {
  // --- Element Selectors ---
  readonly cleaningCardSel = 'xpath=(//*[@href="/en/dubai/cleaning-maid-services"])[2]';  // Home cleaning card on homepage
  readonly bookNowButtonSel = 'button, a, .btn';                                          // Generic "Book Now" button selector
  readonly bookNowText = /Book Now/i;                                                      // Text filter for Book Now
  readonly twoHoursLabel = 'label[for="noOfHours-2"]';                                    // "2 hours" duration option
  readonly frequencyLabel = 'label[for="howOften-EVERY_WEEK"]';                           // "Every Week" frequency (weekly recurring)
  readonly addressInputSel = 'xpath=//input[@id="address-491983"]';                       // Saved address radio button
  readonly dayContainerSel = 'xpath=(//*[@class="days-container"]/div)[2]';               // 2nd available day
  readonly timeSlotSel = 'xpath=(//*[@class="booking-time-slot"])[1]';                    // 1st available time slot
  readonly nextButtonSel = 'xpath=//*[text()="Next"]';                                    // "Next" button
  readonly finalBookNowSel = 'xpath=//*[text()="Book Now"]';                              // Final "Book Now" button
  readonly homeScreenBtn = '.btn.btn-ghost';                                               // Home/logo button in navbar

  constructor(page: Page) {
    super(page);
  }

  /** Step 5: Click the Home Cleaning service card on the homepage */
  async navigateToHomeCleaningPageWeekly() {
    console.log('Step 5: Navigating to Weekly Cleaning...');
    const cleaningCard = this.page.locator(this.cleaningCardSel);
    await cleaningCard.waitFor({ state: 'visible', timeout: 30000 });
    await cleaningCard.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);
    await cleaningCard.click({ force: true });
  }

  /** Step 6: Click the "Book Now" button on the cleaning service page */
  async clickBookNow() {
    console.log('Step 6: Clicking Book Now...');
    const bookNowBtn = this.page
      .locator(this.bookNowButtonSel)
      .filter({ hasText: this.bookNowText })
      .filter({ visible: true })
      .first();

    await this.page.waitForTimeout(2000);
    await bookNowBtn.waitFor({ state: 'visible', timeout: 75000 });
    await bookNowBtn.scrollIntoViewIfNeeded();
    await bookNowBtn.click({ force: true });
  }

  /** Step 7: Select 2 hours duration and EVERY_WEEK frequency, then click Next */
  async selectBookingOptions() {
    console.log('Step 7: Selecting booking options...');

    // Select number of hours: 2
    await this.page.locator(this.twoHoursLabel).click();
    console.log('✓ Selected 2 hours');
    await this.page.waitForTimeout(2000);

    // Select frequency: EVERY_WEEK (weekly recurring booking)
    await this.page.locator(this.frequencyLabel).click();
    console.log('✓ Selected frequency: EVERY_WEEK');
    await this.page.waitForTimeout(2000);

    // Click Next to proceed to the address selection screen
    const nextButton = this.page.locator(this.nextButtonSel);
    await nextButton.click({ force: true });
    console.log('✓ Next button clicked');
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
