const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VoteSchema = mongoose.model('Vote').schema;

let taskSchema = new Schema({
  name: {type: String, required: true, maxlength: 100},
  description: {type: String, required: true, maxlength: 500},
  isVotable: {type: Boolean, default: true},
  pollId: {type: String, required: true},
  votes: [VoteSchema]
});


module.exports = mongoose.model('Task', taskSchema);
