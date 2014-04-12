/** author: eabartlett
* Mongoose schema for an Answer to a question
* @question - Id of the question in the DB
* @time - time the answer was posted
* @user - Id of the user asking the question
* @audio - path to Audio on the server, empty string if no audio
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var types = mongoose.Schema.Types;

var answerSchema = Schema({
  question: types.ObjectId,
  time: Number,
  user: types.ObjectId,
  audio: String
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = function(schema){
  schema.answer = Answer;
};
