const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const transaction = require('./models/transaction.js')
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req,res) => {
    res.json("Test3")
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


if (process.env.PORT) {
    app.listen(4000)
}

module.exports = app;