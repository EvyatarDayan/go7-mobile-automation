const global = require("../../../commands.conf");
const {driver} = require("@wdio/globals");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageSearchResults = require("../../../pages/go7/page-go7-search-results");
const data = require("../../../data");
const pagePaxInfo = require("../../../pages/go7/page-go7-paxInfo");
const pageAncillary = require("../../../pages/go7/page-go7-ancillary");
const pageBookingSummary = require("../../../pages/go7/page-go7-bookingSummary");

let from = data.go7_destinations.firstSelection.from;
let to = data.go7_destinations.firstSelection.to;

describe('Destinations', () => {

    it('From destination field', async () => {
        // Click on round trip
        await global.clickOn(pageSearch.main.roundTripCheckbox)
        // Click on "From"
        await global.clickOn(pageSearch.main.fromInput)
        // Add "From" in the field
        await global.addValue(pageSearch.main.destinationsSearchInput, 'Ba')
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Bangkok')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Barcelona')
        // Add additional text to validate less results
        await global.addValue(pageSearch.main.destinationsSearchInput, 'ng')
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Bangkok')
        await global.validateAttributeNotIncludesValue(pageSearch.main.destinationsFromAllResults, 'label', 'Barcelona')
        // Remove some text to validate more results
        await global.multipleKeyboardBackspace(2)
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Bangkok')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Barcelona')
        // Add additional text (blabla) to validate no results
        await global.addValue(pageSearch.main.destinationsSearchInput, 'blabla')
        //todo: Validate no results (is there going to be a message here?)
        // await global.validateAttributeNotIncludesValue(pageSearch.main.destinationsFromAllResults, 'label', 'Barcelona')

        // Remove all text to validate all possible results display
        await global.multipleKeyboardBackspace(8)
        // Validate some results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Bangkok')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Barcelona')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Beijing Capital Airport ')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Seoul ')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Tokyo ')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Zurich (ZRH) ')
        // Add existing airport code (uppercase letters)
        await global.addValue(pageSearch.main.destinationsSearchInput, 'BCN')
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Barcelona')
        // Remove all text to validate all possible results display
        await global.multipleKeyboardBackspace(3)
        // Add another existing airport code (lowercase letters)
        await global.addValue(pageSearch.main.destinationsSearchInput, 'zrh')
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Zurich (ZRH) ')
        // Click on the search icon (just to close the keyboard)
        await global.clickOn(pageSearch.main.searchIcon)
        // Select destination
        await global.clickOn(pageSearch.main.destinationsFirstResult)
        await driver.pause(1000)
    });

    it('To destination field', async () => {
        // Click on "To"
        await global.clickOn(pageSearch.main.toInput)
        // Add "To" in the field
        await global.addValue(pageSearch.main.destinationsSearchInput, 'A')
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Frankfurt (FRA) ')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Copenhagen (CPH) ')
        // Add additional text to validate less results
        await global.addValue(pageSearch.main.destinationsSearchInput, 'n')
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Frankfurt (FRA) ')
        await global.validateAttributeNotIncludesValue(pageSearch.main.destinationsFromAllResults, 'label', 'Copenhagen (CPH) ')
        // Remove some text to validate more results
        await global.multipleKeyboardBackspace(1)
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Frankfurt (FRA) ')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Copenhagen (CPH) ')
        // Add additional text (blabla) to validate no results
        await global.addValue(pageSearch.main.destinationsSearchInput, 'blabla')
        //todo: Validate no results (is there going to be a message here?)
        // await global.validateAttributeNotIncludesValue(pageSearch.main.destinationsFromAllResults, 'label', 'Barcelona')

        // Remove all text to validate all possible results display
        await global.multipleKeyboardBackspace(7)
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Frankfurt (FRA) ')
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Copenhagen (CPH) ')
        // Add existing airport code (uppercase letters)
        await global.addValue(pageSearch.main.destinationsSearchInput, 'CPH')
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Copenhagen (CPH) ')
        // Remove all text to validate all possible results display
        await global.multipleKeyboardBackspace(3)
        // Add another existing airport code (lowercase letters)
        await global.addValue(pageSearch.main.destinationsSearchInput, 'fra')
        // Validate results
        await global.validateAttributeValue(pageSearch.main.destinationsFromAllResults, 'label', 'Frankfurt (FRA) ')
        // Click on the search icon (just to close the keyboard)
        await global.clickOn(pageSearch.main.searchIcon)
        // Select destination
        await global.clickOn(pageSearch.main.destinationsFirstResult)
    });

    it('Validate destinations in search page', async () => {
        // Select dates
        await global.calendar_selectFirstAvailableRoundTripDates()
        // Select passengers
        await global.passengers_selectPassengers(0, 0, 0, 0)
        // Validate "From"
        await global.validateElementText(pageSearch.main.fromInput, 'Zurich (ZRH) ')
        // Validate "To"
        await global.validateElementText(pageSearch.main.toInput, 'Frankfurt (FRA) ')
        // Select other destinations
        await global.destinations_selectByNameOrCode(from, to)
        // Select dates
        await global.calendar_selectFirstAvailableRoundTripDates()
        // Select passengers
        await global.passengers_selectPassengers(0, 0, 0, 0)
    });

    it('Validate destinations in search results page', async () => {
        // Click on flight search button
        await global.clickOn(pageSearch.main.searchFlightButton)
        // Validate departure start destination
        await global.validateElementText(pageSearchResults.main.departFirstFlightStartDestination, 'Tokyo')
        // Validate departure end destination
        await global.validateElementText(pageSearchResults.main.departFirstFlightEndDestination, 'Seoul')
        // Validate return start destination
        await global.validateElementText(pageSearchResults.main.returnFirstFlightStartDestination, 'Seoul')
        // Validate return end destination
        await global.validateElementText(pageSearchResults.main.returnFirstFlightEndDestination, 'Tokyo')
        // Select flights and fares
        await global.searchResults_selectRoundTripFares()
    });

    it('Add passenger info', async () => {
        // Click on title field
        await global.clickOn(pagePaxInfo.main.adult1_titleButton)
        // Select Mr
        await global.clickOn(pagePaxInfo.main.adult1_title_Mr)
        // Select random names
        await global.paxInfo_addNames()
        // Add phone number
        await global.paxInfo_addPhoneNumber()
        // Add email
        await global.paxInfo_addEmail()
        // Click on the disclaimer message (Just to close the keyboard)
        // await global.clickOn(pagePaxInfo.main.disclaimerMessage)
        // Add birthdate
        await global.paxInfo_selectBirthDate()
        // Click on continue
        await global.clickOn(pagePaxInfo.main.continueButton)
    });

    it('Validate destinations in ancillary page', async () => {
        // Validate departure start destination
        await global.validateElementText(pageAncillary.main.flightSelectionText, from)
        // Validate departure end destination
        await global.validateElementText(pageAncillary.main.flightSelectionText, to)
        // Click on add sandwich and drink button
        await global.clickOn(pageAncillary.main.sandwichAndDrinkAddButton)
        // Click on continue button
        await global.clickOn(pageAncillary.main.continueButtonText)
    });

    it('Validate destinations in booking summary page', async () => {
        // Validate departure start destination
        await global.validateElementText(pageBookingSummary.main.departFlightStartDestination, from)
        // Validate departure end destination
        await global.validateElementText(pageBookingSummary.main.departFlightEndDestination, to)
        // Validate return start destination
        await global.validateElementText(pageBookingSummary.main.returnFlightStartDestination, to)
        // Validate return end destination
        await global.validateElementText(pageBookingSummary.main.returnFlightEndDestination, from)
        // Validate departure start destination code
        await global.validateElementText(pageBookingSummary.main.departFlightStartDestinationCode, 'HND')
        // Validate departure end destination code
        await global.validateElementText(pageBookingSummary.main.departFlightEndDestinationCode, 'GMP')
        // Validate return start destination code
        await global.validateElementText(pageBookingSummary.main.returnFlightStartDestinationCode, 'GMP')
        // Validate return end destination code
        await global.validateElementText(pageBookingSummary.main.returnFlightEndDestinationCode, 'HND')
        // Click on continue button
        await global.clickOn(pageBookingSummary.main.continueButton)
    });
});
