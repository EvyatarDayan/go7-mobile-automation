const global = require("../../../commands.conf");
const pageSearch = require("../../../pages/go7/page-go7-search");

describe('Test for test', () => {

    it('Select destinations', async () => {
        await global.pause(5000)
        await global.clickOn(pageSearch.main.myGo7Button)
    });

});