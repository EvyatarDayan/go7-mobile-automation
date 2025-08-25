const global = require("../../commands.conf");
const sessionData = require("../../sessionData");
const bonzaFlightResultsPage = require("./page-bonza-flight-results");

const title = '//*[@text="Choose seats"]';
const flightHeaderReference = '//*[contains(@text, " 0 ")]';
const nextCustomerButton = '//*[contains(@text, "Next customer")]';
const nextFlightButton = '//*[contains(@text, "Next flight")]';
const nextScreenButton = '//*[contains(@text, "Add Bags")]';
const pleaseSelectSeatOnEmpty = '//*[contains(@text, "Please select seat")]';
const addSeatsButtonOnEmpty = '//*[contains(@text, "Add seats")]';
const skipForNowButtonOnEmpty = '//*[contains(@text, "Skip for now")]';
const selectedSeatActive = '//*[contains(@text, "Selected")]';
const selectedSeatIDs = '//*[@resource-id="seatmap__seat-number"]';
const totals = '//*[contains(@text, "AUD")]';

const seatSelector = '//android.widget.TextView[contains(@text, "$") and not(contains(@text, "AUD")) and not (contains(@resource-id, "bundle"))]';
let elementsToIgnore = [];

let modePriceChosen = "$-1";

let numberOfRequiredSeats = 10;

let timesScrolled = 0;

let seatInformation = {'outbound': [], 'return': []};
let seatLetterGuess = {};

const allSeatsPrice = [];
const departSeatPrice = [];
const returnSeatPrice = [];
const flightsAndSeatsPrice = [];

let runningSeatsData = {'outbound': [], 'return': []};

// ----------------------------------- START SIMPLIFICATION -----------------------------------

// simplifying because the seats are best assigned on-demand

async function handleSeatSelectionNeo(autoSelect = false, extractPrices = false) {

    let firstFlightHeader = await getFlightHeader();  // this is needed to make sure page has changed

    await selectSeatsNeo(autoSelect, false);

    if (extractPrices) {
        await extractPrice("outbound");
    }

    if (await sessionData.isReturnFlight()) {

        // return flight
        await resetSeatVariables();

        await global.clickOn(nextFlightButton, true);

        if (autoSelect) {

            await global.pause(2000, true);
            await global.clickOn(skipForNowButtonOnEmpty);

        }

        await global.pause(5000, true);

        let secondFlightHeader = await getFlightHeader();
        let timeTaken = 0;

        while (firstFlightHeader === secondFlightHeader) {
            
            await global.pause(1000, true);
            try {
                secondFlightHeader = await getFlightHeader();
            } catch {
                // if it catches the page mid-transition - I don't know if the value will actually get assigned here, probably not? But for safety
                secondFlightHeader = firstFlightHeader;
            }
            timeTaken++;

            if (timeTaken > 15) {
                await global.logError("Second flight seats page seemed to not load - or something is wrong with the flight header");
                return;
            }

        }

        await selectSeatsNeo(autoSelect, true);

        if (extractPrices) {
            await extractPrice("return");
        }

    }

    sessionData.setAssignedSeatsData(seatInformation);
    console.log(await sessionData.getAssignedSeatsData());

    await endSeatsPageNeo(autoSelect);

}

async function endSeatsPageNeo(autoSelect) {

    await global.clickOn(nextScreenButton);

    if (autoSelect) {

        await global.pause(2000, true);
        await global.clickOn(skipForNowButtonOnEmpty);

    }

    await global.pause(3000, true);

}

async function selectSeatsNeo(autoSelect, returnLeg) {

    let passengers = await sessionData.getPassengersData();

    let nAdults = passengers['adtCount'];
    let nYouths = passengers['ythCount'];
    let nChildren = passengers['chdCount'];
    let nInfants = passengers['infCount'];

    if (autoSelect) {

        let totalPassengers = nAdults + nYouths + nChildren;  // INFs do not directly impact seats flow directly

        await global.pause(5000);

        for (let i = 1; i < totalPassengers; i++) {

            // setting i = 1 means it will only click next customer one time less than the number of passengers (last must be next flight/add bags)

            await global.clickOn(nextCustomerButton, true);
            await global.pause(2000, true);

        }

        // updating seat selections to show they were autoplaced

        for (let i = 0; i < totalPassengers; i++) {

            let outboundOrReturn = returnLeg? "return" : "outbound";
            seatInformation[outboundOrReturn].push("AUTO");

        }

        return;

    }

    let remainingAdults = nAdults;
    let remainingYouths = nYouths;

    if (nInfants > 0 || nChildren > 0) {

        await placeComplex(nAdults, nYouths, nChildren, nInfants, returnLeg);

    } else {

        // remaining adts/yths go here
        await placeSimple(remainingAdults + remainingYouths, returnLeg);

    }

}

