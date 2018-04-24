var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

//Internal packages
var Command = require('../models/command.js');

// GET the chosen command 
router.get('/', function(req, res) {
        Command.find(
            {}
          ).exec(function (err, result) {
              if (err) {
                res.send(err);
                throw err;
              } else {
                  res.send(result);
            }
        });
});

//Add new command 
router.post('/', function (req, res) {
          var command_name = req.body.command_name;
          var command_time = Date.now();
          var unique_id = uuidv4();
          console.log(req.body);
          Command.update(
              {unique_id : unique_id},
              {
               command_name : command_name,
               command_time : command_time 
              },
              {upsert : true, new: true},
              function (err, command) {
                if (err) {
                  res.send(err);
                } else {
                  console.log(command);
                  res.send(command)
                }
              } 
          );
});

module.exports = router;

