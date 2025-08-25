const global = require("../../../../../commands.conf");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaHomePage = require ('../../../../../pages/bonza/page-bonza-home');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaConfirmationPage = require ('../../../../../pages/bonza/page-bonza-confirmation');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const departFlightPrice = [];
const returnFlightPrice = [];
const allFlightsPrice = [];
const flightsAndSeatsPrice = [];
const flightsAndSeatsAndBagsPrice = [];
const depardSeatPrice = [];
const returnSeatPrice = [];
const allSeatsPrice = [];
const depardBagsPrice = [];
const returnBagsPrice = [];
const allBagsPrice = [];
const finalPrice = [];
const bookingNumber = [];

let displayDepartDateInSelectDates = [];
let displayReturnDateInSelectDates = [];
let displayDepartDateInHome = [];
let displayReturnDateInHome = [];
let displayDepartDayOnly = [];
let displayReturnDayOnly = [];

let departFlightStartTime = [];
let departFlightEndTime = [];
let returnFlightStartTime = [];
let returnFlightEndTime = [];
let departAircraftAndDuration = [];
let returnAircraftAndDuration = [];

let locations = [];         // location names and codes
let locationNames = [];     // location only names
let locationCodes = [];     // location only codes
let fromLocationName = 'Bundaberg';
let fromLocationCode = 'BDB';
let toLocationName = 'Melbourne (Tullamarine)';
let toLocationCode = 'MEL';

let departDate = '2023-09-10';
let returnDate = '2023-09-13';
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
let seatNumber = 22;

