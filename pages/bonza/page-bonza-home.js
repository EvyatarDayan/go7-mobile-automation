const global = require("../../commands.conf");
const sessionData = require("../../sessionData");

const bonzaMainPage = require ('./page-bonza-main');
const bonzaBookTripPage = require ('./page-bonza-book-trip');

const NWTools = require("nightwatch-tools");
const { driver } = require("@wdio/globals");

const firstMonthHeader = '(//*[contains(@resource-id, "HEADER_MONTH_NAME")])[1]';

let firstAvailableDate = "";

let chosenDepartDate = "";
let chosenReturnDate = "";

async function initialSetup(nAdults = "random", nYouths = "random", nChildren = "random", nInfants = "random", email = "") {

    prepareToHandleSessionEnd();

    let passengerCounts = handlePassengerSelections(nAdults, nYouths, nChildren, nInfants);
    await sessionData.replacePassengerData("adtCount", passengerCounts[0]);
    await sessionData.replacePassengerData("ythCount", passengerCounts[1]);
    await sessionData.replacePassengerData("chdCount", passengerCounts[2]);
    await sessionData.replacePassengerData("infCount", passengerCounts[3]);

    if (email != "") {

        await sessionData.setEmail(email);

    } else {

        let currentEmail = await sessionData.getEmail();

        if (currentEmail == "") {
            // only replaces current email if not already set (which it will not be in most cases)
            let randomString = NWTools.randomString(4,'abcdefghijklmnopqrstuvwxyz');
            await sessionData.setEmail(`tommy.${randomString}@yopmail.com`);
        }

    }

    await global.logComment(`Chosen email address: ${await sessionData.getEmail()}`);

}

async function prepareToHandleSessionEnd() {

    // after 20 minutes, the session will attempt to terminate - the popup will stop all other functionality until clicked.
    // this function will become active after 20 mins, scanning for it and eliminating when it finds it.

    let msInOneMinute = 60000;
    let minutesDelay = 20;

    // start slightly before to catch it when it pops up
    await global.pause((minutesDelay * msInOneMinute) - 10000, true);
    if (await global.waitForElement('//*[contains(@text, "Your session will expire")]', 600, 1, true)) {
        await global.clickOn('//*[contains(@text, "OK")]');
        await global.logComment("Session warning popup closed");
    }
    await global.logComment("No session warning found, terminating waiting process");

}

async function handlePassengerSelections(nAdults, nYouths, nChildren, nInfants) {

    let passengerCounts = [nAdults, nYouths, nChildren, nInfants];
    let randomChoice;

    for (let i = 0; i < passengerCounts.length; i++) {

        if (passengerCounts[i] === "random" || passengerCounts[i] == -1) {

            switch (i) {
                case 0:
                    // ADT
                    randomChoice = await global.selectRandomInteger(1, 4);
                    break;
                case 1:
                    // YTH
                    randomChoice = await global.selectRandomInteger(0, 4);
                    break;
                case 2:
                    // CHD
                    randomChoice = await global.selectRandomInteger(0, passengerCounts[0]);
                    break;
                case 3:
                    // INF
                    randomChoice = await global.selectRandomInteger(0, passengerCounts[0]);
                    break;
            };

            passengerCounts[i] = randomChoice;

        }

    }

    return passengerCounts;

}

async function fullFlow(fromLocation, toLocation, departDate, returnDate, nAdults, nYouths, nChildren, nInfants, email = "", timeout = 10000) {

    await handleInitialPopups(timeout);

    await initialSetup(nAdults, nYouths, nChildren, nInfants, email);

    await bookTripFlow(fromLocation, toLocation, departDate, returnDate, nAdults, nYouths, nChildren, nInfants);

}

