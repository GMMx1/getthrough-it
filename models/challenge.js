'use strict';
module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define('Challenge', {
    skillLevel: DataTypes.FLOAT,
    question: DataTypes.TEXT,
    tests: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Challenge;
};