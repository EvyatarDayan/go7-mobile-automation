"use strict";

let wd = require("selenium-webdriver"),
    By = wd.By,
    until = wd.until;
const global = require("../../../../../commands.conf");
const bonzaMainPage = require("../../../../../pages/bonza/page-bonza-main");
const bonzaSideMenuPage = require("../../../../../pages/bonza/page-bonza-side-menu");
const bonzaSignInPage = require("../../../../../pages/bonza/page-bonza-sign-in");


// Setting Desired Capabilities.
let desiredCaps = {
    path: '/wd/hub',
    platformName: 'Android',
    "appium:deviceName": 'pixel-xl-api-33',
    "appium:app": '/Users/evyatar.da/Documents/AndroidApps/bz-5.2(25)-uat.apk',
    "appium:platformVersion": '11',
    "appium:automationName": "UiAutomator2",
    "appium:browserName": "chrome",
    "appium:autoGrantPermissions": true,
    // "appium:dontStopAppOnReset": true,
    "appium:enableMultiWindows": true,
    // browserName: '',
};

describe('Sign in', ()=> {


    it('Navigate to sign up', async () => {

        // //Initiating the Driver
        let driver = await new wd.Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).forBrowser('chrome').build();

        // Confirm update popup if exists
        await global.clickIfExists(bonzaMainPage.main.updateNoButton)
        await global.pause(200)
        // Open the menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        await global.pause(200)
        // Click on Login
        await global.clickOn(bonzaSideMenuPage.main.login)
        await global.pause(200)
        // Click on join now
        await global.clickOn(bonzaSignInPage.main.joinNowButton)
    });

});

// async function testEribank() {
//     // //Initiating the Driver
//     let driver = await new wd.Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build();
//
//     let okElements = await driver.findElements(By.xpath("//*[@text='OK']"));
//
//     if ( okElements.length > 0) {
//         let okElement = await driver.findElement(By.xpath("//*[@text='OK']"));
//         await okElement.click();
//     }
//
//     // Locating the element
//     const userElement = await driver.findElement(By.xpath("//*[@text='Username']"));
//     // Automation command.
//     await userElement.sendKeys("company");
//     const passwordElement = await driver.findElement(By.xpath("//*[@text='Password']"));
//     await passwordElement.sendKeys("company");
//     const loginElement = await driver.findElement(By.xpath("//*[@text='Login']"));
//     await loginElement.click();
//
//     await driver.quit();
// }
// testEribank()

