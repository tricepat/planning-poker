const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = mongoose.model('Task').schema;

let pollSchema = new Schema({
    name: {type: String, required: true, maxlength: 100},
    tasks: [TaskSchema]
});


module.exports = mongoose.model('Poll', pollSchema);
