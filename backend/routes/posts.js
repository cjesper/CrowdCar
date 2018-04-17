var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

//Internal packages
var Post = require('../models/post.js');

// GET all posts 
router.get('/', function(req, res) {
        Post.find(
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

//Add new post 
router.post('/', function (req, res) {
          var post_text = req.body.post_text;
          var post_time = Date.now();
          var unique_id = uuidv4();
          console.log(req.body);
          Post.update(
              {unique_id : unique_id},
              {nick: workout_name,
               text : workout_notes,
               time : post_time 
              },
              {upsert : true, new: true},
              function (err, post) {
                if (err) {
                  res.send(err);
                } else {
                  console.log(post);
                  res.send(post)
                }
              } 
          );
});

module.exports = router;

