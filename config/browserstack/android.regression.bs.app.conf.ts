import { config as baseConfig } from '../../config/wdio.shared.conf';

export const config: WebdriverIO.Config = {
    ...baseConfig,
    // ============
    // Specs
    // ============
    specs: [
        '../../tests/go7/regression/*.js',
    ],
    exclude: [
        // Exclude this one because the test can only be executed on emulators/simulators
        // '../tests/specs/**/app.biometric.login.spec.js',
    ],

    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: 2,

    // =============================
    // Browserstack specific config
    // =============================
    // User configuration
    user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USER',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    // Use browserstack service
    services: ['browserstack'],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
    capabilities: [
        {
            // Set URL of the application under test
            'appium:app': process.env.BROWSERSTACK_APP_ID || 'BROWSERSTACK_APP_ID',
            'platformName': 'Android',
            'bstack:options': {
                // Set your BrowserStack config
                debug: true,

                // Specify device and os_version for testing
                deviceName: 'Google Pixel 3',
                osVersion: '9.0',

                // Set other BrowserStack capabilities
                projectName: "GO7",
                buildName: 'android',
                sessionName: 'Android Regression',
            }
        },
    ] as WebdriverIO.Capabilities[]
};