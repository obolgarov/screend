var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

module.exports = router;



router.use(bodyParser.urlencoded({ extended: true }));

// -------------- public-facing routes ---------------

router.route('/')
.post(function(req, res, callback) {



  var nodemailer = require('nodemailer');

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://nodemail.test123%40gmail.com:screend123@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Test123  👥" <nodemailer.test123@gmail.com>', // sender address
      to: 'nodemail.test234@gmail.com', // list of receivers
      subject: 'Welcome', // Subject line
      text: 'Thanks for Joining', // plaintext body
      html: '<b>Thanks for Joining</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });

  });

router.route('/empreset').post(function(req, res, callback) {


    var username = req.body.username;
    console.log(username);

    var nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://nodemail.test123%40gmail.com:screend123@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Test123  👥" <nodemailer.test123@gmail.com>', // sender address
        to: 'nodemail.test234@gmail.com', // list of receivers
        subject: 'Password Reset Link ', // Subject line
        text: 'Click here to reset your password : http://localhost:3000/#/PasswordResetEmployer?user='+username, // plaintext body
        html: '<b>Click here to reset your password :  http://localhost:3000/#/PasswordResetEmployer?user=' + username + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});


router.route('/appreset').post(function(req, res, callback) {

    var username = req.body.username;
    console.log(username);


    var nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://nodemail.test123%40gmail.com:screend123@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Test123  👥" <nodemailer.test123@gmail.com>', // sender address
        to: 'nodemail.test234@gmail.com', // list of receivers
        subject: 'Password Reset Link ', // Subject line
        text: 'Click here to reset your password : http://localhost:3000/#/PasswordResetEmployer?user='+username, // plaintext body
        html: '<b>Click here to reset your password :  http://localhost:3000/#/PasswordResetEmployer?user=' + username + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});
