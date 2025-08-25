const global = require("../../commands.conf");
const sessionData = require("../../sessionData");
const bonzaTravellersPage = require("./page-bonza-travellers");
const bonzaHomePage = require ('./page-bonza-home');
const bonzaBookTripPage = require ('./page-bonza-book-trip');
const bonzaFlightResultsPage = require ('./page-bonza-flight-results');
const bonzaSeatsPage = require ('./page-bonza-seats');
const bonzaBagsPage = require ('./page-bonza-bags');

const titleList = '~input__ibe__confirmation__passenger-tab__title_0';
const title_Default = '//android.widget.CheckedTextView[@text=""]';
const title_Mr = '//android.widget.CheckedTextView[@text="Mr"]';
const title_Mrs = '//android.widget.CheckedTextView[@text="Mrs"]';
const title_Ms = '//android.widget.CheckedTextView[@text="Ms"]';
const title_Miss = '//android.widget.CheckedTextView[@text="Miss"]';
//const firstNameInput = '//android.widget.EditText[@content-desc="input__ibe__confirmation__passenger-tab__first-name"]';
//const firstNameInput = '//android.widget.EditText[@content-desc="input__ibe__confirmation__passenger-tab__first-name_0"]';
const firstNameInput = '~input__ibe__confirmation__passenger-tab__first-name_0';
//const middleNameInput = '//android.widget.EditText[@content-desc="input__ibe__confirmation__passenger-tab__middle-name"]';
//const middleNameInput = '//android.widget.EditText[@content-desc="input__ibe__confirmation__passenger-tab__middle-name_0"]';
const middleNameInput = '~input__ibe__confirmation__passenger-tab__middle-name_0';
//const lastNameInput = '//android.widget.EditText[@content-desc="input__ibe__confirmation__passenger-tab__last-name"]';
//const lastNameInput = '//android.widget.EditText[@content-desc="input__ibe__confirmation__passenger-tab__last-name_0"]';
const lastNameInput = '~input__ibe__confirmation__passenger-tab__last-name_0';
//const dateOfBirthList = '//android.view.ViewGroup[@content-desc="input__ibe__confirmation__passenger-tab__dob_0"]';
const dateOfBirthList = '~input__ibe__confirmation__passenger-tab__dob_0';
const dateOfBirth_month_august = '//android.widget.Button[@text="August"]';
const dateOfBirth_month_may = '//android.widget.Button[@text="May"]';
const dateOfBirth_day_8 = '//android.widget.Button[@text="8"]';
const dateOfBirth_year_2006 = '//android.widget.Button[@text="2006"]';
const dateOfBirth_cancelButton = 'android:id/button2';
const dateOfBirth_confirmButton = '//android.widget.Button[@text="CONFIRM"]';
const phoneNumberCountryList = '//*[@text="🇦🇺"]';
const phoneNumberCountrySearch = '//*[@resource-id="text-input-country-filter"]';
const phoneNumberCountry_Australia = '//*[@resource-id="country-selector-AU"]';
const phoneNumberCountry_Israel = '//*[@resource-id="country-selector-IL"]';
//const phoneNumberInputSuccinct = '//*[@text="Phone Number *"]';
//const phoneNumberInput = '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.EditText';
const phoneNumberInput = '//*[@text="Phone Number *"]';
//const emailAddressInput = '//android.widget.EditText[@content-desc="input__ibe__confirmation__passenger-tab__email-address"]';
//const emailAddressInput = '//android.widget.EditText[@content-desc="input__ibe__confirmation__passenger-tab__email-address_0"]';
const emailAddressInput = '~input__ibe__confirmation__passenger-tab__email-address_0';
//const receiveEmailsCheckbox = '//android.widget.CheckBox[@content-desc="opt-in-email-checkbox"]';
const receiveEmailsCheckbox = '~opt-in-email-checkbox_0';
//const createAccountCheckbox = '//android.widget.CheckBox[@content-desc="create-account-checkbox"]';
const createAccountCheckbox = '~create-account-checkbox_0';
const createAccountPassword = '~input__account__password-field__password_password_passengerTab_0';
const createAccountConfirmPassword = '~input__account__password-field__password_confirm_password_passengerTab_0';
const missingBookingDetails = '//android.widget.TextView[@text="Missing Booking Details"]';
const closeMissingBookingDetailsPopup = '//android.view.ViewGroup[@content-desc="button__click"]';
const priceAdjustmentPopup = '//*[contains(@text, "Price Adjustment")]';
const priceAdjustmentClose = '//*[contains(@text, "OK")]';
const looksGoodButton = '//*[contains(@text, "Looks good")]';
const totalPrice = '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[3]';
//const priceBreakdownToggle = '~touchable-opacity__general__collapse__toggle';
const priceBreakdownToggle = '~touchable-opacity__general__collapse__toggle-confirmation-and-payment-price-summary';
const flightPriceValue = '//android.view.ViewGroup[@content-desc="touchable-opacity__general__collapse__toggle-confirmation-and-payment-price-summary"]/android.widget.TextView[4]';
const seatsPriceValue = '//android.view.ViewGroup[@content-desc="touchable-opacity__general__collapse__toggle-confirmation-and-payment-price-summary"]/android.widget.TextView[6]';
const bagsPriceValue = '//android.view.ViewGroup[@content-desc="touchable-opacity__general__collapse__toggle-confirmation-and-payment-price-summary"]/android.widget.TextView[8]';
const voucherAppliedValue = '//android.view.ViewGroup[@content-desc="touchable-opacity__general__collapse__toggle-confirmation-and-payment-price-summary"]/android.widget.TextView[10]';
const voucherCheckbox = '//android.widget.CheckBox[@content-desc="input__ibe__confirmation__payment-form__voucher-checkbox"]';
const voucherInput = '~input__ibe__confirmation__payment-form__voucher-input';
const voucherApplyButton = '~btn_submit-voucher';
const voucherPopupMessageText = '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView';
const voucherOKButton = '~btn_add-on-bags';
const mastercardDebit = '//*[@text="Mastercard"]';
const visaDebit = '//*[@text="Visa"]';
const mastercardCredit = '//*[@text="Mastercard"]';
const visaCredit = '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[2]/android.widget.TextView[1]';
const payTo = '//*[@text="PayTo Internet"]';
const poli = '//*[@text="POLi Internet"]';
const payToSelectNotificationButton = '~input__ibe__monoova_notification_selection';
const payToPhoneNumber = '//*[@text="PayID - Phone Number"]';
const payToPhoneNumberInput = '//*[@text="Phone Number"]';
const payToSubmitButton = '~button__click';
const payToSuccessMessageTitle = '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.TextView';
const feesOKButton = '//*[@text=" OK"]';
const nameOnCardInput = '//*[@content-desc="input__ibe__confirmation__payment-form__name-on-card"]';
//const cardNumberInput = '//*[@text="1234 5678 1234 5678*"]';
const cardNumberInput = '//*[contains(@text, "Card number")]';
//const cardExpirationDateInput = '//*[@text="MM/YY"]';
const cardExpirationDateInput = '//*[contains(@text, "Expiration date")]';
const cardCVCInput = '//*[contains(@text, "CVC")]';
const cardIconInputClickTwice = '(//*[android.widget.ImageView])[5]';
const billingAddressInput = '//*[@content-desc="input__ibe__confirmation__payment-form__billing-address"]';
const cityInput = '//*[@content-desc="input__ibe__confirmation__payment-form__city"]';
const countryList = '//android.view.ViewGroup[@content-desc="input__ibe__confirmation__payment-form__country"]';
const country_Default = '//android.widget.CheckedTextView[@text=""]';
const country_Australia = '//android.widget.CheckedTextView[@text="Australia"]';
const districtList = '//*[@text="State"]';
const district_Default = '//android.widget.CheckedTextView[@text=""]';
const district_NSW = '//android.widget.CheckedTextView[@text="New South Wales"]';
const postCodeInput = '//*[@content-desc="input__ibe__confirmation__payment-form__postal-code"]';
const zipCodeInput = '//*[@text="ZIP Code"]';
const acceptTermsCheckbox = '//android.widget.CheckBox[@content-desc="booking__payment__tc"]';
const bookNowButton = '//android.view.ViewGroup[@content-desc="button__click"]';
const reservationUnsuccessfulText = '//*[@text="Reservation Exception"]';
const reservationUnsuccessfulCloseButton = '//*[@text="OK"]';
const termsAndConditionsUnsuccessfulText = '//*[@text="Terms & Conditions"]';
const termsAndConditionsUnsuccessfulCloseButton = '//*[@text="Ok"]';
const paymentUnsuccessfulText = '//*[@text="Payment Unsuccessful"]';
const paymentUnsuccessfulCloseButton = '//*[@text="OK"]';
const bookingReferenceTitle = '//*[@text="HERE IS YOUR BOOKING REFERENCE"]';


