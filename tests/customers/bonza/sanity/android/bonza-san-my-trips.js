const global = require("../../../../../commands.conf");
const data = require("../../../../../data");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaMyTripsPage = require ('../../../../../pages/bonza/page-bonza-my-trips');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');
const bonzaSeatsPage = require ('../../../../../pages/bonza/page-bonza-seats');
const bonzaBagsPage = require ('../../../../../pages/bonza/page-bonza-bags');
const bonzaChangeFlightPage = require ('../../../../../pages/bonza/page-bonza-change-flight');
const {driver} = require("@wdio/globals");

let email = data.users.bonza.STG.USER_2.USERNAME
let password = data.users.bonza.STG.USER_2.PASSWORD;

describe('My trips', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Sign in',async ()=> {
        // Open the sideMenu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on Login
        await global.clickOn(bonzaSideMenuPage.main.login)
        // Sign in
        await global.bonza_signIn(email, password)
        await global.pause(2000)
    });

    it('Trip summary validation',async ()=> {
        // Click on my trips button
        await global.clickOn(bonzaMainPage.toolbar.myTripsButton)
        // Validate first trip details
        await global.validateElementText(bonzaMyTripsPage.main.firstTrip_Date, 'Sun 3 Sep - Wed 6 Sep')
        // Validate first trip booking number
        await global.validateElementText(bonzaMyTripsPage.main.firstTrip_bookingNumber, 'TZ1R2U')
        // Validate first trip destinations
        await global.validateElementText(bonzaMyTripsPage.main.firstTrip_destinations, 'Bundaberg  0  Melbourne (Tullamarine)')
        // Validate first trip check in title
        await global.validateElementText(bonzaMyTripsPage.main.firstTrip_checkInTitle, 'Check in available in')
    });

    it('Trip details - departing validation',async ()=> {
        // Click on the first trip
        await global.clickOn(bonzaMyTripsPage.main.firstTrip_destinations)
        // Validate departing from
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_from, 'Bundaberg')
        // Validating departing to
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_to, 'Melbourne (Tullamarine)')
        // Validating departing date
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_date, 'Sun 03 September 2023')
        // Validating departing start time
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_startTime, '19:15')
        // Validating departing start airport
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_startAirport, 'BDB')
        // Validating departing end time
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_endTime, '21:55')
        // Validating departing end airport
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_endAirport, 'MEL')
        // Validating departing duration
        await global.validateElementText(bonzaMyTripsPage.tripDetails.departing_flightDuration, 'AB1006• 2h 40m')

        // Click on manage seats
        await global.clickOn(bonzaMyTripsPage.tripDetails.departing_manageSeatsButton)
        // Validate page open
        // await global.validateElementText(bonzaSeatsPage.main.title, 'Choose Seats')
        // Click on back in seats page
        await global.clickOn(bonzaSeatsPage.main.changeSeatsBackButton)
        // Click on manage add options
        await global.clickOn(bonzaMyTripsPage.tripDetails.departing_manageAddOnsButton)
        // Validate page open
        await global.validateElementText(bonzaBagsPage.main.title, 'Add Bags')
        // Click on back
        await global.clickOn(bonzaBagsPage.main.bagsBackButton)
        // Click on change flight
        await global.clickOn(bonzaMyTripsPage.tripDetails.departing_changeFlightButton)
        // Validate page open
        await global.validateElementText(bonzaChangeFlightPage.main.title, 'Change Flight')
        // Click on back
        await global.clickOn(bonzaChangeFlightPage.main.changeFlightBackButton)
    });

    it('Trip details - returning validation',async ()=> {
        // Validate returning from
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_from, 'Melbourne (Tullamarine)')
        // Validating returning to
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_to, 'Bundaberg')
        // Validating returning date
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_date, 'Wed 06 September 2023')
        // Validating returning start time
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_startTime, '16:00')
        // Validating returning start airport
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_startAirport, 'MEL')
        // Validating returning end time
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_endTime, '18:45')
        // Validating returning end airport
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_endAirport, 'BDB')
        // Validating returning duration
        await global.validateElementText(bonzaMyTripsPage.tripDetails.returning_flightDuration, 'AB1005• 2h 45m')

        // Click on manage seats
        await global.clickOn(bonzaMyTripsPage.tripDetails.returning_manageSeatsButton)
        // Validate page open
        await global.validateElementText(bonzaSeatsPage.main.title, 'Choose Seats')
        // Click on back
        await global.clickOn(bonzaSeatsPage.main.changeSeatsBackButton)
        // Click on manage add-ons
        await global.clickOn(bonzaMyTripsPage.tripDetails.returning_manageAddOnsButton)
        // Validate page open
        await global.validateElementText(bonzaBagsPage.main.title, 'Add Bags')
        // Click on back
        await global.clickOn(bonzaBagsPage.main.bagsBackButton)
        // Click on change flight
        await global.clickOn(bonzaMyTripsPage.tripDetails.returning_changeFlightButton)
        // Validate page open
        await global.validateElementText(bonzaChangeFlightPage.main.title, 'Change Flight')
        // Click on back
        await global.clickOn(bonzaChangeFlightPage.main.changeFlightBackButton)
        // Swipe up
        await global.pause(1000)
        await global.scrollTo(500, 2000, 500, 500)



        await global.pause(80000000)
    });
})
