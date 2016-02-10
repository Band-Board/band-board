var express = require('express');
var router = express.Router();
var passport = require('passport');
var Band = require('../models/band');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // var user = currentUser
  // console.log(currentUser)
  // console.log(currentUser._id)
  // console.log(user.id)
  res.render('users/show');
});

router.get('/bands', function(req, res, next) {
User.findById(currentUser._id).populate("bands")
    .then(function(user) {
      console.log(user)
      res.render('users/bands');
      });
});

module.exports = router;


//WHO KNOWS?!
  //isnt finding user now?!
  // var user = User.findById(currentUser._id).populate("bands")
  // console.log(user.id)
   //WONT FOLLOW PROMISE ANYMORE. .THEN NEVER HAPPENS
    // .then(function(user) {
    //   console.log('currentUser has bands:', user.bands);
    //   res.render('users/bands');
    // });

//THIS DOES WORK? MAYBE?
    // var user = User.findById(currentUser._id).populate("bands")
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