async function handleReviewInformation(nAdults, nYouths, nChildren, nInfants) {

    let nPassengers = nAdults + nYouths + nChildren + nInfants;
    let firstName;
    let lastName;
    let title;
    let country = 'Israel';
    let phoneNumber = 526647788;
    let emailAddress = await sessionData.getEmail();
    // let emailAddress = 'bonza1@yopmail.com';
    let reviewProcess;

    for (let i = 0; i < nPassengers; i++) {

        firstName = await bonzaTravellersPage.getName(nAdults, nYouths, nChildren, nInfants, i, false);
        lastName = await bonzaTravellersPage.getName(nAdults, nYouths, nChildren, nInfants, i, true);

        // setting a different process payload depending on factors

        if (i == 0) {

            reviewProcess = {

                'Title': {'mandatory': true, 'type': 'dropdown', 'input': title_Ms},
                'Date Of Birth': {'mandatory': true, 'type': 'dob', 'input': [dateOfBirthList, dateOfBirth_confirmButton]},
                'Phone Number': {'mandatory': true, 'type': 'phoneNumber', 'input': [phoneNumberCountryList, phoneNumberCountrySearch, country, 
                    phoneNumberCountry_Israel, phoneNumberInput, phoneNumber]},
                'Email Address': {'mandatory': true, 'type': 'text', 'input': [emailAddressInput, emailAddress]}
        
            };

        } else {

            if (firstName.includes("Adt") || firstName.includes("Yth")) {
                title = title_Ms;
            } else {
                title = title_Miss;
            }

            reviewProcess = {

                'Title': {'mandatory': true, 'type': 'dropdown', 'input': title},
                'Date Of Birth': {'mandatory': true, 'type': 'dob', 'input': [dateOfBirthList.replace("_0", `_${i}`), dateOfBirth_confirmButton]}

            };

        }
        
        for (let processName in reviewProcess) {

            await completeReviewSection(reviewProcess[processName], processName);
            await global.pause(500, true);
    
        }

        await global.scrollViaUIScrollable("d");

    }

    reviewProcess = {
        'Looks Good': {'mandatory': false, 'type': 'submit', 'input': looksGoodButton}
    };

    await completeReviewSection(reviewProcess['Looks Good'], 'Looks Good');
    await global.pause(1000, true);

    if (await global.waitForElement(priceAdjustmentPopup, 2000, 1, false)) {

        await global.logComment("Closing price adjustment window");
        await global.clickOn(priceAdjustmentClose);
        await global.pause(1000, true);
        if (await global.waitForElement(looksGoodButton, 2000, 1, true)) {
            await completeReviewSection(reviewProcess['Looks Good'], 'Looks Good');
        }

    }

    if (await global.waitForElement(reservationUnsuccessfulText, 2000, 1, false)) {

        await global.logError("Reservation exception - unable to reserve one or more of your selections");
        await global.clickOn(reservationUnsuccessfulCloseButton);
        return;
        
    }

    // needs to pick Miss if it's a CHD(/INF?)

    /*

    let country = 'Israel';
    let phoneNumber = 526647788;
    let emailAddress = 'bonza1@yopmail.com';

    let reviewProcess = {

        'Title': {'mandatory': true, 'type': 'dropdown', 'input': title_Ms},
        //'First Name': {'mandatory': true, 'type': 'text', 'input': [firstNameInput, `${firstName}-${randomString}`]},
        'First Name': {'mandatory': true, 'type': 'text', 'input': [firstNameInput, firstName]},
        //'Middle Name': {'mandatory': false, 'type': 'text', 'input': [middleNameInput, `${middleName}-${randomString}`]},
        'Middle Name': {'mandatory': false, 'type': 'text', 'input': [middleNameInput, "Middle"]},
        //'Last Name': {'mandatory': true, 'type': 'text', 'input': [lastNameInput, `${lastName}-${randomString}`]},
        'Last Name': {'mandatory': true, 'type': 'text', 'input': [lastNameInput, lastName]},
        'Date Of Birth': {'mandatory': true, 'type': 'dob', 'input': [dateOfBirthList, dateOfBirth_confirmButton]},
        'Phone Number': {'mandatory': true, 'type': 'phoneNumber', 'input': [phoneNumberCountryList, phoneNumberCountrySearch, country, 
            phoneNumberCountry_Israel, phoneNumberInput, phoneNumber]},
        'Email Address': {'mandatory': true, 'type': 'text', 'input': [emailAddressInput, emailAddress]},
        'Looks Good': {'mandatory': false, 'type': 'submit', 'input': looksGoodButton}

    }

    for (let processName in reviewProcess) {

        if (processName != "Looks Good") {
            reviewScreenPosition = await completeReviewSection(reviewProcess[processName], processName, reviewScreenPosition);
            await global.pause(500, true);
        }

    }

    reviewScreenPosition = await completeReviewSection(reviewProcess['Looks Good'], 'Looks Good', reviewScreenPosition);
    await global.pause(1000, true);

    if (await global.waitForElement(priceAdjustmentPopup, 2000, 1, false)) {

        await global.logComment("Closing price adjustment window");
        await global.clickOn(priceAdjustmentClose);
        await global.pause(1000, true);
        if (await global.waitForElement(looksGoodButton, 2000, 1, true)) {
            reviewScreenPosition = await completeReviewSection(reviewProcess['Looks Good'], 'Looks Good', reviewScreenPosition);
        }

    }

    if (await global.waitForElement(reservationUnsuccessfulText, 2000, 1, false)) {

        await global.logError("Reservation exception - unable to reserve one or more of your selections");
        await global.clickOn(reservationUnsuccessfulCloseButton);
        return;
        
    }

    */

}
   
