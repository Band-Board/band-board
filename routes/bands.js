var express = require('express');
var router = express.Router();
var Band = require('../models/band');
var bandController = require('../controller/bands')

//INDEX
router.get('/', function(req, res, next) {
  console.log('bands go here!');
  Band.find({})
  .then(function(bands) {
    res.render('bands/index', { bands: bands });
  });
});

//NEW
router.get('/new', function(req, res) {
  console.log('New band!');
  var band = {
    name: '',
    bio: '',
    img: '',
    website: ''
  };
  res.render('bands/new', { band: band } );
});

//SHOW
router.get('/:id', function(req, res) {
  console.log('Show band');
  Band.findById(req.params.id)
  .then(function(band) {
    res.render('bands/show', { band: band });
  });
});

//CREATE
router.post('/', function(req, res) {
  console.log('create band');
  var band = new Band({
      name: req.body.name,
      bio: req.body.bio,
      img: req.body.img,
      website: req.body.website
    });
  console.log(band);
    band.save()
    .then(function(saved) {
      res.redirect('/bands');
    });
});

//EDIT
router.get('/:id/edit', function(req, res) {
  console.log('edit band');
  res.render("bands/edit");
});

//UPDATE
router.put('/:id', function(req, res) {
  console.log("update band");

});

//DELETE
router.delete('/:id', function(req, res) {
  console.log("delete band");

});


module.exports = router;
