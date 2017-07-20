'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnectPeer = exports.connectPeer = undefined;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectPeer = exports.connectPeer = function connectPeer(id) {
  var lobbyId = id.slice(-9);
  var userId = id.slice(0, id.length - 9);

  _models2.default['Lobby'].update({
    peerId: userId
  }, {
    where: {
      url: lobbyId,
      peerId: null
    }
  });
};

var disconnectPeer = exports.disconnectPeer = function disconnectPeer(id) {
  var lobbyId = id.slice(-9);
  var userId = id.slice(0, id.length - 9);

  _models2.default['Lobby'].update({
    peerId: null
  }, {
    where: {
      url: lobbyId,
      peerId: userId
    }
  });
};