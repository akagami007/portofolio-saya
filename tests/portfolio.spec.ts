import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage and display the hero section', async ({ page }) => {
    // Check if the main heading is visible
    await expect(page.locator('h1')).toContainText('Akagami');
    await expect(page.getByText('Fullstack Developer & Quality Assurance Engineer')).toBeVisible();
  });

  test('should navigate to the contact section', async ({ page }) => {
    // Click the Hire Me button
    await page.getByRole('link', { name: 'Hire Me' }).click();
    
    // Check if the contact form is visible
    await expect(page.getByRole('heading', { name: "Let's Work Together" })).toBeVisible();
  });

  test('contact form should show validation errors on empty submit', async ({ page }) => {
    await page.goto('/#contact');
    
    // Click submit without filling fields
    await page.getByRole('button', { name: 'Send Message' }).click();

    // Check for validation messages
    await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Message must be at least 10 characters')).toBeVisible();
  });
});
