# Super Booking Flow - Documentation

## Overview
The Super Booking Flow allows you to test all four service booking flows with a **single authentication** session. This eliminates repetitive logins and ensures tests run efficiently in sequence.

## Architecture

### Global Setup
- **File**: `global-setup.ts`
- **Purpose**: Performs authentication once before any tests run
- **Output**: Saves authentication state to `auth-state.json`

### Test Files (Separate & Sequential)
All test files remain separate and execute in order:

1. **z-homecleaning.spec.ts** - Home Cleaning (ONCE frequency)
2. **z-weeklycleaning.spec.ts** - Weekly Cleaning (EVERY_WEEK frequency)
3. **z-multiweekcleaning.spec.ts** - Multi Week Cleaning (MULTIPLE_TIMES_WEEK frequency)
4. **z-womensalon.spec.ts** - Women Salon Service

### Configuration
- **File**: `playwright.config.ts`
- Configured with `globalSetup` pointing to authentication script
- All tests use `storageState: 'auth-state.json'` to load saved session

## How It Works

1. **Global Setup Runs First**:
   - Launches browser
   - Navigates to UAT environment
   - Performs OTP login with credentials
   - Saves cookies and localStorage to `auth-state.json`
   - Closes browser

2. **Tests Execute in Sequence**:
   - Each test file loads the saved authentication state
   - Tests start from home screen (already authenticated)
   - Complete their respective booking flow
   - Navigate back to home screen
   - Next test begins automatically

## Running the Tests

### Run Super Booking Flow
```bash
npm run test:super-flow
```

This command:
- Runs global setup (authentication) once
- Executes all 4 test files in sequence
- Uses `--workers=1` to ensure sequential execution
- Maintains single browser session throughout

### Run Individual Tests (with saved auth)
```bash
# Run only home cleaning
npx playwright test tests/z-homecleaning.spec.ts

# Run only weekly cleaning
npx playwright test tests/z-weeklycleaning.spec.ts
```

## Key Benefits

✅ **Single Authentication**: Login happens only once in global setup
✅ **Separate Test Files**: Each service has its own maintainable test file
✅ **Sequential Execution**: Tests run in specified order
✅ **Shared Session**: All tests use the same authenticated session
✅ **Time Efficient**: Eliminates 3 redundant login flows
✅ **Easy Maintenance**: Update individual service tests without affecting others

## File Structure

```
Servicemarket/
├── global-setup.ts                    # Single authentication setup
├── auth-state.json                    # Saved authentication state (auto-generated)
├── playwright.config.ts               # Configuration with globalSetup
├── tests/
│   ├── z-homecleaning.spec.ts        # Test 1: Home Cleaning
│   ├── z-weeklycleaning.spec.ts      # Test 2: Weekly Cleaning
│   ├── z-multiweekcleaning.spec.ts   # Test 3: Multi Week Cleaning
│   └── z-womensalon.spec.ts          # Test 4: Women Salon
└── src/pages/
    ├── AuthPage.ts
    ├── HomeCleaningPage.ts
    ├── WeeklyCleaningPage.ts
    ├── MultiWeekCleaningPage.ts
    └── WomenSalonPage.ts
```

## Troubleshooting

### Authentication State Issues
If tests fail due to authentication:
1. Delete `auth-state.json`
2. Run the tests again - global setup will recreate it

### Test Order Issues
Tests must run sequentially using `--workers=1` to maintain proper flow.

### Session Expiration
If the session expires during tests, the global setup will run again on the next test execution.

## Console Output

When running the super flow, you'll see:

```
========================================
🔐 GLOBAL SETUP - Single Authentication
========================================
✓ Authentication completed successfully!
✓ Saving authentication state...
✓ Global setup completed!

========================================
🏠 HOME CLEANING - ONCE
========================================
✓ Home Cleaning booking completed!

========================================
📅 WEEKLY CLEANING - EVERY_WEEK
========================================
✓ Weekly Cleaning booking completed!

========================================
🗓️  MULTI WEEK CLEANING - MULTIPLE_TIMES_WEEK
========================================
✓ Multi Week Cleaning booking completed!

========================================
💅 WOMEN SALON SERVICE
========================================
✓ Women Salon booking completed!

✅ All 4 services booked successfully!
```

## Notes

- The `auth-state.json` file is gitignored to prevent committing sensitive data
- Each test navigates to home screen after completion, ready for the next service
- All tests share the same browser context and cookies
- HTTP Basic Auth credentials are configured in `playwright.config.ts`
