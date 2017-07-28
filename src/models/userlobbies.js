'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserLobbies = sequelize.define('UserLobbies', {
    userId: DataTypes.INTEGER,
    lobbyUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User)
      }
    }
  });
  return UserLobbies;
};