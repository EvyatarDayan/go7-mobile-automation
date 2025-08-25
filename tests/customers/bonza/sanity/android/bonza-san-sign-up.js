const global = require("../../../../../commands.conf");
const NWTools = require("nightwatch-tools");
const randomString = NWTools.randomString(4,'abcdefghijklmnopqrstuvwxyz');
const randomNumber = NWTools.randomString(4,'1234567890');
const clc = require('cli-color');
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaSignInPage = require ('../../../../../pages/bonza/page-bonza-sign-in');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');
const bonzaSignUpPage = require ('../../../../../pages/bonza/page-bonza-sign-up');
const bonzaProfilePage = require("../../../../../pages/bonza/page-bonza-profile");
const {randomFirstName, randomLastName, randomMiddleName, clearAllPopups} = require("../../../../../commands.conf");
const fs = require("fs");
let currentTime = new Date().toLocaleString();

let phoneNumber = '288884444';
let street = '45 Macleay st. Pots point';
let country = 'Australia';
let city = 'Sydney';
let postcode = '2055';
let emailAddress = `martin.${randomString}@yopmail.com`;
let password = `Password${randomNumber}!`;

describe('Sign up', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups();
    });

    it('Navigate to sign up',async ()=> {
        // Open the menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on Login
        await global.clickOn(bonzaSideMenuPage.main.login)
        // Click on join now
        await global.clickOn(bonzaSignInPage.main.joinNowButton)
    });

    it('Add new user details',async ()=> {
        // Click on title list
        await global.clickOn(bonzaSignUpPage.main.titleList)
        // Select Mrs
        await global.clickOn(bonzaSignUpPage.main.title_Mrs)
        // Update first name
        await global.addValue(bonzaSignUpPage.main.firstNameInput, `${await randomFirstName()}`)
        // Update middle name
        await global.addValue(bonzaSignUpPage.main.middleNameInput, `${await randomMiddleName()}`)
        // Update last name
        await global.addValue(bonzaSignUpPage.main.lastNameInput, `${await randomLastName()}`)
        // Click on date of birth
        await global.clickOn(bonzaSignUpPage.main.dateOfBirthList)
        // Click on confirm
        await global.clickOn(bonzaSignUpPage.main.dateOfBirth_confirmButton)
        // Swipe up
        await global.pause(1000)
        await global.scrollTo(654, 2000, 680, 1030)
        await global.pause(2000)
        // Click on phone number country list
        await global.clickOn(bonzaSignUpPage.main.phoneNumberCountryList)
        // Search for australia
        await global.addValue(bonzaSignUpPage.main.phoneNumberCountrySearch, country)
        // Select Australia
        await global.clickOn(bonzaSignUpPage.main.phoneNumberCountry_Australia)
        // Clear phone number field
        await global.clearValue(bonzaSignUpPage.main.phoneNumberInput)
        // Add valid phone number
        await global.addValue(bonzaSignUpPage.main.phoneNumberInput, phoneNumber)
        // Clear street
        await global.clearValue(bonzaSignUpPage.main.streetInput)
        // Add new street
        await global.addValue(bonzaSignUpPage.main.streetInput, street)
        // Clear city feald
        await global.clearValue(bonzaSignUpPage.main.cityInput)
        // Add city
        await global.addValue(bonzaSignUpPage.main.cityInput, city)
        // Click on country
        await global.clickOn(bonzaSignUpPage.main.countryList)
        // Select country
        await global.clickOn(bonzaSignUpPage.main.country_Australia)
        // Click on district (state)
        await global.clickOn(bonzaSignUpPage.main.districtList)
        // Select district
        await global.clickOn(bonzaSignUpPage.main.district_NewSouthWales)
        // Clear postcode
        // await global.clearValue(bonzaSignUpPage.main.postcodeInput)
        // Add new postcode
        await global.addValue(bonzaSignUpPage.main.postCodeInput, postcode)
        // Add email address
        await global.addValue(bonzaSignUpPage.main.emailAddressInput, emailAddress)
        // Add password
        await global.addValue(bonzaSignUpPage.main.passwordInput, password)
        // Add confirm password
        await global.addValue(bonzaSignUpPage.main.confirmPasswordInput, password)
        // Mark privacy checkbox
        await global.clickOn(bonzaSignUpPage.main.privacyPolicyCheckbox)
        // Click on join the bonza family button
        await global.clickOn(bonzaSignUpPage.main.joinTheBonzaFamilyButton)
        // Click on close in success message
        await global.clickOn('~button__click')
        // Print email address to the console
        console.log(`New user email address is: ${emailAddress}`)
    });

    it ('Login with the new user',async ()=> {
        // Add user email address
        await global.addValue(bonzaSignInPage.main.emailInput, emailAddress)
        // Add password
        await global.addValue(bonzaSignInPage.main.passwordInput, password)
        // Click on sign in button
        await global.clickOn(bonzaSignInPage.main.signInButton)
        // Scroll up in profile screen
        await global.pause(3000)
        await global.scrollTo(500, 2000, 500, 500)
        // Validate the user
        await global.validateElementText(bonzaProfilePage.main.usernameInput, emailAddress)
        // Add user to PRD_users.txt
        fs.appendFile(`PRD_users.txt`, `${currentTime}:\nUser: ${emailAddress}\nPass: ${password}\n-----------------------------\n`, () => {
            console.log(`User added to PRD_users.txt successfuly!`);
        });
    })

    it ('Report' ,async ()=> {
        console.log(clc.yellow('\n<<<<<<<<<<<<<<<<<<<< REPORT: >>>>>>>>>>>>>>>>>>>>'));
        console.log(clc.yellow(`Email: ${emailAddress}`))
        console.log(clc.yellow(`Password: ${password}`))
        console.log(clc.yellow('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>\n'));
    })
})
