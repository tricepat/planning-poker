const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const task = require('./routes/task');
const user = require('./routes/user');
const poll = require('./routes/poll');

// connect to mongodb
var mongoConnectionStr = 'mongodb+srv://player0:lazuli@planning-poker-dsrin.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoConnectionStr, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db!');
});

app.use(cors());
app.use(bodyParser.json());

// register routes
app.use('/tasks', task);
app.use('/polls', poll);
app.use('/users', user);

// handle undefined routes
app.get('*', function(req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error('handling error: ' + err.message);
  if (!err.statusCode) err.statusCode = 500; // default to generic server error status code
  res.status(500).send({ error: err });
});

app.listen(config.APP_PORT, () => console.log(`Listening on port ${config.APP_PORT}`));
