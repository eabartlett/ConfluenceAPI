exports.newQuestion = function(db, schema){
  return function(req, res){
    console.log(req.method);
    var q = schema.question(req.body);
    q.save();
    res.send('Success');
  }
};
