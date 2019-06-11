const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pollSchema = new Schema({
  name: {type: String, required: true, maxlength: 100},
  tasks: []
});

module.exports = mongoose.model('Poll', pollSchema);
