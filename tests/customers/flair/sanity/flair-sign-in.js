const global = require("../../../../commands.conf");
// const data = require("../../data");
const flairMainPage = require ('../../../../pages/flair/page-flair-main');
const flairSignInPage = require ('../../../../pages/flair/page-lair-sign-in');
const flairSideMenuPage = require ('../../../../pages/flair/page-flair-side-menu');


let email = 'flair1@yopmail.com';
let password = 'Password1!';

describe('Navigation', ()=>{

    it('Sign in',async ()=>{

        // Click on "Account"
        await global.pause(4000)
        // await global.clickOn(flairMainPage.toolbar.accountButton)
        await global.clickOn(flairMainPage.sideMenu.sideMenuButton)
        await global.clickOn(flairSideMenuPage.main.login)
        await global.pause(5000)

        // Add email address
        await global.addValue(flairSignInPage.main.emailInput, email)
        // await global.pause(500)
        // Add password
        await global.addValue(flairSignInPage.main.passwordInput, password)
        await global.pause(500)
        // Click on Sign in button
        await global.clickOn(flairSignInPage.main.signInButton)
        await global.pause(2000)
        // await global.clickOn('//android.widget.Button[@resource-id="android:id/button1"]')
        await global.clickOn(flairMainPage.toolbar.statusButton)
        await global.pause(3000)
        await global.clickOn(flairMainPage.sideMenu.sideMenuButton)
        await global.clickOn(flairSideMenuPage.main.login)
        // Add email address
        await global.addValue(flairSignInPage.main.emailInput, email)
        // await global.pause(500)
        // Add password
        await global.addValue(flairSignInPage.main.passwordInput, password)
        await global.pause(500)
        await global.clickOn(flairSignInPage.main.signInButton)

    });

})
