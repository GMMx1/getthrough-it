'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.end = exports.start = exports.update = exports.show = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _routes = require('../routes');

var _setItem = require('../../middlewares/setItem');

var _setItem2 = _interopRequireDefault(_setItem);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var LobbyModel = _models2.default['Lobby'];

var show = exports.show = function show(req, res) {
  var lobby = req.item;
  res.json(lobby);
};

var update = exports.update = function update(req, res) {
  var lobby = req.item;
  var peerId = req.body.peerId;
  var editorState = req.body.editorState || lobby.editorState;

  lobby.update({ peerId: peerId, editorState: editorState }).then(res.json.bind(res));
};

var start = exports.start = function start(req, res) {
  var lobby = req.item;
  lobby.update({ timeStart: Date.now() }).then(res.json.bind(res));
};

var end = exports.end = function end(req, res) {
  var lobby = req.item;
  lobby.update({ timeEnd: Date.now() }).then(res.json.bind(res));
};

var create = exports.create = function create(req, res, next) {
  LobbyModel.create().then(res.json.bind(res));
};

var setItemConfig = {
  modelName: 'Lobby',
  fieldName: 'url',
  type: String
};

router.get(_routes.LOBBY, (0, _setItem2.default)(setItemConfig), show);

router.put(_routes.LOBBY, (0, _setItem2.default)(setItemConfig), update);

router.put(_routes.LOBBY_START, (0, _setItem2.default)(setItemConfig), start);

router.put(_routes.LOBBY_END, (0, _setItem2.default)(setItemConfig), end);

router.post(_routes.LOBBIES, create);

exports.default = router;