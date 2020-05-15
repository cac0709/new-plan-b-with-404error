var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

/* GET router. */
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
  
      router.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
        res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
            if (err) res.send(404);});
        });
 
  //get post //
  router.post('/insert' , function(req, res) {
    var con = mysql.createConnection({
              host: "localhost",
              user: "root",
              password: "123456",
              database: "nodejs_login",
      });
    var start = req.body['STARTTIME'];
    var end = req.body['ENDTIME'];
    var room = req.body['MEETINGROOM'];
    var MeetingDate = req.body['OPENDATE'];
    var department = req.body['DEPARTMENT'];
    var meetingname = req.body['MEETINGNAME'];
    var meetingroomcode = req.body['MEETINGROOMCODE'];
    var note = req.body['NOTE'];
    console.log(department);
    var sql = "INSERT INTO reservation (roomid,starttime,endtime,opendate,department,meetingname,meetingroomcode,note ) VALUES ('"+room+"','"+start+ "' ,'"+end+ "','"+MeetingDate+ "','"+department+ "','"+meetingname+ "','"+meetingroomcode+"','"+note+"')";
          con.query(sql,function(err,rows){
            if(err){
              console.log(err);
            }else{
              res.send(true);
            }
          })
      });





    

module.exports = router;