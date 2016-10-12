var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var job = require('../models/job.js');
var bodyParser = require('body-parser');

module.exports = router;

exports.list = function(req, res) {
  applicant.find(function(err, job) {
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
  mongoose.model('job').find({}, function (err, job){

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
          res.json(job);
        }

      });
    }
  });

  // end of get
})
.post(function(req, res){

  console.log(req.body);

  var JobTitle = req.body.JobTitle;
  var CompanyName = req.body.CompanyName;
  var Location = req.body.Location;
  var Certification = req.body.Certification;
  var Requirededucation = req.body.Requirededucation;
  var Experience = req.body.Experience;
  var Salary = req.body.Salary;
  var Description = req.body.Description;

  mongoose.model('job').create({
    JobTitle: JobTitle,
    CompanyName:CompanyName,
    Location : Location,
    Certification : Certification,
    Requirededucation : Requirededucation,
    Experience:Experience,
    Salary:Salary,
    Description :Description

  }, function (err, applicant) {
    if (err) {
      return console.error(err)
    } else {
      // insertion/creation complete
      console.log('POST inserting new Job: ' + job);
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
