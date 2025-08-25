const {driver} = require("@wdio/globals");

const mainIOS = {
        createNewPasswordTitle: '~TBD',
        createNewPasswordSubtitle: '~TBD',
        passwordInput: '~TBD',
        passwordValidationText: '~TBD',
        passwordEyeButton: '~TBD',
        confirmPasswordInput: '~TBD',
        confirmPasswordValidationText: '~TBD',
        confirmPasswordEyeButton: '~TBD',
        resetPasswordButton: '~TBD',

        // Passwords validations here - TBD

        successMessageTitle: '~TBD',
        successMessageText: '~TBD',
        successMessageDoneButton: '~TBD',
}

const mainAndroid = {
        createNewPasswordTitle: '//*[@resource-id="TBD"]',
        createNewPasswordSubtitle: '//*[@resource-id="TBD"]',
        passwordInput: '//*[@resource-id="TBD"]',
        passwordValidationText: '//*[@resource-id="TBD"]',
        passwordEyeButton: '//*[@resource-id="TBD"]',
        confirmPasswordInput: '//*[@resource-id="TBD"]',
        confirmPasswordValidationText: '//*[@resource-id="TBD"]',
        confirmPasswordEyeButton: '//*[@resource-id="TBD"]',
        resetPasswordButton: '//*[@resource-id="TBD"]',

        // Passwords validations here - TBD

        successMessageTitle: '//*[@resource-id="TBD"]',
        successMessageText: '//*[@resource-id="TBD"]',
        successMessageDoneButton: '//*[@resource-id="TBD"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};