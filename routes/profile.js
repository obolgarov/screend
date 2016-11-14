var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require('../models/profile.js');
var bodyParser = require('body-parser');

module.exports = router;

exports.list = function(req, res) {
  profile.find(function(err, profile) {
    res.send(profile);
  });
}

// replace the confusing event calling scheme for data to use a more imperative style
router.use(bodyParser.urlencoded({
  extended: true
}));

// -------------- public-facing routes ---------------

router.route('/')
.get(function(req, res, callback) {

  // TODO: validate user here, res.send error page if user doesn't have access
  // to view users


  // get all
  mongoose.model('profile').find({}, function(err, profile) {

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
.post(function(req, res) {

  console.log(req.body);

  var educationList = req.body.data.education;
  var certificationsList = req.body.data.certifications;
  var achievementsList = req.body.data.achievements;
  var employmentHistoryList = req.body.data.employmentHistory;
  var professionalSkillsList = req.body.data.professionalSkills;
  var technicalSkillsList = req.body.data.technicalSkills;
  var vis = req.body.data.vis;
  var userToken = req.body.token;

  // validate token

  var owner = req.body.data.username; // TODO: get owner from token
  console.log(owner);
  var newProfile = new Profile({
    owner: owner,
    education: [],
    certifications: [],
    achievements: [],
    employmentHistory: [],
    professionalSkills: [],
    technicalSkills: [],
    vis: vis
  });


  for (var education of educationList) {
    newProfile.education.push({
      name: education.name,
    });
  }
  for (var certification of certificationsList) {
    newProfile.certifications.push({
      name: certification.name,
    });
  }
  for (var achievement of achievementsList) {
    newProfile.achievements.push({
      name: achievement.name,
    });
  }
  for (var employmentHistory of employmentHistoryList) {
    newProfile.employmentHistory.push({
      name: employmentHistory.name,
    });
  }
  for (var professionalSkill of professionalSkillsList) {
    newProfile.professionalSkills.push({
      name: professionalSkill.name,
    });
  }
  for (var technicalSkill of technicalSkillsList) {
    newProfile.technicalSkills.push({
      name: technicalSkill.name,
    });
  }

  newProfile.save((err, profile) => {
    if (err) {
      return console.error(err)
    } else {
      // insertion/creation complete
      console.log('POST inserting new profile: ' + profile);

      res.send("Done");
    }
  });

  /*mongoose.model('profile').create({
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

      console.log('POST inserting new profile: ' + profile);

      res.send("Done");
    }
  });*/

  // end of post
});

router.route('/uploadResume').post((req, res) => {
  var resume = req.body.data.resume;
  var userToken = req.body.token;



});

router.route('/getProfile').post(function(req, res, callback) {
  var username = req.body.data.username;

  mongoose.model('profile').find({
    owner: username
  }, function(err, profile) {
    if (err) {
      return console.error(err);
    } else {
      res.format({
        // json response
        json: function() {
          res.json(profile);
        }
      });

    }
  });
});

router.route('/delete').post(function(req, res, callback) {

  var id = req.body.data.id;


  mongoose.model('profile').remove({
    _id: id
  }, function(err) {
    if (!err) {
      res.json({
        found: "true"
      });
    } else {
      res.json({
        found: "false"
      });
    }
  });
});

router.route('/findProfile').post(function(req, res, callback) {

  var id = req.body.data.id;

  mongoose.model('profile').find({
    _id: id
  }, function(err, profile) {
    if (err) {
      return console.error(err);
    } else {
      res.format({
        json: function() {
          res.json(profile);
        }
      });

    }
  });
});

router.route('/editProfile').post(function(req, res, callback) {

  var educationList = req.body.data.education;
  var certificationsList = req.body.data.certifications;
  var achievementsList = req.body.data.achievements;
  var employmentHistoryList = req.body.data.employmentHistory;
  var professionalSkillsList = req.body.data.professionalSkills;
  var technicalSkillsList = req.body.data.technicalSkills;
  var id = req.body.data.id;
 
   var newProfile = new Profile({
    education: [],
    certifications: [],
    achievements: [],
    employmentHistory: [],
    professionalSkills: [],
    technicalSkills: [],
  });


  for (var education of educationList) {
    newProfile.education.push({
      name: education.name,
    });
  }
  for (var certification of certificationsList) {
    newProfile.certifications.push({
      name: certification.name,
    });
  }
  for (var achievement of achievementsList) {
    newProfile.achievements.push({
      name: achievement.name,
    });
  }
  for (var employmentHistory of employmentHistoryList) {
    newProfile.employmentHistory.push({
      name: employmentHistory.name,
    });
  }
  for (var professionalSkill of professionalSkillsList) {
    newProfile.professionalSkills.push({
      name: professionalSkill.name,
    });
  }
  for (var technicalSkill of technicalSkillsList) {
    newProfile.technicalSkills.push({
      name: technicalSkill.name,
    });
  }


  mongoose.model('profile').findOneAndUpdate({ "_id": id }, { "$set": { "education": educationList,
"certifications" : certificationsList, "achievements" : achievementsList, "employmentHistory" : employmentHistoryList,
"professionalSkills" : professionalSkillsList, "technicalSkills" : technicalSkillsList
}}).exec(function(err, profile){

    if(err) {
       console.log(err);
   } else {
           res.json("updated");
   }



  });
});