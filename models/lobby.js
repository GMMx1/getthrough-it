'use strict';

import Hash from '../utils/Hash'

module.exports = function(sequelize, DataTypes) {
  var Lobby = sequelize.define('Lobby', {
    url: {
      type: DataTypes.STRING,
      noUpdate: true,
      allowNull: false,
      defaultValue: () => 
        Hash.encode(Date.now()),
    },
    peerId: DataTypes.STRING,
    timeStart: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    timeEnd: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    editorState: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Lobby;
};