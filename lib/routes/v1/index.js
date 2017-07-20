'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lobbies = require('./lobbies');

var _lobbies2 = _interopRequireDefault(_lobbies);

var _challenges = require('./challenges');

var _challenges2 = _interopRequireDefault(_challenges);

var _lobbychallenge = require('./lobbychallenge');

var _lobbychallenge2 = _interopRequireDefault(_lobbychallenge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_lobbies2.default, _challenges2.default, _lobbychallenge2.default];