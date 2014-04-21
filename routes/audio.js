/** author: eabartlett
 *
 */

/* Module imports */
var fs = require('fs');
var util = require('./util.js');

var errorCallback = util.errorCallback;

module.exports.get = function(db, schema){
  return function(req, res){}
}

module.exports.post = function(db, schema){
  return function(req, res){
    //use model.update to put path to file into the db
    console.log(req.files.audio);
    fs.writeFile('audio.m4a', req.files.audio, function(err){
      if(err) console.err("Error uploading file");
      res.end('Success');
    });
  }
}
