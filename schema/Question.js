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
  /*Commented out for testing, need to figure out exactly how this is going to work
  user: {
    type: types.ObjectID,
    required: true,
  }*/
  question: {
    type: String,
    validation: function(v){return v.length > 0}, 
    required: true
  },
  time: {
    type: Date,
    default: Date.now,
    validation: function(v){return v > 0},
    require: true
  },
  answers: {
    type: Array,
    default: [],
    require: true
  },
  audio: {
    type: String,
    require: false
  }
});

/** TODO
 * Come up with all the mongodb queries we'll need and make them static functions
 * Add in actually searching in the question? Not sure exactly how that's going to work
 * Filter Questions by language
 * Filter questions by User
 */

var Question = mongoose.model('Question', questionSchema);

module.exports = function(schema){
  schema.question = Question;
};
