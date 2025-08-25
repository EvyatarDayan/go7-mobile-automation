const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaFAQPage = require ('../../../../../pages/bonza/page-bonza-faqs');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');

describe('FAQs', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Navigate to FAQs', async () => {
        // Open the side menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "FAQs"
        await global.clickOn(bonzaSideMenuPage.main.FAQs)
    });

    it('Validate all FAQs titles', async () => {
        // Validate all FAQs titles
        await global.validateElementText(bonzaFAQPage.main.firstQuestionTitle, 'Booking with Bonza')
        await global.validateElementText(bonzaFAQPage.main.secondQuestionTitle, 'Baggage')
        await global.validateElementText(bonzaFAQPage.main.thirdQuestionTitle, 'Specific Assistance')
        await global.validateElementText(bonzaFAQPage.main.forthQuestionTitle, 'Travelling with an Assistance dog')
        await global.validateElementText(bonzaFAQPage.main.fifthQuestionTitle, 'Health, Wellbeing and Travelling when Pregnant')
        await global.validateElementText(bonzaFAQPage.main.sixthQuestionTitle, 'Travelling with children')
        await global.validateElementText(bonzaFAQPage.main.seventhQuestionTitle, 'Fly Bonza app check in')
    });

        it('Search and validate FAQs', async () => {
        // Search for non-existing data
        await global.addValue(bonzaFAQPage.main.searchInput, 'Fake search')
        // Validate first question title not exist
        await global.validateElementNotDisplayed(bonzaFAQPage.main.firstQuestionTitle)
        // Clear search field
        await global.clearValue(bonzaFAQPage.main.searchInput)
        // Search for existing data
        await global.addValue(bonzaFAQPage.main.searchInput, 'Booking with Bonza')
        // Expand the first question
        await global.clickOn(bonzaFAQPage.main.firstQuestionExpandButton)
        // Validate first question title
        await global.validateElementText(bonzaFAQPage.main.firstQuestionTitle, 'Booking with Bonza')
        // Validate first question content
        await global.validateElementText(bonzaFAQPage.main.firstQuestionContent, 'The cheapest and easiest way to make your flight booking is via the Fly Bonza app.\n' +
            'If you don’t have the Fly Bonza app, please download it now from the Apple App Store or Google Play Store.')
        // Collapse the first question
        await global.clickOn(bonzaFAQPage.main.firstQuestionCollapseButton)
        // Expand the second question
        await global.clickOn(bonzaFAQPage.main.secondQuestionExpandButton)
        // Validate second question title
        await global.validateElementText(bonzaFAQPage.main.secondQuestionTitle, 'Health, Wellbeing and Travelling when Pregnant')
        // Validate second question content
        await global.validateElementText(bonzaFAQPage.main.secondQuestionContent, 'If I have an illness or medical condition. Do I need a medical clearance before I fly?')
        // Collapse second question
        await global.clickOn(bonzaFAQPage.main.secondQuestionCollapseButton)
    });

    it('Validate search removal', async () => {
        // Search for 4 existing articles
        await global.addValue(bonzaFAQPage.main.searchInput, 'where')
        // Validate first article
        await global.validateElementText(bonzaFAQPage.main.firstQuestionTitle, 'Baggage')
        // Validate second article
        await global.validateElementText(bonzaFAQPage.main.secondQuestionTitle, 'Health, Wellbeing and Travelling when Pregnant')
        // Validate third article
        await global.validateElementText(bonzaFAQPage.main.thirdQuestionTitle, 'Fly Bonza app check in')
        // Validate forth article
        await global.validateElementText(bonzaFAQPage.main.forthQuestionTitle, 'At the Airport')
        // Search for only 1 existing article
        await global.addValue(bonzaFAQPage.main.searchInput, 'where is your')
        // Validate first article display
        await global.validateElementText(bonzaFAQPage.main.firstQuestionTitle, 'About Bonza')
        // Validate second article don't display
        await global.validateElementNotDisplayed(bonzaFAQPage.main.secondQuestionTitle)
        // Validate third article don't display
        await global.validateElementNotDisplayed(bonzaFAQPage.main.thirdQuestionTitle)
        // Validate forth article don't display
        await global.validateElementNotDisplayed(bonzaFAQPage.main.forthQuestionTitle)


        // Focus on search field
        await global.clickOn(bonzaFAQPage.main.searchInput)
        // Remove " is" from the search
        await global.multipleKeyboardBackspace(8)
        // Validate first article
        await global.validateElementText(bonzaFAQPage.main.firstQuestionTitle, 'Baggage')
        // Validate second article
        await global.validateElementText(bonzaFAQPage.main.secondQuestionTitle, 'Health, Wellbeing and Travelling when Pregnant')
        // Validate third article
        await global.validateElementText(bonzaFAQPage.main.thirdQuestionTitle, 'Fly Bonza app check in')
        // Validate forth article
        await global.validateElementText(bonzaFAQPage.main.forthQuestionTitle, 'At the Airport')
        // Remove all text from search field
        await global.multipleKeyboardBackspace(5)
        // Hide the keyboard
        await driver.hideKeyboard()
        // Validate all FAQs titles
        await global.validateElementText(bonzaFAQPage.main.firstQuestionTitle, 'Booking with Bonza')
        await global.validateElementText(bonzaFAQPage.main.secondQuestionTitle, 'Baggage')
        await global.validateElementText(bonzaFAQPage.main.thirdQuestionTitle, 'Specific Assistance')
        await global.validateElementText(bonzaFAQPage.main.forthQuestionTitle, 'Travelling with an Assistance dog')
        await global.validateElementText(bonzaFAQPage.main.fifthQuestionTitle, 'Health, Wellbeing and Travelling when Pregnant')
        await global.validateElementText(bonzaFAQPage.main.sixthQuestionTitle, 'Travelling with children')
        await global.validateElementText(bonzaFAQPage.main.seventhQuestionTitle, 'Fly Bonza app check in')
        // Click on back
        await global.multipleBack(1)
    });
});