import { test } from '../utils/fixtures';
import { testData, cardData } from '../data/testData';
import { loginData } from '../data/loginData';
import { expect } from '@playwright/test';

test('My register test', async ({ app }) => {
    await app.registerPage.navigatepage('/login')
    await app.registerPage.clickRegisterButton()
    await app.registerPage.fillData(testData)
    await app.registerPage.submitRegistration()
    await app.registerPage.expectedMessage(app.registerPage.registerSuccessAlert, '🎉 Registration successful! Redirecting to login...')

    await app.loginPage.fillLoginData(loginData)
    await app.loginPage.clickLoginButton()
    await app.loginPage.expectedMessage(app.loginPage.catalogTitle, '🛍️ Welcome to Our Shop')

    await app.catalogPage.selectProduct()
    await app.catalogPage.expectedMessage(app.catalogPage.coffeeMachineProdutButton, 'Remove from Basket')
    await app.catalogPage.expectedMessage(app.catalogPage.tabletProdutButton, 'Remove from Basket')


    await app.catalogPage.basketCount(2)
    await app.catalogPage.saveProductInfo()

    await app.catalogPage.clickBasketBtn()
    await app.basketPage.setProductsInfo(app.catalogPage)

    await app.basketPage.compareProductDetales()
    // await basketPage.compareProductDetales(catalogPage)

    await app.basketPage.checkTotalPrice()
    // await basketPage.addExtraProduct(5)
    await app.basketPage.checkoutButton()
    await app.basePage.checkPageURL('checkout')

    await app.checkoutPage.fillPaymentData(cardData)
    await app.checkoutPage.clickPayNowBtn()
    await app.checkoutPage.expectedMessage(app.checkoutPage.checkoutSuccess, '✅ Payment Successful! Your order is being processed.', 10000)
    await app.basePage.goToMyAccount()
    await app.basePage.checkPageURL('account')

    await app.myAccountPage.checkTotalOrder(app.catalogPage)
    await app.myAccountPage.checkButtonsVisibleState()

    await app.myAccountPage.logoutUser()
    await app.checkoutPage.expectedMessage(app.loginPage.loginTitle, '🔑 Login to Your Account')

    await app.loginPage.checkLoginButtonVisibleState()
});