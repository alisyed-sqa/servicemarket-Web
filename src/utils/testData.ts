/**
 * Test Data Constants
 *
 * Stores test credentials and other shared test data.
 * Values are read from environment variables (SM_USER, SM_PASS) if available,
 * otherwise fall back to placeholder defaults.
 *
 * To use real credentials, set environment variables before running tests:
 *   export SM_USER="your_username"
 *   export SM_PASS="your_password"
 */

// Login credentials — read from environment variables or use defaults
export const USERNAME = process.env.SM_USER || 'YOUR_USERNAME';
export const PASSWORD = process.env.SM_PASS || 'YOUR_PASSWORD';
