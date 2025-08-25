const {driver} = require("@wdio/globals");

const mainIOS = {
        loginMainButton: '~auth_action_toggle_button',
        signUpTab: '~auth_modal_modal_tabs_list_tab_sign_up_title',
        loginTab: '~auth_modal_modal_tabs_list_tab_login_title',
        logOutButton: '-ios class chain:**/XCUIElementTypeStaticText[`label == "Log out"`]',
        avatarText: '~auth_passenger_tag_avatar_name_shortcut',
}

const mainAndroid = {
        loginMainButton: '//*[@resource-id="auth_container"]',
        signUpTab: '//*[@resource-id="auth_modal_tabs_list_tab_sign_up_title"]',
        loginTab: '//*[@resource-id="auth_modal_tabs_list_tab_login_title"]',
        logOutButton: '//*[@resource-id="auth_action_signout_button"]',
        avatarText: '//*[@resource-id="auth_passenger_tag_avatar_name_shortcut"]',

}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};