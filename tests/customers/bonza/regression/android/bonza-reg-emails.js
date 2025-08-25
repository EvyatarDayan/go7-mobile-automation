const global = require("../../../../../commands.conf");
const sessionData = require("../../../../../sessionData");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaHomePage = require ('../../../../../pages/bonza/page-bonza-home');
const bonzaSignUpPage = require('../../../../../pages/bonza/page-bonza-sign-up');
const bonzaSignInPage = require('../../../../../pages/bonza/page-bonza-sign-in');
const bonzaResetPasswordPage = require('../../../../../pages/bonza/page-bonza-reset-password');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaMyTripsPage = require ('../../../../../pages/bonza/page-bonza-my-trips');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaSeatsPage = require ('../../../../../pages/bonza/page-bonza-seats');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaConfirmationPage = require ('../../../../../pages/bonza/page-bonza-confirmation');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');
const loginData = require('../../../../../data');

let bookingNumber = "";

let departDate = '10';
let returnDate = '15';

let nAdults = 1;
let nYouths = 0;
let nChildren = 0;
let nInfants = 0;

// Test all emails

// 1. Activate account (sign up)  <-- THIS IS DEFUNCT
// 2. Booking confirmation
// 3. Share booking
// 4. Forgot password

describe('Home Page', () => {

    it('Startpoint', async () => {

        await bonzaHomePage.handleInitialPopups();

    });

    /*
    it('Creating a new account and checking relevant email', async () => {

        await bonzaSignUpPage.navigateToPage();
        await bonzaSignUpPage.signUp();

        await global.pause(2000, true);

        driver.launchApp();

        await global.pause(2000, true);

    });
    */

    it('Creating a new booking and checking relevant email', async () => {

        await bonzaHomePage.fullFlow('random', 'random', departDate, returnDate, nAdults, nYouths, nChildren, nInfants);

        // Departing flight
        await bonzaFlightResultsPage.handleFlights();

        await bonzaTravellersPage.completePassengerPage(nAdults, nYouths, nChildren, nInfants);

        //await bonzaSeatsPage.handleSeatSelection(nAdults, nYouths, nChildren, true, true);
        await bonzaSeatsPage.handleSeatSelectionNeo(true, false);

        await bonzaBagsPage.selectBags(nAdults, nYouths, nChildren, nInfants);

        await bonzaBagsPage.endBags();

        await bonzaReviewBookingPage.handleReviewInformation(nAdults, nYouths, nChildren, nInfants);

        await bonzaReviewBookingPage.handlePayment();

        bookingNumber = await bonzaConfirmationPage.getBookingNumber();
        console.log(`Booking number: ${bookingNumber}`);

        // now sharing itinerary
        let emailItineraryButtonSelector = '//*[@text=\"Email itinerary\"]';
        let emailItineraryTextFieldSelector = '//*[contains(@text, "Email") and not(contains(@text, "itinerary"))]';
        await global.findAndScrollToElement(emailItineraryButtonSelector, 1, 10);
        await global.addValue(emailItineraryTextFieldSelector, await sessionData.getEmail());
        await global.clickOn(emailItineraryButtonSelector);

    });

    it('Using \"Forgot Password\" and checking relevant email', async () => {

        await global.pause(2000, true);
        
        await bonzaHomePage.restartApp();

        await global.pause(2000, true);

        // Click on "Account"
        await global.clickOn(bonzaMainPage.toolbar.accountButton);
        await global.pause(1000, true);
        await global.clickOn(bonzaSignInPage.main.forgotPasswordLink);
        await global.pause(1000, true);

        await global.addValue(bonzaResetPasswordPage.main.emailAddressInput, await sessionData.getEmail());

        await global.pause(1000, true);
        await global.clickOn(bonzaResetPasswordPage.main.requestCodeButton);
        await global.pause(1000, true);
        await lookForEmail(await sessionData.getEmail());

    });

    async function lookForEmail(emailAddress) {

        // TODO: still can't consistently reach the email; has trouble inserting it, sometimes, it seems?
        
        try {
            await driver.terminateApp('com.android.chrome');
        } catch {

        }
        await driver.activateApp('com.android.chrome');
        await global.pause(3000, true);
        await global.clickOn('//*[@resource-id="com.android.chrome:id/url_bar"]');
        await global.pause(4000, true);
        await global.addValue('//*[@resource-id="com.android.chrome:id/url_bar"]', "https://www.google.com");  // opens first to definitely clear yopmail session
        await driver.$('//*[@resource-id="com.android.chrome:id/line_1"]').click();
        await global.pause(5000, true);
        await global.clickOn('//*[@resource-id="com.android.chrome:id/url_bar"]');
        await global.pause(5000, true);
        await global.addValue('//*[@resource-id="com.android.chrome:id/url_bar"]', "https://yopmail.com");
        await driver.$('//*[@resource-id="com.android.chrome:id/line_1"]').click();
        await global.pause(10000, true);
        await global.clickByCoordinates(1240, 1100);  // clear

        await global.addValue('//*[contains(@resource-id, "login")]', emailAddress);
        await global.pause(2000, true);
        //await global.clickOn("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.webkit.WebView/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button");

        await global.clickByCoordinates(1340, 1140);

        let emailFirstPass = await checkForEmailType("Bonza Aviation", 3, "emails", true);
        if (emailFirstPass.length < 3) {

            await global.logComment("Waiting 20 seconds for emails to arrive, and then refreshing.");
            await global.pause(20000, true);
            await global.clickByCoordinates(1340, 710);  // refresh button

        }
        let confirmationEmails = await checkForEmailType("Bonza booking confirmation", 2, "Booking confirmation emails");
        //await checkForEmailType("Sign Up TODO", 1, "SIGN UP TODO");
        await checkForEmailType("Password reset", 1, "Password reset emails");

        async function checkForEmailType(subjectText, expectedAmount, type, failureAccepted = false) {

            let emailElements = await driver.$$(`//*[contains(@text, "${subjectText}")]`);
            if (emailElements.length === expectedAmount) {
                await global.logSuccess(`${type} found: ${emailElements.length}`);
            } else {
                if (!failureAccepted) {
                    await global.logError(`${type} found: ${emailElements.length}`);
                }
            }

            return emailElements;

        }

        // checking booking confirmations

        let bookingReferenceSelector = '//*[contains(@text, "Booking Reference")]';

        for (let i = 0; i < confirmationEmails.length; i++) {

            // i = 0 isn't an interactive element when collecting xpath
            let individualBooking = `(//*[contains(@text, "Bonza booking confirmation")])[${i + 1}]`;

            await global.clickOn(individualBooking);
            await global.pause(2000);
            let bookingReferenceText = await global.getElementText(bookingReferenceSelector, true);
            if (bookingReferenceText.includes(await sessionData.getBookingNumber())) {
                await global.logSuccess("Booking numbers are consistent across email and booking");
            } else {
                await global.logError(`Booking numbers are not consistent - ${bookingReferenceText} from email vs ${await sessionData.getBookingNumber()} from booking`);
            }

            // going back
            await global.clickByCoordinates(60, 340);
            await global.pause(2000);

        }

    }

});