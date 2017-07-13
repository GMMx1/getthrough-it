'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    github_uid: DataTypes.STRING,
    name: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};