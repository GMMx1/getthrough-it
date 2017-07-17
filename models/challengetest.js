'use strict';
module.exports = function(sequelize, DataTypes) {
  var ChallengeTest = sequelize.define('ChallengeTest', {
    id: DataTypes.INTEGER,
    input: DataTypes.STRING,
    // add output and other fields
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ChallengeTest;
};
