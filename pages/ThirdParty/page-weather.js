const {driver} = require("@wdio/globals");

const mainIOS = {
    appIdentifier: 'TBD',
    tabsButton: 'TBD',
    privateButton: 'TBD',
    newTabButton: 'TBD',
    urlLine: 'TBD',
    urlInput: 'TBD',
}

const mainAndroid = {
    // App
    menuButton: '//android.view.ViewGroup[@content-desc="Go to settings"]/android.view.ViewGroup',
    customizeUnitsButton: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup',
    celsiusButton: '~°C',
    backNavigationButton: '//*[@content-desc="Navigate up"]',
    searchButton: '~Search',
    searchInput: '//*[@text="Search"]',
    searchInputNotEmpty: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.EditText',
    appSearchFirstResult: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]',
    appTempValue: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[2]',
    appFeelsLikeValue: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[4]',

    // Web
    url: 'https://www.timeanddate.com/weather/',
    chromeApp: 'com.android.chrome',
    tabsButton: '~Switch or close tabs',
    newTabButton: '~New tab',
    chromeURLInput: '//*[@text="Search or type web address"]',
    weatherSearchInput: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.webkit.WebView/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.EditText',
    searchFirstResult: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.webkit.WebView/android.view.View/android.view.View[2]/android.widget.ListView/android.view.View[1]',
    weatherTempValue: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.widget.FrameLayout[2]/android.webkit.WebView/android.view.View[1]/android.view.View[3]/android.view.View/android.view.View[1]/android.view.View/android.widget.TextView[1]',
    weatherFeelsLikeValue: '//*[contains(@text, "Feels Like: ")]',
    webMenuButton: '//*[@resource-id="site-nav-menu"]',
    myAccountButton: '//*[@text="My Account"]',
    myUnitsButton: '//*[@text="My Units"]',
    temperatureButton: '//*[@resource-id="fut"]',
    webCelsiusButton: '//*[@resource-id="android:id/text1"]',
    saveButton: '//*[@text="Save Settings"]',
}

module.exports = {

    main: driver.capabilities.platformName === "iOS" ? mainIOS : mainAndroid

};