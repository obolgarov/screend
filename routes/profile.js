var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require('../models/profile.js');
var bodyParser = require('body-parser');
var extract = require('extract-zip')
var fs = require('fs');
var xml2js = require('xml2js');

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
  //var resume = req.body.data.resume;
  var userToken = req.body.token;

  //console.log(resume);
  //console.log(req.body);
  //console.log("uploaded");

  extract('../ResumeTest.docx', {dir: 'output'}, function (err) {
   // extraction is complete. make sure to handle the err
  });

  fs.readFile(__dirname + '/output/word/document.xml', {encoding: "utf8" }, (err, wordData) => {
    if (err) return console.error(err.message);

    xml2js.parseString(wordData, (err, jsonData) => {
      if (err) return console.error(err.message);

      //console.log(jsonData['w:document']['w:body'][0]['w:p']);

      var wpList = jsonData['w:document']['w:body'][0]['w:p'];

      var lowerLookupTable = {
        categories: [
          {
            type: "education",
            strings: [
              "Academic Background",
              "Academic Experience",
              "Programs",
              "Courses",
              "Related Courses",
              "Education",
              "Educational Background",
              "Educational Qualifications",
              "Educational Training",
              "Education and Training",
              "Academic Training",
              "Professional Training",
            ]
          },
          {
            type: "achievments",
            strings: [
            ]
          }
          {
            type: "certifications",
            strings: [
            ]
          }
          {
            type: "employmentHistory",
            strings: [
            ]
          }
          {
            type: "professionalSkills",
            strings: [
            ]
          }
          {
            type: "technicalSkills",
            strings: [
            ]
          }
        ],
        achievements: [
          "Course Project Experience",
          "Related Course Projects",
        ],
        certifications: [
          "Qualifications",
          "Training",
        ],
        employmentHistory: [
          "Experience",
          "Work History",
          "Freelance",
          "Freelance Experience",
          "Internship Experience",
          "Internships",
        ],
        professionalSkills: [
          "COMPETENCIES/SKILLS",
          "COMPETENCIES",
          "SKILLS",
        ],
        technicalSkills: [
          "Programming Languages",
          "Programming Knowledge",
          "Programming"
        ]
      };

      var lookupTable = lowerLookupTable.map((lowerComponent) => {
        console.log(lowerComponent);
        console.log("------------")
        /*return result.map((lowerStrings) => {
          return lowerString.toUpperCase();
        });*/
      });

      console.log(lookupTable);

      var sortedItems = {
        education: [],
        achievements: [],
        certifications: [],
        employmentHistory: [],
        professionalSkills: [],
        technicalSkills: []
      };

      var memoryList = [];

      for ( var wp of wpList){
        var text = "";
        var wrList = wp['w:r'];
        for (var wr of wrList){
          text = text + "" + (wr['w:t'] ? wr['w:t'][0]._ : "");
        }

        var styles = {
          bold: (wp['w:r'][0]['w:rPr'][0]['w:b'] ? (wp['w:r'][0]['w:rPr'][0]['w:b'][0]['$']['w:val'] == '1' ? true : false) : false),
          italics: (wp['w:r'][0]['w:rPr'][0]['w:i'] ? (wp['w:r'][0]['w:rPr'][0]['w:i'][0]['$']['w:val'] == '1' ? true : false) : false),
          underline: (wp['w:r'][0]['w:rPr'][0]['w:u'] ? (wp['w:r'][0]['w:rPr'][0]['w:u'][0]['$']['w:val'] == '1' ? true : false) : false),
          color: (wp['w:r'][0]['w:rPr'][0]['w:i'] ? (wp['w:r'][0]['w:rPr'][0]['w:i'][0]['$']['w:val'] == '1' ? true : false) : false),
        };

        //console.log(styles.bold);
        //console.log(wrList);
        //console.log(text);
        //console.log('--------------');

      }
    });
  });


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
