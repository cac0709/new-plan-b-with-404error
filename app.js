var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var conn = require('./lib/db');
var bodyParser = require('body-parser');
//////////////router//////////////////
var test = require('./routes/checkin');
var login = require('./routes/login');
var homepage = require('./routes/homepage');
var reservation = require('./routes/reservation')
var checkin = require('./routes/checkin')

// view engine setup//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'kendo')));
app.use(express.static(path.join(__dirname, 'config')));
app.use(express.static(path.join(__dirname, 'lib')));

 
 app.get(/(.*)\.(jpg|gif|png|ico|css|js|txt|svg|ttf|eot|woff)/i, function(req, res) {
     res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
         if (err) res.send(404);});
     });
 



//router//
app.use('/', login);
app.use('/homepage', homepage);
app.use('/checkin',checkin);
app.use('/reservation',reservation);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
   res.render('error');
});

  console.log('http:/localhost:3000/');



module.exports = app;
