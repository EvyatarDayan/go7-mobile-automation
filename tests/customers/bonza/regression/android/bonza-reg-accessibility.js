const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');
const bonzaFlightResultsPage = require ('../../../../../pages/bonza/page-bonza-flight-results');
const bonzaTravellersPage = require ('../../../../../pages/bonza/page-bonza-travellers');
const bonzaSeatsPage = require ('../../../../../pages/bonza/page-bonza-seats');
const {driver} = require("@wdio/globals");
const bonzaBagsPage = require("../../../../../pages/bonza/page-bonza-bags");

let firstName = 'Marlon';
let lastName = 'Brando';
let seatNumber = 1;

describe('Home', () => {

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Flight search', async () => {
        // Click on "Book"
        await global.clickOn(bonzaMainPage.toolbar.bookButton);

        // Select valid location and date
        await global.selectRoundTripLocationAndDate()

        // Select passengers
        await global.homePage_selectPassengers(1, 0, 0, 0);

        // Click on show flights
        await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton);
        await global.pause(2000);
    });

    it('Flights selection', async () => {
        // Departing flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)

        // Returning flight
        // Click on show prices
        await global.clickOn(bonzaFlightResultsPage.main.showPricesButton)
        // Expand first flight fare details
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareButton)
        // Click on select fare button
        await global.clickOn(bonzaFlightResultsPage.main.firstFlightFareSelectFareButton)
    });

    it('Validate Hearing impaired', async () => {
        // Add first name
        await global.addValue(bonzaTravellersPage.main.firstTravellerFirstNameInput, firstName)
        // Add last name
        await global.addValue(bonzaTravellersPage.main.firstTravellerLastNameInput, lastName)
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_HearingImpaired)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
        // Click on back button
        await global.clickOn(bonzaSeatsPage.main.changeSeatsBackButton)
    });

    it('Validate Vision impaired without guide dog', async () => {
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_VisionImpairedWithoutGuideDog)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
        // Click on back button
        await global.clickOn(bonzaSeatsPage.main.changeSeatsBackButton)
    });

    it('Validate None', async () => {
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_None)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
        // Click on back button
        await global.clickOn(bonzaSeatsPage.main.changeSeatsBackButton)
    });

    it('Validate Medical clearance required to travel', async () => {
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_MedicalClearance)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
        // Validate accessibility message title
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageTitle, 'Accessibility Request')
        // Validate accessibility message content
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageContent, 'To ensure we deliver the best service for your requirements, please complete your booking with our Digital Support Centre team, via our Support page. We look forward to having you onboard!')
        // Click on OK button
        await global.clickOn(bonzaTravellersPage.main.accessibilityRequestMessageOKButton)
    });

    it('Validate Other assistance required', async () => {
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_OtherAssistanceRequired)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
        // Validate accessibility message title
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageTitle, 'Accessibility Request')
        // Validate accessibility message content
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageContent, 'To ensure we deliver the best service for your requirements, please complete your booking with our Digital Support Centre team, via our Support page. We look forward to having you onboard!')
        // Click on OK button
        await global.clickOn(bonzaTravellersPage.main.accessibilityRequestMessageOKButton)
    });

    it('Validate Travelling with a service dog', async () => {
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_TravellingWithAServiceDog)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
        // Validate accessibility message title
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageTitle, 'Accessibility Request')
        // Validate accessibility message content
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageContent, 'To ensure we deliver the best service for your requirements, please complete your booking with our Digital Support Centre team, via our Support page. We look forward to having you onboard!')
        // Click on OK button
        await global.clickOn(bonzaTravellersPage.main.accessibilityRequestMessageOKButton)
    });

    it('Validate Travelling with an oxygen tank', async () => {
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_TravellingWithAnOxygenTank)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
        // Validate accessibility message title
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageTitle, 'Accessibility Request')
        // Validate accessibility message content
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageContent, 'To ensure we deliver the best service for your requirements, please complete your booking with our Digital Support Centre team, via our Support page. We look forward to having you onboard!')
        // Click on OK button
        await global.clickOn(bonzaTravellersPage.main.accessibilityRequestMessageOKButton)
    });

    it('Validate Wheelchair Assistance required', async () => {
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_WheelchairAssistanceRequired)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)
        // Validate accessibility message title
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageTitle, 'Accessibility Request')
        // Validate accessibility message content
        await global.validateElementText(bonzaTravellersPage.main.accessibilityRequestMessageContent, 'To ensure we deliver the best service for your requirements, please complete your booking with our Digital Support Centre team, via our Support page. We look forward to having you onboard!')
        // Click on OK button
        await global.clickOn(bonzaTravellersPage.main.accessibilityRequestMessageOKButton)
    });

    it('Switch to Vision impaired without guide dog (To validate label on "Review booking")', async () => {
        // Click on first traveller accessibility options
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibilityList)
        // Select accessibility option
        await global.clickOn(bonzaTravellersPage.main.firstTravellerAccessibility_VisionImpairedWithoutGuideDog)
        // Click on "continue to seats" button
        await global.clickOn(bonzaTravellersPage.main.continueToSeatsButton)

    });

    it('Select seats',async ()=> {
        await driver.pause(5000)
        // Select departing seat
        await global.clickOn(`(//android.view.ViewGroup[@content-desc="seat_valid"])[${seatNumber}]/android.widget.TextView`)
        // Click on Next flight button
        await driver.pause(1000)
        await global.clickOn('//*[@text=" Next flight"]')
        await driver.pause(2000)
        // Select returning seat
        await global.clickOn(`(//android.view.ViewGroup[@content-desc="seat_valid"])[${seatNumber}]/android.widget.TextView`)
    });

    it('Select bags',async ()=>{
        // Click on Add bags button
        await global.clickOn('//*[@text=" Add Bags"]')
        await global.pause(1000)
        // Expand 15kgBag list
        await global.clickOn(bonzaBagsPage.main["15kgBag"])
        // Select 1
        await global.clickOn(bonzaBagsPage.main["15kgBag_1"])
        // Click on next flight
        await global.clickOn(bonzaBagsPage.main.nextFlightButton)
        await global.pause(1000)
        // Expand 15kgBag list (second flight)
        await global.clickOn(bonzaBagsPage.main["15kgBag"])
        // Select 1
        await global.clickOn(bonzaBagsPage.main["15kgBag_1"])
        // Click on review booking
        await global.clickOn(bonzaBagsPage.main.reviewBookingButton)
        // Click on Continue to payment
        await global.clickOn(bonzaBagsPage.main.continueToPaymentButton)
    });

    it('Review booking - Validate "vision impaired without guide dog" label',async ()=>{
        // Scroll all the way down
        await global.pause(2000)
        await global.scrollTo(500, 2000, 500, 500)
        // Validate "Vision impaired without guide dog" label
        await global.validateElementText('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView[10]', 'Vision impaired without guide dog')
    });
});