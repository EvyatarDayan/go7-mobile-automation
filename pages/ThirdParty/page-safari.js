const {driver} = require("@wdio/globals");

const mainIOS = {
    appIdentifier: 'com.apple.mobilesafari',
    tabsButton: '~TabOverviewButton',
    privateButton: '//*[contains(@name, "Private,")]',
    newTabButton: '~NewTabButton',
    urlLine: '~TabBarItemTitle',
    urlInput: '~URL',

}

const mainAndroid = {
    mailboxInput: '',
    ArrowButton: '',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};