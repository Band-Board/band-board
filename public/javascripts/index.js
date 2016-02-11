$(document).ready(function() {
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor

    });
    if ($('.userProfile').length || $('.bandProfile').length) {
        var JSON = [{
            "title": "Demo event",
            "start": "2016-2-15 22:20:00",
            "allDay": true
        }];
        $('#calendar').fullCalendar({
            events: JSON
        });
    }
});
