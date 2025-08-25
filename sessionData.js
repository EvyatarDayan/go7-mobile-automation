const global = require('./commands.conf');

let passengers = {

    'adt': [],
    'adtCount': 0,
    'yth': [],
    'ythCount': 0,
    'chd': [],
    'chdCount': 0,
    'inf': [],
    'infCount': 0,
    'total': [],
    'totalCount': 0

};

async function getPassengersData() {

    return passengers;

}

async function setPassengersData(passengerData) {

    passengers = passengerData;

}

async function addToPassengerData(key, value) {

    passengers[key].push(value);

}

async function replacePassengerData(key, value) {

    passengers[key] = value;

}

async function cleanPassengerInformation() {

    let types = ["adt", "yth", "chd", "inf"];
    let totalPassengers = [];

    for (let i = 0; i < types.length; i++) {

        let categoryName = types[i];
        let totalName = types[i] + "Count";
        passengers[totalName] = passengers[categoryName].length;
        for (let x = 0; x < passengers[categoryName].length; x++) {
            totalPassengers.push(passengers[categoryName][x]);
        }

    }

    passengers['total'] = totalPassengers;
    passengers['totalCount'] = totalPassengers.length;

}

async function printPassengerData() {

    let passengers = await getPassengersData();
    await global.logMessage("---------------");
    await global.logMessage("Passenger data:");

    let types = ["adt", "yth", "chd", "inf"];

    let seats = await getAssignedSeatsData();

    let currentPassengerIndex = 0;

    for (let i = 0; i < types.length; i++) {

        let names = passengers[types[i]];
        let count = passengers[types[i] + "Count"];
        await global.logMessage(`${types[i].toUpperCase()} - ${count}`);

        for (let x = 0; x < names.length; x++) {

            if (types[i] === "inf") {
                // infants do not have seats
                await global.logMessage(`${names[x]}`);
            } else {

                let outboundSeat;
                try {
                    outboundSeat = seats['outbound'][currentPassengerIndex];
                } catch {
                    outboundSeat = "";
                }

                let returnSeat;
                try {
                    returnSeat = (await isReturnFlight()) ? `| ${seats['return'][currentPassengerIndex]}` : "";
                } catch {
                    returnSeat = "";
                }

                let seatInfo = `${outboundSeat} ${returnSeat}`;

                if (outboundSeat === "" && returnSeat === "") {
                    await global.logMessage(`${names[x]}`);
                } else {
                    await global.logMessage(`${names[x]} - ${seatInfo}`);
                }

            }

            currentPassengerIndex++;

        }

    }

    await global.logMessage("---------------");

}

let departDate = "";

async function getDepartDate() {

    return departDate;

}

async function setDepartDate(chosenDepartDate) {

    departDate = chosenDepartDate;

}

let returnDate = "";

async function getReturnDate() {

    return returnDate;

}

async function setReturnDate(chosenReturnDate) {

    returnDate = chosenReturnDate;

}

let returnFlight = false;

async function isReturnFlight() {

    return returnFlight;

}

async function getReturnFlight() {

    return returnFlight;

}

async function setReturnFlight(returnFlightChoice) {

    returnFlight = returnFlightChoice;

}

let outboundFlight = "";

async function getOutboundFlight() {

    return outboundFlight;

}

async function setOutboundFlight(outboundFlightChoice) {

    outboundFlight = outboundFlightChoice;

}

let inboundFlight = "";

async function getInboundFlight() {

    return inboundFlight;

}

async function setInboundFlight(inboundFlightChoice) {

    inboundFlight = inboundFlightChoice;

}

let email = "";

async function getEmail() {

    return email;

}

async function setEmail(chosenEmail) {

    email = chosenEmail;

}

let assignedSeats = {'outbound': [], 'return': []};

async function getAssignedSeatsData() {

    return assignedSeats;

}

async function setAssignedSeatsData(seatInformation) {

    assignedSeats = seatInformation;

}

async function printAssignedSeatsData() {

    let seatsData = await getAssignedSeatsData();
    // TODO: temp, make it per passenger
    await global.logMessage("----------------");
    await global.logMessage("Seats data:");
    await global.logMessage(`Outbound: ${seatsData['outbound']}`);
    if (await isReturnFlight()) {
        await global.logMessage(`Inbound: ${seatsData['return']}`);
    }
    await global.logMessage("----------------");

}

let bookingNumber = "";

async function getBookingNumber() {

    return bookingNumber;

}

async function setBookingNumber(definedBookingNumber) {

    bookingNumber = definedBookingNumber;

}

async function clearSessionData() {

    passengers = {

        'adt': [],
        'adtCount': 0,
        'yth': [],
        'ythCount': 0,
        'chd': [],
        'chdCount': 0,
        'inf': [],
        'infCount': 0,
        'total': [],
        'totalCount': 0
    
    };
    
    assignedSeats = {'outbound': [], 'return': []};

    departDate = "";
    returnDate = "";
    returnFlight = false;
    outboundFlight = "";
    inboundFlight = "";
    bookingNumber = "";

}

async function printSessionInformation() {

    await global.logMessage('\n');
    await global.logMessage('<<<<<<<<<<<<<<<<<<<< REPORT >>>>>>>>>>>>>>>>>>>>');
    if (await isReturnFlight()) {
        await global.logMessage(`Flight is a return`);
    } else {
        await global.logMessage(`Flight is a one-way`);
    }
    await global.logMessage(`Outbound flight: ${await getOutboundFlight()} on ${await getDepartDate()}`);
    if (await isReturnFlight()) {
        await global.logMessage(`Inbound flight: ${await getInboundFlight()} on ${await getReturnDate()}`);
    }
    await printPassengerData();
    //await printAssignedSeatsData();
    await global.logMessage(`Email: ${await getEmail()}`);
    await global.logMessage(`Booking number: ${await getBookingNumber()}`);
    await global.logMessage('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>');
    await global.logMessage('\n');

}

module.exports = {

    getPassengersData,
    setPassengersData,
    addToPassengerData,
    replacePassengerData,
    cleanPassengerInformation,
    printPassengerData,
    getDepartDate,
    setDepartDate,
    getReturnDate,
    setReturnDate,
    isReturnFlight,
    getReturnFlight,
    setReturnFlight,
    getOutboundFlight,
    setOutboundFlight,
    getInboundFlight,
    setInboundFlight,
    getEmail,
    setEmail,
    getBookingNumber,
    setBookingNumber,
    getAssignedSeatsData,
    setAssignedSeatsData,
    printAssignedSeatsData,
    clearSessionData,
    printSessionInformation

}