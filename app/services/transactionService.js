const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel.js');
const findAll = async (req, res) => {
  try {
    const transaction = await TransactionModel.find({});
    res.send(transaction);
  } catch (error) {
    res.status(500).send('Erro: Não foi encontrado nenhuma transação');
  }
};

const findByPeriod = async (req, res) => {
  try {
    if (req.query.period) {
      const transactions = await TransactionModel.find({
        yearMonth: req.query.period,
      });
      const transactionsResponse = {
        length: transactions.length,
        transactions: transactions,
      };
      res.send(transactionsResponse);
    } else {
      res.send(
        'É necessário informar o parâmetro"period", cujo valor deve estar no formato yyyy-mm'
      );
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Erro ao listar todos os documentos ',
    });
  }
};

const create = async (req, res) => {
  try {
    let transaction = req.body;
    transaction = new TransactionModel(transaction);
    await transaction.save();
    res.send({ message: 'transaction inserida com sucesso' });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Dados para atualização vazios!' });
  }
  const id = req.params.id;
  let updateTransaction = req.body;
  delete updateTransaction._id;

  try {
    updateTransaction = await TransactionModel.findOneAndUpdate(
      { _id: id },
      updateTransaction
    );
    updateTransaction = await TransactionModel.findOne({ _id: id });
    res.send(`PUT  - ${id} - ${updateTransaction}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a Transaction id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    let transaction = await TransactionModel.findOne({ _id: id });
    if (transaction) {
      transaction = new TransactionModel(transaction);
      await transaction.deleteOne();
      res.send(`Deletado com sucesso transação com id: ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
  }
};

module.exports = { findAll, findByPeriod, create, remove, update };
