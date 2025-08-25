const {driver} = require("@wdio/globals");

const mainIOS = {
        pageTitle: '~page_title',
        standardSeatSectionText: 'TBD',
        standardSeatSectionButton: 'TBD',
        standardSeatContent: 'TBD',
        comfortableSeatSectionText: 'TBD',
        comfortableSeatSectionButton: 'TBD',
        comfortableSeatContent: 'TBD',
        extraLegRoomSeatSectionText: 'TBD',
        extraLegRoomSeatSectionButton: 'TBD',
        extraLegRoomSeatContent: 'TBD',
        premiumSeatSectionText: 'TBD',
        premiumSeatSectionButton: 'TBD',
        premiumSeatContent: 'TBD',

        closeButton: '~Continue',
}

const mainAndroid = {
        pageTitle: '//*[@resource-id="page_title"]',
        standardSeatSectionText: 'TBD',
        standardSeatSectionButton: 'TBD',
        standardSeatContent: 'TBD',
        comfortableSeatSectionText: 'TBD',
        comfortableSeatSectionButton: 'TBD',
        comfortableSeatContent: 'TBD',
        extraLegRoomSeatSectionText: 'TBD',
        extraLegRoomSeatSectionButton: 'TBD',
        extraLegRoomSeatContent: 'TBD',
        premiumSeatSectionText: 'TBD',
        premiumSeatSectionButton: 'TBD',
        premiumSeatContent: 'TBD',

        closeButton: '//*[@resource-id="Continue"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};