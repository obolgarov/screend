/*
 * GET home page.
 */
var express = require ('express');
var router = express.Router();

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

module.exports = router;
