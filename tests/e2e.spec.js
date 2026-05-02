import { test } from '../utils/fixtures';
import { cardData } from '../data/testData';
import { devices, expect } from '@playwright/test';

// test.use({...devices['Pixel 7 landscape']})
test.describe('E2e order flow', () => {
    test.beforeAll(async () => {
        console.log("beforeAll, prepere user");
        console.log("beforeAll, prepere test data");
        console.log("beforeAll, ready");
    });

    test.beforeEach(async ({page}) => {
        console.log("beforeEach, open catalog Page");
        await page.goto('/')
    });

    test.afterEach(async({page}, testInfo) => {
        if(testInfo.status !== testInfo.expectedStatus) {
            console.log('afterEach test faled: ', testInfo.title);

            await page.screenshot( {
                path: `test-results/${testInfo.title}-failed.png`,
                fullPage: true
            })
        }
    })

    test.afterAll(async() => {
        console.log('afterAll: cleanUp test data');
    })

    test('Create user, login, order 2 items, payment', async ({ app }) => {
        let items = {}

        await test.step('Select product from catalog', async () => {
            await app.catalogPage.selectProduct()
            await app.catalogPage.expectedMessage(app.catalogPage.coffeeMachineProdutButton, 'Remove from Basket')
            await app.catalogPage.expectedMessage(app.catalogPage.tabletProdutButton, 'Remove from Basket')

            items = await app.catalogPage.getProductInfo()
            await expect(app.catalogPage.basketCountItems).toHaveText('2')
            await app.catalogPage.goToBasketBtn()
        })

        await test.step('Check catalog and price in the basket', async () => {
            await app.abstractPage.checkPageURL('cart')
            await expect(app.basketPage.firstProductItem).toHaveText(items.firstProduct.name)
            await expect(app.basketPage.firstItemPrice).toHaveText(items.firstProduct.price)
            await expect(app.basketPage.secondProductItem).toHaveText(items.secondProduct.name)
            await expect(app.basketPage.secondItemPrice).toHaveText(items.secondProduct.price)

            await app.basketPage.checkTotalPrice()
            // await basketPage.addExtraProduct(5)
            await app.basketPage.goToCheckoutPage()
        })

        await test.step('Fill payment data and checkout product', async () => {
            await app.abstractPage.checkPageURL('checkout')
            await app.checkoutPage.fillPaymentData(cardData)
            await expect(app.checkoutPage.totalAmount).not.toHaveText('$0.00');

            await app.checkoutPage.clickPayNowBtn()
            await app.checkoutPage.expectedMessage(app.checkoutPage.checkoutSuccess, '✅ Payment Successful! Your order is being processed.', 10000)
        })

        await test.step('Check my orders and Logout user', async () => {
            await app.abstractPage.goToMyAccount()
            await app.abstractPage.checkPageURL('account')

            await app.myAccountPage.checkTotalOrder(items)
            await expect(app.myAccountPage.logoutBtn).toBeVisible()
            await expect(app.myAccountPage.editBtn).toBeVisible()
            await app.myAccountPage.logoutUser()
        })

        await test.step('Open login user page', async () => {
            await app.abstractPage.checkPageURL('login')
            await app.checkoutPage.expectedMessage(app.loginPage.loginTitle, '🔑 Login to Your Account')
            await app.loginPage.checkLoginButtonVisibleState()
        })
    });
});
