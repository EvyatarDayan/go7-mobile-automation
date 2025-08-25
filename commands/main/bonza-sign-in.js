// bonza-sign-in

const global = require("../../commands.conf");
const bonzaSignInPage = require("../../pages/bonza/page-bonza-sign-in");
const clc = require("cli-color");

module.exports = async (email, password)=>{
    try {
        // Add email
        await global.addValue(bonzaSignInPage.main.emailInput, email)
        // Add password
        await global.addValue(bonzaSignInPage.main.passwordInput, password)
        // Click on sign in button
        await global.clickOn(bonzaSignInPage.main.signInButton)
    }
    catch (error) {
        console.error(clc.red(`🆘 Cannot login to: ${email}`));
    }
};