describe('Home', ()=>{

    it('Flight search',async ()=>{
        // Click No in update popup if exists
        await global.clickIfExists(bonzaMainPage.main.updateNoButton, 5000)
        // Temp alert
        await global.clickIfExists('//android.view.ViewGroup[@content-desc="button__click"]/android.view.ViewGroup')
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton)
        // Click on from button
        await global.clickOn(bonzaBookTripPage.bookTrip.fromButton)
        await global.pause(1000)

//============================================================================================================
                    // Get all location data and keep it in separate arrays, locations, locationNames and locationCodes

                    // Get all text values from the location list
                    let allLocationElements = await driver.$$('//android.widget.ScrollView[@content-desc="scrollview_ibe_depart-airport"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView')
                    locations = await Promise.all(allLocationElements.map(async (element) => {
                        return element.getText();

                    }))
                    console.log('Locations, names and codes: '+locations)

                    // Loop locations and keep only the location names
                    for (let i = 0; i < locations.length; i++) {
                        locationNames.push(locations[i].replace(/ \(.*/g, ''))
                    }
                    console.log('Location, names only: '+locationNames)

                    // Loop locations and keep only the location codes
                    for (let i = 0; i < locations.length; i++) {
                        locationCodes.push(locations[i].split(' (').pop('').replace(')', ''))
                    }
                    console.log('Locations, codes only: '+locationCodes)
//============================================================================================================

        // Select from location
        await global.destinations_selectFromByName(fromLocationName)
        // Select to location
        await global.pause(1000)
        await global.destinations_selectToByName(toLocationName)

        // Select dates by index (only when we can identify the enabled dates)
        // await global.clickByIndex('//android.view.ViewGroup[@enabled="true"]', 2)

        // Select departing date
        await global.clickOn(`//android.view.ViewGroup[@content-desc="${departDate}"]/android.view.ViewGroup`)
        // Validate departing date title in Select dates page
        await global.pause(1000)
        await global.validateElementText('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.widget.TextView[2]', displayDepartDateInSelectDates)
        await global.pause(500)
        // Select returning date
        await global.clickOn(`//*[@content-desc="${returnDate}"]/android.widget.TextView`)

//============================================== DEPART ======================================================
                    // Change depart date format from this [2023-08-14] to this [14 Aug 2023]
                    const newDepartDate = departDate.replace(/\d{4}-\d{2}-\d{2}/, function(match) {
                    const day = match.slice(8, 10);
                    const month = match.slice(5, 7);
                    const monthNumber = parseInt(month, 10);
                    const monthName = months[monthNumber - 1];
                    return `${day} ${monthName} ${match.slice(0, 4)}`;
                    });
                    displayDepartDateInSelectDates = (newDepartDate)    // Assign the new date to displayDepartDateInSelectDates to validate display at Select dates page
                    console.log(`displayDepartDateInSelectDates is: ${displayDepartDateInSelectDates}`)

                    // Change depart date format from this [27 Aug 2023] to this [27 Aug] to validate home display
                    let newDepartDateForHome = displayDepartDateInSelectDates.replace(/ 202.*$/g, '');
                    displayDepartDateInHome = (newDepartDateForHome)    // Assign the new date to displayDepartDateInHome to validate display at home page
                    console.log(`displayDepartDateInHome is: ${displayDepartDateInHome}`)

                    // Cut depart date to keep the days only for calculating the trip days
                    let departDayOnly = departDate.replace(/^.{1,8}/g, '');
                    displayDepartDayOnly = departDayOnly    // Assign the new day only value to displayDepartDayOnly to validate display at Flight results page
//============================================ RETURN ========================================================
                    // Change return date format from this [2023-08-14] to this [14 Aug 2023]
                    const newReturnDate = returnDate.replace(/\d{4}-\d{2}-\d{2}/, function(match) {
                    const day = match.slice(8, 10);
                    const month = match.slice(5, 7);
                    const monthNumber = parseInt(month, 10);
                    const monthName = months[monthNumber - 1];
                    return `${day} ${monthName} ${match.slice(0, 4)}`;
                    });
                    displayReturnDateInSelectDates = (newReturnDate)    // Assign the new date to displayReturnDateInSelectDates to validate display at Select dates page
                    console.log(`displayReturnDateInSelectDates is: ${displayReturnDateInSelectDates}`)

                    // Change return date format from this [27 Aug 2023] to this [27 Aug] to validate home display
                    let newReturnDateForHome = displayReturnDateInSelectDates.replace(/ 202.*$/g, '');
                    displayReturnDateInHome = (newReturnDateForHome)    // Assign the new date to displayReturnDateInHome to validate display at home page
                    console.log(`displayReturnDateInHome is: ${displayReturnDateInHome}`)

                    // Cut return date to keep the days only for calculating the trip days
                    let returnDayOnly = returnDate.replace(/^.{1,8}/g, '');
                    displayReturnDayOnly = returnDayOnly    // Assign the new day only value to displayReturnDayOnly to validate display at Flight results page
//============================================================================================================

        // Validate returning date title in Select dates page
        await global.pause(1000)
        await global.validateElementText('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView[2]', displayReturnDateInSelectDates)
        // Validate trip days in Select dates page
        let tripDays = returnDayOnly - departDayOnly;           // Calculate the trip days
        await global.validateElementText('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[2]', `${tripDays} day trip`)
        // Click on confirm dates
        await global.clickOn(bonzaBookTripPage.bookTrip.confirmDatesButton)
        // Add one adult
        await global.clickOn(bonzaBookTripPage.bookTrip.adultsPlusButton)
        await global.pause(1000)
        // Click on confirm travellers button
        await global.clickOn(bonzaBookTripPage.bookTrip.confirmTravellersButton)
        // validate from value in home page
        await global.validateElementText(bonzaHomePage.main.fromValue, fromLocationName)
        // validate to value in home page
        await global.validateElementText(bonzaHomePage.main.toValue, toLocationName)
        // Validate depart date value in home page
        await global.validateElementText(bonzaHomePage.main.departAndReturnDatesValue, displayDepartDateInHome)
        // Validate return date value in home page
        await global.validateElementText(bonzaHomePage.main.departAndReturnDatesValue, displayReturnDateInHome)
        // Validate passengers value in home page
        await global.validateElementText(bonzaHomePage.main.passengersValue, '1x adult')
        // Click on show flights
        await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton)
        await global.pause(2000)
    });

    it('Flights selection',async ()=>{
        // Depart flight
//============================================================================================================
                    // Extract depart flight start time
                    let departStartTimeElement = await driver.$(bonzaFlightResultsPage.main.flightStartTime);
                    departFlightStartTime = (await departStartTimeElement.getText())
                    console.log(`departFlightStartTime is: ${departFlightStartTime}`)

                    // Extract depart flight end time
                    let departEndTimeElement = await driver.$(bonzaFlightResultsPage.main.flightEndTime);
                    departFlightEndTime = (await departEndTimeElement.getText())
                    console.log(`departFlightEndTime is: ${departFlightEndTime}`)

                    // Extract depart flight aircraft and duration
                    let departAircraftAndDurationElement = await driver.$(bonzaFlightResultsPage.main.aircraftAndDurationTitle);
                    departAircraftAndDuration = (await departAircraftAndDurationElement.getText())
                    console.log(`departAircraftAndDuration is: ${departAircraftAndDuration}`)
//============================================================================================================

        // Validate "From" location name
        await global.validateElementText(bonzaFlightResultsPage.main.fromLocationName, fromLocationName)
        // Validate "From" location code (outside the flight frame)
        await global.validateElementText(bonzaFlightResultsPage.main.fromLocationCodeTitle, fromLocationCode)
        // Validate "To" location name (outside the flight frame)
        await global.validateElementText(bonzaFlightResultsPage.main.toLocationName, toLocationName)
        // Validate "To" location code
        await global.validateElementText(bonzaFlightResultsPage.main.toLocationCodeTitle, toLocationCode)
        // Validate departing date (only day is tested here todo: need to test the full string e.g. "Sun 27 August 2023")
        await global.validateElementText(bonzaFlightResultsPage.main.departingDate, displayDepartDayOnly)
        // Validate "From" location code (inside the flight frame)
        await global.validateElementText(bonzaFlightResultsPage.main.fromLocationCodeTitle, fromLocationCode)
        // Validate "To" location code (inside the flight frame)
        await global.validateElementText(bonzaFlightResultsPage.main.toLocationCode, toLocationCode)
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)
//============================================================================================================
                    // Extract depart flight price
                    let departFlightPriceElement = await driver.$('//*[@resource-id="bundle__price"]');
                    departFlightPrice.push((await departFlightPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`Depart flight price is: $${departFlightPrice}`)
//============================================================================================================

        // Return flight
//============================================================================================================
                    // Extract return flight start time
                    let returnStartTimeElement = await driver.$(bonzaFlightResultsPage.main.flightStartTime);
                    returnFlightStartTime = (await returnStartTimeElement.getText())
                    console.log(`returnFlightStartTime is: ${returnFlightStartTime}`)

                    // Extract return flight end time
                    let returnEndTimeElement = await driver.$(bonzaFlightResultsPage.main.flightEndTime);
                    returnFlightEndTime = (await returnEndTimeElement.getText())
                    console.log(`returnFlightEndTime is: ${returnFlightEndTime}`)

                    // Extract return flight aircraft and duration
                    let returnAircraftAndDurationElement = await driver.$(bonzaFlightResultsPage.main.aircraftAndDurationTitle);
                    returnAircraftAndDuration = (await returnAircraftAndDurationElement.getText())
                    console.log(`returnAircraftAndDuration is: ${returnAircraftAndDuration}`)
//============================================================================================================

        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)

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
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_HearingImpaired)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
    });

    it('Select seats',async ()=> {   
        await driver.pause(5000)

//============================================================================================================
                    // Extract depart seat price (and add decimal numbers .00)
                    let departSeatPriceElement = await driver.$(`(//android.view.ViewGroup[@content-desc="_selected"])[${seatNumber}]/android.widget.TextView`);
                    depardSeatPrice.push((await departSeatPriceElement.getText()).replace(/[^0-9.]+/g, '').concat('.00'))
                    console.log(`Depart seat price is: $${depardSeatPrice}`)
//============================================================================================================

        // Select departing seat
        await global.clickOn(`(//android.view.ViewGroup[@content-desc="_selected"])[${seatNumber}]/android.widget.TextView`)

        // Click on Next flight button
        await global.pause(1000)
        await global.clickOn('//*[@text=" Next flight"]')
        await global.pause(2000)

//============================================================================================================
                    // Extract return seat price (and add decimal numbers .00)
                    let returnSeatPriceElement = await driver.$(`(//android.view.ViewGroup[@content-desc="_selected"])[${seatNumber}]/android.widget.TextView`);
                    returnSeatPrice.push((await returnSeatPriceElement.getText()).replace(/[^0-9.]+/g, '').concat('.00'))
                    console.log(`Return seat price is: $${returnSeatPrice}`)
//============================================================================================================

        // Select returning seat
        await global.clickOn(`(//android.view.ViewGroup[@content-desc="_selected"])[${seatNumber}]/android.widget.TextView`)
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
        // Expand 15kgBag list (second flight)
        await global.clickOn(bonzaBagsPage.main["15kgBag"])
        // Select 1
        await global.clickOn(bonzaBagsPage.main["15kgBag_1"])

//============================================================================================================
                    // Extract return bags price
                    let returnBagsPriceElement = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[6]');
                    returnBagsPrice.push((await returnBagsPriceElement.getText()).replace(/[^0-9.]+/g, ''))
                    console.log(`Return bags price is: $${returnBagsPrice}`)
//============================================================================================================
    });

    it('Validate current price, flights + seats + bags',async ()=> {
        // Get price summry (bottom of the page)
        let priceSummaryElement = driver.$('//android.view.ViewGroup[@content-desc="touchable-opacity__obi__booking-summary__toggle"]/android.view.ViewGroup/android.widget.TextView')
        let priceSummary = (await priceSummaryElement.getText()).replace(/[^0-9.]+/g, '');
        // Summing flight prices + seats + bags
        let calculatedBagsPrice = (parseFloat(depardBagsPrice) + parseFloat(returnBagsPrice)).toFixed(2);
        allBagsPrice.push(`$${calculatedBagsPrice}`)

        let calculatedFlightAndSeatsAndBagsPrice = (parseFloat(departFlightPrice) + parseFloat(returnFlightPrice) + parseFloat(depardSeatPrice) + parseFloat(returnSeatPrice) + parseFloat(depardBagsPrice) + parseFloat(returnBagsPrice)).toFixed(2);
        flightsAndSeatsAndBagsPrice.push(`$${calculatedFlightAndSeatsAndBagsPrice}`)

        // Validate current display price equal to the flights price + seats price + bags price
        if (calculatedFlightAndSeatsAndBagsPrice === priceSummary) {
            console.log(clc.green(`Price summary flights + seats + bags is correct ($${priceSummary})`))
            finalPrice.push(`$${priceSummary}`)
        }
        else {
            throw new Error(`Price summary is wrong!!!`);
        }

        // Click on review booking
        await global.clickOn(bonzaBagsPage.main.reviewBookingButton)
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
        await global.clickOn(bonzaReviewBookingPage.main.looksGoodButton)
    });

    it('Validate all pricess',async ()=>{
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
        // Select visa credit payment
        await global.clickOn(bonzaReviewBookingPage.main.visaCredit)
        // Click on OK button in fees dialog
        await global.clickOn(bonzaReviewBookingPage.main.feesOKButton)
        // Add name on card
        await global.addValue(bonzaReviewBookingPage.main.nameOnCardInput, `${firstName} ${lastName}`)
        // Add card number
        await global.addValue(bonzaReviewBookingPage.main.cardNumberInput, cardNumber)
        // Add card expiration date
        await global.addValue(bonzaReviewBookingPage.main.cardExpirationDateInput, cardExpiration)
        // Add card CVC
        await global.addValue(bonzaReviewBookingPage.main.cardCVCInput, cardCVC)
        // Hide the keyboard
        await driver.hideKeyboard()
        // Add billing address
        await global.addValue(bonzaReviewBookingPage.main.billingAddressInput, address)
        // Add city
        await global.addValue(bonzaReviewBookingPage.main.cityInput, city)
        // Click on country list
        // Add Country
        await global.clickOn(bonzaReviewBookingPage.main.countryList)
        await global.clickOn(bonzaReviewBookingPage.main.countryList)
        // Select australia
        await global.clickOn(bonzaReviewBookingPage.main.country_Australia)
        // Click on district (state)
        await global.clickOn(bonzaReviewBookingPage.main.districtList)
        // Select district
        await global.clickOn(bonzaReviewBookingPage.main.district_NSW)
        // Add postcode
        await global.addValue(bonzaReviewBookingPage.main.postCodeInput, postcode)
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
        console.log(clc.yellow(`Departing at: ${departDate}`))
        console.log(clc.yellow(`Returning at: ${returnDate}`))
        console.log(clc.yellow(`Final price: ${finalPrice}`))
        console.log(clc.yellow('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>\n'));
        await global.pause(800000000)
    });

});