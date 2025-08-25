const global = require("../../../commands.conf");
const pageForkit = require("../../../pages/ThirdParty/page-forkit");
let address = global.randomAddress();

describe('TalkSvenska Sanity', () => {

    it('Navigate to all menu items', async () => {
        // Click on search
        await global.clickOn(pageForkit.main.searchMenuButton)
        await global.pause(500)
        // Click on home
        await global.clickOn(pageForkit.main.homeMenuButton)
        await global.pause(500)
        // Click on my recipes
        await global.clickOn(pageForkit.main.myRecipesMenuButton)
        await global.pause(500)
        // Click on Profile
        await global.clickOn(pageForkit.main.profileMenuButton)
        await global.pause(500)
    });

    it('Add new address', async () => {
        // Click on profile
        await global.clickOn(pageForkit.main.profileMenuButton)
        await global.pause(500)
        // Click on my address
        await global.clickOn('//*[@name="My Address"]')
        await global.pause(500)
        // Click on new address
        await global.clickOn('~plus.circle.fill')
        await global.pause(500)
        // Add new address
        await global.clickOn('//*[@name="Enter address"]')
        await global.pause(500)
        // Add new address
        await global.addValue('//*[@value="Search address"]', '22 Florentin St Tel Aviv')
        await global.pause(500)
        // Select the address from the list
        await global.clickOn('//*[@name="David Florentin Street 22"]')
        await global.pause(500)
        // Add Entrance
        await global.addValue('//*[@value="Entrance"]', 'D')
        await global.pause(500)
        // Add Floor
        await global.addValue('//*[@value="Floor"]', '4')
        await global.pause(500)
        // Add Number
        await global.addValue('//*[@value="Number"]', '1234')
        await global.pause(500)
        // Scroll down
        await global.scrollTo(500, 2000, 500, 500)
        // Click on Door code
        await global.clickOn('//*[@value="Door code"]')
        await global.pause(500)
        // Add Door code
        await global.addValue('//*[@value="Door code"]', '333222')
        await global.pause(500)
        // Add Other instructions
        await global.addValue('//*[@value="Other instructions"]', 'Not after 20:00!')
        await global.pause(500)
        // Click on Save
        await global.clickOn('~Save')
        await global.pause(50000000)
    });
});