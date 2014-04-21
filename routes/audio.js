/** author: eabartlett
 *
 */

/* Module imports */
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

var util = require('./util.js');

var errorCallback = util.errorCallback;

module.exports.get = function(db, schema){
  return function(req, res){}
}

module.exports.post = function(db, schema, uploadPath){
  return function(req, res){
    //use model.update to put path to file into the db
    var form = new formidable.IncomingForm();
    console.log('erik');
    form.parse(req, function(err, fields, files){
      var filename = path.join(uploadPath, 'sample.m4a');
      fs.rename(files.audio.path, filename, function(err){
        if(err) res.end('Error uploading audio:\n\n' + err.toString());
        res.end('Finally doing something');
      });  
    });
  }
}
