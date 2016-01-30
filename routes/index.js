var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('cookies:', req.cookies);

  res.render('index', { title: "Eliot's App" });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.use(authMiddleware);

router.get('/secret', function(req, res, next) {
  console.log('rec.user:', req.user);
  res.send('Wooo! Secret stuff!!!');
});

module.exports = router;
