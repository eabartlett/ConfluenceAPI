function errorCallback(res){
  return function(err){
    if(err){
      res.writeHead(403,{
        'Content-type': 'text/plain'
      });
      res.write(JSON.stringify(err));
      res.end();
    }
  }
}

function responseDataCallback(res){
  return function(err, doc){
    if(err) errorCallback(res)(err);
    res.end(JSON.stringify(doc));
  }
}

exports.errorCallback = errorCallback;
exports.responseDataCallback = responseDataCallback;
