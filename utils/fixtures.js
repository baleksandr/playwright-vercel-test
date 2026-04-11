import { test as base } from '@playwright/test'
import { RegisterPage } from '../page-object/RegisterPage'
import { LoginPage } from '../page-object/LoginPage'
import { CatalogPage } from '../page-object/CatalogPage'
import { BasketPage } from '../page-object/BasketPage'
import { CheckoutPage } from '../page-object/CheckoutPage'
import { MyAccountPage } from '../page-object/MyAccountPage'
import { BasePage } from '../page-object/BasePage'

export const test = base.extend({
    app: async ({ page }, use) => {
        const app = {
            registerPage: new RegisterPage(page),
            loginPage: new LoginPage(page),
            catalogPage: new CatalogPage(page),
            basketPage: new BasketPage(page),
            checkoutPage: new CheckoutPage(page),
            myAccountPage: new MyAccountPage(page),
            basePage: new BasePage(page),
        }
        await use(app);
    }
})