async function handleInitialPopups(timeout = 10000) {

    await sessionData.clearSessionData();

    let currentTime = 0;

    let possiblePopups = [bonzaMainPage.main.googleStoreTitle, bonzaMainPage.main.updateNoButton];
    let popupSolutions = [bonzaMainPage.main.closeGoogleStorePopup, bonzaMainPage.main.updateNoButton];
    let popupNames = ["Google Play Store", "System"];
    let popupsClosed = 0;

    // android.view.ViewGroup[@content-desc="button__click"]/android.view.ViewGroup

    while (currentTime < timeout && popupsClosed < possiblePopups.length) {

        for (let i = 0; i < possiblePopups.length; i++) {

            let elementCount = await driver.$$(possiblePopups[i]).length;
            if (elementCount > 0) {
                await global.logComment(`Popup element "${popupNames[i]}" prompting an update found - attempting to close`);
                try {
                    await global.clickOn(popupSolutions[i]);
                    popupsClosed += 1;
                    await global.logSuccess(`${popupNames[i]} popup closed`);
                } catch {
                    await global.logError(`${popupNames[i]} was unable to be closed - this is not necessarily an issue unless it repeats, as multiple popups can have a priority system`);
                    // in case there is a priority order
                }
            }

        }

        currentTime += 1000;
        await global.pause(1000, true);

    }

    if (popupsClosed > 0) {
        return;
    } else {
        await global.logComment("No popup elements prompting an update were found");
    }
    
}

async function bookTripFlow(fromLocation, toLocation, departDate, returnDate, nAdults, nYouths, nChildren, nInfants) {

    await handleFlights(fromLocation, toLocation);
    await handleDates(departDate, returnDate);

    // Select passengers
    await selectPassengers(nAdults, nYouths, nChildren, nInfants);
    await confirmPassengerPanel();

    // Click on show flights
    await global.clickOn(bonzaBookTripPage.bookTrip.showFlightsButton);
    await global.pause(2000);

}

async function startFlightPage() {

    // Click on "Book"
    await global.clickOn(bonzaMainPage.toolbar.bookButton);

}

async function selectFlight(location, flightType) {

    let desiredFlight = "";
    let flights = [];
    let randomIndex = 0;

    if (flightType === "outgoing" || flightType === "outbound") {

        await global.clickOn(bonzaBookTripPage.bookTrip.fromButton);
        await global.pause(1500);

        if (location != "random") {

            // simple
            desiredFlight = location;
            await chooseFlight(desiredFlight);

        } else {

            flights = await getFlightList(flightType);
            randomIndex = global.selectRandomIndex(flights);
            desiredFlight = flights[randomIndex];
            await chooseFlight(desiredFlight, "bottom");

        }

        await global.logComment(`Outbound flight: ${desiredFlight}`);
        await sessionData.setOutboundFlight(desiredFlight);

    } else {

        try {
            await global.clickOn(bonzaBookTripPage.bookTrip.toButton, true);
            await global.pause(1500);
        } catch {
            // might already be open
        }

        if (location != "random") {

            // simple
            desiredFlight = location;
            await chooseFlight(desiredFlight);

        } else {

            flights = await getFlightList(flightType);
            randomIndex = global.selectRandomIndex(flights);
            desiredFlight = flights[randomIndex];
            await chooseFlight(desiredFlight, "bottom");

        }

        await global.logComment(`Inbound flight: ${desiredFlight}`);
        await sessionData.setInboundFlight(desiredFlight);

    }

}

async function getFlightList(flightType) {

    await global.logComment("Now gathering entire flight list");

    let flightLocations = [];
    let noNewLocations = false;  // starting state
    let location = "";

    if (flightType === "outgoing" || flightType === "outbound") {
        airportListSelector = '//*[contains(@content-desc, "destination_")]/android.widget.TextView';
    } else {
        airportListSelector = '//*[contains(@content-desc, "inbound-airport-")]/android.widget.TextView';
    }

    while (!noNewLocations) {

        noNewLocations = true;  // if no new ones are found, the loop will ultimately terminate

        let locationArray = [];

        let airpostListArray = await driver.$$(airportListSelector);
        for (let i = 0; i < airpostListArray.length; i++) {
            locationArray.push(await airpostListArray[i].getText());
        }

        let newLocations = [];

        for (let i = 0; i < locationArray.length; i++) {

            location = locationArray[i];

            if (!flightLocations.includes(location)) {

                newLocations.push(location);
                flightLocations.push(location);
                noNewLocations = false;  // a new location was found, continue

            }

        }

        if (newLocations.length > 0) {
            await global.logComment("New locations found:");
            console.log(newLocations);
        }

        await global.scrollFlightWindow("d", 1);

    }

    return flightLocations;

}

