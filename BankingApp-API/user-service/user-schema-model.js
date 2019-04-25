const Joi = require('joi');
const mongoose = require('mongoose');
const Logger = require('../logger/logger');
const log = new Logger('User-Schema-Model');
const bcrypt = require('bcrypt');

const loginUserInputSchemaModel = {
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required()
}

const registerInputUserSchemaModel = {
    firstname: Joi.string().min(1).required(),
    lastname: Joi.string().min(1).required(),
    emailId: Joi.string().email().required(),
    dateOfBirth: Joi.date().iso().required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required(),
    phoneNo: Joi.string().min(10).max(10).required(),
    address: {
        firstline: Joi.string().min(1).required(),
        secondline: Joi.string().min(1).required(),
        city: Joi.string().min(3).required(),
        country: Joi.string().min(3).required(),
        pin: Joi.string().min(6).required()
    },
    //idProof: Joi.binary().required()
}

const updatePasswordInputSchemaModel = {
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required(),
    emailId: Joi.string().email().required(),
    dateOfBirth: Joi.date().iso().required()
}

const updateEmailInputSchemaModel = {
    username: Joi.string().min(6).required(),
    emailId: Joi.string().email().required()
}

const updatePhoneNoInputSchemaModel = {
    username: Joi.string().min(6).required(),
    phoneNo: Joi.string().min(10).max(10).required()
}

const updateAddressInputSchemaModel = {
    username: Joi.string().min(6).required(),
    address: {
        firstline: Joi.string().min(1).required(),
        secondline: Joi.string().min(1).required(),
        city: Joi.string().min(3).required(),
        country: Joi.string().min(3).required(),
        pin: Joi.string().min(6).required()
    }
}

const getUserByUsernameInputSchemaModel = {
    username: Joi.string().min(6).required(),
}

const getUserByPhoneNoInputSchemaModel = {
    phoneNo: Joi.string().min(10).max(10).required()
}

const mongoUserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    emailId: String,
    username: { type: String, unique: true },
    dateOfBirth: Date,
    password: String,
    phoneNo: String,
    address: {
        firstline: String,
        secondline: String,
        city: String,
        country: String,
        pin: String
    }
});

mongoUserSchema.methods.encryptPassword = function(){
    return bcrypt.hashSync(this.password, 10, (err) => {
        if(err){
            log.error('Unable to ecrypt password: ' + err);
        }
    });
}

module.exports = {
    registerInputUserSchemaModel,
    loginUserInputSchemaModel,
    updatePasswordInputSchemaModel,
    updateEmailInputSchemaModel,
    updatePhoneNoInputSchemaModel,
    updateAddressInputSchemaModel,
    getUserByUsernameInputSchemaModel,
    getUserByPhoneNoInputSchemaModel,
    mongoUserSchema
}