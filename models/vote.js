const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let voteSchema = new Schema({
  username: {type: String, required: true, maxlength: 100},
  value: {type: String, required: true, maxlength: 500},
  taskId: {type: String, required: true}
});

module.exports = mongoose.model('Vote', voteSchema);
