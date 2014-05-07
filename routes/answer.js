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
    console.log(req.body.user, req.body.question);
    var a = {
      answer: req.body.answer,
      question: new ObjectId(req.body.question),
      user: new ObjectId(req.body.user)
    }
    schema.answer.create(a, responseDataCallback(res));
  }
}

module.exports.get = function(db, schema){
  return function getA(req, res){
    if(req.query.qid){
      //Get all answers for a given question given by question's id (qid)
      schema.answer.findByQuestion(req.query.qid, function(err, data){
	console.log(data);
        if(err) errorCallback(res)(err);
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(data));
      });
    }else if(req.query.id){
      //Get an answer by it's id
      schema.answer.findById(new ObjectId(req.query.id), function(err, data){
        if(err) errorCallback(res)(err);
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(data));
      });
    }else if(req.query.user){
      //Get all of a user's answers
      schema.answer.find({user: new ObjectId(req.query.user)}, function(err, data){
        if(err) errorCallback(res)(err);
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(data));
      });
    }else{
      //handle bad GET request
      var err = {
        'message': 'Incorrect query, this endpoint is for getting a answers',
        'error': 'Invalid GET answer parameters'
      };
      errorCallback(res)(err);
    }
  }
}
