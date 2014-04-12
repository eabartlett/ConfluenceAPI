/** author: eabartlett
* Mongoose Schema for a User
* @username- user's username, non-empty
* @email- user's email, empty string if not given
* @firstName- user's first name, empty string if not given
* @lastName- user's last name, empty string if not given
* @pw- user's password, non-empty
* @question - Array of ObjectId's of the questions this user has asked
* @answers - Array of ObjectId's of the answers this user has given
* @langs - Array of String's of a User's languages spoken/learning
* @pic - String path to user's image, empty string if no picture
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var types = mongoose.Schema.Types;

var userSchema = Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  username: String,
  pw: String,
  questions: Array,
  answers: Array,
  langs: Array,
  pic: String
});

var User = mongoose.model('User', userSchema);

module.exports = function(schema){
  schema.user = User;
};
