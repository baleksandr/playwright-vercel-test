import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.coffeeMachineProdutButton = page.locator('#product-add-6')
        this.tabletProdutButton = page.locator('#product-add-5')
        this.basketCountItems = page.locator('#cart-count')
        this.basketLink = page.getByRole('link', { name: /Basket/ });

        this.tabletName = page.locator('#product-name-5')
        this.coffeeMachineName = page.locator('#product-name-6')
        this.tabletPrice = page.locator('#product-price-5')
        this.coffeeMachinePrice = page.locator('#product-price-6')

        this.tabletNameValue = ''
        this.coffeeMachineNameValue = ''
        this.tabletPriceValue = ''
        this.coffeeMachinePriceValue = ''
    }

    async selectProduct() {
        await this.coffeeMachineProdutButton.click()
        await this.tabletProdutButton.click()
    }

    async basketCount(countItems) {
        await expect(this.basketCountItems).toHaveText(countItems.toString())
    }

    async clickBasketBtn() {
        await this.basketLink.click()
    }

    async saveProductInfo() {
        this.tabletNameValue = await this.tabletName.textContent()
        this.coffeeMachineNameValue = await this.coffeeMachineName.textContent()
        this.tabletPriceValue = await this.tabletPrice.textContent()
        this.coffeeMachinePriceValue = await this.coffeeMachinePrice.textContent()
    }
}