const global = require("../../../commands.conf");
const pageLogin = require("../../../pages/go7/page-go7-login");
const pageProfile = require("../../../pages/go7/page-go7-profile");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageForgotPassword = require("../../../pages/go7/page-go7-forgotPassword");
const data = require("../../../data");
const pageCreateNewPassword = require("../../../pages/go7/page-go7-createNewPassword");
const {driver} = require("@wdio/globals");
const pageYopmail = require("../../../pages/ThirdParty/page-yopmail");
const {clickOn, getRecoveryCode} = require("../../../commands.conf");

// let userEmail = 'marlon20@yopmail.com';
let userEmail = 'lemon1@mailinator.com';
let newPassword = global.randomPassword();

describe('Forgot password validations', () => {

    it('Navigate to login page', async () => {
        // Click on My GO7 button
        await global.clickOn(pageSearch.main.myGo7Button)
        // Click on "Login or sign up" button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
        // Click on login tab
        await global.clickOn(pageLogin.main.loginTab)
    });

    it('Forgot password validations', async () => {
        // Click on forgot password
        await global.clickOn(pageLogin.main.forgotPasswordLink)
        // Validate forgot password text
        await global.validateElementText(pageForgotPassword.main.forgotPasswordText, 'Please enter your e-mail, we will send you a link to reset your password')
        // Click on send link button
        await global.clickOn(pageForgotPassword.main.forgotPasswordSendLinkButton)
        // Check all invalid emails
        // await global.forgotPassword_validateEmailFormat()
    });

    it('Use existing email', async () => {
        // Add valid email
        await global.addValue(pageForgotPassword.main.forgotPasswordEmailInput, userEmail)
        // Validate message don't exist
        await global.validateElementNotDisplayed(pageForgotPassword.main.forgotPasswordEmailValidationText)
        // Click on forgot Password Text (Just to close the keyboard)
        await global.clickOn(pageForgotPassword.main.forgotPasswordText)
        // Click on send link button
        await global.clickOn(pageForgotPassword.main.forgotPasswordSendLinkButton)      // todo: need to remove the keyboard before click
        // Validate check your email message
        await global.validateElementText(pageForgotPassword.main.checkYourEmailTitle, 'Check your email')
    });

    it('Open mailbox', async () => {
        // Open mailinator in Safari
        await global.openMailinatorInSafari()
        // Add mailbox
        await global.addValue('//*[contains(@name, "Enter public inbox")]', userEmail);
        // Click on arrow button
        await global.clickOn('//*[contains(@name, "Search for inbox")]');
        // Click on the latest message
        await global.clickOn('//*[contains(@name, "Polar")]')
        await global.pause(1000)
        // Extract code from message
        let code = await global.getRecoveryCode()
        console.log(`Reset code is: ${code}`)

        // Switch back to GO7 app
        await driver.activateApp(data.appIdentifier.go7_iOS)
        // Add the code in reset code field
        await global.addValue(pageForgotPassword.main.resetCodeInput, code);
        // Add new password
        await global.addValue(pageForgotPassword.main.newPasswordInput, 'Password2!');
        // CLick on new password label (Just to close the keyboard)
        await global.clickOn(pageForgotPassword.main.resetCodeSubtitle)
        // Add confirm password
        await global.addValue(pageForgotPassword.main.confirmPasswordInput, 'Password2!');
        // Click on Reset password page
        // await global.clickOn(pageForgotPassword.main.resetPasswordButton)
        await global.pause(50000000)
    });

    it('Resent email', async () => {
        // Validate 2 email sent
        // Validate the first one will not be valid only the second
    });

    it('Validate email message and use link', async () => {
        // Validate all text in the message
        // Click on the reset password link
    });

    it('Validate create new password page', async () => {
        //
    });

    it('Password validations', async () => {   // todo: need to complete this after new IDs created for the password validations
        // Add number
        await global.addValue(pageCreateNewPassword.main.passwordInput, '1')
        // Validate list
        // await global.validateElementText()
        // Add special character
        await global.addValue(pageCreateNewPassword.main.passwordInput, '$')
        // Validate list
        // await global.validateElementText()
        // Add uppercase character
        await global.addValue(pageCreateNewPassword.main.passwordInput, 'T')
        // Validate list
        // await global.validateElementText()
        // Add lowercase character
        await global.addValue(pageCreateNewPassword.main.passwordInput, 'g')
        // Validate list
        // await global.validateElementText()
        // Add 4 characters more (minimum 8 characters)
        await global.addValue(pageCreateNewPassword.main.passwordInput, '8888')
    });

    it('Confirm password validation', async () => {         //todo: this page is still not ready
        // Add none matching password in confirm password
        await global.addValue(pageCreateNewPassword.main.confirmPasswordInput, '1$Tg7777')
        // Click on create new password title to close the keyboard
        await global.clickOn(pageCreateNewPassword.main.createNewPasswordTitle)
        // Click on reset password button
        await global.clickOn(pageCreateNewPassword.main.resetPasswordButton)
        // Validate confirm password validation message
        await global.validateElementText(pageCreateNewPassword.main.confirmPasswordValidationText, 'Passwords must be same!')
        // Clear confirm password
        await global.clearValue(pageCreateNewPassword.main.confirmPasswordInput)
        // Add matching password in confirm password
        await global.addValue(pageCreateNewPassword.main.confirmPasswordInput, '1$Tg8888')
        // Click on account information title to close the keyboard
        await global.clickOn(pageCreateNewPassword.main.accountInformationTitle)
        // Click on reset password button
        await global.clickOn(pageCreateNewPassword.main.resetPasswordButton)
        // Validate confirm password validation message don't exist
        await global.validateElementNotDisplayed(pageCreateNewPassword.main.confirmPasswordValidationText)
    });

    it('Reset password', async () => {         //todo: this page is still not ready
        // Clear password
        await global.clearValue(pageCreateNewPassword.main.passwordInput)
        // Clear confirm password
        await global.clearValue(pageCreateNewPassword.main.confirmPasswordInput)

        // Add new valid random password in password
        await global.addValue(pageCreateNewPassword.main.passwordInput, newPassword)
        // Add the same password in confirm password
        await global.addValue(pageCreateNewPassword.main.confirmPasswordInput, newPassword)

        // Click on account information title to close the keyboard
        await global.clickOn(pageCreateNewPassword.main.accountInformationTitle)
        // Click on reset password button
        await global.clickOn(pageCreateNewPassword.main.resetPasswordButton)
    });

    it('Validate success message', async () => {         //todo: this page is still not ready


    });

    it('Login with the new password', async () => {


    });


});
