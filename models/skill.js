var db = require('../db.js');
var crypto = require('crypto');
var mongoCollection = "skill";
var mongoose = require('mongoose')

var skillSchema = new mongoose.Schema( {
  skillName : String,
  skillType : String,
  years : String
})

module.exports = mongoose.model('skill', skillSchema);

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
