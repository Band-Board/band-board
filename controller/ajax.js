var async = require('async');
var express = require('express');
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
          console.log('retrieved spotify artist');
          callback(artists);
        } else {
          console.log('spotify error');
          // callback(error);
        }
      });
    }

    var counter = 1;

    function searchBandsInTown(artist) {
      var url = 'https://api.bandsintown.com/artists/' +
      artist.name +
      '.json?api_version=2.0&app_id=test';

      request({
        url: url,
        json: true
      }).then(function(results) {
        console.log('success');
        console.log(counter);
        arrayArtist.push(results);

        if (counter >= 20) {
          console.log('length ' + arrayArtist.length);
          console.log('rendering from then'); 
          console.log(arrayArtist[0]);
          args[1].render('search.jade', {
            band: arrayArtist
          });
        } else {
          counter++;
        }
      }).catch(function() {
        // console.log(err);
        console.log('handled the error');
        console.log(counter);
        if (counter >= 20) {
          console.log('length ' + arrayArtist.length);
          console.log('rendering from catch');
          console.log(arrayArtist[0]);
          args[1].render('search.jade', {
            band: arrayArtist
          });
        } else {
          counter++;
        }
      });
    }

    searchSpotify(args[0], function(artists) {
      console.log('hello from the Loop!');
      async.each(artists, searchBandsInTown);
    });
  }
};

module.exports = Ajax;