async function placeSimple(remainingPassengers, returnLeg) {

    while (true) {

        let timesScrolled = 0;

        // simple placement for youths/adults who can go anywhere now

        let seats = await driver.$$(seatSelector);

        let duplicatedElementsCheck = [];

        // first, establishing available seat numbers/letters

        for (let i = 0; i < seats.length; i++) {

            if (remainingPassengers === 0) {
                // everyone placed
                return;
            }

            let seatElement = seats[i];

            let seatX = await seatElement.getLocation('x');
            let seatY = await seatElement.getLocation('y');

            // checking for duplicates (can occur during returns as the prior selections are still accessible, at the end of the list)

            let seatCoordinateData = {'x': seatX, 'y': seatY};
            let duplicateSeatFound = false;

            for (let z = 0; z < duplicatedElementsCheck.length; z++) {

                if (seatCoordinateData['x'] === duplicatedElementsCheck[z]['x'] && seatCoordinateData['y'] === duplicatedElementsCheck[z]['y']) {
                    duplicateSeatFound = true;
                    break;
                }            

            }

            if (duplicateSeatFound) {
                await global.logComment("Duplicated seat found, ignoring...");
                continue;
            } else {
                duplicatedElementsCheck.push(seatCoordinateData);
            }

            // testing to see whether it can be interacted with via selection and deselection

            let beforeSeatsData = await getSeatAssignments();

            await global.clickByCoordinates(seatX, seatY);

            await global.pause(2000);

            let afterSeatsData = await getSeatAssignments();

            // now checking before and after; cleanest way to get seat choices without explicit seat IDs

            let seatChangeFound = false;
            let newSeatValue;

            for (let x = 0; x < beforeSeatsData.length; x++) {

                for (let y = 0; y < afterSeatsData.length; y++) {

                    if (beforeSeatsData[x] != afterSeatsData[y]) {

                        newSeatValue = afterSeatsData[y];
                        seatChangeFound = true;
                        break;

                    }

                }

                if (seatChangeFound) {
                    break;
                }

            }

            if (!seatChangeFound) {

                await global.logComment("Phantom seat found, ignoring...");
                continue;

            }

            // place, no further calculation required - just simply don't deselect the placement
            let outboundOrReturn = returnLeg? "return" : "outbound";
            seatInformation[outboundOrReturn].push(newSeatValue);

            remainingPassengers--;

            if (remainingPassengers > 0) {

                await global.clickOn(nextCustomerButton, true);
                await global.pause(2000, true);
                for (let x = 0; x < timesScrolled; x++) {

                    await scrollToMoreSeats(timesScrolled, false);

                }

            } else {

                return;  // terminate, complete

            }

        }
        
        timesScrolled = await scrollToMoreSeats(timesScrolled, true);
        if (timesScrolled === -1) {
            // error
            return;
        }

    }

}

async function placeComplex(nAdults, nYouths, nChildren, nInfants, returnLeg) {

    let remainingAdults = nAdults;
    let remainingYouths = nYouths;
    let remainingChildren = nChildren;
    let remainingInfants = nInfants;

}

// ----------------------------------- END SIMPLIFICATION -----------------------------------

