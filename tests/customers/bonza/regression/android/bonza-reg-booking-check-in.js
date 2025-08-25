const global = require("../../../../../commands.conf");
const sessionData = require("../../../../../sessionData");

const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaHomePage = require ('../../../../../pages/bonza/page-bonza-home');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaSeatsPage = require ('../../../../../pages/bonza/page-bonza-seats');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaConfirmationPage = require ('../../../../../pages/bonza/page-bonza-confirmation');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');
const bonzaTripsPage = require ('../../../../../pages/bonza/page-bonza-my-trips');

let nAdults = 1;
let nYouths = 1;
let nChildren = 1;
let nInfants = 0;

let firstBooking = {};
let todayDateString = "";
let secondBooking = {};
let futureDateString = "";

// Validate check in countdown title for flights not available for check in.
//
// Validate check in process for available flights for check in
//
// Validate boarding pass in the same/front/back row of their parents

// approach: create one near-present booking and one future booking

describe('Check In', () => {

    it('Establish booking objects and times', async() => {

        let todayDate = new Date();
        todayDateString = todayDate.toISOString().split("T")[0];
        let futureDate = todayDate;
        futureDate = new Date(futureDate.setDate(futureDate.getDate() + 20));
        futureDateString = futureDate.toISOString().split("T")[0];

        firstBooking = {'departDate': todayDateString, 'returnDate': '', 'bookingNumber': ''};
        secondBooking = {'departDate': futureDateString, 'returnDate': '', 'bookingNumber': ''};

    });

    it('Create first booking', async() => {

        await global.logComment(`Proceeding to make first booking, as early as possible: ${todayDateString}`);
        firstBooking = await completeBookingFlow(firstBooking);

    });

    it('Sign in and process first trip', async() => {

        await processMMB(firstBooking);

    });

    it('Create second booking', async() => {

        // restart the app between bookings
        await driver.launchApp();
        await global.logComment(`Proceeding to make second booking: ${futureDateString}`);
        secondBooking = await completeBookingFlow(secondBooking);

    });

    it('Sign in and process second trip', async() => {

        await processMMB(secondBooking);

    });

    async function completeBookingFlow(bookingData) {

        let departDate = bookingData['departDate'];
        let returnDate = departDate;

        await bonzaHomePage.handleInitialPopups();

        await bonzaHomePage.fullFlow('random', 'random', departDate, returnDate, nAdults, nYouths, nChildren, nInfants);

        await bonzaFlightResultsPage.handleFlights(true);

        await bonzaTravellersPage.completePassengerPage(nAdults, nYouths, nChildren, nInfants);

        //await bonzaSeatsPage.handleSeatSelection(nAdults, nYouths, nChildren, true);
        await bonzaSeatsPage.handleSeatSelectionNeo(true, false);

        await bonzaBagsPage.handleBags(nAdults, nYouths, nChildren, nInfants);

        await bonzaReviewBookingPage.handleReviewInformation(nAdults, nYouths, nChildren, nInfants);

        await bonzaReviewBookingPage.handlePayment();

        bookingData['departDate'] = await bonzaHomePage.getDepartDate();
        bookingData['returnDate'] = await bonzaHomePage.getReturnDate();
        bookingData['bookingNumber'] = await bonzaConfirmationPage.getBookingNumber();
        return bookingData;

    };

    async function processMMB(bookingData) {

        if (!await bonzaTripsPage.logIn(bookingData['bookingNumber'], "ADTONELAST")) {
            return;
        }

        let checkInExpected;
        let checkInPossible = await global.checkIsEnabled(bonzaTripsPage.main.checkIn);
        let checkInErrorMessageAddendum;

        let todayDate = new Date();
        let bookingDate = new Date(bookingData['departDate']);
        let timeDifference = bookingDate.getTime() - todayDate.getTime();
        let dayDifference = parseFloat(timeDifference / (1000 * 3600 * 24)).toFixed(2);
        if (dayDifference > 7) {
            await global.logComment(`It is ${dayDifference} day(s) between ${todayDate} and ${bookingDate}, so check-in should not be possible`);
            checkInErrorMessageAddendum = "Check-in was actually possible";
            checkInExpected = false;
        } else {
            await global.logComment(`It is ${dayDifference} day(s) between ${todayDate} and ${bookingDate}, so check-in should be possible`);
            checkInErrorMessageAddendum = "Check-in was actually not possible";
            checkInExpected = true;
        };

        if (checkInPossible === checkInExpected) {
            await global.logSuccess("Check-in availability was as expected");
        } else {
            await global.logError("Check-in availability was not as expected - " + checkInErrorMessageAddendum);
        }

        await bonzaTripsPage.checkInformation();

    }

});
