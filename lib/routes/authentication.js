'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github2');

var _config = require('../config');

var _routes = require('./routes');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var UserModel = _models2.default['User'];

_passport2.default.use(new _passportGithub.Strategy({
  clientID: _config.GITHUB_CLIENT_ID,
  clientSecret: _config.GITHUB_CLIENT_SECRET,
  callbackURL: _config.GITHUB_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
  console.log(profile);
  UserModel.findOrCreate({ where: {
      github_uid: profile.id,
      display_name: profile.displayName,
      email: profile.emails[0].value,
      photo_url: profile._json.avatar_url
    }
  }).then(function (user) {
    done(null, user.dataValues);
  }).catch(done);
}));

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    done(null, {
      id: user.id,
      display_name: user.display_name,
      email: user.email,
      photo_url: user.photo_url
    });
  });
});

router.get(_routes.AUTH_GITHUB, _passport2.default.authenticate('github', { scope: ['email profile'] }));

router.get(_routes.AUTH_GITHUB_CALLBACK, _passport2.default.authenticate('github', { successRedirect: 'http://localhost:3000/lobby/:id' }));

exports.default = router;