async function handleSeatSelection(nAdults, nYouths, nChildren, returnFlight, extractPrices = false) {

    seatInformation = {'outbound': [], 'return': []};
    seatLetterGuess = {};

    await determineNumberOfRequiredSeats(nAdults, nYouths, nChildren);

    await global.pause(5000);

    let firstFlightHeader = await getFlightHeader();
    let rows = await determineSeats(nAdults, nYouths, nChildren);
    let selectElements = await assignSeats(rows, nAdults, nYouths, nChildren);
    await selectSeats(selectElements, false);
    await global.pause(1000, true);
    if (extractPrices) {
        await extractPrice("outbound");
    }

    if (returnFlight) {

        await resetSeatVariables();

        await global.clickOn(nextFlightButton, true);

        let secondFlightHeader = await getFlightHeader();
        let timeTaken = 0;

        while (firstFlightHeader === secondFlightHeader) {
            
            await global.pause(1000, true);
            try {
                secondFlightHeader = await getFlightHeader();
            } catch {
                // if it catches the page mid-transition - I don't know if the value will actually get assigned here, probably not? But for safety
                secondFlightHeader = firstFlightHeader;
            }
            timeTaken++;

            if (timeTaken > 15) {
                await global.logError("Second flight seats page seemed to not load - or something is wrong with the flight header");
                return;
            }

        }

        await global.pause(2000, true);

        rows = await determineSeats(nAdults, nYouths, nChildren);
        selectElements = await assignSeats(rows, nAdults, nYouths, nChildren);
        await selectSeats(selectElements, true);
        await global.pause(1000, true);
        if (extractPrices) {
            await extractPrice("return");
        }

    }

    // now giving data to sessionData
    // TODO: make more succinct if IDs are updated
    let assignedSeatInformation = {'outbound': [], 'return': []};

    for (let i = 0; i < seatInformation['outbound'].length; i++) {

        let xCoordinate = seatInformation['outbound'][i]['x'];
        let yCoordinate = seatInformation['outbound'][i]['y'];
        let letter = seatLetterGuess[xCoordinate];
        let seat = {'letter': letter, 'row': yCoordinate};
        assignedSeatInformation['outbound'].push(seat);

    };

    for (let i = 0; i < seatInformation['return'].length; i++) {

        let xCoordinate = seatInformation['return'][i]['x'];
        let yCoordinate = seatInformation['return'][i]['y'];
        let letter = seatLetterGuess[xCoordinate];
        let seat = {'letter': letter, 'row': yCoordinate};
        assignedSeatInformation['return'].push(seat);

    };

    //await getSelectedSeats(returnFlight);
    console.log(await getRunningSeats());
    sessionData.setAssignedSeatsData(await getRunningSeats());

}

async function endSeatsPage() {

    await global.clickOn(nextScreenButton);

}

async function determineNumberOfRequiredSeats(nAdults, nYouths, nChildren) {

    numberOfRequiredSeats = nAdults + nYouths + (nChildren * 2);

}

