'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();
var authMiddleware = require('../config/auth');

var User = require('../models/user');

var ref = new Firebase('https://authentpractice.firebaseio.com/');

router.post('/register', function(req, res, next) {
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    
    User.create(userData, function(err) {
    res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
  console.log(req.body.email, req.body.password)
  ref.authWithPassword(req.body, function(err, authData) {
    if(err) return res.status(400).send(err);

    User.findOne({uid: authData.uid}, function(err, user){
      if(err) return res.status(400).send(err);
      var token = user.generateToken();
      console.log('something');
      res.cookie('mytoken', token).send();
    });
  });
});

// router.post('/profile', function(req, res, next){
//   request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=AAPL', function (error, request, body){
//     console.log(body);
//   });
// });


router.get('/profile', authMiddleware,function(req, res) {
  User.findById(req.user._id, function(err, user) {
    res.send(user);
  });
});


router.post('/profile', function(req, res) {
  console.log("rec.stock" ,req.body.stock);

  User.findById(req.body.userId, function(err, user) {
    if(err) return res.status(400).send(err);
    user.stock.push(req.body.stock);
    user.save(function(err, updatedUser) {
      res.status(err ? 400 : 200).send(err || updatedUser);
    })
  })
  
})

router.get('/profile', function(req, res, next) {
  request('http://swapi.co/api/people/', function(error, response, body){
    res.send(body);
  });  
}); 

router.get('/logout', function (req, res, next){
  res.clearCookie('mytoken').redirect('/');
})

router.get('/', function(req,res,next) {
  console.log(req.user)
  res.send();
})

module.exports = router;
