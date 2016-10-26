
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var applicant = require('../models/applicant.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
var superSecret = 'screend';

var userValidator = require('./userValidator.js');

module.exports = router;

exports.list = function(req, res) {
  applicant.find(function(err, applicants) {
    res.send(applicants);
  });
}

// replace the confusing event calling scheme for data to use a more imperative style
router.use(bodyParser.urlencoded({ extended: true }));

// -------------- public-facing routes ---------------

router.route('/')
.get(function(req, res, callback) {
  // to view users



  //TODO: read token and send to login page if no token

  //var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //if (token) {
  //  userValidator.validateToken(token, function(err, decoded) {

  //    if (err) {
  //      console.error(err);
  //    } else {



  // TODO: only show all users if adminstrator



  // get all
  mongoose.model('applicant').find({}, function (err, applicants){

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
          res.json(applicants);
        }

      });
    }
  });



  //    }

  //  });
  //}



  // end of get
})
.post(function(req, res){

  console.log(req.body);

  // insert one
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastName;

  mongoose.model('applicant').create({
    username : username,
    password : password,
    email : email,
    firstname : firstname,
    lastname : lastname
  }, function (err, applicant) {
    if (err) {
      return console.error(err)
    } else {
      // insertion/creation complete
      console.log('POST inserting new applicant: ' + applicant);
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

    }
  });

  // end of post
});

// named 'verify', but more of 'login', to be used once when logging in.
// Verification for every call is instead done via JWT in userValidator
router.route('/verify').post(function(req, res, callback) {

  // get specific uservar username = req.body.username;
  if (req.body.username != null && req.body.password != null){
    var username = req.body.username;
    var password = req.body.password;

    mongoose.model('applicant').findOne({
      username : username,
      password : password
    }, function (err, applicant){
      if (err) {
        return console.error(err);
      } else {

        if (applicant != null ){


          var token = jwt.sign({username}, superSecret,
        {expiresIn: '10h'});



          res.format({

            // json response
            json: function() {
              res.json({
                      success: true,
                      message: 'Enjoy your token!',
                      token: token
                    });               console.log(token);
            }




          });
        } else {
          res.format({

            // json response
            json: function() {
              res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });

            }

          });
        }


      }
      });
      } else {
      res.format({

      // json response
      json: function() {
        res.json({ verified: "false"});
      }

      });
      }
      });

router.route('/reset').post(function(req, res, callback) {
  if (req.body.username != null && req.body.password != null ){
    var username = req.body.username;
    var password = req.body.password;

    mongoose.model('applicant').findOne({
      username : username,
    }, function (err, applicant){

      if (err) {
        return console.error(err);
      } else {
        if (applicant != null ){


          var query = { username: username };
          mongoose.model('applicant').update(query, { password: password }, callback);
          res.format({

            // json response
            json: function() {
              res.json({ reset: "true"});
            }

          });
        } else {
          console.log("false");
          res.format({

            // json response
            json: function() {
              res.json({ reset: "false"});

            }
          });
        }


      }
    });
  } else {
    // user somehow sent empty fields, despite the form sending empty strings anyway
    res.format({

      // json response
      json: function() {
        res.json({ reset: "false"});
      }

    });
  }

});

router.route('/exists').post(function(req, res, callback) {
  // get specific uservar username = req.body.username;
  if (req.body.username != null){
    var username = req.body.username;

    mongoose.model('applicant').findOne({
      username : username
    }, function (err, applicant){
      if (err) {
        return console.error(err);
      } else {

        if (applicant != null ){
          res.format({

            // json response
            json: function() {
              res.json({
                      found: "true"
                    });
            }
          });
        } else {
          res.format({

            // json response
            json: function() {
              res.json({
              found : "false"
            });

            }

          });
        }


      }
      });
      } else {
      res.format({

      // json response
      json: function() {
        res.json({ found: "false"});
      }

      });
      }
});





/*
router.get('/new', function(req, res) {
  res.render('applicants/new', { title: 'create applicant' });
});
*/

/*
router.param('id', function(req, res, callback, id) {
  mongoose.model('applicant').findById(id, function (err, applicant) {
    if (err) { // it is not found
      console.log(id + ' was not found');
      res.status(404);
      var err = new Error('Not Found');
      err.status = 404;
      res.format({
        html: function() {
          next(err);
        },
        json: function() {
          res.json({message : err.status + ' ' + err});
        }
      });
    } else { // it is found
      req.id = id;
      callback();
    }
  })
})

router.route('/:id')
.get( function(req, res) {
  mongoose.model('applicant').findById(req.id, function (err, applicant){
    if (err) {
      console.log('GET Error: There was a problem retrieveing: ' + err)
    } else {
      console.log('GET Retrieving ID: ' + applicant._id);
      res.format({
        html: function() {
          res.render('applicants/show', {
            "applicant" : applicant
          });
        },
        json: function(){
          res.json(applicant);
        }
      });
    }
  });
});

router.get('/:id/edit', function(req, res) {
  mongoose.model('applicant').findById(req.id, function (err, applicant) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      console.log('GET Retrieving ID: ' + applicant._id);
      res.format( {
        html: function() {
          res.render('applicants/edit', {
            title: 'Applicant' + applicant._id,
            "applicant" : applicant
          });
        },
        json: function() {
          res.json(applicant);
        }
      });
    }
  });
});

router.put('/:id/edit', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastName;

  mongoose.model('applicant').findById(req.id, function (err, applicant) {

    applicant.update( {
      username : username,
      password : password,
      email : email,
      firstname : firstname,
      lastname : lastname
    }, function(err, applicant){
      if (err) {
        res.send("There was a problem updating the information to the database: " + err);
      } else {
        res.format( {
          html: function() {
            res.redirect("/applicants/" + applicant._id);
          },
          json: function() {
            res.json(applicant);
          }
        });
      }

    });
  });
});

router.delete('/:id/edit', function(req, res) {

  mongoose.model('applicant').findById(req.id, function (err, applicant) {
    if (err) {
      return console.error(err);
    } else {
      applicant.remove(function(err, applicant){
        if (err) {
          return console.error(err);
        } else {
          console.log('DELETE removing ID: ' + applicant._id)
          res.format( {
            html: function() {
              res.redirect("/applicants");
            },
            json: function() {
              res.json({
                message : 'deleted',
                item : applicant
              });
            }
          });
        }
      });
    }
  });
});
*/

// --------- controller functions -----------
