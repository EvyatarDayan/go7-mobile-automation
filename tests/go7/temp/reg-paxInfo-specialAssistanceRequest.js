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
        await global.pause(4000)
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

    // it('Add promo code', async () => {
    //     await global.addPromoCode(promoCode)
    // })

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
        // Click on phone number label (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.adult1_phoneNumberLabel)
        // Add date of birth
        await global.paxInfo_selectBirthDate()
        await global.pause(2000)
    });

    it('Add SAR for Adult 1', async () => {
        // Click on special assistance toggle button
        await global.clickOn(pagePaxInfo.main.adult1_specialAssistanceSwitch)
        // Select blind passenger
        await global.clickOn(pagePaxInfo.main.adult1_blindPassenger)
        // Select ramp wheelchair
        await global.clickOn(pagePaxInfo.main.adult1_rampWheelchair)
    });

    it('Add SAR for Child 1', async () => {
        // Click on special assistance toggle button
        await global.clickOn(pagePaxInfo.main.child1_specialAssistanceSwitch)
        // Select blind passenger
        await global.clickOn(pagePaxInfo.main.child1_blindPassenger)
        // Select ramp wheelchair
        await global.clickOn(pagePaxInfo.main.child1_rampWheelchair)
    });

    // it('Validate there is no SAR for Infant', async () => {
    //
    // });

    it('Confirm pax info (click on continue)', async () => {

    });

    it('Update SAR info', async () => {
        await global.pause(300000000)
    });
});
