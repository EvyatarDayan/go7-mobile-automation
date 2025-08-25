const global = require("../../../../../commands.conf");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaSeatsPage = require ('../../../../../pages/bonza/page-bonza-seats');
const { By } = require("selenium-webdriver");

let departDate = '2023-09-10';
let returnDate = '2023-09-13';

describe('Passenger Types', () => {

    it('Check valid passenger selections', async() => {

        // Click yes in update popup if exists
        await global.clickIfExists(bonzaMainPage.main.updateNoButton, 5000);
        // Temp alert
        await global.clickIfExists('//android.view.ViewGroup[@content-desc="button__click"]/android.view.ViewGroup');
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton);
        // Click on from button
        await global.clickOn(bonzaBookTripPage.bookTrip.fromButton);
        // Select from location
        await global.pause(1000);
        await global.destinations_selectFromByName('BDB');
        // Select to location
        await global.pause(1000);
        await global.destinations_selectToByName('MEL');

        departDate = await global.homePage_selectDepartDate(departDate);
        returnDate = await global.homePage_selectReturnDate(departDate, returnDate);

        // Click on confirm dates
        await global.homePage_confirmDates();

        // Select passengers - final argument removes sanity check (and allows invalid input)
        let validationDesired = {'adt': 0, 'yth': 1, 'chd': 0, 'inf': 0};
        //  1. Children + Infants cannot be selected unless adult is selected.
        // this should result in only one YTH being selected

        await global.homePage_selectPassengers(0, 1, 1, 1, true, validationDesired);
        await global.homePage_resetPassengers();
        //  2. One infant can be selected per adult (no more)
        // Select passengers - final argument removes sanity check (and allows invalid input)
        validationDesired = {'adt': 3, 'yth': 0, 'chd': 0, 'inf': 3};
        // this should result in only three INFs being selected
        await global.homePage_selectPassengers(3, 0, 0, 4, true, validationDesired);
        await global.homePage_resetPassengers();

        // now proceeding forward
        await global.homePage_selectPassengers(1, 0, 1, 0);

        // Click on confirm travellers button
        console.log("Selected passenger count:");
        console.log(await global.homePage_getFinalPassengerCount());
        console.log("");
        await global.pause(1000);
        await global.clickOn(bonzaBookTripPage.bookTrip.confirmTravellersButton);

        // Click on show flights
        await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton);
        await global.pause(2000);

    });

    it('Transition to seats', async() => {

        // Departing flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton);
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton);
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton);

        // Returning flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton);
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton);
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton);

        // travellers' details

        await bonzaTravellersPage.fillPassengerInfo(1, 0, 1, 0);

        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton);

    });

    it('Test seats rules', async() => {

        // seats

        await global.pause(5000);

        let rows = await bonzaSeatsPage.determineSeats();

        if (rows.length > 2) {

            // put ADT on row 0 and CHD on row 2 - should fail.
            let adtSeat = rows[0][0];
            let chdSeat = rows[2][0];
            await bonzaSeatsPage.selectSeats([adtSeat, chdSeat]);
            await global.pause(1000, true);
            await global.clickOn(bonzaSeatsPage.main.nextFlightButton);
            await global.waitForElement(bonzaSeatsPage.main.pleaseChangeSeatsHeader);
            await global.clickOn(bonzaSeatsPage.main.pleaseChangeSeatsButton);
            // TODO: improvement - also test that it works normally

        } else {

            // TODO: this will be fixed with improvements of seat behaviour
            await global.logError("Insufficient rows to test seat behaviour");

        }

        //  Seat selection travelers restrictions:
        //
        //  Children need to sit in the same/front/back row of their parents

    });

});