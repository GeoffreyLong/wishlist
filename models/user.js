var mongoose = require('mongoose');

var User = mongoose.model('User', {
  username: String,
  password: String,
  fullName: String,
  description: String,
  address: {
    formatted: String,
    lat: Number,
    lng: Number
  }
});

module.exports = User;
