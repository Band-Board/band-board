var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

//images
var cloudinary = require('cloudinary');
var fs = require ('fs');
var http = require('http');
var path = require('path');

var config = require('./config/config.js').get(process.env.NODE_ENV);
var CLOUDINARY_URL = config.CLOUDINARY_URL;
//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bandsRouter = require('./routes/bands');
var eventsRouter = require('./routes/events');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'build')));

app.use(session({ secret: 'WDI Rocks!' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport/passport')(passport);

// This middleware will allow us to use the currentUser in our views and routes.
app.use(function(req, res, next) {
  global.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/bands', bandsRouter);
app.use('/events', eventsRouter);

//image upload



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

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/bandboard';
mongoose.connect(mongoURI);

module.exports = app;



// THIS IS SAMPLE CODE TO ENSURE CONNECTIVITY TO DB.
// console.log("creating band...");
// var band = {
//   name: 'Radiohead',
//   img: 'http://cdn.pigeonsandplanes.com/wp-content/uploads/2015/08/radiohead1.jpg',
//   bio: 'Radiohead was born cool.',
//   dates: ["derp", "derp"],
//   website: "http://cdn.pigeonsandplanes.com/wp-content/uploads/2015/08/radiohead1.jpg",
//   created_by: "Spencer"
// };
// Band.create(band);
// console.log("band created");

