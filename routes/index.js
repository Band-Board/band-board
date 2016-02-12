var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Ajax = require('../controller/ajax');
var Band = require('../models/band');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (currentUser){
    console.log(currentUser);
  }
  res.render('index', {
    title: 'BandBoard',
    nav: true
  });
});


router.get('/search', function(req, res, next) {
  var bandSearch = req.query['bandname'];
  console.log(bandSearch);
  Band.find({
      "name": new RegExp('^'+bandSearch+'$', "i")
    }).then(function(band) {
      console.log(band);
      if (band.length > 0) {
        band.forEach(function(x){
           x.image_url= x.img,
           x.upcoming_event_count = x.dates.length;
        });
        console.log('rendering from local');
        res.render('search.jade', {
          band: band
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
    successRedirect: '/user',
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
    successRedirect: '/user',
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
