// todo: https://www.figma.com/design/RlBvF1X52R1eQ6bWhW0sKC/[GO7-IBE]-03.-Design-Handover?node-id=7428-68431&t=EQfNzing0Yybf1Po-0

const global = require("../../../commands.conf");
const pageLogin = require("../../../pages/go7/page-go7-login");
const pageProfile = require("../../../pages/go7/page-go7-profile");
const pageManageMyBooking = require("../../../pages/go7/page-go7-profile-manageMyBooking");
const pageSearch = require("../../../pages/go7/page-go7-search");

let userEmail = 'tomato1@yopmail.com';
let userPassword = 'Password1!';
let userLastName = 'One';

let fakeReference = '123-456'
let validReference = 'TBD'

describe('Manage my booking', () => {

    it('Navigate to login page', async () => {
        // Click on My GO7 button
        await global.clickOn(pageSearch.main.myGo7Button)
        // Click on "Login or sign up" button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
        // Click on login tab
        await global.clickOn(pageLogin.main.loginTab)
    });

    it('Login to user 1', async () => {
        // Add user 1 email
        await global.addValue(pageLogin.main.emailInput, userEmail)
        // Add correct password
        await global.addValue(pageLogin.main.passwordInput, userPassword)
        // Click on login title (just to close the keyboard)
        await global.clickOn(pageLogin.main.loginTitle)
        // Click on login button
        await global.clickOn(pageLogin.main.loginButton)
    });

    it('Fields validations', async () => {
        // Navigate to manage my booking
        await global.pause(2000)
        await global.clickOn(pageProfile.main.manageMyBookingSectionButton)
        // Click on manage booking button with no values in the fields
        await global.clickOn(pageManageMyBooking.main.manageBookingButton)
        // Validate last name mandatory message
        await global.validateElementText(pageManageMyBooking.main.lastNameValidationText, 'Last name required')
        // Validate booking reference mandatory message
        await global.validateElementText(pageManageMyBooking.main.referenceValidationText, 'Booking reference required')
        // Add only last name
        await global.addValue(pageManageMyBooking.main.lastNameInput, userLastName)
        // Click on manage booking button
        await global.clickOn(pageManageMyBooking.main.manageBookingButton)
        // Validate last name mandatory message don't display
        await global.validateElementNotDisplayed(pageManageMyBooking.main.lastNameValidationText)
        // Validate booking reference mandatory message
        await global.validateElementText(pageManageMyBooking.main.referenceValidationText, 'Booking reference required')
        // Clear last name
        await global.clearValue(pageManageMyBooking.main.lastNameInput)
        // Add only reference
        await global.addValue(pageManageMyBooking.main.referenceInput, fakeReference)
        // Click on manage booking button
        await global.clickOn(pageManageMyBooking.main.manageBookingButton)
        // Validate last name mandatory message
        await global.validateElementText(pageManageMyBooking.main.lastNameValidationText, 'Last name required')
        // Validate booking reference mandatory message don't display
        await global.validateElementNotDisplayed(pageManageMyBooking.main.referenceValidationText)
        // Clear reference
        await global.clearValue(pageManageMyBooking.main.referenceInput)
    });

    it('Search for none existing booking', async () => {
        // Add last name
        await global.addValue(pageManageMyBooking.main.lastNameInput, userLastName)
        // Add fake reference
        await global.addValue(pageManageMyBooking.main.referenceInput, fakeReference)
        // Click on manage my booking title (just to close the keyboard)
        await global.clickOn(pageManageMyBooking.main.pageTitle)
        // Click on manage booking button
        await global.clickOn(pageManageMyBooking.main.manageBookingButton)
        // Validate no reference message
        await global.validateElementText(pageManageMyBooking.main.noReferenceMessageText, 'We are unable to find this booking reference. Please validate your entry and try again')
        // Clear last name
        await global.clearValue(pageManageMyBooking.main.lastNameInput)
        // Clear reference
        await global.clearValue(pageManageMyBooking.main.referenceInput)
    });

    it('Search for existing booking', async () => {
        // Add valid last name
        await global.addValue(pageManageMyBooking.main.lastNameInput, userLastName)
        // Add valid reference
        await global.addValue(pageManageMyBooking.main.referenceInput, validReference)
        // Click on manage my booking title (just to close the keyboard)
        await global.clickOn(pageManageMyBooking.main.pageTitle)
        // Click on manage booking button
        await global.clickOn(pageManageMyBooking.main.manageBookingButton)
        // Validate booking reference display
            // TBD //
        await global.pause(40000000)
    });

});