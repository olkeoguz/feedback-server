const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

const pageRoutes = require('./routes/page-routes');
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

app.use('/', pageRoutes);
app.use('/feedback', feedbackRoutes);

app.use((err, req, res, next) => {
   console.log(err);
   res.status(err.status || 500).json({
      message: err.message,
      data: err.data,
   });
});

const port = process.env.PORT || 5050;

mongoose
   .connect(
      `mongodb+srv://olkeoguz:cRkoNOmsXASuGkes@feedback.0u2fg.mongodb.net/?retryWrites=true&w=majority` 
      
   )
   .then((result) => {
      app.listen(port).setTimeout(500000);
      console.log('app started on ' + 5050);
      app.emit('app_started');
   })
   .catch((err) => {
      throw err;
   });

module.exports = app;
