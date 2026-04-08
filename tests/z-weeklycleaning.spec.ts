/**
 * Test: Weekly Cleaning Booking (EVERY_WEEK frequency)
 *
 * This test verifies the complete end-to-end booking flow for a weekly
 * recurring cleaning service. It uses the pre-authenticated session
 * (from global setup) so no login is needed.
 *
 * Flow: Homepage -> Cleaning Page -> Book Now -> Select Options (2hrs, Every Week) ->
 *       Address -> Time Slot -> Confirm Booking -> Back to Home
 */
import { test, expect } from '@playwright/test';
import { HomeCleaningPageWeekly } from '../src/pages/WeeklyCleaningPage';

test.describe('2. Weekly Cleaning Booking (EVERY_WEEK)', () => {

  // Allow up to 3 minutes for the full booking flow
  test.setTimeout(180000);

  test('Complete weekly cleaning booking flow', async ({ page }) => {
    // Create the page object that handles all weekly cleaning booking interactions
    const weeklyCleaningPage = new HomeCleaningPageWeekly(page);

    console.log('\n========================================');
    console.log('📅 WEEKLY CLEANING - EVERY_WEEK');
    console.log('========================================');

    // Navigate to home page (already authenticated via global setup's storageState)
    await page.goto('https://uat2.servicemarket.com/en/dubai');
    await page.waitForTimeout(3000);

    // Execute the full booking flow step by step
    await weeklyCleaningPage.navigateToHomeCleaningPageWeekly();  // Go to cleaning service page
    await weeklyCleaningPage.clickBookNow();                       // Click "Book Now"
    await weeklyCleaningPage.selectBookingOptions();               // Choose 2hrs + Every Week frequency
    await weeklyCleaningPage.selectAddress();                      // Pick a saved address
    await weeklyCleaningPage.clickNextButton();                    // Proceed to time slot
    await weeklyCleaningPage.selectTimeSlot();                     // Pick day and time
    await weeklyCleaningPage.clickNextButtonFinal();               // Go to summary page
    await weeklyCleaningPage.completeBooking();                    // Take verification screenshot
    await weeklyCleaningPage.submitFinalBooking();                 // Confirm the booking
    await weeklyCleaningPage.navigateToHomeScreen();               // Return to homepage

    // Verify we're still on the ServiceMarket site (uses regex matcher)
    await expect(page).toHaveURL(/.*servicemarket.com/);
    console.log('✓ Weekly Cleaning booking completed!\n');
  });
});
