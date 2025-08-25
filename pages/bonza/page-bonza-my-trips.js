const global = require("../../commands.conf");
const sessionData = require("../../sessionData");
const bonzaMainPage = require ('./page-bonza-main');

const bookingConfirmNumber = '//*[@content-desc="input__oci__check-in__booking-number"]';
const lastName = '//*[@content-desc="input__oci__check-in__last-name"]';
const findMyTrip = '//*[@text=" Find my trip"]';
const departFlightHeader = '//*[contains(@text, "Departing")]';
const returnFlightHeader = '//*[contains(@text, "Returning")]';
const genericSeats = '//*[contains(@text, "Seat:")]';
const collapseExpandArrows = '//*[contains(@content-desc, "opacity__general__collapse")]';
const openSectionsReference = '//*[contains(@resource-id, "PassengerInfoCollapsed")]';
const viewReceiptButton = '//*[contains(@text, "View receipt")]';

let returnFlight = false;

async function logIn(bookingNumber, lastNameValue) {

    await global.logComment("Now entering My Trip...");
    await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton);
    await global.pause(2000);
    await global.clickOn(bonzaMainPage.toolbar.myTripsButtonAlternative);
    await global.pause(3000);
    await global.addValue(bookingConfirmNumber, bookingNumber);
    await global.addValue(lastName, lastNameValue);
    await global.clickOn(findMyTrip);
    if (await global.waitForElement(departFlightHeader, 10000)) {
        await global.logSuccess("Successfully logged into \"My Trips\"");
        if (await global.waitForElement(returnFlightHeader, 2000, 1, true)) {
            returnFlight = true;
        } else {
            returnFlight = false;
        }
        return true;
    } else {
        await global.logError("Failed to log into \"My Trips\"");
        return false;
    }

}

async function getInformation() {

    let information = {
        'seats': {}
    };

    let passengersDataRaw = await sessionData.getPassengersData();
    let passengers = passengersDataRaw.total;
    let passengersProcessed = 0;
    let iterationUpdateIndex = returnFlight? 2 : 1;

    let loops = 0;
    let limitRaw = await sessionData.getPassengersData();
    let limit = limitRaw['totalCount'] * 2;

    while (passengersProcessed < passengers.length) {

        if (loops > limit) {
            await global.logError("Unable to resolve all passengers in My Trips main page information gathering");
            return;
        }

        let seats = await driver.$$(genericSeats);

        let xStartIndex = 0;

        if (seats.length > 0) {

            if (await global.waitForElement(viewReceiptButton, 1000, 1, true)) {
                // you're at the bottom, thus some of the seats won't be valid.
                xStartIndex = 2 * passengersProcessed;
            } 

            for (x = xStartIndex; x < seats.length; x += iterationUpdateIndex) {
                let chosenPassengerSeats = {};
                let seat = await seats[x].getText();
                seat = seat.replace("Seat: ", "");
                chosenPassengerSeats['outgoing'] = seat;
                if (returnFlight) {
                    seat = await seats[x + 1].getText();
                    seat = seat.replace("Seat: ", "");
                    chosenPassengerSeats['return'] = seat;
                }

                information['seats'][passengers[passengersProcessed]] = chosenPassengerSeats;
                passengersProcessed++;
            }

        }

        await global.scrollViaUIScrollable("d", 1);
        loops++;

    }

    // only seats for now?

    console.log(information);

    return information;

}

async function checkInformation() {

    let selectedSeats = await sessionData.getAssignedSeatsData();
    console.log(selectedSeats);
    let information = await getInformation();
    console.log(information);
    if (information == null) {
        return;
    }
    let seatDataFromMMB = information['seats'];
    let checkPassengers = Object.keys(seatDataFromMMB);
    for (let i = 0; i < checkPassengers.length; i++) {

        // TODO: change to row check as well

        await global.logComment(`Validating outgoing seat for passenger ${checkPassengers[i]}`);
        let testSeatFromBooking = selectedSeats['outbound'][i];
        let testSeatFromMMB = seatDataFromMMB[checkPassengers[i]]['outgoing'];
        if (testSeatFromMMB.includes(testSeatFromBooking)) {
            await global.logSuccess(`Seat ${testSeatFromMMB} is consistent`);
        } else {
            await global.logError(`Seat ${testSeatFromMMB} does not agree with ${testSeatFromBooking}`);
        }
        
        await global.logComment(`Validating return seat for passenger ${checkPassengers[i]}`);
        testSeatFromBooking = selectedSeats['return'][i];
        testSeatFromMMB = seatDataFromMMB[checkPassengers[i]]['return'];
        if (testSeatFromMMB.includes(testSeatFromBooking)) {
            await global.logSuccess(`Seat ${testSeatFromMMB} is consistent`);
        } else {
            await global.logError(`Seat ${testSeatFromMMB} does not agree with ${testSeatFromBooking}`);
        }

    }

}

