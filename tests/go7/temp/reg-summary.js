const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageSearchResults = require("../../../pages/go7/page-go7-search-results");
const pagePriceSummary = require("../../../pages/go7/page-go7-priceSummary");
const pagePaxInfo = require("../../../pages/go7/page-go7-paxInfo");
const pageAncillary = require("../../../pages/go7/page-go7-ancillary");
const pageSeatSelection = require("../../../pages/go7/page-go7-seatSelection");
const pageBookingSummary = require("../../../pages/go7/page-go7-bookingSummary");
const data = require("../../../data");
const {driver} = require("@wdio/globals");

let from = data.go7_destinations.thirdSelection.from;
let to = data.go7_destinations.thirdSelection.to;
let promoCode = data.promoCodes.promo2

// Selected data
let startDate;
let startTime;
let startDestination;
let startDestinationCode;
let endDate;
let endTime;
let endDestination;
let endDestinationCode;
let flightDurationDetails;
let flightDurationTime;
let flightNumber;
let selectedTitle;
let selectedPhoneNumber;
let selectedEmail;
let firstName;
let lastName;
let selectedDate;
let selectedAncillary;

describe('Summary', () => {

    before('Validate app is ready',async () => {
        await global.isAppReady()
    });

    it('Select destinations', async () => {
        // Click on round trip
        await global.clickOn(pageSearch.main.oneWayCheckbox)
        await global.destinations_selectByNameOrCode(from, to)
    });

    it('Select dates', async () => {
        await global.calendar_selectFirstAvailableOneWayDate()
    });

    it('Select passengers', async () => {
        await global.passengers_selectPassengers(0, 0, 0, 0)
    });

    it('Add promo code', async () => {
        await global.addPromoCode(promoCode)
    })

    it('Click on search', async () => {
        // Click on flight search button
        await global.clickOn(pageSearch.main.searchFlightButton)
    });

    it('Select flights and fares', async () => {
        // Select flight and fare
        await global.searchResults_selectDepartFare()

        // ================= Price summary validation =============================================================
            // Get depart price
            let departPrice = await global.getElementText(pageSearchResults.main.departFirstFlightPriceText)
            // Get return price
            // let returnPrice = await global.getElementText(pageSearchResults.main.returnFirstFlightPriceText)
            // Convert string to number
            let departPriceConverted = parseFloat(departPrice)
            // Add .00 to the flights calculation
            let finalFlightsPrice = departPriceConverted.toFixed(2)

            // Validate price summary
            await global.validateElementText(pagePriceSummary.main.priceSummaryNumbers, finalFlightsPrice)
        // ================= Price summary validation ============================================================

        // ================= Collecting flight data for later verification =======================================
                // Get start date
                startDate = await global.getElementText(pageSearchResults.main.departFirstFlightStartDate)
                // Get start time
                startTime = await global.getElementText(pageSearchResults.main.departFirstFlightStartTime)
                // Get start destination
                startDestination = await global.getElementText(pageSearchResults.main.departFirstFlightStartDestination)
                // Get start destination code
                startDestinationCode = await global.getElementText(pageSearchResults.main.departFirstFlightStartDestinationCode)

                // Get end date
                endDate = await global.getElementText(pageSearchResults.main.departFirstFlightEndDate)
                // Get end time
                endTime = await global.getElementText(pageSearchResults.main.departFirstFlightEndTime)
                // Get end destination
                endDestination = await global.getElementText(pageSearchResults.main.departFirstFlightEndDestination)
                // Get end destination code
                endDestinationCode = await global.getElementText(pageSearchResults.main.departFirstFlightEndDestinationCode)

                // Get flight duration details
                flightDurationDetails = await global.getElementText(pageSearchResults.main.departFirstFlightDurationDetails)
                // Get flight duration time
                flightDurationTime = await global.getElementText(pageSearchResults.main.departFirstFlightDurationTime)
                // Get flight number
                flightNumber = await global.getElementText(pageSearchResults.main.departFirstFlightFlightNumber)

        // Click on continue in search results page
        await global.clickOn(pageSearchResults.main.continueButton)

        // ================= Collecting flight data for later verification =======================================
    });

    it('Add passenger info', async () => {
        // Expand adult 1 section
        // await global.clickOn(pagePaxInfo.main.adult1_sectionTitleText)
        // Add title (and collect the data for later verification)
        selectedTitle = await global.paxInfo_addTitle()
        // Add first name (and collect the data for later verification)
        firstName = await global.paxInfo_addFirstName()
        // Add last name (and collect the data for later verification)
        lastName = await global.paxInfo_addLastName()
        // Add phone number (and collect the data for later verification)
        selectedPhoneNumber = await global.paxInfo_addPhoneNumber()
        // Add email (and collect the data for later verification)
        selectedEmail = await global.paxInfo_addEmail()
        // Add date of birth (or add age)
        selectedDate = await global.paxInfo_selectBirthDate()
        await global.pause(1000)
        // Add emergency contact
        await global.addValue(pagePaxInfo.main.adult1_emergencyContactInput, 'Marlon Brando')
        // Add emergency phone
        await global.addValue(pagePaxInfo.main.adult1_emergencyPhoneInput, '456789123')
        // CLick on emergency phone label (Just to close the keyboard)
        await global.clickOn(pagePaxInfo.main.adult1_emergencyPhoneLabel)
        // Click on continue
        await global.clickOn(pagePaxInfo.main.continueButton)
    });

    it('Add Ancillary', async () => {

        // ================= Price summary validation =============================================================
            // Get summary price (contains only flights price at this point)
            let flightsPrice = await global.getElementText(pagePriceSummary.main.priceSummaryNumbers)
            // Get sandwich and drink price
            let sandwichAndDrinkPrice = await global.getElementText(pageAncillary.main.sandwichAndDrinkPriceNumbers)

            // Click on add sandwich and drink button
            await global.clickOn(pageAncillary.main.sandwichAndDrinkAddButton)
            // Collect the data for later verification
            selectedAncillary = await global.getElementText(pageAncillary.main.sandwichAndDrinkContentTitle)

            // Calculate flightsPrice + sandwichAndDrinkPrice (and convert string to number)
            let summaryPlusSandwichAndDrinkPrice = parseFloat(flightsPrice) + parseFloat(sandwichAndDrinkPrice)
            // Add .00 to the results
            let finalFlightsPlusSandwichAndDrinkPrice = summaryPlusSandwichAndDrinkPrice.toFixed(2)

            // Validate updated price summary
            await global.validateElementText(pagePriceSummary.main.priceSummaryNumbers, finalFlightsPlusSandwichAndDrinkPrice)
        // ================= Price summary validation ============================================================

        // Click on continue button
        await global.clickOn(pageAncillary.main.continueButtonText)
    });

    it('Select seats', async () => {
        // todo: Need to add seat selection
        // Click on continue button
        await global.clickOn(pageSeatSelection.main.continueButton)
    });

    it('Summary page - Flight details', async () => {
        // Validate depart title
        // await global.validateElementText(pageBookingSummary.main.departFlightTitle, 'Departure flight')
        // Validate start date
        await global.validateElementText(pageBookingSummary.main.departFlightStartDate, startDate)
        // Validate start time
        await global.validateElementText(pageBookingSummary.main.departFlightStartTime, startTime)
        // Validate start destination
        await global.validateElementText(pageBookingSummary.main.departFlightStartDestination, startDestination)
        // Validate start destination code
        await global.validateElementText(pageBookingSummary.main.departFlightStartDestinationCode, startDestinationCode)

        // Validate end date
        await global.validateElementText(pageBookingSummary.main.departFlightEndDate, endDate)
        // Validate end date
        await global.validateElementText(pageBookingSummary.main.departFlightEndTime, endTime)
        // Validate end destination
        await global.validateElementText(pageBookingSummary.main.departFlightEndDestination, endDestination)
        // Validate end destination code
        await global.validateElementText(pageBookingSummary.main.departFlightEndDestinationCode, endDestinationCode)

        // Validate flight duration details
        await global.validateElementText(pageBookingSummary.main.departFlightDurationDetails, flightDurationDetails)
        // Validate flight duration details
        await global.validateElementText(pageBookingSummary.main.departFlightDurationTime, flightDurationTime)
        // Validate flight number
        await global.validateElementText(pageBookingSummary.main.departFlightFlightNumber, flightNumber)
    });

    it('Summary page - Passenger details', async () => {
        // TBD
    });

    it('Summary page - Ancillary', async () => {
        // TBD
    });

    it('Summary page - Compare Breakdown to Summary', async () => {

        // ============== Collecting Price breakdown data ==============
        // Expand price breakdown
        await global.clickOn(pageBookingSummary.main.priceBreakdownToggleButton)
        // Expand fares section
        await global.clickOn(pageBookingSummary.main.faresSectionPriceNumbers)
        // Expand ancillaries section
        await global.clickOn(pageBookingSummary.main.ancillariesSectionToggleButton)
        // Expand taxes-fees section
        await global.clickOn(pageBookingSummary.main.taxesFeesSectionToggleButton)

            // price breakdown total
            let priceBreakdownTotal = pageBookingSummary.main.totalPriceNumbers
            // Fares total
            let priceBreakdownFaresTotal = pageBookingSummary.main.faresSectionPriceNumbers
            // Ancillaries total
            let priceBreakdownAncillariesTotal = pageBookingSummary.main.ancillariesSectionPriceNumbers
            // TaxesFees total
            let priceBreakdownTaxesFeesTotal = pageBookingSummary.main.taxesFeesSectionPriceNumbers

        // ============== Collecting price summary data ==============
            // Expand price summary
            await global.clickOn(pagePriceSummary.main.priceSummaryNumbers)
            // Total price
            let priceSummaryTotal = pagePriceSummary.main.totalAmount
            // Fares total
            let priceSummaryFaresTotal = pagePriceSummary.main.faresSectionPriceNumbers
            // Ancillaries total
            let priceSummaryAncillariesTotal = pagePriceSummary.main.ancillariesSectionPriceNumbers
            // TaxesFees total
            let priceSummaryTaxesFeesTotal = pagePriceSummary.main.taxesFeesSectionPriceNumbers

        // ============== Compare breakdown to summary ==============
        // Compare Total
        await global.comparePrices(priceBreakdownTotal, priceSummaryTotal)
        // Compare Fares
        await global.comparePrices(priceBreakdownFaresTotal, priceSummaryFaresTotal)
        // Compare Ancillaries
        await global.comparePrices(priceBreakdownAncillariesTotal, priceSummaryAncillariesTotal)
        // Compare Ancillaries
        await global.comparePrices(priceBreakdownTaxesFeesTotal, priceSummaryTaxesFeesTotal)

        await global.pause(60000000)


    });
});