const clc = require('cli-color');
const {driver} = require("@wdio/globals");
const bonzaSignInPage = require("./pages/bonza/page-bonza-sign-in");
const bonzaBookTripPage = require ('./pages/bonza/page-bonza-book-trip');
const {firstName, lastName, city, address} = require("./data");
const pageSearch = require("./pages/go7/page-go7-search");
const pageGo7Calendar = require("./pages/go7/page-go7-calendar");
const pageGo7Passengers = require("./pages/go7/page-go7-passengers");
const pagePaxInfo = require("./pages/go7/page-go7-paxInfo");
const pageSignUp = require("./pages/go7/page-go7-signUp");
const pageSearchResults = require("./pages/go7/page-go7-search-results");
const pageFares = require("./pages/go7/page-go7-fares");
const data = require("./data");
const pageForgotPassword = require("./pages/go7/page-go7-forgotPassword");
const pageLogin = require("./pages/go7/page-go7-login");
const NWTools = require("nightwatch-tools");
const pagePayment = require("./pages/go7/page-go7-payment");
const pageYopmail = require("./pages/ThirdParty/page-yopmail");
const pageSafari = require("./pages/ThirdParty/page-safari");
const pageSeatSelection = require("./pages/go7/page-go7-seatSelection");
const fetch = require("node-fetch");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const pageWeather = require("./pages/ThirdParty/page-weather");
let randomNumber = NWTools.randomString(4,'1234567890');
const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let date = new Date();
// const dateFormat = require('dateformat');
// const currentMonth = dateFormat(new Date(),"mmmm");
// const currentMonthNumber = dateFormat(new Date(),"mm").replace('0', '');
// const currentYear = dateFormat(new Date(),"yyyy");

let destinationArray = [];
let destinationNames = [];
let destinationCodes = [];

let APIResult = [];
let APPResult = [];
let WEBResult = [];

//=======================================================================================

function addValue(selector, text, timeout = 20000) {
    return driver.waitUntil(
        async () => {
            await driver.$(selector).addValue(text);
            await logSuccess(`"${text}" added successfully.`)
            return true;
        },
        { timeout, timeoutMsg: '🕓 Add value action failed due to timeout' }
    );
}

//=======================================================================================

async function enhancedAddValue(selector, text, scrollUpMaximum = 3, scrollDownMaximum = 3, firstDirection = "d", timeout = 8000) {

    await findAndScrollToElement(selector, scrollUpMaximum, scrollDownMaximum, firstDirection);

    return driver.waitUntil(
        async () => {
            await driver.$(selector).addValue(text);
            return true;
        },
        { timeout,
            timeoutMsg: '🕓 Add value action failed due to timeout' }
    );
}

//=======================================================================================

function clickOn(selector, silent = false, timeout = 20000) {
    return driver.waitUntil(
        async () => {
            try {

                await driver.$(selector).click();
                if (!silent) {
                    await logSuccess(`Element "${selector}" clicked successfully.`);
                }
                return true;

            } catch (error) {

                if (!silent) {
                    await logError(clc.red(`Cannot find element "${selector}":`, error));
                }
                return false;
            }
        },
        { timeout,
            timeoutMsg: '🕓 Click action failed due to timeout' }
    );
}

//=======================================================================================

async function enhancedClickOn(selector, scrollUpMaximum = 3, scrollDownMaximum = 3, firstDirection = "d", silent = false, timeout = 20000) {

    await findAndScrollToElement(selector, scrollUpMaximum, scrollDownMaximum, firstDirection);

    return driver.waitUntil(
        async () => {
            try {

                await driver.$(selector).click();
                if (!silent) {
                    console.log(`🆗 Element: "${selector}" clicked successfully.`);
                }
                return true;

            } catch (error) {

                if (!silent) {
                    console.error(clc.red(`🆘 Cannot find element "${selector}":`, error));
                }
                return false;
            }
        },
        { timeout, timeoutMsg: '🕓 Click action failed due to timeout' }
    );
}

async function selectRandomInteger(minimumInclusive, maximumInclusive) {

    return minimumInclusive + Math.floor(Math.random() * (maximumInclusive + 1 - minimumInclusive));
}

//=======================================================================================

function selectRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

//=======================================================================================

function randomFirstName() {
    let randomNumber = Math.floor(Math.random() * firstName.length)
    console.log(`🆗 First name selected is: ${firstName[randomNumber]}`);
    return firstName[randomNumber]
}

//=======================================================================================

function randomMiddleName() {
    let randomNumber = Math.floor(Math.random() * firstName.length)
    console.log(`🆗 Middle name selected is: ${firstName[randomNumber]}`);
    return firstName[randomNumber]
}

//=======================================================================================

function randomLastName() {
    let randomNumber = Math.floor(Math.random() * lastName.length)
    console.log(`🆗 Last name selected is: ${lastName[randomNumber]}`);
    return lastName[randomNumber]
}

//=======================================================================================

function randomCity() {
    let randomNumber = Math.floor(Math.random() * city.length)
    console.log(`🆗 City selected is: ${city[randomNumber]}`);
    return city[randomNumber]
}

//=======================================================================================

function randomAddress() {
    let randomNumber = Math.floor(Math.random() * address.length)
    console.log(`🆗 Address selected is: ${address[randomNumber]}`);
    return address[randomNumber]
}

//=======================================================================================

function randomPassword() {
    const numberForPassword = NWTools.randomString(2,'1234567890');
    const lowercaseForPassword = NWTools.randomString(2,'abcdefghijklmnopqrstuvwxyz');
    const uppercaseForPassword = NWTools.randomString(2,'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const specialCharForPassword = NWTools.randomString(2,'!"#$%&()*+,-./:;<=>?@[]^_{|}~');
    const newRandomPassword = `${uppercaseForPassword}${lowercaseForPassword}${numberForPassword}${specialCharForPassword}`;
    console.log(`🆗 Random password generated is: ${newRandomPassword}`);
    return newRandomPassword
}

//=======================================================================================

async function pause(time, silentMode = false) {
    if (!silentMode) {
        console.log(clc.blue(`⏸️ ======== Pausing for ${time}ms ========`));
    }
    await driver.pause(time).then(r => {})
}

//=======================================================================================

async function multipleBack(numberOfTimes) {
    for (let i = 0; i < numberOfTimes; i++) {
        await driver.back();
        await driver.pause(1000);
    }
    await logSuccess(`Clicked on device back button ${numberOfTimes} times as expected.`);
}

//=======================================================================================

async function multipleClicks(selector, numberOfTimes) {
    for (let i = 0; i < numberOfTimes; i++) {
        await driver.$(selector).click();
        await driver.pause(200);
    }
    await logSuccess(`Clicked on: ${selector}, ${numberOfTimes} times as expected.`);
}

//=======================================================================================

async function multipleKeyboardBackspace(numberOfTimes) {
    await driver.pause(1000)
    for (let i = 0; i < numberOfTimes; i++) {
        if (driver.capabilities.platformName === "iOS"){
            await driver.sendKeys(['\u0008'])
        }
        else {
            await driver.sendKeyEvent('67')
        }
    }
    await logSuccess(`Backspace key clicked ${numberOfTimes} times as expected.`);
}

//=======================================================================================

async function removeKeyboard() {
    await driver.pause(2000)
    if (driver.capabilities.platformName === "iOS") {
        // iOS hide keyboard (this is just tapping above the keyboard)
        await driver.touchAction([
            {action: 'tap', x:180, y: 500},
            'release'
        ]);
    }
    else {
        // Android hide keyboard
        await driver.hideKeyboard()
    }
}

//=======================================================================================

async function clearValue(selector) {
    const element = await driver.$(selector);
    await element.clearValue();
}

//=======================================================================================

let departDate = '2023-12-18';
let returnDate = '2023-12-22';
let fromDestination = bonzaBookTripPage.bookTrip.airport_from_BDB;
let toDestination = bonzaBookTripPage.bookTrip.airport_to_OOL;

async function bonza_destinations_selectOneWayDestinationAndDate() {
    // Click on from button
    await driver.$(bonzaBookTripPage.bookTrip.fromButton).click();
    await driver.pause(1000);
    // Select from destination
    await driver.$(fromDestination).click();
    // Select to destination
    await driver.$(toDestination).click();
    await driver.pause(2000)
    // Select departing date
    await driver.$(`//android.view.ViewGroup[@content-desc="${departDate}"]/android.view.ViewGroup`).click();
    await driver.pause(1000)
    // Click on confirm dates
    await driver.$(bonzaBookTripPage.bookTrip.confirmDatesButton).click();
}

//=======================================================================================

async function bonza_destinations_selectRoundTripDestinationAndDate() {
    // Click on from button
    await driver.$(bonzaBookTripPage.bookTrip.fromButton).click();
    await driver.pause(1000);
    // Select from destination
    await driver.$(fromDestination).click();
    // Select to destination
    await driver.$(toDestination).click();
    await driver.pause(2000)
    // Select departing date
    await driver.$(`//android.view.ViewGroup[@content-desc="${departDate}"]/android.view.ViewGroup`).click();
    await driver.pause(500)
    // Select returning date
    await driver.$(`//android.view.ViewGroup[@content-desc="${returnDate}"]/android.view.ViewGroup`).click();
    await driver.pause(1000)
    // Click on confirm dates
    await driver.$(bonzaBookTripPage.bookTrip.confirmDatesButton).click();
}

//=======================================================================================

async function enhancedClearValue(selector, scrollUpMaximum = 3, scrollDownMaximum = 3, firstDirection = "d") {

    await findAndScrollToElement(selector, scrollUpMaximum, scrollDownMaximum, firstDirection);

    const element = await driver.$(selector);
    await element.clearValue();
}

//=======================================================================================

async function scrollTo(startPoint_X, startPoint_Y, endPoint_X, endPoint_Y, silentMode = false) {
    try {
        await driver.touchAction([
            {action: 'longPress', x: startPoint_X, y: startPoint_Y},
            {action: 'moveTo', x: endPoint_X, y: endPoint_Y},
            'release'
        ]);
        if (!silentMode) {
            console.log(`🆗 Scrolled as expected.`);
        }
        return true;
    }
    catch (error) {
        if (!silentMode) {
            console.error(clc.red(`🆘 Failed to scroll`));
        }
        return false;
    }
}

//=======================================================================================

async function iOSScroll(direction) {
    // Use 'up', 'down', 'left', 'right' only!
    await driver.execute('mobile: scroll', {direction: `${direction}`});
}

//=======================================================================================

async function forgotPassword_validateEmailFormat() {

    for (let i = 0 ; i < data.invalidEmails.length ; i++) {
        // Add invalid email from data file array
        await driver.$(pageForgotPassword.main.forgotPasswordEmailInput).addValue(data.invalidEmails[i])
        // Validate message
            let emailValidationText = await driver.$(pageForgotPassword.main.forgotPasswordEmailValidationText).getText();
            if ((emailValidationText).includes('Invalid email. Please check again.')) {
                await logSuccess(`Text validation passed! - "Invalid email. Please check again." displayed as expected. (While checking ${data.invalidEmails[i]})`);
            } else {
                await logError(`Text validation failed! - "Invalid email. Please check again." cannot be found. (While checking ${data.invalidEmails[i]})`);
            }
        // Clear email
        await driver.$(pageForgotPassword.main.forgotPasswordEmailInput).clearValue()
    }
}

//=======================================================================================

async function login(email, password) {
    // Add user (email)
    await driver.$(pageLogin.main.emailInput).addValue(email)
    // Add password
    await driver.$(pageLogin.main.passwordInput).addValue(password)
    // Click on show password (eye button)
    await driver.$(pageLogin.main.passwordEysButton).click()
    // Click on login title (just to close the keyboard)
    await driver.$(pageLogin.main.loginTitle).click()
    // Click on login button
    await driver.$(pageLogin.main.loginButton).click()
}

//=======================================================================================
async function login_validateEmailFormat() {

    for (let i = 0 ; i < data.invalidEmails.length ; i++) {
        // Add invalid email from data file array
        await driver.$(pageLogin.main.emailInput).addValue(data.invalidEmails[i])
        // Validate message
        let emailValidationText = await driver.$(pageLogin.main.emailValidationText).getText();
        if ((emailValidationText).includes('Please enter valid email')) {
            await logSuccess(`Text validation passed! - "Please enter valid email" displayed as expected. (While checking ${data.invalidEmails[i]})`);
        } else {
            await logError(`Text validation failed! - "Please enter valid email" cannot be found. (While checking ${data.invalidEmails[i]})`);
        }
        // Clear email
        await driver.$(pageLogin.main.emailInput).clearValue()
    }
}

//=======================================================================================

async function signUp_validateEmailFormat() {

    for (let i = 0 ; i < data.invalidEmails.length ; i++) {
        // Add invalid email from data file array
        await driver.$(pageSignUp.main.emailInput).addValue(data.invalidEmails[i])
        // Validate message
        let emailValidationText = await driver.$(pageSignUp.main.emailValidationText).getText();
        if ((emailValidationText).includes('Please enter valid email')) {
            await logSuccess(`Text validation passed! - "Please enter valid email" displayed as expected. (While checking ${data.invalidEmails[i]})`);
        } else {
            await logError(`Text validation failed! - "Please enter valid email" cannot be found. (While checking ${data.invalidEmails[i]})`);
        }
        // Clear email
        await driver.$(pageSignUp.main.emailInput).clearValue()
    }
}

//=======================================================================================

async function scrollViaUIScrollable(direction, screensToScroll = 1) {

    // 55 is just the default value specified in documentation and corresponds to roughly a full screen scroll
    //let steps = Math.floor(55 * stepMultiplier);
    let steps = Math.floor(55 * screensToScroll);

    direction = direction.toString().toLowerCase();

    if (direction.includes("u")) {
        for (let i = 0; i < screensToScroll; i++) {
            await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollBackward(${steps})`);
        }
    } else if (direction.includes("d")) {
        for (let i = 0; i < screensToScroll; i++) {
            await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward(${steps})`);
        }
    } else {
        logError(`Incorrect direction argument provided to scrollViaUIScrollable - ${direction} must be up or down`);
    }
}

