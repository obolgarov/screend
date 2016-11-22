var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require('../models/profile.js');
var bodyParser = require('body-parser');
var extract = require('extract-zip')
var fs = require('fs');
var xml2js = require('xml2js');
var jwt = require('jsonwebtoken');

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
  var name = req.body.data.name;
  // validate token

  var owner = req.body.data.username; // TODO: get owner from token
  console.log(owner);
  var newProfile = new Profile({
    owner: owner,
    name : name,
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
      years: technicalSkill.years
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
  var filename = req.body.data.resume;

  console.log(filename);
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

      var initialLookupTable = {
        categories: [
          {
            type: "education",
            strings: [
              "Academic Background",
              "Academic Experience",
              "Programs",
              "Courses",
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
            type: "achievements",
            strings: [
              "Achievements",
              "Course Project Experience",
              "Related Course Projects",
            ]
          },
          {
            type: "certifications",
            strings: [
              "Certifications",
              "Qualifications",
              "Training",
              "Related Courses",
            ]
          },
          {
            type: "employmentHistory",
            strings: [
              "Employment History",
              "Experience",
              "Work History",
              "Freelance",
              "Freelance Experience",
              "Internship Experience",
              "Internships",
            ]
          },
          {
            type: "professionalSkills",
            strings: [
              "Professional Skills",
              "COMPETENCIES/SKILLS",
              "COMPETENCIES",
              "SKILLS",
            ]
          },
          {
            type: "technicalSkills",
            strings: [
              "Technical Skills",
              "Programming Languages",
              "Programming Knowledge",
              "Programming",
              "Technical Skills (Including Years)"
            ]
          }
        ]
      };

      // I could have used for..of loops but I wanted to have fun with maps
      var lookupTable = {
        categories: initialLookupTable.categories.map((category) => {
          return {
            type: category.type,
            strings: category.strings.map((string) => {
              return string.toUpperCase().trim();
            })
          };
        })
      };

      //console.log(lookupTable);

      var sortedItems = {
        education: [],
        achievements: [],
        certifications: [],
        employmentHistory: [],
        professionalSkills: [],
        technicalSkills: []
      };

      var POIHistory = [];

      var wpList = jsonData['w:document']['w:body'][0]['w:p'];

      // loop through each w:p
      for ( var wp of wpList){

        //POI = points of interest
        var currentPOI = {
          category: null, // String
          text: null, // String
          bold: false, // boolean
          italics: false, // boolean
          underline: false, // boolean
          size: null, // String, whatever value OOXML uses
          color: null, // String, whatever value OOXML uses
          isEmpty: false, // boolean
          possibleTitle: false, //boolean
          depth: 0, // int, can be as deep as possible, but only max 3 depth calculated in case of 3 different fields in one category
          isListElement: false, //boolean, TODO
        };

        // merge all seperate w:t texts into one within this w:p
        var text = "";
        var wrList = wp['w:r'];
        for (var wr of wrList){
          text = text + "" + (wr['w:t'] ? wr['w:t'][0]._ : "");
        }
        currentPOI.text = text;

        currentPOI.isEmpty = (text.trim() == "" ? true : false);

        currentPOI.bold = (wp['w:r'][0]['w:rPr'][0]['w:b'] ? (wp['w:r'][0]['w:rPr'][0]['w:b'][0]['$']['w:val'] == '1' ? true : false) : false);
        currentPOI.italics = (wp['w:r'][0]['w:rPr'][0]['w:i'] ? (wp['w:r'][0]['w:rPr'][0]['w:i'][0]['$']['w:val'] == '1' ? true : false) : false);
        currentPOI.underline =(wp['w:r'][0]['w:rPr'][0]['w:u'] ? (wp['w:r'][0]['w:rPr'][0]['w:u'][0]['$']['w:val'] == '1' ? true : false) : false);

        currentPOI.color = (wp['w:r'][0]['w:rPr'][0]['w:i'] ? (wp['w:r'][0]['w:rPr'][0]['w:i'][0]['$']['w:val'] == '1' ? true : false) : false);

        // check if current string suggests a category
        var categoryFound = false;
        for (var lookupTableCategory of lookupTable.categories) {
          for (var string of lookupTableCategory.strings) {
            if (text.toUpperCase().trim() == string) {
              currentPOI.category = lookupTableCategory.type;
              currentPOI.possibleTitle = true;
              categoryFound = true;
            }
            if (categoryFound) {
              break;
            }
          }
          if (categoryFound) {
            break;
          }
        }

        // if no category found, assume previous category, if exists
        if ( !categoryFound
        && POIHistory.length > 0
        && POIHistory[POIHistory.length - 1].category != null) {
          currentPOI.category = POIHistory[POIHistory.length - 1].category;
        }

        // possibleTitle was obtained earlier, if it's not then let it be a string
        if(!currentPOI.possibleTitle) {
          if (currentPOI.size = POIHistory[POIHistory.length - 1].size){
            // if current is same size as previous, must be similar elements and depth is the same
            currentPOI.depth = POIHistory[POIHistory.length - 1].depth;
          } else if (currentPOI.size < POIHistory[POIHistory.length - 1].size) {
            // if current is smaller than previous (finer print), depth increases
            currentPOI.depth = POIHistory[POIHistory.length - 1].depth + 1;
          } else {
            // TODO: something if current size is larger than previous (implies reset of depth for another block)
            // for now, reset depth to 0 so there will be no infinite depths
            currentPOI.depth = 0;
          }
        }

        //console.log(styles.bold);
        //console.log(wrList);
        //console.log(text);

        // store the previous elements to compare with
        POIHistory.push(currentPOI);
      }

      // parse final
      sortedItems.education = POIHistory.map( (result) => {
        if (!result.possibleTitle && !result.isEmpty) {
          return
        }
      });

      for (var POI of POIHistory) {
        if (!POI.isEmpty && !POI.possibleTitle) {
          if (POI.category =="education"){
            sortedItems.education.push(POI.text);
          }
          if (POI.category == "achievements"){
            sortedItems.achievements.push(POI.text);
          }
          if (POI.category == "certifications"){
            sortedItems.certifications.push(POI.text);
          }
          if (POI.category == "employmentHistory"){
            sortedItems.employmentHistory.push(POI.text);
          }
          if (POI.category == "professionalSkills"){
            sortedItems.professionalSkills.push(POI.text);
          }
          if (POI.category == "technicalSkills"){
            var text = POI.text;
            var years = "";
            if (text.indexOf("years") != -1){ // only works properly if nothing is after years
              text = text.substr(0, text.indexOf("years") - 1);
            }
            if (text.indexOf("year") != -1){
              text = text.substr(0, text.indexOf("year") - 1);
            }
            if (text.indexOf(",") != -1) {
              var fullText = text;
              text = fullText.substring(0, fullText.indexOf(",")).trim();
              years = fullText.substring(fullText.indexOf(",") + 1, fullText.length).trim();
            }
            sortedItems.technicalSkills.push({
              skill: text,
              years: years
            });
          }
        }
      }

      console.log(sortedItems);

      res.format({
        json: function () {
          res.json(sortedItems);
        }
      });
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

router.route('/editProfile').post(function(req, res, callback) {

  var educationList = req.body.data.education;
  var certificationsList = req.body.data.certifications;
  var achievementsList = req.body.data.achievements;
  var employmentHistoryList = req.body.data.employmentHistory;
  var professionalSkillsList = req.body.data.professionalSkills;
  var technicalSkillsList = req.body.data.technicalSkills;
  var nameList = req.body.data.name;
  var nameValue = nameList[0].name;
  var id = req.body.data.id;
   var newProfile = new Profile({
    education: [],
    certifications: [],
    achievements: [],
    employmentHistory: [],
    professionalSkills: [],
    technicalSkills: [],
    name : nameValue
  });

console.log(nameValue);

  

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
      years: technicalSkill.years
    });
  }


  mongoose.model('profile').findOneAndUpdate({ "_id": id }, { "$set": { "education": educationList,
"certifications" : certificationsList, "achievements" : achievementsList, "employmentHistory" : employmentHistoryList,
"professionalSkills" : professionalSkillsList, "technicalSkills" : technicalSkillsList, "name" : nameValue
}}).exec(function(err, profile){

    if(err) {
       console.log(err);
   } else {
           res.json("updated");
   }



  });
});

