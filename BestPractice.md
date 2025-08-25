

// ===================================  Android  ===================================

* get app info: 
  * adb shell dumpsys window | grep -E 'mCurrentFocus'
  * Run in while the app is running in the amulator

Inspector sample configuration:
    {
    "platformName": "android",
    "platformVersion": "13",
    "deviceName": "pixel-6",
    "automationName": "UiAutomator2",
    "appPackage": "com.google.android.contacts",
    "appActivity": "com.android.contacts.activities.PeopleActivity"
    }

// =====================================  iOS  =====================================

* Run appium server (from the terminal): 
  * appium -p 4723 --allow-cors

* Kill the port if needed:
  1. lsof -i tcp:4723
  2. kill -9 <PID>

Inspector sample configuration:
    {
    "platformName": "IOS",
    "appium:platformVersion": "16.4",
    "appium:deviceName": "Test-iPhone14",
    "appium:app": "/Users/evyatar.da/IdeaProjects/go7-mobile-automation/app/ios/MyRNDemoApp.app",
    "appium:automationName": "XCUItest"
    }


// =====================================  Selectors  =====================================

* Chain 2 attributes: "//*[contains(@label, '_enabled') and contains(@name, 'container')]"

// =====================================  Selectors  =====================================

// =====================================  Scroll issues  =====================================

* This is working for both Android and iOS:  "await global.scrollTo(200, 700, 200, 230)"
* This is example for different coordinates in iOS and Android, scrolling on the same page:
            
* if (driver.capabilities.platformName === "iOS") {
        // iOS scroll
        await global.scrollTo(200, 700, 200, 230)
    }
    else {
        // Android scroll
        await global.scrollTo(200, 700, 200, 0)
        await global.scrollTo(200, 700, 200, 0)
    }
* 

// ==================================  Delete node modules  ==================================

sudo rm -rf node_modules/

// ==================================== Install old node  ====================================

npm install -g n
n 18.17.3