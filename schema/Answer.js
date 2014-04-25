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
  question: {
    type: types.ObjectId,
    require: true
  },
  answer: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    default: Date.now,
    required: false
  },
  user: {
    type: types.ObjectId,
    required: true
  },
  audio: {
    type: String,
    default: null,
    required: false
  }
});

var Answer = mongoose.model('Answer', answerSchema);

/** TODO
 * Come up with all the mongodb queries we'll need and make them static functions
 * Filter Answers by User
 */

answerSchema.statics.findByQuestion = function(question, cb){
  this.find({question: ObjectId(question)}, cb);
};

answerSchema.statics.findByUser = function(user, cb){
  this.find({user: ObjectId(user)}, cb);
};

module.exports = function(schema){
  schema.answer = Answer;
};
