/** author: eabartlett
 *
 */

/* Module imports */
var util = require('./util.js');

var errorCallback = util.errorCallback;

module.exports.post = function(db, schema){
  return function postQ(req, res){
    var q = {
      question: req.body.question,
      audio: req.body.audio,
      user: req.body.user
    };
    schema.question(q).save(errorCallback(res));
    res.end('Success');
  }
}
module.exports.get = function(db, schema){
  return function getQ(req, res){
    //TODO Write it
  }

}


function errorCallback(res){
  return function(err){
    if(err){
      res.writeHead(403,{
        'Content-type': 'text/plain'
      });
      res.write(err.message);
      res.write(JSON.stringify(err.errors));
      res.end();
    }
  }
}
