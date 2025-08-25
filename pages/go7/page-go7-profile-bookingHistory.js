const {driver} = require("@wdio/globals");

const mainIOS = {
        pageTitle: 'TBD',
        allTab: 'TBD',
        bookedTab: 'TBD',
        completedTab: 'TBD',
        canceledTab: 'TBD',
}

const mainAndroid = {
        pageTitle: 'TBD',
        allTab: 'TBD',
        bookedTab: 'TBD',
        completedTab: 'TBD',
        canceledTab: 'TBD',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};