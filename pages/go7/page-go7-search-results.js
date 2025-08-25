const {driver} = require("@wdio/globals");

const mainIOS = {
        // Upper
        backButton: '~header_back_button_search_results',
        searchResultsPageTitle: '~page_title_search_results',
        priceSummaryCurrency: '~price_summary_currency',
        priceSummaryNumbers: '~price_summary_price',

        // Depart
        departTitle: '~sr_departure_header_title',
        departDestinationCodes: '~sr_departure_header_locations',
        departFirstFlightChangeButton: '~sr_departure_header_change_button_text',
        departCarouselPreviousButton: '~sr_departure_carousel_prev_container',
        departCarouselNextButton: '~sr_departure_carousel_next_container',
        departCarouselCurrentDate: '~sr_departure_carousel_item_7_date',
        departCarouselNextDate: '~sr_departure_carousel_item_8_date',
        departCarouselPreviousDate: '~sr_departure_carousel_item_6_date',

        departFirstFlightContainer: '~sr_departure_offer_items_offer_0_booking_ticket_details_container',
        departFirstFlightDetailsButton: '~sr_departure_offer_items_offer_0_fars_details_button',
        departFirstFlightStartDate: '~sr_departure_offer_items_offer_0_booking_ticket_details_start_date',
        departFirstFlightStartTime: '~sr_departure_offer_items_offer_0_booking_ticket_details_start_time',
        departFirstFlightStartDestination: '~sr_departure_offer_items_offer_0_booking_ticket_details_start_location_name',
        departFirstFlightStartDestinationCode: '~sr_departure_offer_items_offer_0_booking_ticket_details_start_location_code',
        departFirstFlightDurationTime: '~sr_departure_offer_items_offer_0_booking_ticket_details_duration_time_text_duration',
        departFirstFlightDurationDetails: '~sr_departure_offer_items_offer_0_booking_ticket_details_duration_time_text_details',
        departFirstFlightFlightNumber: '~sr_departure_offer_items_offer_0_booking_ticket_details_duration_flight_number',
        departFirstFlightEndDate: '~sr_departure_offer_items_offer_0_booking_ticket_details_end_date',
        departFirstFlightEndTime: '~sr_departure_offer_items_offer_0_booking_ticket_details_end_time',
        departFirstFlightEndDestination: '~sr_departure_offer_items_offer_0_booking_ticket_details_end_location_name',
        departFirstFlightEndDestinationCode: '~sr_departure_offer_items_offer_0_booking_ticket_details_end_location_code',
        departFirstFlightCurrencyCode: '~sr_departure_offer_items_offer_0_currency_code',
        departFirstFlightPriceText: '~sr_departure_offer_items_offer_0_price_total',
        departFirstFlightPriceInfoButton: '~sr_departure_offer_items_offer_0_fars_details_button',

        // Return
        returnTitle: '~sr_return_header_title',
        returnDestinationCodes: '~sr_return_header_locations',
        returnFirstFlightChangeButton: '~sr_return_header_change_button_text',
        returnFirstFlightContainer: '~sr_return_offer_items_offer_0_booking_ticket_details_container',
        returnFirstDetailsButton: '~sr_return_offer_items_offer_0_fars_details_button',
        returnCarouselPreviousButton: '~sr_return_carousel_prev_container',
        returnCarouselNextButton: '~sr_return_carousel_next_container',
        returnCarouselCurrentDate: '~sr_return_carousel_item_7_date',
        returnCarouselNextDate: '~sr_return_carousel_item_8_date',
        returnCarouselPreviousDate: '~sr_return_carousel_item_6_date',

        returnFirstFlightStartDate: '~sr_return_offer_items_offer_0_booking_ticket_details_start_date',
        returnFirstFlightStartTime: '~sr_return_offer_items_offer_0_booking_ticket_details_start_time',
        returnFirstFlightStartDestination: '~sr_return_offer_items_offer_0_booking_ticket_details_start_location_name',
        returnFirstFlightStartDestinationCode: '~sr_return_offer_items_offer_0_booking_ticket_details_start_location_code',
        returnFirstFlightDurationTime: '~sr_return_offer_items_offer_0_booking_ticket_details_duration_time_text_duration',
        returnFirstFlightDurationDetails: '~sr_return_offer_items_offer_0_booking_ticket_details_duration_time_text_details',
        returnFirstFlightFlightNumber: '~sr_return_offer_items_offer_0_booking_ticket_details_duration_flight_number',
        returnFirstFlightEndDate: '~sr_return_offer_items_offer_0_booking_ticket_details_end_date',
        returnFirstFlightEndTime: '~sr_return_offer_items_offer_0_booking_ticket_details_end_time',
        returnFirstFlightEndDestination: '~sr_return_offer_items_offer_0_booking_ticket_details_end_location_name',
        returnFirstFlightEndDestinationCode: '~sr_return_offer_items_offer_0_booking_ticket_details_end_location_code',
        returnFirstFlightCurrencyCode: '~sr_return_offer_items_offer_0_currency_code',
        returnFirstFlightPriceText: '~sr_return_offer_items_offer_0_price_total',
        returnFirstFlightPriceInfoButton: '~sr_return_offer_items_offer_0_fars_details_button',

        continueButton: '~bottom_button',
}

