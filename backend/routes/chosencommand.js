var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

//Internal packages
var ChosenCommand = require('../models/chosencommand.js');

//Get all chosen commands 
router.get('/', function(req, res) {
  ChosenCommand.find({})
    .sort({ command_time : -1})
    .exec((err, commands) => {
      if (!err) {
        res.send(commands)
        console.log(commands);
      } else {
        res.send(err)
      }
    })
});

//Get the latest chosen command
router.get('/latest', function(req, res) {
  try {
  ChosenCommand.find({})
    .sort({ command_time : -1})
    .limit(1)
    .exec((err, commands) => {
      if (!err) {
        res.send(commands)
        console.log(commands);
      } else {
        res.send(err)
      }
    })
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;

