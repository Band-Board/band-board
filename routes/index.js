var express = require('express');
var router = express.Router();
var passport = require('passport');
var env = require('jsdom').env;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'BandBoard',
    nav: true
  });
});

router.get('/search', function(req, res, next) {
  var band = req.query['bandname'];
  env('/search', function(errors, window) {
    console.log(errors);
    var $ = require('jQuery')(window);
    console.log($('h2').val());
    hello = 'hello';

    $('h2').append('Hello');

    function searchBandsInTown(req) {
      console.log('searching bands in town');
      var searchArray = [];
      req.artists.items.forEach(function(artist) {
        // var spotifayLink = artist.external_urls.spotify;
        var spotifyImage;
        // if (artist.images !== undefined && artist.images[0] !== undefined) {
        //   spotifyImage = artist.images[0].url;
        // }
        console.log('attempting bands in town');
        $.getJSON('https://api.bandsintown.com/artists/' + artist.name + '.json', {
            app_id: 'test',
            async: false,
            api_version: '2.0',
            crossDomain: true,
            dataType: 'jsonp',
            statusCode: {
              500: function(){
                console.log('fuck you');
            }}
          }).done(
          function(x) {
            console.log('success');
            console.log(x);
            if (x !== undefined && x.errors === undefined) {
              console.log(x);
              if (spotifyImage === undefined) {
                spotifyImage = x.image_url;
              }
            }

            searchArray.push({
              name: x.name,
              image: x.image_url,
              tourDates: x.upcoming_event_count
            });
          }).always(function(){
            console.log('whats happening');
            searchArray.push('test');
          });
          console.log(searchArray);
      });

       res.render('search.jade', {
          band: searchArray
      });
    }

    function searchSpotify(req) {
      console.log(req);
      console.log('searching spotify');
      $.getJSON('https://api.spotify.com/v1/search?q=' + req + '&type=artist')
        .done(
          searchBandsInTown
        ).fail(function(err) {
          console.log(err);
        });
    }
    searchSpotify(band);
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
