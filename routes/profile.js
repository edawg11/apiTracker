var express = require('express');
var router = express.Router();

// var authMiddleware = require('../config/auth');

// router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('profile');
});

router.post('/', function(req, res, next){
  request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=AAPL', function (error, request, body){
    console.log(body);
  });
});

// router.post('/stock', function (req, res, next) {

//   console.log(req.body);


//   res.send("Stock received");
// })



module.exports = router;