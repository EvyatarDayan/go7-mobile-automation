const global = require("../../../commands.conf");
const pageLogin = require("../../../pages/go7/page-go7-login");
const pageProfile = require("../../../pages/go7/page-go7-profile");
const pageSearch = require("../../../pages/go7/page-go7-search");
const pageFrame = require("../../../pages/go7/page-go7-frame");
// const {driver} = require("@wdio/globals");

// User 1
let user1Email = 'tomato1@yopmail.com';
let user1Password = 'Password1!';
let user1FirstName = 'Tomato';
let user1LastName = 'One';
let user1Initials = 'TO';
// User 2
let user2Email = 'tomato2@yopmail.com';
let user2Password = 'Password1!';
let user2FirstName = 'Tomato';
let user2LastName = 'Two';
let user2Initials = 'TT';

describe('Login', () => {

    before('Validate app is ready',async () => {
        await global.isAppReady()
    });

    it('Navigate to login page', async () => {
        // Click on My GO7 button
        await global.clickOn(pageSearch.main.myGo7Button)
        // Click on "Login or sign up" button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
        // Click on login tab
        await global.clickOn(pageLogin.main.loginTab)
    });

    it('Try to login with existing user and wrong password', async () => {
        await global.login(user1Email, 'FakePassword1!')
        // Validate error message
        await global.pause(2000)
        await global.validateElementText(pageLogin.main.loginFailureMessage, 'Incorrect user name or password for customer')
        await global.pause(1000)
        // Clear email input
        await global.clearValue(pageLogin.main.emailInput)
        // Clear password input
        await global.clearValue(pageLogin.main.passwordInput)
    });

    it('Login with valid user 1', async () => {
        // Login with valid user 1
        await global.login(user1Email, user1Password)
        // Validate initials
        await global.pause(3000)
        await global.validateElementText(pageProfile.main.usernameInitials, user1Initials)
        // Validate name
        await global.validateElementText(pageProfile.main.loginOrSignUpTitle, `${user1FirstName} ${user1LastName}`)
    });

    it('Log out user 1', async () => {
        // Click on log out button
        await global.clickOn(pageProfile.main.logoutButton)
        // Click on Login or sign up button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
    });

    it('Login with valid user 2', async () => {
        await global.login(user2Email, user2Password)
        // Validate initials
        await global.pause(3000)
        await global.validateElementText(pageProfile.main.usernameInitials, user2Initials)
        // Validate name
        await global.validateElementText(pageProfile.main.loginOrSignUpTitle, `${user2FirstName} ${user2LastName}`)
    });

    it('Log out user 2', async () => {
        // Click on log out button
        await global.clickOn(pageProfile.main.logoutButton)
        // Click on Login or sign up button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
    });

    it('Login with valid user 1 (again)', async () => {
        // Login with valid user 1
        await global.login(user1Email, user1Password)
        // Validate initials
        await global.pause(3000)
        await global.validateElementText(pageProfile.main.usernameInitials, user1Initials)
        // Validate name
        await global.validateElementText(pageProfile.main.loginOrSignUpTitle, `${user1FirstName} ${user1LastName}`)
    });

    it('Log out user 1', async () => {
        // Click on log out button
        await global.clickOn(pageProfile.main.logoutButton)
        // Click on Login or sign up button
        await global.clickOn(pageProfile.main.loginOrSignUpTitle)
    });

});