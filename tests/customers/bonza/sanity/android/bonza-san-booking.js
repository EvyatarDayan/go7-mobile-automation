const global = require("../../../../../commands.conf");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaFlightResults = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaSeatsPage = require ('../../../../../pages/bonza/page-bonza-seats');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaConfirmationPage = require ('../../../../../pages/bonza/page-bonza-confirmation');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');
const { By } = require("selenium-webdriver");

const departFlightPrice = [];
const returnFlightPrice = [];
const allFlightsPrice = [];
const flightsAndSeatsPrice = [];
const depardSeatPrice = [];
const returnSeatPrice = [];
const allSeatsPrice = [];
const depardBagsPrice = [];
const allBagsPrice = [];
const finalPrice = [];
const bookingNumber = [];

let firstName = 'Marlon';
let lastName = 'Brando';
let address = '12 Florentin st.';
let city = 'Tel Aviv';
let country = 'Israel';
let phoneNumber = 526647788;
let emailAddress = 'bonza1@yopmail.com';
let postcode = 564875;
let cardNumber = '4111 1111 1111 1111';
let cardExpiration = '03/27';
let cardCVC = 425;
let seatNumber = 5;

describe('Flight booking', () => {

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Flight search', async () => {
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton);

        // Select valid location and date
        await global.selectRoundTripLocationAndDate()

        // Select passengers
        await global.homePage_selectPassengers(1, 0, 0, 0);

        // Click on show flights
        await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton);
        await global.pause(2000);
    });

    it('Flights selection', async () => {
        // Departing flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightShowPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFirstFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightSelectFareButton)

//============================================================================================================
                    // Extract depart flight price
                    let departFlightPriceElement = await driver.$('//*[@resource-id="bundle__price"]');
                    departFlightPrice.push((await departFlightPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`Depart flight price is: $${departFlightPrice}`)
//============================================================================================================

        // Returning flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightShowPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFirstFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightSelectFareButton)

//============================================================================================================
                    // Extract return flight price
                    let returnFlightPriceElement = await driver.$('//*[@resource-id="bundle__price"]');
                    returnFlightPrice.push((await returnFlightPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`Return flight price is: $${returnFlightPrice}`)
//============================================================================================================
    });

    it('Validate current price, flights only',async ()=> {
        // Get price summry (bottom of the page)
        let priceSummaryElement = driver.$('//android.view.ViewGroup[@content-desc="touchable-opacity__obi__booking-summary__toggle"]/android.view.ViewGroup/android.widget.TextView')
        let priceSummary = (await priceSummaryElement.getText()).replace(/[^0-9.]+/g, '');
        // Summing both flight prices
        let calculatedFlightPrice = (parseFloat(departFlightPrice) + parseFloat(returnFlightPrice)).toFixed(2);
        allFlightsPrice.push(`$${calculatedFlightPrice}`)

        // Validate current display price equal to the flights price calculation
            if (priceSummary === calculatedFlightPrice) {
                console.log(clc.green(`Price summary for flights only is correct ($${priceSummary})`))
            }
                else {
                    throw new Error(`Price summary is wrong!!!`);
                }
    });

    it('Add travellers details',async ()=>{
        // Add first name
        await global.addValue(bonzaTravellersPage.main.firstTravellerFirstNameInput, firstName)
        // Add last name
        await global.addValue(bonzaTravellersPage.main.firstTravellerLastNameInput, lastName)
        // Click on first traveller accessibility options
        // await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        // await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_HearingImpaired)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
    });

    it('Select seats', async () => {   
        await driver.pause(5000)

//============================================================================================================
                    // Extract depart seat price (and add decimal numbers .00)
                    let departSeatPriceElement = await driver.$(`(//android.view.ViewGroup[@content-desc="seat_valid"])[${seatNumber}]/android.widget.TextView`);
                    depardSeatPrice.push((await departSeatPriceElement.getText()).replace(/[^0-9.]+/g, '').concat('.00'))
                    console.log(`Depart seat price is: $${depardSeatPrice}`)
//============================================================================================================

        // Select departing seat
        await global.clickOn(`(//android.view.ViewGroup[@content-desc="seat_valid"])[${seatNumber}]/android.widget.TextView`)

        // Click on Next flight button
        await global.pause(1000)
        await global.clickOn('//*[@text=" Next flight"]')
        await global.pause(2000)

//============================================================================================================
                    // Extract return seat price (and add decimal numbers .00)
                    let returnSeatPriceElement = await driver.$(`(//android.view.ViewGroup[@content-desc="seat_valid"])[${seatNumber}]/android.widget.TextView`);
                    returnSeatPrice.push((await returnSeatPriceElement.getText()).replace(/[^0-9.]+/g, '').concat('.00'))
                    console.log(`Return seat price is: $${returnSeatPrice}`)
//============================================================================================================

        // Select returning seat
        await global.clickOn(`(//android.view.ViewGroup[@content-desc="seat_valid"])[${seatNumber}]/android.widget.TextView`)
    });

    it('Validate current price, flights + seats',async ()=> {
        // Get price summry (bottom of the page)
        let priceSummaryElement = driver.$('//android.view.ViewGroup[@content-desc="touchable-opacity__obi__booking-summary__toggle"]/android.view.ViewGroup/android.widget.TextView')
        let priceSummary = (await priceSummaryElement.getText()).replace(/[^0-9.]+/g, '');
        // Summing flight prices + seats
        let calculatedSeatsPrice = (parseFloat(depardSeatPrice) + parseFloat(returnSeatPrice)).toFixed(2);
        allSeatsPrice.push(`$${calculatedSeatsPrice}`)
        let calculatedFlightAndSeatsPrice = (parseFloat(departFlightPrice) + parseFloat(returnFlightPrice) + parseFloat(depardSeatPrice) + parseFloat(returnSeatPrice)).toFixed(2);
        flightsAndSeatsPrice.push(`$${calculatedFlightAndSeatsPrice}`)

        // Validate current display price equal to the flights price + seats price
            if (calculatedFlightAndSeatsPrice === priceSummary) {
                console.log(clc.green(`Price summary flights + seats is correct ($${priceSummary})`))
            }
                else {
                    throw new Error(`Price summary is wrong!!!`);
                }
    });

    it('Select bags',async ()=>{
        // Click on Add bags button
        await global.clickOn('//*[@text=" Add Bags"]')
        await global.pause(1000)
        // Expand 15kgBag list
        await global.clickOn(bonzaBagsPage.main["15kgBag"])
        // Select 1
        await global.clickOn(bonzaBagsPage.main["15kgBag_1"])

//============================================================================================================
                    // Extract depart bags price
                    let departBagsPriceElement = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[6]');
                    depardBagsPrice.push((await departBagsPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`Depart bags price is: $${depardBagsPrice}`)
//============================================================================================================

        // Click on next flight
        await global.clickOn(bonzaBagsPage.main.nextFlightButton)
        await global.pause(1000)
        // // Expand 15kgBag list (second flight)
        // await global.clickOn(bonzaBagsPage.main["15kgBag"])
        // // Select 1
        // await global.clickOn(bonzaBagsPage.main["15kgBag_1"])

//============================================================================================================
//                     // Extract return bags price
//                     let returnBagsPriceElement = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[6]');
//                     returnBagsPrice.push((await returnBagsPriceElement.getText()).replace(/[^0-9.]+/g, ''))
//                     console.log(`Return bags price is: $${returnBagsPrice}`)
//============================================================================================================
    });

    it('Validate current price, flights + seats + bags',async ()=> {
        // // Get price summry (bottom of the page)
        // let priceSummaryElement = driver.$('//android.view.ViewGroup[@content-desc="touchable-opacity__obi__booking-summary__toggle"]/android.view.ViewGroup/android.widget.TextView')
        // let priceSummary = (await priceSummaryElement.getText()).replace(/[^0-9.]+/g, '');
        // // Summing flight prices + seats + bags
        // let calculatedBagsPrice = (parseFloat(depardBagsPrice) + parseFloat(returnBagsPrice)).toFixed(2);
        // allBagsPrice.push(`$${calculatedBagsPrice}`)
        //
        // let calculatedFlightAndSeatsAndBagsPrice = (parseFloat(departFlightPrice) + parseFloat(returnFlightPrice) + parseFloat(depardSeatPrice) + parseFloat(returnSeatPrice) + parseFloat(depardBagsPrice) + parseFloat(returnBagsPrice)).toFixed(2);
        // flightsAndSeatsAndBagsPrice.push(`$${calculatedFlightAndSeatsAndBagsPrice}`)
        //
        //     // Validate current display price equal to the flights price + seats price + bags price
        //     if (calculatedFlightAndSeatsAndBagsPrice === priceSummary) {
        //         console.log(clc.green(`Price summary flights + seats + bags is correct ($${priceSummary})`))
        //         finalPrice.push(`$${priceSummary}`)
        //     }
        //         else {
        //             throw new Error(`Price summary is wrong!!!`);
        //         }

        // Click on review booking
        await global.clickOn(bonzaBagsPage.main.reviewBookingButton)
        // Click on skip for now
        await global.clickOn('//android.view.ViewGroup[@content-desc="btn_skip-for-now"]/android.widget.TextView')
        // Click on Continue to payment
        await global.clickOn(bonzaBagsPage.main.continueToPaymentButton)
    });

    it('Review booking',async ()=>{
        // Scroll all the way down
        await global.pause(2000)
        await global.scrollTo(500, 2000, 500, 500)
        // Click on title
        await global.clickOn(bonzaReviewBookingPage.main.titleList)
        // Select Mrs
        await global.clickOn(bonzaReviewBookingPage.main.title_Mrs)
        // Click on date of birth
        await global.clickOn(bonzaReviewBookingPage.main.dateOfBirthList)
        // // Select month
        // await global.clickOn(bonzaReviewBookingPage.main.dateOfBirth_month_august)
        // // Select day
        // await global.clickOn(bonzaReviewBookingPage.main.dateOfBirth_day_8)
        // // Select year
        // await global.clickOn(bonzaReviewBookingPage.main.dateOfBirth_year_2006)
        // Click on confirm button
        await global.clickOn(bonzaReviewBookingPage.main.dateOfBirth_confirmButton)
        // Add phone number
        await global.clickOn(bonzaReviewBookingPage.main.phoneNumberCountryList)
        // Search for Israel
        await global.addValue(bonzaReviewBookingPage.main.phoneNumberCountrySearch, country)
        // Select Israel
        await global.clickOn(bonzaReviewBookingPage.main.phoneNumberCountry_Israel)
        // Add phone number
        await global.addValue(bonzaReviewBookingPage.main.phoneNumberInput, phoneNumber)
        // Add email address
        await global.addValue(bonzaReviewBookingPage.main.emailAddressInput, emailAddress)
        await global.scrollTo(500, 2000, 500, 500)
        // Click on "looks good" button
        await global.pause(2000)
        await global.clickOn(bonzaReviewBookingPage.main.looksGoodButton)
    });

    it('Validate all prices',async ()=>{
        // Click on price breakdown
        await global.clickOn(bonzaReviewBookingPage.main.priceBreakdownToggle)
        // Validate flights price
        await global.validateElementText(bonzaReviewBookingPage.main.flightPriceValue, allFlightsPrice)
        // Validate seats price
        await global.validateElementText(bonzaReviewBookingPage.main.seatsPriceValue, allSeatsPrice)
        // Validate bags price
        await global.validateElementText(bonzaReviewBookingPage.main.bagsPriceValue, allBagsPrice)
        // Validate total price
        await global.validateElementText(bonzaReviewBookingPage.main.totalPrice, finalPrice)
    });

    it('Add payment details',async ()=>{
        // Confirm price adjustment
        await global.clickOn('//android.view.ViewGroup[@content-desc="btn_price-mismatch_modal-ok"]/android.view.ViewGroup/android.widget.TextView')
        // Select visa credit payment
        await global.clickOn(bonzaReviewBookingPage.main.visaCredit)
        // Click on OK button in fees dialog
        // await global.clickOn(bonzaReviewBookingPage.main.feesOKButton)
        // Add name on card
        await global.addValue(bonzaReviewBookingPage.main.nameOnCardInput, `${firstName} ${lastName}`)
        // Add billing address
        await global.addValue(bonzaReviewBookingPage.main.billingAddressInput, address)
        // Add city
        await global.addValue(bonzaReviewBookingPage.main.cityInput, city)
        // Click on country list
        await global.clickOn(bonzaReviewBookingPage.main.countryList)
        // Select australia
        await global.clickOn(bonzaReviewBookingPage.main.country_Australia)
        // Click on district (state)
        await global.clickOn(bonzaReviewBookingPage.main.districtList)
        // Select district
        await global.clickOn(bonzaReviewBookingPage.main.district_NSW)
        // Add postcode
        await global.addValue(bonzaReviewBookingPage.main.postCodeInput, postcode)

        // Add card number
        await global.addValue(bonzaReviewBookingPage.main.cardNumberInput, cardNumber)
        // Add card expiration date
        await global.addValue(bonzaReviewBookingPage.main.cardExpirationDateInput, cardExpiration)
        // Add card CVC
        await global.addValue(bonzaReviewBookingPage.main.cardCVCInput, cardCVC)
        // Hide the keyboard
        await driver.hideKeyboard()
        // Add zip
        await global.addValue(bonzaReviewBookingPage.main.zipCodeInput, zipcode)
        // Check accept terms
        await global.clickOn(bonzaReviewBookingPage.main.acceptTermsCheckbox)
        // Click on book now
        await global.clickOn(bonzaReviewBookingPage.main.bookNowButton)
        // Validate booking confirmation
        await global.validateElementText(bonzaConfirmationPage.main.bookingReferenceTitle, 'HERE IS YOUR BOOKING REFERENCE')
        // Get the booking number
//============================================================================================================
                    const bookingNumberElement = await driver.$(bonzaConfirmationPage.main.bookingNumber);
                    bookingNumber.push(await bookingNumberElement.getText())
//============================================================================================================
    });

    it ('Report' ,async ()=> {
        console.log(clc.yellow('\n<<<<<<<<<<<<<<<<<<<< REPORT >>>>>>>>>>>>>>>>>>>>'));
        console.log(clc.yellow(`Email: ${emailAddress}`))
        console.log(clc.yellow(`Booking number: ${bookingNumber}`))
        console.log(clc.yellow(`Final price: ${finalPrice}`))
        console.log(clc.yellow('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>\n'));
        await global.pause(800000000)
    });

});
