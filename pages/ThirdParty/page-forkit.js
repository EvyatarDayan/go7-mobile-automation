const {driver} = require("@wdio/globals");

const mainIOS = {
    // Menu
    searchMenuButton: '~Search',
    homeMenuButton: '~Home',
    profileMenuButton: '~Profile',
    myRecipesMenuButton: '//*[@name="My Recipes"]',


    manualSvenskaInput: '-ios predicate string:value == "Enter Swedish text..."',
    manualEnglishInput: '-ios predicate string:value == "Enter English translation..."',


}

const mainAndroid = {
    mailboxInput: '',
    ArrowButton: '',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};