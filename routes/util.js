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

exports.errorCallback = errorCallback;
