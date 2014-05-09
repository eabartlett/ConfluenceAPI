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
var ObjectId = mongoose.Types.ObjectId;

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
    type: String,
    required: true
  },
  audio: {
    type: String,
    default: null,
    required: false
  },
  rating: {
    type: Number,
    required: false,
    default: 0
  }
});


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

answerSchema.statics.increment = function(id, cb){
  this.findOneAndUpdate({_id: new ObjectId(id)}, {$inc:{rating:1}}, cb);
};

answerSchema.statics.decrement = function(id, cb){
  this.findOneAndUpdate({_id: new ObjectId(id)}, {$inc:{rating:-1}}, cb);
};

var Answer = mongoose.model('Answer', answerSchema);
module.exports = function(schema){
  schema.answer = Answer;
};
