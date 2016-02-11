var express = require('express');
var router = express.Router();
var Band = require('../models/band');


//INDEX
router.get('/', function(req, res, next) {
  console.log('bands go here!');
  Band.find({})
    .then(function(bands) {
      res.render('bands/index', {
        bands: bands
      });
    });
});

//NEW
router.get('/new', function(req, res) {
  console.log('New band!');
  var band = {
    name: '',
    bio: '',
    img: '',
    website: '',
    created_by: ''
  };
  res.render('bands/new', {
    band: band
  });
});

//SHOW
router.get('/:id', function(req, res) {
  console.log('Show band');
  Band.findById(req.params.id)
    .then(function(band) {
      res.render('bands/show', {
        band: band
      });
    });
});

//CREATE
router.post('/', function(req, res) {
  console.log('create band');
  var band = new Band({
      name: req.body.name,
      bio: req.body.bio,
      img: req.body.img,
      website: req.body.website,
      creator: req.user.id
    });
  console.log(band);
  band.save()
    .then(function(saved) {
      req.user.bands.push(saved.id);
      req.user.save()
      res.redirect('/bands');
    });
});

//EDIT
router.get('/:id/edit', function(req, res) {
  console.log('edit band');
  Band.findById(req.params.id)
    .then(function(band) {
      res.render('bands/edit', {
        band: band
      });
    });
});

//UPDATE
router.put('/:id', function(req, res) {
  console.log("update band");
  Band.findById(req.params.id)
    .then(function(band) {
      band.name = req.body.name;
      band.bio = req.body.bio;
      band.img = req.body.img;
      band.website = req.body.website;
      return band.save();
    })
    .then(function(saved) {
      res.redirect('/bands');
    });
});

//DELETE
router.delete('/:id', function(req, res) {
  console.log("delete band");
  Band.findByIdAndRemove(req.params.id)
    .then(function() {
      res.redirect('/bands');
    });
});


module.exports = router;
