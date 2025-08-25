const {driver} = require("@wdio/globals");

const mainIOS = {
    // Upper
    bookingSummaryBackButton: '~header_back_button_booking_summary',
    bookingSummaryPageTitle: '~page_title_booking_summary',
    flightDetailsTitle: '~flight_details_header',
    // Departure flight
    departFlightTitle: '~flight_details_flight_0_title',
    departFlightStartDate: '~flight_details_flight_0_offer_details_departure_date',
    departFlightStartTime: '~flight_details_flight_0_offer_details_departure_time',
    departFlightStartDestination: '~flight_details_flight_0_offer_details_departure_location_name',
    departFlightStartDestinationCode: '~flight_details_flight_0_offer_details_departure_location_code',
    departFlightDurationDetails: '~flight_details_flight_0_offer_details_duration_time_text_details',
    departFlightDurationTime: '~flight_details_flight_0_offer_details_duration_time_text_duration',
    departFlightFlightNumber: '~flight_details_flight_0_offer_details_duration_flight_number',
    departFlightEndDate: '~flight_details_flight_0_offer_details_arrival_date',
    departFlightEndTime: '~flight_details_flight_0_offer_details_arrival_time',
    departFlightEndDestination: '~flight_details_flight_0_offer_details_arrival_location_name',
    departFlightEndDestinationCode: '~flight_details_flight_0_offer_details_arrival_location_code',
    // Return flight
    returnFlightTitle: '~flight_details_flight_1_title',
    returnFlightStartDate: '~flight_details_flight_1_offer_details_departure_date',
    returnFlightStartTime: '~flight_details_flight_1_offer_details_departure_time',
    returnFlightStartDestination: '~flight_details_flight_1_offer_details_departure_location_name',
    returnFlightStartDestinationCode: '~flight_details_flight_1_offer_details_departure_location_code',
    returnFlightDurationDetails: '~flight_details_flight_1_offer_details_duration_time_text_details',
    returnFlightDurationTime: '~flight_details_flight_1_offer_details_duration_time_text_duration',
    returnFlightFlightNumber: '~flight_details_flight_1_offer_details_duration_flight_number',
    returnFlightEndDate: '~flight_details_flight_1_offer_details_arrival_date',
    returnFlightEndTime: '~flight_details_flight_1_offer_details_arrival_time',
    returnFlightEndDestination: '~flight_details_flight_1_offer_details_arrival_location_name',
    returnFlightEndDestinationCode: '~flight_details_flight_1_offer_details_arrival_location_code',

    // Price breakdown
    priceBreakdownToggleButton: '~price_breakdown_arrow',
    totalCurrencyCode: '~price_breakdown_currency',
    totalPriceNumbers: '~price_breakdown_total',
    // Fares
    faresSectionToggleButton: '~price_breakdown_category_fares_arrow',
    faresSectionCurrencyCode: '~price_breakdown_category_fares_currency',
    faresSectionPriceNumbers: '~price_breakdown_category_fares_amount',
    // Ancillaries
    ancillariesSectionToggleButton: '~price_breakdown_category_ancillaries_arrow',
    ancillariesSectionCurrencyCode: '~price_breakdown_category_ancillaries_currency',
    ancillariesSectionPriceNumbers: '~price_breakdown_category_ancillaries_amount',
    // Taxes-fees
    taxesFeesSectionToggleButton: '~price_breakdown_category_taxesfees_arrow',
    taxesFeesSectionCurrencyCode: '~price_breakdown_category_taxesfees_currency',
    taxesFeesSectionPriceNumbers: '~price_breakdown_category_taxesfees_amount',


    continueButton: '~Continue',
}

