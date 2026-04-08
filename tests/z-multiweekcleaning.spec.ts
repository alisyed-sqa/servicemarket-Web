/**
 * Test: Multi-Week Cleaning Booking (MULTIPLE_TIMES_WEEK frequency)
 *
 * This test verifies the complete end-to-end booking flow for a cleaning
 * service that repeats multiple times per week. It uses the pre-authenticated
 * session (from global setup) so no login is needed.
 *
 * Flow: Homepage -> Cleaning Page -> Book Now -> Select Options (2hrs, Multiple/Week, Days 2&3) ->
 *       Address -> Time Slot -> Confirm Booking -> Back to Home
 */
import { test, expect } from '@playwright/test';
import { MultiWeekCleaningPage } from '../src/pages/MultiWeekCleaningPage';

test.describe('3. Multi Week Cleaning Booking (MULTIPLE_TIMES_WEEK)', () => {

  // Allow up to 3 minutes for the full booking flow
  test.setTimeout(180000);

  test('Complete multi week cleaning booking flow', async ({ page }) => {
    // Create the page object that handles all multi-week booking interactions
    const multiWeekCleaningPage = new MultiWeekCleaningPage(page);

    console.log('\n========================================');
    console.log('🗓️  MULTI WEEK CLEANING - MULTIPLE_TIMES_WEEK');
    console.log('========================================');

    // Navigate to home page (already authenticated via global setup's storageState)
    await page.goto('https://uat2.servicemarket.com/en/dubai');
    await page.waitForTimeout(3000);

    // Execute the full booking flow step by step
    await multiWeekCleaningPage.navigateToMultiWeekCleaning();  // Go to cleaning service page
    await multiWeekCleaningPage.clickBookNow();                  // Click "Book Now"
    await multiWeekCleaningPage.selectBookingOptions();          // Choose 2hrs + Multiple/Week + Days 2&3
    await multiWeekCleaningPage.selectAddress();                 // Pick a saved address
    await multiWeekCleaningPage.clickNextButton();               // Proceed to time slot
    await multiWeekCleaningPage.selectTimeSlot();                // Pick day and time
    await multiWeekCleaningPage.clickNextButtonFinal();          // Go to summary page
    await multiWeekCleaningPage.completeBooking();               // Take verification screenshot
    await multiWeekCleaningPage.submitFinalBooking();            // Confirm the booking
    await multiWeekCleaningPage.navigateToHomeScreen();          // Return to homepage

    // Verify we're still on the ServiceMarket site
    expect(page.url()).toContain('servicemarket.com');
    console.log('✓ Multi Week Cleaning booking completed!\n');
  });
});
