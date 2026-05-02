import { test, expect } from '@playwright/test';

test.describe('Screenshots test', () => {
    test('Login page - visualRegression', async ({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('login-page.png', {
            fullPage: true,
            animations: "disabled"
        }
        )
    })

    test('Catalog page - visualRegression', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('catalog-page.png', {
            fullPage: true,
            animations: "disabled"
        }
        )
    })
})