module.exports = function(db, schema){

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

  function postQ(req, res){
    var q = {
      question: req.body.question,
      audio: req.body.audio,
      user: req.body.user
    };
    schema.question(q).save(errorCallback(res));
    res.end('Success');
  }

  function postA(req, res){
    var a = {
      answer: req.body.answer
    }
    schema.answer(a).save(errorCallback(res));
    res.end('Success');
  }

  function getQ(req, res){
    var params = ["id"];

    //argument object for paramCheck function
    var args = {
      'okay': true,
      'params': params,
      'type': 'get question',
      'object': {},
      'req': req,
      'res': res
    }
    var success = paramCheck(args);
    if(args['okay']){
      /* TODO figure out how to do the querying here. Might need to write some built in
      * query stuff in the schema's
      */
    }
  }

  function getA(req, res){
    //TODO write it
  }
  
  var apiCalls = {
    postQuestion: postQ,
    postAnswer: postA,
    getQuestion: getQ,
    getAnswer: getA
  }


  return function(req, res){
    if(apiCalls[req.body.type]){
      apiCalls[req.body.type](req, res);
    }else{
      res.writeHead(404, {
        'Content-type': 'text/plain'
      });
      res.end("Bad request type: " + req.body.type);
    }
  };
}
