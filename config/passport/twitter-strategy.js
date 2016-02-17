var TwitterStrategy  = require('passport-twitter').Strategy;
var User            = require('../../models/user');
var configAuth = require('../auth');

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
   var strategy = new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL

    },

  function(req, accessToken, tokenSecret, profile, done) {
  User.findOne({ twitter: profile.id }, function(err, existingUser) {
      if (existingUser) return done(null, existingUser);
      var user = new User();
      // Twitter will not provide an email address.  Period.
      // But a person's twitter username is guaranteed to be unique
      // so we can "fake" a twitter email address as follows:
      // username@twitter.mydomain.com
      user.email = profile.username + "@twitter.com";
      user.twitter = profile.id;
      //user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
      user.profile.name = profile.displayName;
      user.profile.location = profile._json.location;
      user.profile.picture = profile._json.profile_image_url;
      user.save(function(err) {
        done(err, user);
      });
    });
});

module.exports = strategy;
