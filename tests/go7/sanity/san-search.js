const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageSearchResults = require("../../../pages/go7/page-go7-search-results");
const pageCalendar = require("../../../pages/go7/page-go7-calendar");
const data = require("../../../data");

let from = data.go7_destinations.thirdSelection.from;
let to = data.go7_destinations.thirdSelection.to;
let promoCode = data.promoCodes.promo1

describe('Search', () => {

    before('Validate app is ready',async () => {
        await global.isAppReady()
    });

    it('Round trip search', async () => {
        // Click on round trip
        await global.clickOn(pageSearch.main.roundTripCheckbox)
        // Select destinations
        await global.destinations_selectByNameOrCode(from, to)
        // Select dates
        await global.calendar_selectRoundTripDatesByIndex(1, 2)
        // Select passengers
        await global.passengers_selectPassengers(0, 0, 0, 0)
        // // Add promo code
        // await global.addPromoCode(promoCode)
        // Click on search flights button
        await global.clickOn(pageSearch.main.searchFlightButton)
        // Validate results - first depart flight
        await global.validateElementText(pageSearchResults.main.departTitle, 'Departure flight')
        // Validate results - Departure Start destination contains "from" value
        await global.validateElementText(pageSearchResults.main.departFirstFlightStartDestination, from)
        // Validate results - first return flight
        await global.validateElementText(pageSearchResults.main.returnTitle, 'Return flight')
    });

    it('One way search', async () => {
        // Click on back button
        await global.pause(3000)
        await global.clickOn(pageSearchResults.main.backButton)
        await global.pause(1000)
        // Click on one way
        await global.clickOn(pageSearch.main.oneWayCheckbox)
        // Click on flight search button
        await global.pause(1000)
        await global.clickOn(pageSearch.main.searchFlightButton)
        // Validate results - first depart flight
        await global.validateElementText(pageSearchResults.main.departTitle, 'Departure flight')
    });

    it('Switch destinations', async () => {
        // Click on back button
        await global.pause(3000)
        await global.clickOn(pageSearchResults.main.backButton)
        // Click on round trip
        await global.pause(2000)
        await global.clickOn(pageSearch.main.roundTripCheckbox)
        // Click on switch destinations button
        await global.clickOn(pageSearch.main.switchDestinationsButton)
        // Close calendar
        await global.clickOn(pageCalendar.main.calendarCloseButton)
        // Click on flight search button
        await global.clickOn(pageSearch.main.searchFlightButton)
        // Validate results - first depart flight
        await global.validateElementText(pageSearchResults.main.departTitle, 'Departure flight')
        // Validate results - Departure Start destination contains "from" value
        await global.validateElementText(pageSearchResults.main.departFirstFlightStartDestination, to)
        // Validate results - first return flight
        await global.validateElementText(pageSearchResults.main.returnTitle, 'Return flight')
    });
});