const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaChatWithUsPage = require ('../../../../../pages/bonza/page-bonza-chat-with-us');
const bonzaFAQPage = require ('../../../../../pages/bonza/page-bonza-faqs');
const bonzaSupportPage = require ('../../../../../pages/bonza/page-bonza-support');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');
const bonzaTermsAndConditionsPage = require ('../../../../../pages/bonza/page-bonza-terms-and-conditions');
const bonzaBaggagePolicyPage = require ('../../../../../pages/bonza/page-bonza-baggage-policy');
const bonzaBookTripPage = require ('../../../../../pages/bonza/page-bonza-book-trip');

describe('Support', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Navigate to support', async () => {
        // Open the side menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "support"
        await global.clickOn(bonzaSideMenuPage.main.support)
    });

    it('FAQs', async () => {
        // Click on "FAQs"
        await global.clickOn(bonzaSupportPage.main.faqs)
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
        // Click on back
        await global.multipleBack(1)
    });

    it('Chat with us', async () => {            // todo: add current time validation, after hours (16:00 israel time) a message will display insted of chat form
        // Click on "Chat with us"
        await global.clickOn(bonzaSupportPage.main.chatWithUs)
        // // Add first name
        // await global.addValue(bonzaChatWithUsPage.main.firstNameInput, 'Mario')
        // // Add email
        // await global.addValue(bonzaChatWithUsPage.main.emailInput, 'mario78@yopmail.com')
        // // Click on "how can we help" list
        // await global.clickOn(bonzaChatWithUsPage.main.howCanWeHelpList)
        // // Select General enquiry
        // await global.clickOn(bonzaChatWithUsPage.main.generalEnquiry)
        // // Add message
        // await global.addValue(bonzaChatWithUsPage.main.message, 'Test chat')
                // Click on start chat
                // await global.clickOn(bonzaChatWithUsPage.main.startChatButton)       // Cannot procees to real chat
        await global.clickOn(bonzaChatWithUsPage.main.closeButton)
    });

    it('Terms and condition', async () => {
        // Click on "Terms and condition"
        await global.clickOn(bonzaSupportPage.main.termsAndConditions)
        // Click on "close" button
        await global.clickOn(bonzaTermsAndConditionsPage.main.closeButton)
    });

    it('Baggage policy', async () => {
        // Click on "Baggage policy"
        await global.clickOn(bonzaSupportPage.main.baggagePolicy)
        // Click on the first category
        await global.clickOn(bonzaBaggagePolicyPage.main.firstCategory)
        // Click on the second sub category
        await global.pause(500)
        await global.clickOn(bonzaBaggagePolicyPage.main.secondSubCategory)
        // Validate second subcategory content
        await global.validateElementText(bonzaBaggagePolicyPage.main.secondCategoryContent, 'It is not possible to purchase additional carry-on baggage (this may change in future). If your baggage requirements exceed Bonza’s carry-on baggage allowance, then you must purchase checked baggage.')
        // Collapse first category
        await global.clickOn(bonzaBaggagePolicyPage.main.collapseFirstCategory)
        // Go back to support
        await global.multipleBack(1)
    });

    it('Why fly bonza', async () => {
        // Scroll down
        await global.pause(1000)
        await global.scrollTo(500, 800, 500, 500)
        // Click on "Why fly bonza"
        await global.clickOn(bonzaSupportPage.main.whyFlyBonzaButton)
        // Validate sample content
        await global.validateElementText(bonzaSupportPage.whyFlyBonza.initialText,  'The Bonza app is the place to book flights to all our destinations at the most affordable fares.')
        // Scroll down
        await global.scrollTo(500, 2000, 500, 500)
        await global.scrollTo(500, 2000, 500, 500)
        await global.scrollTo(500, 2000, 500, 500)
        // Click on departure selection
        await global.clickOn(bonzaSupportPage.whyFlyBonza.departureAirportSelectionList)
        // Click on Bundaberg
        await global.clickOn(bonzaSupportPage.whyFlyBonza.bundaberg)
        // Click on find a flight
        await global.clickOn(bonzaSupportPage.whyFlyBonza.findFlightButton)
        // Validate selected airport display in "From" seach field in search page
        await global.validateElementText(bonzaBookTripPage.bookTrip.fromValue, 'Bundaberg')
        // Click on back
        await global.multipleBack(1)
    });
});
