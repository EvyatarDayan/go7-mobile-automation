const {driver} = require("@wdio/globals");

const mainIOS = {
        forgotPasswordTitle: '~auth_modal_forgot_password_form_modal_header_text',
        forgotPasswordText: '~auth_modal_forgot_password_form_subtitle',
        forgotPasswordEmailInputTitle: '~auth_modal_forgot_password_form_form_builder_email_input_label_text',
        forgotPasswordEmailInput: '~auth_modal_forgot_password_form_form_builder_email_input_input',
        forgotPasswordEmailValidationText: '~auth_modal_forgot_password_form_form_builder_email_error_message',
        forgotPasswordSendLinkButton: '~auth_modal_forgot_password_form_form_submit_text',
        forgotPasswordCloseButton: '~auth_modal_forgot_password_form_modal_close_container',
        // Check your email
        checkYourEmailTitle: '~auth_modal_forgot_password_form_modal_header_text',
        resetCodeMainTitle: '~auth_modal_forgot_password_form_confirm_title',
        resetCodeSubtitle: '~auth_modal_forgot_password_form_confirm_subtitle',
        resetEmail: '~auth_modal_forgot_password_form_confirm_email',
        resetCodeInput: '-ios predicate string:value == "e.g. 7XHZCwVz"',
        notReceivedText: '~auth_modal_forgot_password_form_resend_text',
        resentCodeLink: '~auth_modal_forgot_password_form_resend_button',
        newPasswordInput: '(//XCUIElementTypeOther[@name="Enter password"])[2]/XCUIElementTypeSecureTextField',
        newPasswordEyeButton: '-ios class chain:**/XCUIElementTypeOther[`label == "New password required asterisk Enter password"`][2]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther',
        confirmPasswordInput: '//XCUIElementTypeOther[@name="Re-enter password"]/XCUIElementTypeSecureTextField',
        confirmPasswordEyeButton: '-ios class chain:**/XCUIElementTypeOther[`label == "Confirm password required asterisk Re-enter password"`][5]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther',
        resetPasswordButton: '~auth_modal_forgot_password_form_form_submit_text',
}

const mainAndroid = {
        forgotPasswordTitle: '//*[@name="auth_modal_forgot_password_form_modal_header_text"]',
        forgotPasswordText: '//*[@resource-id="auth_modal_forgot_password_form_subtitle"]',
        forgotPasswordEmailInputTitle: '//*[@resource-id="auth_modal_forgot_password_form_form_builder_email_input_label_text"]',
        forgotPasswordEmailInput: '//*[@resource-id="auth_modal_forgot_password_form_form_builder_email_input_input"]',
        forgotPasswordEmailValidationText: '//*[@resource-id="auth_modal_forgot_password_form_form_builder_email_error_message"]',
        forgotPasswordSendLinkButton: '//*[@resource-id="auth_modal_forgot_password_form_form_submit_text"]',
        forgotPasswordCloseButton: '//*[@name="auth_modal_forgot_password_form_modal_close_container"]',
        // Check your email
        checkYourEmailTitle: '//*[@resource-id="auth_modal_forgot_password_form_modal_header_text"]',
        resetCodeMainTitle: '//*[@resource-id="auth_modal_forgot_password_form_confirm_title"]',
        resetCodeSubtitle: '//*[@resource-id="auth_modal_forgot_password_form_confirm_subtitle"]',
        resetEmail: '//*[@resource-id="auth_modal_forgot_password_form_confirm_email"]',
        resetCodeInput: '//*[@resource-id="TBD"]',
        notReceivedText: '//*[@resource-id="auth_modal_forgot_password_form_resend_text"]',
        resentCodeLink: '//*[@resource-id="auth_modal_forgot_password_form_resend_button"]',
        newPasswordInput: '//*[@resource-id="TBD"]',
        newPasswordEyeButton: '//*[@resource-id="TBD"]',
        confirmPasswordInput: '//*[@resource-id="TBD"]',
        confirmPasswordEyeButton: '//*[@resource-id="TBD"]',
        resetPasswordButton: '//*[@resource-id="auth_modal_forgot_password_form_form_submit_text"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};