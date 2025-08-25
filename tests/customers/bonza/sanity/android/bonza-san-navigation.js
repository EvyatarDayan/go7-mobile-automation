const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTtpPage = require("../../../../../pages/bonza/page-bonza-book-trip");
const bonzaHolidaysPage = require("../../../../../pages/bonza/page-bonza-holidays");
const bonzaInFlightPage = require("../../../../../pages/bonza/page-bonza-in-flight");
const bonzaSignInPage = require("../../../../../pages/bonza/page-bonza-sign-in");
const bonzaHomePage = require("../../../../../pages/bonza/page-bonza-home");
const bonzaSideMenuPage = require("../../../../../pages/bonza/page-bonza-side-menu");
const bonzaAlertsPage = require("../../../../../pages/bonza/page-bonza-alerts");
const bonzaFAQsPage = require("../../../../../pages/bonza/page-bonza-faqs");
const bonzaSupportPage = require("../../../../../pages/bonza/page-bonza-support");
const bonzaMytripsPage = require("../../../../../pages/bonza/page-bonza-my-trips");

describe('Navigation', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Toolbar navigation',async ()=>{
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton)
        // Validate "Book trip" title
        await global.validateElementText(bonzaBookTtpPage.bookTrip.title, 'Book trip')
        // Click on "My trips"
        await global.clickOn(bonzaMainPage.toolbar.myTripsButton)
        // Validate "My trips" title
        await global.validateElementText(bonzaMytripsPage.main.title, 'My Trips')
        // Click on "Holidays"
        await global.clickOn(bonzaMainPage.toolbar.holidaysButton)
        // Validate "Holidays" title
        await global.pause(500)
        await global.validateElementText(bonzaHolidaysPage.main.title, 'Holidays')
        // Click on "in flight"
        await global.clickOn(bonzaMainPage.toolbar.inFlightButton)
        // Validate "Inflight Menu" title
        await global.validateElementText(bonzaInFlightPage.main.title, 'Inflight Menu')
        // Click on "Account"
        await global.clickOn(bonzaMainPage.toolbar.accountButton)
        // Validate "Sign in" title
        await global.validateElementText(bonzaSignInPage.main.title, 'Sign in')
        // Click on "Home"
        await global.clickOn(bonzaMainPage.toolbar.homeButton)
        // Validate "Home" title
        await global.validateElementText(bonzaHomePage.main.title, 'Home')
    });

    it('Side menu navigation',async ()=> {
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
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
        await global.validateElementText(bonzaAlertsPage.main.title, 'Alerts')
        // await driver.back()
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Book flights"
        await global.clickOn(bonzaSideMenuPage.main.bookFlights)
        // Validate "Book trip" title
        await global.validateElementText(bonzaBookTtpPage.bookTrip.title, 'Book trip')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Book a holiday"
        await global.clickOn(bonzaSideMenuPage.main.bookAHoliday)
        // Validate "Holidays" title
        await global.validateElementText(bonzaHolidaysPage.main.titleFromSideMenu, 'Tell us about your perfect holiday')
        // Click on back
        await global.clickOn(bonzaHolidaysPage.main.closeButton)
        // Click on "My Trips"
        await global.clickOn(bonzaSideMenuPage.main.myTrips)
        // Validate "My trips" title
        await global.validateElementText(bonzaMytripsPage.main.title, 'My Trips')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Boarding pass"
        await global.clickOn(bonzaSideMenuPage.main.boardingPass)
        // Validate "My trips" title (boarding pass should lead to "My trips" page)
        await global.validateElementText(bonzaMytripsPage.main.title, 'My Trips')
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
        await global.clickOn(bonzaSideMenuPage.main.inFlight)
        // Validate "Support" title
        await global.validateElementText(bonzaSupportPage.main.title, 'Inflight Menu')
        // Click on side menu button
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Expand legal section
        await global.pause(2000)
        await global.clickOn(bonzaSideMenuPage.main.legalExpandButton)
        // Click on "Privacy"
        // await global.clickOn(bonzaSideMenuPage.main.privacy)
        // // Click on chrome accept button
        // await global.clickIfExists('//android.widget.Button[@resource-id="com.android.chrome:id/terms_accept"]')
        // // Click on chrome "No thanks" button
        // await global.clickIfExists('//android.widget.Button[@resource-id="com.android.chrome:id/negative_button"]'
        // Validate "Privacy policy" title
        // await global.validateElementText('//android.widget.TextView[@text="Privacy Policy"]', 'Privacy Policy')
        // Click on back
        // await driver.back()
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
        await global.pause(2000)
        // Click on "About us"
        await global.clickOn(bonzaSideMenuPage.main.aboutUs)
        // Validate text on the page
        await global.validateElementText('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]', 'version:')
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