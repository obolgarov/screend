
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var applicant = require('../models/admin.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
var superSecret = 'screend';

var userValidator = require('./userValidator.js');

module.exports = router;

exports.list = function(req, res) {
  applicant.find(function(err, admin) {
    res.send(applicants);
  });
}

// replace the confusing event calling scheme for data to use a more imperative style
router.use(bodyParser.urlencoded({ extended: true }));

// -------------- public-facing routes ---------------

router.route('/')
.get(function(req, res, callback) {

  // get all
  mongoose.model('admin').find({}, function (err, admin){

    if (err) {
      return console.error(err);
    } else {

      res.format({

        // json response
        json: function() {
          res.json(admin);
        }

      });
    }
  });
})

.post(function(req, res){

  console.log(req.body);

  // insert one
  var username = req.body.username;
  var password = req.body.password;

  mongoose.model('admin').create({
    username : username,
    password : password
  }, function (err, admin) {
    if (err) {
      return console.error(err)
    } else {
      console.log('POST inserting new admin: ' + admin);


    }
  });

});
