const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

const feedbackRoutes = require('./routes/feedback-routes');

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(
   express.urlencoded({
      extended: 'true',
   })
);


app.use(express.static(path.join(__dirname, 'src')));

app.use('/feedback', feedbackRoutes);

app.use((err, req, res, next) => {
   console.log(err);
   res.status(err.status || 500).json({
      message: err.message,
      data: err.data,
   });
});

mongoose
   .connect(
      `mongodb+srv://olkeoguz:cRkoNOmsXASuGkes@feedback.0u2fg.mongodb.net/?retryWrites=true&w=majority` 
      
   )
   .then((result) => {
      app.listen(5050).setTimeout(500000);
      console.log('app started ON' + 5050);
      app.emit('app_started');
   })
   .catch((err) => {
      throw err;
   });

module.exports = app;
