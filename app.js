var express = require ('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var React = require('react');
var favicon = require('serve-favicon');

var config = require('./config')();

var db = require('./db.js');
var routes = require('./routes/index');
var applicants = require('./routes/applicant');
var employer = require('./routes/employer');
var job = require('./routes/job');
var profile = require('./routes/profile');
var skill = require('./routes/skill');
var message = require('./routes/message');
var mail = require('./routes/mail');
var admin = require('./routes/admin');
var app = express();

//app.engine('react', require('react').__express);
//app.set('view engine', 'react');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use('/applicants', applicants);
app.use('/employer', employer);
app.use('/job',job);
app.use('/profile',profile);
app.use('/skill',skill);
app.use('/mail',mail);
app.use('/messages',message);
app.use('/admin',admin);
app.set('view engine', 'react');
app.set('views', __dirname + '/app');
app.use(favicon(__dirname + '/public/favicon.ico'));


/*
// uses 'fs' to grab all files/names from a directory, then 'require' each file
fs.readdirSync('./models').forEach(function (file) {
  if (file.substr(-3) == '.js') { //only accept .js files
    //route = require('./models/' + file);
    //route.controller(app);
    require('./models/' + file);
  }
});
*/


db.connect(config.connstr, function (err){
  if(err){
    console.error(err);
  } else {

    app.listen(config.port, function() {
      console.log('Listening on port ' + config.port + '...');
    });

  }
});



/*
// express settings
expressApp.set('port', 3000);
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'react');
//expressApp.use(express.favicon());
//expressApp.use(express.logger('dev'));
//expressApp.use(express.json());
//expressApp.use(express.urlencoded());
//expressApp.use(express.methodOverride());
//expressApp.use(expressApp.router);
//expressApp.use(require('stylus').middleware(path.join(__dirname, 'public')));
expressApp.use(express.static(path.join(__dirname, 'public')));

if ('development' == expressApp.get('env')) {
  expressApp.use(express.errorHandler());
}

// website access logic
expressApp.get('/', function(){

});

//
db.connect('mongodb://localhost:27017/screend', function(err){
  if (err){
    console.log(err)
    process.exit(1);
  } else {
    expressApp.listen(3000, function(){
      console.log('Express listening on port 3000...');
    });
  }
});
*/
// websockets or some shit
/*var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(expressApp.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var mongoConnStr = "localhost:27017/screend";

io.on('connection', function (socket) {
  console.log('a user connected');

  mongo.connect(mongoConnStr, function (err) {
    if(err) {
      console.warn(err.meessage);
    } else {
      var collection = db.collection('testCollection');
      var stream = collection.find().sort().limit(10).stream();
      stream.on('data'. function (data){ // string 'data' is the name of what the socket expects
        console.log('emitting data');
        socket.emit('data', data.content); // string 'data' here is what's emitted
      });
    }
  });

  socket.on('disconnect', function (){
    console.log('user disconnected');
  });

  socket.on('data', function(msg) {
    mongo.connect(mongoConnStr, function(err){
      if (err){
        console.warn(err.message);
      } else {
        var collection = db.collection('testCollection');
        collection.insert({ content: msg }, function (err, o) {
          if (err) {
            console.warn(err.message);
          } else {
            console.lg("data message inserted into db: " + msg);
          }
        });
      }
    });
  });

});*/
