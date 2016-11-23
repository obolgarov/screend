
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var admin = require('../models/admin.js');
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

  if (req.body.username != null && req.body.password != null){
    var username = req.body.username;
    var password = req.body.password;



    mongoose.model('admin').findOne({
      username : username,
      password : password
    }, function (err, admin){
      if (err) {
        return console.error(err);
      } else {

        if (admin != null ){


          var token = jwt.sign({username, accountType: "admin"}, superSecret,
        {expiresIn: '10h'});



          res.format({

            // json response
            json: function() {
              res.json({
                      success: true,
                      message: 'Enjoy your token!',
                      token: token
                    });               console.log(token);
            }




          });
        } else {
          res.format({

            // json response
            json: function() {
              res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });

            }

          });
        }


      }
      });
      } else {
      res.format({

      // json response
      json: function() {
        res.json({ verified: "false"});
      }

      });
      }







});
