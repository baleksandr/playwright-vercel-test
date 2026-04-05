import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {

    constructor(page) {
        super(page)
        this.page = page
        this.baseUrl = ''
        this.registerBtn = page.getByRole('button', { name: 'Register' })
        this.firstNameField = page.getByRole('textbox', { name: "First Name" })
        this.lastNameField = page.getByRole('textbox', { name: "Last Name" })
        this.emailField = page.getByRole('textbox', { name: "Email Address" })
        this.passwordField = page.getByRole('textbox', { name: "Password" })
        this.registerCityField = page.getByRole('textbox', { name: "City" })
        this.registerCountry = page.getByRole('combobox')
        this.registerPhoneField = page.locator('#register-phone')
        this.registerStreetField = page.getByRole('textbox', { name: "Street and House Number" })
        this.registerZipField = page.getByRole('textbox', { name: "ZIP Code" })
        this.registerSuccessAlert = page.locator('#register-success');
    }

    async clickRegisterButton() {
        await this.registerBtn.click()
    }

    async fillData(testData) {
        await this.firstNameField.fill(testData.firstName)
        await this.lastNameField.fill(testData.lastName)
        await this.emailField.fill(testData.email)
        await this.passwordField.fill(testData.password)
        await this.registerCityField.fill(testData.city)
        await this.registerCountry.selectOption(testData.country)
        await this.registerPhoneField.fill(testData.phone)
        await this.registerStreetField.fill(testData.street)
        await this.registerZipField.fill(testData.zip)
    }

    async submitRegistration() {
        await this.registerBtn.click()
    }
}