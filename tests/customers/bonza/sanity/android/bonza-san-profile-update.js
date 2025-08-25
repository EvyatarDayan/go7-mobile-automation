const global = require("../../../../../commands.conf");
const data = require("../../../../../data");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaSignInPage = require ('../../../../../pages/bonza/page-bonza-sign-in');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');
const bonzaProfilePage = require ('../../../../../pages/bonza/page-bonza-profile');
const {randomFirstName, randomLastName, randomMiddleName} = require("../../../../../commands.conf");

let email = data.users.bonza.PROD.USER_3.USERNAME
let password = data.users.bonza.PROD.USER_3.PASSWORD;
let phoneNumber = '526648877';
let street = '77 Florentin st';
let country = 'Israel';
let city = 'Tel Aviv';
let postcode = '455698';

describe('Profile update', ()=>{

    // before('Clear all popups',async () => {
    //     await global.clearAllPopups()
    // });

    it('Sign in',async ()=> {
        // Open the menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on Login
        await global.clickOn(bonzaSideMenuPage.main.login)
        // Add email
        await global.addValue(bonzaSignInPage.main.emailInput, email)
        // Add password
        await global.addValue(bonzaSignInPage.main.passwordInput, password)
        // Click on sign in button
        await global.clickOn(bonzaSignInPage.main.signInButton)
    });

    it('Update profile',async ()=>{
        // Click on title list
        await global.clickOn(bonzaProfilePage.main.titleList)
        // Select Mrs
        await global.clickOn(bonzaProfilePage.main.title_Mrs)
        // Clear first name field
        await global.clearValue(bonzaProfilePage.main.firstNameInput)
        // Clear middle name field
        await global.clearValue(bonzaProfilePage.main.middleNameInput)
        // clear last name field
        await global.clearValue(bonzaProfilePage.main.lastNameInput)
        // Update first name
        await global.addValue(bonzaProfilePage.main.firstNameInput, `${await randomFirstName()}`)
        // Update middle name
        await global.addValue(bonzaProfilePage.main.middleNameInput, `${await randomMiddleName()}`)
        // Update last name
        await global.addValue(bonzaProfilePage.main.lastNameInput, `${await randomLastName()}`)
        // Click on date of birth
        await global.clickOn(bonzaProfilePage.main.dateOfBirthList)
        // Click on confirm
        await global.clickOn(bonzaProfilePage.main.dateOfBirth_confirmButton)
        // Click on phone number country list
        await global.clickOn(bonzaProfilePage.main.phoneNumberCountryList)
        // Search for israel
        await global.addValue(bonzaProfilePage.main.phoneNumberCountrySearch, country)
        // Select Israel
        await global.clickOn(bonzaProfilePage.main.phoneNumberCountry_Israel)
        // Clear phone number field
        await global.pause(2000)
        await global.clearValue(bonzaProfilePage.main.phoneNumberInput)
        // Add valid phone number
        await global.addValue(bonzaProfilePage.main.phoneNumberInput, phoneNumber)
        // Swipe up
        await global.scrollTo(500, 2000, 500, 1200)
        // // Clear street
        // await global.clearValue(bonzaProfilePage.main.streetInput)
        // // Add new street
        // await global.addValue(bonzaProfilePage.main.streetInput, street)
        // Clear city feald
        await global.clearValue(bonzaProfilePage.main.cityInput)
        // Add city
        await global.addValue(bonzaProfilePage.main.cityInput, city)
        // Click on country
        await global.clickOn(bonzaProfilePage.main.countryList)
        // Select country
        await global.clickOn(bonzaProfilePage.main.country_Australia)
        // Click on district (state)
        await global.clickOn(bonzaProfilePage.main.districtList)
        // Select district
        await global.clickOn(bonzaProfilePage.main.district_NewSouthWales)
        // Clear postcode
        await global.clearValue(bonzaProfilePage.main.postCodeInput)
        // Add new postcode
        await global.addValue(bonzaProfilePage.main.postCodeInput, postcode)
        // Mark privacy checkbox
        await global.clickOn(bonzaProfilePage.main.privacyPolicyCheckbox)
        // Save the profile
        await global.clickOn(bonzaProfilePage.main.saveProfileButton)
        // Validate profile saved success message
        await global.validateElementText(bonzaProfilePage.main.successMessageMainText, 'We have successfully updated your account with your new contact information.')
        // Close success message
        await global.clickOn(bonzaProfilePage.main.successMessageCloseButton)
    });
})
