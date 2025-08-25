
// Check all home links to app functionality
//
// Flight search
//
// Routes
//
// Why fly Bonza link
//
// Terms and conditions

const global = require("../../../../../commands.conf");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaHomePage = require('../../../../../pages/bonza/page-bonza-home');

describe('Home Page', () => {

    it('Regression Test', async () => {

        await bonzaHomePage.handleInitialPopups();

        // =============================================================

        // checking toolbar - might not be related but easy enough?

        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton);
        await global.pause(1000);
        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);

        // Click on "My Trips"
        await global.clickOn(bonzaMainPage.toolbar.myTripsButton);
        await global.pause(1000);
        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);

        // Click on "Routes"
        await global.clickOn(bonzaMainPage.toolbar.holidaysButton);
        await global.pause(1000);
        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);

        // Click on "In-Flight"
        await global.clickOn(bonzaMainPage.toolbar.inFlightButton);
        await global.pause(1000);
        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);

        // Click on "Account"
        await global.clickOn(bonzaMainPage.toolbar.accountButton);
        await global.pause(1000);
        
        // this time using home button to go home
        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);

        // =============================================================

        // stemming from home page
        // flight selection
        await global.scrollByKeyPress("d", 2);
        // select departure airport
        await global.clickOn(bonzaMainPage.main.selectDepartureAirportDropDown);
        await global.pause(1000);

        let locationArray = [];
        //let allLocationElements = await driver.$$('//android.widget.ScrollView[@content-desc="touchable-opacity__ibe__inbound-airport-select"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView')
        let allLocationElements = await driver.$$(bonzaMainPage.main.departureAirportElements);
        locationArray = await Promise.all(allLocationElements.map(async (element) => {
            return element.getText();
        }));

        await global.logComment("Locations found:");
        console.log(locationArray);
        let randomLocationIndex = global.selectRandomIndex(locationArray);
        let randomLocation = locationArray[randomLocationIndex];
        //// +1 since i = 1 is the first element, though array as always starts indexed at x = 0
        //await driver.$(`//android.widget.ScrollView[@content-desc="touchable-opacity__ibe__inbound-airport-select"]/android.view.ViewGroup/android.view.ViewGroup[${randomLocationIndex + 1}]/android.widget.TextView`).click();
        await global.clickOn(allLocationElements[randomLocationIndex]);
        await global.logComment(`Randomly selected departure clicked: ${randomLocation}`);
        await global.pause(1000);
        await global.clickOn(bonzaMainPage.main.findFlightsButton);
        await global.pause(1000);
        // validating the 'from' text
        let departureAirport = await global.getElementText(bonzaHomePage.main.fromValue);
        // randomLocation is a bit longer, e.g.:
        // Sunshine Coast (MCY)
        // Sunshine Coast
        let shortenedRandomLocation = randomLocation.split(" (")[0];
        if (shortenedRandomLocation === departureAirport) {
            await global.logSuccess("Departure airport matches random selection");
        } else {
            await global.logError(`Disagreement between selected airport ${shortenedRandomLocation} and appearing departure airport ${departureAirport}`);
        }
        // returning to main page
        await global.clickOn(bonzaMainPage.toolbar.backButton);
        // NB: position is where it was left, not the start
        await global.scrollByKeyPress("d", 2);

        // routes
        await global.enhancedClickOn(bonzaMainPage.main.destinationsButton);
        //let waitOutcome = await global.waitForElement('//android.view.View[contains(@text, "Routes")]');
        let waitOutcome = await global.waitForElement('//android.view.View[contains(@text, "Holidays")]');
        if (waitOutcome) {
            await global.logSuccess("Routes panel successfully opened from clicking \"View all destinations\"");
        } else {
            await global.logError("Routes panel did not open from clicking \"View all destinations\"");
        }

        // returning to main page
        await global.clickOn(bonzaMainPage.toolbar.backButton);
        // NB: position is where it was left, not the start
        await global.scrollByKeyPress("d", 4);

        // Why Fly Bonza
        await global.enhancedClickOn(bonzaMainPage.main.whyFlyBonzaButton);
        waitOutcome = await global.waitForElement('//android.view.View[contains(@text, "Support")]');
        if (waitOutcome) {
            await global.logSuccess("Routes panel successfully opened from clicking \"Why Fly Bonza\"");
        } else {
            await global.logError("Routes panel did not open from clicking \"Why Fly Bonza\"");
        }

        // returning to main page
        await global.clickOn(bonzaMainPage.toolbar.backButton);
        // NB: position is where it was left, not the start
        await global.scrollByKeyPress("d", 5);  // make sure you're at the very bottom

        // terms and conditions
        // TODO: VERY fragile
        await global.clickByCoordinates(653, 1866);  // hard coded, but it works...
        waitOutcome = await global.waitForElement('//android.view.ViewGroup[@content-desc="btn__close-tc-rules-modal"]');
        if (waitOutcome) {
            await global.logSuccess("Terms and conditions panel successfully opened");
        } else {
            await global.logError("Terms and conditions panel did not open");
        }

    });

});
