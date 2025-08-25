const {driver} = require("@wdio/globals");

const mainIOS = {
        // Upper
        backButton: '~header_back_button_ancillaries',
        ancillaryPageTitle: '~page_title_ancillaries',
        priceSummaryCurrency: '~price_summary_currency',
        priceSummaryNumbers: '~price_summary_price',
        flightSelectionText: '~ancillary_screen_flight_list_selectList_input_text',
        flightSelectionButton: '~ancillary_screen_flight_list_selectList_input_icon_container',
        selectBaggagesLabel: '~ancillary_screen_select_title',
        passenger1_Initials: '~ancillary_screen_baggage_tab_passengersBaggageLists_container_passengerSelector_pax_1_passengerTag_avatar_name_shortcut',
        passenger1_FullName: '~ancillary_screen_baggage_tab_passengersBaggageLists_container_passengerSelector_pax_1_passengerTag_fullname',
        passenger2_Initials: '~ancillary_screen_baggage_tab_passengersBaggageLists_container_passengerSelector_pax_2_passengerTag_avatar_name_shortcut',
        passenger2_FullName: '~ancillary_screen_baggage_tab_passengersBaggageLists_container_passengerSelector_pax_2_passengerTag_fullname',

        // First Checked bag
        firstCheckedBagSectionTitle: '~ancillary_screen_baggage_tab_Checkedbag_1st_checked_bag_title',
        firstCheckedBagContentTitle: '~ancillary_screen_baggage_tab_Checkedbag_1st_checked_bag_content_title',
        firstCheckedBagPriceCurrency: '~ancillary_screen_baggage_tab_Checkedbag_1st_checked_bag_price_currency',
        firstCheckedBagPriceNumbers: '~ancillary_screen_baggage_tab_Checkedbag_1st_checked_bag_price_text',
        firstCheckedBagAddButton: '~ancillary_screen_baggage_tab_Checkedbag_1st_checked_bag_addButton',

        // Second Checked bag
        secondCheckedBagSectionTitle: '~ancillary_screen_baggage_tab_Checkedbag__2nd_checkedin_bag_23KG_title',
        secondCheckedBagContentTitle: '~ancillary_screen_baggage_tab_Checkedbag__2nd_checkedin_bag_23KG_content_title',
        secondCheckedBagPriceCurrency: '~ancillary_screen_baggage_tab_Checkedbag__2nd_checkedin_bag_23KG_price_currency',
        secondCheckedBagPriceNumbers: '~ancillary_screen_baggage_tab_Checkedbag__2nd_checkedin_bag_23KG_price_text',
        secondCheckedBagAddButton: '~ancillary_screen_baggage_tab_Checkedbag__2nd_checkedin_bag_23KG_addButton',

        // First element        // This is needed since we cannot predict the ancillaries display on page
        firstAncillarySectionTitle: 'TBD',
        firstAncillaryContentTitle: 'TBD',
        firstAncillaryPriceCurrency: 'TBD',
        firstAncillaryPriceNumbers: '//*[contains(@name, "_price_group_0_item_0_text")]',
        firstAncillaryAddButton: '//*[contains(@name, "_addButton_group_0_item_0_text")]',

        // Bicycle
        bicycleSectionTitle: '~ancillary_screen_baggage_tab_Bicycle_section_title',
        bicycleContentTitle: '~ancillary_screen_baggage_tab_Bicycle_Bicycle_content_title',
        bicyclePriceCurrency: '~ancillary_screen_baggage_tab_Bicycle_Bicycle_price_currency',
        bicyclePriceNumbers: '~ancillary_screen_baggage_tab_Bicycle_Bicycle_price_text',
        bicycleAddButton: '~ancillary_screen_baggage_tab_Bicycle_Bicycle_addButton',

        // Sandwich And Drink
        standardMealSectionTitle: '~ancillary_screen_baggage_tab_Standard_Meal_section_title',
        sandwichAndDrinkContentTitle: '~ancillary_screen_baggage_tab_Standard_Meal_Sandwich__Drink_content_title',
        sandwichAndDrinkPriceCurrency: '~ancillary_screen_baggage_tab_Standard_Meal_Sandwich__Drink_price_currency',
        sandwichAndDrinkPriceNumbers: '~ancillary_screen_baggage_tab_Standard_Meal_Sandwich__Drink_price_text',
        sandwichAndDrinkAddButton: '~ancillary_screen_baggage_tab_Standard_Meal_Sandwich__Drink_addButton',

        // Coffee And Croissant
        coffeeAndCroissantContentTitle: '~ancillary_screen_baggage_tab_Standard_Meal_Coffee__croissant_content_title',
        coffeeAndCroissantPriceCurrency: '~ancillary_screen_baggage_tab_Standard_Meal_Coffee__croissant_price_currency',
        coffeeAndCroissantPriceNumbers: '~ancillary_screen_baggage_tab_Standard_Meal_Coffee__croissant_price_text',
        coffeeAndCroissantAddButton: '~ancillary_screen_baggage_tab_Standard_Meal_Coffee__croissant_addButton',

        // Lunch
        lunchContentTitle: '~ancillary_screen_baggage_tab_Standard_Meal_Lunch_main_dish_and_drink_content_title',
        lunchPriceCurrency: '~ancillary_screen_baggage_tab_Standard_Meal_Lunch_main_dish_and_drink_price_currency',
        lunchPriceNumbers: '~ancillary_screen_baggage_tab_Standard_Meal_Lunch_main_dish_and_drink_price_text',
        lunchAddButton: '~ancillary_screen_baggage_tab_Standard_Meal_Lunch_main_dish_and_drink_addButton',

        // Extra baggage
        extraBaggageSectionTitle: '~ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_section_title',
        extraWeightContentTitle: '~ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_Extra_Weight_23_KG_content_title',
        extraWeightPriceCurrency: '~ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_Extra_Weight_23_KG_price_currency',
        extraWeightPriceNumbers: '~ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_Extra_Weight_23_KG_price_text',
        extraWeightAddButton: '~ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_Extra_Weight_23_KG_addButton',

        // Footer
        nextFlightButton: '~ancillary_screen_flight_navigation_next_flight',
        nextFlightButtonText: '~ancillary_screen_flight_navigation_next_flight_text',
        previousFlightButton: '~ancillary_screen_flight_navigation_prev_flight',
        previousFlightButtonText: '~ancillary_screen_flight_navigation_prev_flight_text',
        continueButton: '~bottom_button',
        continueButtonText: '~Continue',

        // "No item selected" popup
        noItemSelectedTitle: '~ancillary_screen_no_items_modal_header_text',
        noItemSelectedCloseButton: '~ancillary_screen_no_items_modal_close_container',
        noItemSelectedNextButton: '~ancillary_screen_no_items_modal_next_text',
        noItemSelectedSelectItemButton: '~ancillary_screen_no_items_modal_return_text',
}

