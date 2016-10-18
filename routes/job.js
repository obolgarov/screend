var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var job = require('../models/job.js');
var bodyParser = require('body-parser');
var fs = require('fs');
var PDFParser = require('pdf2json');

var pdfParser = new PDFParser(this, 1);

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
                CompanyName: CompanyName,
                Location: Location,
                Certification: Certification,
                Requirededucation: Requirededucation,
                Experience: Experience,
                Salary: Salary,
                Description: Description
            },

            function(err, applicant) {
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




    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile('./pdf/resume.txt', pdfParser.getRawTextContent());
    });

    pdfParser.loadPDF('./pdf/Resume.pdf');
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
