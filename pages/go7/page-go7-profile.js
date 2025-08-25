const {driver} = require("@wdio/globals");

const mainIOS = {
        loginOrSignUpTitle: '~profile_info_title',
        usernameInitials: '~profile_info_passenger_tag_avatar_name_shortcut',
        profileIcon: '~auth_action_toggle_button',
        showProfileTitle: '~profile_info_subtitle',
        manageMyBookingSectionButton: '~profile_info_manage_booking_title',
        bookingHistorySectionButton: '~profile_info_booking_history_title',
        logoutButton: '-ios class chain:**/XCUIElementTypeStaticText[`label == "Log out"`]',
}

const mainAndroid = {
        loginOrSignUpTitle: '//*[@resource-id="profile_info_title"]',
        usernameInitials: '//*[@resource-id="profile_info_passenger_tag_avatar_name_shortcut"]',
        profileIcon: '//*[@resource-id="auth_action_toggle_button"]',
        showProfileTitle: '//*[@resource-id="profile_info_subtitle"]',
        manageMyBookingSectionButton: '//*[@resource-id="profile_info_manage_booking_title"]',
        bookingHistorySectionButton: '//*[@resource-id="profile_info_booking_history_title"]',
        logoutButton: '//*[@resource-id="profile_info_log_out_title"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};