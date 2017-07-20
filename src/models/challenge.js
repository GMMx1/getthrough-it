'use strict';
module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define('Challenge', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    skillLevel: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    question: {
      type: DataTypes.TEXT
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    initial_editor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      // allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      // allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Challenge;
};
