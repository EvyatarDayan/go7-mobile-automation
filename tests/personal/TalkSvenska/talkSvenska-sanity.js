const global = require("../../../commands.conf");
const pageTalkSvenska = require("../../../pages/ThirdParty/page-talkSvenska");

describe('TalkSvenska Sanity', () => {

    it('Navigate to all menu items', async () => {
        // Click on schedule
        await global.clickOn(pageTalkSvenska.main.scheduleMenuButton)
        await global.pause(500)
        // Click on Favorite
        await global.clickOn(pageTalkSvenska.main.favoriteMenuButton)
        await global.pause(500)
        // Click on Manual
        await global.clickOn(pageTalkSvenska.main.manualMenuButton)
        await global.pause(500)
        // Click on settings
        await global.clickOn(pageTalkSvenska.main.settingsMenuButton)
        await global.pause(500)
        // Click on home
        await global.clickOn(pageTalkSvenska.main.homeMenuButton)
        await global.pause(500)
    });

    it('Navigate through some sentences', async () => {
        // Click on transportation topic
        await global.clickOn(pageTalkSvenska.main.transportationTopicButton)
        await global.pause(500)
        // Click on English button
        await global.clickOn(pageTalkSvenska.main.sentenceEnglishButton)
        await global.pause(500)
        // Click on next
        await global.clickOn(pageTalkSvenska.main.sentenceNextButton)
        await global.pause(500)

        // Click on English button
        await global.clickOn(pageTalkSvenska.main.sentenceEnglishButton)
        await global.pause(500)
        // Click on next
        await global.clickOn(pageTalkSvenska.main.sentenceNextButton)
        await global.pause(500)

        // Click on English button
        await global.clickOn(pageTalkSvenska.main.sentenceEnglishButton)
        await global.pause(500)
        // Click on next
        await global.clickOn(pageTalkSvenska.main.sentenceNextButton)
        await global.pause(500)
        // Close sentence
        await global.clickOn(pageTalkSvenska.main.sentenceCloseButton)
        await global.pause(500)
    });

    it('Add new manual', async () => {
        // Click on Manual
        await global.clickOn(pageTalkSvenska.main.manualMenuButton)
        await global.pause(500)
        // Click on + button
        await global.clickOn(pageTalkSvenska.main.manualPlusButton)
        await global.pause(500)
        // Add text in the svenska
        await global.addValue(pageTalkSvenska.main.manualSvenskaInput, 'This is the svenska')
        await global.pause(500)
        // Add text in the svenska
        await global.addValue(pageTalkSvenska.main.manualEnglishInput, 'This is the english')
        await global.pause(500)
        // Click on save
        await global.clickOn(pageTalkSvenska.main.manualSaveButton)
        await global.pause(500)
    });
});