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
var ObjectId = mongoose.Types.ObjectId;

var questionSchema = Schema({
  user: {
    type: types.ObjectId,
    required: true,
  },
  question: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now,
    validation: function(v){return v > 0},
    required: false
  },
  /* Query answers by question instead of this field
  answers: {
    type: Array,
    default: [],
    required: false
  },
  */
  audio: {
    type: String,
    required: false
  },
  lang: {
    type: String,
    validation: function(v){return v.length > 0},
    required: true
  }
});

questionSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

/** TODO
 * Come up with all the mongodb queries we'll need and make them static functions
 * Add in actually searching in the question? Not sure exactly how that's going to work
 * Filter Questions by language
 * Filter questions by User
 */
questionSchema.statics.findByLanguage = function(lang, cb){
  this.find({lang: lang}, cb);
};

questionSchema.statics.findByUser = function(user, cb){
  this.find({user: ObjectId(user)}, cb);
};

var Question = mongoose.model('Question', questionSchema);

module.exports = function(schema){
  schema.question = Question;
};
