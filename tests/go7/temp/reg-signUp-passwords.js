const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageProfile = require("../../../pages/go7/page-go7-profile");
const pageSignUp = require("../../../pages/go7/page-go7-signUp");
const {randomFirstName, randomLastName} = require("../../../commands.conf");
const NWTools = require("nightwatch-tools");
let randomNumber = NWTools.randomString(4,'1234567890');
let firstName = randomFirstName();
let lastName = randomLastName();
let email = `ran.domali${randomNumber}@yopmail.com`

describe('Sign up validations', () => {

    it('Navigate to sign up page', async () => {
        await global.pause(3000)
        // Click on My GO7 button
        await global.clickOn(pageSearch.main.myGo7Button)
        // Click on "Login or sign up" button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
        // Click on sign up tab
        await global.clickOn(pageSignUp.main.signUpTab)
    });

    it('Empty passwords', async () => {
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // scroll down
        await global.scrollTo(200, 700, 200, 160)
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required')
    });

    it('Password validations', async () => {   // todo: need to complete this after new IDs created for the password validations
        // Add number
        await global.addValue(pageSignUp.main.passwordInput, '1')
        // Validate list
        // await global.validateElementText()
        // Add special character
        await global.addValue(pageSignUp.main.passwordInput, '$')
        // Validate list
        // await global.validateElementText()
        // Add uppercase character
        await global.addValue(pageSignUp.main.passwordInput, 'T')
        // Validate list
        // await global.validateElementText()
        // Add lowercase character
        await global.addValue(pageSignUp.main.passwordInput, 'g')
        // Validate list
        // await global.validateElementText()
        // Add 4 characters more (minimum 8 characters)
        await global.addValue(pageSignUp.main.passwordInput, '8888')
    });

    it('Confirm password', async () => {
        // Click on account information title to close the keyboard
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // Validate password validation message don't exist
        await global.validateElementNotDisplayed(pageSignUp.main.passwordValidationText)
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required')
        // Add none matching password in confirm password
        await global.addValue(pageSignUp.main.confirmPasswordInput, '1$Tg7777')
        // Click on account information title to close the keyboard
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Passwords must be same!')
        // Clear confirm password
        await global.clearValue(pageSignUp.main.confirmPasswordInput)
        // Add matching password in confirm password
        await global.addValue(pageSignUp.main.confirmPasswordInput, '1$Tg8888')
        // Click on account information title to close the keyboard
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // Validate confirm password validation message don't exist
        await global.validateElementNotDisplayed(pageSignUp.main.confirmPasswordValidationText)
    });

    it('Show/hide passwords', async () => {
        // Validate password characters are hidden
        await global.validateElementText(pageSignUp.main.passwordInput, '••••••••')
        // Click on password show/hide button
        await global.clickOn(pageSignUp.main.passwordEyeButton)
        // Validate password characters are shown
        await global.validateElementText(pageSignUp.main.passwordInput, '1$Tg8888')
        // Click on password show/hide button again
        await global.clickOn(pageSignUp.main.passwordEyeButton)
        // Validate password characters are hidden
        await global.validateElementText(pageSignUp.main.passwordInput, '••••••••')

        // Validate confirm password characters are hidden
        await global.validateElementText(pageSignUp.main.confirmPasswordInput, '••••••••')
        // Click on confirm password show/hide button
        await global.clickOn(pageSignUp.main.confirmPasswordEysButton)
        // Validate confirm password characters are shown
        await global.validateElementText(pageSignUp.main.confirmPasswordInput, '1$Tg8888')
        // Click on confirm password show/hide button again
        await global.clickOn(pageSignUp.main.confirmPasswordEysButton)
        // Validate confirm password characters are hidden
        await global.validateElementText(pageSignUp.main.confirmPasswordInput, '••••••••')
    });
});
