/** author: eabartlett
 *
 */

/* Module imports */
var util = require('./util.js');
var mongoose = require('mongoose');


var ObjectId = mongoose.Types.ObjectId;
var responseDataCallback = util.responseDataCallback;

module.exports.post = function(db, schema){
  return function postA(req, res){
    var a = {
      answer: req.body.answer
    }
    schema.answer.create(a, responseDataCallback(res));
  }
}

module.exports.get = function(db, schema){
  return function getA(req, res){
    if(req.query.qid){
      //Get all answers for a given question given by question's id (qid)
    }else if(req.query.id){
      //Get an answer by it's id
      schema.answer.findById(new ObjectId(req.query.id), responseDataCallback(res));
    }else if(req.query.user){
      //Get all of a user's answers
    }else{
      //Handle bad request
    }
  }
}
