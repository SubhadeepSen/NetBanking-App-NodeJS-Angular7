const Joi = require('joi');
const userSchemaModel = require('./user-schema-model');

const validateLoginUserSchema = (loginUser) => {
    return Joi.validate(loginUser, userSchemaModel.loginUserInputSchemaModel);
}

const validateNewUserSchema = (newUser) => {
    return Joi.validate(newUser, userSchemaModel.registerInputUserSchemaModel);
}

const validateUpdatePasswordSchema = (updatePassword) => {
    return Joi.validate(updatePassword, userSchemaModel.updatePasswordInputSchemaModel);
}

const validateUpdateEmailSchema = (updateEmail) => {
    return Joi.validate(updateEmail, userSchemaModel.updateEmailInputSchemaModel);
}

const validateUpdatePhoneNoSchema = (updatePhoneNo) => {
    return Joi.validate(updatePhoneNo, userSchemaModel.updatePhoneNoInputSchemaModel);
}

const validateUpdateAddressSchema = (user) => {
    return Joi.validate(user, userSchemaModel.updateAddressInputSchemaModel);
}

const validateUserByUsernameSchema = (username) => {
    return Joi.validate(username, userSchemaModel.getUserByUsernameInputSchemaModel);
}

const validateUserByPhoneNoSchema = (phoneNo) => {
    return Joi.validate(phoneNo, userSchemaModel.getUserByPhoneNoInputSchemaModel);
}


module.exports = {
    validateLoginUserSchema,
    validateNewUserSchema,
    validateUpdatePasswordSchema,
    validateUpdateEmailSchema,
    validateUpdatePhoneNoSchema,
    validateUpdateAddressSchema,
    validateUserByUsernameSchema,
    validateUserByPhoneNoSchema,
}