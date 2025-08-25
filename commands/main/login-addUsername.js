// login-AddUsername

const loginPage = require ('../../pages/main/loginPage');

module.exports = async (username)=>{
    $(loginPage.main.usernameInput).addValue(username)
};
