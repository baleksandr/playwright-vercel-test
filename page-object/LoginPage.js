import { BasePage } from './BasePage';
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.registerBtn = page.getByRole('button', { name: 'Register' })
        this.emailField = page.getByRole('textbox', { name: "Enter your email" })
        this.passwordField = page.getByRole('textbox', { name: "Enter your password" })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.catalogTitle = page.locator('#catalog-title');
        this.loginTitle = page.locator('#login-title');
        this.registerBtn = page.getByRole('button', { name: 'Register' })
    }

    async fillLoginData(loginData) {
        await this.emailField.fill(loginData.email)
        await this.passwordField.fill(loginData.password)
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async clickRegisterButton() {
        await this.registerBtn.click()
    }

    async checkLoginButtonVisibleState() {
        const loginFieldsVisibility = [this.emailField, this.passwordField, this.loginButton, this.registerBtn]

        for (const element of loginFieldsVisibility) {
            await expect(element, `Елемент ${element} має бути видимим`).toBeVisible();
        }
    }
}