async function chooseFlight(flight, startPosition = "top", panelOpen = true) {

    await global.logComment(`Now attempting to choose flight ${flight}`);

    let attempts = 0;

    //flightsSelector = `//android.widget.TextView[@text="${flight}"]`;

    if (flight.length === 3) {
        flightsSelector = `//*[contains(@text, "(${flight})")]`;
    } else {
        flightsSelector = `//*[contains(@text, "${flight}")]`;
    }

    while (true) {

        try {

            await global.clickOn(flightsSelector, true);
            return true;

        } catch {

            if (startPosition === "top") {
                await global.scrollFlightWindow("d", 1);
            } else {
                await global.scrollFlightWindow("u", 1);
            }
            await global.pause(1000, true);
            attempts++;

        }

        if (attempts > 15) {
            await global.logError(`Unable to find flight ${flight}`);
            return false;
        }

    }

}

async function handleFlights(fromLocation, toLocation) {

    let airportSelector;
    let airportListSelector;
    let airportArray;

    await startFlightPage();

    await selectFlight(fromLocation, "outgoing");
    await selectFlight(toLocation, "return");

    /*
    
    // Click on from button
    await global.clickOn(bonzaBookTripPage.bookTrip.fromButton);
    // Select from location
    await global.pause(1500);

    if (fromLocation === "random") {
        airportListSelector = '//android.widget.ScrollView[@content-desc="scrollview_ibe_depart-airport"]//android.view.ViewGroup';
        airportArray = await driver.$$(airportListSelector);
        // index = 0 is just the whole thing, won't work - start from 1
        airportSelector = airportArray[1 + Math.floor(Math.random() * (airportArray.length - 1))];
        //console.log(`Random departure airport: ${await airportSelector.getText()}`);
    } else {
        airportSelector = `//android.widget.TextView[contains(@text, "(${fromLocation})")]`;
    }

    await global.clickOn(airportSelector);
    // Select to location
    await global.pause(1500);

    if (toLocation === "random") {
        airportListSelector = '//*[contains(@content-desc, "touchable-opacity__ibe__inbound-airport")]';
        //airportListSelector = '//*[contains(@content-desc, "touchable-opacity__ibe__inbound-airport")]//android.view.ViewGroup';
        airportArray = await driver.$$(airportListSelector);
        airportSelector = await airportArray[Math.floor(Math.random() * airportArray.length)];
        //console.log(`Random destination airport: ${await airportSelector.getText()}`);
    } else {
        airportSelector = `//android.widget.TextView[contains(@text, "(${toLocation})")]`;
    }

    await global.clickOn(airportSelector);

    */

}

async function handleDates(departDate, returnDate) {

    await determineFirstAvailableMonth();

    departDate = await selectDepartDate(departDate);
    returnDate = await selectReturnDate(departDate, returnDate);

    // Click on confirm dates
    await confirmDates();

}

async function determineFirstAvailableMonth() {

    if (firstAvailableDate != "") {
        // only defined once
        return;
    }

    let firstMonthHeaderValue = await global.getElementText(firstMonthHeader, true);
    let monthName = firstMonthHeaderValue.split(" ")[0];
    let monthNumber = await global.convertMonthNameToNumber(monthName);
    let year = firstMonthHeaderValue.split(" ")[1];

    firstAvailableDate = year + "-" + monthNumber + "-01";

}

async function validateDepartDate(dateString) {

    if (await global.isNumber(dateString.replace("-", "A"))) {

        // just a flat number of days to add to current day
        let outboundDateDate = new Date();
        outboundDateDate.setDate(outboundDateDate.getDate() + parseInt(dateString));
        dateString = outboundDateDate.toISOString().slice(0, 10);

    }

    let dateNumber = Date.parse(dateString);
    let firstAvailableDateTest = Date.parse(firstAvailableDate);
    //let todayNumber = new Date();

    if (dateNumber < firstAvailableDateTest) {

        await global.logComment(`Outbound date is before the first available day - redefining as ${firstAvailableDate}`);
        //return (new Date()).toISOString().slice(0, 10);
        return firstAvailableDate;

    } else {

        // current date is valid

        await global.logComment("Outbound date is defined correctly");
        return dateString;

    }

}

