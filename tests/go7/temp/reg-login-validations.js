const global = require("../../../commands.conf");
const pageLogin = require("../../../pages/go7/page-go7-login");
const pageProfile = require("../../../pages/go7/page-go7-profile");
const pageSearch = require("../../../pages/go7/page-go7-search");
const data = require("../../../data");

let userEmail = 'martin1@yopmail.com';

describe('Login validations', () => {

    it('Navigate to login page', async () => {
        // Click on My GO7 button
        await global.clickOn(pageSearch.main.myGo7Button)
        // Click on "Login or sign up" button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
        // Click on login tab
        await global.clickOn(pageLogin.main.loginTab)
    });

    it('Email and password validation messages', async () => {
        // Click on login button
        await global.clickOn(pageLogin.main.loginButton)
        // Validate email validation message
        await global.validateElementText(pageLogin.main.emailValidationText, 'Email is Required ')
        // Validate password validation message
        await global.validateElementText(pageLogin.main.passwordValidationText, 'Required ')
    });

    it('Validate all invalid emails', async () => {
        // Check all invalid emails
        await global.login_validateEmailFormat()
        // Add valid email
        await global.addValue(pageLogin.main.emailInput, userEmail)
        // Validate message don't exist
        await global.validateElementNotDisplayed(pageLogin.main.emailValidationText)
    });

    it('Password validation', async () => {
        // Add wrong password
        await global.addValue(pageLogin.main.passwordInput, 'FakePassword1!')
        // Click on login title (just to close the keyboard)
        await global.clickOn(pageLogin.main.loginTitle)
        // Click on login button
        await global.clickOn(pageLogin.main.loginButton)
        // Validate error message
        await global.validateElementText(pageLogin.main.loginFailureMessage, 'Incorrect user name or password for customer')
    });

    it('Continue as guest options', async () => {
        // Click on continue as guest
        await global.clickOn(pageLogin.main.continueAsGuestButton)
        // Validate back to profile page by click on login or sign up button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
    });


    // Check "Remember me" option once done by DEV

});
