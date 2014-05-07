/** author: eabartlett
 *
 */

/* Module imports */
var util = require('./util.js');
var mongoose = require('mongoose');
var fs = require('fs');
var bcrypt = require('bcrypt');

var salt = fs.readFileSync('salt.key', 'utf-8').trim('\n');

console.log(salt);
var ObjectId = mongoose.Types.ObjectId;
var responseDataCallback = util.responseDataCallback;
var errorCallback = util.errorCallback;

exports.delLang = function(db, schema){
  return function(req, res){
    schema.user.delLang(req.body.id, req.body.lang, function(err, data){
      if(!err) res.end(JSON.stringify(err));
      res.end(JSON.stringify(data));
    });
  }
}

exports.lang = function(db, schema){
  return function(req, res){
    schema.user.addLang(req.body.id, req.body.lang, function(err, data){
      if(!err) res.end(JSON.stringify(err));
      res.end(JSON.stringify(data));
    });
  }
}

exports.login = function(db, schema){
  return function(req, res){
    schema.user.validLogin(req.body.username, bcrypt.hashSync(req.body.pw, salt), function(err, data){
      if(!err) res.end(JSON.stringify(err));
      if(data.length > 0){
        res.end('SUCCESS');
      }else{
        res.end('INVALID LOGIN');
      }
    });
  }
};

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
      pw: bcrypt.hashSync(req.body.pw, salt),
      learningLanguages: req.body.learningLanguages,
      profLanguages: req.body.profLanguages
    };
    console.log(schema.user.create);
    schema.user.create(newUser, responseDataCallback(res));
  }
};
