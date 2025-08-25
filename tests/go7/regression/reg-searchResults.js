const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageSearchResults = require("../../../pages/go7/page-go7-search-results");
const data = require("../../../data");
const {logSuccess} = require("../../../commands.conf");

let from = data.go7_destinations.firstSelection.from;
let to = data.go7_destinations.firstSelection.to;

describe('Search results', () => {

    it('Search', async () => {
        await global.pause(5000)
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
        // Departure duration exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.departFirstFlightDuration)
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
        // Return duration exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightDuration)
        // Return flight number exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightFlightNumber)
        // Return price text exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightPriceText)
        // Return currency code exist (not validating text value)
        await global.validateElementDisplay(pageSearchResults.main.returnFirstFlightCurrencyCode)
    });

    it('Select departure flight', async () => {
        // Select the flight fare
        await global.searchResults_selectDepartFare()
        // scroll up
        await global.pause(1000)
            if (driver.capabilities.platformName === "iOS") {
                // iOS scroll
                await global.scrollTo(200, 700, 200, 230)
            }
                else {
                    // Android scroll
                    await global.scrollTo(500, 500, 500, 2000)
                }
        await global.pause(1000)
        // Validate carousel removed
        await global.validateElementNotDisplayed(pageSearchResults.main.departCarouselNextButton)
        // Click on change flight
        await global.pause(1000)
        await global.clickOn(pageSearchResults.main.departFirstFlightChangeButton)
        // Validate carousel display
        await global.pause(1000)
        await global.validateElementDisplay(pageSearchResults.main.departCarouselPreviousButton)
        // Select the flight fare again
        await global.searchResults_selectDepartFare()
    });

    it('Select return flight', async () => {
        await global.pause(1000)
        // Select the flight
        await global.searchResults_selectReturnFare()
        // Validate carousel removed
        await global.pause(1000)
        await global.validateElementNotDisplayed(pageSearchResults.main.returnCarouselNextButton)
        // Click on change flight
        await global.pause(1000)
        await global.clickOn(pageSearchResults.main.returnFirstFlightChangeButton)
        // Validate carousel display
        await global.pause(1000)
        await global.validateElementDisplay(pageSearchResults.main.returnCarouselNextButton)
        // Select the flight fare again
        await global.searchResults_selectReturnFare()
    });

    it('Change depart flight', async () => {
        // Click on change flight
        await global.pause(1000)
        await global.clickOn(pageSearchResults.main.departFirstFlightChangeButton)
        // Select the previous date for depart
        await global.pause(1000)
        await global.clickOn(pageSearchResults.main.departCarouselPreviousDate)

        // Validate new selected date match depart flight
        let departSelectedDate = await global.getElementText(pageSearchResults.main.departCarouselCurrentDate)
        let departFlightStartDate = await global.getElementText(pageSearchResults.main.departFirstFlightStartDate)
            if (departSelectedDate === departFlightStartDate) {
                await global.logSuccess('Flight date display correct after update.')
            }
                else {
                    await global.logError('Flight date display wrong after update.')
                }
    });

    it('Change return flight', async () => {
        // Select the next date for return
        await global.pause(1000)
        await global.clickOn(pageSearchResults.main.returnCarouselPreviousDate)

        // Validate new selected date match return flight
        let returnSelectedDate = await global.getElementText(pageSearchResults.main.returnCarouselCurrentDate)
        let returnFlightStartDate = await global.getElementText(pageSearchResults.main.returnFirstFlightStartDate)
            if (returnSelectedDate === returnFlightStartDate) {
                await global.logSuccess('Flight date display correct after update.')
            }
                else {
                    await global.logError('Flight date display wrong after update.')
                }
    });

    it('Fare details', async () => {
        // Click on depart fare details
        // Validate content
        // Click on return fare details
        // Validate content
    });

    it('Select flights and fares', async () => {
        // Select depart flight and fare
        await global.searchResults_selectDepartFare()
        // Select return flight and fare
        await global.searchResults_selectReturnFare()
    });
});