'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setItem = function setItem(_ref) {
  var modelName = _ref.modelName,
      _ref$fieldName = _ref.fieldName,
      fieldName = _ref$fieldName === undefined ? 'id' : _ref$fieldName,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? Number : _ref$type,
      _ref$fieldStorage = _ref.fieldStorage,
      fieldStorage = _ref$fieldStorage === undefined ? 'req.params' : _ref$fieldStorage;

  return function (req, res, next) {
    try {
      var field = type(req.params.id);

      _models2.default[modelName].findOne({
        where: _defineProperty({}, fieldName, field)
      }).then(function (item) {
        if (item) {
          req.item = item;
          next();
        } else {
          res.sendStatus(404);
        }
      });
    } catch (e) {
      next(e);
    }
  };
};

exports.default = setItem;