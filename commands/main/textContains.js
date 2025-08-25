// textContains

// function validateElementText(selector, expectedText) {
//     return driver
//         .getText(selector)
//         .then((actualText) => {
//             if (actualText === expectedText) {
//                 console.log('Text validation passed!');
//                 return true;
//             } else {
//                 console.error('Text validation failed!');
//                 console.error(`Expected: ${expectedText}`);
//                 console.error(`Actual: ${actualText}`);
//                 return false;
//             }
//         })
//         .catch((error) => {
//             console.error('Error occurred during text validation:', error);
//             return false;
//         });
// }
//
// module.exports = validateText;
