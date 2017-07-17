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
      allowNull: false
    },
    peerId: {
      type: DataTypes.STRING
    },
    timeStart: {
      type: DataTypes.DATE
    },
    timeEnd: {
      type: DataTypes.DATE
    },
    editorState: {
      type: DataTypes.TEXT
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
