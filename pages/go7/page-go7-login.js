const {driver} = require("@wdio/globals");

const mainIOS = {
        loginTab: '~auth_modal_modal_tabs_list_tab_login_title',
        loginTitle: '~auth_modal_modal_tabs_content_login_form_title',
        emailInput: '~auth_modal_modal_tabs_content_login_form_formbuilder_email_input_input',
        emailValidationText: '~auth_modal_modal_tabs_content_login_form_formbuilder_email_error_message',
        passwordInput: '~auth_modal_modal_tabs_content_login_form_formbuilder_password_field_text_input_input',
        passwordEysButton: '~auth_modal_modal_tabs_content_login_form_formbuilder_password_field_text_input_icons_rightIcon',
        passwordValidationText: '~auth_modal_modal_tabs_content_login_form_formbuilder_password_field_error_message',
        rememberMeCheckbox: '~auth_modal_modal_tabs_content_login_form_checkbox_checkbox',
        forgotPasswordLink: '~auth_modal_modal_tabs_content_login_form_forget_password',
        loginButton: '~auth_modal_modal_tabs_content_login_form_form_buttons_submit_button_text',
        loginFailureMessage: '~auth_modal_modal_tabs_content_login_form_info_box_description',
        welcomeBackMessage: '//*[contains(@label, "Welcome back")]',
        continueAsGuestButton: '~auth_modal_modal_tabs_content_login_form_form_buttons_cancel_button_text',
}

const mainAndroid = {
        loginTab: '//*[@resource-id="auth_modal_modal_tabs_list_tab_login_title"]',
        loginTitle: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_title"]',
        emailInput: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_formbuilder_email_input_input"]',
        emailValidationText: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_formbuilder_email_error_message"]',
        passwordInput: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_formbuilder_password_field_text_input_input"]',
        passwordEysButton: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_formbuilder_password_field_text_input_icons_rightIcon"]',
        passwordValidationText: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_formbuilder_password_field_error_message"]',
        rememberMeCheckbox: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_checkbox_checkbox"]',
        forgotPasswordLink: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_forget_password"]',
        loginButton: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_form_buttons_submit_button_text"]',
        loginFailureMessage: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_info_box_description"]',
        welcomeBackMessage: '//*[contains(@content-desc, "Welcome back")]',
        continueAsGuestButton: '//*[@resource-id="auth_modal_modal_tabs_content_login_form_form_buttons_cancel_button_text"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};