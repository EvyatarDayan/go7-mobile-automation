const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageSearchResults = require("../../../pages/go7/page-go7-search-results");
const pagePaxInfo = require("../../../pages/go7/page-go7-paxInfo");
const pageAncillary = require("../../../pages/go7/page-go7-ancillary");
const data = require("../../../data");
const NWTools = require("nightwatch-tools");
const randomNumber = NWTools.randomString(5,'1234567890');
let randomEmail = `ran.domali${randomNumber}@yopmail.com`;
let from = data.go7_destinations.firstSelection.from;
let to = data.go7_destinations.firstSelection.to;
let adultFirstName = global.randomFirstName();
let adultLastName = global.randomLastName();
let childFirstName = global.randomFirstName();
let childLastName = global.randomLastName();
let infantFirstName = global.randomFirstName();
let infantLastName = global.randomLastName();
let promoCode = data.promoCodes.promo1;
let phoneNumber = '212345678';

describe('Pax-info', () => {

    it('Select destinations', async () => {
        // Click on round trip
        await global.clickOn(pageSearch.main.oneWayCheckbox)
        // Select destinations
        await global.destinations_selectByNameOrCode(from, to)
    });

    it('Select dates', async () => {
        await global.calendar_selectFirstAvailableOneWayDate()
    });

    it('Select passengers', async () => {
        await global.passengers_selectPassengers(0, 1, 1)
    });

    it('Add promo code', async () => {
        await global.addPromoCode(promoCode)
    })

    it('Click on search', async () => {
        // Click on flight search button
        await global.pause(2000)
        await global.clickOn(pageSearch.main.searchFlightButton)
    });

    it('Select flights and fares', async () => {
        // Select flight and fare
        await global.searchResults_selectDepartFare()
    });

    it('Add details to Adult 1', async () => {
        // Expand adult 1 section
        await global.clickOn(pagePaxInfo.main.adult1_sectionTitleText)
        // Add title
        await global.paxInfo_addTitle()
        // Add first name
        await global.addValue(pagePaxInfo.main.adult1_firstNameInput, adultFirstName);
        // Add last name
        await global.addValue(pagePaxInfo.main.adult1_lastNameInput, adultLastName);
        // Click on phone label (just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.adult1_phoneNumberLabel)
        // Click on phone number country code
        await global.clickOn(pagePaxInfo.main.adult1_phoneCountryCodeButton)
        // Search for country (Australia)
        await global.clickOn(pagePaxInfo.main.adult1_phoneCountryCodeSearchInput)
        await global.addValue(pagePaxInfo.main.adult1_phoneCountryCodeSearchInput, 'Australia')
        // Click on results title (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.adult1_phoneCountryCodeResultsTitle)
        // Select the country
        await global.clickOn(pagePaxInfo.main.adult1_phoneCountryCodeFirstResult)
        // Add phone number
        await global.clickOn(pagePaxInfo.main.adult1_phoneInput)
        await global.addValue(pagePaxInfo.main.adult1_phoneInput, phoneNumber)
        // Click on phone number label (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.adult1_phoneNumberLabel)
        // Add email
        await global.addValue(pagePaxInfo.main.adult1_emailInput, randomEmail);
        // // Click on phone number label (Just to close the keyboard)
        // await global.clickOn(pagePaxInfo.main.adult1_phoneNumberLabel)
        // Add date of birth
        await global.paxInfo_selectBirthDate()
        await global.pause(2000)
    });

    it('Add details to Child 1', async () => {
        // scroll down
        await global.scrollTo(200, 700, 200, 230)
        // Expand child 1 section
        await global.clickOn(pagePaxInfo.main.child1_sectionTitleText)
        // scroll down
        await global.scrollTo(200, 700, 200, 230)
        // Click on title field
        await global.clickOn(pagePaxInfo.main.child1_titleButton)
        // Select Child
        await global.clickOn(pagePaxInfo.main.child1_title_Child)
        // Add first name
        await global.addValue(pagePaxInfo.main.child1_firstNameInput, childFirstName);
        // Add last name
        await global.addValue(pagePaxInfo.main.child1_lastNameInput, childLastName);
        // Click on last name label (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.child1_lastNameLabel)
        // Click on phone number country code
        await global.clickOn(pagePaxInfo.main.child1_phoneCountryCodeButton)
        // Search for country (Australia)
        await global.clickOn(pagePaxInfo.main.child1_phoneCountryCodeSearchInput)
        await global.addValue(pagePaxInfo.main.child1_phoneCountryCodeSearchInput, 'Australia')
        // Click on results title (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.child1_phoneCountryCodeResultsTitle)
        // Select the country
        await global.clickOn(pagePaxInfo.main.child1_phoneCountryCodeFirstResult)
        // Add phone number
        await global.addValue(pagePaxInfo.main.child1_phoneInput, phoneNumber)
        // Click on phone number label (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.child1_phoneNumberLabel)
        // Add email
        await global.addValue(pagePaxInfo.main.child1_emailInput, randomEmail);
        // Click on last name label (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.child1_lastNameLabel)

        // Click on day
        await global.clickOn(pagePaxInfo.main.child1_dateOfBirthDayButton)
        // Select day
        await global.clickOn(pagePaxInfo.main.child1_dateOfBirth_Day)
        // Click on month
        await global.clickOn(pagePaxInfo.main.child1_dateOfBirthMonthButton)
        // Select month
        await global.clickOn(pagePaxInfo.main.child1_dateOfBirth_Month)
        // Click on year
        await global.clickOn(pagePaxInfo.main.child1_dateOfBirthYearButton)
        // Select year
        await global.clickOn(pagePaxInfo.main.child1_dateOfBirth_Year)
        // Log
        await global.logSuccess(`Birthdate selected successfully.`);
    });

    it('Add details to Infant 1', async () => {
        // Expand infant 1 section
        await global.clickOn(pagePaxInfo.main.infant1_sectionTitleText)
        // scroll down
        await global.scrollTo(200, 700, 200, 230)
        // Click on title field
        await global.clickOn(pagePaxInfo.main.infant1_titleButton)
        // scroll down
        await global.scrollTo(200, 700, 200, 230)
        // Select Infant
        await global.clickOn(pagePaxInfo.main.infant1_title_Infant)

        // Add first name
        await global.addValue(pagePaxInfo.main.infant1_firstNameInput, infantFirstName);
        // Click on infant section title (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.infant1_sectionTitleText)
        // Add last name
        await global.addValue(pagePaxInfo.main.infant1_lastNameInput, infantLastName);
        // Click on infant section title (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.infant1_sectionTitleText)
        // Click on day
        await global.clickOn(pagePaxInfo.main.infant1_dateOfBirthDayButton)
        // Select day
        await global.clickOn(pagePaxInfo.main.infant1_dateOfBirth_Day)
        // Click on month
        await global.clickOn(pagePaxInfo.main.infant1_dateOfBirthMonthButton)
        // Select month
        await global.clickOn(pagePaxInfo.main.infant1_dateOfBirth_Month)
        // Click on year
        await global.clickOn(pagePaxInfo.main.infant1_dateOfBirthYearButton)
        // Select year
        await global.clickOn(pagePaxInfo.main.infant1_dateOfBirth_Year)
        // Log
        await global.logSuccess(`Birthdate selected successfully.`);
    });

    it('Confirm pax info (click on continue)', async () => {
        // Click on continue
        await global.clickOn(pagePaxInfo.main.continueButton)
        // Validate passengers in ancillary page
        await global.validateElementText(pageAncillary.main.passenger1_FullName, `${adultFirstName} ${adultLastName}`)
    });

    it('Update passenger info', async () => {
        // Navigate back to pax-info page
        await global.clickOn(pageAncillary.main.backButton)
        // Update adult 1 last name
        await global.addValue(pagePaxInfo.main.adult1_lastNameInput, 'G')
        // Click on phone label (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.adult1_phoneNumberLabel)

        // Click on continue
        await global.clickOn(pagePaxInfo.main.continueButton)
        // Validate passenger 1 full name in ancillary page
        await global.validateElementText(pageAncillary.main.passenger1_FullName, `${adultFirstName} ${adultLastName}G`)
        // Validate passenger 2 full name in ancillary page
        await global.validateElementText(pageAncillary.main.passenger2_FullName, `${childFirstName} ${childLastName}`)
    });

    // todo: Need to add "Adult and Infant Association" functionality as well: https://aerocrs.atlassian.net/browse/WEB-79
});
