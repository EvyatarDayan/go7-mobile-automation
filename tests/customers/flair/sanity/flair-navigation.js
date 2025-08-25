const global = require("../../../../commands.conf");
// const data = require("../../data");
const flairMainPage = require ('../../../../pages/flair/page-flair-main');

describe('Navigation', ()=>{

    it('Toolbar navigation',async ()=>{
        // Click on "Book"
        await global.clickOn(flairMainPage.toolbar.bookButton)
        // Click on "My trip"
        await global.clickOn(flairMainPage.toolbar.myTripButton)
        // Click on "Status"
        await global.clickOn(flairMainPage.toolbar.statusButton)
        // Click on "in flight"
        await global.clickOn(flairMainPage.toolbar.inFlightButton)
        // Click on "Account"
        await global.clickOn(flairMainPage.toolbar.accountButton)
    });

})
