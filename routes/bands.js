var express = require('express');
var router = express.Router();
var Band = require('../models/band');

//INDEX
router.get('/', function(req, res) {
  console.log('bands go here!');
  res.send('bands go here!');
});

//NEW
router.get('/new', function(req, res) {
  console.log('New band!');
  res.send('New bands get created here!');
});

//SHOW
router.get('/:id', function(req, res) {
  console.log('Show band');
  res.send('Show a band here');
});

//CREATE
router.post('/', function(req, res) {
  console.log('create band');
  res.send("create band");
});

//EDIT
router.get('/:id/edit', function(req, res) {
  console.log('edit band');
  res.send("edit band here");
});

//UPDATE
router.put('/:id', function(req, res) {
  console.log("update band");
  res.send("update band");
});

//DELETE
router.delete('/:id', function(req, res) {
  console.log("delete band");
  res.send("Delete band");
});


module.exports = router
