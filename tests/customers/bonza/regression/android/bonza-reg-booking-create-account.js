const global = require("../../../../../commands.conf");
const NWTools = require("nightwatch-tools");
const randomNumber = NWTools.randomString(5,'1234567890');
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const {driver} = require("@wdio/globals");
const bonzaBagsPage = require("../../../../../pages/bonza/page-bonza-bags");
const bonzaReviewBookingPage = require("../../../../../pages/bonza/page-bonza-review-booking");
const bonzaProfilePage = require("../../../../../pages/bonza/page-bonza-profile");
const bonzaSideMenuPage = require("../../../../../pages/bonza/page-bonza-side-menu");
const bonzaConfirmationPage = require("../../../../../pages/bonza/page-bonza-confirmation");
const yopmailPage = require ('../../../../../pages/ThirdParty/page-yopmail');
const clc = require("cli-color");
const data = require("../../../../../data");
const {randomLastName, randomFirstName} = require("../../../../../commands.conf");
const bonzaSeatsPage = require("../../../../../pages/bonza/page-bonza-seats");
let mailServiceUrl = 'https://yopmail.com/';

let departDate = '2023-12-18';
let returnDate = '2023-12-22';

let address = '12 Florentin st.';
let city = 'Tel Aviv';
let country = 'Israel';
let phoneNumber = 526647788;
let emailAddress = `gordon${randomNumber}@yopmail.com`;
let password = `Pass${randomNumber}!`;
let postcode = 564875;
let zipcode = 12345;
let cardNumber = '4111 1111 1111 1111';
let cardExpiration = '03/26';
let cardCVC = 425;
let seatNumber = 2;

let bookingNumber = [];

describe('Home', () => {

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
        await driver.pause(2000);
    });

    it('Flights selection', async () => {
        // Departing flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)

        // Returning flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)
    });

    it('Add travellers details',async ()=>{
        // Add first name
        await global.addValue(bonzaTravellersPage.main.firstTravellerFirstNameInput, `${await randomFirstName()}`)
        // Add last name
        await global.addValue(bonzaTravellersPage.main.firstTravellerLastNameInput, `${await randomLastName()}`)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
    });


    it('Select seats',async ()=> {
        await driver.pause(5000)
        // Select departing seat
        await global.clickOn(`(//android.view.ViewGroup[@content-desc="seat_valid"])[${seatNumber}]/android.widget.TextView`)
        // Click on Next flight button
        await driver.pause(1000)
        await global.clickOn('//*[@text=" Next flight"]')
        await driver.pause(2000)
        // Select returning seat
        await global.clickOn(`(//android.view.ViewGroup[@content-desc="seat_valid"])[${seatNumber}]/android.widget.TextView`)
    });

    it('Select bags',async ()=>{
        // Click on Add bags button
        await global.clickOn('//*[@text=" Add Bags"]')
        await driver.pause(1000)
        // Expand 15kgBag list
        await global.clickOn('//*[@content-desc="btn-dropdown__check-bag__Baggage 15kg-num:"]')
        // Select 1
        await global.clickOn(bonzaBagsPage.main["15kgBag_1"])
        // Click on next flight
        await global.clickOn(bonzaBagsPage.main.nextFlightButton)
        await driver.pause(1000)
        // Expand 15kgBag list (second flight)
        await global.clickOn(bonzaBagsPage.main["15kgBag"])
        // Select 1
        await global.clickOn(bonzaBagsPage.main["15kgBag_1"])
        // Click on review booking
        await global.clickOn(bonzaBagsPage.main.reviewBookingButton)
        // Click on Continue to payment
        await global.clickOn(bonzaBagsPage.main.continueToPaymentButton)
    });

    it('Review booking',async ()=>{
        // Scroll all the way down
        await driver.pause(2000)
        await global.scrollTo(500, 2000, 500, 500)
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
    });

    it('Create new account', async () => {
        // Click on create account checkbox
        await global.clickOn(bonzaReviewBookingPage.main.createAccountCheckbox)
        // Add password
        await global.addValue(bonzaReviewBookingPage.main.createAccountPassword, password)
        // Add confirm password
        await global.addValue(bonzaReviewBookingPage.main.createAccountConfirmPassword, password)
        // Scroll down
        await global.scrollTo(500, 2000, 500, 500)
        await driver.pause(2000)
        // Click on "looks good" button
        await global.clickOn(bonzaReviewBookingPage.main.looksGoodButton)
        // Click on close button at the welcome message
        await global.clickOn('//*[@text=" Close"]')
    });

    // it ('Confirm user via email',async ()=> {
    //     await global.openUrlInChrome(mailServiceUrl)
    //     // Add value in the mailbox field
    //     await global.addValue(yopmailPage.main.mailboxInput, emailAddress)
    //     // Click on the arrow button
    //     await global.clickOn(yopmailPage.main.mailboxArrowButton)
    //     // Select the newest messge in the mailbox
    //     await global.clickOn(yopmailPage.main.newestMessage)
    //     // Click on activate account in the message body
    //     await driver.pause(1000)
    //     await global.clickOn('~Activate Account')
    //     // Validate "Account activated" message
    //     await global.validateElementText('//*[@text="Account activated!"]', 'Account activated!')
    //     // Switch back to Bonza app
    //     await driver.activateApp('com.bonzamobile')
    // })

    it ('Login with the new user',async ()=> {
        // Open the sideMenu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on Login
        await global.clickOn(bonzaSideMenuPage.main.login)
        // Sign in
        await global.bonza_signIn(emailAddress, password)
        // Scroll up in profile screen
        await driver.pause(3000)
        await global.scrollTo(500, 1524, 500, 720)
        // Validate the user
        await global.validateElementText(bonzaProfilePage.main.usernameInput, emailAddress)
        // Click on back button
        await global.clickOn('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]')
    })

    it('Add payment details',async ()=>{
        // Select visa credit payment
        await global.clickOn(bonzaReviewBookingPage.main.visaCredit)
        // Click on OK button in fees dialog
        await global.clickOn(bonzaReviewBookingPage.main.feesOKButton)
        // Add name on card
        await global.addValue(bonzaReviewBookingPage.main.nameOnCardInput, `${await randomFirstName()} ${await randomLastName()}`)
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
        console.log(clc.yellow(`Departing at: ${departDate}`))
        console.log(clc.yellow(`Returning at: ${returnDate}`))
        console.log(clc.yellow('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>\n'));
    });
});