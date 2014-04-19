/** author: eabartlett
* Mongoose schema for an Answer to a question
* @question - Id of the question in the DB
* @time - time the answer was posted
* @user - Id of the user asking the question
* @audio - path to Audio on the server, empty string if no audio
*/

var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;
var types = mongoose.Schema.Types;

var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;

var uploadDir = path.join(__dirname, 'uploads');
var answerSchema = Schema({
  /* Put in once basic testing is done
  question: {
    type: types.ObjectId,
    require: true
  },
  */
  answer: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    default: Date.now,
    required: true
  },
  /* Put in once basic testing is done
  user: {
    type: types.ObjectId,
    required: true
  }
  */
});

var Answer = mongoose.model('Answer', answerSchema);

/** TODO
 * Come up with all the mongodb queries we'll need and make them static functions
 * Filter Answers by User
 */

module.exports = function(schema){
  schema.answer = Answer;
};
