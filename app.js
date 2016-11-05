var express = require('express');
var routes = require('./routes/index');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var stylus = require('express-stylus');
var nib = require('nib');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var User = require('./models/user.js');

var app = express();

app.use(morgan('dev')); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Start up the DB
mongoose.connect('mongodb://localhost/wishlist', function (error) {
  if (error) {
      console.log(error);
  }
  else{
    console.log('Successfully Connected');
  }
});

app.use(stylus({
  src: path.join(__dirname, 'app'),
  use: [nib()],
  import: ['nib']
}));
app.use(express.static(path.join(__dirname, 'app')));


app.use(session({ 
  secret: 's3ssi0nsecraet17',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, done) {
    console.log(username);
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Ignore requests for favicon
app.get('/favicon.ico', function(req, res) {
    res.send(200);
});

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      console.log(err);
      console.log(err.message);
      res.status(err.status || 500).end();
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    console.log(err.message);
    res.status(err.status || 500).end();
});

module.exports = app;
