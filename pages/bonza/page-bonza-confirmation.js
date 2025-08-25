
const sessionData = require("../../sessionData");

const bookingNumberLocator = '//android.widget.TextView[@resource-id="booking_number"]';

async function getBookingNumber() {

    let bookingNumberElement = await driver.$(bookingNumberLocator);
    let bookingNumber = await bookingNumberElement.getText();
    await sessionData.setBookingNumber(bookingNumber);
    
    return bookingNumber;

}

module.exports = {

    main: {
        bookingReferenceTitle: '//*[@text="HERE IS YOUR BOOKING REFERENCE"]',
        bookingNumber: bookingNumberLocator,
    },

    getBookingNumber

};