
// Test all pages for mandatory fields

// 1. Sign up
// 2. Sign in
// 3. Forgot password
// 4. Flight search
// 5. Travellers page
// 6. Review booking page (+ voucher + payment fields)
// 7. My trips (trip search)

const global = require("../../../../../commands.conf");
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
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaConfirmationPage = require ('../../../../../pages/bonza/page-bonza-confirmation');
const bonzaReviewBookingPage = require ('../../../../../pages/bonza/page-bonza-review-booking');
const loginData = require('../../../../../data');

// TODO: this is taken from bonza-san-sign-up - might want to make a cleaner way without simply copy and pasting code
let departDate = '2023-09-10';
let returnDate = '2023-09-13'; 
let firstName = 'Tommy';
let middleName = 'Lee';
let lastName = 'Jones';
let phoneNumber = '288884444';
let street = '45 Macleay st. Pots point';
let country = 'Australia';
let city = 'Sydney';
let postcode = '2055';
let cardNumber = '4111 1111 1111 1111';
let cardExpiration = '03/27';
let cardCVC = 425;
const NWTools = require("nightwatch-tools");
const randomString = NWTools.randomString(4,'abcdefghijklmnopqrstuvwxyz');
const randomNumber = NWTools.randomString(4,'1234567890');
let emailAddressTest = `tommy.${randomString}@yopmail.com`;
let passwordTest = `Password${randomNumber}!`;

let signedIn = false;

