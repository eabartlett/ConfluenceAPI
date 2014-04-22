/** author: eabartlett
 *
 */

/* Module imports */
var util = require('./util.js');

var postedCallback = util.postedCallback;
module.exports.post = function(db, schema){
  return function postA(req, res){
    var a = {
      answer: req.body.answer
    }
    schema.answer.create(a, postedCallback(res));
  }
}

module.exports.get = function(db, schema){
  return function getA(req, res){
    //TODO Write it
  }
}
