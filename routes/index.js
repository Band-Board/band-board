var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BandBoard', nav: true });
});

router.get('/search', function(req, res, next){
  var band = req.query['bandname'];
<<<<<<< HEAD

  res.render('search.jade', {band: band});

=======
  res.render('search.jade', {band: band});
>>>>>>> 0007e12cf8250fd10637cb8c426a6511784e8bf1
});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup.jade', {  ignoreNav: true, message: req.flash()});
});

// POST /signup
router.post('/signup', function(req, res, next) {
  console.log('you found the /signup post route');
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/signup',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login.jade', {  ignoreNav: true, message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});




module.exports = router;
