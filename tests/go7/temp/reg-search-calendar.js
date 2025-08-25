// todo: https://aerocrs.atlassian.net/wiki/spaces/GIW/pages/3405905947/Travel+date+selection
// todo: https://aerocrs.atlassian.net/browse/WEB-2

const global = require("../../../commands.conf");
const pageGo7Search = require('../../../pages/go7/page-go7-search');
const pageGo7Calendar = require('../../../pages/go7/page-go7-calendar');
const pageGo7Passengers = require('../../../pages/go7/page-go7-passengers');
const data = require("../../../data");
const pageSearch = require("../../../pages/go7/page-go7-search");

let latestDepartDate;  // This is needed to verify the latest selected date outside the calendar page
let latestReturnDate;   // This is needed to verify the latest selected date outside the calendar page

let from = data.go7_destinations.firstSelection.from;
let to = data.go7_destinations.firstSelection.to;

describe('Calendar', () => {

    it('Select destinations', async () => {
        // Click on round trip
        await global.clickOn(pageSearch.main.roundTripCheckbox)
        // Select destinations
        await global.destinations_selectByNameOrCode(from, to)
    });

    it('Select initial dates', async () => {
        // Navigate to next month
        await global.pause(2000)
        await global.multipleClicks(pageGo7Calendar.main.calendarNextMonth, 1)
        // Select dates
        await global.calendar_selectDatesRelativeToToday(2, 4)
    });

    it('Update date after depart date', async () => {
        // Assign returnDateSelected to global variable latestReturnDate (so we can verify the selected date outside the calendar page)
        latestReturnDate = await global.calendar_selectReturnDateRelativeToToday(7)
        // Remove 1 day from return
        latestReturnDate = await global.calendar_selectReturnDateRelativeToToday(6)
    });

    it('Update date before depart date', async () => {
        // Update depart day
        // Assign departDateSelected to global variable latestDepartDate (so we can verify the selected date outside the calendar page)
        latestDepartDate = await global.calendar_selectDepartDateRelativeToToday(1)
        // Update return day
        latestReturnDate = await global.calendar_selectReturnDateRelativeToToday(2)
    });

    it('Reset calendar', async () => {
        // Click on reset button
        await global.clickOn(pageGo7Calendar.main.calendarResetButton)
        // Validate depart summary cleared
        latestDepartDate = await global.validateElementText(pageGo7Calendar.main.calendarDepartSummary, `Select a date`)
        // Validate return summary cleared
        latestReturnDate = await global.validateElementText(pageGo7Calendar.main.calendarReturnSummary, `Select a date`)
    });


    it('Select the same date for depart and return', async () => {
        // Select depart
        latestDepartDate = await global.calendar_selectDepartDateRelativeToToday(3)
        // Validate return summary cleared
        await global.validateElementText(pageGo7Calendar.main.calendarReturnSummary, `Select a date`)
        // Select return
        latestReturnDate = await global.calendar_selectReturnDateRelativeToToday(3)
        // Click on done
        await global.clickOn(pageGo7Calendar.main.calendarDoneButton)
    });

    it('Switch trip type', async () => {
        // Click on passengers close button
        await global.clickOn(pageGo7Passengers.main.passengersCloseButton)
        await global.pause(1500)
        // Click on One way button
        await global.clickOn(pageGo7Search.main.oneWayCheckbox)
        // Validate depart summary for latest depart date in the search page
        await global.validateAttributeText(pageGo7Search.main.searchDepartDateSummary, latestDepartDate)
        // Validate return date field don't display in the search page
        await global.validateElementNotDisplayed(pageGo7Search.main.searchReturnDateSummary)
        // Click on Round trip button
        await global.clickOn(pageGo7Search.main.roundTripCheckbox)
        // Validate depart summary for latest depart date in the search page
        await global.validateAttributeText(pageGo7Search.main.searchDepartDateSummary, latestDepartDate)
        // Validate return summary for latest return date in the search page
        await global.validateAttributeText(pageGo7Search.main.searchReturnDateSummary, latestReturnDate)
        // Click on One way button
        await global.clickOn(pageGo7Search.main.oneWayCheckbox)
        // Open the calendar again
        await global.clickOn(pageGo7Search.main.searchDepartDateSummary)
        // Validate depart summary for latest depart date in the calendar page
        await global.validateAttributeText(pageGo7Calendar.main.calendarDepartSummary, latestDepartDate)
        // Validate return date field don't display in the calendar page
        await global.validateElementNotDisplayed(pageGo7Calendar.main.calendarReturnSummary)
        console.log(`Latest depart date: ${latestDepartDate}, Latest return date: ${latestReturnDate}`)
    });

    it('Switch destinations', async () => {
        // Click on calendar close button
        await global.clickOn(pageGo7Calendar.main.calendarCloseButton)
        await global.pause(1500)
        // Click on round trip button
        await global.clickOn(pageGo7Search.main.roundTripCheckbox)
        // Click on switch destinations button
        await global.clickOn(pageGo7Search.main.switchDestinationsButton)
        // Validate depart summary for latest depart date in the calendar page
        await global.validateAttributeText(pageGo7Calendar.main.calendarDepartSummary, latestDepartDate)
        // Validate return summary for latest return date in the calendar page
        await global.validateAttributeText(pageGo7Calendar.main.calendarReturnSummary, latestReturnDate)
        // Click on calendar close button
        await global.clickOn(pageGo7Calendar.main.calendarCloseButton)
        // Validate depart summary for latest depart date in the search page
        await global.validateAttributeText(pageGo7Search.main.searchDepartDateSummary, latestDepartDate)
        // Validate return summary for latest return date in the search page
        await global.validateAttributeText(pageGo7Search.main.searchReturnDateSummary, latestReturnDate)
    });

    // it('Validate (any) prices in the calendar page', async () => {
    //     // Open the calendar again
    //     await global.clickOn(pageGo7Search.main.searchDepartDateSummary)
    //     // Validate the first available date price display (checking $ symbol)
    //     await global.validateElementText(pageGo7Calendar.main.calendarAllPrices, '$')
    //     await global.pause(50000000)
    // });

    it('Calendar navigation', async () => {
        // Open the calendar again
        await global.clickOn(pageGo7Search.main.searchDepartDateSummary)
        await global.pause(1000)
        // Navigate to current month
        await global.multipleClicks(pageGo7Calendar.main.calendarPreviousMonth, 1)
        // Validate calendar default box title for current month
        await global.validateElementText(pageGo7Calendar.main.calendarCurrentMonthYearSummary, (await global.getCurrentMonthYear()).currentMonthName)
        // Validate calendar default box title for current year
        await global.validateElementText(pageGo7Calendar.main.calendarCurrentMonthYearSummary, (await global.getCurrentMonthYear()).currentYear)
        // Navigate 2 month forward
        await global.multipleClicks(pageGo7Calendar.main.calendarNextMonth, 2)
        // Validate calendar default box title for current month +2
        await global.validateElementText(pageGo7Calendar.main.calendarCurrentMonthYearSummary, (await global.getCurrentMonthYear()).twoMonthsAheadMonthName)
        // Navigate 2 month backward
        await global.multipleClicks(pageGo7Calendar.main.calendarPreviousMonth, 2)
        // Validate calendar default box title for current month
        await global.validateElementText(pageGo7Calendar.main.calendarCurrentMonthYearSummary, (await global.getCurrentMonthYear()).currentMonthName)
        // Validate calendar default box title for current year
        await global.validateElementText(pageGo7Calendar.main.calendarCurrentMonthYearSummary, (await global.getCurrentMonthYear()).currentYear)
        // Validate previous button (<) disabled while default box is current month
        await global.validateAttributeText(pageGo7Calendar.main.calendarPreviousMonth, 'disabled')
    });
});
