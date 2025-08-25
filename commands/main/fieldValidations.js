const { getElementText, addValue, logError, logComment, pause, clearValue } = require("../../commands.conf");

async function testMaximumLength(selector, useNumberInstead = false, imposedMaximum = 255, failIfExceed = false) {

    // arbitrary, just not equal
    let oldMaximum = -1;
    let currentMaximum = 0;

    let message;
    
    while (currentMaximum != oldMaximum) {
        
        oldMaximum = currentMaximum;

        if (oldMaximum > imposedMaximum) {
            // terminates if the limit is met
            message = `Text field ${selector} has reached the defined character limit of ${imposedMaximum}`;
            if (failIfExceed) {
                await logError(message);
            } else {
                await logComment(message);
            }
            await clearValue(selector);  // resets the field value
            return -1;
        }

        // adds a character and then checks whether field size expands
        if (useNumberInstead) {
            await addValue(selector, "1");
        } else {
            await addValue(selector, "a");
        }
        await pause(100, true);

        currentMaximum = await getElementText(selector, true).length;
        // at this point, if the number of characters in the field has not increased, oldMaximum will equal currentMaximum and the loop will end

    }

    message = `Text field ${selector} has a maximum character limit of ${currentMaximum}`;
    await logComment(message);
    await clearValue(selector);  // resets the field value
    return currentMaximum;

}

//=======================================================================================

module.exports = {
    
    testMaximumLength

};