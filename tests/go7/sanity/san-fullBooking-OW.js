const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pagePaxInfo = require("../../../pages/go7/page-go7-paxInfo");
const pageSearchResults = require("../../../pages/go7/page-go7-search-results");
const pageAncillary = require("../../../pages/go7/page-go7-ancillary");
const pageSeatSelection = require("../../../pages/go7/page-go7-seatSelection");
const data = require("../../../data");
const pagePriceSummary = require("../../../pages/go7/page-go7-priceSummary");
const pageBookingSummary = require("../../../pages/go7/page-go7-bookingSummary");
const {driver} = require("@wdio/globals");
const pageGo7Calendar = require("../../../pages/go7/page-go7-calendar");

let from = data.go7_destinations.thirdSelection.from;
let to = data.go7_destinations.thirdSelection.to;
let promoCode = data.promoCodes.promo2

describe('Full booking - OW', () => {

    before('Validate app is ready',async () => {
        await global.isAppReady()
    });

    it('Select destinations', async () => {
        // Click on one way
        await global.clickOn(pageSearch.main.oneWayCheckbox)
        // Select destinations
        await global.destinations_selectByNameOrCode(from, to)
    });

    it('Select dates', async () => {
        await global.calendar_selectFirstAvailableOneWayDate()
    });

    it('Select passengers', async () => {
        await global.passengers_selectPassengers(0, 0, 0, 0)
    });

    // it('Add promo code', async () => {
    //     await global.addPromoCode(promoCode)
    // })

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
    });

    it('Add passenger info', async () => {
        // Expand adult 1 section
        // await global.clickOn(pagePaxInfo.main.adult1_sectionTitleText)
        // Add title
        await global.paxInfo_addTitle()
        // Add names
        await global.paxInfo_addNames()
        // Add phone number
        await global.paxInfo_addPhoneNumber()
        // Add email
        await global.paxInfo_addEmail()
        // Add date of birth (or add age)
        await global.paxInfo_selectBirthDate()
        await global.pause(1000)
        // // Add emergency contact
        // await global.addValue(pagePaxInfo.main.adult1_emergencyContactInput, 'Marlon Brando')
        // // Add emergency phone
        // await global.addValue(pagePaxInfo.main.adult1_emergencyPhoneInput, '456789123')
        // // CLick on emergency phone label (Just to close the keyboard)
        // await global.clickOn(pagePaxInfo.main.adult1_emergencyPhoneLabel)
        // Click on continue
        await global.clickOn(pagePaxInfo.main.continueButton)
    });

    it('Add Ancillary', async () => {

        // ================= Price summary validation =============================================================
        // Get summary price (contains only flights price at this point)
        let flightsPrice = await global.getElementText(pagePriceSummary.main.priceSummaryNumbers)
        // Get first ancillary price
        let firstAncillaryPrice = await global.getElementText(pageAncillary.main.firstAncillaryPriceNumbers)

        // Click on first ancillary add button
        await global.clickOn(pageAncillary.main.firstAncillaryAddButton)

        // Calculate flightsPrice + firstAncillaryPrice (and convert string to number)
        let summaryPlusFirstAncillaryPrice = parseFloat(flightsPrice) + parseFloat(firstAncillaryPrice)
        // Add .00 to the results
        let finalFlightsPlusFirstAncillaryPrice = summaryPlusFirstAncillaryPrice.toFixed(2)

        // Validate updated price summary
        await global.validateElementText(pagePriceSummary.main.priceSummaryNumbers, finalFlightsPlusFirstAncillaryPrice)
        // ================= Price summary validation ============================================================

        // Click on continue button
        await global.clickOn(pageAncillary.main.continueButtonText)
    });

    it('Select seat', async () => {
        await global.pause(2000)
        // Select first available seat
        await global.seats_selectFirstAvailableSeat()
    });

    it('Validate summary page', async () => {
        // Get summary price
        let summaryPrice = await global.getElementText(pagePriceSummary.main.priceSummaryNumbers)
        // Get price breakdown total
        let priceBreakdownTotal = await global.getElementText(pageBookingSummary.main.totalPriceNumbers)

            if (summaryPrice === priceBreakdownTotal) {
                await global.logSuccess(`Price breakdown total: ${priceBreakdownTotal} is equal to Summary price: ${summaryPrice}`)
            }
                else {
                    await global.logError(`Price breakdown total: ${priceBreakdownTotal} is not matching summary price: ${summaryPrice}`);
                }
        // Click on continue button
        await global.clickOn(pageBookingSummary.main.continueButton)
    });

    it('Complete payment', async () => {
        await global.payment_zooz()
    });

});
