/**
 * Test: Super Booking Flow — All 4 Services with Single Login
 *
 * This is the MASTER test that books ALL services in one single test run
 * using one authentication. It tests the full user journey:
 *   1. Login with OTP (once)
 *   2. Book Home Cleaning (ONCE frequency)
 *   3. Book Weekly Cleaning (EVERY_WEEK frequency)
 *   4. Book Multi-Week Cleaning (MULTIPLE_TIMES_WEEK frequency)
 *   5. Book Women's Salon Service
 *
 * After each booking, it navigates back to the homepage to start the next one.
 * This test has a 10-minute timeout since it covers all 4 services.
 */
import { test, expect } from '@playwright/test';
import { AuthPage } from '../src/pages/AuthPage';
import { HomeCleaningPage } from '../src/pages/HomeCleaningPage';
import { HomeCleaningPageWeekly } from '../src/pages/WeeklyCleaningPage';
import { MultiWeekCleaningPage } from '../src/pages/MultiWeekCleaningPage';
import { WomenSalonPage } from '../src/pages/WomenSalonPage';

test.describe('Super Booking Flow → All Services with Single Login', () => {

  // Extended timeout for the entire flow (10 minutes) since it covers 4 services
  test.setTimeout(600000);

  // HTTP Basic Auth credentials required to access the UAT environment
  test.use({
    httpCredentials: {
      username: 'admin',
      password: 'SMAPR2020',
    },
  });

  test('Complete all booking flows with single authentication', async ({ page }) => {
    // Initialize all page objects — one for each service
    const authPage = new AuthPage(page);
    const homeCleaningPage = new HomeCleaningPage(page);
    const weeklyCleaningPage = new HomeCleaningPageWeekly(page);
    const multiWeekCleaningPage = new MultiWeekCleaningPage(page);
    const womenSalonPage = new WomenSalonPage(page);

    // ===================================================================
    // STEP 1: Authentication & Login Flow (ONE TIME ONLY)
    // Log in once, then reuse the session for all 4 bookings
    // ===================================================================
    console.log('\n========================================');
    console.log('🔐 AUTHENTICATION - Single Login');
    console.log('========================================');
    await authPage.loginWithOTP(
      'https://uat2.servicemarket.com/en/dubai?r=hixq967',
      '551111110',
      '0000'
    );
    console.log('✓ Authentication completed successfully!\n');

    // ===================================================================
    // STEP 2: Home Cleaning Booking (ONCE Frequency)
    // Books a one-time cleaning, then returns to homepage
    // ===================================================================
    console.log('========================================');
    console.log('🏠 HOME CLEANING - ONCE');
    console.log('========================================');
    await homeCleaningPage.navigateToHomeCleaning();
    await homeCleaningPage.clickBookNow();
    await homeCleaningPage.selectBookingOptions();
    await homeCleaningPage.selectAddress();
    await homeCleaningPage.clickNextButton();
    await homeCleaningPage.selectTimeSlot();
    await homeCleaningPage.clickNextButtonFinal();
    await homeCleaningPage.completeBooking();
    await homeCleaningPage.submitFinalBooking();
    await homeCleaningPage.navigateToHomeScreen();
    console.log('✓ Home Cleaning booking completed!\n');

    // ===================================================================
    // STEP 3: Weekly Cleaning Booking (EVERY_WEEK Frequency)
    // Books a weekly recurring cleaning, then returns to homepage
    // ===================================================================
    console.log('========================================');
    console.log('📅 WEEKLY CLEANING - EVERY_WEEK');
    console.log('========================================');
    await weeklyCleaningPage.navigateToHomeCleaningPageWeekly();
    await weeklyCleaningPage.clickBookNow();
    await weeklyCleaningPage.selectBookingOptions();
    await weeklyCleaningPage.selectAddress();
    await weeklyCleaningPage.clickNextButton();
    await weeklyCleaningPage.selectTimeSlot();
    await weeklyCleaningPage.clickNextButtonFinal();
    await weeklyCleaningPage.completeBooking();
    await weeklyCleaningPage.submitFinalBooking();
    await weeklyCleaningPage.navigateToHomeScreen();
    console.log('✓ Weekly Cleaning booking completed!\n');

    // ===================================================================
    // STEP 4: Multi Week Cleaning Booking (MULTIPLE_TIMES_WEEK)
    // Books cleaning for multiple days per week, then returns to homepage
    // ===================================================================
    console.log('========================================');
    console.log('🗓️  MULTI WEEK CLEANING - MULTIPLE_TIMES_WEEK');
    console.log('========================================');
    await multiWeekCleaningPage.navigateToMultiWeekCleaning();
    await multiWeekCleaningPage.clickBookNow();
    await multiWeekCleaningPage.selectBookingOptions();
    await multiWeekCleaningPage.selectAddress();
    await multiWeekCleaningPage.clickNextButton();
    await multiWeekCleaningPage.selectTimeSlot();
    await multiWeekCleaningPage.clickNextButtonFinal();
    await multiWeekCleaningPage.completeBooking();
    await multiWeekCleaningPage.submitFinalBooking();
    await multiWeekCleaningPage.navigateToHomeScreen();
    console.log('✓ Multi Week Cleaning booking completed!\n');

    // ===================================================================
    // STEP 5: Women Salon Booking
    // Books a salon service with SKU + add-on, then returns to homepage
    // ===================================================================
    console.log('========================================');
    console.log('💅 WOMEN SALON SERVICE');
    console.log('========================================');
    await womenSalonPage.navigateToWomenSalon();
    await womenSalonPage.clickBookNow();
    await womenSalonPage.selectBookingOptions();
    await womenSalonPage.selectAddress();
    await womenSalonPage.clickNextButton();
    await womenSalonPage.selectTimeSlot();
    await womenSalonPage.clickNextButtonFinal();
    await womenSalonPage.completeBooking();
    await womenSalonPage.submitFinalBooking();
    await womenSalonPage.navigateToHomeScreen();
    console.log('✓ Women Salon booking completed!\n');

    // ===================================================================
    // FINAL VERIFICATION — Print summary of all completed bookings
    // ===================================================================
    console.log('========================================');
    console.log('✅ SUPER BOOKING FLOW COMPLETED!');
    console.log('========================================');
    console.log('All 4 services booked with single authentication:');
    console.log('  ✓ Home Cleaning (Once)');
    console.log('  ✓ Weekly Cleaning (Every Week)');
    console.log('  ✓ Multi Week Cleaning (Multiple Times/Week)');
    console.log('  ✓ Women Salon Service');
    console.log('========================================\n');

    // Verify we're still on the ServiceMarket site after all bookings
    expect(page.url()).toContain('servicemarket.com');
    console.log('✓ Test successfully completed!');
  });
});
