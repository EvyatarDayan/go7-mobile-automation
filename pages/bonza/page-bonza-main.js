module.exports = {

    main: {
        updateYesButton: '//android.widget.Button[@resource-id="android:id/button2"]',
        updateNoButton: '//android.widget.Button[@resource-id="android:id/button1"]',
        updateTitle: '//android.widget.TextView[@resource-id="android:id/alertTitle"]',
        googleStoreTitle: '//*[contains(@text, "New version is available!")]',
        googleStoreButton: '//*[contains(@text, "Go to Google Play Store")]',
        //closeGoogleStorePopup: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup',
        closeGoogleStorePopup: '//*[contains(@text, "New version is available!")]/../../*[1]',
        //selectDepartureAirportDropDown: '//android.view.ViewGroup[@content-desc="touchable-opacity__ibe__selectorModal"]/android.view.ViewGroup',
        selectDepartureAirportDropDown: '//android.widget.TextView[@text="Select"]',
            departureAirportElements: '//*[contains(@content-desc, "destination")]/android.widget.TextView',
        //findFlightsButton: '//android.view.ViewGroup[@content-desc="btn__find-a-flight-home-page"]/android.view.ViewGroup/android.widget.TextView',
        findHolidaysButton: '//*[contains(@text, "Find a holiday")]',
        findFlightsButton: '//*[contains(@text, "Find a flight")]',
        //destinationsButton: '//android.view.ViewGroup[@content-desc="btn__view-all-destinations"]/android.view.ViewGroup/android.widget.TextView',
        destinationsButton: '//*[contains(@text, "View all destinations")]',
        //whyFlyBonzaButton: '//android.view.ViewGroup[@content-desc="btn__next"]/android.view.ViewGroup/android.widget.TextView',
        whyFlyBonzaButton: '//*[contains(@text, "Why fly Bonza?")]',
        termsAndConditionsButton: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.ScrollView/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView'
    },

    toolbar: {
        homeButton: '~tab_nav-home',
        bookButton: '~tab_nav-win',
        myTripsButton: '//*[@text="My Trips"]',
        myTripsButtonAlternative: '//*[contains(@content-desc, "My Trips")]',
        holidaysButton: '~tab_nav-route',
        inFlightButton: '(//android.view.ViewGroup[@content-desc="tab_nav-account"])[1]',
        accountButton: '(//android.view.ViewGroup[@content-desc="tab_nav-account"])[2]',
        //backButton: '//android.widget.Button[@content-desc="home, back"]'
        backButton: '//*[@content-desc="back-button"]'
    },

    sideMenu: {
        sideMenuButton: '~touchable-opacity__general__navbar__hamburger-menu',
        signOutButton: '//android.widget.TextView[@text="Sign out"]'
    },

};