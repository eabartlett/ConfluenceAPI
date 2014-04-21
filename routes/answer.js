/** author: eabartlett
 *
 */

/* Module imports */
var util = require('./util.js');

var errorCallback = util.errorCallback;
module.exports.post = function(db, schema){
  return function postA(req, res){
    var a = {
      answer: req.body.answer
    }
    schema.answer(a).save(errorCallback(res));
    res.end('Success');
  }
}

module.exports.get = function(db, schema){
  return function getA(req, res){
    //TODO Write it
  }
}
