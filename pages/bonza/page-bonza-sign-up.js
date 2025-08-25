const global = require("../../commands.conf");
const bonzaMainPage = require ('./page-bonza-main');
const bonzaSignInPage = require ('./page-bonza-sign-in');
const sessionData = require("../../sessionData");
const NWTools = require("nightwatch-tools");
const randomString = NWTools.randomString(4,'abcdefghijklmnopqrstuvwxyz');
const randomNumber = NWTools.randomString(4,'1234567890');

const titleDropDown = '//*[contains(@text, "Title")]';
const countryDropDown = '//*[contains(@text, "Country")]';
const provinceDropDown = '//*[contains(@text, "Province")]';
const stateDropDown = '//*[contains(@text, "State")]';
const dropDown_Default = '//android.widget.CheckedTextView[@text=""]';
const titleList = '~input_signup_page-woodModal-title';
const title_Mr = '//android.widget.CheckedTextView[@text="Mr"]';
const title_Mrs = '//android.widget.CheckedTextView[@text="Mrs"]';
const title_Ms = '//android.widget.CheckedTextView[@text="Ms"]';
const firstNameInput = '~input__account__sign-up__first-name';
const middleNameInput = '~input__account__sign-up__middle-name';
const lastNameInput = '~input__account__sign-up__last-name';
const dateOfBirthList = '~input__account__sign-up__dob';
const dateOfBirth_month_september = '//android.widget.Button[@text="September"]';
const dateOfBirth_month_november = '//*[@text="June"]';
const dateOfBirth_month_august = '//android.widget.Button[@text="August"]';
const dateOfBirth_month_may = '//android.widget.Button[@text="May"]';
const dateOfBirth_day_7 = '//android.widget.Button[@text="7"]';
const dateOfBirth_day_1 = '//android.widget.Button[@text="1"]';
const dateOfBirth_year_1984 = '//android.widget.Button[@text="1984"]';
const dateOfBirth_year_1982 = '//android.widget.Button[@text="1982"]';
const dateOfBirth_cancelButton = 'android:id/button2';
const dateOfBirth_confirmButton = '//*[@text="CONFIRM"]';
const phoneNumberCountryList = '//*[@text="🇦🇺"]';
const phoneNumberCountrySearch = '//*[@resource-id="text-input-country-filter"]';
const phoneNumberCountry_Australia = '//*[@resource-id="country-selector-AU"]';
const phoneNumberCountry_Israel = '//*[@resource-id="country-selector-IL"]';
const phoneNumberInput = '//*[@text="Phone Number *"]';
const streetInput = '//*[@content-desc="input__account__signed-in__profile__contact-info__street"]';
const cityInput = '//*[@content-desc="input__account__signed-in__profile__contact-info__city"]';
const countryList = '~input_account_signup_page-woodModal-country';
const country_Australia = '//android.widget.CheckedTextView[@text="Australia"]';
const country_UnitedStates = '//android.widget.CheckedTextView[@text="United States"]';
const districtList = '~input_account_signup_page-woodModal-state';
const district_NewSouthWales = '//*[@text="New South Wales"]';
const postCodeInput = '//*[@text="Postcode"]';
const emailAddressInput = '~input__account__sign-up__email-address';
const genericPassword = '//*[@content-desc="input__account__password-field__password"]';
const passwordInput = '//*[@text="Password *"]';
const confirmPasswordInput = '//*[@text="Confirm password *"]';
const privacyPolicyCheckbox = '//*[@content-desc="opt-in-email-checkbox"]';
const joinTheBonzaFamilyButton = '//*[contains(@text, "Join the Bonza family")]';
const successfulSignUpText = '//*[contains(@text, "Welcome to the Bonza family!")]';
const successfulSignUpClose = '//*[contains(@text, "Close")]';
const usernameInput = '//*[@content-desc="touchable-opacity__general__read-only-field__select"]/android.widget.TextView';

async function navigateToPage() {

    // Click on "Account"
    await global.clickOn(bonzaMainPage.toolbar.accountButton);
    await global.pause(1000);

    // 1. Sign up

    await global.clickOn(bonzaSignInPage.main.joinNowButton);

}

async function signUp() {

    let phoneNumber = '288884444';
    let street = '45 Macleay st. Pots point';
    let country = 'Australia';
    let city = 'Sydney';
    let postcode = '2055';
    let emailAddressTest = await sessionData.getEmail();
    if (emailAddressTest === "") {
        emailAddressTest = `tommy.${randomString}@yopmail.com`;
        await sessionData.setEmail(emailAddressTest);
    }
    let passwordTest = `Password${randomNumber}!`;
    await global.logComment(`Signing up with email address ${emailAddressTest} (password: ${passwordTest})...`);

    let process = {

        'Title': {'type': 'dropdown', 'input': title_Mrs},
        'First Name': {'type': 'text', 'input': [firstNameInput, "SIGN"]},
        'Middle Name': {'type': 'text', 'input': [middleNameInput, "UP"]},
        'Last Name': {'type': 'text', 'input': [lastNameInput, "TEST"]},
        'Date Of Birth': {'type': 'dob', 'input': [dateOfBirthList, dateOfBirth_confirmButton]},
        'Phone Number': {'type': 'phoneNumber', 'input': [phoneNumberCountryList, phoneNumberCountrySearch, country, 
            phoneNumberCountry_Australia, phoneNumberInput, phoneNumber]},
        'Street': {'type': 'text', 'input': [streetInput, street]},
        'City': {'type': 'text', 'input': [cityInput, city]},
        'Country': {'type': 'dropdown', 'input': country_Australia},
        'Province': {'type': 'dropdown', 'input': district_NewSouthWales},
        'Postcode': {'type': 'text', 'input': [postCodeInput, postcode]},
        'Email Address': {'type': 'text', 'input': [emailAddressInput, emailAddressTest]},
        'Password': {'type': 'text', 'input': [passwordInput, passwordTest]},
        'Confirm Password': {'type': 'text', 'input': [confirmPasswordInput, passwordTest]},
        'Privacy Policy': {'type': 'checkbox', 'input': privacyPolicyCheckbox},
        'Sign Up': {'type': 'submit', 'input': joinTheBonzaFamilyButton}

    }

    // 1 - completing the information in totality

    for (let processName in process) {

        await completeSection(process[processName], processName);
        await global.pause(500, true);

    }

    return emailAddressTest;

}

