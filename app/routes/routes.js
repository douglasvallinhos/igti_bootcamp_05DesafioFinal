const express = require('express');
const transactionRouter = express.Router();

const services = require('../services/transactionService.js');
transactionRouter.get('/allTransactions', services.findAll);
transactionRouter.get('/', services.findByPeriod);
transactionRouter.post('/', services.create);
transactionRouter.put('/:id', services.update);
transactionRouter.delete('/:id', services.remove);

module.exports = transactionRouter;
