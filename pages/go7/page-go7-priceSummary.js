const {driver} = require("@wdio/globals");

const mainIOS = {
        priceSummaryCurrency: '~price_summary_currency',
        priceSummaryNumbers: '~price_summary_price',

        // Fares
        faresSectionCurrencyCode: '~price_summary_modal_content_content_item_0_currency',
        faresSectionPriceNumbers: '~price_summary_modal_content_content_item_0_amount',
        // Ancillaries
        ancillariesSectionCurrencyCode: '~price_summary_modal_content_content_item_1_currency',
        ancillariesSectionPriceNumbers: '~price_summary_modal_content_content_item_1_amount',
        // Taxes-fees
        taxesFeesSectionCurrencyCode: '~price_summary_modal_content_content_item_2_currency',
        taxesFeesSectionPriceNumbers: '~price_summary_modal_content_content_item_2_amount',
        // Total
        totalAmount: '~TBD',
        totalCurrency: '~TBD',
}

const mainAndroid = {
        priceSummaryCurrency: '//*[@resource-id="price_summary_currency"]',
        priceSummaryNumbers: '//*[@resource-id="price_summary_price"]',

        // Fares
        faresSectionCurrencyCode: '//*[@resource-id="TBD"]',
        faresSectionPriceNumbers: '//*[@resource-id="TBD"]',
        // Ancillaries
        ancillariesSectionCurrencyCode: '//*[@resource-id="TBD"]',
        ancillariesSectionPriceNumbers: '//*[@resource-id="TBD"]',
        // Taxes-fees
        taxesFeesSectionCurrencyCode: '//*[@resource-id="TBD"]',
        taxesFeesSectionPriceNumbers: '//*[@resource-id="TBD"]',
        // Total
        totalAmount: '//*[@resource-id="TBD"]',
        totalCurrency: '//*[@resource-id="TBD"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};