async function completeSection(section, name) {

    let type = section['type'];
    let input = section['input'];

    await global.logComment(`Now completing ${name}...`);

    // NB: date of birth does not use btn-dropdown

    switch (type) {

        case "text":

            // [confirmPasswordInput, passwordTest]

            await global.enhancedAddValue(input[0], input[1]);
            
            break;

        case "dob":

            // [dateOfBirthList, dateOfBirth_confirmButton]

            await global.enhancedClickOn(input[0]);
            await global.pause(1000, true);
            await global.clickOn(input[1]);

            break;

        case "dropdown":

            // title_Mrs

            switch (name) {

                case "Title":

                    //dropDownIndex = 0;
                    await global.enhancedClickOn(titleDropDown);
                    break;

                case "Country":

                    await global.enhancedClickOn(countryList);
                    
                    break;

                case "Province":

                    // can be either province or state depending on country selection
                    if (await global.waitForElement(provinceDropDown, 2000, 1, true)) {
                        await global.logComment("Province dropdown found");
                        await global.clickOn(provinceDropDown);
                    } else if (await global.waitForElement(stateDropDown, 2000, 1, true)) {
                        await global.logComment("State dropdown found");
                        await global.clickOn(stateDropDown);
                    }

                    break;

            }

            await global.pause(2000, true);

            await global.clickOn(input);

            break;

        case "phoneNumber":

            // [phoneNumberCountryList, phoneNumberCountrySearch, country, 
            //  phoneNumberCountry_Australia, phoneNumberInput, phoneNumber]

            await global.enhancedClickOn(input[0]);
            await global.pause(1000, true);
            await global.addValue(input[1], input[2]);
            await global.pause(1000, true);
            await global.clickOn(input[3]);
            await global.pause(1000, true);
            await global.clearValue(input[4]);
            await global.pause(1000, true);
            await global.addValue(input[4], input[5]);

            break;

        case "checkbox":
            
            // privacyPolicyCheckbox
            await global.enhancedClickOn(input);
            break;

        case "submit":

            await global.enhancedClickOn(input);
            break;

    }

}

module.exports = {

    main: {
        titleDropDown: titleDropDown,
        countryDropDown: countryDropDown,
        provinceDropDown: provinceDropDown,
        stateDropDown: stateDropDown,
        dropDown_Default: dropDown_Default,
        titleList: titleList,
        title_Mr: title_Mr,
        title_Mrs: title_Mrs,
        title_Ms: title_Ms,
        firstNameInput: firstNameInput,
        middleNameInput: middleNameInput,
        lastNameInput: lastNameInput,
        dateOfBirthList: dateOfBirthList,
        dateOfBirth_month_september: dateOfBirth_month_september,
        dateOfBirth_month_november: dateOfBirth_month_november,
        dateOfBirth_month_august: dateOfBirth_month_august,
        dateOfBirth_month_may: dateOfBirth_month_may,
        dateOfBirth_day_7: dateOfBirth_day_7,
        dateOfBirth_day_1: dateOfBirth_day_1,
        dateOfBirth_year_1984: dateOfBirth_year_1984,
        dateOfBirth_year_1982: dateOfBirth_year_1982,
        dateOfBirth_cancelButton: dateOfBirth_cancelButton,
        dateOfBirth_confirmButton: dateOfBirth_confirmButton,
        phoneNumberCountryList: phoneNumberCountryList,
        phoneNumberCountrySearch: phoneNumberCountrySearch,
        phoneNumberCountry_Australia: phoneNumberCountry_Australia,
        phoneNumberCountry_Israel: phoneNumberCountry_Israel,
        phoneNumberInput: phoneNumberInput,
        streetInput: streetInput,
        cityInput: cityInput,
        countryList: countryList,
        country_Australia: country_Australia,
        country_UnitedStates: country_UnitedStates,
        districtList: districtList,
        district_NewSouthWales: district_NewSouthWales,
        postCodeInput: postCodeInput,
        emailAddressInput: emailAddressInput,
        genericPassword: genericPassword,
        passwordInput: passwordInput,
        confirmPasswordInput: confirmPasswordInput,
        privacyPolicyCheckbox: privacyPolicyCheckbox,
        joinTheBonzaFamilyButton: joinTheBonzaFamilyButton,
        successfulSignUpText: successfulSignUpText,
        successfulSignUpClose: successfulSignUpClose,
        usernameInput: usernameInput
            
    },

    navigateToPage,
    signUp

};