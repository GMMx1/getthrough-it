'use strict';

var _Hash = require('../utils/Hash');

var _Hash2 = _interopRequireDefault(_Hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var Lobby = sequelize.define('Lobby', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      defaultValue: function defaultValue() {
        return _Hash2.default.encode(Date.now());
      }
    },
    peerId: {
      type: DataTypes.STRING
    },
    timeStart: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    timeEnd: {
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });

  return Lobby;
};