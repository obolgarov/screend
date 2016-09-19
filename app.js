var express = require ('express');
var routes = require ('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongo = require('mongodb').MongoClient;
var expressApp = express();

expressApp.set('port', process.enb.PORT || 3000);
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'jade');
expressApp.use(express.favicon());
expressApp.use(express.logger('dev'));
expressApp.use(express.json());
expressApp.use(express.urlencoded());
expressApp.use(express.methodOverride());
expressApp.use(expressApp.router);
expressApp.use(require('stylus').middleware(path.join(__dirname, 'public')));
expressApp.use(express.static(path.join(__dirname, 'public'))):

if ('development' == app.get('env')) {
  expressApp.use(express.errorHandler());
}

expressApp.get('/', routes.index);
expressApp.get('/users', user.list);

var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(expressApp.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var mongoConnStr = "localhost:27017screend";

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

});
