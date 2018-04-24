var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

//Internal packages
var Command = require('../models/command.js');

// Figure out and send which command should be executed to the server
router.get('/', function(req, res) {
        var now = Date.now() / 1000;

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
                  //Party, rock, break
                  let vote_vector = [0, 0, 0]
                  for (var i = 0; i < result.length; i++) {
                    var vote = result[i].command_name
                    if (vote == "PARTY") {
                        vote_vector[0]++;
                    } else if (vote == "ROCK") {
                        vote_vector[1]++; 
                    } else if (vote == "BREAK CAR") {
                        vote_vector[2]++;
                    }
                  }
                  var winning_vote = findIndexOfGreatest(vote_vector);
                  var winner_name;
                  if (winning_vote === 0) {
                    winner_name = "PARTY";
                  } else if (winning_vote === 1) {
                    winner_name = "ROCK"
                  } else if (winning_vote === 2) {
                    winner_name = "BREAK"
                  }
                  res.send(winner_name + " with " + vote_vector[winning_vote] + " votes!");
            }
        });
});

function findIndexOfGreatest(array) {
  var greatest;
  var indexOfGreatest;
  for (var i = 0; i < array.length; i++) {
    if (!greatest || array[i] > greatest) {
      greatest = array[i];
      indexOfGreatest = i;
    }
  }
  return indexOfGreatest;
}

module.exports = router;

