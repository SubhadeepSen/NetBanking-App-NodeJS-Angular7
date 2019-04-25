const express = require('express');
const transactionrouter = express.Router();
const transactionSummaryValidator = require('./transaction-schema-validator');
const transactionDao = require('./transaction-dao');
const Logger = require('../logger/logger');
const log = new Logger('Transaction-Controller');
const authTokenValidator = require('../middleware/auth-token-validator');

//This endpoint is only meant to be used by internal services, not meant to be exposed
transactionrouter.post('/logtransactionsummary', authTokenValidator, (req, res) => {
    let transactionSummary = req.body;
    let { error } = transactionSummaryValidator.validateTransationSummarySchema(transactionSummary);
    if (isNotValidSchema(error, res)) return;
    if (isSameAccountNo(transactionSummary.from, transactionSummary.to, res)) return;
    transactionDao.logTransactionSummary(transactionSummary, res)
                  .then()
                  .catch((err) => log.error(`Error in logging transaction summary of ${transactionSummary}: ` + err));
});

transactionrouter.get('/transactionsummary/:accountno', authTokenValidator, (req, res) => {
    let accountNo = req.params.accountno;
    transactionDao.getTransactionSummary(accountNo, res)
                  .then()
                  .catch((err) => log.error(`Error in retrieving transaction summary for account no. ${accountNo}: ` + err));
});

transactionrouter.get('/generatestatement/:accountno', authTokenValidator, (req, res) => {
    let accountNo = req.params.accountno;
    transactionDao.generateStatement(accountNo, res)
                  .then()
                  .catch((err) => log.error(`Error in generating transaction statement for account no. ${accountNo}: ` + err));
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

function isSameAccountNo(accountNo_1, accountNo_2, res) {
    if (accountNo_1 === accountNo_2) {
        log.error(`Transaction cannot be done on same account, from ${accountNo_1} to ${accountNo_2}`);
        res.status(400).send({
            messageCode: 'INVOPR',
            message: 'Operation cannot be done on same account no.'
        });
        return true;
    }
    return false;
}

module.exports = transactionrouter;