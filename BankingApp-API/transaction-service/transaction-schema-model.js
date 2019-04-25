const Joi = require('joi');
const mongoose = require('mongoose');

const transactionSummarySchemaModel = {
    amount: Joi.string().required(),
    transferedOn: Joi.date().iso().required(),
    to: Joi.string().min(12).required(),
    from: Joi.string().min(12).required(),
    remark: Joi.optional()
}

const mongoTransactionSchema = new mongoose.Schema({
    amount: String,
    transferedOn: Date,
    to: String,
    from: String,
    remark: String
});

module.exports = {
    transactionSummarySchemaModel,
    mongoTransactionSchema
}