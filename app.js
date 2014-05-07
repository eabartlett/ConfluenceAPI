/** author: eabartlett
 * Main application file for Confluence API
 * 
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

//app.use(express.bodyParser());

var options = {
  key: fs.readFileSync('./www.eabartlett.com.key'),
  cert: fs.readFileSync('./www.eabartlett.com.crt'),
  passphrase: 'Mullen1993'
}

//db setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var schema = {};
require('./schema')(schema);

/* Path for uploads */
var uploads = path.join(__dirname, 'uploads');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  res.end('Hello World');
});

app.post('/api/user/langdel', routes.user.delLang(db, schema));
app.post('/api/user/learnlang', routes.user.learnlang(db, schema));
app.post('/api/user/proflang', routes.user.proflang(db, schema));
app.post('/api/login', routes.user.login(db, schema));
app.post('/api/user', routes.user.post(db, schema));
app.get('/api/user', routes.user.get(db, schema));
app.post('/api/question', routes.question.post(db,schema));
app.post('/api/answer', routes.answer.post(db, schema));
app.get('/api/question', routes.question.get(db, schema));
app.get('/api/answer', routes.answer.get(db, schema));
app.post('/api/audio', routes.audio.post(db, schema, uploads));
app.get('/api/audio', routes.audio.get(db, schema));

//TODO Change the handling so that there are different endpoints for questions and answers
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
