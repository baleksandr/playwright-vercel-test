import { test } from '../utils/fixtures';
import { testData, cardData } from '../data/testData';
import { expect } from '@playwright/test';

test('Create user, login, order 2 items, payment', async ({ app }) => {
    let items = {}
    await test.step('Open login page and go to Register form', async () => {
        await app.loginPage.openLoginPage('/login')
        await app.loginPage.clickRegisterButton()
    })

    await test.step('Register new user', async () => {
        await app.basePage.checkPageURL('register')
        await app.registerPage.fillData(testData)
        await app.registerPage.submitRegistration()
        await app.registerPage.expectedMessage(app.registerPage.registerSuccessAlert, '🎉 Registration successful! Redirecting to login...')
    })

    await test.step('Login with created user', async () => {
        await app.basePage.checkPageURL('login')
        await app.loginPage.fillLoginData(testData)
        await app.loginPage.clickLoginButton()
        await app.loginPage.expectedMessage(app.loginPage.catalogTitle, '🛍️ Welcome to Our Shop')
    })

    await test.step('Select product from catalog', async () => {
        await app.catalogPage.selectProduct()
        await app.catalogPage.expectedMessage(app.catalogPage.coffeeMachineProdutButton, 'Remove from Basket')
        await app.catalogPage.expectedMessage(app.catalogPage.tabletProdutButton, 'Remove from Basket')

        items = await app.catalogPage.getProductInfo()
        await expect(app.catalogPage.basketCountItems).toHaveText('2')
        await app.catalogPage.goToBasketBtn()
    })

    await test.step('Check catalog and price in the basket', async () => {
        await app.basePage.checkPageURL('cart')
        await expect(app.basketPage.firstProductItem).toHaveText(items.firstProduct.name)
        await expect(app.basketPage.firstItemPrice).toHaveText(items.firstProduct.price)
        await expect(app.basketPage.secondProductItem).toHaveText(items.secondProduct.name)
        await expect(app.basketPage.secondItemPrice).toHaveText(items.secondProduct.price)

        await app.basketPage.checkTotalPrice()
        // await basketPage.addExtraProduct(5)
        await app.basketPage.goToCheckoutPage()
    })

    await test.step('Fill payment data and checkout product', async () => {
        await app.basePage.checkPageURL('checkout')
        await app.checkoutPage.fillPaymentData(cardData)
        await expect(app.checkoutPage.totalAmount).not.toHaveText('$0.00');

        await app.checkoutPage.clickPayNowBtn()
        await app.checkoutPage.expectedMessage(app.checkoutPage.checkoutSuccess, '✅ Payment Successful! Your order is being processed.', 10000)
    })

    await test.step('Check my orders and Logout user', async () => {
        await app.basePage.goToMyAccount()
        await app.basePage.checkPageURL('account')

        await app.myAccountPage.checkTotalOrder(items)
        await expect(app.myAccountPage.logoutBtn).toBeVisible()
        await expect(app.myAccountPage.editBtn).toBeVisible()
        await app.myAccountPage.logoutUser()
    })

    await test.step('Open login user page', async () => {
        await app.basePage.checkPageURL('login')
        await app.checkoutPage.expectedMessage(app.loginPage.loginTitle, '🔑 Login to Your Account')
        await app.loginPage.checkLoginButtonVisibleState()
    })
});