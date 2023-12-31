const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const transaction = require('./models/transaction.js')
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req,res) => {
    res.json("Test")
});

app.post('/api/transaction', async (req, res) => {
    const { amount, description, date } = req.body;
    await mongoose.connect(process.env.MONGO_URL);
    const Transaction = await transaction.create({
        amount: amount,
        description: description,
        date:date
    })

    res.json(Transaction);
})

app.get('/api/transactions/', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const Transactions = await transaction.find();
    res.json(Transactions);
})

app.delete('/api/transaction/delete/:id', async (req, res) => {
    const id = req.params.id
    await mongoose.connect(process.env.MONGO_URL);
    const Transactions = await transaction.deleteOne(await transaction.findById(id));
    res.json(Transactions);
})

app.put('/api/transaction/update/:id', async (req, res) => {
    const id = req.params.id
    const { amount, description, date } = req.body
    await mongoose.connect(process.env.MONGO_URL);
    var Transactions = await transaction.findByIdAndUpdate(id, {
        amount:amount,
        date:date,
        description:description,
    });
    res.json(Transactions);
})


if (process.env.PORT) {
    app.listen(4000)
}

module.exports = app;