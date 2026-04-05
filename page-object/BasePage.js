import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page
        this.myAccountBtn = page.getByRole('link', { name: 'My Account' });

    }

    async navigatepage(path = '') {
        await this.page.goto(path)
    }

    async expectedMessage(locator, expextedText, customTimeout = 5000) {
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