module.exports = {

    main: {

        title: '//*[@text="My Trips"]',
        firstTrip_Date: '//android.view.ViewGroup[@content-desc="touchable-opacity__general__journey-status__view-summary"]/android.widget.TextView[1]',
        firstTrip_bookingNumber: '//android.view.ViewGroup[@content-desc="touchable-opacity__general__journey-status__view-summary"]/android.widget.TextView[2]',
        firstTrip_destinations: '//android.view.ViewGroup[@content-desc="touchable-opacity__general__journey-status__view-summary"]/android.view.ViewGroup/android.widget.TextView',
        firstTrip_checkInTitle: '//android.view.ViewGroup[@content-desc="touchable-opacity__general__journey-status__view-summary"]/android.widget.TextView[3]',
        firstTrip_manageSeatsButton: '~touchable-opacity__general__journey-status__toggle-trip-details',
        firstTrip_addOptionsButton: '~touchable-opacity__general__journey-status__manage-seat',
        firstTrip_changeFlightButton: '~touchable-opacity__general__journey-status__toggle-trip-options',

        checkIn: '//*[contains(@content-desc, "Check In")]',

        viewReceiptButton: viewReceiptButton

    },

    login: {

        bookingConfirmNumber: bookingConfirmNumber, 
        lastName: lastName,
        findMyTrip: findMyTrip,

    },

    tripDetails: {
        departing_from: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[2]',
        departing_to: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[3]',
        departing_date: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[4]',
        departing_startTime: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[5]',
        departing_startAirport: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[7]',
        departing_endTime: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[6]',
        departing_endAirport: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[9]',
        departing_flightDuration: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[8]',
        departing_manageSeatsButton: '(//android.view.ViewGroup[@content-desc="touchable-opacity__mmb__layout__navigate-to"])[1]',
        departing_manageAddOnsButton: '(//android.view.ViewGroup[@content-desc="touchable-opacity__mmb__layout__navigate-to"])[2]',
        departing_changeFlightButton: '(//android.view.ViewGroup[@content-desc="touchable-opacity__mmb__layout__navigate-to"])[3]',
        departing_checkInButton: '(//android.view.ViewGroup[@content-desc="touchable-opacity__mmb__layout__navigate-to"])[4]',
        returning_from: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.TextView[2]',
        returning_to: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.TextView[3]',
        returning_date: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.TextView[4]',
        returning_startTime: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.TextView[5]',
        returning_startAirport: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.TextView[7]',
        returning_endTime: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.TextView[6]',
        returning_endAirport: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.TextView[9]',
        returning_flightDuration: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[6]/android.widget.TextView[8]',
        returning_manageSeatsButton: '(//android.view.ViewGroup[@content-desc="touchable-opacity__mmb__layout__navigate-to"])[1]',
        returning_manageAddOnsButton: '(//android.view.ViewGroup[@content-desc="touchable-opacity__mmb__layout__navigate-to"])[2]',
        returning_changeFlightButton: '(//android.view.ViewGroup[@content-desc="touchable-opacity__mmb__layout__navigate-to"])[3]',
        returning_checkInButton: '(//android.view.ViewGroup[@content-desc="touchable-opacity__mmb__layout__navigate-to"])[4]',
        travellerName: '//android.view.ViewGroup[@content-desc="touchable-opacity__general__collapse-form__toggle"]/android.widget.TextView',
        dateOfBirth: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[1]',
        editDetailsButton: '~touchable-opacity__mmb_edit-detail',
        email: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[2]',
        mobile: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[3]',
        departTitle: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[4]',
        returnTitle: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[5]',
        departCarryOnBagTitle: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[6]',
        departCarryOnBagDetails: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[8]',
        returnCarryOnBagTitle: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[6]',
        returnCarryOnBagDetails: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]/android.widget.TextView[8]',

        departFlightHeader: departFlightHeader,
        returnFlightHeader: returnFlightHeader,
        genericDepart: '//*[contains(@text, "Depart ")]',
        genericReturn: '//*[contains(@text, "Return ")]',
        genericEmail: '//*[contains(@text, "Email:")]',
        genericMobile: '//*[contains(@text, "Mobile:")]',
        genericDateOfBirth: '//*[contains(@text, "Date of birth:")]',
        genericSeats: genericSeats,

    },

    boardingPass: {
        bookingConfirmationNumber: '~input__oci__check-in__booking-number',
        lastNameInput: '~input__oci__check-in__last-name',
        findMyTripButton: '~mmb__submit_btn',
        noRecoredMessage: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]',
    },

    logIn,
    getInformation,
    checkInformation

};