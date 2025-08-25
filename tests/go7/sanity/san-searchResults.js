const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageSearchResults = require("../../../pages/go7/page-go7-search-results");
const pagePassengers = require("../../../pages/go7/page-go7-passengers");
const data = require("../../../data");

let from = data.go7_destinations.thirdSelection.from;
let to = data.go7_destinations.thirdSelection.to;

describe('Search results', () => {

    before('Validate app is ready',async () => {
        await global.isAppReady()
    });

    it('Search', async () => {
        // Click on round trip
        await global.clickOn(pageSearch.main.roundTripCheckbox)
        // Select destinations
        await global.destinations_selectByNameOrCode(from, to)
        // Select dates
        await global.calendar_selectFirstAvailableRoundTripDates()
        // Select passengers
        await global.passengers_selectPassengers(0, 0, 0, 0)
        // Click on flight search button
        await global.pause(1000)
        await global.clickOn(pageSearch.main.searchFlightButton)
    });

    it('Departure validation', async () => {
        // Validate depart title
        await global.validateElementText(pageSearchResults.main.departTitle, 'Departure flight')
        // Carousel navigation forward
        await global.multipleClicks(pageSearchResults.main.departCarouselNextButton, 2)
        // Carousel navigation backward
        await global.multipleClicks(pageSearchResults.main.departCarouselPreviousButton, 2)
        // Departure Start date exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightStartDate)
        // Departure End date exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightEndDate)
        // Departure Start time exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightStartTime)
        // Departure End time exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightEndTime)
        // Departure Start destination exist and contain "from" value
        await global.validateElementText(pageSearchResults.main.departFirstFlightStartDestination, from)
        // Departure End destination exist and contain "to" value
        await global.validateElementText(pageSearchResults.main.departFirstFlightEndDestination, to)
        // Departure duration details exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightDurationDetails)
        // Departure duration time exist (not validating text value)
        // await global.validateElementDisplay(pageSearchResults.main.departFirstFlightDurationTime)
        // Departure flight number exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightFlightNumber)
        // Departure price text exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightPriceText)
        // Departure currency code exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightCurrencyCode)
    });

    it('Return validation', async () => {
        // Scroll down
            if (driver.capabilities.platformName === "iOS") {
                // iOS scroll
                await global.scrollTo(200, 700, 200, 230)
            }
                else {
                    // Android scroll
                    await global.scrollTo(500, 2000, 500, 500)
                }

                await global.pause(500000000)
        // Validate return title
        await global.validateElementText(pageSearchResults.main.returnTitle, 'Return flight')
        // Carousel navigation forward
        await global.multipleClicks(pageSearchResults.main.returnCarouselNextButton, 2)
        // Carousel navigation backward
        await global.multipleClicks(pageSearchResults.main.returnCarouselPreviousButton, 2)
        // Return Start date exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightStartDate)
        // Return End date exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightEndDate)
        // Return Start time exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightStartTime)
        // Return End time exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightEndTime)
        // Return Start destination exist and contain "from" value
        await global.validateElementText(pageSearchResults.main.departFirstFlightStartDestination, from)
        // Return End destination exist and contain "to" value
        await global.validateElementText(pageSearchResults.main.departFirstFlightEndDestination, to)
        // Return duration details exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightDurationDetails)
        // Return duration time exist (not validating text value)
        // await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightDurationTime)
        // Return flight number exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightFlightNumber)
        // Return price text exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightPriceText)
        // Return currency code exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightCurrencyCode)
    });

    it('Select flights and fares', async () => {
        // Select depart flight and fare
        await global.searchResults_selectDepartFare()
        // Select return flight and fare
        await global.searchResults_selectReturnFare()
    });

    it('Validate passenger info page display', async () => {
        await global.pause(2000)
        // await global.validateElementText(pagePassengers.main.pageTitle, 'Passenger Info')
    });
});