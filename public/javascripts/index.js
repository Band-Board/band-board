function openModal(event) {
    console.log(event.title);
    $('.showTitle').text(event.title);
    $('.datetime').text(event.formatted_datetime);
    $('.venue').text(event.venue.name +", " + event.formatted_location);
    $('.rsvp').attr('href', event.facebook_rsvp);
    if (event.ticket_status === 'available'){
        $('.availability').text('Tickets Available!');
    } else {
        $('.availability').text('Sold Out!');
    }
    if (event.artists.length > 0){
        var i = 0;
        $('.bandsPlaying').text('');
        event.artists.forEach(function(x){
            if (i < 3){
            $('.bandsPlaying').append('<li class="inline"><a href=' + x.website+ '><img src=' + x.thumb_url + ' width="100px" height="100px"><p>' + x.name + '</a></li>');
            i++;
        }
        });
    }
    $('.ticketLink').attr('href', event.ticket_url);
    $('#modal1').openModal();
}


function searchEventsInTown() {
    // event.preventDefault();
    modalArray = [];
    console.log('hello from events in town');
    if ($('#bandName').text() !== "") {
        $artist = $('#bandName').text();
    }
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
                        "allDay": true,
                        "artists": x.artists,
                        "datetime": x.datetime,
                        "description": x.description,
                        "facebook_rsvp": x.facebook_rsvp_url,
                        "formatted_datetime": x.formatted_datetime,
                        "formatted_location": x.formatted_location,
                        "on_sale": x.on_sale_datetime,
                        "ticket_status": x.ticket_status,
                        "ticket_type": x.ticket_type,
                        "ticket_url": x.ticket_url,
                        "venue": x.venue,
                    });

                });
                $('#calendar').fullCalendar({
                    events: JSON,
                    eventClick: function(calEvent, jsEvent, view) {
                        console.log(calEvent);
                        openModal(calEvent);
                    }
                });
            } else {
                var limit = 0;
                bandEvents.forEach(function(x) {
                    if (limit < 5) {
                        $showDates.append("<li>" + x.title + " in " + x.formatted_location + "</li><br/>");
                        limit++;
                    }
                });
            }
        }
    });
}



$('.seeTourDates').one('click', function(e) {
    e.preventDefault();
    $artist = $(this).siblings('.card-title').text();
    $showDates = $(this).siblings('.showDates');
    searchEventsInTown();
});

$('.seeBandPage').on('click', function(e) {
    e.preventDefault();
    var formName = $(this).siblings('.card-title').text();
    var formBio = 'Test';
    var formImg = $(this).parents('.card').children('.card-image').children('img').attr('src');
    $('#name').val(formName);
    $('#img').val(formImg);
    $('#bio').text(formBio);
    $('#website').val('http://www.google.com');
    $('form').submit();
});

$(document).ready(function() {

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    if ($('.bandProfile').length === 1) {
        searchEventsInTown();
    }
    if ($('.userProfile').length === 1) {
        userEvents = [];
        console.log(userEvents);
        userEvents.forEach(function(x) {
            JSON.push({
                "title": x.title,
                "start": x.datetime,
                "allDay": true
            });
        });
        $('#calendar').fullCalendar({
            //- events: JSON,
            eventClick: function(calEvent, jsEvent, view) {
                openModal(userEvents);
            }
        });

    }
});
