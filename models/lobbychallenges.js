'use strict';
module.exports = function(sequelize, DataTypes) {
  var LobbyChallenges = sequelize.define('LobbyChallenges', {
    lobbyId: DataTypes.INTEGER,
    challengeId: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN,
    editorState: DataTypes.TEXT,
    duration: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LobbyChallenges;
};