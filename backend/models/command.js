var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommandSchema = new Schema({
    unique_id: String,
    command_name: String,
    command_time: Date,
});

var Command = mongoose.model('Command', CommandSchema);

module.exports = Command;
