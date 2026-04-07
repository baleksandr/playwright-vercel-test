import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.cardNumberField = page.getByPlaceholder('Card Number (16 digits)');
        this.payNowButton = page.getByRole('button', { name: 'Pay Now' });
        this.cardDate = page.getByPlaceholder('MM/YY');
        this.cardCVV = page.getByPlaceholder('CVV (3 digits)');
        this.checkoutSuccess = page.locator('#checkout-success')
        this.totalAmount = page.locator('#checkout-box p strong');
    }

    async fillPaymentData(cardData) {
        await this.page.waitForLoadState('networkidle');
        await this.cardNumberField.fill(cardData.cardNumber)
        await this.cardDate.fill(cardData.cardDate)
        await this.cardCVV.fill(cardData.cardCVV)
    }

    async clickPayNowBtn() {
        await this.payNowButton.click();
    }
}