async function validateInboundDate(dateString, outboundDateString) {

    if (await global.isNumber(dateString.replace("-", "A"))) {

        // just a flat number of days to add to current day
        let inboundDateDate = new Date();
        inboundDateDate.setDate(inboundDateDate.getDate() + parseInt(dateString));
        dateString = inboundDateDate.toISOString().slice(0, 10);

    }

    let dateNumber = Date.parse(dateString);
    let outboundDateNumber = Date.parse(outboundDateString);

    if (dateNumber <= outboundDateNumber) {

        await global.logComment("Inbound date is before the outbound date - redefining as three days after outbound");
        let outboundDateDate = new Date(outboundDateString);
        outboundDateDate.setDate(outboundDateDate.getDate() + 3);
        return outboundDateDate.toISOString().slice(0, 10);

    } else {

        // current date is valid
        await global.logComment("Return date is defined correctly");
        return dateString;

    }

}

async function selectValidDate(firstDate, flightType, limit = 30, monthScrollLimit = 12, startIndex = 0) {

    await determineFirstAvailableMonth();

    // TODO: checkIfEnabled is slow. Can use a different method involving content-desc including "enabled" when it is fixed 

    // seekInvalid is purely used to return a first invalid date for validation purposes
    // not sure whether it's better to put it in this function or repeat
    let seekInvalid;
    if (flightType === "validation") {
        seekInvalid = true;
    } else {
        seekInvalid = false;
    }

    let operativeDate = firstDate;

    let attempts = 0;
    let monthScrolls = 0;

    // there are three ways the value is located: completely unselected, "in selected range", and selected endpoint
    // we will put them in an array to loop over via try/catches
    // a, b, and c are dummy values which will be replaced
    let dateSelector = ["a", "b", "c"];

    let firstErrorComment = false;

    while (true) {

        let enableTestLocator = `//*[@content-desc="${operativeDate}"]`;
        dateSelector[0] = `//*[@content-desc="${operativeDate}"]/android.widget.TextView`;
        dateSelector[1] = `//*[@content-desc="${operativeDate}"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView`;
        dateSelector[2] = `//*[@content-desc="${operativeDate}"]/android.view.ViewGroup/android.widget.TextView`;

        let datePresent;
        let dateEnabled;

        let enableTestLocatorCurrent = `//*[contains(@resource-id, "${operativeDate}")]`;
        let surroundingStrings = await produceSurroundingStrings(operativeDate);
        let previousOperativeDate = surroundingStrings['previous'];
        //let enableTestLocatorPrevious = `//*[@content-desc="${previousOperativeDate}"]`;
        let enableTestLocatorPrevious = `//*[contains(@resource-id, "${previousOperativeDate}")]`;
        // //*[contains(@resource-id, "2023-11-01")]
        let nextOperativeDate = surroundingStrings['next'];
        //let enableTestLocatorNext = `//*[@content-desc="${nextOperativeDate}"]`;
        let enableTestLocatorNext = `//*[contains(@resource-id, "${nextOperativeDate}")]`;

        datePresent = await global.waitForElement(enableTestLocatorCurrent, 1000, 1, true);

        if (!datePresent) {

            // wrong month

            if (monthScrolls > monthScrollLimit) {
                await global.logError(`Unable to find ${flightType} date ${operativeDate} and can no longer scroll to get further months`);
                return "error";
            }

            /*
            // first, determine which month is visible
            let visibleMonthNumber = -1;

            if (await global.waitForElement(enableTestLocatorPrevious, 1000, 1, true)) {
                visibleMonthNumber = previousOperativeDate.split("-")[1];
            } else if (await global.waitForElement(enableTestLocatorNext, 1000, 1, true)) {
                visibleMonthNumber = nextOperativeDate.split("-")[1];
            } else {
                await global.logError(`Unable to find ${previousOperativeDate}, ${operativeDate}, or ${nextOperativeDate} - likely no dates have loaded`);
            }
            */

            await global.logComment(`Unable to find date ${operativeDate} - checking surrounding dates`);

            // first, check if the next month is visible -> scroll up
            if (await global.waitForElement(enableTestLocatorNext, 1000, 1, true)) {

                await global.logComment(`Found date ${nextOperativeDate} - scrolling screen upwards`);
                await global.scrollByKeyPress("u", 3);
                monthScrolls++;
                continue;

            }

            // next, check if the previous month is visible -> scroll down
            if (await global.waitForElement(enableTestLocatorPrevious, 1000, 1, true)) {

                await global.logComment(`Found date ${previousOperativeDate} - scrolling screen downwards`);
                await global.scrollByKeyPress("d", 3);
                monthScrolls++;
                continue;

            }

            await global.logError(`Unable to find ${previousOperativeDate}, ${operativeDate}, or ${nextOperativeDate} - likely no dates have loaded`);

        }

        dateEnabled = await global.checkIsEnabled(enableTestLocator);
        if (!dateEnabled && seekInvalid) {
            return operativeDate;
        }

        if (dateEnabled && !seekInvalid) {

            let selectorFound = false;

            for (let i = startIndex; i < dateSelector.length; i++) {

                try {

                    await global.clickOn(dateSelector[i], true, 1000);

                    // success
                    if (flightType === "depart" || flightType === "outgoing") {
                        chosenDepartDate = operativeDate;
                        await sessionData.setDepartDate(chosenDepartDate);
                    } else {
                        chosenReturnDate = operativeDate;
                        await sessionData.setReturnDate(chosenReturnDate);
                    }
                    selectorFound = true;
                    break;

                } catch(error) {

                    // next

                }

            }

            if (!selectorFound) {
                await global.logError(`Unable to click ${flightType} date ${operativeDate}`);
                return "error";
            }

            await global.logSuccess(`Successfully found a valid date for ${flightType} - ${operativeDate}`);
            await global.pause(500, true);
            return operativeDate;

        }

        // only reaches here if the date is not valid; increments by 1 if not hit limit

        if (attempts > limit) {

            await global.logError(`Unable to find valid ${flightType} date - last attempted ${operativeDate}`);
            return operativeDate;

        }

        if (!seekInvalid) {
            if (!firstErrorComment) {
                await global.logComment(`Unable to find valid ${flightType} flight at ${operativeDate} - incrementing until found or limit (${limit} days) is reached`);
                firstErrorComment = true;
            }
        } else {
            if (!firstErrorComment) {
                await global.logComment(`Unable to find invalid date ${operativeDate} - incrementing until found or limit (${limit} days) is reached`);
                firstErrorComment = true;
            }
        }

        let currentOperativeDate = new Date(operativeDate);
        currentOperativeDate.setDate(currentOperativeDate.getDate() + 1);
        operativeDate = currentOperativeDate.toISOString().slice(0, 10);
        attempts += 1;
        await global.pause(500, true);

    }

}

