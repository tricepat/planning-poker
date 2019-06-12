const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {type: String, required: true, maxlength: 100},
  role: {type: String}
});

module.exports = mongoose.model('User', userSchema);