async function determineSeats(nAdults, nYouths, nChildren) {

    // probabilistic approach for now, until assignment of seat IDs etc
    // since things will be much easier after that, I'm only going to have it assign to the top screen for now - can expand if necessary after

    await global.pause(2000, true);

    await global.logComment("Now determining viable seats for all passengers...");

    let unassignedSeatsAndOthers = [];

    let elementCoordinates = [];
    let xCoordinates = {};
    let yCoordinates = {};
    let prices = {};

    timesScrolled = 0;

    while (true) {

        elementsToIgnore = [];

        //unassignedSeatsAndOthersSelector = '//*[contains(@text, "$") and not(contains(@text, "AUD")) and not (contains(@text, "."))]';
        //unassignedSeatsAndOthersSelector = '//*[contains(@text, "$") and not(contains(@text, "AUD"))]';
        unassignedSeatsAndOthers = await driver.$$(seatSelector);

        if (unassignedSeatsAndOthers.length < numberOfRequiredSeats) {

            // immediately discards this set if it's insufficient - will change if we allow multi screen

            timesScrolled = await scrollToMoreSeats(timesScrolled);
            if (timesScrolled === -1) {
                // error
                return;
            }
            continue;

        }

        // PROBLEM: in return flights, available seats on the other flight can also appear in selectors
        // therefore, if it is a return flight, the list must be pre-filtered by eliminating duplicate co-ordinates
        // this is quite intensive but I can't think of a better way because the code doesn't seem to distinguish between them (both are displayed, enabled...)
        // most importantly, the ones relevant to that leg of the flight appear first, hence the duplication elimination method will work

        if (await sessionData.isReturnFlight()) {

            await global.logComment("Performing extra measures since it is a return flight...");

            let collectedCoordinates = [];

            for (let i = 0; i < unassignedSeatsAndOthers.length; i++) {

                let duplicateFound = false;

                let filterElement = unassignedSeatsAndOthers[i];

                let filterX = await filterElement.getLocation('x');
                let filterY = await filterElement.getLocation('y');

                let filterCoordinates = [filterX, filterY];

                for (let x = 0; x < collectedCoordinates.length; x++) {

                    if (collectedCoordinates[x][0] === filterCoordinates[0] && collectedCoordinates[x][1] === filterCoordinates[1]) {
                        // duplicate, purge
                        elementsToIgnore.push(i);
                        duplicateFound = true;
                        break;
                    }

                }

                if (!duplicateFound) {
                    // non-duplicate, add
                    collectedCoordinates.push(filterCoordinates);
                }

            }

        }

        if ((unassignedSeatsAndOthers.length - elementsToIgnore.length) < numberOfRequiredSeats) {

            // immediately discards this set if it's insufficient - will change if we allow multi screen

            timesScrolled = await scrollToMoreSeats(timesScrolled);
            if (timesScrolled === -1) {
                // error
                return;
            }
            continue;

        }

        // need to check validity of remaining options - sometimes "phantom" elements seem to slip in which cannot be interacted with
        // testing just by selecting/unselecting and seeing if the number changes (decrease means the seat can be selected)

        await global.logComment("Finding and purging phantom elements...");

        // this can be VERY time-consuming - so we're going to use a lookahead function

        let remainingAdults = nAdults;
        let remainingYouths = nYouths;
        let remainingChildren = nChildren;
        let adultYs = [];

        //console.log(`remAdult: ${remainingAdults}, remYth: ${remainingYouths}, remChd: ${remainingChildren}`);

        for (let i = 0; i < unassignedSeatsAndOthers.length; i++) {

            let phantomElement = unassignedSeatsAndOthers[i];

            let phantomCheckX = await phantomElement.getLocation('x');
            let phantomCheckY = await phantomElement.getLocation('y');

            let beforePhantomCheck = await driver.$$(seatSelector);
            beforePhantomCheck = beforePhantomCheck.length;
            await global.clickByCoordinates(phantomCheckX, phantomCheckY);
            await global.pause(1000, true);
            let afterPhantomCheck = await driver.$$(seatSelector);
            afterPhantomCheck = afterPhantomCheck.length;
            if (beforePhantomCheck > afterPhantomCheck) {

                // success, unselecting

                if (!adultYs.includes(phantomCheckY) && remainingAdults > 0) {

                    // first priority: assign an adult to "enable" the row for children
                    adultYs.push(phantomCheckY);
                    //console.log("adult-1");
                    remainingAdults--;

                } else if (adultYs.includes(phantomCheckY) && remainingChildren > 0) {

                    // second priority: assign child

                    //console.log("child-1");
                    remainingChildren--;

                } else if (remainingYouths > 0) {

                    // third priority: assign youth

                    //console.log("youth-1");
                    remainingYouths--;

                } else if (remainingChildren === 0 && remainingAdults > 0) {

                    // final priority: assign adult if no children

                    //console.log("adult-1 (no child)");
                    remainingAdults--;

                }

                await global.clickByCoordinates(phantomCheckX, phantomCheckY);
                await global.pause(1000, true);

            } else {

                if (!elementsToIgnore.includes(i)) {
                    elementsToIgnore.push(i);
                }

            }

            if (remainingAdults === 0 && remainingYouths === 0 && remainingChildren === 0) {

                // even if there are phantoms present, should still be possible to place all passengers
                //await global.logComment("Prematurely ending phantom confirmation since a sufficient number of available seats have been established");
                //break;

            }

        }

        // immediately discards this set if it's insufficient - will change if we allow multi screen
        //console.log((unassignedSeatsAndOthers.length - elementsToIgnore.length));

        if ((unassignedSeatsAndOthers.length - elementsToIgnore.length) < numberOfRequiredSeats) {

            timesScrolled = await scrollToMoreSeats(timesScrolled);
            if (timesScrolled === -1) {
                // error
                return;
            }
            continue;

        } else {

            break;  // found

        }

    }

    await global.logComment("Finalising viable seat data...");

    unassignedSeatsAndOthers = await driver.$$(seatSelector);  // re-gathering, since after the select/unselect they no longer seem to correspond to physical elements

    await global.logComment("Determining modal price...");

    for (let i = 0; i < unassignedSeatsAndOthers.length; i++) {

        if (elementsToIgnore.includes(i)) {
            continue;
        }

        // Request failed with status 404 due to unknown command: 'id' attribute is unknown for the element. Only the following attributes are supported: 
        // [checkable, checked, {class,className}, clickable, {content-desc,contentDescription}, enabled, focusable, focused, {long-clickable,longClickable}, 
        // package, password, {resource-id,resourceId}, scrollable, selection-start, selection-end, selected, {text,name}, bounds, displayed, contentSize]

        let unassignedElement = unassignedSeatsAndOthers[i];
        let dollar = await unassignedElement.getText();
        if (dollar in prices) {
            prices[dollar] = prices[dollar] + 1;
        } else {
            prices[dollar] = 1;
        }

    }

    // getting most frequent seat type and only dealing with that one

    let modePrice = "0";
    let modeCount = 0;

    for (let price in prices) {
        
        let currentPriceCount = prices[price];
        if (currentPriceCount > modeCount) {
            modeCount = currentPriceCount;
            modePrice = price;
        }

    }

    modePriceChosen = modePrice;

    for (let i = 0; i < unassignedSeatsAndOthers.length; i++) {

        if (elementsToIgnore.includes(i)) {
            continue;
        }

        unassignedElement = unassignedSeatsAndOthers[i];

        // should now get a series of x and y co-ordinates

        let x = await unassignedElement.getLocation('x');
        let y = await unassignedElement.getLocation('y');

        elementCoordinates.push({'x': x, 'y': y, 'element': unassignedElement});

        if (x in xCoordinates) {
            xCoordinates[x] = xCoordinates[x] + 1;
        } else {
            xCoordinates[x] = 1;
        }
        if (y in yCoordinates) {
            yCoordinates[y] = yCoordinates[y] + 1;
        } else {
            yCoordinates[y] = 1;
        }
        
    }

    // now grouping by row

    let rows = []

    for (let yCoordinate in yCoordinates) {

        let row = []

        for (let i = 0; i < elementCoordinates.length; i++) {

            if (elementCoordinates[i].y == yCoordinate) {
                row.push(elementCoordinates[i]);
            }

        }

        rows.push(row);

    }

    // assigning best letter guesses to co-ordinates
    let rawXCoordinates = [];
    for (let xCoordinate in xCoordinates) {
        rawXCoordinates.push(xCoordinate);
    }
    rawXCoordinates.sort(function(a, b){return a - b});
    let letters = ["A", "B", "C", "D", "E", "F"];
    if (rawXCoordinates.length == 6) {
        for (let i = 0; i < letters.length; i++) {
            seatLetterGuess[rawXCoordinates[i]] = letters[i];
        }
    } else {
        // TODO: harder - will allocate time to this if it actually arises
        await global.logError("Less than 6 seat columns - need to program a means of determining letter in this case");
    }

    return rows;

}