async function produceSurroundingStrings(operativeDate) {

    // this might get relocated to general commands if it's considered useful enough
    let operativeMonth = Number(operativeDate.split("-")[1]);
    let operativeYear = Number(operativeDate.split("-")[0]);
    let previousYear = operativeYear;  // nb this is previous date year, not literally previous year
    let nextYear = operativeYear;  // nb this is next date year, not literally previous year

    let previousMonth = operativeMonth - 1;
    if (previousMonth === 0) {
        previousMonth = 12;
        previousYear--;
    }

    let nextMonth = operativeMonth + 1;
    if (nextMonth === 13) {
        nextMonth = 1;
        nextYear++;
    }

    let previousDay = await global.getLastDayOfMonth(previousMonth);
    let previousDayDisplay = previousDay.toString();

    if (previousDay < 10) {
        previousDayDisplay = "0" + previousDayDisplay;
    }

    let previousMonthDisplay = previousMonth.toString();
    if (previousMonthDisplay < 10) {
        previousMonthDisplay = "0" + previousMonthDisplay;
    }

    let nextMonthDisplay = nextMonth.toString();
    if (nextMonthDisplay < 10) {
        nextMonthDisplay = "0" + nextMonthDisplay;
    }

    let fullPreviousDate = previousYear + "-" + previousMonthDisplay + "-" + previousDayDisplay;

    let fullNextDate = nextYear + "-" + nextMonthDisplay + "-01";

    return {'previous': fullPreviousDate, 'next': fullNextDate};

}