const mainAndroid = {
    // Upper
    bookingSummaryBackButton: '//*[@resource-id="header_back_button_booking_summary"]',
    bookingSummaryPageTitle: '//*[@resource-id="page_title_booking_summary"]',
    flightDetailsTitle: '//*[@resource-id="flight_details_header"]',
    // Departure flight
    departFlightTitle: '//*[@resource-id="flight_details_flight_0_title"]',
    departFlightStartDate: '//*[@resource-id="flight_details_flight_0_offer_details_departure_date"]',
    departFlightStartTime: '//*[@resource-id="flight_details_flight_0_offer_details_departure_time"]',
    departFlightStartDestination: '//*[@resource-id="flight_details_flight_0_offer_details_departure_location_name"]',
    departFlightStartDestinationCode: '//*[@resource-id="flight_details_flight_0_offer_details_departure_location_code"]',
    departFlightDurationDetails: '//*[@resource-id="flight_details_flight_0_offer_details_duration_time_text_details"]',
    departFlightDurationTime: '//*[@resource-id="flight_details_flight_0_offer_details_duration_time_text_duration"]',
    departFlightFlightNumber: '//*[@resource-id="flight_details_flight_0_offer_details_duration_flight_number"]',
    departFlightEndDate: '//*[@resource-id="flight_details_flight_0_offer_details_arrival_date"]',
    departFlightEndTime: '//*[@resource-id="flight_details_flight_0_offer_details_arrival_time"]',
    departFlightEndDestination: '//*[@resource-id="flight_details_flight_0_offer_details_arrival_location_name"]',
    departFlightEndDestinationCode: '//*[@resource-id="flight_details_flight_0_offer_details_arrival_location_code"]',
    // Return flight
    returnFlightTitle: '//*[@resource-id="flight_details_flight_1_title"]',
    returnFlightStartDate: '//*[@resource-id="flight_details_flight_1_offer_details_departure_date"]',
    returnFlightStartTime: '//*[@resource-id="flight_details_flight_1_offer_details_departure_time"]',
    returnFlightStartDestination: '//*[@resource-id="flight_details_flight_1_offer_details_departure_location_name"]',
    returnFlightStartDestinationCode: '//*[@resource-id="flight_details_flight_1_offer_details_departure_location_code"]',
    returnFlightDurationDetails: '//*[@resource-id="flight_details_flight_1_offer_details_duration_time_text_details"]',
    returnFlightDurationTime: '//*[@resource-id="flight_details_flight_1_offer_details_duration_time_text_duration"]',
    returnFlightFlightNumber: '//*[@resource-id="flight_details_flight_1_offer_details_duration_flight_number"]',
    returnFlightEndDate: '//*[@resource-id="flight_details_flight_1_offer_details_arrival_date"]',
    returnFlightEndTime: '//*[@resource-id="flight_details_flight_1_offer_details_arrival_time"]',
    returnFlightEndDestination: '//*[@resource-id="flight_details_flight_1_offer_details_arrival_location_name"]',
    returnFlightEndDestinationCode: '//*[@resource-id="flight_details_flight_1_offer_details_arrival_location_code"]',

    // Price breakdown
    priceBreakdownToggleButton: '//*[@resource-id="price_breakdown_arrow"]',
    totalCurrencyCode: '//*[@resource-id="price_breakdown_currency"]',
    totalPriceNumbers: '//*[@resource-id="price_breakdown_total"]',
    // Fares
    faresSectionToggleButton: '//*[@resource-id="price_breakdown_category_fares_arrow"]',
    faresSectionCurrencyCode: '//*[@resource-id="price_breakdown_category_fares_currency"]',
    faresSectionPriceNumbers: '//*[@resource-id="price_breakdown_category_fares_amount"]',
    // Ancillaries
    ancillariesSectionToggleButton: '//*[@resource-id="price_breakdown_category_ancillaries_arrow"]',
    ancillariesSectionCurrencyCode: '//*[@resource-id="price_breakdown_category_ancillaries_currency"]',
    ancillariesSectionPriceNumbers: '//*[@resource-id="price_breakdown_category_ancillaries_amount"]',
    // Taxes-fees
    taxesFeesSectionToggleButton: '//*[@resource-id="price_breakdown_category_taxesfees_arrow"]',
    taxesFeesSectionCurrencyCode: '//*[@resource-id="price_breakdown_category_taxesfees_currency"]',
    taxesFeesSectionPriceNumbers: '//*[@resource-id="price_breakdown_category_taxesfees_amount"]',

    continueButton: '//*[@resource-id="Continue"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};