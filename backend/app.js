var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');
var uuidv4 = require('uuid/v4');

app.use(cors());
//Local mongo url
var mongo_url = 'mongodb://localhost:27017/crowdcar';

//Remote mongo_url
var remote_mongo = "mongodb://crowdcar:crowdcar@ds255319.mlab.com:55319/crowdcar"
mongoose.connect(remote_mongo, function (err, db) {
  if (err) {
    console.log("Unable to connect to mongo.");
  } else {
    console.log("Mongo connection established!", remote_mongo)
  }
})

//Routes
var posts = require('./routes/posts');
var commands = require('./routes/commands');
var chosencommands = require('./routes/chosencommand');

//Models
var Command = require('./models/command.js');
var ChosenCommand = require('./models/chosencommand.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/posts', posts)
app.use('/commands', commands)
app.use('/chosencommand', chosencommands)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.send(err);
});

choose_command = () => {
  console.log("CALC")
    var now = Date.now() / 1000;

    //Query for events elapsed in the last 15 seconds
    Command.find(
        {
             command_time: {$gte : now - 15}
        }
      ).exec(function (err, result) {
          if (err) {
            console.log(err) 
          } else {
              //Party, rock, break
              let vote_vector = [0, 0, 0, 0]
              for (var i = 0; i < result.length; i++) {
                var vote = result[i].command_name
                console.log(vote);
                if (vote == "PARTY") {
                    vote_vector[0]++;
                } else if (vote == "ROCK") {
                    vote_vector[1]++; 
                } else if (vote == "BREAK") {
                    vote_vector[2]++;
                } else if (vote == "WEDDING") {
                    vote_vector[3]++;
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
              } else if (winning_vote === 3) {
                winner_name = "WEDDING"
              }
              console.log(vote_vector);
              console.log(winner_name + " with " + vote_vector[winning_vote] + " votes!");
              var command_id = uuidv4(); 
              ChosenCommand.update(
                {unique_id : command_id},
                {
                    command_name : winner_name, 
                    command_time : now,
                    command_time_date : new Date(now*1000),
                    command_votes : vote_vector[winning_vote]
                },
                {upsert: true, new: true},
                function (err, command) {
                  if (!err) {
                    console.log(command)
                  }
                } 
              )
        }
    });
}

function findIndexOfGreatest(array) {
  var greatest;
  var indexOfGreatest;
  for (var i = 0; i < array.length; i++) {
    if (!greatest || array[i] > greatest) {
      greatest = array[i];
      indexOfGreatest = i;
    }
  }
    console.log(indexOfGreatest);
  return indexOfGreatest;
}


//Calculate the chosen command, in 30 second intervals
setInterval(() => {
    choose_command() 
}, 15000);

app.listen(5000, () =>
  console.log("Listening on 5000"));

module.exports = app;
