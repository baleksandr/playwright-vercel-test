import { expect } from "@playwright/test";

export class BasketPage {
    constructor(page) {
        this.page = page
        this.firstProductItem = page.locator('#cart-item-name-5');
        this.firstItemPrice = page.locator('#cart-item-price-5');
        this.secondProductItem = page.locator('#cart-item-name-6');
        this.secondItemPrice = page.locator('#cart-item-price-6');
        this.totalValue = page.locator('#cart-total');
        this.proceedToCheckoutBtn = page.getByRole('button', { name: 'Proceed to Checkout' })
        this.decreaseFirstItemBtn = page.locator('#cart-item-decrease-6');
        this.addFirstItebBtn = page.locator('#cart-item-increase-6');
        this.decreaseSecondItemBtn = page.locator('#cart-item-decrease-5');
        this.addSecondItebBtn = page.locator('#cart-item-increase-5');
        this.checkoutBoxPage = page.locator('#checkout-box');
    }

    async checkTotalPrice() {
        const priceTextfirstProduct = await this.firstItemPrice.textContent();
        const priceTextSecondProduct = await this.secondItemPrice.textContent();
        const totalNumber = await this.totalValue.textContent();

        const firstProductPriceNumber = parseFloat(priceTextfirstProduct.replace(/[^\d.]/g, ''))
        const secondProductPriceNumber = parseFloat(priceTextSecondProduct.replace(/[^\d.]/g, ''))
        const totalProductPriceNumber = parseFloat(totalNumber.replace(/[^\d.]/g, ''))

        const totalPrice = firstProductPriceNumber + secondProductPriceNumber

        expect(totalProductPriceNumber).toBe(totalPrice)
    }

    async goToCheckoutPage() {
        await this.proceedToCheckoutBtn.click()
    }

    async addExtraProduct(countOfClick) {
        await this.addFirstItebBtn.click({ clickCount: countOfClick, delay: 1000 })
    }
}
