import { expect } from '@playwright/test';

export class AbstractPage {
    constructor(page) {
        this.page = page
        this.myAccountBtn = page.getByRole('link', { name: 'My Account' });
    }

    async openLoginPage(path = '') {
        await this.page.goto(path)
    }

    async openScreenshotsPage(path = '') {
        await this.page.goto(path);
        await this.page.waitForLoadState('networkidle');
    }

    async checkVisualRegression(name, options = {}) {
        await expect(this.page).toHaveScreenshot(name, {
            fullPage: true,
            animations: "disabled",
            ...options
        })
    }

    async expectedMessage(locator, expextedText, customTimeout = 10000) {
        await expect(locator).toBeVisible({ timeout: customTimeout });
        await expect(locator).toContainText(expextedText, { timeout: customTimeout })
    }

    async checkPageURL(myValue) {
        await expect(this.page).toHaveURL(new RegExp(`.*${myValue}.*`));
    }

    async goToMyAccount() {
        await this.myAccountBtn.click();
    }
}