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
var path = require('path');
var Schema = mongoose.Schema;

//TODO add in the plugin to schema

var userSchema = Schema({
  username: {
    type: String,
    default: 'Confluence',
    required: true,
    unique: true
  },
  email: {
    type: String,
    default: 'eb@confluence.com',
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    default: 'Anon',
    required: true
  },
  lastname: {
    type: String,
    default: 'Mouse',
    required: true
  },
  pw: {
    type: String,
    default: '8675309',
    required: true
  },
  questions: {
    type: Array,
    default: [],
  },
  answers: {
    type: Array,
    default: [],
  },
  learningLanguages: {
    type: Array,
    default: []
  }
  profLanguages: {
    type: Arra,
    default: []
  }
});

/** Queries to create/execute (Schema methods)
 * Find all questions

var User = mongoose.model('User', userSchema);

module.exports = function(schema){
  schema.user = User;
};
