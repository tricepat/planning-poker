const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  name: {type: String, required: true, maxlength: 100},
  description: {type: String, required: true, maxlength: 500},
  isVotable: {type: Boolean, default: true},
  pollId: {type: String, required: true},
  votes: {type: Map, default: {}}
});


module.exports = mongoose.model('Task', taskSchema);
