var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

/* GET router. */
router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);});
  });
router.get('/homepage', function(req, res) {
  res.render('homepage');
  });
 router.get('/reservation', function(req, res) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "nodejs_login",
});
var sql = 'select name ,username,department from users'
con.query(sql, function (err, result) {
console.log(result);
let memberselect = result;
  if (err) {
            res.send('errorr')
          } else {
            res.render('reservation',{memberselect:memberselect})
          }
      });
  });
router.get('/checkin',function(req,res,next){
    res.render('checkin');
});
 
  
    

module.exports = router;
