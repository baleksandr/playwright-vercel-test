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
    }

    async selectProduct() {
        await this.coffeeMachineProdutButton.click()
        await this.tabletProdutButton.click()
    }

    async goToBasketBtn() {
        await this.basketLink.click()
    }

    async getProductInfo() {
        return {
            firstProduct: {
                name: await this.tabletName.textContent(),
                price: await this.tabletPrice.textContent()
            },
            secondProduct: {
                name: await this.coffeeMachineName.textContent(),
                price: await this.coffeeMachinePrice.textContent()
            },
        }
    }
}