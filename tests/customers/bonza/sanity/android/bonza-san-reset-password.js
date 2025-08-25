// This test validate reset password from 2 locations:
// 1. "Forgot password" link in login page.
// 2. Click on password field in profile page (while logged in).

const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaSignInPage = require ('../../../../../pages/bonza/page-bonza-sign-in');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');
const bonzaProfilePage = require ('../../../../../pages/bonza/page-bonza-profile');
const bonzaResetPasswordPage = require ('../../../../../pages/bonza/page-bonza-reset-password');
const yopmailPage = require ('../../../../../pages/ThirdParty/page-yopmail');
const {driver} = require("@wdio/globals");
const clc = require("cli-color");
const NWTools = require("nightwatch-tools");
const randomNumber = NWTools.randomString(4,'1234567890');

let mailServiceUrl = yopmailPage.main.url;
let email = 'martin.cihp@yopmail.com';
let newPassword = `Password${randomNumber}!`;
let resetCode = [];

describe('Reset password', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Request reset code (from forgot password link)',async ()=> {
        // Open the menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on Login
        await global.clickOn(bonzaSideMenuPage.main.login)
        // Click on Forgot password button
        await global.clickOn(bonzaSignInPage.main.forgotPasswordLink)
        // Add email address
        await global.addValue(bonzaResetPasswordPage.main.emailAddressInput, email)
        // Click on request code button
        await global.clickOn(bonzaResetPasswordPage.main.requestCodeButton)
    });

    it ('Get the code from the email',async ()=> {
        await global.openUrlInChrome(mailServiceUrl)
        // Add value in the mailbox field
        await global.addValue(yopmailPage.main.mailboxInput, email)
        // Click on the arrow button
        await global.clickOn(yopmailPage.main.mailboxArrowButton)
        // Select the newest message in the mailbox
        await global.clickOn(yopmailPage.main.newestMessage)

        // Extract the code from the mail
        const resetCodeElement = await driver.$(yopmailPage.main.resetPasswordCodeText);
        resetCode.push((await resetCodeElement.getText()).replace('Your password reset key: ', ''))
        console.log(`Reset code is: ${resetCode[0]}`)
    });

    it ('Reset the password using the reset code',async ()=> {
        // Switch back to Bonza app
        await driver.activateApp('com.bonzamobile')
        // Add reset code
        await global.addValue(bonzaResetPasswordPage.main.resetPasswordCodeInput, resetCode[0])
        // Add new password
        await global.addValue(bonzaResetPasswordPage.main.newPasswordInput, newPassword)
        // Add confirm password
        await global.addValue(bonzaResetPasswordPage.main.confirmPasswordInput, newPassword)
        // Click on reset password button
        await global.clickOn(bonzaResetPasswordPage.main.resetPasswordButton)
        // Validate password saved message
        await global.validateElementText(bonzaResetPasswordPage.main.passwordSavedText, 'Your new password has been saved.')
        // Click on close button
        await global.clickOn(bonzaResetPasswordPage.main.passwordSavedCloseButton)
    })

    it ('Sign in with the new password',async ()=> {
        // Add email
        await global.addValue(bonzaSignInPage.main.emailInput, email)
        // Add the new password
        await global.addValue(bonzaSignInPage.main.passwordInput, newPassword)
        // Click on sign in button
        await global.clickOn(bonzaSignInPage.main.signInButton)
        // Scroll up
        await global.pause(3000)
        await global.scrollTo(616, 2000, 703, 308)
        // Validate user logged in
        await global.validateElementText(bonzaProfilePage.main.usernameInput, email)
    })

//=====================================================================================================================

    it ('Request reset code (from profile password link)',async ()=> {
        // Click on password field
        await global.pause(1000)
        await global.clickOn(bonzaProfilePage.main.passwordInput)
        // Click on send security code button
        await global.clickOn(bonzaResetPasswordPage.main.sendSecurityCodeButton)
    })

    it ('Get the code from the email',async ()=> {
        await global.openUrlInChrome(mailServiceUrl)
        // Add value in the mailbox field
        await global.addValue(yopmailPage.main.mailboxInput, email)
        // Click on the arrow button
        await global.clickOn(yopmailPage.main.mailboxArrowButton)
        // Select the newest message in the mailbox
        await global.clickOn(yopmailPage.main.newestMessage)

        // Extract the code from the mail
        const resetCodeElement = await driver.$(yopmailPage.main.resetPasswordCodeText);
        resetCode.push((await resetCodeElement.getText()).replace('Your password reset key: ', ''))
        console.log(`Reset code is: ${resetCode[1]}`)
    });

    it ('Reset the password using the reset code',async ()=> {
        // Switch back to Bonza app
        await driver.activateApp('com.bonzamobile')
        // Add reset code
        await global.addValue(bonzaResetPasswordPage.main.resetPasswordCodeInput, resetCode[1])
        // Add new psaaword
        await global.addValue(bonzaResetPasswordPage.main.newPasswordInput, newPassword)
        // Add confirm password
        await global.addValue(bonzaResetPasswordPage.main.confirmPasswordInput, newPassword)
        // Click on reset password button
        await global.clickOn(bonzaResetPasswordPage.main.resetPasswordButton)
        // Validate password saved message
        await global.validateElementText(bonzaResetPasswordPage.main.passwordSavedText, 'Your new password has been saved.')
        // Click on close button
        await global.clickOn(bonzaResetPasswordPage.main.passwordSavedCloseButton)
    })

    it ('Sign in with the new password',async ()=> {
        // Add email
        await global.addValue(bonzaSignInPage.main.emailInput, email)
        // Add the new password
        await global.addValue(bonzaSignInPage.main.passwordInput, newPassword)
        // Click on sign in button
        await global.clickOn(bonzaSignInPage.main.signInButton)
        // Scroll up
        await global.pause(3000)
        await global.scrollTo(616, 2000, 703, 308)
        // Validate user logged in
        await global.validateElementText(bonzaProfilePage.main.usernameInput, email)
    })

    it ('Report' ,async ()=> {
        console.log(clc.yellow('\n<<<<<<<<<<<<<<<<<<<< REPORT: >>>>>>>>>>>>>>>>>>>>'));
        console.log(clc.yellow(`Email: ${email}`))
        console.log(clc.yellow(`New password: ${newPassword}`))
        console.log(clc.yellow(`Reset codes used in this test: ${resetCode[0]}, ${resetCode[1]}`))
        console.log(clc.yellow('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>\n'));
    })
})
