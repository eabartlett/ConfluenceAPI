/** author: eabartlett
 *
 */

/* Module imports */
var util = require('./util.js');
var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

var responseDataCallback = util.responseDataCallback;

module.exports.post = function(db, schema){
  return function postQ(req, res){
    var q = {
      question: req.body.question,
      audio: req.body.audio,
      user: req.body.user,
      lang: req.body.lang,
    };
    schema.question.create(q, responseDataCallback(res, q));
    schema.user.findOneAndUpdate({_id: ObjectId(q.user)}, {qbit: false}, function(err){});
  }
}

module.exports.get = function(db, schema){
  return function getQ(req, res){
    if(req.query.lang){
      schema.question.findByLanguage(req.query.lang, function(err, data){
        if(err) errorCallback(res)(err);
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(data));
      });
    }else if(req.query.id){
      schema.question.findById(new ObjectId(req.query.id), function(err, data){
        if(err) errorCallback(res)(err);
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(data));
      });
    }else if(req.query.user){
      schema.question.find({user: new ObjectId(req.query.user)}, function(err, data){
        if(err) errorCallback(res)(err);
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(data));
      });
    }else{
      err = {
        'message': 'Use this endpoint to query questions by language, id, or user',
        'errors': 'Invalid query'
        };
      errorCallback(res)(err);
    }
  }
}
