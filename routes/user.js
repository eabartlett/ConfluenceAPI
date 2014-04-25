/** author: eabartlett
 *
 */

/* Module imports */
var util = require('./util.js');
var mongoose = require('mongoose');


var ObjectId = mongoose.Types.ObjectId;
var responseDataCallback = util.responseDataCallback;
var errorCallback = util.errorCallback;

exports.get = function(db, schema){
  return function(req, res){
    if(req.query.id){
      schema.user.findById(new ObjectId(req.query.id), responseDataCallback(res));
    }else{
      //handle bad GET request
      var err = {
        'message': 'Incorrect query, this endpoint is for getting a user\'s profile',
        'error': 'Invalid GET parameters'
      };
      errorCallback(res)(err);
    }
  }
};

exports.post = function(db, schema){
  return function(req, res){
    var newUser = {
      username: req.body.username,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pw: 'pw',
      learningLanguages: req.body.learningLanguages,
      profLanguages: req.body.profLanguages
    };
    console.log(schema.user.create);
    schema.user.create(newUser, responseDataCallback(res));
  }
};
