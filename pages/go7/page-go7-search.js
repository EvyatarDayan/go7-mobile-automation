const {driver} = require("@wdio/globals");

const mainIOS = {
        searchPageTitle: '//*[@label="Ease your mind in"]',
        roundTripCheckbox: '~sf_radio_button_rt_btn',
        oneWayCheckbox: '~sf_radio_button_ow_btn',
        fromInput: '~sf_select_location_from_text',
        toInput: '~sf_select_location_to_text',
        switchDestinationsButton: '~sf_select_location_switch',
        destinationsSearchCloseButton: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup',
        destinationsSearchInput: '~sf_select_location_select_search_input_input',
        destinationsSearchInputClearButton: '-ios class chain:**/XCUIElementTypeOther[`label == "sf_select_location_select_search_input_icons_x"`][2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther',
        searchIcon: '~sf_select_location_select_search_input_left_icon_wrapper',
        destinationsFromAllResults: '~sf_select_location_selectList_list',
        destinationsFirstResult: '~sf_select_location_select_search_item_text_0',
        searchDepartDateSummary: '~sf_dates_selector_depart_text',
        searchReturnDateSummary: '~sf_dates_selector_return_text',
        passengersSummary: '~sf_counters_input_text',
        promotionCodeButton: '-ios class chain:**/XCUIElementTypeOther[`label == "promo_code_add_button"`]/XCUIElementTypeOther/XCUIElementTypeOther',
        promotionCodeInput: '~promo_code_input_input',
        searchFlightButton: '~sf_submit_btn_text',
        otherTitle: '~sf_select_location_groupHeader_text',
        // Footer
        homeButton: '~Home',
        checkInButton: '-ios class chain:**/XCUIElementTypeStaticText[`label == "Check in"`]',
        myGo7Button: '-ios class chain:**/XCUIElementTypeStaticText[`label == "My GO7"`]',
}

const mainAndroid = {
        searchPageTitle: '//*[@content-desc="Ease your mind in"]',
        roundTripCheckbox: '//*[@resource-id="sf_radio_button_rt_btn"]',
        oneWayCheckbox: '//*[@resource-id="sf_radio_button_ow_btn"]',
        fromInput: '//*[@resource-id="sf_select_location_from_text"]',
        toInput: '//*[@resource-id="sf_select_location_to_text"]',
        switchDestinationsButton: '//*[@resource-id="sf_select_location_switch"]',
        destinationsSearchCloseButton: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup',
        destinationsSearchInput: '//*[@resource-id="sf_select_location_select_search_input_input"]',
        destinationsSearchInputClearButton: '//*[@resource-id="sf_select_location_select_search_input_icons_container"]',
        searchIcon: '//*[@resource-id="sf_select_location_select_search_input_left_icon_wrapper"]',
        destinationsFromAllResults: '//*[@resource-id="sf_select_location_selectList_list"]',
        destinationsFirstResult: '//*[@resource-id="sf_select_location_select_search_item_text_0"]',
        searchDepartDateSummary: '//*[@resource-id="sf_dates_selector_depart_text"]',
        searchReturnDateSummary: '//*[@resource-id="sf_dates_selector_return_text"]',
        passengersSummary: '//*[@resource-id="sf_counters_input_text"]',
        promotionCodeButton: '//*[@text="Add promotion code"]',
        promotionCodeInput: '//*[@resource-id="promo_code_input_input"]',
        searchFlightButton: '//*[@resource-id="sf_submit_btn_text"]',
        otherTitle: '//*[@resource-id="sf_select_location_groupHeader_text"]',
        // Footer
        homeButton: '//*[@content-desc="Home"]',
        checkInButton: '//*[@content-desc="Check in"]',
        myGo7Button: "//*[contains(@content-desc, 'My GO7') and contains(@index, '2')]",
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};