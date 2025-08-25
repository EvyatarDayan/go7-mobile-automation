const {driver} = require("@wdio/globals");

const mainIOS = {
    // Menu
    scheduleMenuButton: '~clock.fill',
    favoriteMenuButton: '~star.fill',
    manualMenuButton: '~hand.point.up',
    settingsMenuButton: '~gearshape.fill',
    homeMenuButton: '//*[@name="house.fill"]',
    // Topics
    transportationTopicButton: '~car.fill',
    // Sentence modal
    sentenceEnglishButton: '~English',
    sentenceNextButton: '~chevron.right',
    sentenceCloseButton: '//*[@name="xmark"]',
    // Manual modal
    manualPlusButton: '~plus',
    manualSvenskaInput: '-ios predicate string:value == "Enter Swedish text..."',
    manualEnglishInput: '-ios predicate string:value == "Enter English translation..."',
    manualSaveButton: '//*[@name="Save"]',


}

const mainAndroid = {
    mailboxInput: '',
    ArrowButton: '',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};