
$(document).ready(function() {
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
});


function error (event) {
  $('#info').html('<p>An error has occurred</p>');
}



function searchEventsInTown() {
  // event.preventDefault();
  var bandevent;
  var $artist = $('#bandName').text();
  $('#info').html('<p>getting events with ' + $artist + '</p>');
  //var $term = $('search-keyword').val();
  var url = 'http://api.bandsintown.com/artists/' + $artist + '/events.json?api_version=2.0&app_id=johnk';

  $.ajax({
    url: url,
    method: "GET",
    data: {
      format: 'json'
   },
   error: function() {
      $('#info').html('<p>An error has occurred</p>');
   },
    dataType: 'jsonp',
    success : function(data) {
    // displayResults(data);
    console.log(data);
    bandevent = data;
  }
});
  return bandevent
}

// function displayResults(data) {
//   // $('#info').html('<p>' + data[0].title + ' stuff</P>');
//   console.log(data);
//   return data;
// }

$(function() {
  $('form#search input[type=submit]').on("click", searchEventsInTown);
});

//   function searchDatabase(band) {
//   var band = Band.findOne( {"name" : band});
//   console.log(band);
//   return band;
// }

