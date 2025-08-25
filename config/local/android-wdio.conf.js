const projectPath = require("path");
const androidAppPath = projectPath.join(process.cwd(), "app/android/OpenWeather_1.1.7_APKPure.apk");
exports.config = {

// ====================
// Runner Configuration
// ====================

    port: 4723,
    runner: 'local',
    path: '/wd/hub',

// ==================
// Specify Test Files
// ==================

    specs: [
        // GO7
        // '../../tests/go7/sanity/*.js',


        '../../tests/personal/pango/weather.js',
        // '../../tests/personal/pango/weatherAPI.js'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

// ============
// Capabilities
// ============

    maxInstances: 1,

    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator

    capabilities: [{
        "platformName": 'android',
        "appium:deviceName": 'Pixel 9',
        "appium:platformVersion": "16",
        "appium:automationName": "UIAutomator2",
        "appium:autoAcceptAlerts": true,
        "appium:autoGrantPermissions": true,
        "appium:app": androidAppPath,
    }],

// ===================
// Test Configurations
// ===================

    logLevel: 'error',

    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).

    bail: 0,

    baseUrl: 'http://localhost',

    waitforTimeout: 30000,

    connectionRetryTimeout: 90000,

    // Default request retries count
    connectionRetryCount: 0,

    services: [['appium']],

    framework: 'mocha',

    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: 0,

    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,

    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,

    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter

    // reporters: [['json', {
    //     outputDir: 'reports',
    //     fileName: 'timeline-reporter.html',
    // }]],

    reporters: [
        'dot',
        ['spec', { showPreface: false, symbols: { passed: '🆗', failed: '🆘' }}],
        ['json', { stdout: true }],
    ],

    // See the full TBD at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 200000
    },
}