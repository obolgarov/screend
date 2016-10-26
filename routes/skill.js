
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Skill = require('../models/skill.js');
var bodyParser = require('body-parser');

module.exports = router;

exports.list = function(req, res) {
  applicant.find(function(err, skill) {
    res.send(skill);
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
  Skill.find({}, function (err, skill){

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
          res.json(skill);
        }

      });
    }
  });

  // end of get
})
.post(function(req, res){

  console.log(req.body);

  // insert one
  var skillName = req.body.skillName;
  var skillType = req.body.skillType;
  var Years = req.body.years;

  Skill.create({
    skillName : skillName,
    skillType : skillType,
    years : years

  }, function (err, skill) {
    if (err) {
      return console.error(err)
    } else {
      // insertion/creation complete
      console.log('POST inserting new skill: ' + skill);
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

      res.send("done");
    }
  });

  // end of post
});

// return single skill
router.route('/find/:skill').get( function(req, res) {
  var skillName = req.query.skill;

  Skill.findOne({
    skillName: skillName
  }, function (err, skill) {
    if (err) {
      console.error(err);
    } else {

      res.format({
        json: function() {
          res.json(skill);
        }
      });

    }
  });
});

// check if skill is in database
router.route('/exists/:skill').get( function(req, res) {
  var skillName = req.query.skill;

  Skill.count({
    skillName: skillName
  }, function (err, count) {
    if (err) {
      console.error(err);
    } else {

      var exists = false;

      if (count > 0){
        exists = true
      }

      res.format({
        json: function() {
          res.json({
            exists: true
          });
        }
      });

    }
  });
});
