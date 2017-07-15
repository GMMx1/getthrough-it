'use strict';
module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define('Challenge', {
    skillLevel: DataTypes.FLOAT,
    question: DataTypes.TEXT,
    tests: DataTypes.TEXT,
    name: DataTypes.STRING,
    initial_editor: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Challenge;
};