async function findAndScrollToElement(selector, scrollUpMaximum = 3, scrollDownMaximum = 3, firstDirection = "d") {

    // return value is whether it was found or not
    let elementFound = await waitForElement(selector, 1000, 1, true);
    if (elementFound) {
        return true;
    }

    let process = [];

    if (firstDirection === "d") {
        process = ["d", "u"];
    } else {
        process = ["u", "d"];
    }

    for (let i = 0; i < process.length; i++) {
        let currentCount = 0;
        if (process[i] === "d") {
            // scrolls down
            while (await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward(55)`)) {

                if (currentCount > scrollDownMaximum) {
                    break;
                }
                
                // this returns true each loop if it is able to keep scrolling
                await pause(500, true);
                elementFound = await waitForElement(selector, 1000, 1, true);
                if (elementFound) {
                    return true;
                }
                currentCount++;
            }
        } else {
            // scrolls up
            while (await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollBackward(55)`)) {

                if (currentCount > scrollUpMaximum) {
                    break;
                }
                
                // this returns true each loop if it is able to keep scrolling
                await pause(500, true);
                elementFound = await waitForElement(selector, 1000, 1, true);
                if (elementFound) {
                    return true;
                }
                currentCount++;
            }
        }
    }

    await logError(`Unable to find element with selector ${selector}`);
    return false;
}

async function scrollFlightWindow(direction="d", n = 1) {

    for (let i = 0; i < n; i++) {
        if (direction === "d") {
            await scrollTo(750, 2200, 750, 875, true);
            await pause(500, true);
        } else {
            await scrollTo(750, 875, 750, 2200, true);
            await pause(500, true);
        }
    }
}

async function isNumber(testString) {

    return !isNaN(testString);
}

async function extractNumber(string) {

    const numberRegex = new RegExp(/\d+[.]?\d+/);
    if (numberRegex.test(string)) {
        return string.match(numberRegex)[0];
    } else {
        await logComment(`String ${string} did not appear to contain a number - returning 0`);
        return 0;
    }
}

//=======================================================================================

async function scrollIntoView(selector) {

    const element = await driver.$(selector);
    console.log(element);
    await element.scrollIntoView();  // "method is not implemented" even though it is.......
    //await element.scrollIntoView({block: 'center', inline: 'center'});  // centers
}

//=======================================================================================

async function scrollByKeyPress(direction, number) {

    // TODO: this might only work on android...

    direction = direction.toLowerCase();

    let keypress = -1;
    if (direction.includes("d")) {
        keypress = 20;
    } else if (direction.includes("u")) {
        keypress = 19;
    } else {
        await logError(`Unknown direction provided to scrollByKeyPress(): ${direction}`);
        return;
    }

    for (let i = 0; i < number; i++) {
        await driver.longPressKeyCode(keypress);
        await pause(25, true);
    }

}

//=======================================================================================

async function clickByCoordinates(x, y) {
    await driver.touchAction([
        {action: 'press', x: x, y: y},
        'release'
    ]);
}

//=======================================================================================

async function saveWeatherDataAPI() {
    let filePath = 'weatherData-api.json';
    let cities = data.weatherCities;

    try {
        for (let i = 0; i < cities.length; i++) {

            // Make the API request
            const response = await axios.get(`${data.weatherAPI.baseURL}?q=${cities[i]}&appid=${data.weatherAPI.APIKey}&units=metric`);

            const ApiData = {
                City: response.data.name,
                Temp: response.data.main.temp,
                Feels_like: response.data.main.feels_like,
            };

            // Remove all non-numeric char (keep the decimal point)
            ApiData.Temp = ApiData.Temp.toString().replace(/[^0-9.-]/g, '')
            ApiData.Feels_like = ApiData.Feels_like.toString().replace(/[^0-9.-]/g, '')

            // Round numbers down (removing decimal point)
            ApiData.Temp = Math.floor(ApiData.Temp);
            ApiData.Feels_like = Math.floor(ApiData.Feels_like);
            // Push all the data to APIResult (local memory)
            APIResult.push(ApiData)
        }
                // Save the extracted data to a file
                await fs.writeFile(filePath, JSON.stringify(APIResult, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                        return;
                    }
                    console.log('Selected weather data saved to weatherData-api.json');
                });

    } catch (error) {
        // Handle errors in the API request
        if (error.response) {
            console.error('API responded with an error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error during request setup:', error.message);
        }
    }
}

//=======================================================================================

async function saveWeatherDataAPP() {

    let filePath = 'weatherData-app.json';

    // Click on the menu button
    await driver.$(pageWeather.main.menuButton).click()
    // Click on "Customize units"
    await driver.$(pageWeather.main.customizeUnitsButton).click()
    // Click on °C
    await driver.$(pageWeather.main.celsiusButton).click()
    // Click on back button twice
    await driver.$(pageWeather.main.backNavigationButton).click()
    await driver.$(pageWeather.main.backNavigationButton).click()

    try {
        for (let i = 0; i < data.weatherCities.length; i++) {

            // Click on "Search"
            await driver.$(pageWeather.main.searchButton).click()
            // Add city in the search input
            await driver.$(pageWeather.main.searchInput).addValue(data.weatherCities[i])
            // Click on the search input (To show the keyboard)
            await driver.$(pageWeather.main.searchInputNotEmpty).click()
            // Hit ENTER key
            await driver.pressKeyCode(66);
            // Select the first result
            await driver.$(pageWeather.main.appSearchFirstResult).click()

            // Get Temp (and remove all non-numeric char)
            let tempValue = (await fetchElementText(pageWeather.main.appTempValue));
            // Get Feels like (and remove all non-numeric char)
            let feelsLikeValue = (await fetchElementText(pageWeather.main.appFeelsLikeValue));

            // Extract specific data
            const appData = {
                City: data.weatherCities[i],
                Temp: tempValue,
                Feels_like: feelsLikeValue,
            };

            // Remove all non-numeric char (keep the decimal point)
            appData.Temp = appData.Temp.toString().replace(/[^0-9.-]/g, '')
            appData.Feels_like = appData.Feels_like.toString().replace(/[^0-9.-]/g, '')

            // Round numbers down (removing decimal point)
            appData.Temp = Math.floor(appData.Temp);
            appData.Feels_like = Math.floor(appData.Feels_like);
            // Push all the data to APPResult (local memory)
            APPResult.push(appData)
        }

            // Save the extracted data to a file
            await fs.writeFile(filePath, JSON.stringify(APPResult, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                console.log('Selected weather data saved to weatherData-app.json');
            });

``}  catch (error)
        {
            // Handle errors in the API request
            if (error.response) {
                console.error('App responded with an error:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error during request setup:', error.message);
            }
        }
}

//=======================================================================================

async function saveWeatherDataWEB() {

    let filePath = 'weatherData-web.json';

    try {
            // Activate chrome
            await driver.activateApp(pageWeather.main.chromeApp)
            // Tabs button
            await driver.$(pageWeather.main.tabsButton).click()
            // Click on new tab
            await driver.$(pageWeather.main.newTabButton).click()
            // Add the URL in chrome
            await driver.$(pageWeather.main.chromeURLInput).addValue(pageWeather.main.url)
            // Hit enter key
            await driver.pressKeyCode(66);

            // Change units
            // Click on the menu
            await driver.$(pageWeather.main.webMenuButton).click()
            // Click on my account
            await driver.$(pageWeather.main.myAccountButton).click()
            // Click on my units
            await driver.$(pageWeather.main.myUnitsButton).click()
            // Scroll down
            await scrollByKeyPress("d", 19);
            await driver.pause(1000)
            // Click on the temperature
            await driver.$(pageWeather.main.temperatureButton).click()
            // Select Celsius
            await driver.$(pageWeather.main.webCelsiusButton).click()
            // Click on save
            await driver.$(pageWeather.main.saveButton).click()
            // Click back
            await driver.pause(2000)
            await driver.back()
            await driver.pause(2000)
            await driver.back()

        for (let i = 0; i < data.weatherCities.length; i++) {
                await driver.pause(1000)
                // Add city value
                await driver.$(pageWeather.main.weatherSearchInput).addValue(data.weatherCities[i])
                await driver.pause(1000)
                // Click on the input to open the keyboard
                await driver.$(`//*[@text="${data.weatherCities[i]}"]`).click()
                await driver.pause(1000)
                // Click on the first result
                await driver.$(pageWeather.main.searchFirstResult).click()
                await driver.pause(1000)
                // Get Temp (and remove all non-numeric char)
                let tempValue = (await fetchElementText(pageWeather.main.weatherTempValue));
                // Get Feels like (and remove all non-numeric char)
                let feelsLikeValue = (await fetchElementText(pageWeather.main.weatherFeelsLikeValue));

                // Extract specific data
                const webData = {
                    City: data.weatherCities[i],
                    Temp: tempValue,
                    Feels_like: feelsLikeValue,
                };

                // Remove all non-numeric char (keep the decimal point)
                webData.Temp = webData.Temp.toString().replace(/[^0-9.-]/g, '')
                webData.Feels_like = webData.Feels_like.toString().replace(/[^0-9.-]/g, '')

                // Round numbers down (removing decimal point)
                webData.Temp = Math.floor(webData.Temp);
                webData.Feels_like = Math.floor(webData.Feels_like);
                // Push all the data to APPResult (local memory)
                WEBResult.push(webData)

            // Click on device back (Return to the main search)
            await driver.pause(1000)
            await driver.back()
        }

        // Save the extracted data to the file
        await fs.writeFile(filePath, JSON.stringify(WEBResult, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
            console.log('Selected weather data saved to weatherData-web.json');
        });

    } catch (error)
    {
        // Handle errors in the API request
        if (error.response) {
            console.error('Web responded with an error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error during request setup:', error.message);
        }
    }
}

