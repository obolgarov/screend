
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var applicant = require('../models/applicant.js');
var bodyParser = require('body-parser');

module.exports = router;

exports.list = function(req, res) {
  applicant.find(function(err, applicants) {
    res.send(applicants);
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
  mongoose.model('applicant').find({}, function (err, applicants){

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
          res.json(applicants);
        }

      });
    }
  });

  // end of get
})

.post(function(req, res){

  console.log(req.body);

  // insert one
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastName;


  //mongoose.model('applicant').find({}, function(err, res){
//console.log(res);
//}).select({"username":username });

mongoose.model('applicant').findOne({username: username,password: password}, function(err, res) {
  console.log(res);
});



      res.send("response test string");



  });
