'use strict';
module.exports = function(sequelize, DataTypes) {
  var ChallengeTest = sequelize.define('ChallengeTest', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    challengeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Challenges',
        key: 'id'
      }
    },
    input: {
      type: DataTypes.STRING,
      allowNull: false
    },
    output: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ChallengeTest;
};