async function selectDepartDate(departDate) {

    await determineFirstAvailableMonth();

    departDate = await validateDepartDate(departDate);
    departDate = await selectValidDate(departDate, "outgoing");
    return departDate;

}

async function selectReturnDate(departDate, returnDate) {

    await determineFirstAvailableMonth();

    if (returnDate == null || returnDate == '') {

        await sessionData.setReturnFlight(false);
        await global.logComment("No return date specified - proceeding as one-way flight");
        return "n/a";

    }

    if (returnDate.toLowerCase() != "n/a") {

        await global.logComment("Proceeding as return flight");
        await sessionData.setReturnFlight(true);
        returnDate = await validateInboundDate(returnDate, departDate);

        // Select returning date
        inboundDate = await selectValidDate(returnDate, "return");
        return inboundDate;

    } 

}

async function clickOnDeterminedDate(determinedDate, testForFailure = false, startIndex = 0) {

    await determineFirstAvailableMonth();

    if (testForFailure) {
        await selectValidDate(determinedDate, "validation", 0, 12, startIndex);  // exact only
    } else {
        await selectValidDate(determinedDate, "determined", 0, 12, startIndex);  // exact only
    }

}

async function resetDates() {
    // Click on reset dates
    await global.clickOn(bonzaBookTripPage.bookTrip.resetDatesButton);
}

async function confirmDates() {
    // Click on confirm dates
    await global.clickOn(bonzaBookTripPage.bookTrip.confirmDatesButton);
}

async function getDepartDate() {

    return chosenDepartDate;

}

async function getReturnDate() {

    return chosenReturnDate;

}

async function getDateText() {

    let departDateText = await global.getElementText(bonzaBookTripPage.bookTrip.departDateText);
    let returnDateText = await global.getElementText(bonzaBookTripPage.bookTrip.returnDateText);

    return {'depart': departDateText, 'return': returnDateText};

}

async function getFinalPassengerCount() {

    let passengerData = await sessionData.getPassengersData();
    let passengerCount = {
        'adt': passengerData.adtCount,
        'yth': passengerData.ythCount,
        'chd': passengerData.chdCount,
        'inf': passengerData.infCount
    };

    return passengerCount;

}

async function openPassengerPanel() {

    await global.clickOn(passengerButton);
    await global.pause(1000);

}

async function selectPassengers(nAdults, nYouths, nChildren, nInfants, removeSanity = false, validationDesired = {}) {

    // validationDesired = {'adt': 0, 'yth': 0, 'chd': 0, 'inf': 0};

    if (!removeSanity) {

        // validating passenger counts

        if (nAdults == 0) {

            await global.logError("The number of adults cannot be zero - setting to 1");
            nAdults = 1;

        }

        if (nChildren > nAdults) {

            await global.logError("The number of children cannot exceed the number of adults - setting to the number of adults");
            nChildren = nAdults;

        }

        if (nInfants > nAdults) {

            await global.logError("The number of infants cannot exceed the number of adults - setting to the number of adults");
            nInfants = nAdults;

        }

    }

    // defining a process function so as not to repeat code - also, this is the mandatory order

    let processList = [

        {name: 'adt', target: nAdults,
         plus: bonzaBookTripPage.bookTrip.adultsPlusButton, minus: bonzaBookTripPage.bookTrip.adultsMinusButton},
        {name: 'yth', target: nYouths,
         plus: bonzaBookTripPage.bookTrip.youthsPlusButton, minus: bonzaBookTripPage.bookTrip.youthsMinusButton},
        {name: 'chd', target: nChildren,
         plus: bonzaBookTripPage.bookTrip.childrenPlusButton, minus: bonzaBookTripPage.bookTrip.childrenMinusButton},
        {name: 'inf', target: nInfants,
         plus: bonzaBookTripPage.bookTrip.infantsPlusButton, minus: bonzaBookTripPage.bookTrip.infantsMinusButton}

    ];

    for (let processIndex in processList) {

        let process = processList[processIndex];
        let current = await getCurrentCount(process['name']);
        let target = process['target'];

        // adding this validation here just means not having to repeat it elsewhere

        if (target > 9) {

            await global.logError("The number of passengers in a single category cannot exceed 9 - setting to 9");
            processList[processIndex]['target'] = 9;
            target = 9;

        }

        let clicks = target - current;
        let inverse = false;

        if (clicks === 0) {

            // no action required

        } else if (clicks > 0) {

            // normal scenario -> simply click the number of times required 

        } else if (clicks < 0) {

            // reverse scenario -> the desired is below the current number
            inverse = true;
            clicks = clicks * -1;

        }

        // now clicking required number of times

        if (inverse) {

            // inverted, so you need to reduce the number

            for (let i = 0; i < clicks; i++) {

                await global.clickOn(process['minus']);
                await global.pause(250, true);

            }

        } else {

            // regular

            for (let i = 0; i < clicks; i++) {

                await global.clickOn(process['plus']);
                await global.pause(250, true);

            }

        }

        // validating that the counts equal the expected amounts and adding to a dictionary

        current = await getCurrentCount(process['name']);

        if (removeSanity) {

            // if the sanity is removed, it is for testing - thus the actual target will be put here
            target = validationDesired[process['name']];

        }

        if (target === current) {
            await global.logSuccess(`${process['name'].toUpperCase()} selected count matches expectations`);
        } else {
            await global.logError(`${process['name'].toUpperCase()} selected count does not match expectations - expected ${target} vs actual ${current}`);
        }

        // even if error, nonetheless add to data
        // temporary construct, just in case it dies early
        let countName = process['name'] + "Count";
        await sessionData.replacePassengerData(countName, current);
        let total = (sessionData.getPassengersData())['totalCount'];
        total += current;
        await sessionData.replacePassengerData('totalCount', current);

    }

}

