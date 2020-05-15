var express =require('express');
var router = express.Router();

router.get('/checkin',function(req,res,next){
    res.render('checkin');
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

//post//
router.post('/checkin', function(req, res) {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "nodejs_login",
    });
  var searchroom = req.body['ROOMID'];
  var searchstart = req.body['STARTTIME'];
  var searchend = req.body['ENDTIME'];
  var searchdate = req.body['OPENDATE'];
  var searchdepartment = req.body['DEPARTMENT'];
  var searchtopic = req.body['MEETINGNAME'];
  var searchmeetingroomcode = req.body['MEETCODE'];
  var sqlforsearch = 'select roomid as ROOMID,starttime as STARTTIME,endtime as ENDTIME,opendate as OPENDATE,department as DEPARTMENT,meetingroomcode as MEETCODE,meetingname as MEETINGNAME from reservation where (roomid="'+ searchroom +'" OR starttime="'+ searchstart +'"OR endtime="'+ searchend +'"OR opendate="'+ searchdate +'"OR department="'+ searchdepartment +'"OR meetingname="'+ searchtopic +'"OR meetingroomcode="'+searchmeetingroomcode+'")'
  con.query(sqlforsearch, function(err, rows) {
       console.log('搜尋結果',rows);
      if(err){
        console.log(err);
      }else{
        res.json(rows);
      }
    }
    );
  });
  
  router.post('/memberlist',function(req,res,next){
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "nodejs_login",
    });
    var sql = "select username as USERNAME,name as NAME,department as MEMBERDEPARTMENT,sign as SIGN from users"
  
    con.query(sql,function(err,rows){
      console.log(rows);
      if(err){
        console.log(err);
      }else{
        res.json(rows);
        //res.end();
      }
    })
  });
  router.post('/signfun',function(req,res){
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "nodejs_login",
    });
    var username = req.body['USERNAME'];
    console.log(username);
    var sql = "update users set sign =  'O'  where username = '"+username+"'";
  
    con.query(sql,function(err,rows){
      console.log(rows);
      if(err){
        console.log(err);
      }else{
        res.send(true);
        //res.end();
      }
    })
  });
  
module.exports = router;