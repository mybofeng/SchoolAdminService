var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var multer = require('multer');
app.use(multer({ dest: './public/files/',
  rename: function (fieldname, filename, req) {
    filename = req.body.ClassId;
    return filename;
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// session
app.use(session({ secret: 'huyugui', cookie: {
  expires: new Date(Date.now() + 60 * 10000),
  maxAge: 60*10000
},saveUninitialized: true,resave: true}));
//
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
  // get
  res.header('Access-Control-Allow-Credentials', true);
  //
  res.header("Access-Control-Expose-Headers", "Set-Cookie");
  //
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// 拦截
app.use(function (req, res, next) {
  var url = req.originalUrl;
  if(url.indexOf("getrandom") !=-1)
  {
    next();

  }
  else if (url.indexOf("login") ==-1 && !req.session.user_id) {
    console.log("please login");
    res.jsonp("please login");
  }else
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
