var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Job = require('../models/job.js');
var bodyParser = require('body-parser');
var fs = require('fs');
var PDFParser = require('pdf2json');
var querystring = require('qs');
var jwt = require("jsonwebtoken");


module.exports = router;

exports.list = function(req, res) {
  applicant.find(function(err, job) {
    res.send(applicants);
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

    // id = $_GET["id"]
    // mongoose.model('job').findOne({id: id}, function {

    //})


    // get all
    mongoose.model('job').find({}, function(err, job) {

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
  .post(function(req, res) {
    console.log("FDHFJEH");
    //console.log(req.body);
    //console.log(querystring.parse(req.body));

    var EmployerID = "testEmp"; // TODO: get from auth token
    var JobTitle = req.body.JobTitle;
    var CompanyName = req.body.CompanyName;
    var Location = req.body.Location;
    var Certification = req.body.Certification;
    var Requirededucation = req.body.Requirededucation;
    var Salary = req.body.Salary;
    var Description = req.body.Description;
    var SkillsList = req.body.Skills;
    var PostedBy = req.body.PostedBy;
    var Instructions = req.body.Instructions;


    //console.log(SkillsList);
    console.log("POst" + PostedBy);
    var newJob = new Job({
      EmployerID: EmployerID,
      JobTitle: JobTitle,
      CompanyName: CompanyName,
      Location: Location,
      Certification: Certification,
      Requirededucation: Requirededucation,
      Salary: Salary,
      Description: Description,
      PostedBy : PostedBy,
      Instructions : Instructions,
      Skills: [] //initialized empty
    });

    for (var skill of SkillsList){
      newJob.Skills.push({
        SkillName: skill.skill,
        Experience: skill.exp,
        Importance: skill.importance
      });
    }

    newJob.save( (err, job) =>  {
      if (err) {
        return console.error(err)
      } else {
        // insertion/creation complete
        console.log('POST inserting new Job: ' + job);

      }
    });

    /*mongoose.model('job').create({
        EmployerID: EmployerID,
        JobTitle: JobTitle,
        CompanyName: CompanyName,
        Location: Location,
        Certification: Certification,
        Requirededucation: Requirededucation,
        Salary: Salary,
        Description: Description,
      },

      function(err, applicant) {
        if (err) {
          return console.error(err)
        } else {
          // insertion/creation complete
          console.log('POST inserting new Job: ' + job);


          res.send("Done");
        }
      });*/

    // end of post*/
  });



router.route('/searchJob').post(function(req, res, callback) {
  var selected = req.body.selected;
  var search = req.body.search;


    if(selected == "CompanyName")
    {
       mongoose.model('job').find({
      CompanyName : search
    }, function (err, job){
      if (err) {
        return console.error(err);
      } else {

        if (job != null ){
          res.format({
            // json response
            json: function() {
              res.json(
                      job
                  );
            }
          });
        }
      }
    });
    }

else if(selected == "Location")
    {
       mongoose.model('job').find({
      Location : search
    }, function (err, job){
      if (err) {
        return console.error(err);
      } else {

        if (job != null ){
          res.format({

            // json response
            json: function() {
              res.json(
                      job
                  );
            }
          });
        }
      }
    });
    }
else if(selected == "JobTitle")
    {

       mongoose.model('job').find({
      JobTitle : search
    }, function (err, job){
      if (err) {
        return console.error(err);
      } else {

        if (job != null ){
          res.format({

            // json response
            json: function() {
              res.json(
                      job
                  );
            }
          });
        }
      }
    });
    }





});


router.route('/findMyJobs').post(function(req, res, callback) {
  var PostedBy = req.body.PostedBy;

  mongoose.model('job').find({
    PostedBy: PostedBy
  }, function(err, job) {

    res.format({

      json: function() {

        res.json(job);
      }
    });
  });
});

router.route('/deleteJob').post(function(req, res, callback) {

    var id = req.body.id;

    console.log(id);
  mongoose.model('job').remove({ _id: id }, function(err) {
    if (!err) {
      res.json(
      {
          found: "true"
      });
    }
    else {
      res.json(
      {
          found: "false"
      });
    }
  });

});



router.route('/view').post(function(req, res, callback) {

  var id = req.body.id;

  mongoose.model('job').findOne({
    _id: id
  }, function(err, job) {


    res.format({

      json: function() {

        res.json(job);

      }
    });

  });

});

/*
router.route('/rank').post(function(req, res, callback) {


  var pdfParser = new PDFParser(this, 1);

  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

  pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.truncate('./pdf/resume.txt', 0, function() {
      fs.writeFile('./pdf/resume.txt', pdfParser.getRawTextContent());
    });
    var txtArray = fs.readFileSync('./pdf/resume.txt').toString().split(/[ ,]+/);
    mongoose.model('job').find({}, function(err, jobs) {


      if (err) {
        return console.error(err);
      } else {

        var skillsArray = {};
        var jobPostingRank = {};
        var userPoints = {};
        for (job in jobs) {
          skillsArray[jobs[job].JobTitle] = jobs[job].Description;
        }
        for (skill in skillsArray) {

          var tmpArray = skillsArray[skill].split(',');

          jobPostingRank[skill] = tmpArray.length;
          userPoints[skill] = 0;
        }

        for (skill in skillsArray) {
          var tmpArray = skillsArray[skill].split(',');
          for (s in tmpArray) {
            for (i in txtArray) {
              if (tmpArray[s].toUpperCase() == txtArray[i].toUpperCase()) {
                userPoints[skill] = userPoints[skill] + 1;
              }
            }
          }
        }
        for (skill in jobPostingRank) {

          userPoints[skill] = (userPoints[skill] / jobPostingRank[skill]) * 100;

        }
        for (skill in userPoints) {
          console.log(userPoints[skill]);
        }
        //send userPoints array through.

        // respond to call with information

        res.format({
          // json response
          json: function() {
            res.json({
              ranks: userPoints
            });
          }

        });
        console.log("test");
      }
    });
  });

  pdfParser.loadPDF('./pdf/Resume.pdf');

});*/

router.route('/rank').post(function(req, res, callback) {

  var tokenString = jwt.decode(req.body.token);
  var username = tokenString.username;
  var profileID = req.body.data.profileID;

  mongoose.model("profile").findOne({
    _id: profileID
  }, (err, profile) => {
    if (err) {
      console.error(err.message);
    } else {
      if (profile){

        console.log(profile);

        // second mongodb query for jobs

        Job.find({}, (err, jobs) => {
          if (err) {
            console.error(err.message);
          } else {

            var jobRankings = [];

            for(var job of jobs) {

              //console.log(job.Skills);

              var rankInfo = {
                jobSkills: [],  // storing skills here because it felt natural, don't know what to do eith them here actually
                profileSkills: [],
                jobName: job.JobTitle,
                companyName: job.CompanyName,
                jobID: job._id,
                jobPoints: 0,
                profilePoints: 0,
                percent: 0
              };

              for (var skill of job.Skills){

                var jobSkill = {
                  skillName: skill.SkillName,
                  multiplier: 1
                }
                if (skill.Importance == "Mandatory"){
                  jobSkill.multiplier = 1;
                }
                else if (skill.Importance == "Important"){
                  jobSkill.multiplier = 0.6;
                }
                else if (skill.Importance == "Good to have"){
                  jobSkill.multiplier = 0.3;
                }

                rankInfo.jobPoints += jobSkill.multiplier;

                rankInfo.jobSkills.push(jobSkill);

                // find skill in profile
                for (var profileSkill of profile.technicalSkills) {
                  //console.log(jobSkill.skillName + " : " + profileSkill.name);
                  if (profileSkill.name == jobSkill.skillName){
                    rankInfo.profilePoints += jobSkill.multiplier;
                  }
                }
              }

              rankInfo.percent = (rankInfo.profilePoints / rankInfo.jobPoints) * 100;

              console.log(rankInfo);

              jobRankings.push(rankInfo);

            }

            // data obtained, send back to client
            res.format({
              json:function() {
                res.json({
                  jobRankings: jobRankings
                })
              }
            })

          }
        });

      } else {
        // profile not found
      }
    }
  });
});

router.route('/count').post(function(req, res, callback) {
  mongoose.model('job').count({}, function(err, count){
  console.log( "Number of docs: ", count );
  res.format({
    // json response
    json: function() {
      res.json({
         count
      });
    }
  });

});
});
