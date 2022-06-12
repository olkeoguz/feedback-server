const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(
   express.urlencoded({
      extended: 'true',
   })
);



module.exports = app;
