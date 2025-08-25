// Test all possible date picking functionality

// 1. Select depart and remove selection
// 2. Select depart and return and change the return forward and backward
// 3. Select depart and return and change depart
// 4. Try to select unavailable dates
// 5. Reset dates

const global = require("../../../../../commands.conf");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaHomePage = require ('../../../../../pages/bonza/page-bonza-home');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');

describe('Date picker', () => {

    it('Regression Test', async () => {

        // defining dates with enough room to select dates on either side
        let departDateInitial = new Date();
        departDateInitial.setDate(departDateInitial.getDate() + 20);
        let departDate = departDateInitial.toISOString().slice(0, 10);
        let returnDateInitial = departDateInitial;
        returnDateInitial.setDate(returnDateInitial.getDate() + 3);
        let returnDate = returnDateInitial.toISOString().slice(0, 10);
        
        await bonzaHomePage.handleInitialPopups();
        await bonzaHomePage.handleFlights("ABX", "random");

        // initial value check
        await global.logComment("Test 1: checking default values");
        await checkThreeValues("Select date", "(Leave blank if one-way)", "0 day trip");

        // selecting departure date

        await global.logComment("Test 2: selecting and testing departure date");
        departDate = await bonzaHomePage.selectDepartDate(departDate);
        await checkThreeValues(await global.convertDateType(departDate), "(Leave blank if one-way)", "1 day trip");  // it says 1 day if there's only a departure date
        await global.pause(1000);

        // deselecting departure date
        await global.logComment("Test 3: deselecting departure date");
        //await bonzaHomePage.clickOnDeterminedDate(departDate, false, 1);
        await bonzaHomePage.clickOnDeterminedDate(departDate);
        // values should have reset to initial
        await global.pause(1000);
        await checkThreeValues("Select date", "(Leave blank if one-way)", "0 day trip");
        await global.pause(1000);

        // re-selecting it
        await global.logComment("Test 4: reselecting departure date");
        await bonzaHomePage.clickOnDeterminedDate(departDate);
        await global.pause(1000);
        await checkThreeValues(await global.convertDateType(departDate), "(Leave blank if one-way)", "1 day trip");  // it says 1 day if there's only a departure date
        await global.pause(1000);

        // naturally selecting return dates
        await global.logComment("Test 5: selecting a return date");
        returnDate = await bonzaHomePage.selectReturnDate(departDate, returnDate);
        let dayDifference = await daysBetweenDates(departDate, returnDate);
        await checkThreeValues(await global.convertDateType(departDate), await global.convertDateType(returnDate), `${dayDifference} day trip`);

        // now putting return date further in advance
        await global.logComment("Test 6: setting return date further in the future");
        let adjustedReturnDateInitial = returnDateInitial;
        adjustedReturnDateInitial.setDate(adjustedReturnDateInitial.getDate() + 3);
        let adjustedReturnDate = adjustedReturnDateInitial.toISOString().slice(0, 10);
        adjustedReturnDate = await bonzaHomePage.selectReturnDate(returnDate, adjustedReturnDate);
        dayDifference = await daysBetweenDates(departDate, adjustedReturnDate);
        await checkThreeValues(await global.convertDateType(departDate), await global.convertDateType(adjustedReturnDate), `${dayDifference} day trip`);

        // now putting it closer again
        await global.logComment("Test 7: setting return date closer to departure");
        returnDate = await bonzaHomePage.selectReturnDate(departDate, returnDate);
        dayDifference = await daysBetweenDates(departDate, returnDate);
        await checkThreeValues(await global.convertDateType(departDate), await global.convertDateType(returnDate), `${dayDifference} day trip`);

        // setting return date prior to depart date - this will destroy the current flight search and begin again
        await global.logComment("Test 8: selecting an early start date, which will effectively reset the flight");
        let finalDepartDate = new Date().toISOString().slice(0, 10);
        finalDepartDate = await bonzaHomePage.selectDepartDate(finalDepartDate);
        await global.pause(1000);
        await checkThreeValues(await global.convertDateType(finalDepartDate), "(Leave blank if one-way)", "1 day trip");  // it says 1 day if there's only a departure date
        await global.pause(1000);

        // resets dates
        await global.logComment("Test 9: click the \"Reset Dates\" button");
        await global.clickOn(bonzaBookTripPage.bookTrip.resetDatesButton);
        await global.pause(1000);
        // values should be initialised
        await checkThreeValues("Select date", "(Leave blank if one-way)", "0 day trip");
        await global.pause(1000);

        // finally, set dates as normal
        await global.logComment("Test 10: normal date selection");
        finalDepartDate = new Date().toISOString().slice(0, 10);
        finalDepartDate = await bonzaHomePage.selectDepartDate(finalDepartDate);
        await checkThreeValues(await global.convertDateType(finalDepartDate), "(Leave blank if one-way)", "1 day trip");  // it says 1 day if there's only a departure date
        await global.pause(1000);

        // attempt to select invalid date
        await global.logComment("Test 11: attempt to click an invalid date (10 hasn't finished, this occurs midway through it)");
        let invalidDate = await bonzaHomePage.selectValidDate(finalDepartDate, "validation");
        await global.logComment(`Attempting to click date ${invalidDate} - nothing should change`);
        await bonzaHomePage.clickOnDeterminedDate(invalidDate, true);
        await global.pause(1000);
        await checkThreeValues(await global.convertDateType(finalDepartDate), "(Leave blank if one-way)", "1 day trip");  // it says 1 day if there's only a departure date

        let finalReturnDateDate = new Date();
        finalReturnDateDate.setDate(finalReturnDateDate.getDate() + 3);
        let finalReturnDate = finalReturnDateDate.toISOString().slice(0, 10);
        finalReturnDate = await bonzaHomePage.selectReturnDate(finalDepartDate, finalReturnDate);
        dayDifference = await daysBetweenDates(finalDepartDate, finalReturnDate);
        await checkThreeValues(await global.convertDateType(finalDepartDate), await global.convertDateType(finalReturnDate), `${dayDifference} day trip`);

        // Click on confirm dates
        await global.logComment("Test 12: finish date selection by confirming dates");
        await bonzaHomePage.confirmDates();

    })

});

async function checkThreeValues(departText, returnText, numberofDaysText) {
    await global.validateElementText(bonzaBookTripPage.bookTrip.departDateText, departText);
    await global.validateElementText(bonzaBookTripPage.bookTrip.returnDateText, returnText);
    await global.validateElementText(bonzaBookTripPage.bookTrip.numberOfDaysTripText, numberofDaysText);
}

async function daysBetweenDates(firstDateString, secondDateString) {

    let firstDate = new Date(firstDateString);
    let secondDate = new Date(secondDateString);
    let msBetweenDates = secondDate.getTime() - firstDate.getTime();
    let daysBetweenDates = msBetweenDates / (60 * 60 * 24 * 1000);
    return daysBetweenDates.toString();

}