const global = require("../../../../../commands.conf");
const data = require("../../../../../data");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const {driver} = require("@wdio/globals");

let email1 = data.users.bonza.UAT.USER_1.USERNAME
let password1 = data.users.bonza.UAT.USER_1.PASSWORD;
let email2 = data.users.bonza.UAT.USER_2.USERNAME
let password2 = data.users.bonza.UAT.USER_2.PASSWORD;

describe('Sign in', ()=>{

    before('Clear all popups',async () => {
        // Confirm update popup if exists
        // await global.clickIfExists(bonzaMainPage.main.updateNoButton)
        // Confirm location popup
        await global.clickOn('~Allow Once')
        // Click on next on app activity dialog
        await global.clickIfExists('~Next')
    });

    it('Sign in to user 1',async ()=> {
        // Open sign in page
        await global.clickOn('-ios predicate string:label == "Account"')
        // Add user 1
        await global.addValue('~input__account__sign-in__email-address', email1)
        // Add password for user 1
        await global.addValue('-ios class chain:**/XCUIElementTypeOther[`label == "Password"`][2]', password1)
        // Click on sign in nutton (twice is needed)
        await global.clickOn('~btn__sign-in')
        await global.clickOn('~btn__sign-in')
        // Scroll up
        await global.pause(3000)
        await driver.touchAction([
            {action: 'longPress', x: 185, y: 700},
            {action: 'moveTo', x: 185, y: 228},
            'release'
        ]);
        // Validate the user
        await global.validateElementText('-ios class chain:**/XCUIElementTypeOther[`label == "Profile Basic info Title Mrs First name Middle name Last name Date of birth  13 August 1976 Mobile number 🇮🇱 +972 Street City Israel Haifa District Postcode Yes, I\'d love to receive emails from Bonza with awesome travel deals, holiday inspiration and ideas. Privacy policy Login info Username bonza1@yopmail.com Password ●●●●●●●● Have account questions? Check out our FAQs Horizontal scroll bar, 1 page Vertical scroll bar, 2 pages Home Book My Trips Routes In-Flight Account Vertical scroll bar, 1 page"`][20]', email1)
    });

    it('Sign out',async ()=> {
        // Open the menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Scroll up
        await global.pause(1000)
        await driver.touchAction([
            {action: 'longPress', x: 185, y: 700},
            {action: 'moveTo', x: 185, y: 228},
            'release'
        ]);
        await global.pause(1000)
        // Click on sign out button
        await global.clickOn('-ios class chain:**/XCUIElementTypeOther[`label == "Sign out"`][3]')
        await global.pause(1000)
        // Open the menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Scroll down
        await global.pause(1000)
        await driver.touchAction([
            {action: 'longPress', x: 764, y: 110},
            {action: 'moveTo', x: 741, y: 2375},
            'release'
        ]);
        // await global.scrollTo(764, 110, 741, 2375)
        await global.pause(1000)
        // Validate "Login to your bonza account" title
        await global.validateElementText('~touchable-opacity__general__log-in', 'Log in to your Bonza account')
        // Close side menu
        await global.clickOn('-ios class chain:**/XCUIElementTypeOther[`label == "Log in to your Bonza account Home Travel Alerts Flight Book Flights My Trips Boarding Pass In-Flight Routes Support FAQs Chat with us Support Legal Version: 1.5.0 About Us Network Logger"`][2]/XCUIElementTypeOther[1]/XCUIElementTypeOther')
    });

    it('Sign in to user 2',async ()=> {
        // Open sign in page
        await global.clickOn('-ios predicate string:label == "Account"')
        // // Click on Login
        // await global.clickOn('~touchable-opacity__general__log-in')
        // Add user 2
        await global.addValue('~input__account__sign-in__email-address', email2)
        // Add password for user 2
        await global.addValue('-ios class chain:**/XCUIElementTypeOther[`label == "Password"`][2]', password2)
        // Click on sign in nutton (twice is needed)
        await global.clickOn('~btn__sign-in')
        await global.clickOn('~btn__sign-in')
        // Scroll up
        await global.pause(3000)
        await driver.touchAction([
            {action: 'longPress', x: 185, y: 700},
            {action: 'moveTo', x: 185, y: 228},
            'release'
        ]);
        // Validate the user
        await global.validateElementText('-ios class chain:**/XCUIElementTypeOther[`label == "Basic info Title Mr First name Middle name Last name Date of birth  13 August 1978 Mobile number 🇮🇱 +972 Street City United States California Postcode Yes, I\'d love to receive emails from Bonza with awesome travel deals, holiday inspiration and ideas. Privacy policy Login info Username bonza2@yopmail.com Password ●●●●●●●● Have account questions? Check out our FAQs Horizontal scroll bar, 1 page Vertical scroll bar, 2 pages Home Book My Trips Routes In-Flight Account"`]', email2)
    });
})
