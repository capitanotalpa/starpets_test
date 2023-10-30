const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

const balanceController = require('./balance/balance.controller');


app.use('/balance', balanceController);

app.listen(port, () => { console.log(`Listening on ${port}`)});