async function scrollToMoreSeats(timesScrolled, definitiveScroll = true) {

    if (definitiveScroll) {
        await global.logComment(`Not enough valid seats - scrolling`);
    }

    // the scroll must occur in the bottom limits of the screen

    //await global.scrollViaUIScrollable("d");
    await global.scrollTo(500, 2000, 500, 500);
    await global.pause(1000, true);

    if (!definitiveScroll) {
        return;
    }

    timesScrolled++;

    if (timesScrolled > 8) {  // arbitrary
        await global.logError("Scrolled too many times - something is wrong. Either few seats or scrolling is unsuccessful");
        return -1;  // error code
    }

    return timesScrolled;

}

async function scrollToMoreSeatsIfNecessary(firstCount, secondCount, timesScrolled) {

    if (firstCount < secondCount) {

        await global.logComment(`Not enough valid seats (valid: ${firstCount} / ${secondCount} required) - scrolling`);

        // the scroll must occur in the bottom limits of the screen

        //await global.scrollViaUIScrollable("d");
        await global.scrollTo(500, 2000, 500, 500);
        await global.pause(1000, true);
        timesScrolled++;
        return timesScrolled;

    }

    if (timesScrolled > 8) {  // arbitrary
        await global.logError("Scrolled too many times - something is wrong. Either few seats or scrolling is unsuccessful");
        return -1;  // error code
    }

}

async function assignSeats(rows, nAdults, nYouths, nChildren) {

    await global.logComment("Now assigning seats for all passengers...");

    // now it is all assembled, time to assign with the most restrictive pairs first
    let remainingAdults = nAdults;
    let remainingYouths = nYouths;
    let remainingChildren = nChildren;

    let adultElements = [];
    let youthElements = [];
    let childElements = [];

    let rowIndices = [];
    for (let i = 0; i < rows.length; i++) {
        rowIndices.push(i);
    }

    let randomIndices = [];
    let randomRow;

    while (remainingChildren > 0) {

        randomIndices = await shuffleRows(rowIndices);

        // children are the hardest, so we'll deal with them until gone
        for (let i = 0; i < randomIndices.length; i++) {

            randomRow = randomIndices[i];

            if (rows[randomRow].length > 1) {

                //adultElements.push(rows[randomRow][0]['element']);
                adultElements.push(rows[randomRow][0]);
                //childElements.push(rows[randomRow][1]['element']);
                childElements.push(rows[randomRow][1]);
                rows[randomRow].splice(1, 1);
                rows[randomRow].splice(0, 1);
                remainingAdults--;
                remainingChildren--;
                break;

            }

        }

    }

    // now handling remaining adults

    while (remainingAdults > 0) {

        randomIndices = await shuffleRows(rowIndices);

        for (let i = 0; i < rows.length; i++) {

            randomRow = randomIndices[i];

            if (rows[randomRow].length > 0) {

                //adultElements.push(rows[randomRow][0]['element']);
                adultElements.push(rows[randomRow][0]);
                rows[randomRow].splice(0, 1);
                remainingAdults--;
                break;

            }

        }

    }

    // now handling youths

    while (remainingYouths > 0) {

        randomIndices = await shuffleRows(rowIndices);

        for (let i = 0; i < rows.length; i++) {

            randomRow = randomIndices[i];

            if (rows[randomRow].length > 0) {

                //youthElements.push(rows[randomRow][0]['element']);
                youthElements.push(rows[randomRow][0]);
                rows[randomRow].splice(0, 1);
                remainingYouths--;
                break;

            }

        }

    }

    // returning scroll view
    if (timesScrolled > 0) {
        await global.logComment(`Returning seats to the top...`);
    }

    for (let x = 0; x < timesScrolled; x++) {

        // returning to the top
        await global.scrollTo(500, 800, 500, 2000, true);
        await global.pause(1000, true);

    }

    // now assigning

    return adultElements.concat(youthElements, childElements);

    /*

    for (let i = 0; i < fullElements.length; i++) {

        await global.pause(2000, true);
        await global.clickOn(fullElements[i], true);
        await global.pause(2000, true);
        if (i < fullElements.length - 1) {
            // doesn't try to click this on final iteration
            await global.clickOn(nextCustomerButton, true);
        }

    }

    */

}

