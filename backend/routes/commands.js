var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

//Internal packages
var Command = require('../models/command.js');

// GET all commands 
router.get('/', function(req, res) {
        var now = Date.now() / 1000;
        console.log(now);

        //Query for events elapsed in the last 30 seconds
        Command.find(
            {
                 command_time: {$gte : now - 30}
            }
          ).exec(function (err, result) {
              if (err) {
                res.send(err);
                throw err;
              } else {
                  for (var i = 0; i < result.length; i++) {
                    var time = result[i].command_time
                    console.log(now - time) 
                  }
                  res.send(result);
            }
        });
});

//Add new command 
router.post('/', function (req, res) {
          var command_name = req.body.command_name;
          var command_time = Date.now() / 1000;
          var unique_id = uuidv4();
          console.log(command_time);
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

