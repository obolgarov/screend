var applicant = require('../models/applicant.js');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

module.exports = router;

exports.list = function(req, res) {
  applicant.find(function(err, applicants) {
    res.send(applicants);
  });
}

router.route('/')
.get(function(req, res, callback) {
  console.log("test");
    res.send("test");
  // get all
  mongoose.model('applicant').find({}, function (err, applicants){
    if (err) {
      return console.error(err);
    } else {
      res.send("test");
      // respond to call with information
      /*res.format({

        // html response
        html: function() {
          res.render('applicants/index', {
            title: 'all applicants',
            "applicants" : applicants
          })
        },

        // json response
        json: function() {
          res.json(applicants);
        }

      });*/
    }
  });

  // end of get
});
/*.post(function(req, res){

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
      res.format({

        //html response
        html: function() {
          res.location("applicants");
          res.redirect("/applicants");
        },

        //json response
        json: function() {
          res.json(applicant);
        }

      });
    }
  });

  // end of post
});*/
/*
router.get('/new', function(req, res) {
  res.render('applicants/new', { title: 'create applicant' });
});

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

/*
// what the hell do these mean? tutorials explain nothing!
module.exports.controller = function (app) {

  // how are these called? accessing the website from the browser? does that
  // mean users have access to all information just by typing a url they weren't
  // supposed to? Is it instead some special express way of distributing
  // functions? If so, is there is control over how these functions are called,
  // why is it done through some special express method instead of the regular
  // javascript functions?

  app.get('/applicant/signup', function (req, res) {
    //TODO: signup applicant
    res.render('users/signup');
  })

  app.get('/applicant/login', function (req, res) {
    //TODO: login applicant
    res.render('users/signup');
  })

  app.get('/applicant/delete', function (req, res) {
    //TODO: delete applicant (possibly not an option)
    res.render('users/signup');
  })

  app.get('/applicant/update', function (req, res) {
    //TODO: update applicant
    res.render('users/signup');
  })

}*/
