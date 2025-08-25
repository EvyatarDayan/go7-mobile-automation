const {driver} = require("@wdio/globals");

const mainIOS = {
        // Upper
        seatSelectionBackButton: '~header_back_button_seat_selection',
        seatSelectionPageTitle: '~page_title_seat_selection',

        destinationButton: '~seat_map_screen_seat_map_header_flights_drop_down_select_trigger_icon_container',
                destinationsDepart: '~seat_map_screen_seat_map_header_flights_drop_down_select_item_0',
                destinationsReturn: '~seat_map_screen_seat_map_header_flights_drop_down_select_item_1',
        passenger1_FullName: '~seat_map_screen_pax_selector_pax_1_passengerTag_fullname',
        passenger1_Initials: '~seat_map_screen_pax_selector_pax_1_passengerTag_avatar_name_shortcut',
        seatLegendButton: '~seat_map_screen_seat_map_selector_trigger_title',
        allAvailableSeats: '//*[contains(@name, "_available_")]',
        selectSeatButton: '~select-seats_text',

        continueButton: '~Continue',
}

const mainAndroid = {
        // Upper
        backButton: '//*[@resource-id="header_back_button_seat_selection"]',
        ancillaryPageTitle: '//*[@resource-id="page_title_seat_selection"]',

        destinationButton: '//*[@resource-id="seat_map_screen_seat_map_header_flights_drop_down_select_trigger_icon_container"]',
                destinationsDepart: '//*[@resource-id="seat_map_screen_seat_map_header_flights_drop_down_select_item_0"]',
                destinationsReturn: '//*[@resource-id="seat_map_screen_seat_map_header_flights_drop_down_select_item_1"]',
        passenger1_FullName: '//*[@resource-id="seat_map_screen_pax_selector_pax_1_passengerTag_fullname"]',
        passenger1_Initials: '//*[@resource-id="seat_map_screen_pax_selector_pax_1_passengerTag_avatar_name_shortcut"]',
        seatLegendButton: '//*[@resource-id="seat_map_screen_seat_map_selector_trigger_title"]',
        allAvailableSeats: '//*[@resource-id="TBD"]',
        selectSeatButton: '//*[@resource-id="select-seats_text"]',

        continueButton: '//*[@resource-id="Continue"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};