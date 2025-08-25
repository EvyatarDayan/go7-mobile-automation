// clickIfExists

module.exports = async(selector)=>{
    async function clickIfExists() {
        try {
            const element = await driver.findElementById(selector);
            await element.click();
            console.log("Element clicked successfully");
        } catch (error) {
            console.log("Element not found, skipping click operation");
        }
    }

// Add the custom command to the driver instance
    driver.addCommand("clickIfExists", clickIfExists);
}
