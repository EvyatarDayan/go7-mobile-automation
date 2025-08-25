const global = require("../../../../../commands.conf");
const sessionData = require("../../../../../sessionData");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaHomePage = require ('../../../../../pages/bonza/page-bonza-home');
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaSeatsPage = require('../../../../../pages/bonza/page-bonza-seats');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');
const bonzaConfirmationPage = require('../../../../../pages/bonza/page-bonza-confirmation');
const bonzaTripsPage = require ('../../../../../pages/bonza/page-bonza-my-trips');
const { By } = require("selenium-webdriver");

let departDate;

let nAdults = 1;
let nYouths = 1;
let nChildren = 1;
let nInfants = 0;

let selectedSeats;
let bookingNumber;

describe('Seats selection', () => {

    it('Initial setup - get to seats - phase 1', async() => {

        let todayDate = new Date();
        todayDateString = todayDate.toISOString().split("T")[0];
        let futureDate = todayDate;
        futureDate = new Date(futureDate.setDate(futureDate.getDate() + 20));
        futureDateString = futureDate.toISOString().split("T")[0];
        departDate = futureDateString;

        await bonzaHomePage.fullFlow('random', 'random', departDate, departDate, nAdults, nYouths, nChildren, nInfants);  // setting both dates to the same will make return date be selected automatically

        await bonzaFlightResultsPage.handleFlights(true);

        await bonzaTravellersPage.completePassengerPage(nAdults, nYouths, nChildren, nInfants);

    });

    it('Seat selection tests - phase 1', async() => {

        // 8. Validate the correct flight locations display

        //await global.waitForElement('//*[@text="Bundaberg  BDB  0  Melbourne (Tullamarine)  MEL"]');

        // seats

        await bonzaSeatsPage.handleSeatSelection(nAdults, nYouths, nChildren, true);

        //await global.waitForElement('//*[@text="Melbourne (Tullamarine)  MEL  0  Bundaberg  BDB"]');

        let seatCoordinates = await bonzaSeatsPage.getSeatCoordinates();

        // 1. Validate taken seats cannot be selected
        // TODO: currently this just deselects seats for the current passenger, is that intentional? Odd.
        // attempting to make the currently selected passenger try to steal the seat of the one prior

        // 6. Validate selecting a seat adds the correct amount to the total line

        await global.logComment("Testing whether you can select an already allocated seat - this should only deselect the current child's");
        let firstSeats = await bonzaSeatsPage.getSeatAssignments();
        // [ '2C', '2E', '2D', '2A', '3A', '2B' ]
        await global.clickByCoordinates(seatCoordinates['return'][1]['x'], seatCoordinates['return'][1]['y']);
        await global.pause(1000, true);
        let priorTotal = await global.extractNumber(await bonzaSeatsPage.getTotal());
        let secondSeats = await bonzaSeatsPage.getSeatAssignments();
        // [ '2C', '2E', 'Unselected', '2A', '3A', '2B' ]
        // TODO: see note above, this part will likely need to be changed when behaviour is clarified
        for (let i = 0; i < secondSeats.length; i++) {

            if (secondSeats[i] === "Unselected") {

                if (i == 2) {
                    await global.logSuccess("Only present child's seat was unselected");
                } else {
                    await global.logError(`Another seat was unselected - ${i + 1}`);
                }

            }

        }

        // 2. Validate selecting 2 seats cancel the first seat selection
        let vacantRows = await bonzaSeatsPage.determineSeats();
        await global.pause(1000);
        await global.logComment("Now selecting a new seat, with the intention of changing it again...");
        await global.clickByCoordinates(vacantRows[0][0]['x'], vacantRows[0][0]['y']);
        await global.pause(1000, true);
        let secondTotal = await global.extractNumber(await bonzaSeatsPage.getTotal());

        // finishing validating whether seat price is added
        let expectedDifference = await bonzaSeatsPage.getModePriceChosen();
        expectedDifference = expectedDifference.replace("$", "");
        if (Math.abs(secondTotal - priorTotal) == expectedDifference) {
            await global.logSuccess(`Total was successfully updated with the seat value of ${expectedDifference}`);
        } else {
            await global.logError(`Total was not updated with the seat value of ${expectedDifference} - ${priorTotal} vs ${secondTotal}`);
        }

        firstSeats = await bonzaSeatsPage.getSeatAssignments();
        await global.pause(1000, true);
        vacantRows = await bonzaSeatsPage.determineSeats();
        await global.pause(1000);
        await global.clickByCoordinates(vacantRows[0][1]['x'], vacantRows[0][1]['y']);
        let estimatedLetter = await bonzaSeatsPage.getEstimatedColumnLetter(vacantRows[0][1]['x']);
        await global.pause(1000);
        secondSeats = await bonzaSeatsPage.getSeatAssignments();
        if (firstSeats[2] != secondSeats[2]) {
            await global.logSuccess(`Seat successfully changed from ${firstSeats[2]} to ${secondSeats[2]}`);
        } else {
            await global.logError(`Seat did not change from ${firstSeats[2]} to ${secondSeats[2]}`);
        }

        // 5. Validate selected seat display the correct label under the passenger name
        // guessing Y row is harder, and likely to be solved with IDs etc, so leaving it at letter only for now

        if (secondSeats[2].includes(estimatedLetter)) {
            await global.logSuccess(`Letter label is correct`);
        } else {
            await global.logError(`Letter label is wrong - expected ${secondSeats[2]} to contain ${estimatedLetter}`);
        }

        // easiest just to start again to test the remaining ones

        await global.logComment("Now restarting application to simplify remaining tests with one ADT only");

        driver.launchApp();
        await global.pause(5000);

        await bonzaHomePage.handleInitialPopups();

    });

    it('Initial setup - get to seats - phase 2', async() => {

        // now we are no longer testing specific seat arrangements, we can simplify it

        nAdults = 1;
        nYouths = 0;
        nChildren = 0;
        nInfants = 0;

        await bonzaHomePage.fullFlow('random', 'random', departDate, departDate, nAdults, nYouths, nChildren, nInfants);  // setting both dates to the same will make return date be selected automatically

        await bonzaFlightResultsPage.handleFlights(true);
        
        await bonzaTravellersPage.completePassengerPage(nAdults, nYouths, nChildren, nInfants);

    });

    it('Seat selection tests - phase 2', async() => {

        // 3. Validate not selecting any seat and getting the dialog with option to:
        //
        //     a. Return and add seat
        //
        //     b. Skip

        // 9. Validate you can select seats:
        //
        //     a. Both flights
        //
        //     b. Only the first
        //
        //     c. Only the second
        //
        //     d. None

        // checking the "Please select seat" dialogue appears for either page

        await global.logComment("Attempting to proceed selecting seats - outbound: no, inbound: no");

        await tryToProceed(true, false);
        await global.pause(1000, true);
        await tryToProceed(true, true);

        await global.clickOn(bonzaBagsPage.main.backButton, true);
        await global.pause(2000);

        await global.logComment("Attempting to proceed selecting seats - outbound: no, inbound: yes");
        let vacantRows = await bonzaSeatsPage.determineSeats();
        let seatX = vacantRows[0][0]['x'];
        let seatY = vacantRows[0][0]['y'];
        await global.clickByCoordinates(seatX, seatY);
        await global.pause(1000);

        await tryToProceed(false, true);

        await global.clickOn(bonzaBagsPage.main.backButton, true);
        await global.pause(2000);

        await global.logComment("Attempting to proceed selecting seats - outbound: yes, inbound: no");
        await global.clickByCoordinates(seatX, seatY);  // deselecting prior seat for inbound
        await global.pause(1000);

        await global.clickOn(bonzaSeatsPage.main.changeSeatsBackButton, true);
        await global.pause(2000);

        // now selecting outbound seat
        vacantRows = await bonzaSeatsPage.determineSeats();
        seatX = vacantRows[0][0]['x'];
        seatY = vacantRows[0][0]['y'];
        await global.clickByCoordinates(seatX, seatY);
        await global.pause(1000);

        await tryToProceed(false, true);
        await global.pause(1000, true);
        await tryToProceed(true, true);

        await global.clickOn(bonzaBagsPage.main.backButton, true);
        await global.pause(2000);

        // now just entering an inbound seat choice to finish
        await global.logComment("Attempting to proceed selecting seats - outbound: yes, inbound: yes");

        vacantRows = await bonzaSeatsPage.determineSeats();
        seatX = vacantRows[0][0]['x'];
        seatY = vacantRows[0][0]['y'];
        await global.clickByCoordinates(seatX, seatY);
        await global.pause(1000);

        selectedSeats = await bonzaSeatsPage.getSelectedSeats(true);
        await sessionData.setAssignedSeatsData(selectedSeats);

        await tryToProceed(false, true);

    });

    it('Completing booking and opening it in "My Trips"', async() => {

        // complete booking

        await bonzaBagsPage.selectBags(nAdults, nYouths, nChildren, nInfants);

        await bonzaBagsPage.endBags();

        await bonzaReviewBookingPage.handleReviewInformation(nAdults, nYouths, nChildren, nInfants);

        await bonzaReviewBookingPage.handlePayment();

        bookingNumber = await bonzaConfirmationPage.getBookingNumber();

        if (!await bonzaTripsPage.logIn(bookingNumber, "ADTONELAST")) {
            return;
        }

        await bonzaTripsPage.checkInformation();

        // Validate check in countdown title for flights not available for check in.
        //
        // Validate check in process for available flights for check in
        //
        // Validate boarding pass in the same/front/back row of their parents

    });

    async function tryToProceed(popupExpected, bagsPageExpected) {

        // return boolean is whether it proceeded to the bags page or not

        let operativeSelector = "";

        if (global.waitForElement(bonzaSeatsPage.main.nextFlightButton, 1000, 1, true)) {
            operativeSelector = bonzaSeatsPage.main.nextFlightButton;
        } else if (global.waitForElement(bonzaSeatsPage.main.nextScreenButton, 1000, 1, true)) {
            operativeSelector = bonzaSeatsPage.main.nextScreenButton;
        } else {
            await global.logError("Neither \"Next Flight\" or \"Add Bags\" appears to be present on the seats page");
            return false;
        };

        await global.clickOn(operativeSelector, true);

        if (await global.waitForElement(bonzaSeatsPage.main.pleaseSelectSeatOnEmpty, 2500, 1, true)) {

            if (popupExpected) {
                await global.logComment("\"Please select seat\" popup appeared");
            } else {
                await global.logError("\"Please select seat\" popup appeared");
            }
            await global.clickOn(bonzaSeatsPage.main.skipForNowButtonOnEmpty);

        };

        if (!await global.waitForElement(bonzaSeatsPage.main.title, 2500, 1, true)) {

            if (bagsPageExpected) {
                await global.logSuccess("Successfully proceeded to bags page");
            } else {
                await global.logError("Proceeded to bags page");
            }

            return true;
            
        }

        return false;

    }

});