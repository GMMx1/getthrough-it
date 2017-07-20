'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = exports.show = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _routes = require('../routes');

var _setItem = require('../../middlewares/setItem');

var _setItem2 = _interopRequireDefault(_setItem);

var _setItems = require('../../middlewares/setItems');

var _setItems2 = _interopRequireDefault(_setItems);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// import setItems from '../../middlewares/setItems'
var show = exports.show = function show(req, res) {
  var lobby = req.item;
  res.json(lobby);
};

var create = exports.create = function create(req, res) {
  console.log('req.body: ', req.body);
  _models2.default['LobbyChallenges'].create({ lobbyId: req.item.id, challengeId: req.body.challengeId, editorState: req.body.editorState, createdAt: Date.now(), updatedAt: Date.now() }).then(res.json.bind(res));
};

var update = exports.update = function update(req, res) {
  try {
    _models2.default['Lobby'].findOne({
      where: {
        url: req.params.id
      }
    }).then(function (lobby) {
      return _models2.default['LobbyChallenges'].findOne({
        where: {
          lobbyId: lobby.id,
          challengeId: req.body.challengeId
        }
      });
    }).then(function (item) {
      if (item) {
        var complete = req.body.complete;
        var editorState = req.body.editorState;
        var duration = req.body.duration;
        var updatedAt = Date.now();
        return item.update({ complete: complete, editorState: editorState, duration: duration, updatedAt: updatedAt });
      } else {
        res.sendStatus(404);
      }
    }).then(res.json.bind(res)).catch(function (e) {
      console.log('error in promise chain', e);
    });
  } catch (e) {
    console.log('error in try catch: ', e);
  }
};

var setItemConfig = {
  modelName: 'Lobby',
  fieldName: 'url',
  type: String
};

router.get(_routes.LOBBY_CHALLENGES, (0, _setItem2.default)(setItemConfig), (0, _setItems2.default)({ modelName: 'LobbyChallenges', fieldName: 'lobbyId' }), show);

router.post(_routes.LOBBY_CHALLENGES, (0, _setItem2.default)(setItemConfig), create);

router.put(_routes.LOBBY_CHALLENGES, update);

exports.default = router;