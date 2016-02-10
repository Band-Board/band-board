
$(document).ready(function() {
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });

  // if ($('main').is('.searchPage')) {
  //   var band = $('#searchResult').text();
  //   console.log(band);
  //   searchSpotify(band);
  // }
});
