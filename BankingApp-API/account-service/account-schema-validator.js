const Joi = require('joi');
const accountSchemaModel = require('./account-schema-model');

const validateCreateNewAccountSchema = (newAccount) => {
    return Joi.validate(newAccount, accountSchemaModel.newAccountInputSchemaModel);
}

const validatePayeeSchema = (payee) => {
    return Joi.validate(payee, accountSchemaModel.payeeInputSchemaModel);
}

const validateTransferAmountSchema = (transferAmount) => {
    return Joi.validate(transferAmount, accountSchemaModel.transferAmountSchemaModel);
}

module.exports = {
    validateCreateNewAccountSchema,
    validatePayeeSchema,
    validateTransferAmountSchema
}