async function completeReviewSection(section, name) {

    let type = section['type'];
    let input = section['input'];

    await global.logComment(`Now completing ${name}...`);
    // NB: date of birth does not use btn-dropdown

    switch (type) {

        case "text":

            await findSection(input[0]);

            await global.enhancedAddValue(input[0], input[1]);
            
            break;

        case "dob":

            await findSection(input[0]);

            // [bonzaSignUpPage.main.dateOfBirthList, bonzaSignUpPage.main.dateOfBirth_confirmButton]

            await global.enhancedClickOn(input[0], 5, 5);
            await global.pause(1000, true);
            await global.clickOn(input[1]);

            break;

        case "dropdown":

            let dropDownSelector;

            dropDownSelector = '//android.widget.TextView[@text="Title *"]';

            //screenPosition = await findSection(titleList, screenPosition);
            await findSection(dropDownSelector);

            //await global.clickOn(titleList);
            await global.enhancedClickOn(dropDownSelector);
            await global.pause(1000, true);

            await global.clickOn(input);

            break;

        case "phoneNumber":

            await findSection(input[0]);

            await global.enhancedClickOn(input[0]);
            await global.pause(1000, true);
            await global.addValue(input[1], input[2]);
            await global.clickOn(input[3]);
            await global.clearValue(input[4]);
            await global.addValue(input[4], input[5]);

            break;

        case "checkbox":

            await findSection(input);
            
            // bonzaSignUpPage.main.privacyPolicyCheckbox
            await global.enhancedClickOn(input);
            break;

        case "submit":

            await findSection(input);

            await global.enhancedClickOn(input);
            break;

    }

}

