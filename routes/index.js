var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Ajax = require('../controller/ajax');
var Band = require('../models/band');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'BandBoard',
    nav: true
  });
});

<<<<<<< HEAD
router.get('/search', function(req, res, next){
  var band = req.query['bandname'];

  console.log(band);
  Band.find({"name" : band})
=======
router.get('/search', function(req, res, next) {
  var bandSearch = req.query['bandname'];
  Band.find({
      "name": bandSearch
    })
>>>>>>> refs/remotes/origin/master
    .then(function(band) {
      console.log(band);
      if (band.length > 0) {
        console.log("didn't render locally");
        res.render('search.jade', {
          band: 'band',
          a: 'if'
        });
      } else {
        console.log(Ajax.working);
        Ajax.megaFunction([bandSearch, res]);
      }
    });

});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.jade', {
    ignoreNav: true,
    message: req.flash()
  });
});

// POST /signup
router.post('/signup', function(req, res, next) {
  console.log('you found the /signup post route');
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect: '/signup',
    failureRedirect: '/signup',
    failureFlash: true
  });

  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.jade', {
    ignoreNav: true,
    message: req.flash()
  });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });

  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});





module.exports = router;