router.route('/searchProfile').post(function(req, res, callback) {

    var SearchData = req.body.data.SearchData;
    var SelectedData = req.body.data.SelectedData;

   if(SelectedData == "certifications")
    {
       mongoose.model('profile').find({
    'certifications.name':SearchData
    }, function (err, profile){
      if (err) {
        return console.error(err);
      } else {

        if (profile != null ){
          res.format({
            json: function() {
              res.json(
                      profile
                  );
            }
          });
        }
      }
    });
    }


   if(SelectedData == "technicalSkills")
    {
       mongoose.model('profile').find({
    'technicalSkills.name':SearchData
    }, function (err, profile){
      if (err) {
        return console.error(err);
      } else {

        if (profile != null ){
          res.format({
            json: function() {
              res.json(
                      profile
                  );
            }
          });
        }
      }
    });
    }

 if(SelectedData == "employmentHistory")
    {
       mongoose.model('profile').find({
    'employmentHistory.name':SearchData
    }, function (err, profile){
      if (err) {
        return console.error(err);
      } else {

        if (profile != null ){
          res.format({
            json: function() {
              res.json(
                      profile
                  );
            }
          });
        }
      }
    });
    }

});


router.route('/loadUserProfiles').post(function(req, res, callback) {

  var usernameToken = req.body.token;
  var decoded = jwt.decode(usernameToken);
  var username = decoded.username;

  mongoose.model('profile').find({
    owner : username
  }, function (err, profile){
    if (err) {
      return console.error(err);
    } else {
      if (profile != null ){
        res.format({
          json: function() {
            res.json(
                profile
            );
          }
        });
      }
    }
  });

});
