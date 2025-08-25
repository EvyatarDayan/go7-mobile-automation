const global = require("../../../../commands.conf");
const flairMainPage = require ('../../../../pages/flair/page-flair-main');
const flairBookPage = require ('../../../../pages/flair/page-flair-book');


describe('Home', ()=>{

    it('Flight search',async ()=> {
        // Click on "Book"
        await global.clickOn(flairMainPage.toolbar.bookButton)
        // Click on from button
        await global.clickOn(flairBookPage.main.fromButton)
        // Select yxx
        await global.clickOn(flairBookPage.main.destination_yxx)
        // Click on to button
        await global.clickOn(flairBookPage.main.toButton)
        // Select yxx
        await global.clickOn(flairBookPage.main.destination_yyc)


        await global.pause(50000)
    })
})
