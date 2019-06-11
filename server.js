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
//mongoose.connect('mongodb://localhost:/test', {useNewUrlParser: true});
mongoose.connect(mongoConnectionStr, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db!');
  // we're connected!
});

app.use(cors());
app.use(bodyParser.json());

// register routes
app.use('/tasks', task);
app.use('/polls', poll);
app.use('/users', user);

app.listen(config.APP_PORT, () => console.log(`Listening on port ${config.APP_PORT}`));
