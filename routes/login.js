var express = require('express');
var mysql = require('mysql');
var passport  = require('passport');
var router = express.Router();
var LocalStrategy = require("passport-local").Strategy;
var app = express();
var session = require('express-session');
app.use(session({
  secret: 'Nevermind',
  resave:false,
  saveUninitialized: false
 }));
 //launching session
 app.use(passport.initialize());
 app.use(passport.session());
//defined conn//
var conn = mysql.createConnection({
  host:'localhost',
  prot:'3306',
  user:'root',
  password:'123456',
  database:'nodejs_login'
});

//get router//
router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
  res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
      if (err) res.send(404);});
  });
router.get('/', function(req, res){
  res.render('login');

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


/*post*/
 router.post('/login', function(req,res){
  var Uname = req.body.username;
  var password = req.body.password;
  var sql = 'SELECT username,password FROM users WHERE (username ="'+Uname+'" and password = "'+password+'")';
  if(Uname && password){
    conn.query(sql,[Uname,password],function(error,result,fields){
      user = result;
     if (result.length>0){
        res.redirect('/homepage');
      }else{
        res.send("帳號密碼錯誤")
      }
      });

    }else{
      res.send("請輸入帳號密碼")
    }
  console.log(Uname+" "+password);
});


module.exports = router;
