const path = require("path");
exports.capabilities = [
    {
        //BrowserStack Android
        "platformName" : "Android",
        "appium:platformVersion" : "12.0",
        "appium:deviceName" : "Google Pixel 6 Pro",
        // "appium:app" : "bs://7af93afa1436845b095080b3cde2d30334018056",
        "appium:app": path.join(process.cwd(), './app/android/bz-5.3(4)-uat.apk'),
        'bstack:options' : {
            "userName": "abhonge1",
            "accessKey": "jqE94SUbhREybcYBiztD",
            "appiumVersion": "2.0.0",
            "idleTimeout": "120",
            "autoGrantPermissions": true,
            "autoAcceptAlerts": true,
        }
    },

    {
        //BrowserStack iOS
        path: '/wd/hub',
        platformName: 'iOS',
        "appium:deviceName": 'iPhone13',
        "appium:app": path.join(process.cwd(), './app/ios/MyRNDemoApp.app',),
        "appium:platformVersion": '16.4',
        "appium:automationName": "XCUITest",
        "appium:autoAcceptAlerts": true,
        "appium:autoGrantPermissions": true,
    }
]