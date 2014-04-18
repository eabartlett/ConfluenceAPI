function paramCheck(args){
  args['params'].forEach(function(param, type){
    if(args['req'].body[param]){
      //put in question
      args['object'][param] = args['req'].body[param];
    }else{
      var res = args['res'];
      res.writeHead(404, {
        'Content-type': 'text/plain'
      });
      res.end("Bad posted "+ args['type'] + " parameter: " + param);
      args['okay'] = false;
    }
  });
}
module.exports = function(db, schema){

  function postQ(req, res){
    var params = ["question", "audio"];
    
    //argument object for the paramCheck function
    var args = {
      'okay': true,
      'params': params,
      'type': 'question',
      'object' : {},
      'req': req,
      'res': res
    };
    var success = paramCheck(args);
    if(args['okay']){
      console.log(args['object']);
      schema.question(args['object']).save();
      res.end('Success');
    }
  }

  function postA(req, res){
    //TODO write it
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