async function selectSeats(selectElements, returnFlight = false) {

    // collecting x/ys and then ignoring per established ignore list - this is to ensure phantoms/duplicates don't "infiltrate"

    let coordinateList = [];

    let unassignedSeatsAndOthers = await driver.$$(seatSelector);

    for (let i = 0; i < unassignedSeatsAndOthers.length; i++) {

        if (elementsToIgnore.includes(i)) {
            continue;
        }

        let unassignedElement = unassignedSeatsAndOthers[i];

        let unassignedX = await unassignedElement.getLocation('x');
        let unassignedY = await unassignedElement.getLocation('y');

        coordinateList.push({'x': unassignedX, 'y': unassignedY});

    }

    let outboundOrReturn = returnFlight ? "return" : "outbound";

    await global.logComment(`Now selecting seats for all passengers on the ${outboundOrReturn} flight...`);

    for (let i = 0; i < selectElements.length; i++) {

        await global.pause(2000, true);

        let xCoordinate = selectElements[i]['x'];
        let yCoordinate = selectElements[i]['y'];

        // seek function, since directly passing element doesn't seem to work - much less efficient, though

        let unassignedSeatsAndOthers = await driver.$$(seatSelector);

        let seatFound = false;

        for (let i = 0; i < coordinateList.length; i++) {
    
            let elementX = coordinateList[i]['x'];
            let elementY = coordinateList[i]['y'];

            if (elementX === xCoordinate && elementY === yCoordinate) {

                let beforeSelectUnassignedSeatsLength = unassignedSeatsAndOthers.length;
                let afterSelectionUnassignedSeatsLength = beforeSelectUnassignedSeatsLength;
                let clickAttempts = 0;

                let currentSeatsData = await getSeatAssignments();  // TODO

                while (beforeSelectUnassignedSeatsLength === afterSelectionUnassignedSeatsLength) {

                    // await global.clickOn(unassignedElement, true);
                    await global.clickByCoordinates(elementX, elementY);

                    await global.pause(2000, true);

                    let afterUnassignedSeats = await driver.$$(seatSelector);
                    afterSelectionUnassignedSeatsLength = afterUnassignedSeats.length;

                    if (beforeSelectUnassignedSeatsLength === afterSelectionUnassignedSeatsLength) {

                        // failure to click
                        if (clickAttempts === 0) {
                            await global.logError(`Unable to select the desired seat with x,y coordinates ${xCoordinate},${yCoordinate} - trying again`);
                        }

                        await global.pause(2000, true);

                        clickAttempts++;

                        if (clickAttempts > 3) {  // arbitrary
                            await global.logError(`Unable to select the desired seat with x,y coordinates ${xCoordinate},${yCoordinate}`);
                            console.log(selectElements);
                            console.log(elementsToIgnore);
                            console.log(coordinateList);
                            await global.debugStop();
                            return;
                        }

                    }

                    /*
                    try {

                        let currentSeatsData = await getSeatAssignments();

                        await global.clickOn(unassignedElement, true);

                        await global.pause(2000, true);

                        let afterSeatsData = await getSeatAssignments();
                        //console.log(afterSeatsData);

                        // now checking before and after; cleanest way to get seat choices without explicit seat IDs

                        let seatChangeFound = false;

                        for (let x = 0; x < currentSeatsData.length; x++) {

                            for (let y = 0; y < afterSeatsData.length; y++) {

                                if (currentSeatsData[x] != afterSeatsData[y]) {

                                    runningSeatsData[outboundOrReturn].push(afterSeatsData[y]);
                                    seatChangeFound = true;
                                    break;

                                }

                            }

                            if (seatChangeFound) {
                                break;
                            }

                        }

                    } catch {

                        // pass? For some reason this occasionally fails when there are a lot of passengers - perhaps system responding too slowly?
                        if (clickAttempts === 0) {
                            await global.logError(`Unable to select the desired seat with x,y coordinates ${xCoordinate},${yCoordinate} - trying again`);
                        }

                        await global.pause(2000, true);

                    }

                    let afterUnassignedSeats = await driver.$$(seatSelector);
                    afterSelectionUnassignedSeatsLength = afterUnassignedSeats.length;

                    clickAttempts++;

                    if (clickAttempts > 10) {  // arbitrary
                        await global.logError(`Unable to select the desired seat with x,y coordinates ${xCoordinate},${yCoordinate}`);
                        await global.debugStop();
                        return;
                    }

                    await global.pause(1000, true);

                    */

                }

                let afterSeatsData = await getSeatAssignments();  // TODO

                // now checking before and after; cleanest way to get seat choices without explicit seat IDs

                let seatChangeFound = false;

                for (let x = 0; x < currentSeatsData.length; x++) {

                    for (let y = 0; y < afterSeatsData.length; y++) {

                        if (currentSeatsData[x] != afterSeatsData[y]) {

                            runningSeatsData[outboundOrReturn].push(afterSeatsData[y]);
                            seatChangeFound = true;
                            break;

                        }

                    }

                    if (seatChangeFound) {
                        break;
                    }

                }

                seatFound = true;

                // making a note of the co-ordinates
                seatInformation[outboundOrReturn].push({'x': elementX, 'y': elementY});

                break;

            }
            
        }

        if (!seatFound) {
            await global.logError(`Unable to find the desired seat with x,y coordinates ${xCoordinate},${yCoordinate}`);
            console.log(selectElements);
            console.log(elementsToIgnore);
            console.log(coordinateList);
            await global.debugStop();
        }

        await global.pause(2000, true);
        if (i < selectElements.length - 1) {

            // doesn't try to click this on final iteration
            await global.clickOn(nextCustomerButton, true);
            await global.pause(2000, true);

            if (timesScrolled > 0) {
                await global.logComment(`Scrolling ${timesScrolled} time(s) to reach seats...`);
            }

            for (let x = 0; x < timesScrolled; x++) {

                // view resets, so must scroll backdown to it
                await global.scrollTo(500, 2000, 500, 800, true);
                await global.pause(1000, true);
            }

        }

    }

}

