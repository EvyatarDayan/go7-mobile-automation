const {driver} = require("@wdio/globals");

const mainIOS = {
        // Upper
        paymentBackButton: '~header_back_button_payment_options',
        paymentPageTitle: '~page_title_payment_options',

        directPayButton: '//*[contains(@label, "Direct Pay")]',
        zoozButton: "//*[contains(@name, 'payment_options_title') and contains(@label, 'Zooz')]",
                zoozCardImageExpirationTitle: '~expiration',
                zoozNameInput: '//*[contains(@label, "Name")]',
                zoozCardNumberInput: '//*[contains(@label, "Card Number")]',
                zoozExpirationLabel: '-ios class chain:**/XCUIElementTypeStaticText[`label == "Expiration (mm/yy)"`]',
                zoozExpirationInput: '//*[contains(@label, "Expiration")]',
                zoozSecurityCodeInput: '//*[contains(@label, "Security Code")]',
                zoozSaveCardCheckbox: '//*[contains(@label, "Save card for future payments")]',
                zoozPayButton: '//*[contains(@label, "Pay USD")]',
                zoozSuccessMessageText: '-ios class chain:**/XCUIElementTypeStaticText[`label == "Your transaction was successful."`]',

        datatransButton: '//*[contains(@label, "Datatrans TEST")]',
}

const mainAndroid = {
        // Upper
        paymentBackButton: '//*[@resource-id="header_back_button_payment_options"]',
        paymentPageTitle: '//*[@resource-id="page_title_payment_options"]',

        firstPaymentOption: '//*[@resource-id="payment_options_title_0_container"]',
        secondPaymentOption: '//*[@resource-id="payment_options_title_1_container"]',
        thirdPaymentOption: '//*[@resource-id="payment_options_title_2_container"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};