async function confirmPassengerPanel() {

    // Click on confirm travellers button
    console.log("Selected passenger count:");
    console.log(await getFinalPassengerCount());
    console.log("");
    await global.pause(1000);
    await global.clickOn(bonzaBookTripPage.bookTrip.confirmTravellersButton);

}

async function resetPassengers() {

    let validationDesired = {'adt': 0, 'yth': 0, 'chd': 0, 'inf': 0};
    await selectPassengers(0, 0, 0, 0, true, validationDesired);

}

async function getCurrentCount(name) {

    switch (name) {

        case "adt":
            return parseInt(await global.getElementText(bonzaBookTripPage.bookTrip.adultsSelectedNumber));
        case "yth":
            return parseInt(await global.getElementText(bonzaBookTripPage.bookTrip.youthsSelectedNumber));          
        case "chd":
            return parseInt(await global.getElementText(bonzaBookTripPage.bookTrip.childrenSelectedNumber));
        case "inf":
            return parseInt(await global.getElementText(bonzaBookTripPage.bookTrip.infantsSelectedNumber));
    }

}

async function restartApp() {

    await driver.launchApp();
    await handleInitialPopups();

}

module.exports = {

    main: {
        title: '//android.view.View[@text="Home"]',
        fromValue: '//android.view.ViewGroup[@content-desc="touchable-opacity__ibe__origin-select"]/android.widget.TextView[2]',
        toValue: '//android.view.ViewGroup[@content-desc="touchable-opacity__ibe__destination-select"]/android.widget.TextView[2]',
        departAndReturnDatesValue: '//android.view.ViewGroup[@content-desc="btn__depart-date"]/android.view.ViewGroup/android.widget.TextView',
        firstMonthHeader: firstMonthHeader,
        passengerButton: `//android.widget.TextView[@text="WHO'S TRAVELLING?"]`,
        passengersValue: '//android.view.ViewGroup[@content-desc="touchable-opacity__ibe__open-pax-select"]/android.widget.TextView[2]',
    },

    data: {

        departDate: chosenDepartDate,
        returnDate: chosenReturnDate

    },

    handlePassengerSelections,
    fullFlow,
    handleInitialPopups,
    bookTripFlow,
    handleFlights,
    getFlightList,
    handleDates,
    determineFirstAvailableMonth,
    selectDepartDate,
    selectReturnDate,
    selectValidDate,
    clickOnDeterminedDate,
    getDateText,
    resetDates,
    confirmDates,
    getDepartDate,
    getReturnDate,
    getFinalPassengerCount,
    selectPassengers,
    resetPassengers,
    getCurrentCount,
    restartApp

};