const mainAndroid = {
        // Upper
        backButton: '//*[@resource-id="header_back_button_ancillaries"]',
        ancillaryPageTitle: '//*[@resource-id="page_title_ancillaries"]',
        priceSummaryCurrency: '//*[@resource-id="price_summary_currency"]',
        priceSummaryNumbers: '//*[@resource-id="price_summary_price"]',
        flightSelectionText: '//*[@resource-id="ancillary_screen_flight_list_selectList_input_text"]',
        flightSelectionButton: '//*[@resource-id="ancillary_screen_flight_list_selectList_input_icon_container"]',
        selectBaggagesLabel: '//*[@resource-id="ancillary_screen_select_title"]',
        passenger1_Initials: '//*[@resource-id="ancillary_screen_baggage_tab_passengersBaggageLists_container_passengerSelector_pax_1_passengerTag_avatar_name_shortcut"]',
        passenger1_FullName: '//*[@resource-id="ancillary_screen_baggage_tab_passengersBaggageLists_container_passengerSelector_pax_1_passengerTag_fullname"]',
        passenger2_Initials: '//*[@resource-id="ancillary_screen_baggage_tab_passengersBaggageLists_container_passengerSelector_pax_2_passengerTag_avatar_name_shortcut"]',
        passenger2_FullName: '//*[@resource-id="ancillary_screen_baggage_tab_passengersBaggageLists_container_passengerSelector_pax_2_passengerTag_fullname"]',

        // firstAncillary element         // This is needed since we cannot predict the ancillaries display on page
        firstAncillarySectionTitle: 'TBD',
        firstAncillaryContentTitle: 'TBD',
        firstAncillaryPriceCurrency: 'TBD',
        firstAncillaryPriceNumbers: 'TBD',
        firstAncillaryAddButton: 'TBD',

        // Bicycle
        bicycleSectionTitle: '//*[@resource-id="ancillary_screen_baggage_tab_Bicycle_section_title"]',
        bicycleContentTitle: '//*[@resource-id="ancillary_screen_baggage_tab_Bicycle_Bicycle_content_title"]',
        bicyclePriceCurrency: '//*[@resource-id="ancillary_screen_baggage_tab_Bicycle_Bicycle_price_currency"]',
        bicyclePriceNumbers: '//*[@resource-id="ancillary_screen_baggage_tab_Bicycle_Bicycle_price_text"]',
        bicycleAddButton: '//*[@resource-id="ancillary_screen_baggage_tab_Bicycle_Bicycle_addButton"]',

        // Sandwich And Drink
        standardMealSectionTitle: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_section_title"]',
        sandwichAndDrinkContentTitle: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Sandwich__Drink_content_title"]',
        sandwichAndDrinkPriceCurrency: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Sandwich__Drink_price_currency"]',
        sandwichAndDrinkPriceNumbers: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Sandwich__Drink_price_text"]',
        sandwichAndDrinkAddButton: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Sandwich__Drink_addButton"]',

        // Coffee And Croissant
        coffeeAndCroissantContentTitle: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Coffee__croissant_content_title"]',
        coffeeAndCroissantPriceCurrency: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Coffee__croissant_price_currency"]',
        coffeeAndCroissantPriceNumbers: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Coffee__croissant_price_text"]',
        coffeeAndCroissantAddButton: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Coffee__croissant_addButton"]',

        // Lunch
        lunchContentTitle: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Lunch_main_dish_and_drink_content_title"]',
        lunchPriceCurrency: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Lunch_main_dish_and_drink_price_currency"]',
        lunchPriceNumbers: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Lunch_main_dish_and_drink_price_textv"]',
        lunchAddButton: '//*[@resource-id="ancillary_screen_baggage_tab_Standard_Meal_Lunch_main_dish_and_drink_addButton"]',

        // Extra baggage
        extraBaggageSectionTitle: '//*[@resource-id="ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_section_title"]',
        extraWeightContentTitle: '//*[@resource-id="ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_Extra_Weight_23_KG_content_title"]',
        extraWeightPriceCurrency: '//*[@resource-id="ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_Extra_Weight_23_KG_price_currency"]',
        extraWeightPriceNumbers: '//*[@resource-id="ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_Extra_Weight_23_KG_price_text"]',
        extraWeightAddButton: '//*[@resource-id="ancillary_screen_baggage_tab_Extra_Baggage_up_to_23_KG_Extra_Weight_23_KG_addButton"]',

        // Footer
        nextFlightButton: '//*[@resource-id="ancillary_screen_flight_navigation_next_flight"]',
        nextFlightButtonText: '//*[@resource-id="ancillary_screen_flight_navigation_next_flight_text"]',
        previousFlightButton: '//*[@resource-id="ancillary_screen_flight_navigation_prev_flight"]',
        previousFlightButtonText: '//*[@resource-id="ancillary_screen_flight_navigation_prev_flight_text"]',
        continueButton: '//*[@resource-id="bottom_button"]',
        continueButtonText: '~Continue',
    }

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};