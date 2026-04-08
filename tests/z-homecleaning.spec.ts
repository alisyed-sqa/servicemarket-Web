/**
 * Test: Home Cleaning Booking (One-Time / ONCE frequency)
 *
 * This test verifies the complete end-to-end booking flow for a one-time
 * home cleaning service. It uses the pre-authenticated session (from global setup)
 * so no login is needed.
 *
 * Flow: Homepage -> Cleaning Page -> Book Now -> Select Options (2hrs, Once) ->
 *       Address -> Time Slot -> Confirm Booking -> Back to Home
 */
import { test, expect } from '@playwright/test';
import { HomeCleaningPage } from '../src/pages/HomeCleaningPage';

test.describe('1. Home Cleaning Booking (ONCE)', () => {

  // Allow up to 3 minutes for the full booking flow
  test.setTimeout(180000);

  test('Complete home cleaning booking flow', async ({ page }) => {
    // Create the page object that handles all cleaning booking interactions
    const homeCleaningPage = new HomeCleaningPage(page);

    console.log('\n========================================');
    console.log('🏠 HOME CLEANING - ONCE');
    console.log('========================================');

    // Navigate to home page (already authenticated via global setup's storageState)
    await page.goto('https://uat2.servicemarket.com/en/dubai');
    await page.waitForTimeout(3000);

    // Execute the full booking flow step by step
    await homeCleaningPage.navigateToHomeCleaning();   // Go to cleaning service page
    await homeCleaningPage.clickBookNow();              // Click "Book Now"
    await homeCleaningPage.selectBookingOptions();      // Choose 2 hours + ONCE frequency
    await homeCleaningPage.selectAddress();             // Pick a saved address
    await homeCleaningPage.clickNextButton();           // Proceed to time slot
    await homeCleaningPage.selectTimeSlot();            // Pick day and time
    await homeCleaningPage.clickNextButtonFinal();      // Go to summary page
    await homeCleaningPage.completeBooking();           // Take verification screenshot
    await homeCleaningPage.submitFinalBooking();        // Confirm the booking
    await homeCleaningPage.navigateToHomeScreen();      // Return to homepage

    // Verify we're still on the ServiceMarket site
    expect(page.url()).toContain('servicemarket.com');
    console.log('✓ Home Cleaning booking completed!\n');
  });
});
