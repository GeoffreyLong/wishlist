var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: String,
  password: String,
});

module.exports = User;
