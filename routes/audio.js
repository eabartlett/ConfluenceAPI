/** author: eabartlett
 *
 */

/* Module imports */
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var mongoose = require('mongoose');

var util = require('./util.js');

var ObjectId = mongoose.Types.ObjectId;
var errorCallback = util.errorCallback;

module.exports.get = function(db, schema){
  return function(req, res){}
}

module.exports.post = function(db, schema, uploadPath){
  return function(req, res){
    //use model.update to put path to file into the db
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      var filename = path.join(uploadPath, fields.id+'.m4a');
      
      schema.question.findOneAndUpdate(
        {_id: new ObjectId(fields.id)}, {audio: filename}, function(err){}
      );
      schema.question.findById(new ObjectId(fields.id), function(err, data){
        res.end(JSON.stringify(data));
      });
      fs.rename(files.audio.path, filename, function(err){
        if(err) res.end('Error uploading audio:\n\n' + err.toString());
      });  
      schema.question.findById(new ObjectId(fields.id), function(err, data){
        if(!data){
          res.end("Invalid question Id");
        }
        res.end(JSON.stringify(data));
      });
    });
  }
}
