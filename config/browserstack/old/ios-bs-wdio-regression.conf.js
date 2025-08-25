exports.config = {
    // port: 4724,
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
        '../tests/go7/regression/*.js',
    ],

    framework: 'mocha',
    mochaOpts: {
        timeout: 40000
    },

    services: [
        [
            'browserstack',
            {
                app: process.env.IOS_BUILD_PATH,
                browserstackLocal: true,
            },
        ]
    ],

    capabilities: [{
        "appium:autoAcceptAlerts": true,
        "appium:autoGrantPermissions": true,
        "appium:locationServicesAuthorized": true,
        "platformName": "iOS", // Ensure platformName is set at the root level

        'bstack:options': {
            deviceName: 'iPhone 15',
            platformVersion: '17.2',
            platformName: 'iOS', // Ensure platformName is set in bstack:options
            buildName: "GO7 White Label App",
            buildIdentifier: process.env.IOS_BUILD_VERSION,
            projectName: "GO7",
        },

    } /*, {
        // Additional device configurations can be added here
    }*/],

    commonCapabilities: {
        'bstack:options': {
            buildName: "GO7 White Label App",
            buildIdentifier: process.env.IOS_BUILD_VERSION,
            projectName: "GO7",
            sessionName: 'BStack parallel webdriverio-appium',
            debug: true,
            networkLogs: true,
            platformName: "iOS"
        }
    },

    maxInstances: 10,

    // Adding a before session hook to merge common capabilities with each capability
    beforeSession: function (config, capabilities, specs) {
        capabilities['bstack:options'] = {
            ...config.commonCapabilities['bstack:options'],
            ...capabilities['bstack:options']
        };
    },
}
