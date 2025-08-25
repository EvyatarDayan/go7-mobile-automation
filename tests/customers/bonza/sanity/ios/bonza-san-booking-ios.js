const global = require("../../../../../commands.conf");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaConfirmationPage = require ('../../../../../pages/bonza/page-bonza-confirmation');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');

const bookingNumber = [];

let departDate = '2023-07-23';
let returnDate = '2023-07-26';
let firstName = 'Marlon';
let lastName = 'Brando';
let address = '12 Florentin st.';
let city = 'Tel Aviv';
let country = 'Israel';
let phoneNumber = '526647788';
let emailAddress = 'bonza1@yopmail.com';
let postcode = '564875'
let cardNumber = '4111 1111 1111 1111';
let cardExpiration = '03/27';
let cardCVC = '425';

describe('Home', ()=>{

    it('Flight search',async ()=>{
        // Click yes in update popup if exists
        await global.clickIfExists(bonzaMainPage.main.updateNoButton, 5000)
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton)
        // Click on from button
        await global.clickOn(bonzaBookTripPage.bookTrip.fromButton)
        // Select from BDB
        await global.clickOn(bonzaBookTripPage.bookTrip.airport_BDB)
        // Select to MEL
        await global.clickOn(bonzaBookTripPage.bookTrip.airport_MEL)

        // Select dates by index (only when we can identify the enabled dates)
        // await global.clickByIndex('//android.view.ViewGroup[@enabled="true"]', 2)

        // Select departing date
        await global.clickOn(`//android.view.ViewGroup[@content-desc="${departDate}"]/android.view.ViewGroup`)
        await global.pause(500)
        // Select returning date
        await global.clickOn(`//*[@content-desc="${returnDate}"]/android.widget.TextView`)
        // Click on confirm dates
        await global.clickOn(bonzaBookTripPage.bookTrip.confirmDatesButton)
        // Add one adult
        await global.clickOn(bonzaBookTripPage.bookTrip.adultsPlusButton)
        await global.pause(1000)
        // Click on confirm travellers button
        await global.clickOn(bonzaBookTripPage.bookTrip.confirmTravellersButton)
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

    it('Select seats',async ()=>{   
        // Select departing first available seat
        await global.pause(5000)
        await global.clickByIndex('//*[@content-desc="_selected"]', 5)
        // Click on Next flight button
        await global.pause(1000)
        await global.clickOn('//*[@text=" Next flight"]')
        // Select returning first available seat
        await global.pause(2000)
        await global.clickByIndex('//*[@content-desc="_selected"]', 5)
        // Click on Add bags button
        await global.clickOn('//*[@text=" Add Bags"]')
        // Expand 15kgBag list2
        await global.clickOn(bonzaBagsPage.main["15kgBag"])
        // Select 1
        await global.clickOn(bonzaBagsPage.main["15kgBag_1"])
        // Click on next flight
        await global.clickOn(bonzaBagsPage.main.nextFlightButton)
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
        // Click on "looks good" button
        await global.clickOn(bonzaReviewBookingPage.main.looksGoodButton)
        // Select visa credit payment
        await global.clickOn(bonzaReviewBookingPage.main.visaCredit)
        // Click on OK button in fees dialog
        await global.clickOn(bonzaReviewBookingPage.main.feesOKButton)
    });

    it('Add payment details',async ()=>{
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
        const bookingNumberElement = await driver.$(bonzaConfirmationPage.main.bookingNumber);
        bookingNumber.push(await bookingNumberElement.getText())
    });

    it ('Report' ,async ()=> {
        console.log(clc.yellow('\n<<<<<<<<<<<<<<<<<<<< REPORT: >>>>>>>>>>>>>>>>>>>>'));
        console.log(clc.yellow(`Email: ${emailAddress}`))
        console.log(clc.yellow(`Booking number: ${bookingNumber[0]}`))
        console.log(clc.yellow(`Departing at: ${departDate}`))
        console.log(clc.yellow(`Returning at at: ${returnDate}`))
        console.log(clc.yellow('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>\n'));
    })

})
