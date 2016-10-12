var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var profile = require('../models/profile.js');
var bodyParser = require('body-parser');

module.exports = router;

exports.list = function(req, res) {
  profile.find(function(err, profile) {
    res.send(profile);
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
  mongoose.model('profile').find({}, function (err, profile){

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
          res.json(profile);
        }

      });
    }
  });

  // end of get
})
.post(function(req, res){

  console.log(req.body);


var history = req.body.history;
var jobTitle = req.body.jobTitle;
var years = req.body.years;
var education = req.body.education;
var certification = req.body.certification;
var achievements = req.body.achievements;
var privacy = req.body.privacy;

  mongoose.model('profile').create({
  history : history,
  jobTitle : jobTitle,
  years : years,
  education: education,
  certification: certification,
  achievements : achievements,
  privacy : privacy

  }, function (err, profile) {
    if (err) {
      return console.error(err)
    } else {
      // insertion/creation complete
      console.log('POST inserting new profile: ' + profile);
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

      res.send("Done");
    }
  });

  // end of post
});
