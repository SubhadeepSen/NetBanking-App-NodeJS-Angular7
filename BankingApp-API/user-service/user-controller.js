const express = require('express');
const userrouter = express.Router();
const userValidator = require('./user-schema-validator');
const userDao = require('./user-dao');
const Logger = require('../logger/logger');
const log = new Logger('User-Controller');
const authTokenValidator = require('../middleware/auth-token-validator');

userrouter.post('/register', (req, res) => {
    let userObj = req.body;
    let { error } = userValidator.validateNewUserSchema(userObj);
    if (isNotValidSchema(error, res)) return;
    userDao.resgisterNewUser(userObj, res)
           .then()
           .catch((err) => log.error(`Error in registering new user with username ${userObj.username}: ` + err));
});

userrouter.post('/validateuser', (req, res) => {
    let loginInfo = req.body;
    let { error } = userValidator.validateLoginUserSchema(loginInfo);
    if (isNotValidSchema(error, res)) return;
    userDao.validateLoginUser(loginInfo, res)
           .then()
           .catch((err) => log.error(`Error in login for username ${loginInfo.username}: ` + err));
});

userrouter.post('/updatepassword', (req, res) => {
    let passwordObj = req.body;
    let { error } = userValidator.validateUpdatePasswordSchema(passwordObj);
    if (isNotValidSchema(error, res)) return;
    userDao.updatePassword(passwordObj, res)
           .then()
           .catch((err) => log.error(`Error in updating password for username ${passwordObj.username}: ` + err));
});

userrouter.post('/updateemail', authTokenValidator, (req, res) => {
    let emailObj = req.body;
    let { error } = userValidator.validateUpdateEmailSchema(emailObj);
    if (isNotValidSchema(error, res)) return;
    userDao.updateEmail(emailObj, res)
           .then()
           .catch((err) => log.error(`Error in updating email id for username ${emailObj.username}: ` + err));
});

userrouter.post('/updatephoneno', authTokenValidator, (req, res) => {
    let phonoNoObj = req.body;
    let { error } = userValidator.validateUpdatePhoneNoSchema(phonoNoObj);
    if (isNotValidSchema(error, res)) return;
    userDao.updatePhonoNo(phonoNoObj, res)
           .then()
           .catch((err) => log.error(`Error in updating phone no. for username ${phonoNoObj.username}: ` + err));
});

userrouter.post('/updateaddress', authTokenValidator, (req, res) => {
    let addressObj = req.body;
    let { error } = userValidator.validateUpdateAddressSchema(addressObj);
    if (isNotValidSchema(error, res)) return;
    userDao.updateAddress(addressObj, res)
           .then()
           .catch((err) => log.error(`Error in updating address for username ${addressObj.username}: ` + err));
});

userrouter.get('/getuserbyusername/:username', authTokenValidator, (req, res) => {
    let username = req.params.username;
    let { error } = userValidator.validateUserByUsernameSchema({ username: username });
    if (isNotValidSchema(error, res)) return;
    userDao.getUserByUsername(username, res)
           .then()
           .catch((err) => log.error(`Error in retrieving user by username ${username} : ` + err));
});

userrouter.get('/getuserbyphoneno/:phoneNo', authTokenValidator, (req, res) => {
    let phoneNo = req.params.phoneNo;
    let { error } = userValidator.validateUserByPhoneNoSchema({ phoneNo: phoneNo });
    if (isNotValidSchema(error, res)) return;
    userDao.getUserByPhoneNo(phoneNo, res)
           .then()
           .catch((err) => log.error(`Error in retrieving user by phone no. ${phoneNo}: ` + err));
});

function isNotValidSchema(error, res) {
    if (error) {
        log.error(`Schema validation error: ${error.details[0].message}`);
        res.status(400).send({
            messageCode: 'VALDERR',
            message: error.details[0].message
        });
        return true;
    }
    return false;
}

module.exports = userrouter;