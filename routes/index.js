var express = require('express');
var path = require("path");
var passport = require("passport");
var mongoose = require("mongoose");
var User = require("../models/user.js");
var router = express.Router();


router.get('/', function(req, res) {
  res.sendFile(path.resolve('index.html'));
});

router.post('/newuser', function(req, res) {
  var newUser = req.body;
  console.log(req.body);
  User.findOne({ username: newUser.username }, function(err, user) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      if (!user) {
        User.create({ 'username': newUser.username, 'password': newUser.password }, function(err2, returnUser) {
          if (err) {
            res.status(400).send(err);
          }
          else {
            req.login(newUser, function(err) {
              if (err) { 
                res.status(400).send(returnUser._id);
              }
              res.status(200).send(returnUser._id);
            });
          }
        });
      }
      else {
        res.status(200).send({});
      }
    }
  });
});

router.post('/auth/login', function(req, res) {
  console.log(req.body)
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      console.log(err);
      console.log("case 1");
      return res.status(500).send(err);
    }
    if (!user) { 
      console.log("case 2");
      return res.status(200).send(""); 
    }
    req.logIn(user, function(err) {
      if (err) { 
        console.log("case 3");
        console.log(err);
        console.log(user);
        res.status(500).send(user); 
      }
      console.log("case 4");
      if (req.session.user == undefined) req.session.user = {};
      req.session.user.username = req.body.username;
      return res.status(200).send(user);
    });
  })(req, res);
});

router.get('/auth/logout', function(req, res){
  // TODO error handling here and on the front end side of this
  req.logout();
  req.session.user = undefined;
  res.status(200).send("");
});

router.get('/auth/session', function(req, res) {
  var session = {};
  session.user = req.session.user;
  session.isSessioned = req.session.isSessioned;
  req.session.isSessioned = true;
  console.log("hello Session:");
  console.log(session.user);
  res.send(session);
});

router.get('/user/:userId', function(req, res) {
  console.log(req.params);
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      res.status(200).send(user);
    }
  });
});

router.post('/user', function(req, res) {
  var user = req.body.data;
  User.findByIdAndUpdate(user._id, {
    "$set": {
      "username": user.username,
      "password": user.password,
      "fullName": user.fullName,
      "description": user.description,
      "address": {
        "formatted": user.address.formatted,
        "lat": user.address.lat,
        "lng": user.address.lng
      }
    }
  }, function(err, retUser) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      req.session.username = user.username;
      res.status(200).send(user);
    }
  });
});

module.exports = router;