//=======================================================================================

async function compareWeatherData() {
    await driver.pause(10000)
    const APIResult = require('./weatherData-api.json')
    const APPResult = require('./weatherData-app.json')
    const WEBResult = require('./weatherData-web.json')
    const report = [];

    // Assuming all arrays have the same cities and the same structure
    for (let i = 0; i < APIResult.length; i++) {
        const cityInAPI = APIResult[i];
        const cityInAPP = APPResult.find(city => city.City === cityInAPI.City);
        const cityInWEB = WEBResult.find(city => city.City === cityInAPI.City);

        // If the city is missing in one or more arrays, report an error
        if (!cityInAPP || !cityInWEB) {
            report.push({
                City: cityInAPI.City,
                Error: 'City missing in one or more arrays',
            });
            continue;
        }

        // Compare "Temp" and "Feels_like"
        const tempMatch = cityInAPI.Temp === cityInAPP.Temp && cityInAPI.Temp === cityInWEB.Temp;
        const feelsLikeMatch = cityInAPI.Feels_like === cityInAPP.Feels_like && cityInAPI.Feels_like === cityInWEB.Feels_like;

        // Add the comparison to the report
        let reportLine = {
            City: cityInAPI.City,
            Temp: {
                inTheAPI: cityInAPI.Temp,
                inTheAPP: cityInAPP.Temp,
                inTheWEB: cityInWEB.Temp,
                isMatch: tempMatch,
            },
            Feels_like: {
                inTheAPI: cityInAPI.Feels_like,
                inTheAPP: cityInAPP.Feels_like,
                inTheWEB: cityInWEB.Feels_like,
                isMatch: feelsLikeMatch,
            },
        };
        // Validate data in the console before writing to JSON
        console.log(JSON.stringify(reportLine));
        report.push(reportLine);
    }

    // Output the report to the console
    console.log('Comparison Report:', JSON.stringify(report, null, 2));

    // Save the report to a file
    const fs = require('fs');
    await fs.writeFileSync('weatherComparisonReport.json', JSON.stringify(report, null, 2));
    console.log('Comparison report saved to comparison-report.json');
}

//=======================================================================================

async function clickByText(text) {
    try {
        await driver.$(`//*[contains(text(), '${text}')]`).click();
        console.log(`Element with "${text}" clicked successfully`);
    } catch (error) {
        console.log(`Element with "${text}" not found, skipping click operation`);
    }
}

//=======================================================================================

