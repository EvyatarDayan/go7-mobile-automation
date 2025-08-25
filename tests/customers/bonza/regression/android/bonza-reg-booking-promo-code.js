const global = require("../../../../../commands.conf");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const data = require("../../../../../data");

let departFlightMainPrice = [];
let departFlightOnlyPrice = [];
let returnFlightMainPrice = [];
let returnFlightOnlyPrice = [];

let departFlightMainPriceAfterPromo = [];
let departFlightMainPriceBeforePromo = [];
let departFlightOnlyFlightPriceWithPromo = [];
let returnFlightMainPriceAfterPromo = [];
let returnFlightMainPriceBeforePromo = [];
let returnFlightOnlyFlightPriceWithPromo = [];

let promoCode = data.bonza_coupons.PROD.PROMO1;       // This promo code grant 30% discount to all services

describe('Flight search using promo code', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Flight search',async ()=>{
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton)

        // Select valid location and date
        await global.selectRoundTripLocationAndDate()

        // Select passengers
        await global.homePage_selectPassengers(1, 0, 0, 0);

        // Click on show flights
        await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton)
        await global.pause(2000)
    });

    it('Check depart flight price without promo code',async ()=> {
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)

//============================================================================================================
                    // Extract departFlightMainPrice
                    let departFlightMainPriceElement = await driver.$('//android.view.ViewGroup[@content-desc="flight_depart"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[2]');
                    departFlightMainPrice.push((await departFlightMainPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`departFlightMainPrice is: $${departFlightMainPrice}`)

                    // Extract departFlightOnlyPrice
                    let departFlightOnlyFlightPriceElement = await driver.$('//android.view.ViewGroup[@content-desc="flight_fare_0"]/android.view.ViewGroup/android.widget.TextView[2]');
                    departFlightOnlyPrice.push((await departFlightOnlyFlightPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`departFlightOnlyPrice is: $${departFlightOnlyPrice}`)
//============================================================================================================

        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)
    });

    it('Check return flight price without promo code',async ()=>{
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)

//============================================================================================================
                    // Extract returnFlightMainPrice
                    let returnFlightMainPriceElement = await driver.$('(//android.view.ViewGroup[@content-desc="flight_depart"])[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[2]');
                    returnFlightMainPrice.push((await returnFlightMainPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`returnFlightMainPrice is: $${returnFlightMainPrice}`)

                    // Extract returnFlightOnlyPrice
                    let returnFlightOnlyFlightPriceElement = await driver.$('(//android.view.ViewGroup[@content-desc="flight_fare_0"])[1]/android.view.ViewGroup/android.widget.TextView[2]');
                    returnFlightOnlyPrice.push((await returnFlightOnlyFlightPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`returnFlightOnlyPrice is: $${returnFlightOnlyPrice}`)
//============================================================================================================

        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)
    });

    it('Go back to flight search and add promo code',async ()=> {
        // Click on device back button several times
        await global.multipleBack(3)
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton)
        // Add promo code
        await global.addValue(bonzaBookTripPage.bookTrip.promoCodeInput, promoCode)
        await global.pause(2000)
        // Click on show flights
        await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton)
        await global.pause(2000)
    });

    it('Check depart flight price with promo code',async ()=>{
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)

//============================================================================================================
                    // Extract departFlightMainPriceAfterPromo
                    let departFlightMainPriceAfterPromoElement = await driver.$('//android.view.ViewGroup[@content-desc="flight_depart"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[1]');
                    departFlightMainPriceAfterPromo.push((await departFlightMainPriceAfterPromoElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`departFlightMainPriceAfterPromo is: $${departFlightMainPriceAfterPromo}`)

                    // Extract departFlightMainPriceBeforePromo
                    let departFlightMainPriceBeforePromoElement = await driver.$('//android.view.ViewGroup[@content-desc="flight_depart"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[3]');
                    departFlightMainPriceBeforePromo.push((await departFlightMainPriceBeforePromoElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`departFlightMainPriceBeforePromo is: $${departFlightMainPriceBeforePromo}`)

                    // Extract departFlightOnlyFlightPriceWithPromo
                    let departFlightOnlyFlightPriceWithPromoElement = await driver.$('//android.view.ViewGroup[@content-desc="flight_fare_0"]/android.view.ViewGroup/android.widget.TextView[2]');
                    departFlightOnlyFlightPriceWithPromo.push((await departFlightOnlyFlightPriceWithPromoElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`departFlightOnlyFlightPriceWithPromo is: $${departFlightOnlyFlightPriceWithPromo}`)

                    // Calculate promo code 30% reduce from original price
                    let departFlightCalculationAfterPromo = (departFlightMainPrice * 70 / 100);      // Calculate the new price
                    let priceCalculationToString = String(departFlightCalculationAfterPromo)     // Revert result to string
                    let departFinalPriceCalculation = priceCalculationToString.padEnd(5, '0')     // Add '0' to the result
                    console.log(`departFinalPriceCalculation is: $${departFinalPriceCalculation}`);
//============================================================================================================

        // Validate new flight price (including the promo)
        if (parseFloat(departFlightMainPriceAfterPromo) === parseFloat(departFinalPriceCalculation)) {
            console.log(clc.green(`✅  departFinalPriceCalculation is correct: $${departFinalPriceCalculation}`))
        }
            else {
                throw new Error(`🆘  departFinalPriceCalculation is wrong!!! - departFlightMainPriceAfterPromo is: ${departFlightMainPriceAfterPromo} Calculation of the new price is: ${departFinalPriceCalculation}`);
            }

            // Valdate old flight price (Not including the promo)
            if (parseFloat(departFlightMainPriceBeforePromo) === parseFloat(departFlightMainPrice)) {
                console.log(clc.green(`✅  departFlightMainPriceBeforePromo is correct $${departFlightMainPriceBeforePromo}`))
            }
                else {
                    throw new Error(`🆘  departFlightMainPriceBeforePromo is wrong!!! - departFlightMainPriceBeforePromo is: ${departFlightMainPriceBeforePromo}`);
                }

                // validate new flight price (Flight only price)
                if (parseFloat(departFlightOnlyFlightPriceWithPromo) === parseFloat(departFinalPriceCalculation)) {
                    console.log(clc.green(`✅  departFlightOnlyFlightPriceWithPromo is correct $${departFlightOnlyFlightPriceWithPromo}`))
                }
                    else {
                        throw new Error(`🆘  departFlightOnlyFlightPriceWithPromo is wrong!!!`);
                    }

        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)
    });

    it('Check return flight price with promo code',async ()=>{
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)

//============================================================================================================
                    // Extract returnFlightMainPriceAfterPromo
                    let returnFlightMainPriceAfterPromoElement = await driver.$('(//android.view.ViewGroup[@content-desc="flight_depart"])[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[1]');
                    returnFlightMainPriceAfterPromo.push((await returnFlightMainPriceAfterPromoElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`returnFlightMainPriceAfterPromo is: $${returnFlightMainPriceAfterPromo}`)

                    // Extract returnFlightMainPriceBeforePromo
                    let returnFlightMainPriceBeforePromoElement = await driver.$('(//android.view.ViewGroup[@content-desc="flight_depart"])[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[3]');
                    returnFlightMainPriceBeforePromo.push((await returnFlightMainPriceBeforePromoElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`returnFlightMainPriceBeforePromo is: $${returnFlightMainPriceBeforePromo}`)

                    // Extract returnFlightOnlyFlightPriceWithPromo
                    let returnFlightOnlyFlightPriceWithPromoElement = await driver.$('(//android.view.ViewGroup[@content-desc="flight_fare_0"])[2]/android.view.ViewGroup/android.widget.TextView[2]');
                    returnFlightOnlyFlightPriceWithPromo.push((await returnFlightOnlyFlightPriceWithPromoElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`returnFlightOnlyFlightPriceWithPromo is: $${returnFlightOnlyFlightPriceWithPromo}`)

                    // Calculate promo code 30% reduce from original price
                    let returnFlightCalculationAfterPromo = (returnFlightMainPrice * 70 / 100);      // Calculate the new price
                    let priceCalculationToString = String(returnFlightCalculationAfterPromo)     // Revert result to string
                    let returnFinalPriceCalculation = priceCalculationToString.padEnd(5, '0')     // Add '0' to the result
                    console.log(`returnFinalPriceCalculation is: $${returnFinalPriceCalculation}`);
//============================================================================================================

        // Validate new flight price (including the promo)
        if (parseFloat(returnFlightMainPriceAfterPromo) === parseFloat(returnFinalPriceCalculation)) {
            console.log(clc.green(`✅  returnFinalPriceCalculation is correct: $${returnFinalPriceCalculation}`))
        }
        else {
            throw new Error(`🆘  returnFinalPriceCalculation is wrong!!! - returnFlightMainPriceAfterPromo is: ${returnFlightMainPriceAfterPromo} Calculation of the new price is: ${returnFinalPriceCalculation}`);
        }

            // Valdate old flight price (Not including the promo)
            if (parseFloat(returnFlightMainPriceBeforePromo) === parseFloat(returnFlightMainPrice)) {
                console.log(clc.green(`✅  returnFlightMainPriceBeforePromo is correct $${returnFlightMainPriceBeforePromo}`))
            }
            else {
                throw new Error(`🆘  returnFlightMainPriceBeforePromo is wrong!!! - returnFlightMainPriceBeforePromo is: ${returnFlightMainPriceBeforePromo}`);
            }

                // validate new flight price (Flight only price)
                if (parseFloat(returnFlightOnlyFlightPriceWithPromo) === parseFloat(returnFinalPriceCalculation)) {
                    console.log(clc.green(`✅  returnFlightOnlyFlightPriceWithPromo is correct $${returnFlightOnlyFlightPriceWithPromo}`))
                }
                else {
                    throw new Error(`🆘 returnFlightOnlyFlightPriceWithPromo is wrong!!!`);
                }
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)
    });
});