async function findSection(selector) {

    // as long as we don't need to scroll up, this way works

    let sectionFound = false;
    let timesScrolled = 0;

    while (!sectionFound) {

        sectionFound = await global.waitForElement(selector, 1000, 1, true);
        if (sectionFound) {
            return;
        } else {
            timesScrolled++;
            await global.scrollViaUIScrollable("d");
        }

        if (timesScrolled > 10) { // arbitrary

            await global.logError(`Unable to find element with selector ${selector}`);
            return;

        }

    }

    /*

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

    */

}

async function handlePayment() {

    let street = 'Test Street';
    let city = 'Tel Aviv';
    let postcode = '564875';
    let cardNumber = '4111 1111 1111 1111';
    let cardExpiration = '03/27';
    let cardCVC = '425';

    // payment section

    await global.pause(1000);
    await global.enhancedClickOn(visaDebit);
    await global.waitForElement(feesOKButton);
    await global.enhancedClickOn(feesOKButton);

    let paymentProcess = {

        'Cardholder Name': {'mandatory': true, 'type': 'text', 'input': [nameOnCardInput, "Test Tester"]},
        'Card': {'mandatory': true, 'type': 'credit card', 'input': [cardNumberInput, cardNumber, 
            cardExpirationDateInput, cardExpiration,
            cardCVCInput, cardCVC]},
        'Billing Address': {'mandatory': true, 'type': 'text', 'input': [billingAddressInput, street]},
        'City': {'mandatory': true, 'type': 'text', 'input': [cityInput, city]},
        'Country': {'mandatory': true, 'type': 'dropdown', 'input': [countryList, country_Australia, country_Default]},
        'State': {'mandatory': true, 'type': 'dropdown', 'input': [districtList, district_NSW, district_Default]},
        'Postcode': {'mandatory': true, 'type': 'text', 'input': [postCodeInput, postcode]},
        'Zip Code': {'mandatory': true, 'type': 'text', 'input': [zipCodeInput, postcode]},
        'Terms and Conditions': {'mandatory': true, 'type': 'checkbox', 'input': acceptTermsCheckbox},
        'Book Now': {'mandatory': false, 'type': 'submit', 'input': bookNowButton}

    }

    for (let processName in paymentProcess) {

        await completePaymentSection(paymentProcess[processName], processName);
        await global.pause(1000, true);

    }

}

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
                await global.enhancedAddValue(input[0], input[1], 5, 5);
            } else {
                await global.enhancedClearValue(input[0], 5, 5);
            }
            
            break;

        case "dropdown":

            // for some reason, country in particular tends to be unresponsive until multiple clicks and/or time has passed
            // could be cleaner but in the interests of time, leaving it like this for now

            if (!clear) {

                await global.pause(3000, true);
                await global.enhancedClickOn(input[0], 5, 5);
                await global.pause(1000, true);

                try {
                    await global.clickOn(input[1], true);
                } catch {
                    await global.clickOn(input[0]);
                    await global.pause(1000, true);
                    await global.clickOn(input[1]);
                }

            } else {

                let paymentDropDownSelector = `//*[@text="${input[3]}"]`;

                await global.pause(3000, true);
                await global.enhancedClickOn(paymentDropDownSelector);
                await global.pause(1000, true);

                try {
                    await global.enhancedClickOn(input[2], 5, 5);
                } catch {
                    await global.enhancedClickOn(paymentDropDownSelector);
                    await global.pause(1000, true);
                    await global.enhancedClickOn(input[2], 5, 5);
                }

            }

            break;
        
        case "credit card":

            if (!clear) {

                await global.enhancedClickOn(input[0], 5, 5);
                await global.addValue(input[0], input[1]);
                // Hide the keyboard
                await driver.hideKeyboard();
                await global.pause(1000);
                await global.enhancedClickOn(input[2], 5, 5);
                await global.addValue(input[2], input[3]);
                await global.pause(1000);
                await global.enhancedClickOn(input[4], 5, 5);
                await global.enhancedAddValue(input[4], input[5], 5, 5);
                // Hide the keyboard
                await driver.hideKeyboard();

            }

            break;

        case "checkbox":

            await global.enhancedClickOn(input, 5, 5);
            break;

        case "submit":

            await global.enhancedClickOn(input, 5, 5);
            break;

    }

}

