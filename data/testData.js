import { faker } from '@faker-js/faker';

export const testData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
        city: faker.location.city(),
        country: 'Ukraine',
        phone: `+380${faker.string.numeric(9)}`,
        street: faker.location.streetAddress(true),
        zip: faker.string.numeric(5)
}

export const cardData = {
        cardNumber: process.env.CARD_NUMBER,
        cardDate: process.env.CARD_DATE,
        cardCVV: process.env.CARDCVV
}