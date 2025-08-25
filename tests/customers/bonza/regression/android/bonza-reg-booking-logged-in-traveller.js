const global = require("../../../../../commands.conf");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaSeatsPage = require ('../../../../../pages/bonza/page-bonza-seats');
const bonzaFlightResults = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');
const bonzaSideMenuPage = require("../../../../../pages/bonza/page-bonza-side-menu");
const bonzaProfilePage = require("../../../../../pages/bonza/page-bonza-profile");
const data = require("../../../../../data");
const bonzaConfirmationPage = require("../../../../../pages/bonza/page-bonza-confirmation");
const clc = require("cli-color");

let email = data.users.bonza.PROD.USER_4.USERNAME
let password = data.users.bonza.PROD.USER_4.PASSWORD;
let country = 'Israel';
let phoneNumber = 527764433;
let bookingNumber = [];

let firstName = 'Marlon';
let lastName = 'Brando';
let address = '12 Florentin st.';
let city = 'Tel Aviv';
let postcode = 564875;
let zipcode = 12345;
let cardNumber = '4111 1111 1111 1111';
let cardExpiration = '03/27';
let cardCVC = 425;

describe('Home', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Sign in',async ()=> {
        // Open the menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on Login
        await global.clickOn(bonzaSideMenuPage.main.login)
        // Sign in to user 1
        await global.bonza_signIn(email, password)
        await global.pause(3000)
        // Scroll up
        await global.scrollTo(616, 2000, 703, 308)
        // Validate the user
        await global.validateElementText(bonzaProfilePage.main.usernameInput, email)
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
        await global.pause(3000)
    });

    it('Flights selection',async ()=>{
        // Departing flight
        // Click on show prices
        await global.clickOn(bonzaFlightResults.main.firstFlightShowPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResults.main.firstFlightFirstFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResults.main.firstFlightSelectFareButton)
    });

    it('Validate travellers details',async ()=>{
        // Validate traveller name title
        await global.validateElementText(bonzaTravellersPage.main.firstTravellerFirstNameTitle, 'Daniel Dunn')
        // Click on "Edit info"
        await global.clickOn(bonzaTravellersPage.main.editInfoButton)
        // Valdiate first name
        await global.validateElementText(bonzaTravellersPage.main.firstTravellerFirstNameInput, 'Daniel')
        // Validate last name
        await global.validateElementText(bonzaTravellersPage.main.firstTravellerLastNameInput, 'Dunn')
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
        await global.scrollTo(500, 2000, 500, 400)

        // Validate first name
        await global.validateElementText(bonzaReviewBookingPage.main.firstNameInput, 'Daniel')
        // Validate last name
        await global.validateElementText(bonzaReviewBookingPage.main.lastNameInput, 'Dunn')
        // Validate email address
        await global.validateElementText(bonzaReviewBookingPage.main.emailAddressInput, 'martin.wdaj@yopmail.com')
        await global.pause(2000)
        // Add phone number
        await global.clickOn(bonzaReviewBookingPage.main.phoneNumberCountryList)
        // Search for Israel
        await global.addValue(bonzaReviewBookingPage.main.phoneNumberCountrySearch, country)
        // Select Israel
        await global.clickOn(bonzaReviewBookingPage.main.phoneNumberCountry_Israel)
        // Clear phone number (using xpath here due to existing phone number for this user)
        await global.clearValue('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[4]/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.EditText')
        // Add phone number (using xpath here due to existing phone number for this user)
        await global.addValue('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[4]/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.EditText', phoneNumber)

        // Click on "looks good" button
        await global.clickOn(bonzaReviewBookingPage.main.looksGoodButton)
        // Confirm price adjustment
        // await global.clickOn('//android.view.ViewGroup[@content-desc="btn_price-mismatch_modal-ok"]/android.view.ViewGroup/android.widget.TextView')
    });

    it('Add payment details',async ()=>{
        // Select visa credit payment
        await global.clickOn(bonzaReviewBookingPage.main.visaCredit)
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