async function shuffleRows(rowIndices) {

    for (let i = rowIndices.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [rowIndices[i], rowIndices[j]] = [rowIndices[j], rowIndices[i]]; 
    } 
    return rowIndices; 

}

async function getSeatAssignments() {

    let seatAssignments = await driver.$$(selectedSeatIDs);
    let seats = [];
    for (let i = 0; i < seatAssignments.length; i++) {
        seats.push(await seatAssignments[i].getText());
    }

    return seats;

}

async function getSeatCoordinates() {

    return seatInformation;

}

async function getModePriceChosen() {

    return modePriceChosen;

}

async function getTotal() {

    return await global.getElementText(totals);

}

async function getEstimatedColumnLetter(xCoordinate) {

    let estimatedLetter = seatLetterGuess[xCoordinate];
    if (estimatedLetter == null) {
        await global.logError(`${xCoordinate} did not correspond with a seat letter - compare to list below`);
    }
    return estimatedLetter;

}

async function getFlightHeader() {

    let flightHeader = await driver.$(flightHeaderReference);
    return flightHeader.getText();

}

async function resetChosenSeatsRecord() {

    seatInformation = {'outbound': [], 'return': []};

}

async function extractPrice(flightType) {

    flightType = flightType.toLowerCase();
    let chosenPrice = modePriceChosen.replace("$", "");

    if (flightType === "depart" || flightType === "outbound") {
        departSeatPrice.push(chosenPrice);
        console.log(`Depart seat price is: $${departSeatPrice}`);
    } else {
        returnSeatPrice.push(chosenPrice);
        console.log(`Depart seat price is: $${returnSeatPrice}`);
    }

}

