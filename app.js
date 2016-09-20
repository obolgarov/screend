var express = require ('express');
var http = require('http');
var path = require('path');

var db = require('./db');

var app = express();

//app.engine('react', require('react').__express);
//app.set('view engine', 'react');

app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
  console.log('Listening on port 3000...');
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
