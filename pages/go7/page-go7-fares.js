const {driver} = require("@wdio/globals");

const mainIOS = {
        faresPageTitle: '~bundle-list-element_header_text',
        faresCloseButton: '~bundle-list-element_close_container',
        faresFromDestinationLabel: '~bundle-list-element_flight_details_from',
        faresToDestinationLabel: '~bundle-list-element_flight_details_to',
        faresTimeLabel: '~bundle-list-element_flight_details_date',

        // First fare
        firstFareTitle: '~bundle-list-element_bundle_0_header_title',
        firstFareInfoButton: '~bundle-list-element_bundle_0_header_info_icon',
        firstFareSubtitle: '~bundle-list-element_bundle_0_header_sub_title',
        firstFarePriceCurrency: '~bundle-list-element_bundle_0_header_currency',
        firstFarePriceNumbers: '~bundle-list-element_bundle_0_header_price',
        firstFareSelectionCheckbox: '~bundle-list-element_bundle_0_header_radio_button',

        // Second fare
        secondFareTitle: '~bundle-list-element_bundle_1_header_title',
        secondFareInfoButton: '~bundle-list-element_bundle_1_header_info_icon',
        secondFareSubtitle: '~bundle-list-element_bundle_1_header_sub_title',
        secondFarePriceCurrency: '~bundle-list-element_bundle_1_header_currency',
        secondFarePriceNumbers: '~bundle-list-element_bundle_1_header_price',
        secondFareSelectionCheckbox: '~bundle-list-element_bundle_1_header_radio_button',

        // Third fare
        thirdFareTitle: '~bundle-list-element_bundle_2_header_title',
        thirdFareInfoButton: '~bundle-list-element_bundle_2_header_info_icon',
        thirdFareSubtitle: '~bundle-list-element_bundle_2_header_sub_title',
        thirdFarePriceCurrency: '~bundle-list-element_bundle_2_header_currency',
        thirdFarePriceNumbers: '~bundle-list-element_bundle_2_header_price',
        thirdFareSelectionCheckbox: '~bundle-list-element_bundle_2_header_radio_button',

        faresContinueButton: '//*[@name="bundle-list-element_continue_button_bottom_button"]',
}

const mainAndroid = {
        faresPageTitle: '//*[@resource-id="bundle-list-element_header_text"]',
        faresCloseButton: '//*[@resource-id="bundle-list-element_close_container"]',
        faresFromDestinationLabel: '//*[@resource-id="bundle-list-element_flight_details_from"]',
        faresToDestinationLabel: '//*[@resource-id="bundle-list-element_flight_details_to"]',
        faresTimeLabel: '//*[@resource-id="bundle-list-element_flight_details_date"]',

        // First fare
        firstFareTitle: '//*[@resource-id="bundle-list-element_bundle_0_header_title"]',
        firstFareInfoButton: '//*[@resource-id="bundle-list-element_bundle_0_header_info_icon"]',
        firstFareSubtitle: '//*[@resource-id="bundle-list-element_bundle_0_header_sub_title"]',
        firstFarePriceCurrency: '//*[@resource-id="bundle-list-element_bundle_0_header_currency"]',
        firstFarePriceNumbers: '//*[@resource-id="bundle-list-element_bundle_0_header_price"]',
        firstFareSelectionCheckbox: '//*[@resource-id="bundle-list-element_bundle_0_header_radio_button"]',

        // Second fare
        secondFareTitle: '//*[@resource-id="bundle-list-element_bundle_1_header_title"]',
        secondFareInfoButton: '//*[@resource-id="bundle-list-element_bundle_1_header_info_icon"]',
        secondFareSubtitle: '//*[@resource-id="bundle-list-element_bundle_1_header_sub_title"]',
        secondFarePriceCurrency: '//*[@resource-id="bundle-list-element_bundle_1_header_currency"]',
        secondFarePriceNumbers: '//*[@resource-id="bundle-list-element_bundle_1_header_price"]',
        secondFareSelectionCheckbox: '//*[@resource-id="bundle-list-element_bundle_1_header_radio_button"]',

        // Third fare
        thirdFareTitle: '//*[@resource-id="bundle-list-element_bundle_2_header_title"]',
        thirdFareInfoButton: '//*[@resource-id="bundle-list-element_bundle_2_header_info_icon"]',
        thirdFareSubtitle: '//*[@resource-id="bundle-list-element_bundle_2_header_sub_title"]',
        thirdFarePriceCurrency: '//*[@resource-id="bundle-list-element_bundle_2_header_currency"]',
        thirdFarePriceNumbers: '//*[@resource-id="bundle-list-element_bundle_2_header_price"]',
        thirdFareSelectionCheckbox: '//*[@resource-id="bundle-list-element_bundle_2_header_radio_button"]',

        faresContinueButton: '//*[@content-desc="Continue"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};