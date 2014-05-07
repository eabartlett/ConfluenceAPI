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
  return function(req, res){
    var model = (req.query.question)?schema.question:schema.answer;
    var id = (req.query.question)?req.query.question:req.query.answer;
    model.findById(new ObjectId(id), function(err, data){
      console.log(data.audio);
      var stat = fs.statSync(data.audio);
      var file = fs.createReadStream(data.audio);
      console.log(file);
      res.writeHeader(200, {
        'Content-type': 'audio/mpeg',
        'Content-length': stat.size
      });
      file.pipe(res);
    });
  }
}

module.exports.post = function(db, schema, uploadPath){
  return function(req, res){
    //use model.update to put path to file into the db
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      var model = (fields.question)?schema.question:schema.answer;
      var id = (fields.question)?fields.question:fields.answer;
      var filename = path.join(uploadPath, id+'.3gp');
      console.log(files.audio);
      model.findOneAndUpdate(
        {_id: new ObjectId(id)}, {audio: filename}, function(err){}
      );
      fs.rename(files.audio.path, filename, function(err){
        if(err) res.end('Error uploading audio:\n\n' + err.toString());
      });  
      model.findById(new ObjectId(id), function(err, data){
        if(!data){
          res.end("Invalid question Id");
        }
	console.log(data);
        res.end(JSON.stringify(data));
      });
    });
  }
}
