const global = require("../../../../../commands.conf");
const sessionData = require("../../../../../sessionData");
const clc = require("cli-color");
const {driver} = require("@wdio/globals");
const bonzaHomePage = require ('../../../../../pages/bonza/page-bonza-home');
const { By } = require("selenium-webdriver");
//const { getAttribute } = require("webdriverio/build/commands/element");

let departDate = '2023-10-26';
let returnDate = '2023-10-29';

let nAdults = 1;
let nYouths = 1;
let nChildren = 1;
let nInfants = 0;

describe('Flight booking', () => {

    it('Flight search', async () => {

        await bonzaHomePage.fullFlow('random', 'random', departDate, returnDate, nAdults, nYouths, nChildren, nInfants);

    });

});
