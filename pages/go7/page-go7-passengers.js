const {driver} = require("@wdio/globals");

const mainIOS =  {
        pageTitle: '~page_title',
        adultTitleText: '~sf_counters_Adult_label',
        adultAgeDescriptionText: '~sf_counters_Adult_sub_label',
        childrenTitleText: '~sf_counters_Child_label',
        childrenAgeDescriptionText: '~sf_counters_Child_sub_label',
        infantTitleText: '~sf_counters_Infant_label',
        infantAgeDescriptionText: '~sf_counters_Infant_sub_label',
        adultsPlusButton: '~sf_counters_Adult_counter_plus',
        adultsMinusButton: '~sf_counters_Adult_counter_minus',
        adultsCount: '~sf_counters_Adult_counter_value',
        teensPlusButton: '~sf_counters_Teens_counter_plus',
        teensMinusButton: '~sf_counters_Teens_counter_minus',
        teensCount: '~sf_counters_Teens_counter_value',
        childrenPlusButton: '~sf_counters_Child_counter_plus',
        childrenMinusButton: '~sf_counters_Child_counter_minus',
        childrenCount: '~sf_counters_Child_counter_value',
        infantsPlusButton: '~sf_counters_Infant_counter_plus',
        infantsMinusButton: '~sf_counters_Infant_counter_minus',
        infantsCount: '~sf_counters_Infant_counter_value',
        passengersNotesText: '~sf_counters_note_description',
        passengersSaveButton: '~sf_counters_save_btn',
        passengersCloseButton: '~sf_counters_xBtn',
}

const mainAndroid =  {
        pageTitle: '//*[@resource-id="page_title"]',
        adultTitleText: '//*[@resource-id="sf_counters_Adult_label"]',
        adultAgeDescriptionText: '//*[@resource-id="sf_counters_Adult_sub_label"]',
        childrenTitleText: '//*[@resource-id="sf_counters_Child_label"]',
        childrenAgeDescriptionText: '//*[@resource-id="sf_counters_Child_sub_label"]',
        infantTitleText: '//*[@resource-id="sf_counters_Infant_label"]',
        infantAgeDescriptionText: '//*[@resource-id="sf_counters_Infant_sub_label"]',
        adultsPlusButton: '//*[@resource-id="sf_counters_Adult_counter_plus"]',
        adultsMinusButton: '//*[@resource-id="sf_counters_Adult_counter_minus"]',
        adultsCount: '//*[@resource-id="sf_counters_Adult_counter_value"]',
        teensPlusButton: '//*[@resource-id="sf_counters_Teens_counter_plus"]',
        teensMinusButton: '//*[@resource-id="sf_counters_Teens_counter_minus"]',
        teensCount: '//*[@resource-id="sf_counters_Teens_counter_value"]',
        childrenPlusButton: '//*[@resource-id="sf_counters_Child_counter_plus"]',
        childrenMinusButton: '//*[@resource-id="sf_counters_Child_counter_minus"]',
        childrenCount: '//*[@resource-id="sf_counters_Child_counter_value"]',
        infantsPlusButton: '//*[@resource-id="sf_counters_Infant_counter_plus"]',
        infantsMinusButton: '//*[@resource-id="sf_counters_Infant_counter_minus"]',
        infantsCount: '//*[@resource-id="sf_counters_Infant_counter_value"]',
        passengersNotesText: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup[5]/android.widget.TextView[2]',
        passengersSaveButton: '//*[@resource-id="sf_counters_save_btn"]',
        passengersCloseButton: '//*[@resource-id="sf_counters_xBtn"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};