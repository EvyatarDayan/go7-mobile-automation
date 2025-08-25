const {driver} = require("@wdio/globals");

const mainIOS = {
        pageBackButton: '//*[@label="Profile Flow"]',
        pageTitle: 'TBD',
        pageSubtitle: '~booking_info_form_description',
        lastNameInput: '~booking_info_form_fields_lastName_input_input',
        lastNameValidationText: '~booking_info_form_fields_lastName_error_message',
        referenceInput: '~booking_info_form_fields_bookingReference_input_input',
        referenceValidationText: '~booking_info_form_fields_bookingReference_error_message',
        manageBookingButton: '~booking_info_form_submit_text',
        loginToVIewMyTripsButton: '~booking_info_form_login',
        noReferenceMessageText: '~booking_info_form_error_info_description',
}

const mainAndroid = {
        pageBackButton: '//*[@content-desc="Navigate up"]',
        pageTitle: '//*[@text="Manage My Booking Search"]',
        pageSubtitle: '//*[@resource-id="booking_info_form_description"]',
        lastNameInput: '//*[@resource-id="booking_info_form_fields_lastName_input_input"]',
        lastNameValidationText: '//*[@resource-id="booking_info_form_fields_lastName_error_message"]',
        referenceInput: '//*[@resource-id="booking_info_form_fields_bookingReference_input_input"]',
        referenceValidationText: '//*[@resource-id="booking_info_form_fields_bookingReference_error_message"]',
        manageBookingButton: '//*[@resource-id="booking_info_form_submit_text"]',
        loginToVIewMyTripsButton: '//*[@resource-id="booking_info_form_login"]',
        noReferenceMessageText: '//*[@resource-id="booking_info_form_error_info_description"]',

}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};