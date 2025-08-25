const global = require("../../commands.conf");
const sessionData = require("../../sessionData");

let emptyFirstNameFields = '//*[contains(@text, "First name")]';
let emptyLastNameFields = '//*[contains(@text, "Last name")]';

const continueToSeatsButton = '//*[contains(@text, "Continue to seats")]';

async function completePassengerPage(nAdults, nYouths, nChildren, nInfants) {

    await fillPassengerInfo(nAdults, nYouths, nChildren, nInfants);
    await endPassengerPage();

}

async function fillPassengerInfo(nAdults, nYouths, nChildren, nInfants) {

    await global.logComment("Now filling in passenger info...");

    // making sure the page has fully loaded before beginning
    await global.waitForElement(emptyFirstNameFields, 3000, 1, true);

    let expectedFirstNameElements = nAdults + nYouths + nChildren + nInfants;
    let expectedLastNameElements = expectedFirstNameElements;

    let firstNameElementsHandled = 0;
    let lastNameElementsHandled = 0;

    let scrolled = 0;
    let limit = expectedFirstNameElements * 3;  // arbitrary

    let firstNames = [];
    let lastNames = [];

    while (firstNameElementsHandled < expectedFirstNameElements || lastNameElementsHandled < expectedLastNameElements) {

        let emptyFirstNames = await driver.$$(emptyFirstNameFields);
        let emptyLastNames = await driver.$$(emptyLastNameFields);

        for (let i = 0; i < emptyFirstNames.length; i++) {
            let emptyFirstName = emptyFirstNames[i];
            let firstName = await getName(nAdults, nYouths, nChildren, nInfants, firstNameElementsHandled, false);
            firstNames.push(firstName);
            await global.addValue(emptyFirstName, firstName);
            firstNameElementsHandled++;
            await global.pause(500, true);
        }

        for (let i = 0; i < emptyLastNames.length; i++) {
            let emptyLastName = emptyLastNames[i];
            let lastName = await getName(nAdults, nYouths, nChildren, nInfants, lastNameElementsHandled, true);
            lastNames.push(lastName);
            await global.addValue(emptyLastName, lastName);
            lastNameElementsHandled++;
            await global.pause(500, true);
        }

        await global.scrollViaUIScrollable("d");
        await global.pause(1000, true);

        scrolled++;

        if (scrolled > limit) {
            // TODO: should be full failure here
            await global.logError("Code seems to be looping on entering passenger details");
            return;
        }

    }

    // adding to session data
    for (let i = 0; i < firstNames.length; i++) {

        let fullName = `${firstNames[i]} ${lastNames[i]}`;
        let passengerType = await global.getPassengerType(nAdults, nYouths, nChildren, nInfants, i);
        await sessionData.addToPassengerData(passengerType, fullName);

    }

    await sessionData.cleanPassengerInformation();

}

async function endPassengerPage() {

    await global.clickOn(continueToSeatsButton);

}

async function getName(nAdults, nYouths, nChildren, nInfants, index, lastName) {

    let type;
    let numberOfType;
    let lastNameAddendum = lastName ? "last" : "";

    if (index < nAdults) {
        type = "Adt";
        numberOfType = index + 1;
    } else if (index < nAdults + nYouths) {
        type = "Yth";
        numberOfType = (index + 1) - nAdults;
    } else if (index < nAdults + nYouths + nChildren) {
        type = "Chd";
        numberOfType = (index + 1) - nAdults - nYouths;
    } else {
        type = "Inf";
        numberOfType = (index + 1) - nAdults - nYouths - nChildren;
    }

    return type + await global.convertNumberToWord(numberOfType) + lastNameAddendum;

}

module.exports = {

    main: {
        emptyFirstNameFields: emptyFirstNameFields,
        emptyLastNameFields: emptyLastNameFields,
        firstTravellerFirstNameInput: '~input__ibe__passenger-info__first-name_0',
        firstTravellerLastNameInput: '~input__ibe__passenger-info__last-name_0',
        firstTravellerAccessibilityList: '~input__ibe__confirmation__payment-form__country_0',
            firstTravellerAccessibility_None: '//android.widget.CheckedTextView[@text="None"]',
            firstTravellerAccessibility_HearingImpaired: '//android.widget.CheckedTextView[@text="Hearing impaired"]',
            firstTravellerAccessibility_MedicalClearance: '//android.widget.CheckedTextView[@text="Medical clearance required to travel"]',
            firstTravellerAccessibility_OtherAssistanceRequired: '//android.widget.CheckedTextView[@text="Other assistance required"]',
            firstTravellerAccessibility_TravellingWithAServiceDog: '//android.widget.CheckedTextView[@text="Travelling with a service dog"]',
            firstTravellerAccessibility_TravellingWithAnOxygenTank: '//android.widget.CheckedTextView[@text="Travelling with an oxygen tank"]',
            firstTravellerAccessibility_VisionImpairedWithoutGuideDog: '//android.widget.CheckedTextView[@text="Vision impaired without guide dog"]',
            firstTravellerAccessibility_WheelchairAssistanceRequired: '//android.widget.CheckedTextView[@text="Wheelchair Assistance required"]',
        accessibilityRequestMessageTitle: '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView',
        accessibilityRequestMessageContent: '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView',
        accessibilityRequestMessageOKButton: '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button',
        errorMessage: '//android.widget.TextView[@text="Please ensure that you have entered the first and last name for all passengers."]',
        closeErrorMessageButton: '//android.widget.Button',
        continueToSeatsButton: '~btn__footer__righttbtn_Continue to seats',

        // logged in traveller
        firstTravellerFirstNameTitle: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView',
        editInfoButton: '~touchable-opacity__ibe__pax-info__edit-pax-info-0',


    },

    completePassengerPage,
    fillPassengerInfo,
    endPassengerPage,
    getName

};