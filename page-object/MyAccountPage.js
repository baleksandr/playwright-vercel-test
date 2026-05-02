import { AbstractPage } from './AbstractPage';
import { expect } from '@playwright/test';

export class MyAccountPage extends AbstractPage {
    constructor(page) {
        super(page)
        this.myAccountOrderTotalAmount = page.locator('#account-order-0 p', { hasText: 'Total Amount:' })
        this.logoutBtn = page.getByRole('button', { name: 'Logout' })
        this.editBtn = page.getByRole('button', { name: 'Edit' })
    }

    async checkTotalOrder(source) {
        const totalOrderaAmount = await this.myAccountOrderTotalAmount.innerText()
        const totalOrderNumber = parseFloat(totalOrderaAmount.replace(/[^\d.]/g, ''));
        
        const firstProductPriceNumber = parseFloat(source.firstProduct.price.replace(/[^\d.]/g, ''))
        const secondProductPriceNumber = parseFloat(source.secondProduct.price.replace(/[^\d.]/g, ''))
        const expectedTotalPrice = firstProductPriceNumber + secondProductPriceNumber

        expect(totalOrderNumber).toBeCloseTo(expectedTotalPrice, 2);
    }

    async logoutUser() {
        await this.logoutBtn.click()
    }
}