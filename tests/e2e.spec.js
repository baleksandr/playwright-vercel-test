import { test } from '../utils/fixtures';
import { testData, cardData } from '../data/testData';
import { loginData } from '../data/loginData';
import { expect } from '@playwright/test';

test('Create user, login, order 2 items, payment', async ({ app }) => {
    await app.registerPage.openLoginPage('/login')
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
    
    const items = await app.catalogPage.getProductInfo()
    await expect(app.catalogPage.basketCountItems).toHaveText('2')
    await app.catalogPage.goToBasketBtn()

    await expect(app.basketPage.firstProductItem).toHaveText(items.firstProduct.name)
    await expect(app.basketPage.firstItemPrice).toHaveText(items.firstProduct.price)
    await expect(app.basketPage.secondProductItem).toHaveText(items.secondProduct.name)
    await expect(app.basketPage.secondItemPrice).toHaveText(items.secondProduct.price)

    await app.basketPage.checkTotalPrice()
    // await basketPage.addExtraProduct(5)
    await app.basketPage.checkoutButton()
    await app.basePage.checkPageURL('checkout')

    await app.checkoutPage.fillPaymentData(cardData)
    await expect(app.checkoutPage.totalAmount).not.toHaveText('$0.00');

    await app.checkoutPage.clickPayNowBtn()
    await app.checkoutPage.expectedMessage(app.checkoutPage.checkoutSuccess, '✅ Payment Successful! Your order is being processed.', 10000)

    await app.basePage.goToMyAccount()
    await app.basePage.checkPageURL('account')

    await app.myAccountPage.checkTotalOrder(items)
    await expect(app.myAccountPage.logoutBtn).toBeVisible()
    await expect(app.myAccountPage.editBtn).toBeVisible()
    await app.myAccountPage.logoutUser()

    await app.checkoutPage.expectedMessage(app.loginPage.loginTitle, '🔑 Login to Your Account')
    await app.loginPage.checkLoginButtonVisibleState()
});