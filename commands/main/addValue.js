// addText using "addValue" (Not setValue)

module.exports = async (selector, text)=>{
    $(selector).addValue(text)
};
