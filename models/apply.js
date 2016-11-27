var db = require('../db.js');
var crypto = require('crypto');
var mongoCollection = "apply";
var mongoose = require('mongoose')

var applySchema = new mongoose.Schema( {
    profileID :String,
    jobID : String
})

module.exports = mongoose.model('apply', applySchema);


