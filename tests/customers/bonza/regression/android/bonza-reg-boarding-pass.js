const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');
const bonzaMyTripsPage = require ('../../../../../pages/bonza/page-bonza-my-trips');
const NWTools = require("nightwatch-tools");
const randomString = NWTools.randomString(6,'1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ');

let validBoardingPass = 'W950QQ';
let validLastName = 'BRANDO';
let fakeBoardingPass = randomString;
let fakeLastName = 'SMITH';

describe('Boarding pass', ()=>{

    before('Clear all popups',async () => {
        // Click No in update popup if exists
        // await global.clickIfExists(bonzaMainPage.main.updateNoButton, 5000)
        // Temp alert
        // await global.clickOn('//android.view.ViewGroup[@content-desc="button__click"]/android.view.ViewGroup')
        // Close "New version available"
        await global.clickIfExists('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]')
    });

    it('Navigate to boarding pass', async () => {
        // Open the side menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "Boarding pass"
        await global.clickOn(bonzaSideMenuPage.main.boardingPass)
    });

    it('Add invalid boarding pass and invalid last name', async () => {
        // Add invalid boardong pass
        await global.addValue(bonzaMyTripsPage.boardingPass.bookingConfirmationNumber, fakeBoardingPass)
        // Add invalid last name
        await global.addValue(bonzaMyTripsPage.boardingPass.lastNameInput, fakeLastName)
        // Click on find my trip button
        await global.clickOn(bonzaMyTripsPage.boardingPass.findMyTripButton)
        // Validate message
        await global.pause(1000)
        await global.validateElementText(bonzaMyTripsPage.boardingPass.noRecoredMessage, `Could not find a reservation for locator: ${fakeBoardingPass}, last name: ${fakeLastName}.`)
    });

    it('Add invalid boarding pass and valid last name', async () => {
        // Add invalid boardong pass
        await global.addValue(bonzaMyTripsPage.boardingPass.bookingConfirmationNumber, fakeBoardingPass)
        // Add valid last name
        await global.addValue(bonzaMyTripsPage.boardingPass.lastNameInput, validLastName)
        // Click on find my trip button
        await global.clickOn(bonzaMyTripsPage.boardingPass.findMyTripButton)
        // Validate message
        await global.pause(1000)
        await global.validateElementText(bonzaMyTripsPage.boardingPass.noRecoredMessage, `Could not find a reservation for locator: ${fakeBoardingPass}, last name: ${validLastName}.`)
    });

    it('Add valid boarding pass and invalid last name', async () => {
        // Add valid boardong pass
        await global.addValue(bonzaMyTripsPage.boardingPass.bookingConfirmationNumber, validBoardingPass)
        // Add invalid last name
        await global.addValue(bonzaMyTripsPage.boardingPass.lastNameInput, fakeLastName)
        // Click on find my trip button
        await global.clickOn(bonzaMyTripsPage.boardingPass.findMyTripButton)
        // Validate message
        await global.pause(1000)
        await global.validateElementText(bonzaMyTripsPage.boardingPass.noRecoredMessage, `Could not find a reservation for locator: ${validBoardingPass}, last name: ${fakeLastName}.`)
    });

    it('Add valid boading pass and valid last name', async () => {
        // Add valid boardong pass
        await global.addValue(bonzaMyTripsPage.boardingPass.bookingConfirmationNumber, validBoardingPass)
        // Add valid last name
        await global.addValue(bonzaMyTripsPage.boardingPass.lastNameInput, validLastName)
        // Click on find my trip button
        await global.clickOn(bonzaMyTripsPage.boardingPass.findMyTripButton)
    });

    it('Validate depart flight details', async () => {
        // Validate depart flight "From"
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_from, 'Bundaberg')
        // Validate depart flight "To"
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_to, 'Melbourne (Tullamarine)')
        // Validate depart flight start time
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_startTime, '19:15')
        // Validate depart flight end time
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_endTime, '21:55')
        // Validate depart flight duration
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_flightDuration, 'AB1006• 2h 40m')
    });

    it('Validate return flight details', async () => {
        // Validate return flight "From"
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_from, 'Melbourne (Tullamarine)')
        // Validate return flight "To"
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_to, 'Bundaberg')
        // Validate return flight start time
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_startTime, '16:00')
        // Validate return flight end time
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_endTime, '18:45')
        // Validate return flight duration
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_flightDuration, 'AB1005• 2h 45m')
    });

    it('Validate traveller details', async () => {
        // Scroll down
        await global.scrollTo(500, 2000, 500, 500)
        // Validate traveller full name
        await global.validateElementText(bonzaMyTripsPage.tripDetails.travellerName, 'Adult - MARLON BRANDO')
        // Validate date of birth
        await global.validateElementText(bonzaMyTripsPage.tripDetails.dateOfBirth, 'Date of birth: 10 Sep 2005')
        // Validate email
        await global.validateElementText(bonzaMyTripsPage.tripDetails.email, 'Email: bonza1@yopmail.com')
        // Validate mobile
        await global.validateElementText(bonzaMyTripsPage.tripDetails.mobile, 'Mobile: (972)526647788')
        await global.pause(5000000)
    });

});