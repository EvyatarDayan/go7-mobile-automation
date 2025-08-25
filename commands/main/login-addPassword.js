// login-addPassword

const loginPage = require ('../../pages/main/loginPage');

module.exports = async (password)=>{
    $(loginPage.main.passwordInput).addValue(password)
};
