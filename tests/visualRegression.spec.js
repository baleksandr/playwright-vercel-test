import { test } from '../utils/fixtures';

test.describe('Screenshots test', () => {
    test('Login page - visualRegression', async ({ app }) => {
        await app.abstractPage.openScreenshotsPage('/login')
        await app.abstractPage.checkVisualRegression('login-page.png', {
            maxDiffPixels: 100
        })
    })

    test('Catalog page - visualRegression', async ({ app }) => {
        await app.abstractPage.openScreenshotsPage('/')
        await app.abstractPage.checkVisualRegression('catalog-page.png', {
            maxDiffPixels: 100
        })
    })
})