async function tryToFinishPaymentPage(failureExpected, missingFieldName) {

    // return value is whether it successfully passed or not
    // there are multiple possible failure screens

    let possibleFailures = [reservationUnsuccessfulText, 
        termsAndConditionsUnsuccessfulText,
        paymentUnsuccessfulText];

    // TODO: make cleaner
    //let failureButtons = [reservationUnsuccessfulCloseButton, 
    //    termsAndConditionsUnsuccessfulCloseButton,
    //    paymentUnsuccessfulCloseButton];
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

async function getPriceSummary() {

    // Click on price breakdown
    await global.clickOn(priceBreakdownToggle);
    // Validate flights price
    await global.validateElementText(flightPriceValue, bonzaFlightResultsPage.data.allFlightsPrice);
    // Validate seats price
    await global.validateElementText(seatsPriceValue, bonzaSeatsPage.data.allSeatsPrice);
    // Validate bags price
    await global.validateElementText(bagsPriceValue, bonzaBagsPage.data.allBagsPrice);
    // Validate total price
    await global.validateElementText(totalPrice, bonzaBagsPage.data.finalPrice);

}

module.exports = {

    main: {

        titleList: titleList,
            title_Default: title_Default,
            title_Mr: title_Mr,
            title_Mrs: title_Mrs,
            title_Ms: title_Ms,
            title_Miss: title_Miss,
        firstNameInput: firstNameInput,
        middleNameInput: middleNameInput,
        lastNameInput: lastNameInput,
        dateOfBirthList: dateOfBirthList,
            dateOfBirth_month_august: dateOfBirth_month_august,
            dateOfBirth_month_may: dateOfBirth_month_may,
            dateOfBirth_day_8: dateOfBirth_day_8,
            dateOfBirth_year_2006: dateOfBirth_year_2006,
            dateOfBirth_cancelButton: dateOfBirth_cancelButton,
            dateOfBirth_confirmButton: dateOfBirth_confirmButton,
        phoneNumberCountryList: phoneNumberCountryList,
        phoneNumberCountrySearch: phoneNumberCountrySearch,
            phoneNumberCountry_Australia: phoneNumberCountry_Australia,
            phoneNumberCountry_Israel: phoneNumberCountry_Israel,
        //phoneNumberInputSuccinct: phoneNumberInputSuccinct,
        phoneNumberInput: phoneNumberInput,
        emailAddressInput: emailAddressInput,
        receiveEmailsCheckbox: receiveEmailsCheckbox,
        createAccountCheckbox: createAccountCheckbox,
        createAccountPassword: createAccountPassword,
        createAccountConfirmPassword: createAccountConfirmPassword,
        missingBookingDetails: missingBookingDetails,
        closeMissingBookingDetailsPopup: closeMissingBookingDetailsPopup,
        looksGoodButton: looksGoodButton,
        priceAdjustmentPopup: priceAdjustmentPopup,
        priceAdjustmentClose: priceAdjustmentClose,
        totalPrice: totalPrice,
        priceBreakdownToggle: priceBreakdownToggle,
        flightPriceValue: flightPriceValue,
        seatsPriceValue: seatsPriceValue,
        bagsPriceValue: bagsPriceValue,
        voucherAppliedValue: voucherAppliedValue,
        voucherCheckbox: voucherCheckbox,
        voucherInput: voucherInput,
        voucherApplyButton: voucherApplyButton,
        voucherPopupMessageText: voucherPopupMessageText,
        voucherOKButton: voucherOKButton,
        mastercardDebit: mastercardDebit,
        visaDebit: visaDebit,
        mastercardCredit: mastercardCredit,
        visaCredit: visaCredit,
        payTo: payTo,
        payToSelectNotificationButton: payToSelectNotificationButton,
        payToPhoneNumber: payToPhoneNumber,
        payToPhoneNumberInput: payToPhoneNumberInput,
        payToSubmitButton: payToSubmitButton,
        payToSuccessMessageTitle: payToSuccessMessageTitle,
        poli: poli,
        feesOKButton: feesOKButton,
        nameOnCardInput: nameOnCardInput,
        cardNumberInput: cardNumberInput,
        cardExpirationDateInput: cardExpirationDateInput,
        cardCVCInput: cardCVCInput,
        cardIconInputClickTwice: cardIconInputClickTwice,
        billingAddressInput: billingAddressInput,
        cityInput: cityInput,
        countryList: countryList,
            country_Default: country_Default,
            country_Australia: country_Australia,
        districtList: districtList,
            district_Default: district_Default,
            district_NSW: district_NSW,
        postCodeInput: postCodeInput,
        zipCodeInput: zipCodeInput,
        acceptTermsCheckbox: acceptTermsCheckbox,
        bookNowButton: bookNowButton,
        reservationUnsuccessfulText: reservationUnsuccessfulText,
        reservationUnsuccessfulCloseButton: reservationUnsuccessfulCloseButton,
        termsAndConditionsUnsuccessfulText: termsAndConditionsUnsuccessfulText,
        termsAndConditionsUnsuccessfulCloseButton: termsAndConditionsUnsuccessfulCloseButton,
        paymentUnsuccessfulText: paymentUnsuccessfulText,
        paymentUnsuccessfulCloseButton: paymentUnsuccessfulCloseButton,
        bookingReferenceTitle: bookingReferenceTitle

    },

    handleReviewInformation,
    handlePayment,
    getPriceSummary

};