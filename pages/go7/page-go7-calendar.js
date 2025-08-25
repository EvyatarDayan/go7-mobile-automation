const {driver} = require("@wdio/globals");

const mainIOS = {
    calendarDepartSummary: '~sf_dates_selector_depart_tab_text',
    calendarReturnSummary: '~sf_dates_selector_return_tab_text',
    calendarDoneButton: '~sf_dates_selector_done_btn',
    calendarPreviousMonth: '~sf_dates_selector_calendar_header_arrow_left',
    calendarNextMonth: '~sf_dates_selector_calendar_header_arrow_right',
    calendarResetButton: '~sf_dates_selector_reset_btn',
    calendarCloseButton: '~sf_dates_selector_select_dates_exit_button',
    calendarCurrentMonthYearSummary: '~sf_dates_selector_calendar_header_current_month',
    calendarAllValidDates: "//*[contains(@name, '_container') and contains(@label, '_enabled')]",
    calendarAllPrices: '//*[contains(@accessibility-id, "price")]',
}

const mainAndroid = {
    calendarDepartSummary: '//*[@resource-id="sf_dates_selector_depart_tab_text"]',
    calendarReturnSummary: '//*[@resource-id="sf_dates_selector_return_tab_text"]',
    calendarDoneButton: '//*[@resource-id="sf_dates_selector_done_btn"]',
    calendarPreviousMonth: '//*[@resource-id="sf_dates_selector_calendar_header_arrow_left"]',
    calendarNextMonth: '//*[@resource-id="sf_dates_selector_calendar_header_arrow_right"]',
    calendarResetButton: '//*[@resource-id="sf_dates_selector_reset_btn"]',
    calendarCloseButton: '//*[@resource-id="sf_dates_selector_select_dates_exit_button"]',
    calendarCurrentMonthYearSummary: '//*[@resource-id="sf_dates_selector_calendar_header_current_month"]',
    calendarAllValidDates: "//*[contains(@content-desc, '_enabled') and contains(@resource-id, 'container')]",
    calendarAllPrices: '//*[contains(@resource-id, "price")]',
}

module.exports = {

        main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};