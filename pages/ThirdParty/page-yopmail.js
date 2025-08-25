const {driver} = require("@wdio/globals");

const mainIOS = {
    mailboxInput: '~Login',
    ArrowButton: '~',
    latestMessage: '//*[contains(@name, "Recover password email")]',

}

const mainAndroid = {
    mailboxInput: '',
    ArrowButton: '',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};