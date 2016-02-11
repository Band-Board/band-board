function searchEventsInTown() {
    // event.preventDefault();
    console.log('hello from events in town');
    if ($('#bandName').text() !== "") {
        $artist = $('#bandName').text();
    }
    $('#info').html('<p>getting events with ' + $artist + '</p>');
    //var $term = $('search-keyword').val();
    var url = 'http://api.bandsintown.com/artists/' + $artist + '/events.json?api_version=2.0&app_id=johnk';

<<<<<<< HEAD
$(document).ready(function() {
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
});
=======
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
        success: function(data) {
            console.log('hello from success');
            console.log(data);
            var JSON = [];
            var bandEvents = data;
            if ($('.userProfile').length === 1 || $('.bandProfile').length === 1) {
                bandEvents.forEach(function(x) {
                    JSON.push({
                        "title": x.title,
                        "start": x.datetime,
                        "allDay": true
                    });
                });
            $('#calendar').fullCalendar({
                    events: JSON,
                    eventClick: function(calEvent, jsEvent, view) {
                        alert('Event: ' + calEvent.title);
                    }
                });
            }
            else {
                var limit=0;
                bandEvents.forEach(function(x) {
                    if (limit < 5) {
                        $('.showDates').append("<li>" + x.title + " in " + x.formatted_location + "</li>");
                        limit++;
                    }
                });
            }

        }
    });
>>>>>>> 14c93d36f7fb77330081acf21c3ea79b1ac7383b

}

<<<<<<< HEAD
function searchEventsInTown(event) {
  event.preventDefault();
  var $artist = $("#search-events").val();
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
    displayResults(data);
  }
=======
$('.seeTourDates').one('click', function(e) {
    e.preventDefault();
    $artist = $(this).siblings('.card-title').text();
    searchEventsInTown();
>>>>>>> 14c93d36f7fb77330081acf21c3ea79b1ac7383b
});

$(document).ready(function() {

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor

<<<<<<< HEAD
=======
    });
    if ($('.userProfile').length === 1 || $('.bandProfile').length === 1) {
        searchEventsInTown();
    }
});
>>>>>>> 14c93d36f7fb77330081acf21c3ea79b1ac7383b
