var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Band = require('./band');

var User = new mongoose.Schema({
  local : {
    name: String,
    email: String,
    password : String,
    image: String,
    twitter: String

  },
  bands : [{ type: mongoose.Schema.ObjectId, ref: 'Band' }],
  events: [{ type: mongoose.Schema.ObjectId, ref: 'Event' }]
});

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
//Shows
//Image
//location
//twitter
//name
