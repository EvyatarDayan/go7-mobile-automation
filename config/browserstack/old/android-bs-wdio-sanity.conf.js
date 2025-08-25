exports.config = {

    // port: 4723,
    runner: 'local',
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hostname: 'hub.browserstack.com',
    waitforTimeout: 40000,

    reporters: [['json', {
        outputDir: 'reports'
    }]],

    specs: [
        // GO7
        '../tests/go7/sanity/*.js',
    ],

    framework: 'mocha',
    mochaOpts: {
        timeout: 40000
    },

    services: [
        [
            'browserstack',
            {
                app: process.env.ANDROID_BUILD_PATH,
                browserstackLocal: true,
            },
        ]
    ],

    capabilities: [
        // {
        //     'bstack:options': {
        //         deviceName: 'OnePlus 9',
        //         platformVersion: '11.0',
        //         platformName: 'android',
        //         buildIdentifier: process.env.ANDROID_BUILD_VERSION,
        //     }},

        // {
        //     'bstack:options': {
        //         deviceName: 'Google Pixel 7 Pro',
        //         platformVersion: '13.0',
        //         platformName: 'android',
        //         buildIdentifier: process.env.ANDROID_BUILD_VERSION,
        //     } },

        {
            'bstack:options': {
                deviceName: 'Xiaomi Redmi Note 11',
                platformVersion: '11.0',
                platformName: 'android',
                buildIdentifier: process.env.ANDROID_BUILD_VERSION,
            } },

        // {
        //     'bstack:options': {
        //             deviceName: 'Samsung Galaxy S22 Ultra',
        //             platformVersion: '12.0',
        //             platformName: 'android',
        //             buildIdentifier: process.env.ANDROID_BUILD_VERSION,
        //     }
        // }
    ],

    commonCapabilities: {
        'bstack:options': {
            buildName: "GO7 White Label App",
            buildIdentifier: process.env.ANDROID_BUILD_VERSION,
            projectName: "GO7",
            sessionName: 'BStack parallel webdriverio-appium',
            debug: true,
            networkLogs: true,
            noReset: false,
            autoAcceptAlerts: true,
            autoGrantPermissions: true,
            "appium:locationServicesAuthorized": true,
        }
    },

    maxInstances: 10,
}