
$(document).ready(function() {
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });

  if ($('main').is('.searchPage')) {
    var band = $('#searchResult').text();
    console.log(band);
    searchSpotify(band);
  }
});


function searchSpotify(req) {
  $.getJSON('https://api.spotify.com/v1/search?q=' + req + '&type=artist', {})
    .done(searchBandsInTown);
}

function searchBandsInTown(req) {
  console.log(req.artists.items);
  req.artists.items.forEach(function(artist) {

    $.getJSON('http://api.bandsintown.com/artists/' + artist.name + '.json?callback=?', {

      app_id: 'test',
      api_version: '2.0'
    }, function(x) {
      if (x !== undefined && x.errors === undefined) {
        console.log(x);
        $('.allSearchResults').append("<div class='col s6 m4 l3'><div class='card'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src=" + x.image_url + '></div><div class= "card-content"><span class="card-title flow-text activator">' +
          x.name +
          '</div><div class= "card-reveal"><span class="card-title">' +
          x.name +
          '</div></div></div>'
        );
      }
    });
  });
}

//   function searchDatabase(band) {
//   var band = Band.findOne( {"name" : band});
//   console.log(band);
//   return band;
// }

