import { expect } from "@playwright/test";

export class BasketPage {
    constructor(page) {
        this.page = page
        this.firstProductItem = page.locator('#cart-item-name-6');
        this.secondProductItem = page.locator('#cart-item-name-5');
        this.firstItemPrice = page.locator('#cart-item-price-6');
        this.secondItemPrice = page.locator('#cart-item-price-5');
        this.totalValue = page.locator('#cart-total');
        this.proceedToCheckoutBtn = page.getByRole('button', { name: 'Proceed to Checkout' })
        this.decreaseFirstItemBtn = page.locator('#cart-item-decrease-6');
        this.addFirstItebBtn = page.locator('#cart-item-increase-6');
        this.decreaseSecondItemBtn = page.locator('#cart-item-decrease-5');
        this.addSecondItebBtn = page.locator('#cart-item-increase-5');
        this.checkoutBoxPage = page.locator('#checkout-box');

        this.tabletNameValue = '';
        this.coffeeMachineNameValue = '';
        this.tabletPriceValue = '';
        this.coffeeMachinePriceValue = '';
    }

    setProductsInfo(source) {
        // source — це наш catalogPage, який ми передали
        this.tabletNameValue = source.tabletNameValue
        this.coffeeMachineNameValue = source.coffeeMachineNameValue
        this.tabletPriceValue = source.tabletPriceValue
        this.coffeeMachinePriceValue = source.coffeeMachinePriceValue
        return this;
    }

    async compareProductDetales() {
        await expect(this.firstProductItem).toHaveText(this.coffeeMachineNameValue)
        await expect(this.secondProductItem).toHaveText(this.tabletNameValue)
        await expect(this.secondItemPrice).toHaveText(this.tabletPriceValue)
        await expect(this.firstItemPrice).toHaveText(this.coffeeMachinePriceValue)
    }

    //     async compareProductDetales(source) {
    //     await expect(this.firstProductItem).toHaveText(source.coffeeMachineNameValue)
    //     await expect(this.secondProductItem).toHaveText(source.tabletNameValue)
    //     await expect(this.secondItemPrice).toHaveText(source.tabletPriceValue)
    //     await expect(this.firstItemPrice).toHaveText(source.coffeeMachinePriceValue)
    // }

    async checkTotalPrice() {
        const priceTextfirstProduct = await this.firstItemPrice.textContent();
        const priceTextSecondProduct = await this.secondItemPrice.textContent();
        const totalNumber = await this.totalValue.textContent();

        const firstProductPriceNumber = parseFloat(priceTextfirstProduct.replace(/[^\d.]/g, ''))
        const secondProductPriceNumber = parseFloat(priceTextSecondProduct.replace(/[^\d.]/g, ''))
        const totalProductPriceNumber = parseFloat(totalNumber.replace(/[^\d.]/g, ''))

        const totalPrice = firstProductPriceNumber + secondProductPriceNumber

        expect(totalProductPriceNumber).toBe(totalPrice)
        console.log(`✅ Математика кошика: ${firstProductPriceNumber} + ${secondProductPriceNumber} = ${totalPrice}`);
    }

    async checkoutButton() {
        await this.proceedToCheckoutBtn.click()
    }

    async addExtraProduct(countOfClick) {
        await this.addFirstItebBtn.click({ clickCount: countOfClick, delay: 1000 })
    }



}
