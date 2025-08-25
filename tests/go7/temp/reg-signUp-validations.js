const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageProfile = require("../../../pages/go7/page-go7-profile");
const pageSignUp = require("../../../pages/go7/page-go7-signUp");
const NWTools = require("nightwatch-tools");
let randomNumber = NWTools.randomString(4,'1234567890');
let firstName = global.randomFirstName();
let lastName = global.randomLastName();
let email = `ran.domali${randomNumber}@yopmail.com`;
let address = global.randomAddress();

describe('Sign up validations', () => {

    it('Navigate to sign up page', async () => {
        // Click on My GO7 button
        await global.clickOn(pageSearch.main.myGo7Button)
        // Click on "Login or sign up" button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
        // Click on sign up tab
        await global.clickOn(pageSignUp.main.signUpTab)
    });

    it('Validate all', async () => {
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // Validate title validation text
        await global.validateElementText(pageSignUp.main.titleValidationText, 'Title name is required ')
        // Validate first name validation text
        await global.validateElementText(pageSignUp.main.firstNameValidationText, 'First name is required ')
        // Validate last name validation message
        await global.validateElementText(pageSignUp.main.lastNameValidationText, 'Last name is required ')
        // Validate DOB validation message
        await global.validateElementText(pageSignUp.main.dateOfBirthValidationText, 'D.O.B. is Required ')

        // scroll down
        await global.scrollTo(200, 700, 200, 160)

        // Validate address validation message
        await global.validateElementText(pageSignUp.main.addressValidationText, 'Address is required ')
        // Validate phone number validation message
        await global.validateElementText(pageSignUp.main.phoneValidationText, 'Phone number is wrong ')
        // Validate email validation message
        await global.validateElementText(pageSignUp.main.emailValidationText, 'Email is Required ')
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required ')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required ')
    });

    it('Validate all but title', async () => {
        // // scroll up
        await global.scrollTo(200, 160, 200, 700)
        // Click on title
        await global.clickOn(pageSignUp.main.titleButton)
        // Select title
        await global.clickOn(pageSignUp.main.title_Mr)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)

        // Validate title validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.titleValidationText)
        // Validate first name validation text
        await global.validateElementText(pageSignUp.main.firstNameValidationText, 'First name is required ')
        // Validate last name validation message
        await global.validateElementText(pageSignUp.main.lastNameValidationText, 'Last name is required ')
        // Validate DOB validation message
        await global.validateElementText(pageSignUp.main.dateOfBirthValidationText, 'D.O.B. is Required ')

        // scroll down
        await global.scrollTo(200, 700, 200, 160)

        // Validate address validation message
        await global.validateElementText(pageSignUp.main.addressValidationText, 'Address is required ')
        // Validate phone number validation message
        await global.validateElementText(pageSignUp.main.phoneValidationText, 'Phone number is wrong ')
        // Validate email validation message
        await global.validateElementText(pageSignUp.main.emailValidationText, 'Email is Required ')
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required ')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required ')
    });

    it('Validate first name 1 character validation', async () => {
        // scroll up
        await global.scrollTo(200, 160, 200, 700)
        // Add 1 character in first name
        await global.addValue(pageSignUp.main.firstNameInput, 'R')
        // Click on Personal information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.personalInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // Validate first name 1 character validation text
        await global.validateElementText(pageSignUp.main.firstNameValidationText, 'Must be between 2 and 50 characters ')
        // Remove the 1 character from first name
        await global.clearValue(pageSignUp.main.firstNameInput)
    });

    it('Validate last name 1 character validation', async () => {
        // Add 1 character in last name
        await global.addValue(pageSignUp.main.lastNameInput, 'R')
        // Click on Personal information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.personalInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // Validate last name 1 character validation text
        await global.validateElementText(pageSignUp.main.lastNameValidationText, 'Must be between 2 and 50 characters ')
        // Remove the 1 character from last name
        await global.clearValue(pageSignUp.main.lastNameInput)
        // Click on Personal information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.personalInformationTitle)
    });

    it('Validate all but title and first name', async () => {
        // Add first name
        await global.addValue(pageSignUp.main.firstNameInput, firstName)
        // Click on Personal information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.personalInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // Validate title validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.titleValidationText)
        // Validate first name validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.firstNameValidationText)
        // Validate last name validation message
        await global.validateElementText(pageSignUp.main.lastNameValidationText, 'Last name is required ')
        // Validate DOB validation message
        await global.validateElementText(pageSignUp.main.dateOfBirthValidationText, 'D.O.B. is Required ')

        // scroll down
        await global.scrollTo(200, 700, 200, 160)

        // Validate address validation message
        await global.validateElementText(pageSignUp.main.addressValidationText, 'Address is required ')
        // Validate phone number validation message
        await global.validateElementText(pageSignUp.main.phoneValidationText, 'Phone number is wrong ')
        // Validate email validation message
        await global.validateElementText(pageSignUp.main.emailValidationText, 'Email is Required ')
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required ')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required ')
    });

    it('Validate all but title, first name and last name', async () => {
        // scroll up
        await global.scrollTo(200, 160, 200, 700)
        // Add last name
        await global.addValue(pageSignUp.main.lastNameInput, lastName)
        // Click on Personal information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.personalInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)

        // Validate title validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.titleValidationText)
        // Validate first name validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.firstNameValidationText)
        // Validate last name validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.lastNameValidationText)
        // Validate DOB validation message
        await global.validateElementText(pageSignUp.main.dateOfBirthValidationText, 'D.O.B. is Required ')

        // scroll down
        await global.scrollTo(200, 700, 200, 160)

        // Validate address validation message
        await global.validateElementText(pageSignUp.main.addressValidationText, 'Address is required ')
        // Validate phone number validation message
        await global.validateElementText(pageSignUp.main.phoneValidationText, 'Phone number is wrong ')
        // Validate email validation message
        await global.validateElementText(pageSignUp.main.emailValidationText, 'Email is Required ')
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required ')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required ')
    });

    it('Validate all but title, first name, last name and date of birth', async () => {
        // scroll up
        await global.pause(2000)
        await global.scrollTo(200, 160, 200, 700)
        await global.pause(2000)
        // add date of birth
        await global.signUp_selectBirthDate()
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)

        // Validate title validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.titleValidationText)
        // Validate first name validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.firstNameValidationText)
        // Validate last name validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.lastNameValidationText)
        // Validate DOB validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.dateOfBirthValidationText)

        // scroll down
        await global.scrollTo(200, 700, 200, 160)

        // Validate address validation message
        await global.validateElementText(pageSignUp.main.addressValidationText, 'Address is required ')
        // Validate phone number validation message
        await global.validateElementText(pageSignUp.main.phoneValidationText, 'Phone number is wrong ')
        // Validate email validation message
        await global.validateElementText(pageSignUp.main.emailValidationText, 'Email is Required ')
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required ')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required ')
    });

    it('Validate all but title, first name, last name, date of birth and address', async () => {
        // Add address
        await global.addValue(pageSignUp.main.addressInput, address)
        // Click on Contact information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.contactInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)

        // scroll up
        await global.scrollTo(200, 160, 200, 700)

        // Validate title validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.titleValidationText)
        // Validate first name validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.firstNameValidationText)
        // Validate last name validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.lastNameValidationText)
        // Validate DOB validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.dateOfBirthValidationText)

        // scroll down
        await global.scrollTo(200, 700, 200, 160)

        // Validate address validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.addressValidationText)
        // Validate phone number validation message
        await global.validateElementText(pageSignUp.main.phoneValidationText, 'Phone number is wrong ')
        // Validate email validation message
        await global.validateElementText(pageSignUp.main.emailValidationText, 'Email is Required ')
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required ')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required ')
    });

    it('Validate all but title, first name, last name, date of birth address and phone', async () => {
        // Add phone
        await global.signUp_addPhoneNumber()
        // Click on contact information title to close the keyboard
        await global.clickOn(pageSignUp.main.contactInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)

        // scroll up
        await global.scrollTo(200, 160, 200, 700)

        // Validate title validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.titleValidationText)
        // Validate first name validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.firstNameValidationText)
        // Validate last name validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.lastNameValidationText)
        // Validate DOB validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.dateOfBirthValidationText)

        // scroll down
        await global.scrollTo(200, 700, 200, 160)

        // Validate address validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.addressValidationText)
        // Validate phone number validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.phoneValidationText)
        // Validate email validation message
        await global.validateElementText(pageSignUp.main.emailValidationText, 'Email is Required ')
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required ')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required ')
    });

    it('Validate invalid email address validation', async () => {
        // Add invalid email address
        await global.addValue(pageSignUp.main.emailInput, 'invalid')
        // Click on account information title to close the keyboard
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)
        // Validate invalid email validation text
        await global.validateElementText(pageSignUp.main.emailValidationText, 'Please enter valid email ')
        // Clear invalid email
        await global.clearValue(pageSignUp.main.emailInput)
    });

    it('Validate all but title, first name, last name, date of birth address phone and email address', async () => {
        // Add email address
        await global.signUp_addEmail()
        // Click on account information title to close the keyboard
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)

        // scroll up
        await global.scrollTo(200, 160, 200, 700)

        // Validate title validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.titleValidationText)
        // Validate first name validation text don't display
        await global.validateElementNotDisplayed(pageSignUp.main.firstNameValidationText)
        // Validate last name validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.lastNameValidationText)
        // Validate DOB validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.dateOfBirthValidationText)

        // scroll down
        await global.scrollTo(200, 700, 200, 160)

        // Validate address validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.addressValidationText)
        // Validate phone number validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.phoneValidationText)
        // Validate email validation message don't display
        await global.validateElementNotDisplayed(pageSignUp.main.emailValidationText)
        // Validate password validation message
        await global.validateElementText(pageSignUp.main.passwordValidationText, 'Required ')
        // Validate confirm password validation message
        await global.validateElementText(pageSignUp.main.confirmPasswordValidationText, 'Required ')

        // Full passwords validations is tested separately //
    });
});
