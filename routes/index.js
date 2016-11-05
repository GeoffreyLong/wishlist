var express = require('express');
var path = require("path");
var router = express.Router();
var passport = require("passport");

router.get('/', function(req, res) {
  res.sendFile(path.resolve('index.html'));
});

// This may reload the page... I don't think we want that behavior
router.post('/login', passport.authenticate('local', 
            { successRedirect: '/', failureRedirect: '/login' }));


router.get('/logout', function(req, res){
  // TODO error handling here and on the front end side of this
  req.logout();
  res.status(200).send("");
});

module.exports = router;
