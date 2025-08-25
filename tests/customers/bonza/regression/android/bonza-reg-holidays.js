const global = require("../../../../../commands.conf");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');

let rounteIndex = Array.from({length: 3}, (_, i) => i + 1);

describe('Routes', ()=> {

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

        it('Routes', async () => {
            // Click on "Holiday"
            await global.clickOn(bonzaMainPage.toolbar.holidaysButton)

            for (let i = 0; i < rounteIndex.length; i++) {

                // Click on the route
                await global.clickOn(`(//android.view.ViewGroup[@content-desc="touchable-opacity__general__route-search__booking-destination"])[${rounteIndex[i]}]/android.widget.TextView`)
                // await global.clickOn(`//android.view.ViewGroup[@content-desc="touchable-opacity__general__route-search__booking-destination:Bundaberg_index:0"]/android.widget.TextView`)
                // Scroll down
                await global.pause(1000)
                await global.scrollTo(500, 1500, 500, 500)

                // Extract "from" destination text
                let fromDestination = [];
                let fromDestinatonElement = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.ScrollView/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[1]');
                fromDestination.push((await fromDestinatonElement.getText()).replace(/[ \\t]+$/g, ''))      // Remove folownig space
                console.log(`fromDestination is: ${fromDestination}`)

                // Extract "to" destination text
                let toDestination = [];
                let toDestinatonElement = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.ScrollView/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[2]');
                toDestination.push((await toDestinatonElement.getText()).replace('To ', ''))        // Remove starting with "To "
                console.log(`toDestination is: ${toDestination}`)

                // Click on flights button
                await global.clickOn('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.ScrollView/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[4]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView')
                // Validate "from" route match search values
                await global.validateElementText(bonzaBookTripPage.bookTrip.fromValue, fromDestination)
                // Validate "to" route match search values
                await global.validateElementText(bonzaBookTripPage.bookTrip.toValue, toDestination)

                console.log(clc.green(`✅  Route number -${rounteIndex[i]}- tested successfuly.`))

                // Click on "Routes"
                await global.clickOn(bonzaMainPage.toolbar.holidaysButton)
        }
    });
});