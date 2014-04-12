var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = Schema({
  question: String,
  time: Date.now,
  user: ObjectId,
  audio: String,
  answers: Array
});

var Question = mongoose.model('Question', questionSchema);

var answerSchema = Schema({
  question: ObjectId,
  time: Date.now,
  user: ObjectId,
  audio: String
});

var Answer = mongoose.model('Answer', answerSchema);

var userSchema = Schema({
  email: String,
  firstName: String,
  lastName: String,
  username: String,
  pw: String,
  questions: Array,
  answers: Array,
  langs: Array
  pic: String
});

var User = mongoose.model('User', userSchema);

exports.Question = Question;
exports.Answer = Answer;
exports.User = User;
