var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    unique_id: String,
    nick : String,
    text : String,
    time : String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