async function getPriceSummary() {

    // Get price summry (bottom of the page)
    let priceSummaryElement = driver.$('//android.view.ViewGroup[@content-desc="touchable-opacity__obi__booking-summary__toggle"]/android.view.ViewGroup/android.widget.TextView')
    let priceSummary = (await priceSummaryElement.getText()).replace(/[^0-9.]+/g, '');
    // Summing flight prices + seats
    let calculatedSeatsPrice = (parseFloat(await global.sumOfArray(departSeatPrice)) + parseFloat(await global.sumOfArray(returnSeatPrice))).toFixed(2);
    allSeatsPrice.push(`${calculatedSeatsPrice}`);

    let departFlightPrice = await global.sumOfArray(bonzaFlightResultsPage.data.departFlightPrice);
    let returnFlightPrice = await global.sumOfArray(bonzaFlightResultsPage.data.returnFlightPrice);

    let calculatedFlightAndSeatsPrice = (parseFloat(departFlightPrice) + parseFloat(returnFlightPrice) + parseFloat(await global.sumOfArray(departSeatPrice)) + parseFloat(await global.sumOfArray(returnSeatPrice))).toFixed(2);
    flightsAndSeatsPrice.push(`${calculatedFlightAndSeatsPrice}`);

    // Validate current display price equal to the flights price + seats price
    if (calculatedFlightAndSeatsPrice === priceSummary) {
        await global.logSuccess(`Price summary for flights + seats is correct ($${priceSummary})`);
    } else {
        await global.logError(`Price summary for flights + seats is wrong - ${priceSummary} != ${calculatedFlightAndSeatsPrice}`);
    }

}

async function getSelectedSeats(returnFlight = false) {

    let selectedSeats = {'outbound': [], 'return': []};

    let selectedSeatElements = await driver.$$(selectedSeatIDs);
    let returnStartIndex = selectedSeatElements.length / 2

    // since this occurs at the end of the process, if it is a return flight, the seats appear ordered by return first in the elements

    for (let i = 0; i < selectedSeatElements.length; i++) {

        let selectedSeat = await selectedSeatElements[i].getText();
        if (returnFlight) {
            if (i >= returnStartIndex) {
                selectedSeats['outbound'].push(selectedSeat);
            } else {
                selectedSeats['return'].push(selectedSeat);
            }
        } else {
            selectedSeats['outbound'].push(selectedSeat);
        }

    }

    return selectedSeats;

}

async function getRunningSeats() {

    return runningSeatsData;

}

async function resetSeatVariables() {

    modePriceChosen = 0;

    numberOfRequiredSeats = 10;
    
    timesScrolled = 0;

    seatLetterGuess = {};

}

module.exports = {

    main: {
        title: title,
        //changeSeatsBackButton: '(//android.widget.Button[@content-desc="Choose seats, back"])[1]',
        changeSeatsBackButton: '//android.widget.Button[@content-desc="back-button"]',
        pleaseChangeSeatsHeader: '//*[contains(@text, "Please change your seat choice")]',
        pleaseChangeSeatsButton: '//*[contains(@text, "Change seats")]',
        nextCustomerButton: nextCustomerButton,
        nextFlightButton: nextFlightButton,
        nextScreenButton: nextScreenButton,
        pleaseSelectSeatOnEmpty: pleaseSelectSeatOnEmpty,
        addSeatsButtonOnEmpty: addSeatsButtonOnEmpty,
        skipForNowButtonOnEmpty: skipForNowButtonOnEmpty,
        totals: totals,
        selectedSeatActive: selectedSeatActive,
        selectedSeatIDs: selectedSeatIDs,
        nextCustomerButton: nextCustomerButton,
        nextFlightButton: nextFlightButton,
        nextScreenButton: nextScreenButton,
        nextValidSeat: '//*[@content-desc="seat_valid"]',
        totals: totals,
        seatSelector: seatSelector
    },

    data: {

        allSeatsPrice: allSeatsPrice,
        departSeatPrice: departSeatPrice,
        returnSeatPrice: returnSeatPrice,
        flightsAndSeatsPrice: flightsAndSeatsPrice,
        seatInformation: seatInformation

    },

    determineSeats,
    assignSeats,
    selectSeats,
    handleSeatSelection,
    handleSeatSelectionNeo,
    endSeatsPage,
    endSeatsPageNeo,
    getSeatAssignments,
    getSeatCoordinates,
    getModePriceChosen,
    getTotal,
    getEstimatedColumnLetter,
    resetChosenSeatsRecord,
    getFlightHeader,
    extractPrice,
    getPriceSummary,
    getSelectedSeats,
    getRunningSeats,
    resetSeatVariables

};