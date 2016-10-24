var db = require('../db.js');
var crypto = require('crypto');
var mongoCollection = "job";
var mongoose = require('mongoose')


var jobSchema = new mongoose.Schema( {

  JobTitle: String,
  CompanyName: String,
  Location: String,
  Certification: String,
  Requirededucation: String,
  Salary: String,
  Description: String,
  Skills: [{
    skillName: String,
    experience: String
  }]
})

var skillSchema = new mongoose.Schema

module.exports = mongoose.model('job', jobSchema);

// password encryption
var hash = function(pass){
  return crypto.createHash('sha1').update(pass).digest('base64');
}

// authenticates user with password
exports.authenticate = function(username, password, callback){
  // TODO: find user collection here
  // likely an array of 1 or 0 objects for 'found' or 'not found' respectively
  // no array of multiple objects because the searched field is unique, but an
  // array nonetheless in because the function must allow for multiple finds

  var docs;

  if (docs.length === 0){
    return callback();
  }

  user = docs[0];

  if (user.password = hash(password)) {
    callback(null, docs[0]);
  } else {
    callback();
  }
}

/*
// get all documents from this collection
exports.all = function(callback){
  var collection = db.get().collections(mongoCollection);

  collection.find().toArray(function(err, documents){
    callback(err, documents);
  });
}

// get all documents from this collection that fit a query
exports.select = function(query, callback){
  var collection = db.get().collections(mongoCollection);

  collection.find(query).toArray(function(err, documents){
    callback(err, documents);
  })
}

// get one document that fits a query
exports.selectOne = function(query, callback){
  var collection = db.get().collections(mongoCollection);

  callback(null, collection.findOne(query););
}

// insert any number of documents
exports.insert = function(statement){
  var collection = db.get().collections(mongoCollection);

  collection.insert(statement)
}

// delete any number of documents (be careful!)
exports.delete = function(){
  //TODO: generic delete
}

// updates any number of documents
exports.update = function(){
  //TODO: generic update
}

// change user password
exports.changePassword = function(id, password, callback){

}

// add profile to this user
exports.addProfile = function(){

}

// delete profile from this user
exports.deleteProfile = function(){

}
*/
