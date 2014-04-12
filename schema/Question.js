/** author: eabartlett
* Mongoose schema for a posted Question
* @question - physcial question text
* @time - time the question was asked
* @user - ObjectId of the user that asked the question
* @audio - path to audio for question, empty string is none
* @answers - Array of ObjectId's of answers to this question
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var types = mongoose.Schema.Types;

var questionSchema = Schema({
  question: String,
  time: Number,
  user: types.ObjectId,
  audio: String,
  answers: Array
});

var Question = mongoose.model('Question', questionSchema);

module.exports = function(schema){
  schema.question = Question;
};
