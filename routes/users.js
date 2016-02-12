var express = require('express');
var router = express.Router();
var passport = require('passport');
var Band = require('../models/band');
var Event = require('../models/event');
var User = require('../models/user');

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
};
/* GET users listing. */
router.get('/', function(req, res, next) {
   user = currentUser;
   //console.log(user);
   console.log(user._id);
   //console.log(user.id);
  res.render('users/show', {
    user: user
  });
});

//EDIT
router.get('/:id/edit', function(req, res) {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then(function(user) {
    //user = currentUser.local;
      console.log(user);
      res.render('users/edit', {
      user: user
      });
    });
});

//UPDATE
router.put('/:id', function(req, res) {
  console.log("update user");
  User.findById(req.params.id)
    .then(function(user) {
      user.name = req.body.name;
      user.local.email = req.body.email;

      // user.local.password = req.body.password;
      user.local.image = req.body.image;
      user.local.twitter = req.body.twitter;
      return user.save();
    })
    .then(function(saved) {
      res.redirect('/user');
    });
});

router.get('/bands', function(req, res, next) {
User.findById(currentUser._id).populate("bands")
    .then(function(user) {
      console.log(user)
      res.render('users/bands', {bands: user.bands} );
      });
});

module.exports = router;


//WHO KNOWS?!
  //isnt finding user now?!
  // user = User.findById(currentUser._id).populate("bands")
  // console.log(user.id)
   //WONT FOLLOW PROMISE ANYMORE. .THEN NEVER HAPPENS
    // .then(function(user) {
    //   console.log('currentUser has bands:', user.bands);
    //   res.render('users/bands');
    // });

//THIS DOES WORK? MAYBE?
    // user = User.findById(currentUser._id).populate("bands")
    // .then(function(user) {
    //   console.log('currentUser has bands:', user.bands);
    //   res.render('index', { title: 'BandBoard', nav: true });
    // });

//attempt to find current userr
// User.findOne({ "local.email": currentUser.local.email } )

//THIS DOESNT WORK
  //   User.findById(req.user.id).populate('bands')
  // .then(function(user) {
  //   console.log('a string:' + user.bands);
  // })
  // res.render('users/bands', { bands: bands});
