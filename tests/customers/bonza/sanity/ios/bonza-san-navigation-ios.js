const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');

describe('Navigation', ()=>{

    before('Clear all popups',async () => {
        // Confirm update popup if exists
        // await global.clickIfExists(bonzaMainPage.main.updateNoButton)
        // Confirm location popup
        await global.clickOn('~Allow Once')
        // Click on next on app activity dialog
        await global.clickIfExists('~Next')
    });

    it('Toolbar navigation',async ()=>{
        // // Confirm update
        // await global.clickIfExists(bonzaMainPage.main.updateNoButton)
        // // Temp alert
        // await global.clickOn('//android.view.ViewGroup[@content-desc="button__click"]/android.view.ViewGroup')
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton)
        // Validate "Book trip" title
        await global.validateElementText('-ios class chain:**/XCUIElementTypeOther[`label == "Book trip"`][2]', 'Book trip')
        // Click on "My trips"
        await global.clickOn('//XCUIElementTypeOther[@name="tab_nav-support"]')
        // Validate "My trips" title
        await global.validateElementText('-ios class chain:**/XCUIElementTypeOther[`label == "My Trips"`][2]', 'My Trips')
        // Click on "Holidays"
        await global.clickOn(bonzaMainPage.toolbar.holidaysButton)
        // Validate "Holidays" title
        await global.validateElementText('-ios class chain:**/XCUIElementTypeOther[`label == "Holidays"`][2]', 'Holidays')
        // Click on "in flight"
        await global.clickOn('-ios predicate string:label == "In-Flight" AND name == "tab_nav-account"')
        // Validate "Inflight Menu" title
        await global.validateElementText('-ios class chain:**/XCUIElementTypeOther[`label == "Inflight Menu"`][2]', 'Inflight Menu')
        // Click on "Account"
        await global.clickOn('-ios predicate string:label == "Account"')
        // Validate "Sign in" title
        await global.validateElementText('-ios class chain:**/XCUIElementTypeOther[`label == "Sign in"`][2]', 'Sign in')
        // Click on "Home"
        await global.clickOn(bonzaMainPage.toolbar.homeButton)
        // Validate "Home" title
        await global.validateElementText('-ios class chain:**/XCUIElementTypeOther[`label == "Home"`][6]', 'Home')
    });

    it('Side menu navigation',async ()=> {
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        await global.pause(5000000)
        // Click on "login"
        await global.clickOn(bonzaSideMenuPage.main.login)
        // Validate "Sign in" title
        await global.validateElementText(bonzaSignInPage.main.title, 'Sign in')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "login"
        await global.clickOn(bonzaSideMenuPage.main.home)
        // Validate "Home" title
        await global.validateElementText(bonzaHomePage.main.title, 'Home')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Travel alerts"
        await global.clickOn(bonzaSideMenuPage.main.travelAlerts)
        // Validate "Alerts" title
        // await global.validateElementText(bonzaHomePage.main.title, 'Alerts')     //todo: fix text (display "Sign in" in the DOM)
        await driver.back()
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Book flights"
        await global.clickOn(bonzaSideMenuPage.main.bookFlights)
        // Validate "Book trip" title
        await global.validateElementText(bonzaBookTtpPage.bookTrip.title, 'Book trip')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "My Trips"
        await global.clickOn(bonzaSideMenuPage.main.myTrips)
        // Validate "My trips" title
        // await global.validateElementText(bonzaMyTripsPage.main.title, 'My trips')    //todo: fix that selector
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Boarding pass"
        await global.clickOn(bonzaSideMenuPage.main.boardingPass)
        // Validate "My trips" title (boarding pass should lead to "My trips" page)
        // await global.validateElementText(bonzaMyTripsPage.main.title, 'My trips')    //todo: fix that selector
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "In flight"
        await global.clickOn(bonzaSideMenuPage.main.inFlight)
        // Validate "Inflight Menu" title
        await global.validateElementText(bonzaInFlightPage.main.title, 'Inflight Menu')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Swipe up
        await global.pause(1000)
        await global.scrollTo(654, 2139, 680, 1030)
    });

    it('Side menu navigation part 2',async ()=> {
        // Click on "Routes"
        await global.clickOn(bonzaSideMenuPage.main.routes)
        // Validate "Routes" title
        await global.validateElementText(bonzaHolidaysPage.main.title, 'Routes')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "FAQs"
        await global.clickOn(bonzaSideMenuPage.main.FAQs)
        // Validate "FAQs" title
        await global.validateElementText(bonzaFAQsPage.main.title, 'FAQs')
        // // Click on side menu button
        // await global.clickOn(bonzaMainPage.menu.menuButton)
        // // Click on "Chat with us"
        // await global.clickOn(bonzaSideMenuPage.main.chatWithUs)
        // // Validate "You've got a question" title
        // await global.validateElementText(bonzaFAQsPage.main.title, '')       //todo: need to add selectors here
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Support"
        await global.clickOn(bonzaSideMenuPage.main.support)
        // Validate "Support" title
        await global.validateElementText(bonzaSupportPage.main.title, 'Support')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Expand legal section
        await global.pause(2000)
        await global.clickOn(bonzaSideMenuPage.main.legalExpandButton)
        // Click on "Privacy"
        await global.clickOn(bonzaSideMenuPage.main.privacy)
        // // Click on chrome accept button
        // await global.clickIfExists('//android.widget.Button[@resource-id="com.android.chrome:id/terms_accept"]')
        // // Click on chrome "No thanks" button
        // await global.clickIfExists('//android.widget.Button[@resource-id="com.android.chrome:id/negative_button"]'
        // Validate "Privacy policy" title
        await global.validateElementText('//android.widget.TextView[@text="Privacy Policy"]', 'Privacy Policy')
        // Click on back
        await driver.back()
        // Click on "Conditions of carriage"
        await global.clickOn(bonzaSideMenuPage.main.conditionsOfCarriage)
        // Validate "Close" button
        await global.validateElementText(bonzaSideMenuPage.main.conditionsOfCarriageCloseButton, ' Close')
        // Click on Close button
        await global.clickOn(bonzaSideMenuPage.main.conditionsOfCarriageCloseButton)
        // Click on "Terms of use"
        await global.clickOn(bonzaSideMenuPage.main.termsOfUse)
        // Validate "Close" button
        await global.validateElementText(bonzaSideMenuPage.main.termsOfUseCloseButton, ' Close')
        // Click on Close button
        await global.clickOn(bonzaSideMenuPage.main.termsOfUseCloseButton)
        // Scroll up
        await global.scrollTo(654, 1700, 680, 1030)
        // Click on "About us"
        await global.clickOn(bonzaSideMenuPage.main.aboutUs)
        // Validate text on the page
        await global.validateElementText('//android.widget.TextView[@text="version: R1.3.0"]', 'version: R1.3.0')
        // Click on back
        await driver.back()
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Network logger"
        await global.clickOn(bonzaSideMenuPage.main.networkLogger)
        // Validate filter pre-text
        await global.validateElementText('//android.widget.EditText[@text="Filter URLs"]', 'Filter URLs')
    });
})