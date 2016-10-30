
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var message = require('../models/message.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var superSecret = 'screend';


module.exports = router;

exports.list = function(req, res) {
  applicant.find(function(err, messages) {
    res.send(messages);
  });
}

// replace the confusing event calling scheme for data to use a more imperative style
router.use(bodyParser.urlencoded({ extended: true }));

// -------------- public-facing routes ---------------

router.route('/')
.get(function(req, res, callback) {

  // TODO: validate user here, res.send error page if user doesn't have access
  // to view users


  // get all
  mongoose.model('message').find({}, function (err, messages){

    if (err) {
      return console.error(err);
    } else {

      //res.json(applicants);

      // respond to call with information
      res.format({

        /*// html response
        html: function() {
          res.render('jobposting', {
            title: 'all applicants',
            "applicants" : applicants
          })
        },
        */
        // json response
        json: function() {
          res.json(messages);
        }

      });
    }
  });

  // end of get
})
.post(function(req, res){

  console.log(req.body);

  // insert one
  var userFrom = req.body.userFrom;
  var subject = req.body.subject;
  var message = req.body.message;
  var recipient = req.body.recipient;

  mongoose.model('message').create({
    userFrom : userFrom,
    subject : subject,
    message : message,
    recipient : recipient
  }, function (err, message) {
    if (err) {
      return console.error(err)
    } else {
      // insertion/creation complete
      console.log('POST inserting new message: ' + message);
      /*res.format({

        //html response
        html: function() {
          res.location("applicants");
          res.redirect("/applicants");
        },

        //json response
        json: function() {
          res.json(applicant);
        }

      });*/

      res.send("test");
    }
  });

  // end of post
});

router.route('/decode').post(function(req, res, callback) {

  var token = req.body.token;
  var decoded = jwt.decode(token);

  res.send(decoded.username);

});

router.route('/getMessage').post(function(req, res, callback) {

  var token = req.body.token;
  var decoded = jwt.decode(token);

  var username = decoded.username;

  if (decoded.username != null){

    mongoose.model('message').findOne({
      recipient : username
    }, function (err, message){
      if (err) {
        return console.error(err);
      } else {



          res.format({

            // json response
            json: function() {
              res.json(message);
            }
          });

      }
      });
      } else {
      res.format({

      // json response
      json: function() {
        res.json({ found: "false"});
      }

      });
      }







});
