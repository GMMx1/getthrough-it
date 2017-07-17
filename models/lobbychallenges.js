'use strict';
module.exports = function(sequelize, DataTypes) {
  var LobbyChallenges = sequelize.define('LobbyChallenges', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    lobbyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Lobbies',
        key: 'id'
      }
    },
    challengeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Challenges',
        key: 'id'
      }
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    editorState: {
      type: DataTypes.TEXT
    },
    duration: {
      type: DataTypes.DOUBLE
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
  return LobbyChallenges;
};
