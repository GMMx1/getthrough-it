'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _routes = require('../routes');

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// import setItems from '../../middlewares/setItems'

var ChallengeModel = _models2.default['Challenge'];
var ChallengeTestModel = _models2.default['ChallengeTest'];

var show = exports.show = function show(req, res) {
  _models2.default.sequelize.query('\n    SELECT c.*, group_concat(ct.input, " |separator| ", ct.output, " |separator| ", ct.hidden, " end|") input_output\n    FROM Challenges c\n    INNER JOIN ChallengeTest ct\n      ON c.id = ct.challengeId\n    GROUP BY c.id,\n             c.name,\n             c.question,\n             c.initial_editor,\n             c.skillLevel,\n             c.input_type,\n             c.output_type,\n             c.createdAt,\n             c.updatedAt', { type: _models2.default.sequelize.QueryTypes.SELECT }).then(function (challenges) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = challenges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var row = _step.value;

        var tests = [];
        var input_output = row['input_output'].slice(0, row['input_output'].length - 5).split(' end|,');
        var pairArr;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = input_output[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var pair = _step2.value;

            pairArr = pair.split(' |separator| ');
            pairArr[0] = JSON.parse(pairArr[0]);
            pairArr[1] = JSON.parse(pairArr[1]);
            pairArr[2] = pairArr[2] === '1' ? true : false;
            tests.push(pairArr);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        row['input_output'] = tests;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    console.log(challenges);
    res.json(challenges);
  });
};

router.get(_routes.CHALLENGES, show);

exports.default = router;