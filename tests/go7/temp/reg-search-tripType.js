const global = require("../../../commands.conf");
const pageGo7Search = require("../../../pages/go7/page-go7-search");
const pageGo7Calendar = require("../../../pages/go7/page-go7-calendar");
const pageGo7Passengers = require("../../../pages/go7/page-go7-passengers");
const data = require("../../../data");
let from = data.go7_destinations.firstSelection.from;
let to = data.go7_destinations.firstSelection.to;

describe('Trip type', () => {

    it('One way default validation', async () => {
        // Validate default One way is true
        await global.validateAttributeValue(pageGo7Search.main.oneWayCheckbox, 'value', 'checked')
        // Validate default round trip is false
        await global.validateAttributeValue(pageGo7Search.main.roundTripCheckbox, 'value', 'unchecked')
        // Validate depart field display in the search page
        await global.validateElementDisplay(pageGo7Search.main.searchDepartDateSummary)
        // Validate return field don't display in the search page
        await global.validateElementNotDisplayed(pageGo7Search.main.searchReturnDateSummary)
    });

    it('Selecting Round trip', async () => {
        // Click on Round trip button
        await global.clickOn(pageGo7Search.main.roundTripCheckbox)
        // Validate depart field display in the search page
        await global.validateElementDisplay(pageGo7Search.main.searchDepartDateSummary)
        // Validate return field display in the search page
        await global.validateElementDisplay(pageGo7Search.main.searchReturnDateSummary)
        // Click on depart field to open the calendar
        await global.clickOn(pageGo7Search.main.searchDepartDateSummary)
        // Validate depart field display in the calendar page
        await global.validateElementDisplay(pageGo7Calendar.main.calendarDepartSummary)
        // Validate return field display in the calendar page
        await global.validateElementDisplay(pageGo7Calendar.main.calendarReturnSummary)
        // Close calendar
        await global.clickOn(pageGo7Calendar.main.calendarCloseButton)
        await global.pause(1000)
    });

    it('Selecting One way', async () => {
        // Click on One way button
        await global.clickOn(pageGo7Search.main.oneWayCheckbox)
        // Validate depart field display in the search page
        await global.validateElementDisplay(pageGo7Search.main.searchDepartDateSummary)
        // Validate return field don't display in the search page
        await global.validateElementNotDisplayed(pageGo7Search.main.searchReturnDateSummary)
        // Click on depart field to open the calendar
        await global.clickOn(pageGo7Search.main.searchDepartDateSummary)
        // Validate depart field display in the calendar page
        await global.validateElementDisplay(pageGo7Calendar.main.calendarDepartSummary)
        // Validate return field don't display in the calendar page
        await global.validateElementNotDisplayed(pageGo7Calendar.main.calendarReturnSummary)
        // Close calendar
        await global.clickOn(pageGo7Calendar.main.calendarCloseButton)
        await global.pause(1000)
    });

    it('Switching trip type - destinations behavior', async () => {
        // Select destinations
        await global.destinations_selectByNameOrCode(from, to)
        // Close calendar
        await global.clickOn(pageGo7Calendar.main.calendarCloseButton)
        await global.pause(1000)
        // --- Switch to one way
        await global.clickOn(pageGo7Search.main.oneWayCheckbox)
        // Validate "From" field display the selected destination
        await global.validateElementText(pageGo7Search.main.fromInput, from)
        // Validate "To" field display the selected destination
        await global.validateElementText(pageGo7Search.main.toInput, to)
        // --- Switch to "Round trip"
        await global.clickOn(pageGo7Search.main.roundTripCheckbox)
        // Validate "From" field display the selected destination
        await global.validateElementText(pageGo7Search.main.fromInput, from)
        // Validate "To" field display the selected destination
        await global.validateElementText(pageGo7Search.main.toInput, to)
        // Validate depart field display in the search page
        await global.validateElementDisplay(pageGo7Search.main.searchDepartDateSummary)
        // Validate return field display in the search page
        await global.validateElementDisplay(pageGo7Search.main.searchReturnDateSummary)
    });

    it('Switching trip type - calendar behavior', async () => {
        // Click on depart
        await global.clickOn(pageGo7Search.main.searchDepartDateSummary)
        // Add dates
        await global.calendar_selectFirstAvailableRoundTripDates()
        // Close calendar
        await global.clickOn(pageGo7Passengers.main.passengersCloseButton)
        // --- Switch to one way
        await global.pause(2000)
        await global.clickOn(pageGo7Search.main.oneWayCheckbox)
        // Validate depart date field display
        await global.validateElementDisplay(pageGo7Search.main.searchDepartDateSummary)
        // Validate a date display in the summary (check contains "/")
        await global.validateElementText(pageGo7Search.main.searchDepartDateSummary, '/')
        // Validate return date field don't display
        await global.validateElementNotDisplayed(pageGo7Search.main.searchReturnDateSummary)
        // --- Switch to "Round trip"
        await global.clickOn(pageGo7Search.main.roundTripCheckbox)
        // Validate depart date field display
        await global.validateElementDisplay(pageGo7Search.main.searchDepartDateSummary)
        // Validate a date display in depart summary (check contains "/")
        await global.validateElementText(pageGo7Search.main.searchDepartDateSummary, '/')
        // Validate return date field display
        await global.validateElementDisplay(pageGo7Search.main.searchReturnDateSummary)
        // Validate a date display in return summary (check contains "/")
        await global.validateElementText(pageGo7Search.main.searchReturnDateSummary, '/')
    });
});
