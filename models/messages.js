var db = require('../db.js');

exports.all = function(callback){
  var collection = db.get().collections('messages');

  collection.find().toArray(function(err, documents){
    callback(err, documents);
  });
}

exports.insert = function(){

}

exports.delete = function(){

}

exports.update = function(){

}
