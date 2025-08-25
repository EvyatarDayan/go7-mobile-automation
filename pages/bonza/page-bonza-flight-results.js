const global = require("../../commands.conf");
const sessionData = require("../../sessionData");

const soldOut = '//*[contains(@text, "Flight sold out for the given search criteria")]';
const showPricesButton = '//*[contains(@text, "Show prices from")]';
const firstFlightFareButton = '//android.widget.TextView[@text="Flight only"]';
//const firstFlightFareSelectFareButton = '//*[contains(@content-desc, "btn__select-fare_display")]';
const firstFlightFareSelectFareButton = '(//*[contains(@text, "Select fare")])[2]';
const passengersPageHeader = '//*[contains(@text, "Who\'s travelling?")]';

const departFlightPrice = [];
const returnFlightPrice = [];
const allFlightsPrice = [];

async function selectFlight() {

    // check for fatal error (flight has sold out)
    if (await global.waitForElement(soldOut, 2000, 1, true)) {
        await global.logError("Flight sold out for the given search criteria");
    }

    // Click on show prices
    await global.enhancedClickOn(showPricesButton);
    // Expand first flight fare details
    await global.clickOn(firstFlightFareButton);
    // scrolling
    await global.scrollViaUIScrollable("d");
    // Click on select fare button
    await global.enhancedClickOn(firstFlightFareSelectFareButton);

}

async function handleFlights() {

    await selectFlight();
    if (await sessionData.isReturnFlight()) {
        await selectFlight();
    }

    await global.pause(1000, true);

    await checkEndOfFlightsPage();

}

async function checkEndOfFlightsPage() {

    let timeTaken = 0;
    let timeout = 60;
    let firstError = true;

    while (!await global.waitForElement(passengersPageHeader, 1000, 1, true)) {

        if (timeTaken > 10 && firstError) {
            await global.logComment(`Loading is likely to be present - waiting for a maximum of ${timeout} seconds`);
            firstError = false;
        }

        await global.pause(1000, true);

        timeTaken++;

        if (timeTaken > timeout) {

            await global.logError(`Passengers page did not load in ${timeout} seconds`);
            return;

        }

    }

    if (timeTaken > 0) {
        await global.logComment(`Transitioned to next page in less than ${timeTaken} seconds`);
    }

}

async function extractPrice(flightType) {

    flightType = flightType.toLowerCase();

    let flightPriceElement = await driver.$('//*[@resource-id="bundle__price"]');
    if (flightType === "depart" || flightType === "outbound") {
        departFlightPrice.push((await flightPriceElement.getText()).replace(/[^0-9.]+/g, ''))
        console.log(`Depart flight price is: $${departFlightPrice}`);
    } else {
        returnFlightPrice.push((await flightPriceElement.getText()).replace(/[^0-9.]+/g, ''))
        console.log(`Return flight price is: $${returnFlightPrice}`);
    }

}

async function getFlightSummary() {

    // Get price summary (bottom of the page)
    let priceSummaryElement = driver.$('//android.view.ViewGroup[@content-desc="touchable-opacity__obi__booking-summary__toggle"]/android.view.ViewGroup/android.widget.TextView');
    let priceSummary = (await priceSummaryElement.getText()).replace(/[^0-9.]+/g, '');
    // Summing both flight prices
    let calculatedFlightPrice = (parseFloat(departFlightPrice) + parseFloat(returnFlightPrice)).toFixed(2);
    allFlightsPrice.push(`$${calculatedFlightPrice}`);

    // Validate current display price equal to the flights price calculation
    if (priceSummary === calculatedFlightPrice) {
        await global.logSuccess(`Price summary for flights only is correct ($${priceSummary})`);
    } else {
        await global.logError(`Price summary for flights only is wrong - ${priceSummary} != ${calculatedFlightPrice}`);
    }

}

module.exports = {

    main: {

        soldOut: soldOut,
        fromLocationName: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]',
        toLocationName: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[3]',
        fromLocationCodeTitle: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[2]',
        toLocationCodeTitle: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[4]',
        departingDate: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[2]',
        fromLocationCode: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[4]/android.widget.TextView',
        toLocationCode: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[5]/android.widget.TextView',
        flightStartTime: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[3]',
        flightEndTime: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[4]',
        aircraftAndDurationTitle: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[5]',
        firstFlightShowPricesButton: '~flight_depart',
        firstFlightFirstFareButton: '~flight_fare_0',
        firstFlightSelectFareButton: '~select_fare_button_0',
        firstFlightSecondFareButton: '~touchable-opacity__ibe__select-fare__select-bundle',

        //showPricesButton: '~btn__flight-price-per-passenger',
        showPricesButton: showPricesButton,
        firstFlightFareButton: firstFlightFareButton,
        //firstFlightFareSelectFareButton: '~btn__select-fare',
        firstFlightFareSelectFareButton: firstFlightFareSelectFareButton,
        secondFlightFareButton: '//android.widget.TextView[@text="Flight + Bag + Seat"]',
    },

    data: {

        departFlightPrice: departFlightPrice,
        returnFlightPrice: returnFlightPrice,
        allFlightsPrice: allFlightsPrice

    },

    selectFlight,
    handleFlights,
    checkEndOfFlightsPage,
    extractPrice,
    getFlightSummary

};