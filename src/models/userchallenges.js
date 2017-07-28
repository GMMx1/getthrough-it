'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserChallenges = sequelize.define('UserChallenges', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
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
    solution: {
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
  return UserChallenges;
};
