'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    github_uid: DataTypes.STRING,
    email: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    display_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};