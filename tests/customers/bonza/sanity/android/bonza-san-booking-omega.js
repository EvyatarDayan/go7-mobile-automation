const global = require("../../../../../commands.conf");
const sessionData = require("../../../../../sessionData");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaHomePage = require ('../../../../../pages/bonza/page-bonza-home');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaSeatsPage = require ('../../../../../pages/bonza/page-bonza-seats');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');
const bonzaConfirmationPage = require('../../../../../pages/bonza/page-bonza-confirmation');
const { By } = require("selenium-webdriver");
//const { getAttribute } = require("webdriverio/build/commands/element");

let bookingNumber = "";

let departDate = '2023-10-26';
let returnDate = '2023-10-29';
//let emailAddress = 'bonza1@yopmail.com';

let nAdults = 1;
let nYouths = 1;
let nChildren = 1;
let nInfants = 1;

describe('Flight booking', () => {

    it('Flight search', async () => {

        await bonzaHomePage.fullFlow('random', 'random', departDate, returnDate, nAdults, nYouths, nChildren, nInfants);

    });

    it('Flights selection', async () => {

        // Departing flight
        await bonzaFlightResultsPage.selectFlight();

        // Extract depart flight price
        await bonzaFlightResultsPage.extractPrice("outbound");

        // Returning flight
        await bonzaFlightResultsPage.selectFlight();

        // Extract return flight price
        await bonzaFlightResultsPage.extractPrice("inbound");

        await bonzaFlightResultsPage.checkEndOfFlightsPage();
        
    });

    it('Validate current price, flights only', async () => {

        await bonzaFlightResultsPage.getFlightSummary();

    });

    it('Add travellers details', async () => {

        await bonzaTravellersPage.completePassengerPage(nAdults, nYouths, nChildren, nInfants);

    });

    it('Select seats', async () => {   

        //await bonzaSeatsPage.handleSeatSelection(nAdults, nYouths, nChildren, true, true);
        await bonzaSeatsPage.handleSeatSelectionNeo(true, true);

    });

    it('Validate current price, flights + seats', async () => {

        await bonzaSeatsPage.getPriceSummary();

    });

    it('Select bags', async () => {

        await bonzaBagsPage.selectBags(nAdults, nYouths, nChildren, nInfants);

    });

    it('Validate current price, flights + seats + bags', async () => {

        await bonzaBagsPage.getPriceSummary();

    });

    it('End bags page', async () => {

        await bonzaBagsPage.endBags();

    });

    it('Review booking', async () => {

        await bonzaReviewBookingPage.handleReviewInformation(nAdults, nYouths, nChildren, nInfants);

    });

    it('Validate all prices', async () => {

        await bonzaReviewBookingPage.getPriceSummary();

    });

    it('Add payment details', async () => {

        await bonzaReviewBookingPage.handlePayment();

    });

    it('Retrieve confirmation number', async () => {

        bookingNumber = await bonzaConfirmationPage.getBookingNumber();

    });

    it ('Report', async () => {

        await sessionData.printSessionInformation();

    });

});
