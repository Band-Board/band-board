var async = require('async');
var request = require('request-promise');

var Ajax = {
  working: 'working',
  megaFunction: function(args) {
    console.log('hello from megaFunction');
    var arrayArtist = [];
    var artists;

    function searchSpotify(page, callback) {
      console.log('hello from searchSpotify');
      request({
        url: 'https://api.spotify.com/v1/search?q=' + page + '&type=artist',
        json: true
      }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          artists = body.artists.items;
          console.log('did a thing');
          callback(artists);
        } else {
          console.log('spotify error');
          // callback(error);
        }
      });
    }

    var counter = 0;

    function searchBandsInTown(artist) {
      console.log('hello from searchBandsInTown');
      var url = 'https://api.bandsintown.com/artists/' + artist.name + '.json?api_version=2.0&app_id=test';
      request({
        url: url,
        json: true
      }).then(function(results) {
        console.log('success');
        console.log(results);
        console.log(counter);
        arrayArtist.push(results);
        counter++;
        if (counter >= 20) {
          res.render('search.jade', {
            band: arrayArtist,
            a: 'if'
          });
        }
      }).catch(function() {
        // console.log(err);
        console.log('handled the error');
        counter++;
        if (counter >= 20) {
          args[1].render('search.jade', {
            band: arrayArtist,
            a: 'if'
          });
        }
      });
    }

    searchSpotify(args[0], function(artists) {
      console.log('hello from init');
      console.log(artists.length);
      async.each(artists, searchBandsInTown);
    });
  }
};

module.exports = Ajax;
