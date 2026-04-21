import { test } from '../utils/fixtures';
import { testData } from '../data/testData';


test('setup: login and save storegeState', async ({ app, context }) => {


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

    await test.step('Save storege state', async () => {
        await context.storageState({ path: 'data/storegState.json' })
    })
})