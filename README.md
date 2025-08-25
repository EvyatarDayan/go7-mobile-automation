
# Mobile Automation

Appium 2.0.0 | Node.JS 18+ | WebdriverIO

PLEASE LOOK AT AN EXAMPLE TEST UNDER ./tests/example.test.js

### ! Before interacting with the project and after every fresh clone run this to prevent personal config from push: !
### ! YOU SHOULD NEVER COMMIT THOSE FILES !
`git update-index --assume-unchanged wdio.conf.js`

`git update-index --assume-unchanged remoteCapabilities.js`

`git update-index --assume-unchanged localCapabilities.js`

REQUIREMENTS:
* Java
* Node version - v18.12.1
* Appium server version - v2.0.0
* Android studio + Emulator
* Xcode + Command line tools + Emulator

## Appium setup


run in terminal
```
  git update-index --assume-unchanged wdio.conf.js  // prevent personal config from push
  git update-index --assume-unchanged localCapabilities.js  // prevent personal config from push
  git update-index --assume-unchanged remoteCapabilities.js  // prevent personal config from push
  xcode-select --install                            //install xcode command line tools
  node -v                                           //check node version
  npm install -g appium@next                        //install appium 2.0.0
  npm install -g appium-doctor                      //install appium-doctor
  
  //appium extras to install
  appium driver install uiautomator2@2.12.0 
  appium driver install xcuitest@4.13.4
  appium plugin install execute-driver
```
* if node version is not 18.2.1 you can install manually or using nvm

* run appium-doctor make sure all the required fields are ok (don't mind the optional section)

### Environment Variables

#### Find JAVA_HOME and copy only the path:

`java -XshowSettings:properties -version 2>&1 > /dev/null | grep 'java.home'`

#### Edit Environment Variables:

open shell conf file `nano ~/.zshrc` (or `nano ~/.bash_profile`)

paste the following, don't forget to modify to match your machine

`export JAVA_HOME="THE_PATH_WE_COPIED_EARLIER"`

`export ANDROID_HOME="/Users/YOUR_USERNAME/Library/Android/sdk"`

#### to save press: control+x >> y >> enter

set the conf file `source ~/.zshrc` (or `source ~/.bash_profile`)

!RELAUNCH! terminal and type `$JAVA_HOME` to see if the path is currect and saved.

### make sure appium is ready to use 

```
appium-doctor                 //check for appium requirements (run when finishing setup)
```

this will log the status of your cofiguration 

please only mind the first section `### Diagnostic for necessary dependencies`

and ignore the second section `### Diagnostic for optional dependencies`

if any of the items listed in the necessary section is marked with `X` search online for a quick fix or ask a colleague

### Making the Chrome browser work in Android

If you do not disable Vulkan, it will not successfully load and thus all tests which rely on it (email-related mainly) will fail.

https://stackoverflow.com/questions/69134922/google-chrome-browser-in-android-12-emulator-doesnt-load-any-webpages-internet - please refer to this thread

## Project Setup
open terminal and navigate to project root

run one the following command to install required dependencies:

`npm install` | `yarn install`

to run tests on your local machine go to the config file: `localCapabilities.js`
and change the capabilities to match your emulators. (you can follow the existing template).

!you need to download the app to run localy and change the path on the app capability in the conf file!

.APP file for iOS | .APK file for Android

to run a specific test file you can specify the path to it in the conf file under `specs`

## Execution
### Local
#### start your emulator
#### start appium server
`appium -pa /wd/hub --use-plugins execute-driver`
#### use the terminal to run a command by the following template:
< <x>> ignore those signs

local `npm run <configFile>`

examples `npm run wdioAndroid` `npm run wdioAndroidBS`

### BrowserStack
#### edit the following in `remoteCapabilities.js` :

* app link
* userName
* accessKey

instructions are provided in the file.
#### run the following terminal command or use the scripts
browserStack `npm test remote <android/ios>`
## Features

- Page Objects
- Custom global commands
- Browserstack integration
- iOS/Android support


## Documentation


[appium](https://appium.io/docs/en/about-appium/api/) 
| [webdriverIO](https://webdriver.io/docs/api) 

### keyboard interaction codes
[Android](https://developer.android.com/reference/android/view/KeyEvent#KEYCODE_11) |
[iOS](https://developer.apple.com/documentation/uikit/uikeyboardhidusage)

usage example: `await driver.pressKeyCode(62);` //press space on android keyboard.


