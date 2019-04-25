const Logger = require('../logger/logger');
const log = new Logger('Transaction-Dao');
const mongoose = require('mongoose');
const transactionSchema = require('./transaction-schema-model').mongoTransactionSchema;
const TransactionModel = mongoose.model('Transaction', transactionSchema);
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const createDocumentDefinition = require('./pdf-document-definition');
const config = require('config');

const dbUrl = config.get('mongodb-config.protocol') + config.get('mongodb-config.host') + config.get('mongodb-config.port') + config.get('mongodb-config.db');

mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
        .then(log.info('connected to mongo database....'))
        .catch(err => log.error('unable to connect, please check your connection....' + err));

//Below statement is only for development purpose, can be removed
mongoose.connection.dropCollection('transactions', err => { if (err) log.error('Unable to drop transaction collections: ' + err) });

const logTransactionSummary = async (transactionSummary, response) => {
    let newSummary = new TransactionModel({
        amount: transactionSummary.amount,
        transferedOn: new Date(transactionSummary.transferedOn),
        to: transactionSummary.to,
        from: transactionSummary.from,
        remark: transactionSummary.remark
    });

    await newSummary.save((err, result) => {
        if (err || !result) {
            log.error(`Error in logging transaction summary of ${transactionSummary}: ` + err);
            return response.status(400).send({
                messageCode: new String(err.errmsg).split(" ")[0],
                message: 'Unable to log transaction summary from ' + transactionSummary.from + ' to ' + transactionSummary.to
            });
        }
        log.info('Logged transaction summary from ' + transactionSummary.from + ' to ' + transactionSummary.to);
        return response.send({
            messageCode: 'TRNSMRLG',
            message: 'Transaction summary has been successfully logged.',
            from: result.from,
            to: result.to,
            amount: result.amount
        });
    });
}

const getTransactionSummary = async (accountNo, response) => {
    await retrieveTransactionSummary(accountNo)
        .then((summary) => {
            return response.send({
                messageCode: 'TRNSMRY',
                summary: summary
            });
        })
        .catch((err) => {
            log.error(`Error in retrieving transaction summary for account no. ${accountNo}: ` + err);
            return response.status(400).send({
                messageCode: new String(err.errmsg).split(" ")[0],
                message: 'Unable to retrive transaction summary for ' + accountNo
            });
        });
}

const generateStatement = async (accountNo, response) => {
    const summary = await retrieveTransactionSummary(accountNo);
    const docDefinition = await createDocumentDefinition(summary);

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const pdfDocument = pdfMake.createPdf(docDefinition);
    
    pdfDocument.getBase64((data) => {
        //sending downloadable pdf to client
       /* response.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="statement.pdf"'
        });
        const pdf = Buffer.from(data.toString('utf-8'), 'base64');
        response.end(pdf);*/

        //sending buffer data as JSON, pdf file can be re-constructed from this buffer
        const pdfJsonBuffer = Buffer.from(data.toString('utf-8'), 'base64').toJSON();
        log.info(`generating transaction summary statement for account no. ${accountNo} : [${new Date()}] `);
        response.send({
            statement: accountNo,
            buffer: pdfJsonBuffer.data
        });
    });
}

async function retrieveTransactionSummary(accountNo) {
    return await TransactionModel.find({ from: accountNo })
        .sort({ transferedOn: -1 })
        .then(result => {
            let tempSummary = {};
            let responseSummary = [];
            result.forEach(summary => {
                tempSummary = {};
                tempSummary.amount = summary.amount;
                tempSummary.transferedOn = summary.transferedOn;
                tempSummary.to = summary.to;
                tempSummary.from = summary.from;
                tempSummary.remark = summary.remark;
                responseSummary.push(tempSummary);
            });
            return responseSummary;
        })
        .catch(err => {
            throw new Error(err);
        });
}

module.exports = {
    logTransactionSummary,
    getTransactionSummary,
    generateStatement
}