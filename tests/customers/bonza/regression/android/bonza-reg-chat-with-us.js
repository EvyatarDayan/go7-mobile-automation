const global = require("../../../../../commands.conf");
const bonzaMainPage = require ('../../../../../pages/bonza/page-bonza-main');
const bonzaChatWithUsPage = require ('../../../../../pages/bonza/page-bonza-chat-with-us');
const bonzaSideMenuPage = require ('../../../../../pages/bonza/page-bonza-side-menu');
const {driver} = require("@wdio/globals");

let firstName = 'Marco';
let email = 'marco230@yopmail.com';
let initialMessage = 'This is just a test, please ignore';

describe('Chat with us', ()=>{

    before('Clear all popups',async () => {
        await global.clearAllPopups()
    });

    it('Navigate to chat with us', async () => {
        // Open the side menu
        await global.clickOn(bonzaMainPage.sideMenu.sideMenuButton)
        // Click on "chatWithUs"
        await global.clickOn(bonzaSideMenuPage.main.chatWithUs)
    });

    it('Validate "Start chat" availability', async () => {
        // While all mandatory fields empty
        await global.validateAttributeText(bonzaChatWithUsPage.main.startChatButton, 'enabled', 'true')  //TODO: complete this before 16:00
        // Add only first name and validate
        // Add first name and email and validate
        // Add only email and validate
        await global.pause(50000000)

    });

    it('Add chat details and start chat', async () => {
        // Add first name
        await global.addValue(bonzaChatWithUsPage.main.firstNameInput, firstName)
        // Add email
        await global.addValue(bonzaChatWithUsPage.main.emailInput, email)
        // Click on "How can we help"
        await global.clickOn(bonzaChatWithUsPage.main.howCanWeHelpList)
        // Select "General inquiry"
        await global.clickOn(bonzaChatWithUsPage.main.generalEnquiry)
        // Add message
        await global.addValue(bonzaChatWithUsPage.main.message, initialMessage)
        // Click on start chat
        // await global.clickOn(bonzaChatWithUsPage.main.startChatButton)       // Chat is currently connected to production, do not start chat!
    });

    it('Validate chat started', async () => {
        // Validate traveller join title
        await global.validateElementText(bonzaChatWithUsPage.main.travellerJoinTitle, `${firstName} has joined the conversation`)
        // Validate traveller name title
        await global.validateElementText(bonzaChatWithUsPage.main.travellerNameTitle, firstName)
        // Validate initial message
        await global.validateElementText(bonzaChatWithUsPage.main.initialMessage, initialMessage)
    });

    it('Validate chat unavailable after hours (16:00 TLV time)', async () => {
        // Validate chat unavailable message

    });

});