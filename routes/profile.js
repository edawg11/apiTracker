var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('profile');
});


router.post('/', function(req, res, next){
  request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=AAPL', function (error, request, body){
    console.log(body);
  });
});

module.exports = router;