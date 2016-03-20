var passport = require('passport');
var Client = require('../models/client');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if(err) { return callback(err); }
      if(!user) { return callback(null, false); }

      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }
        if (!isMatch) { return callback(null, false); }

        return callback(null, user);
      });
    });
  }
));

passport.use('client-basic', new BasicStrategy(
  function(username, password, callback) {
    Client.findOne({ id: username }, function (err, client) {
      if (err) { return callback(err); }

      if (!client || client.secret !== password) { return callback(null, false); }

      return callback(null, client);
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