function clickIfExists(selector, timeout = 1000) {
    return new Promise(async (resolve, reject) => {
        const elementPromise = driver.$(selector);
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout: Element "${selector}" not found`)), timeout)
        );

        try {
            const element = await Promise.race([elementPromise, timeoutPromise]);
            await element.click();
            console.log(`🆗 Element "${selector}" clicked successfully`);
            resolve();
        } catch (error) {
            console.log(`⏩ Element "${selector}" not found, skipping click operation`);
            resolve(); // Resolving without an error since the element is not found
        }
    });
}

//=======================================================================================

async function clickByIndex(selector, index) {

    // Get all elements and keep them in array
    const elementsArray = await driver.$$(selector);

    // Click on the element at a specific index
    const elementToClick = elementsArray[index];

    // Perform the click action on the element
    await elementToClick.click();
    console.log(`Number of elements in the array: ${elementsArray.length}`)
    console.log(`Clicked on element at index ${index}`);
}

//=======================================================================================

async function fetchElementText(selector) {

    const elementActualText = await driver.$(selector).getText();
        console.log(elementActualText)
    return elementActualText;
}

//=======================================================================================

async function validateElementText(selector, text, timeout = 20000) {
    const start = Date.now();

    await driver.waitUntil(
        async () => {
            const elementActualText = await driver.$(selector).getText();
            return elementActualText.includes(text);
        },
        {
            timeout: timeout,
            timeoutMsg: `Text validation failed! - "${text}" cannot be found within ${timeout}ms.`
        }
    );

    const elapsed = Date.now() - start;
    if (elapsed < timeout) {
        await logSuccess(`Text validation passed! - "${text}" displayed as expected.`);
        return true;
    }
}

//=======================================================================================

async function bonza_clearAllPopups() {
    // Confirm update popup
    // await driver.$(bonzaMainPage.main.updateNoButton).click();
    // Close temp alert
    // await driver.$('//android.view.ViewGroup[@content-desc="button__click"]/android.view.ViewGroup').click();
    // Close "New version available" popup
    await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]').click();
}

//=======================================================================================

async function printElementText(selector) {
    // for compatibility - obsolete function
    return await getElementText(selector);
}

//=======================================================================================

async function validateElementNotDisplayed(selector) {

    const element = await driver.$(selector);
    if (!(await element.isDisplayed())) {
        await logSuccess(`Element "${selector}" don't display as expected`);
    } else {
        await logError(`Element "${selector}" display, it shouldn't!`);
    }
}

//=======================================================================================

async function validateElementDisplay(selector) {

    const element = await driver.$(selector);
    if ((await element.isDisplayed())) {
        await logSuccess(`Element "${selector}" display as expected`);
    } else {
        await logError(`Element "${selector}" not display`);
    }
}

//=======================================================================================

async function validateAttributeValue(selector, att, value) {
    // Find the element
    let element = await driver.$(selector)

    // Get the attribute value
    let attributeValue = await element.getAttribute(att);

    // Validate the attribute value
    if ((attributeValue).includes(value)) {
        await logSuccess(`Element "${selector}", attribute "${att}" display as expected and contain: "${value}"`);
    } else {
        await logError(`Element "${selector}", attribute "${att}" is not as expected, looking for: "${value}", app display: "${attributeValue}"`);
    }
}

//=======================================================================================

async function validateAttributeText(selector, value) {
    // Find the element
    let element = await driver.$(selector)

    // Get the attribute value
    let attributeValue = driver.capabilities.platformName === "iOS"
        ? await element.getAttribute('label')
        : await element.getAttribute('content-desc');
    let attributeValueWIthSlashes = attributeValue.replace(/-/g, '/').replace(/\s+/g, '').toString()

    // Validate the attribute value
    if ((attributeValueWIthSlashes).includes(value)) {
        await logSuccess(`Element "${selector}", text attribute display as expected and contain: "${value}"`);
    } else {
        await logError(`Element "${selector}", text attribute is not as expected, looking for: "${value}", app display: "${attributeValueWIthSlashes}"`);
    }
}

//=======================================================================================

async function validateAttributeNotIncludesValue(selector, att, value) {
    // Find the element
    let element = await driver.$(selector)

    // Get the attribute value
    let attributeValue = await element.getAttribute(att);

    // Validate the attribute value
    if (!(attributeValue).includes(value)) {
        await logSuccess(`Element "${selector}", attribute "${att}" don't display "${value}" as expected.`);
    } else {
        await logError(`Element "${selector}", attribute "${att}" display: "${attributeValue}", it shouldn't!`);
    }
}

//=======================================================================================

async function destinations_selectByNameOrCode(from, to) {
    // Click on "From"
    await driver.$(pageSearch.main.fromInput).click();
    await driver.pause(1000)
    // Add "From" in the field
    await driver.$(pageSearch.main.destinationsSearchInput).addValue(from);
    // Click on "other" label (just to close the keyboard)
    await driver.$(pageSearch.main.otherTitle).click();
    await driver.pause(2000)
    // Click on first destination in the results
    await driver.$(pageSearch.main.destinationsFirstResult).click();
    // Click on clear text button
    await driver.pause(1000)
    await driver.$(pageSearch.main.destinationsSearchInput).clearValue();
    // Add "To" in the field
    await driver.$(pageSearch.main.destinationsSearchInput).addValue(to);
    // Click on "other" label (just to close the keyboard)
    await driver.$(pageSearch.main.otherTitle).click();
    await driver.pause(2000)
    // Click on first destination in the results
    await driver.$(pageSearch.main.destinationsFirstResult).click();
    // Log
    await logSuccess(`Destinations selected, From: ${from}, To: ${to}`);
}

//=======================================================================================

async function getCurrentMonthYear() {

    const date = new Date();
        // const currentMonthNumberWithZero = (date.getMonth()+1).toString().padStart(2, '0');   // Add leading 0 if less than 10
        const currentMonthNumberNoZero = (date.getMonth() + 1);
        const nextMonthNumberNoZero = (date.getMonth() + 2);
        const twoMonthsAheadNumberNoZero = (date.getMonth() + 3);
        const currentMonthName = months[currentMonthNumberNoZero];
        const nextMonthName = months[nextMonthNumberNoZero];
        const twoMonthsAheadMonthName = months[twoMonthsAheadNumberNoZero];
        const currentYear = (date.getFullYear())
        const nextYear = (date.getFullYear() +1)

    return {currentMonthName, nextMonthName, twoMonthsAheadMonthName, currentYear, nextYear}
}

//=======================================================================================

// Thia will return date + number of days in this format 17/02/2024
function getDateRelativeToToday(daysToAdd) {
    // Get current date for depart or return
    const currentDateWithAddedDays = new Date();
    // Add the specified number of days
    currentDateWithAddedDays.setDate(currentDateWithAddedDays.getDate() + daysToAdd);
    // Extract the updated year, month, and day
    const year = currentDateWithAddedDays.getFullYear();
    const month = (currentDateWithAddedDays.getMonth() + 2).toString().padStart(2, '0'); // Months are zero-based, so add 1 and pad with zero
    const day = currentDateWithAddedDays.getDate().toString().padStart(2, '0'); // Pad single-digit days with zero
    // Format the updated date as DD-MM-YYYY
    return `${day}/${month}/${year}`;
}

//=======================================================================================

async function calendar_selectDatesRelativeToToday(daysToAddToDepart, daysToAddToReturn) {

await driver.pause(1000)

// DEPART STARTS HERE //

    let isDisabled = true;
    let departResultDate = "";
    do {
        departResultDate = getDateRelativeToToday(daysToAddToDepart);
        console.log("Trying depart date: " + departResultDate)
        // Get date enabled/disabled attribute for the condition
        let dateElement = driver.capabilities.platformName === "iOS"
            ? await driver.$(`~sf_dates_selector_day_${departResultDate.replace(/\//g, '')}_container`)
            : await driver.$(`//*[contains(@resource-id, "sf_dates_selector_day_${departResultDate.replace(/\//g, '')}_container")]`)
        // Getting the attribute value
        let dateElementAttributeValue = driver.capabilities.platformName === "iOS"
            ? await dateElement.getAttribute('label')
            : await dateElement.getAttribute('content-desc')
        // Checking if attribute contains 'disabled'
        isDisabled = (dateElementAttributeValue).includes('disabled');
        daysToAddToDepart++;

    } while (isDisabled);

    // Click on depart date
    let departDateText = driver.capabilities.platformName === "iOS"
        ? `//*[@name="sf_dates_selector_day_${departResultDate.replace(/\//g, '')}_container"]`
        : `//*[contains(@resource-id, "sf_dates_selector_day_${departResultDate.replace(/\//g, '')}_container")]`;
    await driver.$(departDateText).click();
    await driver.pause(500)
    // Log
    await logSuccess(`Depart date selected: ${departResultDate}`);

    // Validate depart date summary
    const departSummaryText = await driver.$(pageGo7Calendar.main.calendarDepartSummary).getText();
    const departSummaryWithSlashes = departSummaryText.replace(/-/g, '/')
    if ((departSummaryWithSlashes).includes(departResultDate)) {
        await logSuccess(`Text validation passed! - Depart summary ${departSummaryWithSlashes} displayed as expected.`);
    } else {
        await logError(`Text validation failed! - ${departResultDate} cannot be found. Actual: ${departSummaryWithSlashes}`);
    }

// RETURN STARTS HERE //

    let returnResultDate = "";
    do {
        returnResultDate = getDateRelativeToToday(daysToAddToReturn);
        console.log("Trying return date: " + returnResultDate)

        // Get date enabled/disabled attribute for the condition
        let dateElement = driver.capabilities.platformName === "iOS"
            ? await driver.$(`~sf_dates_selector_day_${returnResultDate.replace(/\//g, '')}_container`)
            : await driver.$(`//*[contains(@resource-id, "sf_dates_selector_day_${returnResultDate.replace(/\//g, '')}_container")]`)
        // Getting the attribute value
        let dateElementAttributeValue = driver.capabilities.platformName === "iOS"
            ? await dateElement.getAttribute('label')
            : await dateElement.getAttribute('content-desc')
        console.log(dateElementAttributeValue)
        // Checking if attribute contains 'disabled'
        isDisabled = (dateElementAttributeValue).includes('disabled');
        daysToAddToReturn++;

    } while (isDisabled);

    // Click on return date
    let returnDateText = driver.capabilities.platformName === "iOS"
        ? `//*[@name="sf_dates_selector_day_${returnResultDate.replace(/\//g, '')}_container"]`
        : `//*[contains(@resource-id, "sf_dates_selector_day_${returnResultDate.replace(/\//g, '')}_container")]`
    await driver.$(returnDateText).click();
    await driver.pause(500)
    // Log
    await logSuccess(`Return date selected: ${returnResultDate}`);

    // Validate return date summary
    const returnSummaryText = await driver.$(pageGo7Calendar.main.calendarReturnSummary).getText();
    const returnSummaryWithSlashes = returnSummaryText.replace(/-/g, '/')
    if ((returnSummaryWithSlashes).includes(returnResultDate)) {
        await logSuccess(`Text validation passed! - Return summary ${returnSummaryWithSlashes} displayed as expected.`);
    } else {
        await logError(`Text validation failed! - ${returnResultDate} cannot be found. Actual: ${returnSummaryWithSlashes}`);
    }

    return {departResultDate, returnResultDate}
}

//=======================================================================================

async function calendar_selectDepartDateRelativeToToday(daysToAdd) {

    let isDisabled = true;
    let departResultDate = "";
    do {
        departResultDate = getDateRelativeToToday(daysToAdd);
        console.log("Trying depart date: " + departResultDate)

        // Get date enabled/disabled attribute for the condition
        let dateElement = driver.capabilities.platformName === "iOS"
            ? await driver.$(`~sf_dates_selector_day_${departResultDate.replace(/\//g, '')}_container`)
            : await driver.$(`//*[contains(@resource-id, "sf_dates_selector_day_${departResultDate.replace(/\//g, '')}_container")]`)
        // Getting the attribute value
        let dateElementAttributeValue = driver.capabilities.platformName === "iOS"
            ? await dateElement.getAttribute('label')
            : await dateElement.getAttribute('content-desc')
        console.log(dateElementAttributeValue)
        // Checking if attribute contains 'disabled'
        isDisabled = (dateElementAttributeValue).includes('disabled');
        daysToAdd++;

    } while (isDisabled);

    // Click on depart summary (to make sure depart will be selected)
    await driver.$(pageGo7Calendar.main.calendarDepartSummary).click()
    // Click on depart date
    let departDateText = driver.capabilities.platformName === "iOS"
        ? `//*[@name="sf_dates_selector_day_${departResultDate.replace(/\//g, '')}_container"]`
        : `//*[contains(@resource-id, "sf_dates_selector_day_${departResultDate.replace(/\//g, '')}_container")]`
    await driver.$(departDateText).click();
    await driver.pause(500)
    // Log
    await logSuccess(`Date selected: ${departResultDate}`);

    // Validate depart summary
    const departSummaryText = await driver.$(pageGo7Calendar.main.calendarDepartSummary).getText();
    const departSummaryWithSlashes = departSummaryText.replace(/-/g, '/')

    if ((departSummaryWithSlashes).includes(departResultDate)) {
        await logSuccess(`Text validation passed! - Summary displayed as expected.`);
    } else {
        await logError(`Text validation failed! - Looking for ${departResultDate}. Actual: depart: ${departSummaryWithSlashes}`);
    }

    return departResultDate
}

//=======================================================================================

async function calendar_selectReturnDateRelativeToToday(daysToAdd) {

    let isDisabled = true;
    let returnResultDate = "";
    do {
        returnResultDate = getDateRelativeToToday(daysToAdd);
        console.log("Trying return date: " + returnResultDate)

        // Get date enabled/disabled attribute for the condition
        let dateElement = driver.capabilities.platformName === "iOS"
            ? await driver.$(`~sf_dates_selector_day_${returnResultDate.replace(/\//g, '')}_container`)
            : await driver.$(`//*[contains(@resource-id, "sf_dates_selector_day_${returnResultDate.replace(/\//g, '')}_container")]`)
        // Getting the attribute value
        let dateElementAttributeValue = driver.capabilities.platformName === "iOS"
            ? await dateElement.getAttribute('label')
            : await dateElement.getAttribute('content-desc')
        console.log(dateElementAttributeValue)
        // Checking if attribute contains 'disabled'
        isDisabled = (dateElementAttributeValue).includes('disabled');
        daysToAdd++;

    } while (isDisabled);

    // Click on return summary (to make sure return will be selected)
    await driver.$(pageGo7Calendar.main.calendarReturnSummary).click()
    // Click on return date
    let returnDateText = driver.capabilities.platformName === "iOS"
        ? `//*[@name="sf_dates_selector_day_${returnResultDate.replace(/\//g, '')}_container"]`
        : `//*[contains(@resource-id, "sf_dates_selector_day_${returnResultDate.replace(/\//g, '')}_container")]`
    await driver.$(returnDateText).click();
    await driver.pause(500)
    // Log
    await logSuccess(`Date selected: ${returnResultDate}`);

    // Validate return summary
    const returnSummaryText = await driver.$(pageGo7Calendar.main.calendarReturnSummary).getText();
    const returnSummaryWithSlashes = returnSummaryText.replace(/-/g, '/')

    if ((returnSummaryWithSlashes).includes(returnResultDate)) {
        await logSuccess(`Text validation passed! - Summary displayed as expected.`);
    } else {
        await logError(`Text validation failed! - Looking for ${returnResultDate}. Actual: return: ${returnSummaryWithSlashes}`);
    }

    return returnResultDate
}

//=======================================================================================

async function calendar_selectRoundTripDatesByActualDate(departDay, departMonth, departYear, returnDay, returnMonth, returnYear) {

    let departFullDate = `${departYear}-${departMonth}-${departDay}`;
    let returnFullDate = `${returnYear}-${returnMonth}-${returnDay}`;

    await driver.pause(3000)
    // Click on next month
    // await driver.$(pageGo7Calendar.main.calendarNextMonth).click();
    // Select depart date
    let departDateText = driver.capabilities.platformName === "iOS"
        ? `//*[@name="${departFullDate}"]`
        : `//*[contains(@content-desc, "${departFullDate}")]`;
    await driver.$(departDateText).click();
    await driver.pause(500)
    // Select return date
    let returnDateText = driver.capabilities.platformName === "iOS"
        ? `//*[@name="${returnFullDate}"]`
        : `//*[contains(@content-desc, "${returnFullDate}")]`;
    await driver.$(returnDateText).click();
    // // Click on done button
    await driver.$(pageSearch.main.calendarDoneButton).click();
    // Log
    await logSuccess(`Round trip date selected, Depart: ${departFullDate}, Return: ${returnFullDate}`);
}

//=======================================================================================

async function calendar_selectOneWayDatesByActualDate(departDay, departMonth, departYear) {

    let departFullDate = `${departYear}-${departMonth}-${departDay}`;

    await driver.pause(3000)
    // Click on next month
    // await driver.$(pageGo7Calendar.main.calendarNextMonth).click();
    await driver.$(pageGo7Calendar.main.calendarResetButton).click();   // Trying this instead of the long wait 29/5/24
    // Select depart date
    let departDateText = driver.capabilities.platformName === "iOS"
        ? `//*[@name="${departFullDate}"]`
        : `//*[contains(@content-desc, "${departFullDate}")]`;
    await driver.$(departDateText).click();
    // Click on done button
    await driver.$(pageGo7Calendar.main.calendarDoneButton).click();
    // Log
    await logSuccess(`One way date selected, Depart: ${departFullDate}`);
}

//=======================================================================================

async function calendar_selectOneWayDateByIndex(departIndex) {
    // Click on next month
    // await driver.$(pageGo7Calendar.main.calendarNextMonth).click();
    await driver.pause(3000)
    await driver.$(pageGo7Calendar.main.calendarResetButton).click();   // Trying this instead of the long wait 29/5/24
    // Get all available dates, place in array
    const elementsArray = driver.$$('//*[contains(@resource-id, "enabled")]');
    // Click on the element at index
    await elementsArray[departIndex].click();
    // Click on done button
    await driver.$(pageGo7Calendar.main.calendarDoneButton).click();
    // Log
    await logSuccess(`One way date selected by index, Depart:${departIndex}`);
}

//=======================================================================================

async function calendar_selectRoundTripDatesByIndex(departIndex, returnIndex) {
    // Click on next month
    await driver.$(pageGo7Calendar.main.calendarNextMonth).click();
    await driver.pause(3000)
    await driver.$(pageGo7Calendar.main.calendarResetButton).click();   // Trying this instead of the long wait 29/5/24
    // Get all available dates, place in array
    let availableDatesArray = driver.$$(pageGo7Calendar.main.calendarAllValidDates);
    // Click on depart date by given index
    await availableDatesArray[departIndex].click();
    await driver.pause(500)
    // Get all available dates again, (will select return quicker)
    let availableDatesArray2 = driver.$$(pageGo7Calendar.main.calendarAllValidDates);
    // Click on return date by given index
    await availableDatesArray2[returnIndex].click();
    // Click on done button
    await driver.$(pageGo7Calendar.main.calendarDoneButton).click();
    // Log
    await logSuccess(`Round trip dated selected by index, Depart:${departIndex}, Return:${returnIndex}`);
}

//=======================================================================================

async function passengers_selectPassengers(adults, children, infants) {

    // Adults
    for (let i = 0; i < adults; i++) {
        await driver.$(pageGo7Passengers.main.adultsPlusButton).click();
        await driver.pause(100);
    }
    console.log(`🆗 Passengers: ${children} adults added`);

    // Children
    for (let i = 0; i < children; i++) {
        await driver.$(pageGo7Passengers.main.childrenPlusButton).click();
        await driver.pause(100);
    }
    console.log(`🆗 Passengers: ${children} children added`);

    // Infants
    for (let i = 0; i < infants; i++) {
        await driver.$(pageGo7Passengers.main.infantsPlusButton).click();
        await driver.pause(100);
    }
    console.log(`🆗 Passengers: ${infants} infants added`);

    // Click on save button
    await driver.pause(1000);
    await driver.$(pageGo7Passengers.main.passengersSaveButton).click();
}

//=======================================================================================

async function calendar_selectFirstAvailableRoundTripDates() {
    await driver.pause(3000)
    // Click on next month
    await driver.$(pageGo7Calendar.main.calendarNextMonth).click();
    // Click on reset button
    await driver.$(pageGo7Calendar.main.calendarResetButton).click();   // Trying this instead of the long wait 29/5/24
    // Get all available dates, place in array
    const availableDatesArray = driver.$$(pageGo7Calendar.main.calendarAllValidDates);
    // Click on the first date element
    await availableDatesArray[0].click();
    await driver.pause(500)
    // Get all available dates again, (will select return quicker)
    let availableDatesArray2 = driver.$$(pageGo7Calendar.main.calendarAllValidDates);
    // Click on the second date element
    await availableDatesArray2[1].click();
    // Click on Done button
    await driver.$(pageGo7Calendar.main.calendarDoneButton).click();
}

//=======================================================================================

async function calendar_selectFirstAvailableOneWayDate() {
    await driver.pause(3000)
    // Click on next month
    await driver.$(pageGo7Calendar.main.calendarNextMonth).click();
    // Click on reset button
    await driver.$(pageGo7Calendar.main.calendarResetButton).click();   // Trying this instead of the long wait 29/5/24
    // Get all available dates, place in array
    const availableDatesArray = driver.$$(pageGo7Calendar.main.calendarAllValidDates);
    // Click on the first element
    await availableDatesArray[0].click();
    // Click on Done button
    await driver.$(pageGo7Calendar.main.calendarDoneButton).click();
}

//=======================================================================================

function calendar_todayPlus(daysToAdd) {
    // Get current date
    const currentDate = new Date();
    // Add the specified number of days
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    // Extract the updated year, month, and day
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1 and pad with zero
    const day = currentDate.getDate().toString().padStart(2, '0'); // Pad single-digit days with zero
    // Format the updated date as YYYY-MM-DD
    return `${day}-${month}-${year}`;
}

//=======================================================================================

async function addPromoCode(promoCode) {
    await driver.pause(1000)
    // Click on promo button
    await driver.$(pageSearch.main.promotionCodeButton).click();
    // Add promo value
    await driver.$(pageSearch.main.promotionCodeInput).addValue(promoCode);
    // Click on the page title just to close the keyboard
    await driver.$(pageSearch.main.searchPageTitle).click();
    // Log
    await logSuccess(`Promo code: ${promoCode} added successfully to the booking.`);
}

//=======================================================================================

async function paxInfo_selectBirthDate() {
    // Click on phone number label (Just to close the keyboard)
    await driver.$(pagePaxInfo.main.adult1_phoneNumberLabel).click();
    await driver.pause(1000)
        const DOBTitle = await driver.$(pagePaxInfo.main.adult1_DOBTitle);
        // const DOBTitleExists = await DOBTitle.isExisting();

        // if (DOBTitleExists) {
                // Click on day
                await driver.$(pagePaxInfo.main.adult1_dateOfBirthDayButton).click();
                // Select day
                await driver.pause(500)
                await driver.$(pagePaxInfo.main.adult1_dateOfBirth_Day).click();
                // Click on month
                await driver.$(pagePaxInfo.main.adult1_dateOfBirthMonthButton).click();
                // Select month
                await driver.pause(500)
                await driver.$(pagePaxInfo.main.adult1_dateOfBirth_Month).click();
                // Click on year
                await driver.$(pagePaxInfo.main.adult1_dateOfBirthYearButton).click();
                // Select year
                await driver.pause(500)
                await driver.$(pagePaxInfo.main.adult1_dateOfBirth_Year).click();
                // Log
                await logSuccess(`Birthdate selected successfully.`);

                // Collect "selected date" data for later verification
                let selectedDay = await driver.$(pagePaxInfo.main.adult1_dateOfBirthDayButton).getText();
                let selectedMonth = await driver.$(pagePaxInfo.main.adult1_dateOfBirthMonthButton).getText();
                let selectedYear = await driver.$(pagePaxInfo.main.adult1_dateOfBirthYearButton).getText();

                return `${selectedDay}/${selectedMonth}/${selectedYear}`;
            // }
                    // else {
                    //     // Add age
                    //     await driver.$(pagePaxInfo.main.adult1_age).addValue(52);
                    //     // Log
                    //     await logSuccess(`Age selected successfully.`);
                    // }
}

//=======================================================================================

async function signUp_selectBirthDate() {

    const dayButton = await driver.$(pageSignUp.main.dateOfBirthDayButton);
    const dayButtonExists = await dayButton.isExisting();

    if (dayButtonExists) {
            // Click on day
            await driver.$(pageSignUp.main.dateOfBirthDayButton).click();
            // Select day
            await driver.$(pageSignUp.main.dateOfBirthDayValue).click();
            await driver.$(pageSignUp.main.personalInformationTitle).click()    // Just to close the keyboard
            // Click on month
            await driver.$(pageSignUp.main.dateOfBirthMonthButton).click();
            // Select month
            await driver.$(pageSignUp.main.dateOfBirthMonthValue).click();
            await driver.$(pageSignUp.main.personalInformationTitle).click()    // Just to close the keyboard
            // Click on year
            await driver.pause(1000)
            await driver.$(pageSignUp.main.dateOfBirthYearButton).click();
            // Select year
            await driver.$(pageSignUp.main.dateOfBirthYearValue).click();
            // Log
            await logSuccess(`Birthdate selected successfully.`);
        }
                else {
                    await driver.$('TBD').addValue(52);
                    // Log
                    await logSuccess(`Age selected successfully.`);
                }
}

//=======================================================================================

async function searchResults_selectRoundTripFares(departFare = 1, returnFare = 1) {
    // Select fares by number, default is the first fare on both flights (1, 1) - (Note this is not by index)
    // Select depart flight
    await driver.$(pageSearchResults.main.departFirstFlightContainer).click()
    // Get fares page title
    const farePageTitle = await driver.$(pageFares.main.faresPageTitle);
    const farePageTitleExists = await farePageTitle.isExisting();
        if (farePageTitleExists) {
                // Select the fare
                let departFirstFare = driver.capabilities.platformName === "iOS"
                    ? `~bundle-list-element_bundle_${departFare-1}_header_radio_button`
                    : `//*[@resource-id="bundle-list-element_bundle_${departFare-1}_header_radio_button"]`;
                await driver.$(departFirstFare).click()
                // Click on continue in fares page
            await driver.$(pageFares.main.faresContinueButton).click();
            }

    // Select return flight
    await driver.$(pageSearchResults.main.returnFirstFlightContainer).click()
    // Get fares page title
    const farePageTitleReturn = await driver.$(pageFares.main.faresPageTitle);
    const farePageTitleReturnExists = await farePageTitleReturn.isExisting();
    if (farePageTitleReturnExists) {
                // Select the fare
                let returnFirstFare = driver.capabilities.platformName === "iOS"
                    ? `~bundle-list-element_bundle_${returnFare-1}_header_radio_button`
                    : `//*[@resource-id="bundle-list-element_bundle_${returnFare-1}_header_radio_button"]`;
                await driver.$(returnFirstFare).click();
                // Click on continue in fares page
            await driver.$(pageFares.main.faresContinueButton).click();
            }

    // Click on continue in search results page
    await driver.$(pageSearchResults.main.continueButton).click();
}

//=======================================================================================

async function searchResults_selectDepartFare(departFare = 1) {
    // Select fare by number, default is the first fare (1) - (Note this is not by index)
    // Select depart flight
    await driver.$(pageSearchResults.main.departFirstFlightContainer).click()
    // Get fares page title
    const farePageTitle = await driver.$(pageFares.main.faresPageTitle);
    const farePageTitleExists = await farePageTitle.isExisting();
        if (farePageTitleExists) {
            // Select the fare
            let departFirstFare = driver.capabilities.platformName === "iOS"
                ? `~bundle-list-element_bundle_${departFare-1}_header_radio_button`
                : `//*[@resource-id="bundle-list-element_bundle_${departFare-1}_header_radio_button"]`;
            await driver.$(departFirstFare).click()
            // Click on continue in fares page
            await driver.$(pageFares.main.faresContinueButton).click();
        }
    // Click on continue in search results page
    await driver.$(pageSearchResults.main.continueButton).click();
}

//=======================================================================================

async function searchResults_selectReturnFare(returnFare = 1) {
    // Select fare by number, default is the first fare (1) - (Note this is not by index)
    // Select return flight
    await driver.$(pageSearchResults.main.returnFirstFlightContainer).click()
    // Get fares page title
    const farePageTitle = await driver.$(pageFares.main.faresPageTitle);
    const farePageTitleExists = await farePageTitle.isExisting();
        if (farePageTitleExists) {
            // Select the fare
            let returnFirstFare = driver.capabilities.platformName === "iOS"
                ? `~bundle-list-element_bundle_${returnFare-1}_header_radio_button`
                : `//*[@resource-id="bundle-list-element_bundle_${returnFare-1}_header_radio_button"]`;
            await driver.$(returnFirstFare).click()
            // Click on continue in fares page
            await driver.$(pageFares.main.faresContinueButton).click();
        }
    // Click on continue in search results page
    // await driver.$(pageSearchResults.main.continueButton).click();
}

//=======================================================================================

async function paxInfo_addTitle() {

// If adult1 section is not expanded, it will open it.

    let titleButton = pagePaxInfo.main.adult1_titleButton;
    if (titleButton.length > 0) {
        // Click on title field
        await driver.$(pagePaxInfo.main.adult1_titleButton).click()
        // Get all titles
        await driver.pause(1000)
        const allTitles = await driver.$$(pagePaxInfo.main.adult1_allTitles)

        let randomNumber = Math.floor(Math.random() * allTitles.length)
        // Click on the selected title
        let selectedTitle = await driver.$(allTitles[randomNumber]).getText()
        await driver.$(allTitles[randomNumber]).click()

            return selectedTitle
    }
            else {
                await driver.$(pagePaxInfo.main.adult1_sectionTitleText).click()
            }
}

//=======================================================================================

async function paxInfo_addNames() {

    let firstName = await randomFirstName()
    let lastName = await randomLastName()
    // Add first name
    await driver.$(pagePaxInfo.main.adult1_firstNameInput).addValue(firstName);
    // Add last name
    await driver.$(pagePaxInfo.main.adult1_lastNameInput).addValue(lastName);
}

//=======================================================================================

async function paxInfo_addFirstName() {

    let firstName = await randomFirstName()
    // Add first name
    await driver.$(pagePaxInfo.main.adult1_firstNameInput).addValue(firstName);

        return firstName;
}

//=======================================================================================

async function paxInfo_addLastName() {

    let lastName = await randomLastName()
    // Add last name
    await driver.$(pagePaxInfo.main.adult1_lastNameInput).addValue(lastName);

        return lastName;
}

//=======================================================================================

async function paxInfo_addPhoneNumber() {
    let phoneNumber = '212345678'
    // Click on phone country code (just to close the keyboard)
    await driver.$(pagePaxInfo.main.adult1_phoneCountryCodeButton).click()
    // Click on phone number country code
    await driver.$(pagePaxInfo.main.adult1_phoneCountryCodeButton).click()
    await driver.pause(2000)
    // Click on country code search input code
    await driver.$(pagePaxInfo.main.adult1_phoneCountryCodeSearchInput).click()
    // await driver.pause(2000000)
    // Search for country (Australia)
    await driver.$(pagePaxInfo.main.adult1_phoneCountryCodeSearchInput).addValue('Australia')
    // Click on results title to close the keyboard
    await driver.$(pagePaxInfo.main.adult1_phoneCountryCodeResultsTitle).click()
    // Select the country
    await driver.$(pagePaxInfo.main.adult1_phoneCountryCodeFirstResult).click()
    await driver.pause(2000)
    // Add phone number
    await driver.$(pagePaxInfo.main.adult1_phoneInput).addValue(phoneNumber)
    // Click on phone number label (Just to close the keyboard)
    await driver.$(pagePaxInfo.main.adult1_phoneNumberLabel).click()
    await driver.pause(1000)

        return phoneNumber;
}

//=======================================================================================

async function paxInfo_addCity() {
    // Add city
    await driver.$('TBD').addValue(`${await randomCity()}`);
}

//=======================================================================================

async function paxInfo_addEmail() {
    const randomEmail = `ran.domali${randomNumber}@yopmail.com`
    // Add email
    await driver.$(pagePaxInfo.main.adult1_emailInput).addValue(randomEmail);
    await logSuccess(`Email generated is: ${randomEmail}`)

        return randomEmail;
}

//=======================================================================================

async function seats_selectFirstAvailableSeat() {
    // Get all available seats, place in array
    const availableSeatsArray = await driver.$$(pageSeatSelection.main.allAvailableSeats);
    // Click on the first element
    await availableSeatsArray[0].click();
    // Click on select
    await driver.$(pageSeatSelection.main.selectSeatButton).click()
    // Click on continue button
    await driver.$(pageSeatSelection.main.continueButton).click()
}

//=======================================================================================

async function signUp_addTitle() {
    // Click on title field
    await driver.$(pageSignUp.main.titleButton).click()
    // Get all titles
    // const allTitles = await driver.$$('//*[contains(@name, "auth_modal_modal_tabs_content_sign_up_form_formbuilder_title_select_item_")]')

    await driver.pause(3000)
    let allTitles = driver.capabilities.platformName === "iOS"
        ? await driver.$$('//*[contains(@name, "auth_modal_modal_tabs_content_sign_up_form_formbuilder_title_select_item_")]')
        : await driver.$$('//*[contains(@resource-id, "auth_modal_modal_tabs_content_sign_up_form_formbuilder_title_select_item_")]')

    let randomNumber = Math.floor(Math.random() * allTitles.length)
    // Click on the selected title
    await driver.$(allTitles[randomNumber]).click()
}

//=======================================================================================

async function signUp_addEmail() {
    const randomEmail = `ran.domali${randomNumber}@yopmail.com`
    // Add randomEmail
    await driver.$(pageSignUp.main.emailInput).addValue(randomEmail);
    await logSuccess(`Random email generated: ${randomEmail}`)

    return randomEmail;
}

//=======================================================================================

async function signUp_addPhoneNumber() {

    // Click on phone number country code
    await driver.pause(1000)
    await driver.$(pageSignUp.main.phoneCountryCodeButton).click()
    // Search for country
    await driver.$(pageSignUp.main.phoneCountryCodeSearchInput).addValue('Australia')
    // Click on results title to close the keyboard
    await driver.$(pageSignUp.main.phoneCountryCodeResultsTitle).click()
    // Select the country
    await driver.$(pageSignUp.main.phoneCountryCodeFirstResult).click()
    await driver.pause(2000)
    // Add phone number
    await driver.$(pageSignUp.main.phoneInput).addValue('212345678')
}

//=======================================================================================

async function paxInfo_addSpecificNames(firstName = 'Marlon', middleName = 'Francis', lastName = 'Brando') {
    // Add first name
    await driver.$(pagePaxInfo.main.firstNameInput).addValue(firstName);
    // // Add middle name
    // await driver.$(pagePaxInfo.main.middleNameInput).addValue(middleName);
    // Add last name
    await driver.$(pagePaxInfo.main.lastNameInput).addValue(lastName);
}

//=======================================================================================

async function isAppReady(timeout = 20000) {
    const start = Date.now();

    await driver.waitUntil(
        async () => {
            // Validate "From" destination input exists
            const fromInput = await driver.$(pageSearch.main.fromInput);
            const fromInputExists = await fromInput.isExisting();
            // Validate "Depart date" input exists
            const departDateInput = await driver.$(pageSearch.main.searchDepartDateSummary);
            const departDateInputExists = await departDateInput.isExisting();
            // Validate "Passengers" input exists
            const passengersInput = await driver.$(pageSearch.main.passengersSummary);
            const passengersInputExists = await passengersInput.isExisting();
            // Validate "My GO7" button exists
            const myGo7Button = await driver.$(pageSearch.main.myGo7Button);
            const myGo7ButtonExists = await myGo7Button.isExisting();

            return fromInputExists && departDateInputExists && passengersInputExists && myGo7ButtonExists;
        },
            {
                timeout: timeout,
                timeoutMsg: `App is not ready after ${timeout}ms, aborting!`
            }
    );

    const elapsed = Date.now() - start;
    if (elapsed < timeout) {
        await logSuccess(`App is ready, starting test...`);
    }
}

//=======================================================================================

async function payment_zooz() {
    await driver.pause(2000)
    // Click on zooz payment option
    await driver.$(pagePayment.main.zoozButton).click()
    // Add name
    await driver.$(pagePayment.main.zoozNameInput).addValue(data.creditCard.visa.cardFullName)
        // Click on the card image (Just to close the keyboard)
        await driver.$(pagePayment.main.zoozCardImageExpirationTitle).click()
    // Add card number
    await driver.$(pagePayment.main.zoozCardNumberInput).addValue(data.creditCard.visa.cardNumber)
        // Click on the card image (Just to close the keyboard)
        await driver.$(pagePayment.main.zoozCardImageExpirationTitle).click()
    // Add expiration
    await driver.$(pagePayment.main.zoozExpirationInput).addValue(data.creditCard.visa.cardExpiration)
        // Click on the card image (Just to close the keyboard)
        await driver.$(pagePayment.main.zoozCardImageExpirationTitle).click()
    // Add security code
    await driver.$(pagePayment.main.zoozSecurityCodeInput).addValue(data.creditCard.visa.cardSecurityCode)
        // Click on expiration label (Just to close the keyboard)
        await driver.$(pagePayment.main.zoozExpirationLabel).click()
    // Click on pay button
    await driver.pause(2000)
    await driver.$(pagePayment.main.zoozPayButton).click()
    await driver.pause(4000)
    // Validate success message
    // const successMessageText = await driver.$(pagePayment.main.zoozSuccessMessageText).getText();
    // const expectedText = 'Your transaction was successful.'
    //     if (successMessageText === expectedText) {
    //         await logSuccess(`Text validation passed! - "${expectedText}" displayed as expected.`);
    //         } else {
    //             await logError(`Text validation failed! - "${expectedText}" cannot be found. Actual: "${successMessageText}"`);
    //         }
}

//=======================================================================================

async function getElementText(selector, silentMode = false) {
    try {
        const myElement = await $(selector);
        let elementText = await myElement.getText();
        if (!silentMode) {
            await logComment(`Text value is: ${elementText}`);
        }
        return await elementText;
    }
    catch (error) {
        await logError(`Cannot find element: ${selector}`);
        return "";
    }
}

//=======================================================================================

async function getRecoveryCode() {
    const myElement = await driver.$('//*[contains(@name, "You have requested to reset your password")]');
    const elementText = await myElement.getText();
    console.log(elementText.replace(/.(?=.{4,}$)/g, ''))
    return elementText.replace(/.(?=.{4,}$)/g, '')
}

//=======================================================================================

async function comparePrices(selector1, selector2) {

    // Get the text values
    let price1 = await driver.$(selector1).getText();
    let price2 = await driver.$(selector2).getText();

    // Convert to number
    price1 = parseFloat(price1);
    price2 = parseFloat(price2);

    // Compare
        if (price1 === price2) {
            await logSuccess(`Prices match! Price1 = [${price1}], Price2 = [${price2}]`);
            return true;
            } else {
                await logError(`Prices do not match! Price1 = [${price1}], Price2 = [${price2}]`);
                return false;
            }
}

//=======================================================================================

async function checkIsEnabled(selector) {
    try {
        return await $(selector).isEnabled();
    } catch {
        return false;
    }
}

//=======================================================================================

async function openUrlInChrome(url) {
        await driver.activateApp('com.android.chrome')
        // Click on tabs button
        // await driver.$('~More options').click();
        await driver.$('~Switch or close tabs').click();
        // Click on new tab
        await driver.$('~New tab').click();
        // Add yopmail url to chrome
        await driver.$('//*[@text="Search or type web address"]').addValue(url);
        // Click on the first result
        await driver.$('//*[@resource-id="com.android.chrome:id/line_1"]').click();
        // await firstResult.click()
        await logSuccess(`Successfully navigated to: ${url}`);
}

//=======================================================================================

async function openYopmailInSafari() {
    // Open Safari
    await driver.activateApp(pageSafari.main.appIdentifier)
    // Click on tabs button
    await driver.$(pageSafari.main.tabsButton).click()
    // Click on private button
    await driver.$(pageSafari.main.privateButton).click()
    // Click on tabs button
    await driver.$(pageSafari.main.tabsButton).click()
    // Click on new tab button +
    await driver.pause(1000)
    await driver.$(pageSafari.main.newTabButton).click()
    // Click on the URL line
    await driver.$(pageSafari.main.urlLine).click()
    // Add yopmail URL
    await driver.$(pageSafari.main.urlInput).addValue('http://yopmail.com');
    // Click on the result
    await driver.$('-ios class chain:**/XCUIElementTypeCell[`name == "HistoryCompletionItem?isTopHit=true"`]/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther').click()
}

//=======================================================================================

async function openMailinatorInSafari() {
    // Open Safari
    await driver.activateApp(pageSafari.main.appIdentifier)
    // Click on tabs button
    await driver.$(pageSafari.main.tabsButton).click()
    // Click on private button
    await driver.$(pageSafari.main.privateButton).click()
    // Click on tabs button
    await driver.$(pageSafari.main.tabsButton).click()
    // Click on new tab button +
    await driver.pause(1000)
    await driver.$(pageSafari.main.newTabButton).click()
    // Click on google link
    await driver.$('-ios class chain:**/XCUIElementTypeCell[`label == "Google"`]/XCUIElementTypeOther').click()
    // Add mailinator URL in address line
    await driver.$('//XCUIElementTypeOther[@name="search"]/XCUIElementTypeOther[1]').addValue('https://www.mailinator.com');
    // Click on mailinator result
    await driver.$('//*[contains(@name, "https:// www . mailinator . com /")]').click()
    // Click on mailinator page
    await driver.$('-ios class chain:**/XCUIElementTypeLink[`label == "Mailinator"`][2]').click()
}

//=======================================================================================

async function bonza_signIn(email, password) {
    try {
        // Add email
        await driver.$(bonzaSignInPage.main.emailInput).addValue(email)
        // Add password
        await driver.$(bonzaSignInPage.main.passwordInput).addValue(password)
        // Click on sign in button
        await driver.$(bonzaSignInPage.main.signInButton).click()
    }
    catch (error) {
        console.error(clc.red(`🆘 Cannot log in to: ${email}`));
    }
}

//=======================================================================================

async function bonza_destinations_selectFromByName(destination) {
    // Get all text values from the destination list
    let allDestinationElements = await driver.$$('//android.widget.ScrollView[@content-desc="scrollview_ibe_depart-airport"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView')
    destinationArray = await Promise.all(allDestinationElements.map(async (element) => {
        return element.getText();
    }))

    // loop the destinationArray and click on the destination by its index
    for (let i = 0; i < destinationArray.length; i++) {
        if (destinationArray[i].includes(destination)) {
            await driver.$(`//android.widget.ScrollView[@content-desc="scrollview_ibe_depart-airport"]/android.view.ViewGroup/android.view.ViewGroup[${i + 1}]/android.widget.TextView`).click();
            console.log(`Successfully clicked on "From" destination: ${destination}`)
            break;
        }
    }
}

//=======================================================================================

async function bonza_destinations_selectToByName(destination) {
    // Get all text values from the destination list
    let allDestinationElements = await driver.$$('(//android.view.ViewGroup[@content-desc="touchable-opacity__ibe__inbound-airport-select"])/android.widget.TextView')
        destinationArray = await Promise.all(allDestinationElements.map(async (element) => {
            return element.getText();
        }))
    // loop the destinationArray and click on the destination by its index
    for (let i = 0; i < destinationArray.length; i++) {
        if (destinationArray[i].includes(destination)) {
            await driver.$(`(//android.view.ViewGroup[@content-desc="touchable-opacity__ibe__inbound-airport-select"])[${i + 1}]/android.widget.TextView`).click();
            console.log(`Successfully clicked on "To" destination: ${destination}`)
            break;
        }
    }
}

async function waitForElement(selector, timeout = 3000, desiredElementCount = 1, silent = false) {

    let elementCount = await driver.$$(selector).length;
    let currentTimeWaited = 0;

    while (elementCount < desiredElementCount) {

        await pause(250, true);
        currentTimeWaited += 250;

        if (currentTimeWaited > timeout) {
            if (!silent) {
                await logComment(`Element count with selector ${selector} did not equal or surpass ${desiredElementCount}`);
            }
            return false;
        }

        elementCount = await driver.$$(selector).length;

    }

    if (!silent) {
        await logComment(`Element count with selector ${selector} reached ${elementCount}, equalling or exceeding the required ${desiredElementCount}`);
    }
    return true;

}

//=======================================================================================

async function convertDateType(dateInCodeFormat) {

    // yyyy-mm-dd => dd MMM yyyy

    let day = dateInCodeFormat.split("-")[2];
    let month = dateInCodeFormat.split("-")[1];
    let year = dateInCodeFormat.split("-")[0];

    let monthName;

    switch (month) {

        case "01":
            monthName = "Jan";
            break;
        case "02":
            monthName = "Feb";
            break;
        case "03":
            monthName = "Mar";
            break;
        case "04":
            monthName = "Apr";
            break;
        case "05":
            monthName = "May";
            break; 
        case "06":
            monthName = "Jun";
            break;
        case "07":
            monthName = "Jul";
            break;
        case "08":
            monthName = "Aug";
            break;
        case "09":
            monthName = "Sep";
            break;
        case "10":
            monthName = "Oct";
            break;
        case "11":
            monthName = "Nov";
            break;
        case "12":
            monthName = "Dec";
            break;
        default:
            await logError(`Unknown month value: ${month}`);

    }

    return day + " " + monthName + " " + year;

}

//=======================================================================================

async function convertNumberToWord(number) {

    switch (number) {

        case 1:
            return "One";
        case 2:
            return "Two";
        case 3:
            return "Three";
        case 4:
            return "Four";
        case 5:
            return "Five";
        case 6:
            return "Six";
        case 7:
            return "Seven";
        case 8:
            return "Eight";
        case 9:
            return "Nine";
        case 10:
            return "Ten";
        default:
            await logError("Convert number to word only functions up to input 10");
            return "NA";

    }

}

//=======================================================================================

async function sumOfArray(array) {

    sum = 0;

    for (let i = 0; i < array.length; i++) {

        let arrayEntry = array[i];
        sum += arrayEntry;

    }

    return sum;

}

//=======================================================================================

async function getLastDayOfMonth(monthNumber) {

    switch (monthNumber) {

        case 1:
            return 31;
        case 2:
            return 28;
        case 3:
            return 31;
        case 4:
            return 30;
        case 5:
            return 31;
        case 6:
            return 30;
        case 7:
            return 31;
        case 8:
            return 31;
        case 9:
            return 30;
        case 10:
            return 31;
        case 11:
            return 30;
        case 12:
            return 31;
        default:
            await logError("Invalid index passed to getLastDayOfMonth() - index must be between 1 and 12 inclusive");
            return -1;

    }

}

async function convertMonthNameToNumber(monthName) {

    const months = {
        January: '01',
        February: '02',
        March: '03',
        April: '04',
        May: '05',
        June: '06',
        July: '07',
        August: '08',
        September: '09',
        October: '10',
        November: '11',
        December: '12',
    };

    return months[monthName];

}

async function getPassengerType(nAdults, nYouths, nChildren, nInfants, index) {

    let type;

    if (index < nAdults) {
        type = "adt";
    } else if (index < nAdults + nYouths) {
        type = "yth";
    } else if (index < nAdults + nYouths + nChildren) {
        type = "chd";
    } else {
        type = "inf";
    }

    return type;

}

//=======================================================================================

async function logMessage(commentMessage) {
    console.log(`${commentMessage}`);
}

//=======================================================================================

async function logComment(commentMessage) {
    console.log(`☑️ ${commentMessage}`);
}

//=======================================================================================

async function logSuccess(commentMessage) {
    console.log(clc.green(`✅  ${commentMessage}`));
}

//=======================================================================================

async function logError(errorMessage) {
    console.error(clc.red(`🆘 ${errorMessage}`));
}

//=================================== START HOME PAGE ===================================

async function homePage_validateDepartDate(dateString) {

    let dateNumber = Date.parse(dateString);
    let todayNumber = new Date();

    if (dateNumber < todayNumber) {

        logComment("Outbound date is before the present day - redefining as current day");
        return (new Date()).toISOString().slice(0, 10);

    } else {

        // current date is valid

        logComment("Outbound date is defined correctly");
        return dateString;

    }

}

async function homePage_validateInboundDate(dateString, outboundDateString) {

    let dateNumber = Date.parse(dateString);
    let outboundDateNumber = Date.parse(outboundDateString);

    if (dateNumber <= outboundDateNumber) {

        logComment("Inbound date is before the outbound date - redefining as three days after outbound");
        let outboundDateDate = new Date(outboundDateString);
        outboundDateDate.setDate(outboundDateDate.getDate() + 3);
        return outboundDateDate.toISOString().slice(0, 10);

    } else {

        // current date is valid
        logComment("Return date is defined correctly");
        return dateString;

    }

}

async function homePage_selectValidDate(firstDate, flightType, limit = 30, monthScrollLimit = 3) {

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

    let attemptedToScrollToPriorMonth = false;
    let firstMonth = true;

    // there are three ways the value is located: completely unselected, "in selected range", and selected endpoint
    // we will put them in an array to loop over via try/catches
    // a, b, and c are dummy values which will be replaced
    let dateSelector = ["a", "b", "c"];

    while (true) {

        let enableTestLocator = `//*[@content-desc="${operativeDate}"]`;
        dateSelector[0] = `//*[@content-desc="${operativeDate}"]/android.widget.TextView`;
        dateSelector[1] = `//*[@content-desc="${operativeDate}"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView`;
        dateSelector[2] = `//*[@content-desc="${operativeDate}"]/android.view.ViewGroup/android.widget.TextView`;

        let datePresent;

        try {

            datePresent = await checkIsEnabled(enableTestLocator);
            if (datePresent === false && seekInvalid) {
                return operativeDate;
            }

        } catch (error) {
            
            // wrong month

            // step 1: check if the prior month is accessible given the edge case overlapping months
            if (!attemptedToScrollToPriorMonth) {
                await logComment(`Month/Year doesn't appear to be in view for ${flightType} date ${operativeDate} - first attempting to scroll to prior month`);
                //await scrollTo(500, 500, 500, 1500, true);
                await scrollByKeyPress("u", 10);
                attemptedToScrollToPriorMonth = true;
                continue;
            }

            // step 2: check if desired month is different from first displayed month, adjusting date if so - but only on first run
            if (firstMonth) {

                firstMonth = false;

                await logComment(`Month/Year doesn't appear to be in view for ${flightType} date ${operativeDate} - checking if the first available date is after ${operativeDate} and equating them if necessary`);

                let desiredMonth = operativeDate.split("-")[1];
                let desiredYear = operativeDate.split("-")[0];
                let testMonthNumber = parseInt(desiredMonth) + 1;
                let testYearNumber = parseInt(desiredYear);
                if (testMonthNumber === 13) {
                    testMonthNumber = 1;
                    testYearNumber++;
                }
                let testDay = "01";
                let testMonth = testMonthNumber.toString();
                if (testMonth.length === 1) {
                    // adds zero padding if necessary
                    testMonth = "0" + testMonth;
                }
                let testYear = testYearNumber.toString();
                let testDate = testYear + "-" + testMonth + "-" + testDay;
                let enableHypotheticalLocator = `//*[@content-desc="${testDate}"]`;
                try {
                    await checkIsEnabled(enableHypotheticalLocator);
                    // desired date is before the first displayed month - equating them and repeating
                    await logComment(`${operativeDate} is before the first displayed date of ${testDate} - equating them and repeating`);
                    operativeDate = testDate;
                    continue;
                } catch (error_2) {
                    // desired date is likely just not in view yet
                }

            }

            // step 3: change month

            await logComment(`Month/Year doesn't appear to be in view for ${flightType} date ${operativeDate} - scrolling and trying again`);
            await scrollByKeyPress("d", 10);
            //if (!await scrollTo(500, 1500, 500, 500, true)) {
            //    await logError(`Unable to find ${flightType} date ${operativeDate} and can no longer scroll to get further months`);
            //    return "error";
            //}
            monthScrolls++;

            if (monthScrolls > monthScrollLimit) {
                await logError(`Unable to find ${flightType} date ${operativeDate} and can no longer scroll to get further months`);
                return "error";
            }

            continue;
        }

        if (datePresent && !seekInvalid) {

            let selectorFound = false;
            for (let i = 0; i < dateSelector.length; i++) {

                try {
                    await clickOn(dateSelector[i], true, 1000);
                    selectorFound = true;
                    break;
                } catch(error) {
                    // next
                }

            }

            if (!selectorFound) {
                await logError(`Unable to click ${flightType} date ${operativeDate}`);
                return "error";
            }

            await logSuccess(`Successfully found a valid date for ${flightType} - ${operativeDate}`);
            await pause(500);
            return operativeDate;

        }

        // only reaches here if the date is not valid; increments by 1 if not hit limit

        if (attempts > limit) {

            await logError(`Unable to find valid ${flightType} date - last attempted ${operativeDate}`);
            return operativeDate;

        }

        if (!seekInvalid) {
            await logComment(`Unable to find valid ${flightType} flight at ${operativeDate} - incrementing by 1 and trying again`);
        } else {
            await logComment(`Unable to find invalid date ${operativeDate} - incrementing by 1 and trying again`);
        }

        let currentOperativeDate = new Date(operativeDate);
        currentOperativeDate.setDate(currentOperativeDate.getDate() + 1);
        operativeDate = currentOperativeDate.toISOString().slice(0, 10);
        attempts += 1;
        await pause(500);

    }

}

async function homePage_selectDepartDate(departDate) {

    departDate = await homePage_validateDepartDate(departDate);
    departDate = await homePage_selectValidDate(departDate, "outgoing");
    return departDate;

}

async function homePage_selectReturnDate(departDate, returnDate) {

    if (returnDate == null || returnDate == '') {

        await logComment("No return date specified - proceeding as one-way flight");
        return "n/a";

    }

    if (returnDate.toLowerCase() != "n/a") {

        await logComment("Proceeding as return flight");
        returnDate = await homePage_validateInboundDate(returnDate, departDate);

        // Select returning date
        inboundDate = await homePage_selectValidDate(returnDate, "return");
        return inboundDate;

    } 

}

async function homePage_clickOnDeterminedDate(determinedDate, testForFailure = false) {

    let enableTestLocator = `//*[@content-desc="${determinedDate}"]`;

    // there are three ways the value is located: completely unselected, "in selected range", and selected endpoint
    // we will put them in an array to loop over via try/catches
    // a, b, and c are dummy values which will be replaced
    let dateSelector = ["a", "b", "c"];

    if (await checkIsEnabled(enableTestLocator) || testForFailure) {

        dateSelector[0] = `//*[@content-desc="${determinedDate}"]/android.widget.TextView`;
        dateSelector[1] = `//*[@content-desc="${determinedDate}"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView`;
        dateSelector[2] = `//*[@content-desc="${determinedDate}"]/android.view.ViewGroup/android.widget.TextView`;

        let selectorFound = false;
        for (let i = 0; i < dateSelector.length; i++) {

            try {
                await clickOn(dateSelector[i], true, 1000);
                selectorFound = true;
                break;
            } catch(error) {
                // next
            }

        }

        if (!selectorFound) {
            if (!testForFailure) {
                await logError(`Unable to click date ${determinedDate}`);
                return;
            } else {
                await logSuccess(`Unable to click date ${determinedDate}`);
                return;
            }
        }

        await logSuccess(`Selected ${determinedDate}`);

    } else {
        await logError(`${determinedDate} is not an enabled date!`);
    }

}

async function homePage_resetDates() {
    // Click on reset dates
    await clickOn(bonzaBookTripPage.bookTrip.resetDatesButton);
}

async function homePage_confirmDates() {
    // Click on confirm dates
    await clickOn(bonzaBookTripPage.bookTrip.confirmDatesButton);
}

async function homePage_getDateText() {

    let departDateText = await getElementText(bonzaBookTripPage.bookTrip.departDateText);
    let returnDateText = await getElementText(bonzaBookTripPage.bookTrip.returnDateText);

    return {'depart': departDateText, 'return': returnDateText};

}

// this will be defined by the automation, no need to change it
let homePage_finalPassengerCount = {

    'adt': 0,
    'yth': 0,
    'chd': 0,
    'inf': 0

};

async function homePage_getFinalPassengerCount() {

    return homePage_finalPassengerCount;

}

async function homePage_selectPassengers(nAdults, nYouths, nChildren, nInfants, removeSanity = false, validationDesired = {}) {

    // validationDesired = {'adt': 0, 'yth': 0, 'chd': 0, 'inf': 0};

    if (!removeSanity) {

        // validating passenger counts

        if (nAdults == 0) {

            await logError("The number of adults cannot be zero - setting to 1");
            nAdults = 1;

        }

        if (nChildren > nAdults) {

            await logError("The number of children cannot exceed the number of adults - setting to the number of adults");
            nChildren = nAdults;

        }

        if (nInfants > nAdults) {

            await logError("The number of infants cannot exceed the number of adults - setting to the number of adults");
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
        let current = await homePage_getCurrentCount(process['name']);
        let target = process['target'];

        // adding this validation here just means not having to repeat it elsewhere

        if (target > 9) {

            await logError("The number of passengers in a single category cannot exceed 9 - setting to 9");
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

                await clickOn(process['minus']);
                await pause(250);

            }

        } else {

            // regular

            for (let i = 0; i < clicks; i++) {

                await clickOn(process['plus']);
                await pause(250);

            }

        }

        // validating that the counts equal the expected amounts and adding to a dictionary

        current = await homePage_getCurrentCount(process['name']);

        if (removeSanity) {

            // if the sanity is removed, it is for testing - thus the actual target will be put here
            target = validationDesired[process['name']];

        }

        if (target === current) {
            await logSuccess(`${process['name'].toUpperCase()} selected count matches expectations`);
        } else {
            await logError(`${process['name'].toUpperCase()} selected count does not match expectations - expected ${target} vs actual ${current}`);
        }

        // even if error, nonetheless add to data
        homePage_finalPassengerCount[process['name']] = current;

    }
    // Click on confirm travellers button
    await driver.$(bonzaBookTripPage.bookTrip.confirmTravellersButton).click();
}

async function homePage_resetPassengers() {

    let validationDesired = {'adt': 0, 'yth': 0, 'chd': 0, 'inf': 0};
    await homePage_selectPassengers(0, 0, 0, 0, true, validationDesired);

}

async function homePage_getCurrentCount(name) {

    switch (name) {

        case "adt":
            return parseInt(await getElementText(bonzaBookTripPage.bookTrip.adultsSelectedNumber));
        case "yth":
            return parseInt(await getElementText(bonzaBookTripPage.bookTrip.youthsSelectedNumber));          
        case "chd":
            return parseInt(await getElementText(bonzaBookTripPage.bookTrip.childrenSelectedNumber));
        case "inf":
            return parseInt(await getElementText(bonzaBookTripPage.bookTrip.infantsSelectedNumber));
    }

}

//==================================== END HOME PAGE ====================================

async function debugStop() {
    // just so it's easy to ctrl+f for it
    console.log("===== EXECUTION STOPPED DUE TO DEBUG FUNCTION =====");
    await pause(200000);
}

module.exports = {
    
    validateElementText,
    printElementText,
    fetchElementText,
    getElementText,
    getRecoveryCode,
    addValue,
    enhancedAddValue,
    clickOn,
    enhancedClickOn,
    clickIfExists,
    clickByIndex,
    clickByText,
    clickByCoordinates,
    saveWeatherDataAPI,
    saveWeatherDataAPP,
    saveWeatherDataWEB,
    compareWeatherData,
    multipleBack,
    multipleKeyboardBackspace,
    selectRandomInteger,
    selectRandomIndex,
    comparePrices,
    checkIsEnabled,
    openUrlInChrome,
    openYopmailInSafari,
    openMailinatorInSafari,
    removeKeyboard,
    clearValue,
    enhancedClearValue,
    randomFirstName,
    randomMiddleName,
    randomLastName,
    randomCity,
    randomAddress,
    pause,
    scrollTo,
    validateElementNotDisplayed,
    validateElementDisplay,
    scrollViaUIScrollable,
    findAndScrollToElement,
    scrollFlightWindow,
    scrollIntoView,
    scrollByKeyPress,
    waitForElement,
    isNumber,
    extractNumber,
    convertDateType,
    convertNumberToWord,
    sumOfArray,
    getLastDayOfMonth,
    convertMonthNameToNumber,
    getPassengerType,
    logMessage,
    logComment,
    logSuccess,
    logError,
    homePage_selectDepartDate,
    homePage_selectReturnDate,
    homePage_selectValidDate,
    homePage_clickOnDeterminedDate,
    homePage_getDateText,
    homePage_resetDates,
    homePage_confirmDates,
    homePage_getFinalPassengerCount,
    homePage_selectPassengers,
    homePage_resetPassengers,
    homePage_getCurrentCount,
    debugStop,
    multipleClicks,
    randomPassword,
    passengers_selectPassengers,
    //------------------------------------------------
    destinations_selectByNameOrCode,
    // destinations_selectRandom --- TBD,
    //------------------------------------------------
    calendar_selectDatesRelativeToToday,
    calendar_selectDepartDateRelativeToToday,
    calendar_selectReturnDateRelativeToToday,
    calendar_selectRoundTripDatesByActualDate,
    calendar_selectOneWayDatesByActualDate,
    calendar_selectFirstAvailableRoundTripDates,
    calendar_selectFirstAvailableOneWayDate,
    calendar_selectOneWayDateByIndex,
    calendar_selectRoundTripDatesByIndex,
    calendar_todayPlus,
    getCurrentMonthYear,
    //------------------------------------------------
    addPromoCode,
    isAppReady,
    //------------------------------------------------
    searchResults_selectRoundTripFares,
    searchResults_selectDepartFare,
    searchResults_selectReturnFare,
    // ------------------------------------------------
    paxInfo_selectBirthDate,
    paxInfo_addTitle,
    paxInfo_addNames,
    paxInfo_addFirstName,
    paxInfo_addLastName,
    paxInfo_addCity,
    paxInfo_addEmail,
    paxInfo_addSpecificNames,
    paxInfo_addPhoneNumber,
    //------------------------------------------------
    bonza_destinations_selectOneWayDestinationAndDate,
    bonza_destinations_selectRoundTripDestinationAndDate,
    bonza_clearAllPopups,
    bonza_signIn,
    bonza_destinations_selectFromByName,
    bonza_destinations_selectToByName,
    //------------------------------------------------
    validateAttributeValue,
    validateAttributeText,
    validateAttributeNotIncludesValue,
    iOSScroll,
    forgotPassword_validateEmailFormat,
    login,
    login_validateEmailFormat,
    signUp_validateEmailFormat,
    //------------------------------------------------
    seats_selectFirstAvailableSeat,
    //------------------------------------------------
    signUp_addTitle,
    signUp_selectBirthDate,
    signUp_addEmail,
    signUp_addPhoneNumber,
    //------------------------------------------------
    payment_zooz,

};

