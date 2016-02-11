var express = require('express');
var router = express.Router();
var Event = require('../models/event');


//INDEX
router.get('/', function(req, res, next) {
  console.log('events go here!');
  Event.find({})
    .then(function(events) {
      res.render('events/index', {
        events: events
      });
    });
});

//NEW
router.get('/new', function(req, res, next) {
  console.log('New event!');
  var event = {
    title: '',
    datetime: '',
    venue: '',
    address: ''
  };
  res.render('events/new', {
    event: event
  });
});

//CREATE
router.post('/', function(req, res) {
  console.log('create event');
  var event = new Event({
      title: req.body.title,
      datetime: req.body.datetime,
      venue: req.body.venue,
      address: req.body.website,
    });
  console.log(event);
  event.save()
    .then(function(saved) {
      res.redirect('/events');
    });
});



module.exports = router;
