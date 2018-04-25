//Schema that holds the chosen command to be executed
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChosenCommandSchema = new Schema({
    unique_id: String,
    command_name: String,
    command_time: Number,
    command_time_date : Date,
    command_votes : Number
});

var ChosenCommand = mongoose.model('ChosenCommand', ChosenCommandSchema);

module.exports = ChosenCommand;
