
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var apply = require('../models/apply.js');
var bodyParser = require('body-parser');
var app = express();

module.exports = router;

exports.list = function (req, res) {
    applicant.find(function (err, apply) {
        res.send(apply);
    });
}

// replace the confusing event calling scheme for data to use a more imperative style
router.use(bodyParser.urlencoded({ extended: true }));

// -------------- public-facing routes ---------------

router.route('/')
    .get(function (req, res, callback) {

  mongoose.model('apply').find({}, function (err, apply){

    if (err) {
      return console.error(err);
    } else {

      res.format({

        // json response
        json: function() {
          res.json(apply);
        }

      });
    }
  });

    })

    .post(function (req, res, callback) {
        var profile_id = req.body.data.profile;
        var job_id = req.body.data.job;
        var rank = req.body.data.rank;

        mongoose.model('apply').create({
            profileID: profile_id,
            jobID: job_id,
            rank : rank
        }, function (err, apply) {
            if (err) {
                return console.error(err)
            } else {

                console.log('POST');
            }
        });

    });



router.route('/find').post(function(req, res, callback) {

    var id = req.body.data.job_id;

    mongoose.model('apply').find({
      jobID : id
   }, function(err, apply) {

    res.format({

      json: function() {
        console.log(apply);

        res.json(apply);

      }
    });

  });

});