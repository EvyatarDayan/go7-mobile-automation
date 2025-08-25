const global = require("../../commands.conf");
const sessionData = require("../../sessionData");
const bonzaSeatsPage = require("./page-bonza-seats");
const bonzaFlightResultsPage = require("./page-bonza-flight-results");

const title = '//*[contains(@text, "Add Bags")]';
const kgBag_15 = '//android.widget.TextView[@text="0"]';
const kgBag_15_1 = '//android.widget.CheckedTextView[@text="1"]';
//const price = '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[6]';
const price = '//*[contains(@text, "AUD")]';
const skipForNow = '//*[contains(@text, "Skip for now")]';
const nextCustomerButton = '//*[contains(@text, "Next customer")]'
const nextFlightButton = '//*[contains(@text, "Next flight")]';
const reviewBookingButton = '//*[contains(@text, "Review booking")]';
//const continueToPaymentButton = '~btn_add-on-bags';
const continueToPaymentButton = '//*[contains(@text, "Continue to Payment")]';

const departBagsPrice = [];
const returnBagsPrice = [];
const flightsAndSeatsAndBagsPrice = [];
const allBagsPrice = [];
const finalPrice = [];

async function selectBags(nAdults, nYouths, nChildren, nInfants) {

    let nPassengers = nAdults + nYouths + nChildren;  // infants do not have bags

    // Click on Add bags button - necessary for some reason
    await global.clickOn(title);
    await global.pause(1000, true);

    for (let i = 1; i < nPassengers; i++) {

        // doesn't try to click "next customer" on final one, as it will be "next flight"

        // bag selection

        await global.clickOn(nextCustomerButton);
        await global.pause(1000, true);
        
    }

    // Expand 15kgBag list
    //await global.clickOn(kgBag_15);
    // Select 1
    //await global.clickOn(kgBag_15_1);

    await extractPrice("outbound");

    if (await sessionData.isReturnFlight()) {

        // Click on next flight
        await proceedAndHandlePopUpIfNecessary(nextFlightButton);
        await global.pause(1000, true);

        for (let i = 0; i < nPassengers; i++) {

            // selecting bags

            if (i < nPassengers - 1) {

                // doesn't try to click "next customer" on final one, as it will be "next flight"
                await global.clickOn(nextCustomerButton);
                await global.pause(1000, true);

            }

        }
        //await global.pause(1000);
        // Expand 15kgBag list (second flight)
        //await global.clickOn(kgBag_15);
        // Select 1
        //await global.clickOn(kgBag_15_1);

        await extractPrice("inbound");

    }

}

async function proceedAndHandlePopUpIfNecessary(proceedButton) {

    await global.clickOn(proceedButton);
    if (await global.waitForElement(skipForNow, 2000, 1, true)) {
        await global.clickOn(skipForNow);
        await global.pause(1500);
    }

}

async function endBags() {

    await proceedAndHandlePopUpIfNecessary(reviewBookingButton);
    await global.clickOn(continueToPaymentButton);

}
async function handleBags(nAdults, nYouths, nChildren, nInfants) {

    await selectBags(nAdults, nYouths, nChildren, nInfants);
    await endBags();

}

async function extractPrice(flightType) {

    let priceElement = await driver.$(price);

    flightType = flightType.toLowerCase();

    if (flightType === "depart" || flightType === "outbound") {

        departBagsPrice.push((await priceElement.getText()).replace(/[^0-9.]+/g, ''))
        console.log(`Depart bags price is: $${departBagsPrice}`)

    } else {

        returnBagsPrice.push((await priceElement.getText()).replace(/[^0-9.]+/g, ''));
        console.log(`Return bags price is: $${returnBagsPrice}`);

    }

}

async function getPriceSummary() {

    // Get price summry (bottom of the page)
    let priceSummaryElement = driver.$('//android.view.ViewGroup[@content-desc="touchable-opacity__obi__booking-summary__toggle"]/android.view.ViewGroup/android.widget.TextView')
    let priceSummary = (await priceSummaryElement.getText()).replace(/[^0-9.]+/g, '');
    // Summing flight prices + seats + bags
    let calculatedBagsPrice = (parseFloat(departBagsPrice) + parseFloat(returnBagsPrice)).toFixed(2);
    allBagsPrice.push(`$${calculatedBagsPrice}`);

    let departFlightPrice = await global.sumOfArray(bonzaFlightResultsPage.data.departFlightPrice);
    let returnFlightPrice = await global.sumOfArray(bonzaFlightResultsPage.data.returnFlightPrice);
    let departSeatPrice = await global.sumOfArray(bonzaSeatsPage.data.departSeatPrice); 
    let returnSeatPrice = await global.sumOfArray(bonzaSeatsPage.data.returnSeatPrice);

    let calculatedFlightAndSeatsAndBagsPrice = (parseFloat(departFlightPrice) + parseFloat(returnFlightPrice) + parseFloat(departSeatPrice) + parseFloat(returnSeatPrice) + parseFloat(departBagsPrice) + parseFloat(returnBagsPrice)).toFixed(2);
    flightsAndSeatsAndBagsPrice.push(`$${calculatedFlightAndSeatsAndBagsPrice}`);

    // Validate current display price equal to the flights price + seats price + bags price
    if (calculatedFlightAndSeatsAndBagsPrice === priceSummary) {
        await global.logSuccess(`Price summary for flights + seats + bags is correct ($${priceSummary})`);
        finalPrice.push(`${priceSummary}`);
    } else {
        await global.logError(`Price summary for flights + seats + bags is wrong - ${priceSummary} != ${calculatedFlightAndSeatsAndBagsPrice}`);
    }

}

module.exports = {

    main: {
        //title: '//*[@text="Add Bags"]',
        title: title,
        //'15kgBag': '//android.widget.TextView[@text="0"]',
        '15kgBag': kgBag_15,
            //'15kgBag_1': '//android.widget.CheckedTextView[@text="1"]',
            '15kgBag_1': kgBag_15_1,
        //nextFlightButton: '//android.widget.TextView[@text=" Next flight"]',
        //nextFlightButton: '//*[contains(@text, "Next flight")]',
        price: price,
        skipForNow: skipForNow,
        nextCustomerButton: nextCustomerButton,
        nextFlightButton: nextFlightButton,
        reviewBookingButton: '//*[contains(@text, "Review booking")]',
        continueToPaymentButton: '~btn_add-on-bags',
        goBackButton: '~btn_skip-for-now',
        //backButton: '//android.widget.Button[@content-desc="Add Bags, back"]',
        backButton: '//android.widget.Button[@content-desc="back-button"]',
        bagsBackButton: '~Add Bags, back',
    },

    data: {

        departBagsPrice: departBagsPrice,
        returnBagsPrice: returnBagsPrice,
        flightsAndSeatsAndBagsPrice: flightsAndSeatsAndBagsPrice,
        allBagsPrice: allBagsPrice,
        finalPrice: finalPrice

    },

    selectBags,
    proceedAndHandlePopUpIfNecessary,
    endBags,
    handleBags,
    extractPrice,
    getPriceSummary

};