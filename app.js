
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var https = require('https');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(express.bodyParser());

var options = {
  key: fs.readFileSync('./www.eabartlett.com.key'),
  cert: fs.readFileSync('./www.eabartlett.com.crt')
}

//db setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var schema = {};
require('./schema')(schema);

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

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/api/nq', routes.api.newQuestion(db,schema));

https.createServer(options, app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
