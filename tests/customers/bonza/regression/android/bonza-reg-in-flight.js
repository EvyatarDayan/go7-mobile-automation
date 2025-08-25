const global = require("../../../../../commands.conf");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaHomePage = require ('../../../../../pages/bonza/page-bonza-home');

// 1. Test find a flight dialog

describe('In Flight', () => {

    it('Startpoint', async () => {

        await bonzaHomePage.handleInitialPopups();

    });

    it('Testing "Find Flights"', async () => {

        // flight selection
        await global.scrollByKeyPress("d", 2);

        let testedLocations = [];
        let noNewLocations = false;  // starting state
        let loopIndex = 0;
        let location = "";
        let flightsSelector = "";
        let openPanelNeeded = false;

        while (!noNewLocations) {

            noNewLocations = true;  // if no new ones are found, the loop will ultimately terminate

            // select departure airport
            if (loopIndex > 0) {
                flightsSelector = `//android.widget.TextView[@text="${location}"]`;  // this is redundant but makes the intent clear
                await global.clickOn(flightsSelector, true);
            } else {
                await global.clickOn(bonzaMainPage.main.selectDepartureAirportDropDown, true);
            }
            await global.pause(1000, true);

            for (let x = 0; x < loopIndex; x++) {

                // if loop is above 0, scroll list
                await global.scrollTo(750, 2200, 750, 875, true);
                await global.pause(1000, true);

            }

            let locationArray = [];
            //let allLocationElements = await driver.$$('//android.widget.ScrollView[@content-desc="touchable-opacity__ibe__inbound-airport-select"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView')
            let allLocationElements = await driver.$$(bonzaMainPage.main.departureAirportElements);
            locationArray = await Promise.all(allLocationElements.map(async (element) => {
                return element.getText();
            }));

            await global.logComment("Locations found:");
            console.log(locationArray);

            // testing each, one by one

            flightsSelector = `//android.widget.TextView[@text="${locationArray[0]}"]`;
            
            for (let i = 0; i < locationArray.length; i++) {

                if (i > 0 && openPanelNeeded) {
                    // //android.widget.TextView[@text="Rockhampton (ROK)"]
                    // need to construct a new selector as it won't have its default value of "Select" anymore - it will be the last location
                    flightsSelector = `//android.widget.TextView[@text="${location}"]`;  // this is redundant but makes the intent clear
                    await global.clickOn(flightsSelector, true);
                    await global.pause(1000, true);

                    for (let x = 0; x < loopIndex; x++) {

                        // if loop is above 0, scroll list
                        await global.scrollFlightWindow("d", loopIndex);
                        await global.pause(1000, true);
        
                    }

                }

                openPanelNeeded = false;

                location = locationArray[i];

                if (!testedLocations.includes(location)) {

                    flightsSelector = `//android.widget.TextView[@text="${location}"]`;
                    await global.clickOn(flightsSelector, true);
                    await global.logComment(`Departure clicked: ${location}`);
                    await global.pause(1000, true);
                    await global.clickOn(bonzaMainPage.main.findFlightsButton, true);
                    await global.pause(1000, true);
                    // validating the 'from' text
                    let departureAirport = await global.getElementText(bonzaHomePage.main.fromValue, true);
                    // location is a bit longer, e.g.:
                    // Sunshine Coast (MCY)
                    // Sunshine Coast
                    let locationSplit = location.split(" (");
                    let shortenedLocation = "";
                    for (let x = 0; x < locationSplit.length - 1; x++) {
                        if (x > 0) {
                            shortenedLocation += " (";
                        }
                        shortenedLocation += locationSplit[x];
                    }
                    if (shortenedLocation === departureAirport) {
                        await global.logSuccess("Departure airport matches selection");
                    } else {
                        await global.logError(`Disagreement between selected airport ${shortenedLocation} and appearing departure airport ${departureAirport}`);
                    }
                    // returning to main page
                    await global.logComment("Returning to main page...");
                    await global.clickOn(bonzaMainPage.toolbar.backButton, true);
                    await global.pause(2000, true);

                    testedLocations.push(location);
                    noNewLocations = false;  // a new location was found, continue
                    openPanelNeeded = true;

                }

            }

            loopIndex++;

            if (loopIndex > 10) {

                await global.logError("Flight check seems to be infinitely looping");
                break;

            }

        }

    });

});
