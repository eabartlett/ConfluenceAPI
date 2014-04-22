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

exports.errorCallback = errorCallback;
