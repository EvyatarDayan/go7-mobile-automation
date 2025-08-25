const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');
const bonzaProfilePage = require ('../../../../../pages/bonza/page-bonza-profile');

let usersList = [
    { email: 'martin.yseh@yopmail.com', password: 'Password4585!' },
    { email: 'martin.eznw@yopmail.com', password: 'Password9162!' },
    { email: 'martin.sxfp@yopmail.com', password: 'Password7149!' },
];

describe('Sign in', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

        it('Sign in to user 1',async ()=> {
            for (const user of usersList) {
                // Open the menu
                await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
                // Click on Login
                await global.clickOn(bonzaSideMenuPage.main.login)
                // Sign in to user 1
                await global.bonza_signIn(user.email, user.password)
                await global.pause(4000)
                // Scroll up
                await global.scrollTo(500, 2000, 500, 500)
                // Validate the user
                await global.validateElementText(bonzaProfilePage.main.usernameInput, user.email)
                // Open the menu
                await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
                await global.pause(200)
                // Scroll up
                await global.scrollTo(616, 2177, 703, 308)
                await global.pause(1000)
                // Click on sign out
                await global.clickOn(bonzaSideMenuPage.main.signOut)
                await global.pause(1000)
                // Open the menu
                await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
                await global.pause(200)
                // Scroll down
                await global.scrollTo(764, 110, 741, 2375)
                await global.pause(1000)
                // Validate "Login to your bonza account" title
                await global.validateElementText(bonzaSideMenuPage.main.loginPreText, 'Log in to your Bonza account')
        }
    });
});
