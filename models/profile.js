var db = require('../db.js');

exports.all = function(callback){
  var collection = db.get().collections('profiles');

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

exports.addSkill = function(){

}

exports.deleteSkill = function(){

}
