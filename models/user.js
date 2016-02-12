var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Band = require('./band');

var User = new mongoose.Schema({
  local : {
    email: String,
    password : String,
    },
  twitter: String,
  google: String,
  github: String,
    profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },

  bands : [{ type: mongoose.Schema.ObjectId, ref: 'Band' }],
  //events: [{ type: mongoose.Schema.ObjectId, ref: 'Event' }]
  events: []
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
