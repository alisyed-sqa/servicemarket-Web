/**
 * Test: Women's Salon Service Booking
 *
 * This test verifies the complete end-to-end booking flow for the Women's
 * Salon (at-home salon) service. It uses the pre-authenticated session
 * (from global setup) so no login is needed.
 *
 * Flow: Homepage -> Salon Page -> Book Now -> Select SKU -> Select Add-on ->
 *       Address -> Time Slot -> Confirm Booking -> Back to Home
 */
import { test, expect } from '@playwright/test';
import { WomenSalonPage } from '../src/pages/WomenSalonPage';

test.describe('4. Women Salon Booking', () => {

  // Allow up to 3 minutes for the full booking flow
  test.setTimeout(180000);

  test('Complete women salon booking flow', async ({ page }) => {
    // Create the page object that handles all salon booking interactions
    const womenSalonPage = new WomenSalonPage(page);

    console.log('\n========================================');
    console.log('💅 WOMEN SALON SERVICE');
    console.log('========================================');

    // Navigate to home page (already authenticated via global setup's storageState)
    await page.goto('https://uat2.servicemarket.com/en/dubai');
    await page.waitForTimeout(3000);

    // Execute the full booking flow step by step
    await womenSalonPage.navigateToWomenSalon();      // Go to salon service page
    await womenSalonPage.clickBookNow();               // Click "Book Now"
    await womenSalonPage.selectBookingOptions();       // Pick SKU + add-on service
    await womenSalonPage.selectAddress();              // Pick a saved address
    await womenSalonPage.clickNextButton();            // Proceed to time slot
    await womenSalonPage.selectTimeSlot();             // Pick day and time
    await womenSalonPage.clickNextButtonFinal();       // Go to summary page
    await womenSalonPage.completeBooking();            // Take verification screenshot
    await womenSalonPage.submitFinalBooking();         // Confirm the booking
    await womenSalonPage.navigateToHomeScreen();       // Return to homepage

    // Verify we're still on the ServiceMarket site
    expect(page.url()).toContain('servicemarket.com');
    console.log('✓ Women Salon booking completed!\n');
  });
});
