const projectPath = require("path");
const iosAppPath = projectPath.join(process.cwd(), "app/ios/Forkit.app");
exports.config = {

// ====================
// Runner Configuration
// ====================

    runner: 'local',

    specs: [
        // GO7
        // '../../tests/go7/sanity/*.js',


        // Personal
        // '../../tests/personal/TalkSvenska/talkSvenska-sanity.js',
        '../../tests/personal/forkit/forkit-sanity.js',
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

// ============
// Capabilities
// ============

    maxInstances: 1,

    capabilities: [{
        "platformName": "iOS",
        "appium:deviceName": "iPhone 16 Pro",
        "appium:platformVersion": "18.1",
        "appium:automationName": "XCUItest",
        "appium:app": iosAppPath,
        "appium:maxTypingFrequency": "15",      // This is essential do not remove!
        "appium:autoAcceptAlerts": true,
        "appium:autoGrantPermissions": true,
        "appium:locationServicesAuthorized": true,
        "appium:noReset": false,
    }],

// ===================
// Test Configurations
// ===================

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',

    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: 1,

    bail: 0,

    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost',

    // Default timeout for all waitFor* commands.
    waitforTimeout: 30000,

    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,

    // Default request retries count
    connectionRetryCount: 5,

    services: [
        [
            "appium",
            {
                args: {
                    address: "localhost",
                    port: 4723,
                    relaxedSecurity: true,
                    commandTimeout: 600
                },
                logPath: "./",
            },
        ],
    ],

    framework: 'mocha',

    mochaOpts: {
        // retries: 1,
        timeout: 120000
    },

    reporters: [
        'dot',
        ['spec', { showPreface: false, symbols: { passed: '🆗', failed: '🆘' }}],
        ['json', { stdout: true }],
    ],

}
