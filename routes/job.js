var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Job = require('../models/job.js');
var bodyParser = require('body-parser');
var fs = require('fs');
var PDFParser = require('pdf2json');
var querystring = require('qs');



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
      Skills: [] //initialized empty
    });

    for (var skill of SkillsList){
      newJob.Skills.push({
        SkillName: skill.skill,
        Experience: skill.exp,
        Importance: skill.imp
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
  console.log(PostedBy);

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

});
router.route('/rank').get(function(req, res, callback) {



  res.format({
    // json response
    json: function() {
      res.json({
        yes: "yes"
      });
    }
  });
});

