const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageSignUp = require("../../../pages/go7/page-go7-signUp");
const pageProfile = require("../../../pages/go7/page-go7-profile");
const pageLogin = require("../../../pages/go7/page-go7-login");
const NWTools = require("nightwatch-tools");
const fs = require("fs");
const {driver} = require("@wdio/globals");
const pageFrame = require("../../../pages/go7/page-go7-frame");
let randomNumber = NWTools.randomString(5,'1234567890');
let today = new Date();

let firstName = global.randomFirstName();
let lastName = global.randomLastName();
let nameInitials = `${firstName.slice(0,1)}${lastName.slice(0,1)}`;
let email = `ran.domali${randomNumber}@yopmail.com`
let phoneNumber = '212345678';
let address = global.randomAddress();
let country = 'Australia';
let password = 'Password1!';

describe('Sign up', () => {

    before('Validate app is ready',async () => {
        await global.isAppReady()
    });

    it('Navigate to sign up page', async () => {
        // Click on My GO7 button
        await global.clickOn(pageSearch.main.myGo7Button)
        // Click on "Login or sign up" button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
        // Click on sign up tab
        await global.clickOn(pageSignUp.main.signUpTab)
    });

    it('Add personal information', async () => {
        // Add title
        await global.signUp_addTitle()
        await global.pause(1000)
        // Add first name
        await global.addValue(pageSignUp.main.firstNameInput, firstName)
        // Add last name
        await global.addValue(pageSignUp.main.lastNameInput, lastName)
        // Click on Personal information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.personalInformationTitle)
        // // Add date of birth
        await global.signUp_selectBirthDate()
        // Add age
        // await global.addValue(pagePaxInfo.main.adult1_age, 52)
    });

    it('Add contact information', async () => {
        await global.pause(1000)
        // Scroll down
            if (driver.capabilities.platformName === "iOS") {
                // iOS scroll
                await global.scrollTo(200, 700, 200, 230)
            }
            else {
                // Android scroll
                await global.scrollTo(200, 700, 200, 0)
                await global.scrollTo(200, 700, 200, 0)
            }

        // Add address
        await global.addValue(pageSignUp.main.addressInput, address)
        // Click on Contact information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Click on phone number country code
        await global.pause(2000)
        await global.clickOn(pageSignUp.main.phoneCountryCodeButton)
        // Search for country
        await global.clickOn(pageSignUp.main.phoneCountryCodeSearchInput)
        await global.addValue(pageSignUp.main.phoneCountryCodeSearchInput, country)
        // Click on results title to close the keyboard
        await global.clickOn(pageSignUp.main.phoneCountryCodeResultsTitle)
        // Select the country
        await global.clickOn(pageSignUp.main.phoneCountryCodeFirstResult)
        // Add phone number (Need to click on it first due to android issue)
        await global.clickOn(pageSignUp.main.phoneInput)
        await global.addValue(pageSignUp.main.phoneInput, phoneNumber)
        // Click on Account information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.accountInformationTitle)
    });

    it('Add account information', async () => {
        // Add email
        await global.addValue(pageSignUp.main.emailInput, email);
        // Click on Account information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Add password
        await global.addValue(pageSignUp.main.passwordInput, password)
        // CLick on show password
        await global.clickOn(pageSignUp.main.passwordEyeButton)
        // Click on Account information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Add confirm password
        await global.addValue(pageSignUp.main.confirmPasswordInput, password)
        // CLick on show password
        await global.clickOn(pageSignUp.main.confirmPasswordEysButton)
        // Click on Account information title (Just to close the keyboard)
        await global.clickOn(pageSignUp.main.accountInformationTitle)
        // Click on join Go7
        await global.clickOn(pageSignUp.main.joinGo7Button)

        // Validate name initials after automatic login
        await global.pause(1000)
        await global.validateElementText(pageProfile.main.usernameInitials, nameInitials)
        // Validate name after automatic login (replacing the login or signup title)
        await global.validateElementText(pageProfile.main.loginOrSignUpTitle, `${firstName} ${lastName}`)
        // Click on sign out button
        await global.clickOn(pageProfile.main.logoutButton)
        await global.pause(1000)
    });

    it('Login with the new account', async () => {
        // Click on Login or sign up button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
        // Switch login tab
        await global.clickOn(pageLogin.main.loginTab)
        // Login with the new account
        await global.login(email, password)
        // Validate name initials after automatic
        await global.pause(1000)
        await global.validateElementText(pageProfile.main.usernameInitials, nameInitials)
        // Validate name after automatic login (replacing the login or signup title)
        await global.validateElementText(pageProfile.main.loginOrSignUpTitle, `${firstName} ${lastName}`)
    });

    it('Add new user to "GO7_users" file', async () => {
        fs.appendFile(`GO7_users.txt`, `\n${today}: User: ${email}, Pass: ${password}`, () => {
            console.log(`User ${email} added to GO7_users.txt successfully!`);
        });
    });
});