describe('Mandatory Fields', () => {

    it('Startpoint', async () => {

        await bonzaHomePage.handleInitialPopups();

    });

    it('My Trips', async () => {

        // 7. My trips (trip search)
        // Click on "My Trips"
        await global.clickOn(bonzaMainPage.toolbar.myTripsButtonAlternative);
        await global.pause(1000);

        // TODO: expand this part
        await global.addValue(bonzaMyTripsPage.login.bookingConfirmNumber, "test");
        await global.clickOn(bonzaMyTripsPage.login.findMyTrip);
        await global.pause(1000);
        await global.clearValue(bonzaMyTripsPage.login.bookingConfirmNumber);
        await global.addValue(bonzaMyTripsPage.login.lastName, "test");
        await global.clickOn(bonzaMyTripsPage.login.findMyTrip);
        await global.pause(1000);

    });

    it('Sign Up', async () => {

        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);

        // Click on "Account"
        await global.clickOn(bonzaMainPage.toolbar.accountButton);
        await global.pause(1000);

        // 1. Sign up

        await global.clickOn(bonzaSignInPage.main.joinNowButton);

        let screenPosition = 'up';

        // all information will be added - then, mandatory sections will be removed and then sign up attempted with them missing. None of these should succeed.
        let process = {

            'Title': {'mandatory': true, 'type': 'dropdown', 'input': bonzaSignUpPage.main.title_Mrs, 'position': 'up'},
            'First Name': {'mandatory': true, 'type': 'text', 'input': [bonzaSignUpPage.main.firstNameInput, `${firstName}-${randomString}`], 'position': 'up'},
            'Middle Name': {'mandatory': false, 'type': 'text', 'input': [bonzaSignUpPage.main.middleNameInput, `${middleName}-${randomString}`], 'position': 'up'},
            'Last Name': {'mandatory': true, 'type': 'text', 'input': [bonzaSignUpPage.main.lastNameInput, `${lastName}-${randomString}`], 'position': 'up'},
            'Date Of Birth': {'mandatory': true, 'type': 'dob', 'input': [bonzaSignUpPage.main.dateOfBirthList, bonzaSignUpPage.main.dateOfBirth_confirmButton], 'position': 'up'},
            'Phone Number': {'mandatory': true, 'type': 'phoneNumber', 'input': [bonzaSignUpPage.main.phoneNumberCountryList, bonzaSignUpPage.main.phoneNumberCountrySearch, country, 
                bonzaSignUpPage.main.phoneNumberCountry_Australia, bonzaSignUpPage.main.phoneNumberInput, phoneNumber], 'position': 'up'},
            'Street': {'mandatory': false, 'type': 'text', 'input': [bonzaSignUpPage.main.streetInput, street], 'position': 'up'},
            'City': {'mandatory': false, 'type': 'text', 'input': [bonzaSignUpPage.main.cityInput, city], 'position': 'n/a'},
            'Country': {'mandatory': false, 'type': 'dropdown', 'input': bonzaSignUpPage.main.country_Australia, 'position': 'down'},
            'Province': {'mandatory': false, 'type': 'dropdown', 'input': bonzaSignUpPage.main.district_NewSouthWales, 'position': 'down'},
            'Postcode': {'mandatory': false, 'type': 'text', 'input': [bonzaSignUpPage.main.postCodeInput, postcode], 'position': 'down'},
            'Email Address': {'mandatory': true, 'type': 'text', 'input': [bonzaSignUpPage.main.emailAddressInput, emailAddressTest], 'position': 'down'},
            'Password': {'mandatory': true, 'type': 'text', 'input': [bonzaSignUpPage.main.passwordInput, passwordTest], 'position': 'down'},
            'Confirm Password': {'mandatory': true, 'type': 'text', 'input': [bonzaSignUpPage.main.confirmPasswordInput, passwordTest], 'position': 'down'},
            'Privacy Policy': {'mandatory': false, 'type': 'checkbox', 'input': bonzaSignUpPage.main.privacyPolicyCheckbox, 'position': 'down'},
            'Sign Up': {'mandatory': false, 'type': 'submit', 'input': bonzaSignUpPage.main.joinTheBonzaFamilyButton, 'position': 'down'}

        }

        // 1 - completing the information in totality

        for (let processName in process) {

            if (processName != "Sign Up") {
                screenPosition = await completeSection(process[processName], processName, screenPosition);
                await global.pause(500, true);
            }

        }

        await global.logSuccess("Initial entry was successful");

        await global.logComment("Now clearing and re-enabling mandatory elements and trying to proceed without - all should fail");

        // 2 - sequentially clearing a mandatory section and then attempting to proceed

        for (let processName in process) {

            if (processName != "Sign Up" && processName != "Date Of Birth") {

                let mandatory = process[processName]['mandatory'];
                if (mandatory) {

                    screenPosition = await completeSection(process[processName], processName, screenPosition, true);
                    await global.pause(500, true);
                    screenPosition = await completeSection(process['Sign Up'], 'Sign Up', screenPosition);
                    await global.pause(500, true);
                    let signUpSuccessful = await global.waitForElement(bonzaSignUpPage.main.successfulSignUpText, 2000);
                    if (signUpSuccessful) {
                        await global.logError(`${processName} is not a mandatory field, but should be!`);
                        // TODO: end process entirely here.
                    } else {
                        await global.logSuccess(`${processName} is a mandatory field`);
                    }
                    // re-enters information
                    screenPosition = await completeSection(process[processName], processName, screenPosition);

                }

            }

        }

        // to test mandatory date of birth, we have to start the entire page again since it can't be cleared

        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);
        await global.clickOn(bonzaSignInPage.main.joinNowButton);
        await global.pause(1000);

        // completing all information except DOB

        for (let processName in process) {

            if (processName != "Sign Up" && processName != "Date Of Birth") {
                screenPosition = await completeSection(process[processName], processName, screenPosition);
                await global.pause(500, true);
            }

        }

        // now attempting to proceed - should fail
        screenPosition = await completeSection(process['Sign Up'], 'Sign Up', screenPosition);
        await global.pause(500, true);
        signUpSuccessful = await global.waitForElement(bonzaSignUpPage.main.successfulSignUpText, 2000);
        if (signUpSuccessful) {
            await global.logError(`Date of Birth is not a mandatory field, but should be!`);
            // TODO: end process entirely here.
        } else {
            await global.logSuccess(`Date of Birth is a mandatory field`);
        }

        // TODO: could also add DOB validation here

        // 3 - entering only mandatory information and checking no optional field is actually mandatory

        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);
        await global.clickOn(bonzaSignInPage.main.joinNowButton);
        await global.pause(1000);

        for (let processName in process) {

            mandatory = process[processName]['mandatory'];

            if (processName != "Sign Up" && mandatory) {
                screenPosition = await completeSection(process[processName], processName, screenPosition);
                await global.pause(500, true);
            }

        }

        // now trying to proceed, should succeed
        screenPosition = await completeSection(process['Sign Up'], 'Sign Up', screenPosition);
        await global.pause(500, true);
        signUpSuccessful = await global.waitForElement(bonzaSignUpPage.main.successfulSignUpText, 2000);
        if (signUpSuccessful) {
            await global.logSuccess("Successfully signed up using only mandatory field inputs");
        } else {
            await global.logError("One of the optional fields are actually mandatory");
            // TODO: end process entirely here.
        }

        await global.clickOn(bonzaSignUpPage.main.successfulSignUpClose);

        async function completeSection(section, name, screenPosition, clear = false) {

            let type = section['type'];
            let input = section['input'];
            let position = section['position'];

            if (screenPosition != position && position != "n/a") {

                // scrolls to get relevant element into view
                await global.scrollViaUIScrollable(position);
                screenPosition = position;

            }

            if (!clear) {
                await global.logComment(`Now completing ${name}...`);
            } else {
                await global.logComment(`Now clearing ${name}...`);
            }

            // NB: date of birth does not use btn-dropdown

            switch (type) {

                case "text":

                    // [bonzaSignUpPage.main.confirmPasswordInput, passwordTest]

                    // generic path no longer exists

                    //let inputPath = input[0];

                    /*
                    if (name.includes("Password")) {
                        // the password field stems from the generic path, so input[0] is the index (0 for first password, 1 for second, 2 is unknown but likely irrelevant)
                        let passwordElements = await driver.$$(bonzaSignUpPage.main.genericPassword);
                        inputPath = passwordElements[input[0]];

                    }
                    */

                    if (!clear) {
                        await global.addValue(input[0], input[1]);
                    } else {

                        if (name.includes("Password")) {

                            let passwordLength = input[1].length;
                            let censoredPassword = "";
                            for (let x = 0; x < passwordLength; x++) {
                                censoredPassword += "•";  // what is this character even called? weird ball?
                            }
                            
                            let passwordLocator = `//*[@text="${censoredPassword}"]`;
                            let passwordElements = await driver.$$(passwordLocator);

                            if (name.includes("Confirm")) {
                                // last possible field
                                await global.clearValue(passwordElements[passwordElements.length - 1]);
                            } else {
                                // first possible field
                                await global.clearValue(passwordElements[0]);
                            }

                        } else {
                            await global.clearValue(input[0]);
                        }
                        
                    }
                    
                    break;

                case "dob":

                    if (clear) {
                        await global.logComment("Date of Birth cannot be cleared so simply - skipping");
                        return screenPosition;
                    }

                    // [bonzaSignUpPage.main.dateOfBirthList, bonzaSignUpPage.main.dateOfBirth_confirmButton]

                    await global.clickOn(input[0]);
                    await global.pause(1000, true);
                    await global.clickOn(input[1]);

                    break;

                case "dropdown":

                    // bonzaSignUpPage.main.title_Mrs
                    // at top of screen, btn-dropdown - title, country, province
                    // at bottom of screen, btn-dropdown - country, province

                    // generic dropdown no longer exists

                    //let dropDownElements = await driver.$$(bonzaSignUpPage.main.genericDropDown);
                    //let dropDownIndex = -1;

                    if (!clear) {

                        switch (name) {

                            case "Title":

                                //dropDownIndex = 0;
                                await global.enhancedClickOn(bonzaSignUpPage.main.titleDropDown);
                                break;

                            case "Country":

                                /*
                                if (screenPosition == "up") {
                                    dropDownIndex = 1;
                                } else {
                                    dropDownIndex = 0;
                                }
                                */

                                await global.enhancedClickOn(bonzaSignUpPage.main.countryList);
                                
                                break;

                            case "Province":

                                /*
                                if (screenPosition == "up") {
                                    dropDownIndex = 2;
                                } else {
                                    dropDownIndex = 1;
                                }
                                */

                                // can be either province or state depending on country selection
                                if (await global.waitForElement(bonzaSignUpPage.main.provinceDropDown, 2000, 1, true)) {
                                    await global.logComment("Province dropdown found");
                                    await global.clickOn(bonzaSignUpPage.main.provinceDropDown);
                                } else if (await global.waitForElement(bonzaSignUpPage.main.stateDropDown, 2000, 1, true)) {
                                    await global.logComment("State dropdown found");
                                    await global.clickOn(bonzaSignUpPage.main.stateDropDown);
                                }

                                break;

                        }

                    } else {

                        await global.enhancedClickOn(input.replace("android.widget.CheckedTextView", "*"));  // replacement since it's no longer a CheckedTextView

                    }

                    //await global.clickOn(dropDownElements[dropDownIndex]);
                    await global.pause(2000, true);

                    if (!clear) {

                        await global.clickOn(input);

                    } else {

                        await global.clickOn(bonzaSignUpPage.main.dropDown_Default);

                    }

                    break;

                case "phoneNumber":

                    // [bonzaSignUpPage.main.phoneNumberCountryList, bonzaSignUpPage.main.phoneNumberCountrySearch, country, 
                    //  bonzaSignUpPage.main.phoneNumberCountry_Australia, bonzaSignUpPage.main.phoneNumberInput, phoneNumber]
                    if (!clear) {

                        await global.clickOn(input[0]);
                        await global.pause(1000, true);
                        await global.addValue(input[1], input[2]);
                        await global.pause(1000, true);
                        await global.clickOn(input[3]);
                        await global.pause(1000, true);
                        await global.clearValue(input[4]);
                        await global.pause(1000, true);
                        await global.addValue(input[4], input[5]);

                    } else {

                        // TODO: might not work
                        //*[@text="Phone Number *"]
                        let phoneNumberConstructor = `//*[@text="${input[5]}"]`
                        await global.clearValue(phoneNumberConstructor);

                    }

                    break;

                case "checkbox":
                    
                    // bonzaSignUpPage.main.privacyPolicyCheckbox
                    // clear should work the same here assuming it's already been done
                    // TODO: check "checked" status
                    await global.clickOn(input);
                    break;

                case "submit":

                    await global.clickOn(input);
                    break;

            }

            return screenPosition;

        }

    });
    
    it('Forgot Password', async () => {

        // 3. Forgot password

        let userData = loginData.users.bonza.UAT.USER_RESET_1;
        let emailAddress = userData.USERNAME;
        let password = userData.PASSWORD;

        // Click on Forgot password button
        await global.clickOn(bonzaSignInPage.main.forgotPasswordLink);
        await global.pause(1000);
        // Click on request code button
        await tryToForgetPassword(true);
        // sign in should have failed
        // Add email address
        await global.pause(1000);
        await global.addValue(bonzaResetPasswordPage.main.emailAddressInput, emailAddress);
        await global.pause(1000);
        // Click on request code button
        await tryToForgetPassword(false);
        // forgot password should have succeeded
        // TODO: don't think I want to proceed here?
        // Fields A/B/C are all mandatory

        /*
        let passwordElements = await driver.$$(bonzaResetPasswordPage.main.genericPassword);
        
        let forgetPasswordProcess = [
            {'input': bonzaResetPasswordPage.main.resetPasswordCodeInput, 'value': 'TEST123'},
            {'input': passwordElements[0], 'value': 'Test1234567!'},
            {'input': passwordElements[1], 'value': 'Test1234567!'}
        ]
        */

        let forgetPasswordProcess = [
            {'input': bonzaResetPasswordPage.main.currentPasswordInput, 'value': 'TEST123'},
            {'input': bonzaResetPasswordPage.main.newPasswordInput, 'value': 'Test1234567!'},
            {'input': bonzaResetPasswordPage.main.confirmPasswordInput, 'value': 'Test1234567!'}
        ]

        // Test: AB, AC, BC for all possible combinations (as order does not matter). All should fail.
        let sequence = [[0, 1], [0, 2], [1, 2]];

        for (let i = 0; i < sequence.length; i++) {

            if (i > 0) {
                await clearAll(forgetPasswordProcess);
            }
            let firstIndex = sequence[i][0];
            let secondIndex = sequence[i][1];
            let firstSelection = forgetPasswordProcess[firstIndex];
            let secondSelection = forgetPasswordProcess[secondIndex];
            await global.addValue(firstSelection['input'], firstSelection['value']);
            await global.addValue(secondSelection['input'], secondSelection['value']);
            await tryToResetPassword(true);

        }

        // TODO: when I work out whether we want to succeed or not

        // returning to sign in screen for next section

        await global.clickOn(bonzaMainPage.toolbar.backButton);
        await global.pause(1000);

        async function clearAll(forgetPasswordProcess) {

            for (let i = 0; i < forgetPasswordProcess.length; i++) {

                let clearLength = forgetPasswordProcess[i]['value'].length;
                let censoredPassword = "";

                for (let x = 0; x < clearLength; x++) {
                    censoredPassword += "•";  // what is this character even called? weird ball?
                }

                try {
                    await global.clearValue(`//*[@text="${censoredPassword}"]`);
                } catch {
                    // nothing to clear
                }

            }

        }

        async function tryToForgetPassword(failureExpected = true) {

            // return value is whether it proceeded to the next screen or not

            await global.clickOn(bonzaResetPasswordPage.main.requestCodeButton);
            await global.pause(1000);

            if (await global.waitForElement(bonzaResetPasswordPage.main.resetPasswordButton, 2000)) {

                // if it succeeds

                if (failureExpected) {
                    await global.logError("Did not proceed to the reset password screen");
                } else {
                    await global.logSuccess("Proceeded to the reset password screen");
                }
                return true;

            } else {

                // if it fails

                if (failureExpected) {
                    await global.logSuccess("Did not proceed to the reset password screen without entering email address");
                } else {
                    await global.logError("Proceeded to the reset password screen without entering email address");
                }
                return false;

            }

        }

        async function tryToResetPassword(failureExpected) {

            // return value is whether it proceeded to the next screen or not

            await global.clickOn(bonzaResetPasswordPage.main.resetPasswordButton);
            await global.pause(1000);

            if (await global.waitForElement(bonzaResetPasswordPage.main.passwordSavedText, 2000)) {

                // if it succeeds

                if (failureExpected) {
                    await global.logError("Reset password with a missing field");
                } else {
                    await global.logSuccess("Successfully reset password with all fields populated");
                }
                return true;

            } else {

                // if it fails

                if (failureExpected) {
                    await global.logSuccess("Did not successfully reset password with a missing field");
                } else {
                    await global.logError("Reset password with a missing field");
                }

                // closes popup window if present
                if (await global.waitForElement(bonzaResetPasswordPage.main.passwordMismatchHeader, 1000)) {

                    await global.clickOn(bonzaResetPasswordPage.main.closePopupButton);

                } else if (await global.waitForElement(bonzaResetPasswordPage.main.unableToSaveNewPasswordHeader, 1000)) {

                    await global.clickOn(bonzaResetPasswordPage.main.closePopupButton);

                }

                return false;

            }

        }

    });

    it('Sign In', async () => {

        // 2. Sign in

        userData = loginData.users.bonza.UAT.USER_1;
        emailAddress = userData.USERNAME;
        password = userData.PASSWORD;

        // first, attempting to complete sign in without entering anything; this should fail
        await tryToSignIn("Blank fields");

        // send keys only to email field
        await global.addValue(bonzaSignInPage.main.emailInput, emailAddress);

        // now attempting to proceed without password
        await tryToSignIn("Email address only");

        await global.clearValue(bonzaSignInPage.main.emailInput);

        // send keys only to password field
        await global.addValue(bonzaSignInPage.main.passwordInput, password);

        // now attempting to proceed without email address
        await tryToSignIn("Password only");

        await global.clearValue(bonzaSignInPage.main.passwordInput);

        // reversing email/password
        await global.addValue(bonzaSignInPage.main.emailInput, password);
        await global.addValue(bonzaSignInPage.main.passwordInput, emailAddress);

        // now attempting to proceed
        await tryToSignIn("Email and passwords reversed");

        await global.clearValue(bonzaSignInPage.main.emailInput);
        await global.clearValue(bonzaSignInPage.main.passwordInput); 

        // now doing it properly
        await global.addValue(bonzaSignInPage.main.emailInput, emailAddress);
        await global.addValue(bonzaSignInPage.main.passwordInput, password);
        signedIn = await tryToSignIn("Desired input", false);

        await global.pause(2000);
        await global.clickOn(bonzaMainPage.toolbar.backButton);

        async function tryToSignIn(testName, failureExpected = true) {

            // return value is whether it signed in or not

            await global.clickOn(bonzaSignInPage.main.signInButton);
            await global.pause(1000);

            if (await global.waitForElement(bonzaSignInPage.main.failedSignInCloseButton, 2000)) {
                // if the failed sign in button appears, close it and consider the sign in a failure
                await global.clickOn(bonzaSignInPage.main.failedSignInCloseButton);
                if (failureExpected) {
                    await global.logSuccess(`${testName} test - did not sign in`);
                } else {
                    await global.logError(`${testName} test - did not sign in`);
                }
                return false;
            }
    
            if (await global.waitForElement(bonzaSignInPage.main.signInButton)) {

                if (failureExpected) {
                    await global.logSuccess(`${testName} test - did not sign in`);
                } else {
                    await global.logError(`${testName} test - did not sign in`);
                }

                return false;

            } else {

                if (failureExpected) {
                    await global.logError(`${testName} test - signed in`);
                } else {
                    await global.logSuccess(`${testName} test - signed in`);
                }

                return true;

            }
    

        }

    });

    it('Intermediate Flow and Travellers Details Page', async () => {

        // now back on home screen

        // 4. Flight search

        // in order to reset the page, one must go to the home screen and proceed through "View destinations" - just going back and then returning maintains
        // TODO: come back for this
        // it's actually quite difficult to try to "break" this

        // TODO: condense this into its own function, main path

        // must log out here, or else the passenger info screen will be simplified

        if (signedIn) {

            await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton);
            await global.pause(2000);
            //await global.scrollByKeyPress("d", 10);
            await global.scrollViaUIScrollable("d");
            try {
                await global.clickOn(bonzaMainPage.sideMenu.signOutButton);
            } catch {
                // sometimes fails for some reason
                await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton);
                await global.pause(2000);
                await global.scrollViaUIScrollable("d");
                await global.clickOn(bonzaMainPage.sideMenu.signOutButton);
            }
            await global.scrollViaUIScrollable("u");

        }  

        await bonzaHomePage.fullFlow("ABX", "random", departDate, returnDate, 1, 0, 0, 0);
        
        // Departing flight
        await bonzaFlightResultsPage.handleFlights(true);

        /*
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton);
        // Click on from button
        await global.clickOn(bonzaBookTripPage.bookTrip.fromButton);
        // Select from location
        await global.pause(1000);
        await global.destinations_selectFromByName('BDB');
        // Select to location
        await global.pause(1000);
        await global.destinations_selectToByName('MEL');
 
        departDate = await global.homePage_selectDepartDate(departDate);
        returnDate = await global.homePage_selectReturnDate(departDate, returnDate);
 
        // Click on confirm dates
        await global.homePage_confirmDates();
 
        // Select passengers
        await global.homePage_selectPassengers(1, 0, 0, 0);
 
        // Click on confirm travellers button
        console.log("Selected passenger count:");
        console.log(await global.homePage_getFinalPassengerCount());
        console.log("");
        await global.pause(1000);
        await global.clickOn(bonzaBookTripPage.bookTrip.confirmTravellersButton);
 
        // Click on show flights
        await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton);
        await global.pause(2000);

        // Departing flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton);
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton);
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton);

        // Returning flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton);
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton);
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton);

        */

        // 5. Travellers page

        // mandatory fields - just first and last name. Attempt to enter with only A and then only B

        await global.addValue(bonzaTravellersPage.main.firstTravellerFirstNameInput, firstName);
        await tryToFinishTravellerData(true);

        await global.pause(1000);
        
        await global.clearValue(bonzaTravellersPage.main.firstTravellerFirstNameInput);
        await global.addValue(bonzaTravellersPage.main.firstTravellerLastNameInput, lastName);
        await tryToFinishTravellerData(true);

        // finally proceeding properly

        await global.pause(1000);
        await global.addValue(bonzaTravellersPage.main.firstTravellerFirstNameInput, firstName);
        await tryToFinishTravellerData(false);

        async function tryToFinishTravellerData(failureExpected) {

            // return value is whether it proceeded to the next screen or not

            await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton);
            await global.pause(1000);

            if (await global.waitForElement(bonzaTravellersPage.main.errorMessage, 2000)) {

                // if it fails

                if (failureExpected) {
                    await global.logSuccess("Unable to proceed past traveller details page with missing information");
                } else {
                    await global.logError("Proceeded past traveller details page with missing information");
                }

                await global.clickOn(bonzaTravellersPage.main.closeErrorMessageButton);

                return false;

            } else {

                // if it succeeds

                if (failureExpected) {
                    await global.logError("Unable to proceed past traveller details page with all fields populated");
                } else {
                    await global.logSuccess("Proceeded past traveller details page with all fields populated");
                }

                return true;

            }

        }

        // ====================================== INTERLUDE, TRANSFERRING TO NEXT AREA ======================================

        // Click on Next flight button
        await global.pause(1000);
        await global.clickOn('//*[@text=" Next flight"]');
        await global.pause(1000);
        await global.enhancedClickOn('//android.view.ViewGroup[@content-desc="btn_skip-for-now"]');
        await global.pause(2000);
        // Click on Add bags button
        await global.clickOn('//*[@text=" Add Bags"]');
        await global.pause(1000);
        await global.enhancedClickOn('//android.view.ViewGroup[@content-desc="btn_skip-for-now"]');
        await global.pause(2000);
        // Click on next flight
        await global.clickOn(bonzaBagsPage.main.nextFlightButton);
        await global.pause(1000);
        await global.enhancedClickOn('//android.view.ViewGroup[@content-desc="btn_skip-for-now"]');
        await global.pause(2000);
        // Click on review booking
        await global.clickOn(bonzaBagsPage.main.reviewBookingButton);
        await global.pause(1000);
        await global.enhancedClickOn('//android.view.ViewGroup[@content-desc="btn_skip-for-now"]');
        await global.pause(2000);
        // Click on Continue to payment
        await global.clickOn(bonzaBagsPage.main.continueToPaymentButton);

        // ====================================== END INTERLUDE ======================================

    });

    it('Review Booking and Payment Page', async () => {

        // 6. Review booking page (+ voucher + payment fields)
        // it's not practical to reset this page and DOB cannot be reset - thus logical method is to try DOB first (i.e. all but DOB)

        // all information will be added - then, mandatory sections will be removed and then sign up attempted with them missing. None of these should succeed.

        // can't do simple up/down here since it spans 3 screens (actually 2.x) - instead we'll have 1-3, with 1 being default
        // it's not perfect but it should cut down on some seeking time
        let reviewScreenPosition = 1;

        let reviewProcess = {

            'Title': {'mandatory': true, 'type': 'dropdown', 'input': bonzaReviewBookingPage.main.title_Mrs},
            'First Name': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.firstNameInput, `${firstName}-${randomString}`]},
            'Middle Name': {'mandatory': false, 'type': 'text', 'input': [bonzaReviewBookingPage.main.middleNameInput, `${middleName}-${randomString}`]},
            'Last Name': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.lastNameInput, `${lastName}-${randomString}`]},
            'Date Of Birth': {'mandatory': true, 'type': 'dob', 'input': [bonzaReviewBookingPage.main.dateOfBirthList, bonzaReviewBookingPage.main.dateOfBirth_confirmButton]},
            'Phone Number': {'mandatory': true, 'type': 'phoneNumber', 'input': [bonzaReviewBookingPage.main.phoneNumberCountryList, bonzaReviewBookingPage.main.phoneNumberCountrySearch, country, 
                bonzaReviewBookingPage.main.phoneNumberCountry_Australia, bonzaReviewBookingPage.main.phoneNumberInput, phoneNumber]},
            'Email Address': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.emailAddressInput, emailAddressTest]},
            'Looks Good': {'mandatory': false, 'type': 'submit', 'input': bonzaReviewBookingPage.main.looksGoodButton}

        }

        for (let processName in reviewProcess) {

            let reviewMandatory = reviewProcess[processName]['mandatory'];

            if (processName != "Looks Good" && processName != "Date Of Birth" && reviewMandatory) {
                reviewScreenPosition = await completeReviewSection(reviewProcess[processName], processName, reviewScreenPosition);
                await global.pause(500, true);
            }

        }

        reviewScreenPosition = await completeReviewSection(reviewProcess['Looks Good'], 'Looks Good', reviewScreenPosition);
        await global.pause(500, true);
        await tryToFinishReviewPage(true, "Date Of Birth");
        // now finishing DOB
        await global.pause(1000);
        reviewScreenPosition = await completeReviewSection(reviewProcess["Date Of Birth"], "Date Of Birth", reviewScreenPosition);

        // now going through each mandatory field in term, clearing it, and then attempting to proceed

        for (let processName in reviewProcess) {

            if (processName != "Looks Good" && processName != "Date Of Birth") {

                reviewMandatory = reviewProcess[processName]['mandatory'];
                if (reviewMandatory) {

                    reviewScreenPosition = await completeReviewSection(reviewProcess[processName], processName, reviewScreenPosition, true);
                    await global.pause(500, true);
                    reviewScreenPosition = await completeReviewSection(reviewProcess['Looks Good'], 'Looks Good', reviewScreenPosition);
                    await global.pause(500, true);
                    await tryToFinishReviewPage(true, processName);
                    // re-enters information
                    reviewScreenPosition = await completeReviewSection(reviewProcess[processName], processName, reviewScreenPosition);

                }

            }

        }

        // finally, finish
        await global.pause(1000);
        reviewScreenPosition = await completeReviewSection(reviewProcess['Looks Good'], 'Looks Good', reviewScreenPosition);
        await global.pause(500, true);
        await tryToFinishReviewPage(false, "N/A");

        async function tryToFinishReviewPage(failureExpected, missingFieldName) {

            // return value is whether it successfully passed or not

            let reviewFailed = await global.waitForElement(bonzaReviewBookingPage.main.missingBookingDetails, 2000, 1, true);
            if (reviewFailed) {

                // unable to proceed

                if (failureExpected) {
                    await global.logSuccess(`Unable to proceed with ${missingFieldName} left empty`);
                } else {
                    await global.logError(`Unable to proceed with all mandatory fields filled`);
                }

                await global.clickOn(bonzaReviewBookingPage.main.closeMissingBookingDetailsPopup);

                return false;

            } else {

                // able to proceed

                if (failureExpected) {
                    await global.logError(`Able to proceed with ${missingFieldName} left empty`);
                } else {
                    await global.logSuccess(`Able to proceed with all mandatory fields filled`);
                }

                return true;

            }

        }

        async function completeReviewSection(section, name, screenPosition, clear = false) {

            let type = section['type'];
            let input = section['input'];

            if (!clear) {
                await global.logComment(`Now completing ${name}...`);
            } else {
                await global.logComment(`Now clearing ${name}...`);
            }

            // NB: date of birth does not use btn-dropdown

            switch (type) {

                case "text":

                    screenPosition = await findSection(input[0], screenPosition);

                    if (!clear) {
                        await global.addValue(input[0], input[1]);
                    } else {
                        await global.clearValue(input[0]);
                    }
                    
                    break;

                case "dob":

                    if (clear) {
                        await global.logComment("Date of Birth cannot be cleared so simply - skipping");
                        return screenPosition;
                    }

                    screenPosition = await findSection(input[0], screenPosition);

                    // [bonzaSignUpPage.main.dateOfBirthList, bonzaSignUpPage.main.dateOfBirth_confirmButton]

                    await global.clickOn(input[0]);
                    await global.pause(1000, true);
                    await global.clickOn(input[1]);

                    break;

                case "dropdown":

                    let dropDownSelector;

                    if (!clear) {
                        dropDownSelector = '//android.widget.TextView[@text="Title *"]';
                    } else {
                        dropDownSelector = '//android.widget.TextView[@text="Mrs"]';
                    }

                    //screenPosition = await findSection(bonzaReviewBookingPage.main.titleList, screenPosition);
                    screenPosition = await findSection(dropDownSelector, screenPosition);

                    //await global.clickOn(bonzaReviewBookingPage.main.titleList);
                    await global.clickOn(dropDownSelector);
                    await global.pause(1000, true);

                    if (!clear) {

                        await global.clickOn(input);

                    } else {

                        await global.clickOn(bonzaReviewBookingPage.main.title_Default);

                    }

                    break;

                case "phoneNumber":

                    screenPosition = await findSection(input[0], screenPosition);

                    if (!clear) {

                        await global.clickOn(input[0]);
                        await global.pause(1000, true);
                        await global.addValue(input[1], input[2]);
                        await global.clickOn(input[3]);
                        await global.clearValue(input[4]);
                        await global.addValue(input[4], input[5]);

                    } else {

                        //*[@text="Phone Number *"]
                        let phoneNumberConstructor = `//*[@text="${input[5]}"]`
                        await global.clearValue(phoneNumberConstructor);

                    }

                    break;

                case "checkbox":

                    screenPosition = await findSection(input, screenPosition);
                    
                    // bonzaSignUpPage.main.privacyPolicyCheckbox
                    // clear should work the same here assuming it's already been done
                    // TODO: check "checked" status
                    await global.clickOn(input);
                    break;

                case "submit":

                    screenPosition = await findSection(input, screenPosition);

                    await global.clickOn(input);
                    break;

            }

            return screenPosition;

        }

        async function findSection(selector, screenPosition) {

            let sectionFound = await global.waitForElement(selector, 1000, 1, true);
            if (sectionFound) {
                return screenPosition;
            }

            let screenPositionsAttempted = [screenPosition];
            let possiblePositions = [1, 2, 3];
            let scrollDifferential = -1;

            while (screenPositionsAttempted.length < possiblePositions.length) {

                // now trying the other ones that haven't been attempted yet
                for (let index = 0; index < possiblePositions.length; index++) {

                    let possiblePosition = possiblePositions[index];

                    if (!screenPositionsAttempted.includes(possiblePosition)) {

                        scrollDifferential = screenPosition - possiblePosition;
                        if (scrollDifferential > 0) {
                            // positive -> screenPosition is larger than the desired position -> scroll up
                            await global.scrollViaUIScrollable("u", scrollDifferential);
                        } else {
                            // negative -> screenPosition is smaller than the desired position -> scroll down
                            await global.scrollViaUIScrollable("d", Math.abs(scrollDifferential));
                        }

                        await global.pause(1000, true);

                        screenPositionsAttempted.push(possiblePosition);
                        screenPosition = possiblePosition;

                        sectionFound = await global.waitForElement(selector, 1000, 1, true);
                        if (sectionFound) {
                            return screenPosition;
                        }

                    }
                }

            }

            await global.logError(`Unable to find element with selector ${selector}`);
            return screenPosition;

        }

        // payment section

        await global.pause(1000);
        await global.enhancedClickOn(bonzaReviewBookingPage.main.visaDebit);
        await global.waitForElement(bonzaReviewBookingPage.main.feesOKButton);
        await global.enhancedClickOn(bonzaReviewBookingPage.main.feesOKButton);

        // I don't think we need to test that the prior sections are still mandatory, so now just the payment bits

        let paymentProcess = {

            'Cardholder Name': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.nameOnCardInput, "Test Tester"]},
            'Card': {'mandatory': true, 'type': 'credit card', 'input': [bonzaReviewBookingPage.main.cardNumberInput, cardNumber, 
                bonzaReviewBookingPage.main.cardExpirationDateInput, cardExpiration,
                bonzaReviewBookingPage.main.cardCVCInput, cardCVC]},
            'Billing Address': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.billingAddressInput, street]},
            'City': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.cityInput, city]},
            'Country': {'mandatory': true, 'type': 'dropdown', 'input': [bonzaReviewBookingPage.main.countryList, bonzaReviewBookingPage.main.country_Australia, bonzaReviewBookingPage.main.country_Default]},
            'State': {'mandatory': true, 'type': 'dropdown', 'input': [bonzaReviewBookingPage.main.districtList, bonzaReviewBookingPage.main.district_NSW, bonzaReviewBookingPage.main.district_Default]},
            'Postcode': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.postCodeInput, postcode]},
            'Terms and Conditions': {'mandatory': true, 'type': 'checkbox', 'input': bonzaReviewBookingPage.main.acceptTermsCheckbox},
            'Book Now': {'mandatory': false, 'type': 'submit', 'input': bonzaReviewBookingPage.main.bookNowButton}

        }

        for (let processName in paymentProcess) {

            let paymentMandatory = paymentProcess[processName]['mandatory'];

            if (paymentMandatory) {
                await completePaymentSection(paymentProcess[processName], processName);
                await global.pause(1000, true);
            }

        }

        // now going through each mandatory field in term, clearing it, and then attempting to proceed
        // must re-arrange order slightly - state before country

        let clearPaymentProcess = {

            'Cardholder Name': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.nameOnCardInput, "Test Tester"]},
            //'Card': {'mandatory': true, 'type': 'credit card', 'input': [bonzaReviewBookingPage.main.cardNumberInput, cardNumber, 
            //    bonzaReviewBookingPage.main.cardExpirationDateInput, cardExpiration,
            //    bonzaReviewBookingPage.main.cardCVCInput, cardCVC]},
            'Billing Address': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.billingAddressInput, street]},
            'City': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.cityInput, city]},
            'State': {'mandatory': true, 'type': 'dropdown', 'input': [bonzaReviewBookingPage.main.districtList, bonzaReviewBookingPage.main.district_NSW, bonzaReviewBookingPage.main.district_Default, "New South Wales"]},
            'Country': {'mandatory': true, 'type': 'dropdown', 'input': [bonzaReviewBookingPage.main.countryList, bonzaReviewBookingPage.main.country_Australia, bonzaReviewBookingPage.main.country_Default, "Australia"]},
            'Postcode': {'mandatory': true, 'type': 'text', 'input': [bonzaReviewBookingPage.main.postCodeInput, postcode]},
            'Zip Code': {'mandatory': true, 'type': 'text', 'input': [zipCodeInput, postcode]},
            'Terms and Conditions': {'mandatory': true, 'type': 'checkbox', 'input': bonzaReviewBookingPage.main.acceptTermsCheckbox},
            'Book Now': {'mandatory': false, 'type': 'submit', 'input': bonzaReviewBookingPage.main.bookNowButton}

        }

        for (let processName in clearPaymentProcess) {

            paymentMandatory = clearPaymentProcess[processName]['mandatory'];

            if (paymentMandatory) {

                await completePaymentSection(clearPaymentProcess[processName], processName, true);
                await global.pause(1000, true);
                await completePaymentSection(clearPaymentProcess['Book Now'], 'Book Now');
                await global.pause(500, true);
                await tryToFinishPaymentPage(true, processName);
                // re-enters information
                await completePaymentSection(clearPaymentProcess[processName], processName);
                if (processName == "Country") {
                    // if country is being redone, State must be re-entered
                    await completePaymentSection(clearPaymentProcess["State"], "State");
                }

            }

        }

        // TODO: come back for card stuff later, really frustrating

        // now handle card - must be done separately
        // the visible text will not be default
        /*
        let creditCardVisibleNumber = cardNumber.substring(cardNumber.length - 4, cardNumber.length);
        let creditCardPartialNumberField = `//*[@text="${creditCardVisibleNumber}"]`;
        let creditCardFullNumberField = `//*[@text="${cardNumber}"]`;
        let expiryField = `//*[@text="${cardExpiration}"]`;
        let cvcField = `//*[@text="${cardCVC}"]`;

        // CVC
        await global.logComment("Now clearing CVC...");
        await global.clearValue(cvcField);
        await driver.hideKeyboard();
        await completePaymentSection(clearPaymentProcess['Book Now'], 'Book Now');
        await global.pause(500, true);
        await tryToFinishPaymentPage(true, "CVC");
        await global.enhancedClickOn(bonzaReviewBookingPage.main.cardCVCInput, 5, 5);
        await global.enhancedAddValue(bonzaReviewBookingPage.main.cardCVCInput, cardCVC, 5, 5);
        await driver.hideKeyboard();

        await global.pause(1000);

        // expiry date
        await global.logComment("Now clearing Expiry Date...");
        await global.clearValue(expiryField);
        await driver.hideKeyboard();
        await completePaymentSection(clearPaymentProcess['Book Now'], 'Book Now');
        await global.pause(500, true);
        await tryToFinishPaymentPage(true, "Expiry Date");
        let testLength = await driver.$$('//android.Widget.ImageView');
        for (let i = testLength - 1; i > -1; i--) {
            try {
                await global.clickOn(bonzaReviewBookingPage.main.cardCVCInput);
                break;
            } catch {
                await global.clickOn(`(//*[android.widget.ImageView])[${i}]`);
                await global.pause(500);
                try {
                    await global.clickOn(bonzaReviewBookingPage.main.cardCVCInput);
                    break;
                } catch {
                    await global.clickOn(`(//*[android.widget.ImageView])[${i}]`);
                    await global.pause(500);
                }
            }
        }
        //await global.clickOn(bonzaReviewBookingPage.main.cardIconInputClickTwice);
        //await global.pause(500);
        //await global.clickOn(bonzaReviewBookingPage.main.cardIconInputClickTwice);
        //await global.clickOn(bonzaReviewBookingPage.main.cardCVCInput);
        await global.addValue(bonzaReviewBookingPage.main.cardExpirationDateInput, cardExpiration, 5, 5);
        await driver.hideKeyboard();

        await global.pause(1000);

        // credit card number
        await global.logComment("Now clearing Credit Card Number...");
        await global.clickOn(bonzaReviewBookingPage.main.cardIconInputClickTwice);
        await global.pause(500);
        await global.clickOn(bonzaReviewBookingPage.main.cardIconInputClickTwice);
        await global.clearValue(creditCardFullNumberField);
        await driver.hideKeyboard();
        await completePaymentSection(clearPaymentProcess['Book Now'], 'Book Now');
        await global.pause(500, true);
        await tryToFinishPaymentPage(true, "Card Number");
        await global.enhancedClickOn(bonzaReviewBookingPage.main.cardNumberInput, 5, 5);
        await global.enhancedAddValue(bonzaReviewBookingPage.main.cardNumberInput, cardNumber, 5, 5);
        await driver.hideKeyboard();

        */

        //[bonzaReviewBookingPage.main.cardNumberInput, cardNumber, 
            //    bonzaReviewBookingPage.main.cardExpirationDateInput, cardExpiration,
            //    bonzaReviewBookingPage.main.cardCVCInput, cardCVC]},

        async function completePaymentSection(section, name, clear = false) {

            let type = section['type'];
            let input = section['input'];

            if (!clear) {
                await global.logComment(`Now completing ${name}...`);
            } else {
                await global.logComment(`Now clearing ${name}...`);
            }

            // NB: date of birth does not use btn-dropdown

            switch (type) {

                case "text":

                    if (!clear) {
                        await global.enhancedAddValue(input[0], input[1]);
                    } else {
                        await global.enhancedClearValue(input[0]);
                    }
                    
                    break;

                case "dropdown":

                    // for some reason, country in particular tends to be unresponsive until multiple clicks and/or time has passed
                    // could be cleaner but in the interests of time, leaving it like this for now

                    if (!clear) {

                        await global.pause(3000, true);
                        await global.enhancedClickOn(input[0]);
                        await global.pause(1000, true);

                        try {
                            await global.enhancedClickOn(input[1]);
                        } catch {
                            await global.enhancedClickOn(input[0]);
                            await global.pause(1000, true);
                            await global.enhancedClickOn(input[1]);
                        }

                    } else {

                        let paymentDropDownSelector = `//*[@text="${input[3]}"]`;

                        await global.pause(3000, true);
                        await global.enhancedClickOn(paymentDropDownSelector);
                        await global.pause(1000, true);

                        try {
                            await global.enhancedClickOn(input[2]);
                        } catch {
                            await global.enhancedClickOn(paymentDropDownSelector);
                            await global.pause(1000, true);
                            await global.enhancedClickOn(input[2]);
                        }

                    }

                    break;
                
                case "credit card":

                    if (!clear) {

                        await global.enhancedClickOn(input[0]);
                        await global.addValue(input[0], input[1]);
                        // Hide the keyboard
                        await driver.hideKeyboard();
                        await global.pause(1000);
                        await global.enhancedClickOn(input[2]);
                        await global.addValue(input[2], input[3]);
                        await global.pause(1000);
                        await global.enhancedClickOn(input[4]);
                        await global.enhancedAddValue(input[4], input[5]);
                        // Hide the keyboard
                        await driver.hideKeyboard();

                    }

                    break;

                case "checkbox":

                    await global.enhancedClickOn(input);
                    break;

                case "submit":

                    await global.enhancedClickOn(input);
                    break;

            }

        }

        async function tryToFinishPaymentPage(failureExpected, missingFieldName) {

            // return value is whether it successfully passed or not
            // there are multiple possible failure screens

            let possibleFailures = [bonzaReviewBookingPage.main.reservationUnsuccessfulText, 
                bonzaReviewBookingPage.main.termsAndConditionsUnsuccessfulText,
                bonzaReviewBookingPage.main.paymentUnsuccessfulText];

            // TODO: make cleaner
            //let failureButtons = [bonzaReviewBookingPage.main.reservationUnsuccessfulCloseButton, 
            //    bonzaReviewBookingPage.main.termsAndConditionsUnsuccessfulCloseButton,
            //    bonzaReviewBookingPage.main.paymentUnsuccessfulCloseButton];
            //let failureButtons = ['//*[@text=" OK"]',
            //    '//*[@text="OK "]',
            //    '//*[@text=" Ok"]',
            //    '//*[@text="Ok "]'];
            let failureButtons = ['//*[contains(@text, "OK")]',
                                  '//*[contains(@text, "Ok")]']

            for (let i = 0; i < possibleFailures.length; i++) {

                let failed = await global.waitForElement(possibleFailures[i], 2000, 1, true);

                if (failed) {

                    // unable to proceed

                    if (failureExpected) {
                        await global.logSuccess(`Unable to proceed with ${missingFieldName} left empty`);
                    } else {
                        await global.logError(`Unable to proceed with all mandatory fields filled`);
                    }

                    for (let x = 0; x < failureButtons.length; x++) {

                        if (await global.waitForElement(failureButtons[x], 1000, 1, true)) {
                            await global.clickOn(failureButtons[x]);
                            return false;
                        }

                    }

                    await global.logError("Unable to find button to close the popup");
                    return false;

                }

            }

            // able to proceed if no failure dialog has appeared until now

            if (failureExpected) {
                await global.logError(`Able to proceed with ${missingFieldName} left empty - or at least no popup appeared`);
            } else {
                await global.logSuccess(`Able to proceed with all mandatory fields filled`);
            }

            return true;

        }

    });

});