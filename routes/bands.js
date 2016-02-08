var express = require('express');
var router = express.Router();
var Band = require('../models/band');

//INDEX
router.get('/', function(req, res) {
  console.log('bands go here!');
  res.render('bands/index');
});

//NEW
router.get('/new', function(req, res) {
  console.log('New band!');
  res.render('bands/new');
});

//SHOW
router.get('/:id', function(req, res) {
  console.log('Show band');
  res.render('bands/show');
});

//CREATE
router.post('/', function(req, res) {
  console.log('create band');

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
