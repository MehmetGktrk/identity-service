const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const databaseMiddleware = require('./middlewares/databaseMiddleware');







const app = express();


app.use(cors());

app.use(bodyParser.json());

app.use(databaseMiddleware);



module.exports = app;