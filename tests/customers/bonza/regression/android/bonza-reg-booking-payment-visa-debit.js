const global = require("../../../../../commands.conf");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');
const bonzaSeatsPage = require("../../../../../pages/bonza/page-bonza-seats");
const bonzaConfirmationPage = require("../../../../../pages/bonza/page-bonza-confirmation");
const clc = require("cli-color");

let firstName = 'Marlon';
let lastName = 'Brando';
let country = 'Israel';
let address = '12 Florentin st.';
let city = 'Tel Aviv';
let postcode = 564875;
let phoneNumber = 526647788;
let zipcode = 12345;
let cardNumber = '4111 1111 1111 1111';
let cardExpiration = '03/27';
let cardCVC = 425;
let emailAddress = 'bonza1@yopmail.com';
let bookingNumber = [];

describe('Home', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Flight search',async ()=>{
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton)

        // Select valid location and date
        await global.selectOneWayLocationAndDate()

        // Select passengers
        await global.homePage_selectPassengers(1, 0, 0, 0);

        // Click on show flights
        await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton)
        await global.pause(2000)
    });

    it('Flights selection',async ()=>{
        // Departing flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)
    });

    it('Add travellers details',async ()=>{
        // Add first name
        await global.addValue(bonzaTravellersPage.main.firstTravellerFirstNameInput, firstName)
        // Add last name
        await global.addValue(bonzaTravellersPage.main.firstTravellerLastNameInput, lastName)
        // // Click on first traveller accessibility options
        // await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // // Select accessibility option
        // await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_HearingImpaired)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
    });

    it('Select seats',async ()=> {   
        await driver.pause(5000)
        // Select the next available seat
        await global.clickOn(bonzaSeatsPage.main.nextValidSeat)
    });

    it('Select bags',async ()=>{
        // Click on Add bags button
        await global.clickOn('//*[@text=" Add Bags"]')
        await global.pause(1000)
        // Expand 15kgBag list
        await global.clickOn(bonzaBagsPage.main["15kgBag"])
        // Select 1
        await global.clickOn(bonzaBagsPage.main["15kgBag_1"])
    });

    it('Review booking',async ()=>{
        // Click on review booking
        await global.clickOn(bonzaBagsPage.main.reviewBookingButton)
        // Click on Continue to payment
        await global.clickOn(bonzaBagsPage.main.continueToPaymentButton)
        // Scroll all the way down
        await global.pause(2000)
        await global.scrollTo(500, 1500, 500, 400)
        // Click on title
        await global.clickOn(bonzaReviewBookingPage.main.titleList)
        // Select Mrs
        await global.clickOn(bonzaReviewBookingPage.main.title_Mrs)
        // Click on date of birth
        await global.clickOn(bonzaReviewBookingPage.main.dateOfBirthList)
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
        // Click on "looks good" button
        await global.clickOn(bonzaReviewBookingPage.main.looksGoodButton)
        // Confirm price adjustment
        // await global.clickOn('//android.view.ViewGroup[@content-desc="btn_price-mismatch_modal-ok"]/android.view.ViewGroup/android.widget.TextView')
    });


    it('Add payment details using visa debit',async ()=>{
        // Select visa credit payment
        await global.clickOn(bonzaReviewBookingPage.main.visaDebit)
        // Click on OK button in fees dialog
        await global.clickOn(bonzaReviewBookingPage.main.feesOKButton)
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
        console.log(clc.yellow(`Booking number: ${bookingNumber}`))
        console.log(clc.yellow('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>\n'));
    });
});
