const global = require("../../../commands.conf");
const pageGo7Passengers = require("../../../pages/go7/page-go7-passengers");
const data = require("../../../data");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageSearchResults = require("../../../pages/go7/page-go7-search-results");
const pagePaxInfo = require("../../../pages/go7/page-go7-paxInfo");

let from = data.go7_destinations.firstSelection.from;
let to = data.go7_destinations.firstSelection.to;

describe('Passengers', () => {

    it('Select destinations', async () => {
        // Click on round trip
        await global.clickOn(pageSearch.main.roundTripCheckbox)
        // Select ct destinations
        await global.destinations_selectByNameOrCode(from, to)
    });

    it('Select dates', async () => {
        // Select First available round trip dates
        await global.calendar_selectRoundTripDatesByIndex(2, 4)
    });

    it('Select passengers - Notes display', async () => {
        // Select Infants
        await global.clickOn(pageGo7Passengers.main.infantsPlusButton)
        // Validate notes display the correct text
        await global.validateElementText(pageGo7Passengers.main.passengersNotesText, 'You can’t travel with more infants than adults')
        // Remove Infants selection
        await global.clickOn(pageGo7Passengers.main.infantsMinusButton)
        // Validate notes element don't display
        await global.validateElementNotDisplayed(pageGo7Passengers.main.passengersNotesText)
    });

    it('Select passengers - Adults vs Infants', async () => {
        // Add 2 more adults (to display 3)
        await global.multipleClicks(pageGo7Passengers.main.adultsPlusButton, 2)
        // Add 3 Infants
        await global.multipleClicks(pageGo7Passengers.main.infantsPlusButton, 3)
        // Validate infants plus button disabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsPlusButton, 'label', 'disabled')
        // Validate infants minus button enabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsMinusButton, 'label', 'enabled')

        // Validate number of Infants
        await global.validateElementText(pageGo7Passengers.main.infantsCount, 3)
        // Remove 2 adults
        await global.multipleClicks(pageGo7Passengers.main.adultsMinusButton, 2)
        // Validate infants plus button disabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsPlusButton, 'label', 'disabled')
        // Validate infants minus button enabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsMinusButton, 'label', 'enabled')
        // Validate number of Infants
        await global.validateElementText(pageGo7Passengers.main.infantsCount, 1)
        // Add 1 adult
        await global.multipleClicks(pageGo7Passengers.main.adultsPlusButton, 1)
        // Validate infants plus button enabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsPlusButton, 'label', 'enabled')
        // Add 1 Infant
        await global.multipleClicks(pageGo7Passengers.main.infantsPlusButton, 1)
        // Validate infants plus button disabled again
        await global.validateAttributeValue(pageGo7Passengers.main.infantsPlusButton, 'label', 'disabled')
        // Validate number of adults
        await global.validateElementText(pageGo7Passengers.main.adultsCount, 2)
        // Validate number of infants
        await global.validateElementText(pageGo7Passengers.main.infantsCount, 2)
        // Click on save button
        await global.clickOn(pageGo7Passengers.main.passengersSaveButton)
        // Validate passengers summary in search page
        await global.validateElementText(pageSearch.main.passengersSummary, '2 Adults, 2 Infants ')
    });

    it('Select passengers - Children', async () => {
        // Open passengers page again
        await global.clickOn(pageSearch.main.passengersSummary)
        // Add 3 children
        await global.multipleClicks(pageGo7Passengers.main.childrenPlusButton, 3)
        // Validate number of adults are not affected
        await global.validateElementText(pageGo7Passengers.main.adultsCount, 2)
        // Validate number of infants are not affected
        await global.validateElementText(pageGo7Passengers.main.infantsCount, 2)
        // Validate children minus button enabled
        await global.validateAttributeValue(pageGo7Passengers.main.childrenMinusButton, 'label', 'enabled')
        // Validate children plus button disabled (limit of 3 children)
        await global.validateAttributeValue(pageGo7Passengers.main.childrenPlusButton, 'label', 'disabled')
        // Validate infants plus button is disabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsPlusButton, 'label', 'disabled')
        // Click on save button
        await global.clickOn(pageGo7Passengers.main.passengersSaveButton)
        // Validate passengers summary in search page
        await global.validateElementText(pageSearch.main.passengersSummary, '2 Adults, 3 Children, 2 Infants ')
    });

    it('Select passengers - Max number of passengers', async () => {
        // Open passengers page again
        await global.clickOn(pageSearch.main.passengersSummary)
        // Add 7 more adults to get to the max (9)
        await global.multipleClicks(pageGo7Passengers.main.adultsPlusButton, 7)
        // Add 1 more infants to get to the max (3)
        await global.multipleClicks(pageGo7Passengers.main.infantsPlusButton, 1)
        // Validate number of adults
        await global.validateElementText(pageGo7Passengers.main.adultsCount, 9)
        // Validate number of children
        await global.validateElementText(pageGo7Passengers.main.childrenCount, 3)
        // Validate number of infants
        await global.validateElementText(pageGo7Passengers.main.infantsCount, 3)
        // Validate adults plus button disabled
        await global.validateAttributeValue(pageGo7Passengers.main.adultsPlusButton, 'label', 'disabled')
        // Validate children plus button disabled
        await global.validateAttributeValue(pageGo7Passengers.main.childrenPlusButton, 'label', 'disabled')
        // Validate infants plus button disabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsPlusButton, 'label', 'disabled')
        // Validate adults minus button enabled
        await global.validateAttributeValue(pageGo7Passengers.main.adultsMinusButton, 'label', 'enabled')
        // Validate children minus button enabled
        await global.validateAttributeValue(pageGo7Passengers.main.childrenMinusButton, 'label', 'enabled')
        // Validate infants minus button enabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsMinusButton, 'label', 'enabled')
        // Click on save button
        await global.clickOn(pageGo7Passengers.main.passengersSaveButton)
        // Validate passengers summary in search page
        await global.validateElementText(pageSearch.main.passengersSummary, '9 Adults, 3 Children, 3 Infants ')
    });

    it('Select passengers - Reducing adults', async () => {
        // Open passengers page again
        await global.clickOn(pageSearch.main.passengersSummary)
        // Reduce 5 adults
        await global.multipleClicks(pageGo7Passengers.main.adultsMinusButton, 5)
        // Validate number of adults
        await global.validateElementText(pageGo7Passengers.main.adultsCount, 4)
        // Validate number of infants
        await global.validateElementText(pageGo7Passengers.main.infantsCount, 3)
        // Validate infants plus button disabled
        await global.validateAttributeValue(pageGo7Passengers.main.infantsPlusButton, 'label', 'disabled')
        // Reduce 4 more adults
        await global.multipleClicks(pageGo7Passengers.main.adultsMinusButton, 4)
        // Validate number of adults
        await global.validateElementText(pageGo7Passengers.main.adultsCount, 0)
        // Validate number of infants
        await global.validateElementText(pageGo7Passengers.main.infantsCount, 0)
        // Validate adults minus button disabled
        await global.validateAttributeValue(pageGo7Passengers.main.adultsMinusButton, 'label', 'disabled')
        // Validate number of children is not affected
        await global.validateElementText(pageGo7Passengers.main.childrenCount, 3)
        // Validate children plus button disabled
        await global.validateAttributeValue(pageGo7Passengers.main.childrenPlusButton, 'label', 'disabled')
        // Validate children minus button enabled
        await global.validateAttributeValue(pageGo7Passengers.main.childrenMinusButton, 'label', 'enabled')
        // Click on save button
        await global.clickOn(pageGo7Passengers.main.passengersSaveButton)
        // Validate passengers summary in search page
        await global.validateElementText(pageSearch.main.passengersSummary, '3 Children ')
    });

    it('Select passengers without saving', async () => {
        // Open passengers page again
        await global.clickOn(pageSearch.main.passengersSummary)
        // Add 1 adult
        await global.multipleClicks(pageGo7Passengers.main.adultsPlusButton, 1)
        // Add 1 infant
        await global.multipleClicks(pageGo7Passengers.main.infantsPlusButton, 1)
        // Click on x button to close the page without saving
        await global.clickOn(pageGo7Passengers.main.passengersCloseButton)
        // Validate passengers summary in search page (adult and infant addition is not there)
        await global.validateElementText(pageSearch.main.passengersSummary, '3 Children ')
    });

    it('Validate passengers age description', async () => {
        // Open passengers page again
        await global.clickOn(pageSearch.main.passengersSummary)
        // Validate adult title
        await global.validateElementText(pageGo7Passengers.main.adultTitleText, 'Adult ')
        // Validate adult age description
        await global.validateElementText(pageGo7Passengers.main.adultAgeDescriptionText, '18 - 75 years old ')
        // Validate children title
        await global.validateElementText(pageGo7Passengers.main.childrenTitleText, 'Child ')
        // Validate children age description
        await global.validateElementText(pageGo7Passengers.main.childrenAgeDescriptionText, '2 - 11 years old ')
        // Validate infant title
        await global.validateElementText(pageGo7Passengers.main.infantTitleText, 'Infant ')
        // Validate infant age description
        await global.validateElementText(pageGo7Passengers.main.infantAgeDescriptionText, '0 - 1 years old ')
    });

    it('Validate passengers in pax info page', async () => {
        // Add 1 adult
        await global.multipleClicks(pageGo7Passengers.main.adultsPlusButton, 1)
        // Remove 2 children
        await global.multipleClicks(pageGo7Passengers.main.childrenMinusButton, 2)
        // Add 1 infant
        await global.multipleClicks(pageGo7Passengers.main.infantsPlusButton, 1)
        // Click on save button
        await global.clickOn(pageGo7Passengers.main.passengersSaveButton)
        // Click on search flights button
        await global.clickOn(pageSearch.main.searchFlightButton)
        // Select depart first flight
        await global.clickOn(pageSearchResults.main.departFirstFlightContainer)
        // Select return first flight
        await global.clickOn(pageSearchResults.main.returnFirstFlightContainer)
        // Click on continue in flight results
        await global.clickOn(pageSearchResults.main.continueButton)
        // Collapse adult section
        await global.clickOn(pagePaxInfo.main.adult1_collapseExpandButton)
        // Collapse child section
        await global.clickOn(pagePaxInfo.main.child1_collapseExpandButton)
        // Collapse infant section
        await global.clickOn(pagePaxInfo.main.infant1_collapseExpandButton)
        // Validate adult section title
        await global.validateElementText(pagePaxInfo.main.adult1_sectionTitleText, 'Adult 1 ')
        // Validate child section title
        await global.validateElementText(pagePaxInfo.main.child1_sectionTitleText, 'Child 1 ')
        // Validate infant section title
        await global.validateElementText(pagePaxInfo.main.infant1_sectionTitleText, 'Infant 1 ')
    });
});
