const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
    amount: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required:true }
});

const TransactionModel = model("Transaction", TransactionSchema)

module.exports = TransactionModel;