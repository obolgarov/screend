var jwt = require('jsonwebtoken');
var config = require('../config')();


var userValidator = {

  validateUser: function () {

    //TODO: validate

    return true;

  },

  validateToken: function(token, callback) {

    jwt.verify(token, config.secret, callback); // passes the decoded token body into callback

  },

  generateToken: function(payload, callback) {


    var options = {
      expiresIn : Math.floor(new Date().getTime()/1000) + 24*60*60, // current unix timestamp + 24 hours
      algorithm : "HS256"
    }

    var token = jwt.sign(payload, config.secret, options, callback);
  }

}

module.exports = userValidator;
