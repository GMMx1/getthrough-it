'use strict';

import Hash from '../utils/Hash'

module.exports = function(sequelize, DataTypes) {
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
      defaultValue: () =>
        Hash.encode(Date.now())
    },
    peerId1: {
      type: DataTypes.STRING
    },
    peerId2: {
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
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Lobby;
};
