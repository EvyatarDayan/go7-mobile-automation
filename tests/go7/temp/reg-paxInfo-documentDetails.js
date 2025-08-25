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

    it('Add document details to Adult 1', async () => {

    });

    it('Add document details to Child 1', async () => {

    });

    it('Add document details to Infant 1', async () => {

    });

    it('Confirm pax info (click on continue)', async () => {

    });

    it('Update passenger info', async () => {

    });
});