const mainAndroid = {
        // Upper
        backButton: '//*[@resource-id="header_back_button_search_results"]',
        searchResultsPageTitle: '//*[@resource-id="page_title_search_results"]',
        priceSummaryCurrency: '//*[@resource-id="price_summary_currency"]',
        priceSummaryNumbers: '//*[@resource-id="price_summary_price"]',

        // Depart
        departTitle: '//*[@resource-id="sr_departure_header_title"]',
        departDestinationCodes: '//*[@resource-id="sr_departure_header_locations"]',
        departFirstFlightChangeButton: '//*[@resource-id="sr_departure_header_change_button_text"]',
        departCarouselPreviousButton: '//*[@resource-id="sr_departure_carousel_prev_container"]',
        departCarouselNextButton: '//*[@resource-id="sr_departure_carousel_next_container"]',
        departCarouselCurrentDate: '//*[@resource-id="sr_departure_carousel_item_7_date"]',
        departCarouselNextDate: '//*[@resource-id="sr_departure_carousel_item_8_date"]',
        departCarouselPreviousDate: '//*[@resource-id="sr_departure_carousel_item_6_date"]',

        departFirstFlightContainer: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_container"]',
        departFirstFlightDetailsButton: '//*[@resource-id="sr_departure_offer_items_offer_0_fars_details_button"]',
        departFirstFlightStartDate: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_start_date"]',
        departFirstFlightStartTime: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_start_time"]',
        departFirstFlightStartDestination: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_start_location_name"]',
        departFirstFlightStartDestinationCode: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_start_location_code"]',
        departFirstFlightDurationTime: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_duration_time_text_duration"]',
        departFirstFlightDurationDetails: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_duration_time_text_details"]',
        departFirstFlightFlightNumber: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_duration_flight_number"]',
        departFirstFlightEndDate: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_end_date"]',
        departFirstFlightEndTime: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_end_time"]',
        departFirstFlightEndDestination: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_end_location_name"]',
        departFirstFlightEndDestinationCode: '//*[@resource-id="sr_departure_offer_items_offer_0_booking_ticket_details_end_location_code"]',
        departFirstFlightCurrencyCode: '//*[@resource-id="sr_departure_offer_items_offer_0_currency_code"]',
        departFirstFlightPriceText: '//*[@resource-id="sr_departure_offer_items_offer_0_price_total"]',
        departFirstFlightPriceInfoButton: '//*[@resource-id="sr_departure_offer_items_offer_0_fars_details_button"]',

        // Return
        returnTitle: '//*[@resource-id="sr_return_header_title"]',
        returnDestinationCodes: '//*[@resource-id="sr_return_header_locations"]',
        returnFirstFlightChangeButton: '//*[@resource-id="sr_return_header_change_button_text"]',
        returnFirstFlightContainer: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_container"]',
        returnFirstDetailsButton: '//*[@resource-id="sr_return_offer_items_offer_0_fars_details_button"]',
        returnCarouselPreviousButton: '//*[@resource-id="sr_return_carousel_prev_container"]',
        returnCarouselNextButton: '//*[@resource-id="sr_return_carousel_next_container"]',
        returnCarouselCurrentDate: '//*[@resource-id="sr_return_carousel_item_7_date"]',
        returnCarouselNextDate: '//*[@resource-id="sr_return_carousel_item_8_date"]',
        returnCarouselPreviousDate: '//*[@resource-id="sr_return_carousel_item_6_date"]',

        returnFirstFlightStartDate: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_start_date"]',
        returnFirstFlightStartTime: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_start_time"]',
        returnFirstFlightStartDestination: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_start_location_name"]',
        returnFirstFlightStartDestinationCode: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_start_location_code"]',
        returnFirstFlightDurationTime: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_duration_time_text_duration"]',
        returnFirstFlightDurationDetails: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_duration_time_text_details"]',
        returnFirstFlightFlightNumber: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_duration_flight_number"]',
        returnFirstFlightEndDate: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_end_date"]',
        returnFirstFlightEndTime: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_end_time"]',
        returnFirstFlightEndDestination: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_end_location_name"]',
        returnFirstFlightEndDestinationCode: '//*[@resource-id="sr_return_offer_items_offer_0_booking_ticket_details_end_location_code"]',
        returnFirstFlightCurrencyCode: '//*[@resource-id="sr_return_offer_items_offer_0_currency_code"]',
        returnFirstFlightPriceText: '//*[@resource-id="sr_return_offer_items_offer_0_price_total"]',
        returnFirstFlightPriceInfoButton: '//*[@resource-id="sr_return_offer_items_offer_0_fars_details_button"]',

        continueButton: '//*[@resource-id="bottom_button"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};